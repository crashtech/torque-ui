---
title: Showcase
section: components
source: src/30-components/showcase.css
description: "A media cell beside a body of heading, copy and a footer pinned to the bottom, for feature tours and product pages."
---

A showcase is the feature block of a landing page: an image, illustration or code sample on one side, a heading with a paragraph or two on the other, and a call to action that sits on the bottom edge no matter how long the copy runs. It is layout only — put `.tui-card` on the same element for the frame, or leave it bare inside a section of your own.

## Anatomy

`.tui-showcase` is a two-column grid from 768px up and a single column below it, where the media always lands on top. `.tui-showcase-media` centers an `img` or `svg` in a padded cell on `--tui-surface-1`; `.tui-showcase-body` is a padded flex column with the usual heading and paragraph rhythm; `.tui-showcase-footer` is a wrapping row of actions pushed to the bottom of the body by an auto margin.

{% include demo.html file="base.html" %}

| Class | Effect |
|---|---|
| `.tui-showcase` | Two-column grid at 768px and up, stacked below; clips to the card radius |
| `.tui-showcase-media` | Padded, centered cell on `--tui-showcase-media-bg` |
| `.tui-showcase-body` | Padded flex column, `--tui-spacing-4` child rhythm |
| `.tui-showcase-footer` | Wrapping action row pinned to the body's bottom edge |
| `.tui-showcase-reverse` | Body first at wide widths; the stack order is unchanged |
| `.tui-showcase-stack` | Media above body at every width |

## Code as media

A `pre` inside the media cell is treated as a panel: the cell drops its padding and the block fills it edge to edge, taking the padding on itself.

{% include demo.html file="code.html" %}

## Alternating sides

Feature tours alternate the media from side to side. `.tui-showcase-reverse` swaps the columns at wide widths only, so the markup stays media-first and narrow screens keep every image above its copy. Stack the showcases with a `.tui-stack` and let `gap` space them.

{% include demo.html file="reverse.html" %}

## A row of showcases

Add `.tui-showcase-stack` to keep the media above the body at every width, then lay the cards out with a grid. The body row absorbs the spare height in each card, so the footers line up across the row however uneven the copy is.

{% include demo.html file="grid.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-showcase-columns` | `1fr 1fr` | Column ratio at wide widths, e.g. `2fr 3fr` for a narrower media cell |
| `--tui-showcase-padding` | `var(--tui-spacing-8)` | Padding of both cells |
| `--tui-showcase-media-bg` | `var(--tui-surface-1)` | Background of the media cell |

Related: [Card](/ui/components/card/) · [Hero](/ui/layout/hero/) · [Media Object](/ui/layout/media/) · [Stack](/ui/layout/stack/) · [Grid](/ui/layout/grid/)
