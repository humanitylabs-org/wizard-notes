// Tappable plain text in Read view (issue #34, on for everyone; its read-links switch was removed): which bare text becomes a link, where it points,
// and what stays text. Runs inline() from web/app.js against a tiny DOM stand-in.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/../web/app.js','utf8');
class Node{constructor(tag,text){this.tag=tag;this.children=[];this.text=text??'';this.attrs={};}append(...n){for(const x of n)this.children.push(typeof x==='string'?new Node('#text',x):x);}
  set textContent(v){this.children=[new Node('#text',v)];}get textContent(){return this.tag==='#text'?this.text:this.children.map(c=>c.textContent).join('');}}
const document={createTextNode:t=>new Node('#text',t),createDocumentFragment:()=>new Node('#frag')};
function el(tag,text,cls){const n=new Node(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
const on=new Set();
const context=vm.createContext({document,el,URL,location:{href:'http://127.0.0.1/'},switchOn:id=>on.has(id),rich:()=>on.has('tables-and-links'),
  button:(t,f)=>{const b=el('button',t);b.onclick=f;return b;},wiki:()=>{},state:{note:{path:'a.md'}},base:p=>p.split('/').pop()});
vm.runInContext(source.slice(source.indexOf('function inline('),source.indexOf('function mdImage(')),context);
vm.runInContext(source.slice(source.indexOf('// Links leave Notes'),source.indexOf('// GFM table')),context);
const render=text=>{const d=new Node('#root');context.inline(text,d);return d;};
const anchors=n=>n.tag==='a'?[{text:n.textContent,href:n.href,target:n.target}]:n.children.flatMap(anchors);
const hrefs=text=>anchors(render(text)).map(a=>a.href);

test('bare web addresses open in a new tab; www. and host/path get https',()=>{
  on.clear();
  const a=anchors(render('Agents: https://page.line.me/abc?x=1, also www.example.com.'));
  assert.deepEqual(a.map(x=>[x.text,x.href,x.target]),[['https://page.line.me/abc?x=1','https://page.line.me/abc?x=1','_blank'],['www.example.com','https://www.example.com/','_blank']]);
  assert.equal(render('Agents: https://page.line.me/abc?x=1, also www.example.com.').textContent,'Agents: https://page.line.me/abc?x=1, also www.example.com.','no text lost or added');
  assert.deepEqual(hrefs('LINE page.line.me/kxk1234 here'),['https://page.line.me/kxk1234']);
  assert.deepEqual(hrefs('see example.com or bangkok.co.th'),['https://example.com/','https://bangkok.co.th/']);
  assert.deepEqual(hrefs('(https://en.wikipedia.org/wiki/Foo_(bar))'),['https://en.wikipedia.org/wiki/Foo_(bar)']);
  assert.deepEqual(hrefs('https://x.test/a_b_c'),['https://x.test/a_b_c'],'underscores in a URL are not italics');
});
test('emails become mailto: and phone numbers become tel: with only digits',()=>{
  on.clear();
  assert.deepEqual(hrefs('mail jane.doe+flat@example.co.th today'),['mailto:jane.doe+flat@example.co.th']);
  const a=anchors(render('Call +66 92 553 7070 or 02 260 9780, US (415) 555-0134 or 415-555-0134.'));
  assert.deepEqual(a.map(x=>[x.text,x.href,x.target]),[['+66 92 553 7070','tel:+66925537070',undefined],['02 260 9780','tel:022609780',undefined],['(415) 555-0134','tel:4155550134',undefined],['415-555-0134','tel:4155550134',undefined]]);
  assert.deepEqual(hrefs('+66-92-553-7070'),['tel:+66925537070']);
});
test('numbers that are not phones, file names and text inside code stay text',()=>{
  on.clear();
  for(const t of ['2026-11-11','12000 baht','1 000 000','v0.1.0','price 15,000.50','app.js','notes.md','web/app.js','`https://x.test` `+66 92 553 7070` `me@x.co`','room 12345678','javascript:alert(1)','ftp://x.test/a'])
    assert.deepEqual(hrefs(t),[],t);
});
test('[text](url) links keep their label; tel: is allowed there too, other schemes stay text',()=>{
  on.clear();
  assert.deepEqual(anchors(render('[Call agent](tel:+66925537070) [site](https://x.test/a.b)')).map(x=>[x.text,x.href,x.target]),[['Call agent','tel:+66925537070',undefined],['site','https://x.test/a.b',undefined]]);
  on.add('tables-and-links');
  assert.deepEqual(anchors(render('[Call](tel:+66925537070) [site](https://x.test/)')).map(x=>[x.text,x.href,x.target]),[['Call','tel:+66925537070',undefined],['site','https://x.test/','_blank']]);
  assert.deepEqual(hrefs('[x](javascript:alert(1)) [y](data:text/html,hi)'),[]);
  on.clear();
  assert.deepEqual(hrefs('[Call](tel:+66925537070)'),['tel:+66925537070'],'tel: with no switch on at all');
});
test('bold and italic text still links inside, and raw HTML is never parsed',()=>{
  on.clear();
  assert.deepEqual(hrefs('**+66 92 553 7070** and *www.example.com*'),['tel:+66925537070','https://www.example.com/']);
  assert.deepEqual(hrefs('<a href="javascript:alert(1)">x</a>'),[]);
  assert.doesNotMatch(source,/innerHTML|insertAdjacentHTML|outerHTML/);
});
test('no read-links switch left; Read view tables always render, and the table wrap scrolls sideways',()=>{
  assert.doesNotMatch(source,/read-links|links\(\)/);
  assert.match(source,/tables=new Map\(tableBlocks\(normal\)\.map/);
  on.clear();
  assert.deepEqual(hrefs('Agents: https://page.line.me/abc'),['https://page.line.me/abc'],'links with every switch off');
  assert.match(fs.readFileSync(__dirname+'/../web/styles.css','utf8'),/\.md-table-wrap\{[^}]*overflow-x:auto/);
});
