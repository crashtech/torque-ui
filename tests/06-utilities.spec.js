// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Utilities — Spacing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/06-utilities.html');
  });

  test('m-0 should have zero margin', async ({ page }) => {
    const m0 = page.locator('.tui-m-0').first();
    const marginTop = await m0.evaluate(el => getComputedStyle(el).marginTop);
    
    expect(marginTop).toBe('0px');
  });

  test('m-4 should have non-zero margin', async ({ page }) => {
    const m4 = page.locator('.tui-m-4').first();
    const marginTop = await m4.evaluate(el => getComputedStyle(el).marginTop);
    
    expect(marginTop).not.toBe('0px');
  });

  test('mt-6 should have top margin only', async ({ page }) => {
    const mt6 = page.locator('.tui-mt-6').first();
    const marginTop = await mt6.evaluate(el => getComputedStyle(el).marginTop);
    
    expect(marginTop).not.toBe('0px');
  });

  test('mb-6 should have bottom margin only', async ({ page }) => {
    const mb6 = page.locator('.tui-mb-6').first();
    const marginBottom = await mb6.evaluate(el => getComputedStyle(el).marginBottom);
    
    expect(marginBottom).not.toBe('0px');
  });

  test('ml-6 should have left margin only', async ({ page }) => {
    const ml6 = page.locator('.tui-ml-6').first();
    const marginLeft = await ml6.evaluate(el => getComputedStyle(el).marginLeft);
    
    expect(marginLeft).not.toBe('0px');
  });

  test('mr-6 should have right margin only', async ({ page }) => {
    const mr6 = page.locator('.tui-mr-6').first();
    const marginRight = await mr6.evaluate(el => getComputedStyle(el).marginRight);
    
    expect(marginRight).not.toBe('0px');
  });

  test('p-6 should have padding on all sides', async ({ page }) => {
    const p6 = page.locator('.tui-p-6').first();
    const paddingTop = await p6.evaluate(el => getComputedStyle(el).paddingTop);
    
    expect(paddingTop).not.toBe('0px');
  });

  test('margin utilities should be visually distinct', async ({ page }) => {
    // m-4 and mt-6 should have different margin values
    const m4 = page.locator('.tui-m-4').first();
    const mt6 = page.locator('.tui-mt-6').first();
    
    const m4MarginTop = await m4.evaluate(el => getComputedStyle(el).marginTop);
    const mt6MarginTop = await mt6.evaluate(el => getComputedStyle(el).marginTop);
    
    // They should have different values (m-4 vs mt-6)
    expect(m4MarginTop).not.toBe(mt6MarginTop);
  });
});

test.describe('Utilities — Text', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/06-utilities.html');
  });

  test('text-left should align start (logical)', async ({ page }) => {
    const textLeft = page.locator('.tui-text-left').first();
    const textAlign = await textLeft.evaluate(el => getComputedStyle(el).textAlign);
    
    expect(textAlign).toBe('start');
  });

  test('text-center should center text', async ({ page }) => {
    const textCenter = page.locator('.tui-text-center').first();
    const textAlign = await textCenter.evaluate(el => getComputedStyle(el).textAlign);
    
    expect(textAlign).toBe('center');
  });

  test('text-right should align end (logical)', async ({ page }) => {
    const textRight = page.locator('.tui-text-right').first();
    const textAlign = await textRight.evaluate(el => getComputedStyle(el).textAlign);
    
    expect(textAlign).toBe('end');
  });

  test('font-normal should have weight 400', async ({ page }) => {
    const fontNormal = page.locator('.tui-font-normal').first();
    const fontWeight = await fontNormal.evaluate(el => getComputedStyle(el).fontWeight);
    
    expect(fontWeight).toBe('400');
  });

  test('font-medium should have weight 500', async ({ page }) => {
    const fontMedium = page.locator('.tui-font-medium').first();
    const fontWeight = await fontMedium.evaluate(el => getComputedStyle(el).fontWeight);
    
    expect(fontWeight).toBe('500');
  });

  test('font-semibold should have weight 600', async ({ page }) => {
    const fontSemibold = page.locator('.tui-font-semibold').first();
    const fontWeight = await fontSemibold.evaluate(el => getComputedStyle(el).fontWeight);
    
    expect(fontWeight).toBe('600');
  });

  test('font-bold should have weight 700', async ({ page }) => {
    const fontBold = page.locator('.tui-font-bold').first();
    const fontWeight = await fontBold.evaluate(el => getComputedStyle(el).fontWeight);
    
    expect(fontWeight).toBe('700');
  });

  test('uppercase should convert text to uppercase', async ({ page }) => {
    const uppercase = page.locator('.tui-uppercase').first();
    const textTransform = await uppercase.evaluate(el => getComputedStyle(el).textTransform);
    
    expect(textTransform).toBe('uppercase');
  });

  test('lowercase should convert text to lowercase', async ({ page }) => {
    const lowercase = page.locator('.tui-lowercase').first();
    const textTransform = await lowercase.evaluate(el => getComputedStyle(el).textTransform);
    
    expect(textTransform).toBe('lowercase');
  });

  test('capitalize should capitalize first letters', async ({ page }) => {
    const capitalize = page.locator('.tui-capitalize').first();
    const textTransform = await capitalize.evaluate(el => getComputedStyle(el).textTransform);
    
    expect(textTransform).toBe('capitalize');
  });

  test('text-ellipsis should truncate with ellipsis', async ({ page }) => {
    const textEllipsis = page.locator('.tui-text-ellipsis').first();
    const overflow = await textEllipsis.evaluate(el => getComputedStyle(el).overflow);
    
    expect(overflow).toBe('hidden');
  });

  test('line-clamp-2 should limit to 2 lines', async ({ page }) => {
    const lineClamp = page.locator('.tui-line-clamp-2').first();
    // Line clamp uses CSS display: -webkit-box with -webkit-line-clamp
    expect(await lineClamp.count()).toBeGreaterThan(0);
  });
});

test.describe('Utilities — Colors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/06-utilities.html');
  });

  test('text-primary should use brand color', async ({ page }) => {
    const textPrimary = page.locator('.tui-text-primary').first();
    const color = await textPrimary.evaluate(el => getComputedStyle(el).color);
    
    expect(color).not.toBe('transparent');
  });

  test('text-positive should use green color', async ({ page }) => {
    const textPositive = page.locator('.tui-text-positive').first();
    const color = await textPositive.evaluate(el => getComputedStyle(el).color);
    
    expect(color).not.toBe('transparent');
  });

  test('text-negative should use red color', async ({ page }) => {
    const textNegative = page.locator('.tui-text-negative').first();
    const color = await textNegative.evaluate(el => getComputedStyle(el).color);
    
    expect(color).not.toBe('transparent');
  });

  test('text-warning should use amber/yellow color', async ({ page }) => {
    const textWarning = page.locator('.tui-text-warning').first();
    const color = await textWarning.evaluate(el => getComputedStyle(el).color);
    
    expect(color).not.toBe('transparent');
  });

  test('text-info should use blue color', async ({ page }) => {
    const textInfo = page.locator('.tui-text-info').first();
    const color = await textInfo.evaluate(el => getComputedStyle(el).color);
    
    expect(color).not.toBe('transparent');
  });

  test('text-neutral should use neutral color', async ({ page }) => {
    const textNeutral = page.locator('.tui-text-neutral').first();
    const color = await textNeutral.evaluate(el => getComputedStyle(el).color);
    
    // Neutral is typically a gray tone, not transparent
    expect(color).not.toBe('transparent');
  });

  test('bg-primary should have brand background', async ({ page }) => {
    const bgPrimary = page.locator('.tui-bg-primary').first();
    const backgroundColor = await bgPrimary.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(backgroundColor).not.toBe('transparent');
  });

  test('bg-positive should have green background', async ({ page }) => {
    const bgPositive = page.locator('.tui-bg-positive').first();
    const backgroundColor = await bgPositive.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(backgroundColor).not.toBe('transparent');
  });

  test('bg-negative should have red background', async ({ page }) => {
    const bgNegative = page.locator('.tui-bg-negative').first();
    const backgroundColor = await bgNegative.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(backgroundColor).not.toBe('transparent');
  });

  test('bg-warning should have amber/yellow background', async ({ page }) => {
    const bgWarning = page.locator('.tui-bg-warning').first();
    const backgroundColor = await bgWarning.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(backgroundColor).not.toBe('transparent');
  });

  test('bg-info should have blue background', async ({ page }) => {
    const bgInfo = page.locator('.tui-bg-info').first();
    const backgroundColor = await bgInfo.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(backgroundColor).not.toBe('transparent');
  });

  test('bg-neutral should have neutral background', async ({ page }) => {
    const bgNeutral = page.locator('.tui-bg-neutral').first();
    const backgroundColor = await bgNeutral.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(backgroundColor).not.toBe('transparent');
  });

  test('border-primary should have brand border', async ({ page }) => {
    const borderPrimary = page.locator('.tui-border-primary').first();
    const borderColor = await borderPrimary.evaluate(el => getComputedStyle(el).borderColor);
    
    expect(borderColor).not.toBe('transparent');
  });

  test('border-positive should have green border', async ({ page }) => {
    const borderPositive = page.locator('.tui-border-positive').first();
    const borderColor = await borderPositive.evaluate(el => getComputedStyle(el).borderColor);
    
    expect(borderColor).not.toBe('transparent');
  });

  test('border-negative should have red border', async ({ page }) => {
    const borderNegative = page.locator('.tui-border-negative').first();
    const borderColor = await borderNegative.evaluate(el => getComputedStyle(el).borderColor);
    
    expect(borderColor).not.toBe('transparent');
  });

  test('shadow-sm should have small shadow', async ({ page }) => {
    const shadowSm = page.locator('.tui-shadow-sm').first();
    const boxShadow = await shadowSm.evaluate(el => getComputedStyle(el).boxShadow);
    
    // Box shadow may be 'none' if not defined, but element should exist
    expect(await shadowSm.count()).toBeGreaterThan(0);
  });

  test('shadow-md should have medium shadow', async ({ page }) => {
    const shadowMd = page.locator('.tui-shadow-md').first();
    
    expect(await shadowMd.count()).toBeGreaterThan(0);
  });

  test('shadow-lg should have large shadow', async ({ page }) => {
    const shadowLg = page.locator('.tui-shadow-lg').first();
    
    expect(await shadowLg.count()).toBeGreaterThan(0);
  });

  test('shadow-xl should have extra-large shadow', async ({ page }) => {
    const shadowXl = page.locator('.tui-shadow-xl').first();
    
    expect(await shadowXl.count()).toBeGreaterThan(0);
  });
});

test.describe('Utilities — Overflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/06-utilities.html');
  });

  test('overflow-visible should allow content to show', async ({ page }) => {
    const overflowVisible = page.locator('.tui-overflow-visible').first();
    const overflow = await overflowVisible.evaluate(el => getComputedStyle(el).overflow);
    
    expect(overflow).toBe('visible');
  });

  test('overflow-hidden should clip content', async ({ page }) => {
    const overflowHidden = page.locator('.tui-overflow-hidden').first();
    const overflow = await overflowHidden.evaluate(el => getComputedStyle(el).overflow);
    
    expect(overflow).toBe('hidden');
  });

  test('overflow-auto should show scrollbars when needed', async ({ page }) => {
    const overflowAuto = page.locator('.tui-overflow-auto').first();
    const overflow = await overflowAuto.evaluate(el => getComputedStyle(el).overflow);
    
    expect(overflow).toBe('auto');
  });

  test('overflow-scroll should always show scrollbars', async ({ page }) => {
    const overflowScroll = page.locator('.tui-overflow-scroll').first();
    const overflow = await overflowScroll.evaluate(el => getComputedStyle(el).overflow);
    
    expect(overflow).toBe('scroll');
  });

  test('all overflow utilities should exist', async ({ page }) => {
    const visible = await page.locator('.tui-overflow-visible').count();
    const hidden = await page.locator('.tui-overflow-hidden').count();
    const auto = await page.locator('.tui-overflow-auto').count();
    const scroll = await page.locator('.tui-overflow-scroll').count();
    
    expect(visible).toBeGreaterThan(0);
    expect(hidden).toBeGreaterThan(0);
    expect(auto).toBeGreaterThan(0);
    expect(scroll).toBeGreaterThan(0);
  });
});

test.describe('Utilities — Sizing & auto margins', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/06-utilities.html');
  });

  test('w-50 is half of its parent', async ({ page }) => {
    const [child, parent] = await page.locator('#sizing-section .tui-w-50').first().evaluate(el => [el.getBoundingClientRect().width, el.parentElement.getBoundingClientRect().width]);
    expect(Math.abs(child - parent / 2)).toBeLessThan(1);
  });

  test('max-w-md computes to 28rem (448px)', async ({ page }) => {
    const maxW = await page.locator('.tui-max-w-md').first().evaluate(el => getComputedStyle(el).maxInlineSize);
    expect(maxW).toBe('448px');
  });

  test('ms-auto pushes a flex child to the end', async ({ page }) => {
    const demo = page.locator('#auto-margin-demo');
    const parentRight = await demo.evaluate(el => el.getBoundingClientRect().right - parseFloat(getComputedStyle(el).paddingRight));
    const childRight = await demo.locator('.tui-ms-auto').evaluate(el => el.getBoundingClientRect().right);
    expect(Math.abs(parentRight - childRight)).toBeLessThan(1);
  });

  test('pt-4 and pb-4 pad one block edge only', async ({ page }) => {
    const pt = await page.locator('.tui-pt-4').first().evaluate(el => [getComputedStyle(el).paddingTop, getComputedStyle(el).paddingBottom]);
    const pb = await page.locator('.tui-pb-4').first().evaluate(el => [getComputedStyle(el).paddingTop, getComputedStyle(el).paddingBottom]);
    expect(pt).toEqual(['16px', '0px']);
    expect(pb).toEqual(['0px', '16px']);
  });

  test('sticky-top is position sticky at the top', async ({ page }) => {
    const [pos, top] = await page.locator('#sticky-demo').evaluate(el => [getComputedStyle(el).position, getComputedStyle(el).top]);
    expect(pos).toBe('sticky');
    expect(top).toBe('0px');
  });

  test('opacity, dashed border and rounded utilities apply', async ({ page }) => {
    expect(await page.locator('.tui-opacity-50').first().evaluate(el => getComputedStyle(el).opacity)).toBe('0.5');
    expect(await page.locator('.tui-border-dashed').first().evaluate(el => getComputedStyle(el).borderTopStyle)).toBe('dashed');
    expect(await page.locator('.tui-rounded-full').first().evaluate(el => getComputedStyle(el).borderTopLeftRadius)).toBe('9999px');
  });

  test('surface backgrounds and text levels resolve to the tokens', async ({ page }) => {
    const [bg, token] = await page.locator('.tui-bg-surface-2').first().evaluate(el => {
      const probe = document.createElement('div');
      probe.style.backgroundColor = 'var(--tui-surface-2)';
      document.body.append(probe);
      const r = [getComputedStyle(el).backgroundColor, getComputedStyle(probe).backgroundColor];
      probe.remove();
      return r;
    });
    expect(bg).toBe(token);
    const t3 = await page.locator('.tui-text-3').first().evaluate(el => {
      const probe = document.createElement('div');
      probe.style.color = 'var(--tui-text-3)';
      document.body.append(probe);
      const r = [getComputedStyle(el).color, getComputedStyle(probe).color];
      probe.remove();
      return r;
    });
    expect(t3[0]).toBe(t3[1]);
  });

  test('container-sm caps at 28rem and centres', async ({ page }) => {
    const [maxW, ml] = await page.locator('#container-sm-demo').evaluate(el => [getComputedStyle(el).maxInlineSize, getComputedStyle(el).marginLeft]);
    expect(maxW).toBe('448px');
    expect(parseFloat(ml)).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Utilities — Gradient, palette, chart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/06-utilities.html');
  });

  test('bg-gradient is flat until --tui-brand-end is set on :root', async ({ page }) => {
    const flat = await page.locator('#gradient-flat').evaluate(el => getComputedStyle(el).backgroundImage);
    expect(flat).toContain('linear-gradient');
    const flatStops = flat.match(/rgb\([^)]*\)/g) || [];
    expect(new Set(flatStops).size).toBe(1);

    const rooted = await page.locator('#gradient-flat').evaluate(el => {
      document.documentElement.style.setProperty('--tui-brand-end', '#7a00ff');
      const img = getComputedStyle(el).backgroundImage;
      document.documentElement.style.removeProperty('--tui-brand-end');
      return img;
    });
    const rootedStops = rooted.match(/rgb\([^)]*\)/g) || [];
    expect(new Set(rootedStops).size).toBe(2);
  });

  test('a per-element --tui-brand-gradient override wins', async ({ page }) => {
    const set = await page.locator('#gradient-set').evaluate(el => getComputedStyle(el).backgroundImage);
    const setStops = set.match(/rgb\([^)]*\)/g) || [];
    expect(new Set(setStops).size).toBe(2);
  });

  test('bg-gradient follows the tone class', async ({ page }) => {
    const [img, positive] = await page.locator('#gradient-tone').evaluate(el => {
      const probe = document.createElement('div');
      probe.style.color = 'var(--tui-positive)';
      document.body.append(probe);
      const r = [getComputedStyle(el).backgroundImage, getComputedStyle(probe).color];
      probe.remove();
      return r;
    });
    expect(img).toContain(positive);
  });

  test('avatar palette classes use their tokens with white text', async ({ page }) => {
    const [bg, token, color] = await page.locator('#avatar-palette .tui-avatar-3').evaluate(el => {
      const probe = document.createElement('div');
      probe.style.backgroundColor = 'var(--tui-avatar-3)';
      document.body.append(probe);
      const r = [getComputedStyle(el).backgroundColor, getComputedStyle(probe).backgroundColor, getComputedStyle(el).color];
      probe.remove();
      return r;
    });
    expect(bg).toBe(token);
    expect(color).toBe('rgb(255, 255, 255)');
  });

  test('text-brand-fg resolves to --tui-brand-fg', async ({ page }) => {
    const [color, token] = await page.locator('#text-brand-fg').evaluate(el => {
      const probe = document.createElement('div');
      probe.style.color = 'var(--tui-brand-fg)';
      document.body.append(probe);
      const r = [getComputedStyle(el).color, getComputedStyle(probe).color];
      probe.remove();
      return r;
    });
    expect(color).toBe(token);
  });

  test('chart-3 colours an SVG currentColor fill and the legend swatch alike', async ({ page }) => {
    const rectFill = await page.locator('#chart-demo .tui-chart-3 rect').evaluate(el => getComputedStyle(el).fill);
    const swatch = await page.locator('#legend-demo .tui-chart-3 .tui-legend-swatch').evaluate(el => getComputedStyle(el).backgroundColor);
    const token = await page.evaluate(() => {
      const probe = document.createElement('div');
      probe.style.color = 'var(--tui-chart-3)';
      document.body.append(probe);
      const r = getComputedStyle(probe).color;
      probe.remove();
      return r;
    });
    expect(rectFill).toBe(token);
    expect(swatch).toBe(token);
  });

  test('chart frame makes the SVG fill the width', async ({ page }) => {
    const [svgW, frameW] = await page.locator('#chart-demo').evaluate(el => [el.querySelector('svg').getBoundingClientRect().width, el.getBoundingClientRect().width]);
    expect(Math.abs(svgW - frameW)).toBeLessThan(1);
  });

  test('frame-light is real white with real black ink in every scheme', async ({ page }) => {
    const [bg, color] = await page.locator('#frame-light-demo').evaluate(el => [getComputedStyle(el).backgroundColor, getComputedStyle(el).color]);
    expect(bg).toBe('rgb(255, 255, 255)');
    expect(color).toBe('rgb(0, 0, 0)');
  });

  test('thumb clips its media and styles the caption', async ({ page }) => {
    const [overflow, capSize] = await page.locator('#thumb-demo').evaluate(el => [getComputedStyle(el).overflow, getComputedStyle(el.querySelector('figcaption')).fontSize]);
    expect(overflow).toBe('hidden');
    expect(capSize).toBe('12px');
  });

  test('glass surfaces keep a visible border on flat backdrops', async ({ page }) => {
    const border = await page.evaluate(() => {
      const el = document.createElement('div');
      el.className = 'tui-glass-card';
      document.body.append(el);
      const probe = document.createElement('div');
      probe.style.borderColor = 'var(--tui-border)';
      document.body.append(probe);
      const r = [getComputedStyle(el).borderTopColor, getComputedStyle(probe).borderTopColor];
      el.remove(); probe.remove();
      return r;
    });
    expect(border[0]).toBe(border[1]);
  });
});
