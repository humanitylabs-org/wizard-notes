import {test} from 'node:test';
import assert from 'node:assert/strict';
import {RawMarkdown,normalize,previewModel,autocapEdits,tableBlocks,liveTables} from '../editor/live-preview-model.mjs';
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
test('autocapitalises sentence starts, list items and the pronoun i, but not code, links or urls',()=>{
  const cap=(t,from=0,to=t.length)=>{let s=t;for(const e of autocapEdits(t,from,to).reverse())s=s.slice(0,e.from)+e.insert+s.slice(e.to);return s;};
  assert.equal(cap('hello there. next one! and? yes'),'Hello there. Next one! And? Yes');
  assert.equal(cap('- milk'),'- Milk');assert.equal(cap('  - [ ] call mum'),'  - [ ] Call mum');
  assert.equal(cap('1. first'),'1. First');assert.equal(cap('> quote'),'> Quote');assert.equal(cap('## heading'),'## Heading');
  assert.equal(cap('so i think i\'m done'),'So I think I\'m done');assert.equal(cap('in it'),'In it');
  assert.equal(cap('ok e.g. this'),'Ok e.g. this');assert.equal(cap('wait... and'),'Wait... and');
  assert.equal(cap('`code here`'),'`code here`');assert.equal(cap('```\nplain code\n```'.slice(4),4,14).length>0,true);
  assert.equal(cap('```\nfoo bar',4),'```\nfoo bar');
  assert.equal(cap('see [[my note]]'),'See [[my note]]');assert.equal(cap('https://x.com hi'),'https://x.com hi');
  assert.equal(cap('iPhone is'),'iPhone is');
  // Only the typed range: an earlier lowercase start the user kept stays as it is.
  const t='keep this. new';assert.equal(cap(t,11,14),'keep this. New');
});
test('autocap handles multi-line pastes line by line and skips fenced code',()=>{
  const t='- parent\n  - nested\n```\nlower code\n```\nafter';
  const out=autocapEdits(t,0,t.length).map(e=>t.slice(e.from,e.from+6));
  assert.deepEqual(out,['parent','nested','after']);
});
test('"i" waits for a following space before capitalising, never mid-word',()=>{
  const at=(t,from,to)=>autocapEdits(t,from,to).map(e=>t.slice(e.from,e.to));
  let t='so i\nnext';assert.deepEqual(at(t,3,4),[]);              // just typed "i" at a line end
  t='so i';assert.deepEqual(at(t,3,4),[]);                          // just typed "i" at the doc end
  t='so in\n';assert.deepEqual(at(t,4,5),[]);                      // continued into "in"
  t='so i ';assert.deepEqual(at(t,4,5),['i']);                      // space after a standalone i
  t="so i'm ";assert.deepEqual(at(t,6,7),['i']);                    // i'm finished with a space
  t='so i, ok';assert.deepEqual(at(t,4,5),['i']);                   // punctuation finishes it
  t='so in ';assert.deepEqual(at(t,5,6),[]);                        // "in " stays lowercase
  t='so i rest';assert.deepEqual(at(t,3,4),[]);                     // typed i before an existing space
});
test('only a full sentence end capitalises: not after "?)" or ")" inside a sentence',()=>{
  const cap=t=>{let s=t;for(const e of autocapEdits(t,0,t.length).reverse())s=s.slice(0,e.from)+e.insert+s.slice(e.to);return s;};
  assert.equal(cap('a young kid (his son?) comes up'),'A young kid (his son?) comes up');
  assert.equal(cap('see (above) then'),'See (above) then');
  assert.equal(cap('he said "go." then'),'He said "go." Then');
  assert.equal(cap('done. next'),'Done. Next');
});

const ON={on:true}; // owner switch tables-and-links (issue 17)
const TABLE='Intro\n\n| | Box | Link |\n|:--|:-:|--:|\n| ⭐ | **CATLINK** \\| V3 | [Listing](https://x.example/a) |\n| Backup | `a|b` |\n| x | y | z | extra |\n\nAfter';
test('GFM tables: header, alignment, empty/escaped/missing/extra cells and source offsets',()=>{
  const [t,...rest]=tableBlocks(TABLE);assert.equal(rest.length,0);
  assert.deepEqual(t.align,['left','center','right']);
  assert.deepEqual(t.rows.map(r=>r.header),[true,false,false,false]);
  assert.deepEqual(t.rows.map(r=>r.cells.map(c=>c.text)),[['','Box','Link'],['⭐','**CATLINK** | V3','[Listing](https://x.example/a)'],['Backup','`a','b`'],['x','y','z']]);
  const cell=t.rows[1].cells[2];assert.equal(TABLE.slice(cell.from,cell.to),'[Listing](https://x.example/a)');
  assert.deepEqual([t.startLine,t.endLine],[2,6]);
  assert.equal(TABLE.split('\n')[t.endLine],'| x | y | z | extra |');
  assert.deepEqual(tableBlocks('a | b\n--|--\n1 | 2').map(t=>t.rows.map(r=>r.cells.map(c=>c.text))),[[['a','b'],['1','2']]]);
});
test('tables inside code, lists or quotes, and pipe text without a delimiter row stay text',()=>{
  for(const t of ['```\n| a | b |\n|---|---|\n```','- item\n\n  | a | b |\n  |---|---|','> | a | b |\n> |---|---|','| not | a table |\nplain'])assert.equal(tableBlocks(t).length,0,t);
});
test('Live Preview: a table renders as one block unless the caret touches it, then its source is editable',()=>{
  const m=previewModel(TABLE,[{from:1,to:1}],ON),t=m.tables[0],start=TABLE.indexOf('| |'),end=TABLE.indexOf('\n\nAfter');
  assert.deepEqual([t.from,t.to,t.active],[start,end,false]);
  assert.equal(t.rows[1].cells[2].from,TABLE.indexOf('[Listing]')-start);   // relative to the table
  assert.ok(!m.replacements.some(r=>r.from>=start&&r.to<=end),'no inline widgets inside a rendered table');
  assert.ok(!m.marks.some(r=>r.from>=start&&r.to<=end));
  const inside=previewModel(TABLE,[{from:TABLE.indexOf('Backup'),to:TABLE.indexOf('Backup')}],ON);
  assert.equal(inside.tables[0].active,true);
  assert.deepEqual(inside.lines.filter(l=>l.classes.includes('cm-lp-table-source')).map(l=>l.value.slice(0,5)),['| | B','|:--|','| ⭐ |','| Bac','| x |']);
  assert.ok(inside.lines.filter(l=>l.classes.includes('cm-lp-table-source')).every(l=>l.active),'whole table is raw');
  assert.ok(!inside.replacements.some(r=>r.from>=start&&r.to<=end),'no hidden emphasis marks in raw rows');
  assert.equal(liveTables(TABLE,[{from:end,to:end}])[0].active,true);   // caret at the end of the last row
  assert.equal(liveTables(TABLE,[{from:end+1,to:end+1}])[0].active,false);
});
test('inline links collapse to their text off the caret line and show raw source on it',()=>{
  const t='See [the **docs**](https://x.example/p?q=1 "Title") now\n[ref][1] and [[Wiki]] and [empty]()\n\n[1]: https://x.example';
  const off=previewModel(t,[{from:t.length,to:t.length}],ON);
  assert.deepEqual(off.replacements.filter(r=>r.kind==='hide'&&r.from<50).map(r=>t.slice(r.from,r.to)),['[','**','**','](https://x.example/p?q=1 "Title")']);
  assert.equal(off.marks.find(m=>m.href).href,'https://x.example/p?q=1');
  assert.ok(off.marks.some(m=>m.class==='cm-lp-strong'),'formatting inside link text still renders');
  assert.equal(off.marks.filter(m=>m.href).length,1,'reference, empty and wiki links are not collapsed');
  const on=previewModel(t,[{from:2,to:2}],ON);
  assert.ok(!on.replacements.some(r=>r.from<55&&r.kind==='hide'&&t[r.from]==='['));
  assert.ok(on.marks.some(m=>m.class==='cm-lp-link'&&!m.href&&t.slice(m.from,m.to).startsWith('[the')));
  assert.equal(previewModel('`[a](https://x.example)`',[],ON).marks.filter(m=>m.href).length,0);
});
test('escaped wiki alias pipe from tables resolves to the note and keeps the alias',()=>{
  const m=previewModel('Go [[Note\\|alias]]',[],ON);assert.deepEqual(m.replacements.filter(r=>r.kind==='wiki').map(r=>[r.target,r.label]),[['Note','alias']]);
});
test('switch off (default): no tables, links keep their source, alias splits on a bare pipe only',()=>{
  const off=previewModel(TABLE,[{from:1,to:1}]);
  assert.deepEqual(off.tables,[]);
  assert.ok(!off.lines.some(l=>l.classes.includes('cm-lp-table-source')));
  const t='See [docs](https://x.example/p) now\nnext';
  const m=previewModel(t,[{from:t.length,to:t.length}]);
  assert.equal(m.marks.filter(x=>x.href).length,0);
  assert.equal(m.replacements.filter(r=>r.kind==='hide').length,0);
  assert.ok(m.marks.some(x=>x.class==='cm-lp-link'));
  assert.deepEqual(previewModel('Go [[Note\\|alias]]',[]).replacements.filter(r=>r.kind==='wiki').map(r=>[r.target,r.label]),[['Note\\','alias']]);
});
