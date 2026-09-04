---
title: Navbar
section: components
source: src/30-components/navbar.css
js: self-driven
description: "Top bar with a brand, a menu of items and an actions slot; the menu collapses into an offcanvas drawer below 768px."
---

A navbar is a flex row on `--tui-surface-0` with a bottom border and a small shadow: a `.tui-navbar-brand` at the start, a `.tui-navbar-menu` list of `.tui-navbar-item` links, and an optional `.tui-navbar-actions` slot pushed to the end. It spans the full width of whatever it sits in and carries no outer margin, so it belongs at the top of a page, a `.tui-shell-header`, or a framed preview.

## Anatomy

`.tui-navbar` lays its children out with `justify-content: space-between` and a `--tui-spacing-4` gap. The brand is an `--tui-text-xl` bold link in the brand colour that lightens on hover; the menu is a `<ul>` with its list style and margins removed; each item is a small, medium-weight `--tui-text-2` link with `--tui-radius-md` corners that lifts to `--tui-surface-2` on hover. `.tui-navbar-item-active` marks the current page with a 15% brand background and brand ink text.

{% include demo.html file="basic.html" %}

| Class | Effect |
|---|---|
| `.tui-navbar` | Flex row, `--tui-surface-0`, bottom border, `--tui-shadow-sm` |
| `.tui-navbar-brand` | `--tui-text-xl` bold link in `--tui-brand`, no underline, lightens on hover |
| `.tui-navbar-menu` | Unstyled `<ul>`, flex row with a `--tui-spacing-1` gap |
| `.tui-navbar-item` | Small medium-weight link, `--tui-text-2`, hover on `--tui-surface-2` |
| `.tui-navbar-item-active` | Current item: brand at 15% behind `--tui-tone-ink` (brand ink unless a tone class overrides it) |
| `.tui-navbar-toggle` | Menu button, hidden from 768px up |
| `.tui-navbar-actions` | End slot: flex row, `--tui-spacing-2` gap, `margin-inline-start: auto` |

## Logo brand

An inline `<svg>` or `<img>` placed directly inside `.tui-navbar-brand` is sized by the bar, not by the font: it becomes a block 2rem tall with automatic width. Text next to it still takes the brand colour.

{% include demo.html file="logo.html" %}

## Actions slot

`.tui-navbar-actions` is a flex row with a `--tui-spacing-2` gap and an automatic start margin, so it stays at the end of the bar whether the menu is present, inline, or collapsed into its drawer. Put search fields, icon buttons, badges and the dark-mode switch there.

{% include demo.html file="actions.html" %}

## Collapsing menu

Give the menu the `popover` attribute and `.tui-offcanvas-collapse`, and add a `.tui-navbar-toggle` button whose `popovertarget` points at it. Below 768px the menu is a native popover: closed it is `display: none`, opened by the toggle it slides in as an [offcanvas](/ui/interactive/offcanvas/) drawer that stacks the items vertically. From 768px up the toggle is hidden and the drawer is reset to an inline flex row regardless of its popover state. The breakpoint is a media query, not a custom property; the drawer width comes from `--tui-offcanvas-inline-size` (20rem). This demo runs in its own frame — narrow the window below 768px to see the toggle appear and the menu leave the bar.

{% include demo.html file="collapse.html" frame=true height="12rem" %}

## Submenus

A menu item can be a `<button class="tui-navbar-item">` with `popovertarget`, so a `.tui-popover.tui-menu` after it opens on click, closes on Escape or a click outside and hangs under the item — no script. Put a `.tui-caret` in the button and it turns while the popover is open. `.tui-navbar-mega` widens the surface to `--tui-navbar-mega-inline-size` (48rem) and lays it out as a grid of columns, each headed by a `.tui-navbar-mega-title`.

{% include demo.html file="submenu.html" %}

## Script-driven submenu <span class="tui-badge">self-driven JS</span>

A `.tui-navbar-submenu.tui-menu` after the button is an in-flow alternative: absolute under the item at `--tui-z-dropdown`, toggled with `hidden` while the script mirrors the state into `aria-expanded`. Inside the collapsed drawer it becomes part of the list, indented.

{% include demo.html file="submenu-script.html" %}

| Class | Effect |
|---|---|
| `button.tui-navbar-item` | Button element defaults undone so it sits flush with link items |
| `.tui-navbar-mega` | Wide popover surface, `--tui-spacing-4` padding, grid of `minmax(11rem, 1fr)` columns |
| `.tui-navbar-mega-title` | Small-caps column heading |
| `.tui-navbar-submenu` | In-flow submenu surface under the item; indented list in the drawer |

Related: [Offcanvas](/ui/interactive/offcanvas/) · [App Shell](/ui/layout/shell/) · [Buttons](/ui/components/buttons/) · [Badge](/ui/components/badge/) · [Breadcrumb](/ui/components/breadcrumb/)
