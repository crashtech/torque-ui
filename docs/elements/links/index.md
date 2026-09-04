---
title: Links
section: elements
source: src/20-elements/links.css
description: "Brand-coloured links with a colour hook, underline shapes and a growing underline; Every <a> takes the brand colour through :any-link, underlines on hover, desaturates when visited and leaves room above a scroll target."
---

Links are styled through `:any-link`, which matches an `<a>` with an `href` whether or not it has been visited, so a single rule covers both states. There is nothing to add: a bare `<a href>` is brand-coloured, un-underlined at rest, and underlined on hover.

## Default and hover

`:any-link` sets `--tui-brand`, no underline and a fast colour transition. On hover the colour darkens by 15% and an underline appears, offset by `0.15em` so it clears descenders. A muted link is a plain link plus a text-colour utility such as `.tui-text-2`, which sits in the higher utilities layer and therefore wins.

{% include demo.html file="default.html" %}

## Colour

The colour is one custom property, `--tui-link-color`, read at rest, darkened on hover and desaturated when visited, so a link keeps all three states in whatever colour you give it. The `.tui-link-positive`, `-negative`, `-warning`, `-info` and `-neutral` aliases set it from the semantic tokens; `.tui-link-inherit` makes a link take the surrounding text colour, for prose that must not turn blue.

{% include demo.html file="colors.html" %}

## Underline shape

`.tui-link-underline` keeps the underline at rest; `.tui-link-dotted`, `-dashed`, `-wavy` and `-double` give it a shape through `text-decoration-style`, which hover keeps. A dotted underline is the usual cue for a term with a definition.

{% include demo.html file="shapes.html" %}

## Growing underline

`.tui-link-grow` replaces the hover underline with a bar that grows from the start edge over `--tui-duration-fast` — a background gradient rather than `text-decoration`, since only a background can animate its width. `--tui-link-grow-size` sets its thickness.

{% include demo.html file="grow.html" %}

| Class | Effect |
|---|---|
| `.tui-link-positive` / `-negative` / `-warning` / `-info` / `-neutral` | Sets `--tui-link-color` from the semantic token |
| `.tui-link-inherit` | `--tui-link-color: currentcolor` |
| `.tui-link-underline` | Underlined at rest |
| `.tui-link-dotted` / `-dashed` / `-wavy` / `-double` | Underline shape, kept on hover |
| `.tui-link-grow` | Bar growing from the start edge on hover |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-link-color` | `var(--tui-brand)` | Rest colour; hover and visited derive from it |
| `--tui-link-grow-size` | `2px` | Thickness of the growing bar |

## Visited

`a:visited` mixes the brand 70/30 with `--tui-neutral`, a subtle desaturation rather than a second colour. Browsers restrict what a `:visited` rule may change, and `color` is one of the permitted properties. The link to the docs home in the demo is one you have most likely visited already.

{% include demo.html file="visited.html" %}

## Scroll targets

When a fragment link lands on an element, that element matches `:target` and gets `scroll-margin-block-start: var(--tui-spacing-8)`, so the target is not flush against the top of the viewport or hidden under a sticky header. The same rule sets `scroll-behavior: smooth`, which only has an effect when the target is itself a scroll container.

{% include demo.html file="target.html" %}

## Components that opt out

Component styles live in a later cascade layer than element defaults, so any component that declares its own `color` and `text-decoration` beats `:any-link` and its hover rule regardless of specificity. An `<a>` that is a `.tui-button`, a `.tui-card`, a `.tui-list-item`, a `.tui-menu-item`, a `.tui-navbar-brand` or `.tui-navbar-item`, a `.tui-tree-leaf`, a `.tui-breadcrumb` link, a `.tui-pagination` link or a `.tui-tab` keeps that component's colour and never picks up the brand link colour or the hover underline.

{% include demo.html file="opt-out.html" %}

Related: [Typography](/ui/elements/typography/) · [Buttons](/ui/components/buttons/) · [Text](/ui/utilities/text/) · [Colors](/ui/foundations/colors/)
