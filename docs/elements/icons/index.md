---
title: Icons
section: elements
source: src/20-elements/icons.css
description: "The .tui-icon convention sizes an inline SVG to the current font size and fills it with the current text colour."
---

There is no icon font. An icon is an inline `<svg>` with `.tui-icon`: it becomes an `inline-block` sized to `1em` on both axes, dropped `0.125em` below the baseline so it sits optically centred in a line of text, and — unless the SVG carries its own `fill` attribute — filled with `currentcolor`. It also refuses to shrink in a flex row, so a glyph next to a long label keeps its shape.

## In text and controls

Because the size is `1em`, the icon follows whatever font size surrounds it — body text, a `.tui-button-sm`, a heading — with no extra class. Mark decorative icons `aria-hidden="true"`; give a standalone icon `role="img"` and an `aria-label`.

{% include demo.html file="in-text.html" %}

## Sizes

`.tui-icon-sm` and `.tui-icon-lg` set `--tui-icon-size` to `0.75em` and `1.5em`. For any other size set `--tui-icon-size` yourself, on the icon or on an ancestor.

{% include demo.html file="sizes.html" %}

| Class | `--tui-icon-size` |
|---|---|
| `.tui-icon` | `1em` |
| `.tui-icon-sm` | `0.75em` |
| `.tui-icon-lg` | `1.5em` |

## Colour

The fill is `currentcolor`, so the icon takes the text colour of its parent: a text-colour utility such as `.tui-text-positive`, a toned badge, or a solid button's contrast foreground all colour the glyph for free. An SVG that draws with strokes should set `fill="none"` and `stroke="currentColor"` on itself, as the check mark below does.

{% include demo.html file="color.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-icon-size` | `1em` | Inline and block size of the icon |

Related: [Buttons](/ui/components/buttons/) · [Badge](/ui/components/badge/) · [Colors](/ui/utilities/colors/) · [Empty State](/ui/components/empty/)
