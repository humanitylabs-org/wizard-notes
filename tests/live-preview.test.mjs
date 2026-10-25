import {test} from 'node:test';
import assert from 'node:assert/strict';
import {RawMarkdown,normalize,previewModel} from '../editor/live-preview-model.mjs';
const model=(t,pos)=>previewModel(t,pos===undefined?[]:[{from:pos,to:pos}]);
test('headings render while active line reveals only its own marks',()=>{const t='# Heading\n## Second\nPlain';const m=model(t,12);assert.ok(m.lines[0].classes.includes('cm-lp-h1'));assert.ok(m.lines[1].classes.includes('cm-lp-h2'));assert.ok(m.replacements.some(r=>r.from===0&&r.to===2));assert.ok(!m.replacements.some(r=>r.from===10));assert.ok(m.lines[1].active);});
test('emphasis, nested emphasis, strike and inline code are decorated not serialized',()=>{const t='**bold and *italic*** ~~done~~ `code`';const m=model(t);assert.ok(m.marks.some(r=>r.class==='cm-lp-strong'));assert.ok(m.marks.some(r=>r.class==='cm-lp-em'));assert.ok(m.marks.some(r=>r.class==='cm-lp-inline-code'));assert.ok(m.marks.some(r=>r.class==='cm-lp-strike'));assert.equal(model(t,5).replacements.length,0);assert.equal(new RawMarkdown(t).raw,t);});
test('lists, nesting, ordered starts and hanging indents are described',()=>{const m=model('- parent\n  - child\n    1. ordered');assert.equal(m.replacements.length,3);assert.deepEqual(m.lines.map(l=>l.indent),[0,2,4]);assert.deepEqual(m.replacements.map(r=>r.marker),['•','•','1.']);assert.equal(model('9. ordered').replacements[0].marker,'9.');});
test('checkbox widgets replace exactly the task prefix and know the editable offset',()=>{const t='- [ ] first\n  - [X] done';const m=model(t);assert.deepEqual(m.replacements.map(r=>[r.kind,r.checked,r.taskAt]),[['task',false,2],['task',true,16]]);assert.equal(m.replacements[0].label,'first');assert.equal(model(t,4).replacements.filter(r=>r.kind==='task').length,1);});
test('fenced code never renders wiki links or emphasis and uses code line styles',()=>{const t='```md\n**raw** [[Note]]\n```\n\n[[Outside]]';const m=model(t);assert.equal(m.replacements.filter(r=>r.kind==='wiki').length,1);assert.equal(m.replacements.find(r=>r.kind==='wiki').target,'Outside');assert.ok(m.lines[1].classes.includes('cm-lp-code'));assert.ok(!m.marks.some(r=>r.class==='cm-lp-strong'));assert.ok(model(t,1).lines[0].active);});
test('quotes retain their block role while only inactive quote syntax hides',()=>{const t='> A thought\n> Another';const m=model(t,3);assert.ok(m.lines.every(l=>l.classes.includes('cm-lp-quote')));assert.deepEqual(m.replacements.map(r=>r.from),[12]);});
test('wiki alias, safe text, reveal-on-caret/selection and code/escape exceptions',()=>{const t='[[Note|a label]]\n[[Folder/Other]]\n`[[Code]]`\n\\[[Escaped]]';const m=model(t);assert.deepEqual(m.replacements.filter(r=>r.kind==='wiki').map(r=>[r.target,r.label]),[['Note','a label'],['Folder/Other','Folder/Other']]);assert.equal(model(t,4).replacements.filter(r=>r.kind==='wiki').length,1);assert.equal(previewModel(t,[{from:0,to:30}]).replacements.filter(r=>r.kind==='wiki').length,0);});
test('exact raw round trip preserves BOM, Unicode, mixed EOLs, final newline and whitespace',()=>{for(const raw of ['','\ufeff# ไทย\r\n\r\n**你好**  \n- [X] done\r  - nested\r\n','No final newline  ','[[x]]\n\n','```\r\nx\r\n```']){const doc=new RawMarkdown(raw);previewModel(doc.text);assert.equal(doc.raw,raw);assert.equal(doc.apply([]),raw);assert.equal(Buffer.compare(Buffer.from(doc.raw),Buffer.from(raw)),0);}});
test('localized edits leave every untouched EOL and whitespace byte identical',()=>{const raw='\ufeff# Title\r\n\n- [X] keep  \r\n> quote\rLast';const d=new RawMarkdown(raw),at=d.text.indexOf('keep');d.apply([{from:at,to:at+4,insert:'stay'}]);assert.equal(d.raw,raw.replace('keep','stay'));assert.equal(d.text,normalize(d.raw));});
test('multiple normalized-offset edits and newly inserted lines keep original surrounding bytes',()=>{const d=new RawMarkdown('one\r\ntwo\nthree\r');d.apply([{from:0,to:3,insert:'ONE'},{from:8,to:13,insert:'THREE\nnew'}]);assert.equal(d.raw,'ONE\r\ntwo\nTHREE\r\nnew\r');});
test('HTML and unsafe wiki labels remain text-only widget data',()=>{const m=model('[[<img src=x onerror=alert(1)>|<script>]]');assert.equal(m.replacements[0].label,'<script>');assert.equal(new RawMarkdown('<script>alert(1)</script>').text,'<script>alert(1)</script>');});

test('bullet renders on the caret line as soon as "- " is typed',()=>{
  const at=p=>[{from:p,to:p}];
  assert.equal(previewModel('- ',at(2)).replacements.filter(r=>r.kind==='bullet').length,1);
  assert.equal(previewModel('- milk',at(6)).replacements[0].marker,'•');
  assert.equal(previewModel('  - child',at(9)).lines[0].bullet,true);
  assert.equal(previewModel('-',at(1)).replacements.length,0);
  assert.equal(previewModel('- milk',at(1)).replacements.length,0);
  assert.equal(previewModel('- [ ] task',at(10)).replacements[0].kind,'task');
});
test('bare "- " under a paragraph renders on the caret line only',()=>{
  const t='Plain\n- ';assert.equal(previewModel(t,[{from:t.length,to:t.length}]).lines[1].bullet,true);
  assert.equal(previewModel(t,[]).lines[1].bullet,undefined);
});
