"""Build exact-source per-architecture release archives on the configured worker."""
import argparse
import gzip
import hashlib
import json
import os
import shutil
import subprocess
import sys
import urllib.request
import urllib.error
from pathlib import Path

p=argparse.ArgumentParser()
p.add_argument('--commit',required=True)
p.add_argument('--output',type=Path,required=True)
p.add_argument('--context',default='colima')
p.add_argument('--builder',default='colima')
p.add_argument('--dry-run',action='store_true')
p.add_argument('--push-ghcr',action='store_true')
p.add_argument('--release-version',action='store_true',help='Publish immutable version only for a matching v* ref')
a=p.parse_args()
root=Path(__file__).resolve().parents[1]
if len(a.commit)!=40 or any(c not in '0123456789abcdef' for c in a.commit):p.error('Expected exact source SHA')
stamp=root/'.source-commit'
if stamp.exists():assert stamp.read_text().strip()==a.commit
else:
    assert subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()==a.commit
    assert not subprocess.check_output(['git','status','--porcelain'],cwd=root,text=True).strip()
version=json.loads((root/'runtipi/config.json').read_text())['version']
image='ghcr.io/humanitylabs-org/wizard-notes:'+version
docker=['docker','--context',a.context]
commands=[]
for arch in ['amd64','arm64']:
    commands.append([*docker,'buildx','build','--builder',a.builder,'--platform','linux/'+arch,'--label','org.opencontainers.image.source=https://github.com/humanitylabs-org/wizard-notes','--label','org.opencontainers.image.revision='+a.commit,'-t',image,'--load','.'])
if a.dry_run:
    print(json.dumps({'source':a.commit,'image':image,'commands':commands,'output':str(a.output),'architectures':['amd64','arm64']},indent=2));sys.exit(0)
if a.push_ghcr:
    registry='ghcr.io'
    repository='humanitylabs-org/wizard-notes'
    token_request=urllib.request.Request('https://'+registry+'/token?service='+registry+'&scope=repository:'+repository+':pull,push')
    # Anonymous tokens are refused (403) until the package exists, so a first publish must authenticate.
    if os.environ.get('GH_TOKEN'):token_request.add_header('Authorization','Basic '+__import__('base64').b64encode((os.environ.get('GITHUB_ACTOR','x')+':'+os.environ['GH_TOKEN']).encode()).decode())
    with urllib.request.urlopen(token_request) as response:
        read_token=json.load(response)['token']
    def exists(tag):
        request=urllib.request.Request('https://'+registry+'/v2/'+repository+'/manifests/'+tag,method='HEAD',headers={'Authorization':'Bearer '+read_token,'Accept':'application/vnd.oci.image.index.v1+json, application/vnd.docker.distribution.manifest.v2+json'})
        try:
            with urllib.request.urlopen(request):return True
        except urllib.error.HTTPError as error:
            if error.code!=404:raise
            return False
    if a.release_version:
        assert os.environ.get('GITHUB_REF')=='refs/tags/v'+version
        if exists(version):raise SystemExit('Refusing existing immutable image tag '+version)
    shas=['sha-'+a.commit]+['sha-'+a.commit+'-'+arch for arch in ['amd64','arm64']]
    built=[tag for tag in shas if exists(tag)]
    if built and a.release_version and len(built)==len(shas):
        # The main push run already built, smoked and pushed this exact commit (a release merge runs it first). Add the
        # version tag to that same multi-arch image after checking its revision label; never rebuild an immutable tag.
        immutable='ghcr.io/'+repository+':sha-'+a.commit
        found=json.loads(subprocess.check_output([*docker,'buildx','imagetools','inspect',immutable,'--format','{{json .Image}}']))
        assert set(found)=={'linux/amd64','linux/arm64'}, found.keys()
        assert all(v['config']['Labels']['org.opencontainers.image.revision']==a.commit for v in found.values())
        subprocess.run([*docker,'buildx','imagetools','create','-t',image,immutable],check=True)
        print(json.dumps({'commit':a.commit,'version':version,'image':image,'from':immutable}));sys.exit(0)
    if built:raise SystemExit('Refusing existing immutable image tag '+built[0])
a.output.mkdir(parents=True,exist_ok=True)
receipt={'commit':a.commit,'version':version,'image':image,'architectures':{}}
for arch,command in zip(['amd64','arm64'],commands):
    subprocess.run(command,cwd=root,check=True)
    inspect=json.loads(subprocess.check_output([*docker,'image','inspect',image]))[0]
    assert inspect['Architecture']==arch
    assert inspect['Config']['Labels']['org.opencontainers.image.revision']==a.commit
    subprocess.run([sys.executable,str(root/'tests/smoke_container.py'),'--image',image,'--context',a.context],check=True)
    # Ephemeral unit-test container stays writable so docker cp can stage tests (runtime stays read-only).
    # Stage only tests through docker cp: external worker paths may not be shared into Colima.
    test_container='notes-unit-'+a.commit[:12]+'-'+arch
    subprocess.run([*docker,'create','--name',test_container,'--tmpfs','/tmp','--user','1000:1000','--cap-drop','ALL','--security-opt','no-new-privileges:true','-e','TMPDIR=/tmp','--entrypoint','python',image,'-m','unittest','discover','-s','/app/tests'],check=True)
    try:
        subprocess.run([*docker,'cp',str(root/'tests'),test_container+':/app/tests'],check=True)
        subprocess.run([*docker,'start','-a',test_container],check=True)
        assert subprocess.check_output([*docker,'inspect','--format','{{.State.ExitCode}}',test_container],text=True).strip()=='0'
    finally:subprocess.run([*docker,'rm','-f',test_container],check=True)

    asset=f'wizard-notes-{a.commit[:12]}-{arch}.tar.gz'
    target=a.output/asset
    assert not target.exists(), 'Refuse to overwrite a release archive'
    with target.open('wb') as out,gzip.GzipFile(filename='',fileobj=out,mode='wb',mtime=0) as compressed:
        process=subprocess.Popen([*docker,'save',image],stdout=subprocess.PIPE)
        shutil.copyfileobj(process.stdout,compressed)
        assert process.wait()==0
    digest=hashlib.file_digest(target.open('rb'),'sha256').hexdigest()
    # Load the actual archive and run again: tarballs, not merely the build tag, are install evidence.
    with target.open('rb') as archive:
        subprocess.run([*docker,'load'],stdin=archive,check=True)
    assert json.loads(subprocess.check_output([*docker,'image','inspect',image]))[0]['Id']==inspect['Id']
    subprocess.run([sys.executable,str(root/'tests/smoke_container.py'),'--image',image,'--context',a.context],check=True)
    receipt['architectures'][arch]={'asset':asset,'sha256':digest,'bytes':target.stat().st_size,'image':image,'image_id':inspect['Id']}
    (a.output/'build-receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
    if a.push_ghcr:
        arch_tag='ghcr.io/humanitylabs-org/wizard-notes:sha-'+a.commit+'-'+arch
        subprocess.run([*docker,'tag',image,arch_tag],check=True)
        subprocess.run([*docker,'push',arch_tag],check=True)
(a.output/'SHA256SUMS').write_text(''.join(v['sha256']+'  '+v['asset']+'\n' for v in receipt['architectures'].values()))
if a.push_ghcr:
    immutable='ghcr.io/humanitylabs-org/wizard-notes:sha-'+a.commit
    tags=['-t',immutable]
    if a.release_version:
        assert os.environ.get('GITHUB_REF')=='refs/tags/v'+version
        tags+=['-t',image]
    subprocess.run([*docker,'buildx','imagetools','create',*tags,*[immutable+'-'+arch for arch in ['amd64','arm64']]],check=True)
print(json.dumps(receipt,indent=2))
