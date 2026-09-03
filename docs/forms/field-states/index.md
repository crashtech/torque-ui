---
title: Field States
section: forms
source: src/50-forms/form-enhancements.css
js: self-driven
description: "Native control enhancements: brand accent-color, read-only and placeholder dimming, range fill, file button, progress and meter."
---

These rules polish native controls that have no component class: they tint unstyled checkboxes, radios, ranges and progress bars with the brand colour, dim read-only fields and fields that only show a placeholder, paint a range track up to its value, style the file input's button and draw native `<progress>` and `<meter>`. Everything here is attribute- or state-driven, so it applies to plain HTML without further markup.

## Accent colour

Native `input[type="checkbox"]`, `input[type="radio"]`, `input[type="range"]`, `input[type="color"]`, `<progress>` and `<meter>` take `accent-color: var(--tui-brand)`. A bare checkbox in a table cell, or a radio you never gave the component class, still matches the palette — including in dark mode, where the brand token flips with the scheme.

{% include demo.html file="accent.html" %}

## Read-only

An `<input>` or `<textarea>` with the `readonly` attribute renders on `--tui-surface-2` in `--tui-text-3`, so it reads as displayed rather than editable while staying focusable and selectable. The rule keys on the attribute rather than `:read-only`, because `:read-only` also matches every `<select>` and every non-text input.

{% include demo.html file="readonly.html" %}

## Placeholder shown

An input, textarea or select that matches `:placeholder-shown` — it has a placeholder and no value yet — is dimmed to `--tui-text-3`, so an empty form reads as lighter than a filled one. Type into the field and the text returns to `--tui-text-1`.

{% include demo.html file="placeholder.html" %}

## Range fill

A bare range is a flat track ([Inputs](/ui/forms/inputs/)); add `.tui-range-fill` and set `--tui-range-value` to a percentage on the input to paint the track in `--tui-brand` up to that point. CSS cannot read the slider's value, so the property has to be written by whatever changes the value — a server-rendered `style`, or a one-line `input` listener in your own code. The fill only applies while the value is `:in-range`; an `:out-of-range` value falls back to the flat `--tui-surface-3` track. A change of the value animates over `--tui-duration-normal` (`.tui-motion-none` makes it instant).

{% include demo.html file="range-fill.html" %}

### Fill from data-value <span class="tui-badge">self-driven JS</span>

`--tui-range-value` is a registered percentage. Where typed `attr()` exists (Chrome 133+) the input reads it from its own `data-value` (0–100), so an `input` listener that writes `el.dataset.value = el.value` is all the script there is; elsewhere write the property in `style` as above.

{% include demo.html file="range-data.html" %}

## File button

`input[type="file"]` shows its filename in `--tui-text-2`, and its `::file-selector-button` becomes a small brand button: `--tui-text-sm` semibold `--tui-brand-fg` on `--tui-brand`, `--tui-radius-sm` corners, `--tui-spacing-3` of end margin before the filename, darkened 15% on hover.

{% include demo.html file="file.html" %}

## Progress and meter

A native `<progress value max>` is a full-width 0.5rem bar with fully rounded ends on `--tui-surface-3`, its value painted in `--tui-tone` (brand by default) — so any [tone class](/ui/foundations/tone/) recolours it. `<meter>` gets the same width and height and keeps the native low/high/optimum colouring on top of the brand accent. `progress.tui-progress-inline` restates the inline variant from [Progress](/ui/components/progress/) at this layer, turning a native bar into an inline-block of `--tui-progress-inline-size` (8rem) that sits mid-line with text.

{% include demo.html file="progress.html" %}

## Waveform

`.tui-waveform` masks a native `<progress>` into uniform 2px bars, 1.5rem tall, for an audio-style scrubber; a bare progress is full-width, so pair it with `.tui-progress-inline` (and `--tui-progress-inline-size`) to give the scrubber a set width. The bars are evenly spaced — a real waveform needs amplitude data the mask cannot know — but the filled portion still tracks the value and the tone.

{% include demo.html file="waveform.html" %}

| Selector | Effect |
|---|---|
| `input[type="checkbox"]`, `[type="radio"]`, `[type="range"]`, `[type="color"]`, `progress`, `meter` | `accent-color: var(--tui-brand)` |
| `input[readonly]`, `textarea[readonly]` | `--tui-surface-2` background, `--tui-text-3` text |
| `.tui-range-fill:in-range` | Track painted in `--tui-brand` up to `--tui-range-value` |
| `.tui-range-fill:out-of-range` | Flat `--tui-surface-3` track |
| `input:placeholder-shown`, `textarea:placeholder-shown`, `select:placeholder-shown` | `--tui-text-3` text |
| `input[type="file"]::file-selector-button` | Small brand button before the filename |
| `progress` | 0.5rem rounded bar, value in `--tui-tone` |
| `meter` | Full width, 0.5rem tall |
| `progress.tui-progress-inline` | Inline-block bar, `--tui-progress-inline-size` wide |
| `.tui-waveform` | Progress masked into 2px bars, 1.5rem tall, radius reset to 0 |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-range-value` | `50%` | How far along the track `.tui-range-fill` paints; registered with `@property`, read from `data-value` where typed `attr()` exists |
| `--tui-progress-inline-size` | `8rem` | Width of `progress.tui-progress-inline` |

Related: [Inputs](/ui/forms/inputs/) · [Progress](/ui/components/progress/) · [Checkbox](/ui/forms/checkbox/) · [Radio](/ui/forms/radio/) · [Tone](/ui/foundations/tone/)
