# Torque UI

## Description

Torque UI is a CSS framework with no build step, no SCSS and no JavaScript: link one stylesheet and every element, component, layout and utility is ready. Interactivity comes from the platform itself — hidden checkboxes and radios, `<details>`, the `popover` attribute, `<dialog>` — driven by `:has()`, `:checked` and cascade layers, so tabs, menus, drawers and modals work without a single script. The whole palette derives from one brand colour, nine `@layer`s settle precedence without `!important`, and WCAG AA contrast, visible focus rings, dark mode, reduced motion and forced colours are the default.

Where the platform stops, the framework stays **JS-friendly** rather than shipping script. Every state your own code would set is already styled: `aria-selected`, `aria-expanded`, `aria-busy`, `aria-invalid`, `hidden`, `inert`, a `data-*` attribute or a class all paint the same thing, and value hooks such as `--tui-progress-value` read themselves from `aria-valuenow`. A searchable combobox with tags (`.tui-combobox`), a listbox, a calendar grid, drag-and-drop states and a loading button are all there — you plug in the twenty lines of JavaScript that fit your app, and the docs show the minimal version of each. Sections built this way carry a **self-driven JS** label.

> **Experimental.** This is version 0.1. Class names and markup contracts may still change between minor versions while the API settles, and a few components lean on CSS features that only Chrome ships today (they degrade rather than break — see [Browser Support](#browser-support)). Feedback and issues are very welcome.

## Installation

There is nothing to install in the package-manager sense. Copy the bundle into your project and link it:

```html
<link rel="stylesheet" href="tui-all.css">
```

`dist/tui-all.css` is a single flat file — one `@layer` declaration followed by nine layer blocks — and the right choice for production. The modular entry point, `src/tui.css`, `@import`s every source file into its layer, for developing against the framework or for a bundler that resolves `@import` and lets you drop modules:

```html
<link rel="stylesheet" href="src/tui.css">
```

Re-theme everything by overriding one variable:

```css
:root {
  --tui-brand: #e11d48;
}
```

Tints, semantic tones, surfaces, shadows and every auto-picked foreground follow from it. Each component also exposes its own `--tui-<name>-*` custom properties with token fallbacks; they are listed on the component's page.

## Usage

The documentation lives at [torque.dev/ui](https://torque.dev/ui/), one page per topic, each pairing the exact markup with a reference table; its source is the Markdown under `docs/`. The example pages under [`examples/`](examples/index.html) show every component on one page each — run `npm start` and open `http://localhost:8081/examples/`.

### Getting Started

- [Installation](https://torque.dev/ui/getting-started/installation/)
- [Cascade Layers](https://torque.dev/ui/getting-started/layers/)
- [Browser Support](https://torque.dev/ui/getting-started/browser-support/)

### Foundations

_One brand colour, a handful of scales, and every component reads them._

- [Chart Palette](https://torque.dev/ui/foundations/chart-palette/)
- [Colors](https://torque.dev/ui/foundations/colors/)
- [Motion](https://torque.dev/ui/foundations/motion/)
- [Radius](https://torque.dev/ui/foundations/radius/)
- [Reboot](https://torque.dev/ui/foundations/reboot/)
- [Self-driven JS](https://torque.dev/ui/foundations/self-driven-js/)
- [Spacing](https://torque.dev/ui/foundations/spacing/)
- [State Inputs](https://torque.dev/ui/foundations/state-inputs/)
- [Tone](https://torque.dev/ui/foundations/tone/)
- [Typography Scale](https://torque.dev/ui/foundations/typography-scale/)
- [Z-index](https://torque.dev/ui/foundations/z-index/)

### Elements

_Plain HTML that already looks right, no classes required._

- [Icons](https://torque.dev/ui/elements/icons/)
- [Images](https://torque.dev/ui/elements/images/)
- [Links](https://torque.dev/ui/elements/links/)
- [Lists](https://torque.dev/ui/elements/lists/)
- [Tables](https://torque.dev/ui/elements/tables/)
- [Typography](https://torque.dev/ui/elements/typography/)

### Components

_Interactivity from native HTML alone — not a single script ships with it._

- [Alert](https://torque.dev/ui/components/alert/)
- [Avatar](https://torque.dev/ui/components/avatar/)
- [Badge](https://torque.dev/ui/components/badge/)
- [Bottom Navigation](https://torque.dev/ui/components/bottom-nav/)
- [Breadcrumb](https://torque.dev/ui/components/breadcrumb/)
- [Busy](https://torque.dev/ui/components/busy/)
- [Buttons](https://torque.dev/ui/components/buttons/)
- [Card](https://torque.dev/ui/components/card/)
- [Chart](https://torque.dev/ui/components/chart/)
- [Chip](https://torque.dev/ui/components/chip/)
- [Close](https://torque.dev/ui/components/close/)
- [Composer](https://torque.dev/ui/components/composer/)
- [Divider](https://torque.dev/ui/components/divider/)
- [Empty State](https://torque.dev/ui/components/empty/)
- [Flag](https://torque.dev/ui/components/flag/)
- [Key/Value](https://torque.dev/ui/components/key-value/)
- [Label](https://torque.dev/ui/components/label/)
- [List Group](https://torque.dev/ui/components/list-group/)
- [Navbar](https://torque.dev/ui/components/navbar/)
- [Pagination](https://torque.dev/ui/components/pagination/)
- [Panel](https://torque.dev/ui/components/panel/)
- [Placeholder](https://torque.dev/ui/components/placeholder/)
- [Progress](https://torque.dev/ui/components/progress/)
- [Ribbon](https://torque.dev/ui/components/ribbon/)
- [Segment](https://torque.dev/ui/components/segment/)
- [Spinner](https://torque.dev/ui/components/spinner/)
- [Statistic](https://torque.dev/ui/components/statistic/)
- [Status](https://torque.dev/ui/components/status/)
- [Steps](https://torque.dev/ui/components/steps/)
- [Tag](https://torque.dev/ui/components/tag/)
- [Timeline](https://torque.dev/ui/components/timeline/)
- [Toast](https://torque.dev/ui/components/toast/)
- [Toolbar](https://torque.dev/ui/components/toolbar/)
- [Tree](https://torque.dev/ui/components/tree/)
- [Window](https://torque.dev/ui/components/window/)

### Forms

_Native controls, restyled; errors only when the user has actually been there._

- [Checkbox](https://torque.dev/ui/forms/checkbox/)
- [Color Check](https://torque.dev/ui/forms/color-check/)
- [Field States](https://torque.dev/ui/forms/field-states/)
- [Form Layout](https://torque.dev/ui/forms/form-layout/)
- [Form Table](https://torque.dev/ui/forms/form-table/)
- [Image Check](https://torque.dev/ui/forms/image-check/)
- [Input Group](https://torque.dev/ui/forms/input-group/)
- [Inputs](https://torque.dev/ui/forms/inputs/)
- [Password](https://torque.dev/ui/forms/password/)
- [Radio](https://torque.dev/ui/forms/radio/)
- [Range](https://torque.dev/ui/forms/range/)
- [Search](https://torque.dev/ui/forms/search/)
- [Select](https://torque.dev/ui/forms/select/)
- [Stepper](https://torque.dev/ui/forms/stepper/)
- [Switch](https://torque.dev/ui/forms/switch/)
- [Validation](https://torque.dev/ui/forms/validation/)

### Interactive

_Tabs, menus, dialogs and drawers driven by :checked, popover and dialog — no script._

- [Backdrop](https://torque.dev/ui/interactive/backdrop/)
- [Calendar](https://torque.dev/ui/interactive/calendar/)
- [Carousel](https://torque.dev/ui/interactive/carousel/)
- [Collapse](https://torque.dev/ui/interactive/collapse/)
- [Drag and Drop](https://torque.dev/ui/interactive/drag/)
- [Listbox](https://torque.dev/ui/interactive/listbox/)
- [Menu](https://torque.dev/ui/interactive/menu/)
- [Modal](https://torque.dev/ui/interactive/modal/)
- [Offcanvas](https://torque.dev/ui/interactive/offcanvas/)
- [Popover](https://torque.dev/ui/interactive/popover/)
- [Rating](https://torque.dev/ui/interactive/rating/)
- [Sheet](https://torque.dev/ui/interactive/sheet/)
- [Speed Dial](https://torque.dev/ui/interactive/speed-dial/)
- [Tabs](https://torque.dev/ui/interactive/tabs/)
- [Toggle Group](https://torque.dev/ui/interactive/toggle-group/)
- [Tooltip](https://torque.dev/ui/interactive/tooltip/)
- [Wizard](https://torque.dev/ui/interactive/wizard/)

### Layout

_Gap, not margins — components carry no outer spacing of their own._

- [App Shell](https://torque.dev/ui/layout/shell/)
- [Board](https://torque.dev/ui/layout/board/)
- [Container](https://torque.dev/ui/layout/container/)
- [Container Queries](https://torque.dev/ui/layout/container-queries/)
- [Flexbox](https://torque.dev/ui/layout/flexbox/)
- [Grid](https://torque.dev/ui/layout/grid/)
- [Hero](https://torque.dev/ui/layout/hero/)
- [Level](https://torque.dev/ui/layout/level/)
- [Media Object](https://torque.dev/ui/layout/media/)
- [Page Header](https://torque.dev/ui/layout/page-header/)
- [Section](https://torque.dev/ui/layout/section/)
- [Split Pane](https://torque.dev/ui/layout/split/)
- [Stack](https://torque.dev/ui/layout/stack/)

### Utilities

_Single-purpose classes that win over any component._

- [Colors](https://torque.dev/ui/utilities/colors/)
- [Display](https://torque.dev/ui/utilities/display/)
- [Overflow](https://torque.dev/ui/utilities/overflow/)
- [Pointer & Orientation](https://torque.dev/ui/utilities/pointer-orientation/)
- [Scroll](https://torque.dev/ui/utilities/scroll/)
- [Sizing](https://torque.dev/ui/utilities/sizing/)
- [Spacing](https://torque.dev/ui/utilities/spacing/)
- [Text](https://torque.dev/ui/utilities/text/)
- [Visual](https://torque.dev/ui/utilities/visual/)

### Themes

_Dark mode, contrast, motion, print — the user preferences honoured by default._

- [Accessibility](https://torque.dev/ui/themes/accessibility/)
- [Dark Mode](https://torque.dev/ui/themes/dark-mode/)
- [High Contrast](https://torque.dev/ui/themes/high-contrast/)
- [Print](https://torque.dev/ui/themes/print/)
- [View Transitions](https://torque.dev/ui/themes/view-transitions/)

[`docs/comparison.md`](docs/comparison.md) measures the coverage against Bootstrap, Bulma, Semantic UI, Fluent UI and Tabler and lists what still needs script on your side.

## Browser Support

The floor is **Chrome 123 / Safari 17.5 / Firefox 128**: `:has()`, `@layer`, CSS nesting, `color-mix()`, relative colour syntax, `light-dark()`, `:user-invalid`, the `popover` attribute and `<details name>` are used unconditionally.

Everything newer enhances progressively — the feature sits behind `@supports`, or the component has a documented soft degradation — so below its own floor a component still works and only loses the enhancement. The main ones:

| Feature | Needs | Below the floor |
|---|---|---|
| Anchor positioning (popover, tooltip, combobox list, speed dial) | Chrome 125 / Safari 26 | Popovers become a bottom sheet; tooltips sit above their trigger |
| `commandfor` / `command="show-modal"` (modal) | Chrome 135 / Safari 26 / Firefox 144 | One line of JavaScript calls `showModal()`; closing, Escape, focus trap and backdrop need nothing |
| `@starting-style` and `allow-discrete` (entry and exit fades) | Chrome 117 / Safari 17.4 / Firefox 129 | Elements appear and disappear without the fade |
| `appearance: base-select` (rich select, icon options) | Chrome 134 | The native `<select>` popup |
| Typed `attr()` (values read from `aria-valuenow` / `data-value`) | Chrome 133 | Set the custom property directly from your script |
| `field-sizing: content` (auto-growing textarea) | Chrome 123 / Safari 26 | Fixed size with a resize handle |
| `text-box: trim-both` (leading trim) | Chrome 133 / Safari 18.2 / Firefox 154 | Text keeps its half-leading; boxes are a few pixels taller |
| `interpolate-size`, `::scroll-marker`, scroll-driven animations, `@view-transition` | Chrome 131 / 135 / 115 / 126 | Content snaps, dots take over, no progress bar, no page transition |

The full table with every component's floor is on the [Browser Support](https://torque.dev/ui/getting-started/browser-support/) page.

## How to Contribute

To start, simply fork the project and install the tooling (the first `npm test` fetches the Chromium build the tests run in):

```bash
npm install
npm start          # serves the repository on http://localhost:8081
```

Edit the CSS under `src/` (one file per component, imported into its layer from `src/tui.css`), rebuild the bundle and run the checks:

```bash
npm run lint:css   # stylelint, logical properties, no !important
npm run build      # regenerates dist/tui-all.css in the entry point's order
npm test           # Playwright: behaviour, accessibility, RTL, print, visual and bundle-equivalence suites
```

Every component has a docs page under `docs/`, an example on one of the `examples/` pages and a test; a change to any of them should carry the other two. Finally, fix and send a pull request.

## License

Copyright © 2026- Carlos Silva. See [The MIT License](LICENSE) for further details.
