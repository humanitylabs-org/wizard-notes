"""Current-path trash confinement; not hostile concurrent-writer isolation."""
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('notes_trash', Path(__file__).resolve().parents[1] / 'app/server.py')
assert spec is not None and spec.loader is not None
notes = importlib.util.module_from_spec(spec)
spec.loader.exec_module(notes)


class TrashConfinementTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='notes-trash-', dir=os.environ.get('TMPDIR'))
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.vault = notes.Vault(self.base / 'data')
        self.outside = self.base / 'outside'
        self.outside.mkdir()
        self.trash_id = 'a' * 32

    def reject(self, call):
        with self.assertRaises(notes.Problem) as caught:
            call()
        self.assertEqual(caught.exception.status, 400)

    def test_delete_rejects_linked_trash_root_and_keeps_note(self):
        self.vault.write('Keep.md', 'preserved', create=True)
        (self.vault.root / '.trash').symlink_to(self.outside, target_is_directory=True)
        self.reject(lambda: self.vault.delete('Keep.md'))
        self.assertEqual(self.vault.read('Keep.md')['content'], 'preserved')
        self.assertEqual(list(self.outside.iterdir()), [])

    def test_restore_rejects_linked_trash_root_and_keeps_outside_bytes(self):
        slot = self.outside / self.trash_id
        slot.mkdir()
        (slot / 'original.json').write_text(json.dumps({'path': 'Back.md'}))
        (slot / 'Back.md').write_text('outside bytes')
        before = {p.name: p.read_bytes() for p in slot.iterdir()}
        (self.vault.root / '.trash').symlink_to(self.outside, target_is_directory=True)
        self.reject(lambda: self.vault.restore(self.trash_id))
        self.assertEqual({p.name: p.read_bytes() for p in slot.iterdir()}, before)
        self.assertFalse((self.vault.root / 'Back.md').exists())

    def test_restore_rejects_linked_slot_metadata_and_payload(self):
        for part in ('slot', 'original.json', 'Back.md'):
            with self.subTest(part=part), tempfile.TemporaryDirectory(prefix='notes-trash-part-', dir=os.environ.get('TMPDIR')) as data:
                vault = notes.Vault(data)
                trash = vault.root / '.trash'
                trash.mkdir()
                outside = Path(data) / 'outside'
                outside.mkdir()
                slot = trash / self.trash_id
                if part == 'slot':
                    slot.symlink_to(outside, target_is_directory=True)
                else:
                    slot.mkdir()
                for name, value in [('original.json', json.dumps({'path': 'Back.md'})), ('Back.md', 'preserved')]:
                    if part == name:
                        (outside / name).write_text(value)
                        (slot / name).symlink_to(outside / name)
                    else:
                        (slot / name).write_text(value)
                before = {p.name: p.read_bytes() for p in outside.iterdir()}
                self.reject(lambda: vault.restore(self.trash_id))
                self.assertEqual({p.name: p.read_bytes() for p in outside.iterdir()}, before)
                self.assertFalse((vault.root / 'Back.md').exists())

    def test_delete_rejects_dangling_trash_root(self):
        self.vault.write('Keep.md', 'preserved', create=True)
        (self.vault.root / '.trash').symlink_to(self.outside / 'missing', target_is_directory=True)
        self.reject(lambda: self.vault.delete('Keep.md'))
        self.assertEqual(self.vault.read('Keep.md')['content'], 'preserved')
        self.assertEqual(list(self.outside.iterdir()), [])

    def test_restore_rejects_links_inside_vault_too(self):
        self.vault.mkdir('Other')
        (self.vault.root / '.trash').symlink_to(self.vault.root / 'Other', target_is_directory=True)
        self.reject(lambda: self.vault.restore(self.trash_id))
        self.assertEqual(list((self.vault.root / 'Other').iterdir()), [])

    def test_note_and_folder_roundtrip_and_occupied_name_control(self):
        self.vault.write('Keep.md', 'preserved', create=True)
        result = self.vault.delete('Keep.md')
        self.vault.write('Keep.md', 'newer', create=True)
        with self.assertRaises(notes.Problem) as caught:
            self.vault.restore(result['trash_id'])
        self.assertEqual(caught.exception.status, 409)
        self.assertEqual(self.vault.read('Keep.md')['content'], 'newer')
        self.assertEqual((self.vault.root / '.trash' / result['trash_id'] / 'Keep.md').read_text(), 'preserved')
        (self.vault.root / 'Keep.md').unlink()
        self.vault.restore(result['trash_id'])
        self.assertEqual(self.vault.read('Keep.md')['content'], 'preserved')
        self.vault.mkdir('Folder')
        self.vault.write('Folder/Child.md', 'child', create=True)
        result = self.vault.delete('Folder')
        self.vault.restore(result['trash_id'])
        self.assertEqual(self.vault.read('Folder/Child.md')['content'], 'child')

    def test_missing_and_invalid_trash_ids_remain_rejected(self):
        for value in ('../outside', '', 'A' * 32):
            with self.subTest(value=value):
                self.reject(lambda: self.vault.restore(value))
        with self.assertRaises(notes.Problem) as caught:
            self.vault.restore(self.trash_id)
        self.assertEqual(caught.exception.status, 404)


if __name__ == '__main__':
    unittest.main()
