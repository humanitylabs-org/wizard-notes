// Markdown is authoritative; this model only describes disposable decorations.
import {parser, GFM} from '@lezer/markdown';
const markdown = parser.configure(GFM);
export const normalize = text => text.replace(/\r\n?|\n/g, '\n');

// CM uses LF offsets. Preserve every untouched original byte (including mixed EOLs,
// trailing whitespace and BOM) by applying changes to the original string, not HTML.
export class RawMarkdown {
  constructor(raw) { this.raw = raw; this.eol = raw.match(/\r\n|\r|\n/)?.[0] || '\n'; }
  get text() { return normalize(this.raw); }
  offset(pos) {
    let logical = 0, raw = 0;
    while (logical < pos && raw < this.raw.length) {
      if (this.raw[raw] === '\r' && this.raw[raw + 1] === '\n') raw++;
      raw++; logical++;
    }
    return raw;
  }
  apply(changes) {
    let result = '', last = 0;
    for (const {from, to, insert} of changes) {
      const start = this.offset(from), end = this.offset(to);
      result += this.raw.slice(last, start) + normalize(insert).replace(/\n/g, this.eol);
      last = end;
    }
    this.raw = result + this.raw.slice(last);
    return this.raw;
  }
}

export function previewModel(text, active = []) {
  const lines = []; let from = 0;
  for (const value of text.split('\n')) {
    const to = from + value.length;
    lines.push({from, to, value, active: active.some(r => r.from <= to && r.to >= from), classes: []});
    from = to + 1;
  }
  const lineAt = pos => { // binary search for offsets, including the empty last line
    let lo = 0, hi = lines.length - 1;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (lines[mid].from <= pos) lo = mid; else hi = mid - 1; }
    return lines[lo];
  };
  const marks = [], replacements = [], nodes = [];
  markdown.parse(text).iterate({enter(n) { nodes.push({name: n.name, from: n.from, to: n.to, parent: n.node.parent?.name}); }});
  const codeRanges = nodes.filter(n => ['FencedCode', 'CodeBlock', 'InlineCode'].includes(n.name));
  const inCode = (a,b) => codeRanges.some(n => a >= n.from && b <= n.to);
  const wiki = [];
  for (const m of text.matchAll(/\[\[([^\]\n]+)\]\]/g)) {
    if (inCode(m.index, m.index + m[0].length) || /\\$/.test(text.slice(0,m.index))) continue;
    const [target, ...alias] = m[1].split('|');
    const item = {from:m.index, to:m.index+m[0].length, kind:'wiki', target, label:alias.join('|')||target};
    wiki.push(item);
    if (!lineAt(item.from).active) replacements.push(item);
    marks.push({...item, class:'cm-lp-wiki-source'});
  }
  for (const n of nodes) {
    const line = lineAt(n.from);
    if (/^ATXHeading[1-6]$/.test(n.name)) line.classes.push('cm-lp-h' + n.name.at(-1));
    if (['FencedCode','CodeBlock'].includes(n.name)) {
      for (const l of lines) if (l.from >= line.from && l.from < n.to) l.classes.push('cm-lp-code');
    }
    if (n.name === 'QuoteMark') {
      line.classes.push('cm-lp-quote');
      if (!line.active) replacements.push({from:n.from, to:n.to + (text[n.to]===' '?1:0), kind:'hide'});
    }
    if (n.name === 'ListMark') {
      const task = nodes.find(t => t.name === 'TaskMarker' && t.from >= n.to && t.to <= line.to);
      const end = task ? task.to : n.to;
      line.classes.push('cm-lp-list');
      line.indent = text.slice(line.from,n.from).replace(/\t/g,'    ').length;
      // Leave quotes outside a list prefix intact; only consume leading whitespace.
      const start = /^\s*$/.test(text.slice(line.from,n.from)) ? line.from : n.from;
      if (!line.active) replacements.push({from:start, to:end+(text[end]===' '?1:0), kind:task?'task':'bullet',
        checked:task?text.slice(task.from,task.to).toLowerCase()==='[x]':false,
        taskAt:task?.from, label:task?line.value.slice(end-line.from).trim():undefined,
        marker:/^\d/.test(text.slice(n.from,n.to))?text.slice(n.from,n.to):'•'});
    }
    if (['StrongEmphasis','Emphasis','InlineCode','Strikethrough'].includes(n.name)) {
      marks.push({from:n.from,to:n.to,class: n.name==='StrongEmphasis'?'cm-lp-strong':n.name==='Emphasis'?'cm-lp-em':n.name==='Strikethrough'?'cm-lp-strike':'cm-lp-inline-code'});
    }
    if (n.name === 'HeaderMark' && !line.active) replacements.push({from:n.from,to:n.to+(text[n.to]===' '?1:0),kind:'hide'});
    if (['EmphasisMark','StrikethroughMark'].includes(n.name) && !line.active) replacements.push({from:n.from,to:n.to,kind:'hide'});
    if (n.name === 'CodeMark') {
      if (n.parent === 'InlineCode') { if (!line.active) replacements.push({from:n.from,to:n.to,kind:'hide'}); }
      else { line.classes.push('cm-lp-fence'); if (!line.active) replacements.push({from:line.from,to:line.to,kind:'hide'}); }
    }
    if (n.name === 'Link' && !wiki.some(w=> w.from < n.to && w.to > n.from)) marks.push({from:n.from,to:n.to,class:'cm-lp-link'});
  }
  // Non-overlapping replacements: list prefixes own task markers; fenced code owns info.
  replacements.sort((a,b)=>a.from-b.from || b.to-a.to);
  const clean = []; let end = -1;
  for (const r of replacements) if (r.from >= end && r.to > r.from) { clean.push(r); end = r.to; }
  return {lines, marks, replacements:clean};
}
