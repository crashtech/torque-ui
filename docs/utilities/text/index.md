---
title: Text
section: utilities
source: src/70-utilities/text.css
description: "Alignment, weight, size, tracking, case, wrapping, truncation, hyphenation and line-clamp utilities."
---

Text utilities set one typographic property from the [typography scale](/ui/foundations/typography-scale/). They win over any element or component rule, so `.tui-text-sm` on a heading or `.tui-font-normal` on a `<strong>` does what it says. Text colour utilities (`.tui-text-1`, `.tui-text-primary` and the rest) live on the [Colors](/ui/utilities/colors/) page.

## Alignment

Alignment uses the logical `start` and `end` keywords, so `.tui-text-left` and `.tui-text-right` flip in right-to-left writing modes.

{% include demo.html file="alignment.html" %}

| Class | Effect |
|---|---|
| `.tui-text-left` | `text-align: start` |
| `.tui-text-center` | `text-align: center` |
| `.tui-text-right` | `text-align: end` |

## Weight

{% include demo.html file="weight.html" %}

| Class | Effect |
|---|---|
| `.tui-font-normal` | `font-weight: var(--tui-font-normal)` (400) |
| `.tui-font-medium` | `font-weight: var(--tui-font-medium)` (500) |
| `.tui-font-semibold` | `font-weight: var(--tui-font-semibold)` (600) |
| `.tui-font-bold` | `font-weight: var(--tui-font-bold)` (700) |
| `.tui-font-black` | `font-weight: var(--tui-font-black)` (800) |

## Size

Eight steps from `xs` to `4xl`. There is no `5xl` utility — use the `--tui-text-5xl` token in your own CSS for display type.

{% include demo.html file="size.html" %}

| Class | Effect |
|---|---|
| `.tui-text-xs` | `font-size: var(--tui-text-xs)` |
| `.tui-text-sm` | `font-size: var(--tui-text-sm)` |
| `.tui-text-base` | `font-size: var(--tui-text-base)` |
| `.tui-text-lg` | `font-size: var(--tui-text-lg)` |
| `.tui-text-xl` | `font-size: var(--tui-text-xl)` |
| `.tui-text-2xl` | `font-size: var(--tui-text-2xl)` |
| `.tui-text-3xl` | `font-size: var(--tui-text-3xl)` |
| `.tui-text-4xl` | `font-size: var(--tui-text-4xl)` |

## Tracking and case

Wide tracking with uppercase is the usual eyebrow or overline treatment; tight tracking suits large display sizes.

{% include demo.html file="tracking.html" %}

| Class | Effect |
|---|---|
| `.tui-tracking-tight` | `letter-spacing: var(--tui-tracking-tight)` |
| `.tui-tracking-wide` | `letter-spacing: var(--tui-tracking-wide)` |
| `.tui-tracking-wider` | `letter-spacing: var(--tui-tracking-wider)` |
| `.tui-uppercase` | `text-transform: uppercase` |
| `.tui-lowercase` | `text-transform: lowercase` |
| `.tui-capitalize` | `text-transform: capitalize` |

## Wrapping and truncation

`.tui-text-ellipsis` is single-line truncation in one class: it hides overflow, forbids wrapping and ends the line with an ellipsis. It needs a constrained width — inside a flex or grid item add [`.tui-min-w-0`](/ui/utilities/sizing/) so the item can shrink. `.tui-text-nowrap` keeps a phrase on one line without truncating, and `.tui-text-wrap` undoes either.

{% include demo.html file="wrapping.html" %}

| Class | Effect |
|---|---|
| `.tui-text-ellipsis` | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` |
| `.tui-text-nowrap` | `white-space: nowrap` |
| `.tui-text-wrap` | `white-space: normal` |

## Hyphenation

`.tui-hyphens` opts a block into automatic hyphenation and lets long words break, for narrow columns of running text. The document (or the element) needs a `lang` for the browser to pick a hyphenation dictionary.

{% include demo.html file="hyphens.html" %}

| Class | Effect |
|---|---|
| `.tui-hyphens` | `overflow-wrap: break-word; hyphens: auto` |

## Line clamp

Multi-line truncation to one, two or three lines through `-webkit-line-clamp`, which every supported browser implements. The class turns the element into a `-webkit-box`, so apply it to the text block itself rather than a wrapper of several paragraphs. A clamped block keeps its natural leading (`text-box: normal`) and its own content height (`align-self: start`) so neither trimming nor a stretching flex or grid parent can reveal the hidden lines, and lines past the clamp still paint into the element's own padding — pad a wrapper instead of the clamped block.

{% include demo.html file="line-clamp.html" %}

| Class | Effect |
|---|---|
| `.tui-line-clamp-1` | Clamp to 1 line |
| `.tui-line-clamp-2` | Clamp to 2 lines |
| `.tui-line-clamp-3` | Clamp to 3 lines |

Related: [Typography Scale](/ui/foundations/typography-scale/) · [Typography](/ui/elements/typography/) · [Colors](/ui/utilities/colors/) · [Sizing](/ui/utilities/sizing/) · [Overflow](/ui/utilities/overflow/)
