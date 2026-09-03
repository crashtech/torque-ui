---
title: Tooltip
section: interactive
source: src/60-interactive/tooltip.css
description: "Real-element tooltip shown on hover and keyboard focus, wired to its trigger through aria-describedby."
---

A tooltip is a real element, not an `attr()` trick: `.tui-tooltip-host` wraps a focusable trigger that carries `aria-describedby`, and a `.tui-tooltip` element with the matching `id` and `role="tooltip"`. The tip appears above the trigger on hover and on `:focus-visible`, so it is reachable by keyboard as long as the trigger is focusable — a `<button>` or an `<a href>`, never a bare `<span>`.

## Hover and focus

The host is `position: relative; display: inline-flex`, and the tip is absolutely positioned above it, centred, in `--tui-tooltip-bg` with `--tui-tooltip-fg` text at `--tui-text-sm` with balanced wrapping. It fades in over `--tui-duration-fast` and hides again on mouse-out or blur; there is no Escape-to-dismiss, unlike the [popover](/ui/interactive/popover/).

{% include demo.html file="buttons.html" %}

| Class | Effect |
|---|---|
| `.tui-tooltip-host` | Inline-flex wrapper; showing the tip is triggered by `:hover` on it or `:focus-visible` inside it |
| `.tui-tooltip` | The tip: hidden until triggered, `--tui-z-tooltip`, at most `--tui-tooltip-max-inline-size` wide |

## Delay

`--tui-tooltip-delay` holds the tip back for that long once the trigger is hovered or focused — useful on dense toolbars where an instant tip would flicker as the pointer crosses buttons. Set it on the host, the tip or an ancestor.

{% include demo.html file="delay.html" %}

## Placement

Where anchor positioning is supported, the trigger becomes an anchor and the tip is `position: fixed` against the viewport, placed on the block-start side and flipped below the trigger (`position-try-fallbacks: flip-block`) when it would overflow the top. On the floor the tip always sits above the trigger, positioned by inset maths.

> **Browser note.** Anchor positioning is Chrome 125 and Safari 26; each host scopes its anchor name (`anchor-scope`, Chrome 131+), so several tooltips on one page each stay on their own trigger. Below the anchor floor (Chrome 123–124, Safari 17.5, Firefox) the tip is fixed above the trigger with no flip.

One contract follows from the anchored path: because the anchored tip is `position: fixed`, a `transform`, `filter`, `perspective` or `will-change` on any ancestor between the trigger and the viewport becomes its containing block instead, which can misplace or clip the tip.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-tooltip-bg` | `var(--tui-text-1)` | Tip background |
| `--tui-tooltip-fg` | `var(--tui-surface-0)` | Tip text colour |
| `--tui-tooltip-max-inline-size` | `20rem` | Widest the tip grows before wrapping |
| `--tui-tooltip-delay` | `0s` | Delay before the tip appears |

Related: [Popover](/ui/interactive/popover/) · [Buttons](/ui/components/buttons/) · [Icons](/ui/elements/icons/) · [Z-index](/ui/foundations/z-index/)
