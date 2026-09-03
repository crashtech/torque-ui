---
title: Spinner
section: components
source: src/30-components/spinner.css
description: "Rotating ring for indeterminate waits, in three sizes, with the arc always in the brand colour."
---

A spinner is an empty `inline-block` circle — a `--tui-surface-3` ring whose top edge is painted `--tui-brand` — rotating once every 0.75 seconds. Use it for waits with no known progress; when you do know the percentage, use a [progress](/ui/components/progress/) bar or ring instead. It has no outer margin, so place it in a flex row or a centred block.

## Sizes

The default ring is 2.5rem with a 3px stroke. `.tui-spinner-sm` is 1.5rem with a 2px stroke, for inside buttons and table rows; `.tui-spinner-lg` is 4rem with a 4px stroke, for a whole panel or page. The arc colour is fixed to `--tui-brand` and does not read the tone hook.

{% include demo.html file="sizes.html" %}

## With a label

The element is empty and purely visual, so give the wait a name: either `role="status"` with an `aria-label` on the spinner, or visible text beside it. To dim a whole region and block interaction while it loads, use [busy](/ui/components/busy/), which draws this spinner for you.

{% include demo.html file="label.html" %}

> **Reduced motion.** The global `prefers-reduced-motion: reduce` rule cuts the animation to a single near-instant iteration, so the ring stops spinning and shows as a static circle with a brand-coloured arc. Pair it with text so the wait is still communicated.

| Class | Effect |
|---|---|
| `.tui-spinner` | 2.5rem ring, 3px stroke, 0.75s linear rotation |
| `.tui-spinner-sm` | 1.5rem, 2px stroke |
| `.tui-spinner-lg` | 4rem, 4px stroke |

Related: [Busy](/ui/components/busy/) · [Progress](/ui/components/progress/) · [Placeholder](/ui/components/placeholder/) · [Motion](/ui/foundations/motion/)
