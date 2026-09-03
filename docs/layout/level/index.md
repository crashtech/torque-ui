---
title: Level
section: layout
source: src/40-layout/patterns.css
description: "A horizontal bar with a start group and an end group pushed to opposite edges, wrapping or shedding optional items when space runs out."
---

`.tui-level` is a toolbar row: a flex container with `space-between`, vertically centred items, a `--tui-spacing-4` gap and wrapping on. Its two children, `.tui-level-start` and `.tui-level-end`, are themselves centred flex rows with a `--tui-spacing-3` gap, so buttons and text inside them line up without further classes. It suits a list header, a card toolbar or the row above a table.

## Basic

Two direct children, one at each edge. When the row gets too narrow, the end group wraps under the start group.

{% include demo.html file="basic.html" %}

## No wrapping

`.tui-level-nowrap` keeps both groups on a single line; the content shrinks or overflows rather than wrapping.

{% include demo.html file="nowrap.html" %}

## Collapsible

A level cannot know when its end group no longer fits, so `.tui-level-collapsible` makes the level a size container (`container-type: inline-size`), and anything inside it marked `.tui-level-optional` is hidden while the level is narrower than 40rem. The first demo is capped at 24rem, so its optional buttons are gone; the second fills the docs column and keeps them as long as it is at least 40rem wide.

{% include demo.html file="collapsible.html" %}

| Class | Effect |
|---|---|
| `.tui-level` | Wrapping `space-between` row, centred, `--tui-spacing-4` gap |
| `.tui-level-start` / `.tui-level-end` | The two groups; centred rows with a `--tui-spacing-3` gap |
| `.tui-level-nowrap` | Never wraps the groups onto separate rows |
| `.tui-level-collapsible` | Makes the level an inline-size container |
| `.tui-level-optional` | Hidden inside a collapsible level narrower than 40rem |

Related: [Page Header](/ui/layout/page-header/) · [Flexbox](/ui/layout/flexbox/) · [Container Queries](/ui/layout/container-queries/) · [Buttons](/ui/components/buttons/)
