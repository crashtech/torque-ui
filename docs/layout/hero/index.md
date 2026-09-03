---
title: Hero
section: layout
source: src/40-layout/patterns.css
description: "A centred introductory block: display title, capped lead paragraph and a wrapping row of actions, spaced by gap."
---

`.tui-hero` is the opening block of a landing or marketing page: a centred flex column with a `--tui-spacing-6` gap between its children and generous block padding. Every direct child has its margin zeroed, so the heading, lead and action row need no spacing utilities.

## Anatomy

`.tui-hero-title` sets `--tui-text-4xl` and balances line breaks; `.tui-hero-lead` is `--tui-text-lg` in `--tui-text-2`, capped at `60ch` and centred; `.tui-hero-actions` is a centred, wrapping flex row with a `--tui-spacing-3` gap for the buttons. The hero itself has no background — the demo adds one with a utility so the padding is visible.

{% include demo.html file="hero.html" %}

## Padding

The block padding defaults to `--tui-spacing-24` (6rem) and reads `--tui-hero-padding-block`, so a compact hero on an inner page is one custom property away.

{% include demo.html file="compact.html" %}

| Class | Effect |
|---|---|
| `.tui-hero` | Centred flex column, `--tui-spacing-6` gap, child margins zeroed |
| `.tui-hero-title` | `--tui-text-4xl`, `text-wrap: balance` |
| `.tui-hero-lead` | `--tui-text-lg`, `--tui-text-2`, `max-inline-size: 60ch`, centred |
| `.tui-hero-actions` | Centred wrapping row with a `--tui-spacing-3` gap |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-hero-padding-block` | `var(--tui-spacing-24)` | Padding above and below the hero |

Related: [Section](/ui/layout/section/) · [Page Header](/ui/layout/page-header/) · [Buttons](/ui/components/buttons/) · [Container](/ui/layout/container/)
