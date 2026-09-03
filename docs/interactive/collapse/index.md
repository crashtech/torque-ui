---
title: Collapse
section: interactive
source: src/60-interactive/collapse.css
description: "Native <details> disclosure styled as a collapse, grouped into an exclusive-open accordion by a shared name attribute."
---

`.tui-collapse` is a plain `<details>`/`<summary>` disclosure with a padded summary row and a marker that swaps from `+` to `−` on open. Several of them wrapped in `.tui-accordion` share borders and rounded outer corners, and a shared `name` attribute makes the browser close the others when one opens. Neither needs any script, and neither carries an outer margin.

## Collapse

Put `.tui-collapse` on the `<details>`, `.tui-collapse-summary` on the `<summary>` and wrap the content in `.tui-collapse-body`. The native marker is hidden; the summary's `::after` draws `+` (and a rotated `−` when open) in `--tui-text-3`. An open collapse tints its summary with `--tui-collapse-open-bg`.

{% include demo.html file="standalone.html" %}

| Class | Effect |
|---|---|
| `.tui-collapse` | The `<details>`; `[open]` tints the summary and flips the marker |
| `.tui-collapse-summary` | Flex row, semibold, padded by `--tui-collapse-padding`, pointer cursor, `+`/`−` marker at the end |
| `.tui-collapse-body` | Content wrapper with the same padding as the summary |

## Accordion

Give a group of collapses the same `name` and wrap them in `.tui-accordion`. The wrapper draws the outer border and `--tui-radius-lg` corners, separates consecutive collapses with a rule, and rounds the first summary and the last summary or body so nothing pokes out of the frame.

{% include demo.html file="accordion.html" %}

> **Browser note.** Exclusive open through `<details name>` needs Firefox 130; on Firefox 128–129 same-named collapses open independently instead of closing their siblings. The styling is unaffected.

| Class | Effect |
|---|---|
| `.tui-accordion` | Bordered, rounded group; rules between children, corner radii on the first and last child |

## Animated height

Where the browser supports `interpolate-size: allow-keywords` and the `::details-content` pseudo-element, the body height transitions between `0` and `auto` on open and close using `--tui-duration-normal`. Everywhere else the disclosure opens instantly, as native `<details>` does. This is an enhancement over the accordion demo above rather than a separate class.

> **Browser note.** Animated open needs Chromium 131. It is wrapped in `@supports (interpolate-size: allow-keywords)` and has no effect on the floor.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-collapse-padding` | `var(--tui-spacing-4) var(--tui-spacing-6)` | Padding of the summary row and the body |
| `--tui-collapse-open-bg` | `var(--tui-surface-1)` | Summary background while the collapse is open |
| `--tui-accordion-border` | `var(--tui-border)` | Outer border and rules between an accordion's children |

Related: [Tree](/ui/components/tree/) · [Panel](/ui/components/panel/) · [Card](/ui/components/card/) · [Tabs](/ui/interactive/tabs/) · [Motion](/ui/foundations/motion/)
