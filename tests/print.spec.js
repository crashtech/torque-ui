// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Themes — Print', () => {
  test.describe('/examples/07-interactive.html', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/examples/07-interactive.html');
      await page.emulateMedia({ media: 'print' });
    });

    test('popover/offcanvas triggers are hidden', async ({ page }) => {
      const triggers = page.locator('[popovertarget]');
      const count = await triggers.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(triggers.nth(i)).toBeHidden();
      }
    });

    test('all tab panels are visible, not just the checked one', async ({ page }) => {
      const panels = page.locator('.tui-tab-panel');
      const count = await panels.count();
      expect(count).toBeGreaterThan(1);
      for (let i = 0; i < count; i++) {
        await expect(panels.nth(i)).toBeVisible();
      }
    });

    test('a closed collapse body is forced visible', async ({ page }) => {
      const closedBody = page.locator('details.tui-collapse.tui-mt-6 .tui-collapse-body');
      await expect(page.locator('details.tui-collapse.tui-mt-6')).not.toHaveAttribute('open', '');
      await expect(closedBody).toBeVisible();
    });

    test('external links get a visible URL suffix', async ({ page }) => {
      const link = page.locator('a[href^="http"]');
      await expect(link).toHaveCount(1);
      await expect(link).toBeVisible();
      const content = await link.evaluate(el => getComputedStyle(el, '::after').content);
      expect(content).toContain('(');
    });

    test('carousel prints every slide instead of clipping to one', async ({ page }) => {
      await expect(page.locator('.tui-carousel-dots')).toBeHidden();

      const track = page.locator('.tui-carousel-track');
      await expect(track).toHaveCSS('display', 'grid');
      await expect(track).toHaveCSS('overflow-x', 'visible');

      const slides = page.locator('.tui-carousel-slide');
      const count = await slides.count();
      expect(count).toBeGreaterThan(1);
      for (let i = 0; i < count; i++) {
        await expect(slides.nth(i)).toBeVisible();
      }
    });
  });

  test.describe('/examples/08-patterns.html', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/examples/08-patterns.html');
      await page.emulateMedia({ media: 'print' });
    });

    test('shell sidebar is hidden', async ({ page }) => {
      await expect(page.locator('.tui-shell-sidebar:visible')).toHaveCount(0);
    });

    test('reading progress bar is hidden', async ({ page }) => {
      await expect(page.locator('.tui-reading-progress')).toBeHidden();
    });

    test('navbar toggle is hidden', async ({ page }) => {
      await expect(page.locator('.tui-navbar-toggle')).toBeHidden();
    });
  });
});
