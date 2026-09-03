---
title: Panel
section: components
source: src/30-components/panel.css
description: "Flat bordered container with a tinted header and a padded body; a second header inside it acts as a section divider."
---

A panel is the flat sibling of the [card](/ui/components/card/): a `--tui-surface-0` box with a 1px `--tui-border` border and `--tui-radius-lg` corners, no shadow and no hover state, split into a `.tui-panel-header` and a `.tui-panel-body`. Use it for grouped settings, sidebars and forms that should read as one region without elevation. Like every container it carries no outer margin — stack several with a `.tui-stack`.

## Header and body

The header has `--tui-spacing-4` / `--tui-spacing-6` padding on a `--tui-surface-1` background, a bottom border, semibold `--tui-text-1` text with `text-wrap: balance`, and inherits the panel's top radii so the tint fills the corners. The body pads by `--tui-spacing-6`, wraps long words, sets `text-wrap: pretty`, and gives its direct children a margin reset with a `--tui-spacing-6` rhythm between them, so headings, paragraphs and buttons inside need no utilities.

{% include demo.html file="basic.html" %}

## Sections

A `.tui-panel-header` that is not the first child becomes a divider: it gains a top border and loses its rounded corners, so one panel can hold several titled sections without nesting.

{% include demo.html file="sections.html" %}

## Flush list

A `.tui-list-group-flush` placed directly after a `.tui-panel-header` drops its own top rule, so the header border and the first row do not double up.

{% include demo.html file="flush-list.html" %}

| Class | Effect |
|---|---|
| `.tui-panel` | `--tui-surface-0`, 1px `--tui-border`, `--tui-radius-lg`, no shadow |
| `.tui-panel-header` | `--tui-surface-1` header, bottom border, semibold, balanced wrapping, inherits top radii |
| `.tui-panel-header:not(:first-child)` | Section divider: top border added, corners squared |
| `.tui-panel-body` | `--tui-spacing-6` padding, child margins reset, `--tui-spacing-6` rhythm |

Related: [Card](/ui/components/card/) · [Segment](/ui/components/segment/) · [List Group](/ui/components/list-group/) · [Stack](/ui/layout/stack/)
