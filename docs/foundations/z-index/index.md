---
title: Z-index
section: foundations
source: src/00-tokens/04-zindex.css
description: "Four stacking tiers so sticky chrome, modals, tooltips and toasts never fight over who is on top."
---

Torque UI stacks its floating surfaces on four named tiers instead of ad-hoc numbers. Sticky headers and tabs sit lowest, modal dialogs above them, tooltips above those, and toasts on top of everything so a notification is never hidden behind a dialog. The gaps between tiers are deliberate: your own overlays can slot in between without touching the framework.

## The tiers

| Token | Value | Used by |
|---|---|---|
| `--tui-z-sticky` | 200 | Sticky table headers, sticky tabs, the shell header, `.tui-sticky-top`, `.tui-fab`, `.tui-reading-progress` |
| `--tui-z-dropdown` | 300 | An in-flow `.tui-listbox` under a combobox (a `[popover]` list needs none: it is in the top layer) |
| `--tui-z-modal` | 500 | `.tui-backdrop`, the scrim for an overlay of your own; `<dialog>` and `[popover]` surfaces need none, they are painted in the browser's top layer above every `z-index` |
| `--tui-z-tooltip` | 700 | `.tui-tooltip` |
| `--tui-z-toast` | 800 | `.tui-toast` and `.tui-toast-stack` |

The modal, offcanvas, sheet, menu and popover components are all top-layer surfaces, so they need no tier; the tokens matter for the components that position themselves without it — sticky chrome, the FAB, the tooltip, the toast — and for any overlay you build yourself.

## Stacking order

Four positioned boxes, each on a different tier. Source order would paint them left to right; the tokens paint them sticky to toast, bottom to top.

{% include demo.html file="stack.html" %}

Related: [Modal](/ui/interactive/modal/) · [Tooltip](/ui/interactive/tooltip/) · [Toast](/ui/components/toast/) · [App Shell](/ui/layout/shell/)
