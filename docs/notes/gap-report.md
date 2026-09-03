# Torque UI — Component Gap Report

> Historical review from 2026-08-26, written against a branch layout that no longer exists (several files it cites were since deleted or rewritten). Kept for the record; do not treat its findings as open.

Date: 2026-08-26. Scope: what a zero-JS CSS library needs to be usable for a real product, measured against Bootstrap 5, Bulma, Semantic UI, Fluent UI and Tabler, and against what the platform now offers without JavaScript. Verified against `src/` on branch `hm-attempt-2` (not against `docs/comparison.md`, which has drifted — see the last section).

## Summary

Torque UI covers the presentational layer well: 30 components in `30-components/`, 17 form files, a 12-column grid, utilities, and a real theming story (`@layer`, single `--tui-brand`, dark/high-contrast/forced-colors). The gaps cluster in four places:

1. **A prerequisite, not a component.** Tabs, accordion, carousel, toggle-group and rating are hardcoded to `#tab-1..3`, `#acc-1..3`, `#carousel-1..3`, `#toggle-1..3`, `#star-1..5`. They are demos, not components — a fourth tab needs new CSS. Every interactive component on the list below depends on fixing this mechanism first.
2. **Table-stakes static components** every comparison framework has and Torque UI does not: list group, input group/addons, close button, fieldset, responsive/sticky tables, app-shell layout, hero/section, media object, avatar group, icon sizing.
3. **Interactive components the platform can now do natively**, better than the checkbox hack: `<details name>`, the `popover` attribute, `field-sizing`, CSS carousels, anchor positioning, scroll-driven animations, cross-document view transitions. None of these are used anywhere in `src/`.
4. **Non-components that block adoption**: no logical properties (RTL is impossible), no print styles, no icon convention.

Feasibility key used below: **CSS** = pure CSS within the library's *real* floor; **Native** = zero-JS but needs a newer browser than that floor — say so per component; **JS** = genuinely needs script, document as a non-goal. Both reviewers found the README floor (Chrome 111 / Safari 15.4 / Firefox 126) is understated: relative color syntax, nesting, `:user-invalid` and range media queries put the actual floor at roughly Chrome 120 / Safari 17.5 / Firefox 128 — which already admits `light-dark()`, `popover`, and `<details name>`.

## 0. Prerequisite: generic state mechanism

| File | Problem | Fix |
|---|---|---|
| `src/60-interactive/tabs.css:49-79` | `.tui-tabs:has(#tab-1:checked) .tui-tab-panel:nth-child(1)` × 3 | Put the radio *inside* each panel's preceding sibling position and use `.tui-tab-input:checked + .tui-tab-panel`, or use `:has(.tui-tab-input:nth-of-type(n):checked)` generated for 1–12. Better: one `<input>` per panel and `.tui-tab-panel:has(> .tui-tab-input:checked)`. |
| `src/60-interactive/accordion.css:54-97` | Same, `#acc-1..3` | Replace with `<details name="group">` — exclusive accordion is native, keyboard accessible, needs no ids. |
| `src/60-interactive/carousel.css:57-73` | Same, `#carousel-1..3`; dots never activate (`~` selector, dots are descendants); radios cannot scroll the track | `scroll-snap` is already there; drop the radios and use `<a href="#slide-n">` + `:target` for dots today, `::scroll-marker` when available. |
| `src/60-interactive/toggle-group.css:42-54` | Same, `#toggle-1..3` | `.tui-toggle-label:has(> .tui-toggle-input:checked)` — nest the input in the label; no ids needed. |
| `src/60-interactive/rating.css:31-59` | Same, `#star-1..5`; selection never renders (`:nth-child` counts the radios) | Sibling selection (`:checked ~ label` with reversed source order, or `:has()`); no ids. |
| `src/60-interactive/dropdown.css:77-91` | Already id-free (`:has(.tui-dropdown-input:checked)`) | The pattern the others should copy. |

Until this is done, adding any new interactive component would copy the same flaw.

## 1. Static components (CSS, missing today)

Ordered by how often a product page needs them.

| Component | Why it matters | Feasibility | Notes |
|---|---|---|---|
| **Input group / addons** | Prefix/suffix text, icon slots, attached button (`$`, `.com`, search + button). Every comparison framework ships it; nothing in `50-forms/` or `20-elements/inputs.css` covers it. | CSS | Flex wrapper + `:first-child`/`:last-child` radius collapse; `:has(:focus-visible)` for group focus ring. |
| **List group / item list** | Settings lists, nav lists, result lists. Bootstrap list-group, Semantic list/item, Bulma panel. `20-elements/lists.css` styles `ul/ol/dl` only. | CSS | Active/hover/disabled, link items, badge slot, flush variant. Pairs with `:has(input:checked)` for selectable lists. |
| **Close button** | Needed by alert, toast, modal (`tui-modal-close` exists but is modal-only), chip. Comparison doc already lists it as a candidate. | CSS | One `.tui-close` with `::before` glyph; dismissible alert/toast/chip = `:has(.tui-dismiss:checked) { display:none }`. `chip.css:2` claims "close capability" but has none. |
| **Fieldset / legend** | Zero rules for `fieldset`/`legend`; forms with grouped controls render browser defaults. | CSS | Reboot + `.tui-fieldset` matching `tui-form-group`. |
| **Responsive table wrapper + sticky header** | `tables.css` has striped/bordered/compact/comfortable only. No `overflow-x` wrapper, no `position: sticky` header, no selectable rows. | CSS | `.tui-table-responsive { overflow-x:auto }`, `thead th { position: sticky; top:0 }`, `tr:has(input:checked)` row highlight. Sorting stays a JS non-goal (only the indicator is CSS). |
| **App shell / page layout** | Header + sidebar + main + footer grid. Nothing between `container` and `grid` covers a full-page skeleton. | CSS | `grid-template-areas`, sidebar collapses via container/media query. |
| **Sidebar / offcanvas / drawer** | Mobile navigation, filter panels. Comparison doc lists as missing. | CSS (checkbox) / Native (`popover`) | `popover` attribute gives light-dismiss + Escape for free; checkbox fallback for the stated floor. |
| **Navbar mobile collapse** | `menu.css` has no `@media`/`@container` and no toggle — the navbar does not work on narrow screens. | CSS | Hamburger `<label>` + `:has(:checked)` or `popover`. Also missing: vertical menu, submenu/dropdown inside navbar, mega menu. |
| **Hero / section, media object, level** | Bulma/Bootstrap layout primitives for marketing and list rows. | CSS | Small; media object is a 2-column grid with `align-items:start`. |
| **Avatar group / stack, avatar + status dot** | `avatar.css` has sizes only; `status.css` exists but nothing composes them. | CSS | Negative `margin-inline-start` on siblings; status dot via `::after` or nested `.tui-status`. |
| **Icon sizing convention** | `tui-button-icon` exists but there is no `.tui-icon` (size, `currentColor`, vertical alignment). Every component that wants an icon reinvents it. | CSS | `svg.tui-icon { inline-size: 1em; block-size: 1em; fill: currentColor; vertical-align: -0.125em }`. |
| **Loading overlay / dimmer** | Semantic dimmer, Fluent overlay. Skeleton exists but not "this region is busy". | CSS | `.tui-busy` wrapper with `::after` backdrop + spinner; `:has(.tui-busy-input:checked)` toggle. |
| **Circular progress / native `<progress>` + `<meter>`** | `progress.css` is div-based; `<progress>` element unstyled; `meter` only gets one rule in `form-enhancements.css:12`. | CSS | `conic-gradient` for rings; style `progress::-webkit-progress-bar/-moz-progress-bar`. |
| **Split button, floating action button** | Button family gaps; button group exists. | CSS | Split = button group with `:last-child` icon button. FAB = fixed-position icon button. |
| **Tree view** | Nested navigation, file lists. | CSS | Nested `<details>`; guides via `::before` borders. |
| **Kbd / code block polish** | `kbd` has one rule; no `.tui-code` block with copy slot, line numbers via `counter`. | CSS | Low effort; matters for docs-heavy products. |
| **Callout / admonition** | Docs-style note/tip/warning with icon column. `alert.css` is close; a bordered-left variant would cover it. | CSS | Variant of alert rather than new component. |
| **Pricing table, comment/feed, testimonial** | Marketing/social page patterns from Semantic/Tabler. | CSS | Lower priority; compose from card + list group once those exist. |

## 2. Interactive components — use the native primitive

All of these are zero-JS. Some need a browser newer than the stated floor; the library should state the per-component floor and keep a checkbox fallback where cheap.

| Component | Today | Native primitive | Support | What it fixes |
|---|---|---|---|---|
| **Accordion / collapse** | Checkbox + hardcoded ids | `<details name="x">` + `<summary>`; animate with `::details-content` + `interpolate-size: allow-keywords` | `details` everywhere; `name` Chrome 120, Safari 17.2, Firefox 130; animation Chrome 131+ | Keyboard, screen-reader semantics, exclusive groups, no ids, generic "Collapse" component for free. |
| **Dropdown / menu / popover / tooltip (click)** | Checkbox + `:has()` (dropdown), `:focus-visible` (popover) | `popover` attribute + `popovertarget` on a `<button>` | Chrome 114, Safari 17, Firefox 125 | Light-dismiss (click outside), Escape, top-layer stacking, focus return. Closes the "Escape/click-outside impossible" limitation listed in `comparison.md`. Animate entry with `@starting-style`. |
| **Modal** | Checkbox + `:has()`, duplicated in `30-components/modal.css` and `60-interactive/modal.css` | `<dialog>` opened declaratively via `<button commandfor="id" command="show-modal">` | Chrome 135, Safari 26; Firefox in progress | Real focus trap, `inert` background, Escape, `::backdrop`. Keep the checkbox variant as the fallback and merge the two files. |
| **Carousel** | Radio + scroll-snap + hardcoded ids | `scroll-snap` (already) + `::scroll-button(*)` and `::scroll-marker` | Chrome 135; Safari/Firefox not yet | Native prev/next and dots without ids. Interim: `:target` dots (`links-nav.css` already uses `:target`). |
| **Auto-growing textarea** | `resize: vertical` only | `field-sizing: content` | Chrome 123, Safari 26 | One declaration; also enables auto-width inputs and selects. |
| **Custom select** | Native select + arrow (`select.css`) | `appearance: base-select` + `::picker(select)` | Chrome 134 | Rich options (icons, descriptions) with zero JS; progressive by design. |
| **Combobox / autocomplete** | Nothing | `<input list>` + `<datalist>` | Everywhere | Styling of the list is limited, but it is the only zero-JS autocomplete and should be documented. |
| **Anchored positioning** | Tooltip/popover/dropdown fixed to one side | `anchor-name` / `position-anchor` / `position-try-fallbacks` | Chrome 125, Safari 26; Firefox in progress | Flip on overflow, viewport clamping. `docs/css-anchors.md` is stale (says Chrome 121 behind a flag). |
| **Toast auto-dismiss** | Static banner; `comparison.md` says needs JS | CSS `animation` with `forwards` to `opacity:0; display:none` (via `transition-behavior: allow-discrete`) | Everywhere for the animation; `allow-discrete` Chrome 117, Safari 17.4, Firefox 129 | Auto-hide after N seconds is pure CSS; only *queueing* needs JS. |
| **Dismissible alert / chip / toast** | None | `:has(.tui-dismiss:checked)` | Everywhere | Depends on the close button in §1. |
| **Password reveal** | None | Text input with `-webkit-text-security: disc`, cleared by `:has(:checked)` | Chrome, Safari, Firefox 116+ | Documents a real zero-JS trick; caveat: not `type=password` so autofill heuristics differ. |
| **Multi-step form / wizard** | `steps.css` is a static indicator | Same radio mechanism as tabs (once generic), panels via `:has()` | Everywhere | Reuses the fixed tab mechanism; steps indicator gets `:has()`-driven state. |
| **Resizable split pane** | None | `resize: horizontal` + `overflow: auto` on a grid child | Everywhere | Rarely offered by CSS frameworks; cheap win. |
| **Scrollspy / reading progress / sticky-shrink header** | None | Scroll-driven animations (`animation-timeline: scroll()` / `view()`) | Chrome 115, Safari 26; Firefox in progress | Reading progress bar is three lines of CSS. |
| **Page transitions** | None | `@view-transition { navigation: auto }` | Chrome 126, Safari 18.2 | Cross-document transitions are the one "SPA feel" a zero-JS library can offer. |
| **Theme toggle** | Present (`forced-toggle.css`) | — | — | Covered. |

## 3. Cross-cutting gaps (not components, but block adoption)

| Gap | Evidence | Fix |
|---|---|---|
| **RTL / logical properties** | 0 uses of `margin-inline`/`padding-inline`/`inset-inline`; 11 `margin-left`, 4 `padding-left`. `a11y.css` has `:dir()` rules but the rest of the library is physical. | Convert spacing utilities and components to logical properties; add `ms-*`/`me-*` utilities. |
| **Print styles** | 0 `@media print`. | Reboot-level print sheet: hide interactive chrome, expand accordions/details, black text. |
| **Component-level custom properties** | Tokens are global; components read `--tui-*` tokens directly rather than exposing `--tui-button-bg` style hooks. | Expose per-component vars with token fallbacks so one component can be re-themed without touching tokens (reviewers cover this). |
| **Duplicate sources** | `20-elements/buttons.css` + `30-components/button.css`; `30-components/modal.css` + `60-interactive/modal.css` (near-identical). | Merge; ship one modal and one button file. |
| **Per-component browser floor** | README states one floor; components in §2 need different ones. | Support table per component in docs. |

## 4. Explicit non-goals (need JavaScript)

Say so in the docs so users stop looking: sortable/filterable tables, drag-and-drop/sortable lists, select-all checkbox, autocomplete *filtering* beyond `datalist`, virtualized lists, custom date picker, file-input preview/filename, stepper ± increment, toast queue/stacking, command palette, copy-to-clipboard, async form validation messages, carousel autoplay with pause (CSS animation can autoplay but cannot resume a user-scrolled position), reading the value of range/color inputs into the page.

## 5. Documentation drift found while auditing

| Claim | Reality |
|---|---|
| `docs/comparison.md`: "Textarea — No" | `20-elements/inputs.css:8-53` styles `textarea` (placeholder, hover, focus, disabled, resize). |
| `docs/comparison.md`: "Toast auto-dismiss requires JS" | Pure CSS animation covers auto-hide (§2). |
| `docs/css-anchors.md`: "Chrome 121+ behind flag, Safari not implemented" | Anchor positioning shipped in Chrome 125 and Safari 26. |
| `README.md` accordion snippet uses `for` on a `<div>` | Works only because `accordion.css:63` selects `.tui-accordion-body[for="acc-1"]` — `for` is not valid on `div`; this is the hardcoded-id problem surfacing in the docs. |
| `30-components/chip.css:2`: "Pill-shaped tags with close capability" | No close/dismiss rules exist in the file. |

## 6. What the reviews add (see `docs/review-junior.md`, `docs/review-kevin.md`)

Both reviews were run against this branch; the items that change the gap picture:

| Finding | Effect on this report |
|---|---|
| Rating selection never renders (`rating.css:31-59` `:nth-child` targets the radios, not the stars); carousel dots never light up (`carousel.css:61` uses `~` but dots are descendants) and the radios cannot scroll the track | Rating and carousel are *broken*, not merely id-bound — move from "fix mechanism" to "rebuild" in §0. |
| Popover opens only on `:focus-visible` — mouse users cannot open it (`popover.css:58`); tooltip needs a focusable descendant the examples lack (`tooltip.css:47`) | Popover/tooltip are gaps today, not just upgrade candidates. `popover` attribute (§2) fixes both. |
| No visible focus on any checkbox-hack component — state inputs are `opacity:0` and the label gets no ring; closed dropdown/popover items stay in tab order | Any new interactive component must ship `input:focus-visible + label` styles and `visibility:hidden` on closed panels. Add to the §0 mechanism. |
| `overflow: hidden` on card/panel/accordion/toggle-group clips dropdowns mounted inside | Blocks composing dropdown/menu/popover into cards; fix before adding list group or app shell. |
| `30-components/modal.css` is dead (later layer wins); no example uses a modal; no focus trap/inert/Escape and nothing says so | Modal should become `<dialog>` (§2) with an honest one-line JS note, or a `popover`-based non-modal panel. |
| Bare `input` selector styles checkboxes, radios and every hidden state input (`inputs.css:7-20`) | Prerequisite for input group and fieldset work. |
| No component-level custom properties; tone variants copy-pasted per component (~200 lines) | New components should follow a `--tui-tone` / per-component var pattern rather than the existing copy-per-variant one. |
| Committed `tui-all.css` is stale and the build script emits no layers | Any new component is invisible to bundle users until the build wraps files in `@layer`. |
| Tests never click, focus or assert visibility; broken docs demos pass | Each new interactive component needs one behavioural Playwright test. |

## 7. Suggested order

1. Generic state mechanism (§0) with focus styles and `visibility` toggling — unblocks everything else; do tabs first, then accordion to `<details>`, rebuild rating and carousel.
2. Fix the support statement, delete the dead modal, remove `overflow:hidden` from containers, scope the bare `input` selector, fix the bundle build — the reviewers' blockers.
3. Close button + dismissible alert/toast/chip (§1) — small, touches four components.
4. Input group, list group, fieldset, responsive/sticky table (§1) — the four most-requested static pieces.
5. Navbar mobile collapse + offcanvas + app shell (§1) — makes a full page buildable.
6. `popover`-based dropdown/menu/tooltip and `field-sizing` (§2) — biggest UX gain per line of CSS.
7. Logical properties + print (§3).
8. Everything else in §1/§2 as demand appears; keep §4 as a documented non-goal list.
