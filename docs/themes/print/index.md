---
title: Print
section: themes
source: src/80-themes/print.css
description: "The print stylesheet: screen-only chrome removed, disclosure widgets forced open, external links spelled out, cards kept on one page."
---

Every rule in `80-themes/print.css` sits under `@media print` and needs no markup changes: it reshapes whatever is already on the page so a printout reads as a document rather than a screenshot of an interface. Toggles, floating actions, toasts and popovers disappear; tabs, collapses and carousel slides all show at once; links reveal their address.

## What is removed

| Selector | Why |
|---|---|
| `.tui-navbar-toggle` | The hamburger opens a drawer that is not printed |
| `.tui-fab` | A fixed floating action has no place on paper |
| `.tui-toast`, `.tui-toast-stack` | Transient notifications |
| `.tui-reading-progress` | A scroll indicator for a page that does not scroll |
| `.tui-carousel-dots` | Slide navigation — the slides themselves are all printed |
| `[popover]` | Menus, popovers, offcanvas drawers, sheets; a closed `<dialog>` already prints nothing on its own |
| `[popovertarget]` | The buttons that open them, since the surface is gone |

## What is forced open

| Selector | Effect |
|---|---|
| `.tui-collapse-body`, `.tui-tab-panel` | `display: block` — every tab panel is shown, not only the checked one |
| `.tui-carousel-track` | `display: grid; overflow: visible` — every slide stacks in a column instead of clipping to the current one |
| `.tui-collapse::details-content` | `display: block; content-visibility: visible` — a closed accordion prints open |

CSS cannot force a closed `<details>` open on its own; the `::details-content` rule does it on browsers that implement the pseudo-element and is kept in its own `@media print` block because an unknown pseudo-element would invalidate the whole selector list it appears in.

> **Browser note.** `::details-content` needs Chrome 131. Elsewhere a section that is closed on screen prints closed — open it before printing if its content matters.

## Other adjustments

| Selector | Effect |
|---|---|
| `:root` | `color-scheme: light`, so every `light-dark()` token resolves to its light value on paper regardless of the reader's dark-mode preference |
| `a[href^="http"]::after` | Appends ` (https://…)` in `--tui-text-xs` and `--tui-text-3`, since a printed link cannot be clicked |
| `.tui-tab` | `border-block-end-color: transparent`, so the active underline does not survive onto paper |
| `.tui-card`, `.tui-list-group` | `break-inside: avoid` — a card or list is never split across a page boundary |
| `.tui-shell` | `display: block` — the app shell drops its grid and prints as one linear column |
| `.tui-shell-sidebar` | Hidden — navigation is not content |

## Print preview

The framed page below has a navbar with a toggle, a collapsed section and a card with an external link. Open it in print preview (focus the frame, then Ctrl/Cmd + P) to see the toggle vanish, the collapse open and the link grow its address.

{% include demo.html file="page.html" frame=true height="22rem" %}

Related: [Collapse](/ui/interactive/collapse/) · [Tabs](/ui/interactive/tabs/) · [Navbar](/ui/components/navbar/) · [App Shell](/ui/layout/shell/) · [Dark Mode](/ui/themes/dark-mode/)
