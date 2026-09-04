// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

/**
 * A selector defined as its own top-level rule (not nested under another
 * selector) in the same at-rule context in more than one source file is
 * almost always a rule pasted twice. Repeats inside one file are ordinary
 * cascade layering and are stylelint's business (no-duplicate-selectors).
 *
 * Sanctioned cross-file repeats — deliberate reset-then-reapply splits and
 * the per-file :root token blocks — are listed here with their reason.
 */
const ALLOWED = new Set([
  ':root',            // every 00-tokens file declares its own :root block; the cascade merges them
  'ul', 'ol', 'img', 'textarea', 'select', 'p', // reboot zeroes these; 20-elements re-applies the real values in a later layer
  '.tui-card-primary', // card.css paints it; 70-utilities/tone.css only sets --tui-tone on it (the tone setter/reset pattern)
]);

const splitSelectors = (selector) => {
  const parts = [];
  let depth = 0;
  let current = '';
  for (const ch of selector) {
    if ('(['.includes(ch)) depth += 1;
    if (')]'.includes(ch)) depth -= 1;
    if (ch === ',' && depth === 0) { parts.push(current); current = ''; } else current += ch;
  }
  parts.push(current);
  return parts.map((s) => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
};

const sourceFiles = fs.readdirSync('src', { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^[0-9]/.test(d.name))
  .flatMap((d) => fs.readdirSync(path.join('src', d.name)).filter((f) => f.endsWith('.css')).map((f) => path.join('src', d.name, f)));

test('no top-level selector is defined in more than one source file within the same at-rule context', () => {
  /** @type {Map<string, Set<string>>} */
  const seen = new Map();
  for (const file of sourceFiles) {
    const root = postcss.parse(fs.readFileSync(file, 'utf8'), { from: file });
    root.walkRules((rule) => {
      if (rule.parent?.type === 'rule') return;
      const context = [];
      for (let node = rule.parent; node && node.type === 'atrule'; node = node.parent) context.unshift(`@${node.name} ${node.params}`.trim());
      for (const selector of splitSelectors(rule.selector)) {
        if (selector.startsWith('&')) continue;
        const key = `${context.join(' | ')}\t${selector}`;
        if (!seen.has(key)) seen.set(key, new Set());
        seen.get(key).add(file);
      }
    });
  }
  const duplicates = [...seen]
    .filter(([key, files]) => files.size > 1 && !ALLOWED.has(key.split('\t')[1]))
    .map(([key, files]) => `${key.replace('\t', ' ')} in ${[...files].join(', ')}`);
  expect(duplicates).toEqual([]);
});
