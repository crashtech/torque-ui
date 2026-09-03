---
title: Card
section: components
source: src/30-components/card.css
description: "Elevated container with header, body and footer parts, a lift on hover for cards that act, and a toned primary variant."
---

A card is the elevated container: `--tui-surface-0` background, a `--tui-border` edge, `--tui-radius-lg` corners and `--tui-shadow-sm`. It carries no outer margin — when several cards sit together, put them in a `.tui-stack` or a grid and let `gap` space them.

## Base card

`.tui-card` alone is just the frame. Put content in a `.tui-card-body` so it gets padding and the automatic child rhythm.

{% include demo.html file="base.html" %}

## Card parts

Three optional parts compose a card. `.tui-card-header` has `--tui-surface-1` background, a bottom rule and semibold, balanced text; a heading inside it inherits the header's colour, so a toned header colours its title too. `.tui-card-body` has `--tui-spacing-6` padding and pretty-wrapped, break-safe text. `.tui-card-footer` is a flex row aligned to the end with a `--tui-spacing-2` gap and a top rule. Every part inherits the card's radius on the corners it touches. In the header and the body, direct children have their margins reset and consecutive children are spaced by `--tui-spacing-4` and `--tui-spacing-6` respectively, so headings, paragraphs and buttons never need utility margins; the footer spaces its children with its own gap.

{% include demo.html file="parts.html" %}

| Class | Effect |
|---|---|
| `.tui-card` | The frame: surface, border, radius, shadow |
| `.tui-card-header` | Padded, `--tui-surface-1`, bottom rule, semibold |
| `.tui-card-body` | Padded content area with child rhythm |
| `.tui-card-footer` | Padded end-aligned flex row on `--tui-surface-1`, top rule |

## Cards that act

A static card has nothing to invite, so it does not react to hover. A card that is itself an `<a>`, `<button>` or `<label>` renders as a block, drops the underline, takes a pointer cursor, and deepens its shadow to `--tui-shadow-md` on hover. Add `.tui-hoverable` to opt any other card into the same lift. Card text stays `--tui-text-1` even inside an anchor card.

{% include demo.html file="actionable.html" %}

## Primary card

`.tui-card-primary` colours the border with the tone, adds a 1px ring plus `--tui-shadow-md`, and fills the header with the tone and its contrast foreground. It is a brand tone setter, so any generic `.tui-tone-*` class on a `.tui-card-primary` card gives the same treatment in another tone.

{% include demo.html file="primary.html" %}

## Several cards

Cards never space themselves. A `.tui-stack` gives vertical rhythm, a grid gives columns; both use `gap`, so the cards stay flush with the container's edges.

{% include demo.html file="grid.html" %}

Related: [Panel](/ui/components/panel/) · [Segment](/ui/components/segment/) · [List Group](/ui/components/list-group/) · [Stack](/ui/layout/stack/) · [Grid](/ui/layout/grid/) · [Tone](/ui/foundations/tone/)
