---
title: Carousel
section: interactive
source: src/60-interactive/carousel.css
description: "Scroll-snapping slide track with :target-driven dots, upgraded to native scroll markers and prev/next buttons where the browser has them."
---

`.tui-carousel` wraps a `<ul class="tui-carousel-track">` whose `<li class="tui-carousel-slide">` items scroll-snap horizontally, plus a `<nav class="tui-carousel-dots">` of `<a href="#slide-id">` links that jump the track through `:target`. No radios, no script: swiping, scrolling and the dots all move the same scroll container. Browsers with CSS carousel support replace the dots with native scroll markers and add prev/next buttons automatically.

## Slides and dots

Each slide needs an `id` for its dot to link to; the CSS never references the ids, only `:target`. The track hides its scrollbar, scrolls smoothly and clips to the carousel's `--tui-carousel-radius`. The dot whose slide is `:target` turns `--tui-carousel-dot-active` and scales up; on first paint nothing is targeted, so the first dot is active by default. That highlight is generated for the first ten slides — navigation itself has no limit.

{% include demo.html file="basic.html" %}

| Class | Effect |
|---|---|
| `.tui-carousel` | Positioned wrapper, rounded by `--tui-carousel-radius` |
| `.tui-carousel-track` | Flex list, `overflow: auto hidden`, `scroll-snap-type: x mandatory`, hidden scrollbar, `--tui-carousel-gap` between slides |
| `.tui-carousel-slide` | Full-width slide (`flex: 0 0 100%`), snaps to its start |
| `.tui-carousel-dots` | Centred flex row of dots with `--tui-spacing-3` block padding |
| `.tui-carousel-dot` | `--tui-carousel-dot-size` circle in `--tui-border`; `--tui-border-strong` on hover, active colour and `scale: 1.2` for the targeted slide |

## Gap and radius

Set `--tui-carousel-gap` for a peek of space between slides and `--tui-carousel-radius` for the corner radius; both are read from the carousel, so an inline style or a wrapper rule is enough.

{% include demo.html file="gap.html" %}

## Native scroll markers

Where the browser supports `::scroll-marker`, the `.tui-carousel-dots` nav is hidden and the track grows a `::scroll-marker-group` after it: one marker per slide, styled like the dots, with `:target-current` lighting the visible slide. `::scroll-button(inline-start)` and `::scroll-button(inline-end)` appear over the track edges as translucent ‹ and › buttons. Nothing changes in your markup — keep the dots for everyone else.

> **Browser note.** CSS carousels (`::scroll-marker`, `::scroll-button()`) are Chrome 135. The whole block sits behind `@supports (selector(::scroll-marker))`; the floor sees the `:target` dots. One Chromium quirk to know: a carousel's native scroll-marker group stays keyboard-reachable even while a modal dialog is open, so avoid a carousel directly behind a modal.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-carousel-radius` | `var(--tui-radius-lg)` | Corner radius of the carousel and its track |
| `--tui-carousel-gap` | `0` | Space between slides |
| `--tui-carousel-dot-size` | `0.75rem` | Diameter of a dot or native marker |
| `--tui-carousel-dot-active` | `var(--tui-brand)` | Colour of the active dot or marker |

Related: [Images](/ui/elements/images/) · [Radius](/ui/foundations/radius/) · [Motion](/ui/foundations/motion/) · [Visual](/ui/utilities/visual/)
