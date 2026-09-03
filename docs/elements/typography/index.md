---
title: Typography
section: elements
source: src/20-elements/typography.css
description: "Headings, paragraphs, quotes, code and inline text elements styled with no classes, plus the labelled code block."
---

Native text elements look right with no classes: six heading sizes on the rem scale, paragraphs with a trailing margin, blockquotes, inline and block code, keyboard keys and the small inline elements. Block elements carry a bottom margin for running text, and that margin is dropped on the last child of any box, so a paragraph never pads the card or panel it ends.

## Headings

`<h1>` to `<h6>` share `--tui-font-sans`, `--tui-font-bold`, `--tui-leading-tight` and `--tui-text-1`; `<h1>` to `<h3>` also get `text-wrap: balance`. Headings are trimmed to their cap height (see [leading trim](/ui/foundations/typography-scale/)) and carry a `--tui-spacing-4` trailing margin, dropped on the last child, so the gap to whatever follows is measured from the baseline. There is no margin above: the space before a heading comes from the previous block's trailing margin, from a `.tui-stack`, or from a spacing utility such as `.tui-mt-6`.

{% include demo.html file="headings.html" %}

| Element | Token | Size |
|---|---|---|
| `<h1>` | `--tui-text-4xl` | 2.25rem (36px) |
| `<h2>` | `--tui-text-3xl` | 1.875rem (30px) |
| `<h3>` | `--tui-text-2xl` | 1.5rem (24px) |
| `<h4>` | `--tui-text-xl` | 1.25rem (20px) |
| `<h5>` | `--tui-text-lg` | 1.125rem (18px) |
| `<h6>` | `--tui-text-base` | 1rem (16px) |

`--tui-text-5xl` (3rem) sits above the heading range for display text; apply it with a `font-size` of your own or through [`.tui-hero-title`](/ui/layout/hero/).

## Paragraphs

`<p>` uses the body size with `text-wrap: pretty`, is trimmed to its cap height and baseline, and ends with a `--tui-spacing-6` bottom margin — one blank line, measured baseline to cap. The size utilities on the [Text](/ui/utilities/text/) page apply the other steps of the scale.

{% include demo.html file="paragraphs.html" %}

## Inline elements

`<small>` drops to `--tui-text-sm` in `--tui-text-3`; `<strong>` is `--tui-font-bold`; `<mark>` highlights with the warning colour and a small radius; `<abbr title>` gets a dotted underline and a help cursor; `<sub>` and `<sup>` are `--tui-text-xs` and positioned relative to the baseline with zero line-height, so they never open up the line they sit in.

{% include demo.html file="inline.html" %}

## Blockquote

`<blockquote>` gets a 4px `--tui-border-strong` rule on its start edge, italic `--tui-text-2` text on `--tui-surface-1`, `--tui-spacing-4 / --tui-spacing-6` padding and the same trailing margin as a paragraph.

{% include demo.html file="blockquote.html" %}

## Code, kbd, pre and samp

`<code>`, `<kbd>`, `<pre>` and `<samp>` share `--tui-font-mono` at `--tui-text-sm`. Inline `<code>` gets a `--tui-surface-2` background and `--tui-radius-sm`; `<pre>` gets `--tui-spacing-4` padding, horizontal overflow, `--tui-radius-md` and the trailing margin, and resets the padding, background and radius of any `<code>` inside it. `<kbd>` renders as a key cap: `--tui-spacing-1` padding around the trimmed glyphs, a 1px `--tui-border-strong` border with a 2px bottom edge on `--tui-surface-1`, sized so it no longer stretches the line it sits in. `<samp>` only takes the font.

{% include demo.html file="code.html" %}

## Code block

`.tui-code-block` is a padded `--tui-surface-1` block with horizontal scrolling, normally on a `<pre>`. A `data-lang` attribute prints its value, uppercased, in the top end corner through `::before` and `attr()`. Add `.tui-code-block-lines` and wrap each source line in its own `<code>` child: every direct `<code>` becomes a block and gets a right-aligned line number from a CSS counter.

{% include demo.html file="code-block.html" %}

| Class / attribute | Effect |
|---|---|
| `.tui-code-block` | Padded `--tui-surface-1` block, `--tui-radius-md`, `overflow-x: auto` |
| `[data-lang]` | Uppercase `--tui-text-xs` label in the top end corner |
| `.tui-code-block-lines` | Numbers each direct `<code>` child |

## Horizontal rule

`<hr>` is a 1px `--tui-border` line with `--tui-spacing-6` above and below. The margin is dropped on whichever side touches the edge of its box (`:first-child` / `:last-child`). For a labelled or vertical rule use the [Divider](/ui/components/divider/) component.

{% include demo.html file="hr.html" %}

## Flow rhythm ends at the edges

`h1`–`h6`, `p`, `ul`, `ol`, `dl`, `figure`, `blockquote`, `pre` and `table` lose their bottom margin when they are the last child of their parent. That is why a card body that ends with a paragraph has even padding on all sides — nothing to zero out by hand.

{% include demo.html file="last-child.html" %}

## Text selection

Selected text is highlighted with the brand colour at 30% and keeps `--tui-text-1` for the glyphs, so it stays readable in both schemes. The rule lives in the [Reboot](/ui/foundations/reboot/), not in this file.

{% include demo.html file="selection.html" %}

Related: [Typography Scale](/ui/foundations/typography-scale/) · [Text](/ui/utilities/text/) · [Links](/ui/elements/links/) · [Lists](/ui/elements/lists/) · [Divider](/ui/components/divider/) · [Reboot](/ui/foundations/reboot/)
