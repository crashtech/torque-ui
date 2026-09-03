---
title: Spacing
section: foundations
source: src/00-tokens/02-spacing.css
description: "The 4px-based rem scale that every padding, gap and spacing utility reads."
---

All spacing in Torque UI derives from a 4px base unit expressed in `rem`, so it scales with `--tui-root-size`. Components pad and gap themselves with these tokens and carry no outer margin; the [spacing utilities](/ui/utilities/spacing/) expose steps `0, 1, 2, 3, 4, 6, 8` and `12` as `.tui-p-*`, `.tui-m-*` and `.tui-gap-*` classes.

## The scale

Fifteen steps. The name is the number of base units (`4` is 4 × 4px = 16px), with a half step at `0-5` for hairline gaps. Components mostly live between `1` and `6`; `8` and above are section and page rhythm.

{% include demo.html file="scale.html" %}

| Token | Value | Pixels |
|---|---|---|
| `--tui-spacing-0` | `0` | 0 |
| `--tui-spacing-0-5` | `0.125rem` | 2 |
| `--tui-spacing-1` | `0.25rem` | 4 |
| `--tui-spacing-2` | `0.5rem` | 8 |
| `--tui-spacing-3` | `0.75rem` | 12 |
| `--tui-spacing-4` | `1rem` | 16 |
| `--tui-spacing-5` | `1.25rem` | 20 |
| `--tui-spacing-6` | `1.5rem` | 24 |
| `--tui-spacing-8` | `2rem` | 32 |
| `--tui-spacing-10` | `2.5rem` | 40 |
| `--tui-spacing-12` | `3rem` | 48 |
| `--tui-spacing-16` | `4rem` | 64 |
| `--tui-spacing-20` | `5rem` | 80 |
| `--tui-spacing-24` | `6rem` | 96 |
| `--tui-spacing-32` | `8rem` | 128 |

## Using the tokens

Read a token wherever a component's own padding or gap is not what you need — a custom layout's `gap`, a section's `padding-block`. The utilities cover steps `0, 1, 2, 3, 4, 6, 8` and `12` (and stop at `6` on the inline axis); `16` to `32` are token-only and meant for page-level rhythm.

{% include demo.html file="in-layout.html" %}

Related: [Spacing](/ui/utilities/spacing/) · [Stack](/ui/layout/stack/) · [Grid](/ui/layout/grid/) · [Typography Scale](/ui/foundations/typography-scale/)
