---
title: Divider
section: components
source: src/30-components/divider.css
description: "Labelled horizontal rule with lines drawn by CSS, a toned variant, and a short vertical separator for inline rows."
---

A divider separates two blocks of content with a rule. A plain `<hr>` already renders as a 1px `--tui-border` line (see [Typography](/ui/elements/typography/)); `.tui-divider` is the component for a rule that carries a label, and `.tui-divider-vertical` the short bar between items in a row.

## Labelled divider

`.tui-divider` is a centred flex row: its text sits in `--tui-text-3` at `--tui-text-sm`, and two `::before` / `::after` pseudo-elements grow to fill either side as 1px lines in `--tui-divider-line`. Like `<hr>` it takes `--tui-spacing-6` above and below, and drops the margin on whichever side touches the edge of its container. Because the two lines are always drawn with a `--tui-spacing-4` gap between them, an empty `.tui-divider` shows a small break in the middle — use `<hr>` for an unlabelled rule.

{% include demo.html file="labelled.html" %}

## Toned

Any `.tui-tone-*` class on the divider colours the lines with the tone's edge value and the text with its ink value. Any element works as the label, so an icon or a chip can sit in the gap.

{% include demo.html file="toned.html" %}

## Vertical

`.tui-divider-vertical` is a 1px by 1em block in `--tui-border` with `--tui-spacing-2` on either side, meant for a flex row of inline items such as a toolbar or a metadata line. The side margin is dropped when it is the first or last child.

{% include demo.html file="vertical.html" %}

| Class | Effect |
|---|---|
| `.tui-divider` | Labelled horizontal rule, `--tui-spacing-6` block margin |
| `.tui-divider-vertical` | 1px × 1em vertical bar, `--tui-spacing-2` inline margin |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-divider-line` | `var(--tui-border)`; the tone's edge colour when toned | Colour of the two lines of `.tui-divider` |

Related: [Typography](/ui/elements/typography/) · [Timeline](/ui/components/timeline/) · [Level](/ui/layout/level/) · [Tone](/ui/foundations/tone/)
