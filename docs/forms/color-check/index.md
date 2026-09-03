---
title: Color Check
section: forms
source: src/50-forms/color-check.css
description: "Radio group rendered as round colour swatches, with a brand ring and tick on the chosen one."
---

A colour check is a set of radios drawn as swatches: `.tui-color-check-group` holds `label.tui-color-check` items, each with a hidden `.tui-color-check-input` radio and a `.tui-color-check-swatch` painted with `--tui-swatch`. The radio keeps its form value and keyboard behaviour — arrow keys move the selection through the group — while the swatch shows the choice. Use it for a theme accent, a label colour or any short palette a user picks from.

## Swatches

The group is a wrapping inline-flex row with a `--tui-spacing-2` gap. Each `.tui-color-check` is a relative, inline-flex label with a pointer cursor; its `.tui-color-check-input` is positioned away and made transparent, so the swatch takes the click. The input must come immediately before the swatch — every checked and focus style rides the `input:checked + .tui-color-check-swatch` sibling combinator. `.tui-color-check-swatch` is a 1.75rem circle with a 2px `--tui-border` outline, filled with `--tui-swatch` (falling back to `--tui-neutral-400`); it scales up slightly on hover. The checked swatch swaps its border for a `--tui-surface-0` gap ring plus a `--tui-brand` outer ring and draws a `--tui-text-inverse` tick in the middle. Keyboard focus draws the same double ring in `--tui-focus-ring-strong`. Set `--tui-swatch` inline on each swatch, or from a class of your own.

{% include demo.html file="basic.html" %}

## Naming the colours

A swatch has no text, so give each option an accessible name: a `title` on the label is the lightest option, and a `.tui-sr-only` span inside the label is announced by screen readers without changing the layout. Group the whole palette in a `<fieldset>` with a `<legend>` so the question is announced too.

{% include demo.html file="labelled.html" %}

| Class | Effect |
|---|---|
| `.tui-color-check-group` | Wrapping inline-flex row, `--tui-spacing-2` gap |
| `.tui-color-check` | Relative inline-flex label, pointer; scales its swatch on hover |
| `.tui-color-check-input` | The radio, positioned away and transparent |
| `.tui-color-check-swatch` | 1.75rem circle filled with `--tui-swatch`; brand ring and tick when checked |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-swatch` | `--tui-neutral-400` | Fill colour of a `.tui-color-check-swatch` |

Related: [Image Check](/ui/forms/image-check/) · [Radio](/ui/forms/radio/) · [Colors](/ui/foundations/colors/) · [Form Layout](/ui/forms/form-layout/)
