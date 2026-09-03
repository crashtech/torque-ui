---
title: Alert
section: components
source: src/30-components/alert.css
description: "Inline banner with a toned border and background, an optional callout layout, an actions row and CSS-only dismissal."
---

An alert is an inline banner for a message that belongs to the page — a save confirmation, a quota warning, a failed import. It carries no outer margin: stack several in a `.tui-stack` or a grid and let `gap` do the spacing.

## Tones

`.tui-alert` alone sits on `--tui-surface-1` with `--tui-text-1` text and a transparent border. A tone class (`.tui-alert-success`, `-error`, `-warning`, `-info`) sets the shared `--tui-tone` hook: the border takes the tone colour, the background its `-bg` value and the text its `-ink` value. Direct children have their margins reset and consecutive children are spaced by `--tui-spacing-3`, so a heading and a paragraph need no utility classes (and must not carry `.tui-m-0`, which would close that gap).

{% include demo.html file="tones.html" %}

| Class | Effect |
|---|---|
| `.tui-alert` | Base banner on `--tui-surface-1`, no visible border |
| `.tui-alert-success` | Positive tone |
| `.tui-alert-error` | Negative tone |
| `.tui-alert-warning` | Warning tone |
| `.tui-alert-info` | Info tone |

The `.tui-alert-*` names are aliases of the generic [tone classes](/ui/foundations/tone/): `.tui-tone-brand` on an alert gives a brand-coloured banner with no dedicated class.

## Callout

Add `.tui-alert-callout` alongside `.tui-alert` for a two-column layout with a 4px accent rule on the start edge instead of the uniform border. The first child is the icon column (a `.tui-icon`, a glyph, an emoji) and is aligned with the first line of text; the second child is the body, whose own children keep a tighter `--tui-spacing-2` rhythm. Without a tone the rule is brand-coloured.

{% include demo.html file="callout.html" %}

## Actions

`.tui-alert-actions` is a wrapping flex row for buttons, spaced by `--tui-spacing-2`. In a plain alert it is the last child; in a callout it goes at the end of the body column.

{% include demo.html file="actions.html" %}

## Dismissible

The shared [close mechanism](/ui/components/close/) applies: append a `.tui-state-input.tui-dismiss` checkbox and a `.tui-close` label as the last two children. The close control shrinks to `--tui-close-size: 1rem`, pinned to the top end corner on the axis of the first text line, and the alert gains end padding so text never runs under it; checking the box hides the whole alert until the page reloads, no JavaScript involved.

{% include demo.html file="dismiss.html" %}

Related: [Toast](/ui/components/toast/) · [Close](/ui/components/close/) · [Buttons](/ui/components/buttons/) · [Tone](/ui/foundations/tone/) · [Stack](/ui/layout/stack/)
