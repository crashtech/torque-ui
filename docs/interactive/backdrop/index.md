---
title: Backdrop
section: interactive
source: src/30-components/backdrop.css
js: self-driven
description: "Scrim for an overlay of your own — a loader, a lightbox — that is neither a dialog nor a popover."
---

A `<dialog>` and a `[popover]` bring their own `::backdrop`. `.tui-backdrop` is for the overlay you render yourself: it covers the viewport at `--tui-z-modal`, above sticky chrome, dims and blurs what is behind it, and centres whatever it holds. It fades in on first paint and out when it gains the `hidden` attribute. Focus, Escape and inertness are the script's — or use a [modal](/ui/interactive/modal/) and get them for free.

## Toggling with hidden <span class="tui-badge">self-driven JS</span>

{% include demo.html file="basic.html" %}

| Class | Effect |
|---|---|
| `.tui-backdrop` | Fixed full-viewport grid, `--tui-backdrop-bg`, 4px blur, `--tui-z-modal`, fades over `--tui-duration-normal` |
| `.tui-backdrop[hidden]` | Fades out, then `display: none` |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-backdrop-bg` | `light-dark(rgb(255 255 255 / 0.5), rgb(0 0 0 / 0.5))` | Scrim colour |

Related: [Modal](/ui/interactive/modal/) · [Busy](/ui/components/busy/) · [Z-index](/ui/foundations/z-index/) · [Self-driven JS](/ui/foundations/self-driven-js/)
