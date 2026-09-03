---
title: Motion
section: foundations
source: src/00-tokens/05-transitions.css
description: "Four durations and three easings shared by every transition, all collapsed to nothing under reduced motion."
---

Every transition and animation in the framework reads its timing from seven tokens: four durations and three easing curves. Components never write a literal `200ms` — buttons, switches, hover lifts and dismiss fades all say `var(--tui-duration-fast)`, so a single `:root` override speeds up or slows down the whole interface.

## Durations and easings

| Token | Value | Used for |
|---|---|---|
| `--tui-duration-fast` | 150ms | Hover and focus colour changes, switch thumbs, dismiss fades, the `.tui-hoverable` lift |
| `--tui-duration-normal` | 250ms | Collapse, offcanvas and modal movement, card and progress transitions, the toast slide-in |
| `--tui-duration-slow` | 350ms | Declared for your own transitions — nothing in the framework reads it |
| `--tui-duration-slower` | 500ms | The `.tui-busy` spinner rotation and the `.tui-status-pulse` dot animation |
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

Related: [Accessibility](/ui/themes/accessibility/) · [Pointer & Orientation](/ui/utilities/pointer-orientation/) · [Card](/ui/components/card/) · [View Transitions](/ui/themes/view-transitions/)
