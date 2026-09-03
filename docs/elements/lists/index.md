---
title: Lists
section: elements
source: src/20-elements/lists.css
description: "Bare <ul>, <ol> and <dl> get markers, indentation and item rhythm; lists that carry a class are left to their component."
---

Unordered, ordered and definition lists are styled for running text. Only a list with no `class` attribute receives the per-item spacing: every list-shaped component (list group, tree, timeline, breadcrumb, menu) lays its items out with gap or borders and must not inherit item margins, so `:is(ul, ol):not([class]) > li` is the selector that adds the rhythm.

## Unordered lists

`<ul>` gets disc markers, `--tui-spacing-6` start padding and a `--tui-spacing-6` bottom margin that is dropped on the last child. Each `<li>` of a bare list is trimmed to its cap height and followed by `--tui-spacing-3`, with the last item ending flush.

{% include demo.html file="unordered.html" %}

## Ordered lists

`<ol>` is identical apart from its decimal markers.

{% include demo.html file="ordered.html" %}

## Nested lists

A `<ul>` or `<ol>` that is a direct child of an `<li>` gets `--tui-spacing-3` above it and no margin below, so the nested block sits inside its parent item without opening a gap under it.

{% include demo.html file="nested.html" %}

## Definition lists

`<dl>` takes the same trailing margin as the other lists. `<dt>` is `--tui-font-semibold` in `--tui-text-1` with a `--tui-spacing-2` gap to its definition; `<dd>` is indented by `--tui-spacing-4` in `--tui-text-2`, keeps a `--tui-spacing-2` gap before a following definition and a `--tui-spacing-4` gap before the next term (none after the last). For label/value rows in a settings panel or a record view, use the [Key/Value](/ui/components/key-value/) component instead.

{% include demo.html file="definition.html" %}

Related: [Typography](/ui/elements/typography/) · [List Group](/ui/components/list-group/) · [Key/Value](/ui/components/key-value/) · [Tree](/ui/components/tree/)
