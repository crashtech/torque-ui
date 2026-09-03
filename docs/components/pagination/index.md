---
title: Pagination
section: components
source: src/30-components/pagination.css
description: "Row of page links with a brand-filled current page and an attribute-driven disabled state."
---

A pagination is a flex row of page links: every `<a>` or `<span>` inside `.tui-pagination` becomes a 2.5rem bordered box on `--tui-surface-0`, the current page is painted with the brand colour, and a link marked `aria-disabled="true"` fades and stops receiving pointer events. It carries no outer margin; centre or end-align it with a flex utility on a wrapper.

## Anatomy

Use a `<ul class="tui-pagination">` of `<li>` (the list style and margins are removed) with one `<a>` per page, or a `<span>` for an item that is not a link, such as an ellipsis. Both render the same box: `min-inline-size` and `block-size` of 2.5rem, `--tui-text-sm` medium text in `--tui-text-2`, a `--tui-border` border and `--tui-radius-md` corners. Hover lifts the box to `--tui-surface-2` and strengthens the border. Wrap the list in a `<nav aria-label="Pagination">` so assistive tech announces it as a landmark.

{% include demo.html file="basic.html" %}

## Current page

Add `.tui-pagination-item-active` to the current item for a solid `--tui-brand` fill with `--tui-brand-fg` text and a matching border; hover lightens the fill by 10%. On an anchor, `.tui-link-active` does the same, so a server that already marks the current link with that class needs no pagination-specific class. Pair either with `aria-current="page"`.

{% include demo.html file="active.html" %}

## Disabled

An anchor with `aria-disabled="true"` drops to 50% opacity, shows a not-allowed cursor and ignores pointer events — the way to keep "Previous" in place on the first page without removing it from the row.

{% include demo.html file="disabled.html" %}

| Class / selector | Effect |
|---|---|
| `.tui-pagination` | Flex row, `--tui-spacing-1` gap, list style removed |
| `.tui-pagination a`, `.tui-pagination span` | 2.5rem bordered box, hover on `--tui-surface-2` |
| `.tui-pagination-item-active` | Solid brand fill with contrast text |
| `.tui-pagination a.tui-link-active` | Same as `.tui-pagination-item-active`, for anchors already carrying the shared active class |
| `.tui-pagination a[aria-disabled="true"]` | 50% opacity, `cursor: not-allowed`, no pointer events |

Related: [Links](/ui/elements/links/) · [Buttons](/ui/components/buttons/) · [Breadcrumb](/ui/components/breadcrumb/) · [Tables](/ui/elements/tables/)
