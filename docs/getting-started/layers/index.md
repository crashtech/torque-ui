---
title: Cascade Layers
section: getting-started
source: src/tui.css
description: "Nine @layer blocks settle every precedence question without a single !important."
---

Torque UI puts every rule into one of nine cascade layers, declared once at the top of `src/tui.css`. Layer order beats specificity, so a later layer always wins over an earlier one no matter how specific the earlier selector is — that is what lets the framework ship zero `!important` and still guarantee that a utility overrides a component and a theme overrides both.

## The nine layers

The declaration line is the whole contract; everything after it is `@import … layer()` lines placing each source file into its layer.

```css
@layer tui.tokens, tui.reboot, tui.elements, tui.components, tui.layout, tui.forms, tui.interactive, tui.utilities, tui.themes;
```

| Layer | Folder | Holds |
|---|---|---|
| `tui.tokens` | `src/00-tokens/` | Custom properties only: colours, type scale, spacing, radius, z-index, motion, chart palette |
| `tui.reboot` | `src/10-reboot/` | `box-sizing`, `html`/`body` base, selection, media, form inheritance, the focus ring |
| `tui.elements` | `src/20-elements/` | Classless HTML — headings, links, lists, tables, images, icons, bare `<button>` and `<input>` |
| `tui.components` | `src/30-components/` | Every `.tui-*` component, and the tone leak reset |
| `tui.layout` | `src/40-layout/` | Grid, container, flexbox, stack, shell, split, board, container queries, and the page patterns (hero, section, media, level, page header) |
| `tui.forms` | `src/50-forms/` | Fields, inputs, selects, checkboxes, switches, validation |
| `tui.interactive` | `src/60-interactive/` | State inputs, tabs, collapse, menu, modal, offcanvas, tooltip, popover, sheet, carousel, rating, toggle group, wizard |
| `tui.utilities` | `src/70-utilities/` | Single-purpose classes, and the tone setters |
| `tui.themes` | `src/80-themes/` | Dark-mode toggle, high contrast, accessibility preferences, view transitions, print |

Two placements are deliberate. The tone setters (`.tui-tone-*` and every `.tui-badge-success`-style alias) live in `tui.utilities` so they beat the leak reset in `tui.components` regardless of specificity — see [Tone](/ui/foundations/tone/). And the preference rules in `tui.themes` (reduced motion, forced colours, print) win over any component's animation or layout by layer order alone, which is why none of them needs `!important`.

## Utilities beat components

A utility and a component declaring the same property never fight on specificity; the utility's layer is later, so it wins. Below, `.tui-bg-negative` and `.tui-border-negative` repaint a primary button and `.tui-text-lg` resizes a badge, even though `.tui-button-primary` and `.tui-badge` set those properties themselves.

{% include demo.html file="utility-wins.html" %}

## Your CSS beats everything

Unlayered author CSS sits above every named layer in the cascade. Any rule you write in a plain stylesheet — even a bare element selector — overrides the framework without `!important` and without matching its specificity.

```css
.tui-card { border-radius: 0; }
```

If you would rather keep your own CSS in layers, declare the framework's outer layer first and yours after it. Layer order is fixed by the first declaration the browser sees, so this line must come before the framework's stylesheet is loaded.

```css
@layer tui, app;
```

Everything the framework declares is a sub-layer of `tui` (`tui.tokens`, `tui.components`, …), so one name orders the whole bundle below `app`.

## Import order is part of the contract

Within a single layer, two rules of equal specificity resolve by source order. `src/tui.css` lists its imports in a hand-chosen order for exactly that reason: `tone.css` before the components that read it, `close.css` before the components that host it, `_state.css` first in the interactive layer. The bundle script reads that list instead of globbing the folders, refuses to build if a file in `src/` is missing from the list, and writes each layer's files into one `@layer` block in the same order — so `dist/tui-all.css` and `src/tui.css` always cascade identically.

Related: [Installation](/ui/getting-started/installation/) · [Tone](/ui/foundations/tone/) · [Colors](/ui/utilities/colors/) · [Accessibility](/ui/themes/accessibility/)
