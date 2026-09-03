---
title: Container Queries
section: layout
source: src/40-layout/container-queries.css
description: "Opt a box in as a size container named tui and let cards, statistics and empty states adapt to it instead of the viewport."
---

`.tui-container-query` makes any element an inline-size container named `tui`. A few components carry `@container tui` rules, so the same markup tightens itself when it lands in a narrow column — a sidebar, a board card, a grid cell — even on a wide screen. Write your own `@container tui (inline-size < …)` rules for anything else, and note that the wrapper, not the component, is what you add the class to.

## Card

Inside a container narrower than 20rem, `.tui-card-body` drops from `--tui-spacing-6` to `--tui-spacing-4` padding and the card's radius steps down from `--tui-radius-lg` to `--tui-radius-md`. The first wrapper below is forced to 16rem; the second fills the column.

Every wrapper below is resizable — drag its bottom-end corner and watch the component respond to the wrapper, not the window.

{% include demo.html file="card.html" %}

## Statistic

Below 18rem the `.tui-statistic` root font size becomes `--tui-text-lg`, so the value and its label scale down together.

{% include demo.html file="statistic.html" %}

## Empty state

Below 16rem a `.tui-empty` loses most of its padding, its `.tui-empty-icon` shrinks from 3rem to 2rem, and the `.tui-empty-title` drops to the base size — the same idea as `.tui-empty-sm`, applied automatically.

{% include demo.html file="empty.html" %}

| Selector | Effect |
|---|---|
| `.tui-container-query` | `container-type: inline-size; container-name: tui` |
| `@container tui (inline-size < 20rem)` | Card body padding `--tui-spacing-4`, card radius `--tui-radius-md` |
| `@container tui (inline-size < 18rem)` | Statistic font size `--tui-text-lg` |
| `@container tui (inline-size < 16rem)` | Empty state: tighter padding, 2rem icon, base-size title |

[`.tui-level-collapsible`](/ui/layout/level/) is the same idea applied to a toolbar, with its own unnamed container.

Related: [Card](/ui/components/card/) · [Statistic](/ui/components/statistic/) · [Empty State](/ui/components/empty/) · [Level](/ui/layout/level/) · [Grid](/ui/layout/grid/)
