// Edits from two devices (issue #30): different lines merge on their own, the same lines still ask.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/../web/app.js','utf8');
const context=vm.createContext({});
vm.runInContext(source.slice(source.indexOf('function lcsPairs('),source.indexOf('// Show merged text')),context);
const {merge3}=context;
const base='# Shopping\n\nmilk\neggs\nbread\n\nNotes at the end.';

test('a phone line added in one place and a desktop edit elsewhere keep both',()=>{
  const phone=base.replace('bread','bread\ncoffee'),desktop=base.replace('# Shopping','# Shopping list');
  assert.equal(merge3(base,phone,desktop),'# Shopping list\n\nmilk\neggs\nbread\ncoffee\n\nNotes at the end.');
  assert.equal(merge3(base,desktop,phone),merge3(base,phone,desktop));
});
test('a line added at the end merges with an edit at the top',()=>{
  assert.equal(merge3(base,base+'\nnew line',base.replace('milk','oat milk')),base.replace('milk','oat milk')+'\nnew line');
});
test('a deletion on one side and an edit elsewhere merge',()=>{
  assert.equal(merge3(base,base.replace('eggs\n',''),base.replace('Notes at the end.','Done.')),'# Shopping\n\nmilk\nbread\n\nDone.');
});
test('the same line changed on both sides asks',()=>{
  assert.equal(merge3(base,base.replace('eggs','six eggs'),base.replace('eggs','twelve eggs')),null);
});
test('both sides adding at the same place asks',()=>{
  assert.equal(merge3(base,base+'\nphone',base+'\ndesktop'),null);
});
test('identical changes on both sides are not a conflict',()=>{
  const both=base.replace('eggs','six eggs');assert.equal(merge3(base,both,both),both);
  assert.equal(merge3(base,both+'\nmore',both),both+'\nmore');
});
test('one side unchanged takes the other',()=>{
  assert.equal(merge3(base,base,'other'),'other');assert.equal(merge3(base,'mine',base),'mine');
});
test('save only merges with the switch on, and falls back to the sheet otherwise',()=>{
  const save=source.slice(source.indexOf('async function save('),source.indexOf('async function flush('));
  assert.match(save,/if\(e\.status!==409\|\|!switchOn\('auto-merge'\)\)throw e;/);
  assert.match(save,/merge3\(n\.saved,content,latest\.content\)/);
  assert.match(save,/if\(m===null\)throw e;/);
  assert.match(save,/rev:latest\.rev,content:m/);
  assert.match(fs.readFileSync(__dirname+'/../app/server.py','utf8'),/'id': 'auto-merge'[^\n]*\n[^\n]*\n\s*'default': False, 'issues': \['humanitylabs-org\/wizard-notes#30'\]/);
});
