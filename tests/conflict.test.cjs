// Stale copy vs. a newer save elsewhere (issue #29): a clean note takes the newest copy, a draft is never overwritten
// silently, and the conflict sheet offers taking the saved version.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/../web/app.js','utf8');
const context=vm.createContext({});
vm.runInContext(source.slice(source.indexOf('function dirty('),source.indexOf('function saveStatus(')),context);
vm.runInContext(source.slice(source.indexOf('function takeLatest('),source.indexOf('// Coming back to Notes')),context);
const note=over=>({path:'a.md',title:'a',titleDraft:'a',content:'old',saved:'old',rev:'r1',error:null,conflict:false,...over});

test('a clean stale copy takes the newer saved version',()=>{
  const n=note();
  assert.equal(context.takeLatest(n,{path:'a.md',title:'a',content:'new from desktop',rev:'r2'}),true);
  assert.equal(n.content,'new from desktop');assert.equal(n.saved,'new from desktop');assert.equal(n.rev,'r2');
  assert.equal(context.dirty(n),false);
});
test('the same revision is left alone',()=>{
  const n=note();assert.equal(context.takeLatest(n,{title:'a',content:'old',rev:'r1'}),false);assert.equal(n.rev,'r1');
});
test('taking the saved version clears a conflict',()=>{
  const n=note({content:'old + paste',error:'Changed elsewhere',conflict:true});
  n.content=n.saved;n.titleDraft=n.title;context.takeLatest(n,{title:'a',content:'desktop text',rev:'r2'});
  assert.equal(n.content,'desktop text');assert.equal(n.conflict,false);assert.equal(n.error,null);assert.equal(context.dirty(n),false);
});
test('refresh on return never touches a draft, and the sheet offers the saved version',()=>{
  const fresh=source.slice(source.indexOf('async function freshenOpenNote('),source.indexOf('async function save('));
  assert.match(fresh,/dirty\(n\)\)return;/);
  assert.match(source,/else catchUp\(\)/);
  const sheet=source.slice(source.indexOf('async function resolveConflict('));
  assert.match(sheet,/Use the saved version/);assert.match(sheet,/Save draft as a new note/);
  assert.match(source,/if\(e\.status===409\)return resolveConflict\(n\)/);
});
