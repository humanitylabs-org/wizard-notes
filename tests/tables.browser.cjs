// Tables + link acceptance in real Chromium. ONLY run against a scratch Notes server/vault.
// QA_BASE is the Notes server root (e.g. a local container on a spare port); WIZARD_CORE is the shell
// web/core directory (real app-client/app-services). The app runs framed in a minimal same-origin host
// that sends the Appearance contract (light/dark Wizard kit palettes). Optional QA_SHOT_NOTE adds
// screenshots of another scratch note (vault path) in Reading and Live Preview.
const {chromium,expect}=require(process.env.QA_PLAYWRIGHT||'@playwright/test');
const fs=require('node:fs'),path=require('node:path');
const base=(process.env.QA_BASE||'http://127.0.0.1:18799').replace(/\/$/,''),out=process.env.QA_OUT||'qa-output',core=process.env.WIZARD_CORE;
if(!core)throw new Error('WIZARD_CORE must point to the approved shell web/core directory');
fs.mkdirSync(out,{recursive:true});
const note='QA tables.md',content=['# Tables','','Text with an [inline link](https://example.com/a/very/long/path?x=1) here.','',
 '| Left | Centre | Right | Empty |','|:-----|:------:|------:|-------|','| **bold** *em* | `a \\| b` | 12 | |','| [[Tables\\|alias]] | [site](https://example.com/) | 3.50 | x |','','After.',''].join('\n');
// Wizard kit palettes (web/wizard-ui.css fallbacks) sent the way the shell's appearance host sends them.
const PALETTE={dark:{base:'#05030c',text:'#f3efff',secondary:'#b9b0d8',muted:'#a59abf',border:'rgba(205,190,255,.24)',accent:'#b99bff',on:'#160b32'},
 light:{base:'#faf8fd',text:'#1a1933',secondary:'#484560',muted:'#66617a',border:'#d4cfde',accent:'#6844aa',on:'#ffffff'}};
function host(scheme){const c=PALETTE[scheme],tokens={canvas:'transparent',base:c.base,chrome:c.base,overlay:c.base,surface:`color-mix(in srgb, ${c.text} 6%, transparent)`,'surface-raised':`color-mix(in srgb, ${c.text} 10%, transparent)`,text:c.text,'text-secondary':c.secondary,'text-muted':c.muted,border:c.border,accent:c.accent,'accent-soft':`color-mix(in srgb, ${c.accent} 16%, transparent)`,'on-accent':c.on,'reader-surface':'transparent'};
 const appearance={version:1,revision:1,skin:'nebula',colorScheme:scheme,presentation:'window',tokens};
 return `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;height:100%;background:${c.base};color-scheme:${scheme}}iframe{border:0;width:100%;height:100%;display:block}</style>
<script>window.WizCore={apps:()=>({APPS:[{id:"wizard-notes",url:"/"}]}),appMigrations:{}}</script><script src="/wizard-os-home/core/app-services.js"></script>
<iframe id="frame"></iframe><script>let rev=0;addEventListener('message',e=>{if(e.origin===location.origin&&e.data&&e.data.type==='wizard:appearance:ready')frame.contentWindow.postMessage({type:'wizard:appearance',appearance:{...${JSON.stringify(appearance)},revision:++rev}},location.origin);});
WizAppServices.attach(frame,{appId:"wizard-notes",path:"/",isVisible:()=>true});frame.src="/"</script>`;}
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.QA_CHROME?{executablePath:process.env.QA_CHROME}:{}),args:['--no-sandbox']});
 const report={checks:[],screenshots:[],errors:[]};
 try{
  const seed=await browser.newContext(),api=seed.request;
  const old=await api.get(base+'/api/note?path='+encodeURIComponent(note));
  expect((await api.fetch(base+'/api/note',{method:old.ok()?'PUT':'POST',data:{path:note,content,...(old.ok()?{rev:(await old.json()).rev}:{})}})).ok()).toBe(true);
  await seed.close();
  for(const [width,height]of [[390,844],[1400,900]])for(const scheme of ['light','dark']){
   const label=(width===390?'phone':'desktop')+'-'+scheme,phone=width===390;
   const c=await browser.newContext({viewport:{width,height},isMobile:phone,hasTouch:phone,serviceWorkers:'block',colorScheme:scheme});
   await c.route('**/wizard-os-home/core/*',r=>{const file=path.join(core,path.basename(new URL(r.request().url()).pathname));r.fulfill({status:200,contentType:'text/javascript',body:fs.existsSync(file)?fs.readFileSync(file,'utf8'):''});});
   await c.route('https://example.com/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<title>stub</title>'}));
   await c.route('**/__qa-host.html',r=>r.fulfill({status:200,contentType:'text/html',body:host(scheme)}));
   const page=await c.newPage();page.on('pageerror',e=>report.errors.push(label+': '+e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().includes('example.com'))report.errors.push(label+': HTTP '+r.status()+' '+r.url());});
   await page.goto(base+'/__qa-host.html');
   const p=await(await page.locator('#frame').elementHandle()).contentFrame();
   await expect.poll(()=>p.evaluate(()=>document.documentElement.dataset.colorScheme)).toBe(scheme);
   const open=async name=>{if(!(await p.locator('#tree').isVisible())||(phone&&!(await p.locator('#app').getAttribute('class')).includes('no-note')))await p.locator('#back').click();const parts=name.split('/');for(const folder of parts.slice(0,-1)){const f=p.getByRole('treeitem',{name:'Open '+folder,exact:true});if(await f.getAttribute('aria-expanded')!=='true')await f.click();}await p.getByRole('treeitem',{name:'Open '+parts.at(-1),exact:true}).click();await expect(p.locator('.cm-content')).toBeVisible();};
   const view=()=>p.evaluate(async()=>{const {EditorView}=await import('./vendor/live-preview.js');return EditorView.findFromDOM(document.querySelector('.cm-editor'));});
   const select=pos=>p.evaluate(async pos=>{const {EditorView}=await import('./vendor/live-preview.js');const v=EditorView.findFromDOM(document.querySelector('.cm-editor'));v.dispatch({selection:{anchor:pos}});v.focus();},pos);
   const doc=()=>p.evaluate(async()=>{const {EditorView}=await import('./vendor/live-preview.js');return EditorView.findFromDOM(document.querySelector('.cm-editor')).state.doc.toString();});
   await open('QA tables');
   // Live Preview, caret on the heading: table is a real table, links collapse to their text.
   await select(2);
   const lp=p.locator('#source .cm-lp-table table');
   await expect(lp).toHaveCount(1);
   expect(await lp.locator('thead th').allTextContents()).toEqual(['Left','Centre','Right','Empty']);
   expect(await lp.locator('tbody tr').count()).toBe(2);
   expect(await lp.locator('tbody tr').first().locator('td').evaluateAll(t=>t.map(e=>getComputedStyle(e).textAlign))).toEqual(['left','center','right','left']);
   await expect(lp.locator('strong')).toHaveText('bold');await expect(lp.locator('code')).toHaveText('a | b');
   await expect(lp.locator('a[href="https://example.com/"]')).toHaveAttribute('target','_blank');
   await expect(lp.locator('button.wiki')).toHaveText('alias');
   await expect(p.locator('#source .cm-content')).not.toContainText('|---');
   const link=p.locator('#source .cm-lp-link[data-href]');
   await expect(link).toHaveText('inline link');
   await expect(p.locator('#source .cm-line').nth(2)).toHaveText('Text with an inline link here.');
   // Clicking a collapsed link opens it in a new tab and leaves the source untouched.
   const before=await doc();
   const [popup]=await Promise.all([c.waitForEvent('page'),link.click()]);
   await popup.waitForURL(/example\.com\/a\/very\/long\/path/);await popup.close();
   expect(await doc()).toBe(before);
   report.checks.push(label+': Live Preview renders table (header, alignment row hidden, inline/wiki/links), collapsed link opens in new tab');
   // Caret on the link's line reveals the raw link.
   await select(before.indexOf('Text with')+2);
   await expect(p.locator('#source .cm-line').nth(2)).toHaveText('Text with an [inline link](https://example.com/a/very/long/path?x=1) here.');
   // Tapping a plain cell enters the raw table with the caret in that cell.
   await select(2);
   await lp.locator('td').filter({hasText:'3.50'}).click({position:{x:4,y:4}});
   await expect(p.locator('#source .cm-lp-table')).toHaveCount(0);
   await expect(p.locator('#source .cm-lp-table-source').first()).toHaveText('| Left | Centre | Right | Empty |');
   const caret=await p.evaluate(async()=>{const {EditorView}=await import('./vendor/live-preview.js');return EditorView.findFromDOM(document.querySelector('.cm-editor')).state.selection.main.head;});
   expect(before.slice(caret,caret+4)).toBe('3.50');
   const editing=path.join(out,`notes_pr_${label}-live-editing-table.png`);await page.screenshot({path:editing});report.screenshots.push(editing);
   await page.keyboard.type('0');
   await expect.poll(async()=>(await (await page.request.get(base+'/api/note?path='+encodeURIComponent(note))).json()).content,{timeout:7000}).toBe(content.replace('3.50','03.50'));
   await page.keyboard.press('Backspace');
   await expect.poll(async()=>(await (await page.request.get(base+'/api/note?path='+encodeURIComponent(note))).json()).content,{timeout:7000}).toBe(content);
   await select(2);await expect(p.locator('#source .cm-lp-table')).toHaveCount(1);
   report.checks.push(label+': tapping a cell shows editable raw table source with caret in that cell; edits save; leaving re-renders');
   // Reading view.
   await p.locator('#mode').click();await expect(p.locator('#read')).toBeVisible();
   const rt=p.locator('#read table');
   expect(await rt.locator('th').allTextContents()).toEqual(['Left','Centre','Right','Empty']);
   await expect(p.locator('#read')).not.toContainText('|---');
   await expect(p.locator('#read a[href^="https://example.com/a/"]')).toHaveAttribute('target','_blank');
   await expect(rt.locator('button.wiki')).toHaveText('alias');
   report.checks.push(label+': Reading renders table and links open in a new tab');
   await p.locator('#mode').click();
   if(process.env.QA_SHOT_NOTE){
    const name=process.env.QA_SHOT_NOTE.replace(/\.md$/,'');await open(name);if(!phone&&await p.locator('#tree').isVisible())await p.locator('#back').click();await p.evaluate(()=>{document.activeElement?.blur();});
    await page.waitForTimeout(150);
    const scroll=await p.locator('#source .md-table-wrap.cm-lp-table').first().evaluate(e=>({client:e.clientWidth,scroll:e.scrollWidth,overflow:getComputedStyle(e).overflowX}));
    if(phone){expect(scroll.scroll).toBeGreaterThan(scroll.client);expect(scroll.overflow).toBe('auto');report.checks.push(label+': wide table scrolls sideways ('+scroll.scroll+'px in '+scroll.client+'px)');
     // A sideways swipe that starts on the table scrolls it; it never opens the file drawer.
     const wrap=p.locator('#source .md-table-wrap.cm-lp-table').first(),box=await wrap.boundingBox(),cdp=await c.newCDPSession(page);
     await wrap.evaluate(e=>{e.scrollLeft=300;});const x=box.x+40,y=box.y+80;
     await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
     for(let i=1;i<=10;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+i*16,y}]});await page.waitForTimeout(25);}
     await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(450);
     await expect(p.locator('#app')).not.toHaveClass(/drawer-open/);
     await wrap.evaluate(e=>{e.scrollLeft=0;});
     report.checks.push(label+': swipe on a table does not open the drawer');}
    const pageWidth=await p.evaluate(()=>document.documentElement.scrollWidth);expect(pageWidth).toBeLessThanOrEqual(width);
    for(const mode of ['live','reading']){
     if(mode==='reading'){await p.locator('#mode').click();await expect(p.locator('#read table').first()).toBeVisible();}
     const shot=path.join(out,`notes_pr_${label}-${mode}.png`);await page.screenshot({path:shot});report.screenshots.push(shot);
     // Second view: the next table and the links below it.
     await p.evaluate(()=>{const tables=document.querySelectorAll(document.querySelector('#read').hidden?'#source .md-table-wrap':'#read .md-table-wrap'),t=tables[1]||tables[0],main=document.getElementById('main');main.scrollTop+=t.getBoundingClientRect().top-90;});
     await page.waitForTimeout(150);
     const shot2=path.join(out,`notes_pr_${label}-${mode}-2.png`);await page.screenshot({path:shot2});report.screenshots.push(shot2);
     await p.evaluate(()=>{document.getElementById('main').scrollTop=0;});
    }
    await p.locator('#mode').click();
   }
   await c.close();
  }
  expect(report.errors).toEqual([]);
  fs.writeFileSync(path.join(out,'tables.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
