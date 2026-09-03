---
title: Stack
section: layout
source: src/40-layout/stack.css
description: "A flex column that spaces its children with gap, so components that carry no outer margin still sit apart."
---

Components carry no outer margins. When alerts, panels, cards or form rows should sit one under another with a consistent rhythm, wrap them in a `.tui-stack`: a flex column whose `gap` comes from `--tui-stack-gap`. Nothing inside needs a margin utility, and the first and last children sit flush against the edges of the stack.

## Default stack

The gap defaults to `--tui-spacing-4` (1rem).

{% include demo.html file="default.html" %}

## Tight and loose

`.tui-stack-sm` sets `--tui-stack-gap` to `--tui-spacing-2` (0.5rem); `.tui-stack-lg` sets it to `--tui-spacing-6` (1.5rem). Because the modifiers only set the custom property, a nested stack can carry a different size from its parent.

{% include demo.html file="sizes.html" %}

| Class | Gap |
|---|---|
| `.tui-stack` | `var(--tui-stack-gap, var(--tui-spacing-4))` |
| `.tui-stack-sm` | `--tui-spacing-2` |
| `.tui-stack-lg` | `--tui-spacing-6` |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-stack-gap` | `var(--tui-spacing-4)` | Space between the children of the stack |

Related: [Flexbox](/ui/layout/flexbox/) · [Grid](/ui/layout/grid/) · [Spacing](/ui/utilities/spacing/) · [Alert](/ui/components/alert/) · [Form Layout](/ui/forms/form-layout/)
