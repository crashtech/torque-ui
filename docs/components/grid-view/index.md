---
title: Grid View
section: components
source: src/30-components/grid-view.css
js: self-driven
description: "Auto-filling grid of icon-above-name tiles — the file explorer's third view — with uniform, large and key/value variants."
---

A grid view is the icon view of a file explorer: the part that sits under a [breadcrumb](/ui/components/breadcrumb/) and beside a [tree](/ui/components/tree/). `ul.tui-grid-view` lays its `<li>` children out as an auto-filling grid, and each `.tui-tile` stacks an icon above a name. The tile is an `<a>`, a `<label>`, a `<button>` or a plain element, so the same markup serves navigation, selection and a static gallery. The same grid takes a `<dl>` whose tiles are key/value pairs.

## Anatomy

`.tui-grid-view` is a grid with `repeat(auto-fill, minmax(min(--tui-grid-view-min, 100%), 1fr))` columns — as many tracks of at least `--tui-grid-view-min` (`7rem`) as the container allows, re-wrapping on its own — separated by `--tui-grid-view-gap` (`--tui-spacing-3`), with the list margin, padding and bullets removed. A `.tui-tile` is a centred flex column with a `--tui-spacing-2` gap, `--tui-spacing-3` padding, `--tui-radius-md` corners, `--tui-text-1` text and no underline; an `<a>`, `<label>` or `<button>` tile takes a `--tui-surface-1` hover. The `.tui-icon` or `<img>` directly inside a tile is sized to `--tui-tile-icon-size` (`2.5rem`), and `.tui-tile-name` is `--tui-text-sm`, centred and wrap-safe, so a long file name breaks inside its tile instead of widening the column.

{% include demo.html file="basic.html" %}

## Selectable tiles

A `<label>` tile with a `.tui-state-input` checkbox becomes selectable: checking it paints the tile with the soft tone background and ink, exactly like a checked [list group](/ui/components/list-group/) row, and the focus ring lands on the tile while the hidden input has focus. Give the inputs a shared `name` and the selection posts with the form; make them radios for a pick-one gallery.

{% include demo.html file="selectable.html" %}

## Tiles with facts

A tile is a flex column, so a `dl.tui-kv.tui-kv-stack` ([key/value](/ui/components/key-value/)) drops in under the name for size and modified date. `.tui-grid-view-start` aligns every tile's content to the start, which reads better once a tile carries more than one line.

{% include demo.html file="facts.html" %}

## Equal heights

Tiles take their own height by default, so a tile with a two-line name or a list of facts stands taller than its neighbours. `.tui-grid-view-stretch` makes every tile fill its row, so hover and selected tints cover the whole cell and a row reads as one band.

{% include demo.html file="stretch.html" %}

## Uniform tiles

`.tui-grid-view-uniform` guarantees every tile the same size: rows share one height across the whole grid, tiles fill their cells, a name clamps to `--tui-tile-name-lines` (2) lines with an ellipsis, and a value inside a tile stays on one line and ellipsizes. Whatever the content, the grid is a clean lattice.

{% include demo.html file="uniform.html" %}

## Large tiles and filled images

`.tui-grid-view-lg` raises the column floor to `10rem` and the icon to `4rem`. Add `.tui-grid-view-fill` and the icon or `<img>` directly inside each tile spans the tile width as a rounded square with `object-fit: cover` — a directory of people, a gallery of covers. Fill works at any size; the two classes are independent.

{% include demo.html file="people.html" %}

## Extra-large tiles

`.tui-grid-view-xl` raises the floor to `16rem` and lays each tile out as a card: a `1px` `--tui-border` edge, `--tui-spacing-4` padding, the icon in the first column with the name beside it, and anything else — a `dl.tui-kv` of facts, a badge row — spanning the full width underneath.

{% include demo.html file="repos.html" %}

## Key/value tiles

`dl.tui-grid-view` turns the grid into a sheet of facts: each `<div class="tui-tile">` wraps one `<dt>`/`<dd>` pair, the term muted in `--tui-text-sm` and the value in `--tui-font-medium`, wrap-safe. Pair it with `.tui-grid-view-start` so the columns of terms line up.

{% include demo.html file="kv.html" %}

## Script-driven tiles <span class="tui-badge">self-driven JS</span>

A tile your script selects takes `aria-selected="true"` or `data-selected` (or `.tui-selected`, `.tui-tile-active`) for the soft tone background, and `aria-disabled="true"` or `data-disabled` (or `.tui-disabled`) for muted text and a `not-allowed` cursor. Filtering is `hidden` on tiles: a `.tui-grid-view-empty` child spans every column and stays hidden until no other tile in the grid is visible, then shows by CSS alone.

{% include demo.html file="script.html" %}

| Selector | Effect |
|---|---|
| `.tui-tile:is([aria-selected="true"], [data-selected], .tui-selected)` | Soft tone background and ink, the same as a checked state input or `.tui-tile-active` |
| `.tui-tile:is([aria-disabled="true"], [data-disabled], .tui-disabled)` | `--tui-text-3` text, `not-allowed` cursor, no hover |
| `.tui-grid-view-empty` | Full-width muted row, shown only when every other child is `hidden` |

## Density

Override the hooks on the grid to change the track floor, the gap and the icon size together — a compact picker or a spacious gallery from the same markup.

{% include demo.html file="hooks.html" %}

| Class | Effect |
|---|---|
| `.tui-grid-view` | Auto-filling grid of tiles; a `<ul>` of `<li>` or a `<dl>` of `<div>` |
| `.tui-grid-view-start` | Tile content aligned to the start instead of centred |
| `.tui-grid-view-stretch` | Every tile fills its row's height |
| `.tui-grid-view-uniform` | All rows one height, tiles filled, names clamped and values ellipsized |
| `.tui-grid-view-fill` | The icon or image inside each tile spans the tile width as a square |
| `.tui-grid-view-lg` | `10rem` column floor, `4rem` icon |
| `.tui-grid-view-xl` | `16rem` column floor; bordered card with the name beside the icon and facts below |
| `.tui-grid-view-empty` | The row a filtering script leaves visible |
| `.tui-tile` | Icon-above-name (or term-above-value) column; hover on `a`, `label`, `button` |
| `.tui-tile-name` | The label under the icon |
| `.tui-tile-active` | Selected look without an input or attribute |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-grid-view-min` | `7rem` | Minimum column width; the grid fits as many as the container allows |
| `--tui-grid-view-gap` | `var(--tui-spacing-3)` | Gap between tiles |
| `--tui-tile-icon-size` | `2.5rem` | Size of the icon or image directly inside a tile |
| `--tui-tile-name-lines` | `2` | Lines a name may take before `.tui-grid-view-uniform` clamps it |
| `--tui-tile-bg` | `transparent` | Resting tile background |
| `--tui-tile-hover-bg` | `var(--tui-surface-1)` | Hover background of a clickable tile |
| `--tui-tile-active-bg` | `var(--tui-tone-soft, var(--tui-brand-soft))` | Selected tile background |

Related: [Breadcrumb](/ui/components/breadcrumb/) · [Tree](/ui/components/tree/) · [List Group](/ui/components/list-group/) · [Key/Value](/ui/components/key-value/) · [Icons](/ui/elements/icons/)
