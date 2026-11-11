"""Cheap release contract and tracked-source portability checks."""
import ast
import json
import re
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[1]
config = json.loads((root/'runtipi/config.json').read_text())
version = config['version']
manifest = (root/'wizard.md').read_text()
assert config['id'] == 'wizard-notes' and 'id: wizard-notes\n' in manifest
assert 'name: Wizard Notes\n' in manifest and 'privacy: private\n' in manifest
assert not re.search(r'^shares:', manifest, re.M)
assert 'version: '+version+'\n' in manifest
assert 'ghcr.io/humanitylabs-org/wizard-notes:'+version+'\n' in (root/'runtipi/docker-compose.yml').read_text()
def unique_keys(pairs):
    # A merge can leave a JSON key twice; json.loads would silently keep the last one.
    keys = [k for k, _ in pairs]
    dupes = sorted({k for k in keys if keys.count(k) > 1})
    assert not dupes, 'Duplicate JSON keys: '+', '.join(dupes)
    return dict(pairs)
for name in ['openapi.json', 'runtipi/config.json', 'package.json']:
    json.loads((root/name).read_text(), object_pairs_hook=unique_keys)
assert json.loads((root/'openapi.json').read_text())['info']['version'] == version
module = ast.parse((root/'app/server.py').read_text())
def no_duplicate_defs(body, where):
    # A later def silently replaces an earlier one with the same name.
    names = [n.name for n in body if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef))]
    dupes = sorted({n for n in names if names.count(n) > 1})
    assert not dupes, f'Duplicate definitions in {where}: '+', '.join(dupes)
no_duplicate_defs(module.body, 'app/server.py')
for node in module.body:
    if isinstance(node, ast.ClassDef): no_duplicate_defs(node.body, 'app/server.py class '+node.name)
assert any(isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='VERSION' for t in n.targets) and ast.literal_eval(n.value)==version for n in module.body)
assert any(isinstance(n,ast.ClassDef) and n.name=='Vault' and sum(isinstance(f,ast.FunctionDef) and f.name=='path' for f in n.body)==1 for n in module.body)
for field in config['form_fields']:
    assert not field.get('required') or 'default' in field or field['type']=='password'
# Construct machine markers from pieces so the guard also checks its own source.
forbidden = ['/'+'home'+'/'+'telos', 'tail'+'c0f369', 'wizard'+'001', 't'+'s.net']
files = subprocess.check_output(['git','ls-files','-z'],cwd=root).decode().split('\0')
failures=[]
for name in filter(None,files):
    file=root/name
    try: text=file.read_text()
    except UnicodeError: continue
    for i,line in enumerate(text.splitlines(),1):
        if any(marker in line for marker in forbidden): failures.append(f'{name}:{i}')
assert not failures, 'Nonportable tracked source: '+', '.join(failures)
print('PASS: release versions, private manifest, no shares, install defaults, central path gate and tracked-source portability')
