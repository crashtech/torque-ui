---
title: Range
section: forms
source: src/50-forms/range.css
js: self-driven
description: "Wrapper around one or two native range inputs that paints the fill between two thumbs, a value label riding each thumb and a row of marks."
---

`.tui-range` wraps native `<input type="range">` elements and paints the track itself, so it can do what a lone input cannot: fill between two thumbs, float a value label over a thumb, and line up marks. The positions are two registered numbers, `--tui-range-start` and `--tui-range-end` (0-100), read from the wrapper's `data-value` (single) or `data-start` and `data-end` (dual) where typed `attr()` exists; a one-line `input` listener writes them. The inputs stay native, so keyboard, form submission and the [bare range](/ui/forms/inputs/) styling are untouched.

## Value label and marks <span class="tui-badge">self-driven JS</span>

Put a `.tui-range-label` before the input and it rides the thumb at `--tui-range-end`; the wrapper grows `--tui-spacing-6` taller to make room. `.tui-range-marks` is a `<ul>` under the track whose items spread from the first thumb position to the last. The script writes `data-value` and the label text on `input`.

{% include demo.html file="single.html" %}

## Two thumbs <span class="tui-badge">self-driven JS</span>

`.tui-range-dual` stacks two inputs in the same cell and lets pointer events through everywhere but the thumbs, so each thumb is draggable. The fill runs from `data-start` to `data-end`; a `.tui-range-label-start` rides the first thumb. Keeping the thumbs from crossing is the script's.

{% include demo.html file="dual.html" %}

| Class / attribute | Effect |
|---|---|
| `.tui-range` | Relative grid wrapper painting a 6px track with the fill from `--tui-range-start` to `--tui-range-end` |
| `[data-value]` | Sets `--tui-range-end` (Chrome 133+) |
| `[data-start]` / `[data-end]` | Set `--tui-range-start` / `--tui-range-end` (Chrome 133+) |
| `.tui-range-dual` | Two stacked inputs, pointer events on the thumbs only |
| `.tui-range-label` / `.tui-range-label-start` | Value bubble riding the end / start thumb |
| `.tui-range-marks` | Row of marks under the track |

> **Browser note.** Typed `attr()` is Chrome 133+; elsewhere set `--tui-range-start` and `--tui-range-end` in `style` from the same listener. Both properties animate over `--tui-duration-normal`; `.tui-motion-none` makes them instant.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-range-start` | `0` | Start of the fill, 0-100; registered with `@property` |
| `--tui-range-end` | `0` | End of the fill and position of the label, 0-100; registered with `@property` |
| `--tui-range-thumb` | `var(--tui-spacing-5)` | Thumb diameter the positions are corrected by; keep it equal to the input's |

Related: [Inputs](/ui/forms/inputs/) · [Field States](/ui/forms/field-states/) · [Self-driven JS](/ui/foundations/self-driven-js/)
