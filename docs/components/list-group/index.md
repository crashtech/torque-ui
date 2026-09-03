---
title: List Group
section: components
source: src/30-components/list-group.css
js: self-driven
description: "Bordered stack of rows that can be plain, links, or selectable labels, with a flush variant, a shrinkable body and a drag handle."
---

A list group is a bordered column of `.tui-list-item` rows sharing one `--tui-radius-md` frame. Rows can be `<li>`, `<a>`, `<label>` or `<button>`; the row that acts gets a hover background, and a label row with a hidden checkbox becomes selectable with no JavaScript. It carries no outer margin.

## Rows

`.tui-list-group` is a grid with the list markers and margins removed and a `--tui-border` frame. Each `.tui-list-item` is a flex row with a `--tui-spacing-3` gap and `--tui-list-item-padding`, separated from the previous row by a 1px rule; the first and last rows inherit the frame's corner radius so hover backgrounds never poke out. A `.tui-badge` that is a direct child is pushed to the end of the row automatically.

{% include demo.html file="basic.html" %}

## Links and selectable rows

An `<a>`, `<label>` or `<button>` row gets a pointer cursor and `--tui-list-item-hover-bg` on hover. A label row with a `.tui-state-input` checkbox or radio as a direct child becomes selectable: when the input is checked the row paints `--tui-list-item-active-bg` — the tone's soft colour, brand by default — with the matching ink text for contrast. `.tui-list-item-active` sets the same look statically, for the current page in a navigation list. A `.tui-tone-*` class on a row recolours that selected state to its tone.

{% include demo.html file="selectable.html" %}

| Class | Effect |
|---|---|
| `.tui-list-group` | The bordered frame |
| `.tui-list-item` | One row; interactive elements hover |
| `.tui-list-item-active` | Static active background |
| `.tui-list-item:is([aria-selected="true"], [aria-current], [data-selected], .tui-selected)` | The same active background, set by attribute |
| `.tui-list-item:is([aria-disabled="true"], [data-disabled], .tui-disabled)` | `--tui-text-3`, `not-allowed` cursor, no hover |
| `.tui-list-empty` | Shown only when every other child of the group is `hidden` |
| `.tui-list-item-body` | Shrinkable middle of a row |
| `.tui-list-group-flush` | No side borders or radius |
| `.tui-drag-handle` | Grip glyph with a grab cursor |

## Script-driven rows <span class="tui-badge">self-driven JS</span>

A row your script selects takes `aria-selected="true"`, `aria-current` or `data-selected` (or `.tui-selected`) for the active background, and `aria-disabled="true"` or `data-disabled` for a dimmed, unclickable row. Filtering is `hidden` on rows: a `.tui-list-empty` row stays hidden until nothing else in the group is visible, then shows by CSS alone.

{% include demo.html file="script.html" %}

## Row body and drag handle

`.tui-list-item-body` is the shrinkable middle of a row: it takes the remaining width and allows itself to shrink below its content, so a long value ellipsizes instead of pushing trailing controls out. `.tui-drag-handle` is the grip for sortable rows — `--tui-text-3`, a grab cursor, and a `⠿` glyph when the element is empty; the reordering itself is the app's job.

{% include demo.html file="body-handle.html" %}

## Flush

`.tui-list-group-flush` drops the side borders and the radius for a list that already sits inside a bordered container. Placed directly after a `.tui-card-header` or a `.tui-panel-header` it also drops its top rule, so the header's own rule is the only line.

{% include demo.html file="flush.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-list-item-padding` | `var(--tui-spacing-3) var(--tui-spacing-4)` | Padding of every row |
| `--tui-list-item-bg` | `var(--tui-surface-0)` | Row background |
| `--tui-list-item-hover-bg` | `var(--tui-surface-1)` | Background of a link, label or button row on hover |
| `--tui-list-item-active-bg` | `var(--tui-tone-soft, var(--tui-brand-soft))` | Background of a checked or `.tui-list-item-active` row |

Related: [Badge](/ui/components/badge/) · [Card](/ui/components/card/) · [Panel](/ui/components/panel/) · [Menu](/ui/interactive/menu/) · [State Inputs](/ui/foundations/state-inputs/) · [Lists](/ui/elements/lists/)
