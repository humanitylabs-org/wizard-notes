"""Real process startup and portable ingress defaults; all data is disposable."""
import json
import os
import socket
import subprocess
import sys
import tempfile
import time
import unittest
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

class PackageStartup(unittest.TestCase):
    def test_private_package_starts_and_preserves_credential(self):
        with tempfile.TemporaryDirectory(prefix='notes-package-',dir=os.environ.get('TMPDIR')) as data:
            with socket.socket() as probe:
                probe.bind(('127.0.0.1',0));port=probe.getsockname()[1]
            script=Path(__file__).resolve().parents[1]/'app/server.py'
            env={**os.environ,'DATA_DIR':data,'HOST':'127.0.0.1','PORT':str(port),'WIZARD_TRUSTED_HOSTS':'','WIZARD_TRUSTED_ORIGINS':''}
            def req(path,body=None,headers=None):
                r=Request('http://127.0.0.1:'+str(port)+path,data=None if body is None else json.dumps(body).encode(),headers={'Content-Type':'application/json',**(headers or {})})
                try:
                    with urlopen(r,timeout=2) as response:return response.status,response.read()
                except HTTPError as error:return error.code,error.read()
            prior=None
            for cycle in range(2):
                with subprocess.Popen([sys.executable,str(script)],env=env,stdout=subprocess.PIPE,stderr=subprocess.PIPE) as service:
                    try:
                        for attempt in range(50):
                            if service.poll() is not None:self.fail(service.stderr.read().decode())
                            try:
                                if req('/healthz')[0]==200:break
                            except OSError:pass
                            time.sleep(.02)
                        else:self.fail('No health response')
                        credential=Path(data)/'agent.token'
                        self.assertEqual(credential.stat().st_mode&0o777,0o600)
                        current=credential.read_text().strip()
                        self.assertGreater(len(current),30)
                        if prior:self.assertEqual(current,prior)
                        prior=current
                        rpc={'jsonrpc':'2.0','id':1,'method':'tools/list'}
                        self.assertEqual(req('/mcp',rpc)[0],401)
                        self.assertEqual(req('/mcp',rpc,{'Authorization':'Bearer '+current})[0],200)
                        self.assertEqual(req('/mcp',rpc,{'Host':f'wizard-notes:{port}'})[0],200)
                        same={'Host':'owner.example.invalid','Origin':'https://owner.example.invalid'}
                        self.assertEqual(req('/api/today',{},same)[0],200)
                        self.assertEqual(req('/api/today',{},{'Host':'owner.example.invalid','Origin':'https://foreign.example.invalid'})[0],403)
                    finally:
                        service.terminate();service.wait(timeout=5)

if __name__=='__main__':unittest.main()
