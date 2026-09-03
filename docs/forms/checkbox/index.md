---
title: Checkbox
section: forms
source: src/50-forms/checkbox.css
description: "Label-wrapped checkbox drawn with appearance: none, filled with the tone colour when checked."
---

`.tui-checkbox` is a `<label>` wrapping a `.tui-checkbox-input` and a `<span>` of text. The box is a real `<input type="checkbox">` drawn from scratch with `appearance: none`, so it keeps its keyboard behaviour, form value and `:checked` state while looking like part of the design. Checkboxes carry no outer margin: stack them in a `.tui-checkbox-group` or lay them out with `gap`.

## Anatomy

The label is an inline-flex row with a `--tui-spacing-2` gap, pointer cursor and no text selection, so the whole row toggles the box. `.tui-checkbox-input` is a 1.25rem square with a 2px `--tui-border` outline, `--tui-radius-sm` corners and a `--tui-surface-0` fill; it darkens on hover and, when checked, fills with the tone colour (brand by default) and paints a white tick — the tick is baked into an SVG data URI, so unlike the [radio](/ui/forms/radio/) dot it cannot follow `--tui-tone-fg`; keep checkbox tones dark enough for white. The `<span>` renders at `--tui-text-base` in `--tui-text-1`.

{% include demo.html file="basic.html" %}

## Group

`.tui-checkbox-group` is a flex column with a `--tui-spacing-2` gap for a list of related options. Give the inputs the same `name` and distinct `value`s so the form submits every checked one.

{% include demo.html file="group.html" %}

## Inline

Add `.tui-checkbox-group-inline` to the group to turn it into a wrapping row with a `--tui-spacing-4` gap. `.tui-checkbox-inline` on each label is the matching inline-flex, centred item; the two are meant to be used together.

{% include demo.html file="inline.html" %}

## Tones

The checked fill and border read the shared `--tui-tone` hook. `.tui-checkbox-success` is the alias from the [tone setters](/ui/foundations/tone/) that turns a checked box green; any `.tui-tone-*` class on the label does the same for its colour.

{% include demo.html file="tones.html" %}

| Class | Effect |
|---|---|
| `.tui-checkbox` | Label row: inline-flex, `--tui-spacing-2` gap, pointer |
| `.tui-checkbox-input` | The drawn box; fills with `--tui-tone` (brand) and a tick when checked |
| `.tui-checkbox span` | Option text, `--tui-text-base`, `--tui-text-1` |
| `.tui-checkbox-group` | Flex column, `--tui-spacing-2` gap |
| `.tui-checkbox-group-inline` | Turns the group into a wrapping row, `--tui-spacing-4` gap |
| `.tui-checkbox-inline` | Inline-flex, centred item for an inline group |
| `.tui-checkbox-success` | Tone alias: checked box in `--tui-positive` |

A checkbox without the component class is still tinted: native checkboxes take `accent-color: var(--tui-brand)`, documented at [Field States](/ui/forms/field-states/). For a hidden checkbox that drives other markup, use a [state input](/ui/foundations/state-inputs/) instead.

Related: [Radio](/ui/forms/radio/) · [Switch](/ui/forms/switch/) · [Form Layout](/ui/forms/form-layout/) · [State Inputs](/ui/foundations/state-inputs/) · [Tone](/ui/foundations/tone/)
