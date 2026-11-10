// Pure editor transforms are exercised without mocking the Wizard facade.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/../web/app.js','utf8');
const context=vm.createContext({});vm.runInContext(source.slice(source.indexOf('function transformText('),source.indexOf('function format(')),context);
const edit=(text,start,end,kind)=>context.transformText(text,start,end,kind);
test('format selection and insert link placeholder',()=>{assert.equal(edit('hello',0,5,'bold').text,'**hello**');assert.equal(edit('',0,0,'link').text,'[[Note]]');assert.equal(edit('hello',0,5,'italic').text,'*hello*');});
test('line lists preserve indent and natural numbering',()=>{assert.equal(edit('  one\ntwo',0,9,'checkbox').text,'  - [ ] one\n- [ ] two');assert.equal(edit('one\ntwo',0,7,'numbered').text,'1. one\n2. two');assert.equal(edit('- one',2,2,'bullet').text,'- one');});
test('indent selection excludes following line at boundary',()=>{assert.equal(edit('one\ntwo\nthree',0,8,'indent').text,'  one\n  two\nthree');assert.equal(edit('  one\n\ttwo',0,10,'outdent').text,'one\ntwo');});
test('Enter continues bullets, ordered lists and unchecked tasks',()=>{for(const [text,want]of [['- one','- one\n- '],['  9. one','  9. one\n  10. '],['- [x] done','- [x] done\n- [ ] ']])assert.equal(context.continueList(text,text.length,text.length).text,want);});
test('empty list item ends list, ordinary paragraph uses native Enter',()=>{for(const text of ['- ','  1. ','- [ ] '])assert.equal(context.continueList(text,text.length,text.length).text,'');assert.equal(context.continueList('plain',5,5),null);});
test('friendly-phone switch (issue 19): off keeps the old bar, confirm delete and nested note menu',()=>{
 const css=fs.readFileSync(__dirname+'/../web/styles.css','utf8'),html=fs.readFileSync(__dirname+'/../web/index.html','utf8');
 // Labels, Today and the empty state only show under html.friendly; the old icons stay in the bar.
 assert.match(css,/\.bar-label\{display:none\}/);for(const id of ['add-folder','sort','collapse'])assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(html,/id="today"[^>]*hidden/);assert.match(html,/id="empty" hidden/);
 for(const rule of css.split('}').filter(r=>/\.entry \.more\{display:block/.test(r)))assert.match(rule,/html\.friendly/);
 // Off: Delete asks first and the note menu keeps "Note actions…"; on: one tap with Undo in the toast.
 assert.match(source,/friendly\(\)\?button\('Delete',\(\)=>trash\(n\)\):button\('Delete',\(\)=>\{const body=sheet\('Move to trash\?'\)/);
 assert.match(source,/if\(friendly\(\)\)\{const n=.*return;\}\n b\.append\(button\('Search'.*Note actions…/);
 assert.match(source,/\$\('empty'\)\.hidden=!friendly\(\)/);
});
