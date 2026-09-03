---
title: Placeholder
section: components
source: src/30-components/placeholder.css
description: "Shimmering skeleton blocks that stand in for text, images and avatars while content loads."
---

A placeholder is a block that shimmers between `--tui-surface-2` and `--tui-surface-3` so a layout can be drawn before its content arrives — one block per line of text, one circle per avatar. It has no outer margin: lay several out with a `.tui-stack` or a flex gap, exactly as the real content will be.

## Lines

`.tui-placeholder` is `display: block`, fills its container's width, has `--tui-radius-md` corners and a 1rem minimum height; the shimmer is a 200%-wide gradient scrolled across it every 1.5 seconds. Use the width utilities (`.tui-w-75`, `.tui-w-50`) to vary line lengths, and `.tui-placeholder-sm` (0.75rem) or `.tui-placeholder-lg` (1.5rem) for captions and headings. A taller block, such as an image slot, gets an explicit height.

{% include demo.html file="lines.html" %}

## Circle

`.tui-placeholder-circle` swaps the corners for `--tui-radius-full` and sets `aspect-ratio: 1`, so it only needs a width to become a round avatar stand-in.

{% include demo.html file="circle.html" %}

## Composed skeleton

Skeletons are most convincing when they mirror the final layout — the same card, the same media row, the same rhythm.

{% include demo.html file="card.html" %}

> **Reduced motion.** The global `prefers-reduced-motion: reduce` rule cuts every animation to a single near-instant iteration, so the shimmer freezes: the block still reads as a placeholder, it just stops moving.

| Class | Effect |
|---|---|
| `.tui-placeholder` | Shimmering block, `--tui-radius-md`, `min-block-size: 1rem` |
| `.tui-placeholder-sm` | `min-block-size: 0.75rem` |
| `.tui-placeholder-lg` | `min-block-size: 1.5rem` |
| `.tui-placeholder-circle` | `--tui-radius-full` and `aspect-ratio: 1` |

Related: [Spinner](/ui/components/spinner/) · [Busy](/ui/components/busy/) · [Avatar](/ui/components/avatar/) · [Card](/ui/components/card/) · [Motion](/ui/foundations/motion/)
