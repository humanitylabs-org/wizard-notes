import {createLiveEditor} from './vendor/live-preview.js';
const $=id=>document.getElementById(id), W=window.WizardApp;
if(!W) throw new Error('Wizard shared client is unavailable. Open Notes inside Wizard.');
W.ready({name:'notes',version:'0.1.0'});
W.theme.get(); W.theme.onChange(()=>{});
const stored=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback;}catch{return fallback;}};
const store=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{notice('Local draft recovery is unavailable. Keep this window open until saved.');}};
const state={folder:'',note:null,tree:[],search:false,read:false,drawer:false,trail:[],sort:stored('notes.sort','name'),sidebarHidden:stored('notes.sidebarHidden',true),expanded:new Set(stored('notes.expanded',[]))};
const phone=()=>matchMedia('(max-width:760px)').matches;
const collator=new Intl.Collator(undefined,{numeric:true,sensitivity:'base'});
const drafts=new Map(); let sheetBack=null,searchTimer,searchSeq=0,noticeTimer,navSeq=0;
const editor=createLiveEditor($('source'),{transform:transformText,continueList,onWiki:target=>act(()=>wiki(target)),onChange:content=>{const n=state.note;if(!n)return;n.content=content;changed(n);}});
const parent=p=>p.includes('/')?p.slice(0,p.lastIndexOf('/')):'', base=p=>p.split('/').pop(), join=(a,b)=>a?a+'/'+b:b;
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
const button=(text,fn,label)=>{const b=el('button',text);b.type='button';b.onclick=async()=>{if(b.disabled)return;b.disabled=true;try{await act(fn);}finally{b.disabled=false;}};if(label)b.setAttribute('aria-label',label);return b;};
function notice(text){$('notice').textContent=text;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('notice').textContent='',6500);}
async function act(fn){try{await fn();}catch(e){notice(e.message);}}
async function api(route,body,method='POST',keepalive=false){const r=await fetch('api/'+route,{method:body===undefined?'GET':method,headers:body===undefined?{}:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),keepalive});const v=await r.json();if(!r.ok){const e=new Error(v.error||'Unable to save. Retry.');e.status=r.status;throw e;}return v;}
function allEntries(nodes=state.tree){return nodes.flatMap(n=>[n,...(n.children?allEntries(n.children):[])]);}
function folderChildren(path){return path?allEntries().find(n=>n.path===path)?.children||[]:state.tree;}
async function refresh(){state.tree=(await api('tree')).children;renderTree();}
function ordered(nodes){return [...nodes].sort((a,b)=>(a.type!==b.type?(a.type==='folder'?-1:1):0)||(state.sort==='modified'?(b.modified||0)-(a.modified||0):0)||collator.compare(a.name,b.name));}
function persistExpanded(){store('notes.expanded',[...state.expanded]);}
function toggleFolder(path){state.folder=path;state.expanded.has(path)?state.expanded.delete(path):state.expanded.add(path);persistExpanded();renderTree();}
function renderTree(){
 const root=$('tree'),scroll=root.scrollTop;root.replaceChildren();
 function branch(nodes,dest,depth){for(const n of ordered(nodes)){
  const row=el('div',undefined,'entry'+(state.note?.path===n.path?' active':''));row.dataset.path=n.path;
  const open=button('',()=>n.type==='folder'?toggleFolder(n.path):openNote(n.path),'Open '+n.name);open.className='open';open.setAttribute('role','treeitem');open.setAttribute('aria-level',depth+1);open.setAttribute('aria-selected',String(state.note?.path===n.path));
  if(n.type==='folder')open.setAttribute('aria-expanded',String(state.expanded.has(n.path)));
  const chevron=el('span',n.type==='folder'?(state.expanded.has(n.path)?'⌄':'›'):'','chevron');chevron.setAttribute('aria-hidden','true');open.append(chevron,el('span',n.name,'label'));row.append(open);
  const more=button('⋯',()=>itemMenu(n),'Actions for '+n.name);more.className='more';row.append(more);
  let timer,start,suppress=false;
  row.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('.more'))return;start=[e.clientX,e.clientY];timer=setTimeout(()=>{suppress=true;itemMenu(n);},550);});
  const cancel=()=>clearTimeout(timer);row.addEventListener('pointerup',cancel);row.addEventListener('pointercancel',cancel);row.addEventListener('pointerleave',cancel);row.addEventListener('pointermove',e=>{if(start&&Math.hypot(e.clientX-start[0],e.clientY-start[1])>8)cancel();});
  row.addEventListener('click',e=>{if(suppress){suppress=false;e.preventDefault();e.stopImmediatePropagation();}},true);row.oncontextmenu=e=>{e.preventDefault();cancel();itemMenu(n);};
  dest.append(row);if(n.type==='folder'&&state.expanded.has(n.path)){const group=el('div',undefined,'tree-children');group.setAttribute('role','group');dest.append(group);branch(n.children,group,depth+1);}
 }}branch(state.tree,root,0);root.scrollTop=scroll;
 const entries=allEntries(),files=entries.filter(n=>n.type==='note').length,folders=entries.length-files;$('vault-count').textContent=files+' files, '+folders+' folders';
 $('sort').setAttribute('aria-label',state.sort==='name'?'Sort by modified':'Sort by name');$('sort').title='Sorted by '+state.sort;
 $('collapse').setAttribute('aria-label',state.expanded.size?'Collapse all folders':'Expand all folders');
}
function renderViews(){
 $('note').hidden=!state.note||state.search;$('note-controls').hidden=!state.note||state.search;$('search').hidden=!state.search;
 $('app').classList.toggle('no-note',!state.note);$('app').classList.toggle('drawer-open',state.drawer);$('app').classList.toggle('search-open',state.search);$('app').classList.toggle('sidebar-hidden',state.sidebarHidden&&!!state.note);
 $('backdrop').hidden=!state.drawer||!state.note;$('back').setAttribute('aria-expanded',String(phone()?state.drawer:!state.sidebarHidden));
 $('formatting').hidden=!state.note||state.read||state.search;renderTree();
 // Off-canvas trees must not remain reachable by keyboard/screen reader.
 $('sidebar').inert=phone()&&(state.search||(!!state.note&&!state.drawer));
}
function showDrawer(open){state.drawer=!!open&&!!state.note;renderViews();if(open)document.activeElement?.blur();}
function openFolder(path){++navSeq;state.search=false;state.note=null;state.trail=[];state.folder=path;state.drawer=false;renderViews();}
async function openNote(path,editing=false,viaLink=false,restoring=false){const ticket=++navSeq;state.search=false;let n=drafts.get(path);if(!n||(!dirty(n)&&!n.busy)){const raw=await api('note?path='+encodeURIComponent(path));n={...raw,titleDraft:raw.title,saved:raw.content,hold:null,timer:null,busy:null,error:null};drafts.set(path,n);}if(ticket!==navSeq)return;if(!restoring){if(viaLink&&state.note&&state.note.path!==path)state.trail.push({path:state.note.path,read:state.read,scroll:$('main').scrollTop});else if(!viaLink)state.trail=[];}state.note=n;state.drawer=false;state.folder=parent(path);let ancestor=state.folder;while(ancestor){state.expanded.add(ancestor);ancestor=parent(ancestor);}store('notes.expanded',[...state.expanded]);state.read=false;$('title').value=n.titleDraft;editor.setValue(n.content);renderNote();renderViews();$('main').scrollTop=0;if(editing){$('title').focus();$('title').select();}}
function autoSize(){editor.view.requestMeasure();}
function renderNote(){const n=state.note;if(!n)return;$('source').hidden=state.read;$('read').hidden=!state.read;$('backlinks').hidden=false;$('mode').replaceChildren(icon(state.read?'edit':'book'));$('mode').setAttribute('aria-label',state.read?'Live Preview':'Read note');$('formatting').hidden=state.read||state.search;if(state.read)markdown(n.content,$('read'));else requestAnimationFrame(autoSize);loadBacklinks(n);saveStatus(n);}
async function loadBacklinks(n){try{const data=await api('backlinks?path='+encodeURIComponent(n.path));if(state.note!==n)return;const dest=$('backlinks');dest.replaceChildren();if(data.notes.length){dest.append(el('h2','Linked from'));for(const a of data.notes)dest.append(button(a.title,()=>openNote(a.path,false,true)));}}catch(e){notice(e.message);}}
function dirty(n){return n.content!==n.saved||n.titleDraft!==n.title;}
function saveStatus(n){if(state.note!==n)return;const b=$('save');b.hidden=!n.error;b.textContent=n.error?'Retry save':'';b.title=n.error||'Retry saving';}
function persistDrafts(){store('notes.drafts',[...drafts.values()].filter(dirty).map(({path,content,rev,title,titleDraft,saved})=>({path,content,rev,title,titleDraft,saved})));}
function changed(n){n.error=null;persistDrafts();if(!n.hold)n.hold=W.update.hold('Unsaved note: '+n.path);clearTimeout(n.timer);n.timer=editor.composing?null:setTimeout(()=>act(()=>save(n)),600);saveStatus(n);}
async function save(n,keepalive=false){clearTimeout(n.timer);if(n.busy){await n.busy;if(dirty(n)&&!n.error)return save(n,keepalive);return;}if(!dirty(n)){n.hold?.release();n.hold=null;saveStatus(n);return;}const content=n.content,title=n.titleDraft.trim();if(!title||/[\/\\]/.test(title)||title.startsWith('.')){n.error='Use a visible title without / or \\.';saveStatus(n);throw new Error(n.error);}n.busy=(async()=>{await Promise.resolve();try{if(content!==n.saved){const r=await api('note',{path:n.path,rev:n.rev,content},'PUT',keepalive);const readback=await api('note?path='+encodeURIComponent(n.path));if(readback.rev!==r.rev||readback.content!==content)throw new Error('Save readback changed. Your draft is retained.');n.rev=r.rev;n.saved=content;}if(title!==n.title){const old=n.path,to=join(parent(old),title+'.md');await api('move',{from:old,to},'POST',keepalive);n.path=to;n.title=title;drafts.delete(old);drafts.set(to,n);}if(n.titleDraft.trim()===title)n.titleDraft=title;if(n.error)$('notice').textContent='';n.error=null;if(!dirty(n)){n.hold?.release();n.hold=null;}await refresh();}catch(e){n.conflict=e.status===409;n.error=e.status===409?'Changed elsewhere or name taken. Your draft is kept. Retry after reconciling.':e.message;notice(n.error);throw e;}finally{n.busy=null;persistDrafts();saveStatus(n);}})();saveStatus(n);return n.busy;}
async function flush(){await Promise.all([...drafts.values()].filter(dirty).map(n=>save(n)));}
// CodeMirror owns beforeinput, composition and history; never replay native text.
$('title').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();editor.select(0);}};
$('title').oninput=()=>{const n=state.note;n.titleDraft=$('title').value;changed(n);};
$('save').onclick=()=>act(()=>state.note.conflict?resolveConflict(state.note):save(state.note));
async function resolveConflict(n){const body=sheet('Note changed elsewhere');body.append(el('p','Your local text is safe. Keep both versions by saving your draft as a new note, or cancel and reconcile before retrying.'));try{const latest=await api('note?path='+encodeURIComponent(n.path));const details=el('details'),summary=el('summary','Latest saved version'),pre=el('pre',latest.content);details.append(summary,pre);body.append(details);}catch{body.append(el('p','The original note may have moved or is temporarily unavailable.'));}body.append(button('Save draft as a new note',async()=>{const folder=parent(n.path);for(let i=1;i<=100;i++){const title=n.titleDraft.trim()+' (copy'+(i>1?' '+i:'')+')',path=join(folder,title+'.md');try{await api('note',{path,content:n.content});n.hold?.release();n.hold=null;clearTimeout(n.timer);drafts.delete(n.path);persistDrafts();closeSheet();await refresh();await openNote(path);notice('Draft saved as a separate note. Original unchanged.');return;}catch(e){if(e.status!==409)throw e;}}throw new Error('Choose a different title for your copy.');}),button('Cancel',closeSheet));}
$('mode').onclick=()=>{state.read=!state.read;renderNote();if(!state.read)editor.focus();};
// Reading is deliberately non-editable. Only the book/pencil control changes view.

function shareNote(){const n=state.note;W.share.text({title:n.titleDraft,text:'# '+n.titleDraft+'\n\n'+n.content}).then(out=>notice(out==='copied'?'Copied':out==='shared'?'Shared':out==='cancelled'?'Sharing cancelled':'Sharing unavailable')).catch(()=>notice('Sharing unavailable'));}
$('note-menu').onclick=()=>{const b=sheet(state.note.titleDraft);b.append(button('Search',()=>{closeSheet();openSearch();}),button('Today',()=>{closeSheet();return today();}),button('Share',()=>{closeSheet();shareNote();}),button('Note actions…',()=>itemMenu({path:state.note.path,name:state.note.title,type:'note'})));};
function closeSheet(){if($('sheet').open)$('sheet').close();sheetBack?.release();sheetBack=null;}
function sheet(title){closeSheet();$('sheet-title').textContent=title;$('sheet-body').replaceChildren();$('sheet').showModal();sheetBack=W.back.push(()=>{closeSheet();return true;});return $('sheet-body');}
$('close-sheet').onclick=closeSheet;$('sheet').oncancel=e=>{e.preventDefault();closeSheet();};
function askName(title,value,submit){const body=sheet(title),form=el('form'),input=el('input');input.type='text';input.required=true;input.maxLength=150;input.value=value;input.setAttribute('aria-label',title);const error=el('p');const actions=el('div',undefined,'actions');actions.append(button('Cancel',closeSheet));const ok=el('button','Save','primary');ok.type='submit';actions.append(ok);form.append(input,error,actions);form.onsubmit=e=>{e.preventDefault();act(async()=>{ok.disabled=true;try{await submit(input.value.trim());closeSheet();}catch(err){error.textContent=err.message;}finally{ok.disabled=false;}});};body.append(form);requestAnimationFrame(()=>{input.focus();input.select();});}
function newFolder(folder=state.folder){askName('New folder','',async name=>{const path=join(folder,name);await api('folder',{path});if(folder)state.expanded.add(folder);persistExpanded();await refresh();});}
async function newNote(folder=state.folder){let name='Untitled',i=1;const paths=new Set(allEntries().map(n=>n.path));while(paths.has(join(folder,name+'.md')))name='Untitled '+(++i);const path=join(folder,name+'.md');await api('note',{path,content:''});closeSheet();await refresh();await openNote(path,true);}
function itemMenu(n){const b=sheet(n.name);const here=n.type==='folder'?n.path:parent(n.path);b.append(button('New note here',()=>newNote(here)),button('New folder here',()=>newFolder(here)),button('Rename',()=>askName('Rename',n.name,async name=>{await flush();const to=join(parent(n.path),name+(n.type==='note'?'.md':''));await api('move',{from:n.path,to});await afterMove(n.path,to); })),button('Move to…',()=>folderPicker(n)),button('Delete',()=>{const body=sheet('Move to trash?');body.append(el('p',n.name+' can be restored from the vault’s .trash folder or the restore API.'),button('Move to trash',async()=>{await flush();const r=await api('delete',{path:n.path});if(state.note&&(state.note.path===n.path||state.note.path.startsWith(n.path+'/')))openFolder(parent(n.path));for(const [path] of drafts)if(path===n.path||path.startsWith(n.path+'/'))drafts.delete(path);if(state.folder===n.path||state.folder.startsWith(n.path+'/'))state.folder=parent(n.path);closeSheet();await refresh();const undo=sheet('Moved to trash');undo.append(button('Undo delete',async()=>{await api('restore',{trash_id:r.trash_id});closeSheet();await refresh();}),button('Done',closeSheet));}));}));}
async function afterMove(from,to){for(const [p,n] of [...drafts])if(p===from||p.startsWith(from+'/')){drafts.delete(p);n.path=to+p.slice(from.length);n.title=base(n.path).replace(/\.md$/,'');n.titleDraft=n.title;drafts.set(n.path,n);}if(state.folder===from||state.folder.startsWith(from+'/'))state.folder=to+state.folder.slice(from.length);if(state.note){$('title').value=state.note.titleDraft;state.folder=parent(state.note.path);}await refresh();renderViews();}
function folderPicker(item){let at='';const body=sheet('Move '+item.name);const draw=()=>{body.replaceChildren();const bar=el('div',undefined,'tools');bar.append(button('‹',()=>{if(at){at=parent(at);draw();}else closeSheet();},'Parent folder'),el('span',at||'Vault'));body.append(bar);const choices=folderChildren(at).filter(n=>n.type==='folder'&&n.path!==item.path&&!n.path.startsWith(item.path+'/'));for(const n of choices)body.append(button('▱  '+n.name,()=>{at=n.path;draw();}));const move=button('Move here',async()=>{await flush();const to=join(at,base(item.path));await api('move',{from:item.path,to});await afterMove(item.path,to);closeSheet();});move.className='primary';body.append(move);};draw();}
async function today(){const n=await api('today',{});await refresh();await openNote(n.path);}
$('add').onclick=()=>act(()=>newNote());$('add-folder').onclick=()=>newFolder();
$('sort').onclick=()=>{state.sort=state.sort==='name'?'modified':'name';store('notes.sort',state.sort);renderTree();};
$('collapse').onclick=()=>{state.expanded=state.expanded.size?new Set():new Set(allEntries().filter(n=>n.type==='folder').map(n=>n.path));persistExpanded();renderTree();};
$('vault-menu').onclick=()=>{const b=sheet('Vault');b.append(el('p','Plain Markdown files. '+$('vault-count').textContent),button('Today',()=>{closeSheet();return today();}),button('Search',()=>{closeSheet();openSearch();}),button('Hide explorer',()=>{closeSheet();if(phone())showDrawer(false);else{state.sidebarHidden=true;store('notes.sidebarHidden',true);renderViews();}}));};
function goBack(){
 if($('sheet').open){closeSheet();return true;}
 if(state.search){state.search=false;renderViews();return true;}
 if(state.drawer&&state.note){showDrawer(false);return true;}
 if(state.trail.length){const previous=state.trail.pop();act(async()=>{await openNote(previous.path,false,false,true);state.read=previous.read;renderNote();$('main').scrollTop=previous.scroll;});return true;}
 if(state.note){if(phone())showDrawer(true);else{state.sidebarHidden=false;renderViews();}return true;}
 return false;
}
W.back.register({canGoBack:()=>!!($('sheet').open||state.search||state.note),back:goBack});
$('back').onclick=()=>{if(phone())showDrawer(!state.drawer);else{state.sidebarHidden=!state.sidebarHidden;store('notes.sidebarHidden',state.sidebarHidden);renderViews();}};
$('backdrop').onclick=()=>showDrawer(false);
// App-frame domain gesture: shell thread-swipe-back is bound to Chats, not frames.
// Keep shell swipe-intent's deliberate 120px drag / 80px, .6px/ms flick rule.
// Axis locks at 10px; editable caret/selection drags keep all but the 24px edge.
let drawerSwipe=null,suppressDrawerClickUntil=0;
function drawerPreview(s,dx){
 const progress=Math.max(0,Math.min(1,((s.open?s.width:0)+dx)/s.width));
 $('app').classList.add('drawer-dragging');
 $('sidebar').style.transform=`translateX(${(progress-1)*s.width}px)`;
 $('backdrop').hidden=false;$('backdrop').style.opacity=String(progress*.3);
}
function finishDrawerSwipe(cancelled=false){
 const s=drawerSwipe;drawerSwipe=null;if(!s?.tracking)return;
 const travel=(s.open?-1:1)*s.dx,dy=Math.abs(s.dy),ms=performance.now()-s.time;
 const intentional=!cancelled&&dy<50&&travel>dy*2.5&&(travel>120||(travel>80&&travel/Math.max(1,ms)>.6));
 $('app').classList.remove('drawer-dragging');$('sidebar').style.transform='';$('backdrop').style.opacity='';
 suppressDrawerClickUntil=performance.now()+400;showDrawer(intentional?!s.open:s.open);
}
$('app').addEventListener('touchstart',e=>{
 finishDrawerSwipe(true);
 if(!phone()||!state.note||state.search||$('sheet').open||e.touches.length!==1)return;
 const t=e.touches[0],target=e.target,open=state.drawer;
 if(open?!target.closest('#sidebar,#backdrop'):!target.closest('#main'))return;
 if(!open){
  const editing=document.activeElement?.matches('textarea,input,[contenteditable="true"]');
  if(editor.composing||!editor.view.state.selection.main.empty||String(window.getSelection()))return;
  if(editing&&t.clientX>24)return;
  if(target.closest('button,a,select,input,[contenteditable="true"]'))return;
  if(String(window.getSelection())||(!editor.view.state.selection.main.empty))return;
 }
 drawerSwipe={open,x:t.clientX,y:t.clientY,time:performance.now(),width:$('sidebar').getBoundingClientRect().width,dx:0,dy:0,axis:null,tracking:false};
},{passive:true});
$('app').addEventListener('touchmove',e=>{
 const s=drawerSwipe;if(!s)return;
 if(e.touches.length!==1){finishDrawerSwipe(true);return;}
 const t=e.touches[0],dx=t.clientX-s.x,dy=t.clientY-s.y;
 if(!s.axis){
  if(Math.max(Math.abs(dx),Math.abs(dy))<10)return;
  s.axis=Math.abs(dx)>Math.abs(dy)*2?'x':'y';
  if(s.axis==='y'){drawerSwipe=null;return;}
 }
 if(!s.tracking){if((s.open?-dx:dx)<24)return;s.tracking=true;}
 if(e.cancelable)e.preventDefault();s.dx=dx;s.dy=dy;drawerPreview(s,dx);
},{passive:false});
$('app').addEventListener('touchend',e=>{if(drawerSwipe&&e.changedTouches[0]){drawerSwipe.dx=e.changedTouches[0].clientX-drawerSwipe.x;drawerSwipe.dy=e.changedTouches[0].clientY-drawerSwipe.y;}finishDrawerSwipe();},{passive:true});
$('app').addEventListener('touchcancel',()=>finishDrawerSwipe(true),{passive:true});
$('app').addEventListener('click',e=>{if(performance.now()<suppressDrawerClickUntil){e.preventDefault();e.stopImmediatePropagation();}},true);
window.addEventListener('resize',()=>finishDrawerSwipe(true));
function openSearch(){++navSeq;state.search=true;state.drawer=false;renderViews();$('query').focus();runSearch();}
$('find').onclick=openSearch;$('close-search').onclick=goBack;
$('query').oninput=()=>{++searchSeq;clearTimeout(searchTimer);$('results').replaceChildren();$('search-label').textContent='Searching…';searchTimer=setTimeout(runSearch,120);};
function highlight(text,q){const frag=document.createDocumentFragment();if(!q){frag.append(document.createTextNode(text));return frag;}let start=0,at;while((at=text.toLowerCase().indexOf(q.toLowerCase(),start))!==-1){frag.append(document.createTextNode(text.slice(start,at)),el('mark',text.slice(at,at+q.length)));start=at+q.length;}frag.append(document.createTextNode(text.slice(start)));return frag;}
async function runSearch(){const seq=++searchSeq;const q=$('query').value.trim();try{const r=await api('search?q='+encodeURIComponent(q));if(seq!==searchSeq)return;$('search-label').textContent=q?r.notes.length+' results':'Recent notes';$('results').replaceChildren();for(const n of r.notes){const b=button('',()=>openNote(n.path));const title=el('strong');title.append(highlight(n.title,q));const snippet=el('p');snippet.append(highlight(n.snippet,q));b.append(title,el('small',parent(n.path)||'Vault'),snippet);$('results').append(b);}if(!r.notes.length)$('results').append(el('p','No notes found. Try a word from the body.','empty'));}catch(e){notice(e.message);}}
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&['k','p'].includes(e.key.toLowerCase())){e.preventDefault();openSearch();}if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();act(flush);}});
async function wiki(target){const result=await api('resolve?target='+encodeURIComponent(target)+'&current='+encodeURIComponent(state.note.path));if(result.path)return openNote(result.path,false,true);const name=base(result.target),folder=parent(state.note.path);const b=sheet('Create '+name+'?');b.append(el('p','This linked note does not exist yet. Create it in '+(folder||'Vault')+'?'),button('Create note',async()=>{const path=join(folder,name+'.md');await api('note',{path,content:''});closeSheet();await refresh();await openNote(path,true,true);}));}
// Domain Markdown: core chat-kit.md is shell-only, not exposed by WizardApp.
// Build DOM from text; raw HTML is never interpreted. Links use a protocol allowlist.
function inline(text,dest){const rx=/(`[^`]+`|\[\[[^\]\n]+\]\]|\[[^\]\n]+\]\([^\s)]+\)|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_)/g;let start=0,m;while((m=rx.exec(text))){dest.append(document.createTextNode(text.slice(start,m.index)));const t=m[0];if(t.startsWith('[[')){const bits=t.slice(2,-2).split('|');const b=button(bits[1]||bits[0],()=>wiki(bits[0]));b.className='wiki';dest.append(b);}else if(t.startsWith('`'))dest.append(el('code',t.slice(1,-1)));else if(t.startsWith('[')){const link=t.match(/^\[([^\]]+)\]\(([^)]+)\)$/);let url;try{url=new URL(link[2],location.href);}catch{}if(url&&['https:','http:','mailto:'].includes(url.protocol)){const a=el('a',link[1]);a.href=url.href;a.rel='noopener noreferrer';dest.append(a);}else dest.append(document.createTextNode(t));}else{const strong=t.startsWith('**')||t.startsWith('__'),n=el(strong?'strong':'em');n.textContent=t.slice(strong?2:1,strong?-2:-1);dest.append(n);}start=rx.lastIndex;}dest.append(document.createTextNode(text.slice(start)));}
function markdown(text,dest){
 dest.replaceChildren();const lines=text.replace(/\r\n?/g,'\n').split('\n'),note=state.note;let code=null,stack=[],paragraph=null;
 const reset=()=>{stack=[];paragraph=null;};
 for(let index=0;index<lines.length;index++){
  const line=lines[index];
  if(/^\s*```/.test(line)){reset();if(code)code=null;else{const pre=el('pre');code=el('code','');pre.append(code);dest.append(pre);}continue;}
  if(code){code.textContent+=line+'\n';continue;}
  if(!line.trim()){reset();continue;}
  const heading=line.match(/^(#{1,6})\s+(.+)$/),li=line.match(/^(\s*)([-*+] |\d+[.)] )(.+)$/),quote=line.match(/^>\s?(.*)$/);
  if(heading){reset();const h=el('h'+heading[1].length);inline(heading[2],h);dest.append(h);}
  else if(li){
   paragraph=null;const depth=li[1].replace(/\t/g,'    ').length,type=/^\d/.test(li[2])?'ol':'ul';
   while(stack.length&&stack.at(-1).depth>depth)stack.pop();
   if(stack.length&&stack.at(-1).depth===depth&&stack.at(-1).type!==type)stack.pop();
   if(!stack.length||stack.at(-1).depth<depth){const list=el(type);if(type==='ol')list.start=parseInt(li[2],10);(stack.at(-1)?.item||dest).append(list);stack.push({depth,type,list,item:null});}
   const level=stack.at(-1),item=el('li'),task=li[3].match(/^\[([ xX])\]\s(.*)$/);
   if(task){
    item.className='task';const check=el('input');check.type='checkbox';check.checked=task[1]!==' ';check.setAttribute('aria-label',task[2]);
    check.onchange=()=>{if(state.note!==note)return;const current=editor.view.state.doc.toString().split('\n'),match=current[index].match(/^(\s*[-*+] \[)[ xX]\]/);if(!match)return;const at=current.slice(0,index).reduce((n,line)=>n+line.length+1,0)+match[1].length;editor.view.dispatch({changes:{from:at,to:at+1,insert:check.checked?'x':' '}});};
    item.append(check);inline(task[2],item);
   }else inline(li[3],item);
   level.list.append(item);level.item=item;
  }else if(quote){reset();const block=el('blockquote');inline(quote[1],block);dest.append(block);}
  else if(stack.length&&/^\s+/.test(line)){const item=stack.at(-1).item;item.append(document.createTextNode('\n'));inline(line.trimStart(),item);}
  else{stack=[];if(!paragraph){paragraph=el('p');dest.append(paragraph);}else paragraph.append(document.createTextNode('\n'));inline(line,paragraph);}
 }
}
// Plain domain editor operations, shared by toolbar and desktop keys.
function transformText(text,start,end,kind){
 const selected=text.slice(start,end);
 if(['bold','italic','link'].includes(kind)){
  const [left,right]=kind==='bold'?['**','**']:kind==='italic'?['*','*']:['[[',']]'];
  const content=selected||(kind==='link'?'Note':'text');
  return {text:text.slice(0,start)+left+content+right+text.slice(end),start:start+left.length,end:start+left.length+content.length};
 }
 const first=start===0?0:text.lastIndexOf('\n',start-1)+1,lastBreak=text.indexOf('\n',Math.max(start,end-(end>start?1:0))),last=lastBreak<0?text.length:lastBreak;
 let i=0;const old=text.slice(first,last),lines=old.split('\n');
 const result=lines.map(line=>{
  if(kind==='indent')return '  '+line;
  if(kind==='outdent')return line.replace(/^( {1,2}|\t)/,'');
  const clean=line.replace(/^(\s*)(?:[-*+] |\d+[.)] )(?:\[[ xX]\] )?/,'$1');
  const prefix=kind==='checkbox'?'- [ ] ':kind==='numbered'?(++i)+'. ':'- ';
  return clean.replace(/^(\s*)/,'$1'+prefix);
 }).join('\n');
 const delta=result.length-old.length;
 return {text:text.slice(0,first)+result+text.slice(last),start:end===start?Math.max(first,start+delta):first,end:end===start?Math.max(first,end+delta):first+result.length};
}
function continueList(text,start,end){
 const first=start===0?0:text.lastIndexOf('\n',start-1)+1,line=text.slice(first,start),m=line.match(/^(\s*)([-*+] |(\d+)([.)]) )(\[[ xX]\] )?(.*)$/);
 if(!m)return null;
 if(!m[6].trim())return {text:text.slice(0,first)+text.slice(end),start:first,end:first};
 const marker=m[3]?(Number(m[3])+1)+m[4]+' ':m[2],prefix=m[1]+marker+(m[5]?'[ ] ':'');
 const value='\n'+prefix,pos=start+value.length;
 return {text:text.slice(0,start)+value+text.slice(end),start:pos,end:pos};
}
function format(kind){if(state.note)editor.format(kind);}
const paths={sidebar:'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM8 3v18',book:'M12 5v16M12 5C9 2 4 3 2 3v16c5 0 8 0 10 2 2-2 5-2 10-2V3c-5 0-8 0-10 2Z',edit:'m15 4 5 5M4 16 16 4a2 2 0 0 1 4 4L8 20l-5 1 1-5Z',more:'M12 5h.01M12 12h.01M12 19h.01',note:'M14 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9M10 14l9-9 2 2-9 9-3 1 1-3Z',folder:'M3 7V5h7l2 2h9v14H3V7ZM12 11v6M9 14h6',sort:'M7 3v18M3 7l4-4 4 4M13 8h4M13 13h6M13 18h8',collapse:'m7 3 5 5 5-5M7 21l5-5 5 5',search:'M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',gear:'M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1 1-3ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',indent:'m3 8 4 4-4 4M11 5h10M11 12h10M11 19h10',outdent:'m7 8-4 4 4 4M11 5h10M11 12h10M11 19h10',undo:'m8 4-5 5 5 5M3 9h11a6 6 0 1 1 0 12',redo:'m16 4 5 5-5 5M21 9H10a6 6 0 1 0 0 12',bullet:'M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13',numbered:'M2 3h2v6M2 9h4M2 15c0-3 4-3 4 0 0 2-4 3-4 6h4M10 5h11M10 12h11M10 19h11'};
function icon(name){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','icon');svg.setAttribute('aria-hidden','true');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[name]||paths.more);svg.append(path);return svg;}
for(const [id,name] of Object.entries({back:'sidebar',add:'note','add-folder':'folder',sort:'sort',collapse:'collapse',find:'search','vault-menu':'gear','note-menu':'more'}))$(id).append(icon(name));
for(const [kind,label,display]of [['checkbox','Checkbox','[ ]'],['indent','Indent','indent'],['outdent','Outdent','outdent'],['undo','Undo','undo'],['redo','Redo','redo'],['bullet','Bullet list','bullet'],['numbered','Numbered list','numbered'],['bold','Bold','B'],['italic','Italic','I'],['link','Wikilink','[[ ]]']]){
 const b=button('',()=>format(kind),label);b.title=label;b.onpointerdown=e=>e.preventDefault();b.append(paths[display]?icon(display):el(kind==='bold'?'b':kind==='italic'?'i':'span',display));$('formatting').append(b);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)for(const n of drafts.values())if(dirty(n))act(()=>save(n,true));});
window.addEventListener('pagehide',()=>{for(const n of drafts.values())if(dirty(n))act(()=>save(n,true));});
function viewportChanged(){const v=window.visualViewport;const inset=v?Math.max(0,innerHeight-v.height-v.offsetTop):0;$('app').style.setProperty('--keyboard-inset',inset+'px');if(!state.read)autoSize();renderViews();}
window.addEventListener('resize',viewportChanged);window.visualViewport?.addEventListener('resize',viewportChanged);window.visualViewport?.addEventListener('scroll',viewportChanged);
// No repeated app title/header tools: every action remains in the floating pill.
W.titlebar?.set?.([]).catch(()=>{});
await refresh();renderViews();
const recovered=stored('notes.drafts',[]);
for(const raw of recovered){if(typeof raw.path!=='string'||typeof raw.content!=='string')continue;const n={...raw,hold:W.update.hold('Recovered unsaved note'),timer:null,busy:null,error:'Recovered local draft. Retry save after checking for changes.'};drafts.set(n.path,n);}
if(drafts.size){await openNote(drafts.keys().next().value);notice('Recovered unsaved draft. Your local text is retained; retry save when ready.');}
