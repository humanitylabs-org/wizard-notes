"""notes#58: the owner's own vault folder (Vault folder app setting, switch vault-folder). All data is disposable."""
import importlib.util
import json
import os
import re
import runpy
import tempfile
import threading
import unittest
from contextlib import ExitStack
from pathlib import Path
from unittest.mock import patch
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('notes_vf', ROOT/'app/server.py')
s = importlib.util.module_from_spec(spec); spec.loader.exec_module(s)


class StartupPicksTheVault(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix='notes-58-', dir=os.environ.get('TMPDIR'))
        self.data = Path(self.tmp.name)/'data'; self.data.mkdir()
        self.mount = Path(self.tmp.name)/'vault'; self.mount.mkdir()
        (self.mount/'From Obsidian.md').write_text('# kept\n', encoding='utf-8')
        self.owner = self.mount.stat()

    def tearDown(self): self.tmp.cleanup()

    def start(self, extra, switch=None, root_owned=False):
        """Run start.py as root with every chown/identity change/exec mocked; return the ids and env it would exec with."""
        if switch is not None: (self.data/'switches.json').write_text(json.dumps({'vault-folder': switch}), encoding='utf-8')
        seen = {}
        real_stat = Path.stat
        def stat(path, *a, **k):
            st = real_stat(path, *a, **k)
            if root_owned and path == self.mount: return os.stat_result((st.st_mode, st.st_ino, st.st_dev, st.st_nlink, 0, 0, *st[6:10]))
            return st
        with ExitStack() as stack:
            stack.enter_context(patch.dict(os.environ, {'DATA_DIR': str(self.data), 'NOTES_VAULT_MOUNT': str(self.mount), **extra}, clear=True))
            calls = {n: stack.enter_context(patch('os.'+n)) for n in ('chown', 'setgroups', 'setgid', 'setuid')}
            stack.enter_context(patch('os.execv', side_effect=lambda *a: seen.update(env=dict(os.environ))))
            stack.enter_context(patch('os.geteuid', return_value=0))
            stack.enter_context(patch.object(Path, 'stat', stat))
            runpy.run_path(str(ROOT/'start.py'), run_name='__main__')
        return calls['setuid'].call_args.args[0], calls['setgid'].call_args.args[0], seen['env']

    def test_switch_off_keeps_the_own_vault(self):
        for switch in (None, False):
            uid, gid, env = self.start({'NOTES_VAULT_FOLDER': '/home/owner/Obsidian Vault'}, switch)
            self.assertEqual((uid, gid), (1000, 1000)); self.assertNotIn('NOTES_VAULT_DIR', env)

    def test_switch_on_opens_the_folder_as_its_owner(self):
        uid, gid, env = self.start({'NOTES_VAULT_FOLDER': '/home/owner/Obsidian Vault'}, True)
        self.assertEqual((uid, gid), (self.owner.st_uid, self.owner.st_gid))
        self.assertEqual(env['NOTES_VAULT_DIR'], str(self.mount)); self.assertEqual(env['NOTES_VAULT_IN_USE'], 'folder')

    def test_explicit_ids_still_win(self):
        uid, gid, env = self.start({'NOTES_VAULT_FOLDER': '/srv/notes', 'NOTES_UID': '0', 'NOTES_GID': '0'}, True)
        self.assertEqual((uid, gid), (0, 0)); self.assertEqual(env['NOTES_VAULT_DIR'], str(self.mount))

    def test_no_folder_set_or_hand_written_override_is_left_alone(self):
        uid, gid, env = self.start({}, True)
        self.assertEqual((uid, gid), (1000, 1000)); self.assertNotIn('NOTES_VAULT_DIR', env)
        uid, gid, env = self.start({'NOTES_VAULT_FOLDER': '/srv/notes', 'NOTES_VAULT_DIR': '/vault', 'NOTES_UID': '0', 'NOTES_GID': '0'}, True)
        self.assertEqual((uid, gid), (0, 0)); self.assertEqual(env['NOTES_VAULT_DIR'], '/vault'); self.assertNotIn('NOTES_VAULT_IN_USE', env)

    def test_root_owned_folder_on_rootful_docker_is_refused(self):
        uid_map = '         0          0 4294967295\n'
        real = Path.read_text
        with patch.object(Path, 'read_text', lambda p, *a, **k: uid_map if str(p) == '/proc/self/uid_map' else real(p, *a, **k)):
            uid, gid, env = self.start({'NOTES_VAULT_FOLDER': '/srv/notes'}, True, root_owned=True)
        self.assertEqual((uid, gid), (1000, 1000)); self.assertNotIn('NOTES_VAULT_DIR', env); self.assertIn('root', env['NOTES_VAULT_PROBLEM'])
        # Rootless Docker: container root is the unprivileged host user who owns the folder, so it is used.
        uid_map = '         0       1000          1\n'
        with patch.object(Path, 'read_text', lambda p, *a, **k: uid_map if str(p) == '/proc/self/uid_map' else real(p, *a, **k)):
            uid, gid, env = self.start({'NOTES_VAULT_FOLDER': '/srv/notes'}, True, root_owned=True)
        self.assertEqual((uid, gid), (0, 0)); self.assertEqual(env['NOTES_VAULT_DIR'], str(self.mount))

    def test_missing_folder_is_reported_not_fatal(self):
        self.mount.joinpath('From Obsidian.md').unlink(); self.mount.rmdir()
        uid, gid, env = self.start({'NOTES_VAULT_FOLDER': '/srv/notes'}, True)
        self.assertEqual((uid, gid), (1000, 1000)); self.assertNotIn('NOTES_VAULT_DIR', env); self.assertIn('not there', env['NOTES_VAULT_PROBLEM'])


class ServerReportsTheVault(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory(prefix='notes-58-srv-', dir=os.environ.get('TMPDIR'))
        s.VAULT = s.Vault(cls.temp.name)
        cls.server = s.ThreadingHTTPServer(('127.0.0.1', 0), s.Handler)
        threading.Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.base = 'http://127.0.0.1:%d' % cls.server.server_port

    @classmethod
    def tearDownClass(cls): cls.server.shutdown(); cls.server.server_close(); cls.temp.cleanup()

    def setUp(self): s.VAULT.set_switch('vault-folder', False)

    def get(self, path):
        with urlopen(self.base+path, timeout=3) as r: return json.loads(r.read())

    def flip(self, on):
        r = Request(self.base+'/api/switches', data=json.dumps({'id': 'vault-folder', 'on': on}).encode(), method='POST',
                    headers={'Content-Type': 'application/json', 'X-Wizard-Switch': '1', 'Origin': self.base})
        with urlopen(r, timeout=3) as resp: return json.loads(resp.read())

    def test_switch_is_listed_off_and_linked_to_the_issue(self):
        sw = next(x for x in self.get('/api/switches')['switches'] if x['id'] == 'vault-folder')
        self.assertFalse(sw['default']); self.assertFalse(sw['on']); self.assertEqual(sw['issues'], ['humanitylabs-org/wizard-notes#58'])

    def test_status_without_a_folder(self):
        with patch.dict(os.environ, {'NOTES_VAULT_FOLDER': ''}):
            self.assertEqual(self.get('/api/vault'), {'folder': None, 'using': 'own', 'problem': None, 'restart': False})
            self.flip(True)
            self.assertFalse(self.get('/api/vault')['restart'])

    def test_flip_asks_for_a_restart_and_only_pid_1_exits(self):
        with patch.dict(os.environ, {'NOTES_VAULT_FOLDER': '/srv/notes'}), patch.object(s.threading, 'Timer') as timer:
            self.assertEqual(self.get('/api/vault'), {'folder': '/srv/notes', 'using': 'own', 'problem': None, 'restart': False})
            self.flip(True)
            self.assertTrue(self.get('/api/vault')['restart']); timer.assert_not_called()
            self.flip(False)
            self.assertFalse(self.get('/api/vault')['restart'])
            with patch.object(s.os, 'getpid', return_value=1):
                self.flip(True)
            timer.assert_called_once(); self.assertEqual(timer.call_args.args[1], s.os._exit)
            with patch.object(s.os, 'getpid', return_value=1):
                self.flip(True)  # already on: nothing to restart
            timer.assert_called_once()

    def test_a_refused_folder_is_not_a_pending_restart_but_a_flip_retries_it(self):
        with patch.dict(os.environ, {'NOTES_VAULT_FOLDER': '/srv/notes', 'NOTES_VAULT_PROBLEM': 'the folder is not there.'}), patch.object(s.threading, 'Timer') as timer, patch.object(s.os, 'getpid', return_value=1):
            self.flip(True)
            self.assertEqual(self.get('/api/vault'), {'folder': '/srv/notes', 'using': 'own', 'problem': 'the folder is not there.', 'restart': False})
            timer.assert_called_once()

    def test_folder_in_use_and_box_override(self):
        with patch.dict(os.environ, {'NOTES_VAULT_FOLDER': '/srv/notes', 'NOTES_VAULT_IN_USE': 'folder', 'NOTES_VAULT_DIR': '/vault'}):
            s.VAULT.set_switch('vault-folder', True)
            self.assertEqual(self.get('/api/vault'), {'folder': '/srv/notes', 'using': 'folder', 'problem': None, 'restart': False})
            s.VAULT.set_switch('vault-folder', False)
            self.assertTrue(self.get('/api/vault')['restart'])
        with patch.dict(os.environ, {'NOTES_VAULT_FOLDER': '/srv/notes', 'NOTES_VAULT_DIR': '/vault'}):
            self.assertEqual(self.get('/api/vault')['using'], 'custom'); self.assertFalse(self.get('/api/vault')['restart'])


class PackageOffersTheSetting(unittest.TestCase):
    def test_form_field_and_mount(self):
        config = json.loads((ROOT/'runtipi/config.json').read_text())
        field = next(f for f in config['form_fields'] if f['env_variable'] == 'NOTES_VAULT_FOLDER')
        self.assertFalse(field['required']); self.assertEqual(field['default'], '')
        rx = re.compile(field['regex'])
        for ok in ('', '/home/owner/Obsidian Vault', '/srv/notes'): self.assertTrue(rx.fullmatch(ok), ok)
        for bad in ('relative/vault', '/a:/b', '/x/${HOME}', '/a\nb'): self.assertFalse(rx.fullmatch(bad), bad)
        compose = (ROOT/'runtipi/docker-compose.yml').read_text()
        # The optional-folder spelling the App Manager's host-access check understands; blank mounts the app's own data.
        self.assertIn('- ${NOTES_VAULT_FOLDER:-${APP_DATA_DIR}/data/vault}:/vault\n', compose)
        self.assertIn('NOTES_VAULT_FOLDER: ${NOTES_VAULT_FOLDER:-}\n', compose)
        self.assertNotIn('NOTES_VAULT_DIR', compose)


if __name__ == '__main__': unittest.main()
