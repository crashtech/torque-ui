// @ts-check
const { test, expect } = require('@playwright/test');
const { gotoRtl } = require('./rtl-base');

const PAGES = ['index','01-typography','02-elements','03-components','04-forms','05-layout','06-utilities','07-interactive','08-patterns','showcase','new-features','dark-mode','color-system','bundle-check']
  .map(p => `/examples/${p}.html`);

for (const scheme of ['light','dark']) {
  test.describe(scheme, () => {
    test.use({ colorScheme: scheme });
    for (const url of PAGES) {
      test(url, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(url);
        await expect(page).toHaveScreenshot(`${scheme}${url.replace(/\W+/g,'_')}.png`, { fullPage: true, maxDiffPixelRatio: 0.001 });
      });
    }
  });
}

// RTL baselines: light scheme only, representative pages that exercise
// the RTL-mirrored components (offcanvas translate, avatar-group overlap,
// alert-callout accent border, timeline item padding).
const RTL_PAGES = ['03-components', '07-interactive', '08-patterns', 'new-features'].map(p => `/examples/${p}.html`);

test.describe('rtl', () => {
  test.use({ colorScheme: 'light' });
  for (const url of RTL_PAGES) {
    test(url, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await gotoRtl(page, url);
      await expect(page).toHaveScreenshot(`rtl${url.replace(/\W+/g,'_')}.png`, { fullPage: true, maxDiffPixelRatio: 0.001 });
    });
  }
});
