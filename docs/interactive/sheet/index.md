---
title: Sheet
section: interactive
source: src/60-interactive/sheet.css
description: "Non-modal floating surface centred near the top of the viewport — a command palette, global search or quick look — as a native popover."
---

`.tui-sheet` turns a `[popover]` element into a floating panel `--tui-sheet-inset-block` from the top of the viewport, horizontally centred and `--tui-sheet-inline-size` wide. It opens from any `popovertarget` button, closes on Escape or a click outside, and unlike a [modal](/ui/interactive/modal/) it neither traps focus nor makes the page inert. The surface itself is unpadded so a list group can run edge to edge; pad the header yourself.

## Command palette

The sheet is `position: fixed` in the top layer over a `--tui-sheet-backdrop` dim. It is capped at `100dvh` minus twice the block inset and scrolls internally past that. A same-document fragment navigation does not close an open sheet — dismiss it first. The demo runs in its own frame because the sheet covers the viewport it lives in.

{% include demo.html file="search.html" frame=true height="20rem" %}

| Class | Effect |
|---|---|
| `.tui-sheet` | The `[popover]` panel: centred, `--tui-radius-xl`, `--tui-shadow-xl`, `--tui-border` edge, internal scrolling, dimmed `::backdrop` |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-sheet-inline-size` | `54rem` | Panel width (capped to the viewport minus two gutters) |
| `--tui-sheet-inset-block` | `10vh` | Distance from the top of the viewport, and the bottom margin it keeps |
| `--tui-sheet-backdrop` | `rgb(0 0 0 / 0.4)` | `::backdrop` colour |

Related: [Popover](/ui/interactive/popover/) · [Modal](/ui/interactive/modal/) · [Offcanvas](/ui/interactive/offcanvas/) · [Search](/ui/forms/search/) · [Input Group](/ui/forms/input-group/) · [List Group](/ui/components/list-group/)
