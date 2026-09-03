---
title: Page Header
section: layout
source: src/40-layout/patterns.css
description: "The top of a content page: a bold title with an optional lead on the same baseline and actions pushed to the end."
---

`.tui-page-header` is a wrapping flex row that aligns its children to the bottom edge and pushes them apart: a `.tui-page-header-title` at the start, a `.tui-page-header-actions` group at the end. Unlike components, it is a page-level pattern and carries its own `--tui-spacing-6` bottom margin, zeroed when it is the last child of its box.

## Title and actions

`.tui-page-header-title` is `--tui-text-2xl` bold with its margin removed. It is itself a wrapping flex row aligned on the baseline — a text fragment placed inside it shares the title's baseline, while a `.tui-badge`, `.tui-tag`, `.tui-chip` or `.tui-label` centres on the title line instead, since a chip has no baseline relationship with display type. `.tui-page-header-actions` is a centred row with a `--tui-spacing-2` gap for the buttons.

{% include demo.html file="basic.html" %}

## With a lead

Put a `.tui-page-header-lead` inside the title and it drops to `--tui-text-base`, normal weight and `--tui-text-3`, sharing the title's baseline — a summary line that stays attached to the heading.

{% include demo.html file="lead.html" %}

| Class | Effect |
|---|---|
| `.tui-page-header` | Wrapping `space-between` row, bottom-aligned, `--tui-spacing-6` margin below |
| `.tui-page-header-title` | `--tui-text-2xl` bold, baseline-aligned inner row; badge/tag/chip/label children centre on the title line |
| `.tui-page-header-lead` | Base size, normal weight, `--tui-text-3`, inside the title |
| `.tui-page-header-actions` | Centred row with a `--tui-spacing-2` gap |

Related: [Level](/ui/layout/level/) · [Hero](/ui/layout/hero/) · [Breadcrumb](/ui/components/breadcrumb/) · [Buttons](/ui/components/buttons/)
