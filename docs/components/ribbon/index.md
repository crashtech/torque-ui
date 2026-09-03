---
title: Ribbon
section: components
source: src/30-components/ribbon.css
description: "Diagonal corner banner (NEW, SALE, PRO) pinned to a positioned card, toned through --tui-tone."
---

A ribbon is a rotated strip pinned across a corner of its host — a "New" or "Sale" flash on a card. A `.tui-card`, `.tui-panel` or `.tui-segment` that holds one becomes its clipping frame automatically: the framework gives that host `position: relative` and `overflow: hidden`, so no extra markup or utility is needed.

## On a card

By default the ribbon sits in the top end corner: `--tui-spacing-5` from the top, `--tui-ribbon-offset` past the end edge, rotated 45 degrees, with the tone colour behind `--tui-tone-fg` text (brand behind `--tui-text-inverse` when untoned), a small shadow and `z-index: 1` so it paints above the card body.

{% include demo.html file="basic.html" %}

## Tones

`.tui-ribbon-success`, `.tui-ribbon-error`, `.tui-ribbon-warning` and `.tui-ribbon-neutral` are aliases of the generic [tone classes](/ui/foundations/tone/); `.tui-tone-info` or any other `.tui-tone-*` works the same way.

{% include demo.html file="tones.html" %}

## Positions

`.tui-ribbon-top-right` restates the default corner explicitly; `.tui-ribbon-bottom-left` mirrors it to the bottom start corner with the opposite rotation. The offset is symmetric, so both use the same `--tui-ribbon-offset`.

{% include demo.html file="positions.html" %}

| Class | Effect |
|---|---|
| `.tui-ribbon` | Absolute, rotated 45°, uppercase bold `--tui-text-xs`, tone or brand background |
| `.tui-ribbon-top-right` | Top end corner (the default, made explicit) |
| `.tui-ribbon-bottom-left` | Bottom start corner, rotated −45° |
| `.tui-ribbon-success` / `-error` / `-warning` / `-neutral` | Tone aliases |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-ribbon-offset` | `-2.75rem` | How far past the corner the strip starts; it is declared on `.tui-ribbon` itself, so override it on the ribbon element, not on the card |

The default is tuned to the 10rem band width, so the strip crosses the corner with its ends hidden.

Related: [Card](/ui/components/card/) · [Badge](/ui/components/badge/) · [Tag](/ui/components/tag/) · [Tone](/ui/foundations/tone/) · [Overflow](/ui/utilities/overflow/)
