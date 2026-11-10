"""Focused resolver tests; synthetic vaults only, never owner content."""
import importlib.util
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('notes_link_review', Path(__file__).resolve().parents[1] / 'app/server.py')
assert spec is not None and spec.loader is not None
s = importlib.util.module_from_spec(spec)
spec.loader.exec_module(s)

class LinkPathTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR'))
        self.addCleanup(self.temp.cleanup)
        self.v = s.Vault(self.temp.name)
        self.v.mkdir('Work')
        self.v.mkdir('Work/Sub')
        for name in ['Target.md', 'Work/Target.md', 'Work/Sub/Target.md']:
            self.v.write(name, name, create=True)

    def resolve(self, target, current='Work/Source.md'):
        with patch.object(s, 'VAULT', self.v):
            return s.service('resolve', {'target': target, 'current': current})

    def test_explicit_relative_links_use_the_named_directory_not_basename_fallback(self):
        self.assertEqual(self.resolve('../Target')['path'], 'Target.md')
        self.assertEqual(self.resolve('./Target')['path'], 'Work/Target.md')
        self.assertEqual(self.resolve('../Target', 'Work/Sub/Source.md')['path'], 'Work/Target.md')
        self.assertEqual(self.resolve('../../Target', 'Work/Sub/Source.md')['path'], 'Target.md')
        with self.assertRaises(s.Problem) as missing:
            self.resolve('./Missing')
        self.assertEqual(missing.exception.status, 404)
        self.assertEqual(self.resolve('Target')['path'], 'Work/Target.md')
        self.assertEqual(self.resolve('Target\\|alias')['path'], 'Work/Target.md')

    def test_root_escape_hidden_invalid_current_and_symlink_destinations_are_refused(self):
        (self.v.root / 'Work' / 'link').symlink_to(Path(self.temp.name), target_is_directory=True)
        for target, current in [
            ('../../Target', 'Work/Source.md'), ('../Target', 'Source.md'),
            ('./.secret', 'Work/Source.md'), ('./link/Outside', 'Work/Source.md'),
            ('./Target', '../Source.md'), ('./Target', ''),
            ('./a/../Target', 'Work/Source.md'), ('./a//Target', 'Work/Source.md'),
            ('./a:b', 'Work/Source.md'), ('./a\\b', 'Work/Source.md'),
        ]:
            with self.subTest(target=target, current=current):
                with self.assertRaises(s.Problem):
                    self.resolve(target, current)
        with self.assertRaises(s.Problem):
            self.v.path('../Target.md')

    def test_only_the_selected_directory_is_checked_for_destination_symlinks(self):
        self.v.write('Work/OnlyHere.md', 'safe nested note', create=True)
        (self.v.root / 'OnlyHere.md').symlink_to(self.v.root / 'Target.md')
        self.assertEqual(self.resolve('./OnlyHere')['path'], 'Work/OnlyHere.md')

    def test_relative_alias_fragments_and_missing_directory_do_not_fall_back(self):
        self.assertEqual(self.resolve('../Target.md#Heading')['path'], 'Target.md')
        self.assertEqual(self.resolve('../Target\\|alias')['path'], 'Target.md')
        self.v.write('OnlyAtRoot.md', 'not the requested note', create=True)
        with self.assertRaises(s.Problem) as missing:
            self.resolve('./OnlyAtRoot')
        self.assertEqual(missing.exception.status, 404)

if __name__ == '__main__':
    unittest.main()
