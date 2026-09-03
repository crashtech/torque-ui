---
title: Pointer & Orientation
section: utilities
source: src/70-utilities/pointer-orientation.css
description: "Hover affordances only for precise pointers, bigger tap targets on touch, orientation-aware flex direction and aspect-ratio boxes."
---

These utilities react to the device rather than the viewport width: whether the pointer can hover, whether it is a finger, and which way the screen is turned. They are progressive — on a device the media query does not match, the class simply does nothing — plus a small set of `aspect-ratio` boxes.

## Hoverable

`.tui-hoverable` lifts the element by 2px and adds `--tui-shadow-md` on hover, with a `--tui-duration-fast` transition — but only under `(hover: hover) and (pointer: fine)`, so a touch screen never shows a hover state stuck on after a tap. Cards and tiles that link somewhere are the usual candidates.

{% include demo.html file="hoverable.html" %}

| Class | Effect |
|---|---|
| `.tui-hoverable` | On precise pointers: `translateY(-2px)` and `--tui-shadow-md` on hover |

## Tap target

`.tui-tap-target` enforces a minimum 44px square (`--tui-spacing-10` plus `--tui-spacing-1`) on coarse pointers, so a small icon button or a close control is comfortably tappable on a phone while staying compact under a mouse. Open this page on a touch device to see the buttons grow.

{% include demo.html file="tap-target.html" %}

| Class | Effect |
|---|---|
| `.tui-tap-target` | On coarse pointers: `min-inline-size` and `min-block-size` of `--tui-tap-target` |

## Orientation

`.tui-portrait-stack` sets `flex-direction: column` while the screen is taller than it is wide; `.tui-landscape-row` sets `flex-direction: row` while it is wider. Put them on a flex container to switch a two-pane layout between stacked and side by side without a width breakpoint — rotate a phone or tablet to see it.

{% include demo.html file="orientation.html" %}

| Class | Effect |
|---|---|
| `.tui-portrait-stack` | `flex-direction: column` in portrait orientation |
| `.tui-landscape-row` | `flex-direction: row` in landscape orientation |

## Aspect ratio

An `aspect-ratio` box reserves the right amount of space before its media loads and keeps thumbnails uniform. Pair with `.tui-img-cover` from [Visual](/ui/utilities/visual/) for the image inside.

{% include demo.html file="ratio.html" %}

| Class | Effect |
|---|---|
| `.tui-ratio-16-9` | `aspect-ratio: 16 / 9` |
| `.tui-ratio-4-3` | `aspect-ratio: 4 / 3` |
| `.tui-ratio-1-1` | `aspect-ratio: 1 / 1` |
| `.tui-ratio-21-9` | `aspect-ratio: 21 / 9` |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-tap-target` | `calc(var(--tui-spacing-10) + var(--tui-spacing-1))` (44px) | Minimum size a `.tui-tap-target` takes on coarse pointers |

Related: [Visual](/ui/utilities/visual/) · [Card](/ui/components/card/) · [Buttons](/ui/components/buttons/) · [Flexbox](/ui/layout/flexbox/) · [Container Queries](/ui/layout/container-queries/) · [Accessibility](/ui/themes/accessibility/)
