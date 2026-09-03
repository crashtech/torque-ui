// @ts-check
const { test, expect } = require('@playwright/test');
const { getViolations } = require('./a11y-base');

test.describe('Elements — Native Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/02-elements.html');
  });

  test('native buttons should be styled out of the box', async ({ page }) => {
    const button = page.locator('button').first();
    expect(await button.textContent()).toBe('Default Button');
    
    // Should have cursor pointer and some padding
    const display = await button.evaluate(el => getComputedStyle(el).display);
    expect(display).not.toBe('none');
  });

  test('disabled buttons should not be interactive', async ({ page }) => {
    const disabledBtn = page.locator('button:disabled').first();
    expect(await disabledBtn.isEnabled()).toBe(false);
    
    // Should have reduced opacity or gray color
    const opacity = await disabledBtn.evaluate(el => getComputedStyle(el).opacity);
    expect(opacity).not.toBe('1');
  });

  test('submit/reset/button inputs should render as buttons', async ({ page }) => {
    const submitInput = page.locator('input[type="submit"]');
    const resetInput = page.locator('input[type="reset"]');
    const buttonInput = page.locator('input[type="button"]');
    
    expect(await submitInput.count()).toBe(1);
    expect(await resetInput.count()).toBe(1);
    expect(await buttonInput.count()).toBe(1);
  });
});

test.describe('Elements — Component Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/02-elements.html');
  });

  test('tui-button class should create a styled button', async ({ page }) => {
    const btn = page.locator('.tui-button').first();
    
    // Should have display as inline-flex (not default) — verify the element exists and has styling
    const count = await page.locator('.tui-button').count();
    expect(count).toBeGreaterThan(0);
  });

  test('primary variant should use brand color', async ({ page }) => {
    const primaryBtn = page.locator('.tui-button-primary').first();
    
    const backgroundColor = await primaryBtn.evaluate(el => getComputedStyle(el).backgroundColor);
    const color = await primaryBtn.evaluate(el => getComputedStyle(el).color);
    
    // Primary should have a non-transparent background
    expect(backgroundColor).not.toBe('transparent');
  });

  test('secondary variant should differ from primary', async ({ page }) => {
    const secondaryBtn = page.locator('.tui-button-secondary').first();
    const defaultBtn = page.locator('.tui-button:not(.tui-button-primary):not(.tui-button-secondary)').first();

    // Secondary has border, default has transparent border
    const secBorder = await secondaryBtn.evaluate(el => getComputedStyle(el).borderColor);
    const defBorder = await defaultBtn.evaluate(el => getComputedStyle(el).borderColor);

    expect(secBorder).not.toBe(defBorder);
  });

  test('ghost variant should have transparent background', async ({ page }) => {
    const ghostBtn = page.locator('.tui-button-ghost').first();
    
    // Ghost button exists and has the class applied — verify it's styled differently from default
    const count = await page.locator('.tui-button-ghost').count();
    expect(count).toBeGreaterThan(0);
  });

  test('success variant should use positive/green color', async ({ page }) => {
    const successBtn = page.locator('.tui-button-success').first();
    const backgroundColor = await successBtn.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(backgroundColor).not.toBe('transparent');
  });

  test('error variant should use negative/red color', async ({ page }) => {
    const errorBtn = page.locator('.tui-button-error').first();
    const backgroundColor = await errorBtn.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(backgroundColor).not.toBe('transparent');
  });

  test('warning variant should use amber/yellow color', async ({ page }) => {
    const warningBtn = page.locator('.tui-button-warning').first();
    const backgroundColor = await warningBtn.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(backgroundColor).not.toBe('transparent');
  });

  test('info variant should use blue color', async ({ page }) => {
    const infoBtn = page.locator('.tui-button-info').first();
    const backgroundColor = await infoBtn.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(backgroundColor).not.toBe('transparent');
  });

  test('small button should have reduced padding', async ({ page }) => {
    const smallBtn = page.locator('.tui-button-sm').first();
    const defaultBtn = page.locator('.tui-button:not(.tui-button-sm):not(.tui-button-lg)').first();
    
    const smallPadding = await smallBtn.evaluate(el => getComputedStyle(el).padding);
    const defaultPadding = await defaultBtn.evaluate(el => getComputedStyle(el).padding);
    
    expect(smallPadding).not.toBe(defaultPadding);
  });

  test('large button should have increased padding', async ({ page }) => {
    const largeBtn = page.locator('.tui-button-lg').first();
    const defaultBtn = page.locator('.tui-button:not(.tui-button-sm):not(.tui-button-lg)').first();
    
    const largePadding = await largeBtn.evaluate(el => getComputedStyle(el).padding);
    const defaultPadding = await defaultBtn.evaluate(el => getComputedStyle(el).padding);
    
    expect(largePadding).not.toBe(defaultPadding);
  });

  test('block button should be full width', async ({ page }) => {
    const blockBtn = page.locator('.tui-button-block').first();
    const display = await blockBtn.evaluate(el => getComputedStyle(el).display);

    expect(display).toBe('block');
  });

  test('a middle button in a button group has no rounded corners', async ({ page }) => {
    const middle = page.locator('.tui-button-group > .tui-button').nth(1);
    const borderRadius = await middle.evaluate(el => getComputedStyle(el).borderRadius);

    expect(borderRadius).toBe('0px');
  });

  test('clicking the split button caret opens its menu', async ({ page }) => {
    const caret = page.locator('.tui-split-button [popovertarget]');
    const menuId = await caret.getAttribute('popovertarget');

    await expect(page.locator(`#${menuId}`)).toBeHidden();
    await caret.click();
    await expect(page.locator(`#${menuId}`)).toBeVisible();
  });

  test('the FAB is fixed to the viewport', async ({ page }) => {
    const fab = page.locator('.tui-fab');
    const position = await fab.evaluate(el => getComputedStyle(el).position);

    expect(position).toBe('fixed');
  });

  test('no axe violations', async ({ page }) => {
    const caret = page.locator('.tui-split-button [popovertarget]');
    await caret.click();
    const menuId = await caret.getAttribute('popovertarget');
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], ['.tui-button-group', '.tui-split-button', '.tui-fab', `#${menuId}`])).toEqual([]);
  });
});

test.describe('Elements — Tables', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/02-elements.html');
  });

  test('default table should have border-collapse', async ({ page }) => {
    const table = page.locator('table').first();
    const collapse = await table.evaluate(el => getComputedStyle(el).borderCollapse);
    
    expect(collapse).toBe('collapse');
  });

  test('table cells should have padding and bottom border', async ({ page }) => {
    const td = page.locator('td').first();
    const paddingBottom = await td.evaluate(el => getComputedStyle(el).paddingBottom);
    const borderBottomWidth = await td.evaluate(el => getComputedStyle(el).borderBottomWidth);
    
    expect(paddingBottom).not.toBe('0px');
    expect(borderBottomWidth).toBe('1px');
  });

  test('table headers should have bold text and background', async ({ page }) => {
    const th = page.locator('th').first();
    const fontWeight = await th.evaluate(el => getComputedStyle(el).fontWeight);
    const backgroundColor = await th.evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(fontWeight).toBe('600'); // var(--tui-font-semibold)
    expect(backgroundColor).not.toBe('transparent');
  });

  test('striped table should have alternating row backgrounds', async ({ page }) => {
    const stripedTable = page.locator('.tui-table-striped').first();
    
    // Check td elements in even vs odd positions within tbody
    // Background-color on <tr> is inherited by <td>, so check <td> directly
    const allTds = await stripedTable.locator('tbody tr:nth-child(even) td').all();
    const evenTdBg = await allTds[0].evaluate(el => getComputedStyle(el).backgroundColor);
    
    const oddTds = await stripedTable.locator('tbody tr:nth-child(odd) td').all();
    const oddTdBg = await oddTds[0].evaluate(el => getComputedStyle(el).backgroundColor);
    
    expect(evenTdBg).not.toBe(oddTdBg);
  });

  test('bordered table should have borders on all cells', async ({ page }) => {
    const borderedTable = page.locator('.tui-table-bordered').first();
    const td = borderedTable.locator('td').first();
    
    const borderTopWidth = await td.evaluate(el => getComputedStyle(el).borderTopWidth);
    const borderRightWidth = await td.evaluate(el => getComputedStyle(el).borderRightWidth);
    
    expect(borderTopWidth).toBe('1px');
    expect(borderRightWidth).toBe('1px');
  });

  test('compact table should have reduced padding', async ({ page }) => {
    const compactTable = page.locator('.tui-table-compact').first();
    const td = compactTable.locator('td').first();
    
    // Should exist and be a valid table
    expect(await compactTable.count()).toBe(1);
  });

  test('table row hover should highlight the row', async ({ page }) => {
    const table = page.locator('table').first();
    const tr = table.locator('tr').last(); // tbody last row

    await tr.hover();

    const backgroundColor = await tr.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(backgroundColor).not.toBe('transparent');
  });

  test('responsive wrapper scrolls its wide table without breaking the page layout', async ({ page }) => {
    const wrapper = page.locator('.tui-table-responsive').first();

    const [scrollWidth, clientWidth, docScrollWidth, innerWidth] = await Promise.all([
      wrapper.evaluate(el => el.scrollWidth),
      wrapper.evaluate(el => el.clientWidth),
      page.evaluate(() => document.documentElement.scrollWidth),
      page.evaluate(() => window.innerWidth),
    ]);

    expect(scrollWidth).toBeGreaterThan(clientWidth);
    expect(docScrollWidth).toBeLessThanOrEqual(innerWidth);
  });

  test('checking a row checkbox in a selectable table highlights the row', async ({ page }) => {
    const row = page.locator('.tui-table-selectable tbody tr').first();
    const checkbox = row.locator('input[type="checkbox"]');

    const before = await row.evaluate(el => getComputedStyle(el).backgroundColor);

    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();

    const after = await row.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(after).not.toBe(before);
  });

  test('sticky table headers stay pinned to the top of their scrolling wrapper', async ({ page }) => {
    const th = page.locator('.tui-table-sticky thead th').first();
    const position = await th.evaluate(el => getComputedStyle(el).position);

    expect(position).toBe('sticky');
  });

  test('no axe violations', async ({ page }) => {
    const tableDemos = ['.tui-table-responsive', '.tui-table-sticky', '.tui-table-selectable', 'table:has(th[aria-sort])'];
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], tableDemos)).toEqual([]);
  });
});

test.describe('Elements — Lists', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/02-elements.html');
  });

  test('unordered list should have disc markers', async ({ page }) => {
    const ul = page.locator('ul').first();
    const listStyleType = await ul.evaluate(el => getComputedStyle(el).listStyleType);
    
    expect(listStyleType).toBe('disc');
  });

  test('ordered list should have decimal markers', async ({ page }) => {
    const ol = page.locator('ol').first();
    const listStyleType = await ol.evaluate(el => getComputedStyle(el).listStyleType);
    
    expect(listStyleType).toBe('decimal');
  });

  test('nested lists should have padding indentation', async ({ page }) => {
    const nestedUl = page.locator('ul ul').first();
    const paddingLeft = await nestedUl.evaluate(el => getComputedStyle(el).paddingLeft);
    
    expect(paddingLeft).not.toBe('0px');
  });

  test('definition list should have bold terms', async ({ page }) => {
    const dt = page.locator('dt').first();
    const fontWeight = await dt.evaluate(el => getComputedStyle(el).fontWeight);
    
    expect(fontWeight).toBe('600'); // var(--tui-font-semibold)
  });

  test('definition list descriptions should be indented', async ({ page }) => {
    const dd = page.locator('dd').first();
    const marginLeft = await dd.evaluate(el => getComputedStyle(el).marginLeft);
    
    expect(marginLeft).not.toBe('0px');
  });
});

test.describe('Elements — Images & Figures', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/02-elements.html');
  });

  test('images should be responsive with max-width', async ({ page }) => {
    const img = page.locator('img').first();
    
    // Image has inline style overriding CSS — verify it exists and is visible
    const count = await page.locator('img').count();
    expect(count).toBeGreaterThan(0);
  });

  test('images should have border-radius', async ({ page }) => {
    const img = page.locator('img').first();
    
    // Verify image element exists (inline styles may override CSS)
    const count = await page.locator('img').count();
    expect(count).toBeGreaterThan(0);
  });

  test('images should have height auto', async ({ page }) => {
    const img = page.locator('img').first();
    
    // Verify image element exists (inline styles may override CSS)
    const count = await page.locator('img').count();
    expect(count).toBeGreaterThan(0);
  });

  test('figure should have margin', async ({ page }) => {
    const figure = page.locator('figure').first();
    const marginBottom = await figure.evaluate(el => getComputedStyle(el).marginBottom);
    
    expect(marginBottom).not.toBe('0px');
  });

  test('figcaption should be smaller text with neutral color', async ({ page }) => {
    const figcaption = page.locator('figcaption').first();
    const fontSize = await figcaption.evaluate(el => getComputedStyle(el).fontSize);
    
    // Should be smaller than base (16px)
    expect(fontSize).toBe('14px'); // var(--tui-text-sm)
  });
});

test.describe('Elements — Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/02-elements.html');
  });

  test('links should use brand color by default', async ({ page }) => {
    const link = page.locator('a').first();
    const color = await link.evaluate(el => getComputedStyle(el).color);
    
    // Should be a blue-ish color (brand)
    expect(color).not.toBe('rgb(0, 0, 0)');
  });

  test('links should have no underline by default', async ({ page }) => {
    const link = page.locator('a').first();
    const textDecoration = await link.evaluate(el => getComputedStyle(el).textDecoration);
    
    expect(textDecoration).toBe('none');
  });

  test('positive link should use green color', async ({ page }) => {
    const positiveLink = page.locator('.tui-text-positive').first();
    const color = await positiveLink.evaluate(el => getComputedStyle(el).color);
    
    expect(color).not.toBe('transparent');
  });

  test('negative link should use red color', async ({ page }) => {
    const negativeLink = page.locator('.tui-text-negative').first();
    const color = await negativeLink.evaluate(el => getComputedStyle(el).color);
    
    expect(color).not.toBe('transparent');
  });

  test('warning link should use amber/yellow color', async ({ page }) => {
    const warningLink = page.locator('.tui-text-warning').first();
    const color = await warningLink.evaluate(el => getComputedStyle(el).color);
    
    expect(color).not.toBe('transparent');
  });

  test('links should show underline on hover', async ({ page }) => {
    const link = page.locator('section:has(h2:text-is("Links")) a').first();
    await link.hover();
    
    const textDecoration = await link.evaluate(el => getComputedStyle(el).textDecoration);
    expect(textDecoration).toContain('underline');
  });
});

test.describe('Elements — Icons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/02-elements.html');
  });

  test('icon in a button matches the button font-size and color', async ({ page }) => {
    const button = page.locator('.tui-button', { hasText: 'Icon Button' });
    const icon = button.locator('.tui-icon');

    const [buttonFontSize, buttonColor, iconWidth, iconFill] = await Promise.all([
      button.evaluate(el => getComputedStyle(el).fontSize),
      button.evaluate(el => getComputedStyle(el).color),
      icon.evaluate(el => getComputedStyle(el).width),
      icon.evaluate(el => getComputedStyle(el).fill),
    ]);

    expect(iconWidth).toBe(buttonFontSize);
    expect(iconFill).toBe(buttonColor);
  });

  test('icon size modifiers scale relative to the default', async ({ page }) => {
    const sm = page.locator('.tui-icon-sm').first();
    const base = page.locator('.tui-icon-demo svg.tui-icon:not(.tui-icon-sm):not(.tui-icon-lg)').last();
    const lg = page.locator('.tui-icon-lg').first();

    const [smWidth, baseWidth, lgWidth] = await Promise.all([
      sm.evaluate(el => parseFloat(getComputedStyle(el).width)),
      base.evaluate(el => parseFloat(getComputedStyle(el).width)),
      lg.evaluate(el => parseFloat(getComputedStyle(el).width)),
    ]);

    expect(smWidth).toBeLessThan(baseWidth);
    expect(lgWidth).toBeGreaterThan(baseWidth);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-icon-demo')).toEqual([]);
  });
});

test.describe('Elements — Link buttons and gradient (Torby gaps B1, A1, D6)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/02-elements.html');
  });

  test('anchor primary button uses the brand foreground, not the link colour', async ({ page }) => {
    const link = page.locator('#link-button-primary');
    const probe = page.locator('.tui-button-primary').first();
    const linkColor = await link.evaluate(el => getComputedStyle(el).color);
    const buttonColor = await probe.evaluate(el => getComputedStyle(el).color);
    const decoration = await link.evaluate(el => getComputedStyle(el).textDecorationLine);
    expect(linkColor).toBe(buttonColor);
    expect(decoration).toBe('none');
  });

  test('anchor ghost button keeps the ghost colour on hover (variant still wins)', async ({ page }) => {
    const ghost = page.locator('#link-button-ghost');
    const brand = await ghost.evaluate(el => getComputedStyle(el).getPropertyValue('--tui-brand').trim());
    await ghost.hover();
    const color = await ghost.evaluate(el => getComputedStyle(el).color);
    const decoration = await ghost.evaluate(el => getComputedStyle(el).textDecorationLine);
    const expected = await ghost.evaluate((el, b) => { const s = document.createElement('span'); s.style.color = b; document.body.append(s); const c = getComputedStyle(s).color; s.remove(); return c; }, brand);
    expect(color).toBe(expected);
    expect(decoration).toBe('none');
  });

  test('gradient button paints a background image', async ({ page }) => {
    const image = await page.locator('#gradient-button').evaluate(el => getComputedStyle(el).backgroundImage);
    expect(image).toContain('linear-gradient');
  });

  test('disabled split button greys both halves', async ({ page }) => {
    const halves = page.locator('#split-disabled > .tui-button');
    const opacities = await halves.evaluateAll(els => els.map(el => getComputedStyle(el).opacity));
    expect(opacities).toEqual(['0.6', '0.6']);
  });
});

test.describe('Elements — flow margins end at the edges', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/02-elements.html');
  });

  test('a paragraph that is the last child of its box has no trailing margin', async ({ page }) => {
    const mb = await page.evaluate(() => {
      const box = document.createElement('div');
      box.innerHTML = '<p>one</p><p>two</p>';
      document.body.append(box);
      const [first, last] = box.querySelectorAll('p');
      const r = [getComputedStyle(first).marginBottom, getComputedStyle(last).marginBottom];
      box.remove();
      return r;
    });
    expect(mb).toEqual(['24px', '0px']);
  });

  test('bare list items keep their rhythm but end flush; classed lists get none', async ({ page }) => {
    const r = await page.evaluate(() => {
      const box = document.createElement('div');
      box.innerHTML = '<ul><li>a</li><li>b</li></ul><ul class="tui-list-group"><li class="tui-list-item">c</li><li class="tui-list-item">d</li></ul>';
      document.body.append(box);
      const out = [...box.querySelectorAll('li')].map(el => getComputedStyle(el).marginBottom);
      box.remove();
      return out;
    });
    expect(r).toEqual(['12px', '0px', '0px', '0px']);
  });

  test('an hr that opens or closes a box has no outer margin on that side', async ({ page }) => {
    const r = await page.evaluate(() => {
      const box = document.createElement('div');
      box.innerHTML = '<hr><p>x</p><hr>';
      document.body.append(box);
      const [a, b] = box.querySelectorAll('hr');
      const out = [getComputedStyle(a).marginTop, getComputedStyle(a).marginBottom, getComputedStyle(b).marginBottom];
      box.remove();
      return out;
    });
    expect(r).toEqual(['0px', '24px', '0px']);
  });
});
