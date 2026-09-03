---
title: Form Table
section: forms
source: src/50-forms/form-table.css
description: "Two-column settings table: a fixed-width label column and a control column, one setting per row."
---

`.tui-form-table` is a `<table>` for settings pages: each row is one setting, with its label in a `<th scope="row">` and its control in the `<td>` beside it. It fills its container, collapses borders, and keeps every row the same shape so a long list of options scans as a list rather than as scattered fields.

## Anatomy

Cells get `--tui-spacing-3` / `--tui-spacing-4` padding, a `--tui-border` rule beneath each row and middle vertical alignment, so a label lines up with its control whatever its height. The `<th>` column is semibold `--tui-text-1` on `--tui-surface-1`, never wraps, and is `--tui-form-table-label` wide; the `<td>` sits on `--tui-surface-0` and any `<input>` in it is capped at the cell's width. Hovering a body row tints its `<td>` to `--tui-surface-1`. Put a `<label for>` in the header cell so clicking the label focuses the control.

{% include demo.html file="basic.html" %}

## Label column width

`--tui-form-table-label` is declared on the table (`--tui-spacing-32` + `--tui-spacing-16` + `--tui-spacing-2`, 12.5rem) and read by every `<th>`. Override it on the table — or any ancestor — for a narrower or wider label column; the control column takes whatever is left.

{% include demo.html file="narrow.html" %}

| Selector | Effect |
|---|---|
| `.tui-form-table` | Full-width, collapsed-border table |
| `.tui-form-table th` | Label column: semibold, `--tui-surface-1`, `--tui-form-table-label` wide, no wrapping |
| `.tui-form-table td` | Control column on `--tui-surface-0`; inputs capped at `100%` |
| `.tui-form-table tbody tr:hover td` | Row highlight on `--tui-surface-1` |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-form-table-label` | `calc(var(--tui-spacing-32) + var(--tui-spacing-16) + var(--tui-spacing-2))` | Width of the label column |

Related: [Tables](/ui/elements/tables/) · [Form Layout](/ui/forms/form-layout/) · [Key/Value](/ui/components/key-value/) · [Inputs](/ui/forms/inputs/) · [Switch](/ui/forms/switch/)
