// Reply payload and receipt handling: pure functions, no Wizard shell or network.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {replyPayload,replySupported,openReply,REPLY_LIMITS} from '../web/reply.js';

const note={path:'Work/Plan.md',title:'Plan',content:'# Plan\n\nShip Reply.'};

test('note payload carries title, path and text within shell limits',()=>{
 const p=replyPayload(note);
 assert.match(p.id,/^[A-Za-z0-9_-]{1,128}$/);
 assert.equal(p.title,'Wizard Notes: Plan');
 assert.match(p.message,/Path: Work\/Plan\.md/);
 assert.match(p.message,/Folder: Work/);
 assert.match(p.message,/Ship Reply\./);
 assert.doesNotMatch(p.message,/Unsaved edits/);
 assert.equal(replyPayload(note).id,p.id,'same note, same draft');
});

test('selected passage gets its own id and is quoted first',()=>{
 const whole=replyPayload(note),part=replyPayload(note,{text:'Ship Reply.',start:8,end:19});
 assert.notEqual(part.id,whole.id);
 assert.ok(part.id.startsWith(whole.id+'-p'));
 assert.match(part.message,/^A passage from a note/);
 assert.match(part.message,/Selected passage:\nShip Reply\./);
 assert.equal(replyPayload(note,{text:'   ',start:0,end:3}).id,whole.id,'blank selection means the whole note');
});

test('long notes are truncated and stay under 32,000 characters',()=>{
 const p=replyPayload({...note,content:'x'.repeat(100000),unsaved:true},{text:'y'.repeat(50000),start:0,end:50000});
 assert.ok(p.message.length<=REPLY_LIMITS.message);
 assert.match(p.message,/more characters not included/);
 assert.match(p.message,/Unsaved edits: yes/);
 assert.ok(p.title.length<=REPLY_LIMITS.title);
});

test('empty notes and missing paths',()=>{
 assert.match(replyPayload({path:'Inbox.md',title:'',content:''}).message,/Note text: \(empty\)/);
 assert.throws(()=>replyPayload({path:''}),/Open a note/);
});

test('receipt must confirm an unsent draft; stale shells ask for reload',()=>{
 const calls=[],W=r=>({nav:{openContextDraft:x=>{calls.push(x);return r;}}});
 const p=replyPayload(note);
 assert.equal(openReply(W({kind:'unsent-draft',sent:false}),p).ok,true);
 assert.deepEqual(calls[0],p);
 assert.equal(openReply(W({kind:'unsent-draft',sent:true}),p).text,'Could not confirm an unsent draft. Nothing was sent.');
 assert.equal(openReply({nav:{openContextDraft(){throw new Error('Context draft unavailable');}}},p).text,'Reload Wizard (refresh the whole page) to turn on Reply. Nothing sent.');
 assert.equal(replySupported({nav:{}}),false);
 assert.equal(replySupported(W({})),true);
});
