---
title: Speed Dial
section: interactive
source: src/60-interactive/speed-dial.css
description: "A floating action button that opens a column of actions above itself, as a native popover."
---

`.tui-speed-dial` wraps a [`.tui-fab`](/ui/components/buttons/) and a `[popover].tui-speed-dial-actions` column of buttons. The FAB is the `popovertarget` invoker, so the column opens on click, closes on Escape or a click outside, and sits above the FAB with anchor positioning — no script. The wrapper takes over the FAB's fixed position (`--tui-fab-inset` from the bottom and end edges) so both stay together.

## Actions above the FAB

The demo runs in its own frame because the dial pins itself to the viewport it lives in.

{% include demo.html file="basic.html" frame=true height="16rem" %}

| Class | Effect |
|---|---|
| `.tui-speed-dial` | Fixed wrapper at `--tui-fab-inset`, `--tui-z-sticky`; the FAB inside becomes static |
| `.tui-speed-dial-actions` | The `[popover]` column: no surface of its own, `--tui-spacing-2` gap, end-aligned, anchored above the FAB |

> **Browser note.** Anchor positioning is Chrome 125 and Safari 26; below it the column is placed from the same inset as the FAB plus the FAB's height, which is right for the default `--tui-fab-inset`.

Related: [Buttons](/ui/components/buttons/) · [Popover](/ui/interactive/popover/) · [Menu](/ui/interactive/menu/)
