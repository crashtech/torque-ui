---
title: Bottom Navigation
section: components
source: src/30-components/bottom-nav.css
description: "A row of equal icon-and-label items pinned to the bottom of the viewport, the current one marked by aria-current."
---

`.tui-bottom-nav` pins a `<nav>` to the bottom of the viewport above sticky chrome, with `env(safe-area-inset-bottom)` under it for phones with a home indicator. Each `.tui-bottom-nav-item` — a link or a button — takes an equal share of the width and stacks a 1.5rem `.tui-icon` over a small label; `aria-current` (or `data-selected`, `.tui-selected`) paints the current one in the tone colour. Add `.tui-bottom-nav-static` to show it in flow, as below.

## Items

{% include demo.html file="basic.html" %}

| Class | Effect |
|---|---|
| `.tui-bottom-nav` | Fixed to the bottom edge, `--tui-bottom-nav-bg`, top rule, `--tui-z-sticky`, safe-area padding |
| `.tui-bottom-nav-static` | In flow instead of fixed |
| `.tui-bottom-nav-item` | Equal-width column of icon and `--tui-text-xs` label; link or button |
| `.tui-bottom-nav-item:is([aria-current], [data-selected], .tui-selected)` | Tone colour |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-bottom-nav-bg` | `var(--tui-surface-0)` | Bar background |

Related: [Navbar](/ui/components/navbar/) · [Tabs](/ui/interactive/tabs/) · [Icons](/ui/elements/icons/) · [App Shell](/ui/layout/shell/)
