---
title: Display
section: utilities
source: src/70-utilities/display.css
description: "Display-mode utilities, responsive show/hide from three breakpoints, and the screen-reader-only helper."
---

`.tui-d-*` sets `display` in one class. The base set covers every common mode; the responsive set adds `none`, `block`, `flex` and `grid` from each of the three breakpoints, which is enough to show a sidebar from tablet up or hide a caption on phones. `.tui-sr-only` hides an element visually while keeping it in the accessibility tree.

## Display modes

{% include demo.html file="modes.html" %}

| Class | Effect |
|---|---|
| `.tui-d-none` | `display: none` |
| `.tui-d-block` | `display: block` |
| `.tui-d-inline` | `display: inline` |
| `.tui-d-inline-block` | `display: inline-block` |
| `.tui-d-flex` | `display: flex` |
| `.tui-d-inline-flex` | `display: inline-flex` |
| `.tui-d-grid` | `display: grid` |
| `.tui-d-inline-grid` | `display: inline-grid` |
| `.tui-d-table` | `display: table` |
| `.tui-d-table-row` | `display: table-row` |
| `.tui-d-table-cell` | `display: table-cell` |

## Responsive show and hide

The breakpoint variants are mobile-first: `.tui-d-md-block` applies from 768px up and does nothing below it. Combine a base class with a breakpoint class to switch — `.tui-d-none.tui-d-md-block` is hidden on phones and shown from tablets; `.tui-d-md-none` is the reverse. Resize the browser to see the two boxes swap.

{% include demo.html file="responsive.html" %}

| Class | Effect |
|---|---|
| `.tui-d-sm-none` | `display: none` from 480px |
| `.tui-d-sm-block` | `display: block` from 480px |
| `.tui-d-sm-flex` | `display: flex` from 480px |
| `.tui-d-sm-grid` | `display: grid` from 480px |
| `.tui-d-md-none` | `display: none` from 768px |
| `.tui-d-md-block` | `display: block` from 768px |
| `.tui-d-md-flex` | `display: flex` from 768px |
| `.tui-d-md-grid` | `display: grid` from 768px |
| `.tui-d-lg-none` | `display: none` from 1024px |
| `.tui-d-lg-block` | `display: block` from 1024px |
| `.tui-d-lg-flex` | `display: flex` from 1024px |
| `.tui-d-lg-grid` | `display: grid` from 1024px |

## Screen reader only

`.tui-sr-only` clips the element to a 1px box and hides it with `clip-path`, not `display: none`, so screen readers still announce it and a focusable element inside stays in the tab order. Use it for the label of an icon-only control, a fieldset legend that would be visual noise, or a skip link. It is the same technique the [state inputs](/ui/foundations/state-inputs/) use to hide their radios.

{% include demo.html file="sr-only.html" %}

| Class | Effect |
|---|---|
| `.tui-sr-only` | Visually hidden, still read by assistive technology, still focusable |

Related: [Flexbox](/ui/layout/flexbox/) · [Grid](/ui/layout/grid/) · [Container Queries](/ui/layout/container-queries/) · [Accessibility](/ui/themes/accessibility/) · [State Inputs](/ui/foundations/state-inputs/)
