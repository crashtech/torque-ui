// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * Every demo fragment under a "self-driven JS" heading ships the minimal
 * script that drives it. The inventory test keeps that set exact; the
 * behaviour tests load each fragment on its own and use it like a reader
 * of the docs would, failing on any page error the script raises.
 */
const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const BADGE = '<span class="tui-badge">self-driven JS</span>';

/** @returns {{ badged: string[], plain: string[] }} fragment paths relative to the repo */
function inventory() {
  const badged = [];
  const plain = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && !['notes', 'superpowers', 'assets'].includes(entry.name)) walk(full);
      else if (entry.name === 'index.md') classify(full);
    }
  };
  const classify = (file) => {
    let underBadge = false;
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      if (/^#{2,3} /.test(line)) underBadge = line.includes(BADGE);
      const m = line.match(/include demo\.html file="([^"]+)"/);
      if (!m) continue;
      const fragment = path.relative(ROOT, path.join(path.dirname(file), 'examples', m[1]));
      (underBadge ? badged : plain).push(fragment);
    }
  };
  walk(DOCS_DIR);
  return { badged, plain };
}

const { badged, plain } = inventory();

test.describe('self-driven JS fragment inventory', () => {
  test('every badged fragment carries an inline script', () => {
    const missing = badged.filter((f) => !fs.readFileSync(path.join(ROOT, f), 'utf8').includes('<script>'));
    expect(missing).toEqual([]);
    expect(badged.length).toBeGreaterThan(20);
  });

  test('no fragment outside a badged section carries a script', () => {
    const stray = plain.filter((f) => fs.readFileSync(path.join(ROOT, f), 'utf8').includes('<script'));
    expect(stray).toEqual([]);
  });
});

/**
 * One interaction per fragment, written the way a reader would use the demo.
 * @type {Record<string, (page: import('@playwright/test').Page) => Promise<void>>}
 */
const behaviours = {
  'docs/components/buttons/examples/pressed.html': async (page) => {
    const bold = page.locator('#buttons-pressed [aria-pressed]').first();
    await bold.click();
    await expect(bold).toHaveAttribute('aria-pressed', 'false');
    const more = page.locator('#buttons-pressed [aria-expanded]').first();
    await more.click();
    await expect(more).toHaveAttribute('aria-expanded', 'true');
  },
  'docs/components/list-group/examples/script.html': async (page) => {
    const rows = page.locator('#list-group-script .tui-list-item');
    await rows.nth(1).click();
    await expect(rows.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(rows.nth(0)).toHaveAttribute('aria-selected', 'false');
    await rows.nth(2).click();
    await expect(rows.nth(1)).toHaveAttribute('aria-selected', 'true');
    await page.locator('#list-group-script-filter').fill('zzz');
    await expect(page.locator('#list-group-script .tui-list-empty')).toBeVisible();
  },
  'docs/components/progress/examples/attribute.html': async (page) => {
    await page.locator('#progress-attribute-advance').click();
    await expect(page.locator('#progress-attribute-bar')).toHaveAttribute('aria-valuenow', '55');
    await expect(page.locator('#progress-attribute-ring')).toHaveAttribute('aria-valuenow', '40');
  },
  'docs/components/toast/examples/mount.html': async (page) => {
    await page.locator('#toast-mount-notify').click();
    await expect(page.locator('#toast-mount-stack .tui-toast')).toHaveCount(1);
  },
  'docs/elements/tables/examples/sort-button.html': async (page) => {
    await page.locator('#tables-sort th button').nth(1).click();
    await expect(page.locator('#tables-sort th').nth(1)).toHaveAttribute('aria-sort', 'ascending');
    await expect(page.locator('#tables-sort th').nth(0)).toHaveAttribute('aria-sort', 'none');
    await expect(page.locator('#tables-sort tbody tr').first()).toContainText('notes.md');
    await page.locator('#tables-sort th button').nth(1).click();
    await expect(page.locator('#tables-sort tbody tr').first()).toContainText('archive.zip');
  },
  'docs/forms/field-states/examples/range-data.html': async (page) => {
    const range = page.locator('#field-states-range-data');
    await range.fill('80');
    await expect(range).toHaveAttribute('data-value', '80');
  },
  'docs/forms/search/examples/clear.html': async (page) => {
    await page.locator('#search-clear .tui-close').click();
    await expect(page.locator('#search-clear input')).toHaveValue('');
    await expect(page.locator('#search-clear .tui-close')).toBeHidden();
  },
  'docs/forms/select/examples/combobox.html': async (page) => {
    const input = page.locator('#select-combobox input');
    const list = page.locator('#select-combobox .tui-listbox');
    await input.click();
    await expect(list).toBeVisible();
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await input.fill('tri');
    await expect(list.locator('.tui-option:not([hidden])')).toHaveCount(1);
    await list.locator('.tui-option:not([hidden])').click();
    await expect(input).toHaveValue('Triangle');
    await expect(list).toBeHidden();
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  },
  'docs/forms/select/examples/picker.html': async (page) => {
    const trigger = page.locator('#select-picker .tui-combobox-value');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#select-picker .tui-listbox-search input').fill('circ');
    await expect(page.locator('#select-picker .tui-option:not([hidden])')).toHaveCount(1);
    await page.locator('#select-picker .tui-option:not([hidden])').click();
    await expect(trigger).toContainText('Circle');
    expect(await trigger.innerHTML()).toContain('<svg');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
  'docs/forms/select/examples/tags.html': async (page) => {
    const input = page.locator('#select-tags input');
    await input.click();
    await page.locator('#select-tags .tui-option', { hasText: 'Square' }).click();
    await expect(page.locator('#select-tags .tui-chip')).toHaveCount(3);
    await page.locator('#select-tags .tui-chip', { hasText: 'Circle' }).locator('.tui-close').click();
    await expect(page.locator('#select-tags .tui-chip')).toHaveCount(2);
    await expect(page.locator('#select-tags .tui-option', { hasText: 'Circle' })).toHaveAttribute('aria-selected', 'false');
  },
  'docs/forms/select/examples/inflow.html': async (page) => {
    const input = page.locator('#select-inflow input');
    const list = page.locator('#select-inflow .tui-listbox');
    await expect(list).toBeHidden();
    await input.click();
    await expect(list).toBeVisible();
    await input.fill('circ');
    await list.locator('.tui-option:not([hidden])').click();
    await expect(input).toHaveValue('Circle');
    await expect(list).toBeHidden();
  },
  'docs/forms/stepper/examples/bound.html': async (page) => {
    const [decrease, increase] = [page.locator('#stepper-bound .tui-stepper-btn').first(), page.locator('#stepper-bound .tui-stepper-btn').last()];
    await increase.click();
    await expect(page.locator('#stepper-bound input')).toHaveValue('1');
    await expect(decrease).toBeEnabled();
    await decrease.click();
    await expect(decrease).toBeDisabled();
  },
  'docs/forms/validation/examples/attribute.html': async (page) => {
    const email = page.locator('#validation-attribute-email');
    await email.fill('someone@example.com');
    await expect(email).toHaveAttribute('aria-invalid', 'false');
    await email.fill('someone@example');
    await expect(email).toHaveAttribute('aria-invalid', 'true');
  },
  'docs/foundations/self-driven-js/examples/states.html': async (page) => {
    const buttons = page.locator('#self-driven-states button');
    await buttons.nth(0).click();
    await expect(buttons.nth(0)).toHaveAttribute('aria-pressed', 'false');
    await buttons.nth(1).click();
    await expect(buttons.nth(1)).not.toHaveAttribute('data-pressed');
    await buttons.nth(2).click();
    await expect(buttons.nth(2)).not.toHaveClass(/tui-pressed/);
    await buttons.nth(4).click();
    await expect(buttons.nth(4)).toHaveAttribute('aria-expanded', 'true');
  },
  'docs/foundations/self-driven-js/examples/value.html': async (page) => {
    await page.locator('#self-driven-value-advance').click();
    const bars = page.locator('#self-driven-value [aria-valuenow]');
    await expect(bars.nth(0)).toHaveAttribute('aria-valuenow', '55');
    await expect(bars.nth(2)).toHaveAttribute('aria-valuenow', '55');
  },
  'docs/interactive/listbox/examples/states.html': async (page) => {
    const options = page.locator('#listbox-states .tui-option');
    await options.nth(2).click();
    await expect(options.nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(options.nth(0)).toHaveAttribute('aria-selected', 'false');
    await options.nth(3).click({ force: true });
    await expect(options.nth(2)).toHaveAttribute('aria-selected', 'true');
  },
  'docs/interactive/listbox/examples/multi.html': async (page) => {
    const option = page.locator('#listbox-multi .tui-option').nth(1);
    await option.click();
    await expect(option).toHaveAttribute('aria-selected', 'true');
    await option.click();
    await expect(option).toHaveAttribute('aria-selected', 'false');
  },
  'docs/interactive/listbox/examples/groups.html': async (page) => {
    await page.locator('#listbox-groups input').fill('bog');
    await expect(page.locator('#listbox-groups .tui-option:not([hidden])')).toHaveCount(1);
    await expect(page.locator('#listbox-groups [role="group"]').first()).toBeHidden();
    await page.locator('#listbox-groups input').fill('zzz');
    await expect(page.locator('#listbox-groups .tui-listbox-empty')).toBeVisible();
  },
  'docs/interactive/menu/examples/states.html': async (page) => {
    const links = page.locator('#menu-states a');
    await links.nth(1).click();
    await expect(links.nth(1)).toHaveAttribute('aria-current', 'page');
    await expect(links.nth(0)).not.toHaveAttribute('aria-current');
  },
  'docs/interactive/tabs/examples/script.html': async (page) => {
    await page.locator('#tabs-script [role="tab"]').nth(1).click();
    await expect(page.locator('#tabs-script [role="tab"]').nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#tabs-script [role="tabpanel"]').nth(1)).toBeVisible();
    await expect(page.locator('#tabs-script [role="tabpanel"]').nth(0)).toBeHidden();
  },
  'docs/interactive/toggle-group/examples/buttons.html': async (page) => {
    const toggles = page.locator('#toggle-group-buttons .tui-toggle');
    await toggles.nth(2).click();
    await expect(toggles.nth(2)).toHaveAttribute('aria-pressed', 'true');
    await expect(toggles.nth(0)).toHaveAttribute('aria-pressed', 'false');
  },
  'docs/themes/dark-mode/examples/persisted.html': async (page) => {
    const root = page.locator('html');
    await expect(root).toHaveAttribute('data-theme', 'dark');
    await page.locator('#dark-mode-persisted-toggle').click();
    await expect(root).toHaveAttribute('data-theme', 'light');
    expect(await page.evaluate(() => localStorage.getItem('tui-theme'))).toBe('light');
  },
};

test.describe('self-driven JS fragment behaviour', () => {
  test('every badged fragment has a behaviour test', () => {
    expect(badged.filter((f) => !behaviours[f])).toEqual([]);
  });

  for (const [fragment, drive] of Object.entries(behaviours)) {
    test(fragment, async ({ page }) => {
      /** @type {string[]} */
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto('/examples/index.html');
      await page.evaluate(() => localStorage.clear());
      await page.setContent(`<link rel="stylesheet" href="/src/tui.css">${fs.readFileSync(path.join(ROOT, fragment), 'utf8')}`);
      await drive(page);
      expect(errors, `page errors in ${fragment}`).toEqual([]);
    });
  }
});
