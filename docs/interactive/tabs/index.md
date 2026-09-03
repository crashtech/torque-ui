---
title: Tabs
section: interactive
source: src/60-interactive/tabs.css
js: self-driven
description: "Radio-driven tab strip with optional panels, link tabs, a trailing slot and a sticky row — no JavaScript."
---

`.tui-tabs` is a wrapping flex row of tab labels with a rule underneath. State comes from a hidden radio per tab: the checked radio colours the label that follows it and reveals the panel after that, so switching tabs needs no script. The hidden radio is a [state input](/ui/foundations/state-inputs/) — it stays in the tab order and paints a focus ring on its label. The component carries no outer margin.

## Radio tabs

Interleave the three parts inside `.tui-tabs`: a `.tui-state-input.tui-tab-input` radio, the `.tui-tab` label pointing at it, then the `.tui-tab-panel`. The ids are yours; every input in one strip shares a `name`. Any number of tabs works, and the strip wraps onto a second row when it runs out of room.

{% include demo.html file="basic.html" %}

The panel is a flex item with `order: 1` and `flex-basis: 100%`, which is what pushes every panel below the whole row of labels regardless of source position; only the panel after the checked radio is displayed.

| Class | Effect |
|---|---|
| `.tui-tabs` | Wrapping flex row; its `::after` filler carries the rule to the end of the row |
| `.tui-tab-input` | The hidden radio (add `.tui-state-input`); `:checked` activates the next `.tui-tab` |
| `.tui-tab` | A tab: medium weight, `--tui-tab-color` text, brand on hover and when active |
| `.tui-tab-panel` | Hidden unless it follows the active tab; padded on the block axis by `--tui-tab-panel-padding` |

## Strip only

Panels are optional. A `.tui-tabs` holding only inputs and labels is a plain tab strip — useful when the content below is swapped by other means, or when the strip is the whole control.

{% include demo.html file="strip.html" %}

## Link tabs

A tab can be a link instead of a label, so category pages that navigate share the same strip. `a.tui-tab` drops the link underline, and `aria-current` on the current page's link renders it as the active tab (brand text and rule).

{% include demo.html file="links.html" %}

| Class | Effect |
|---|---|
| `a.tui-tab` | Link tab, no underline |
| `.tui-tab[aria-current]` | Rendered active — brand text and brand rule |

## Script-driven tabs <span class="tui-badge">self-driven JS</span>

A strip your script drives uses `<button class="tui-tab" role="tab">` in a `role="tablist"` and `.tui-tab-panel` elements with `role="tabpanel"`. The button defaults are undone so it sits flush with label and link tabs; `aria-selected="true"` (or `data-selected`, `.tui-selected`) paints the active tab, and a `role="tabpanel"` panel shows unless it carries `hidden`. Your script moves `aria-selected`, `tabindex` and `hidden`; the arrow-key roving is yours too.

{% include demo.html file="script.html" %}

| Selector | Effect |
|---|---|
| `.tui-tab:is([aria-selected="true"], [data-selected], .tui-selected)` | Rendered active, like `[aria-current]` |
| `.tui-tab-panel[role="tabpanel"]` | Shown; `hidden` hides it |

## Trailing slot

`.tui-tabs-end` is a slot at the inline end of the row for badges, a "+" button or a filter. It takes `margin-inline-start: auto`, carries the rule to the edge itself and collapses the `::after` filler. When the row wraps, the slot lands alone on the last row — keep the strip short enough to fit.

{% include demo.html file="trailing.html" %}

| Class | Effect |
|---|---|
| `.tui-tabs-end` | End-of-row slot: auto start margin, carries the rule, collapses the filler |

## Sticky row

`.tui-tabs-sticky` pins every tab, the trailing slot and the rule filler to the top of the nearest scroll container (`position: sticky` at `--tui-z-sticky`, on a `--tui-surface-0` background so content scrolls under it). Panels are not sticky, so long panel content scrolls beneath the row. The demo runs in its own frame so it has something to scroll against.

{% include demo.html file="sticky.html" frame=true height="14rem" %}

| Class | Effect |
|---|---|
| `.tui-tabs-sticky` | Tabs, slot and filler `position: sticky` at `--tui-z-sticky` on `--tui-surface-0` |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-tab-color` | `var(--tui-text-2)` | Resting tab text colour |
| `--tui-tab-active-color` | `var(--tui-brand)` | Text and rule colour of the active (or hovered) tab |
| `--tui-tab-rule` | `2px solid var(--tui-border)` | The rule under the row |
| `--tui-tab-panel-padding` | `var(--tui-spacing-4)` | Block padding of a panel |

Related: [State Inputs](/ui/foundations/state-inputs/) · [Segment](/ui/components/segment/) · [Navbar](/ui/components/navbar/) · [Wizard](/ui/interactive/wizard/) · [Badge](/ui/components/badge/)
