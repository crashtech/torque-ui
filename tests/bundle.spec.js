const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ENTRY = 'src/tui.css';
const BUNDLE = 'dist/tui-all.css';
const LAYERS = ['tokens', 'reboot', 'elements', 'components', 'layout', 'forms', 'interactive', 'utilities', 'themes'];

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '').trim();

test('bundle declares the layer order first and wraps every layer', () => {
  const css = stripComments(fs.readFileSync(BUNDLE, 'utf8'));
  expect(css.startsWith(`@layer ${LAYERS.map((l) => `tui.${l}`).join(', ')};`)).toBe(true);
  for (const l of LAYERS) expect(css).toMatch(new RegExp(`@layer tui\\.${l}\\s*\\{`));
  expect(css).not.toContain('@import');
});

test('every source file is imported into a layer by the entry point', () => {
  const entry = fs.readFileSync(ENTRY, 'utf8');
  const imported = new Set([...entry.matchAll(/@import url\('\.\/([^']+)'\) layer\(tui\.([a-z]+)\);/g)].map((m) => m[1]));
  const files = fs.readdirSync('src', { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^[0-9]/.test(d.name))
    .flatMap((d) => fs.readdirSync(path.join('src', d.name)).filter((f) => f.endsWith('.css')).map((f) => `${d.name}/${f}`));
  expect(files.filter((f) => !imported.has(f))).toEqual([]);
  expect([...imported].filter((f) => !fs.existsSync(path.join('src', f)))).toEqual([]);
});

test('bundle is fresh', () => {
  const { execSync } = require('child_process');
  const os = require('os');
  const tmpOut = path.join(os.tmpdir(), `tui-all-${process.pid}-${Date.now()}.css`);
  try {
    execSync(`npx postcss ${ENTRY} -u postcss-import --no-map -o ${JSON.stringify(tmpOut)}`);
    expect(fs.readFileSync(tmpOut, 'utf8')).toBe(fs.readFileSync(BUNDLE, 'utf8'));
  } finally {
    fs.rmSync(tmpOut, { force: true });
  }
});
