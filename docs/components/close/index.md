---
title: Close
section: components
source: src/30-components/close.css
description: "Shared dismiss control: a × button for modals, or a label paired with a hidden checkbox that hides alerts, toasts and chips without JavaScript."
---

`.tui-close` is the one dismiss control every component shares. It is a 2rem square with a decorative `×` drawn by CSS, muted until hovered; the element carries the accessible name itself, so always give it an `aria-label`. It works on a `<button>` when something else handles the click — a `<form method="dialog">` in a [modal](/ui/interactive/modal/) — or on a `<label>` wired to a hidden checkbox for pure-CSS dismissal.

## Button and label

Both elements render identically: no border, no background, `--tui-close-color` for the glyph, `--tui-radius-md` corners, and a `--tui-surface-2` fill with `--tui-text-1` text on hover. The label form needs a `for` pointing at a checkbox and, on its own, does nothing more than toggle it.

{% include demo.html file="elements.html" %}

## The dismiss mechanism

Inside a `.tui-alert`, `.tui-toast` or `.tui-chip`, a `.tui-state-input.tui-dismiss` checkbox that is a direct child makes the component disappear when checked: `:has(> .tui-dismiss:checked)` fades the opacity and sets `display: none`, with a discrete display transition so the fade is visible. The `.tui-close` label follows the checkbox as its next sibling, which is also what gives it the focus ring when the hidden checkbox is focused through the keyboard. The state lives in the checkbox, so the component stays hidden until the page reloads.

{% include demo.html file="dismiss.html" %}

Each component positions the control itself: the alert pins it to the top end corner and pads its text away from it, the toast lets it sit at the end of the row, the chip shrinks it to 1rem.

## Sizing and colour

`--tui-close-size` sets the square and `--tui-close-color` the resting glyph colour. Set them inline or on a parent — the chip does exactly this to fit the control into its line height.

{% include demo.html file="hooks.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-close-size` | `2rem` | Inline and block size of the control |
| `--tui-close-color` | `var(--tui-text-3)` | Glyph colour at rest; hover always uses `--tui-text-1` |

Related: [Alert](/ui/components/alert/) · [Toast](/ui/components/toast/) · [Chip](/ui/components/chip/) · [Modal](/ui/interactive/modal/) · [State Inputs](/ui/foundations/state-inputs/)
