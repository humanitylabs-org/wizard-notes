// Production model with the committed bundle's real, configured Lezer parser.
// No browser, dependency install or copied renderer implementation is needed.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const bundle = readFileSync(new URL('../web/vendor/live-preview.js', import.meta.url), 'utf8');
const tableName = bundle.match(/(\w+) as tableBlocks/)[1];
const parserName = bundle.match(new RegExp(`function ${tableName}\\([^,]+,[^=]+=([\\w$]+)\\s*\\.\\s*parse`))[1];
const {reviewMarkdown} = await import('data:text/javascript;base64,' + Buffer.from(bundle + `\nexport {${parserName} as reviewMarkdown};`).toString('base64'));
const source = readFileSync(new URL('../editor/live-preview-model.mjs', import.meta.url), 'utf8')
  .replace(/import \{parser, GFM\} from '@lezer\/markdown';/, '')
  .replace('const markdown = parser.configure(GFM);', 'const markdown = __parser;')
  .replace(/export /g, '');
const ctx = vm.createContext({__parser:reviewMarkdown});
vm.runInContext(source + '\nthis.model = previewModel;', ctx);
const examples = [
  '[docs](https://example.com\n "Title")',
  '[docs](\nhttps://example.com)',
  '[docs](https://example.com "one\ntwo")',
  '[two\nlines](https://example.com)',
];
test('multiline inline links stay raw and never replace a line break from a view plugin', () => {
  for (const text of examples) {
    const model = ctx.model(text);
    assert.equal(model.replacements.length, 0, text);
    assert.equal(model.marks.some(m => m.href), false, text);
  }
});
test('selection on later lines of a multiline link keeps its syntax editable', () => {
  for (const text of examples) {
    const at = text.indexOf('\n') + 1;
    assert.equal(ctx.model(text,[{from:at,to:at}]).replacements.length, 0, text);
  }
});
test('single-line links still collapse when inactive and reveal on selection', () => {
  const text = '[docs](https://example.com "Title")';
  assert.equal(ctx.model(text).replacements.length, 2);
  assert.equal(ctx.model(text,[{from:2,to:2}]).replacements.length, 0);
});

test('missing explicit relative links do not open the legacy wrong-directory create sheet', async () => {
  const app = readFileSync(new URL('../web/app.js', import.meta.url), 'utf8');
  const start = app.indexOf('async function wiki('), end = app.indexOf('function inline(', start);
  assert.ok(start > 0 && end > start);
  let sheets = 0;
  const notFound = Object.assign(new Error('Linked note not found.'), {status:404});
  const context = vm.createContext({
    state:{note:{path:'Work/Source.md'}}, qp:()=>'',
    api:async()=>{throw notFound;}, sheet:()=>{sheets++;}, input:()=>({}),
  });
  vm.runInContext(app.slice(start,end) + '\nthis.openWiki = wiki;', context);
  await assert.rejects(context.openWiki('../Missing'), error => error === notFound);
  assert.equal(sheets, 0);
});
