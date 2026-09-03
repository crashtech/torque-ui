---
title: View Transitions
section: themes
source: src/80-themes/view-transitions.css
description: "Opt-in cross-document view transitions on every same-origin navigation, and one class to name a hero element that morphs between pages."
---

`80-themes/view-transitions.css` opts every same-origin navigation into the browser's native cross-document view transition with `@view-transition { navigation: auto; }` — no JavaScript, no per-link markup. Pages cross-fade instead of flashing, and an element that carries `.tui-vt-hero` on both the old and the new page morphs between its two positions instead of fading with the rest.

## Removable by design

This is the one file in Torque UI you are expected to delete if you do not want it: delete the file and drop its `@import` from `src/tui.css` (the build refuses an import pointing at a missing file, and a file left behind without an import), or strip the block from the bundle, and navigation goes back to a plain load. The whole file is wrapped in `@supports (view-transition-name: none)`, so a browser without the feature never sees any of it, and under `prefers-reduced-motion: reduce` the `::view-transition-group`, `::view-transition-old` and `::view-transition-new` pseudo-elements get `animation: none`, which turns the transition into an instant swap.

> **Browser note.** Cross-document view transitions need Chrome 126 or Safari 18.2. Elsewhere navigation simply happens with no transition.

## `.tui-vt-hero`

The class sets `view-transition-name: tui-hero`. Give it to one element per page — a title, a card, a product image — and when the user navigates between two pages that both have one, the browser animates that element from its old box to its new box. Nothing is visible without a navigation, and only one element per page may carry the name: a second one makes the browser skip the transition entirely.

{% include demo.html file="hero.html" %}

| Class | Effect |
|---|---|
| `.tui-vt-hero` | `view-transition-name: tui-hero` — morphs across a same-origin navigation to a page with another `.tui-vt-hero` |

Related: [Motion](/ui/foundations/motion/) · [Accessibility](/ui/themes/accessibility/) · [Browser Support](/ui/getting-started/browser-support/) · [Card](/ui/components/card/)
