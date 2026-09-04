---
title: Listbox
section: interactive
source: src/60-interactive/listbox.css
js: self-driven
description: "Column of options a script selects, highlights and filters — alone as a picker, or as the dropdown of a combobox."
---

`.tui-listbox` is a bordered column of `.tui-option` rows for a `role="listbox"` element. The framework paints the states — selected, active, disabled, multi-select ticks, group labels and the empty row — and your script does the rest: moving `aria-selected`, walking `data-active` with the arrow keys, hiding filtered rows. It works in flow on its own, and becomes the dropdown of a [combobox](/ui/forms/select/) when placed after the field's trigger.

## Options <span class="tui-badge">self-driven JS</span>

A `.tui-option` is a flex row starting at the inline edge, with a tick reserved at the start that appears on a selected row. The framework reads the [self-driven states](/ui/foundations/self-driven-js/): `aria-selected="true"`, `data-selected` or `.tui-selected` for selected (soft brand background, brand ink, tick); `data-active` or `.tui-active` for the keyboard highlight your script moves with the arrow keys (`aria-activedescendant` on the input points at it); `aria-disabled="true"`, `data-disabled` or `.tui-disabled` for a row that cannot be picked. An icon before the text is a `.tui-icon`; no extra class is needed. A `<button>` option looks exactly like an `<li>` one.

{% include demo.html file="states.html" %}

## Multi-select <span class="tui-badge">self-driven JS</span>

With `aria-multiselectable="true"` on the listbox the tick becomes a box, so an unselected row still reads as something the user can tick; the selected row fills it in the tone colour.

{% include demo.html file="multi.html" %}

## Descriptions

Wrap the label in `.tui-option-text` and add a `.tui-option-desc` line under it for a secondary description; a selected row keeps it readable in its own ink.

{% include demo.html file="desc.html" %}

## Groups and empty row <span class="tui-badge">self-driven JS</span>

A `.tui-listbox-group` (`role="group"`, labelled by its `.tui-listbox-group-label`) headlines a run of options. `.tui-listbox-empty` is hidden until a filtering script has hidden every `.tui-option` in the list — then it shows by CSS alone, so "no matches" needs no code of its own. `.tui-listbox-search` is a row pinned to the top of the scrolling list for a filter field that lives inside the dropdown.

{% include demo.html file="groups.html" %}

| Class | Effect |
|---|---|
| `.tui-listbox` | Bordered grid column, `--tui-listbox-padding`, scrolls past `--tui-listbox-max-block-size` |
| `.tui-option` | Row with a reserved tick; hover, active, selected and disabled states |
| `.tui-option:is([aria-selected="true"], [data-selected], .tui-selected)` | Selected: `--tui-option-selected-bg`, tone ink, tick shown |
| `.tui-option:is([data-active], .tui-active)` | Keyboard highlight: `--tui-option-active-bg` |
| `.tui-option:is([aria-disabled="true"], [data-disabled], .tui-disabled)` | `--tui-text-3`, `not-allowed` cursor, no hover |
| `[aria-multiselectable="true"] .tui-option` | Box tick, filled in the tone colour when selected |
| `.tui-option-text` / `.tui-option-desc` | Label column with a small muted description line |
| `.tui-listbox-group` / `.tui-listbox-group-label` | Group container and its small-caps label |
| `.tui-listbox-search` | Sticky top row for a filter field |
| `.tui-listbox-empty` | Shown only when no `.tui-option` in the list is visible |

## What your script does

- Moves `aria-selected` (and the value it mirrors into a hidden input or `<select>`).
- Walks `data-active` with the arrow keys and points `aria-activedescendant` at it.
- Sets `hidden` on options that do not match the filter, and on groups whose options are all hidden.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-listbox-padding` | `var(--tui-spacing-1)` | Inner padding of the list |
| `--tui-listbox-max-block-size` | `20rem` | Height past which the list scrolls |
| `--tui-option-active-bg` | `var(--tui-surface-2)` | Background of a hovered or active row |
| `--tui-option-selected-bg` | `var(--tui-tone-soft, var(--tui-brand-soft))` | Background of a selected row |

Related: [Select](/ui/forms/select/) · [Self-driven JS](/ui/foundations/self-driven-js/) · [Menu](/ui/interactive/menu/) · [List Group](/ui/components/list-group/) · [Popover](/ui/interactive/popover/)
