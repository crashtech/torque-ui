---
title: Radio
section: forms
source: src/50-forms/radio.css
description: "Label-wrapped radio drawn with appearance: none, with a tone-coloured ring and dot when checked."
---

`.tui-radio` has the same shape as a [checkbox](/ui/forms/checkbox/): a `<label>` wrapping a `.tui-radio-input` and a `<span>` of text, with the round control drawn from scratch by `appearance: none`. It is still a real `<input type="radio">`, so radios that share a `name` are mutually exclusive and arrow keys move between them. Radios carry no outer margin: stack them in a `.tui-radio-group` or lay them out with `gap`.

## Anatomy

The label is an inline-flex row with a `--tui-spacing-2` gap and a pointer cursor. `.tui-radio-input` is a 1.25rem circle with a 2px `--tui-border` outline on `--tui-surface-0`; on hover the border darkens, and when checked the whole circle takes the tone colour with a `--tui-tone-fg` dot in the middle, drawn by a radial gradient. The `<span>` renders at `--tui-text-base` in `--tui-text-1`.

{% include demo.html file="basic.html" %}

## Group

`.tui-radio-group` is a flex column with a `--tui-spacing-2` gap. The inputs must share a `name` to behave as one choice; give each a distinct `value`.

{% include demo.html file="group.html" %}

## Inline

Add `.tui-radio-group-inline` to the group for a wrapping row with a `--tui-spacing-4` gap, and `.tui-radio-inline` on each label for the matching inline-flex, centred item.

{% include demo.html file="inline.html" %}

## Tones

The checked ring and fill read `--tui-tone`, and the centre dot reads `--tui-tone-fg`, so a toned radio keeps its contrast. `.tui-radio-success` is the alias from the [tone setters](/ui/foundations/tone/); any `.tui-tone-*` class on the label works the same way.

{% include demo.html file="tones.html" %}

| Class | Effect |
|---|---|
| `.tui-radio` | Label row: inline-flex, `--tui-spacing-2` gap, pointer |
| `.tui-radio-input` | The drawn circle; `--tui-tone` (brand) ring and fill with a `--tui-tone-fg` dot when checked |
| `.tui-radio span` | Option text, `--tui-text-base`, `--tui-text-1` |
| `.tui-radio-group` | Flex column, `--tui-spacing-2` gap |
| `.tui-radio-group-inline` | Turns the group into a wrapping row, `--tui-spacing-4` gap |
| `.tui-radio-inline` | Inline-flex, centred item for an inline group |
| `.tui-radio-success` | Tone alias: checked radio in `--tui-positive` |

A radio without the component class is still tinted through `accent-color: var(--tui-brand)`, documented at [Field States](/ui/forms/field-states/). Radios that pick a colour or an image rather than a line of text have their own components: [Color Check](/ui/forms/color-check/) and [Image Check](/ui/forms/image-check/).

Related: [Checkbox](/ui/forms/checkbox/) · [Switch](/ui/forms/switch/) · [Segment](/ui/components/segment/) · [Toggle Group](/ui/interactive/toggle-group/) · [Tone](/ui/foundations/tone/)
