---
title: Tree
section: components
source: src/30-components/tree.css
description: "Nested list of native <details> branches and link leaves with guide lines, no JavaScript."
---

A tree is a nested `<ul>` of `<li>` where a branch is a `<details class="tui-tree-node">` whose `<summary>` toggles the `<ul>` inside it, and a leaf is an `<a>` or `<span>` with `.tui-tree-leaf`. Open and closed state is native `<details>` behaviour, so it needs no script and works with the keyboard out of the box. Unlike a `.tui-collapse` ([collapse](/ui/interactive/collapse/)), a tree node has no open/close transition — only the disclosure triangle rotates.

## Anatomy

`.tui-tree` and every nested `<ul>` lose their margins, padding and bullets, and `<li>` rows lose the bare-list rhythm. Each nested `<ul>` is indented by `--tui-tree-indent` (`--tui-spacing-5`), offset `--tui-spacing-3` from its parent row so the guide falls on the axis of the disclosure triangle, and draws a 1px guide line in `--tui-tree-guide` (`--tui-border`) down its start edge. A summary and a leaf share one row style: a flex row with a `--tui-spacing-2` gap, `--tui-spacing-1` / `--tui-spacing-2` padding, `--tui-radius-sm` corners, `--tui-text-1` text with no underline, and a `--tui-surface-1` hover. The native marker is hidden and replaced by a `▸` in `--tui-text-3` that rotates 90 degrees while the node is `[open]`.

{% include demo.html file="basic.html" %}

## Rows with extras

Because rows are flex, a status dot, a badge or an icon drops in before or after the text with no extra markup. A `<span>` leaf marks an item that is not a link.

{% include demo.html file="extras.html" %}

## Guides and indent

Override `--tui-tree-indent` and `--tui-tree-guide` on the tree to tighten the nesting or colour the guide lines; both are plain hooks, so a value set on any ancestor applies.

{% include demo.html file="hooks.html" %}

| Class / selector | Effect |
|---|---|
| `.tui-tree`, `.tui-tree ul` | Unstyled lists; nested lists indented with a guide line |
| `.tui-tree li` | Row rhythm reset |
| `.tui-tree-node` | A `<details>` branch; its `> summary` is the clickable row |
| `.tui-tree-node[open] > summary::before` | Disclosure triangle rotated 90° |
| `.tui-tree-leaf` | An `<a>` or `<span>` row styled like a summary |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-tree-indent` | `var(--tui-spacing-5)` | Start padding of each nested list |
| `--tui-tree-guide` | `var(--tui-border)` | Colour of the vertical guide line |

Related: [Collapse](/ui/interactive/collapse/) · [List Group](/ui/components/list-group/) · [Lists](/ui/elements/lists/) · [Status](/ui/components/status/)
