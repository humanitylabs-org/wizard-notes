import {build} from 'esbuild';
import {mkdir,readFile,writeFile,readdir} from 'node:fs/promises';
await mkdir('web/vendor',{recursive:true});
// Bound generated line lengths for reviewability (and to keep a cursor animation
// and an unrelated minified identifier from looking like one UI implementation).
const result=await build({entryPoints:['editor/live-preview.mjs'],outfile:'web/vendor/live-preview.js',bundle:true,format:'esm',target:['chrome100'],minify:true,lineLimit:120,legalComments:'eof',metafile:true});
const names=[...new Set(Object.keys(result.metafile.inputs).map(p=>p.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/)?.[1]).filter(Boolean))].sort();
let notices='Offline Live Preview dependencies (all MIT). Rebuild: npm ci && npm run build:editor.\n\n';
for(const name of names){const root='node_modules/'+name, pkg=JSON.parse(await readFile(root+'/package.json','utf8')), files=await readdir(root),license=files.find(n=>/^LICENSE(?:\.txt)?$/i.test(n));if(!license||!['MIT','BSD-2-Clause','BSD-3-Clause'].includes(pkg.license))throw Error('Unapproved or missing license '+name);notices+=`=== ${name} ${pkg.version} ===\n${await readFile(root+'/'+license,'utf8')}\n\n`;}
await writeFile('web/vendor/NOTICE.txt',notices);
