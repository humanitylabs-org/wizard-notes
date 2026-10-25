#!/usr/bin/env python3
"""Explicit local admission using stock WAM/Runtipi; never targets a legacy app id.

Release images must already be available in the daemon. The Alpha Store is the
normal installation path. This helper keeps local development/update tooling
portable and takes every machine-specific setting through arguments.
"""
import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path

p=argparse.ArgumentParser()
p.add_argument('--wam-source',type=Path,required=True)
p.add_argument('--runtipi-root',type=Path,required=True)
p.add_argument('--host',default='')
p.add_argument('--origin',default='')
p.add_argument('--port',type=int,required=True,help='Explicit unused loopback port; never choose a live app port')
p.add_argument('--stage-only',action='store_true')
p.add_argument('--update',action='store_true')
a=p.parse_args()
root=Path(__file__).resolve().parents[1]
commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()
if subprocess.check_output(['git','status','--porcelain'],cwd=root,text=True).strip():raise SystemExit('Source must be committed and clean.')
sys.path.insert(0,str(a.wam_source))
from wam.builder import check_app,source_hash
from wam.cli import Config,write_registry
check=check_app(root)
if not check['ok']:raise SystemExit(json.dumps(check))
app_id='wizard-notes'
urn=app_id+':wizardapps'
store=a.runtipi_root/'repos/wizardapps/apps'/app_id
previous=(store/'.wizard-commit').read_text().strip() if (store/'.wizard-commit').exists() else None
release=store/'releases'/commit
if not release.exists():
    release.parent.mkdir(parents=True,exist_ok=True)
    shutil.copytree(root,release,ignore=shutil.ignore_patterns('.git','.data','__pycache__','*.pyc'))
    for file in release.rglob('*'):file.chmod(0o555 if file.is_dir() else 0o444)
    release.chmod(0o555)
(store/'metadata').mkdir(parents=True,exist_ok=True)
for src,dst in [('wizard.md','wizard.md'),('skill/SKILL.md','SKILL.md'),('runtipi/config.json','config.json'),('runtipi/docker-compose.yml','docker-compose.yml'),('runtipi/metadata/logo.jpg','metadata/logo.jpg'),('README.md','metadata/description.md')]:shutil.copy2(root/src,store/dst)
(store/'.wizard-commit').write_text(commit+'\n')
(store/'.wizard-source').write_text(json.dumps({'repo':'humanitylabs-org/wizard-notes','local':True,'source_hash':source_hash(root)})+'\n')
receipt={'id':app_id,'urn':urn,'commit':commit,'previous_release':previous,'release':str(release),'port':a.port}
if not a.stage_only:
    config=Config();runtime=config.runtipi()
    existing=next((r for r in runtime.installed() if (r.get('info') or {}).get('urn')==urn),None)
    form={'openPort':False,'exposed':False,'exposedLocal':False,'port':a.port,'WIZARD_TRUSTED_HOSTS':a.host,'WIZARD_TRUSTED_ORIGINS':a.origin}
    if existing:
        if not a.update:raise SystemExit('Already installed. Use --update, never duplicate it.')
        receipt['config_result']=runtime.req('PATCH','/app-lifecycle/'+urn+'/update-config',form,timeout=120)
        receipt['update_result']=runtime.update(urn,perform_backup=False)
    else:
        if a.update:raise SystemExit('Not installed.')
        receipt['install_result']=runtime.install(urn,form)
    receipt['app_readback']=runtime.app(urn)
    try:write_registry(config,runtime)
    except PermissionError:subprocess.run(['wam','apps','--json'],check=True,capture_output=True)
print(json.dumps(receipt,indent=2))
