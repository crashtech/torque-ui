---
title: Dark Mode
section: themes
source: src/80-themes/forced-toggle.css
js: self-driven
description: "Automatic dark mode from the OS preference, a checkbox toggle that inverts it, pinned schemes, and scheme-only visibility for sun and moon icons."
---

Dark mode needs no class and no script: `:root` declares `color-scheme: light dark` and every colour token is a `light-dark()` pair, so the browser resolves each token from `prefers-color-scheme` and native controls, scrollbars and dialog backdrops follow along. This file adds what the preference alone cannot: a user-operated toggle, a way to pin a subtree to one scheme, and two visibility helpers for the toggle's icons.

## Automatic

Nothing is redefined in a media query. Surfaces, text, borders, shadows, semantic tones and chart series all flip with the OS setting, and a card written once is correct in both.

{% include demo.html file="automatic.html" %}

Nothing needs a `data-theme` attribute; a script that persists a choice may set one (below). To re-theme, override `--tui-brand` — see [Colors](/ui/foundations/colors/).

## Forced toggle

A hidden `.tui-state-input.tui-theme-toggle-input` checkbox plus a label lets the user override their system preference. The input must be an **earlier sibling** of a `.tui-page` element: the rule is `:checked ~ .tui-page`, so only markup inside that `.tui-page` is affected. `.tui-page` is a plain hook — it carries no styles of its own, so give it a background (`.tui-bg-surface-0`) and a text colour (`.tui-text-1`) if it is not the whole document.

Checked means "the opposite of what the OS asked for". On a light system a checked toggle makes the page dark; on a dark system a checked toggle makes it light — so a dark-OS user can switch to light exactly as a light-OS user can switch to dark. The state does not persist across a reload; that would need JavaScript.

{% include demo.html file="toggle.html" frame=true height="18rem" %}

Because `.tui-state-input` paints a focus ring on its next sibling, and here that sibling is the whole page, `.tui-theme-toggle-input:focus-visible + .tui-page` suppresses the outline — put the label before the page (as in the demo) so the ring lands on the label instead.

| Selector | Effect |
|---|---|
| `.tui-theme-toggle-input:checked ~ .tui-page` | `color-scheme: dark` on the page |
| `@media (prefers-color-scheme: dark)` → same selector | `color-scheme: light` — the inversion |
| `.tui-theme-toggle-input:focus-visible + .tui-page` | `outline: none`, so a focused toggle never outlines the page |

## Persisted choice <span class="tui-badge">self-driven JS</span>

The checkbox toggle cannot survive a reload. A script that stores the user's choice sets `data-theme="dark"` or `"light"` on `<html>` — before first paint, to avoid a flash — and the scheme follows it regardless of the OS preference, `.tui-light-only` and `.tui-dark-only` included. Remove the attribute to return to the automatic scheme.

{% include demo.html file="persisted.html" frame=true height="10rem" %}

| Selector | Effect |
|---|---|
| `:root[data-theme="dark"]` / `"light"` | `color-scheme` forced for the whole document; the scheme-only helpers follow |

## Scheme-only visibility

`.tui-light-only` and `.tui-dark-only` render an element only in the **effective** scheme — the OS preference, inverted if a `.tui-theme-toggle-input` anywhere in the document is checked. They exist for the sun/moon icons of a toggle label, which must show the scheme you would switch *to*: the demo above uses them, and its label reads "Switch to dark" on a light page and "Switch to light" on a dark one. The helpers use `:root:has(.tui-theme-toggle-input:checked)`, so they see a toggle anywhere on the page; a pinned `.tui-scheme-*` scope is not taken into account.

| Class | Shown when |
|---|---|
| `.tui-light-only` | Effective scheme is light |
| `.tui-dark-only` | Effective scheme is dark |

## Pinned schemes

For a subtree that should stay on one scheme regardless of the toggle or the preference, add `.tui-scheme-light` or `.tui-scheme-dark`. Each sets `color-scheme` on that element, so every `light-dark()` token inside resolves accordingly. Putting `.tui-scheme-dark` on `<html>` makes a dark-only app.

{% include demo.html file="pinned.html" %}

| Class | Effect |
|---|---|
| `.tui-scheme-light` | `color-scheme: light` on that subtree |
| `.tui-scheme-dark` | `color-scheme: dark` on that subtree |

Related: [Colors](/ui/foundations/colors/) · [State Inputs](/ui/foundations/state-inputs/) · [High Contrast](/ui/themes/high-contrast/) · [Accessibility](/ui/themes/accessibility/)
