---
title: Section
section: layout
source: src/40-layout/patterns.css
description: "Vertical rhythm between page regions through block padding alone."
---

`.tui-section` gives a page region generous space above and below, and nothing else — no width, no background, no horizontal padding. It composes with a [Container](/ui/layout/container/) for the horizontal constraint and with an `<hr>` or a background utility to mark the boundary.

## Sections in sequence

Each section pads itself independently by `--tui-section-padding-block`, `--tui-spacing-16` (4rem) by default, so stacking them yields an even rhythm without margin utilities. The demo puts a rule between two sections.

{% include demo.html file="sections.html" %}

## Padding

Set `--tui-section-padding-block` on a section, or on an ancestor to change every section under it.

{% include demo.html file="compact.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-section-padding-block` | `var(--tui-spacing-16)` | Padding above and below the section |

Related: [Container](/ui/layout/container/) · [Hero](/ui/layout/hero/) · [Page Header](/ui/layout/page-header/) · [Spacing](/ui/foundations/spacing/)
