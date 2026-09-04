---
title: Menu
section: interactive
source: src/60-interactive/menu.css
js: self-driven
description: "Vertical list of actions — links, buttons and dividers — usually mounted inside a popover."
---

`.tui-menu` is a grid column of `.tui-menu-item` rows, each a link or a button, with optional `.tui-menu-divider` rules between groups. It is only the list: mount it inside a [popover](/ui/interactive/popover/) to get a dropdown that opens from a `popovertarget` button, or inside a `.tui-popover-static` box from the [Window](/ui/components/window/) component to show it open in flow.

## Dropdown menu

Combine `.tui-popover` and `.tui-menu` on a `[popover]` element placed immediately after its invoker button. Escape and clicking outside close it, and Tab from the button moves into the first item — all native popover behaviour. There is no arrow-key roving between items; that would need script.

{% include demo.html file="dropdown.html" %}

## Items and dividers

A `.tui-menu-item` is a flex row starting at the inline edge with a small gap, so an icon before the label needs no extra markup. It resets the button defaults (`font: inherit`, no background, no border, start-aligned text) so `<a>` and `<button>` rows look identical, and paints `--tui-menu-item-hover-bg` on hover and keyboard focus. `.tui-menu-divider` is an `<hr>` with `--tui-spacing-1` block margin; at the first or last position that margin is dropped so the divider hugs the popover padding.

{% include demo.html file="static.html" %}

| Class | Effect |
|---|---|
| `.tui-menu` | Grid container, one row per item |
| `.tui-menu-item` | Link or button row: `--tui-text-1`, `--tui-radius-sm`, hover and focus background |
| `.tui-menu-divider` | 1px `--tui-border` rule between item groups; no outer margin at the first or last position |

## Current and disabled items <span class="tui-badge">self-driven JS</span>

`aria-current` (or `data-selected`, `.tui-selected`) on an item paints the hover background and a medium weight, for the page or option the menu is currently on; `aria-disabled="true"`, `data-disabled`, `.tui-disabled` or a real `disabled` button dims the item and removes its hover. Arrow-key roving between items needs no CSS: `.tui-menu-item:focus-visible` already paints the focused row, so a script that moves focus gets the highlight for free.

{% include demo.html file="states.html" %}

| Selector | Effect |
|---|---|
| `.tui-menu-item:is([aria-current], [data-selected], .tui-selected)` | Hover background held, medium weight |
| `.tui-menu-item:is([aria-disabled="true"], [data-disabled], .tui-disabled, :disabled)` | `--tui-text-3`, `not-allowed` cursor, no hover |

## Checkbox and radio items <span class="tui-badge">self-driven JS</span>

An item with `role="menuitemcheckbox"` or `role="menuitemradio"` reserves a slot at its start for a tick or a dot that shows while `aria-checked="true"`; the script flips the attribute, exclusively for a radio group.

{% include demo.html file="check.html" %}

## Descriptions

Wrap the label in `.tui-menu-item-text` and add a `.tui-menu-item-desc` line under it for a secondary description in `--tui-text-xs` and `--tui-text-3`. The same pair exists on a [listbox](/ui/interactive/listbox/) option as `.tui-option-text` / `.tui-option-desc`.

{% include demo.html file="desc.html" %}

| Selector | Effect |
|---|---|
| `.tui-menu-item[role="menuitemcheckbox"]` | Start slot with a tick shown by `aria-checked="true"` |
| `.tui-menu-item[role="menuitemradio"]` | Start slot with a dot shown by `aria-checked="true"` |
| `.tui-menu-item-text` / `.tui-menu-item-desc` | Label column with a small muted description line |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-menu-item-hover-bg` | `var(--tui-surface-2)` | Background of a hovered or focused item |

Related: [Popover](/ui/interactive/popover/) · [Window](/ui/components/window/) · [Buttons](/ui/components/buttons/) · [Navbar](/ui/components/navbar/) · [List Group](/ui/components/list-group/)
