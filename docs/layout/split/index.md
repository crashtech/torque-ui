---
title: Split Pane
section: layout
source: src/40-layout/split.css
description: "Two side-by-side panes with a native resize handle on the first, no JavaScript involved."
---

`.tui-split` is a bordered, rounded `auto 1fr` grid of a fixed height. Each `.tui-split-pane` scrolls on its own and has `--tui-spacing-4` padding; the first pane carries `resize: horizontal`, so the reader drags its bottom-end corner to change the split, and the second pane takes whatever is left.

## Basic

The first pane is capped at 80% of the width and cannot go below `--tui-split-min`, and it draws the divider as its end border. The native resize handle is pointer-only: there is no keyboard way to move the divider, so do not put anything behind it that a keyboard user must reach by resizing.

{% include demo.html file="basic.html" %}

## Sizing

The height comes from `--tui-split-block-size` and the minimum pane width from `--tui-split-min`; set either on the split.

{% include demo.html file="sizing.html" %}

| Class | Effect |
|---|---|
| `.tui-split` | Bordered `auto 1fr` grid of `--tui-split-block-size` |
| `.tui-split-pane` | Padded, self-scrolling pane; the first one is resizable |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-split-block-size` | `24rem` | Height of the split |
| `--tui-split-min` | `8rem` | Minimum width of the first pane (the second may shrink to zero) |

Related: [App Shell](/ui/layout/shell/) · [Board](/ui/layout/board/) · [Overflow](/ui/utilities/overflow/) · [Tree](/ui/components/tree/)
