---
title: Image Check
section: forms
source: src/50-forms/image-check.css
description: "Radio group rendered as image thumbnails, with a brand ring and a check badge on the chosen one."
---

An image check is a set of radios drawn as thumbnails: `.tui-image-check-group` holds `label.tui-image-check` items, each with a hidden `.tui-image-check-input` radio, a `.tui-image-check-frame` around an `<img>`, and an optional `.tui-image-check-label` caption. The radio keeps its form value and arrow-key navigation while the picture shows the choice. Use it for a theme, a layout, a cover image — anything where the option is easier to recognise than to name.

## Thumbnails

The group is a wrapping flex row with a `--tui-spacing-3` gap. Each `.tui-image-check` is a relative, inline-flex label with a pointer cursor and its `.tui-image-check-input` positioned away — it must come immediately before the frame, since every checked and focus style rides the `input:checked + .tui-image-check-frame` sibling combinator — and transparent, so the frame takes the click. `.tui-image-check-frame` is a 5rem square with a 2px `--tui-border` outline, `--tui-radius-md` corners and `overflow: hidden` on `--tui-surface-2`; the `<img>` inside fills it with `object-fit: cover`. Hover darkens the border. The checked frame takes a `--tui-brand` border and a soft brand halo, and paints a round `--tui-brand` badge with a white tick in its top end corner. Keyboard focus draws a `--tui-focus-ring-strong` ring. Every image needs an `alt` naming the option, because it is the only text a screen reader has.

{% include demo.html file="basic.html" %}

## Captions

`.tui-image-check-label` is a caption positioned just above the frame, centred, in `--tui-text-xs` `--tui-text-2`, hidden until the label is hovered — a tooltip-style hint rather than a permanent title. Because it is invisible by default and `pointer-events: none`, keep the `alt` as the accessible name and use the caption as a visual extra. Wrap the group in a `<fieldset>` with a `<legend>` so the question is announced with the options.

{% include demo.html file="captions.html" %}

| Class | Effect |
|---|---|
| `.tui-image-check-group` | Wrapping flex row, `--tui-spacing-3` gap |
| `.tui-image-check` | Relative inline-flex label, pointer; darkens its frame on hover |
| `.tui-image-check-input` | The radio, positioned away and transparent |
| `.tui-image-check-frame` | 5rem square thumbnail frame; brand border, halo and check badge when checked |
| `.tui-image-check-frame img` | Fills the frame with `object-fit: cover` |
| `.tui-image-check-label` | Caption above the frame, shown on hover |

Related: [Color Check](/ui/forms/color-check/) · [Radio](/ui/forms/radio/) · [Images](/ui/elements/images/) · [Carousel](/ui/interactive/carousel/) · [Form Layout](/ui/forms/form-layout/)
