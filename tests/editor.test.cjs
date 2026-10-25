// Pure editor transforms are exercised without mocking the Wizard facade.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/../web/app.js','utf8');
const context=vm.createContext({});vm.runInContext(source.slice(source.indexOf('function transformText('),source.indexOf('function snapshot(')),context);
const edit=(text,start,end,kind)=>context.transformText(text,start,end,kind);
test('format selection and insert link placeholder',()=>{assert.equal(edit('hello',0,5,'bold').text,'**hello**');assert.equal(edit('',0,0,'link').text,'[[Note]]');assert.equal(edit('hello',0,5,'italic').text,'*hello*');});
test('line lists preserve indent and natural numbering',()=>{assert.equal(edit('  one\ntwo',0,9,'checkbox').text,'  - [ ] one\n- [ ] two');assert.equal(edit('one\ntwo',0,7,'numbered').text,'1. one\n2. two');assert.equal(edit('- one',2,2,'bullet').text,'- one');});
test('indent selection excludes following line at boundary',()=>{assert.equal(edit('one\ntwo\nthree',0,8,'indent').text,'  one\n  two\nthree');assert.equal(edit('  one\n\ttwo',0,10,'outdent').text,'one\ntwo');});
test('Enter continues bullets, ordered lists and unchecked tasks',()=>{for(const [text,want]of [['- one','- one\n- '],['  9. one','  9. one\n  10. '],['- [x] done','- [x] done\n- [ ] ']])assert.equal(context.continueList(text,text.length,text.length).text,want);});
test('empty list item ends list, ordinary paragraph uses native Enter',()=>{for(const text of ['- ','  1. ','- [ ] '])assert.equal(context.continueList(text,text.length,text.length).text,'');assert.equal(context.continueList('plain',5,5),null);});
