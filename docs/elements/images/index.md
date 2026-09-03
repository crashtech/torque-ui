---
title: Images
section: elements
source: src/20-elements/images.css
description: "Responsive, rounded images and captioned figures with no classes."
---

An `<img>` never overflows its container and never distorts: `max-inline-size: 100%` with `block-size: auto` scales it down proportionally, and every image gets `--tui-radius-md` corners. A `<figure>` adds the flow margin and a centred caption.

## Images

The rounding applies to every `<img>`, including one used as an icon or a thumbnail. Give a photograph its intrinsic `width` and `height` attributes so the browser reserves the space before the file arrives.

{% include demo.html file="image.html" %}

## Figures

`<figure>` carries a `--tui-spacing-4` bottom margin, dropped when it is the last child of its box. `<figcaption>` is `--tui-text-sm` in `--tui-text-3`, centred, with `--tui-spacing-2` above it.

{% include demo.html file="figure.html" %}

For a thumbnail on a placeholder ground with a compact caption, see `.tui-thumb` on the [Visual](/ui/utilities/visual/) page; for a circular portrait use the [Avatar](/ui/components/avatar/) component.

Related: [Avatar](/ui/components/avatar/) · [Visual](/ui/utilities/visual/) · [Sizing](/ui/utilities/sizing/) · [Radius](/ui/foundations/radius/)
