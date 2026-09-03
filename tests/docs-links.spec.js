// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const EXAMPLES_INDEX = path.join(ROOT, 'examples', 'index.html');
const BUNDLE_PATH = path.join(ROOT, 'dist', 'tui-all.css');
const SERVER = 'http://localhost:8081';

/**
 * Deliberately-documented templated class stems (e.g. ".tui-mb-N" in a
 * "for any N" table row) or deprecated-alias stems. These never exist as a
 * literal selector — only their numbered instances (".tui-mb-4") do.
 */
const CLASS_ALLOWLIST = [
  'tui-m-', 'tui-p-',
  'tui-mt-', 'tui-mb-', 'tui-ml-', 'tui-mr-', 'tui-ms-', 'tui-me-',
  'tui-pt-', 'tui-pb-', 'tui-pl-', 'tui-pr-', 'tui-ps-', 'tui-pe-',
  'tui-gap-', 'tui-col-span-',
  'tui-chart-', 'tui-border-',
  'tui-d-', 'tui-grid-', 'tui-grid-lg-', 'tui-grid-md-', 'tui-grid-sm-',
  'tui-empty-', 'tui-status-', 'tui-toast-',
  'tui-alert-', 'tui-badge-', 'tui-max-w-', 'tui-rounded-', 'tui-timeline-item-',
];

/** Top-level pages plus one page per section/slug folder; notes/ and
 * superpowers/ are working files, not docs.
 * @param {string} dir */
function markdownFilesIn(dir) {
  const top = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(dir, f));
  const nested = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !['notes', 'superpowers', 'assets'].includes(d.name))
    .flatMap((section) =>
      fs
        .readdirSync(path.join(dir, section.name), { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((page) => path.join(dir, section.name, page.name, 'index.md'))
        .filter((f) => fs.existsSync(f))
    );
  return [...top, ...nested];
}

/**
 * Real navigable hrefs only: `<a>`, `<link>`, `<area>` tags. Using a
 * tag-scoped regex (rather than a bare `href="..."` scan) means example
 * markup shown inside `<pre><code>` — where `<a href="...">` is
 * HTML-escaped to `&lt;a href="..."&gt;` — is never mistaken for a real link.
 * @param {string} html
 */
function extractHrefs(html) {
  const hrefs = [];
  const re = /<(?:a|link|area)\b[^>]*\bhref="([^"]*)"[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) hrefs.push(m[1]);
  return hrefs;
}

/**
 * Class names written as CSS selectors (a leading dot) inside Markdown
 * inline code spans. Markup in fenced blocks (`class="tui-tabs"`) has no
 * leading dot and is not a selector, so it is intentionally not matched.
 * @param {string} md
 */
function extractCodeClasses(md) {
  const classes = new Set();
  const codeRe = /`([^`\n]*)`/g;
  let m;
  while ((m = codeRe.exec(md))) {
    const clsRe = /\.tui-[a-z0-9-]+/g;
    let cm;
    while ((cm = clsRe.exec(m[1]))) classes.add(cm[0].slice(1));
  }
  return classes;
}

function isSkippable(href) {
  return (
    !href ||
    href.startsWith('#') ||
    /^(https?:|mailto:|tel:|javascript:)/i.test(href)
  );
}

/**
 * @param {string} href
 * @param {string} baseDir server-relative directory the file is served from, e.g. "/docs/"
 */
function resolveHref(href, baseDir) {
  const pathPart = href.split('#')[0];
  if (!pathPart) return null;
  return pathPart.startsWith('/') ? pathPart : path.posix.normalize(baseDir + pathPart);
}

const sourceFiles = [{ file: EXAMPLES_INDEX, baseDir: '/examples/' }];

test.describe('examples index links resolve', () => {
  /** @type {Map<string, {href: string, file: string}>} */
  const targets = new Map();
  for (const { file, baseDir } of sourceFiles) {
    const html = fs.readFileSync(file, 'utf8');
    for (const href of extractHrefs(html)) {
      if (isSkippable(href)) continue;
      const resolved = resolveHref(href, baseDir);
      if (!resolved) continue;
      if (!targets.has(resolved)) targets.set(resolved, { href, file: path.relative(ROOT, file) });
    }
  }

  for (const [resolved, { href, file }] of targets) {
    test(`${resolved} (${href} in ${file})`, async ({ request }) => {
      const response = await request.get(`${SERVER}${resolved}`);
      expect(response.status(), `expected 200 for ${resolved}`).toBe(200);
    });
  }
});

test.describe('docs class names exist in the bundle', () => {
  const bundle = fs.readFileSync(BUNDLE_PATH, 'utf8');

  /** @param {string} cls */
  function existsInBundle(cls) {
    const escaped = cls.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\.${escaped}(?![a-zA-Z0-9-])`).test(bundle);
  }

  for (const file of markdownFilesIn(DOCS_DIR)) {
    const relFile = path.relative(ROOT, file);
    const md = fs.readFileSync(file, 'utf8');
    const classes = [...extractCodeClasses(md)].sort();

    test(`${relFile}: every .tui-* class in inline code exists in dist/tui-all.css`, () => {
      const missing = classes.filter(
        (cls) => !CLASS_ALLOWLIST.some((prefix) => cls === prefix || cls.startsWith(prefix)) && !existsInBundle(cls)
      );
      expect(missing, `stale class names documented in ${relFile}`).toEqual([]);
    });
  }
});

test.describe('self-driven JS sections are labelled consistently', () => {
  const BADGE = '<span class="tui-badge">self-driven JS</span>';

  for (const file of markdownFilesIn(DOCS_DIR)) {
    const relFile = path.relative(ROOT, file);
    const md = fs.readFileSync(file, 'utf8');
    const badged = md.includes(BADGE);
    const flagged = /^js: self-driven$/m.test(md.split('\n---')[0] + md.split('\n---')[1]);
    if (!badged && !flagged) continue;

    test(`${relFile}: badge in a heading and js: self-driven in the frontmatter go together`, () => {
      expect(flagged, `${relFile} has a self-driven JS badge but no "js: self-driven" frontmatter`).toBe(true);
      expect(badged, `${relFile} is flagged js: self-driven but has no badged section`).toBe(true);
      const strays = md.split('\n').filter((line) => line.includes(BADGE) && !/^#{2,3} /.test(line));
      expect(strays, `badge outside a heading in ${relFile}`).toEqual([]);
    });
  }
});
