---
title: Visual
section: utilities
source: src/70-utilities/visual.css
description: "Glass surfaces, object-fit, image filters, blend modes, clip shapes, floated text wrap, edge masks, a light frame and a thumbnail figure."
---

Polish utilities for images and surfaces: translucent glass, `object-fit` sizing, colour filters, blend modes, clip shapes, a text-wrap float, gradient masks, a white frame for artwork that needs a light ground, and a ready-made thumbnail figure. They set only what they name, so stack them with [sizing](/ui/utilities/sizing/) and [colour](/ui/utilities/colors/) utilities as needed.

## Glass

`.tui-glass` is a 70% `--tui-surface-0` fill with a backdrop blur and saturation boost, edged with a plain `--tui-border` so it stays visible on a flat same-colour page. `.tui-glass-card` is the heavier version — more blur, slightly more transparent, plus `--tui-shadow-lg`. Both need something behind them to be worth it.

{% include demo.html file="glass.html" %}

| Class | Effect |
|---|---|
| `.tui-glass` | 70% surface fill, `blur(8px) saturate(180%)` backdrop filter, `--tui-border` edge |
| `.tui-glass-card` | 65% surface fill, `blur(12px) saturate(160%)`, `--tui-border` edge, `--tui-shadow-lg` |

## Image fitting

The three `object-fit` utilities also stretch the image to `100%` of its box on both axes, so they need a sized parent (an aspect-ratio box, a fixed-height card slot).

{% include demo.html file="fit.html" %}

| Class | Effect |
|---|---|
| `.tui-img-cover` | Fill the box, cropping to preserve the aspect ratio |
| `.tui-img-contain` | Fit inside the box, letterboxing to preserve the aspect ratio |
| `.tui-img-fill` | Stretch to the box, ignoring the aspect ratio |

## Filters

{% include demo.html file="filters.html" %}

| Class | Effect |
|---|---|
| `.tui-img-grayscale` | `filter: grayscale(100%)` |
| `.tui-img-sepia` | `filter: sepia(60%)` |
| `.tui-img-blur` | `filter: blur(4px)` |
| `.tui-img-brightness` | `filter: brightness(1.1)` |

## Blend modes

`mix-blend-mode` blends the element with whatever is painted behind it — an image over a coloured block, a logo over a photo.

{% include demo.html file="blend.html" %}

| Class | Effect |
|---|---|
| `.tui-blend-multiply` | `mix-blend-mode: multiply` |
| `.tui-blend-screen` | `mix-blend-mode: screen` |
| `.tui-blend-overlay` | `mix-blend-mode: overlay` |

## Clip shapes

`.tui-clip-circle` rounds and clips (so it also works on a `<div>` with children); the triangle and hexagon are `clip-path` polygons.

{% include demo.html file="clip.html" %}

| Class | Effect |
|---|---|
| `.tui-clip-circle` | `border-radius: 50%; overflow: hidden` |
| `.tui-clip-triangle` | Triangle `clip-path`, apex at the top centre |
| `.tui-clip-hexagon` | Hexagon `clip-path`, flat top and bottom |

## Float wrap

Inside a `.tui-float-wrap` block, an element with `.tui-float-img` floats to the inline start with a `shape-outside` inset that matches a 1rem corner radius, and running text flows around it with a `--tui-spacing-4` inline gap.

{% include demo.html file="float.html" %}

| Class | Effect |
|---|---|
| `.tui-float-wrap` | Scope for the float — text inside it wraps around the image |
| `.tui-float-img` | The floated image: `float: inline-start`, rounded `shape-outside`, end and bottom margins |

## Masks

A gradient mask fades the element's own pixels out towards one edge — a "read more" fade on clamped text, a soft end on a horizontally scrolling row.

{% include demo.html file="mask.html" %}

| Class | Effect |
|---|---|
| `.tui-mask-fade-bottom` | Opaque to 60%, then fades to transparent at the bottom edge |
| `.tui-mask-fade-right` | Opaque to 60%, then fades to transparent at the right edge |

## Light frame

`.tui-frame-light` is an inline-block white ground with dark text, padding and `--tui-radius-md` corners, regardless of colour scheme — for QR codes, scanned signatures and partner logos that must stay on white in [dark mode](/ui/themes/dark-mode/). Its `line-height: 0` removes the descender gap under an inline `<img>` or `<svg>`.

{% include demo.html file="frame-light.html" %}

| Class | Effect |
|---|---|
| `.tui-frame-light` | Inline-block, `white` background, `black` text, `--tui-spacing-3` padding, `--tui-radius-md` |

## Thumbnail

`.tui-thumb` is a `<figure>` with a tinted placeholder background and rounded, clipped corners; the child `<img>` is cover-fit to the figure and the `<figcaption>` becomes a small muted caption. Size the figure and the image follows.

{% include demo.html file="thumb.html" %}

| Class | Effect |
|---|---|
| `.tui-thumb` | `<figure>` with no margin, `--tui-surface-2` background, `--tui-radius-md`, `overflow: hidden` |
| `.tui-thumb > img` | Block, `100%` of the figure, `object-fit: cover` |
| `.tui-thumb > figcaption` | `--tui-text-xs` in `--tui-text-3` with `--tui-spacing-1` by `--tui-spacing-2` padding |

## Motion

| Class | Effect |
|---|---|
| `.tui-motion-none` | `transition: none; animation: none` on the element, its descendants and their pseudo-elements |

Related: [Images](/ui/elements/images/) · [Avatar](/ui/components/avatar/) · [Card](/ui/components/card/) · [Colors](/ui/utilities/colors/) · [Pointer & Orientation](/ui/utilities/pointer-orientation/) · [Dark Mode](/ui/themes/dark-mode/)
