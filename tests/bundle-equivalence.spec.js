// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * The single-file bundle (dist/tui-all.css) must be pixel-for-pixel equivalent to
 * loading tui.css directly: same layers, same source order within each
 * layer, so equal-specificity same-layer rules resolve identically either
 * way. This compares computed style, not screenshots, so it catches
 * cascade-order regressions the visual baselines are too coarse to see.
 */
const PAGES = ['02-elements', '03-components', '04-forms', '07-interactive', '08-patterns', 'showcase']
  .map((p) => `/examples/${p}.html`);

const PROPS = [
  'display', 'position',
  'margin-block-start', 'margin-block-end', 'margin-inline-start', 'margin-inline-end',
  'padding-block-start', 'padding-block-end', 'padding-inline-start', 'padding-inline-end',
  'color', 'background-color',
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
  'border-radius',
  'inset-block-start', 'inset-block-end', 'inset-inline-start', 'inset-inline-end',
  'transition-property', 'transition-duration', 'transition-timing-function',
  'font-size', 'font-weight', 'line-height', 'text-align', 'opacity', 'box-shadow',
  'flex-direction', 'align-items', 'justify-content', 'gap', 'grid-template-columns',
  'width', 'height', 'max-width', 'min-width', 'z-index', 'overflow', 'cursor',
  'outline-width', 'outline-color',
];

/**
 * why: the modular entry is a chain of @imports; sampling computed styles
 * before every import has resolved compares a half-loaded cascade to the
 * bundle and reports margins and colours that are not real differences.
 * @param {import('@playwright/test').Page} page
 */
async function settle(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => {
    const loaded = (sheet) => {
      let rules;
      try { rules = sheet.cssRules; } catch { return true; }
      for (const rule of rules) {
        // why: Chromium exposes an import's sheet before its rules arrive, so an empty sheet still counts as loading
        if (rule instanceof CSSImportRule && (!rule.styleSheet || rule.styleSheet.cssRules.length === 0 || !loaded(rule.styleSheet))) return false;
      }
      return true;
    };
    return [...document.styleSheets].every(loaded);
  });
  await page.evaluate(() => document.fonts.ready.then(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))));
}

async function collectStyles(page, props) {
  return page.evaluate((props) => {
    return Array.from(document.querySelectorAll('*')).map((el, i) => {
      const cs = getComputedStyle(el);
      /** @type {Record<string, string>} */
      const styles = {};
      for (const p of props) styles[p] = cs.getPropertyValue(p);
      return { i, tag: el.tagName.toLowerCase(), cls: el.getAttribute('class') || '', styles };
    });
  }, props);
}

for (const url of PAGES) {
  test(`bundle equivalence: ${url}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto(url);
    await settle(page);
    const entryStyles = await collectStyles(page, PROPS);

    await page.route('**/*.html', async (route) => {
      const response = await route.fetch();
      const html = await response.text();
      if (!html.includes('href="/src/tui.css"')) {
        throw new Error(`bundle-equivalence: could not find href="/src/tui.css" in ${route.request().url()}`);
      }
      const body = html.replace('href="/src/tui.css"', 'href="/dist/tui-all.css"');
      await route.fulfill({ response, body });
    });
    await page.goto(url);
    await settle(page);
    const bundleStyles = await collectStyles(page, PROPS);
    await page.unroute('**/*.html');

    expect(bundleStyles.length).toBe(entryStyles.length);

    const diffs = [];
    for (let i = 0; i < entryStyles.length; i++) {
      const a = entryStyles[i];
      const b = bundleStyles[i];
      for (const p of PROPS) {
        if (a.styles[p] !== b.styles[p]) {
          diffs.push(`[${i}] <${a.tag} class="${a.cls}"> ${p}: entry="${a.styles[p]}" bundle="${b.styles[p]}"`);
        }
      }
    }

    expect(diffs.slice(0, 5)).toEqual([]);
  });
}
