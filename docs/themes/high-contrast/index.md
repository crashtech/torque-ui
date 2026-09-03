---
title: High Contrast
section: themes
source: src/80-themes/high-contrast.css
description: "What changes under prefers-contrast: more — black-and-white tokens, solid 2px borders and underlined links, with nothing to enable."
---

When the OS asks for more contrast, the framework answers without any class or setting: under `@media (prefers-contrast: more)` it swaps its text, surface and border tokens for guaranteed black-white-grey pairs and thickens the borders on the components that rely on subtle edges. It is part of the bundle, in the last cascade layer, so it applies to every component automatically.

## What changes

| Rule | Effect |
|---|---|
| `:root` | `--tui-text-1/2/3` become `--tui-hc-text-1/2/3` (`light-dark(#000, #fff)`, `light-dark(#1a1a1a, #e6e6e6)`, `light-dark(#333, #ccc)`); `--tui-surface-0/1/2` become `--tui-hc-surface-0/1/2` (`light-dark(#fff, #000)`, `light-dark(#f5f5f5, #111)`, `light-dark(#eee, #1a1a1a)`); `--tui-border` and `--tui-border-strong` become `--tui-hc-border` (`light-dark(#000, #fff)`) |
| `.tui-button` | `border-width: 2px; border-style: solid` — a button's edge no longer depends on shadow |
| `.tui-badge`, `.tui-tag`, `.tui-chip` | Same 2px solid border |
| `.tui-card`, `.tui-panel`, `.tui-alert` | 2px border in `--tui-text-2` |
| `a` | `text-decoration: underline` — links are never colour-only |

The `--tui-hc-*` pairs are declared with the [colour tokens](/ui/foundations/colors/) and are deliberately not brand-derived: a user asking for more contrast wants guaranteed maximum contrast, not a mix. Each is a `light-dark()` pair, so a dark-scheme user gets a dark high-contrast theme, not a white flash.

## The affected components

Nothing below looks different unless your OS contrast preference is set to "more" (Windows: Contrast themes; macOS: Increase contrast). Under that preference the buttons, badges and card grow solid 2px borders, the surfaces snap to pure white or pure black with hard grey steps, and the link is underlined.

{% include demo.html file="components.html" %}

Windows forced-colours mode (a different preference) is handled separately by the [accessibility](/ui/themes/accessibility/) theme.

Related: [Colors](/ui/foundations/colors/) · [Accessibility](/ui/themes/accessibility/) · [Dark Mode](/ui/themes/dark-mode/) · [Buttons](/ui/components/buttons/)
