---
title: Browser Support
section: getting-started
source: src/tui.css
description: "The feature floor, and how each component degrades below it."
---

The floor is **Chrome 123 / Safari 17.5 / Firefox 128**. These features are used unconditionally throughout the library and are what the floor is built on: `:has()`, `@layer`, CSS nesting, `color-mix()`, relative colour syntax, `light-dark()`, `:user-invalid`, the `popover` attribute and `<details name>`.

## Progressive enhancement

Components that lean on something newer enhance progressively — the feature sits behind `@supports`, or the component has a documented soft degradation. Below its own floor a component still works; it only loses the enhancement.

| Component / feature | Needs | Below the floor |
|---|---|---|
| `<details name>` exclusive accordion | Firefox 130 | Same-named `<details>` open independently instead of closing siblings (Firefox 128–129) |
| `popover` (menu, popover, offcanvas, sheet) | Chrome 114 / Safari 17 / Firefox 125 | Fully covered — `popover`'s own floor is below the framework's stated floor |
| `commandfor` / `command="show-modal"` (modal) | Chrome 135 / Safari 26 / Firefox 144 | Add one line of JavaScript: call `showModal()` on click. Closing, Escape, focus trap and backdrop need nothing |
| `@starting-style` + `transition-behavior: allow-discrete` (entry/exit animation on modal, popover, offcanvas, collapse, and the dismiss mechanism behind alert/toast/chip) | Chrome 117 / Safari 17.4 / Firefox 129 | On Firefox 128 the element appears or disappears without the fade; state is still correct |
| Anchor positioning (popover, tooltip) | Chrome 125 / Safari 26 | Popover falls back to a bottom sheet with a dimmed backdrop; tooltip always sits above its trigger |
| `field-sizing: content` (auto-growing textarea, composer) | Chrome 123 / Safari 26; not in Firefox | Textarea keeps its fixed size with a manual resize handle |
| `appearance: base-select` (rich select, icon options, `<selectedcontent>`) | Chrome 134 | Native unstyled `<select>` popup showing the option text alone |
| Typed `attr()` (progress and range values read from `aria-valuenow` / `data-value`) | Chrome 133 | The property keeps its initial value until set directly from a script |
| Anchor positioning (combobox listbox anchored to its field) | Chrome 125 / Safari 26 | The popover list becomes the bottom sheet; the in-flow list is unaffected |
| `::scroll-marker` / `::scroll-button()` (carousel) | Chrome 135 | `:target`-driven dot navigation (already in the markup) takes over |
| `interpolate-size: allow-keywords` (collapse animation) | Chrome 131 | Content snaps open/closed instead of animating |
| `::details-content` (print forces closed collapses open) | Chrome 131 | A section closed on screen prints closed |
| Scroll-driven animations (reading progress, shrinking header) | Chrome 115 / Safari 26 | Wrapped in `@supports (animation-timeline: scroll())` — unsupported browsers never see the bar or the shrink |
| `@view-transition` (cross-document view transitions) | Chrome 126 / Safari 18.2 | Navigation happens with no transition |
| Leading trim (`text-box: trim-both cap alphabetic`) on headings, paragraphs, list items, cells, labels and other text blocks | Chrome 133 / Safari 18.2 / Firefox 154 | Text keeps its half-leading: it sits a few pixels lower in its box, and boxes and gaps are slightly taller. Declared unconditionally, since there is no second branch to gate; nothing misaligns. See [Typography Scale](/ui/foundations/typography-scale/) |

## A degradation you can see

The pair below shares `name="browser-support-faq"`. On the floor and above, opening one closes the other; on Firefox 128–129 both stay open at once. Either way each section opens and closes on its own — nothing breaks, the exclusivity is the enhancement.

{% include demo.html file="details-name.html" %}

Related: [Installation](/ui/getting-started/installation/) · [Cascade Layers](/ui/getting-started/layers/) · [Collapse](/ui/interactive/collapse/) · [View Transitions](/ui/themes/view-transitions/)
