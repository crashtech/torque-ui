---
title: Search
section: forms
source: src/50-forms/search-input.css
js: self-driven
description: "Wrapper that gives a search input a magnifier glyph and a sensible maximum width."
---

`.tui-search` wraps an input — `type="search"` by convention, though any text input works — to draw a magnifier at its end edge and cap its width, so a bare search box never spans a whole page. The input inside stays a plain field — the same border, focus ring and sizes as every other [input](/ui/forms/inputs/) — and the glyph is a pseudo-element, so there is no icon markup to write.

## Anatomy

The wrapper is `position: relative`, `inline-size: 100%` and `max-inline-size: --tui-search-inline-size` (24rem). Its direct `<input>` child gets `--tui-spacing-10` of end padding to keep typed text clear of the glyph, and `::after` paints a 1rem magnifier at `--tui-spacing-3` from the end edge, vertically centred and with `pointer-events: none` so clicks land in the field. Give the input a visible `<label>` or an `aria-label`.

{% include demo.html file="basic.html" %}

## Width

Override `--tui-search-inline-size` on the wrapper for a wider, command-palette style bar; the wrapper still fills its container up to that cap, so it shrinks on narrow screens.

{% include demo.html file="wide.html" %}

## Clear control <span class="tui-badge">self-driven JS</span>

Add a `.tui-close` button after the input and it appears in place of the magnifier once the field has text — `:placeholder-shown` decides, so the input needs a `placeholder`. Clearing the value is your script's job; the button is already labelled and positioned.

{% include demo.html file="clear.html" %}

## Icon tint

The magnifier is a `mask-image` filled with `background-color`, so its colour is a token rather than a baked-in hex: `--tui-icon-color`, falling back to `--tui-neutral`. Set the property on the wrapper to tint it — for example to the brand colour, or to `currentColor` to follow the surrounding text.

{% include demo.html file="tint.html" %}

| Class | Effect |
|---|---|
| `.tui-search` | Relative wrapper capped at `--tui-search-inline-size` (24rem); draws the magnifier `::after` at the end edge |
| `.tui-search > input` | Plain field with `--tui-spacing-10` end padding reserved for the glyph |
| `.tui-search > .tui-close` | Clear control, shown instead of the glyph while the input has text |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-search-inline-size` | `24rem` | Maximum width of the wrapper |
| `--tui-icon-color` | `--tui-neutral` | Colour of the magnifier glyph |

Related: [Inputs](/ui/forms/inputs/) · [Input Group](/ui/forms/input-group/) · [Form Layout](/ui/forms/form-layout/) · [Navbar](/ui/components/navbar/) · [Icons](/ui/elements/icons/)
