---
title: Badge
section: components
source: src/30-components/badge.css
description: "Rounded pill for counts, versions and states, toned through the shared --tui-tone hook."
---

A badge is a small rounded pill — semibold, `--tui-text-sm`, single line — for a count, a version number or a state next to the thing it describes. It carries no outer margin: space badges with `gap`, a `.tui-stack`, or the `.tui-gap-*` utilities.

## Tones

The default badge sits on `--tui-surface-3` with `--tui-text-2` text. A tone class tints it: the background becomes the tone's `-soft` value, the text its `-ink` value and the border its `-edge` value, so every tone stays readable on both schemes.

{% include demo.html file="tones.html" %}

| Class | Background | Text |
|---|---|---|
| `.tui-badge` | `--tui-surface-3` | `--tui-text-2` |
| `.tui-badge-primary` | `--tui-brand-soft` | `--tui-brand-ink` |
| `.tui-badge-success` | `--tui-positive-soft` | `--tui-positive-ink` |
| `.tui-badge-error` | `--tui-negative-soft` | `--tui-negative-ink` |
| `.tui-badge-warning` | `--tui-warning-soft` | `--tui-warning-ink` |
| `.tui-badge-info` | `--tui-info-soft` | `--tui-info-ink` |

The `.tui-badge-*` names are aliases of the generic [tone classes](/ui/foundations/tone/): `.tui-tone-success` on a badge does exactly what `.tui-badge-success` does.

## Solid

Add `.tui-badge-solid` for the inverse pill — a solid tone background with the auto-picked contrast foreground (`--tui-tone-fg`). Without a tone it falls back to the brand colour; `.tui-tone-neutral` gives a solid grey.

{% include demo.html file="solid.html" %}

## Icons and counts

A badge is an inline flex row with a small gap, so an icon or a count sits next to the text without extra markup. Use `.tui-icon` for the glyph and it scales with the badge's font size.

{% include demo.html file="content.html" %}

## Inside a list group

A badge that is a direct child of a `.tui-list-item` is pushed to the end of the row automatically — the usual "unread count" layout needs no utility class.

{% include demo.html file="list-group.html" %}

Related: [Tag](/ui/components/tag/) · [Chip](/ui/components/chip/) · [Label](/ui/components/label/) · [Status](/ui/components/status/) · [Tone](/ui/foundations/tone/)
