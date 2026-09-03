// @ts-check
const { test, expect } = require('@playwright/test');
const { getViolations } = require('./a11y-base');

test.describe('Patterns — App shell', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('at a wide viewport the sidebar sits beside a main that starts at its edge', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    const sidebar = page.locator('.tui-shell-sidebar').first();
    const main = page.locator('.tui-shell-main').first();
    await expect(sidebar).toBeVisible();
    const sidebarBox = await sidebar.boundingBox();
    const mainBox = await main.boundingBox();
    expect(mainBox.x).toBeGreaterThanOrEqual(sidebarBox.x + sidebarBox.width);
  });

  test('at a narrow viewport the sidebar is hidden and main spans the full shell width', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    const shell = page.locator('.tui-shell').first();
    const sidebar = page.locator('.tui-shell-sidebar').first();
    const main = page.locator('.tui-shell-main').first();
    await expect(sidebar).toBeHidden();
    const shellBox = await shell.boundingBox();
    const mainBox = await main.boundingBox();
    expect(Math.abs(mainBox.width - shellBox.width)).toBeLessThan(2);
  });

  test('the header toggle opens the offcanvas navigation drawer', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.locator('#shell-nav')).toBeVisible();
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-shell')).toEqual([]);
  });
});

test.describe('Patterns — Hero', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('the lead paragraph is width-capped rather than running full width', async ({ page }) => {
    const lead = page.locator('.tui-hero-lead').first();
    const maxWidth = await lead.evaluate(el => getComputedStyle(el).maxWidth);
    expect(maxWidth).not.toBe('none');
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-hero')).toEqual([]);
  });
});

test.describe('Patterns — Section', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('padding-block adds visible vertical space around the section content', async ({ page }) => {
    const section = page.locator('.tui-section').first();
    const paddingTop = await section.evaluate(el => getComputedStyle(el).paddingTop);
    const paddingBottom = await section.evaluate(el => getComputedStyle(el).paddingBottom);
    expect(paddingTop).not.toBe('0px');
    expect(paddingBottom).not.toBe('0px');
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-section')).toEqual([]);
  });
});

test.describe('Patterns — Media object', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('the body column sits to the right of the figure', async ({ page }) => {
    const figure = page.locator('.tui-media > :first-child').first();
    const body = page.locator('.tui-media-body').first();
    const figureBox = await figure.boundingBox();
    const bodyBox = await body.boundingBox();
    expect(bodyBox.x).toBeGreaterThan(figureBox.x);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-media')).toEqual([]);
  });
});

test.describe('Patterns — Level', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('the end group is pushed to the level\'s right edge', async ({ page }) => {
    const level = page.locator('.tui-level').first();
    const end = page.locator('.tui-level-end').first();
    const levelBox = await level.boundingBox();
    const endBox = await end.boundingBox();
    const inset = await level.evaluate(el => {
      const cs = getComputedStyle(el);
      return parseFloat(cs.paddingRight) + parseFloat(cs.borderRightWidth);
    });
    const innerRightEdge = levelBox.x + levelBox.width - inset;
    expect(Math.abs((endBox.x + endBox.width) - innerRightEdge)).toBeLessThan(1);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-level')).toEqual([]);
  });
});

test.describe('Patterns — Compositions', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('the pricing table, comment thread, and testimonial compositions are present', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Compositions' });
    await expect(heading).toBeVisible();

    const pricingCards = page.locator('.tui-grid .tui-card');
    await expect(pricingCards).toHaveCount(3);

    const commentThread = page.locator('.tui-media:has(.tui-media .tui-avatar-sm)');
    await expect(commentThread).toBeVisible();

    const testimonial = page.locator('.tui-card:has(> .tui-card-body > p[style*="italic"])');
    await expect(testimonial).toBeVisible();
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#compositions')).toEqual([]);
  });
});

test.describe('Patterns — Split pane', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('the first pane is natively resizable', async ({ page }) => {
    const firstPane = page.locator('#split .tui-split-pane').first();
    const resize = await firstPane.evaluate(el => getComputedStyle(el).resize);
    const overflow = await firstPane.evaluate(el => getComputedStyle(el).overflowY);
    expect(resize).toBe('horizontal');
    expect(overflow).toBe('auto');
  });

  test('dragging the resize corner widens the first pane', async ({ page }) => {
    const firstPane = page.locator('#split .tui-split-pane').first();
    await firstPane.scrollIntoViewIfNeeded();
    const before = await firstPane.boundingBox();
    const handleX = before.x + before.width - 2;
    const handleY = before.y + before.height - 2;

    await page.mouse.move(handleX, handleY);
    await page.mouse.down();
    await page.mouse.move(handleX + 100, handleY, { steps: 10 });
    await page.mouse.up();

    const after = await firstPane.boundingBox();
    expect(after.width).toBeGreaterThan(before.width);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#split')).toEqual([]);
  });
});

test.describe('Patterns — Scroll-driven utilities', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/08-patterns.html');
    test.skip(!(await page.evaluate(() => CSS.supports('animation-timeline', 'scroll()'))));
  });

  test('the reading progress bar grows from 0 at the top to 1 at the bottom', async ({ page }) => {
    const bar = page.locator('.tui-reading-progress');
    const readScale = () => bar.evaluate(el => getComputedStyle(el).scale);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(readScale).toMatch(/^0(\s1)?$/);

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(readScale).toMatch(/^1(\s1)?$/);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-shell-header')).toEqual([]);
  });
});

test.describe('Patterns — Wizard', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('Next advances to the second panel and lights the second step', async ({ page }) => {
    const wizard = page.locator('#wizard .tui-wizard');
    const firstPanel = wizard.locator('.tui-wizard-step').nth(0);
    const secondPanel = wizard.locator('.tui-wizard-step').nth(1);
    const secondStepNumber = wizard.locator('.tui-step').nth(1).locator('.tui-step-number');

    await expect(firstPanel).toBeVisible();
    await expect(secondPanel).toBeHidden();
    const before = await secondStepNumber.evaluate(el => getComputedStyle(el).backgroundColor);

    await firstPanel.getByText('Next').click();

    await expect(secondPanel).toBeVisible();
    await expect(firstPanel).toBeHidden();
    const after = await secondStepNumber.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(after).not.toBe(before);
  });

  test('Back returns to the first panel', async ({ page }) => {
    const wizard = page.locator('#wizard .tui-wizard');
    const firstPanel = wizard.locator('.tui-wizard-step').nth(0);
    const secondPanel = wizard.locator('.tui-wizard-step').nth(1);

    await firstPanel.getByText('Next').click();
    await expect(secondPanel).toBeVisible();

    await secondPanel.getByText('Back').click();
    await expect(firstPanel).toBeVisible();
    await expect(secondPanel).toBeHidden();
  });

  test('lit step number text uses --tui-brand-fg for contrast on the brand fill', async ({ page }) => {
    const wizard = page.locator('#wizard .tui-wizard');
    const litStepNumber = wizard.locator('.tui-step').nth(0).locator('.tui-step-number');
    const stepNumberColor = await litStepNumber.evaluate((el) => getComputedStyle(el).color);
    const brandFgColor = await page.evaluate(() => {
      const probe = document.createElement('div');
      probe.style.color = 'var(--tui-brand-fg)';
      document.body.appendChild(probe);
      const color = getComputedStyle(probe).color;
      probe.remove();
      return color;
    });
    expect(stepNumberColor).toBe(brandFgColor);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#wizard')).toEqual([]);
  });
});

test.describe('Patterns — App shell aside', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('with an aside the shell lays out three columns and the aside is 18rem on the end side', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const shell = page.locator('#shell-aside .tui-shell');
    const sidebar = shell.locator('> .tui-shell-sidebar');
    const main = shell.locator('> .tui-shell-main');
    const aside = shell.locator('> .tui-shell-aside');
    await expect(aside).toBeVisible();
    const columns = await shell.evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(3);
    const [sidebarBox, mainBox, asideBox] = await Promise.all([sidebar.boundingBox(), main.boundingBox(), aside.boundingBox()]);
    expect(Math.round(asideBox.width)).toBe(288);
    expect(mainBox.x).toBeGreaterThanOrEqual(sidebarBox.x + sidebarBox.width);
    expect(asideBox.x).toBeGreaterThanOrEqual(mainBox.x + mainBox.width);
  });

  test('a shell without an aside keeps two columns', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const columns = await page.locator('.tui-shell').first().evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(2);
  });

  test('the aside hides below 768px like the sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 800 });
    await expect(page.locator('#shell-aside .tui-shell-aside')).toBeHidden();
  });

  test('--tui-shell-min-block-size overrides the 100dvh default', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const minHeight = await page.locator('#shell-persistent .tui-shell').evaluate(el => getComputedStyle(el).minHeight);
    expect(minHeight).toBe('400px');
  });

  test('.tui-shell-persistent keeps sidebar and aside visible at a narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 800 });
    const shell = page.locator('#shell-persistent .tui-shell');
    await expect(shell.locator('> .tui-shell-sidebar')).toBeVisible();
    await expect(shell.locator('> .tui-shell-aside')).toBeVisible();
    const columns = await shell.evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(3);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#shell-aside')).toEqual([]);
  });
});

test.describe('Patterns — App shell column scrolling', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  const scrollBox = page => page.locator('#shell-columns > div');
  const scrollTo = (box, y) => box.evaluate((el, top) => { el.scrollTop = top; }, y);
  const edges = async (locator, box) => {
    const item = await locator.boundingBox();
    const frame = await box.evaluate(el => { const r = el.getBoundingClientRect(); return { top: r.top + el.clientTop, bottom: r.top + el.clientTop + el.clientHeight }; });
    return { top: item.y - frame.top, bottom: item.y + item.height - frame.bottom };
  };

  test('a column taller than the shell scrolls with the page, parks at its end and never scrolls on its own', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const box = scrollBox(page);
    const aside = box.locator('.tui-shell-aside');
    const header = box.locator('.tui-shell-header');
    expect(await aside.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(false);
    const headerHeight = (await header.boundingBox()).height;
    expect(Math.round((await edges(aside, box)).top)).toBe(Math.round(headerHeight));

    await scrollTo(box, 200);
    expect(Math.round((await edges(aside, box)).top)).toBe(Math.round(headerHeight - 200));

    await scrollTo(box, 2000);
    expect(Math.round((await edges(aside, box)).bottom)).toBe(0);
  });

  test('a shorter main grows its row to the taller column instead of clipping it', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const box = scrollBox(page);
    await box.locator('.tui-shell-main p').evaluate(el => { el.style.blockSize = '1rem'; });
    const [aside, main] = await Promise.all([box.locator('.tui-shell-aside').boundingBox(), box.locator('.tui-shell-main').boundingBox()]);
    expect(Math.round(main.height)).toBe(Math.round(aside.height));
  });

  test('.tui-shell-scroll keeps a column under the header and scrolls it on its own', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const box = scrollBox(page);
    const sidebar = box.locator('.tui-shell-sidebar');
    expect(await sidebar.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
    const headerHeight = (await box.locator('.tui-shell-header').boundingBox()).height;
    await scrollTo(box, 900);
    expect(Math.round((await edges(sidebar, box)).top)).toBe(Math.round(headerHeight));
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#shell-columns')).toEqual([]);
  });
});

test.describe('Patterns — Level variants', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('.tui-level-nowrap computes flex-wrap: nowrap', async ({ page }) => {
    const wrap = await page.locator('.tui-level-nowrap').first().evaluate(el => getComputedStyle(el).flexWrap);
    expect(wrap).toBe('nowrap');
  });

  test('optional items hide in a 500px collapsible level and show in an 800px one', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.locator('#level-narrow .tui-level-optional')).toBeHidden();
    await expect(page.locator('#level-wide .tui-level-optional')).toBeVisible();
  });
});

test.describe('Patterns — Page header', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('the title is 24px and the actions sit at the end edge', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const header = page.locator('#page-header .tui-page-header');
    const title = header.locator('.tui-page-header-title');
    const actions = header.locator('.tui-page-header-actions');
    expect(await title.evaluate(el => getComputedStyle(el).fontSize)).toBe('24px');
    const headerBox = await header.boundingBox();
    const actionsBox = await actions.boundingBox();
    expect(Math.abs((actionsBox.x + actionsBox.width) - (headerBox.x + headerBox.width))).toBeLessThan(2);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#page-header')).toEqual([]);
  });
});

test.describe('Patterns — Board', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('columns are 256px wide and the board scrolls horizontally', async ({ page }) => {
    const board = page.locator('#board .tui-board');
    const column = board.locator('.tui-board-column').first();
    expect(await board.evaluate(el => getComputedStyle(el).overflowX)).toBe('auto');
    expect(Math.round((await column.boundingBox()).width)).toBe(256);
  });

  test('the column header is sticky', async ({ page }) => {
    const position = await page.locator('#board .tui-board-header').first().evaluate(el => getComputedStyle(el).position);
    expect(position).toBe('sticky');
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#board')).toEqual([]);
  });
});

test.describe('Patterns — Sheet', () => {
  test.beforeEach(({ page }) => page.goto('/examples/08-patterns.html'));

  test('the popovertarget button opens the sheet centred horizontally', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.getByRole('button', { name: 'Open search' }).click();
    const sheet = page.locator('#search-sheet');
    await expect(sheet).toBeVisible();
    expect(await sheet.evaluate(el => el.matches(':popover-open'))).toBe(true);
    const box = await sheet.boundingBox();
    expect(Math.abs((box.x + box.width / 2) - 640)).toBeLessThan(2);
  });

  test('Escape closes the sheet', async ({ page }) => {
    await page.getByRole('button', { name: 'Open search' }).click();
    await page.keyboard.press('Escape');
    await expect(page.locator('#search-sheet')).toBeHidden();
  });
});
