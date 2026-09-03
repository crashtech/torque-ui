---
title: Key/Value
section: components
source: src/30-components/kv.css
description: "Definition list laid out as label/value rows, or stacked with each label above its value."
---

A key/value list is a `<dl>` for the facts about one thing — a deal's stage and value, an account's plan and renewal date. `dl.tui-kv` turns `dt`/`dd` pairs into aligned rows with no extra markup and no outer margin.

## Rows

`.tui-kv` is a two-column grid, `auto 1fr`, in `--tui-text-sm` with a `--tui-spacing-1` row gap and `--tui-spacing-3` between the columns — rows keep their natural leading, so the small gap reads comfortably. Each `<dt>` is muted (`--tui-text-3`); each `<dd>` is end-aligned, medium weight and wrap-safe, so a long value breaks inside its column instead of widening the list.

{% include demo.html file="rows.html" %}

## Start-aligned values

Values sit at the end of the row by default, which reads well for short figures. `.tui-kv-start` aligns them to the start instead, for prose-like values or when the labels are the thing being scanned.

{% include demo.html file="start.html" %}

## Striped rows

`.tui-kv-striped` drops the grid gaps, pads every cell and paints every other row on `--tui-surface-1`, rounding the first row's top corners, so long lists stay scannable. It combines with `.tui-kv-start`.

{% include demo.html file="striped.html" %}

## Stacked

`.tui-kv-stack` collapses the grid to one column: each label sits above its value on its own leading, values align to the start, and pairs are separated by `--tui-spacing-2` below each `<dd>` — except the last, which keeps the list flush with its container.

{% include demo.html file="stack.html" %}

| Class | Effect |
|---|---|
| `.tui-kv` | Two-column label/value grid |
| `.tui-kv-start` | Values aligned to the start |
| `.tui-kv-striped` | Padded cells, every other row on `--tui-surface-1` |
| `.tui-kv-stack` | One column, label above value |

Related: [Card](/ui/components/card/) · [Panel](/ui/components/panel/) · [Statistic](/ui/components/statistic/) · [Lists](/ui/elements/lists/)
