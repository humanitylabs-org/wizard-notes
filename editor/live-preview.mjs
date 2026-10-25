import {EditorState, EditorSelection, StateEffect, Transaction} from '@codemirror/state';
import {EditorView, Decoration, ViewPlugin, WidgetType, keymap, drawSelection, placeholder} from '@codemirror/view';
import {history, undo, redo, defaultKeymap, historyKeymap} from '@codemirror/commands';
import {RawMarkdown, previewModel} from './live-preview-model.mjs';

export {EditorView}; // Standard CM DOM lookup API; useful to host integrations and browser QA.
const refresh = StateEffect.define();
class PreviewWidget extends WidgetType {
  constructor(item, options) { super(); this.item=item; this.options=options; }
  eq(other) { return JSON.stringify(this.item) === JSON.stringify(other.item); }
  toDOM(view) {
    const r=this.item;
    if (r.kind==='wiki') {
      const link=document.createElement('button');link.type='button';link.className='cm-lp-wiki';link.textContent=r.label;
      link.setAttribute('aria-label','Open linked note '+r.label);
      link.onmousedown=e=>e.preventDefault();link.onclick=e=>{e.preventDefault();this.options.onWiki(r.target);};
      return link;
    }
    const span=document.createElement('span');span.className='cm-lp-marker';
    if (r.kind==='task') {
      const check=document.createElement('input');check.type='checkbox';check.checked=r.checked;
      check.setAttribute('aria-label',r.label||'Task');check.onmousedown=e=>e.preventDefault();
      check.onchange=()=>{if(view.composing)return;view.dispatch({changes:{from:r.taskAt+1,to:r.taskAt+2,insert:check.checked?'x':' '},annotations:Transaction.userEvent.of('input.task')});};
      span.append(check);
    } else span.textContent=r.marker;
    return span;
  }
  ignoreEvent() { return true; }
}

function liveDecorations(options) {
  return ViewPlugin.fromClass(class {
    constructor(view) { this.decorations=this.build(view); }
    update(update) {
      // Leave CM's native composing DOM alone. The composition-end refresh below
      // is decoration-only; never replay beforeinput/composition text ourselves.
      if (update.view.composing) { this.decorations=this.decorations.map(update.changes); return; }
      if (update.docChanged || update.selectionSet || update.focusChanged || update.transactions.some(t=>t.effects.some(e=>e.is(refresh)))) this.decorations=this.build(update.view);
    }
    build(view) {
      const active=view.hasFocus ? view.state.selection.ranges.map(r=>({from:r.from,to:r.to})) : [];
      const model=previewModel(view.state.doc.toString(),active), ranges=[];
      for (const line of model.lines) {
        const classes=[...line.classes,...(line.active?['cm-lp-active']:[]),...(line.bullet?['cm-lp-bullet']:[])];
        const attributes={class:classes.join(' ')};
        if (line.indent!==undefined && line.bullet) attributes.style=`--lp-indent:${Math.floor(line.indent/2)*22}px`;
        if (classes.length) ranges.push(Decoration.line({attributes}).range(line.from));
      }
      for(const m of model.marks) if(m.to>m.from) ranges.push(Decoration.mark({class:m.class}).range(m.from,m.to));
      for(const r of model.replacements) ranges.push(Decoration.replace({widget:r.kind==='hide'?undefined:new PreviewWidget(r,options)}).range(r.from,r.to));
      return Decoration.set(ranges,true);
    }
  },{decorations:v=>v.decorations});
}

export function createLiveEditor(parent, options) {
  let raw=new RawMarkdown(''), view, knownRaw=new Map(), settleTimer;
  const settleComposition=()=>{
    clearTimeout(settleTimer);
    const check=()=>{
      if(!view.dom.isConnected)return;
      if(view.composing){settleTimer=setTimeout(check,60);return;}
      view.dispatch({effects:refresh.of(null)});options.onChange(raw.raw,false);
    };
    settleTimer=setTimeout(check,80);
  };
  const remember=()=>{knownRaw.set(raw.text,raw.raw);if(knownRaw.size>160)knownRaw.delete(knownRaw.keys().next().value);};
  const apply=result=>{
    if(!result || view.composing)return false;
    const old=view.state.doc.toString();let start=0,end=old.length,newEnd=result.text.length;
    while(start<end&&start<newEnd&&old[start]===result.text[start])start++;
    while(end>start&&newEnd>start&&old[end-1]===result.text[newEnd-1]){end--;newEnd--;}
    view.dispatch({changes:{from:start,to:end,insert:result.text.slice(start,newEnd)},selection:EditorSelection.range(result.start,result.end),annotations:Transaction.userEvent.of('input.format'),scrollIntoView:true});
    view.focus();return true;
  };
  const format=kind=>{
    if(view.composing)return false;
    if(kind==='undo'||kind==='redo'){view.focus();return (kind==='undo'?undo:redo)(view);}
    const s=view.state.selection.main;
    return apply(options.transform(view.state.doc.toString(),s.from,s.to,kind));
  };
  const enter=()=>{
    if(view.composing)return false;
    const s=view.state.selection.main;
    const model=previewModel(view.state.doc.toString());
    if(model.lines.find(l=>l.from<=s.from&&l.to>=s.from)?.classes.includes('cm-lp-code'))return false;
    return apply(options.continueList(view.state.doc.toString(),s.from,s.to));
  };
  const extensions=[
    history(),drawSelection(),EditorView.lineWrapping,placeholder('Start writing…'),
    EditorView.contentAttributes.of({'aria-label':'Live Preview editor',spellcheck:'true',autocorrect:'on',autocapitalize:'sentences'}),
    liveDecorations(options),
    keymap.of([
      {key:'Tab',run:()=>format('indent'),shift:()=>format('outdent')},
      {key:'Enter',run:enter},{key:'Mod-b',run:()=>format('bold')},{key:'Mod-i',run:()=>format('italic')},
      ...historyKeymap,...defaultKeymap
    ]),
    EditorView.domEventHandlers({
      beforeinput(event) {
        if(!event.isComposing && !view.composing && event.cancelable && ['insertParagraph','insertLineBreak'].includes(event.inputType) && enter()) {event.preventDefault();return true;}
        return false;
      },
      compositionend() {settleComposition();return false;}
    }),
    EditorView.updateListener.of(update=>{
      if(!update.docChanged)return;
      remember();
      for(const tr of update.transactions)if(tr.docChanged){
        const text=tr.newDoc.toString(), restore=(tr.isUserEvent('undo')||tr.isUserEvent('redo'))&&knownRaw.get(text);
        if(restore!==false&&restore!==undefined)raw=new RawMarkdown(restore);
        else {const changes=[];tr.changes.iterChanges((from,to,_a,_b,insert)=>changes.push({from,to,insert:insert.toString()}));raw.apply(changes);}
      }
      remember();options.onChange(raw.raw,view.composing);
      // Chromium EditContext can commit composition without a bubbling DOM
      // compositionend. Watch native CM state rather than relying on that event.
      if(view.composing)settleComposition();
    })
  ];
  view=new EditorView({parent,state:EditorState.create({doc:'',extensions})});
  return {
    view,format,
    get value(){return raw.raw;},
    get composing(){return view.composing;},
    setValue(value){clearTimeout(settleTimer);raw=new RawMarkdown(value);knownRaw=new Map();remember();view.setState(EditorState.create({doc:raw.text,extensions}));},
    focus(){view.focus();},
    select(from,to=from){view.dispatch({selection:EditorSelection.range(from,to),effects:refresh.of(null)});view.focus();},
    replace(result){return apply(result);},
    destroy(){clearTimeout(settleTimer);view.destroy();}
  };
}
