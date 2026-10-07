---
title: Motion
section: foundations
source: src/00-tokens/05-transitions.css
description: "One base duration, four multiples of it and three easings shared by every transition and animation, all collapsed to nothing under reduced motion."
---

Every transition and animation in the framework reads its timing from nine tokens: six durations and three easing curves. `--tui-duration-normal` is the basis and the other five are multiples of it, and components never write a literal `200ms` — buttons, switches, hover lifts and dismiss fades say `var(--tui-duration-fast)`, spinners and shimmers multiply the base — so overriding `--tui-duration-normal` on `:root` speeds up or slows down the whole interface at once. Each token is read where it is used, so any of them can also be set on a wrapper to retime just that subtree; only the multiples themselves resolve on `:root`.

## Durations and easings

| Token | Value | Used for |
|---|---|---|
| `--tui-duration-normal` | 250ms | The basis. Collapse, offcanvas and modal movement, card and progress transitions, the toast slide-in, every [Animate](/ui/utilities/animate/) entrance; multiplied by the spinner (×3, ×12 under `prefers-reduced-data`), progress stripes and ring (×4), the shimmer (×6) and the stagger step (×0.24) |
| `--tui-duration-faster` | ×0.4 = 100ms | Declared for your own micro-interactions |
| `--tui-duration-fast` | ×0.6 = 150ms | Hover and focus color changes, switch thumbs, dismiss fades, the `.tui-hoverable` lift |
| `--tui-duration-slow` | ×1.4 = 350ms | The `.tui-button-gradient` slide on hover |
| `--tui-duration-slower` | ×2 = 500ms | The `.tui-busy` spinner rotation and the `.tui-status-pulse` dot animation |
| `--tui-duration-slowest` | ×2 = 500ms | The attention animations in [Animate](/ui/utilities/animate/) — one token to retime shake, pulse, bounce, flash, jiggle and tada |
| `--tui-easing-in` | `cubic-bezier(0.4, 0, 1, 1)` | Leaving — accelerates out |
| `--tui-easing-out` | `cubic-bezier(0, 0, 0.2, 1)` | Arriving — decelerates in; the default for most component transitions |
| `--tui-easing-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Movement that starts and ends on screen |

## In use

`.tui-hoverable` on a card lifts it 2px and raises its shadow on hover, transitioning `transform`, `box-shadow`, `color`, `background-color` and `border-color` over `--tui-duration-fast` with `--tui-easing-out`. The rule sits under `@media (hover: hover) and (pointer: fine)` so touch devices never see a stuck hover state. Override a token on a wrapper to feel the difference.

{% include demo.html file="hoverable.html" %}

## Opting out

`.tui-motion-none` stops every transition and animation on an element, everything inside it and their pseudo-elements — the utilities layer sits above every component, so nothing survives it. Use it where a state is known at first paint and must not slide in, or on a region a test screenshots.

## Reduced motion

Under `prefers-reduced-motion: reduce` the [accessibility](/ui/themes/accessibility/) theme cuts every animation and transition to `0.01ms` and sets `scroll-behavior: auto`. That rule lives in the last cascade layer, so it wins over any component's timing — including one you set through these tokens — without `!important`.

Related: [Animate](/ui/utilities/animate/) · [Accessibility](/ui/themes/accessibility/) · [Pointer & Orientation](/ui/utilities/pointer-orientation/) · [Card](/ui/components/card/) · [View Transitions](/ui/themes/view-transitions/)
