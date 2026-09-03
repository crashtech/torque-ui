---
title: Validation
section: forms
source: src/50-forms/validation.css
js: self-driven
description: "Red border on an invalid field only after the user has interacted with it, through :user-invalid."
---

Validation styling in Torque UI is deliberately quiet: a field turns red only when it is invalid *and* the user has actually been there, and nothing ever turns green. The styles hang off the native `:user-invalid` pseudo-class, so the browser's own constraint validation — `required`, `type="email"`, `min`, `pattern` — is the whole rule engine, with no script and no class to toggle.

## User-invalid

`input`, `textarea` and `select` get a `--tui-negative` border once they match `:user-invalid`, which the browser sets after the user has edited the field or tried to submit the form — not on first paint, so a fresh required form is not a wall of red. While the invalid field is focused the focus halo turns red too, at 30% of `--tui-negative`. Tab into the field, leave it empty and tab out to see it.

{% include demo.html file="required.html" %}

## With a message

Pair the border with a `.tui-error` line from [Form Layout](/ui/forms/form-layout/) for the explanation, and point the input at it with `aria-describedby`. The line and the border are independent: the line is always rendered when you put it in the markup, the border only when the browser flags the field. For a message you decide server-side, without waiting for interaction, combine `.tui-error` with `.tui-input-error` from [Inputs](/ui/forms/inputs/).

{% include demo.html file="message.html" %}

## Invalid by attribute <span class="tui-badge">self-driven JS</span>

Server-side or script validation has no `:user-invalid` to key on. Set `aria-invalid="true"` (or `data-invalid`, or `.tui-invalid`) on the control and it paints the same `--tui-negative` border and focus halo, with no interaction needed; the `.tui-error` line is ordinary markup you render or reveal yourself.

{% include demo.html file="attribute.html" %}

## No success state

`:valid` and `:user-valid` are intentionally unstyled — only errors are signalled, so a filled form reads as calm rather than as a row of green ticks. If a flow needs a positive confirmation, say it in a `.tui-help` line or an [alert](/ui/components/alert/) instead of colouring the control.

{% include demo.html file="no-success.html" %}

| Selector | Effect |
|---|---|
| `input:user-invalid`, `textarea:user-invalid`, `select:user-invalid` | `--tui-negative` border |
| `…:user-invalid:focus` | `--tui-negative` border and a 30% `--tui-negative` focus halo |
| `:is(input, textarea, select):is([aria-invalid="true"], [data-invalid], .tui-invalid)` | The same border and halo, set by attribute |

Related: [Form Layout](/ui/forms/form-layout/) · [Inputs](/ui/forms/inputs/) · [Alert](/ui/components/alert/) · [Tone](/ui/foundations/tone/)
