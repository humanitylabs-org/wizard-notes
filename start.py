"""Prepare only the app data mount, then permanently drop to the runtime uid/gid.

NOTES_UID / NOTES_GID choose that user (default 1000:1000). To edit a mounted host folder,
such as a synced Obsidian vault, use the container ids that own it on the host; see README.

The owner's own vault folder (notes#58): the app setting NOTES_VAULT_FOLDER is mounted at /vault. While the
vault-folder switch is on, Notes opens it and runs as the ids that own it, so files keep the owner's ownership.
A hand-written NOTES_VAULT_DIR override always wins and is left exactly as before.
"""
import json
import os
import sys
from pathlib import Path

def ident(name):
    value = os.environ.get(name, '').strip() or '1000'
    if not value.isascii() or not value.isdecimal() or len(value) > 10 or int(value) > 4294967294:
        raise SystemExit(f'{name} must be a numeric id: ASCII decimal, 0 through 4294967294 (at most 10 digits).')
    return int(value)

def container_root_is_host_root():
    # Rootful Docker maps container uid 0 to host uid 0; rootless Docker maps it to the unprivileged host user.
    try: rows = Path('/proc/self/uid_map').read_text().split('\n')
    except OSError: return True
    for row in rows:
        parts = row.split()
        if len(parts) == 3 and all(p.isdecimal() for p in parts):
            inside, outside, count = map(int, parts)
            if inside <= 0 < inside + count: return outside - inside == 0
    return True

def picked_vault(data):
    """(path, uid, gid) of the owner's vault folder when the vault-folder switch is on, else None.
    A problem leaves Notes on its own vault and is reported to the page through NOTES_VAULT_PROBLEM."""
    if not os.environ.get('NOTES_VAULT_FOLDER', '').strip() or os.environ.get('NOTES_VAULT_DIR', '').strip(): return None
    try: saved = json.loads((data/'switches.json').read_text(encoding='utf-8'))
    except (OSError, ValueError): return None
    if not isinstance(saved, dict) or saved.get('vault-folder') is not True: return None
    mount = Path(os.environ.get('NOTES_VAULT_MOUNT', '').strip() or '/vault')
    problem, st = None, None
    if mount.is_symlink() or not mount.is_dir(): problem = 'the folder is not there.'
    else:
        st = mount.stat()
        if st.st_uid == 0 and container_root_is_host_root():
            problem = 'the folder belongs to the system administrator (root), so Notes will not write there. Pick a folder your own user owns.'
    if problem or st is None:
        os.environ['NOTES_VAULT_PROBLEM'] = problem or 'the folder is not there.'
        return None
    return mount, st.st_uid, st.st_gid

uid, gid = ident('NOTES_UID'), ident('NOTES_GID')
data = Path(os.environ.get('DATA_DIR', '/data'))
picked = picked_vault(data)
if picked:
    os.environ['NOTES_VAULT_DIR'] = str(picked[0])
    os.environ['NOTES_VAULT_IN_USE'] = 'folder'
    # Explicit ids still win; otherwise Notes writes as the folder's owner.
    if not os.environ.get('NOTES_UID', '').strip(): uid = picked[1]
    if not os.environ.get('NOTES_GID', '').strip(): gid = picked[2]
if os.geteuid() == 0:
    data.mkdir(parents=True, exist_ok=True)
    os.chown(data, uid, gid)
    # The app's own top-level files (agent.token, .initialized) follow a changed uid. Folders are never
    # touched, so a vault mounted inside /data keeps its host ownership.
    for entry in data.iterdir():
        if entry.is_file() and not entry.is_symlink(): os.chown(entry, uid, gid)
    os.setgroups([])
    os.setgid(gid)
    os.setuid(uid)
os.execv(sys.executable, [sys.executable, str(Path(__file__).parent/'app/server.py')])
