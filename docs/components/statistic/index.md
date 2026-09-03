---
title: Statistic
section: components
source: src/30-components/statistic.css
description: "Bordered tile with a large value, a small label and an optional coloured delta line for dashboards."
---

A statistic is a bordered `--tui-surface-0` tile — a flex column with a `--tui-spacing-3` gap and `--tui-spacing-4` padding — that shows one number big. Put the `.tui-statistic-label` and `.tui-statistic-value` in whichever order reads best, and add a `.tui-statistic-delta` for the change since last period. Tiles carry no outer margin; lay a row of them out with a [grid](/ui/layout/grid/).

## Value and label

`.tui-statistic-value` is `--tui-text-3xl`, bold, `line-height: 1`, in `--tui-text-1`; `.tui-statistic-label` is `--tui-text-sm` in `--tui-text-2`.

{% include demo.html file="basic.html" %}

## Delta

`.tui-statistic-delta` is a `--tui-text-xs` line in `--tui-text-3` for a change indicator. `.tui-statistic-delta-up` colours it `--tui-positive-ink`, `.tui-statistic-delta-down` colours it `--tui-negative-ink`; the arrow glyph is yours to add, so the direction stays visible without colour.

{% include demo.html file="delta.html" %}

## Tones

The value reads `--tui-tone-ink`, so a tone class on the tile recolours the number and nothing else. `.tui-statistic-primary`, `.tui-statistic-success` and `.tui-statistic-error` are aliases of the generic [tone classes](/ui/foundations/tone/); `.tui-tone-warning`, `.tui-tone-info` and the rest work the same way.

{% include demo.html file="tones.html" %}

| Class | Effect |
|---|---|
| `.tui-statistic` | Bordered tile, flex column, `--tui-spacing-3` gap, `--tui-spacing-4` padding, `--tui-radius-lg` |
| `.tui-statistic-value` | `--tui-text-3xl` bold, `--tui-tone-ink` or `--tui-text-1` |
| `.tui-statistic-label` | `--tui-text-sm`, `--tui-text-2` |
| `.tui-statistic-delta` | `--tui-text-xs`, `--tui-text-3` |
| `.tui-statistic-delta-up` / `.tui-statistic-delta-down` | Delta in `--tui-positive-ink` / `--tui-negative-ink` |
| `.tui-statistic-primary` / `-success` / `-error` | Tone aliases for the value colour |

Related: [Card](/ui/components/card/) · [Chart](/ui/components/chart/) · [Key/Value](/ui/components/key-value/) · [Progress](/ui/components/progress/) · [Grid](/ui/layout/grid/)
