/* Reply: open an UNSENT main Chats draft with this note (or a selected passage) attached.
 * Uses only the shared shell capability WizardApp.nav.openContextDraft. Notes never sends
 * anything and never calls a session/run/send API; the owner decides in Chats. */
export const REPLY_LIMITS=Object.freeze({title:1000,message:32000,body:12000,passage:8000});

// Stable bounded draft id. Not an authorization token; the shell namespaces it as wizard-notes:<id>.
function hash(text){let a=2166136261,b=5381;for(let i=0;i<text.length;i++){const c=text.charCodeAt(i);a=Math.imul(a^c,16777619);b=Math.imul(b,33)^c;}return (a>>>0).toString(16)+(b>>>0).toString(16);}
const clip=(text,max)=>text.length>max?text.slice(0,max).trimEnd()+'\n[… '+(text.length-max).toLocaleString('en-US')+' more characters not included]':text;
const words=text=>(text.match(/\S+/g)||[]).length;

/** Pure payload builder: {id,title,message} within the shell limits. */
export function replyPayload({path,title,content,unsaved=false},selection=null){
 if(typeof path!=='string'||!path)throw new Error('Open a note to reply.');
 const body=String(content??''),name=String(title||path.split('/').pop().replace(/\.md$/,'')).trim()||'Untitled';
 const folder=path.includes('/')?path.slice(0,path.lastIndexOf('/')):'';
 const passage=selection&&typeof selection.text==='string'&&selection.text.trim()?selection:null;
 const lines=[passage?'A passage from a note in my Wizard Notes vault.':'A note in my Wizard Notes vault.',
  'Title: '+name,'Path: '+path+' (vault-relative)','Folder: '+(folder||'Vault (top level)'),
  'Length: '+words(body).toLocaleString('en-US')+' words, '+body.length.toLocaleString('en-US')+' characters'];
 if(unsaved)lines.push('Unsaved edits: yes, the text below includes changes not yet saved to the vault.');
 if(passage){lines.push('','Selected passage:',clip(passage.text,REPLY_LIMITS.passage));}
 lines.push('',body.trim()?(body.length>REPLY_LIMITS.body?'Note text (first '+REPLY_LIMITS.body.toLocaleString('en-US')+' characters):':'Note text:'):'Note text: (empty)');
 if(body.trim())lines.push(clip(body,REPLY_LIMITS.body));
 const id=('note-'+hash(path)+(passage?'-p'+hash(passage.start+':'+passage.end+':'+passage.text):'')).slice(0,128);
 return {id,title:clip('Wizard Notes: '+name,200).slice(0,REPLY_LIMITS.title),message:lines.join('\n').slice(0,REPLY_LIMITS.message)};
}

/** Reply appears only on a Wizard whose shell can open a context draft (older shells: no button). */
export const replySupported=W=>typeof W?.nav?.openContextDraft==='function';

/** Must run synchronously inside the click handler (user activation). Returns the status text. */
export function openReply(W,payload){
 const nav=W?.nav;
 try{
  if(typeof nav?.openContextDraft!=='function')throw new Error('Context draft unavailable');
  const receipt=nav.openContextDraft(payload);
  if(receipt?.kind!=='unsent-draft'||receipt.sent!==false)return {ok:false,text:'Could not confirm an unsent draft. Nothing was sent.'};
  return {ok:true,text:'Draft opened in Chats with this '+(payload.id.includes('-p')?'passage':'note')+' attached. Nothing sent.'};
 }catch(e){
  return {ok:false,text:e?.message==='Context draft unavailable'?'Reload Wizard (refresh the whole page) to turn on Reply. Nothing sent.':(e?.message||'Could not open Chats. Nothing sent.')};
 }
}
