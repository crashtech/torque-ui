---
title: Tables
section: elements
source: src/20-elements/tables.css
js: self-driven
description: "Native tables with row rules, a tinted header and hover, plus modifiers for stripes, borders, density, caps headers, scrolling, sticky headers, selectable rows with a count and a select-all box, and sort arrows."
---

A bare `<table>` is full width and collapsed, with `--tui-spacing-4` cell padding, start-aligned, middle-aligned cells, a `--tui-border` rule under every row, a semibold `--tui-surface-1` header and a hover tint on `<tbody>` rows. Eight modifier classes cover the usual variants; none of them changes the markup.

## Default

Cells declare `text-align: start` directly because Chromium's user-agent stylesheet centers `<th>` unless the alignment is set on the cell itself. Row hover is built in — there is no separate hover class.

{% include demo.html file="default.html" %}

## Striped

`.tui-table-striped` paints the `<td>` cells of even `<tbody>` rows with `--tui-surface-2` — a `<th scope="row">` keeps its header surface.

{% include demo.html file="striped.html" %}

## Bordered

`.tui-table-bordered` gives every `<th>` and `<td>` a full 1px `--tui-border` border instead of only the rule underneath.

{% include demo.html file="bordered.html" %}

## Density

`.tui-table-compact` tightens the cell padding to `--tui-spacing-2`; `.tui-table-comfortable` loosens it to `--tui-spacing-5 / --tui-spacing-6`. Cell text is trimmed to its cap height, so the padding is the true distance from the rule to the letters. A cell whose direct child is a control — a button, badge, tag, chip, label, avatar, key cap, image or field — keeps its leading instead, so the control cannot overflow the row; middle alignment keeps controls and text cells centered on the same axis.

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

## Selection count

A `.tui-table-selectable` table counts its highlighted rows in the `tui-table-selected` counter, and a `.tui-table-count` element prints the number. A `hidden` `<tbody>` in a selectable table collapses with `visibility: collapse` instead of `display: none`, so its checked rows stay counted. This demo's second row group is hidden and holds one of the two checked rows.

> **Why the `<thead>` comes after the rows.** A counter is read in document order, so `.tui-table-count` only sees the rows written before it. A count in a `<thead>` that precedes the rows would always print 0. The table layout draws a table's first header group on top wherever it sits in the markup, so writing the `<thead>` after the last `<tbody>` keeps the count on top and correct. Keep that `<thead>` to its single header row and put the count in one of its cells, here a `.tui-badge` in the first column. Pagination and other controls go after the table. The usual alternatives don't work. `order` does nothing inside a table, because row groups are not flex items. A `<tfoot>` set to `display: table-header-group` falls to the bottom once a real `<thead>` exists, since only the first header group goes on top. The HTML spec wants `<thead>` before `<tbody>`, so a validator flags this shape, but every parser keeps the element where it was written. If you want valid HTML, put the count at the bottom instead, in a `<tfoot>` or in an element right after the table. An element outside a wrapper around the table never sees the counter.

{% include demo.html file="count.html" %}

## Select-all box <span class="tui-badge">self-driven JS</span>

The header box is a [cycle](/ui/interactive/cycle/) whose labels are `.tui-checkbox-input` boxes. Each click moves it to the next radio. A checked `.tui-table-select-visible` radio selects every row of the row groups that are not `hidden` and draws a ring. A checked `.tui-table-select-all` radio selects every row and draws a tick. Any other radio leaves the rows to their own inputs, and the box shows a dash once one of them is checked. In the two select modes, CSS paints the row checkboxes checked and locks them against the pointer, but their real state stays untouched underneath. The form submits the radio's value (`visible` or `all`), and the server should read it before the row inputs. Going back to the first radio brings back the rows picked by hand. The radios, their order and their count come from the markup alone. Give each radio an `aria-label` that names its own state, since the visible label belongs to the next one. The script here only swaps the `hidden` page. Pick a row on page 2, go back to page 1 and cycle the box to see the count follow.

{% include demo.html file="select-all.html" %}

## Script-driven rows <span class="tui-badge">self-driven JS</span>

A `<tbody>` row takes the selectable highlight from `aria-selected="true"` (or `data-selected`, `.tui-selected`) as well as from a checked input. A row carrying `aria-expanded` gets a pointer cursor and a disclosure glyph in its first cell that turns when true; the `.tui-table-detail` row after it, tinted and padded, is the script's to show with `hidden`.

{% include demo.html file="rows.html" %}

## Sort indicators

A `<th>` with `aria-sort="ascending"` or `"descending"` appends an up or down arrow through `::after`; any `aria-sort` value also sets a default cursor on the cell. The arrow only reflects state — sorting itself is the application's job: a link, a form submission, or a script.

{% include demo.html file="sortable.html" %}

### Sort buttons <span class="tui-badge">self-driven JS</span>

Script-driven sorting puts a real `<button>` in the header cell so the header is operable. Inside a `th[aria-sort]` the button inherits the cell's type, color and alignment and drops its own border and background; only the pointer cursor gives it away. The script flips `aria-sort` and re-orders the rows.

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
| `.tui-table-selectable` | Highlights `<tbody>` rows containing a checked input, counts them, and collapses a `hidden` `<tbody>` instead of removing it |
| `.tui-table-count` | Prints the selected-row count; it must come after the rows, so write the `<thead>` holding it after the last `<tbody>` |
| `.tui-table-select-visible` | Radio in the header cycle: while checked, every row of the shown row groups is selected |
| `.tui-table-select-all` | Radio in the header cycle: while checked, every row is selected |
| `th[aria-sort="ascending"]` / `"descending"` | Appends an up or down arrow |
| `tbody tr:is([aria-selected="true"], [data-selected], .tui-selected)` | The selectable highlight, set by attribute |
| `tbody tr[aria-expanded]` / `.tui-table-detail` | Expander row with a turning glyph, and the tinted detail row it reveals |
| `th[aria-sort] > button` | Header-styled sort button: inherits font and color, no border or background |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-table-sticky-bg` | `var(--tui-surface-1)` | Background of the pinned header cells in a `.tui-table-sticky` table |

Related: [Form Table](/ui/forms/form-table/) · [Checkbox](/ui/forms/checkbox/) · [Cycle](/ui/interactive/cycle/) · [Overflow](/ui/utilities/overflow/) · [Z-index](/ui/foundations/z-index/)
