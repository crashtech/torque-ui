---
title: Label
section: components
source: src/30-components/label.css
description: "Inline-block pill with small corners for metadata in running text, toned through --tui-tone; not a form label."
---

`.tui-label` is a small inline-block pill — `--tui-text-sm`, medium weight, `--tui-radius-sm` corners — for a piece of metadata inside running text or a table cell: a plan name, a version, a category. It is **not** a form-field label: a `<label>` inside a `.tui-field` stays a plain element and is documented under [Form Layout](/ui/forms/form-layout/). Labels carry no outer margin; space them with `gap`.

## Tones

The default label sits on `--tui-surface-2` with `--tui-text-2` text. A tone class tints it through the shared hook — `-soft` background, `-ink` text — with no border. `.tui-label-primary`, `-success` and `-error` are aliases of the generic [tone classes](/ui/foundations/tone/); `.tui-label-warning` and `.tui-label-info` are declared in the label file itself and set the same variables.

{% include demo.html file="tones.html" %}

| Class | Effect |
|---|---|
| `.tui-label` | Base pill on `--tui-surface-2` |
| `.tui-label-primary` | Brand tone |
| `.tui-label-success` | Positive tone |
| `.tui-label-error` | Negative tone |
| `.tui-label-warning` | Warning tone |
| `.tui-label-info` | Info tone |

## In running text

Because it is inline-block, a label flows with the sentence around it and keeps its padding without breaking the line box.

{% include demo.html file="inline.html" %}

Related: [Badge](/ui/components/badge/) · [Tag](/ui/components/tag/) · [Chip](/ui/components/chip/) · [Form Layout](/ui/forms/form-layout/) · [Tone](/ui/foundations/tone/)
