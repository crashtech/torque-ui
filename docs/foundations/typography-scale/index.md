---
title: Typography Scale
section: foundations
source: src/00-tokens/01-typography.css
description: "The root size knob, two font stacks, nine sizes, five weights, five line heights and six tracking steps."
---

The typography tokens are a small set of `rem`- and unitless-based scales declared on `:root`. Every size in the framework is `rem`, so the one knob `--tui-root-size` scales the whole UI; the sizes, weights and tracking steps also have utility classes, listed with each scale below.

## Root size

`html { font-size }` reads `--tui-root-size` (default `100%`, a 16px base). Set it on `:root` — only `html` reads it, so a wrapper override has no effect — and every `rem`-based token follows: `87.5%` gives a 14px base, `93.75%` a 15px base.

```css
:root { --tui-root-size: 93.75%; }
```

| Token | Default |
|---|---|
| `--tui-root-size` | `100%` |

## Font families

Two stacks, both system-first so no font file ships with the framework. `body` uses `--tui-font-sans`; `code`, `pre`, `kbd` and `samp` use `--tui-font-mono`.

| Token | Value |
|---|---|
| `--tui-font-sans` | `system-ui, -apple-system, "Segoe UI", roboto, "Helvetica Neue", arial, sans-serif` |
| `--tui-font-mono` | `ui-monospace, sfmono-regular, "SF Mono", menlo, consolas, "Liberation Mono", monospace` |

## Sizes

Nine steps from `xs` to `5xl`. Headings map onto the top of the scale (`<h1>` is `4xl`, `<h6>` is `base` — see [Typography](/ui/elements/typography/)); components use `sm` for badges and labels and `xs` for captions. The utilities stop at `4xl`; `5xl` is display text, read from the token directly.

{% include demo.html file="sizes.html" %}

| Token | Size | Utility |
|---|---|---|
| `--tui-text-xs` | 0.75rem (12px) | `.tui-text-xs` |
| `--tui-text-sm` | 0.875rem (14px) | `.tui-text-sm` |
| `--tui-text-base` | 1rem (16px) | `.tui-text-base` |
| `--tui-text-lg` | 1.125rem (18px) | `.tui-text-lg` |
| `--tui-text-xl` | 1.25rem (20px) | `.tui-text-xl` |
| `--tui-text-2xl` | 1.5rem (24px) | `.tui-text-2xl` |
| `--tui-text-3xl` | 1.875rem (30px) | `.tui-text-3xl` |
| `--tui-text-4xl` | 2.25rem (36px) | `.tui-text-4xl` |
| `--tui-text-5xl` | 3rem (48px) | — |

## Weights

Five weights. `body` is `normal`; buttons use `semibold`, headings and statistics use `bold`.

{% include demo.html file="weights.html" %}

| Token | Weight | Utility |
|---|---|---|
| `--tui-font-normal` | 400 | `.tui-font-normal` |
| `--tui-font-medium` | 500 | `.tui-font-medium` |
| `--tui-font-semibold` | 600 | `.tui-font-semibold` |
| `--tui-font-bold` | 700 | `.tui-font-bold` |
| `--tui-font-black` | 800 | `.tui-font-black` |

## Line heights

Five leading tokens. `html` and `body` use `normal`; headings use `tight`. There are no utility classes for leading — apply a token with `line-height: var(--tui-leading-relaxed)`.

{% include demo.html file="leading.html" %}

| Token | Value | Best for |
|---|---|---|
| `--tui-leading-tight` | 1.25 | Headings, short text blocks |
| `--tui-leading-snug` | 1.375 | Captions, labels |
| `--tui-leading-normal` | 1.6 | Body text (default) |
| `--tui-leading-relaxed` | 1.625 | Long-form reading |
| `--tui-leading-loose` | 1.75 | Landing pages, hero text |

## Leading trim

Text blocks are trimmed with `text-box: trim-both cap alphabetic`: the half-leading above the cap height and below the baseline is removed from the first and last line, so a margin, a gap or a padding is the true distance between the letters and the next edge. It is on by default, with no token to set, and the spacing scale is chosen with it in mind — a paragraph ends in `--tui-spacing-6` (one blank line, baseline to cap), a heading in `--tui-spacing-4`.

{% include demo.html file="leading-trim.html" %}

What trims: headings, paragraphs, bare list items, `<dt>`/`<dd>`, blockquotes, table cells, `<kbd>`, form labels, help and error lines, `.tui-label`, tabs, toggles, tooltips, toast and statistic text, empty-state text and the hero and page-header leads. `<pre>` and `.tui-code-block` are deliberately untrimmed — trimming a scroll container leaves the cut leading as scrollable overflow — and key/value rows keep their natural leading so the small row gap reads comfortably. The property applies only to block containers, so flex and grid boxes with bare text — buttons, badges, tags, chips, avatars, navbar items, pagination, menu and list-group items — keep their leading and centre it with flex, which lands within a pixel of cap centring for system fonts. Form fields ignore the property in every engine.

Two things to know. A trimmed box is only as tall as its own cap height, so an inline control taller than that — a `<kbd>`, a badge, a button — overflows it into the surrounding margin or padding; paragraphs and default cells have room for this, and a cell whose direct child is a control is left untrimmed on purpose (see [Tables](/ui/elements/tables/)). And the `cap` and `alphabetic` edges are Latin metrics: under `:lang(ja)`, `:lang(zh)` or `:lang(ko)` ideographs sit slightly proud of the trimmed box, by about 0.15em top and bottom.

Needs Chrome 133 / Safari 18.2 / Firefox 154 (Baseline 2026). Below that the text keeps its leading and every text block is a few pixels taller; nothing misaligns. See [Browser Support](/ui/getting-started/browser-support/).

## Letter spacing

Six tracking steps; three have utility classes. The classic pairing is a small uppercase caption with `.tui-tracking-wide`.

{% include demo.html file="tracking.html" %}

| Token | Value | Utility |
|---|---|---|
| `--tui-tracking-tighter` | -0.05em | — |
| `--tui-tracking-tight` | -0.025em | `.tui-tracking-tight` |
| `--tui-tracking-normal` | 0 | — |
| `--tui-tracking-wide` | 0.025em | `.tui-tracking-wide` |
| `--tui-tracking-wider` | 0.05em | `.tui-tracking-wider` |
| `--tui-tracking-widest` | 0.1em | — |

Related: [Typography](/ui/elements/typography/) · [Text](/ui/utilities/text/) · [Reboot](/ui/foundations/reboot/) · [Installation](/ui/getting-started/installation/)
