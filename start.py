"""Prepare only the app data mount, then permanently drop to uid/gid 1000."""
import os
import sys
from pathlib import Path

if os.geteuid() == 0:
    data = Path(os.environ.get('DATA_DIR', '/data'))
    data.mkdir(parents=True, exist_ok=True)
    os.chown(data, 1000, 1000)
    os.setgroups([])
    os.setgid(1000)
    os.setuid(1000)
os.execv(sys.executable, [sys.executable, str(Path(__file__).parent/'app/server.py')])
