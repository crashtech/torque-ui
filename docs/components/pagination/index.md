---
title: Pagination
section: components
source: src/30-components/pagination.css
description: "One joined group of page links with first, previous, next and last arrows, and a bar that pairs it with a page-size select and a range text."
---

A pagination is one joined group: the `<ul class="tui-pagination">` draws a single `--tui-border` border with `--tui-radius-md` corners, and a 1px rule separates its items. It is as wide as its content and carries no outer margin. Wrap it in a `<nav aria-label="Pagination">` so assistive tech announces it as a landmark.

## Anatomy

Put one `<a>` per page in each `<li>`, or a `<span>` for an item that is not a link, such as an ellipsis. Links and spans placed directly in a `<div class="tui-pagination">` work the same. Both render a 2.5rem box with `--tui-text-sm` medium text in `--tui-text-2`. A link hovers on `--tui-surface-2`, and a span stays still. Only the two end items round their outer corners, so the group reads as one control.

Four classes on a link draw the arrow ends from the shared chevron: `.tui-pagination-first`, `.tui-pagination-prev`, `.tui-pagination-next` and `.tui-pagination-last`. First and last draw a doubled chevron. The arrows turn around in a right-to-left page. They have no text, so give each one an `aria-label`.

{% include demo.html file="basic.html" %}

## Current page

Add `.tui-pagination-item-active` to the current item for a solid `--tui-brand` fill with `--tui-brand-fg` text. Hover lightens the fill by 10%. On an anchor, `.tui-link-active` does the same, so a server that already marks the current link with that class needs no pagination-specific class. Pair either with `aria-current="page"`.

{% include demo.html file="active.html" %}

## Disabled

An anchor with `aria-disabled="true"` drops to 50% opacity, shows a not-allowed cursor and ignores pointer events. This keeps "First" and "Previous" in place on the first page without removing them from the group. Leave out the `href` too, so the link is not reachable.

{% include demo.html file="disabled.html" %}

## Bar

`.tui-pagination-bar` lays out the pagination next to its companions: a page-size select and a `.tui-pagination-info` range text. The page-size select is a plain [input group](/ui/forms/input-group/) with a `.tui-input-addon` label and a native `<select>`, so it reads as the second joined control. Submitting it on change is the application's job, through a GET form or one line of script.

The bar keeps its children in source order, and the range text takes all the free space. Whatever comes before the range text sits at the start, and whatever follows it sits at the far end. Reorder the markup to move the pieces: the second bar puts the pages first and the page size at the end. Without a range text, the bar spreads its children with `space-between`. It wraps onto more lines on narrow screens.

{% include demo.html file="bar.html" %}

| Class / selector | Effect |
|---|---|
| `.tui-pagination` | Joined group: one border, `--tui-radius-md` outer corners, a rule between items, fit to content |
| `.tui-pagination > li > a`, `.tui-pagination > a` (and `span`) | 2.5rem item; links hover on `--tui-surface-2` |
| `.tui-pagination-item-active` | Solid brand fill with contrast text |
| `.tui-pagination a.tui-link-active` | Same as `.tui-pagination-item-active`, for anchors already carrying the shared active class |
| `.tui-pagination a[aria-disabled="true"]` | 50% opacity, `cursor: not-allowed`, no pointer events |
| `.tui-pagination-first`, `.tui-pagination-last` | Doubled chevron pointing to the start or the end |
| `.tui-pagination-prev`, `.tui-pagination-next` | Single chevron pointing to the start or the end |
| `.tui-pagination-bar` | Wrapping flex row in source order, `space-between`, `--tui-spacing-3 / --tui-spacing-4` gap |
| `.tui-pagination-info` | `--tui-text-sm` range text in `--tui-text-2`; takes the free space in the bar |

Related: [Input Group](/ui/forms/input-group/) · [Links](/ui/elements/links/) · [Buttons](/ui/components/buttons/) · [Breadcrumb](/ui/components/breadcrumb/) · [Tables](/ui/elements/tables/)
