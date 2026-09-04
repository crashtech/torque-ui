---
title: Calendar
section: interactive
source: src/60-interactive/calendar.css
js: self-driven
description: "Month grid of a date picker — today, selected, disabled, outside-month and range states from attributes; the month arithmetic is the script's."
---

`.tui-calendar` is the grid a date picker shows: a header with the month title and two navigation buttons, and a `role="grid"` table of `.tui-calendar-day` buttons. Every state is an attribute your script sets on a day, and moving between months means re-rendering the cells. There is no date arithmetic in the CSS, which is why a native `<input type="date">` stays the zero-script answer; this is for the picker you build yourself.

## Anatomy and states <span class="tui-badge">self-driven JS</span>

The header is a flex row: two `.tui-button-ghost.tui-button-icon` buttons around a `.tui-calendar-title`. The table drops every element-table style so its cells are bare `--tui-calendar-day-size` (2.25rem) squares under small-caps weekday headers. A day reads `aria-current="date"` for today (a tone ring), `aria-selected="true"` (or `data-selected`, `.tui-selected`) for the selection (tone fill), `disabled` or `aria-disabled` for a day that cannot be picked (struck through), and `data-outside` for a day of the neighbouring month (muted).

{% include demo.html file="basic.html" %}

## Range <span class="tui-badge">self-driven JS</span>

A date range is `data-range="start"` and `"end"` on the two ends, which take the selected fill with the inner corners squared, and `data-range="middle"` on every day between, which takes the soft tone with no rounding — so the run reads as one bar.

{% include demo.html file="range.html" %}

| Class / attribute | Effect |
|---|---|
| `.tui-calendar` | Grid of header and table, `--tui-spacing-3` apart, as wide as its content |
| `.tui-calendar-header` / `.tui-calendar-title` | Flex row of navigation buttons around the semibold title |
| `.tui-calendar-grid` | The `role="grid"` table with element-table styles undone |
| `.tui-calendar-day` | Square button, `--tui-calendar-day-size`, fully rounded, hover background |
| `[aria-current="date"]` / `.tui-today` | Tone ring |
| `[aria-selected="true"]`, `[data-selected]`, `.tui-selected` | Tone fill |
| `[data-range="start"]` / `"end"` / `"middle"` | Range ends (fill, inner corners squared) and the soft run between |
| `:disabled`, `[aria-disabled="true"]`, `[data-disabled]` | Muted, struck through, `not-allowed` cursor |
| `[data-outside]` / `.tui-calendar-outside` | Muted day of a neighbouring month |

## What your script does

- Renders the cells for the month it shows, marking today, the selection, the range and the disabled days with the attributes above.
- Re-renders on the navigation buttons and writes the new title.
- Moves focus between days with the arrow keys and mirrors the picked date into an input.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-calendar-day-size` | `2.25rem` | Width and height of a day cell |

Related: [Inputs](/ui/forms/inputs/) · [Popover](/ui/interactive/popover/) · [Buttons](/ui/components/buttons/) · [Self-driven JS](/ui/foundations/self-driven-js/)
