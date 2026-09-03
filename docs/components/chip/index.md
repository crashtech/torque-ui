---
title: Chip
section: components
source: src/30-components/chip.css
description: "Pill with a hover state for selectable and removable items, toned through --tui-tone and dismissible with the shared close control."
---

A chip is a small pill — `--tui-text-sm`, medium weight, single line, `--tui-radius-full` — for an item the user can act on: a filter, a selected recipient, a removable tag. Unlike a [badge](/ui/components/badge/) it has a hover state. It carries no outer margin: space chips with `gap`.

## Tones

The default chip sits on `--tui-surface-2` with `--tui-text-2` text and a `--tui-border` edge; hover raises the background to `--tui-surface-3`. A tone class tints it through the shared hook: `-soft` background, `-ink` text, `-edge` border. `.tui-chip-primary`, `-success`, `-error`, `-warning` and `-info` are aliases of the generic [tone classes](/ui/foundations/tone/).

{% include demo.html file="tones.html" %}

| Class | Effect |
|---|---|
| `.tui-chip` | Base pill, hover background |
| `.tui-chip-primary` | Brand tone |
| `.tui-chip-success` | Positive tone |
| `.tui-chip-error` | Negative tone |
| `.tui-chip-warning` | Warning tone |
| `.tui-chip-info` | Info tone |

## Dismissible

Append a `.tui-state-input.tui-dismiss` checkbox and a `.tui-close` label as the chip's last children. The chip scales the shared [close control](/ui/components/close/) down to 1rem so it fits the pill's line height, and checking the box hides the chip through `:has()`.

{% include demo.html file="dismissible.html" %}

## Anchor chips

An `<a>` works as a chip for a filter row that navigates. The chip asserts its own colour, so the link colour does not leak in.

{% include demo.html file="anchors.html" %}

Related: [Badge](/ui/components/badge/) · [Tag](/ui/components/tag/) · [Label](/ui/components/label/) · [Close](/ui/components/close/) · [Tone](/ui/foundations/tone/)
