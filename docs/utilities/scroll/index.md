---
title: Scroll
section: utilities
source: src/70-utilities/scroll.css
description: "Scroll-driven reading progress bar and shrinking shell header, animated by the document scroll position with no JavaScript."
---

Two utilities driven by CSS scroll-linked animations (`animation-timeline: scroll(root)`): a fixed bar that fills as the reader moves down the document, and a modifier that compresses an [App Shell](/ui/layout/shell/) header over the first `8rem` of scroll. No script reads the scroll position — the browser maps it onto the animation directly. Both demos are framed so the frame's own document is what scrolls.

> **Browser note.** Scroll-driven animations are Chrome 115, Safari 26 and Firefox 143. The whole file sits behind `@supports (animation-timeline: scroll())`, so in a browser without them the bar never appears and the header never shrinks — the page simply behaves as if the classes were absent. Under `prefers-reduced-motion: reduce` the same applies on purpose: the bar is hidden and the shrink is disabled, since both are pure motion.

## Reading progress

Place an empty `<div class="tui-reading-progress">` anywhere in the body. It is a 3px `position: fixed` bar across the top of the viewport at `--tui-z-sticky`, coloured by `--tui-reading-progress-color` and scaled from `0` to full width by the scroll-driven animation, and it tracks the root scroll — so it measures the document, not any inner scroll container.

{% include demo.html file="reading-progress.html" frame=true height="20rem" %}

| Class | Effect |
|---|---|
| `.tui-reading-progress` | Fixed 3px top bar; `scale: 0 1` at the top of the document, `1 1` at the bottom |

## Shrinking header

Add `.tui-shell-header-shrink` to a `.tui-shell-header`. Over the first `8rem` of root scroll (`animation-range: 0 8rem`) its block padding tightens to `--tui-spacing-1` and it gains `--tui-shadow-md`, so the sticky header takes less room once the reader is into the content and reads as floating over it.

{% include demo.html file="header-shrink.html" frame=true height="20rem" %}

| Class | Effect |
|---|---|
| `.tui-shell-header-shrink` | Animates `padding-block` and `box-shadow` over the first 8rem of document scroll |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-reading-progress-color` | `var(--tui-brand)` | Colour of the progress bar |

Related: [App Shell](/ui/layout/shell/) · [Navbar](/ui/components/navbar/) · [Progress](/ui/components/progress/) · [Motion](/ui/foundations/motion/) · [Z-index](/ui/foundations/z-index/)
