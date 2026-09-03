---
title: Stepper
section: forms
source: src/50-forms/stepper.css
js: self-driven
description: "Number input flanked by decrement and increment buttons that share one border and focus ring."
---

`.tui-stepper` is a quantity control: two `.tui-stepper-btn`s around a `.tui-stepper-input`, all inside one bordered, rounded box that lights up its focus ring as a unit. The presentation is pure CSS — the input is a real `<input type="number">` with its native spinners hidden, so typing, arrow keys and `min`/`max`/`step` all still work. The buttons are plain buttons; making them change the value is your application's job.

## Anatomy

The wrapper is an inline-flex row on `--tui-surface-0` with a 2px `--tui-border` border, `--tui-radius-md` corners and `overflow: hidden`, so the flat-sided children are clipped to the rounded box. `:focus-within` swaps the border for `--tui-border-focus` and adds the `--tui-focus-ring` halo. Each `.tui-stepper-btn` is a 2.5rem-wide, borderless, `--tui-surface-2` cell in `--tui-text-2` that darkens through `--tui-surface-3` on hover and `--tui-surface-4` on press, with an inset outline for keyboard focus. `.tui-stepper-input` is a 3.5rem, centred, borderless number field on a transparent background that tints to `--tui-surface-1` when focused; its WebKit and Firefox spin buttons are removed. Give each button an `aria-label` and the input a visible label or an `aria-label`.

{% include demo.html file="basic.html" %}

## Stepping the value <span class="tui-badge">self-driven JS</span>

The buttons are presentation; the number input steps on its own with the arrow keys, and a click on `−` or `+` needs your script to call `stepDown()` / `stepUp()`. Disable the button at the bound (`min` or `max`) and it dims with a `not-allowed` cursor.

{% include demo.html file="bound.html" %}

## Sizes

`.tui-stepper-sm` and `.tui-stepper-lg` on the wrapper scale the buttons and the input together.

{% include demo.html file="sizes.html" %}

| Class | Buttons | Input |
|---|---|---|
| `.tui-stepper-sm` | 2rem wide, `--tui-text-base` | 3rem wide, `--tui-text-sm` |
| (default) | 2.5rem wide, `--tui-text-lg` | 3.5rem wide, `--tui-text-base` |
| `.tui-stepper-lg` | 3rem wide, `--tui-text-xl` | 4.5rem wide, `--tui-text-lg` |

| Class | Effect |
|---|---|
| `.tui-stepper` | Bordered inline-flex wrapper; focus ring on `:focus-within` |
| `.tui-stepper-btn` | Decrement or increment cell; hover, active, focus-visible and disabled states |
| `.tui-stepper-input` | Centred number input with native spinners hidden |

Related: [Inputs](/ui/forms/inputs/) · [Input Group](/ui/forms/input-group/) · [Buttons](/ui/components/buttons/) · [Form Layout](/ui/forms/form-layout/)
