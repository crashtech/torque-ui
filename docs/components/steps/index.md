---
title: Steps
section: components
source: src/30-components/steps.css
description: "Numbered step indicator with connector lines, lit by .tui-step-complete and .tui-step-active or automatically inside a wizard."
---

Steps show where the user is in a sequence: equal-width `.tui-step` columns, each a numbered circle over a label, joined by a connector line. On its own the indicator is static — you mark the finished steps `.tui-step-complete` and the current one `.tui-step-active`. Inside a [wizard](/ui/interactive/wizard/) it lights itself from the checked radio, and those two classes still win when set explicitly.

## Anatomy

`.tui-steps` is a wrapping flex row with a `--tui-steps-gap` (`--tui-spacing-4`) between steps. Each `.tui-step` is a `flex: 1` column centred on its `.tui-step-number` — a `--tui-step-size` (`--tui-spacing-8`, 2rem) circle with a 2px border — and a `--tui-text-sm` `.tui-step-label` in `--tui-text-3` below it. Every step but the last draws a 2px connector after itself, centred on the circle rather than on circle plus label, running from this circle's edge to the next one's with `--tui-step-connector-inset` of breathing room at each end.

{% include demo.html file="basic.html" %}

## States

The circle, its border and the connector all read `--tui-tone`, falling back to `--tui-surface-3` and `--tui-border`. `.tui-step-complete` sets the positive tone (the circle fills green with `--tui-tone-fg` text, the label lifts to `--tui-text-2`); `.tui-step-active` sets the brand tone, adds a `--tui-focus-ring` halo around the circle and makes the label `--tui-text-1` medium. Both are aliases of the generic [tone classes](/ui/foundations/tone/), so a plain `.tui-tone-*` on a step colours it without the label or ring changes. A step with neither class is upcoming. Put a check glyph in a completed circle instead of its number.

{% include demo.html file="states.html" %}

## Sizing

`--tui-steps-gap` is declared on `.tui-steps` and `--tui-step-size` on each `.tui-step`, so override the gap on the container and the size on the steps themselves (an inline style on the container cannot beat the step's own declaration). `--tui-step-connector-inset` is a plain hook and can be set anywhere above the steps.

{% include demo.html file="sizing.html" %}

| Class | Effect |
|---|---|
| `.tui-steps` | Wrapping flex row, `--tui-steps-gap` between steps |
| `.tui-step` | `flex: 1` column; every step but the last draws the connector after it |
| `.tui-step-number` | `--tui-step-size` circle, 2px border, tone or `--tui-surface-3` fill |
| `.tui-step-label` | `--tui-text-sm`, `--tui-text-3`; `--tui-text-2` when complete, `--tui-text-1` medium when active |
| `.tui-step-complete` | Positive tone on circle and connector |
| `.tui-step-active` | Brand tone, focus-ring halo, emphasised label |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-steps-gap` | `var(--tui-spacing-4)` | Gap between steps (declared on `.tui-steps`) |
| `--tui-step-size` | `var(--tui-spacing-8)` | Circle diameter (declared on each `.tui-step`) |
| `--tui-step-connector-inset` | `var(--tui-spacing-2)` | Space between a connector's ends and the circles it joins |

Related: [Wizard](/ui/interactive/wizard/) · [Progress](/ui/components/progress/) · [Timeline](/ui/components/timeline/) · [Breadcrumb](/ui/components/breadcrumb/)
