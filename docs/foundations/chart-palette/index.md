---
title: Chart Palette
section: foundations
source: src/00-tokens/06-chart.css
description: "Seven branded series colors rotated from the brand hue, three knobs that shape them, and one muted measure color for hand-authored SVG charts."
---

The chart tokens are a categorical palette for the [Chart](/ui/components/chart/) component's hand-written SVGs, and like every other color they derive from `--tui-brand`. `--tui-chart-0` is the brand pulled toward a pastel point; each later series turns the hue one more step around the OKLCH wheel at the same lightness and chroma, so the whole palette reads as one family of the brand and follows a re-theme without a single hex value.

## Series colors

Apply a series through the `.tui-chart-0` … `.tui-chart-6` utilities, which set `color`, and draw with `fill="currentColor"` or `stroke="currentColor"`. The same class on a legend item colors its swatch, so chart and legend can never disagree.

{% include demo.html file="series.html" %}

| Token | Hue | Utility |
|---|---|---|
| `--tui-chart-0` | The base, pastelized | `.tui-chart-0` |
| `--tui-chart-1` | base + 1 × rotation | `.tui-chart-1` |
| `--tui-chart-2` | base + 2 × rotation | `.tui-chart-2` |
| `--tui-chart-3` | base + 3 × rotation | `.tui-chart-3` |
| `--tui-chart-4` | base + 4 × rotation | `.tui-chart-4` |
| `--tui-chart-5` | base + 5 × rotation | `.tui-chart-5` |
| `--tui-chart-6` | base + 6 × rotation | `.tui-chart-6` |

Every series shares one lightness and chroma, so adjacent series are told apart by hue alone. Order them by importance and, where a reader may not see hue well, add a pattern or a label — a rotated palette cannot promise the color-blind separation a hand-picked one can.

## Staggered series

When a chart has more series than tokens, or you would rather not number them, put `.tui-chart-stagger` on the parent — the `<svg>`, a `<g>`, the `.tui-legend` — and every child takes its color from its position: the first is series 0, and each next sibling turns the hue one more step, without end. It is the same wheel as the fixed classes, so a staggered chart and a `.tui-chart-N` legend agree, and the same `--tui-i` hook as [`.tui-stagger`](/ui/utilities/animate/#stagger) carries the index, so an inline `style="--tui-i: 4"` repins one child. A `.tui-chart-N` or `.tui-chart-measure` class on a child still wins, though the child keeps its slot in the count.

{% include demo.html file="stagger.html" %}

| Class | Effect |
|---|---|
| `.tui-chart-stagger` | Every child gets `--tui-i` from `sibling-index()` and `color` from the wheel at that index |

| Property | Default | Effect |
|---|---|---|
| `--tui-chart-color-stagger` | `var(--tui-chart-rotation)` | Degrees of hue between one sibling and the next; set it on the `.tui-chart-stagger` parent to spread a stacked bar tighter or wider than the palette |
| `--tui-i` | `sibling-index() - 1` | A child's index on the wheel; an inline value overrides it |

## The three knobs

| Property | Default | Effect |
|---|---|---|
| `--tui-chart-base` | `var(--tui-brand)` | The color series 0 starts from and every other series rotates away from |
| `--tui-chart-rotation` | `calc(1560 / 7)` | Degrees of OKLCH hue between one series and the next, as a plain number; the default takes seven series four and a third times around the wheel, so each lands far from its neighbors without the rainbow feel of an even `360 / 7` spread |
| `--tui-chart-pastel` | `0.35` | How far every series is pulled toward the pastel point (OKLCH lightness 0.86, chroma 0.08): `0` keeps the base tone, `1` lands on it |

A tighter rotation — `40`, say — keeps the palette analogous and unmistakably branded; a larger pastel value softens it for area fills. Set the base to a named color to start the wheel somewhere other than the brand:

```css
:root {
  --tui-chart-base: var(--tui-teal);
  --tui-chart-rotation: 40;
  --tui-chart-pastel: 0.5;
}
```

## The measure color

A single-measure bar is not a series: it must read as "the value", never as "series #n" next to a legend. `--tui-chart-measure` is a muted neutral — neutral 70% into black (light) / 60% into white (dark) — for exactly that case, applied with `.tui-chart-measure`.

{% include demo.html file="measure.html" %}

| Token | Value | Utility |
|---|---|---|
| `--tui-chart-measure` | Muted neutral, theme-aware | `.tui-chart-measure` |

The [avatar palette](/ui/foundations/colors/#avatar-palette) rides the same wheel: `--tui-avatar-n` is the hue of series *n* without the pastel pull, darkened for white initials, so both knobs recolor the avatars too.

Related: [Chart](/ui/components/chart/) · [Colors](/ui/foundations/colors/) · [Color Utilities](/ui/utilities/colors/) · [Statistic](/ui/components/statistic/) · [Avatar](/ui/components/avatar/)
