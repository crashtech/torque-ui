---
title: Switch
section: forms
source: src/50-forms/switch.css
description: "Checkbox-driven on/off toggle with an animated thumb and a tone-coloured checked track."
---

A switch is a checkbox that looks like a toggle: `.tui-switch` is a `<label>` wrapping a `.tui-switch-input` and a `.tui-switch-label`. Use it for a setting that takes effect immediately or reads naturally as on/off; use a [checkbox](/ui/forms/checkbox/) when the option is one of several to tick before submitting. It carries no outer margin.

## Anatomy

The label is an inline-flex row with a `--tui-spacing-2` gap, a pointer cursor and no text selection. `.tui-switch-input` is a 3rem by 1.5rem pill on `--tui-surface-3` with a 2px `--tui-border` outline; its `::before` is the 1rem thumb, a `--tui-surface-0` circle with `--tui-shadow-sm`, inset 2px so it centres in the 20px left inside the borders. Checking it colours the track and border with the tone (brand by default) and slides the thumb 1.5rem to the end, recolouring it with `--tui-tone-fg`. Both moves are `--tui-duration-fast` transitions. `.tui-switch-label` is the text beside it at `--tui-text-base` in `--tui-text-1`.

{% include demo.html file="basic.html" %}

## Tones

The checked track reads the shared `--tui-tone` hook and the thumb reads `--tui-tone-fg`, so any generic [tone class](/ui/foundations/tone/) on the label changes the on colour; there are no switch-specific aliases.

{% include demo.html file="tones.html" %}

| Class | Effect |
|---|---|
| `.tui-switch` | Label row: inline-flex, `--tui-spacing-2` gap, pointer |
| `.tui-switch-input` | The track; `--tui-tone` (brand) when checked |
| `.tui-switch-input::before` | The thumb; slides to the end and takes `--tui-tone-fg` when checked |
| `.tui-switch-label` | Text beside the track, `--tui-text-base`, `--tui-text-1` |

Related: [Checkbox](/ui/forms/checkbox/) · [Radio](/ui/forms/radio/) · [Form Layout](/ui/forms/form-layout/) · [Dark Mode](/ui/themes/dark-mode/) · [Tone](/ui/foundations/tone/)
