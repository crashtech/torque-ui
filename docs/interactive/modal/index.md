---
title: Modal
section: interactive
source: src/60-interactive/modal.css
description: "Native <dialog> styled as a modal, opened declaratively with commandfor and closed by any button inside a method=dialog form."
---

`.tui-modal` styles a native `<dialog>`: a centred surface over a scheme-matched, blurred `::backdrop` — a white haze on a light page, a black one on a dark page — with a fade-and-rise entrance and the browser's own focus trap, Escape handling and inert page. It opens from a button carrying `commandfor` and `command="show-modal"`, and closes from any button inside a `<form method="dialog">` — the header and footer are exactly that. Because the dialog renders in the top layer, the demos on this page work inline.

## Confirm dialog

The `<dialog>` takes `.tui-modal` and an `aria-labelledby` pointing at its heading. `.tui-modal-header` and `.tui-modal-footer` are `<form method="dialog">` elements, so the shared [close](/ui/components/close/) button and the footer buttons close the dialog with no script; a button's `value` becomes the dialog's `returnValue` if you do read it later.

{% include demo.html file="confirm.html" %}

> **Browser note.** `commandfor` / `command="show-modal"` is Chrome 135, Safari 26 and Firefox 144. On the floor add one line of JavaScript to open the dialog: `document.querySelectorAll('[command=show-modal]').forEach(b => b.addEventListener('click', () => document.getElementById(b.getAttribute('commandfor')).showModal()))`. Closing, Escape, the focus trap and the backdrop need nothing — they are native `<dialog>` behaviour.

| Class | Effect |
|---|---|
| `.tui-modal` | The `<dialog>`: `--tui-modal-max-inline-size` wide (minus viewport gutters), `--tui-modal-radius` corners, `--tui-shadow-xl`; the `::backdrop` is `--tui-modal-backdrop` behind a 4px blur |
| `.tui-modal-header` | Flex row, space-between, rule below — a `<form method="dialog">` holding the title and the close button |
| `.tui-modal-body` | `--tui-spacing-6` padding; scrolls when the dialog hits its maximum height |
| `.tui-modal-footer` | Flex row, end-aligned, rule above — a `<form method="dialog">` holding the actions |

## Long content

The dialog is capped at the viewport height minus two gutters, and `.tui-modal-body` has `overflow: auto`, so a tall body scrolls inside the dialog while the header and footer stay put.

{% include demo.html file="long.html" %}

## Motion

Opening fades the dialog in and lifts it by `--tui-spacing-4` over `--tui-duration-normal`, entering from a `@starting-style` state; closing reverses it through `overlay` and `display` transitions with `allow-discrete`, so the surface fades out before leaving the top layer. The `::backdrop` rides the same mechanism — its opacity fades in from `@starting-style` and out through the same `allow-discrete` transition. Both respect the global reduced-motion rule from [Motion](/ui/foundations/motion/).

> **Browser note.** The entry/exit fade needs `@starting-style` and `allow-discrete` (Chrome 117 / Safari 17.4 / Firefox 129). Below that the dialog and backdrop appear and disappear instantly; state is still correct.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-modal-max-inline-size` | `32rem` | Widest the dialog grows |
| `--tui-modal-bg` | `var(--tui-surface-0)` | Dialog background |
| `--tui-modal-backdrop` | `light-dark(rgb(255 255 255 / 0.5), rgb(0 0 0 / 0.5))` | `::backdrop` colour |
| `--tui-modal-radius` | `var(--tui-radius-xl)` | Corner radius |

Related: [Close](/ui/components/close/) · [Buttons](/ui/components/buttons/) · [Popover](/ui/interactive/popover/) · [Offcanvas](/ui/interactive/offcanvas/) · [Sheet](/ui/interactive/sheet/) · [Z-index](/ui/foundations/z-index/)
