---
title: Segment
section: components
source: src/30-components/segment.css
description: "Single padded box with a border and a large radius; a tone class colours the border and adds a matching ring."
---

A segment is the lightest container in the library: one `--tui-spacing-6` padded box on `--tui-surface-0` with a 1px border and `--tui-radius-lg` corners, and no header, footer or shadow. Its direct children have their margins reset and are spaced by `--tui-spacing-6`, so a heading, a paragraph and a button read as one block without utilities. It carries no outer margin — stack segments with a `.tui-stack`.

## Basic

Use a segment where a [card](/ui/components/card/) would be too heavy and a [panel](/ui/components/panel/) has no title to give: a settings group, a summary, a quote.

{% include demo.html file="basic.html" %}

## Tones

The border reads `--tui-tone` (falling back to `--tui-border`) and a 1px `box-shadow` ring reads the same hook (falling back to transparent), so a toned segment gets a 2px coloured edge. `.tui-segment-primary`, `.tui-segment-success` and `.tui-segment-error` are aliases of the generic [tone classes](/ui/foundations/tone/); use `.tui-tone-warning`, `.tui-tone-info` or `.tui-tone-neutral` for the rest. The error tone makes a good danger zone.

{% include demo.html file="tones.html" %}

| Class | Effect |
|---|---|
| `.tui-segment` | `--tui-spacing-6` padding, 1px border, `--tui-radius-lg`, child margins reset with a `--tui-spacing-6` rhythm |
| `.tui-segment-primary` / `-success` / `-error` | Tone aliases: coloured border plus a 1px ring |

Related: [Card](/ui/components/card/) · [Panel](/ui/components/panel/) · [Alert](/ui/components/alert/) · [Stack](/ui/layout/stack/) · [Tone](/ui/foundations/tone/)
