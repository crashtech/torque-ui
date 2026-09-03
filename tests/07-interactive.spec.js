// @ts-check
const { test, expect } = require('@playwright/test');
const { getViolations } = require('./a11y-base');

test.describe('Interactive — State input mechanism', () => {
  test('state input is focusable and paints the ring on its label', async ({ page }) => {
    await page.goto('/examples/index.html');
    await page.setContent(`<link rel="stylesheet" href="/src/tui.css"><input class="tui-state-input" type="checkbox" id="x"><label for="x">L</label>`);
    await page.keyboard.press('Tab');
    await expect(page.locator('#x')).toBeFocused();
    await expect(page.locator('label')).toHaveCSS('outline-style', 'solid');
  });
});

test.describe('Interactive — Tabs', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('clicking a tab shows its panel and hides the others', async ({ page }) => {
    await page.locator('label[for=billing-history]').click();
    await expect(page.locator('.tui-tabs').first().locator('.tui-tab-panel').nth(1)).toBeVisible();
    await expect(page.locator('.tui-tabs').first().locator('.tui-tab-panel').nth(0)).toBeHidden();
  });

  test('two tab sets on one page are independent', async ({ page }) => {
    await page.locator('label[for=settings-security]').click();
    await expect(page.locator('.tui-tabs').nth(1).locator('.tui-tab-panel').nth(1)).toBeVisible();
    await expect(page.locator('.tui-tabs').first().locator('.tui-tab-panel').nth(0)).toBeVisible();
  });

  test('arrow keys move between tabs and the ring is on the label', async ({ page }) => {
    await page.locator('#billing-plan').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#billing-history')).toBeFocused();
    await expect(page.locator('label[for=billing-history]')).toHaveCSS('outline-style', 'solid');
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-tabs')).toEqual([]);
  });
});

test.describe('Interactive — Collapse & Accordion', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('clicking the second summary opens its body and closes the first (exclusive via name)', async ({ page }) => {
    const details = page.locator('.tui-accordion > .tui-collapse');
    await details.nth(1).locator('.tui-collapse-summary').click();
    await expect(details.nth(1).locator('.tui-collapse-body')).toBeVisible();
    await expect(details.nth(0)).not.toHaveAttribute('open');
  });

  test('tab reaches a summary', async ({ page }) => {
    await page.locator('#settings-profile').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('.tui-accordion .tui-collapse-summary').first()).toBeFocused();
  });

  test('standalone collapse opens independently without affecting the accordion', async ({ page }) => {
    const standalone = page.locator('.tui-card-body > details.tui-collapse');
    await standalone.locator('.tui-collapse-summary').click();
    await expect(standalone.locator('.tui-collapse-body')).toBeVisible();
    await expect(page.locator('.tui-accordion > .tui-collapse').first()).toHaveAttribute('open');
  });

  test('opening the last accordion item rounds its body to match the wrapper corner', async ({ page }) => {
    const details = page.locator('.tui-accordion > .tui-collapse');
    await details.last().locator('.tui-collapse-summary').click();
    const radius = await details.last().locator('.tui-collapse-body').evaluate(el => getComputedStyle(el).borderBottomLeftRadius);
    expect(radius).not.toBe('0px');
    await expect(details.first()).not.toHaveAttribute('open');
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-accordion')).toEqual([]);
  });
});

test.describe('Interactive — Menu', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('clicking the trigger opens the menu', async ({ page }) => {
    await page.locator('button[popovertarget="user-menu"]').click();
    await expect(page.locator('#user-menu')).toBeVisible();
  });

  test('Escape closes the open menu', async ({ page }) => {
    await page.locator('button[popovertarget="user-menu"]').click();
    await expect(page.locator('#user-menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#user-menu')).toBeHidden();
  });

  test('clicking far away on the body light-dismisses the menu', async ({ page }) => {
    await page.locator('button[popovertarget="user-menu"]').click();
    await expect(page.locator('#user-menu')).toBeVisible();
    await page.locator('body').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('#user-menu')).toBeHidden();
  });

  test('Tab from the open trigger focuses the first menu item', async ({ page }) => {
    const trigger = page.locator('button[popovertarget="user-menu"]');
    await trigger.click();
    await expect(page.locator('#user-menu')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.locator('#user-menu .tui-menu-item').first()).toBeFocused();
  });

  test('no axe violations', async ({ page }) => {
    await page.locator('button[popovertarget="user-menu"]').click();
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#user-menu')).toEqual([]);
  });
});

test.describe('Interactive — Popover', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('clicking the trigger opens the rich popover', async ({ page }) => {
    await page.locator('button[popovertarget="help-1"]').click();
    await expect(page.locator('#help-1')).toBeVisible();
  });

  test('no axe violations', async ({ page }) => {
    await page.locator('button[popovertarget="help-1"]').click();
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#help-1')).toEqual([]);
  });
});

test.describe('Interactive — Tooltip', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('hovering the trigger shows its tooltip', async ({ page }) => {
    const tooltip = page.locator('#tip-save');
    await expect(tooltip).toBeHidden();
    await page.locator('[aria-describedby="tip-save"]').hover();
    await expect(tooltip).toBeVisible();
  });

  test('reaching the trigger via keyboard shows the tooltip, and tabbing away hides it', async ({ page }) => {
    const trigger = page.locator('[aria-describedby="tip-save"]');
    const tooltip = page.locator('#tip-save');
    await page.locator('button[popovertarget="user-menu"]').focus();
    await page.keyboard.press('Tab');
    await expect(trigger).toBeFocused();
    await expect(tooltip).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(tooltip).toBeHidden();
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-tooltip-host')).toEqual([]);
  });
});

test.describe('Interactive — Carousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/07-interactive.html');
  });

  // why: the dot link is display:none whenever the browser natively supports
  // ::scroll-marker (true for the bundled Chromium 151), so a real Playwright
  // .click() would fail the visibility check; el.click() still fires the
  // anchor's default navigation behaviour (sets :target) on both paths.
  test('clicking the "Slide 2" dot link scrolls hero-2 into view', async ({ page }) => {
    const dot2 = page.locator('.tui-carousel-dot[href="#hero-2"]');
    await dot2.evaluate(el => el.click());
    await expect(page.locator('#hero-2')).toBeInViewport({ ratio: 0.9 });
  });

  test('activating slide 2 marks its dot active via :target', async ({ page }) => {
    const dot1 = page.locator('.tui-carousel-dot[href="#hero-1"]');
    const dot2 = page.locator('.tui-carousel-dot[href="#hero-2"]');
    await dot2.evaluate(el => el.click());

    // getComputedStyle resolves specified values (scale, background-color)
    // regardless of display:none, so this assertion holds whether the
    // fallback dots are visible or hidden behind native scroll markers.
    await expect(dot2).toHaveCSS('scale', '1.2');
    const dot1Bg = await dot1.evaluate(el => getComputedStyle(el).backgroundColor);
    const dot2Bg = await dot2.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(dot2Bg).not.toBe(dot1Bg);
  });

  test('first slide is active by default, no navigation yet', async ({ page }) => {
    const dot1 = page.locator('.tui-carousel-dot[href="#hero-1"]');
    await expect(dot1).toHaveCSS('scale', '1.2');
  });

  test('fallback dots are hidden when the browser supports native scroll markers', async ({ page }) => {
    const nativeSupport = await page.evaluate(() => CSS.supports('selector(::scroll-marker)'));
    const dotsDisplay = await page.locator('.tui-carousel-dots').first().evaluate(el => getComputedStyle(el).display);
    expect(dotsDisplay).toBe(nativeSupport ? 'none' : 'flex');
  });

  test('carousel track scroll-snaps and hides its scrollbar', async ({ page }) => {
    const track = page.locator('.tui-carousel-track').first();
    await expect(track).toHaveCSS('scroll-snap-type', 'x mandatory');
    await expect(track).toHaveCSS('scrollbar-width', 'none');
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-carousel')).toEqual([]);
  });
});

test.describe('Interactive — Rating', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('clicking a star checks its input', async ({ page }) => {
    await page.locator('label[for=rate-3]').click();
    await expect(page.locator('#rate-3')).toBeChecked();
  });

  test('checking star 3 colors star 1 and star 3 the same, and differently from star 5', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('label[for=rate-3]').click();
    const color1 = await page.locator('label[for=rate-1]').evaluate(el => getComputedStyle(el).color);
    const color3 = await page.locator('label[for=rate-3]').evaluate(el => getComputedStyle(el).color);
    const color5 = await page.locator('label[for=rate-5]').evaluate(el => getComputedStyle(el).color);
    expect(color1).toBe(color3);
    expect(color3).not.toBe(color5);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-rating')).toEqual([]);
  });
});

test.describe('Interactive — Toggle Group', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('clicking a toggle checks its input', async ({ page }) => {
    await page.locator('label[for=fmt-b]').click();
    await expect(page.locator('#fmt-b')).toBeChecked();
  });

  test('tab moves focus to the next toggle and the ring is on its label', async ({ page }) => {
    await page.locator('#fmt-b').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#fmt-i')).toBeFocused();
    await expect(page.locator('label[for=fmt-i]')).toHaveCSS('outline-style', 'solid');
  });

  test('selecting a radio toggle unchecks the previously selected one', async ({ page }) => {
    await page.locator('label[for=align-right]').click();
    await expect(page.locator('#align-right')).toBeChecked();
    await expect(page.locator('#align-left')).not.toBeChecked();
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-toggle-group')).toEqual([]);
  });
});

test.describe('Interactive — Modal', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('clicking the trigger opens the modal', async ({ page }) => {
    await page.locator('button[commandfor="confirm-delete"]').click();
    await expect(page.locator('#confirm-delete')).toBeVisible();
  });

  test('the close button is focused when the modal opens', async ({ page }) => {
    await page.locator('button[commandfor="confirm-delete"]').click();
    await expect(page.locator('#confirm-delete .tui-close')).toBeFocused();
  });

  test('Tab cycles focus without ever landing on a focusable element outside the dialog', async ({ page }) => {
    // why: native <dialog> focus-trapping intentionally lets Tab reach browser UI
    // (the omnibox) once per cycle so a page can never fully imprison the keyboard;
    // headless Chromium has no omnibox, so that one hop lands on <body> instead —
    // <body> isn't a focusable/interactive element, so this still proves the trap holds.
    await page.locator('button[commandfor="confirm-delete"]').click();
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      const escaped = await page.evaluate(() => {
        const el = document.activeElement;
        if (el === document.body) return false;
        if (el.closest('dialog') !== null) return false;
        /* why: Chromium 151 focuses scroll-marker-group hosts through modal inertness */
        if (CSS.supports('selector(::scroll-marker)') && getComputedStyle(el).scrollMarkerGroup !== 'none') return false;
        return true;
      });
      expect(escaped).toBe(false);
    }
  });

  test('clicking Cancel closes the modal', async ({ page }) => {
    await page.locator('button[commandfor="confirm-delete"]').click();
    await expect(page.locator('#confirm-delete')).toBeVisible();
    await page.locator('#confirm-delete .tui-modal-footer button:has-text("Cancel")').click();
    await expect(page.locator('#confirm-delete')).toBeHidden();
  });

  test('Escape closes the modal', async ({ page }) => {
    await page.locator('button[commandfor="confirm-delete"]').click();
    await expect(page.locator('#confirm-delete')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#confirm-delete')).toBeHidden();
  });

  test('no axe violations', async ({ page }) => {
    await page.locator('button[commandfor="confirm-delete"]').click();
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#confirm-delete')).toEqual([]);
  });
});

test.describe('Interactive — Offcanvas', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('clicking the trigger opens the drawer', async ({ page }) => {
    await page.getByRole('button', { name: 'Filters' }).click();
    await expect(page.locator('#filters')).toBeVisible();
  });

  test('clicking the backdrop far from the drawer light-dismisses it', async ({ page }) => {
    await page.getByRole('button', { name: 'Filters' }).click();
    await expect(page.locator('#filters')).toBeVisible();
    await page.locator('body').click({ position: { x: 1000, y: 400 } });
    await expect(page.locator('#filters')).toBeHidden();
  });

  test('Escape closes the drawer', async ({ page }) => {
    await page.getByRole('button', { name: 'Filters' }).click();
    await expect(page.locator('#filters')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#filters')).toBeHidden();
  });

  test('no axe violations', async ({ page }) => {
    await page.getByRole('button', { name: 'Filters' }).click();
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#filters')).toEqual([]);
  });
});

test.describe('Themes — toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/dark-mode.html');
  });

  test('checking the toggle switches .tui-page to the dark color scheme', async ({ page }) => {
    await page.locator('.tui-theme-toggle-label').click();
    await expect(page.locator('#theme-toggle')).toBeChecked();
    await expect(page.locator('.tui-page')).toHaveCSS('color-scheme', 'dark');
    const bg = await page.locator('.tui-page').evaluate(e => getComputedStyle(e).backgroundColor);
    expect(bg).not.toBe('rgb(255, 255, 255)');
  });
});

test.describe('Interactive — Tab slots and link tabs', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('.tui-tabs-end sits at the inline end and shrinks the filler', async ({ page }) => {
    const tabs = page.locator('#tabs-end-demo');
    const [tabsBox, endBox] = await Promise.all([
      tabs.evaluate(el => el.getBoundingClientRect().right),
      tabs.locator('.tui-tabs-end').evaluate(el => el.getBoundingClientRect().right),
    ]);
    expect(Math.abs(tabsBox - endBox)).toBeLessThanOrEqual(1);
    const filler = await tabs.evaluate(el => parseFloat(getComputedStyle(el, '::after').flexBasis));
    expect(filler).toBeLessThanOrEqual(8);
  });

  test('a link tab with aria-current renders as active', async ({ page }) => {
    const brand = await page.evaluate(() => {
      const probe = document.createElement('div');
      probe.style.color = 'var(--tui-brand)';
      document.body.append(probe);
      const color = getComputedStyle(probe).color;
      probe.remove();
      return color;
    });
    const active = page.locator('#tabs-end-demo a[aria-current="page"]');
    await expect(active).toHaveCSS('color', brand);
    await expect(active).toHaveCSS('border-bottom-color', brand);
    await expect(active).toHaveCSS('text-decoration-line', 'none');
  });

  test('.tui-tabs-sticky pins the tabs', async ({ page }) => {
    await expect(page.locator('#tabs-end-demo > .tui-tab').first()).toHaveCSS('position', 'sticky');
  });
});

test.describe('Interactive — Toggle variants', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  const resolve = (page, cssVar) => page.evaluate(v => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = `var(${v})`;
    document.body.append(probe);
    const color = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return color;
  }, cssVar);

  test('a checked .tui-toggle-success takes the positive colour', async ({ page }) => {
    await expect(page.locator('label[for=sync-on]')).toHaveCSS('background-color', await resolve(page, '--tui-positive'));
  });

  test('a checked .tui-toggle-neutral takes surface-3', async ({ page }) => {
    await page.locator('label[for=sync-wait]').click();
    await expect(page.locator('label[for=sync-wait]')).toHaveCSS('background-color', await resolve(page, '--tui-surface-3'));
  });

  test('.tui-toggle-group-sm shrinks the options', async ({ page }) => {
    await expect(page.locator('#sync-states .tui-toggle').first()).toHaveCSS('font-size', '12px');
  });

  test('.tui-toggle-group-wrap wraps onto a second row', async ({ page }) => {
    const tops = await page.locator('#wrap-group .tui-toggle').evaluateAll(els => els.map(el => Math.round(el.getBoundingClientRect().top)));
    expect(new Set(tops).size).toBeGreaterThan(1);
  });
});

test.describe('Interactive — Wizard step precedence', () => {
  test.beforeEach(({ page }) => page.goto('/examples/07-interactive.html'));

  test('an explicit .tui-step-complete keeps the positive tone under auto-lighting', async ({ page }) => {
    const positive = await page.evaluate(() => {
      const probe = document.createElement('div');
      probe.style.backgroundColor = 'var(--tui-positive)';
      document.body.append(probe);
      const color = getComputedStyle(probe).backgroundColor;
      probe.remove();
      return color;
    });
    await expect(page.locator('#precedence-wizard .tui-step-complete .tui-step-number')).toHaveCSS('background-color', positive);
  });
});

test.describe('Wizard — gap, not margins', () => {
  test('the steps indicator and the active step are spaced by the wizard gap', async ({ page }) => {
    await page.goto('/examples/08-patterns.html');
    const wizard = page.locator('.tui-wizard').first();
    expect(await wizard.evaluate(el => getComputedStyle(el).rowGap)).toBe('24px');
    expect(await wizard.locator('.tui-steps').evaluate(el => getComputedStyle(el).marginBottom)).toBe('0px');
    expect(await wizard.locator('.tui-wizard-nav').first().evaluate(el => getComputedStyle(el).marginTop)).toBe('0px');
  });
});


/** Freeze transitions so computed values can be read right after a state change. */
const freezeMotion = (page) => page.addStyleTag({ content: '*, ::before, ::after { transition: none !important; animation: none !important; }' });

test.describe('Interactive — Self-driven JS hooks', () => {
  test('hidden attribute hides a menu item that sets its own display, until-found stays in layout', async ({ page }) => {
    await page.goto('/examples/index.html');
    await page.setContent(`<link rel="stylesheet" href="/src/tui.css">
      <div class="tui-menu"><a class="tui-menu-item" id="a" href="#">A</a><a class="tui-menu-item" id="b" href="#">B</a></div>
      <ul class="tui-list-group"><li class="tui-list-item" id="c">C</li></ul>
      <span class="tui-chip" id="d">D</span>`);
    await expect(page.locator('#a')).toHaveCSS('display', 'flex');
    await page.evaluate(() => {
      document.getElementById('a').hidden = true;
      document.getElementById('c').hidden = true;
      document.getElementById('d').hidden = true;
      document.getElementById('b').setAttribute('hidden', 'until-found');
    });
    await expect(page.locator('#a')).toHaveCSS('display', 'none');
    await expect(page.locator('#c')).toHaveCSS('display', 'none');
    await expect(page.locator('#d')).toHaveCSS('display', 'none');
    await expect(page.locator('#b')).toHaveCSS('display', 'flex');
  });

  test('listbox states come from ARIA, data attributes and classes', async ({ page }) => {
    await page.goto('/examples/07-interactive.html');
    await freezeMotion(page);
    const options = page.locator('#listbox-demo .tui-option');
    const selected = options.nth(0);
    const active = options.nth(1);
    const disabled = options.nth(2);
    const plain = options.nth(3);
    const bg = (l) => l.evaluate((el) => getComputedStyle(el).backgroundColor);
    const tick = (l) => l.evaluate((el) => getComputedStyle(el, '::before').opacity);
    expect(await tick(selected)).toBe('1');
    expect(await tick(plain)).toBe('0');
    expect(await bg(selected)).not.toBe(await bg(plain));
    expect(await bg(active)).not.toBe(await bg(plain));
    await expect(disabled).toHaveCSS('cursor', 'not-allowed');
    expect(await selected.evaluate((el) => getComputedStyle(el).getPropertyValue('--tui-selected'))).toBe('1');

    await plain.evaluate((el) => el.classList.add('tui-selected'));
    expect(await tick(plain)).toBe('1');
    await plain.evaluate((el) => { el.classList.remove('tui-selected'); el.setAttribute('data-selected', ''); });
    expect(await tick(plain)).toBe('1');
    await plain.evaluate((el) => el.removeAttribute('data-selected'));
    expect(await tick(plain)).toBe('0');

    const multi = page.locator('#listbox-multi .tui-option').nth(1);
    expect(await multi.evaluate((el) => getComputedStyle(el, '::before').borderTopWidth)).toBe('2px');
  });

  test('listbox states: the empty row shows only once every option is hidden', async ({ page }) => {
    await page.goto('/examples/07-interactive.html');
    const empty = page.locator('#listbox-demo .tui-listbox-empty');
    await expect(empty).toBeHidden();
    await page.evaluate(() => document.querySelectorAll('#listbox-demo .tui-option').forEach((o) => { o.hidden = true; }));
    await expect(empty).toBeVisible();
    await page.evaluate(() => { document.querySelector('#listbox-demo .tui-option').hidden = false; });
    await expect(empty).toBeHidden();
  });

  test('self-driven pressed buttons and ARIA toggles match the checked look, and a caret turns when expanded', async ({ page }) => {
    await page.goto('/examples/07-interactive.html');
    await freezeMotion(page);
    const on = page.locator('#pressed-on');
    const off = page.locator('#pressed-off');
    const bg = (l) => l.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(await bg(on)).not.toBe(await bg(off));
    expect(await on.evaluate((el) => getComputedStyle(el).boxShadow)).toContain('inset');
    await off.evaluate((el) => el.setAttribute('aria-pressed', 'true'));
    expect(await bg(on)).toBe(await bg(off));

    const toggles = page.locator('#button-toggles .tui-toggle');
    const checkedLabel = page.locator('label[for=align-left]');
    expect(await bg(toggles.nth(0))).toBe(await bg(checkedLabel));
    expect(await bg(toggles.nth(1))).not.toBe(await bg(checkedLabel));
    await expect(toggles.nth(1)).toHaveCSS('border-left-width', '0px');

    await expect(page.locator('#caret-open .tui-caret')).toHaveCSS('rotate', '180deg');
    await expect(page.locator('#caret-closed .tui-caret')).toHaveCSS('rotate', 'none');
    await page.locator('#caret-closed').evaluate((el) => el.setAttribute('aria-expanded', 'true'));
    await expect(page.locator('#caret-closed .tui-caret')).toHaveCSS('rotate', '180deg');
  });

  test('self-driven tabs: aria-selected activates a role=tab button and hidden hides its panel', async ({ page }) => {
    await page.goto('/examples/07-interactive.html');
    await freezeMotion(page);
    const summary = page.locator('#js-tab-summary');
    const detail = page.locator('#js-tab-detail');
    const radioActive = page.locator('#billing-plan + .tui-tab');
    const color = (l) => l.evaluate((el) => getComputedStyle(el).color);
    expect(await color(summary)).toBe(await color(radioActive));
    expect(await color(detail)).not.toBe(await color(radioActive));
    await expect(detail).toHaveCSS('border-top-width', '0px');
    await expect(page.locator('#js-panel-summary')).toBeVisible();
    await expect(page.locator('#js-panel-detail')).toBeHidden();
    await page.evaluate(() => {
      document.getElementById('js-tab-summary').setAttribute('aria-selected', 'false');
      document.getElementById('js-tab-detail').setAttribute('aria-selected', 'true');
      document.getElementById('js-panel-summary').hidden = true;
      document.getElementById('js-panel-detail').hidden = false;
    });
    expect(await color(detail)).toBe(await color(radioActive));
    await expect(page.locator('#js-panel-detail')).toBeVisible();
    await expect(page.locator('#js-panel-summary')).toBeHidden();
  });

  test('self-driven theme: data-theme on the root forces the scheme and flips the scheme-only helpers', async ({ page }) => {
    await page.goto('/examples/index.html');
    await page.setContent(`<link rel="stylesheet" href="/src/tui.css"><span class="tui-light-only" id="l">sun</span><span class="tui-dark-only" id="d">moon</span>`);
    const scheme = () => page.evaluate(() => getComputedStyle(document.documentElement).colorScheme);
    expect(await scheme()).toBe('light dark');
    await expect(page.locator('#l')).toBeVisible();
    await expect(page.locator('#d')).toBeHidden();
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    expect(await scheme()).toBe('dark');
    await expect(page.locator('#l')).toBeHidden();
    await expect(page.locator('#d')).toBeVisible();
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    expect(await scheme()).toBe('light');
    await expect(page.locator('#l')).toBeVisible();
    await expect(page.locator('#d')).toBeHidden();
  });

  test('no axe violations in the self-driven sections', async ({ page }) => {
    await page.goto('/examples/07-interactive.html');
    expect(await getViolations(page, ['color-contrast', 'button-name', 'aria-required-children', 'aria-required-parent', 'aria-allowed-attr'], '#listbox-section, #js-tabs-section, #pressed-section')).toEqual([]);
  });
});
