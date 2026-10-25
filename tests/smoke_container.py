"""Exercise an already-built hardened image; no owner data and no model calls."""
import argparse
import json
import subprocess
import time
import urllib.error
import urllib.request
import uuid

p=argparse.ArgumentParser()
p.add_argument('--image',required=True)
p.add_argument('--context',default='colima')
a=p.parse_args()
docker=['docker','--context',a.context]
def run(*args):return subprocess.check_output([*docker,*args],text=True).strip()
name='wizard-notes-smoke-'+uuid.uuid4().hex[:12]
volume=name+'-data'
run('volume','create',volume)
try:
    # A new daemon volume is root-owned. Entry must prepare only /data then drop root.
    run('run','-d','--name',name,'--read-only','--tmpfs','/tmp','--cap-drop','ALL','--cap-add','CHOWN','--cap-add','SETUID','--cap-add','SETGID','--security-opt','no-new-privileges:true','--memory','128m','-p','127.0.0.1::8799','-v',volume+':/data',a.image)
    base='http://'+run('port',name,'8799/tcp').splitlines()[0]
    def request(path,body=None,headers=None):
        h={'Content-Type':'application/json',**(headers or {})}
        req=urllib.request.Request(base+path,data=None if body is None else json.dumps(body).encode(),headers=h)
        try:
            with urllib.request.urlopen(req,timeout=3) as response:return response.status,response.read()
        except urllib.error.HTTPError as error:return error.code,error.read()
    for attempt in range(40):
        try:
            if request('/healthz')[0]==200:break
        except OSError:pass
        time.sleep(.5)
    else:raise AssertionError('Container health did not become ready')
    assert b'Wizard Notes' in request('/')[1]
    credential=run('exec','--user','1000:1000',name,'python','-c',"from pathlib import Path;print(Path('/data/agent.token').read_text().strip())")
    rpc={'jsonrpc':'2.0','id':1,'method':'tools/list'}
    assert request('/mcp',rpc)[0]==401
    code,body=request('/mcp',rpc,{'Authorization':'Bearer '+credential})
    assert code==200 and len(json.loads(body)['result']['tools'])==7
    assert request('/api/note',{'path':'Denied.md','content':'x'},{'Origin':'https://foreign.example.invalid'})[0]==403
    assert request('/gateway/mcp',rpc,{'Host':'wizard-notes:8799'})[0]==200
    assert request('/gateway/mcp',rpc)[0]==200
    # Real CRUD and restart preserve the same file and credential.
    code,body=request('/api/note',{'path':'Smoke.md','content':'temporary fixture','create':True})
    assert code==201
    run('restart',name)
    # An ephemeral host port may be reassigned on restart; resolve it again.
    base='http://'+run('port',name,'8799/tcp').splitlines()[0]
    for attempt in range(40):
        try:
            if request('/healthz')[0]==200:break
        except OSError:pass
        time.sleep(.5)
    else:raise AssertionError('Container health did not return after restart')
    assert json.loads(request('/api/note?path=Smoke.md')[1])['content']=='temporary fixture'
    assert run('exec','--user','1000:1000',name,'python','-c',"from pathlib import Path;print(Path('/data/agent.token').read_text().strip())")==credential
    state=run('exec','--user','1000:1000',name,'python','-c',"from pathlib import Path;print(Path('/proc/1/status').read_text())")
    fields=dict(line.split(':',1) for line in state.splitlines() if ':' in line)
    assert set(fields['Uid'].split())=={'1000'} and int(fields['CapEff'].strip(),16)==0
    print(json.dumps({'passed':True,'image':a.image,'checks':['health','view','MCP 7 tools','tokenless 401','foreign-origin 403','internal gateway transport','CRUD restart retention','Uid 1000','CapEff 0','root-owned data mount']}))
finally:
    subprocess.run([*docker,'rm','-f',name],check=True,stdout=subprocess.DEVNULL)
    subprocess.run([*docker,'volume','rm',volume],check=True,stdout=subprocess.DEVNULL)
