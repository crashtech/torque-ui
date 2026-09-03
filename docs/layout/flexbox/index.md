---
title: Flexbox
section: layout
source: src/40-layout/flexbox.css
description: "Flex container, direction, wrap, item growth, alignment and justification helpers."
---

The flexbox helpers turn any element into a flex container and control its direction, wrapping, alignment and how its items grow. They are the glue between components: a toolbar, an inline row of badges, a form footer. Spacing between items comes from the `.tui-gap-*` utilities on the [Spacing](/ui/utilities/spacing/) page, never from margins on the items.

## Containers and direction

`.tui-flex` is `display: flex`; `.tui-flex-inline` is `display: inline-flex` for a row that should sit inside a line of text. `.tui-flex-row` and `.tui-flex-col` set the direction — `row` is the default, so `.tui-flex-row` is only needed to override a column set higher up.

{% include demo.html file="direction.html" %}

## Wrapping

`.tui-flex-wrap` lets items break onto new lines when the row is full; `.tui-flex-nowrap` forces a single line, which then shrinks or overflows.

{% include demo.html file="wrap.html" %}

## Growing and shrinking

`.tui-flex-1` (`flex: 1 1 0%`) makes items share the free space equally regardless of their content; `.tui-flex-auto` (`1 1 auto`) grows from the content size, so a longer item ends up wider; `.tui-flex-initial` (`0 1 auto`) can shrink but not grow; `.tui-flex-none` is rigid.

{% include demo.html file="grow.html" %}

## Aligning items

`.tui-items-start`, `-center`, `-end`, `-stretch` and `-baseline` set `align-items`, the cross-axis alignment — vertical in a row. `-baseline` lines up the text of items with different padding or font sizes.

{% include demo.html file="items.html" %}

## Justifying content

`.tui-justify-start`, `-center`, `-end`, `-between`, `-around` and `-evenly` set `justify-content`, the main-axis distribution.

{% include demo.html file="justify.html" %}

| Class | CSS |
|---|---|
| `.tui-flex` | `display: flex` |
| `.tui-flex-inline` | `display: inline-flex` |
| `.tui-flex-row` / `.tui-flex-col` | `flex-direction: row` / `column` |
| `.tui-flex-wrap` / `.tui-flex-nowrap` | `flex-wrap: wrap` / `nowrap` |
| `.tui-flex-1` | `flex: 1 1 0%` |
| `.tui-flex-auto` | `flex: 1 1 auto` |
| `.tui-flex-initial` | `flex: 0 1 auto` |
| `.tui-flex-none` | `flex: none` |
| `.tui-items-start` | `align-items: flex-start` |
| `.tui-items-center` | `align-items: center` |
| `.tui-items-end` | `align-items: flex-end` |
| `.tui-items-stretch` | `align-items: stretch` |
| `.tui-items-baseline` | `align-items: baseline` |
| `.tui-justify-start` | `justify-content: flex-start` |
| `.tui-justify-center` | `justify-content: center` |
| `.tui-justify-end` | `justify-content: flex-end` |
| `.tui-justify-between` | `justify-content: space-between` |
| `.tui-justify-around` | `justify-content: space-around` |
| `.tui-justify-evenly` | `justify-content: space-evenly` |

Related: [Grid](/ui/layout/grid/) · [Stack](/ui/layout/stack/) · [Level](/ui/layout/level/) · [Spacing](/ui/utilities/spacing/) · [Display](/ui/utilities/display/)
