---
title: Empty State
section: components
source: src/30-components/empty.css
description: "Centred placeholder for a list or panel with nothing in it: icon, title, description and an optional action."
---

An empty state fills a region that has no content yet — a filtered list with no matches, a fresh inbox, an unconfigured integration — with a short explanation and, usually, the one action that fixes it. It carries no outer margin and is meant to sit inside the container that would otherwise hold the content.

## Anatomy

`.tui-empty` is a centred, text-centred flex column in `--tui-text-2` with `--tui-spacing-12 --tui-spacing-6` padding and a `--tui-spacing-4` gap. `.tui-empty-icon` is a 3rem circle on `--tui-surface-2`, its glyph at `--tui-text-2xl` in `--tui-text-3`; `.tui-empty-title` is `--tui-text-lg` semibold, balanced; `.tui-empty-desc` is `--tui-text-sm` in `--tui-text-3`, capped at 24rem so the sentence does not stretch across a wide panel. Any element after them — a button, a link, a row of buttons — becomes the action and is spaced by the same gap.

{% include demo.html file="basic.html" %}

| Class | Effect |
|---|---|
| `.tui-empty` | Centred flex column, generous padding |
| `.tui-empty-icon` | 3rem round icon slot |
| `.tui-empty-title` | Large semibold title |
| `.tui-empty-desc` | Muted small description, max 24rem |
| `.tui-empty-sm` | Compact padding and a 2rem icon |

## Compact

`.tui-empty-sm` trims the padding to `--tui-spacing-6 --tui-spacing-4` and shrinks the icon to a 2rem circle with a `--tui-text-lg` glyph for a sidebar, a card body or a table without rows.

{% include demo.html file="compact.html" %}

Related: [Placeholder](/ui/components/placeholder/) · [Card](/ui/components/card/) · [Panel](/ui/components/panel/) · [Buttons](/ui/components/buttons/)
