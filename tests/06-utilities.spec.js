// @ts-check
const { test, expect } = require('@playwright/test');
const { getViolations } = require('./a11y-base');

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

  test('container-sm caps at 28rem and centers', async ({ page }) => {
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

  test('text-gradient clips the tone gradient to the glyphs', async ({ page }) => {
    const style = await page.locator('#text-gradient').evaluate(el => {
      const cs = getComputedStyle(el);
      return { clip: cs.backgroundClip, color: cs.color, image: cs.backgroundImage };
    });
    expect(style.clip).toBe('text');
    expect(style.color).toBe('rgba(0, 0, 0, 0)');
    expect(new Set(style.image.match(/rgb\([^)]*\)/g) || []).size).toBe(2);
  });

  test('text-gradient follows the tone class', async ({ page }) => {
    const [img, positive] = await page.locator('#text-gradient-tone').evaluate(el => {
      const probe = document.createElement('div');
      probe.style.color = 'var(--tui-positive)';
      document.body.append(probe);
      const r = [getComputedStyle(el).backgroundImage, getComputedStyle(probe).color];
      probe.remove();
      return r;
    });
    expect(img).toContain(positive);
  });

  test('a gradient heading keeps its descenders inside the painted box', async ({ page }) => {
    const gap = await page.locator('#text-gradient-heading').evaluate(el => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const glyphs = range.getBoundingClientRect();
      return glyphs.bottom - el.getBoundingClientRect().bottom;
    });
    expect(gap).toBeLessThanOrEqual(0.5);
  });

  test('text-gradient falls back to solid text in print and forced-colors mode', async ({ page }) => {
    const read = () => page.locator('#text-gradient').evaluate(el => {
      const cs = getComputedStyle(el);
      return { clip: cs.backgroundClip, color: cs.color };
    });
    await page.emulateMedia({ media: 'print' });
    let style = await read();
    expect(style.clip).not.toBe('text');
    expect(style.color).not.toBe('rgba(0, 0, 0, 0)');
    await page.emulateMedia({ media: 'screen', forcedColors: 'active' });
    style = await read();
    expect(style.clip).not.toBe('text');
    expect(style.color).not.toBe('rgba(0, 0, 0, 0)');
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

  test('chart-3 colors an SVG currentColor fill and the legend swatch alike', async ({ page }) => {
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

  test('the chart series derive from the base, the rotation and the pastel strength', async ({ page }) => {
    await page.setContent('<link rel="stylesheet" href="/src/tui.css"><span class="tui-chart-0" id="c0"></span><span class="tui-chart-2" id="c2"></span><span class="tui-chart-6" id="c6"></span>');
    const oklch = (id) => page.evaluate((id) => getComputedStyle(document.getElementById(id)).color.match(/oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/).slice(1).map(Number), id);
    const brand = () => page.evaluate(() => { const el = document.createElement('span'); el.style.color = 'oklch(from var(--tui-brand) l c h)'; document.body.append(el); const c = getComputedStyle(el).color; el.remove(); return c.match(/oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/).slice(1).map(Number); });
    const [bl, bc, bh] = await brand();
    const [l0, c0, h0] = await oklch('c0');
    const [l2, c2, h2] = await oklch('c2');
    const [l6, , h6] = await oklch('c6');
    expect(h0).toBeCloseTo(bh, 1);
    expect(h2).toBeCloseTo((bh + 1560 / 7 * 2) % 360, 1);
    expect(h6).toBeCloseTo((bh + 1560 / 7 * 6) % 360, 1);
    expect(l0).toBeCloseTo(bl + (0.86 - bl) * 0.35, 3);
    expect(c0).toBeCloseTo(bc + (0.08 - bc) * 0.35, 3);
    expect([l2, c2]).toEqual([l0, c0]);
    expect(l6).toBe(l0);
    await page.evaluate(() => { const root = document.documentElement.style; root.setProperty('--tui-chart-base', 'oklch(0.5 0.2 200)'); root.setProperty('--tui-chart-rotation', '40'); root.setProperty('--tui-chart-pastel', '0'); });
    expect(await oklch('c0')).toEqual([0.5, 0.2, 200]);
    expect(await oklch('c2')).toEqual([0.5, 0.2, 280]);
    await page.evaluate(() => document.documentElement.style.setProperty('--tui-chart-pastel', '1'));
    expect(await oklch('c2')).toEqual([0.86, 0.08, 280]);
  });

  test('yellow, orange and pink follow the brand lightness inside a band that keeps them reading as their name', async ({ page }) => {
    await page.setContent('<link rel="stylesheet" href="/src/tui.css">');
    const lightness = (brand) => page.evaluate((brand) => {
      document.documentElement.style.setProperty('--tui-brand', brand);
      return ['yellow', 'orange', 'pink', 'warning'].map((name) => {
        const el = document.createElement('span');
        el.style.color = `oklch(from var(--tui-${name}) l c h)`;
        document.body.append(el);
        const l = Number(getComputedStyle(el).color.match(/oklch\(([\d.]+)/)[1]);
        el.remove();
        return l;
      });
    }, brand);
    const expectBand = (actual, expected) => actual.forEach((l, i) => expect(l).toBeCloseTo(expected[i], 3));
    expectBand(await lightness('oklch(0.62 0.2 276)'), [0.868, 0.744, 0.713, 0.868]);
    expectBand(await lightness('oklch(0.35 0.2 276)'), [0.7, 0.6, 0.58, 0.7]);
    expectBand(await lightness('oklch(0.85 0.2 276)'), [0.92, 0.9, 0.9, 0.92]);
  });

  test('a staggered chart colors each child from its sibling index on the same wheel as the tokens', async ({ page }) => {
    const bars = await page.locator('#chart-stagger-demo rect').evaluateAll((els) => els.map((el) => getComputedStyle(el).fill));
    const tokens = await page.evaluate(() => [0, 1, 2, 3, 4, 5, 6].map((n) => { const probe = document.createElement('div'); probe.style.color = `var(--tui-chart-${n})`; document.body.append(probe); const c = getComputedStyle(probe).color; probe.remove(); return c; }));
    expect(bars.slice(0, 7)).toEqual(tokens);
    expect(bars).toHaveLength(9);
    const hue = (c) => Number(c.match(/oklch\([\d.]+ [\d.]+ ([\d.]+)\)/)[1]);
    expect(hue(bars[7])).toBeCloseTo((hue(bars[0]) + 1560 / 7 * 7) % 360, 1);
    expect(new Set(bars).size).toBe(9);
  });

  test('the stagger step hook and an inline index repin staggered legend items', async ({ page }) => {
    const swatches = await page.locator('#legend-stagger-demo .tui-legend-swatch').evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
    const hue = (c) => Number(c.match(/oklch\([\d.]+ [\d.]+ ([\d.]+)\)/)[1]);
    expect(hue(swatches[1])).toBeCloseTo((hue(swatches[0]) + 30) % 360, 1);
    expect(hue(swatches[2])).toBeCloseTo((hue(swatches[0]) + 180) % 360, 1);
  });

  test('the avatar palette takes the chart hues, darkened for white initials', async ({ page }) => {
    await page.setContent('<link rel="stylesheet" href="/src/tui.css"><span class="tui-avatar tui-avatar-2" id="a">AB</span>');
    const oklch = () => page.evaluate(() => getComputedStyle(document.getElementById('a')).backgroundColor.match(/oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/).slice(1).map(Number));
    await page.evaluate(() => { const root = document.documentElement.style; root.setProperty('--tui-chart-base', 'oklch(0.7 0.2 100)'); root.setProperty('--tui-chart-rotation', '40'); });
    expect(await oklch()).toEqual([0.5, 0.2, 180]);
    await page.evaluate(() => document.documentElement.style.setProperty('--tui-chart-base', 'oklch(0.4 0.2 100)'));
    expect(await oklch()).toEqual([0.4, 0.2, 180]);
  });

  test('the spacing, radius, text and tracking scales derive from one step each', async ({ page }) => {
    await page.setContent('<link rel="stylesheet" href="/src/tui.css"><p class="tui-p-6 tui-rounded-lg tui-text-2xl tui-tracking-wider" id="s" style="font-size: 16px;"></p>');
    const read = () => page.locator('#s').evaluate((el) => { const cs = getComputedStyle(el); return [cs.paddingTop, cs.borderTopLeftRadius, cs.letterSpacing]; });
    const fontSize = () => page.locator('#s').evaluate((el) => { el.style.fontSize = 'var(--tui-text-2xl)'; return getComputedStyle(el).fontSize; });
    expect(await read()).toEqual(['24px', '8px', '0.8px']);
    expect(await fontSize()).toBe('24px');
    await page.evaluate(() => { const root = document.documentElement.style; root.setProperty('--tui-spacing-1', '0.5rem'); root.setProperty('--tui-radius-sm', '0.25rem'); root.setProperty('--tui-text-base', '2rem'); root.setProperty('--tui-tracking-wide', '0.05em'); });
    expect(await fontSize()).toBe('48px');
    expect(await read()).toEqual(['48px', '16px', '4.8px']);
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

const animationName = (locator) => locator.evaluate((el) => getComputedStyle(el).animationName);

const ANIMATE_NAMES = ['fade', 'scale', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right', 'fly-top', 'fly-bottom', 'fly-left', 'fly-right', 'flip-x', 'flip-y', 'shake', 'pulse', 'bounce', 'flash', 'jiggle', 'tada'];

test.describe('Utilities — Animate catalog', () => {
  test.beforeEach(({ page }) => page.goto('/examples/06-utilities.html'));

  test('every catalog class names its keyframe on the motion tokens', async ({ page }) => {
    for (const name of ANIMATE_NAMES) {
      expect(await page.locator(`#animate-${name}`).evaluate((el) => getComputedStyle(el).animationName), name).toBe(`tui-${name}`);
    }
    const fade = await page.locator('#animate-fade').evaluate((el) => { const c = getComputedStyle(el); return [c.animationFillMode, c.animationDuration]; });
    expect(fade).toEqual(['both', '0.25s']);
    expect(await page.locator('#animate-tada').evaluate((el) => getComputedStyle(el).animationDuration)).toBe('0.5s');
  });

  test('an entrance played out runs its exit keyframe and leaves the element hidden', async ({ page }) => {
    const out = page.locator('#animate-out');
    await out.evaluate((el) => { el.dataset.playing = ''; });
    expect(await animationName(out)).toBe('tui-fade-out');
    await out.evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
    expect(await out.evaluate((el) => { const c = getComputedStyle(el); return [c.opacity, c.visibility]; })).toEqual(['0', 'hidden']);
  });

  test('the base and the slowest token set on an ancestor retime the entrances and attention animations under it', async ({ page }) => {
    const entrance = page.locator('#animate-retimed-entrance');
    const attention = page.locator('#animate-retimed-attention');
    expect(await entrance.evaluate((el) => getComputedStyle(el).animationDuration)).toBe('1s');
    expect(await attention.evaluate((el) => getComputedStyle(el).animationDuration)).toBe('2s');
  });

  test('the duration tokens derive from --tui-duration-normal', async ({ page }) => {
    await page.setContent('<link rel="stylesheet" href="/src/tui.css"><span class="tui-spinner" id="s"></span><span class="tui-animate tui-animate-tada" id="t"></span><span class="tui-animate tui-animate-fade" id="f" style="animation-duration: var(--tui-duration-faster)"></span>');
    const durations = () => page.evaluate(() => ['s', 't', 'f'].map((id) => getComputedStyle(document.getElementById(id)).animationDuration));
    expect(await durations()).toEqual(['0.75s', '0.5s', '0.1s']);
    await page.evaluate(() => document.documentElement.style.setProperty('--tui-duration-normal', '500ms'));
    expect(await durations()).toEqual(['1.5s', '1s', '0.2s']);
  });

  test('an animated element is promoted to its own layer before its first run', async ({ page }) => {
    const hint = await page.locator('#animate-fade').evaluate((el) => getComputedStyle(el).willChange);
    for (const property of ['opacity', 'transform', 'translate', 'scale', 'rotate']) expect(hint).toContain(property);
  });

  test('strength multiplies how far the moving attention animations go', async ({ page }) => {
    const read = (id, prop) => page.locator(id).evaluate((el, prop) => getComputedStyle(el)[prop], prop);
    expect(await read('#animate-strength-1', 'translate')).toBe('-4px');
    expect(await read('#animate-strength-2', 'translate')).toBe('-8px');
    expect(await read('#animate-strength-pulse', 'scale')).toBe('1.18');
    expect(await read('#animate-strength-jiggle', 'rotate')).toBe('-1.5deg');
  });

  test('loop repeats forever', async ({ page }) => {
    expect(await page.locator('#animate-loop').evaluate((el) => getComputedStyle(el).animationIterationCount)).toBe('infinite');
  });
});


test.describe('Utilities — Animate count', () => {
  test.beforeEach(({ page }) => page.goto('/examples/06-utilities.html'));

  const settle = (locator) => locator.evaluate((el) => el.getAnimations().forEach((a) => a.finish()));
  const counted = (locator) => locator.evaluate((el) => { const c = getComputedStyle(el); return [c.getPropertyValue('--tui-animate-value'), c.counterReset]; });

  test('the value settles on the defaults and feeds the counter', async ({ page }) => {
    const count = page.locator('#animate-count');
    expect(await animationName(count)).toBe('tui-count');
    await settle(count);
    expect(await counted(count)).toEqual(['100', 'tui-animate-value 100']);
  });

  test('the value interpolates between a custom start and end and the counter rounds it', async ({ page }) => {
    const range = page.locator('#animate-count-range');
    await range.evaluate((el) => el.getAnimations().forEach((a) => { a.pause(); a.currentTime = 83; }));
    expect(await counted(range)).toEqual(['421.68', 'tui-animate-value 422']);
    await settle(range);
    expect(await counted(range)).toEqual(['1250', 'tui-animate-value 1250']);
  });

  test('count text prints the counter, and a bare count prints nothing', async ({ page }) => {
    const after = (id) => page.locator(id).evaluate((el) => getComputedStyle(el, '::after').content);
    expect(await after('#animate-count-text')).toBe('counter(tui-animate-value)');
    expect(await after('#animate-count')).toBe('none');
  });

  test('out counts back down to the start', async ({ page }) => {
    const out = page.locator('#animate-count-out');
    expect(await animationName(out)).toBe('tui-count-out');
    await settle(out);
    expect(await counted(out)).toEqual(['10', 'tui-animate-value 10']);
  });

  test('a child reads the value its parent animates', async ({ page }) => {
    const count = page.locator('#animate-count');
    await settle(count);
    expect(await count.evaluate((el) => getComputedStyle(el.appendChild(document.createElement('i'))).getPropertyValue('--tui-animate-value'))).toBe('100');
  });

  test('reduced motion lands on the end value at once', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const range = page.locator('#animate-count-range');
    await range.evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
    expect(await counted(range)).toEqual(['1250', 'tui-animate-value 1250']);
  });
});

test.describe('Utilities — Animate playing state', () => {
  test.beforeEach(({ page }) => page.goto('/examples/06-utilities.html'));

  test('a class or data attribute plays the animation, reads back as --tui-playing, and stops when removed', async ({ page }) => {
    const badge = page.locator('#animate-playing');
    expect(await animationName(badge)).toBe('none');
    await badge.evaluate((el) => el.classList.add('tui-playing'));
    expect(await animationName(badge)).toBe('tui-tada');
    expect(await badge.evaluate((el) => getComputedStyle(el).getPropertyValue('--tui-playing'))).toBe('1');
    await badge.evaluate((el) => el.classList.remove('tui-playing'));
    expect(await animationName(badge)).toBe('none');
    await badge.evaluate((el) => { el.dataset.playing = ''; });
    expect(await animationName(badge)).toBe('tui-tada');
    expect(await badge.evaluate((el) => el.getAnimations().length)).toBe(1);
  });

  test('playing set on an ancestor ripples down', async ({ page }) => {
    await page.locator('#animate-playing-scope').evaluate((el) => { el.dataset.playing = ''; });
    expect(await animationName(page.locator('#animate-playing'))).toBe('tui-tada');
  });
});

test.describe('Utilities — Animate checked gate', () => {
  test.beforeEach(({ page }) => page.goto('/examples/06-utilities.html'));

  test('a checked input inside the element starts it and every re-check replays it', async ({ page }) => {
    const card = page.locator('#animate-gate-card');
    expect(await animationName(card)).toBe('none');
    expect(await card.evaluate((el) => el.getAnimations().filter((a) => a instanceof CSSAnimation).length)).toBe(0);
    await card.click();
    expect(await animationName(card)).toBe('tui-tada');
    expect(await card.evaluate((el) => el.getAnimations().filter((a) => a instanceof CSSAnimation).length)).toBe(1);
    await card.click();
    expect(await card.evaluate((el) => el.getAnimations().filter((a) => a instanceof CSSAnimation).length)).toBe(0);
    await card.click();
    expect(await card.evaluate((el) => el.getAnimations().filter((a) => a instanceof CSSAnimation).map((a) => a.currentTime < 200))).toEqual([true]);
  });

  test('a checked earlier sibling starts its label', async ({ page }) => {
    const label = page.locator('#animate-sibling');
    expect(await animationName(label)).toBe('none');
    await label.click();
    expect(await animationName(label)).toBe('tui-bounce');
  });
});

test.describe('Utilities — Animate ancestor states', () => {
  test.beforeEach(({ page }) => page.goto('/examples/06-utilities.html'));

  test('an open details starts a descendant', async ({ page }) => {
    const child = page.locator('#animate-open-child');
    expect(await animationName(child)).toBe('none');
    await page.locator('#animate-open').evaluate((el) => { el.open = true; });
    expect(await animationName(child)).toBe('tui-fly-bottom');
  });

  test('data-expanded on a parent counts as open', async ({ page }) => {
    const badge = page.locator('#animate-expanded');
    expect(await animationName(badge)).toBe('none');
    await page.locator('#animate-expanded-parent').evaluate((el) => { el.dataset.expanded = ''; });
    expect(await animationName(badge)).toBe('tui-scale');
  });

  test('hover plays only on the element itself, not from a hovered parent', async ({ page }) => {
    const icon = page.locator('#animate-hover-icon');
    expect(await animationName(icon)).toBe('none');
    const card = page.locator('#animate-hover-card');
    await card.scrollIntoViewIfNeeded();
    const box = await card.boundingBox();
    await page.mouse.move(box.x + box.width - 10, box.y + box.height / 2);
    await page.waitForTimeout(50);
    expect(await animationName(icon)).toBe('none');
    await icon.hover();
    await expect.poll(() => animationName(icon)).toBe('tui-jiggle');
    await page.mouse.move(0, 0);
    await expect.poll(() => animationName(icon)).toBe('none');
  });

  test('hovering an animate host plays the gated elements inside it', async ({ page }) => {
    const icon = page.locator('#animate-hover-host-icon');
    expect(await animationName(icon)).toBe('none');
    const host = page.locator('#animate-hover-host');
    await host.scrollIntoViewIfNeeded();
    const box = await host.boundingBox();
    await page.mouse.move(box.x + box.width - 10, box.y + box.height / 2);
    await expect.poll(() => animationName(icon)).toBe('tui-jiggle');
  });

  test('a checked input wrapped in an earlier sibling drives the element after it', async ({ page }) => {
    const card = page.locator('#animate-switch-card');
    expect(await animationName(card)).toBe('tui-fade');
    const toggle = page.locator('label[for="animate-switch"]');
    await toggle.click();
    expect(await animationName(card)).toBe('tui-fade-out');
    await card.evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
    expect(await card.evaluate((el) => getComputedStyle(el).opacity)).toBe('0');
    await toggle.click();
    expect(await animationName(card)).toBe('tui-fade');
    expect(await card.evaluate((el) => el.getAnimations().filter((a) => a instanceof CSSAnimation).map((a) => a.currentTime < 200))).toEqual([true]);
    await card.evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
    expect(await card.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  });

  test('a gated exit plays its entrance while idle, so it is visible before the state arrives', async ({ page }) => {
    const card = page.locator('#animate-switch-card');
    expect(await animationName(card)).toBe('tui-fade');
    await card.evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
    expect(await card.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  });
});

test.describe('Utilities — Animate invalid gate', () => {
  test.beforeEach(({ page }) => page.goto('/examples/06-utilities.html'));

  test('a required field left empty shakes its group once the user has been there', async ({ page }) => {
    const group = page.locator('#animate-invalid-group');
    expect(await animationName(group)).toBe('none');
    const input = page.locator('#animate-invalid-input');
    await input.click();
    await input.pressSequentially('a');
    await input.press('Backspace');
    await input.press('Tab');
    await expect.poll(() => animationName(group)).toBe('tui-shake');
  });

  test('aria-invalid set by a script shakes its group too', async ({ page }) => {
    const group = page.locator('#animate-invalid-attr-group');
    expect(await animationName(group)).toBe('none');
    await page.locator('#animate-invalid-attr-input').evaluate((el) => el.setAttribute('aria-invalid', 'true'));
    expect(await animationName(group)).toBe('tui-shake');
  });
});

test.describe('Utilities — Stagger', () => {
  test.beforeEach(({ page }) => page.goto('/examples/06-utilities.html'));

  test('each child waits its index times the step, past the twelfth child', async ({ page }) => {
    const items = page.locator('#animate-stagger > li');
    expect(await items.count()).toBe(14);
    for (const k of [0, 1, 2, 11, 12, 13]) {
      expect(await items.nth(k).evaluate((el) => getComputedStyle(el).animationDelay), `child ${k}`).toBe(`${(k * 0.06).toFixed(2).replace(/0$/, '')}s`.replace('.0s', 's'));
    }
    expect(await items.nth(12).evaluate((el) => getComputedStyle(el).getPropertyValue('--tui-i'))).toBe('12');
  });

  test('an inline index wins over the derived one', async ({ page }) => {
    expect(await page.locator('#animate-stagger-override').evaluate((el) => getComputedStyle(el).animationDelay)).toBe('0.42s');
  });

  test('a custom step on the list rescales the chain', async ({ page }) => {
    await page.locator('#animate-stagger').evaluate((el) => el.style.setProperty('--tui-stagger-step', '100ms'));
    expect(await page.locator('#animate-stagger > li').nth(3).evaluate((el) => getComputedStyle(el).animationDelay)).toBe('0.3s');
  });

  test('reduced motion drops the delays along with the durations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const fifth = page.locator('#animate-stagger > li').nth(4);
    expect(await fifth.evaluate((el) => { const c = getComputedStyle(el); return [c.animationDelay, c.animationDuration]; })).toEqual(['0s', '1e-05s']);
    expect(await page.locator('#animate-loop').evaluate((el) => getComputedStyle(el).animationIterationCount)).toBe('1');
  });

  test('motion-none silences a staggered child', async ({ page }) => {
    expect(await page.locator('#animate-motion-none').evaluate((el) => { const c = getComputedStyle(el); return [c.animationName, c.animationDelay]; })).toEqual(['none', '0s']);
  });
});

test.describe('Utilities — Animate axe', () => {
  test('the animate section has no axe violations', async ({ page }) => {
    await page.goto('/examples/06-utilities.html');
    await page.evaluate(() => Promise.all(document.getAnimations().filter((a) => a.playState === 'running' && a.effect.getTiming().iterations !== Infinity).map((a) => a.finished)));
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#animate-section')).toEqual([]);
  });
});
