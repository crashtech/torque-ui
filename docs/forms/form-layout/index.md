---
title: Form Layout
section: forms
source: src/50-forms/form.css
js: self-driven
description: "Flex and grid wrappers that space fields, labels, help and error lines with gap instead of margins."
---

Form layout in Torque UI is a set of flex and grid wrappers: `.tui-form` stacks fields, `.tui-form-grid` and `.tui-form-inline` lay them out side by side, and `.tui-field` binds a label, a control and a help or error line into one column. Every one of them spaces its children with `gap`, so the controls themselves carry no margins — drop a field into any wrapper and it lines up.

## Field

`.tui-field` is a flex column with a `--tui-spacing-3` gap; the label, help and error lines are trimmed to their cap height, so the gap is the true distance to the control. A `<label>` that is a direct child of the field is styled as the field label — `--tui-text-sm`, medium weight, `--tui-text-2` — purely by position: there is no field-label class. Do not reach for `.tui-label` here; that is the metadata pill documented at [Label](/ui/components/label/), and putting it on a form label would draw a pill instead of a caption. `.tui-help` is a small `--tui-text-3` line for hints; put it after the control.

{% include demo.html file="field.html" %}

| Class | Effect |
|---|---|
| `.tui-field` | Flex column, `--tui-spacing-3` gap |
| `.tui-field > label` | Field caption: `--tui-text-sm`, `--tui-font-medium`, `--tui-text-2` |
| `.tui-help` | Hint line: `--tui-text-sm`, `--tui-text-3` |
| `.tui-error` | Error line: `--tui-text-sm`, `--tui-negative` |

## Stacked form

`.tui-form` is a flex column with a `--tui-spacing-4` gap between fields, buttons and anything else you put in it. Put it on the `<form>` itself; hidden inputs take no space, so they can sit anywhere in the column.

{% include demo.html file="stacked.html" %}

## Grid form

`.tui-form-grid` is an auto-fit grid with 200px minimum columns and a `--tui-spacing-4` gap, so a row of fields packs as many across as the container allows and wraps the rest. Narrow the container and it collapses to one column without a media query.

{% include demo.html file="grid.html" %}

## Inline form

`.tui-form-inline` is a wrapping, vertically centred flex row — a filter bar or a quick search. Inside it, `.tui-field-inline` puts a label and its control side by side (a `--tui-spacing-2` gap, centred) instead of stacking them.

{% include demo.html file="inline.html" %}

| Class | Effect |
|---|---|
| `.tui-form` | Flex column, `--tui-spacing-4` gap |
| `.tui-form-grid` | `repeat(auto-fit, minmax(200px, 1fr))` grid, `--tui-spacing-4` gap |
| `.tui-form-inline` | Wrapping flex row, centred, `--tui-spacing-4` gap |
| `.tui-field-inline` | Flex row: label beside control, `--tui-spacing-2` gap |

## Fieldset

A bare `<fieldset>` needs no class: it gets a 1px `--tui-border` border with `--tui-radius-md` corners, `--tui-spacing-4` / `--tui-spacing-6` padding and a semibold `<legend>`, and it is itself a flex column with a `--tui-spacing-3` gap. Its direct children have their margins reset, so fields and paragraphs inside sit on the gap alone. For a row of checkboxes or radios, wrap them in `.tui-fieldset-inline`, a wrapping flex row with a `--tui-spacing-4` gap.

{% include demo.html file="fieldset.html" %}

## Error line

`.tui-error` is the message that goes with an invalid control: `--tui-text-sm` in `--tui-negative`, placed after the control inside the field. The red border on the control itself comes from `:user-invalid`, documented at [Validation](/ui/forms/validation/) — the line and the border are independent, so you can render a server-side message without the browser having flagged the field.

{% include demo.html file="error.html" %}

## Busy form <span class="tui-badge">self-driven JS</span>

`aria-busy="true"` on a `<form>` or `<fieldset>` is the submitting state: every field takes the disabled look, secondary buttons dim, the pointer is blocked, and the submit button (a `<button>` with no `type` or `type="submit"`) shows the [loading spinner](/ui/components/buttons/). Set it when the request starts and remove it when the response lands — the demo does so for two seconds.

{% include demo.html file="busy.html" %}

| Selector | Effect |
|---|---|
| `:is(form, fieldset)[aria-busy="true"]` | `pointer-events: none`, progress cursor |
| `…[aria-busy="true"] :is(input, select, textarea)` | Disabled look: `--tui-surface-2`, `--tui-text-3`, 70% opacity |
| `…[aria-busy="true"] button:not(submit)` | 50% opacity |
| `…[aria-busy="true"] :is(button:not([type]), button[type="submit"])` | Spinner over a transparent label |

Related: [Inputs](/ui/forms/inputs/) · [Validation](/ui/forms/validation/) · [Label](/ui/components/label/) · [Stack](/ui/layout/stack/) · [Grid](/ui/layout/grid/)
