---
title: Inputs
section: forms
source: src/20-elements/inputs.css, src/50-forms/input.css
description: "Classless styling for every text-like input, textarea and select, plus size and tone modifiers."
---

Bare `<input>`, `<textarea>` and `<select>` elements are styled directly — no base class. A text-like field fills its container, sits on `--tui-surface-0` with a 2px `--tui-border` outline and `--tui-radius-md` corners, and reacts to hover, focus and `disabled` on its own. Size and tone modifiers are opt-in classes on top of that, and a handful of special types (date, file, range, colour) get their own rules in the same file.

## Text-like fields

The base rule matches `textarea`, `select` and every `<input>` except the types that own their own look. Hover darkens the border to `--tui-border-strong`; focus swaps it for `--tui-border-focus` and adds a `--tui-focus-halo-width` (3px) `--tui-focus-ring` halo; `disabled` dims the field onto `--tui-surface-2` with a `not-allowed` cursor. Placeholders render in `--tui-text-3` at full opacity, so they read the same on both schemes. A `<textarea>` resizes vertically only and starts at a 4rem minimum height.

{% include demo.html file="basic.html" %}

## Excluded types

Input types that own their own look are left out of the base rule so they never inherit a text-field border: `checkbox`, `radio`, `range`, `color`, `file`, `submit`, `reset`, `button`, `hidden` and `image`. Checkbox and radio are styled by their components ([Checkbox](/ui/forms/checkbox/), [Radio](/ui/forms/radio/)), the button types by [Buttons](/ui/components/buttons/), and `range`, `color` and `file` by dedicated rules on this page.

## Sizes

`.tui-input-sm` and `.tui-input-lg` change padding and font size together; the default field uses `--tui-spacing-2` / `--tui-spacing-3` padding, `--tui-text-base` and the button leading (`--tui-leading-snug`), so a field and a button stand the same 42px tall; a `<textarea>` keeps the body leading for typed prose.

{% include demo.html file="sizes.html" %}

| Class | Padding | Font size |
|---|---|---|
| `.tui-input-sm` | `--tui-spacing-1` `--tui-spacing-2` | `--tui-text-sm` |
| (default) | `--tui-spacing-2` `--tui-spacing-3` | `--tui-text-base` |
| `.tui-input-lg` | `--tui-spacing-3` `--tui-spacing-4` | `--tui-text-lg` |

## Tones

The field's border reads the shared `--tui-tone` hook: with a tone set, the resting border and the focused border take the tone colour and the focus halo takes the tone's `-edge` value. `.tui-input-primary`, `.tui-input-success`, `.tui-input-error`, `.tui-input-warning` and `.tui-input-info` are aliases of the generic [tone classes](/ui/foundations/tone/) — `.tui-tone-warning` on an input does exactly what `.tui-input-warning` does. Use these for states you decide server-side; the browser-driven red border after interaction is covered at [Validation](/ui/forms/validation/).

{% include demo.html file="tones.html" %}

| Class | Border and focus |
|---|---|
| `.tui-input-primary` | `--tui-brand` / `--tui-brand-edge` |
| `.tui-input-success` | `--tui-positive` / `--tui-positive-edge` |
| `.tui-input-error` | `--tui-negative` / `--tui-negative-edge` |
| `.tui-input-warning` | `--tui-warning` / `--tui-warning-edge` |
| `.tui-input-info` | `--tui-info` / `--tui-info-edge` |

## Auto-growing field

Add `.tui-field-auto` to a `<textarea>` (or a text-like input) to size it to its content with `field-sizing: content` instead of scrolling. On a textarea the class also sets a floor of three lines and a ceiling of `--tui-textarea-max-block-size` (20 lines), after which it scrolls again.

{% include demo.html file="auto-grow.html" %}

| Class | Effect |
|---|---|
| `.tui-field-auto` | `field-sizing: content` — grows with its content; textareas floor at 3 lines and cap at `--tui-textarea-max-block-size` |

> **Browser note.** `field-sizing` is Chrome 123 and Safari 26. Firefox ignores the class and keeps the fixed-size, scrollable field, so `rows` still matters as the fallback height.

## Date and time

`date`, `time` and `datetime-local` inputs get the text-field look plus a pointer cursor, because clicking anywhere in them opens the native picker.

{% include demo.html file="date-time.html" %}

## File

A file input keeps its native layout with `--tui-spacing-1` padding; the brand-coloured "choose file" button and the muted filename text come from `::file-selector-button`, documented at [Field States](/ui/forms/field-states/).

{% include demo.html file="file.html" %}

## Range

`input[type="range"]` is drawn from scratch: a 6px `--tui-surface-3` track with fully rounded ends and a round `--tui-brand` thumb with a `--tui-surface-0` border, `--tui-shadow-sm` and a `--tui-focus-ring` halo on hover. The thumb diameter is `--tui-range-thumb`, declared on the input as `--tui-spacing-5`, so set it on the input itself to resize it. Painting the track up to the current value is opt-in through `.tui-range-fill`, at [Field States](/ui/forms/field-states/).

{% include demo.html file="range.html" %}

## Color

`input[type="color"]` is a 3rem square with the field border and radius, a pointer cursor, and the same hover and focus treatment as a text field.

{% include demo.html file="color.html" %}

## Select and datalist

A bare `<select>` gets the text-field look with the native arrow replaced by the `--tui-icon-chevron` glyph, right-aligned (left in `:dir(rtl)`); an `<input list>` swaps Chromium's picker indicator for the `--tui-icon-chevron` glyph and tightens its end padding to `--tui-spacing-2`. Both are documented with the rich select at [Select](/ui/forms/select/).

{% include demo.html file="select.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-textarea-max-block-size` | `20lh` | Ceiling of a `textarea.tui-field-auto` before it scrolls |
| `--tui-range-thumb` | `--tui-spacing-5` (set on the input) | Diameter of the range thumb |

Related: [Form Layout](/ui/forms/form-layout/) · [Select](/ui/forms/select/) · [Input Group](/ui/forms/input-group/) · [Validation](/ui/forms/validation/) · [Field States](/ui/forms/field-states/) · [Tone](/ui/foundations/tone/)
