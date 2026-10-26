// Native input + persistence acceptance. ONLY run on the scratch QA host/vault.
const {chromium,expect}=require(process.env.QA_PLAYWRIGHT||'@playwright/test');
const fs=require('node:fs'),path=require('node:path');
const base=process.env.QA_BASE||'http://127.0.0.1:9258',out=process.env.QA_OUT||'qa-output';
const width=Number(process.env.QA_WIDTH||390),height=width===390?844:800,skin=process.env.QA_SKIN||'nebula',label=(width===390?'phone':'desktop')+'-'+skin+(process.env.QA_NO_EDIT_CONTEXT?'-dom':'');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.QA_CHROME?{executablePath:process.env.QA_CHROME}:{}),args:['--no-sandbox']});
 const report={label,checks:[],errors:[],nativeEvents:[]};
 try{
  const c=await b.newContext({viewport:{width,height},isMobile:width===390,hasTouch:width===390,serviceWorkers:'block',...(width===390?{userAgent:'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36'}:{})}),p=await c.newPage();
  p.on('pageerror',e=>report.errors.push(e.message));
  if(process.env.QA_NO_EDIT_CONTEXT)await c.addInitScript(()=>{window.EditContext=undefined;});
  const note='Input '+label+'.md',initial='\ufeff# Untouched\r\n\n**Keep these bytes**  \r\n- [X] preserved\r\n\r\n';
  const existing=await p.request.get(base+'/notes/api/note?path='+encodeURIComponent(note));
  const old=existing.ok()?await existing.json():null;
  const created=await p.request.fetch(base+'/notes/api/note',{method:old?'PUT':'POST',data:{path:note,content:initial,...(old?{rev:old.rev}:{})}});expect(created.ok()).toBe(true);
  await p.goto(base+'/?skin='+skin);
  let f=await(await p.locator('#app-frame').elementHandle()).contentFrame();
  await f.getByRole('treeitem',{name:'Open '+note.slice(0,-3),exact:true}).click();
  await expect(f.locator('.cm-content')).toBeVisible();
  const get=()=>f.evaluate(async()=>{const {EditorView}=await import('./vendor/live-preview.js');const v=EditorView.findFromDOM(document.querySelector('.cm-editor'));return v.state.doc.toString();});
  const select=async(from,to=from)=>{await f.evaluate(async({from,to})=>{const {EditorView}=await import('./vendor/live-preview.js');const v=EditorView.findFromDOM(document.querySelector('.cm-editor'));v.dispatch({selection:{anchor:from,head:to},scrollIntoView:true});v.focus();},{from,to});await p.waitForTimeout(35);};
  const read=async()=>{const r=await p.request.get(base+'/notes/api/note?path='+encodeURIComponent(note));return (await r.json()).content;};
  const waitSaved=async expected=>{await expect.poll(read,{timeout:7000}).toBe(expected);};
  // No focus/reveal/reading toggle may rewrite a byte or create a save.
  let noteWrites=0;p.on('request',r=>{if(r.method()==='PUT'&&r.url().includes('/api/note'))noteWrites++;});
  await select(4);await f.locator('#mode').click();await f.locator('#read').click();await expect(f.locator('#read')).toBeVisible();
  await f.locator('#mode').click();await p.waitForTimeout(700);expect(await read()).toBe(initial);expect(noteWrites).toBe(0);
  report.checks.push('untouched mixed EOL/BOM/trailing whitespace survives focus, reveal, pure Reading and back to editing without PUT');
  await f.locator('#mode').click();await f.locator('#read input[aria-label="preserved"]').uncheck();await waitSaved(initial.replace('[X]','[ ]'));await expect(f.locator('#read')).toBeVisible();
  await f.locator('#mode').click();await f.getByRole('button',{name:'Undo',exact:true}).click();await waitSaved(initial);
  report.checks.push('Reading task tap stays in Reading, changes one byte and undo restores exact mixed-EOL raw text');
  await select((await get()).length);
  const typed='# Typed heading\n\nA **bold thought** and *small steps*.\n\n- parent\n  - nested\n- [ ] New task\n\n[[Home/Quick Notes|Quick Notes]]\n\nIME: ';
  await p.keyboard.insertText(typed);
  const typedCap=typed.replace('- parent','- Parent').replace('- nested','- Nested');
  const lfInitial=initial.replace(/\r\n?/g,'\n');
  expect(await get()).toBe(lfInitial+typedCap);
  expect(await p.evaluate(()=>WizAppServices.inspect().some(s=>s.holds.some(h=>h.startsWith('Unsaved note: '))))).toBe(true);
  let expected=initial+typedCap.replace(/\n/g,'\r\n');await waitSaved(expected);
  await expect.poll(()=>p.evaluate(()=>WizAppServices.inspect().flatMap(s=>s.holds))).toEqual([]);
  const unchanged=expected.slice(0,initial.length);expect(unchanged).toBe(initial);
  report.checks.push('native insertText types heading, emphasis, nested lists, checkbox and wiki; original bytes unchanged, autosave readback exact');
  // CDP emits real compositionstart/update/end + beforeinput into the contenteditable.
  await f.locator('.cm-content').evaluate(e=>{window.nativeEvents=[];for(const type of ['beforeinput','input','compositionstart','compositionupdate','compositionend'])e.addEventListener(type,event=>window.nativeEvents.push({source:'DOM',type:event.type,inputType:event.inputType,data:event.data,isComposing:event.isComposing}));if(e.editContext)for(const type of ['compositionstart','compositionend','textupdate'])e.editContext.addEventListener(type,event=>window.nativeEvents.push({source:'EditContext',type:event.type,text:event.text,from:event.updateRangeStart,to:event.updateRangeEnd}));});
  const cdp=await c.newCDPSession(p);
  await cdp.send('Input.imeSetComposition',{text:'に',selectionStart:1,selectionEnd:1});await p.waitForTimeout(40);
  await cdp.send('Input.imeSetComposition',{text:'日本',selectionStart:2,selectionEnd:2});await p.waitForTimeout(40);
  await cdp.send('Input.insertText',{text:'日本語'});await p.waitForTimeout(150);
  expect(await get()).toBe(lfInitial+typedCap+'日本語');expected+='日本語';await waitSaved(expected);
  report.checks.push('CDP composition に → 日本 → 日本語 commits once; no duplicated/dropped text');
  // Cancellation must leave no intermediate composing text behind.
  await cdp.send('Input.imeSetComposition',{text:'cancel',selectionStart:6,selectionEnd:6});await p.waitForTimeout(40);
  await cdp.send('Input.imeSetComposition',{text:'',selectionStart:0,selectionEnd:0});await p.waitForTimeout(150);
  expect(await get()).toBe(lfInitial+typedCap+'日本語');await waitSaved(expected);
  report.checks.push('composition cancellation removes the interim text only');
  // Android keyboards may send a cancelable beforeinput line break without keydown.
  await p.keyboard.insertText('\n- Android item');
  const prevented=await f.locator('.cm-content').evaluate(e=>!e.dispatchEvent(new InputEvent('beforeinput',{inputType:'insertLineBreak',bubbles:true,cancelable:true})));
  expect(prevented).toBe(true);expect((await get()).endsWith('- Android item\n- ')).toBe(true);
  await p.keyboard.insertText('child');await p.keyboard.press('Tab');expect((await get()).endsWith('\n  - Child')).toBe(true);
  await p.keyboard.press('Shift+Tab');expect((await get()).endsWith('\n- Child')).toBe(true);
  report.checks.push('Android beforeinput-only Enter continues once; Tab/Shift-Tab indent and outdent');
  // Obsidian: "- " becomes a bullet immediately on the caret line, and stays one while indenting there.
  const caretBullet=()=>f.locator('.cm-line.cm-lp-active').last().evaluate(e=>({bullet:!!e.querySelector('.cm-lp-bullet-widget,[class*=bullet]')||e.classList.contains('cm-lp-bullet'),text:e.textContent}));
  await p.keyboard.press('Enter');let cb=await caretBullet();expect(cb.bullet).toBe(true);expect((await get()).endsWith('\n- Child\n- ')).toBe(true);
  await p.keyboard.insertText('instant');await p.keyboard.press('Tab');cb=await caretBullet();expect(cb.bullet).toBe(true);expect((await get()).endsWith('\n  - Instant')).toBe(true);
  await p.keyboard.press('Shift+Tab');expect((await caretBullet()).bullet).toBe(true);expect((await get()).endsWith('\n- Instant')).toBe(true);
  // Fresh "- " typed under a plain paragraph line (CommonMark would not call it a list yet).
  await f.evaluate(async()=>{const {EditorView}=await import('./vendor/live-preview.js');const v=EditorView.findFromDOM(document.querySelector('.cm-editor'));const n=v.state.doc.length;v.dispatch({changes:{from:n,insert:'\n\nPlain line\n'},selection:{anchor:n+13}});v.focus();});await p.waitForTimeout(50);
  await p.keyboard.insertText('-');expect((await caretBullet()).bullet).toBe(false);
  await p.keyboard.insertText(' ');cb=await caretBullet();expect(cb.bullet).toBe(true);expect(cb.text.includes('-')).toBe(false);
  await p.keyboard.insertText('typed');expect((await caretBullet()).bullet).toBe(true);expect((await get()).endsWith('\nPlain line\n- Typed')).toBe(true);
  report.checks.push('typing "- " renders a bullet on the caret line at once; Tab/Shift-Tab keep it rendered');
  // Auto-capitalisation that does not depend on the keyboard seeing the hidden list marker.
  await p.keyboard.press('Enter');await p.keyboard.insertText('buy eggs. then milk, i think');
  expect((await get()).endsWith('\n- Buy eggs. Then milk, I think')).toBe(true);
  await p.keyboard.press('ControlOrMeta+z');expect((await get()).endsWith('\n- buy eggs. then milk, i think')).toBe(true);
  await p.keyboard.press('ControlOrMeta+Shift+z');expect((await get()).endsWith('\n- Buy eggs. Then milk, I think')).toBe(true);
  // Composing keyboards: the word is capitalised once, after the composition commits, with no doubling.
  await p.keyboard.press('Enter');
  await cdp.send('Input.imeSetComposition',{text:'w',selectionStart:1,selectionEnd:1});await p.waitForTimeout(40);
  await cdp.send('Input.imeSetComposition',{text:'wor',selectionStart:3,selectionEnd:3});await p.waitForTimeout(40);
  expect((await get()).endsWith('\n- wor')).toBe(true);
  await cdp.send('Input.insertText',{text:'word'});await p.waitForTimeout(250);
  expect((await get()).endsWith('\n- Word')).toBe(true);
  await p.keyboard.insertText(' ok. ');await cdp.send('Input.imeSetComposition',{text:'nex',selectionStart:3,selectionEnd:3});await p.waitForTimeout(40);await cdp.send('Input.insertText',{text:'next'});await p.waitForTimeout(250);
  expect((await get()).endsWith('\n- Word ok. Next')).toBe(true);
  report.checks.push('new bullets, new sentences and "i" auto-capitalise (typed and IME-composed, once, undoable)');
  // Letter by letter at a line end: "i" only becomes "I" once a space follows; "in"/"it" never change.
  await p.keyboard.press('Enter');for(const ch of 'so i')await p.keyboard.type(ch);await p.waitForTimeout(80);
  expect((await get()).endsWith('\n- So i')).toBe(true);
  for(const ch of 'n it if')await p.keyboard.type(ch);await p.waitForTimeout(80);expect((await get()).endsWith('\n- So in it if')).toBe(true);
  for(const ch of ' i')await p.keyboard.type(ch);await p.waitForTimeout(80);expect((await get()).endsWith(' if i')).toBe(true);
  for(const ch of " think i'm ok")await p.keyboard.type(ch);await p.waitForTimeout(80);expect((await get()).endsWith("\n- So in it if I think I'm ok")).toBe(true);
  report.checks.push('"i" capitalises only after a space or punctuation; "in", "it", "if" typed letter by letter stay lowercase');
  // Simulate native autocorrect/voice replacement on a selected range, not event replay.
  await p.keyboard.insertText('\nteh');let value=await get();await select(value.length-3,value.length);
  await cdp.send('Input.insertText',{text:'the'});expect((await get()).endsWith('\nThe')).toBe(true);
  value=await get();await select(value.length-3,value.length);await f.getByRole('button',{name:'Bold',exact:true}).click();
  expect((await get()).endsWith('\n**The**')).toBe(true);
  await f.getByRole('button',{name:'Undo',exact:true}).click();expect((await get()).endsWith('\nThe')).toBe(true);
  await f.getByRole('button',{name:'Redo',exact:true}).click();expect((await get()).endsWith('\n**The**')).toBe(true);
  report.checks.push('native selected replacement, floating toolbar bold, undo and redo use the same transaction history');
  // Place caret elsewhere so task is a tappable widget; toggling changes one byte.
  await select(4);value=await get();await f.locator('.cm-lp-marker input[aria-label="New task"]').check();
  expect(await get()).toBe(value.replace('- [ ] New task','- [x] New task'));
  report.checks.push('rendered checkbox toggles a single source byte');
  value=await get();expected=initial+value.slice(lfInitial.length).replace(/\n/g,'\r\n');await waitSaved(expected);
  report.nativeEvents=await f.evaluate(()=>window.nativeEvents);expect(report.nativeEvents.some(e=>e.type==='compositionstart')).toBe(true);expect(report.nativeEvents.some(e=>e.inputType==='insertCompositionText'||e.type==='textupdate'&&e.text==='日本')).toBe(true);
  // Save/reload/readback: never rely only on DOM equality.
  await p.reload();f=await(await p.locator('#app-frame').elementHandle()).contentFrame();await f.getByRole('treeitem',{name:'Open '+note.slice(0,-3),exact:true}).click();
  await expect.poll(get).toBe(value);expect(await read()).toBe(expected);
  report.checks.push('reloaded editor and API readback match saved bytes including untouched mixed EOLs');
  // Wiki navigation + hosted Back restores source note before returning to the tree.
  await select(4);await f.getByRole('button',{name:'Open linked note Quick Notes',exact:true}).click();await expect(f.locator('#title')).toHaveValue('Quick Notes');
  await p.locator('#hardware-back').click();await expect(f.locator('#title')).toHaveValue(note.slice(0,-3));
  await f.locator('#note-menu').click();await expect(f.locator('#sheet')).toBeVisible();await p.locator('#hardware-back').click();await expect(f.locator('#sheet')).not.toBeVisible();
  await f.locator('#back').click();await p.locator('#hardware-back').click();expect(p.url()).toContain(base);await expect(p.locator('#app-frame')).toBeAttached();
  report.checks.push('wiki tap opens; hosted Back restores wiki parent, closes sheet/drawer and stays inside Wizard');
  // Conflict is explicit; never overwrite external content.
  const current=await p.request.get(base+'/notes/api/note?path='+encodeURIComponent(note));const n=await current.json();
  await p.request.put(base+'/notes/api/note',{data:{path:note,content:n.content+'external',rev:n.rev}});
  await select((await get()).length);await p.keyboard.insertText(' local');await expect(f.locator('#save')).toBeVisible({timeout:7000});
  expect(await p.evaluate(()=>WizAppServices.inspect().some(s=>s.holds.length>0))).toBe(true);
  expect((await read()).endsWith('external')).toBe(true);await f.locator('#save').click();await expect(f.locator('#sheet')).toBeVisible();
  await expect(f.locator('#sheet')).toContainText('Keep both versions');
  report.checks.push('revision conflict retains local draft and update hold; external bytes remain unchanged');
  expect(report.errors).toEqual([]);
  fs.writeFileSync(path.join(out,'input-'+label+'.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({label,checks:report.checks,errors:report.errors},null,2));await c.close();
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
