---
title: Rating
section: interactive
source: src/60-interactive/rating.css
description: "Star rating built from a fieldset of hidden radios, lit up to the checked or hovered star with no script."
---

`.tui-rating` is a `<fieldset>` laid out as an inline row of star labels, each preceded by its own hidden radio. A star is lit when it, or any star after it, is checked or hovered — so the row fills from the start up to the pointer or the current value, exactly like a native rating widget. Any number of stars works, and the value submits with the form like any radio group.

## Stars

Put a `.tui-state-input.tui-rating-input` radio immediately before each `.tui-rating-star` label, in ascending order, sharing one `name`. Give the fieldset a `.tui-sr-only` legend and each star an `aria-label`, since the glyph alone says nothing. The radios are [state inputs](/ui/foundations/state-inputs/), so the group stays keyboard-operable with the arrow keys and shows a focus ring on the star.

{% include demo.html file="stars.html" %}

| Class | Effect |
|---|---|
| `.tui-rating` | Inline-flex `<fieldset>` with no border or padding; sets the star size (`--tui-rating-size`), gap and idle colour |
| `.tui-rating-input` | The hidden radio (add `.tui-state-input`); `:checked` lights its star and every star before it |
| `.tui-rating-star` | A star label: pointer cursor, lit in `--tui-rating-active`, `scale: 1.1` on hover |

## Size and colours

The size, gap and both colours are custom properties read on the fieldset, so a compact inline rating or a hero-sized one is one inline style away.

{% include demo.html file="sizes.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-rating-size` | `var(--tui-text-2xl)` | Font size of the stars |
| `--tui-rating-gap` | `var(--tui-spacing-1)` | Space between stars |
| `--tui-rating-idle` | `var(--tui-border)` | Colour of an unlit star |
| `--tui-rating-active` | `var(--tui-warning)` | Colour of a lit star |

Related: [State Inputs](/ui/foundations/state-inputs/) · [Radio](/ui/forms/radio/) · [Form Layout](/ui/forms/form-layout/) · [Toggle Group](/ui/interactive/toggle-group/)
