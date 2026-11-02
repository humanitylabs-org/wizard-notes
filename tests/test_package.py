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
                        # Deadline, not a fixed try count: emulated cross-arch builds start slowly.
                        deadline=time.monotonic()+15
                        while time.monotonic()<deadline:
                            if service.poll() is not None:self.fail(service.stderr.read().decode())
                            try:
                                if req('/healthz')[0]==200:break
                            except OSError:pass
                            time.sleep(.05)
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
                        self.assertEqual(req('/gateway/mcp',rpc,{'Host':f'wizard-notes:{port}'})[0],200)
                        self.assertEqual(req('/gateway/mcp',rpc)[0],200)
                        same={'Host':'owner.example.invalid','Origin':'https://owner.example.invalid'}
                        self.assertEqual(req('/api/today',{},same)[0],200)
                        self.assertEqual(req('/api/today',{},{'Host':'owner.example.invalid','Origin':'https://foreign.example.invalid'})[0],403)
                    finally:
                        service.terminate();service.wait(timeout=5)

    def test_vault_folder_and_runtime_ids_are_validated(self):
        root=Path(__file__).resolve().parents[1]
        with tempfile.TemporaryDirectory(prefix='notes-package-',dir=os.environ.get('TMPDIR')) as data:
            for extra,needle in [({'NOTES_VAULT_DIR':'relative/vault'},'absolute'),({'NOTES_VAULT_DIR':data+'/missing'},'mount it first'),({'NOTES_UID':'oscar'},'numeric')]:
                with self.subTest(**extra):
                    r=subprocess.run([sys.executable,str(root/'start.py')],env={**os.environ,'DATA_DIR':data,'HOST':'127.0.0.1','PORT':'0',**extra},capture_output=True,text=True,timeout=15)
                    self.assertNotEqual(r.returncode,0);self.assertIn(needle,r.stderr)
                    self.assertFalse((Path(data)/'vault').exists())
    def test_existing_vault_folder_is_served(self):
        with tempfile.TemporaryDirectory(prefix='notes-package-',dir=os.environ.get('TMPDIR')) as data, tempfile.TemporaryDirectory(prefix='notes-obsidian-',dir=os.environ.get('TMPDIR')) as vault:
            (Path(vault)/'Shopping').mkdir();(Path(vault)/'Shopping/List.md').write_text('# List\n',encoding='utf-8');(Path(vault)/'.obsidian').mkdir()
            with socket.socket() as probe:
                probe.bind(('127.0.0.1',0));port=probe.getsockname()[1]
            env={**os.environ,'DATA_DIR':data,'NOTES_VAULT_DIR':vault,'HOST':'127.0.0.1','PORT':str(port)}
            with subprocess.Popen([sys.executable,str(Path(__file__).resolve().parents[1]/'start.py')],env=env,stdout=subprocess.PIPE,stderr=subprocess.PIPE) as service:
                try:
                    deadline=time.monotonic()+15
                    while time.monotonic()<deadline:
                        if service.poll() is not None:self.fail(service.stderr.read().decode())
                        try:
                            with urlopen('http://127.0.0.1:'+str(port)+'/api/tree',timeout=2) as r:tree=json.loads(r.read());break
                        except OSError:time.sleep(.05)
                    else:self.fail('No response')
                    self.assertEqual([n['path'] for n in tree['children']],['Shopping'])
                    self.assertEqual(tree['children'][0]['children'][0]['path'],'Shopping/List.md')
                    self.assertFalse((Path(data)/'vault').exists())
                    self.assertTrue((Path(data)/'agent.token').exists())
                finally:
                    service.terminate();service.wait(timeout=5)

    def run_startup(self,extra):
        # No real chown, identity/capability changes, or server exec, even when run as root.
        from contextlib import ExitStack
        from unittest.mock import patch
        import runpy
        with ExitStack() as stack:
            stack.enter_context(patch.dict(os.environ,extra,clear=True))
            calls={name:stack.enter_context(patch('os.'+name)) for name in ('chown','setgroups','setgid','setuid','execv')}
            stack.enter_context(patch('os.geteuid',return_value=0))
            runpy.run_path(str(Path(__file__).resolve().parents[1]/'start.py'),run_name='__main__')
            return calls

    def test_invalid_runtime_ids_fail_before_startup_mutations(self):
        from unittest.mock import patch
        for name in ('NOTES_UID','NOTES_GID'):
            for value in ('-1','4294967295','999999999999999999999','9'*5000,'١٢٣','１２３','²','abc'):
                with self.subTest(name=name,value=value[:24]), tempfile.TemporaryDirectory(prefix='notes-invalid-id-',dir=os.environ.get('TMPDIR')) as data:
                    with patch.object(Path,'mkdir') as mkdir, patch.object(Path,'iterdir') as iterdir:
                        with self.assertRaisesRegex(SystemExit,name):self.run_startup({'DATA_DIR':data,name:value})
                        mkdir.assert_not_called();iterdir.assert_not_called()
                    self.assertEqual(list(Path(data).iterdir()),[])

    def test_runtime_ids_default_zero_and_maximum_and_no_recursive_chown(self):
        for extra,ids in [({},(1000,1000)),({'NOTES_UID':'0','NOTES_GID':'0'},(0,0)),({'NOTES_UID':'1234','NOTES_GID':'2345'},(1234,2345)),({'NOTES_UID':'4294967294','NOTES_GID':'4294967294'},(4294967294,4294967294))]:
            with self.subTest(ids=ids), tempfile.TemporaryDirectory(prefix='notes-startup-',dir=os.environ.get('TMPDIR')) as data:
                root=Path(data);(root/'agent.token').write_text('synthetic')
                (root/'.initialized').touch();vault=root/'vault';vault.mkdir();(vault/'Kept.md').write_text('synthetic')
                (root/'linked-token').symlink_to(vault/'Kept.md')
                calls=self.run_startup({'DATA_DIR':data,'NOTES_VAULT_DIR':str(vault),**extra})
                self.assertEqual({Path(c.args[0]) for c in calls['chown'].call_args_list},{root,root/'agent.token',root/'.initialized'})
                for call in calls['chown'].call_args_list:self.assertEqual(call.args[1:],ids)
                calls['setgroups'].assert_called_once_with([])
                calls['setuid'].assert_called_once_with(ids[0]);calls['setgid'].assert_called_once_with(ids[1])
                calls['execv'].assert_called_once()
                self.assertEqual((vault/'Kept.md').read_text(),'synthetic')

if __name__=='__main__':unittest.main()
