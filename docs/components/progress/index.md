---
title: Progress
section: components
source: src/30-components/progress.css
js: self-driven
description: "Bar, ring, half-circle meter, inline bar and poll option, all driven by one --tui-progress-value number instead of an inline width."
---

Progress components share a single input: `--tui-progress-value`, a plain number from 0 to 100. The bar fill, the conic ring, the half-circle meter (which maps it to half a turn) and the poll option's soft backdrop all multiply it into a percentage themselves, so the markup never sets a width. The fill colour is the shared `--tui-tone` hook, falling back to `--tui-brand`.

## Bar

`.tui-progress` is the track — full width, `--tui-progress-thickness` (8px) tall, `--tui-surface-3`, fully rounded, clipping its content. `.tui-progress-bar` inside it is `calc(var(--tui-progress-value) * 1%)` wide and animates width changes over `--tui-duration-normal`. Set the value on the bar (a custom property inherits, so an ancestor works too) and give the track `role="progressbar"` with `aria-valuenow` for assistive tech.

{% include demo.html file="bar.html" %}

## Animated changes

Every change of the value animates over `--tui-duration-normal`: the bar transitions its width, and the ring, meter and poll option transition the registered `--tui-progress-value` itself, which is what lets a conic or linear gradient move at all. Add `.tui-motion-none` to a component that must render its value instantly — a value known at first paint, or a print. Reduced-motion users get instant changes everywhere.

{% include demo.html file="motion-none.html" %}

## Value from the attribute <span class="tui-badge">self-driven JS</span>

`--tui-progress-value` is a registered property (`@property`, a number, inherited) and reads itself from the markup where typed `attr()` exists: `aria-valuenow` on the track, ring, meter or poll option, then `data-value`, which beats it by source order; an inline `style` beats both. A script that updates `aria-valuenow` therefore moves the bar with no style writes, and the number assistive technology announces can never disagree with the fill.

{% include demo.html file="attribute.html" %}

> **Browser note.** Typed `attr()` is Chrome 133+. Safari and Firefox keep the property at `0` until it is set directly — the inline style in the other demos on this page — so mirror the value into `style` as well where those browsers matter.

## Sizes

`.tui-progress-sm` sets `--tui-progress-thickness` to 0.25rem and `.tui-progress-lg` to 1rem; set the property yourself for any other stroke, on a bar, a ring or a meter. The bar always fills the track's height.

{% include demo.html file="sizes.html" %}

## Tones

`.tui-progress-success`, `.tui-progress-warning` and `.tui-progress-error` are aliases of the generic [tone classes](/ui/foundations/tone/); any `.tui-tone-*` (`.tui-tone-info`, `.tui-tone-neutral`) colours the fill the same way. The tone goes on the track or the ring, and the bar reads it.

{% include demo.html file="tones.html" %}

## Ring

`.tui-progress-ring` draws the same value as a conic gradient — the tone colour up to the value, `--tui-progress-ring-track` for the rest — masked into a `--tui-progress-thickness` stroke. It is `--tui-progress-ring-size` (4rem) wide with a square aspect ratio, so anything you place beside or over it (a percentage, an icon) is your own layout.

{% include demo.html file="ring.html" %}

## Meter

`.tui-progress-meter` is the half-circle gauge: the same conic sweep as the ring, centred on the bottom edge, so 180 degrees is the whole 0-100 scale. It is `--tui-progress-meter-size` (8rem) wide at a 2:1 aspect ratio with `--tui-progress-meter-track` behind the value, masked into the same `--tui-progress-thickness` stroke. Give it `role="meter"` — it shows a level, not the progress of a task.

{% include demo.html file="meter.html" %}

## Inline

`.tui-progress-inline` turns a bar into an `inline-block`, `--tui-progress-inline-size` (8rem) wide and vertically centred in the line — for "3 / 10" readouts inside a sentence or a table cell. The same class works on a native `<progress>` element, which is restyled by the forms layer and takes the same tones.

{% include demo.html file="inline.html" %}

## Poll option

`.tui-poll-option` is a bordered flex row (label at the start, result at the end) whose background is a `--tui-tone-soft` fill sized to `--tui-progress-value` — a bar drawn behind the text rather than beside it. Untoned it uses `--tui-brand-soft`; a tone class swaps the fill.

{% include demo.html file="poll.html" %}

| Class | Effect |
|---|---|
| `.tui-progress` | Track: 100% wide, 0.5rem, `--tui-surface-3`, rounded, `overflow: hidden` |
| `.tui-progress-bar` | Fill sized from `--tui-progress-value`, coloured by `--tui-tone` or `--tui-brand` |
| `.tui-progress-sm` / `.tui-progress-lg` | `--tui-progress-thickness` 0.25rem / 1rem |
| `.tui-progress-success` / `-warning` / `-error` | Tone aliases for the fill |
| `.tui-progress-ring` | Conic ring, `--tui-progress-ring-size` wide, 0.5rem stroke |
| `.tui-progress-meter` | Half-circle gauge, `--tui-progress-meter-size` wide, 2:1 ratio, 0.5rem stroke |
| `.tui-progress-inline` | Inline-block bar, `--tui-progress-inline-size` wide (component or native `<progress>`) |
| `.tui-poll-option` | Flex row with a tone-soft fill behind the text sized by the value |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-progress-value` | `0` | Percent as a plain number, read by the bar, the ring and the poll option; registered with `@property`, and read from `aria-valuenow` / `data-value` where typed `attr()` exists |
| `--tui-progress-thickness` | `8px` | Track height of the bar and stroke of the ring and meter; registered with `@property`, whose initial value cannot be font-relative |
| `--tui-progress-inline-size` | `8rem` | Width of `.tui-progress-inline` |
| `--tui-progress-ring-size` | `4rem` | Diameter of `.tui-progress-ring` |
| `--tui-progress-ring-track` | `--tui-surface-3` | Colour of the unfilled part of the ring |
| `--tui-progress-meter-size` | `8rem` | Width of `.tui-progress-meter` (height is half) |
| `--tui-progress-meter-track` | `--tui-surface-3` | Colour of the unfilled part of the meter |

Related: [Spinner](/ui/components/spinner/) · [Busy](/ui/components/busy/) · [Statistic](/ui/components/statistic/) · [Chart](/ui/components/chart/) · [Tone](/ui/foundations/tone/)
