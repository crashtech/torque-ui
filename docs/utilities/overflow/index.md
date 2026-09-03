---
title: Overflow
section: utilities
source: src/70-utilities/overflow.css
description: "Overflow utilities for both axes together or one at a time — visible, hidden, scroll and auto."
---

Twelve classes covering `overflow`, `overflow-x` and `overflow-y` with the four keywords. `auto` is the everyday choice: scrollbars only when content actually overflows. Setting any non-`visible` overflow also makes the element a scroll container, which drops the automatic `min-inline-size: auto` / `min-block-size: auto` of a flex or grid child — so `.tui-overflow-y-auto` on a panel is often what makes an inner scrolling region work at all.

## Both axes

{% include demo.html file="both.html" %}

| Class | Effect |
|---|---|
| `.tui-overflow-visible` | `overflow: visible` |
| `.tui-overflow-hidden` | `overflow: hidden` |
| `.tui-overflow-scroll` | `overflow: scroll` |
| `.tui-overflow-auto` | `overflow: auto` |

## One axis

Setting one axis to `visible` while the other is `hidden`, `scroll` or `auto` is not possible in CSS — the browser computes the `visible` axis to `auto`. In practice the per-axis utilities are for horizontally scrolling tables and toolbars (`.tui-overflow-x-auto`) and vertically scrolling lists (`.tui-overflow-y-auto`).

{% include demo.html file="axis.html" %}

| Class | Effect |
|---|---|
| `.tui-overflow-x-visible` | `overflow-x: visible` |
| `.tui-overflow-x-hidden` | `overflow-x: hidden` |
| `.tui-overflow-x-scroll` | `overflow-x: scroll` |
| `.tui-overflow-x-auto` | `overflow-x: auto` |
| `.tui-overflow-y-visible` | `overflow-y: visible` |
| `.tui-overflow-y-hidden` | `overflow-y: hidden` |
| `.tui-overflow-y-scroll` | `overflow-y: scroll` |
| `.tui-overflow-y-auto` | `overflow-y: auto` |

Related: [Sizing](/ui/utilities/sizing/) · [Text](/ui/utilities/text/) · [Tables](/ui/elements/tables/) · [Split Pane](/ui/layout/split/) · [App Shell](/ui/layout/shell/)
