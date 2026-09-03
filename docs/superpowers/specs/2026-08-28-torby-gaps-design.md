# Torby gap closure — design

Date: 2026-08-28 · Branch: `hm-attempt-2` · Source of requirements: `torby/mockup-demo.html#notas`

## Context

`torby/mockup-demo.html` rebuilt a 33-screen application mockup using only Torque UI classes. The exercise produced 29 recorded gaps (the `#notas` screen). The owner accepted 25 of them for the library and declined four (13 chat stream, 18 responsive rail, 23 code tokens/badge links/offline dot, 26 icon set). Two visual defects were added: the steps connector sits at the wrong height and `.tui-alert` spacing is off.

Constraints that hold for every item:

- **Zero JavaScript.** Everything is CSS, native HTML semantics (`popover`, `<progress>`, `<details>`), or tokens.
- **Layer discipline.** Tokens in `00-tokens`, element defaults in `20-elements`, components in `30-components`, layout in `40-layout`, forms `50-forms`, interactive `60-interactive`, utilities `70-utilities`. No `!important`.
- **Tone plumbing.** Colour variants go through `--tui-tone*` (see `70-utilities/tone.css`), never hard-coded per variant.
- **Logical properties** throughout (`stylelint-use-logical`).
- Every item ships with: the CSS, a docs example on the relevant `src/docs/*.html` page (and `src/examples/*.html` where the docs page mirrors one), a behaviour test in the matching `tests/*.spec.js`, and a CHANGELOG line under **Unreleased**. `npm run build` regenerates `src/tui-all.css`; `tests/bundle-equivalence.spec.js` must stay green.

Decisions already taken by the owner:

- Outer spacing on components is removed; stacking comes from a container (`.tui-stack`), not margins.
- Gradients need an **explicit** second colour token (`--tui-brand-end`); nothing is derived. Until it is set, gradient surfaces render flat brand.
- Card hover lift becomes interactive-only (breaking).
- The mockup is updated at the end to use the new primitives, and its `#notas` cards are marked resolved.

## A. Tokens & theming

### A1. Gradient tokens (gap 1)

File: `src/00-tokens/00-colors.css`, `src/70-utilities/tone.css`.

```css
:root {
  --tui-brand-gradient: linear-gradient(135deg, var(--tui-brand), var(--tui-brand-end, var(--tui-brand)));
  --tui-positive-gradient: linear-gradient(135deg, var(--tui-positive), var(--tui-positive-end, var(--tui-positive)));
  /* same for negative, warning, info, neutral */
}
```

`--tui-brand-end` and `--tui-{tone}-end` are **not declared** by the library (so `var(--x-end, fallback)` resolves to the flat colour). Documented as "set `--tui-brand-end` to enable gradients".

`tone.css`: each `.tui-tone-*` / variant selector that sets `--tui-tone` also sets `--tui-tone-gradient: var(--tui-{tone}-gradient)`. The tone leak-reset list resets `--tui-tone-gradient` too.

Consumers:

- `.tui-button-gradient` (`30-components/button.css`): `background-image: var(--tui-tone-gradient, var(--tui-brand-gradient)); background-color: var(--tui-tone, var(--tui-brand)); color: var(--tui-tone-fg, var(--tui-brand-fg)); border-color: transparent`. Hover: `filter: brightness(1.08)`. Combines with `.tui-button-success` etc. through the tone.
- `.tui-bg-gradient` (`70-utilities/colors.css`): `background-image: var(--tui-tone-gradient, var(--tui-brand-gradient)); color: var(--tui-tone-fg, var(--tui-brand-fg))`.
- Avatar palettes: tokens `--tui-avatar-1 … --tui-avatar-6` (fixed hex defaults, six distinct hues with white-legible lightness) and `.tui-avatar-1 … .tui-avatar-6` on `.tui-avatar` (`background-color: var(--tui-avatar-N); color: var(--tui-text-inverse)`). No hashing in CSS — the app picks the class.

### A2. Dataviz tokens and frame (gaps 11, 25)

File: new `src/00-tokens/06-chart.css` (imported after `05-transitions.css`), new `src/30-components/chart.css`, `src/70-utilities/colors.css`.

Tokens: `--tui-chart-1 … --tui-chart-6` (fixed defaults, `light-dark()` pairs, chosen for CVD separation on both surfaces) and `--tui-chart-measure` (a muted, non-series colour, `light-dark()` pair).

Utilities: `.tui-chart-1 … .tui-chart-6`, `.tui-chart-measure` set `color`, so SVG children use `fill="currentColor"` / `stroke="currentColor"`.

Component:

- `.tui-chart` — block wrapper; `& > svg { display:block; inline-size:100%; block-size:auto; }`; `--tui-chart-aspect` sets `aspect-ratio` on the wrapper when the SVG has no intrinsic size.
- `.tui-legend` — `display:flex; flex-wrap:wrap; gap: spacing-3; font-size: text-xs; color: text-2`.
- `.tui-legend-item` — inline-flex, gap-1; `& > .tui-legend-swatch` is a 0.625rem square with `border-radius: radius-sm; background-color: currentColor` — so `.tui-legend-item.tui-chart-2` colours the swatch.

Text on solid fills: `.tui-text-brand-fg`, `.tui-text-positive-fg`, `.tui-text-negative-fg`, `.tui-text-warning-fg`, `.tui-text-info-fg` (`color: var(--tui-{tone}-fg)`), plus `.tui-text-tone-fg` (`color: var(--tui-tone-fg, var(--tui-text-1))`).

### A3. Root size, black weight, fixed containers (gap 17)

Files: `src/00-tokens/01-typography.css`, `src/10-reboot/reboot.css`, `src/70-utilities/text.css`, `src/40-layout/container.css`.

- `--tui-root-size: 100%` token; `html { font-size: var(--tui-root-size) }`.
- `--tui-font-black: 800` token; `.tui-font-black` utility.
- `.tui-container-sm` (28rem), `.tui-container-md` (40rem), `.tui-container-lg` (56rem): `inline-size:100%; max-inline-size: …; margin-inline:auto; padding-inline: spacing-4`. Not tied to viewport tiers.

## B. Bug fixes

### B1. Anchor buttons inherit link colour (gap 3)

`src/30-components/button.css`:

```css
.tui-button,
.tui-button:hover,
.tui-button:visited {
  color: var(--tui-tone-fg, var(--tui-text-1));
  text-decoration: none;
}
```

placed at the top of the component block so variants that set `color` (`-secondary`, `-ghost`, `-outline`) still win by source order. `src/30-components/card.css`: `.tui-card { color: var(--tui-text-1) }` so text inside an anchor card is not brand-coloured.

Test: an `<a class="tui-button tui-button-primary">` computes `color` equal to `--tui-brand-fg` and `text-decoration-line: none`; a `<p>` inside `<a class="tui-card">` computes the text-1 colour.

### B2. Status dot has no display (gap 19)

`src/30-components/status.css`: `.tui-status-dot { display: inline-block; vertical-align: middle; }` added to the existing rule. Test: a dot inside a `<td>` has a non-zero bounding box.

### B3. Progress tone never applies in Chromium (gap 28)

`src/50-forms/form-enhancements.css`: split into two rules —

```css
progress::-webkit-progress-value { background-color: var(--tui-tone, var(--tui-brand)); border-radius: inherit; }
progress::-moz-progress-bar { background-color: var(--tui-tone, var(--tui-brand)); border-radius: inherit; }
```

Test: `<progress class="tui-tone-brand">` — evaluate `getComputedStyle(el, '::-webkit-progress-value').backgroundColor` equals the resolved brand.

### B4. Steps connector height

`src/30-components/steps.css`: `.tui-step:not(:last-child)::after { inset-block-start: calc(var(--tui-step-size) / 2); transform: translateY(-50%); }`. Test: connector's bounding-box vertical centre equals the `.tui-step-number` centre (±1px).

### B5. Alert spacing

`src/30-components/alert.css`:

- Padding becomes `var(--tui-spacing-3) var(--tui-spacing-4)`.
- `.tui-alert-callout > * + * { margin-block-start: 0 }` (the grid column must not inherit the stack rhythm); `.tui-alert-callout > :last-child > * + * { margin-block-start: var(--tui-spacing-1) }` gives the body its own rhythm; `.tui-alert-callout > :first-child { line-height: 1; padding-block-start: var(--tui-spacing-0-5) }` aligns the icon with the first text line.
- `.tui-alert-actions` (gap 22): `display:flex; gap: spacing-2; flex-wrap:wrap; margin-block-start: spacing-2`; inside a callout it is placed as the body's last child.

Test: in a callout, the icon's top and the body's top are within 4px; alert padding-top is 12px.

## C. Layout primitives

### C1. Shell aside, min height, persistent sidebars (gap 2)

`src/40-layout/shell.css`:

```css
.tui-shell { min-block-size: var(--tui-shell-min-block-size, 100dvh); }
.tui-shell-aside { grid-area: aside; display: none; border-inline-start: 1px solid var(--tui-border); background-color: var(--tui-surface-1); }

@media (width >= 768px) {
  .tui-shell:has(> .tui-shell-aside) {
    grid-template-areas: 'header header header' 'sidebar main aside' 'footer footer footer';
    grid-template-columns: var(--tui-shell-sidebar-inline-size, 16rem) 1fr var(--tui-shell-aside-inline-size, 18rem);
  }
  .tui-shell:has(> .tui-shell-aside):not(:has(> .tui-shell-sidebar)) {
    grid-template-areas: 'header header' 'main aside' 'footer footer';
    grid-template-columns: 1fr var(--tui-shell-aside-inline-size, 18rem);
  }
  .tui-shell-aside { display: block; position: sticky; inset-block-start: var(--tui-shell-header-block-size, 4rem); max-block-size: calc(100dvh - var(--tui-shell-header-block-size, 4rem)); overflow-y: auto; }
}

.tui-shell-persistent > .tui-shell-sidebar,
.tui-shell-persistent > .tui-shell-aside { display: block; }
```

`.tui-shell-persistent` also applies the ≥768px template at every width (columns collapse to their tokens; the consumer is responsible for narrow sizes). Docs: `patterns.html` app-shell section gains an aside example and the two new tokens.

### C2. Stack and margin removal; card hover (gap 10)

- New `src/40-layout/stack.css`: `.tui-stack { display:flex; flex-direction:column; gap: var(--tui-stack-gap, var(--tui-spacing-4)); }` plus `.tui-stack-sm` (`--tui-stack-gap: spacing-2`) and `.tui-stack-lg` (`spacing-6`).
- Remove `margin-block-end` from `.tui-panel`, `.tui-alert`, `.tui-segment`, `.tui-label`.
- `card.css`: base `.tui-card` loses `:hover`; add `.tui-card:is(a, button, label):hover, .tui-card.tui-hoverable:hover { box-shadow: var(--tui-shadow-md) }` (the transition stays on the base).
- Every docs/example page that stacks alerts/panels/segments gets a `.tui-stack` wrapper (grep for consecutive `.tui-alert`/`.tui-panel` siblings).

CHANGELOG **Breaking changes**: both bullets.

### C3. Board (gaps 12, 27)

New `src/40-layout/board.css`:

```css
.tui-board { display:flex; gap: var(--tui-spacing-3); align-items:flex-start; overflow-x:auto; padding-block-end: var(--tui-spacing-2); }
.tui-board-column { flex: 0 0 var(--tui-board-column-inline-size, 16rem); max-block-size: var(--tui-board-column-block-size, none); display:flex; flex-direction:column; background-color: var(--tui-surface-1); border: 1px solid var(--tui-border); border-radius: var(--tui-radius-lg); }
.tui-board-header { position:sticky; inset-block-start:0; padding: var(--tui-spacing-3); font-size: var(--tui-text-xs); font-weight: var(--tui-font-semibold); text-transform: uppercase; letter-spacing: var(--tui-tracking-wide); color: var(--tui-text-2); background-color: inherit; border-block-end: 1px solid var(--tui-border); display:flex; justify-content:space-between; align-items:center; }
.tui-board-body { display:flex; flex-direction:column; gap: var(--tui-spacing-2); padding: var(--tui-spacing-2); overflow-y:auto; }
```

### C4. Sheet, glass fallback, search width (gap 24)

- New `src/60-interactive/sheet.css`: `[popover].tui-sheet { position: fixed; inset: var(--tui-sheet-inset-block, 10vh) auto auto 50%; translate: -50% 0; inline-size: min(var(--tui-sheet-inline-size, 54rem), calc(100% - 2 * var(--tui-spacing-4))); max-block-size: calc(100dvh - 2 * var(--tui-sheet-inset-block, 10vh)); overflow:auto; margin:0; padding:0; border: 1px solid var(--tui-border); border-radius: var(--tui-radius-xl); background-color: var(--tui-surface-0); color: var(--tui-text-1); box-shadow: var(--tui-shadow-xl); }` and `.tui-sheet::backdrop { background-color: var(--tui-sheet-backdrop, rgb(0 0 0 / 0.4)); }`. Opened with `popovertarget`; light-dismiss and Escape are native.
- `visual.css`: `.tui-glass, .tui-glass-card { border-color: var(--tui-border) }` (visible edge on flat backdrops) and `.tui-glass-card { box-shadow: var(--tui-shadow-lg) }` if not already present.
- `search-input.css`: `max-inline-size: var(--tui-search-inline-size, 24rem)`.

### C5. Page header (gap 27)

`src/40-layout/patterns.css`:

```css
.tui-page-header { display:flex; align-items:flex-end; justify-content:space-between; gap: var(--tui-spacing-4); flex-wrap:wrap; margin-block-end: var(--tui-spacing-6); }
.tui-page-header-title { font-size: var(--tui-text-2xl); font-weight: var(--tui-font-bold); margin:0; display:flex; align-items:baseline; gap: var(--tui-spacing-3); flex-wrap:wrap; }
.tui-page-header-lead { font-size: var(--tui-text-base); font-weight: var(--tui-font-normal); color: var(--tui-text-3); }
.tui-page-header-actions { display:flex; gap: var(--tui-spacing-2); align-items:center; }
```

(`margin-block-end` on the page header is intentional: it is a page-level pattern, not a stackable component — same class of thing as `.tui-hero`.)

## D. Component variants & slots

### D1. Progress value hook, inline progress, poll fill (gaps 5, 15)

`progress.css` / `form-enhancements.css`:

- `.tui-progress-bar { inline-size: calc(var(--tui-progress-value, 0) * 1%) }` — the existing `style="width:65%"` docs examples switch to `style="--tui-progress-value: 65"`.
- `.tui-progress-inline` on `.tui-progress` or native `progress`: `display:inline-block; inline-size: var(--tui-progress-inline-size, 8rem); vertical-align: middle`.
- `.tui-poll-option`: `position:relative; display:flex; justify-content:space-between; gap: spacing-3; padding: spacing-2 spacing-3; border-radius: radius-md; background-image: linear-gradient(var(--tui-tone-soft, var(--tui-brand-soft)), var(--tui-tone-soft, var(--tui-brand-soft))); background-repeat:no-repeat; background-size: calc(var(--tui-progress-value, 0) * 1%) 100%; border: 1px solid var(--tui-border)`.

### D2. Tone-aware timeline and divider lines (gap 6)

`timeline.css`: `.tui-timeline::before { background-color: var(--tui-timeline-line, var(--tui-border)) }` and `.tui-timeline:is(.tui-tone-brand, .tui-tone-primary, .tui-tone-success, …) { --tui-timeline-line: var(--tui-tone-edge) }` — expressed once as `.tui-timeline[class*="tui-tone-"]`.

`divider.css`: the line colour becomes `var(--tui-divider-line, var(--tui-border))`; `.tui-divider[class*="tui-tone-"] { --tui-divider-line: var(--tui-tone-edge); color: var(--tui-tone-ink) }`.

### D3. Tabs: trailing slot, sticky, link tabs (gaps 7, 21)

`tabs.css`:

- `.tui-tabs-end { order: 0; margin-inline-start: auto; display:flex; align-items:center; gap: var(--tui-spacing-2); padding-inline-start: var(--tui-spacing-3); border-block-end: var(--tui-tab-rule, 2px solid var(--tui-border)); }` and `.tui-tabs:has(> .tui-tabs-end)::after { flex: 0 0 var(--tui-spacing-2); }` — the filler shrinks to a stub and the slot carries the rule.
- `.tui-tabs-sticky > .tui-tab, .tui-tabs-sticky > .tui-tabs-end, .tui-tabs-sticky::after { position: sticky; inset-block-start: 0; background-color: var(--tui-surface-0); z-index: var(--tui-z-sticky); }`.
- `a.tui-tab { text-decoration:none }` and `.tui-tab[aria-current] { color: var(--tui-tab-active-color, var(--tui-brand)); border-block-end-color: var(--tui-tab-active-color, var(--tui-brand)); }`.

### D4. Variant families (gap 8)

- `tag.css`, `chip.css`, `label.css`: add the missing `-success`, `-error`, `-warning`, `-info` (and `-primary` where absent) as tone setters, mirroring `badge.css`.
- `badge.css`: `.tui-badge-solid { background-color: var(--tui-tone, var(--tui-brand)); color: var(--tui-tone-fg, var(--tui-brand-fg)); border-color: transparent; }`.
- `avatar.css`: `.tui-avatar-md` (2.5rem, text-sm), `.tui-avatar-square { border-radius: var(--tui-radius-md) }`, `.tui-avatar-badge` (positioned like `.tui-avatar-status > .tui-status-dot` but 1rem, `font-size: 0.6rem`, `background-color: var(--tui-tone, var(--tui-neutral))`, `color: var(--tui-tone-fg, var(--tui-text-inverse))`, ring `2px solid var(--tui-surface-0)`, inline-flex centred) for glyph badges.
- `list-group.css`: `.tui-list-item { background-color: var(--tui-list-item-bg, var(--tui-surface-0)) }`.
- Forms: `src/50-forms/form.css` (where `.tui-field` lives) styles `.tui-field > label` (text-sm, medium, text-2, `margin-block-end: spacing-1`); `src/docs/forms.html` and `src/examples/04-forms.html` replace `<label class="tui-label">` with plain `<label>`. `.tui-label` remains the pill component; the forms docs gain a note.

### D5. Toggle group variants (gaps 9, 22, 29)

`toggle-group.css`:

- `.tui-toggle-success`, `.tui-toggle-warning`, `.tui-toggle-error`, `.tui-toggle-neutral` on the `label`: set `--tui-toggle-active-bg: var(--tui-{tone})` and `--tui-toggle-active-fg: var(--tui-{tone}-fg)` (neutral uses `--tui-surface-3` / `--tui-text-1`).
- `.tui-toggle-group-sm > .tui-toggle { padding: spacing-1 spacing-2; font-size: text-xs }`.
- `.tui-toggle-group-wrap { flex-wrap: wrap }` with `.tui-toggle` radii handled by the existing first/last-of-type rules (accepted: wrapped rows have square inner corners).

### D6. Slots (gaps 22, 29)

- `.tui-split-button:has(> :disabled) > .tui-button { opacity: 0.6; pointer-events: none; box-shadow: none }` (`button.css`).
- `.tui-statistic-delta { font-size: text-xs; color: var(--tui-text-3); margin-block-start: spacing-1 }` with `.tui-statistic-delta-up { color: positive-ink }` / `-down { color: negative-ink }` (`statistic.css`).
- `.tui-media-center { align-items: center }` (`patterns.css`).
- `.tui-timeline-compact`: item padding-block-end `spacing-3`, marker `1rem` at `inset-block-start: 0.35rem`, item padding-inline-start `spacing-6`, spine at `0.5rem`, title text-sm (`timeline.css`).
- `.tui-list-item-body { flex: 1; min-inline-size: 0 }` (`list-group.css`).
- Wizard precedence (`wizard.css`): the `:has()` auto-lighting rules are written as `.tui-wizard .tui-step:not(.tui-step-complete, .tui-step-active)` variants so explicit classes always win regardless of source order.

### D7. Composer (gap 14)

New `src/30-components/composer.css`:

```css
.tui-composer { display:flex; flex-direction:column; border: 1px solid var(--tui-border); border-radius: var(--tui-radius-lg); background-color: var(--tui-surface-0); }
.tui-composer:focus-within { border-color: var(--tui-border-focus); box-shadow: var(--tui-focus-ring); }
.tui-composer-toolbar, .tui-composer-footer { display:flex; align-items:center; justify-content:space-between; gap: var(--tui-spacing-2); padding: var(--tui-spacing-2); }
.tui-composer-toolbar { border-block-end: 1px solid var(--tui-border); }
.tui-composer-footer { border-block-start: 1px solid var(--tui-border); }
.tui-composer-input { border: 0; border-radius: 0; background: transparent; box-shadow: none; padding: var(--tui-spacing-3); field-sizing: content; min-block-size: 3rem; max-block-size: var(--tui-composer-max-block-size, 12rem); resize: none; }
.tui-composer-input:focus { outline: none; box-shadow: none; }
```

Markup: `<div class="tui-composer"><div class="tui-composer-toolbar">…</div><textarea class="tui-composer-input">…</textarea><div class="tui-composer-footer">…</div></div>`.

### D8. Small pieces (gaps 15, 16, 20, 27)

- `.tui-waveform` (`progress.css`): applies to native `progress` — `block-size: 1.5rem; border-radius: 0; background-color: transparent; mask-image: repeating-linear-gradient(to right, black 0 2px, transparent 2px 5px); -webkit-mask-image: same;` with the track drawn by `::-webkit-progress-bar { background-color: var(--tui-surface-3) }`. Bars are uniform height (a true waveform needs data → documented).
- `.tui-frame-light` (`visual.css`): `background-color: #fff; color: #111; padding: var(--tui-spacing-3); border-radius: var(--tui-radius-md); display: inline-block; line-height: 0`.
- `.tui-window` / `.tui-window-bar` / `.tui-window-dot` (new `30-components/window.css`): window = card-like frame with `shadow-xl`; bar = surface-1 strip with three 0.75rem dots coloured `--tui-negative`, `--tui-warning`, `--tui-positive` via `:nth-child`; `.tui-window-title` text-xs text-3.
- `.tui-drag-handle` (`list-group.css`): `cursor: grab; color: var(--tui-text-3); user-select:none; &::before { content: '⠿' }` when empty; `&:active { cursor: grabbing }`.
- `.tui-popover-static` (`popover.css`): same box as `.tui-popover` but `position: relative; inset: auto; display: block; margin-block-start: spacing-2` — for docs and mockups; not a `[popover]`.
- `.tui-level-nowrap { flex-wrap: nowrap }`; `.tui-level-collapsible { container-type: inline-size }` and `@container (width < 40rem) { .tui-level-collapsible .tui-level-optional { display:none } }` (`patterns.css`).
- `.tui-table-caps th { font-size: text-xs; text-transform: uppercase; letter-spacing: tracking-wide; color: text-3 }` (`tables.css`).
- `panel.css`: `.tui-panel-header:not(:first-child) { border-block-start: 1px solid var(--tui-border) }`; `.tui-panel-header + .tui-list-group-flush, .tui-card-header + .tui-list-group-flush { border-block-start: 0 }` (in `list-group.css`).
- `.tui-thumb` (`visual.css`): `figure` reset, `background-color: var(--tui-surface-2); border-radius: radius-md; overflow:hidden; & > img { inline-size:100%; block-size:100%; object-fit: cover } & > figcaption { font-size: text-xs; color: text-3; padding: spacing-1 spacing-2 }`.
- `.tui-kv` (new `30-components/kv.css`): `dl` grid `auto 1fr`, `column-gap: spacing-3; row-gap: spacing-1; font-size: text-sm; & > dt { color: text-3; margin:0 } & > dd { margin:0; text-align:end; font-weight: medium; min-inline-size:0; overflow-wrap:anywhere }`; `.tui-kv-stack` = single column (dt above dd).

### D9. Utilities (gap 4)

`70-utilities/` (sizing goes in a new `sizing.css`; the rest extend existing files):

- Width: `.tui-w-25/50/75/100/auto`, `.tui-max-w-xs (20rem) / sm (24rem) / md (28rem) / lg (32rem) / xl (36rem) / full`, `.tui-min-w-0`, `.tui-h-full`.
- Margins: `.tui-ms-auto`, `.tui-me-auto`, `.tui-mt-auto`, `.tui-mb-auto`, `.tui-mx-auto` (physical aliases `ml`/`mr` as elsewhere).
- Padding: `.tui-pt-N`, `.tui-pb-N` for N in the existing scale.
- `.tui-opacity-25/50/75`.
- `.tui-border-dashed { border-style: dashed }`.
- `.tui-tracking-tight/wide/wider`.
- `.tui-bg-surface-0/1/2/3`, `.tui-text-1/2/3`.
- `.tui-rounded-none/sm/md/lg/full`.
- `.tui-sticky-top { position: sticky; inset-block-start: 0; z-index: var(--tui-z-sticky) }`.

Declined items (13, 18, 23, 26) get no code; their `#notas` cards stay as open notes.

## E. Delivery

- One commit per section item on `hm-attempt-2`, message style `feat(scope): …` / `fix(scope): …`, following the existing history.
- Docs: each item adds a live example + class/property table row to the relevant `src/docs/*.html` page; new pages are not needed (board/sheet/composer/window/kv go to `patterns.html` or `layout.html`; chart/legend to `feedback.html`; utilities to `utilities.html`).
- Tests: behaviour assertions via computed style in the matching `tests/NN-*.spec.js` (new components use `05-layout.spec.js` / `03-components.spec.js`); the a11y sweep (`examples-a11y.spec.js`) must stay green for edited example pages.
- CHANGELOG: **Breaking changes** (margins removed → `.tui-stack`; card hover interactive-only; `.tui-alert` padding), **Added**, **Fixed** (three bugs + steps + alert).
- Build: `npm run build`; `tests/bundle-equivalence.spec.js` green; `npm run lint:css` clean.
- Final phase — mockup: update `torby/mockup-demo.html` to use `.tui-shell-aside`, `.tui-stack`, `.tui-board`, `.tui-sheet` (busca), `.tui-composer`, `.tui-page-header`, `.tui-tabs-end`, `.tui-kv`, `.tui-avatar-N`, chart tokens, `.tui-button-gradient` on the login CTA (with `--tui-brand-end: #7A00FF` in the mockup's variable block), etc.; remove the workarounds (`tui-text-inverse` on anchor buttons, `tui-d-inline-block` on dots, `tui-mb-0`, spacer-cell centring where `.tui-container-sm` fits); drop the `.screen .tui-shell{min-block-size:100%}` machinery rule in favour of `--tui-shell-min-block-size`; re-screenshot all 34 screens; on `#notas`, each resolved card gets a `.tui-badge-solid tui-tone-success` "Resolved → .tui-…" line and the four declined cards stay as they are.

## Out of scope

Chat message component (13), responsive rail/drawer (18), code-block token classes, badge link colour and offline dot (23), icon set (26).
