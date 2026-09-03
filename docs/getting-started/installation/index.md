---
title: Installation
section: getting-started
source: src/tui.css, scripts/build-single.sh
description: "Link one stylesheet, set one variable to re-theme, one to change density — no build, no JavaScript."
---

Torque UI is a zero-JavaScript CSS framework: link a single stylesheet and every component, layout and utility is available. Interactivity comes from native HTML — hidden checkboxes and radios, `<details>`, `popover`, `<dialog>` — driven by `:has()`, `:checked` and cascade layers, so there is no runtime to load, no build step to run and no configuration file to write.

## The bundle or the source

Two entry points ship, and they are interchangeable. `dist/tui-all.css` is a single flat file: one `@layer` declaration followed by nine `@layer tui.<name> { … }` blocks, each containing the source files that belong to it. It is the right choice for production — one request, no `@import` chain.

```html
<link rel="stylesheet" href="dist/tui-all.css">
```

`src/tui.css` is the modular entry point. It declares the same nine layers and then `@import`s every source file with `layer()`, so the browser fetches each module separately. Use it while developing against the framework, or when your own bundler resolves `@import` and you want to drop individual modules.

```html
<link rel="stylesheet" href="src/tui.css">
```

The bundle is produced by `scripts/build-single.sh`, which reads the `@import … layer(tui.*)` lines out of `src/tui.css`, checks that every file in `src/` is imported at least once, and concatenates them in that hand-chosen order, wrapping each layer's files in one `@layer` block. Equal-specificity rules inside a layer resolve by source order, so the script reproduces the entry point's order rather than globbing the folders — that guarantee is described on the [Cascade Layers](/ui/getting-started/layers/) page.

## Re-theming

The entire palette derives from one custom property, `--tui-brand`. Tints and shades come from `color-mix()`, the semantic tones (positive, negative, warning, info) are the brand rotated to a pinned hue in OKLCH, and every foreground is auto-picked for contrast. Set it on `:root` to re-theme the whole app.

```css
:root { --tui-brand: #e11d48; }
```

Because the tokens are plain custom properties, the same override also works on any subtree — the wrapper below re-themes only the card inside it.

{% include demo.html file="retheme.html" %}

The full derivation, and every token you can override individually, is on the [Colors](/ui/foundations/colors/) page.

## Root size

Every size in the framework is `rem`-based, and `html { font-size }` reads `--tui-root-size` (default `100%`, a 16px base). Set it on `:root` to make the whole UI denser or looser — `87.5%` gives a 14px base, `93.75%` a 15px base — and buttons, inputs, spacing and type all scale together. Only `html` reads the token, so it has no effect on a wrapper element; it is a whole-document knob.

```css
:root { --tui-root-size: 87.5%; }
```

## No JavaScript

Nothing in the framework depends on a script. Tabs, menus, modals, drawers, toasts, the dark-mode toggle and the dismissible components all work from `:checked`, `popover`, `<dialog>` and `<details>`. The only places a line of your own JavaScript is ever suggested are documented on the [Browser Support](/ui/getting-started/browser-support/) page, as fallbacks below the feature floor.

Related: [Cascade Layers](/ui/getting-started/layers/) · [Browser Support](/ui/getting-started/browser-support/) · [Colors](/ui/foundations/colors/) · [Typography Scale](/ui/foundations/typography-scale/)
