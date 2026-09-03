---
title: Wizard
section: interactive
source: src/60-interactive/wizard.css
description: "Multi-step form driven by hidden radios, with Back/Next labels and a Steps indicator that lights up from the current step."
---

`.tui-wizard` is a bordered flex column holding a [Steps](/ui/components/steps/) indicator and a series of step panels. Each `.tui-wizard-input` radio is immediately followed by its `.tui-wizard-step`; only the panel after the checked radio is shown, and `.tui-wizard-nav` labels pointing at another step's radio act as Back and Next. Because the whole thing is one `<form>`, every step's fields submit together. The wizard carries no outer margin.

## Steps and panels

Reuse the `.tui-steps` / `.tui-step` / `.tui-step-number` / `.tui-step-label` markup from the [Steps](/ui/components/steps/) component inside the wizard, then list the radio-and-panel pairs. The wizard sets the `--tui-tone*` family on every `.tui-step` up to the checked one, so the indicator lights through the current step with no classes. Give each radio a `.tui-sr-only` label so assistive tech can name the step; the radios are [state inputs](/ui/foundations/state-inputs/) and stay in the tab order.

{% include demo.html file="steps.html" %}

The wizard is a flex column with a `--tui-spacing-6` gap between the indicator and the visible panel, and the visible panel is itself a flex column with a `--tui-spacing-4` gap, so fields and the nav row need no margins of their own.

| Class | Effect |
|---|---|
| `.tui-wizard` | Bordered flex column, `--tui-wizard-padding` inside, `--tui-wizard-radius` corners |
| `.tui-wizard-input` | The hidden radio (add `.tui-state-input`); `:checked` shows the next `.tui-wizard-step` and lights the indicator through its position |
| `.tui-wizard-step` | A step panel, hidden unless its radio is checked; flex column with a `--tui-spacing-4` gap when shown |
| `.tui-wizard-nav` | Flex row, space-between, for Back and Next labels or the submit button |

## Step tone precedence

Auto-lighting is generated for up to eight steps and is locked out by an explicit `.tui-step-complete` or `.tui-step-active` on a step: those always win, whatever the source order. A step you have marked complete keeps its positive tone even when the wizard would paint it brand, so a form that knows a step was validated can say so.

{% include demo.html file="precedence.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-wizard-padding` | `var(--tui-spacing-6)` | Inner padding of the wizard |
| `--tui-wizard-radius` | `var(--tui-radius-md)` | Corner radius of the wizard border |

Related: [Steps](/ui/components/steps/) · [State Inputs](/ui/foundations/state-inputs/) · [Form Layout](/ui/forms/form-layout/) · [Tabs](/ui/interactive/tabs/) · [Buttons](/ui/components/buttons/)
