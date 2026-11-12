"""Notes from a sandboxed (opaque-origin) frame: the shell's browser boundary, wizard-os#133.

The browser asks for a module script from an opaque page with `Origin: null` and needs a CORS answer. Notes gives it
for its own public files only; the API keeps refusing `Origin: null` (the shell carries the page's API calls).
"""
import importlib.util
import os
from pathlib import Path
import tempfile
import threading
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen

spec = importlib.util.spec_from_file_location('notes_opaque_assets', Path(__file__).resolve().parents[1] / 'app/server.py')
assert spec is not None and spec.loader is not None
s = importlib.util.module_from_spec(spec)
spec.loader.exec_module(s)


class OpaqueAssetTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR'))
        cls.old = s.VAULT
        s.VAULT = s.Vault(cls.temp.name)
        s.VAULT.write('Hello.md', 'hi', create=True)
        cls.server = s.ThreadingHTTPServer(('127.0.0.1', 0), s.Handler)
        cls.port = cls.server.server_port
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True); cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown(); cls.server.server_close(); cls.thread.join(); s.VAULT = cls.old; cls.temp.cleanup()

    def call(self, path, origin=None, method='GET', body=None):
        headers = {'Origin': origin} if origin else {}
        if body is not None: headers['Content-Type'] = 'application/json'
        req = Request('http://127.0.0.1:%d%s' % (self.port, path), data=body, method=method, headers=headers)
        try:
            with urlopen(req) as r: return r.status, r.headers, r.read()
        except HTTPError as e:
            with e: return e.code, e.headers, e.read()

    def test_module_script_and_its_files_load_from_an_opaque_page(self):
        for path in ['/app.js', '/boot.js', '/styles.css', '/wizard-ui.css', '/vendor/live-preview.js']:
            code, headers, body = self.call(path, 'null')
            self.assertEqual(code, 200, path)
            self.assertEqual(headers['Access-Control-Allow-Origin'], '*', path)
            self.assertNotIn('Access-Control-Allow-Credentials', headers, path)
            self.assertTrue(body, path)
        code, headers, _ = self.call('/app.js', 'null', method='HEAD')
        self.assertEqual((code, headers['Access-Control-Allow-Origin']), (200, '*'))

    def test_the_api_still_refuses_an_opaque_page(self):
        for path in ['/api/tree', '/api/note?path=Hello.md', '/api/switches', '/api/search?q=hi', '/openapi.json', '/']:
            code, headers, _ = self.call(path, 'null')
            self.assertEqual(code, 403, path)
            self.assertIsNone(headers['Access-Control-Allow-Origin'], path)
        code, headers, _ = self.call('/api/note', 'null', method='POST', body=b'{"path":"x.md","content":"x"}')
        self.assertEqual(code, 403)
        self.assertIsNone(headers['Access-Control-Allow-Origin'])
        self.assertFalse((s.VAULT.root / 'x.md').exists())

    def test_nothing_changes_for_the_shell_page_or_other_origins(self):
        code, headers, _ = self.call('/app.js')
        self.assertEqual(code, 200); self.assertIsNone(headers['Access-Control-Allow-Origin'])
        own = 'http://127.0.0.1:%d' % self.port
        code, headers, _ = self.call('/app.js', own)
        self.assertEqual(code, 200); self.assertIsNone(headers['Access-Control-Allow-Origin'])
        self.assertEqual(self.call('/api/tree', own)[0], 200)
        code, headers, _ = self.call('/app.js', 'https://evil.example')
        self.assertEqual(code, 403); self.assertIsNone(headers['Access-Control-Allow-Origin'])
        code, headers, _ = self.call('/missing.js', 'null')
        self.assertEqual(code, 404); self.assertIsNone(headers['Access-Control-Allow-Origin'])
        code, _, _ = self.call('/.hidden.js', 'null')
        self.assertEqual(code, 404)


if __name__ == '__main__':
    unittest.main()
