---
title: How to Customize
section: getting-started
source: src/00-tokens/
description: "A handful of seed variables drive every color, size and duration in the framework. Move one and everything derived from it follows."
---

Torque UI has no theme file and no build-time configuration. Every token is a custom property, and almost all of them are computed from a few seeds with `color-mix()`, `oklch(from …)` and `calc()`. Change a seed and the whole family it feeds follows: the ramp, the tones, the foregrounds, the scale steps, the durations.

| Seed | Default | Drives |
|---|---|---|
| `--tui-brand` | `#5c60f0` | The brand ramp `-50` to `-900`, its contrast foreground, the focus ring, the named colors and so the semantic tones, the chart palette and avatars |
| `--tui-neutral` | `#6b7280` | The gray ramp, every surface, text color, border and shadow, in light and dark |
| `--tui-brand-end` | undeclared | The second stop of `--tui-brand-gradient`, which `.tui-bg-gradient`, `.tui-text-gradient` and `.tui-button-gradient` paint; each tone has its own `--tui-<tone>-end` |
| `--tui-gradient-angle` | `135deg` | The direction of every tone gradient |
| `--tui-contrast-pivot` | `0.65` | The lightness above which a foreground turns dark instead of white |
| `--tui-text-base` | `1rem` | The type scale `--tui-text-xs` to `--tui-text-5xl` |
| `--tui-root-size` | `100%` | `html { font-size }`, and with it every `rem` in the framework |
| `--tui-spacing-1` | `0.25rem` | The spacing scale `--tui-spacing-0-5` to `--tui-spacing-32` |
| `--tui-radius-sm` | `0.125rem` | The radius scale `--tui-radius-md` to `--tui-radius-3xl` |
| `--tui-duration-normal` | `250ms` | Every duration, `--tui-duration-faster` to `--tui-duration-slowest` |
| `--tui-tracking-wide` | `0.025em` | The letter-spacing steps either side of normal |
| `--tui-focus-ring-width` | `2px` | The focus ring and its halo |
| `--tui-chart-base`, `--tui-chart-rotation`, `--tui-chart-pastel` | brand, `1560 / 7`, `0.35` | The seven chart series; see [Chart Palette](/ui/foundations/chart-palette/) |

Fonts, weights, line heights, easings and z-indexes are plain values with nothing derived from them. Override them one by one.

## Where to set a seed

Set seeds on `:root`. The derived steps are declared on `:root` too, so they resolve there once and every element inherits the result. A seed set on a wrapper only reaches rules that read the seed itself: `--tui-brand` re-themes a subtree, as the [Installation](/ui/getting-started/installation/) demo shows, but `--tui-spacing-1` on a wrapper leaves `--tui-spacing-4` where it was. To change one step inside a subtree, override that step.

```css
:root {
  --tui-brand: oklch(0.6 0.18 160);
  --tui-spacing-1: 0.3rem;
  --tui-radius-sm: 0.25rem;
  --tui-duration-normal: 180ms;
}
```

The demos below run in their own frame so you can watch a change live. Each control writes its seed on that frame's `:root`; in your app the same override is one line of CSS, and the framework needs no script.

## Color

Type your own brand as a hex, or tune it as `oklch(L C H)` with a slider per channel; the two stay in sync. Hue moves the brand ramp and the chart series. Lightness and chroma move the named colors too, since red, green, yellow and teal borrow them and only pin the hue. Push the lightness past the contrast pivot and the primary button's text turns dark. The neutral hue tints every surface, border and gray.

{% include demo.html file="color.html" frame=true height="34rem" %}

More on the derivation, and every color token you can override on its own, is on [Colors](/ui/foundations/colors/).

## Gradient

Every tone has a gradient running along `--tui-gradient-angle` (135° by default) from the tone to an end color, and the library does not declare the end. Until you set `--tui-brand-end` the brand gradient is flat brand, so nothing looks off in an app that never picks one. Set it on `:root` and the gradient background, the gradient text and the gradient button all pick it up; the start follows `--tui-brand`, so changing the brand moves every gradient too. The semantic tones work the same way with `--tui-positive-end`, `--tui-negative-end`, `--tui-warning-end`, `--tui-info-end` and `--tui-neutral-end`, and the one angle turns them all.

```css
:root {
  --tui-brand: #5c60f0;
  --tui-brand-end: #e11d48;
  --tui-gradient-angle: 90deg;
}
```

{% include demo.html file="gradient.html" frame=true height="18rem" %}

See [Color utilities](/ui/utilities/colors/) and the [gradient button](/ui/components/buttons/).

## Scale

Three seeds set the proportions: the type base, the spacing unit and the smallest radius. Every step is a multiple of its seed, so the card, the field and the buttons keep their proportions at any setting. `--tui-root-size` scales all three at once, since they are all in `rem`, but it only works on the real document root.

{% include demo.html file="scale.html" frame=true height="30rem" %}

See [Typography Scale](/ui/foundations/typography-scale/), [Spacing](/ui/foundations/spacing/) and [Radius](/ui/foundations/radius/).

## Motion

`--tui-duration-normal` is the one clock. Transitions, the spinner, the loading stripes and the [animate](/ui/utilities/animate/) catalog all run on it or on a multiple of it. At `0ms` the interface still works, it just stops moving.

{% include demo.html file="motion.html" frame=true height="16rem" %}

See [Motion](/ui/foundations/motion/).

Related: [Installation](/ui/getting-started/installation/) · [Colors](/ui/foundations/colors/) · [Chart Palette](/ui/foundations/chart-palette/) · [Typography Scale](/ui/foundations/typography-scale/) · [Spacing](/ui/foundations/spacing/) · [Radius](/ui/foundations/radius/) · [Motion](/ui/foundations/motion/) · [Dark Mode](/ui/themes/dark-mode/)
