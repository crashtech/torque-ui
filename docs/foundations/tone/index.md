---
title: Tone
section: foundations
source: src/30-components/tone.css, src/70-utilities/tone.css
description: "The --tui-tone hook contract every coloured component reads, the generic .tui-tone-* setters, their per-component aliases, and the reset that stops a tone leaking into nested components."
---

A tone is a colour with a job — an intent (brand, success, error, warning, info, neutral) or any of the thirteen [named colours](/ui/foundations/colors/) — expressed as a family of seven custom properties that every coloured component reads. A tone class sets the family; a badge paints `-soft` behind `-ink`, a button paints `--tui-tone` behind `-fg`, an alert paints `-bg` with an `-edge` border. One setter therefore colours any component the same way, and no component carries its own copy of the palette.

## The hook contract

Every tone-aware component reads these seven properties with a neutral fallback, so an element without a tone class renders in greys and an element with one renders in the tone. The values come from the matching [colour tokens](/ui/foundations/colors/).

| Property | Value for tone `<t>` | Typical use |
|---|---|---|
| `--tui-tone` | `--tui-<t>` | Solid fills, borders on solid components, progress bars |
| `--tui-tone-fg` | `--tui-<t>-fg` | Text on a solid `--tui-tone` fill — black or white, auto-picked |
| `--tui-tone-soft` | `--tui-<t>-soft` | Tinted fills: badge, chip, tag, active list row |
| `--tui-tone-edge` | `--tui-<t>-edge` | Borders and glows on tinted components |
| `--tui-tone-bg` | `--tui-<t>-bg` | Pale panel backgrounds: alert, toast |
| `--tui-tone-ink` | `--tui-<t>-ink` | Text on `-soft` and `-bg` fills |
| `--tui-tone-gradient` | `--tui-<t>-gradient` | `.tui-button-gradient`, `.tui-bg-gradient` |

## Generic setters

`.tui-tone-brand`, `.tui-tone-success`, `.tui-tone-error`, `.tui-tone-warning`, `.tui-tone-info` and `.tui-tone-neutral` set the whole family on any element; `.tui-tone-primary` is an alias of `-brand` and `.tui-tone-negative` of `-error`. Every [named colour](/ui/foundations/colors/) works the same way: `.tui-tone-red`, `-orange`, `-yellow`, `-olive`, `-green`, `-teal`, `-blue`, `-violet`, `-purple`, `-pink`, `-brown`, `-grey` and `-black` derive the companion hooks from the name on the spot. Anything tonable therefore takes an intent or a colour interchangeably. Because the setters live in the utilities layer, they win over any component's own colour declarations regardless of specificity — and the per-component aliases below sit at zero specificity, so a generic setter also wins over them on the same element.

{% include demo.html file="generic.html" %}

| Class | Tone |
|---|---|
| `.tui-tone-brand`, `.tui-tone-primary` | Brand |
| `.tui-tone-success` | Positive (`--tui-green`) |
| `.tui-tone-error`, `.tui-tone-negative` | Negative (`--tui-red`) |
| `.tui-tone-warning` | Warning (`--tui-yellow`) |
| `.tui-tone-info` | Info (`--tui-teal`) |
| `.tui-tone-neutral` | Neutral (`--tui-tone-fg` is `--tui-text-inverse`) |
| `.tui-tone-red` | `--tui-red` |
| `.tui-tone-orange` | `--tui-orange` |
| `.tui-tone-yellow` | `--tui-yellow` |
| `.tui-tone-olive` | `--tui-olive` |
| `.tui-tone-green` | `--tui-green` |
| `.tui-tone-teal` | `--tui-teal` |
| `.tui-tone-blue` | `--tui-blue` |
| `.tui-tone-violet` | `--tui-violet` |
| `.tui-tone-purple` | `--tui-purple` |
| `.tui-tone-pink` | `--tui-pink` |
| `.tui-tone-brown` | `--tui-brown` |
| `.tui-tone-grey` | `--tui-grey` |
| `.tui-tone-black` | `--tui-black` |

## Per-component aliases

The component pages document classes like `.tui-badge-success` and `.tui-alert-error`. Each of those is an alias of a generic setter — the same selector list, the same seven properties — kept so markup reads naturally. Every alias is interchangeable with the generic class and with every other alias of the same tone.

| Tone | Aliases |
|---|---|
| Success | `.tui-button-success`, `.tui-badge-success`, `.tui-chip-success`, `.tui-label-success`, `.tui-input-success`, `.tui-alert-success`, `.tui-toast-success`, `.tui-ribbon-success`, `.tui-segment-success`, `.tui-statistic-success`, `.tui-timeline-item-success`, `.tui-progress-success`, `.tui-status-online`, `.tui-status-done`, `.tui-checkbox-success`, `.tui-radio-success`, `.tui-step-complete` |
| Error | `.tui-button-error`, `.tui-badge-error`, `.tui-chip-error`, `.tui-label-error`, `.tui-input-error`, `.tui-alert-error`, `.tui-toast-error`, `.tui-ribbon-error`, `.tui-segment-error`, `.tui-statistic-error`, `.tui-timeline-item-error`, `.tui-progress-error`, `.tui-status-busy`, `.tui-status-error` |
| Warning | `.tui-button-warning`, `.tui-badge-warning`, `.tui-alert-warning`, `.tui-toast-warning`, `.tui-ribbon-warning`, `.tui-timeline-item-warning`, `.tui-progress-warning`, `.tui-input-warning`, `.tui-status-away` |
| Info | `.tui-button-info`, `.tui-badge-info`, `.tui-alert-info`, `.tui-toast-info`, `.tui-input-info` |
| Brand | `.tui-button-primary`, `.tui-badge-primary`, `.tui-chip-primary`, `.tui-label-primary`, `.tui-tag-primary`, `.tui-segment-primary`, `.tui-statistic-primary`, `.tui-card-primary`, `.tui-input-primary`, `.tui-timeline-item-brand`, `.tui-step-active` |
| Neutral | `.tui-ribbon-neutral` |

A component with no alias for a tone — a chip in the warning tone, say — simply takes the generic class.

## The leak reset

Custom properties inherit, so a `.tui-alert-success` would otherwise turn every button, badge and input inside it green. `30-components/tone.css` stops that: every tone-aware component, and the bare `button`, `textarea`, `select` and text-type `input` elements (which read `--tui-tone` directly), resets all seven hook properties to `initial` on itself. Inside a toned parent a nested component is neutral again unless it carries its own tone class — and its own class still wins, because the setters sit in a later layer than the reset.

{% include demo.html file="nested-reset.html" %}

The reset selector is wrapped in `:where()` so it has zero specificity; it works purely by being in the components layer, below the utilities layer that holds the setters. Checkbox, radio, range, colour, file, hidden and image inputs are excluded from the element list: their checked-state colour is read from the `.tui-checkbox`, `.tui-radio` or `.tui-switch` wrapper, which is already in the list, and resetting the input itself would override that. Likewise `.tui-progress-success` carries the tone on the `.tui-progress` wrapper, so the wrapper is what resets, not the bar.

| Reset on | Why |
|---|---|
| `button`, `.tui-button`, `textarea`, `select`, text-type `input`, `progress` | Bare elements read `--tui-tone` in the elements layer |
| `.tui-badge`, `.tui-chip`, `.tui-tag`, `.tui-label`, `.tui-alert`, `.tui-toast`, `.tui-status`, `.tui-ribbon`, `.tui-timeline-item`, `.tui-statistic`, `.tui-segment`, `.tui-step`, `.tui-progress`, `.tui-progress-ring`, `.tui-card`, `.tui-checkbox`, `.tui-radio`, `.tui-switch`, `.tui-list-item`, `.tui-navbar-item` | Every classed component that reads the hook |

## Custom properties

The seven hook properties themselves are the override surface: set any of them inline or in your own CSS next to (or instead of) a tone class and the component reads your value. One extra hook exists only for the named tones:

| Property | Default | Effect |
|---|---|---|
| `--tui-tone` … `--tui-tone-gradient` | unset (components fall back to neutral) | Set directly for a one-off colour without any class |
| `--tui-tone-end` | undeclared | Second stop of a named tone's gradient — the intent tones use `--tui-<tone>-end` instead (see [Colors](/ui/foundations/colors/)) |

Related: [Colors](/ui/foundations/colors/) · [Cascade Layers](/ui/getting-started/layers/) · [Badge](/ui/components/badge/) · [Alert](/ui/components/alert/) · [Buttons](/ui/components/buttons/) · [Color Utilities](/ui/utilities/colors/)
