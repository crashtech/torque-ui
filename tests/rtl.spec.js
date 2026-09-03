// @ts-check
const { test, expect } = require('@playwright/test');
const { gotoRtl } = require('./rtl-base');

/**
 * RTL smoke tests: logical properties should mirror layout automatically
 * when the page direction flips, with no author-side RTL overrides beyond
 * the :dir(rtl) patches for the two properties that have no logical form
 * (.tui-offcanvas's translate, and <select>'s chevron background-position).
 */

test.describe('RTL — Offcanvas drawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await gotoRtl(page, '/examples/07-interactive.html');
  });

  test('opens from the right edge of the viewport', async ({ page }) => {
    await page.locator('button.tui-button[popovertarget="filters"]').click();
    const drawer = page.locator('#filters');
    await expect(drawer).toBeVisible();
    // why: wait out the translate transition (collapsed to 0.01ms by
    // reduced-motion, but still a real animation frame) so the bounding
    // box is read after the drawer has settled, not mid-slide.
    await drawer.evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)).catch(() => {}));

    const box = await drawer.boundingBox();
    const innerWidth = await page.evaluate(() => window.innerWidth);
    expect(box).not.toBeNull();
    expect(box.x + box.width).toBeGreaterThan(innerWidth - 2);
    expect(box.x + box.width).toBeLessThan(innerWidth + 2);
  });
});

test.describe('RTL — Avatar group', () => {
  test.beforeEach(({ page }) => gotoRtl(page, '/examples/03-components.html'));

  test('overlap mirrors: the second avatar sits to the left of the first', async ({ page }) => {
    const avatars = page.locator('.tui-avatar-group .tui-avatar');
    const first = await avatars.nth(0).boundingBox();
    const second = await avatars.nth(1).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(second.x).toBeLessThan(first.x);
  });
});

test.describe('RTL — Alert callout', () => {
  test.beforeEach(({ page }) => gotoRtl(page, '/examples/03-components.html'));

  test('accent border moves to the right edge', async ({ page }) => {
    const callout = page.locator('.tui-alert-callout').first();
    const { borderRightWidth, borderLeftWidth } = await callout.evaluate((el) => {
      const style = getComputedStyle(el);
      return { borderRightWidth: style.borderRightWidth, borderLeftWidth: style.borderLeftWidth };
    });
    expect(parseFloat(borderRightWidth)).toBe(4);
    expect(parseFloat(borderLeftWidth)).toBeLessThanOrEqual(1);
  });
});

test.describe('RTL — Timeline', () => {
  test.beforeEach(({ page }) => gotoRtl(page, '/examples/new-features.html'));

  test('item padding mirrors: the marker-side edge carries the larger inline padding', async ({ page }) => {
    const item = page.locator('.tui-timeline-item').first();
    const { paddingRight, paddingLeft } = await item.evaluate((el) => {
      const style = getComputedStyle(el);
      return { paddingRight: style.paddingRight, paddingLeft: style.paddingLeft };
    });
    expect(parseFloat(paddingRight)).toBeGreaterThan(parseFloat(paddingLeft));
  });
});

test.describe('RTL — Select chevron', () => {
  test.beforeEach(({ page }) => gotoRtl(page, '/examples/04-forms.html'));

  test('background-position mirrors to the left edge', async ({ page }) => {
    const select = page.locator('select').first();
    const backgroundPositionX = await select.evaluate((el) => getComputedStyle(el).backgroundPositionX);
    // In LTR this resolves to "calc(100% - 12px)" (measured from the right
    // edge); mirrored to the left edge it resolves to a plain "12px".
    expect(backgroundPositionX).toBe('12px');
  });
});

test.describe('RTL — No horizontal overflow', () => {
  for (const url of ['/examples/03-components.html', '/examples/07-interactive.html']) {
    test(`${url} does not overflow horizontally`, async ({ page }) => {
      await gotoRtl(page, url);
      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
    });
  }
});
