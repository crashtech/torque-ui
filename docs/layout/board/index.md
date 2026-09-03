---
title: Board
section: layout
source: src/40-layout/board.css
description: "A horizontally scrolling row of fixed-width columns with sticky headers and stacked cards — a static kanban."
---

`.tui-board` is a flex row of `.tui-board-column`s, top-aligned, with a `--tui-spacing-3` gap, that scrolls horizontally when the columns outgrow it. Each column is a bordered `--tui-surface-1` panel holding a sticky `.tui-board-header` and a `.tui-board-body` that stacks its cards with a `--tui-spacing-2` gap. The board is CSS only: moving a card between columns is application logic.

## Columns of cards

Columns are `--tui-board-column-inline-size` (16rem) wide and never shrink, so the board scrolls sideways as soon as it runs out of room. The header is small uppercase tracked text in `--tui-text-2`, laid out as a `space-between` row so a count badge sits at its end, and it inherits the column background so cards slide under it cleanly.

{% include demo.html file="basic.html" %}

## Capped column height

Set `--tui-board-column-block-size` — on a column, or on the board to reach every column through inheritance — and the column body scrolls vertically while the header stays pinned at the top.

{% include demo.html file="scrolling.html" %}

| Class | Effect |
|---|---|
| `.tui-board` | Horizontally scrolling flex row, `--tui-spacing-3` gap, `--tui-spacing-2` bottom padding clearing the scrollbar |
| `.tui-board-column` | Fixed-width bordered `--tui-surface-1` column |
| `.tui-board-header` | Sticky uppercase header row |
| `.tui-board-body` | Vertical stack of cards, `--tui-spacing-2` gap, scrolls when capped |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-board-column-inline-size` | `16rem` | Width of every column |
| `--tui-board-column-block-size` | `none` | Maximum height of a column; the body scrolls beyond it |

Related: [Card](/ui/components/card/) · [Badge](/ui/components/badge/) · [Split Pane](/ui/layout/split/) · [Scroll](/ui/utilities/scroll/)
