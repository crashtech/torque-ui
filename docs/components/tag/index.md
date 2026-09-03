---
title: Tag
section: components
source: src/30-components/tag.css
description: "Compact rounded-corner label for categories and keywords, toned through the shared --tui-tone hook."
---

A tag is the categorisation label: an inline-flex box with `--tui-radius-md` corners, `--tui-text-sm` medium text on a single non-wrapping line, and tight `--tui-spacing-0-5` / `--tui-spacing-2` padding. Where a [badge](/ui/components/badge/) is a pill for a count or a state, a tag is squarer and quieter — topics, skills, file types. It has no outer margin: space tags with a flex gap.

## Tones

Untoned, a tag sits on `--tui-surface-2` with `--tui-text-2` text and a `--tui-border` edge. A tone class swaps those for the tone's `-soft`, `-ink` and `-edge` values. `.tui-tag-primary` is set with the other brand aliases in the [tone](/ui/foundations/tone/) utilities; `.tui-tag-success`, `.tui-tag-error`, `.tui-tag-warning` and `.tui-tag-info` are set in the tag's own file, and any generic `.tui-tone-*` (`.tui-tone-neutral`) works too.

{% include demo.html file="tones.html" %}

| Class | Background | Text | Border |
|---|---|---|---|
| `.tui-tag` | `--tui-surface-2` | `--tui-text-2` | `--tui-border` |
| `.tui-tag-primary` | `--tui-brand-soft` | `--tui-brand-ink` | `--tui-brand-edge` |
| `.tui-tag-success` | `--tui-positive-soft` | `--tui-positive-ink` | `--tui-positive-edge` |
| `.tui-tag-error` | `--tui-negative-soft` | `--tui-negative-ink` | `--tui-negative-edge` |
| `.tui-tag-warning` | `--tui-warning-soft` | `--tui-warning-ink` | `--tui-warning-edge` |
| `.tui-tag-info` | `--tui-info-soft` | `--tui-info-ink` | `--tui-info-edge` |

## Icons and counts

A tag is a flex row with a `--tui-spacing-1` gap, so a `.tui-icon` glyph or a count sits beside the text without extra markup. Anchors work as tags for keyword links that navigate.

{% include demo.html file="content.html" %}

Related: [Badge](/ui/components/badge/) · [Chip](/ui/components/chip/) · [Label](/ui/components/label/) · [Tone](/ui/foundations/tone/)
