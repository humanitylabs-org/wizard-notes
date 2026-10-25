"""Create an Alpha import manifest only from real built/hosted release receipts."""
import argparse
import json
from pathlib import Path
p=argparse.ArgumentParser()
p.add_argument('--build-receipt',required=True,type=Path)
p.add_argument('--release-json',required=True,type=Path,help='gh api repos/.../releases/tags/vVERSION JSON')
p.add_argument('--output',required=True,type=Path)
a=p.parse_args()
b=json.loads(a.build_receipt.read_text());r=json.loads(a.release_json.read_text())
assert set(b['architectures'])=={'amd64','arm64'}
assert r['tag_name']=='v'+b['version'] and r['prerelease'] is True and not r['draft']
assets={asset['name']:asset for asset in r['assets']}
images={}
for arch,image in b['architectures'].items():
    asset=assets[image['asset']]
    assert asset['size']==image['bytes']
    assert asset['digest']=='sha256:'+image['sha256']
    assert len(image['sha256'])==64 and image['image_id'].startswith('sha256:')
    images[arch]={**image,'asset_id':asset['id']}
entry={'id':'wizard-notes','name':'Wizard Notes','summary':'Alpha · Your private-by-default Markdown vault: connected notes, nested folders and phone-friendly editing.','repo':'humanitylabs-org/wizard-notes','commit':b['commit'],'version':b['version'],'tag':r['tag_name'],'architectures':['amd64','arm64'],'images':images,'gateway':{'path':'/wizard-notes/','strip_prefix':True},'release_url':r['html_url']}
a.output.write_text(json.dumps({'schema':1,'scope':'private-test','apps':[entry]},indent=2)+'\n')
print(str(a.output))
