---
title: Flag
section: components
source: src/30-components/flag.css
description: "Fixed 2rem by 1.5rem inline tile for a country or region: a code over a colour, or a clipped flag image."
---

A flag is a small inline tile at a fixed 2:1.5 ratio for a country or region indicator next to a phone number, a locale or a shipping address. The framework ships no flag artwork: the tile gives you the box, and you supply either a short code over a background colour or an image to clip.

## Code over a colour

`.tui-flag` is a 2rem by 1.5rem inline-flex box with `--tui-radius-sm` corners, a `--tui-border` edge and `overflow: hidden`. Its text is `--tui-text-xs` bold in `--tui-text-inverse` with a fixed black outline, so a two-letter code stays legible over any background you set inline — light ones included. The background does not follow the theme on purpose: a flag colour is the same in light and dark mode.

{% include demo.html file="codes.html" %}

## Clipped artwork

Anything inside the tile is clipped to its corners, so an inline SVG or an `<img>` of a real flag fills the box. Give the graphic a size of 100% and keep the accessible name on the tile or the image.

{% include demo.html file="artwork.html" %}

| Class | Effect |
|---|---|
| `.tui-flag` | 2rem × 1.5rem inline tile, small radius, border, clipped content, outlined bold code |

Related: [Avatar](/ui/components/avatar/) · [Badge](/ui/components/badge/) · [Icons](/ui/elements/icons/)
