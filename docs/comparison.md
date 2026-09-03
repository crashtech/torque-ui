# Torque UI — Framework Comparison

## Component Coverage vs. Other CSS Frameworks

| Component Category | Torque UI | Bootstrap 5 | Semantic UI | Bulma | Fluent UI | Tabler |
|---|---|---|---|---|---|---|
| **Core Components** | | | | | | |
| Accordion | Yes (JS-free*) | Yes (JS-free*) | Yes | Yes (Tabs) | No | Yes (collapse) |
| Alert | Yes | Yes | Yes (Notification) | Yes (Notification) | Yes (MessageBar) | Yes |
| Avatar | Yes | No | Yes | No | Yes | Yes |
| Badge | Yes | Yes | Yes | Yes | Yes | Yes |
| Breadcrumb | Yes | Yes | Yes | Yes | Yes | Yes |
| Button | Yes (btn-group, btn-toolbar) | Yes (btn-group, btn-toolbar) | Yes | Yes | Yes | Yes (btn-group) |
| Button group | Yes (parent :has()) | Yes | Yes | No | Yes | Yes |
| Card | Yes | Yes | Yes | Yes (Box) | Yes | Yes |
| Carousel | Yes (JS-free*) | Yes (JS) | No | Yes | No | No |
| Chip | Yes | No | Yes (Tag) | Yes (Tag) | Yes (Chip) | No |
| Close button | **Yes (new)** | Yes (.btn-close) | No | No | No | Yes |
| Collapse | **Yes (new, native `<details>`)** | Yes (JS-free*) | Yes (Transition) | No | Yes (Collapsible) | Yes |
| Divider | Yes | Yes | Yes | Yes | Yes (Separator) | Yes (hr) |
| Empty state | **Yes (new)** | No | No | No | No | No (partial) |
| Flag | Yes | No | Yes | No | No | Yes (flag) |
| Label | Yes | Yes | Yes | Yes | Yes | Yes (badge) |
| List group | **Yes (new)** | Yes | Yes (List) | Yes (List) | Yes (List) | Yes |
| Menu | Yes (native `popover`) | Yes (Navbar) | Yes | Yes (Navbar) | No (ContextualMenu) | Yes (nav) |
| Modal | Yes (native `<dialog>`) | Yes | Yes | Yes | Yes (Dialog) | Yes |
| Offcanvas | **Yes (new, native `popover`)** | Yes (JS-free*) | Yes (Sidebar) | No | No | Yes (offcanvas) |
| Pagination | Yes | Yes | Yes | Yes | No | Yes |
| Panel | Yes | No | Yes | Yes (Panel) | No | Yes (card) |
| Placeholder | **Yes (new)** | Yes | No | No | No | Yes (skeleton) |
| Progress | Yes | Yes | Yes (Loader) | Yes | Yes (ProgressBar) | Yes |
| Ribbon | **Yes (new)** | No | No | No | No | No |
| Segment | Yes | No | Yes | Yes (Box) | No | No |
| Spinner | Yes | Yes | Yes (Loader) | No | Yes (Spinner) | Yes |
| Statistic | Yes | No | Yes | No | No | Yes (stat) |
| Status indicator | **Yes (new)** | No | No | No | No | Yes (status) |
| Steps | Yes | No | Yes | No | No | Yes (steps) |
| Tag | Yes | Yes (Badge) | Yes | Yes (Tag) | Yes (Tags) | Yes (badge) |
| Timeline | **Yes (new)** | No | No | No | No | Yes |
| Toast | **Yes (new)** | Yes | No | No | No | Yes |
| **Form Components** | | | | | | |
| Checkbox | Yes (JS-free*) | Yes | Yes | Yes | Yes | Yes |
| Color check (swatch) | **Yes (new)** | No | No | No | No | No |
| Color Input | Yes | No | No | No | No | No |
| Date Input | Yes | No | No (Datepicker) | No | Yes (DatePicker) | No (native) |
| Fieldset | **Yes (new)** | — | — | — | — | — |
| File Input | Yes | No | Yes | Yes (File) | Yes (FilePicker) | Yes |
| Image check (thumb) | **Yes (new)** | No | No | No | No | No |
| Input | Yes | Yes | Yes | Yes (Input) | Yes (TextField) | Yes |
| Input group / addons | **Yes (new)** | — | — | — | — | — |
| Radio Button | Yes (JS-free*) | Yes | Yes | Yes | Yes | Yes |
| Range Slider | Yes (JS-free*) | Yes | Yes | No | Yes (Slider) | Yes |
| Search Input | Yes | Yes | Yes | Yes | Yes (SearchBox) | Yes |
| Select | Yes | Yes | Yes | Yes | Yes (Dropdown) | Yes |
| Select with icon options | Yes (native `base-select`, Chrome 134+) | No | Yes (JS) | No | Yes (JS) | Yes (JS) |
| Combobox / searchable select | Yes (self-driven JS: styled shell + listbox) | No | Yes (JS) | No | Yes (ComboBox, JS) | Yes (TomSelect, JS) |
| Tags input / multi-select | Yes (self-driven JS: `.tui-combobox-tags`) | No | Yes (JS) | No | Yes (JS) | Yes (TomSelect, JS) |
| Listbox | Yes (self-driven JS states) | No | No | No | Yes (JS) | No |
| Stepper (± input) | **Yes (new)** | No | No | No | No | Yes (input-group) |
| Switch | Yes (JS-free*) | Yes (Form-switch) | Yes | No | Yes (Switch) | Yes (form-switch) |
| Textarea | Yes | Yes | Yes | Yes | Yes (TextArea) | Yes (form-control) |
| Validation | Yes (CSS-only) | Yes (CSS-only) | Yes | Yes | Yes | Yes |
| **Layout** | | | | | | |
| App shell / page layout | **Yes (new)** | — | — | — | — | — |
| Container | Yes | Yes | Yes | Yes | No | Yes |
| Container queries | **Yes (new)** | No | No | No | No | No |
| Flexbox Utils | Yes | Yes | Yes | Yes | Yes | Yes |
| Display Utils | Yes | Yes | Yes | Yes | Yes | Yes |
| Grid | Yes (12-col) | Yes (12-col) | Yes (16-col) | Yes (Tile) | No | Yes (12-col) |
| Hero/Section | **Yes (new)** | Yes (Hero) | Yes (Segment) | Yes (Hero) | No | No |
| Level | **Yes (new)** | No | No | Yes | No | No |
| Media Object | **Yes (new)** | No | Yes (Feed) | Yes (Media) | No | No |
| Rail | No | No | Yes | No | No | No |
| Spacing Utils | Yes | Yes | Yes | Yes | Yes | Yes |
| Tile | No | No | No | Yes | No | No |
| **Typography** | | | | | | |
| Font tokens | Yes | No | No | No | No | No |
| Heading styles | Yes | Yes | Yes | Yes | No | Yes |
| Text utilities | Yes | Yes | Yes | Yes | Yes | Yes |
| Text-wrap (balance/pretty) | **Yes (new)** | No | No | No | No | No |
| **Interactive** | | | | | | |
| Accordion | Yes (JS-free*) | Yes (JS-free*) | Yes | Yes (Tabs) | No | Yes (collapse) |
| Carousel | Yes (JS-free*) | Yes (JS) | No | Yes | No | No |
| Dropdown | Yes (JS-free*) | Yes (JS) | Yes | Yes | Yes | Yes |
| Popover | Yes (JS-free*) | No | No | No | No | Yes |
| Rating | Yes (JS-free*) | No | Yes | No | No | No |
| Tabs | Yes (JS-free*) | Yes (JS) | Yes | Yes | Yes (Pivot) | Yes |
| Toggle Group | Yes (JS-free*) | No | No | No | No | No |
| Tooltip | Yes (JS-free*) | Yes (JS) | Yes | No | Yes | Yes |
| **Theme/Dark** | | | | | | |
| Dark mode | Yes (auto) | Yes (v5.3+) | No | No | Yes | Yes |
| Forced toggle | Yes | Yes (v5.3+) | No | No | Yes | No |
| High contrast | Yes | No | No | No | Yes | No |
| Reduced-motion | **Yes (new)** | No | No | No | No | No |
| Forced-colors (Win) | **Yes (new)** | No | No | No | Yes | No |
| **Utilities** | | | | | | |
| Glassmorphism | **Yes (new)** | No | No | No | No | No |
| Image filters | **Yes (new)** | No | No | No | No | No |
| Overflow utils | Yes | Yes | No | Yes | Yes | Yes |
| Pointer/orientation | **Yes (new)** | No | No | No | No | No |
| Z-index utils | Yes | Yes | No | No | No | Yes |
| Transition utils | Yes | Yes | Yes | No | Yes | Yes |
| Breakpoint utils | Yes | Yes | Yes | Yes | Yes | Yes |

## Where Torque UI Falls Short (No-JS Limitations)

Since the self-driven JS pass, a limitation that only needs *your* script is no longer a gap in the CSS: the framework styles every state the script would set (see `docs/foundations/self-driven-js/`). The rows below say which side owns what.

The items below are genuine, current gaps — each verified against the CSS in this branch. Several limitations from earlier passes no longer apply and have been removed: close button, collapse, list group, offcanvas/sidebar and textarea are now shipped (see the coverage table above); modal focus trap is solved by the native `<dialog>` (Escape, focus trap, `inert` background and `::backdrop` are all built in); toast auto-dismiss is a pure CSS animation (`.tui-toast-auto`); carousel swipe works for free because the track is a native `overflow: auto` scroll-snap container; rating *is* a real radio group (it submits with the form and fires native `change` events, so "no server value" was never accurate); and tabs only ever render one panel at a time via `:checked +` sibling selectors, not "all content visible simultaneously".

| Feature | Torque UI Limitation | Bootstrap/Semantic/Bulma/Fluent/Tabler |
|---|---|---|
| Dropdown/menu arrow-key roving | Tab, Escape and click-outside all work natively via `popover`; roving is self-driven JS (`.tui-menu-item:focus-visible` paints the focused row) | Full keyboard accessibility with JS |
| Tooltip/popover positioning | Anchor positioning is used behind `@supports` (`anchor-name`/`position-anchor`); below Chrome 125 / Safari 26 it falls back to a fixed position | Dynamic positioning, viewport clamping, everywhere |
| Carousel auto-play | No autoplay-with-pause-on-hover — a CSS animation can autoplay but cannot resume from a user's scroll position | Auto-play with pause on hover |
| Dropdown filtering | Self-driven JS: the script toggles `hidden` on `.tui-option` rows and the listbox shows its own empty row; virtual scroll is not attempted | JS-driven filtering, virtual scroll |
| ARIA live regions | The toast stack is an `aria-live` mount point a script appends to; other announcements are the script's | JS-driven ARIA announcements |
| Form validation messages | `:user-invalid` for live feedback; `aria-invalid` / `data-invalid` paint the same state for server or script validation (self-driven JS); the message text is the script's | JS-driven custom validation messages |
| Date input | Native browser picker only, no custom calendar | Custom JS date picker with formatting |
| Search clear | The clear control shows itself once the field has text (self-driven JS clears the value); no debounce | JS-driven clear button, debounce |
| Toggle/rating state persistence | Resets on page reload (no storage); the theme choice has a `data-theme` root hook for a persisting script (self-driven JS) | Persists state, emits events |
| File input filename | Native browser filename display only, no custom preview/thumbnail | JS-driven file preview |
| Color input value display | Visual swatch only — no hex/rgb readout | JS-driven value formatting |
| Stepper value change | The buttons are presentation and read `disabled` at the bound; stepping the value is self-driven JS | JS-driven value increment/decrement |
| Color/image check value | Visual swatch only — no value readout | JS-driven value formatting |
| Sortable/filterable tables, drag-and-drop lists, virtualized lists, copy-to-clipboard | Need JS — explicit non-goals; sort headers and list filtering have self-driven JS hooks (`th[aria-sort] > button`, `.tui-list-empty`), the rest is not attempted | JS-driven |

## Tabler: Gap Analysis & What We Added

Tabler (https://github.com/tabler/tabler) is the closest full-coverage reference. Below is the component-by-component diff and what we implemented in this pass (all zero-JS).

### Components Tabler has that Torque UI now has (added this pass)

| Component | Torque UI Class | Zero-JS? |
|---|---|---|
| Status indicator | `.tui-status` + `.tui-status-*` | Yes |
| Empty state | `.tui-empty` + `.tui-empty-*` | Yes |
| Timeline | `.tui-timeline` + `.tui-timeline-item` | Yes |
| Toast / Notification | `.tui-toast` + `.tui-toast-*` | Yes |
| Placeholder / Skeleton | `.tui-placeholder` (shimmer) | Yes |
| Stepper (± input) | `.tui-stepper` | Presentational |
| Color check (swatch picker) | `.tui-color-check` + `.tui-color-check-input` | Yes |
| Image check (thumbnail) | `.tui-image-check` + `.tui-image-check-input` | Yes |

### Components Tabler has that Torque UI does NOT have (require JS or out of scope)

| Component | Why it's a gap |
|---|---|
| Drag & drop / sortable | Requires JS (HTML5 DnD or Pointer Events) |
| Stepper value increment | Requires JS (native input handles display) |
| Color check value display | Requires JS to read value |
| Image check value display | Requires JS to read value |
| Date picker (custom) | Requires JS for calendar logic |
| Virtualized list | Requires JS |
| File upload preview | Requires JS for File API |

Collapse (native `<details>`), list group, offcanvas/sidebar (native `popover`), close button and responsive table (horizontal-scroll wrapper, `.tui-table-responsive`) were all candidates in the previous pass and have since been built — see the coverage table above. Modal focus trap and Escape close needed nothing further once the modal moved to a native `<dialog>`; toast auto-dismiss needed nothing further once it moved to a CSS animation (`.tui-toast-auto`).

### CSS Feature Groups Added (historical)

| Group | Features | Files |
|---|---|---|
| 2 — Form Enhancement | `accent-color`, `appearance`, `:read-only`, `:in-range`, `:placeholder-shown`, `::file-selector-button` | `src/50-forms/form-enhancements.css` |
| 3 — Accessibility & Typography | `prefers-reduced-motion`, `forced-colors`, `prefers-contrast`, `:dir()`, `:lang()`, `text-wrap: balance/pretty`, `hyphens`, `::selection`, `text-decoration-thickness` | `src/80-themes/a11y.css` |
| 4 — Container Queries | `container-type`, `container-name`, `@container` | `src/40-layout/container-queries.css` |
| 5 — Visual Effects | `backdrop-filter` (glass), `mix-blend-mode`, `object-fit`, `filter`, `clip-path`, `shape-outside`, `mask-image` | `src/70-utilities/visual.css` |
| 6 — Media & Responsive | `@media (hover)`, `@media (pointer)`, `@media (orientation)`, `aspect-ratio` | `src/70-utilities/pointer-orientation.css` |

## CSS Anchors — What's Possible

CSS Anchors (Anchor Positioning API) is Chrome 125+ / Safari 26+ (Firefox in progress). Torque UI already uses it, behind `@supports (anchor-name: --x)`, for **tooltip** and **popover/menu** (`src/60-interactive/tooltip.css`, `src/60-interactive/popover.css`) — anchored placement with a fallback when unsupported. See `docs/css-anchors.md` for the syntax reference and full support status.

Not anchored yet, remaining candidates:

| Feature | With CSS Anchors | Without (current) |
|---|---|---|
| **Date picker** | Position calendar relative to input field | Native browser date picker only |
| **Color picker** | Position palette relative to swatch | Visual-only color input |
| **Badge** | Position relative to a parent element (e.g. a notification dot) | Static positioning |
| **Carousel dots** | Position relative to track center | Static dots below carousel (current `:target` implementation) |
| **Context menu** | Position relative to trigger, flip on overflow | No context menu support |

### Browser Support Status

| Browser | CSS Anchors Support |
|---|---|
| Chrome 125+ | Shipped |
| Edge 125+ | Shipped |
| Safari 26+ | Shipped |
| Firefox | In progress |

**Bottom line:** anchor positioning is the one modern CSS feature that most directly extends Torque UI's JS-free model — dynamic positioning of popper elements. Tooltip and popover already use it (behind `@supports`, so the floor still gets a usable fallback); date/color pickers, badges and context menus are the remaining candidates.

## Summary

**Torque UI wins when:**
- Zero JavaScript is a hard requirement
- Modern browser support (latest Chrome/Edge/Firefox/Opera) is acceptable
- Single brand color derivation is desired
- Cascade control via @layer is important
- Dark mode via prefers-color-scheme is needed
- No dependency on jQuery or React is preferred

**Torque UI is competitive when:**
- Core components (buttons, cards, alerts, badges, forms, list groups, hero/media/level layouts) are needed
- Layout system (grid, flexbox, container, app shell) is sufficient
- Menus, popovers, offcanvas and modals need real keyboard support — native `popover`/`<dialog>` give Escape, click-outside and (for modal) a focus trap for free
- Color system customization is needed

**Torque UI falls short when:**
- Dropdown/menu arrow-key roving (up/down between items) is required — Tab/Escape/click-outside work, arrow-key navigation does not
- Dynamic positioning is needed for components anchor positioning hasn't reached yet (date/color pickers, badges, context menus) — tooltip and popover already use it
- Legacy browser support is required (floor is Chrome 123 / Safari 17.5 / Firefox 128)
- ARIA live regions are required (no dynamic announcements without JS)
- Server-side/async form validation feedback is needed
- Sortable/filterable tables, drag-and-drop, virtualized lists or a command palette are needed — explicit non-goals

**CSS Anchors has already closed part of the positioning gap** for tooltip and popover; the remaining candidates (date picker, color picker, badge, context menu) are listed above.
