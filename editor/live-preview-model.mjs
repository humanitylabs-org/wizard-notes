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
      const markEnd = end + (text[end]===' '?1:0);
      // Obsidian: the bullet renders the moment "- " is typed, even on the caret line; the raw marker
      // shows only while the caret/selection sits inside it, or before the space is typed.
      const reveal = line.active && (markEnd===end || active.some(r => r.from < markEnd && r.to > start));
      if (!reveal) line.bullet = true;
      if (!reveal) replacements.push({from:start, to:markEnd, kind:task?'task':'bullet',
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
  // A bare "- " typed under a paragraph is not a list in CommonMark (an empty item cannot interrupt a
  // paragraph) but Obsidian shows a bullet at once; render the caret line's bare marker the same way.
  for (const line of lines) {
    const bare = line.active && !line.classes.includes('cm-lp-list') && /^(\s*)([-*+]) $/.exec(line.value);
    if (!bare || inCode(line.from, line.to)) continue;
    line.classes.push('cm-lp-list'); line.bullet = true; line.indent = bare[1].replace(/\t/g,'    ').length;
    replacements.push({from:line.from, to:line.to, kind:'bullet', marker:'•'});
  }
  // Non-overlapping replacements: list prefixes own task markers; fenced code owns info.
  replacements.sort((a,b)=>a.from-b.from || b.to-a.to);
  const clean = []; let end = -1;
  for (const r of replacements) if (r.from >= end && r.to > r.from) { clean.push(r); end = r.to; }
  return {lines, marks, replacements:clean};
}

// Keyboard-independent sentence capitalisation. Some Android keyboards cannot see the text before the
// caret once Live Preview replaces list markers with widgets, so they stop capitalising. Given a changed
// range in the new text, return single-letter uppercase edits for: the first word of a line or list/task/
// quote/heading item, the first word after ". ", "! " or "? ", and the pronoun "i" (i, i'm, i'll...).
const PREFIX = /^\s*(?:(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?|>\s*|#{1,6}\s+)*$/;
const ABBREV = /(?:^|\s)(?:e\.g|i\.e|etc|vs|cf|approx|incl|no|p|pp|ca)\.$/i;
export function autocapEdits(text, from, to) {
  const edits = [];
  let lineStart = text.lastIndexOf('\n', Math.max(0, from - 1)) + 1;
  while (lineStart <= to) {
    let lineEnd = text.indexOf('\n', lineStart); if (lineEnd < 0) lineEnd = text.length;
    capLine(text, lineStart, text.slice(lineStart, lineEnd), from, to, edits);
    if (lineEnd >= text.length) break;
    lineStart = lineEnd + 1;
  }
  return edits;
}
function capLine(text, lineStart, line, from, to, edits) {
  // Skip fenced code (odd number of ``` fences before this line) and indented code blocks.
  if (((text.slice(0, lineStart).match(/^\s*```/gm) || []).length % 2) || /^\s*```/.test(line) || /^( {4}|\t)(?!\s*([-*+]|\d+[.)])\s)/.test(line)) return;
  for (const m of line.matchAll(/\p{L}[\p{L}\p{M}\d]*(?:['’\-.:\/@][\p{L}\p{M}\d]+)*/gu)) {
    const start = lineStart + m.index, end = start + m[0].length, word = m[0];
    if (end < from || start > to) continue;
    const before = line.slice(0, m.index);
    if ((before.match(/`/g) || []).length % 2) continue;            // inline code
    if (/[\[(<]$/.test(before) && /\[\[[^\]]*$/.test(before)) continue; // inside [[wikilink]]
    if (/^\p{Ll}/u.test(word) === false) continue;
    // The pronoun waits for the word to be finished: the space/punctuation after it must be part of this
    // edit. A newline or space that was already there (typing at a line end) never counts, so "in", "it",
    // "if" are never capitalised mid-word.
    const pronoun = /^i(?:['’](?:m|ll|ve|d|s))?$/.test(word) && end >= from && end < to && /[ \t\n.,!?;:)]/.test(text[end] || '');
    const plain = /^[\p{Ll}\p{M}'’-]+$/u.test(word) && !/^(?::\/|[@.:][\p{L}\d])/u.test(text.slice(end, end + 2));                  // not urls, emails, iPhone, file.md
    const sentence = start >= from && start < to && plain &&
      (PREFIX.test(before) || (/[.!?]["'’”]*\s+$/.test(before) && !ABBREV.test(before.trimEnd()) && !/\.\.\.\s+$/.test(before)));
    if (pronoun || sentence) edits.push({from: start, to: start + 1, insert: word[0].toUpperCase()});
  }
}
