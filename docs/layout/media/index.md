---
title: Media Object
section: layout
source: src/40-layout/patterns.css
description: "A fixed-width figure beside a body that takes the remaining space, for comments, testimonials and list rows."
---

`.tui-media` is a two-column grid: `auto 1fr` with a `--tui-media-gap` between the columns, aligned to the start. The first child — an avatar, an image, an icon — sizes the `auto` column to its own content and needs no class; the `.tui-media-body` beside it takes the rest and, thanks to `min-inline-size: 0`, wraps long text instead of pushing the grid wider. The body owns its rhythm: children lose their block margins and siblings are separated by `--tui-spacing-2`, so a name line over a meta line needs no utilities.

## Basic

An avatar next to a name and a paragraph. The figure aligns with the first line of the body.

{% include demo.html file="basic.html" %}

## Centred figure

`.tui-media-center` switches `align-items` to `center`, for a short body beside a tall figure — a name and a role next to a large avatar.

{% include demo.html file="center.html" %}

## Comment thread

Media objects nest: a reply is another `.tui-media` inside the parent's body, indented with a spacing utility. No new class is involved — this is the composition to reach for before inventing a comment component.

{% include demo.html file="thread.html" %}

| Class | Effect |
|---|---|
| `.tui-media` | `auto 1fr` grid, start-aligned, gap from `--tui-media-gap` |
| `.tui-media-body` | The `1fr` column; `min-inline-size: 0` so text wraps, children margin-reset with a `--tui-spacing-2` rhythm |
| `.tui-media-center` | Aligns the figure with the vertical middle of the body |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-media-gap` | `var(--tui-spacing-4)` | Space between the figure and the body |

Related: [Avatar](/ui/components/avatar/) · [Card](/ui/components/card/) · [List Group](/ui/components/list-group/) · [Level](/ui/layout/level/)
