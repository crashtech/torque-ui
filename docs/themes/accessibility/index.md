---
title: Accessibility
section: themes
source: src/80-themes/a11y.css
description: "The preference-driven rules that need no markup: reduced motion, Windows forced colours, reduced data, CJK typography — plus the focus ring and writing-direction behaviour built into everything else."
---

Contrast and focus are built into the tokens and the reboot; this file groups the rules that respond to a user preference and need nothing from your markup. All of it lives in the last cascade layer, so a preference always wins over a component's own animation, border or outline by layer order alone — none of it uses `!important`.

## Reduced motion

Under `prefers-reduced-motion: reduce`, every element's `animation-duration` and `transition-duration` are cut to `0.01ms`, `animation-iteration-count` to `1`, and `scroll-behavior` to `auto`. Hover lifts, switch thumbs, drawer slides and dismiss fades all become instant. The one exception is documented on the [Toast](/ui/components/toast/) page: the auto-dismiss animation is disabled rather than shortened, so a toast is not gone before it can be read.

## Windows forced colours

Under `forced-colors: active` the OS replaces every colour with its own palette. The framework helps it: `.tui-button`, text-type `input`, `textarea`, `select`, `.tui-card`, `.tui-badge`, `.tui-tag`, `.tui-chip`, `.tui-alert`, `.tui-panel`, `.tui-list-group`, `.tui-toast`, `.tui-menu`, `.tui-tooltip`, `.tui-modal` and `.tui-popover` get a `1px solid CanvasText` border and lose their shadow, so surfaces that were separated by colour alone keep a visible edge. Every `:focus-visible` element, and anything carrying `.tui-focus-ring`, gets a `--tui-focus-ring-width` (2px) solid `Highlight` outline in the system highlight colour.

| Class | Effect |
|---|---|
| `.tui-focus-ring` | Under forced colours, the element gets the `Highlight` outline even if it is not the `:focus-visible` element itself — for a custom control whose visible focus target is not the focused node. Outside forced-colours mode the class does nothing, so the demo below only changes under that preference |

## Reduced data

Under `prefers-reduced-data: reduce` the `.tui-placeholder` shimmer stops (`animation: none`) and the `.tui-spinner` slows to a 3-second cycle, so a metered connection is not spent on decoration.

## Language-aware typography

`:lang(ja)`, `:lang(zh)` and `:lang(ko)` get `letter-spacing: 0.02em`, `line-height: 1.8` and `hanging-punctuation: allow-end`; Japanese additionally gets `line-break: anywhere`. Set `lang` on the element (or on `<html>`) and the tweaks apply.

{% include demo.html file="lang.html" %}

## Writing direction

Nothing in this file mentions RTL because nothing needs to: every component is written with logical properties (`inline-size`, `margin-inline-start`, `inset-inline-end`, `border-block-end`), so a `dir="rtl"` ancestor mirrors layouts, paddings, list-group badges and toast placement without a single override.

{% include demo.html file="rtl.html" %}

## Focus

The focus ring is not in this file either — it is the reboot's `:focus-visible { outline: 2px solid var(--tui-focus-ring-strong); outline-offset: 2px }`, and the [state-input](/ui/foundations/state-inputs/) rule that moves it to the label of a hidden input. Add `.tui-focus-ring` to a custom focusable element so it also keeps a visible outline under forced colours.

{% include demo.html file="focus-ring.html" %}

Related: [Motion](/ui/foundations/motion/) · [State Inputs](/ui/foundations/state-inputs/) · [High Contrast](/ui/themes/high-contrast/) · [Dark Mode](/ui/themes/dark-mode/) · [Placeholder](/ui/components/placeholder/) · [Spinner](/ui/components/spinner/)
