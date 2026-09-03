---
title: Colors
section: utilities
source: src/70-utilities/colors.css
description: "Text, background, border, shadow, radius, opacity and chart-series utilities that read the colour tokens directly."
---

These utilities paint one property from one token — a text colour, a background, a border colour, a shadow, a radius, an opacity. They live in the `tui.utilities` layer, so any of them beats a component's own declaration regardless of specificity, with no `!important`. The tokens they read are documented under [Colors](/ui/foundations/colors/), [Radius](/ui/foundations/radius/) and [Chart Palette](/ui/foundations/chart-palette/).

## Text colours

Three hierarchy levels, the six semantic colours, and the inverse text colour for dark fills.

{% include demo.html file="text.html" %}

| Class | Effect |
|---|---|
| `.tui-text-1` | `color: var(--tui-text-1)` — primary text |
| `.tui-text-2` | `color: var(--tui-text-2)` — secondary text |
| `.tui-text-3` | `color: var(--tui-text-3)` — muted text |
| `.tui-text-primary` | `color: var(--tui-brand-ink)` — readable on surfaces in both schemes |
| `.tui-text-positive` | `color: var(--tui-positive-ink)` |
| `.tui-text-negative` | `color: var(--tui-negative-ink)` |
| `.tui-text-warning` | `color: var(--tui-warning-ink)` |
| `.tui-text-info` | `color: var(--tui-info-ink)` |
| `.tui-text-neutral` | `color: var(--tui-neutral-ink)` |
| `.tui-text-inverse` | `color: var(--tui-text-inverse)` — text on a `--tui-text-1` fill |

## Text on solid fills

For text placed over a solid tone fill — a label on a brand bar, a caption in a coloured chip — use the contrast-safe foreground utilities rather than guessing white. `.tui-text-tone-fg` follows whichever [tone](/ui/foundations/tone/) class is in scope.

{% include demo.html file="fills.html" %}

| Class | Effect |
|---|---|
| `.tui-text-brand-fg` | `color: var(--tui-brand-fg)` |
| `.tui-text-positive-fg` | `color: var(--tui-positive-fg)` |
| `.tui-text-negative-fg` | `color: var(--tui-negative-fg)` |
| `.tui-text-warning-fg` | `color: var(--tui-warning-fg)` |
| `.tui-text-info-fg` | `color: var(--tui-info-fg)` |
| `.tui-text-tone-fg` | `color: var(--tui-tone-fg, var(--tui-text-1))` — the foreground of the current tone |

## Chart series

The chart utilities set `color`, so anything drawn with `currentColor` — SVG `fill` and `stroke`, a legend swatch — takes the series colour. `.tui-chart-measure` is a muted colour for a single-measure bar that must not read as a series. The [Chart](/ui/components/chart/) component and its legend build on these.

{% include demo.html file="chart.html" %}

| Class | Effect |
|---|---|
| `.tui-chart-1` | `color: var(--tui-chart-1)` |
| `.tui-chart-2` | `color: var(--tui-chart-2)` |
| `.tui-chart-3` | `color: var(--tui-chart-3)` |
| `.tui-chart-4` | `color: var(--tui-chart-4)` |
| `.tui-chart-5` | `color: var(--tui-chart-5)` |
| `.tui-chart-6` | `color: var(--tui-chart-6)` |
| `.tui-chart-measure` | `color: var(--tui-chart-measure)` |

## Backgrounds

Solid fills for the brand, the semantic colours and the neutral, a 10% `-light` tint of the brand and semantic ones (built with relative colour syntax from the same token, so it follows the scheme), and the four surface levels.

{% include demo.html file="backgrounds.html" %}

| Class | Effect |
|---|---|
| `.tui-bg-primary` | `background-color: var(--tui-brand)` |
| `.tui-bg-positive` | `background-color: var(--tui-positive)` |
| `.tui-bg-negative` | `background-color: var(--tui-negative)` |
| `.tui-bg-warning` | `background-color: var(--tui-warning)` |
| `.tui-bg-info` | `background-color: var(--tui-info)` |
| `.tui-bg-neutral` | `background-color: var(--tui-neutral)` |
| `.tui-bg-primary-light` | `--tui-brand` at 10% alpha |
| `.tui-bg-positive-light` | `--tui-positive` at 10% alpha |
| `.tui-bg-negative-light` | `--tui-negative` at 10% alpha |
| `.tui-bg-warning-light` | `--tui-warning` at 10% alpha |
| `.tui-bg-info-light` | `--tui-info` at 10% alpha |
| `.tui-bg-surface-0` | `background-color: var(--tui-surface-0)` |
| `.tui-bg-surface-1` | `background-color: var(--tui-surface-1)` |
| `.tui-bg-surface-2` | `background-color: var(--tui-surface-2)` |
| `.tui-bg-surface-3` | `background-color: var(--tui-surface-3)` |

## Gradient

`.tui-bg-gradient` paints the current tone's gradient (`--tui-tone-gradient`, brand by default) with the matching foreground colour. Gradients are flat until the end colour exists: set `--tui-brand-end` on `:root` — or `--tui-positive-end` and friends for the other tones — because the library deliberately leaves the `-end` tokens undeclared. To change one element's gradient, override `--tui-brand-gradient` (or the tone's `-gradient`) on that element instead of its `-end` colour: the `-gradient` tokens resolve where they are declared.

{% include demo.html file="gradient.html" %}

| Class | Effect |
|---|---|
| `.tui-bg-gradient` | `background-color: var(--tui-tone, var(--tui-brand))`, `background-image: var(--tui-tone-gradient, var(--tui-brand-gradient))`, `color: var(--tui-tone-fg, var(--tui-brand-fg))` |

## Borders

The border utilities set only `border-color` or `border-style`; bring the width yourself (a component border, or a `border-width` of your own).

{% include demo.html file="borders.html" %}

| Class | Effect |
|---|---|
| `.tui-border-primary` | `border-color: var(--tui-brand)` |
| `.tui-border-positive` | `border-color: var(--tui-positive)` |
| `.tui-border-negative` | `border-color: var(--tui-negative)` |
| `.tui-border-warning` | `border-color: var(--tui-warning)` |
| `.tui-border-info` | `border-color: var(--tui-info)` |
| `.tui-border-dashed` | `border-style: dashed` |

## Radius

{% include demo.html file="radius.html" %}

| Class | Effect |
|---|---|
| `.tui-rounded-none` | `border-radius: var(--tui-radius-none)` (0) |
| `.tui-rounded-sm` | `border-radius: var(--tui-radius-sm)` (2px) |
| `.tui-rounded-md` | `border-radius: var(--tui-radius-md)` (6px) |
| `.tui-rounded-lg` | `border-radius: var(--tui-radius-lg)` (8px) |
| `.tui-rounded-full` | `border-radius: var(--tui-radius-full)` (pill or circle) |

## Shadows

The four elevation shadows; their colour is a `light-dark()` pair so they stay visible on dark surfaces.

{% include demo.html file="shadows.html" %}

| Class | Effect |
|---|---|
| `.tui-shadow-sm` | `box-shadow: var(--tui-shadow-sm)` |
| `.tui-shadow-md` | `box-shadow: var(--tui-shadow-md)` |
| `.tui-shadow-lg` | `box-shadow: var(--tui-shadow-lg)` |
| `.tui-shadow-xl` | `box-shadow: var(--tui-shadow-xl)` |

## Opacity

{% include demo.html file="opacity.html" %}

| Class | Effect |
|---|---|
| `.tui-opacity-25` | `opacity: 0.25` |
| `.tui-opacity-50` | `opacity: 0.5` |
| `.tui-opacity-75` | `opacity: 0.75` |

Related: [Colors](/ui/foundations/colors/) · [Tone](/ui/foundations/tone/) · [Radius](/ui/foundations/radius/) · [Chart Palette](/ui/foundations/chart-palette/) · [Chart](/ui/components/chart/) · [Text](/ui/utilities/text/)
