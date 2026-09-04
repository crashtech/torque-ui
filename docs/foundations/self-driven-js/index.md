---
title: Self-driven JS
section: foundations
source: src/60-interactive/_state.css
js: self-driven
description: "The contract for plugging your own script in: which attributes and classes the framework styles, how value hooks read attributes, and what stays script-free."
---

Torque UI ships no script, and the interactions it can get from the platform — tabs, collapse, popovers, dialogs, the rich select — stay script-free. Everything else is *self-driven*: your code owns the behaviour, and the framework already styles every state your code would set. A section marked **self-driven JS** anywhere in these docs follows the contract on this page, so plugging a script in never means writing CSS.

## Boolean states <span class="tui-badge">self-driven JS</span>

A state is expressed in one of three ways, and the framework paints all three: the ARIA attribute assistive technology reads, a `data-*` attribute matched by presence, or a class. The class comes last in every selector list, so it wins at equal specificity; remove a `data-*` attribute to clear it rather than setting it to `"false"`.

| State | ARIA | `data-*` (by presence) | Class | Reads back as |
|---|---|---|---|---|
| Expanded | `aria-expanded="true"` | `data-expanded` | `.tui-expanded` | `--tui-expanded: 1` |
| Selected / current | `aria-selected="true"`, `aria-current` | `data-selected` | `.tui-selected` | `--tui-selected: 1` |
| Active (keyboard highlight) | — | `data-active` | `.tui-active` | `--tui-active: 1` |
| Pressed / checked | `aria-pressed="true"`, `aria-checked="true"` | `data-pressed` | `.tui-pressed` | `--tui-pressed: 1` |
| Invalid | `aria-invalid="true"` | `data-invalid` | `.tui-invalid` | `--tui-invalid: 1` |
| Disabled | `aria-disabled="true"`, `:disabled` | `data-disabled` | `.tui-disabled` | `--tui-disabled: 1` |

Each state is also a registered custom property (`@property`, integer 0 or 1) set on the element by the same selectors, so your own CSS can read `var(--tui-selected)` without repeating the attribute list. The framework consumes the selectors, not the property, so the paint works in every supported browser.

{% include demo.html file="states.html" %}

Components that read these states: [Buttons](/ui/components/buttons/) (pressed, the caret), [Toggle Group](/ui/interactive/toggle-group/), [Tabs](/ui/interactive/tabs/), [Listbox](/ui/interactive/listbox/), [List Group](/ui/components/list-group/), [Menu](/ui/interactive/menu/), [Validation](/ui/forms/validation/) and the [Combobox](/ui/forms/select/).

## Value hooks <span class="tui-badge">self-driven JS</span>

A value the CSS computes from — a progress percentage, a slider position — is one registered number, `--tui-progress-value` or `--tui-range-value`. Where typed `attr()` exists the property is read from the element's attributes: `aria-valuenow` first, then `data-value`, which beats it by source order, while an inline `style` beats both. Elsewhere the property keeps its initial value until you set it directly, which works in every browser.

{% include demo.html file="value.html" %}

> **Browser note.** Typed `attr()` (`attr(name type(<number>))`) is Chrome 133+; the attribute rules sit behind `@supports`, so Safari and Firefox ignore them and need `el.style.setProperty('--tui-progress-value', n)` instead.

## Visibility <span class="tui-badge">self-driven JS</span>

`el.hidden = true` works on every component. The utilities layer carries `[hidden]:not([hidden="until-found"]) { display: none }`, above every component's own `display`, so a script can hide a menu row, a list item, a chip or a tab panel without knowing what the component paints. `hidden="until-found"` is left to the browser, so find-in-page can still reveal it. Filtering a [listbox](/ui/interactive/listbox/) or a [list group](/ui/components/list-group/) is just toggling `hidden` on rows; the empty row appears by CSS when nothing is left.

## Busy and inert <span class="tui-badge">self-driven JS</span>

Two attributes carry loading and blocked states through a subtree. `aria-busy="true"` on a region shows the [busy overlay](/ui/components/busy/) when the region is `.tui-busy`, spins any button it sits on, and puts a [form](/ui/forms/form-layout/) into its submitting look. `inert` removes a subtree from interaction and the accessibility tree but paints nothing on its own, so the framework shows every control and link under it at disabled opacity with a default cursor — a page behind a custom overlay, or a step not yet reached, reads the way it behaves. The card below is a `.tui-busy` form: the first button sets `aria-busy` on it (overlay, dimmed fields, spinning submit), the second sets `inert`.

{% include demo.html file="inert.html" %}

| Selector | Effect |
|---|---|
| `[inert]` | Default cursor |
| `[inert] :is(button, input, select, textarea, a, .tui-button, .tui-menu-item, .tui-option, .tui-tab, .tui-toggle, .tui-chip, .tui-navbar-item, .tui-calendar-day)` | 50% opacity, no shadow, default cursor |

## Surfaces <span class="tui-badge">self-driven JS</span>

Open and close surfaces are native: a `[popover]` opens from `popovertarget` or `showPopover()`, a `<dialog>` from `commandfor` or `showModal()`; Escape, light-dismiss, the top layer and anchor positioning come with them. Nothing depends on that choice — a [combobox listbox](/ui/forms/select/) without `popover` sits in flow under its field and toggles with `hidden`, and any surface styled here takes the same classes either way.

| Selector | Effect |
|---|---|
| `[hidden]:not([hidden="until-found"])` | `display: none` above every component |
| `:is([aria-expanded="true"], [data-expanded], .tui-expanded)` | Sets `--tui-expanded: 1`; turns a `.tui-caret` inside |
| `:is([aria-selected="true"], [aria-current], [data-selected], .tui-selected)` | Sets `--tui-selected: 1` |
| `:is([data-active], .tui-active)` | Sets `--tui-active: 1` |
| `:is([aria-pressed="true"], [aria-checked="true"], [data-pressed], .tui-pressed)` | Sets `--tui-pressed: 1` |
| `:is([aria-invalid="true"], [data-invalid], .tui-invalid)` | Sets `--tui-invalid: 1` |
| `:is([aria-disabled="true"], [data-disabled], .tui-disabled, :disabled)` | Sets `--tui-disabled: 1` |

Related: [State Inputs](/ui/foundations/state-inputs/) · [Select](/ui/forms/select/) · [Listbox](/ui/interactive/listbox/) · [Browser Support](/ui/getting-started/browser-support/)
