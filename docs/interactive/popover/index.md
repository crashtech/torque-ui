---
title: Popover
section: interactive
source: src/60-interactive/popover.css
description: "Surface for any [popover] element — anchored under its invoker where the browser can, a bottom sheet where it cannot."
---

`.tui-popover` gives any `[popover]` element a bordered, shadowed surface that opens from a `popovertarget` button with no script: click, touch and keyboard all work, Escape closes it, and a click outside dismisses it. Where anchor positioning is supported the surface hangs off its invoker; elsewhere it becomes a bottom sheet with a dimmed backdrop. Popovers render in the top layer, so the demos work inline.

## Rich popover

Any markup works inside — a heading with `.tui-popover-title`, a paragraph, a form. The surface is `--tui-popover-padding` deep, between `--tui-popover-min-inline-size` and `--tui-popover-max-inline-size` wide, and fades in with a small drop from above over `--tui-duration-fast`. Because the surface padding is only `--tui-spacing-1` (sized for menu rows), give prose content its own padding.

{% include demo.html file="rich.html" %}

| Class | Effect |
|---|---|
| `.tui-popover` | The `[popover]` surface: `--tui-popover-bg`, `--tui-popover-border`, `--tui-radius-md`, `--tui-shadow-lg` |
| `.tui-popover-title` | Semibold `--tui-text-base` heading with a `--tui-spacing-2` gap below |

## Menu popover

Add `.tui-menu` alongside `.tui-popover` to turn the surface into a dropdown of actions; the items and dividers are documented on the [Menu](/ui/interactive/menu/) page. Put both classes on the same element: a combined class that sets its own `display` (like `.tui-menu`'s `grid`) would otherwise beat the browser's closed-popover `display: none`, so `.tui-popover` reasserts `display: none` while closed at higher specificity, and that guard only reaches a class sharing its element.

{% include demo.html file="menu.html" %}

## Invoker adjacency

The popover element is anchored to the button that opened it — the popovertarget invoker is the implicit anchor, so no `anchor-name` is declared anywhere and several popovers on one page each follow their own button. Keeping the popover right after its invoker in the DOM keeps the focus order sane — put anything in between and it anchors to the wrong button. If you need the open surface in flow instead (documentation, a mockup), use `.tui-popover-static` from the [Window](/ui/components/window/) component: the same box, no `[popover]`, no invoker.

## Positioning

With anchor positioning the surface sits below the invoker, its start edge aligned to the button's (`position-area: block-end span-inline-end`) with a `--tui-spacing-1` gap and a transparent backdrop; when it would overflow it flips above, then to the other inline side (`position-try-fallbacks: flip-block, flip-inline`). Without it, a top-layer element can only be placed relative to the viewport, so the surface is centred at the bottom of the screen over a 20% dimmed backdrop.

> **Browser note.** Anchor positioning is Chrome 125 and Safari 26. Chrome 123–124, Safari 17.5 and Firefox get the bottom-sheet fallback. The fade-in via `@starting-style` needs Chrome 117, Safari 17.4 or Firefox 129; below that the popover appears instantly.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-popover-bg` | `var(--tui-surface-0)` | Surface background |
| `--tui-popover-border` | `var(--tui-border)` | Surface border colour |
| `--tui-popover-padding` | `var(--tui-spacing-1)` | Inner padding |
| `--tui-popover-min-inline-size` | `12rem` | Narrowest the surface renders |
| `--tui-popover-max-inline-size` | `24rem` | Widest the surface grows |

Related: [Menu](/ui/interactive/menu/) · [Window](/ui/components/window/) · [Tooltip](/ui/interactive/tooltip/) · [Offcanvas](/ui/interactive/offcanvas/) · [Sheet](/ui/interactive/sheet/) · [Buttons](/ui/components/buttons/)
