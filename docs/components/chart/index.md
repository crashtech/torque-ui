---
title: Chart
section: components
source: src/30-components/chart.css
description: "Frame and legend for hand-authored SVG charts, colored through the .tui-chart-N series utilities."
---

Torque UI ships no charting library. `.tui-chart` frames an SVG you author yourself so it fills its container, and `.tui-legend` describes its series; color comes from the `.tui-chart-1` to `.tui-chart-6` utilities, which set `color` so `fill="currentColor"` and `stroke="currentColor"` pick up the [chart palette](/ui/foundations/chart-palette/) in both schemes.

## Frame

`.tui-chart` is a block whose child `<svg>` becomes `display: block` at 100% inline size with automatic height, so a `viewBox` alone sizes the drawing. Wrap each series in a `<g class="tui-chart-N">` and give its shapes `fill="currentColor"`. `.tui-chart-measure` is a muted color for a single-measure bar that must not read as a series.

{% include demo.html file="bars.html" %}

## Legend

`.tui-legend` is a wrapping flex row in `--tui-text-xs` and `--tui-text-2`. Each `.tui-legend-item` is a swatch and a label; the `.tui-legend-swatch` is a 0.625rem rounded square filled with `currentcolor`, so the same `.tui-chart-N` class on the item colors the swatch while the label that follows it is held at the legend's text color.

{% include demo.html file="legend.html" %}

| Class | Effect |
|---|---|
| `.tui-chart` | Block frame; the child SVG fills the width |
| `.tui-legend` | Wrapping row of legend items |
| `.tui-legend-item` | Inline-flex swatch + label pair |
| `.tui-legend-swatch` | Square filled with `currentcolor` |
| `.tui-chart-0` … `.tui-chart-6` | Series colors, from the [Colors](/ui/utilities/colors/) utilities |
| `.tui-chart-measure` | Muted single-measure color |
| `.tui-chart-stagger` | On the `<svg>`, a `<g>` or the legend: each child is colored by its `sibling-index()`, for charts with more series than tokens — see [Chart Palette](/ui/foundations/chart-palette/#staggered-series) |

## Aspect ratio

An SVG without an intrinsic height, or one you want to letterbox, can take its shape from the frame: set `--tui-chart-aspect` and the frame reserves that ratio before the SVG loads. Text drawn over a brand-colored shape can use `.tui-text-brand-fg` on the `<text>` or its group — SVG presentation attributes cannot take `var()`, but `currentColor` can.

{% include demo.html file="aspect.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-chart-aspect` | `auto` | `aspect-ratio` of the `.tui-chart` frame |

Related: [Chart Palette](/ui/foundations/chart-palette/) · [Colors](/ui/utilities/colors/) · [Statistic](/ui/components/statistic/) · [Progress](/ui/components/progress/)
