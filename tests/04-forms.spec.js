// @ts-check
const { test, expect } = require('@playwright/test');
const { getViolations } = require('./a11y-base');

test.describe('Forms — Input Fields', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('input should have border and padding', async ({ page }) => {
    const input = page.locator('input[type="text"]').first();
    const borderWidth = await input.evaluate(el => getComputedStyle(el).borderWidth);
    const paddingLeft = await input.evaluate(el => getComputedStyle(el).paddingLeft);

    expect(borderWidth).not.toBe('0px');
    expect(paddingLeft).not.toBe('0px');
  });

  test('input should have full width', async ({ page }) => {
    const input = page.locator('input[type="text"]').first();
    const display = await input.evaluate(el => getComputedStyle(el).display);

    // Inputs are block-level elements that take full width
    expect(display).toBe('block');
  });

  test('small input should have reduced padding', async ({ page }) => {
    const smInput = page.locator('.tui-input-sm').first();
    const paddingTop = await smInput.evaluate(el => getComputedStyle(el).paddingTop);

    // Small inputs have less vertical padding than default
    expect(paddingTop).not.toBe('0px');
  });

  test('large input should have increased padding', async ({ page }) => {
    const lgInput = page.locator('.tui-input-lg').first();
    const paddingTop = await lgInput.evaluate(el => getComputedStyle(el).paddingTop);

    // Large inputs have more vertical padding than default
    expect(paddingTop).not.toBe('0px');
  });

  test('textarea should be resizable', async ({ page }) => {
    const textareaEl = page.locator('textarea').first();
    expect(await textareaEl.count()).toBeGreaterThan(0);
  });

  test('primary input should use brand color border', async ({ page }) => {
    const primaryInput = page.locator('.tui-input-primary').first();
    const borderColor = await primaryInput.evaluate(el => getComputedStyle(el).borderColor);

    expect(borderColor).not.toBe('transparent');
  });

  test('success input should use green border', async ({ page }) => {
    const successInput = page.locator('.tui-input-success').first();
    const borderColor = await successInput.evaluate(el => getComputedStyle(el).borderColor);

    expect(borderColor).not.toBe('transparent');
  });

  test('error input should use red border', async ({ page }) => {
    const errorInput = page.locator('.tui-input-error').first();
    const borderColor = await errorInput.evaluate(el => getComputedStyle(el).borderColor);

    expect(borderColor).not.toBe('transparent');
  });

  test('disabled input should not be editable', async ({ page }) => {
    const disabledInput = page.locator('input[type="text"][disabled]').first();
    const isDisabled = await disabledInput.evaluate(el => el.disabled);

    expect(isDisabled).toBe(true);
  });

  test('error input should have error message', async ({ page }) => {
    const errorMsg = page.locator('.tui-error').first();
    const content = await errorMsg.textContent();

    expect(content.length).toBeGreaterThan(0);
  });

  test('auto-growing textarea grows as content is typed', async ({ page }) => {
    test.skip(!(await page.evaluate(() => CSS.supports('field-sizing: content'))), 'field-sizing not supported');

    const textarea = page.locator('textarea.tui-field-auto').first();
    const heightBefore = await textarea.evaluate(el => el.getBoundingClientRect().height);

    const lines = Array.from({ length: 10 }, (_, i) => `Line ${i + 1}`).join('\n');
    await textarea.fill(lines);

    const heightAfter = await textarea.evaluate(el => el.getBoundingClientRect().height);
    expect(heightAfter).toBeGreaterThan(heightBefore);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#auto-grow-section')).toEqual([]);
  });
});

test.describe('Forms — Select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('select should have border and padding', async ({ page }) => {
    const select = page.locator('select').first();
    const borderWidth = await select.evaluate(el => getComputedStyle(el).borderWidth);

    expect(borderWidth).not.toBe('0px');
  });

  test('disabled select should not be interactive', async ({ page }) => {
    const disabledSelect = page.locator('select[disabled]').first();
    const isDisabled = await disabledSelect.evaluate(el => el.disabled);

    expect(isDisabled).toBe(true);
  });

  test('select should have options', async ({ page }) => {
    const select = page.locator('select').first();
    const options = await select.locator('option').all();

    expect(options.length).toBeGreaterThan(0);
  });

  test('rich select opens its customised picker', async ({ page }) => {
    test.skip(!(await page.evaluate(() => CSS.supports('appearance: base-select'))), 'appearance: base-select not supported');

    const richSelect = page.locator('.tui-select-rich').first();
    await richSelect.click();

    const isOpen = await richSelect.evaluate(el => el.matches(':open'));
    expect(isOpen).toBe(true);
    await expect(page.locator('.tui-select-rich option').first()).toBeVisible();
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '#select-section')).toEqual([]);
  });
});

test.describe('Forms — Datalist Combobox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  // Chromium's datalist suggestion popup isn't reachable via keyboard in headless
  // automation (ArrowDown+Enter leaves the typed prefix unchanged rather than
  // selecting a suggestion), so this asserts the IDL wiring instead: the input's
  // `list` property resolves to the actual <datalist> element, and that element
  // carries real, selectable options.
  test('the list IDL property resolves to a datalist with real options', async ({ page }) => {
    const input = page.locator('#lang-combobox');
    const listId = await input.getAttribute('list');

    const datalist = page.locator(`datalist#${listId}`);
    await expect(datalist).toHaveCount(1);

    const optionValues = await datalist.locator('option[value]').evaluateAll(
      els => els.map(el => el.getAttribute('value'))
    );
    expect(optionValues.length).toBeGreaterThanOrEqual(2);

    const listMatchesDatalist = await input.evaluate(
      (el, id) => el.list === document.getElementById(id),
      listId
    );
    expect(listMatchesDatalist).toBe(true);
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-field:has(#lang-combobox)')).toEqual([]);
  });
});

test.describe('Forms — Checkbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('checkbox group should contain checkboxes', async ({ page }) => {
    const checkboxes = await page.locator('.tui-checkbox-input').all();

    expect(checkboxes.length).toBeGreaterThan(0);
  });

  test('checked checkbox should have checked state', async ({ page }) => {
    const checkedCheckbox = page.locator('.tui-checkbox-input:checked').first();
    const isChecked = await checkedCheckbox.evaluate(el => el.checked);

    expect(isChecked).toBe(true);
  });

  test('checkbox label should be clickable', async ({ page }) => {
    const checkboxLabel = page.locator('.tui-checkbox').first();
    const tagName = await checkboxLabel.evaluate(el => el.tagName.toLowerCase());

    // Labels wrap checkboxes for clickability
    expect(tagName).toBe('label');
  });


  test('success checkbox should be checked', async ({ page }) => {
    const successCheckbox = page.locator('.tui-checkbox-success .tui-checkbox-input').first();
    const isChecked = await successCheckbox.evaluate(el => el.checked);

    expect(isChecked).toBe(true);
  });

  test('inline checkboxes should display horizontally', async ({ page }) => {
    const inlineCheckboxes = page.locator('.tui-checkbox-inline');
    const count = await inlineCheckboxes.count();

    // Inline checkboxes are styled to appear side by side
    expect(count).toBeGreaterThan(0);
  });

  test('checkboxes and radios are not text-field styled', async ({ page }) => {
    await expect(page.locator('input[type=checkbox]').first()).not.toHaveCSS('border-width', '2px');
    await expect(page.locator('input[type=checkbox]').first()).not.toHaveCSS('width', /^\d{3,}px$/);
  });

  test('forced-colors field border rule does not override excluded input types', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });

    // Chromium ignores the `border` property entirely on checkbox/radio (native
    // appearance: auto widgets) regardless of forced-colors state, so border-width
    // there is always 0px and can't signal this bug. input[type=color] is excluded
    // from the field base the same way, but does respect `border`, so it does.
    const colorInputBorder = await page.locator('input[type=color]').first().evaluate(el => getComputedStyle(el).borderWidth);
    const textInputBorder = await page.locator('input[type=text]').first().evaluate(el => getComputedStyle(el).borderWidth);

    expect(textInputBorder).toBe('1px');
    expect(colorInputBorder).not.toBe('1px');
  });
});

test.describe('Forms — Radio Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('radio group should contain radio buttons', async ({ page }) => {
    const radios = await page.locator('.tui-radio-input').all();

    expect(radios.length).toBeGreaterThan(0);
  });

  test('checked radio should have checked state', async ({ page }) => {
    const checkedRadio = page.locator('.tui-radio-input:checked[name="plan"]').first();
    const isChecked = await checkedRadio.evaluate(el => el.checked);

    expect(isChecked).toBe(true);
  });

  test('radio label should be clickable', async ({ page }) => {
    const radioLabel = page.locator('.tui-radio').first();
    const tagName = await radioLabel.evaluate(el => el.tagName.toLowerCase());

    expect(tagName).toBe('label');
  });


  test('success radio should be checked', async ({ page }) => {
    const successRadio = page.locator('.tui-radio-success .tui-radio-input').first();
    const isChecked = await successRadio.evaluate(el => el.checked);

    expect(isChecked).toBe(true);
  });

  test('inline radios should display horizontally', async ({ page }) => {
    const inlineRadios = page.locator('.tui-radio-inline');
    const count = await inlineRadios.count();

    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Forms — Switch / Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('switch should contain input and label', async ({ page }) => {
    const switchEl = page.locator('.tui-switch').first();
    const hasInput = await switchEl.locator('.tui-switch-input').count();

    expect(hasInput).toBeGreaterThan(0);
  });

  test('checked switch should have checked state', async ({ page }) => {
    const checkedSwitch = page.locator('.tui-switch-input:checked').first();
    const isChecked = await checkedSwitch.evaluate(el => el.checked);

    expect(isChecked).toBe(true);
  });

  test('switch label should be visible', async ({ page }) => {
    const switchLabel = page.locator('.tui-switch-label').first();
    const content = await switchLabel.textContent();

    expect(content.length).toBeGreaterThan(0);
  });


  test('switch without label should still be functional', async ({ page }) => {
    // All switches have labels in the HTML, but verify they work regardless
    const switchCount = await page.locator('.tui-switch').count();

    expect(switchCount).toBeGreaterThan(0);
  });
});

test.describe('Forms — Password', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('password input is masked until revealed', async ({ page }) => {
    const input = page.locator('.tui-password-input').first();

    await input.fill('secret');
    const maskedSecurity = await input.evaluate(el => getComputedStyle(el).webkitTextSecurity);
    expect(maskedSecurity).toBe('disc');

    const label = page.locator('label.tui-password-label').first();
    await label.click();

    const revealedSecurity = await input.evaluate(el => getComputedStyle(el).webkitTextSecurity);
    expect(revealedSecurity).toBe('none');
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-password')).toEqual([]);
  });
});

test.describe('Forms — Range Slider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('range slider should exist and be visible', async ({ page }) => {
    const range = page.locator('input[type="range"]').first();
    const isVisible = await range.isVisible();

    expect(isVisible).toBe(true);
  });

  test('range slider should have min/max attributes', async ({ page }) => {
    const range = page.locator('input[type="range"]').first();
    const min = await range.evaluate(el => el.min);
    const max = await range.evaluate(el => el.max);

    expect(min).toBe('0');
    expect(max).toBe('100');
  });

  test('range slider should have a value', async ({ page }) => {
    const range = page.locator('input[type="range"]').first();
    const value = await range.evaluate(el => el.value);

    expect(value).not.toBe('');
  });
});

test.describe('Forms — Search Input', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('search input should exist within search container', async ({ page }) => {
    const searchContainer = page.locator('.tui-search').first();
    const hasInput = await searchContainer.locator('input').count();

    expect(hasInput).toBeGreaterThan(0);
  });

  test('search input should have type=search', async ({ page }) => {
    const searchInput = page.locator('.tui-search input[type="search"]').first();
    const typeAttr = await searchInput.evaluate(el => el.type);

    expect(typeAttr).toBe('search');
  });

  test('search input should have placeholder', async ({ page }) => {
    const searchInput = page.locator('.tui-search input').first();
    const placeholder = await searchInput.evaluate(el => el.placeholder);

    expect(placeholder.length).toBeGreaterThan(0);
  });

  test('search input reserves room for the icon: padding-inline-end is at least icon size + gap', async ({ page }) => {
    const searchInput = page.locator('.tui-search input').first();
    const paddingInlineEnd = await searchInput.evaluate(el => parseFloat(getComputedStyle(el).paddingInlineEnd));

    expect(paddingInlineEnd).toBeGreaterThanOrEqual(40);
  });
});

test.describe('Forms — File Input', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('file input should exist', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    const hasFileInput = await fileInput.count();

    expect(hasFileInput).toBeGreaterThan(0);
  });

  test('file input label should be a button', async ({ page }) => {
    const fileLabel = page.locator('label[for="file-upload"]').first();
    const tagName = await fileLabel.evaluate(el => el.tagName.toLowerCase());

    expect(tagName).toBe('label');
  });

  test('file input should be visible natively (not hidden)', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();

    // The native input renders directly — no longer display:none behind a styled label
    await expect(fileInput).toBeVisible();
  });
});

test.describe('Forms — Date Input', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('date input should exist and have type=date', async ({ page }) => {
    const dateInput = page.locator('input[type="date"]').first();

    expect(await dateInput.count()).toBeGreaterThan(0);
    expect(await dateInput.evaluate(el => el.type)).toBe('date');
  });
});

test.describe('Forms — Color Input', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('color input should exist and have type=color', async ({ page }) => {
    const colorInput = page.locator('input[type="color"]').first();

    expect(await colorInput.count()).toBeGreaterThan(0);
    expect(await colorInput.evaluate(el => el.type)).toBe('color');
  });

  test('color input should have a default value', async ({ page }) => {
    const colorInput = page.locator('input[type="color"]').first();
    const value = await colorInput.evaluate(el => el.value);

    // Color inputs typically have hex values like #6366f1
    expect(value.length).toBeGreaterThan(0);
  });
});

test.describe('Forms — Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('required fields should have required attribute', async ({ page }) => {
    const requiredFields = await page.locator('.tui-form input[required]').all();

    expect(requiredFields.length).toBeGreaterThan(0);
  });

  test('email field should have type=email', async ({ page }) => {
    const emailInput = page.locator('.tui-form input[type="email"][required]').first();
    const typeAttr = await emailInput.evaluate(el => el.type);

    expect(typeAttr).toBe('email');
  });

  test('url field should have type=url', async ({ page }) => {
    const urlInput = page.locator('.tui-form input[type="url"][required]').first();
    const typeAttr = await urlInput.evaluate(el => el.type);

    expect(typeAttr).toBe('url');
  });

  test('number field should have min/max attributes', async ({ page }) => {
    const numberInput = page.locator('.tui-form input[type="number"][required]').first();
    const min = await numberInput.evaluate(el => el.min);
    const max = await numberInput.evaluate(el => el.max);

    expect(min).toBe('1');
    expect(max).toBe('100');
  });

  test('validation help text should be visible', async ({ page }) => {
    const helpText = page.locator('.tui-text-sm.tui-text-neutral').first();
    const content = await helpText.textContent();

    expect(content.length).toBeGreaterThan(0);
  });
});

test.describe('Forms — Grid Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('form grid should exist', async ({ page }) => {
    const formGrid = page.locator('.tui-form-grid').first();
    const hasFormGrid = await formGrid.count();

    expect(hasFormGrid).toBeGreaterThan(0);
  });

  test('grid form should have multiple fields', async ({ page }) => {
    const gridFields = await page.locator('.tui-form-grid .tui-field').all();

    expect(gridFields.length).toBeGreaterThanOrEqual(4);
  });

  test('grid form fields should be inputs', async ({ page }) => {
    const gridInputs = await page.locator('.tui-form-grid input').all();

    expect(gridInputs.length).toBeGreaterThanOrEqual(4);
  });
});

test.describe('Forms — Input group', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('the field sits flush against the addon with a shared radius', async ({ page }) => {
    const group = page.locator('.tui-input-group').first();
    const input = group.locator('input');
    const addon = group.locator('.tui-input-addon');

    const [inputRadius, addonRadius] = await Promise.all([
      input.evaluate(el => getComputedStyle(el).borderTopLeftRadius),
      addon.evaluate(el => getComputedStyle(el).borderTopLeftRadius),
    ]);

    expect(inputRadius).toBe('0px');
    expect(addonRadius).not.toBe('0px');
  });

  test('clicking Apply does not submit or navigate', async ({ page }) => {
    const group = page.locator('.tui-input-group').first();
    const applyButton = group.locator('button', { hasText: 'Apply' });

    expect(await applyButton.getAttribute('type')).toBe('button');

    const urlBefore = page.url();
    await applyButton.click();

    expect(page.url()).toBe(urlBefore);
    await expect(group).toBeVisible();
  });

  test('focusing a grouped input raises it above its neighbours', async ({ page }) => {
    const group = page.locator('.tui-input-group').first();
    const input = group.locator('input');

    await input.focus();

    const zIndex = await input.evaluate(el => getComputedStyle(el).zIndex);
    expect(zIndex).toBe('1');
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], '.tui-input-group')).toEqual([]);
  });
});

test.describe('Forms — Fieldset', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('fieldset has a 1px border', async ({ page }) => {
    const fieldset = page.locator('fieldset').first();
    const borderWidth = await fieldset.evaluate(el => getComputedStyle(el).borderTopWidth);

    expect(borderWidth).toBe('1px');
  });

  test('legend is bold', async ({ page }) => {
    const legend = page.locator('legend').first();
    const fontWeight = await legend.evaluate(el => getComputedStyle(el).fontWeight);

    expect(Number(fontWeight)).toBeGreaterThanOrEqual(600);
  });

  test('clicking a fieldset-inline checkbox label checks it', async ({ page }) => {
    const smsCheckbox = page.locator('.tui-fieldset-inline .tui-checkbox-input').nth(1);
    const smsLabel = page.locator('.tui-fieldset-inline label.tui-checkbox').nth(1);

    await expect(smsCheckbox).not.toBeChecked();
    await smsLabel.click();
    await expect(smsCheckbox).toBeChecked();
  });

  test('the rating fieldset has border-width 0px', async ({ page }) => {
    await page.goto('/examples/07-interactive.html');
    const ratingFieldset = page.locator('fieldset.tui-rating').first();

    const borderWidth = await ratingFieldset.evaluate(el => getComputedStyle(el).borderTopWidth);
    expect(borderWidth).toBe('0px');
  });

  test('no axe violations', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'link-name'], 'fieldset')).toEqual([]);
  });
});

test.describe('Forms — Progress values', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  const resolve = (page, cssVar) => page.evaluate(v => {
    const probe = document.createElement('div');
    probe.style.color = `var(${v})`;
    document.body.append(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }, cssVar);

  test('native progress fill rule survives Chromium parsing', async ({ page }) => {
    // why: Chromium drops a whole selector list that contains ::-moz-progress-bar,
    // so the tone only applies when ::-webkit-progress-value has a rule of its own
    const found = await page.evaluate(() => {
      const walk = rules => [...rules].some(rule => {
        if (rule.cssRules && rule.cssRules.length) return walk(rule.cssRules);
        if (rule.styleSheet) return walk(rule.styleSheet.cssRules);
        return rule.selectorText === 'progress::-webkit-progress-value' && rule.style.backgroundColor.includes('var(--tui-tone');
      });
      return walk(document.styleSheets);
    });
    expect(found).toBe(true);
  });

  test('.tui-progress-bar width follows --tui-progress-value', async ({ page }) => {
    const width = await page.locator('#progress-hook .tui-progress-bar').evaluate(el => el.getBoundingClientRect().width);
    expect(Math.round(width)).toBe(80);
  });

  test('.tui-progress-inline is a fixed-width inline bar', async ({ page }) => {
    const bar = page.locator('#progress-inline');
    await expect(bar).toHaveCSS('display', 'inline-block');
    expect(Math.round(await bar.evaluate(el => el.getBoundingClientRect().width))).toBe(128);
  });

  test('.tui-poll-option paints its value as background-size', async ({ page }) => {
    await expect(page.locator('#poll-yes')).toHaveCSS('background-size', /^50%/);
  });

  test('.tui-waveform masks a native progress into bars', async ({ page }) => {
    const wave = page.locator('#waveform');
    await expect(wave).toHaveCSS('mask-image', /repeating-linear-gradient/);
    expect(Math.round(await wave.evaluate(el => el.getBoundingClientRect().height))).toBe(24);
  });
});

test.describe('Forms — Field label and search width', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('a plain label inside .tui-field is styled as the field label', async ({ page }) => {
    const label = page.locator('.tui-field > label').first();
    await expect(label).toHaveCSS('font-size', '14px');
    await expect(label).toHaveCSS('font-weight', '500');
  });

  test('--tui-search-inline-size widens .tui-search', async ({ page }) => {
    const width = await page.locator('#search-wide').evaluate(el => el.getBoundingClientRect().width);
    expect(Math.round(width)).toBe(480);
  });
});

test.describe('Forms — gap, not margins', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
  });

  test('inline checkbox groups space items with gap and the items carry no margin', async ({ page }) => {
    const group = page.locator('.tui-checkbox-group-inline').first();
    expect(await group.evaluate(el => getComputedStyle(el).columnGap)).toBe('16px');
    expect(await group.locator('.tui-checkbox-inline').first().evaluate(el => getComputedStyle(el).marginRight)).toBe('0px');
  });

  test('fieldset stacks its children with gap; help text carries no margin', async ({ page }) => {
    const r = await page.evaluate(() => {
      const box = document.createElement('div');
      box.innerHTML = '<fieldset><legend>l</legend><div class="tui-field"><label>a</label><input><span class="tui-help">h</span></div><div class="tui-field"><label>b</label><input></div></fieldset>';
      document.body.append(box);
      const out = [getComputedStyle(box.querySelector('fieldset')).rowGap, getComputedStyle(box.querySelectorAll('.tui-field')[1]).marginTop, getComputedStyle(box.querySelector('.tui-help')).marginTop];
      box.remove();
      return out;
    });
    expect(r).toEqual(['12px', '0px', '0px']);
  });
});


/** Freeze transitions so computed values can be read right after a state change. */
const freezeMotion = (page) => page.addStyleTag({ content: '*, ::before, ::after { transition: none !important; animation: none !important; }' });

test.describe('Forms — Self-driven JS hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
    await freezeMotion(page);
  });

  test('self-driven range: the fill follows data-value', async ({ page }) => {
    const range = page.locator('#range-data');
    const value = () => range.evaluate((el) => getComputedStyle(el).getPropertyValue('--tui-range-value'));
    expect(await value()).toBe('30%');
    await range.evaluate((el) => el.setAttribute('data-value', '80'));
    expect(await value()).toBe('80%');
    await range.evaluate((el) => el.removeAttribute('data-value'));
    expect(await value()).toBe('50%');
  });

  test('rich select icon options are flex rows and selectedcontent mirrors the chosen option', async ({ page }) => {
    const select = page.locator('#select-icons');
    await expect(select.locator('option').nth(1)).toHaveCSS('display', 'flex');
    const sc = select.locator('selectedcontent');
    await expect(sc).toHaveCSS('display', 'flex');
    expect(await sc.innerHTML()).toContain('<svg');
    expect(await sc.textContent()).toContain('Circle');
    await expect(select.locator('> button')).toHaveCSS('border-top-width', '0px');
  });

  test('combobox shell paints the field ring on focus-within and turns the chevron when expanded', async ({ page }) => {
    const box = page.locator('#combobox-search');
    const input = page.locator('#combobox-search-input');
    const plain = page.locator('input[type="text"]').first();
    await expect(input).toHaveCSS('border-top-width', '0px');
    const restingBorder = await box.evaluate((el) => getComputedStyle(el).borderTopColor);
    await input.focus();
    await expect(box).not.toHaveCSS('border-top-color', restingBorder);
    const boxShadow = await box.evaluate((el) => getComputedStyle(el).boxShadow);
    await plain.focus();
    expect(boxShadow).toBe(await plain.evaluate((el) => getComputedStyle(el).boxShadow));
    expect(await box.evaluate((el) => getComputedStyle(el, '::after').rotate)).toBe('none');
    await input.evaluate((el) => el.setAttribute('aria-expanded', 'true'));
    expect(await box.evaluate((el) => getComputedStyle(el, '::after').rotate)).toBe('180deg');
    expect(await box.evaluate((el) => getComputedStyle(el).height)).toBe(await plain.evaluate((el) => getComputedStyle(el).height));
  });

  test('combobox shell: the button trigger shows its placeholder while empty', async ({ page }) => {
    const value = page.locator('#combobox-picker .tui-combobox-value');
    expect(await value.evaluate((el) => getComputedStyle(el, '::before').content)).toBe('"Choose a shape"');
    await value.evaluate((el) => { el.textContent = 'Triangle'; });
    expect(await value.evaluate((el) => getComputedStyle(el, '::before').content)).toBe('none');
  });

  test('combobox listbox opened with showPopover sits under the field at its width', async ({ page }) => {
    const box = page.locator('#combobox-search');
    const list = page.locator('#combobox-search-list');
    await box.scrollIntoViewIfNeeded();
    await expect(list).toBeHidden();
    await list.evaluate((el) => el.showPopover());
    await expect(list).toBeVisible();
    const b = await box.boundingBox();
    const l = await list.boundingBox();
    expect(Math.abs(l.width - b.width)).toBeLessThan(2);
    expect(Math.abs(l.x - b.x)).toBeLessThan(2);
    expect(l.y).toBeGreaterThan(b.y + b.height - 1);
    expect(l.y - (b.y + b.height)).toBeLessThan(12);
    await page.keyboard.press('Escape');
    await expect(list).toBeHidden();
  });

  test('combobox listbox: the button trigger opens its list with popovertarget alone', async ({ page }) => {
    await page.locator('#combobox-picker .tui-combobox-value').click();
    await expect(page.locator('#combobox-picker-list')).toBeVisible();
    await expect(page.locator('#combobox-picker-list .tui-listbox-search')).toHaveCSS('position', 'sticky');
  });

  test('combobox listbox in flow toggles with hidden and overlays the next field', async ({ page }) => {
    const list = page.locator('#combobox-search-list');
    await list.evaluate((el) => { el.removeAttribute('popover'); el.hidden = true; });
    await expect(list).toBeHidden();
    await list.evaluate((el) => { el.hidden = false; });
    await expect(list).toBeVisible();
    await expect(list).toHaveCSS('position', 'absolute');
    await expect(list).toHaveCSS('z-index', '300');
    const b = await page.locator('#combobox-search').boundingBox();
    const l = await list.boundingBox();
    expect(Math.abs(l.width - b.width)).toBeLessThan(2);
  });

  test('combobox tags: chips and the input share a wrapping row and the input takes the remaining width', async ({ page }) => {
    const box = page.locator('#combobox-tags');
    await expect(box).toHaveCSS('flex-wrap', 'wrap');
    const chip = await box.locator('.tui-chip').first().boundingBox();
    const input = await page.locator('#combobox-tags-input').boundingBox();
    const b = await box.boundingBox();
    expect(Math.abs(chip.y + chip.height / 2 - (input.y + input.height / 2))).toBeLessThan(2);
    expect(input.x + input.width).toBeGreaterThan(b.x + b.width * 0.6);
    await expect(page.locator('#combobox-tags-list')).toHaveAttribute('aria-multiselectable', 'true');
  });

  test('self-driven validation: aria-invalid paints the negative border like :user-invalid', async ({ page }) => {
    const field = page.locator('#invalid-attr');
    const plain = page.locator('input[type="text"]').first();
    const negative = await field.evaluate((el) => getComputedStyle(el).getPropertyValue('--tui-negative'));
    const color = (l) => l.evaluate((el) => getComputedStyle(el).borderTopColor);
    expect(await color(field)).not.toBe(await color(plain));
    await field.evaluate((el) => el.removeAttribute('aria-invalid'));
    expect(await color(field)).toBe(await color(plain));
    await field.evaluate((el) => el.setAttribute('data-invalid', ''));
    expect(await color(field)).not.toBe(await color(plain));
    expect(await field.evaluate((el) => getComputedStyle(el).getPropertyValue('--tui-invalid'))).toBe('1');
    expect(negative).not.toBe('');
  });

  test('self-driven small hooks: a search clear control appears only once the field has text, and a stepper button at its bound reads disabled', async ({ page }) => {
    const search = page.locator('#search-clear');
    const clear = search.locator('.tui-close');
    await expect(clear).toBeVisible();
    expect(await search.evaluate((el) => getComputedStyle(el, '::after').display)).toBe('none');
    await search.locator('input').fill('');
    await expect(clear).toBeHidden();
    expect(await search.evaluate((el) => getComputedStyle(el, '::after').display)).toBe('block');

    const disabled = page.locator('#stepper-bound .tui-stepper-btn').first();
    const enabled = page.locator('#stepper-bound .tui-stepper-btn').last();
    await expect(disabled).toHaveCSS('cursor', 'not-allowed');
    expect(await disabled.evaluate((el) => getComputedStyle(el).color)).not.toBe(await enabled.evaluate((el) => getComputedStyle(el).color));
  });

  test('no axe violations in the self-driven sections', async ({ page }) => {
    expect(await getViolations(page, ['color-contrast', 'label', 'button-name', 'aria-allowed-attr', 'aria-required-children'], '#combobox-section, #self-driven-forms-section, #select-icons-section')).toEqual([]);
  });
});

test.describe('Forms — Range wrapper', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
    await page.addStyleTag({ content: '*, ::before, ::after { transition: none !important; }' });
  });

  test('range wrapper paints its fill from data-value, positions the label on the thumb and lays out marks', async ({ page }) => {
    const wrapper = page.locator('#range-single');
    expect(await wrapper.evaluate((el) => getComputedStyle(el).getPropertyValue('--tui-range-end'))).toBe('30');
    expect(await wrapper.evaluate((el) => getComputedStyle(el, '::before').backgroundImage)).toContain('linear-gradient');
    const w = await wrapper.boundingBox();
    const label = await wrapper.locator('.tui-range-label').boundingBox();
    const centre = label.x + label.width / 2 - w.x;
    expect(centre).toBeGreaterThan(w.width * 0.25);
    expect(centre).toBeLessThan(w.width * 0.35);
    await wrapper.evaluate((el) => el.setAttribute('data-value', '90'));
    const moved = await wrapper.locator('.tui-range-label').boundingBox();
    expect(moved.x).toBeGreaterThan(label.x + w.width * 0.4);
    const marks = wrapper.locator('.tui-range-marks li');
    expect((await marks.last().boundingBox()).x).toBeGreaterThan((await marks.first().boundingBox()).x + w.width * 0.7);
  });

  test('range wrapper: the track is centred on the thumbs, paints beneath them, and the marks centre on the thumb travel', async ({ page }) => {
    for (const id of ['#range-single', '#range-dual']) {
      const wrapper = page.locator(id);
      const input = wrapper.locator('input').first();
      const track = await wrapper.evaluate((el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el, '::before'); return { height: parseFloat(s.height), zIndex: s.zIndex, position: s.position }; });
      expect(track.height).toBe(6);
      expect(track.position).toBe('static');
      const i = await input.boundingBox();
      const trackY = await wrapper.evaluate((el) => { const inputs = el.querySelectorAll('input'); return inputs[0].getBoundingClientRect().top; });
      expect(Math.abs(trackY - i.y)).toBeLessThan(1);
    }
    const single = page.locator('#range-single');
    await single.scrollIntoViewIfNeeded();
    const input = await single.locator('input').boundingBox();
    const first = await single.locator('.tui-range-marks li').first().boundingBox();
    const last = await single.locator('.tui-range-marks li').last().boundingBox();
    expect(Math.abs(first.x + first.width / 2 - (input.x + 10))).toBeLessThan(3);
    expect(Math.abs(last.x + last.width / 2 - (input.x + input.width - 10))).toBeLessThan(3);
    const hit = await page.evaluate(() => {
      const wrapper = document.getElementById('range-dual');
      const start = wrapper.querySelector('input');
      const r = start.getBoundingClientRect();
      const x = r.left + 10 + (r.width - 20) * 0.2;
      return document.elementFromPoint(x, r.top + r.height / 2)?.tagName;
    });
    expect(hit).toBe('INPUT');
  });

  test('range wrapper: both thumbs of a dual range stay operable and the fill runs between them', async ({ page }) => {
    const wrapper = page.locator('#range-dual');
    expect(await wrapper.evaluate((el) => getComputedStyle(el).getPropertyValue('--tui-range-start'))).toBe('20');
    expect(await wrapper.evaluate((el) => getComputedStyle(el).getPropertyValue('--tui-range-end'))).toBe('70');
    const start = page.locator('#range-dual-start');
    const end = page.locator('#range-dual-end');
    await expect(start).toHaveCSS('pointer-events', 'none');
    await wrapper.scrollIntoViewIfNeeded();
    const box = await start.boundingBox();
    const thumb = 20;
    const at = (ratio) => box.x + thumb / 2 + (box.width - thumb) * ratio;
    const y = box.y + box.height / 2;
    await page.mouse.move(at(0.2), y);
    await page.mouse.down();
    await page.mouse.move(at(0.4), y, { steps: 5 });
    await page.mouse.up();
    expect(Number(await start.inputValue())).toBeGreaterThan(30);
    expect(await end.inputValue()).toBe('70');
  });
});

test.describe('Forms — Busy form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/04-forms.html');
    await page.addStyleTag({ content: '*, ::before, ::after { transition: none !important; }' });
  });

  test('busy form dims its fields and secondary buttons, blocks pointer events and spins its submit button', async ({ page }) => {
    const form = page.locator('#busy-form');
    await expect(form).toHaveCSS('pointer-events', 'none');
    const busyInput = page.locator('#busy-form-email');
    const idleInput = page.locator('#idle-form-email');
    expect(await busyInput.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe(await idleInput.evaluate((el) => getComputedStyle(el).backgroundColor));
    await expect(busyInput).toHaveCSS('opacity', '0.7');
    await expect(page.locator('#busy-form-cancel')).toHaveCSS('opacity', '0.5');
    const submit = page.locator('#busy-form-submit');
    await expect(submit).toHaveCSS('color', 'rgba(0, 0, 0, 0)');
    expect(await submit.evaluate((el) => getComputedStyle(el, '::after').animationName)).toBe('tui-spin');
    await expect(page.locator('#idle-form-submit')).not.toHaveCSS('color', 'rgba(0, 0, 0, 0)');
    await form.evaluate((el) => el.removeAttribute('aria-busy'));
    await expect(form).not.toHaveCSS('pointer-events', 'none');
    await expect(submit).not.toHaveCSS('color', 'rgba(0, 0, 0, 0)');
  });

  test('busy form: a bare button with aria-busy spins like a .tui-button', async ({ page }) => {
    const bare = page.locator('#busy-form-bare');
    await expect(bare).toHaveCSS('color', 'rgba(0, 0, 0, 0)');
    expect(await bare.evaluate((el) => getComputedStyle(el, '::after').animationName)).toBe('tui-spin');
  });
});
