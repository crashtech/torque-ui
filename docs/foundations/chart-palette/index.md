---
title: Chart Palette
section: foundations
source: src/00-tokens/06-chart.css
description: "Six colour-blind-safe series colours and one muted measure colour for hand-authored SVG charts."
---

The chart tokens are a categorical palette for the [Chart](/ui/components/chart/) component's hand-written SVGs: six hue families — blue, orange, teal, magenta, olive, purple — chosen so adjacent series stay apart under deuteranopia and protanopia, plus a muted single-measure colour. Each is a `light-dark()` pair whose dark value is lifted for contrast on dark surfaces.

## Series colours

Apply a series through the `.tui-chart-1` … `.tui-chart-6` utilities, which set `color`, and draw with `fill="currentColor"` or `stroke="currentColor"`. The same class on a legend item colours its swatch, so chart and legend can never disagree.

{% include demo.html file="series.html" %}

| Token | Light | Dark | Utility |
|---|---|---|---|
| `--tui-chart-1` | `#2563eb` | `#60a5fa` | `.tui-chart-1` |
| `--tui-chart-2` | `#ea580c` | `#fb923c` | `.tui-chart-2` |
| `--tui-chart-3` | `#0d9488` | `#2dd4bf` | `.tui-chart-3` |
| `--tui-chart-4` | `#db2777` | `#f472b6` | `.tui-chart-4` |
| `--tui-chart-5` | `#65a30d` | `#a3e635` | `.tui-chart-5` |
| `--tui-chart-6` | `#7c3aed` | `#a78bfa` | `.tui-chart-6` |

## The measure colour

A single-measure bar is not a series: it must read as "the value", never as "series #n" next to a legend. `--tui-chart-measure` is a muted neutral — neutral 70% into black (light) / 60% into white (dark) — for exactly that case, applied with `.tui-chart-measure`.

{% include demo.html file="measure.html" %}

| Token | Value | Utility |
|---|---|---|
| `--tui-chart-measure` | Muted neutral, theme-aware | `.tui-chart-measure` |

Related: [Chart](/ui/components/chart/) · [Colors](/ui/foundations/colors/) · [Color Utilities](/ui/utilities/colors/) · [Statistic](/ui/components/statistic/)
