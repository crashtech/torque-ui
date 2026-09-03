---
title: Links
section: elements
source: src/20-elements/links.css
description: "Every <a> takes the brand colour through :any-link, underlines on hover, desaturates when visited and leaves room above a scroll target."
---

Links are styled through `:any-link`, which matches an `<a>` with an `href` whether or not it has been visited, so a single rule covers both states. There is nothing to add: a bare `<a href>` is brand-coloured, un-underlined at rest, and underlined on hover.

## Default and hover

`:any-link` sets `--tui-brand`, no underline and a fast colour transition. On hover the colour darkens by 15% and an underline appears, offset by `0.15em` so it clears descenders. A muted link is a plain link plus a text-colour utility such as `.tui-text-2`, which sits in the higher utilities layer and therefore wins.

{% include demo.html file="default.html" %}

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
