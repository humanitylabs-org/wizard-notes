"""Prepare only the app data mount, then permanently drop to the runtime uid/gid.

NOTES_UID / NOTES_GID choose that user (default 1000:1000). To edit a mounted host folder,
such as a synced Obsidian vault, use the container ids that own it on the host; see README.
"""
import os
import sys
from pathlib import Path

def ident(name):
    value = os.environ.get(name, '').strip() or '1000'
    if not value.isascii() or not value.isdecimal() or len(value) > 10 or int(value) > 4294967294:
        raise SystemExit(f'{name} must be a numeric id: ASCII decimal, 0 through 4294967294 (at most 10 digits).')
    return int(value)

uid, gid = ident('NOTES_UID'), ident('NOTES_GID')
if os.geteuid() == 0:
    data = Path(os.environ.get('DATA_DIR', '/data'))
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
