---
title: Radius
section: foundations
source: src/00-tokens/03-radius.css
description: "Eight corner-radius steps, from square to pill, shared by every component."
---

Every rounded corner in the framework reads one of eight radius tokens. Buttons, inputs and cards use `md` and `lg`; badges, avatars and switches use `full`; the larger `xl` to `3xl` steps are for hero panels and sheets. Five of the tokens have `.tui-rounded-*` utilities; the rest are read from the token.

## The scale

{% include demo.html file="scale.html" %}

| Token | Value | Utility |
|---|---|---|
| `--tui-radius-none` | `0` | `.tui-rounded-none` |
| `--tui-radius-sm` | `0.125rem` (2px) | `.tui-rounded-sm` |
| `--tui-radius-md` | `0.375rem` (6px) | `.tui-rounded-md` |
| `--tui-radius-lg` | `0.5rem` (8px) | `.tui-rounded-lg` |
| `--tui-radius-xl` | `0.75rem` (12px) | — |
| `--tui-radius-2xl` | `1rem` (16px) | — |
| `--tui-radius-3xl` | `1.5rem` (24px) | — |
| `--tui-radius-full` | `9999px` (pill / circle) | `.tui-rounded-full` |

## Overriding

The tokens are ordinary custom properties, so a whole app can go square or extra-round with one `:root` override, and a subtree can differ from the rest.

{% include demo.html file="override.html" %}

Related: [Visual](/ui/utilities/visual/) · [Card](/ui/components/card/) · [Buttons](/ui/components/buttons/) · [Spacing](/ui/foundations/spacing/)
