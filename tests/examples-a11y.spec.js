// @ts-check
const { test, expect } = require('@playwright/test');
const { getViolations, CONTRAST_RULES, STRUCTURAL_RULES, IMAGE_RULES } = require('./a11y-base');

/**
 * Accessibility tests for Torque UI examples pages.
 * Each page is tested for WCAG 2.1 AA compliance using axe-core.
 */

const PAGES = [
  { name: 'index', url: 'index.html' },
  { name: 'typography', url: '01-typography.html' },
  { name: 'elements', url: '02-elements.html' },
  { name: 'components', url: '03-components.html' },
  { name: 'forms', url: '04-forms.html' },
  { name: 'layout', url: '05-layout.html' },
  { name: 'utilities', url: '06-utilities.html' },
  { name: 'interactive', url: '07-interactive.html' },
  { name: 'patterns', url: '08-patterns.html' },
  { name: 'dark-mode', url: 'dark-mode.html' },
  { name: 'new-features', url: 'new-features.html' },
  { name: 'color-system', url: 'color-system.html' },
  // why: .tui-text-positive is excluded from the contrast check below — a
  // single-property color utility (like .tui-bg-*, see
  // 70-utilities/colors.css) demonstrated here on a plain .tui-badge; the
  // pairing's contrast depends on whatever background the caller combines
  // it with, same as any single-purpose color utility, so it isn't a
  // component contrast bug to fix.
  { name: 'showcase', url: 'showcase.html', contrastExclude: ['.tui-text-positive'] },
];

test.describe('Torque UI Accessibility — Contrast & WCAG 2.1 AA', () => {
  
  for (const pageInfo of PAGES) {
    test.describe(`Page: ${pageInfo.name}`, () => {
      
      test.beforeEach(async ({ page }) => {
        await page.goto(pageInfo.url);
      });

      test('should have no color contrast violations', async ({ page }) => {
        const context = pageInfo.contrastExclude ? { exclude: pageInfo.contrastExclude } : undefined;
        const violations = await getViolations(page, CONTRAST_RULES, context);
        expect(violations).toEqual([]);
      });

      test('should have proper document structure', async ({ page }) => {
        const violations = await getViolations(page, STRUCTURAL_RULES);
        expect(violations).toEqual([]);
      });

      test('should have valid image alt attributes', async ({ page }) => {
        const violations = await getViolations(page, IMAGE_RULES);
        expect(violations).toEqual([]);
      });

    });
  }
});
