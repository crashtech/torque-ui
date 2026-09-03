---
title: Tables
section: elements
source: src/20-elements/tables.css
js: self-driven
description: "Native tables with row rules, a tinted header and hover, plus modifiers for stripes, borders, density, caps headers, scrolling, sticky headers, selectable rows and sort arrows."
---

A bare `<table>` is full width and collapsed, with `--tui-spacing-4` cell padding, start-aligned, middle-aligned cells, a `--tui-border` rule under every row, a semibold `--tui-surface-1` header and a hover tint on `<tbody>` rows. Eight modifier classes cover the usual variants; none of them changes the markup.

## Default

Cells declare `text-align: start` directly because Chromium's user-agent stylesheet centres `<th>` unless the alignment is set on the cell itself. Row hover is built in — there is no separate hover class.

{% include demo.html file="default.html" %}

## Striped

`.tui-table-striped` paints the `<td>` cells of even `<tbody>` rows with `--tui-surface-2` — a `<th scope="row">` keeps its header surface.

{% include demo.html file="striped.html" %}

## Bordered

`.tui-table-bordered` gives every `<th>` and `<td>` a full 1px `--tui-border` border instead of only the rule underneath.

{% include demo.html file="bordered.html" %}

## Density

`.tui-table-compact` tightens the cell padding to `--tui-spacing-2`; `.tui-table-comfortable` loosens it to `--tui-spacing-5 / --tui-spacing-6`. Cell text is trimmed to its cap height, so the padding is the true distance from the rule to the letters. A cell whose direct child is a control — a button, badge, tag, chip, label, avatar, key cap, image or field — keeps its leading instead, so the control cannot overflow the row; middle alignment keeps controls and text cells centred on the same axis.

{% include demo.html file="density.html" %}

## Caps header

`.tui-table-caps` turns the header row into the dense data-table look: `--tui-text-xs`, uppercase, `--tui-tracking-wide`, `--tui-text-3`. It combines with any other modifier.

{% include demo.html file="caps.html" %}

## Responsive wrapper

Wrap a wide table in `.tui-table-responsive` and it scrolls horizontally inside its own box instead of breaking the page. The wrapper is `overflow-x: auto` capped at `max-inline-size: 100%`; add `.tui-text-nowrap` to the table if its cells should not wrap.

{% include demo.html file="responsive.html" %}

## Sticky header

`.tui-table-sticky` pins every `<thead>` cell to the top of the nearest scroll container with `position: sticky`, at `--tui-z-sticky`, on `--tui-table-sticky-bg`. The scroll container can be a fixed-height wrapper with `.tui-overflow-y-auto` or, as in this frame, the page itself. Scroll the frame to see the header stay put.

{% include demo.html file="sticky.html" frame=true height="16rem" %}

## Selectable rows

`.tui-table-selectable` highlights any `<tbody>` row that contains a checked input with `--tui-brand-soft`. It works with a native checkbox or a `.tui-checkbox-input`, and needs no per-row class.

{% include demo.html file="selectable.html" %}

## Sort indicators

A `<th>` with `aria-sort="ascending"` or `"descending"` appends an up or down arrow through `::after`; any `aria-sort` value also sets a default cursor on the cell. The arrow only reflects state — sorting itself is the application's job: a link, a form submission, or a script.

{% include demo.html file="sortable.html" %}

### Sort buttons <span class="tui-badge">self-driven JS</span>

Script-driven sorting puts a real `<button>` in the header cell so the header is operable. Inside a `th[aria-sort]` the button inherits the cell's type, colour and alignment and drops its own border and background; only the pointer cursor gives it away. The script flips `aria-sort` and re-orders the rows.

{% include demo.html file="sort-button.html" %}

| Class / attribute | Effect |
|---|---|
| `.tui-table-striped` | `<td>` cells of even `<tbody>` rows on `--tui-surface-2` |
| `.tui-table-bordered` | 1px border on every cell |
| `.tui-table-compact` | `--tui-spacing-2` cell padding |
| `.tui-table-comfortable` | `--tui-spacing-5 / --tui-spacing-6` cell padding |
| `.tui-table-caps` | Small uppercase tracked header in `--tui-text-3` |
| `.tui-table-responsive` | Horizontal scroll wrapper (goes on a parent, not the table) |
| `.tui-table-sticky` | `<thead>` cells stick to the top of the nearest scroll container |
| `.tui-table-selectable` | Highlights `<tbody>` rows containing a checked input |
| `th[aria-sort="ascending"]` / `"descending"` | Appends an up or down arrow |
| `th[aria-sort] > button` | Header-styled sort button: inherits font and colour, no border or background |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-table-sticky-bg` | `var(--tui-surface-1)` | Background of the pinned header cells in a `.tui-table-sticky` table |

Related: [Form Table](/ui/forms/form-table/) · [Checkbox](/ui/forms/checkbox/) · [Overflow](/ui/utilities/overflow/) · [Z-index](/ui/foundations/z-index/)
