"""Notes: a plain Markdown vault. HTTP and MCP use the same locked service.
Gateway owns owner authentication; this service enforces Host/Origin confinement.
"""
import hashlib
import json
import mimetypes
import os
import re
import secrets
import threading
import uuid
from datetime import datetime, timezone, timedelta
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PORT = int(os.environ.get('PORT', '8799'))
VERSION = '0.1.0-alpha.1'
# Explicit allowlists replace development defaults, never silently re-add loopback.
HOSTS = set(filter(None, os.environ.get('WIZARD_TRUSTED_HOSTS', '').split(',')))
ORIGINS = set(filter(None, os.environ.get('WIZARD_TRUSTED_ORIGINS', '').split(',')))
MCP_TOKEN = ''
INTERNAL_HOST = f'wizard-notes:{PORT}'
WIKI = re.compile(r'\[\[([^\]\n]+)\]\]')

class Problem(Exception):
    def __init__(self, status, message): self.status, self.message = status, message

class Vault:
    def __init__(self, data):
        self.root = Path(data) / 'vault'
        self.root.mkdir(parents=True, exist_ok=True)
        self.lock = threading.RLock()
        self.cache = {}
        marker = Path(data) / '.initialized'
        if not marker.exists():
            if not any(self.root.iterdir()):
                (self.root / 'Inbox').mkdir()
                (self.root / 'Welcome.md').write_text('# A place to think\n\nNotes are plain Markdown files. Make folders, nest them, and organise them your way.\n\nConnect thoughts with [[Welcome]] or [[A new thought|a friendly label]]. Search finds titles and the words inside your notes.\n\nToday opens a daily note, dated in Bangkok. Everything stays in your vault, ready for Obsidian.\n', encoding='utf-8')
            marker.touch()

    def path(self, value, root=False):
        if not isinstance(value, str) or '\\' in value or '\x00' in value or len(value) > 1024:
            raise Problem(400, 'Invalid path.')
        if value == '' and root: return self.root
        parts = value.split('/')
        if any(not p or p.startswith('.') or any(ord(c) < 32 for c in p) or ':' in p or len(p.encode()) > 240 for p in parts):
            raise Problem(400, 'Use visible relative names without dot segments.')
        path = self.root
        for part in parts:
            path = path / part
            if path.is_symlink(): raise Problem(400, 'Symbolic links are not allowed.')
        if not path.resolve().is_relative_to(self.root.resolve()): raise Problem(400, 'Outside vault.')
        return path

    def note_path(self, value):
        p = self.path(value)
        if p.suffix != '.md': raise Problem(400, 'Notes must end in .md.')
        return p

    def read(self, path):
        with self.lock:
            p = self.note_path(path)
            if not p.is_file(): raise Problem(404, 'Note not found.')
            raw = p.read_bytes()
            return {'path':path, 'title':p.stem, 'content':raw.decode('utf-8'), 'rev':hashlib.sha256(raw).hexdigest()}

    def write(self, path, content='', rev=None, create=False, append=False):
        with self.lock:
            p = self.note_path(path)
            if not isinstance(content, str) or len(content.encode('utf-8')) > 2_000_000: raise Problem(400, 'Note must be text, at most 2 MB.')
            if not p.parent.is_dir(): raise Problem(404, 'Parent folder not found.')
            if p.exists():
                current = self.read(path)
                if create: raise Problem(409, 'A note already has that name.')
                if not rev or current['rev'] != rev: raise Problem(409, 'Note changed elsewhere. Re-read and reconcile before saving.')
                if append: content = current['content'] + content
            elif not create: raise Problem(404, 'Note not found. Create it explicitly.')
            temp = p.parent / ('.write-' + uuid.uuid4().hex)
            try:
                with temp.open('xb') as f:
                    f.write(content.encode('utf-8')); f.flush(); os.fsync(f.fileno())
                os.replace(temp, p)
                fd = os.open(p.parent, os.O_RDONLY)
                try: os.fsync(fd)
                finally: os.close(fd)
            finally:
                temp.unlink(missing_ok=True)
            return self.read(path)

    def mkdir(self, path):
        with self.lock:
            p = self.path(path)
            if p.exists(): raise Problem(409, 'That name already exists.')
            if not p.parent.is_dir(): raise Problem(404, 'Parent folder not found.')
            p.mkdir()
            return {'path':path}

    def move(self, source, target):
        with self.lock:
            a, b = self.path(source), self.path(target)
            if not a.exists(): raise Problem(404, 'Not found.')
            if a == b: return {'path':target}
            if b.exists(): raise Problem(409, 'That name already exists.')
            if not b.parent.is_dir(): raise Problem(404, 'Destination folder not found.')
            if a.is_file():
                self.note_path(source); self.note_path(target)
            if b.is_relative_to(a): raise Problem(400, 'Cannot move a folder into itself.')
            a.rename(b)
            return {'path':target}

    def delete(self, path):
        with self.lock:
            p = self.path(path)
            if not p.exists(): raise Problem(404, 'Not found.')
            if p.is_file(): self.note_path(path)
            trash = self.root / '.trash'
            trash.mkdir(exist_ok=True)
            tid = uuid.uuid4().hex
            slot = trash / tid
            slot.mkdir()
            (slot / 'original.json').write_text(json.dumps({'path':path}), encoding='utf-8')
            p.rename(slot / p.name)
            return {'trashed':path, 'trash_id':tid}

    def restore(self, trash_id):
        with self.lock:
            if not isinstance(trash_id, str) or not re.fullmatch('[a-f0-9]{32}', trash_id): raise Problem(400, 'Invalid trash id.')
            slot = self.root / '.trash' / trash_id
            if not (slot / 'original.json').is_file(): raise Problem(404, 'Trash entry not found.')
            original = json.loads((slot / 'original.json').read_text())['path']
            dest = self.path(original)
            if dest.exists(): raise Problem(409, 'Original name is occupied.')
            if not dest.parent.is_dir(): raise Problem(409, 'Restore the parent folder first.')
            (slot / dest.name).rename(dest)
            (slot / 'original.json').unlink(); slot.rmdir()
            return {'path':original}

    def index(self):
        result = []
        def scan(folder):
            try: entries = sorted(folder.iterdir(), key=lambda p: (not p.is_dir(), p.name.casefold(), p.name))
            except FileNotFoundError: return []
            children = []
            for p in entries:
                if p.name.startswith('.') or p.is_symlink(): continue
                rel = p.relative_to(self.root).as_posix()
                if p.is_dir(): children.append({'path':rel,'name':p.name,'type':'folder','modified':p.stat().st_mtime_ns,'children':scan(p)})
                elif p.suffix == '.md':
                    stat = p.stat(); stamp = (stat.st_mtime_ns, stat.st_size)
                    cached = self.cache.get(rel)
                    if not cached or cached[0] != stamp:
                        cached = (stamp, self.read(rel))
                        self.cache[rel] = cached
                    n = dict(cached[1], modified=stat.st_mtime_ns)
                    result.append(n)
                    children.append({'path':rel,'name':p.stem,'type':'note','modified':stat.st_mtime_ns})
            return children
        tree = scan(self.root)
        live = {n['path'] for n in result}
        self.cache = {k:v for k,v in self.cache.items() if k in live}
        return tree, result

    def tree(self):
        with self.lock: return {'children':self.index()[0]}

    def search(self, q=''):
        if not isinstance(q,str): raise Problem(400, 'Query must be text.')
        q = q.strip().casefold()
        with self.lock:
            notes = self.index()[1]
            out = []
            for n in notes:
                title, body = n['title'].casefold(), n['content'].casefold()
                if q and q not in title and q not in body: continue
                rank = 0 if title == q else 1 if title.startswith(q) else 2 if q in title else 3
                at = body.find(q) if q else 0
                start = max(0, at - 55)
                snippet = n['content'][start:start+180].replace('\n',' ')
                out.append({'path':n['path'],'title':n['title'],'snippet':('…' if start else '')+snippet,'rank':rank,'modified':n['modified']})
            out.sort(key=(lambda n:(n['rank'],n['title'].casefold(),n['path'])) if q else (lambda n:-n['modified']))
            return {'notes':out[:100]}

    def resolve(self, target, current=''):
        target = target.split('|')[0].split('#')[0].strip()
        if target.endswith('.md'): target = target[:-3]
        self.path(target + '.md')
        notes = self.index()[1]
        local = ((current.rsplit('/',1)[0]+'/') if '/' in current else '') + target + '.md'
        for candidate in [local, target+'.md']:
            match = next((n for n in notes if n['path'].casefold() == candidate.casefold()), None)
            if match: return {'path':match['path']}
        matches = sorted((n for n in notes if n['title'].casefold() == target.casefold()),key=lambda n:n['path'])
        return {'path':matches[0]['path'] if matches else None,'target':target}

    def backlinks(self, path):
        with self.lock:
            self.read(path)
            notes = self.index()[1]
            linked = []
            for n in notes:
                if n['path'] == path: continue
                if any(self.resolve(m.group(1),n['path'])['path'] == path for m in WIKI.finditer(n['content'])):
                    linked.append({'path':n['path'],'title':n['title']})
            return {'notes':linked}

    def today(self):
        with self.lock:
            daily = self.path('Daily')
            if not daily.exists(): daily.mkdir()
            date = datetime.now(timezone(timedelta(hours=7))).date().isoformat()
            path = 'Daily/'+date+'.md'
            if not self.note_path(path).exists(): self.write(path,'',create=True)
            return self.read(path)

VAULT = None

def service(action, args):
    if not isinstance(args,dict): raise Problem(400,'Expected an object.')
    with VAULT.lock:
        if action == 'tree': return VAULT.tree()
        if action == 'read': return VAULT.read(args.get('path'))
        if action == 'search': return VAULT.search(args.get('q',''))
        if action == 'write': return VAULT.write(args.get('path'),args.get('content',''),args.get('rev'),args.get('create',False),args.get('append',False))
        if action == 'mkdir': return VAULT.mkdir(args.get('path'))
        if action == 'move': return VAULT.move(args.get('from'),args.get('to'))
        if action == 'delete': return VAULT.delete(args.get('path'))
        if action == 'restore': return VAULT.restore(args.get('trash_id'))
        if action == 'backlinks': return VAULT.backlinks(args.get('path'))
        if action == 'resolve': return VAULT.resolve(args.get('target',''),args.get('current',''))
        if action == 'today': return VAULT.today()
        raise Problem(404,'Unknown action.')

SCHEMAS = {
    'tree':({},[],'List nested folders and Markdown notes.'),
    'read':({'path':{'type':'string'}},['path'],'Read a note and its revision before writing.'),
    'search':({'q':{'type':'string'}},[],'Find titles first, then words in notes. Empty query returns recent notes.'),
    'write':({'path':{'type':'string'},'content':{'type':'string'},'rev':{'type':'string'},'create':{'type':'boolean'},'append':{'type':'boolean'}},['path','content'],'Create with create=true, or update/append with the revision from notes_read. Conflicts require rereading and reconciling.'),
    'move':({'from':{'type':'string'},'to':{'type':'string'}},['from','to'],'Move or rename a note/folder; never overwrite a collision. Wikilinks are not rewritten.'),
    'mkdir':({'path':{'type':'string'}},['path'],'Create one folder inside an existing folder.'),
    'delete':({'path':{'type':'string'}},['path'],'Move to recoverable trash. Only when the owner explicitly asks.'),
}
TOOLS = [{'name':'notes_'+name,'description':desc,'inputSchema':{'type':'object','properties':props,'required':req,'additionalProperties':False}} for name,(props,req,desc) in SCHEMAS.items()]

def rpc(body):
    if not isinstance(body,dict): raise Problem(400,'Expected a JSON-RPC object.')
    if 'id' not in body: return None
    method, params = body.get('method'), body.get('params') or {}
    if method == 'initialize': out = {'protocolVersion':'2025-06-18','capabilities':{'tools':{}},'serverInfo':{'name':'notes','version':VERSION}}
    elif method == 'ping': out = {}
    elif method == 'tools/list': out = {'tools':TOOLS}
    elif method == 'tools/call':
        try:
            name = params.get('name','')
            if name not in {t['name'] for t in TOOLS}: raise Problem(400,'Unknown tool.')
            value = service(name.removeprefix('notes_'),params.get('arguments') or {})
            out = {'content':[{'type':'text','text':json.dumps(value)}],'structuredContent':value,'isError':False}
        except Problem as e: out = {'content':[{'type':'text','text':e.message}],'isError':True}
    else: return {'jsonrpc':'2.0','id':body['id'],'error':{'code':-32601,'message':'Unknown method.'}}
    return {'jsonrpc':'2.0','id':body['id'],'result':out}

class Handler(BaseHTTPRequestHandler):
    def send(self, status, value=None, mime='application/json'):
        raw = value if isinstance(value,bytes) else b'' if value is None else json.dumps(value).encode()
        self.send_response(status)
        for key,val in {'Content-Type':mime,'Content-Length':str(len(raw)),'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'"}.items(): self.send_header(key,val)
        self.end_headers()
        if self.command != 'HEAD': self.wfile.write(raw)

    def trusted(self, write=False):
        if urlsplit(self.path).path == '/healthz': return
        host = self.headers.get('Host','').lower()
        if not host or (HOSTS and host not in HOSTS and host != INTERNAL_HOST): raise Problem(403,'Unknown host.')
        origin = self.headers.get('Origin','')
        same_host = bool(origin and urlsplit(origin).scheme in {'http','https'} and urlsplit(origin).netloc.lower() == host)
        if (origin and origin not in ORIGINS and not same_host) or (write and not origin and self.headers.get('Sec-Fetch-Site') in {'cross-site','same-site'}):
            raise Problem(403,'Cross-origin writes refused.')

    def do_GET(self):
        try:
            self.trusted()
            url = urlsplit(self.path); path = unquote(url.path)
            args = {k:v[0] for k,v in parse_qs(url.query,keep_blank_values=True).items()}
            if path == '/healthz': return self.send(200,{'ok':True,'app':'notes','version':VERSION})
            actions = {'/api/tree':'tree','/api/note':'read','/api/search':'search','/api/backlinks':'backlinks','/api/resolve':'resolve'}
            if path in actions: return self.send(200,service(actions[path],args))
            if path == '/openapi.json': return self.send(200,(ROOT/'openapi.json').read_bytes())
            name = 'index.html' if path == '/' else path.lstrip('/')
            base = ROOT/'web'; file = (base/name).resolve()
            if file.is_relative_to(base) and not any(p.startswith('.') for p in Path(name).parts) and file.suffix in {'.html','.css','.js','.svg','.jpg','.png','.woff2'} and file.is_file():
                return self.send(200,file.read_bytes(),mimetypes.guess_type(file)[0] or 'application/octet-stream')
            raise Problem(404,'Not found.')
        except Problem as e: self.send(e.status,{'error':e.message})
        except (ValueError,TypeError,AttributeError,UnicodeError): self.send(400,{'error':'Invalid request.'})
        except OSError: self.send(503,{'error':'Vault unavailable. Your local draft is retained; retry.'})

    def do_HEAD(self): self.do_GET()
    def do_PUT(self): self.do_POST()
    def do_POST(self):
        try:
            self.trusted(True)
            if self.headers.get('Content-Type','').split(';')[0] != 'application/json': raise Problem(415,'Use application/json.')
            size = int(self.headers.get('Content-Length','0'))
            if not 0 < size <= 2_100_000: raise Problem(413,'Request too large.')
            body = json.loads(self.rfile.read(size))
            path = urlsplit(self.path).path
            if path in {'/mcp','/gateway/mcp'} and self.command == 'POST':
                # WAM's app bridge has no per-app bearer-header support. Its declared
                # endpoint is box-only behind owner ingress + agent-scoped gateway ACLs.
                # Browsers cannot use it. Direct integrations use /mcp + app credential.
                internal = path == '/gateway/mcp' and not self.headers.get('Origin') and not self.headers.get('Sec-Fetch-Site')
                if MCP_TOKEN and not internal and not secrets.compare_digest(self.headers.get('Authorization',''), 'Bearer '+MCP_TOKEN):
                    raise Problem(401,'MCP authorization required.')
                out = rpc(body); return self.send(202 if out is None else 200,out)
            if path == '/api/note':
                args = dict(body)
                args['create'] = self.command == 'POST'
                return self.send(201 if args['create'] else 200,service('write',args))
            actions = {'/api/folder':'mkdir','/api/move':'move','/api/delete':'delete','/api/restore':'restore','/api/today':'today'}
            if path in actions and self.command == 'POST': return self.send(200,service(actions[path],body))
            raise Problem(404,'Not found.')
        except Problem as e: self.send(e.status,{'error':e.message})
        except (ValueError,TypeError,AttributeError): self.send(400,{'error':'Invalid JSON request.'})
        except OSError: self.send(507,{'error':'Unable to write the vault. Your local draft is retained; retry.'})
    def log_message(self, fmt, *args): pass

if __name__ == '__main__':
    data = Path(os.environ.get('DATA_DIR',str(ROOT/'.data')))
    VAULT = Vault(data)
    credential = data/'agent.token'
    if not credential.exists():
        with open(credential,'x',opener=lambda path,flags: os.open(path,flags,0o600)) as f:
            f.write(secrets.token_urlsafe(32)+'\n')
    MCP_TOKEN = credential.read_text().strip()
    if not MCP_TOKEN: raise SystemExit('Empty MCP credential; restore app-data credential before starting.')
    ThreadingHTTPServer((os.environ.get('HOST','0.0.0.0'),PORT),Handler).serve_forever()
