# Review — Junior (onboarding lens), 2026-08-26

> Historical review from 2026-08-26, written against a branch layout that no longer exists (several files it cites were since deleted or rewritten). Kept for the record; do not treat its findings as open.

Method: read README → `src/tui.css` → tokens → buttons → card → checkbox/switch → tabs/accordion/dropdown/modal → `07-interactive.html` / `docs/interactive.html`; pasted README snippets into a page under Chrome; rebuilt the bundle and compared with the committed one.

## Answers

1. **Build a page from README + docs alone?** Static pieces: yes. Interactive: no — README snippets work only because they use the exact ids the CSS hardcodes; `src/docs/interactive.html` demos are visibly broken.
2. **Naming:** `tui-card-base` (no `tui-card`), `tui-card-base-primary`, `light-dark.css` never calls `light-dark()`, `links.css` is empty, two `modal.css` (one dead), `.tui-button` re-declares what `button` already gets.
3. **Undocumented assumptions:** hardcoded ids (`tab-1..3`, `acc-1..3`, `star-1..5`, `carousel-1..3`, `toggle-1..3`), `for=` on a `<div>`, panels must be direct in-order children, modal input must be inside `.tui-modal`, dark toggle needs a `.tui-page` sibling, tooltip reads `data-tooltip` not `data-tui-tooltip`.
4. **Looked-up features:** `@layer`, `:has()`, `oklch(from …)` explained well; `rgba(from …)` not; `@property` explained but the registered token is invalid/unused; `@container` on `:root` cannot match; `:user-invalid` comment contradicts code; `light-dark()` and anchor positioning advertised, not used; `:local-link`/`:current`/`:past`/`:future`/`:target-within` not shipping anywhere.
5. **Cost to add a component:** static ~15 min. Interactive: stuck — every new instance/id needs CSS edits, nothing says so.

## Good

- `src/tui.css:1-14` — header explains layer order and why; the file is the complete map.
- `src/00-tokens/00-colors.css:37-48` — relative-color comment is exactly what a newcomer needs.
- `src/30-components/button.css` + `src/docs/buttons.html` — every documented class exists and vice versa. The standard the rest should meet.
- `src/60-interactive/dropdown.css:77-91` — the one interactive component selecting by class, works with any id / any count. The pattern to copy.
- `checkbox.css`, `switch.css` — short, README matches.

## Bad — docs that lie (verified in browser)

- `README.md:102-117` tabs snippet works only with ids `tab-1/2`; `tabs.css:49-76` hardcodes `#tab-1..3`. With `billing-tab-1/2`, no panel ever displays.
- `README.md:125` `<div class="tui-accordion-body" for="acc-1">` — invalid HTML, but `accordion.css:63` keys on `[for="acc-1"]`. Without it body stays `max-height: 0`.
- `src/docs/interactive.html:59-66` tabs demo: wrong ids, inputs outside `.tui-tabs`, no `.tui-tab-list`. Panel `display: none`.
- `src/docs/interactive.html:73-77` accordion demo never opens.
- `src/docs/interactive.html:97` and `showcase.html:593` use `data-tui-tooltip`; `tooltip.css:13` reads `data-tooltip`. Empty tooltip.
- `src/docs/interactive.html:113,115`, `showcase.html:141,612,614` — `tui-button-outline` is not defined anywhere.
- `src/docs/interactive.html:102,110` say rating/toggle need JS; README:163 says CSS-only (and they work).
- `README.md:11-15` — committed `src/tui-all.css` is not what `scripts/build-single.sh` produces: committed file has invalid `color(var(--tui-brand) / 0.15)` (`tui-all.css:1364`, badge background renders transparent); a fresh build has **no `@layer` at all** because layering only comes from `tui.css`'s `@import … layer()`. Fix: wrap each dir in its layer inside the build script.
- `README.md:31` "Open `examples/index.html`" — file is under `src/`, pages link `href="/tui.css"` (root-absolute), unstyled from disk. `server.js:26` hardcodes an absolute path; `test-server.mjs` is portable but undocumented.
- `README.md:255-257` `npm run lint:css` is `--fix` (rewrites files); without `--fix`, 77 errors (mostly `src/docs/_style.css`).
- `README.md:263-267` support floor (Chrome 111 / Safari 15.4 / Firefox 126) is below what nesting (Chrome 120 / FF 117 / Safari 17.2) and relative color syntax (Chrome 131 / FF 133 / Safari 18) need; `docs/css-features-checklist.md:7-9` targets Chrome 151 / FF 153 / Safari 26.4.
- `README.md:33-44` omits `showcase.html`, `new-features.html`, `src/docs/`; README:3 claims `light-dark()` (unused).
- `docs/css-features-checklist.md:49-64` marks used features as unused and vice versa — stale plan.

## Bad — naming

- `card.css:8` `.tui-card-base` is the only card; modifier `.tui-card-base-primary` (`:79`).
- `30-components/modal.css` vs `60-interactive/modal.css` — both imported (`tui.css:51,83`), both `.tui-modal { display:none }`; the interactive layer's `display:none` beats the components layer's `display:block`, so the sibling-pattern modal is dead code documenting wrong markup. No example/doc page uses a modal.
- `80-themes/light-dark.css` — byte-for-byte copy of `00-colors.css:116-135`; `reboot.css:35-40` is a third dark `body` block.
- `20-elements/links.css` empty; `<a>` styled in `typography.css:51-52`, `buttons.css:61`, `links-nav.css` with two different hover colours.
- `20-elements/buttons.css` vs `30-components/button.css:8-27` near-identical; only `border-color: transparent` differs.

## Bad — rules that exist only in CSS

- `tabs.css:54` `.tui-tab-panel:nth-child(1)` — direct, in-order children required. `rating.css:31-59`, `carousel.css:57-73`, `toggle-group.css:42-56` same with fixed counts.
- `forced-toggle.css:13` needs a `.tui-page` sibling; `docs/themes.html:76-77` demo has none, does nothing.
- `validation.css:20-25` comment says "after user interaction"; selector `input:not(:user-invalid):not(:user-valid):invalid` matches *before* interaction — bare `<input required>` is red on load. `:35-46` `input:required::after` can't render on inputs; `padding-right` at `:32` still applies.
- `card.css:46-56` gives the *first* child 16px top margin, others none — why examples add `tui-m-0`. README:243-249 reproduces it as design.
- `typography-polish.css:12,22` — a reboot file references `.tui-card-header`, `.tui-modal-body`, `.tui-accordion-body`.

## Bad — dead or invalid tokens

- `05-transitions.css:17-21` `@property --tui-progress-width` with `initial-value: '0%'` (string, not percentage) — not registered; nothing reads it. `progress.css:18` transitions plain `width`.
- `06-breakpoints.css:16-46` `@container tui { :root {…} }` never matches; nothing reads `--tui-container-width` / `--tui-breakpoint-*`.
- `00-colors.css:32-33` comment says "use black", value `#ffffff`.
- `links-nav.css:30-62` `:local-link`, `:current`, `:past`, `:future`, `:target-within` — no shipping browser; "Group 9" refers to no document in the repo.
- `typography-polish.css:37` `:root { font-size-adjust: 0.52 }` changes every glyph size; comment doesn't say so.
- `docs/css-anchors.md` — 214 lines; `anchor-` appears nowhere in `src/`.

## Tests

- `tests/07-interactive.spec.js` — 30 tests, none click anything; broken docs demos and the dead modal pass. `examples-a11y.spec.js` never visits `src/docs/*` or `showcase.html`.
- `package.json` has no `test` script; the seven `0N-*.spec.js` only run via bare `npx playwright test`; no `npx playwright install` note.

## Open questions

Is `tui-card-base` deliberate? Which `modal.css` is real? Is the card first-child margin intentional? What are "Group 3"/"Group 9"? Is the hardcoded-id pattern final? Is `tui-all.css` meant to be committed? Which support numbers are real? Does `.tui-button` on `<button>` do anything on purpose?

## What I'd do

1. Make interactive components id-free using the `dropdown.css` pattern:
   ```css
   .tui-accordion-item:has(> .tui-accordion-input:checked) > .tui-accordion-body { max-height: 500px; }
   ```
   For tabs: `.tui-tab-input:nth-of-type(2):checked ~ .tui-tab-content > .tui-tab-panel:nth-child(2)`.
2. Fix the bundle (wrap layers in `build-single.sh`) or delete `tui-all.css` and the README line.
3. Delete `30-components/modal.css`, `20-elements/links.css`, `80-themes/light-dark.css`, the `@container` block in `06-breakpoints.css`, both `@property` tokens, `links-nav.css:30-62`.
4. Fix `src/docs/interactive.html`; add one behavioural test per interactive component that clicks and asserts visibility.
5. README: `node test-server.mjs`; `lint:css` without `--fix`; state id/for/order rules next to each snippet until (1) lands; one browser-support line.
6. Rename `.tui-card-base` → `.tui-card`.
7. Fix the `validation.css` comment or the rule.

## Verdict

Productive with static components next week. Could not ship an interactive component without reading the CSS — every one except dropdown silently requires specific ids and a fixed count. Making them id-free is the one change that flips the answer.
