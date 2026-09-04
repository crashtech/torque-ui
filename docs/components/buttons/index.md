---
title: Buttons
section: components
source: src/20-elements/buttons.css, src/30-components/button.css
js: self-driven
description: "Bare buttons already look right; .tui-button adds tones, sizes, icon, block, gradient, groups, split buttons and the floating action button."
---

Every `<button>` and every `input:is([type="submit"], [type="reset"], [type="button"])` gets the base button look with no class at all. `.tui-button` carries the same look onto links and adds the variant system: colour comes from the shared `--tui-tone` hook, so each `.tui-button-<tone>` modifier is a one-line tone setter and the outline, gradient and icon variants compose with it. Buttons carry no outer margin; space them with `gap`.

## Base look

The element defaults give a semibold `--tui-text-base` label, `--tui-spacing-2 --tui-spacing-4` padding, a 2px `--tui-border` border, `--tui-radius-md` corners and `--tui-shadow-sm`. Hover lifts the button by 1px and deepens the shadow; `:active` drops it back. `.tui-button` on a bare element makes one visible change — the border becomes transparent so the fill reads as the edge.

{% include demo.html file="base.html" %}

## Variants

A tone modifier fills the button solidly with the tone and uses the tone's contrast foreground; on hover the fill and the border lighten together and the ambient shadow becomes a coloured one. `.tui-button-secondary` is the neutral fill with a strong border, `.tui-button-ghost` a transparent brand-text button that tints on hover, and `.tui-button-outline` a transparent button whose border and text come from whatever tone class the element also carries — alone it is a neutral outlined button.

{% include demo.html file="variants.html" %}

| Class | Background | Text |
|---|---|---|
| `.tui-button` | `--tui-surface-2` | `--tui-text-1` |
| `.tui-button-primary` | `--tui-brand` | `--tui-brand-fg` |
| `.tui-button-secondary` | `--tui-surface-2`, `--tui-border-strong` border | `--tui-text-1` |
| `.tui-button-ghost` | transparent, brand tint on hover | `--tui-brand` |
| `.tui-button-outline` | transparent, tone border | `--tui-tone-ink`, falling back to `--tui-text-1` |
| `.tui-button-success` | `--tui-positive` | `--tui-positive-fg` |
| `.tui-button-error` | `--tui-negative` | `--tui-negative-fg` |
| `.tui-button-warning` | `--tui-warning` | `--tui-warning-fg` |
| `.tui-button-info` | `--tui-info` | `--tui-info-fg` |

The `.tui-button-*` tone names are aliases of the generic [tone classes](/ui/foundations/tone/), so `.tui-button.tui-tone-neutral` is a solid grey button.

## Sizes

`.tui-button-sm` and `.tui-button-lg` step the padding and font size together; the default needs no class.

{% include demo.html file="sizes.html" %}

| Class | Padding | Font size |
|---|---|---|
| `.tui-button-sm` | `--tui-spacing-1 --tui-spacing-3` | `--tui-text-sm` |
| *(default)* | `--tui-spacing-2 --tui-spacing-4` | `--tui-text-base` |
| `.tui-button-lg` | `--tui-spacing-3 --tui-spacing-6` | `--tui-text-lg` |

## Block

`.tui-button-block` turns the button into a full-width block.

{% include demo.html file="block.html" %}

## Icon button

`.tui-button-icon` squares the button — uniform `--tui-spacing-2` padding, `aspect-ratio: 1` and a minimum width restating the block size — and rounds it fully, so an icon, an emoji or a single character all render as a circle. The glyph is decorative, so always give the button an `aria-label`.

{% include demo.html file="icon.html" %}

## Disabled

The `disabled` attribute fades the button to 50% opacity, removes the hover lift and blocks pointer events. There is no class for it — use the attribute, which also removes the button from the form and the tab order.

{% include demo.html file="disabled.html" %}

## Button group

Wrap sibling buttons in `.tui-button-group` to merge their borders: each button after the first overlaps the previous border by 2px and only the outer corners keep their radius. For a group that tracks a selection, use a [toggle group](/ui/interactive/toggle-group/) instead.

{% include demo.html file="group.html" %}

## Split button

`.tui-split-button` is a two-button group: the first child is the main action and the last child a `.tui-button-icon` invoker that opens a `.tui-popover.tui-menu` through the native `popovertarget` attribute. The popover must immediately follow the group so it stays anchored to its invoker. Disabling the main half greys the whole group — the menu half follows through `:has(> :disabled)`.

{% include demo.html file="split.html" %}

## Link buttons

Any `<a>` can carry `.tui-button`. The component reasserts its own text colour and `text-decoration: none`, so a solid link button never inherits the brand link colour, the hover underline or the visited tint.

{% include demo.html file="links.html" %}

## Gradient

`.tui-button-gradient` paints `--tui-tone-gradient`, falling back to `--tui-brand-gradient`, and brightens slightly on hover. Each gradient runs from a tone colour to its `-end` token, which the library leaves undeclared — set `--tui-brand-end` (or `--tui-positive-end`, `--tui-negative-end`, …) on `:root` to switch it on. Until then the button renders flat in the tone colour, as the first button here does; the second overrides `--tui-tone-gradient` inline to show the effect. Combine with a tone class for a toned gradient.

{% include demo.html file="gradient.html" %}

## Floating action button

`.tui-fab` fixes a 3.5rem round button to the bottom end corner of the viewport, inset by `--tui-fab-inset`, with `--tui-shadow-lg` and the `--tui-z-sticky` tier. One per page; because it is `position: fixed`, this demo runs in its own frame.

{% include demo.html file="fab.html" frame=true height="14rem" %}

## Pressed <span class="tui-badge">self-driven JS</span>

A toggle button your script marks with `aria-pressed="true"` (or `data-pressed`, or `.tui-pressed`) holds the `:active` depth: a darker fill, an inset shadow and no hover lift, in whatever tone the button has. `.tui-caret` is a chevron that turns when the element it sits in is expanded — `aria-expanded="true"`, `data-expanded` or `.tui-expanded` on the button — so a dropdown trigger needs no icon swap. See [Self-driven JS](/ui/foundations/self-driven-js/) for the full state list.

{% include demo.html file="pressed.html" %}

| Selector | Effect |
|---|---|
| `.tui-button:is([aria-pressed="true"], [data-pressed], .tui-pressed)` | Held-down look: darker tone fill, inset shadow, no lift |
| `.tui-caret` | 0.75em chevron in the text colour |
| `:is([aria-expanded="true"], [data-expanded], .tui-expanded) .tui-caret` | Turned 180° |

## Loading <span class="tui-badge">self-driven JS</span>

`aria-busy="true"` (or `.tui-loading`) on any `<button>`, styled or bare, turns its label transparent — so the width holds — and centres a 1em spinner in the button's text colour over it; pointer events are off until the attribute goes. The demo's script sets it for two seconds on click.

{% include demo.html file="loading.html" %}

| Selector | Effect |
|---|---|
| `:is(button, .tui-button):is([aria-busy="true"], .tui-loading)` | Transparent label, centred spinner, `pointer-events: none` |
| `:is(form, fieldset)[aria-busy="true"] button[type="submit"]` | The same spinner, from the [busy form](/ui/forms/form-layout/) |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-button-padding` | `var(--tui-spacing-2) var(--tui-spacing-4)` | Base padding of every button; the size modifiers and `.tui-button-icon` override it |
| `--tui-button-radius` | `var(--tui-radius-md)` | Corner radius; `.tui-button-icon` and `.tui-fab` force `--tui-radius-full` |
| `--tui-button-border` | `var(--tui-border)` on a bare element, `transparent` on `.tui-button` | Border colour when no tone is set |
| `--tui-fab-inset` | `var(--tui-spacing-6)` | Distance of `.tui-fab` from the bottom and end edges of the viewport |

Related: [Toggle Group](/ui/interactive/toggle-group/) · [Menu](/ui/interactive/menu/) · [Popover](/ui/interactive/popover/) · [Input Group](/ui/forms/input-group/) · [Tone](/ui/foundations/tone/)
