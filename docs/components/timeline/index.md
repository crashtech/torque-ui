---
title: Timeline
section: components
source: src/30-components/timeline.css
description: "Vertical list of events on a spine, each with a marker, title, description and time; toned items and a compact log density."
---

A timeline is an unstyled `<ul class="tui-timeline">` with a 2px vertical spine drawn down its start edge. Each `.tui-timeline-item` is a `<li>` padded past the spine, with an absolutely positioned `.tui-timeline-marker` sitting on the line and a `.tui-timeline-content` column beside it. It carries no outer margin and no list bullets; give it a `.tui-max-w-*` so descriptions keep a readable measure.

## Anatomy

The spine is a `::before` pseudo-element centred at 0.75rem from the start — the axis of the markers, inset 0.5rem from top and bottom, in `--tui-timeline-line` (falling back to `--tui-border`). Items pad `--tui-spacing-8` at the start and `--tui-spacing-6` at the bottom (none on the last). The marker is a 1.5rem circle on `--tui-surface-0` with a 2px `--tui-border-strong` border, offset so it centres on the title's first line (title size × `--tui-leading-normal`), its content grid-centred in `--tui-text-xs` on a single-height line box, and `z-index: 1` so it covers the line; it can hold a number, a glyph or nothing. Inside the content column, `.tui-timeline-title` is `--tui-text-base` semibold, `.tui-timeline-desc` is `--tui-text-sm` in `--tui-text-2` with `text-wrap: pretty`, and `.tui-timeline-time` is `--tui-text-xs` in `--tui-text-3`; they are separated by a `--tui-spacing-1` gap and have their margins reset, so a `<p>` and a `<time>` need no utilities.

{% include demo.html file="basic.html" %}

## Toned items and spine

The marker's border reads `--tui-tone` and its text `--tui-tone-ink`, so a tone class on an item colours that marker. `.tui-timeline-item-brand`, `.tui-timeline-item-success`, `.tui-timeline-item-error` and `.tui-timeline-item-warning` are aliases of the generic [tone classes](/ui/foundations/tone/); `.tui-tone-info` or `.tui-tone-neutral` on an item work the same way. A `.tui-tone-*` class on the list itself sets `--tui-timeline-line` to the tone's edge colour, tinting the spine.

{% include demo.html file="toned.html" %}

## Compact

`.tui-timeline-compact` is the log density: the spine re-centres at 0.5rem, markers shrink to 1rem with a 0.6rem glyph and re-centre on the smaller title line, items pad `--tui-spacing-6` at the start and `--tui-spacing-3` at the bottom, and titles drop to `--tui-text-sm`.

{% include demo.html file="compact.html" %}

| Class | Effect |
|---|---|
| `.tui-timeline` | Unstyled list with a 2px spine on its start edge |
| `.tui-timeline[class*="tui-tone-"]` | Spine takes the tone's edge colour |
| `.tui-timeline-item` | Positioned row padded past the spine |
| `.tui-timeline-marker` | 1.5rem circle on the spine, border and text from the item's tone |
| `.tui-timeline-content` | Flex column, `--tui-spacing-1` gap |
| `.tui-timeline-title` / `-desc` / `-time` | Base semibold / small `--tui-text-2` / extra-small `--tui-text-3` |
| `.tui-timeline-item-brand` / `-success` / `-error` / `-warning` | Tone aliases for one item |
| `.tui-timeline-compact` | Log density: 1rem markers, tighter padding, small titles |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-timeline-line` | `var(--tui-border)` | Spine colour; set to the tone's edge colour by a tone class on the list |

Related: [Steps](/ui/components/steps/) · [Divider](/ui/components/divider/) · [List Group](/ui/components/list-group/) · [Tone](/ui/foundations/tone/)
