---
title: Grid
section: layout
source: src/40-layout/grid.css
description: "A 12-column grid with span classes, a full-width span, and responsive equal-column templates from 480, 768 and 1024px."
---

`.tui-grid` is `display: grid` with twelve equal columns and a `--tui-spacing-4` gap. Children take a width with `.tui-col-span-N`; the responsive `.tui-grid-{sm,md,lg}-N` classes replace the twelve-column template with N equal columns from a breakpoint up, which is the usual way to lay out cards. Like every layout in the framework it spaces children with `gap`, so the children need no margins.

## Column spans

`.tui-col-span-1` to `.tui-col-span-12` set `grid-column: span N`. Spans that add up to twelve fill a row; anything left over wraps to the next one.

{% include demo.html file="spans.html" %}

## Full-width rows

`.tui-col-span-full` is `grid-column: 1 / -1`: it always spans the whole grid, whatever the template — including the responsive ones, where twelve would be wrong.

{% include demo.html file="full.html" %}

## Auto-fit template

`.tui-grid-auto` names no column count at all: it fits as many columns of at least `--tui-grid-min` (12rem by default) as the container allows, stretches them evenly, and re-wraps on its own as the container grows or shrinks — the no-breakpoint way to lay out a wall of cards or links.

{% include demo.html file="auto.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-grid-min` | `12rem` | Narrowest a column may get before the grid drops a column |
| `--tui-grid-max-cols` | `6` | Most columns the grid will ever lay, however wide the container |
| `--tui-grid-gap` | `--tui-spacing-4` | The grid's gap; part of the column arithmetic, so set this instead of `.tui-gap-*` |

## Responsive templates

`.tui-grid-md-3` replaces the twelve-column template with three equal columns from 768px, so cards need no span at all at that width. The prefixes are `sm` (480px), `md` (768px) and `lg` (1024px), each with 2, 3, 4, 6 or 12 columns, and they combine: `.tui-grid-sm-2 .tui-grid-lg-4` is two columns from 480px and four from 1024px. Below the smallest breakpoint you use, a grid carrying any responsive class stacks to a single column, so a card grid needs nothing else to work on a phone. Only a bare `.tui-grid` keeps twelve columns at every width.

{% include demo.html file="responsive.html" %}

| Class | Effect |
|---|---|
| `.tui-grid` | `display: grid`, `repeat(12, 1fr)`, `gap: var(--tui-spacing-4)`; items get a zero minimum size, so an unbreakable child cannot widen the grid past its container |
| `.tui-grid-auto` | Auto-fitting template: as many `--tui-grid-min` columns as fit, capped at `--tui-grid-max-cols` |
| `.tui-col-span-1`, `.tui-col-span-2`, `.tui-col-span-3`, `.tui-col-span-4`, `.tui-col-span-5`, `.tui-col-span-6`, `.tui-col-span-7`, `.tui-col-span-8`, `.tui-col-span-9`, `.tui-col-span-10`, `.tui-col-span-11`, `.tui-col-span-12` | `grid-column: span N` |
| `.tui-col-span-full` | `grid-column: 1 / -1` |
| `.tui-grid-sm-2`, `.tui-grid-sm-3`, `.tui-grid-sm-4`, `.tui-grid-sm-6`, `.tui-grid-sm-12` | 2 / 3 / 4 / 6 / 12 equal columns from 480px |
| `.tui-grid-md-2`, `.tui-grid-md-3`, `.tui-grid-md-4`, `.tui-grid-md-6`, `.tui-grid-md-12` | 2 / 3 / 4 / 6 / 12 equal columns from 768px |
| `.tui-grid-lg-2`, `.tui-grid-lg-3`, `.tui-grid-lg-4`, `.tui-grid-lg-6`, `.tui-grid-lg-12` | 2 / 3 / 4 / 6 / 12 equal columns from 1024px |

An item with no span in a bare twelve-column `.tui-grid` occupies one column, which is rarely what you want; give every child a span, or use a responsive template, which stacks below its breakpoint. To change the gap on a fixed or responsive template, use a `.tui-gap-*` utility from the [Spacing](/ui/utilities/spacing/) page; on `.tui-grid-auto`, set `--tui-grid-gap` instead — the gap is part of its column arithmetic, and a utility would change the gap without re-solving the columns.

Related: [Container](/ui/layout/container/) · [Flexbox](/ui/layout/flexbox/) · [Card](/ui/components/card/) · [Spacing](/ui/utilities/spacing/) · [Display](/ui/utilities/display/)
