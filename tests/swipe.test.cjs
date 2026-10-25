// Real Chromium touch arbitration; disposable in-memory API, real Wizard Back bridge.
// QA_PLAYWRIGHT, QA_CHROME and WIZARD_CORE select installed tools/resources.
const {chromium,expect}=require(process.env.QA_PLAYWRIGHT||'@playwright/test');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),core=process.env.WIZARD_CORE;
if(!core)throw new Error('WIZARD_CORE must point to the approved shell web/core directory');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.QA_CHROME?{executablePath:process.env.QA_CHROME}:{}),args:['--no-sandbox']});
 const report={checks:[],fixture:'In-memory read-only vault and registry; real app-client/app-services. CDP touch events at 390x844.'};
 try{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block'}),p=await context.newPage();
 const content=Array.from({length:90},(_,i)=>'Line '+i+' of a long Markdown document.').join('\n\n');
 await p.route('**/*',async route=>{
  const u=new URL(route.request().url()),n=u.pathname;
  const reply=(body,type='application/json')=>route.fulfill({status:200,contentType:type,body:typeof body==='string'?body:JSON.stringify(body)});
  if(n==='/')return reply('<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;height:100%}iframe{border:0;width:100%;height:100%}</style><script>window.WizCore={apps:()=>({APPS:[{id:"wizard-notes",url:"/wizard-notes/"}]}),appMigrations:{}}</script><script src="/wizard-os-home/core/app-services.js"></script><iframe id="frame"></iframe><script>WizAppServices.attach(frame,{appId:"wizard-notes",path:"/wizard-notes/",isVisible:()=>true});frame.src="/wizard-notes/"</script>','text/html');
  if(n.startsWith('/wizard-os-home/core/')){const file=path.join(core,path.basename(n));return reply(fs.existsSync(file)?fs.readFileSync(file,'utf8'):'','text/javascript');}
  if(n==='/wizard-notes/api/tree')return reply({children:Array.from({length:65},(_,i)=>({type:'note',path:`Note ${String(i).padStart(2,'0')}.md`,name:`Note ${String(i).padStart(2,'0')}`}))});
  if(n==='/wizard-notes/api/note')return reply({path:u.searchParams.get('path'),title:'Note 00',content,rev:'fixture'});
  if(n==='/wizard-notes/api/backlinks')return reply({notes:[]});
  if(n.startsWith('/wizard-notes/api/'))throw new Error('Unexpected API request '+n);
  if(n.startsWith('/wizard-notes/')){const name=n==='/wizard-notes/'?'index.html':n.slice('/wizard-notes/'.length);return reply(fs.readFileSync(path.join(root,'web',name),'utf8'),name.endsWith('.css')?'text/css':name.endsWith('.js')?'text/javascript':'text/html');}
  return reply('');
 });
 await p.goto('http://127.0.0.1:18781/');const f=await(await p.locator('#frame').elementHandle()).contentFrame();
 await f.getByRole('treeitem',{name:'Open Note 00',exact:true}).click();await expect(f.locator('#source')).toBeVisible();await f.locator('#mode').click();await expect(f.locator('#read')).toBeVisible();
 const cdp=await context.newCDPSession(p);
 async function swipe(x,y,dx,dy,ms=320,mid){
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  const steps=ms<100?3:10;
  for(let i=1;i<=steps;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/steps,y:y+dy*i/steps}]});if(i===5&&mid)await mid();await p.waitForTimeout(ms/steps);}
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(450);
 }
 const opened=()=>expect(f.locator('#app')).toHaveClass(/drawer-open/),closed=()=>expect(f.locator('#app')).not.toHaveClass(/drawer-open/);
 await swipe(90,350,180,4,320,async()=>{const x=await f.locator('#sidebar').evaluate(e=>e.getBoundingClientRect().x);expect(x).toBeGreaterThan(-300);expect(x).toBeLessThan(-50);});await opened();report.checks.push('swipe right opens and follows finger');
 await swipe(270,350,-180,3,320,async()=>{expect(await f.locator('#sidebar').evaluate(e=>e.getBoundingClientRect().x)).toBeLessThan(-30);});await closed();report.checks.push('drawer swipe left closes and follows finger');
 await swipe(100,350,55,1,600);await closed();report.checks.push('partial slow swipe snaps closed');
 await swipe(100,350,95,1,1);await opened();report.checks.push('intentional fast flick opens');
 await swipe(270,350,-50,0,600);await opened();report.checks.push('partial close snaps open');
 await swipe(375,350,-170,1);await closed();report.checks.push('backdrop swipe closes');
 await swipe(10,350,180,0);await opened();report.checks.push('left edge opens');
 const treeBefore=await f.locator('#tree').evaluate(e=>e.scrollTop);await swipe(180,500,3,-250);expect(await f.locator('#tree').evaluate(e=>e.scrollTop)).toBeGreaterThan(treeBefore);await opened();report.checks.push('tree vertical scroll remains native');
 expect(await p.evaluate(()=>WizAppServices.back(frame))).toBe('handled');await closed();report.checks.push('WizardApp Back closes drawer and keeps frame');
 const mainBefore=await f.locator('#main').evaluate(e=>e.scrollTop);await swipe(180,500,3,-250);expect(await f.locator('#main').evaluate(e=>e.scrollTop)).toBeGreaterThan(mainBefore);await closed();report.checks.push('reader vertical scroll remains native');
 await f.locator('#main').evaluate(e=>e.scrollTop=0);await f.locator('#mode').click();await f.locator('.cm-content').focus();
 await swipe(90,350,180,0);await closed();expect(await f.locator('.cm-content').evaluate(e=>document.activeElement===e)).toBe(true);report.checks.push('focused editor caret drag does not open');
 await swipe(180,500,3,-250);expect(await f.locator('#main').evaluate(e=>e.scrollTop)).toBeGreaterThan(0);await closed();report.checks.push('editing vertical scroll remains native');
 await f.evaluate(async()=>{const {EditorView}=await import('./vendor/live-preview.js');const v=EditorView.findFromDOM(document.querySelector('.cm-editor'));v.dispatch({selection:{anchor:2,head:12}});v.focus();});
 await swipe(10,350,180,0);await closed();report.checks.push('selected editor text blocks even the edge drawer gesture');
 await f.evaluate(async()=>{const {EditorView}=await import('./vendor/live-preview.js');EditorView.findFromDOM(document.querySelector('.cm-editor')).dispatch({selection:{anchor:2}});window.getSelection().removeAllRanges();});
 await f.locator('.cm-content').focus();await swipe(10,350,180,0);await opened();report.checks.push('focused editor permits 24px edge only');
 await context.clearPermissions();await p.emulateMedia({reducedMotion:'reduce'});expect(await f.locator('#sidebar').evaluate(e=>getComputedStyle(e).transitionDuration)).toBe('0s');report.checks.push('reduced motion disables snap animation');
 expect(await p.evaluate(()=>WizAppServices.back(frame))).toBe('handled');await closed();
 if(process.env.QA_OUT){fs.mkdirSync(process.env.QA_OUT,{recursive:true});await p.screenshot({path:path.join(process.env.QA_OUT,'phone-swipe.png')});fs.writeFileSync(path.join(process.env.QA_OUT,'swipe.json'),JSON.stringify(report,null,2));}
 console.log(JSON.stringify(report,null,2));await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
