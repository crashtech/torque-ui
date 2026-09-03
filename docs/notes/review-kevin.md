# Review — Kevin (CSS / UI / UX lens), 2026-08-26

> Historical review from 2026-08-26, written against a branch layout that no longer exists (several files it cites were since deleted or rewritten). Kept for the record; do not treat its findings as open.

All paths relative to the repo root.

## Prior review (`docs/css-review-kevin-powell.md`) — what actually changed

| Item | Status |
|---|---|
| Add `@layer` | Done, correctly, via `src/tui.css`. |
| Container queries | Partial: opt-in wrapper only (`src/40-layout/container-queries.css`). |
| `color()` vs `color-mix()` consistency | Changed `color()` → `rgba(from …)`. Still two dialects, and it raised the browser floor (#1). |
| Hardcoded colours (flag, select/search SVG, modal backdrop) | Not addressed. |
| `max-height: 500px` accordion | Not addressed. |
| `transition: all` | Not addressed (36 occurrences, 15 files). |
| Redundant `-primary` modifiers | Not addressed. |
| Two modal files | Not addressed. |
| Per-ID interactive rules | Not addressed. |
| Tooltip placements, steps `100vw`, ribbon `-35px`, form-table `200px` | Not addressed. |

One architectural fix landed; everything else is still open.

## Ranked findings

### 1. Stated browser support is wrong, and on the low end it is total failure, not degrade — CRITICAL

README says Chrome 111+ / Safari 15.4+ / Firefox 126+. The code requires:

- Relative color syntax `rgba(from …)` / `oklch(from …)` — Chrome 119, Safari 16.4, Firefox 128: `src/00-tokens/00-colors.css:47-56`, `badge.css:22-48`, `chip.css:27-41`, `tag.css:22-24`, `label.css:18-28`, `50-forms/input.css:59-95`, `validation.css:17`, `file-input.css:16-18`, `70-utilities/colors.css:24-28`.
- `color-mix()` — Safari 16.2. Every surface/text/border token.
- CSS nesting — Chrome 112, Safari 16.5: `alert.css:12`, `card.css:29,46,65`, `segment.css:13`.
- Media range syntax — Safari 16.4: `container.css:14`, `grid.css:27`, `40-layout/display.css:19`.
- `:user-invalid` — Chrome 119, Safari 16.5: `validation.css:7`. `@property` — Safari 16.4, Firefox 128. `text-wrap: pretty` — Chrome 117, Safari 17.5.

On Safari 15.4–16.1 the semantic colour tokens are invalid → every `var(--tui-positive)` is invalid at computed-value time → colour inherits, backgrounds go transparent. The colour system vanishes.

**Do this:** the real floor is roughly Chrome 120 / Safari 17.5 / Firefox 128. State that. Modern-only is fine — own it; that floor also admits `light-dark()` and the `popover` attribute, which solve several problems below. There are zero `@supports` blocks; consistent with all-or-nothing, just don't advertise a floor you don't meet.

### 2. Interactive components are hard-wired to element IDs and DOM positions — CRITICAL

`accordion.css:54-95` (`#acc-1..3`), `tabs.css:49-75` (`#tab-1..3` + `:nth-child`), `rating.css:31-59` (`#star-1..5`), `toggle-group.css:42-56` (`#toggle-1..3`), `carousel.css:57-74` (`#carousel-1..3`).

Concrete breakage today:
- One instance per page, max three items. README examples reuse `tab-1`, `acc-1`, so two copy-pastes collide.
- Docs demo broken: `src/docs/interactive.html:57-62` uses `doc-tab-*` ids and puts inputs *outside* `.tui-tabs`.
- **Rating checked state never renders**: `.tui-rating-star:nth-child(1)` must be both a star and the first child, but children 1–5 are the radios (`07-interactive.html:146-155`). Only the `#star-5` rule works. Hover works, selection doesn't.
- **Carousel dots never light up**: `carousel.css:61` uses `.tui-carousel:has(…) ~ .tui-carousel-dots`, but the dots are a descendant (`07-interactive.html:131`). The radios can't scroll the track anyway — CSS has no "scroll to X on `:checked`". The radios do nothing.

**Do this instead:**
- **Accordion → native `<details>`/`<summary>`.** `name="group"` for exclusive open (Chrome 120 / Safari 17.2 / Firefox 130). Animate with `::details-content` + `interpolate-size: allow-keywords` behind `@supports`. Deletes the id rules and the `max-height: 500px` hack (`accordion.css:64,79,94`).
- **Tabs → sibling structure, no ids in CSS.** Interleave `input, label, panel` and let grid place them:
  ```css
  .tui-tabs { display: grid; grid-template-rows: auto 1fr; }
  .tui-tab-label { grid-row: 1; }
  .tui-tab-panel { grid-row: 2; grid-column: 1 / -1; display: none; }
  .tui-tab-input:checked + .tui-tab-label { color: var(--tui-brand); border-block-end-color: var(--tui-brand); }
  .tui-tab-input:checked + .tui-tab-label + .tui-tab-panel { display: block; }
  ```
- **Toggle group →** `.tui-toggle-input:checked + .tui-toggle-label`.
- **Rating →** each radio immediately before its own label, descending order, keep `row-reverse`: `.tui-rating input:checked ~ .tui-rating-star { color: var(--tui-warning) }`. No ids, any star count.
- **Carousel →** drop the radios. Scroll-snap + anchor links (`<a href="#slide-2">`) for dots, `.tui-carousel-item:target` for state. `::scroll-marker` (Chrome 135) behind `@supports` later.

### 3. Keyboard users get no visible focus on any checkbox-hack component — CRITICAL (a11y)

State inputs are `opacity: 0` (`tabs.css:11-15`, `accordion.css:14-18`, `dropdown.css:11-15`, `toggle-group.css:13-17`, `carousel.css:12-16`, `rating.css:14-18`, `forced-toggle.css:6-10`). The reboot `:focus-visible` outline (`reboot.css:135`) lands on the invisible input. Tab through `07-interactive.html` and focus disappears seven times.

`dropdown.css:45-60` and `popover.css:26-42` hide with `opacity: 0; pointer-events: none` only — links inside remain in tab order, so focus vanishes *into* a closed menu.

**Do this:** `.tui-tab-input:focus-visible + .tui-tab-label { outline: 2px solid var(--tui-focus-ring-strong); outline-offset: 2px }`. For hidden menus add `visibility: hidden` and transition it: `transition: opacity var(--tui-duration-fast), visibility 0s var(--tui-duration-fast)`; open state `visibility: visible` with `0s` delay.

`tests/07-interactive.spec.js` asserts only element existence and tag names (132–137 asserts a `span[style]` exists). No `Tab`/`ArrowRight`/`toBeFocused`/`toBeVisible` anywhere; the axe suite runs three rule groups. The tests pass with every finding in this section present.

### 4. Modal: two files, two incompatible contracts, zero usages, hard parts unacknowledged — CRITICAL

`30-components/modal.css:16` opens via `.tui-modal-input:checked ~ .tui-modal`; `60-interactive/modal.css:94` via `.tui-modal:has(.tui-modal-input:checked)`. Every other rule is duplicated under the same class names, so the later layer silently wins. No example or doc page uses `tui-modal`. Neither traps focus, inerts the page, or closes on Escape — CSS cannot, and nothing says so. Backdrop `rgb(0 0 0 / 0.5)` hardcoded in both.

**Do this:** delete `30-components/modal.css`. Make the component a styled `<dialog>` (`.tui-modal::backdrop`) and document that opening needs `dialog.showModal()` — one line, and you get focus trap, inert, Escape, top layer. If zero-JS is non-negotiable, ship the non-modal variant on the `popover` attribute (light-dismiss + Escape + top layer, no JS) and stop calling it a modal.

### 5. Popover and tooltip don't open for the users they claim to serve — HIGH

- `popover.css:58` opens on `:has(:focus-visible)`. Mouse-clicking a `<button>` does not match `:focus-visible` in Chromium/WebKit, so mouse users can never open it (`07-interactive.html:108` says "Click to Focus").
- `tooltip.css:47` uses `:focus-within`, which needs a focusable descendant; the example spans (`07-interactive.html:89-97`) have none.
- Docs use `data-tui-tooltip` (`src/docs/interactive.html:88`); CSS reads `attr(data-tooltip)` (`tooltip.css:13`).
- `tooltip.css:24` `white-space: nowrap` + absolute → clipped at viewport edges; one placement only.

**Do this:** popover → `popover` attribute + `popovertarget` (Chrome 114 / Safari 17 / Firefox 125) with `:popover-open`. Tooltip → require a focusable trigger, pair with `aria-describedby` to a real element rather than `attr()`, `text-wrap: balance; max-inline-size: 20rem` instead of `nowrap`. Anchor positioning with `position-try` fallbacks when it lands in the floor.

### 6. `overflow: hidden` on containers clips the components mounted inside them — HIGH

`card.css:13`, `panel.css:10`, `accordion.css:11`, `toggle-group.css:10`. The example mounts the dropdown inside `.tui-card-body` (`07-interactive.html:71-80`); the menu is clipped by the card's bottom padding.

**Do this:** remove `overflow: hidden`; give edge children `border-start-start-radius: inherit` etc. The `popover` attribute escapes this via the top layer.

### 7. Bare `input` gets text-field styling, including checkboxes, radios, and every hidden state input — HIGH

`20-elements/inputs.css:7-20` sets `width: 100%; padding; border: 2px` on `input`. Hits `type=checkbox`/`radio` (which `form-enhancements.css:7-14` expects bare via `accent-color`) and every `.tui-*-input` hack input.

**Do this:** `:where(input:not([type="checkbox"], [type="radio"], [type="range"], [type="color"], [type="file"], [type="submit"], [type="reset"], [type="button"]), textarea, select)`.

### 8. Layer order produced an `!important` workaround instead of a fix — HIGH

`40-layout/display.css:6-16` and `70-utilities/display.css:6-13` are the same classes. The layout copy loses to `.tui-tab-panel { display: block }` (later layer), so a second copy was added with `!important`, contradicting `tui.css:3` and the README. Inside layers `!important` inverts precedence; `a11y.css:12-15` also uses it. Same duplication: `.tui-gap-*` in `flexbox.css:90-97` and `spacing.css:59-66`.

**Do this:** delete `40-layout/display.css`; drop `!important` from utilities. Layer order itself is defensible; `themes` should only redefine tokens, yet `a11y.css:20-40, 68-80` carries component rules.

### 9. Same element styled 2–3× in the same layer; first copies are dead — HIGH (bloat)

- `a`/`a:hover`: `typography.css:45-54`, `buttons.css:54-63`, `links-nav.css:7-17`. `:any-link` in the later file wins; the first two are dead and their hover colours differ.
- `ul/ol/li/dl/dt/dd`: `typography.css:66-104` ≡ `lists.css:6-43`. `table/th/td`: `typography.css:106-128` ≡ `tables.css:6-27`. `img/figure/figcaption`: `typography.css:198-214` ≡ `images.css:6-21`. `code/pre/hr/small/blockquote`: `reboot.css:80-127` vs `typography.css:56-165`. `p { margin: 0 }` at `reboot.css:68` overridden three files later. `::selection` at `reboot.css:43` vs `typography-polish.css:41`.
- Dark tokens defined three times: `00-colors.css:116-138`, `light-dark.css:7-24`, `forced-toggle.css:13-28`; `reboot.css:35-40` re-derives `body` colours by hand, so overriding `--tui-surface-0` for dark mode does not change the body background. `prefers-contrast: more` in both `high-contrast.css` and `a11y.css:43`.
- `links.css` is empty.

**Do this:** one owner per element (reboot = resets only; elements = the look). Replace all three dark blocks with `light-dark()` on the tokens plus `color-scheme: light dark` on `:root`; `forced-toggle.css` becomes `.tui-theme-toggle-input:checked ~ .tui-page { color-scheme: dark }`.

### 10. Base button/input declarations copy-pasted 3–6× — HIGH (bloat)

`button` (`buttons.css:7-27`) ≡ `.tui-button` (`button.css:8-28`) ≡ `input[type=submit]` (`buttons.css:66-88`). `input` (`inputs.css:7-49`) ≡ `.tui-input` (`input.css:6-39`) ≡ `.tui-date-input` ≡ `.tui-select` ≡ `input[type=color]` (`inputs.css:117-133`) ≡ `.tui-color-input`; `input[type=range]` (`inputs.css:79-114`) ≡ `.tui-range`.

**Do this:** `:where(button, .tui-button, input:is([type="submit"], [type="reset"], [type="button"])) { … }` once; same for the field base. Delete `date-input.css`, `color-input.css`, `range.css` (~250 lines).

### 11. Dead or broken CSS — MEDIUM

- `validation.css:35-46` `input:required::after` — replaced elements don't render pseudo-elements; the `padding-right` stays.
- `file-input.css:7-19` — `:placeholder-shown` never matches `type=file`; `display: none` removes the input from tab order; `.tui-file-label` unused (example uses `.tui-button`, `04-forms.html:268`). Use a visually-hidden input + `:focus-visible + label`.
- `06-breakpoints.css:16-44` `@container tui … { :root {…} }` never matches; `--tui-container-width` / `--tui-breakpoint-*` have zero consumers.
- `05-transitions.css:17-21` `@property … initial-value: '0%'` invalid; unused. `switch.css:6-10` `--tui-switch-width` unused.
- `links-nav.css:31-68` `:local-link`, `:current`, `:past`, `:future`, `:target-within` — no browser. Delete, re-enable the lint.
- `a11y.css:78-80` empty rule. `a11y.css:91` `line-break: anywhere` for Japanese is wrong.
- `typography-polish.css:36-38` `:root { font-size-adjust: 0.52 }` rescales every font.
- `steps.css:26` `width: calc(100vw - 100%)` meaningless; use a `flex: 1` connector.
- `toast.css:26-37` stacking: 2nd toast jumps to `top: 2rem`; 3rd overlaps the 2nd. Use a `.tui-toast-stack` grid container.
- `carousel.css:23` `-webkit-overflow-scrolling` obsolete; `carousel.css:57-59` no-op.
- "Automatic Sibling Spacing" is three files with three different variants (`alert.css:12-22`, `card.css:46-56`/`segment.css:13-23`, `card.css:29-39`). Replace with `display: grid; gap: …; & > * { margin: 0 }` — what `.tui-form`/`.tui-field` already do.

### 12. Tokens and consistency — MEDIUM

- `--tui-brand-fg: #ffffff` (`00-colors.css:32-33`; comment says the opposite). "Change ONE variable" fails for any light brand. Use `oklch(from var(--tui-brand) clamp(0, (0.65 - l) * 100, 1) 0 h)`. Same for the four `-fg` semantics.
- Two soft-colour dialects (`color-mix(… transparent)` vs `rgba(from … / .15)`), ~40 inline sites. Centralise as `--tui-positive-soft` / `--tui-positive-edge`. Alerts implement "soft" a third way.
- Every component enumerates tone variants by copying rules (button ×6, badge ×5, chip ×3, label ×3, input ×5, alert ×4, toast ×4, status ×8, ribbon ×4, timeline ×4, statistic ×3). One hook — `.tui-tone-success { --tui-tone: var(--tui-positive); --tui-tone-fg: var(--tui-positive-fg) }` — and components read `--tui-tone`. ~200 lines collapse.
- `.tui-checkbox-primary` / `.tui-radio-primary` / `.tui-switch-primary` restate defaults; a `--tui-control-accent` prop replaces the `-success` variants too.
- Still hardcoded: `flag.css:15-16`; `#6b7280` in SVGs at `select.css:17`, `search-input.css:24`, `inputs.css:60` (use `mask-image` + `currentColor`); `ribbon.css:11,27,33` `-35px`; `form-table.css:22` `200px`; `pointer-orientation.css:23-24` `44px`; range thumbs `20px`.
- `transition: all` in 15 files. List the properties.
- `:focus-visible` outline restated in 9 places identical to `reboot.css:135`. Delete the copies; `stepper.css:46` is the one legitimate exception.

### 13. Responsiveness: breakpoint-bound, nothing intrinsic — MEDIUM

- Container queries opt-in via `.tui-container-query` wrapper; one example uses it. Make components their own containers: `.tui-card-base, .tui-panel { container-type: inline-size }`.
- `grid.css` 12-col + `sm/md/lg` matrix; `.tui-d-sm-*`/`.tui-grid-sm-*` used by zero examples. `.tui-form-grid` already shows the intrinsic pattern — expose `.tui-grid-auto { grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--tui-grid-min, 16rem)), 1fr)) }`.
- `.tui-container` five media steps → `width: min(100% - 2 * var(--tui-spacing-4), var(--tui-container-max, 75rem)); margin-inline: auto`.
- `.tui-tab-list` no overflow handling; `.tui-navbar` never wraps; `.tui-toast` `min-width: 16rem` breaks under 320px; `.tui-modal-content` `90vh` → `90dvh`.
- 69 physical-direction declarations, 0 logical; `a11y.css:68-76` patches RTL by hand for two components. Use logical properties throughout and delete the `:dir(rtl)` block.

### 14. Customisation DX — MEDIUM

- What's right: everything is (0,1,0) inside a named layer, so any unlayered user rule wins. The `tui.*` sub-layer naming lets consumers write `@layer tui, app;`. Neither fact is documented — it's the best DX argument you have.
- No component-level custom properties (only `--tui-swatch`, `color-check.css:30`, and `--tui-range-value`, `form-enhancements.css:36`, undocumented). Expose 3–5 per component with token fallbacks: `border-radius: var(--tui-button-radius, var(--tui-radius-md))`.
- Opting out of a layer means editing `tui.css`; with the bundle it's impossible. **The bundle is stale**: `src/tui-all.css:14-16` shows per-file `@layer` wrappers the sources no longer carry; `scripts/build-single.sh` just `cat`s, so rebuilding emits a bundle with no layers. Make the build wrap each file in `@layer tui.<name> { }`, emit the ordering statement first, add `npm run build` + a CI diff check.
- `.tui-d-none !important` is the one thing users cannot override without `!important`.

### 15. Reduced motion, twice — LOW

`a11y.css:8-17` global `* { animation-duration: 0.01ms !important }` plus per-component blocks (`placeholder.css:35-40`, `status.css:77-81`, `toast.css:123-127`). Keep one approach.

### Quick wins

- `reboot.css:18` `text-size-adjust` needs `-webkit-` for Safari.
- `carousel.css:26` add `scrollbar-width: none`.
- `pagination.css:57` `a:disabled` never matches; use `[aria-disabled="true"]`.
- `buttons.css:40-41` `button[disabled]` is a subset of `button:disabled`.
- `accordion.css` `[for=…]` on `div` is invalid; the sibling structure removes the need.
- `typography-polish.css:28-33` `hyphens: auto` on every card/panel body hyphenates UI copy; keep opt-in via `.tui-hyphens`.
- Source comments quoting "Kevin Powell" (`00-colors.css:6`, `01-typography.css:3`, `04-zindex.css:2` — misattributed). Drop them.
- README: fix the support line, the "no `!important`" claim, the sibling-spacing claim, the `for` attribute in the accordion example.

## What to do first

1. Fix the support statement (#1).
2. Rewrite the six interactive components without ids (#2), add label focus styles (#3) and `visibility` toggling. Accordion → `<details>`; popover → `popover` attribute; modal → `<dialog>` with an honest one-line JS note (#4, #5).
3. Delete the duplicates (#8, #9, #10, #11) — ~700 lines, removes every dead/broken rule in one pass.
4. Introduce the tone-token pattern (#12) and component-level custom properties (#14); fix the bundle build.
