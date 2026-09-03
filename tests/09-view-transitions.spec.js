// @ts-check
const { test, expect } = require('@playwright/test');
const { getViolations } = require('./a11y-base');

test.describe('Themes — View transitions', () => {
  test('navigating between two example pages completes without throwing', async ({ page }) => {
    await page.goto('/examples/05-layout.html');
    await expect(page.getByRole('heading', { name: 'Container', exact: true })).toBeVisible();

    await page.goto('/examples/08-patterns.html');
    await expect(page.getByRole('heading', { name: 'App shell', exact: true })).toBeVisible();
  });

  test('document.startViewTransition exists where the feature is supported', async ({ page }) => {
    await page.goto('/examples/index.html');
    const supportsViewTransitionName = await page.evaluate(() => CSS.supports('view-transition-name', 'none'));
    test.skip(!supportsViewTransitionName);

    const hasStartViewTransition = await page.evaluate(() => typeof document.startViewTransition === 'function');
    expect(hasStartViewTransition).toBe(true);
  });

  test('no axe violations', async ({ page }) => {
    await page.goto('/examples/index.html');
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], 'body')).toEqual([]);
  });
});
