---
title: Cycle
section: interactive
source: src/60-interactive/cycle.css
description: "A control that steps through any number of states on each click, built from radios and labels that point at the next radio."
---

`.tui-cycle` wraps a run of [state inputs](/ui/foundations/state-inputs/), radios that share a `name`. Each radio is followed by a label whose `for` points at the *next* radio, and the last label points back at the first. Only the label after the checked radio shows, so a click checks the next radio and its label takes over. The markup alone decides how many states there are and in which order they come. Check one radio up front, or nothing shows.

## States

The keyboard follows the same ring: the checked radio holds the focus, the arrow keys step through the group, and the visible label draws the focus ring. The label a reader sees belongs to the next radio, so give each radio an `aria-label` that names its own state, and the wrapper `role="radiogroup"` with a name. A form submits the checked radio's `value`.

{% include demo.html file="states.html" %}

| Class | Effect |
|---|---|
| `.tui-cycle` | Inline-flex wrapper; hides every label whose radio is not checked |
| `.tui-cycle > label` | A state's face, with a pointer cursor; its `for` names the next radio |

The [table select-all box](/ui/elements/tables/) is a cycle whose radios carry the table's selection modes.

Related: [State Inputs](/ui/foundations/state-inputs/) · [Toggle Group](/ui/interactive/toggle-group/) · [Tables](/ui/elements/tables/)
