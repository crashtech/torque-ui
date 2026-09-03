---
title: State Inputs
section: foundations
source: src/60-interactive/_state.css
description: "The hidden-but-focusable checkbox and radio that every zero-JavaScript interaction in the framework is built on."
---

Torque UI has no scripts, so every piece of on-page state — which tab is open, whether an alert has been dismissed, whether dark mode is forced — is a native `<input type="checkbox">` or `<input type="radio">`. `.tui-state-input` is the one class that makes such an input invisible while keeping it in the tab order and keyboard-operable; component classes like `.tui-tab-input` or `.tui-dismiss` then decide what its `:checked` state does.

## `.tui-state-input`

The input is positioned absolutely, shrunk to one pixel with a `-1px` margin, clipped with `clip-path: inset(50%)` and `overflow: clip`, and made transparent with `opacity: 0`. It is not `display: none` and not `visibility: hidden` on purpose: both would remove it from the accessibility tree and the tab order, and a hidden checkbox that cannot be reached from the keyboard is not a control. A `<label for="…">` (or a wrapping `<label>`) is the visible, clickable surface, and the label's `for` must resolve to the input's `id`.

| Class | Effect |
|---|---|
| `.tui-state-input` | Visually hidden, still focusable and still announced |
| `.tui-state-input:focus-visible + *` | Draws the framework focus ring (`var(--tui-focus-ring-width)` solid `var(--tui-focus-ring-strong)`, 2px offset) on the input's next sibling |

The focus rule is why the markup contract is always *input, then label*: when the invisible input receives keyboard focus, its next sibling — the visible label — shows the ring, so the user can see where they are. Components that follow this contract include tabs (`.tui-tab-input`), toggle groups (`.tui-toggle-input`), rating (`.tui-rating-input`), the wizard (`.tui-wizard-input`), the password reveal (`.tui-password-toggle`), the dismiss mechanism (`.tui-dismiss`) and the [dark-mode toggle](/ui/themes/dark-mode/) (`.tui-theme-toggle-input`). The [Switch](/ui/forms/switch/) is the exception: it restyles a visible `appearance: none` input instead.

## Dismissing

`.tui-dismiss` on a state input followed by a `.tui-close` label removes the enclosing alert, toast or chip when checked — `:has(> .tui-dismiss:checked)` on the component fades `opacity` to 0 and sets `display: none`, transitioned with `allow-discrete` so the fade plays out. Tab to the chip and press Space to see the ring on the close label, then the chip disappear.

{% include demo.html file="dismiss.html" %}

## Toggling

A toggle group is a row of state inputs, each followed by a `.tui-toggle` label; `.tui-toggle-input:checked + .tui-toggle` paints the active option. Checkboxes give a multi-select group, radios sharing a `name` give an exclusive one.

{% include demo.html file="toggle.html" %}

## Selecting

A `<label class="tui-list-item">` wrapping a bare `.tui-state-input` checkbox becomes a selectable row: `.tui-list-item:has(> .tui-state-input:checked)` applies the active background. Here the input has no component class at all — the list group reads the state directly.

{% include demo.html file="selectable.html" %}

Related: [Tabs](/ui/interactive/tabs/) · [Toggle Group](/ui/interactive/toggle-group/) · [Close](/ui/components/close/) · [List Group](/ui/components/list-group/) · [Dark Mode](/ui/themes/dark-mode/) · [Accessibility](/ui/themes/accessibility/)
