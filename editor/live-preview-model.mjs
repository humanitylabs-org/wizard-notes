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

// GFM pipe tables at document level (tables nested in lists/quotes stay plain text). One parse
// serves Reading and Live Preview. Cells come from the row's pipe delimiters, not TableCell nodes,
// because Lezer emits no node for an empty cell. Cell text stays raw Markdown for inline rendering.
export function tableBlocks(text, tree = markdown.parse(text)) {
  const tables = [], top = tree.topNode;
  for (let table = top.firstChild; table; table = table.nextSibling) {
    if (table.name !== 'Table') continue;
    const rows = [];
    let align = [];
    for (let row = table.firstChild; row; row = row.nextSibling) {
      if (row.name === 'TableDelimiter') { // the |---|:--:| line
        align = text.slice(row.from, row.to).replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|')
          .map(c => { c = c.trim(); return c.startsWith(':') && c.endsWith(':') ? 'center' : c.endsWith(':') ? 'right' : c.startsWith(':') ? 'left' : ''; });
        continue;
      }
      if (row.name !== 'TableHeader' && row.name !== 'TableRow') continue;
      const pipes = [];
      for (let c = row.firstChild; c; c = c.nextSibling) if (c.name === 'TableDelimiter') pipes.push(c.from);
      const bounds = [row.from - 1, ...pipes, row.to], cells = [];
      for (let i = 0; i + 1 < bounds.length; i++) {
        const from = bounds[i] + 1, to = bounds[i + 1], raw = text.slice(from, to);
        if (pipes.length && (i === 0 || i === bounds.length - 2) && !raw.trim()) continue; // outer pipes
        const lead = raw.length - raw.trimStart().length;
        cells.push({from: from + lead, to: from + lead + raw.trim().length, text: raw.trim().replace(/\\\|/g, '|')});
      }
      rows.push({from: row.from, to: row.to, header: row.name === 'TableHeader', cells});
    }
    const width = rows[0]?.cells.length || 0;
    for (const r of rows) { r.cells = r.cells.slice(0, width); while (r.cells.length < width) r.cells.push({from: r.to, to: r.to, text: ''}); }
    const startLine = text.slice(0, table.from).split('\n').length - 1;
    tables.push({from: table.from, to: table.to, startLine, endLine: startLine + text.slice(table.from, table.to).split('\n').length - 1,
      align: Array.from({length: width}, (_, i) => align[i] || ''), rows});
  }
  return tables;
}

// Whole-line table ranges for Live Preview. A table is active (shown as editable source) when the
// caret or selection touches any of its lines. Cell offsets become relative to the table start so a
// rendered widget survives edits elsewhere in the note.
export function liveTables(text, active = [], tree) {
  return tableBlocks(text, tree).map(t => {
    const from = text.lastIndexOf('\n', t.from - 1) + 1, end = text.indexOf('\n', t.to), to = end < 0 ? text.length : end;
    const rows = t.rows.map(r => ({header: r.header, cells: r.cells.map(c => ({from: c.from - from, text: c.text}))}));
    return {from, to, align: t.align, rows, active: active.some(r => r.from <= to && r.to >= from)};
  });
}

// `on` is the owner switch tables-and-links (issue 17). Off, the model is exactly the earlier one:
// no tables, links keep their source and the wiki alias splits on a bare pipe only.
// `image(raw)` (switch read-images, notes#33): when given, an image embed off the caret line (![[photo.jpg]],
// ![alt](https://...)) for which it returns true becomes an image widget; its source returns on the caret line.
export const IMAGE_EMBED = /!\[\[[^\]\n]+\]\]|!\[[^\]\n]*\]\((?:<[^>\n]+>|[^\s)]+)(?:\s+"[^"\n]*")?\)/g;
export function previewModel(text, active = [], {on = false, image = null} = {}) {
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
  const marks = [], replacements = [], nodes = [], tree = markdown.parse(text);
  tree.iterate({enter(n) { nodes.push({name: n.name, from: n.from, to: n.to, parent: n.node.parent?.name}); }});
  // A table renders as one block widget unless the caret/selection touches any of its lines;
  // then its raw source is shown for editing, like every other construct here.
  const tables = on ? liveTables(text, active, tree) : [];
  // An active table is source as a whole: every row shows its raw Markdown so the pipes line up.
  for (const t of tables) if (t.active) for (const l of lines) if (l.from >= t.from && l.to <= t.to) { l.active = true; l.classes.push('cm-lp-table-source'); }
  const inTable = (a, b) => tables.some(t => !t.active && a < t.to && b > t.from);
  const codeRanges = nodes.filter(n => ['FencedCode', 'CodeBlock', 'InlineCode'].includes(n.name));
  const inCode = (a,b) => codeRanges.some(n => a >= n.from && b <= n.to);
  const images = [];
  if (image) for (const m of text.matchAll(IMAGE_EMBED)) {
    const item = {from:m.index, to:m.index+m[0].length, kind:'image', raw:m[0]};
    if (inCode(item.from, item.to) || /\\$/.test(text.slice(0,m.index)) || !image(m[0])) continue;
    images.push(item);
    if (!lineAt(item.from).active) replacements.push(item);
  }
  const inImage = (a, b) => images.some(i => a < i.to && b > i.from);
  const wiki = [];
  for (const m of text.matchAll(/\[\[([^\]\n]+)\]\]/g)) {
    if (inCode(m.index, m.index + m[0].length) || /\\$/.test(text.slice(0,m.index)) || inImage(m.index, m.index + m[0].length)) continue;
    const [target, ...alias] = m[1].split(on ? /\\?\|/ : '|'); // [[Note\|alias]] is Obsidian's in-table form
    const item = {from:m.index, to:m.index+m[0].length, kind:'wiki', target, label:alias.join('|')||target};
    wiki.push(item);
    if (!lineAt(item.from).active) replacements.push(item);
    marks.push({...item, class:'cm-lp-wiki-source'});
  }
  for (const [index, n] of nodes.entries()) {
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
    if (n.name === 'Link' && !wiki.some(w=> w.from < n.to && w.to > n.from) && !inImage(n.from, n.to)) {
      // Obsidian: off the caret line an inline link shows only its text; the raw [text](url) returns
      // on the active line. Reference/empty and multiline links keep their source:
      // a ViewPlugin replacement cannot consume a line break, even in a link title.
      const own = [];
      for (let j = index + 1; j < nodes.length && nodes[j].from < n.to; j++) if (nodes[j].parent === 'Link') own.push(nodes[j]);
      const close = own.find((c, i) => c.name === 'LinkMark' && text[c.from] === ']' && own[i + 1] && text[own[i + 1].from] === '(');
      const url = own.find(c => c.name === 'URL');
      if (on && !line.active && close && url && close.from > n.from + 1 && text[n.from] === '[' && !text.slice(n.from,n.to).includes('\n')) {
        marks.push({from:n.from,to:n.to,class:'cm-lp-link',href:text.slice(url.from,url.to).replace(/^<|>$/g,'')});
        replacements.push({from:n.from,to:n.from+1,kind:'hide'},{from:close.from,to:n.to,kind:'hide'});
      } else marks.push({from:n.from,to:n.to,class:'cm-lp-link'});
    }
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
  for (const r of replacements) if (r.from >= end && r.to > r.from && !inTable(r.from, r.to)) { clean.push(r); end = r.to; }
  return {lines, marks:marks.filter(m => !inTable(m.from, m.to)), replacements:clean, tables};
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
