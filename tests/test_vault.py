import importlib.util
import json
import os
import tempfile
import threading
import unittest
from datetime import datetime, timezone, timedelta
from pathlib import Path
from unittest.mock import patch
from urllib.request import Request, urlopen
from urllib.error import HTTPError

spec=importlib.util.spec_from_file_location('notes',Path(__file__).resolve().parents[1]/'app/server.py')
s=importlib.util.module_from_spec(spec);spec.loader.exec_module(s)

class VaultTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory(prefix='notes-',dir=os.environ.get('TMPDIR'))
        self.v=s.Vault(self.temp.name)
    def tearDown(self):self.temp.cleanup()
    def bad(self,fn,status=400):
        with self.assertRaises(s.Problem) as c:fn()
        self.assertEqual(c.exception.status,status)
    def test_seed_and_no_reseed(self):
        self.assertEqual(set(p.name for p in self.v.root.iterdir()),{'Inbox','Welcome.md'})
        self.v.delete('Welcome.md');s.Vault(self.temp.name)
        self.assertFalse((self.v.root/'Welcome.md').exists())
    def test_paths(self):
        for p in ['../x.md','/x.md','a/../b.md','.secret.md','a//b.md','a\\b.md','a/.hidden/b.md','a\x00.md','C:/x.md','a/.','a/..','']:
            with self.subTest(path=p):self.bad(lambda:self.v.write(p,'x',create=True))
        self.bad(lambda:self.v.write('bad.txt','x',create=True))
        (self.v.root/'sym').symlink_to(Path(self.temp.name),target_is_directory=True)
        self.bad(lambda:self.v.write('sym/a.md','x',create=True))
        self.assertNotIn('sym',str(self.v.tree()))
    def test_atomic(self):
        n=self.v.write('A.md','before',create=True)
        real=os.replace
        def observe(a,b):
            self.assertEqual(Path(b).read_text(),'before')
            self.assertEqual(Path(a).read_text(),'after')
            return real(a,b)
        with patch.object(s.os,'replace',side_effect=observe):self.v.write('A.md','after',n['rev'])
        self.assertEqual(self.v.read('A.md')['content'],'after')
        self.assertFalse(list(self.v.root.glob('.write-*')))
    def test_atomic_failure_preserves_original(self):
        n=self.v.write('A.md','before',create=True)
        with patch.object(s.os,'replace',side_effect=OSError('disk')):
            with self.assertRaises(OSError):self.v.write('A.md','after',n['rev'])
        self.assertEqual(self.v.read('A.md')['content'],'before')
        self.assertFalse(list(self.v.root.glob('.write-*')))
    def test_revision_conflict_append(self):
        n=self.v.write('A.md','one',create=True)
        self.bad(lambda:self.v.write('A.md','wrong'),409)
        new=self.v.write('A.md',' two',n['rev'],append=True)
        self.assertEqual(new['content'],'one two')
        self.bad(lambda:self.v.write('A.md','old',n['rev']),409)
        self.bad(lambda:self.v.write('A.md','x',create=True),409)
        (self.v.root/'A.md').write_text('external')
        self.bad(lambda:self.v.write('A.md','wrong',new['rev']),409)
    def test_folders_move_rename_collisions(self):
        self.v.mkdir('Work');self.v.mkdir('Work/One');self.v.mkdir('Work/One/Two')
        self.v.write('Work/One/Two/Idea.md','x',create=True)
        self.v.move('Work/One','Inbox/One')
        self.assertEqual(self.v.read('Inbox/One/Two/Idea.md')['content'],'x')
        self.v.move('Inbox/One/Two/Idea.md','Inbox/Renamed.md')
        self.bad(lambda:self.v.move('Inbox/Renamed.md','Welcome.md'),409)
        self.bad(lambda:self.v.move('Inbox','Inbox/One/Nope'))
        self.bad(lambda:self.v.move('Inbox/Renamed.md','Inbox/x.txt'))
    def test_trash_restore(self):
        self.v.mkdir('Work');self.v.write('Work/A.md','preserve',create=True)
        r=self.v.delete('Work')
        self.assertNotIn('Work',str(self.v.tree()))
        self.assertEqual((self.v.root/'.trash'/r['trash_id']/'Work/A.md').read_text(),'preserve')
        self.v.restore(r['trash_id'])
        self.assertEqual(self.v.read('Work/A.md')['content'],'preserve')
        self.bad(lambda:self.v.restore('../x'))
    def test_search_ranking_external_changes(self):
        self.v.write('Term.md','plain',create=True);self.v.write('A.md','body term only',create=True)
        hits=self.v.search('term')['notes']
        self.assertEqual([h['path'] for h in hits],['Term.md','A.md'])
        self.assertIn('term',hits[1]['snippet'])
        (self.v.root/'A.md').write_text('new external phrase')
        self.assertEqual(self.v.search('external')['notes'][0]['path'],'A.md')
        self.assertTrue(self.v.search()['notes'])
    def test_tree_modified_metadata(self):
        self.v.mkdir('Tree');self.v.write('Tree/Leaf.md','x',create=True)
        tree=self.v.tree()['children'];folder=next(n for n in tree if n['path']=='Tree')
        self.assertIsInstance(folder['modified'],int)
        self.assertEqual(folder['children'][0]['modified'],(self.v.root/'Tree/Leaf.md').stat().st_mtime_ns)
    def test_wikilinks_backlinks(self):
        self.v.mkdir('Work');self.v.write('Work/Target.md','target',create=True)
        self.v.write('Source.md','[[target|alias]] and [[Work/Target]]',create=True)
        self.assertEqual(self.v.resolve('TARGET','Source.md')['path'],'Work/Target.md')
        self.assertEqual(self.v.resolve('Work/Target|alias','Source.md')['path'],'Work/Target.md')
        self.assertIsNone(self.v.resolve('Missing')['path'])
        self.assertEqual(self.v.backlinks('Work/Target.md')['notes'],[{'path':'Source.md','title':'Source'}])
        self.v.write('Target.md','local',create=True)
        self.assertEqual(self.v.resolve('Target','Source.md')['path'],'Target.md')
        self.assertEqual(self.v.resolve('Target','Work/Other.md')['path'],'Work/Target.md')
    def test_today_idempotent_bangkok(self):
        expected=datetime.now(timezone(timedelta(hours=7))).date().isoformat()
        a=self.v.today();b=self.v.today()
        self.assertEqual(a['path'],'Daily/'+expected+'.md');self.assertEqual(a['rev'],b['rev'])
    def test_restart(self):
        self.v.write('Persist.md','still here',create=True)
        self.assertEqual(s.Vault(self.temp.name).read('Persist.md')['content'],'still here')

class HttpTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp=tempfile.TemporaryDirectory(prefix='notes-http-',dir=os.environ.get('TMPDIR'))
        s.VAULT=s.Vault(cls.temp.name)
        cls.server=s.ThreadingHTTPServer(('127.0.0.1',0),s.Handler)
        cls.port=cls.server.server_port
        s.HOSTS.add('127.0.0.1:'+str(cls.port))
        cls.thread=threading.Thread(target=cls.server.serve_forever,daemon=True);cls.thread.start()
    @classmethod
    def tearDownClass(cls):cls.server.shutdown();cls.server.server_close();cls.thread.join();cls.temp.cleanup()
    def req(self,path,body=None,method=None,headers=None):
        h={'Content-Type':'application/json',**(headers or {})}
        req=Request('http://127.0.0.1:'+str(self.port)+path,data=None if body is None else json.dumps(body).encode(),headers=h,method=method)
        try:
            with urlopen(req) as r:return r.status,json.loads(r.read() or b'{}')
        except HTTPError as e:
            with e:return e.code,json.loads(e.read())
    def test_api_conflicts_safety_and_crud(self):
        self.assertEqual(self.req('/healthz')[0],200)
        self.assertEqual(self.req('/api/tree',headers={'Host':'evil.test'})[0],403)
        self.assertEqual(self.req('/api/note',{'path':'X.md','content':'x'},headers={'Origin':'https://evil.test'})[0],403)
        code,n=self.req('/api/note',{'path':'X.md','content':'alpha'})
        self.assertEqual(code,201)
        self.assertEqual(self.req('/api/note',{'path':'X.md','content':'wrong','rev':'stale'},'PUT')[0],409)
        self.assertEqual(self.req('/api/note',{'path':'X.md','content':'beta','rev':n['rev']},'PUT')[0],200)
        self.assertEqual(self.req('/api/note?path=X.md')[1]['content'],'beta')
        self.assertEqual(self.req('/api/folder',{'path':'Folder'})[0],200)
        self.assertEqual(self.req('/api/move',{'from':'X.md','to':'Folder/X.md'})[0],200)
        self.assertEqual(self.req('/api/search?q=beta')[1]['notes'][0]['path'],'Folder/X.md')
        code,r=self.req('/api/delete',{'path':'Folder/X.md'});self.assertEqual(code,200)
        self.assertEqual(self.req('/api/restore',{'trash_id':r['trash_id']})[0],200)
    def test_private_host_allowlist_denies_loopback_mcp(self):
        rpc={'jsonrpc':'2.0','id':1,'method':'tools/list'}
        with patch.object(s,'HOSTS',{'vault.example.invalid'}),patch.object(s,'ORIGINS',{'https://vault.example.invalid'}):
            self.assertEqual(self.req('/mcp',rpc)[0],403)
            self.assertEqual(self.req('/mcp',rpc,headers={'Host':'localhost:'+str(self.port)})[0],403)
            self.assertEqual(self.req('/mcp',rpc,headers={'Host':'vault.example.invalid'})[0],200)
            self.assertEqual(self.req('/api/note',{'path':'Denied.md','content':'x'},headers={'Host':'vault.example.invalid','Origin':'https://foreign.example.invalid'})[0],403)

    def test_mcp_direct_credential_and_gateway_route(self):
        rpc={'jsonrpc':'2.0','id':1,'method':'tools/list'}
        with patch.object(s,'MCP_TOKEN','fixture-not-a-credential'):
            self.assertEqual(self.req('/mcp',rpc)[0],401)
            self.assertEqual(self.req('/mcp',rpc,headers={'Authorization':'Bearer fixture-not-a-credential'})[0],200)
            self.assertEqual(self.req('/mcp',rpc,headers={'Host':s.INTERNAL_HOST})[0],200)
            self.assertEqual(self.req('/mcp',rpc,headers={'Host':s.INTERNAL_HOST,'Origin':'https://foreign.example.invalid'})[0],403)

    def test_mcp(self):
        def rpc(method,params={}):return self.req('/mcp',{'jsonrpc':'2.0','id':1,'method':method,'params':params})[1]['result']
        self.assertEqual(rpc('initialize')['serverInfo']['name'],'notes')
        self.assertEqual(len(rpc('tools/list')['tools']),7)
        result=rpc('tools/call',{'name':'notes_write','arguments':{'path':'MCP.md','content':'tool proof','create':True}})
        self.assertFalse(result['isError'])
        self.assertEqual(rpc('tools/call',{'name':'notes_read','arguments':{'path':'MCP.md'}})['structuredContent']['content'],'tool proof')
        self.assertTrue(rpc('tools/call',{'name':'notes_write','arguments':{'path':'MCP.md','content':'wrong','rev':'stale'}})['isError'])

if __name__=='__main__':unittest.main()
