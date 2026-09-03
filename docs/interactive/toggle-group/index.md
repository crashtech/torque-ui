---
title: Toggle Group
section: interactive
source: src/60-interactive/toggle-group.css
js: self-driven
description: "Bordered row of toggle buttons backed by hidden checkboxes or radios, with per-option colours, a small size and wrapping."
---

`.tui-toggle-group` is a `<fieldset>` rendered as a single bordered, rounded row of `.tui-toggle` labels. Each label follows its own hidden input: checkboxes make a multi-select group, radios a single-select one, and the checked input paints the label that follows it in `--tui-toggle-active-bg`. Every input needs an `id` and its label the matching `for`, and the pair must be adjacent siblings. The group is inline and carries no outer margin.

## Multi-select

Checkbox inputs toggle independently. The inputs are [state inputs](/ui/foundations/state-inputs/), so each option is reachable by Tab and shows a focus ring on its label. Give the fieldset a `.tui-sr-only` legend to name the group.

{% include demo.html file="checkbox.html" %}

| Class | Effect |
|---|---|
| `.tui-toggle-group` | Inline-flex `<fieldset>`, `--tui-toggle-border` edge, `--tui-radius-md` corners, no padding |
| `.tui-toggle-input` | The hidden input (add `.tui-state-input`); `:checked` colours the next `.tui-toggle` |
| `.tui-toggle` | An option: `--tui-text-sm`, `--tui-text-2`, no wrapping, a rule between options, outer corners inherited from the group |
| `.tui-toggle:is([aria-pressed="true"], [aria-checked="true"], [data-pressed], [data-selected], .tui-pressed, .tui-selected)` | Painted as a checked option |

## Single-select

Radio inputs sharing a `name` make the group exclusive — one option is always on, like a segmented control.

{% include demo.html file="radio.html" %}

## Button toggles <span class="tui-badge">self-driven JS</span>

A group your script drives uses real `<button class="tui-toggle">` options in a `role="group"` container instead of hidden inputs. The button element defaults are undone so it sits flush with a label toggle, and `aria-pressed="true"` (or `aria-checked="true"`, `data-pressed`, `data-selected`, `.tui-pressed`, `.tui-selected`) paints the option exactly as `:checked` does. Nothing submits on its own; mirror the state into the form yourself.

{% include demo.html file="buttons.html" %}

## Per-option colours

A modifier on the label changes the colour that option takes when checked, by overriding `--tui-toggle-active-bg` and `--tui-toggle-active-fg` on that label only — so a three-state sync control reads green, grey and red without touching the group.

{% include demo.html file="tones.html" %}

| Class | Checked background | Checked text |
|---|---|---|
| `.tui-toggle` | `--tui-brand` | `--tui-brand-fg` |
| `.tui-toggle-success` | `--tui-positive` | `--tui-positive-fg` |
| `.tui-toggle-warning` | `--tui-warning` | `--tui-warning-fg` |
| `.tui-toggle-error` | `--tui-negative` | `--tui-negative-fg` |
| `.tui-toggle-neutral` | `--tui-surface-3` | `--tui-text-1` |

## Small

`.tui-toggle-group-sm` shrinks every option to `--tui-text-xs` with `--tui-spacing-2` padding — for toolbars and table headers.

{% include demo.html file="small.html" %}

## Wrapping

Options never wrap internally (`white-space: nowrap`), and the group itself overflows rather than wrapping by default. `.tui-toggle-group-wrap` lets a long group break onto a second row; the first and last option keep the rounded outer corners, and the inner corners on the second row stay square.

{% include demo.html file="wrap.html" %}

| Class | Effect |
|---|---|
| `.tui-toggle-group-sm` | Smaller padding and `--tui-text-xs` options |
| `.tui-toggle-group-wrap` | Options wrap onto further rows instead of overflowing |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-toggle-border` | `var(--tui-border)` | Group edge and the rules between options |
| `--tui-toggle-active-bg` | `var(--tui-brand)` | Background of a checked option |
| `--tui-toggle-active-fg` | `var(--tui-brand-fg)` | Text colour of a checked option |

Related: [Segment](/ui/components/segment/) · [State Inputs](/ui/foundations/state-inputs/) · [Checkbox](/ui/forms/checkbox/) · [Radio](/ui/forms/radio/) · [Buttons](/ui/components/buttons/) · [Tabs](/ui/interactive/tabs/)
