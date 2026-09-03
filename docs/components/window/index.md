---
title: Window
section: components
source: src/30-components/window.css
description: "Desktop-window frame for previews and mockups, plus the in-flow static popover for showing an open menu."
---

A window is a frame that makes any content look like an app: a `--tui-surface-0` box with a border, `--tui-radius-lg` corners and a `--tui-shadow-xl` drop, clipping its content. The title bar carries the title and a working [close](/ui/components/close/) control — no decorative traffic lights — and useful actions go in a `.tui-window-footer` at the bottom. It is for screenshots, hero mockups and documentation — the body inside is whatever you put there. The same file defines `.tui-popover-static`, the popover box rendered in flow for the same purpose.

## Frame

`.tui-window-bar` is a flex row on `--tui-surface-1` with a bottom border: a `.tui-window-title` (`--tui-text-sm`, medium, `--tui-text-2`) and a `.tui-close` shrunk to 1.25rem and pushed to the end edge with an auto margin. `.tui-window-footer` mirrors the bar at the bottom — top border, actions aligned to the end — the place for the buttons that actually do something.

{% include demo.html file="basic.html" %}

## Static popover

`.tui-popover-static` renders the [popover](/ui/interactive/popover/) surface in normal flow, always visible: `position: relative`, `display: block`, insets cleared, with the same padding, width limits, border, radius and `--tui-shadow-lg` as the real one. It is not a `[popover]` and has no invoker — combine it with a [menu](/ui/interactive/menu/) to show an open menu in a mockup. It gets a `--tui-spacing-2` top margin unless it is the first child of its parent.

{% include demo.html file="popover-static.html" %}

## Mockup

Put a static popover inside a window body to picture a whole interaction without a single interactive element.

{% include demo.html file="mockup.html" %}

| Class | Effect |
|---|---|
| `.tui-window` | Bordered, `--tui-radius-lg`, `--tui-shadow-xl` frame, `overflow: hidden` |
| `.tui-window-bar` | Title bar: flex row, `--tui-surface-1`, bottom border; a child `.tui-close` is 1.25rem and end-pinned |
| `.tui-window-title` | `--tui-text-sm`, medium, `--tui-text-2` |
| `.tui-window-footer` | Bottom action row on `--tui-surface-1`: top border, end-aligned, `--tui-spacing-2` gap |
| `.tui-popover-static` | Popover surface in flow, always visible, no invoker |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-popover-padding` | `var(--tui-spacing-1)` | Inner padding of `.tui-popover-static` |
| `--tui-popover-min-inline-size` | `12rem` | Minimum width |
| `--tui-popover-max-inline-size` | `24rem` | Maximum width |
| `--tui-popover-bg` | `var(--tui-surface-0)` | Background |
| `--tui-popover-border` | `var(--tui-border)` | Border colour |

These are the same hooks the live `[popover].tui-popover` reads, so one override styles both.

Related: [Popover](/ui/interactive/popover/) · [Menu](/ui/interactive/menu/) · [Card](/ui/components/card/) · [Hero](/ui/layout/hero/)
