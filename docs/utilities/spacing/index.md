---
title: Spacing
section: utilities
source: src/70-utilities/spacing.css
description: "Margin, padding and gap utilities on the 0–12 spacing scale, with logical inline sides and auto margins."
---

Margins, padding and gap on the [spacing scale](/ui/foundations/spacing/): steps `0`, `1`, `2`, `3`, `4`, `6`, `8` and `12` (0, 4, 8, 12, 16, 24, 32 and 48px). Block sides are `t`/`b` (`margin-block-start`/`-end`), inline sides are the logical `s`/`e` (`margin-inline-start`/`-end`), and the inline utilities stop at step `6`. Components carry no outer margins, so these are for one-off adjustments; consecutive components are spaced with a [Stack](/ui/layout/stack/) or `gap`.

## Margin

{% include demo.html file="margin.html" %}

| Class | Property | Value |
|---|---|---|
| `.tui-m-0` | `margin` | `0` |
| `.tui-m-1` | `margin` | `var(--tui-spacing-1)` |
| `.tui-m-2` | `margin` | `var(--tui-spacing-2)` |
| `.tui-m-3` | `margin` | `var(--tui-spacing-3)` |
| `.tui-m-4` | `margin` | `var(--tui-spacing-4)` |
| `.tui-m-6` | `margin` | `var(--tui-spacing-6)` |
| `.tui-m-8` | `margin` | `var(--tui-spacing-8)` |
| `.tui-m-12` | `margin` | `var(--tui-spacing-12)` |
| `.tui-mt-0` | `margin-block-start` | `0` |
| `.tui-mt-1` | `margin-block-start` | `var(--tui-spacing-1)` |
| `.tui-mt-2` | `margin-block-start` | `var(--tui-spacing-2)` |
| `.tui-mt-3` | `margin-block-start` | `var(--tui-spacing-3)` |
| `.tui-mt-4` | `margin-block-start` | `var(--tui-spacing-4)` |
| `.tui-mt-6` | `margin-block-start` | `var(--tui-spacing-6)` |
| `.tui-mt-8` | `margin-block-start` | `var(--tui-spacing-8)` |
| `.tui-mt-12` | `margin-block-start` | `var(--tui-spacing-12)` |
| `.tui-mb-0` | `margin-block-end` | `0` |
| `.tui-mb-1` | `margin-block-end` | `var(--tui-spacing-1)` |
| `.tui-mb-2` | `margin-block-end` | `var(--tui-spacing-2)` |
| `.tui-mb-3` | `margin-block-end` | `var(--tui-spacing-3)` |
| `.tui-mb-4` | `margin-block-end` | `var(--tui-spacing-4)` |
| `.tui-mb-6` | `margin-block-end` | `var(--tui-spacing-6)` |
| `.tui-mb-8` | `margin-block-end` | `var(--tui-spacing-8)` |
| `.tui-mb-12` | `margin-block-end` | `var(--tui-spacing-12)` |

## Margin, inline sides

`.tui-ms-*` and `.tui-me-*` are the canonical inline-start and inline-end margins and flip in right-to-left writing modes. `.tui-ml-*` and `.tui-mr-*` are deprecated aliases that map to the same logical properties (not to physical left and right); they are kept for one release.

{% include demo.html file="inline.html" %}

| Class | Property | Value |
|---|---|---|
| `.tui-ms-0` (alias `.tui-ml-0`) | `margin-inline-start` | `0` |
| `.tui-ms-1` (alias `.tui-ml-1`) | `margin-inline-start` | `var(--tui-spacing-1)` |
| `.tui-ms-2` (alias `.tui-ml-2`) | `margin-inline-start` | `var(--tui-spacing-2)` |
| `.tui-ms-3` (alias `.tui-ml-3`) | `margin-inline-start` | `var(--tui-spacing-3)` |
| `.tui-ms-4` (alias `.tui-ml-4`) | `margin-inline-start` | `var(--tui-spacing-4)` |
| `.tui-ms-6` (alias `.tui-ml-6`) | `margin-inline-start` | `var(--tui-spacing-6)` |
| `.tui-me-0` (alias `.tui-mr-0`) | `margin-inline-end` | `0` |
| `.tui-me-1` (alias `.tui-mr-1`) | `margin-inline-end` | `var(--tui-spacing-1)` |
| `.tui-me-2` (alias `.tui-mr-2`) | `margin-inline-end` | `var(--tui-spacing-2)` |
| `.tui-me-3` (alias `.tui-mr-3`) | `margin-inline-end` | `var(--tui-spacing-3)` |
| `.tui-me-4` (alias `.tui-mr-4`) | `margin-inline-end` | `var(--tui-spacing-4)` |
| `.tui-me-6` (alias `.tui-mr-6`) | `margin-inline-end` | `var(--tui-spacing-6)` |

## Auto margins

An `auto` margin pushes a flex or grid item to the far edge, or centres a block inside its container.

{% include demo.html file="auto.html" %}

| Class | Property | Value |
|---|---|---|
| `.tui-ms-auto` (alias `.tui-ml-auto`) | `margin-inline-start` | `auto` |
| `.tui-me-auto` (alias `.tui-mr-auto`) | `margin-inline-end` | `auto` |
| `.tui-mt-auto` | `margin-block-start` | `auto` |
| `.tui-mb-auto` | `margin-block-end` | `auto` |
| `.tui-mx-auto` | `margin-inline` | `auto` |

## Padding

{% include demo.html file="padding.html" %}

| Class | Property | Value |
|---|---|---|
| `.tui-p-0` | `padding` | `0` |
| `.tui-p-1` | `padding` | `var(--tui-spacing-1)` |
| `.tui-p-2` | `padding` | `var(--tui-spacing-2)` |
| `.tui-p-3` | `padding` | `var(--tui-spacing-3)` |
| `.tui-p-4` | `padding` | `var(--tui-spacing-4)` |
| `.tui-p-6` | `padding` | `var(--tui-spacing-6)` |
| `.tui-p-8` | `padding` | `var(--tui-spacing-8)` |
| `.tui-p-12` | `padding` | `var(--tui-spacing-12)` |
| `.tui-pt-0` | `padding-block-start` | `0` |
| `.tui-pt-1` | `padding-block-start` | `var(--tui-spacing-1)` |
| `.tui-pt-2` | `padding-block-start` | `var(--tui-spacing-2)` |
| `.tui-pt-3` | `padding-block-start` | `var(--tui-spacing-3)` |
| `.tui-pt-4` | `padding-block-start` | `var(--tui-spacing-4)` |
| `.tui-pt-6` | `padding-block-start` | `var(--tui-spacing-6)` |
| `.tui-pt-8` | `padding-block-start` | `var(--tui-spacing-8)` |
| `.tui-pt-12` | `padding-block-start` | `var(--tui-spacing-12)` |
| `.tui-pb-0` | `padding-block-end` | `0` |
| `.tui-pb-1` | `padding-block-end` | `var(--tui-spacing-1)` |
| `.tui-pb-2` | `padding-block-end` | `var(--tui-spacing-2)` |
| `.tui-pb-3` | `padding-block-end` | `var(--tui-spacing-3)` |
| `.tui-pb-4` | `padding-block-end` | `var(--tui-spacing-4)` |
| `.tui-pb-6` | `padding-block-end` | `var(--tui-spacing-6)` |
| `.tui-pb-8` | `padding-block-end` | `var(--tui-spacing-8)` |
| `.tui-pb-12` | `padding-block-end` | `var(--tui-spacing-12)` |

## Padding, inline sides

As with margins, `.tui-ps-*` and `.tui-pe-*` are canonical; `.tui-pl-*` and `.tui-pr-*` are deprecated aliases of the same logical properties.

{% include demo.html file="pad-inline.html" %}

| Class | Property | Value |
|---|---|---|
| `.tui-ps-0` (alias `.tui-pl-0`) | `padding-inline-start` | `0` |
| `.tui-ps-1` (alias `.tui-pl-1`) | `padding-inline-start` | `var(--tui-spacing-1)` |
| `.tui-ps-2` (alias `.tui-pl-2`) | `padding-inline-start` | `var(--tui-spacing-2)` |
| `.tui-ps-3` (alias `.tui-pl-3`) | `padding-inline-start` | `var(--tui-spacing-3)` |
| `.tui-ps-4` (alias `.tui-pl-4`) | `padding-inline-start` | `var(--tui-spacing-4)` |
| `.tui-ps-6` (alias `.tui-pl-6`) | `padding-inline-start` | `var(--tui-spacing-6)` |
| `.tui-pe-0` (alias `.tui-pr-0`) | `padding-inline-end` | `0` |
| `.tui-pe-1` (alias `.tui-pr-1`) | `padding-inline-end` | `var(--tui-spacing-1)` |
| `.tui-pe-2` (alias `.tui-pr-2`) | `padding-inline-end` | `var(--tui-spacing-2)` |
| `.tui-pe-3` (alias `.tui-pr-3`) | `padding-inline-end` | `var(--tui-spacing-3)` |
| `.tui-pe-4` (alias `.tui-pr-4`) | `padding-inline-end` | `var(--tui-spacing-4)` |
| `.tui-pe-6` (alias `.tui-pr-6`) | `padding-inline-end` | `var(--tui-spacing-6)` |

## Gap

`gap` on a flex or grid container is the preferred way to space siblings — it never doubles up at the edges the way margins do.

{% include demo.html file="gap.html" %}

| Class | Property | Value |
|---|---|---|
| `.tui-gap-0` | `gap` | `0` |
| `.tui-gap-1` | `gap` | `var(--tui-spacing-1)` |
| `.tui-gap-2` | `gap` | `var(--tui-spacing-2)` |
| `.tui-gap-3` | `gap` | `var(--tui-spacing-3)` |
| `.tui-gap-4` | `gap` | `var(--tui-spacing-4)` |
| `.tui-gap-6` | `gap` | `var(--tui-spacing-6)` |
| `.tui-gap-8` | `gap` | `var(--tui-spacing-8)` |
| `.tui-gap-12` | `gap` | `var(--tui-spacing-12)` |

Related: [Spacing](/ui/foundations/spacing/) · [Stack](/ui/layout/stack/) · [Flexbox](/ui/layout/flexbox/) · [Grid](/ui/layout/grid/) · [Sizing](/ui/utilities/sizing/)
