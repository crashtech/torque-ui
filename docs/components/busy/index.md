---
title: Busy
section: components
source: src/30-components/busy.css
description: "Overlay that dims a region, blocks pointer events and shows a spinner while aria-busy is true."
---

Busy is the loading state of a region you already rendered — a card whose data is refreshing, a form being submitted. Wrap the region in `.tui-busy` and toggle `aria-busy="true"` on it: the attribute is the only switch, so the semantic state and the visual state can never disagree.

## Busy overlay

`.tui-busy` alone is a plain relative wrapper with no visual effect. With `aria-busy="true"` two pseudo-elements appear: `::before` covers the wrapper with `--tui-busy-backdrop` (70% of `--tui-surface-0` by default) and `::after` centres a 2rem spinner — a 3px `--tui-border` ring whose top arc is `--tui-brand` — spinning at `--tui-duration-slower`. Pointer events are blocked on the whole region, so buttons and inputs underneath cannot be clicked until the attribute is removed.

{% include demo.html file="overlay.html" %}

The overlay is stacked inside the wrapper's own local context only — it borrows no tier from the [z-index scale](/ui/foundations/z-index/), so a busy card never floats above a sticky header or an open modal.

## Rounded regions

The backdrop inherits the wrapper's `border-radius`, so putting the class straight on a `.tui-card` or `.tui-panel` keeps the corners clean.

{% include demo.html file="card.html" %}

## Buttons and forms

The same attribute on a `<button>` shows the [loading spinner](/ui/components/buttons/), and on a `<form>` or `<fieldset>` the [busy form](/ui/forms/form-layout/) look — no wrapper needed there.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-busy-backdrop` | `color-mix(in srgb, var(--tui-surface-0) 70%, transparent)` | Colour of the dimming layer |

Related: [Spinner](/ui/components/spinner/) · [Placeholder](/ui/components/placeholder/) · [Progress](/ui/components/progress/) · [Card](/ui/components/card/)
