// Integration acceptance against a disposable seeded vault, real Wizard host services.
// QA_BASE hosts notes at /notes/ in #app-frame. Never point at an owner's vault.
const {chromium,expect}=require(process.env.QA_PLAYWRIGHT||'@playwright/test');
const fs=require('node:fs'),path=require('node:path');
const base=process.env.QA_BASE||'http://127.0.0.1:9258',out=process.env.QA_OUT||'qa-output';
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.QA_CHROME?{executablePath:process.env.QA_CHROME}:{}),args:['--no-sandbox']});
 const report={checks:[],screenshots:[],errors:[],deviceGap:'Desktop Chromium Android emulation and synthetic CDP composition, not a physical handset/IME.'};
 try{
 for(const [width,height]of [[390,844],[1280,800]])for(const skin of ['nebula','obsidian-light']){
  const label=(width===390?'phone':'desktop')+'-'+skin;
  const c=await browser.newContext({viewport:{width,height},isMobile:width===390,hasTouch:width===390,serviceWorkers:'block',...(width===390?{userAgent:'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36'}:{})});
  const p=await c.newPage();p.on('pageerror',e=>report.errors.push(e.message));
  await p.goto(base+'/?skin='+skin);const f=await(await p.locator('#app-frame').elementHandle()).contentFrame();
  await f.getByRole('treeitem',{name:'Open Live Preview',exact:true}).click();
  await expect(f.locator('.cm-content')).toBeVisible();await expect(f.locator('#read')).toBeHidden();
  async function select(from,to=from){await f.evaluate(async({from,to})=>{const {EditorView}=await import('./vendor/live-preview.js');const v=EditorView.findFromDOM(document.querySelector('.cm-editor'));v.dispatch({selection:{anchor:from,head:to}});v.focus();},{from,to});await p.waitForTimeout(70);}
  const doc=()=>f.evaluate(async()=>{const {EditorView}=await import('./vendor/live-preview.js');return EditorView.findFromDOM(document.querySelector('.cm-editor')).state.doc.toString();});
  const text=await doc();await select(text.lastIndexOf('Write here.')+4);
  await expect(f.locator('.cm-lp-h1')).toHaveText('A place to think');
  await expect(f.locator('.cm-lp-strong')).toHaveText('bold idea');
  expect(await f.locator('.cm-lp-h1').evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThan(24);
  expect(await f.locator('.cm-lp-strong').evaluate(e=>Number(getComputedStyle(e).fontWeight))).toBeGreaterThanOrEqual(650);
  const shot1=path.join(out,label+'-syntax-hidden.png');await p.screenshot({path:shot1});report.screenshots.push(shot1);
  await select(4);
  await expect(f.locator('.cm-lp-h1')).toHaveText('# A place to think');
  const shot2=path.join(out,label+'-syntax-visible.png');await p.screenshot({path:shot2});report.screenshots.push(shot2);
  report.checks.push(label+': default editable, rendered heading/bold/list/task/wiki, caret-only syntax reveal, Wizard skin');
  await c.close();
 }
 expect(report.errors).toEqual([]);
 fs.writeFileSync(path.join(out,'visual.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
