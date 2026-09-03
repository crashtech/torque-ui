---
title: Colors
section: foundations
source: src/00-tokens/00-colors.css
description: "One brand colour and everything derived from it: tints, semantic tones, neutrals, surfaces, text, borders, focus, shadows, gradients and the avatar palette."
---

Every colour in Torque UI flows from a single variable, `--tui-brand`. Tints derive with `color-mix()`, the semantic tones derive with relative colour syntax (`oklch(from …)`), and each foreground is computed for contrast — change the brand once and the whole palette follows. `:root` declares `color-scheme: light dark`, and every surface, text, border and shadow token is a `light-dark()` pair, so the same tokens resolve correctly under either scheme with nothing redefined in a media query.

## Brand colour

The root of everything. `--tui-brand-fg` is black or white, whichever contrasts with the brand: the token compares the brand's OKLCH lightness to `--tui-contrast-pivot` and snaps to `0` or `1`.

```css
:root { --tui-brand: #5c60f0; }
```

| Token | Value |
|---|---|
| `--tui-brand` | `#5c60f0` |
| `--tui-brand-fg` | Black or white, picked against `--tui-contrast-pivot` |
| `--tui-contrast-pivot` | `0.65` — the OKLCH lightness above which a fill gets dark text |
| `--tui-brand-bg` | Brand 2% into white (light) / brand 15% into `--tui-surface-1` (dark) — alert and callout backgrounds |
| `--tui-brand-soft` | Brand at 15% over transparent — badge, chip and active-row backgrounds |
| `--tui-brand-edge` | Brand at 30% over transparent — badge borders, focus glows, toned lines |
| `--tui-brand-ink` | Brand darkened (light) / lightened (dark) so it stays readable on `-bg` and `-soft` fills |

{% include demo.html file="brand-companions.html" %}

## Derived tints and shades

A ten-step scale from `--tui-brand-50` (lightest) to `--tui-brand-900` (darkest); the 500 step is the brand itself. Steps below 500 mix toward white, steps above mix toward black.

{% include demo.html file="brand-ramp.html" %}

| Token | Mix |
|---|---|
| `--tui-brand-50` | brand 96% + white |
| `--tui-brand-100` | brand 88% + white |
| `--tui-brand-200` | brand 76% + white |
| `--tui-brand-300` | brand 64% + white |
| `--tui-brand-400` | brand 52% + white |
| `--tui-brand-500` | `var(--tui-brand)` |
| `--tui-brand-600` | brand 40% + black |
| `--tui-brand-700` | brand 28% + black |
| `--tui-brand-800` | brand 16% + black |
| `--tui-brand-900` | brand 8% + black |

## Named colours

Thirteen colours by name — `--tui-red`, `--tui-orange`, `--tui-yellow`, `--tui-olive`, `--tui-green`, `--tui-teal`, `--tui-blue`, `--tui-violet`, `--tui-purple`, `--tui-pink`, `--tui-brown`, `--tui-grey` and `--tui-black`. Like the semantic tones, each pins a hue while lightness and chroma follow the brand, so a re-theme shifts the whole set together (`--tui-grey` is the neutral, `--tui-black` a near-black of it). Reach for them through the matching `.tui-tone-<name>` classes, which derive the full companion family on the spot — see [tone](/ui/foundations/tone/).

{% include demo.html file="named.html" %}

| Token | Tone class | Intent alias | Hue | Derivation from the brand |
|---|---|---|---|---|
| `--tui-red` | `.tui-tone-red` | `--tui-negative` | 25° | lightness × 0.90, chroma × 1.1 |
| `--tui-orange` | `.tui-tone-orange` | — | 55° | lightness floored at 0.68, chroma × 1.15 |
| `--tui-yellow` | `.tui-tone-yellow` | `--tui-warning` | 85° | lightness floored at 0.8 |
| `--tui-olive` | `.tui-tone-olive` | — | 120° | lightness × 0.85, chroma × 0.9 |
| `--tui-green` | `.tui-tone-green` | `--tui-positive` | 150° | lightness × 0.90, chroma × 1.1 |
| `--tui-teal` | `.tui-tone-teal` | `--tui-info` | 190° | lightness × 0.85 |
| `--tui-blue` | `.tui-tone-blue` | — | 240° | lightness × 0.95 |
| `--tui-violet` | `.tui-tone-violet` | — | 290° | lightness × 0.90, chroma × 1.1 |
| `--tui-purple` | `.tui-tone-purple` | — | 320° | lightness × 0.85, chroma × 1.15 |
| `--tui-pink` | `.tui-tone-pink` | — | 350° | lightness floored at 0.66, chroma × 1.1 |
| `--tui-brown` | `.tui-tone-brown` | — | 60° | lightness × 0.65, chroma × 0.55 |
| `--tui-grey` | `.tui-tone-grey` | — | — | `var(--tui-neutral)` |
| `--tui-black` | `.tui-tone-black` | — | — | neutral 15% into black |

## Semantic tones

The purpose-driven colours for feedback states, plus the brand and the neutral as tones. Each intent is an alias of a named colour — positive is green, negative is red, warning is yellow, info is teal — so the two vocabularies always agree and both follow the brand. Every tone has the same family of companions as the brand — `-fg`, `-bg`, `-soft`, `-edge`, `-ink` — which is what lets one [tone hook](/ui/foundations/tone/) drive every component.

{% include demo.html file="semantic.html" %}

| Token | Tone classes | Purpose | Derivation |
|---|---|---|---|
| `--tui-positive` | `.tui-tone-success`, `.tui-tone-green` | Success, confirmation | `var(--tui-green)` |
| `--tui-negative` | `.tui-tone-error`, `.tui-tone-negative`, `.tui-tone-red` | Error, destructive | `var(--tui-red)` |
| `--tui-warning` | `.tui-tone-warning`, `.tui-tone-yellow` | Caution | `var(--tui-yellow)` |
| `--tui-info` | `.tui-tone-info`, `.tui-tone-teal` | Informational notice | `var(--tui-teal)` |
| `--tui-brand` | `.tui-tone-brand`, `.tui-tone-primary` | The brand itself as a tone | `var(--tui-brand)` |
| `--tui-neutral` | `.tui-tone-neutral`, `.tui-tone-grey` | Quiet, non-committal | `#6b7280` |

| Companion | Value |
|---|---|
| `--tui-<tone>-fg` | Black or white against `--tui-contrast-pivot` — text on the solid tone |
| `--tui-<tone>-bg` | Tone 2% into white (light) / 15% into `--tui-surface-1` (dark) — panel and alert backgrounds |
| `--tui-<tone>-soft` | Tone at 15% over transparent — pill and row fills |
| `--tui-<tone>-edge` | Tone at 30% over transparent — borders and glows |
| `--tui-<tone>-ink` | Tone with lightness capped at 0.45 (light) / floored at 0.8 (dark) — text on `-bg` and `-soft` |

Override any tone with a literal colour if your palette needs a specific hue; its companions keep deriving from the new value.

```css
:root { --tui-positive: #16a34a; }
```

## Neutral palette

A ten-step grey ramp, independent of the brand, that drives the surface, text and border tokens. `--tui-neutral` also carries the full `-bg`, `-soft`, `-edge` and `-ink` set, so `.tui-tone-neutral` works like any other tone.

{% include demo.html file="neutral-ramp.html" %}

| Token | Mix |
|---|---|
| `--tui-neutral` | `#6b7280` |
| `--tui-neutral-50` … `-400` | neutral 98% / 95% / 90% / 85% / 72% + white |
| `--tui-neutral-500` | `var(--tui-neutral)` |
| `--tui-neutral-600` … `-900` | neutral 48% / 36% / 24% / 12% + black |
| `--tui-icon-chevron` | An SVG data URI with `--tui-neutral`'s hex baked in as the fill (data URIs cannot read custom properties); the select and datalist picker chevron |

## Surfaces, text and borders

Five surface levels for layering content, three text levels and two borders, all `light-dark()` pairs mixed from the neutral.

{% include demo.html file="surfaces.html" %}

| Token | Usage |
|---|---|
| `--tui-surface-0` | Page background, card bodies, input backgrounds — white / near-black |
| `--tui-surface-1` | Card headers, sidebars, hover states |
| `--tui-surface-2` | Code, tags, striped rows, disabled inputs |
| `--tui-surface-3` | Switch tracks, progress tracks, avatars, the default badge |
| `--tui-surface-4` | Deepest elevation |
| `--tui-text-1` | Primary text |
| `--tui-text-2` | Secondary text |
| `--tui-text-3` | Muted text, captions |
| `--tui-text-inverse` | `#fff` — text on solid dark fills |
| `--tui-border` | Default border |
| `--tui-border-strong` | Emphasised border (blockquote rule, `<kbd>` edge) |
| `--tui-border-focus` | The brand — focused input border |
| `--tui-focus-ring` | Brand at 30% — the soft focus halo |
| `--tui-focus-ring-strong` | The brand — the hard `:focus-visible` outline |
| `--tui-focus-ring-width` | `2px` — width of every hard focus outline |
| `--tui-focus-halo-width` | `3px` — spread of every soft focus halo (fields, stepper, active step, invalid field) |

## Shadows

Four elevation levels. `light-dark()` only accepts a `<color>` (a `light-dark()` shadow list computes to `none`), so the colour is the theme-aware token and the offsets wrap it. Override a `--tui-shadow-color-*` token to tint the shadows.

{% include demo.html file="shadows.html" %}

| Token | Value | Usage |
|---|---|---|
| `--tui-shadow-sm` | `0 1px 2px var(--tui-shadow-color-sm)` | Cards, buttons |
| `--tui-shadow-md` | `0 4px 6px var(--tui-shadow-color-md)` | Hovered cards, popovers |
| `--tui-shadow-lg` | `0 10px 15px var(--tui-shadow-color-lg)` | Toasts, menus |
| `--tui-shadow-xl` | `0 20px 25px var(--tui-shadow-color-xl)` | Sheets, windows, modals |
| `--tui-shadow-color-sm` … `-xl` | Neutral at 8 / 10 / 12 / 15% (light) / black at 30 / 35 / 40 / 45% (dark) | The colour half of each shadow |

## Gradients

Every tone has a gradient token running at 135° from the tone to an explicit end colour. The end colours are **not declared** by the library: until you set `--tui-brand-end` the brand gradient resolves to flat brand and nothing changes visually. A custom property resolves where it is declared, so `--tui-<tone>-end` must be set on `:root`; to vary a gradient on one element, override that element's `--tui-<tone>-gradient` instead, as the demo does.

```css
:root { --tui-brand-end: #7a00ff; }
```

{% include demo.html file="gradients.html" %}

| Token | Value |
|---|---|
| `--tui-brand-gradient` | `linear-gradient(135deg, var(--tui-brand), var(--tui-brand-end, var(--tui-brand)))` |
| `--tui-positive-gradient`, `--tui-negative-gradient`, `--tui-warning-gradient`, `--tui-info-gradient`, `--tui-neutral-gradient` | Same shape per tone, ending at `--tui-<tone>-end` |

## Avatar palette

Six fixed hues, all dark enough for white initials. The app picks `.tui-avatar-1` … `.tui-avatar-6` per person — hashed from the user id, say — so the same person always gets the same colour.

{% include demo.html file="avatars.html" %}

| Token | Default |
|---|---|
| `--tui-avatar-1` | `#2563eb` |
| `--tui-avatar-2` | `#c2410c` |
| `--tui-avatar-3` | `#0f766e` |
| `--tui-avatar-4` | `#be185d` |
| `--tui-avatar-5` | `#4d7c0f` |
| `--tui-avatar-6` | `#7c3aed` |

## High-contrast literals

Seven `light-dark()` pairs consumed by the [High Contrast](/ui/themes/high-contrast/) theme under `prefers-contrast: more`. They are deliberately not brand-derived: a user asking for more contrast wants guaranteed black, white and grey — and a dark-scheme user gets the dark half, not a white flash.

| Token | Value |
|---|---|
| `--tui-hc-text-1` / `-2` / `-3` | `light-dark(#000, #fff)` / `light-dark(#1a1a1a, #e6e6e6)` / `light-dark(#333, #ccc)` |
| `--tui-hc-surface-0` / `-1` / `-2` | `light-dark(#fff, #000)` / `light-dark(#f5f5f5, #111)` / `light-dark(#eee, #1a1a1a)` |
| `--tui-hc-border` | `light-dark(#000, #fff)` |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-brand` | `#5c60f0` | The single knob the whole palette derives from |
| `--tui-neutral` | `#6b7280` | The grey every surface, text and border token mixes from |
| `--tui-contrast-pivot` | `0.65` | OKLCH lightness above which a fill takes dark text |
| `--tui-positive`, `--tui-negative`, `--tui-warning`, `--tui-info` | named-colour aliases | Repin an intent to any colour; its companions keep deriving |
| `--tui-focus-ring-width` / `--tui-focus-halo-width` | `2px` / `3px` | Outline and halo thickness every focus style reads |
| `--tui-shadow-color-sm` … `-xl` | neutral mixes | Tint of each shadow tier |
| `--tui-brand-end` | undeclared | Second stop of `--tui-brand-gradient`; set on `:root` |
| `--tui-positive-end`, `--tui-negative-end`, `--tui-warning-end`, `--tui-info-end`, `--tui-neutral-end` | undeclared | Second stop of the matching tone gradient; set on `:root` |
| `--tui-tone-end` | undeclared | Second stop of a named tone's gradient; set next to the `.tui-tone-<name>` class |

Related: [Tone](/ui/foundations/tone/) · [Color Utilities](/ui/utilities/colors/) · [Chart Palette](/ui/foundations/chart-palette/) · [Dark Mode](/ui/themes/dark-mode/) · [High Contrast](/ui/themes/high-contrast/) · [Avatar](/ui/components/avatar/)
