// @ts-check
const { test, expect } = require('@playwright/test');
const { getViolations } = require('./a11y-base');

test.describe('Typography — Headings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/01-typography.html');
  });

  test('h1 should have correct font size and weight', async ({ page }) => {
    const h1 = page.locator('h1');
    expect(await h1.textContent()).toContain('Heading 1');
    
    const fontSize = await h1.evaluate(el => getComputedStyle(el).fontSize);
    const fontWeight = await h1.evaluate(el => getComputedStyle(el).fontWeight);
    
    // h1 should be the largest heading (36px = var(--tui-text-4xl))
    expect(fontSize).toBe('36px');
    expect(fontWeight).toBe('700');
  });

  test('h2-h6 headings should have decreasing font sizes', async ({ page }) => {
    const h2 = await page.locator('h2').first().evaluate(el => getComputedStyle(el).fontSize);
    const h3 = await page.locator('h3').first().evaluate(el => getComputedStyle(el).fontSize);
    const h4 = await page.locator('h4').first().evaluate(el => getComputedStyle(el).fontSize);
    
    expect(h2).toBe('30px'); // var(--tui-text-3xl)
    expect(h3).toBe('24px');  // var(--tui-text-2xl)
    expect(h4).toBe('20px');  // var(--tui-text-xl)
  });

  test('all headings should use sans-serif font family', async ({ page }) => {
    const fontFamily = await page.locator('h1').evaluate(el => getComputedStyle(el).fontFamily);
    expect(fontFamily).toContain('system-ui');
  });

  test('headings should have tight line height', async ({ page }) => {
    const lineHeight = await page.locator('h1').evaluate(el => getComputedStyle(el).lineHeight);
    // Tight leading is 1.25, so for 36px that's 45px
    expect(lineHeight).toBe('45px');
  });
});

test.describe('Typography — Paragraphs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/01-typography.html');
  });

  test('paragraphs should have correct base font size and line height', async ({ page }) => {
    const p = page.locator('p').first();
    
    const fontSize = await p.evaluate(el => getComputedStyle(el).fontSize);
    const lineHeight = await p.evaluate(el => getComputedStyle(el).lineHeight);
    
    expect(fontSize).toBe('16px'); // var(--tui-text-base)
    expect(lineHeight).toBe('25.6px'); // 1.6 * 16px
  });

  test('small text utility should reduce font size', async ({ page }) => {
    const smallP = page.locator('.tui-text-sm').first();
    const fontSize = await smallP.evaluate(el => getComputedStyle(el).fontSize);
    
    expect(fontSize).toBe('14px'); // var(--tui-text-sm)
  });

  test('neutral color utility should apply neutral text color', async ({ page }) => {
    const neutralP = page.locator('.tui-text-neutral').first();
    const color = await neutralP.evaluate(el => getComputedStyle(el).color);
    
    // Should be a gray/neutral color, not pure black
    expect(color).not.toBe('rgb(0, 0, 0)');
  });
});

test.describe('Typography — Text Weights', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/01-typography.html');
  });

  test('tui-font-normal should set font-weight to 400', async ({ page }) => {
    const normal = page.locator('.tui-font-normal').first();
    const fontWeight = await normal.evaluate(el => getComputedStyle(el).fontWeight);
    expect(fontWeight).toBe('400');
  });

  test('tui-font-medium should set font-weight to 500', async ({ page }) => {
    const medium = page.locator('.tui-font-medium').first();
    const fontWeight = await medium.evaluate(el => getComputedStyle(el).fontWeight);
    expect(fontWeight).toBe('500');
  });

  test('tui-font-semibold should set font-weight to 600', async ({ page }) => {
    const semibold = page.locator('.tui-font-semibold').first();
    const fontWeight = await semibold.evaluate(el => getComputedStyle(el).fontWeight);
    expect(fontWeight).toBe('600');
  });

  test('tui-font-bold should set font-weight to 700', async ({ page }) => {
    const bold = page.locator('.tui-font-bold').first();
    const fontWeight = await bold.evaluate(el => getComputedStyle(el).fontWeight);
    expect(fontWeight).toBe('700');
  });
});

test.describe('Typography — Text Transforms', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/01-typography.html');
  });

  test('tui-uppercase should capitalize all text', async ({ page }) => {
    const uppercase = page.locator('.tui-uppercase').first();
    const textTransform = await uppercase.evaluate(el => getComputedStyle(el).textTransform);
    expect(textTransform).toBe('uppercase');
  });

  test('tui-lowercase should lowercase all text', async ({ page }) => {
    const lowercase = page.locator('.tui-lowercase').first();
    const textTransform = await lowercase.evaluate(el => getComputedStyle(el).textTransform);
    expect(textTransform).toBe('lowercase');
  });

  test('tui-capitalize should capitalize first letter of each word', async ({ page }) => {
    const capitalize = page.locator('.tui-capitalize').first();
    const textTransform = await capitalize.evaluate(el => getComputedStyle(el).textTransform);
    expect(textTransform).toBe('capitalize');
  });
});

test.describe('Typography — Special Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/01-typography.html');
  });

  test('blockquote should have left border and italic style', async ({ page }) => {
    const blockquote = page.locator('blockquote').first();
    
    const borderLeftWidth = await blockquote.evaluate(el => getComputedStyle(el).borderLeftWidth);
    const fontStyle = await blockquote.evaluate(el => getComputedStyle(el).fontStyle);
    
    expect(borderLeftWidth).toBe('4px');
    expect(fontStyle).toBe('italic');
  });

  test('code elements should use monospace font', async ({ page }) => {
    const code = page.locator('code').first();
    const fontFamily = await code.evaluate(el => getComputedStyle(el).fontFamily);
    
    expect(fontFamily).toContain('monospace');
  });

  test('pre blocks should have padding and background', async ({ page }) => {
    const pre = page.locator('pre').first();
    
    const padding = await pre.evaluate(el => getComputedStyle(el).padding);
    const backgroundColor = await pre.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(padding).not.toBe('0px');
    expect(backgroundColor).not.toBe('transparent');
  });

  test('mark elements should have highlight styling', async ({ page }) => {
    const mark = page.locator('mark').first();
    const backgroundColor = await mark.evaluate(el => getComputedStyle(el).backgroundColor);
    
    // Should have a background color (highlight)
    expect(backgroundColor).not.toBe('transparent');
  });

  test('hr elements should have horizontal border', async ({ page }) => {
    const hr = page.locator('hr').first();
    const borderTopWidth = await hr.evaluate(el => getComputedStyle(el).borderTopWidth);
    
    expect(borderTopWidth).toBe('1px');
  });

  test('sub and sup elements should render inline', async ({ page }) => {
    const sub = page.locator('sub').first();
    const sup = page.locator('sup').first();

    const subDisplay = await sub.evaluate(el => getComputedStyle(el).display);
    const supDisplay = await sup.evaluate(el => getComputedStyle(el).display);

    expect(subDisplay).toBe('inline');
    expect(supDisplay).toBe('inline');
  });

  test('kbd should have a raised-key bottom border', async ({ page }) => {
    const kbd = page.locator('kbd').first();
    const borderBottomWidth = await kbd.evaluate(el => getComputedStyle(el).borderBottomWidth);

    expect(borderBottomWidth).toBe('2px');
  });

  // why: Chromium never resolves `counter()` inside getComputedStyle's
  // `content` (it returns the literal function, not the used value) — a
  // spec-conformant CSSOM limitation, not a bug in the counters below. A
  // scoped screenshot of the rendered line is the only way to assert the
  // actual number painted.
  test('the third line in a code block with line numbers is labeled 3', async ({ page }) => {
    const block = page.locator('.tui-code-block-lines').first();
    const thirdLine = block.locator('> code').nth(2);

    const counterReset = await block.evaluate(el => getComputedStyle(el).counterReset);
    const counterIncrement = await thirdLine.evaluate(el => getComputedStyle(el).counterIncrement);

    expect(counterReset).toContain('line');
    expect(counterIncrement).toContain('line');

    await expect(thirdLine).toHaveScreenshot('code-block-line-3.png');
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], { include: ['.tui-code-block', 'kbd'] })).toEqual([]);
  });
});

test.describe('Typography — Black weight & root size', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/01-typography.html');
  });

  test('font-black has weight 800', async ({ page }) => {
    const weight = await page.locator('#font-black-demo').evaluate(el => getComputedStyle(el).fontWeight);
    expect(weight).toBe('800');
  });

  test('html font-size follows --tui-root-size', async ({ page }) => {
    const before = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
    expect(before).toBe('16px');
    const after = await page.evaluate(() => {
      document.documentElement.style.setProperty('--tui-root-size', '93.75%');
      return getComputedStyle(document.documentElement).fontSize;
    });
    expect(after).toBe('15px');
    const h1 = await page.locator('h1').first().evaluate(el => getComputedStyle(el).fontSize);
    expect(h1).toBe('33.75px');
  });
});
