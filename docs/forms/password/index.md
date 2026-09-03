---
title: Password
section: forms
source: src/50-forms/password.css
description: "Masked text input with a show/hide toggle driven by a hidden checkbox, no JavaScript."
---

`.tui-password` is a flex row holding a masked `.tui-password-input`, a hidden `.tui-password-toggle` checkbox and the `.tui-password-label` (here dressed as a `.tui-button-icon` with an eye glyph) that flips it. The input is `type="text"` masked with `-webkit-text-security: disc`; checking the toggle removes the mask, so "show password" needs no script. Because the field is not `type="password"`, give it `autocomplete="current-password"` (or `new-password`) so password managers still recognise it.

> **Browser note.** The masking rides `-webkit-text-security`, a prefixed property that every supported engine implements. In an engine without it the field would show its text in the clear — treat the component as enhancement over a native `type="password"` only where you have verified support.

## Reveal toggle

The wrapper is a flex row with a `--tui-spacing-2` gap; the input flexes to fill it. The toggle is a [state input](/ui/foundations/state-inputs/) — `.tui-state-input` hides it visually while keeping it focusable — and the wrapper's `:has(.tui-password-toggle:checked)` rule unmasks the input while it is checked. `.tui-password-label` is the visible control: `--tui-text-2` text with a pointer cursor and no text selection. The toggle and its label are bound with `for`/`id`, so they can be anywhere inside the wrapper.

{% include demo.html file="basic.html" %}

## Inside a field

The wrapper is a normal flex row, so it slots into a `.tui-field` under a label like any other control; the field's `<label for>` points at the input, and the toggle keeps its own label.

{% include demo.html file="in-field.html" %}

| Class | Effect |
|---|---|
| `.tui-password` | Flex row, `--tui-spacing-2` gap; unmasks the input while its toggle is checked |
| `.tui-password-input` | Text input masked with `-webkit-text-security: disc`, `flex: 1` |
| `.tui-password-toggle` | The checkbox that controls the mask; pair with `.tui-state-input` to hide it |
| `.tui-password-label` | The visible show/hide control, `--tui-text-2`, pointer |

Related: [Inputs](/ui/forms/inputs/) · [State Inputs](/ui/foundations/state-inputs/) · [Form Layout](/ui/forms/form-layout/) · [Validation](/ui/forms/validation/)
