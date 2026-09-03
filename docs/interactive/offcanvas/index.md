---
title: Offcanvas
section: interactive
source: src/60-interactive/offcanvas.css
description: "Full-height drawer that slides in from an inline edge as a native popover, plus the collapse variant the navbar uses below 768px."
---

`.tui-offcanvas` turns a `[popover]` element into a full-height drawer: `--tui-offcanvas-inline-size` wide, padded, on `--tui-offcanvas-bg` over a scheme-matched, blurred `::backdrop` — a white haze on a light page, a black one on a dark page — sliding in from the inline-start edge. It opens from any `popovertarget` button; Escape and a click on the backdrop close it, because that is native popover light-dismiss. Every demo on this page is framed, since the drawer covers the viewport it lives in.

## Start drawer

Give the drawer an `aria-labelledby` pointing at its heading so it announces a name when it opens, and a `.tui-close` button with `popovertargetaction="hide"` for a visible way out. The drawer is a block box; a class that makes it a flex column (the navbar's drawer does) stacks its children with `align-items: stretch`.

{% include demo.html file="start.html" frame=true height="18rem" %}

| Class | Effect |
|---|---|
| `.tui-offcanvas` | The `[popover]` drawer, anchored to the inline-start edge; `100dvh` tall, `--tui-shadow-xl`, slides in over `--tui-duration-normal` |

## End drawer

Add `.tui-offcanvas-end` to anchor the drawer to the inline-end edge and slide it in from there — filters, a details pane, a cart.

{% include demo.html file="end.html" frame=true height="18rem" %}

| Class | Effect |
|---|---|
| `.tui-offcanvas-end` | Anchors to the inline-end edge and reverses the slide |

## Collapsible navbar menu

`.tui-offcanvas-collapse` is the same drawer below 768px and a plain inline row above it: at that width the class resets position, size, padding, background and shadow and lays its children out as a centred flex row. It is what the [navbar](/ui/components/navbar/) uses for its `.tui-navbar-menu`, so the menu is a drawer on phones and a horizontal list on desktop with one markup. Resize the browser to see both states.

{% include demo.html file="collapse.html" frame=true height="18rem" %}

| Class | Effect |
|---|---|
| `.tui-offcanvas-collapse` | Drawer below 768px; from 768px a static inline flex row with no drawer chrome |

## Right-to-left

`translate` has no logical form, so the slide direction is mirrored by hand under `:dir(rtl)`: a start drawer slides in from the right and an end drawer from the left, matching the edge each one is anchored to.

> **Browser note.** The slide and the backdrop fade enter from `@starting-style` and leave through `overlay`/`display` transitions with `allow-discrete` (Chrome 117 / Safari 17.4 / Firefox 129). Below that the drawer and backdrop snap open and closed; state is still correct.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-offcanvas-inline-size` | `20rem` | Drawer width |
| `--tui-offcanvas-bg` | `var(--tui-surface-0)` | Drawer background |
| `--tui-offcanvas-backdrop` | `light-dark(rgb(255 255 255 / 0.5), rgb(0 0 0 / 0.5))` | `::backdrop` colour, behind a 4px blur |

Related: [Navbar](/ui/components/navbar/) · [App Shell](/ui/layout/shell/) · [Popover](/ui/interactive/popover/) · [Sheet](/ui/interactive/sheet/) · [Modal](/ui/interactive/modal/) · [Close](/ui/components/close/)
