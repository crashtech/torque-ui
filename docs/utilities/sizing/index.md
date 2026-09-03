---
title: Sizing
section: utilities
source: src/70-utilities/sizing.css
description: "Percentage widths, rem-based max widths, full height, min-width zero and a sticky-top helper."
---

Sizing utilities set `inline-size`, `max-inline-size` or `block-size` in one class, all in logical properties so they follow the writing mode. Prefer a `.tui-max-w-*` cap over a fixed width for text containers — it lets a column shrink on narrow screens while stopping at a comfortable measure on wide ones.

## Width

Percentages of the containing block, plus `auto` to undo a width set elsewhere.

{% include demo.html file="width.html" %}

| Class | Effect |
|---|---|
| `.tui-w-25` | `inline-size: 25%` |
| `.tui-w-50` | `inline-size: 50%` |
| `.tui-w-75` | `inline-size: 75%` |
| `.tui-w-100` | `inline-size: 100%` |
| `.tui-w-auto` | `inline-size: auto` |

## Max width

{% include demo.html file="max-width.html" %}

| Class | Effect |
|---|---|
| `.tui-max-w-xs` | `max-inline-size: 20rem` |
| `.tui-max-w-sm` | `max-inline-size: 24rem` |
| `.tui-max-w-md` | `max-inline-size: 28rem` |
| `.tui-max-w-lg` | `max-inline-size: 32rem` |
| `.tui-max-w-xl` | `max-inline-size: 36rem` |
| `.tui-max-w-full` | `max-inline-size: 100%` |

## Min width zero

A flex or grid item defaults to `min-inline-size: auto`, so a long unbreakable string inside it (a URL, a file name with `.tui-text-ellipsis`) forces the item wider than its track. `.tui-min-w-0` lets the item shrink below its content so the truncation can happen.

{% include demo.html file="min-width.html" %}

| Class | Effect |
|---|---|
| `.tui-min-w-0` | `min-inline-size: 0` |

## Full height

`.tui-h-full` fills the block size of the parent — the parent must have a definite height for it to mean anything, such as a grid row or a fixed-height panel.

{% include demo.html file="height.html" %}

| Class | Effect |
|---|---|
| `.tui-h-full` | `block-size: 100%` |

## Sticky top

`.tui-sticky-top` pins an element to the top of its nearest scroll container at `--tui-z-sticky` — a table header, a toolbar, a section label. It sets no background, so add one (`.tui-bg-surface-0`) or content scrolls through it. The demo runs in its own frame so the frame is the scroll container.

{% include demo.html file="sticky.html" frame=true height="14rem" %}

| Class | Effect |
|---|---|
| `.tui-sticky-top` | `position: sticky; inset-block-start: 0; z-index: var(--tui-z-sticky)` |

Related: [Container](/ui/layout/container/) · [Flexbox](/ui/layout/flexbox/) · [Grid](/ui/layout/grid/) · [Spacing](/ui/utilities/spacing/) · [Text](/ui/utilities/text/) · [Z-index](/ui/foundations/z-index/)
