---
title: Toolbar
section: components
source: src/30-components/toolbar.css
description: "A role=\"toolbar\" row of buttons, groups, dividers and a spacer."
---

`.tui-toolbar` is a bordered, `--tui-radius-md` row for a `role="toolbar"` element: buttons sit `--tui-spacing-1` apart inside `--tui-spacing-1` of padding, `.tui-toolbar-group` keeps a run of related buttons together (give it `role="group"` and a label), `.tui-toolbar-divider` is a 1px `<hr>` stretched to the row's height, and `.tui-toolbar-spacer` pushes what follows to the end. Ghost small buttons fit best; pressed state comes from `aria-pressed` on the [button](/ui/components/buttons/). The row wraps when it runs out of room. Arrow-key roving between the controls is the script's.

## Groups, divider and spacer

{% include demo.html file="basic.html" %}

| Class | Effect |
|---|---|
| `.tui-toolbar` | Wrapping flex row, `--tui-toolbar-bg`, 1px `--tui-border`, `--tui-radius-md` |
| `.tui-toolbar-group` | Flex run with a `--tui-spacing-1` gap |
| `.tui-toolbar-divider` | 1px vertical rule stretched to the row |
| `.tui-toolbar-spacer` | Flexible gap |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-toolbar-bg` | `var(--tui-surface-0)` | Row background |

Related: [Buttons](/ui/components/buttons/) · [Composer](/ui/components/composer/) · [Toggle Group](/ui/interactive/toggle-group/) · [Divider](/ui/components/divider/)
