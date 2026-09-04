---
title: Drag and Drop
section: interactive
source: src/60-interactive/drag.css
js: self-driven
description: "The states a drag-and-drop script reports — dragged, drop target, drop edge — painted on any list item, card or column."
---

Reordering is the script's job, with the HTML drag events or pointer events. These rules paint what it reports, on any element: the item being dragged, the container it may drop into, and the edge of the item it would land beside. A `.tui-drag-handle` from the [list group](/ui/components/list-group/) gives the row a grip; `draggable="true"` alone gives it a grab cursor.

## States <span class="tui-badge">self-driven JS</span>

`data-dragging` (or `.tui-dragging`) fades the element and shows a grabbing cursor. `data-drop-target` (or `.tui-drop-target`) draws a dashed tone outline inside the container and tints it. `data-drop="before"` / `"after"` draws a 3px tone line along the top or bottom edge of the item the drop would precede or follow — an inset shadow rather than a pseudo-element, so a component that already draws `::before` or `::after` keeps it. Drag a card below.

{% include demo.html file="board.html" %}

| Selector | Effect |
|---|---|
| `[draggable="true"]` | Grab cursor |
| `:is([data-dragging], .tui-dragging)` | 60% opacity, grabbing cursor |
| `:is([data-drop-target], .tui-drop-target)` | Dashed tone outline inside the edge, soft tone background |
| `[data-drop="before"]` / `[data-drop="after"]` | 3px tone line along the top / bottom edge |

## What your script does

- On `dragstart`, sets `data-dragging` on the item; on `dragend`, removes every state.
- On `dragover` of a container, calls `preventDefault()` and sets `data-drop-target`; on the item under the pointer, sets `data-drop` to `"before"` or `"after"` by the pointer's position in it.
- On `drop`, moves the element and clears the states.

Related: [List Group](/ui/components/list-group/) · [Board](/ui/layout/board/) · [Self-driven JS](/ui/foundations/self-driven-js/)
