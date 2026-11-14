// Changes from another device (issue #46): the note list and the open note catch up on return and on a light poll,
// without re-drawing an unchanged list or touching a draft.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/../web/app.js','utf8');
const piece=(from,to)=>source.slice(source.indexOf(from),source.indexOf(to));
function setup(){
  const calls={tree:0,render:0,notice:[],folder:[]},server={tree:[{path:'a.md',name:'a',type:'note'}],notes:{'a.md':{path:'a.md',title:'a',content:'one',rev:'r1'}}};
  const ctx=vm.createContext({calls,server,document:{hidden:false},drafts:new Map(),
    state:{note:null,tree:[],read:false},editor:{composing:false},$:()=>({value:''}),
    api:async route=>{if(route==='tree'){calls.tree++;return {children:JSON.parse(JSON.stringify(server.tree))};}
      const path=decodeURIComponent(route.split('path=')[1]),n=server.notes[path];if(!n){const e=new Error('Note not found.');e.status=404;throw e;}return {...n};},
    renderTree:()=>calls.render++,showMerged:()=>{},saveStatus:()=>{},notice:t=>calls.notice.push(t),openFolder:p=>{calls.folder.push(p);ctx.state.note=null;},
    parent:p=>p.includes('/')?p.slice(0,p.lastIndexOf('/')):''});
  vm.runInContext(piece('function dirty(','function saveStatus('),ctx);
  vm.runInContext(piece('function takeLatest(','// Edits from two devices'),ctx);
  vm.runInContext("let treeSig='';"+piece('async function refresh(','function ordered('),ctx);
  vm.runInContext(piece('let freshening=null;','\nfunction persistDrafts('),ctx);
  return ctx;
}
const run=(ctx,code)=>vm.runInContext(code,ctx);
test('a note added on another device shows up in the list on catch-up',async()=>{
  const ctx=setup();await run(ctx,'refresh()');assert.equal(ctx.calls.render,1);
  ctx.server.tree.push({path:'b.md',name:'b',type:'note'});await run(ctx,'catchUp()');
  assert.equal(ctx.calls.render,2);assert.deepEqual(run(ctx,'state.tree').map(n=>n.path),['a.md','b.md']);
});
test('an unchanged list is not re-drawn by the poll',async()=>{
  const ctx=setup();await run(ctx,'refresh()');await run(ctx,'catchUp()');await run(ctx,'catchUp()');
  assert.equal(ctx.calls.tree,3);assert.equal(ctx.calls.render,1);
});
test('nothing is fetched while Notes is hidden',async()=>{
  const ctx=setup();ctx.document.hidden=true;await run(ctx,'catchUp()');assert.equal(ctx.calls.tree,0);
});
test('a clean open note takes the newer copy, a draft is left alone',async()=>{
  const ctx=setup();run(ctx,"state.note={path:'a.md',title:'a',titleDraft:'a',content:'one',saved:'one',rev:'r1'}");
  ctx.server.notes['a.md']={path:'a.md',title:'a',content:'two',rev:'r2'};await run(ctx,'catchUp()');
  assert.equal(run(ctx,'state.note.content'),'two');
  run(ctx,"state.note.content='my draft'");ctx.server.notes['a.md']={path:'a.md',title:'a',content:'three',rev:'r3'};await run(ctx,'catchUp()');
  assert.equal(run(ctx,'state.note.content'),'my draft');assert.equal(run(ctx,'state.note.rev'),'r2');
});
test('a clean open note deleted elsewhere closes with a message; a draft stays open',async()=>{
  const ctx=setup();run(ctx,"state.note={path:'f/a.md',title:'a',titleDraft:'a',content:'x',saved:'x',rev:'r1'}");
  await run(ctx,'catchUp()');assert.deepEqual(ctx.calls.folder,['f']);assert.match(ctx.calls.notice[0],/moved or deleted on another device/);
  const d=setup();run(d,"state.note={path:'f/a.md',title:'a',titleDraft:'a',content:'draft',saved:'x',rev:'r1'}");
  await run(d,'catchUp()');assert.deepEqual(d.calls.folder,[]);assert.equal(run(d,'state.note.content'),'draft');
});
test('catch-up runs on focus, visible, online, pageshow and a 15 s poll',()=>{
  assert.match(source,/else catchUp\(\)/);assert.match(source,/\['focus','online','pageshow'\]/);
  assert.match(source,/setInterval\(\(\)=>catchUp\(\),CATCH_UP_MS\)/);assert.match(source,/CATCH_UP_MS=15000/);
});
