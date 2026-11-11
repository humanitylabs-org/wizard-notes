"""Images in Read view (notes#33): the vault image endpoint, its path gate and its switch. Synthetic vaults only."""
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import threading
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen

spec = importlib.util.spec_from_file_location('notes_images', Path(__file__).resolve().parents[1] / 'app/server.py')
s = importlib.util.module_from_spec(spec)
spec.loader.exec_module(s)
PNG = b'\x89PNG\r\n\x1a\n' + b'0' * 16

class ImageTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR'))
        self.addCleanup(self.temp.cleanup)
        self.v = s.Vault(self.temp.name)
        self.root = self.v.root
        for d in ['Apartment Hunting', 'Apartment Hunting/photos', 'Attachments', 'Deep', 'Deep/Er']: (self.root / d).mkdir()
        (self.root / 'Apartment Hunting/Apartment Hunting.md').write_text('x')
        (self.root / 'Apartment Hunting/photos/one.jpg').write_bytes(b'one')
        (self.root / 'Attachments/photo.jpg').write_bytes(b'attached')
        (self.root / 'Deep/Er/photo.jpg').write_bytes(b'deeper')
        (self.root / 'Apartment Hunting/near.png').write_bytes(PNG)
        (self.root / 'Deep/Er/only.webp').write_bytes(b'webp')
        (self.root / 'top.gif').write_bytes(b'gif')
        self.note = 'Apartment Hunting/Apartment Hunting.md'

    def test_resolves_like_obsidian(self):
        self.assertEqual(self.v.image('near.png', self.note), (PNG, 'image/png'))
        self.assertEqual(self.v.image('photos/one.jpg', self.note)[0], b'one')
        self.assertEqual(self.v.image('Attachments/photo.jpg', self.note)[0], b'attached')
        self.assertEqual(self.v.image('photo.jpg|300', self.note)[0], b'attached', 'bare name: shortest path wins')
        self.assertEqual(self.v.image('only.webp', self.note), (b'webp', 'image/webp'))
        self.assertEqual(self.v.image('../top.gif', self.note)[0], b'gif')
        self.assertEqual(self.v.image('top.gif')[0], b'gif')

    def test_same_path_gate_as_notes(self):
        (self.root / '.hidden').mkdir(); (self.root / '.hidden/secret.png').write_bytes(b's')
        outside = Path(self.temp.name) / 'outside.png'; outside.write_bytes(b'o')
        (self.root / 'link.png').symlink_to(outside)
        (self.root / 'linked').symlink_to(self.root / 'Deep')
        for target, current in [('.hidden/secret.png', ''), ('../outside.png', 'top.md'), ('../../outside.png', self.note),
                                ('link.png', ''), ('linked/Er/photo.jpg', ''), ('Deep/../top.gif', ''), ('a\\b.png', '')]:
            with self.assertRaises(s.Problem, msg=target) as c: self.v.image(target, current)
            self.assertIn(c.exception.status, {400, 404})
        with self.assertRaises(s.Problem) as c: self.v.image('secret.png'); 
        self.assertEqual(c.exception.status, 404, 'a bare name never finds hidden folders')
        (self.root / 'Deep/note.svg').write_text('<svg/>')
        with self.assertRaises(s.Problem) as c: self.v.image('Deep/note.svg')
        self.assertEqual(c.exception.status, 400, 'SVG is not served')
        with self.assertRaises(s.Problem) as c: self.v.image('Apartment Hunting/Apartment Hunting.md')
        self.assertEqual(c.exception.status, 400)
        with self.assertRaises(s.Problem) as c: self.v.image('missing.jpg', self.note)
        self.assertEqual(c.exception.status, 404)

class ImageHttpTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR'))
        cls.old = s.VAULT
        s.VAULT = s.Vault(cls.temp.name)
        (s.VAULT.root / 'pic.png').write_bytes(PNG)
        cls.server = s.ThreadingHTTPServer(('127.0.0.1', 0), s.Handler)
        cls.port = cls.server.server_port
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True); cls.thread.start()
    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown(); cls.server.server_close(); cls.thread.join(); s.VAULT = cls.old; cls.temp.cleanup()
    def get(self, path):
        try:
            with urlopen('http://127.0.0.1:%d%s' % (self.port, path)) as r: return r.status, r.headers, r.read()
        except HTTPError as e:
            with e: return e.code, e.headers, e.read()
    def flip(self, on):
        origin = 'http://127.0.0.1:%d' % self.port
        req = Request(origin + '/api/switches', data=json.dumps({'id': 'read-images', 'on': on}).encode(), method='POST',
                      headers={'Content-Type': 'application/json', 'X-Wizard-Switch': '1', 'Origin': origin})
        with urlopen(req) as r: return json.loads(r.read())

    def test_switch_is_off_by_default_and_gates_the_endpoint(self):
        row = next(x for x in json.loads(self.get('/api/switches')[2])['switches'] if x['id'] == 'read-images')
        self.assertFalse(row['on']); self.assertFalse(row['default'])
        self.assertEqual(row['issues'], ['humanitylabs-org/wizard-notes#33'])
        self.assertEqual(self.get('/api/image?target=pic.png')[0], 404)
        self.flip(True)
        try:
            code, headers, body = self.get('/api/image?target=pic.png')
            self.assertEqual((code, headers['Content-Type'], body), (200, 'image/png', PNG))
            self.assertEqual(headers['X-Content-Type-Options'], 'nosniff')
            self.assertEqual(self.get('/api/image?target=.trash/x.png')[0], 400)
            self.assertEqual(self.get('/api/image?target=nope.png')[0], 404)
        finally: self.flip(False)
        self.assertEqual(self.get('/api/image?target=pic.png')[0], 404)

    def test_page_allows_https_images_but_no_other_hosts(self):
        csp = self.get('/')[1]['Content-Security-Policy']
        self.assertIn("img-src 'self' https:;", csp)
        self.assertIn("default-src 'self'", csp); self.assertNotIn('http:', csp.replace('https:', ''))

if __name__ == '__main__':
    unittest.main()
