---
title: Animate
section: utilities
source: src/70-utilities/animate.css
js: self-driven
description: "A keyframe catalog that plays in, out or on a loop, waits for a state on the element, an ancestor or a sibling, and staggers a list by child index."
---

`.tui-animate` plus one catalog class plays a keyframe animation on the motion tokens: `--tui-duration-normal` for entrances, `--tui-duration-slowest` for attention animations, `--tui-easing-out`, filled both ways. Entrances start hidden or offset and end at the element's own style, so the class is safe to leave in the markup; attention animations start and end there. Two tokens retime everything, and either can be set on `:root` or on any ancestor, as the catalog below does for the entrances. Every keyframe name is public, so `.tui-animate` with your own `animation-name` gets the same timing.

## Catalog

Twelve entrances and six attention animations. Focus a tile — click it, or Tab to it — and a script sets `data-playing` on it, so the photo inside, gated by `.tui-animate-when-playing`, plays; only the focused tile is ever playing, and it stops when focus leaves. While focused, an entrance alternates with its exit and an attention animation replays, with a pause between rounds and a 50ms delay before each run that are the demo's own. The grid slows the entrances down with `--tui-duration-normal: 1s`; the attention animations keep their `--tui-duration-slowest`.

{% include demo.html file="catalog.html" %}

| Class | Keyframe |
|---|---|
| `.tui-animate` | Duration `--tui-duration-normal`, easing `--tui-easing-out`, fill `both`; no name of its own |
| `.tui-animate-fade` | Opacity from 0 |
| `.tui-animate-scale` | Scale from 0.5 with the fade |
| `.tui-animate-slide-top`, `-slide-bottom`, `-slide-left`, `-slide-right` | Translate from `--tui-animate-distance` off that edge |
| `.tui-animate-fly-top`, `-fly-bottom`, `-fly-left`, `-fly-right` | The slide with the fade |
| `.tui-animate-flip-x`, `.tui-animate-flip-y` | Rotate from 90° around the horizontal or vertical axis, in perspective |
| `.tui-animate-shake`, `-pulse`, `-bounce`, `-flash`, `-jiggle`, `-tada` | Attention animations over `--tui-duration-slowest`, ending where they began |
| `.tui-animate-count` | `--tui-animate-value` from `--tui-animate-from` to `--tui-animate-to`; see [Count](#count) |

Directions are physical: `-left` comes from the left in every writing direction.

## In, out and loop

`.tui-animate-out` swaps an entrance for its exit, the same keyframe mirrored, and the `both` fill then holds its last frame, so the element ends transparent, offset and `visibility: hidden` — out of the tab order and the accessibility tree, still in layout. Use [dismiss](/ui/components/close/) to remove an element instead. Gated, an exit becomes a toggle: the entrance plays while the state is absent and the exit when it arrives, so the card below fades out when the switch is on and fades back in when it is off. An earlier sibling counts when it wraps the state, as a label wraps its input. `.tui-animate-loop` repeats forever; combine it with an attention animation for a live indicator.

{% include demo.html file="modes.html" %}

| Class | Effect |
|---|---|
| `.tui-animate-out` | Plays `tui-<name>-out`, the entrance mirrored, ending hidden; gated, it plays the entrance while idle |
| `.tui-animate-loop` | `animation-iteration-count: infinite` |

## Strength

The attention animations that move — shake and bounce by distance, jiggle and tada by tilt, pulse and tada by growth — multiply their effect by `--tui-animate-strength`, which starts at 1. Set it on the element or on any ancestor: half of it for a hint, three times for an alarm. Flash only fades, so it has nothing to scale.

{% include demo.html file="strength.html" %}

## Count

`.tui-animate-count` animates a number instead of a look: `--tui-animate-value` runs from `--tui-animate-from` (0) to `--tui-animate-to` (100) on the `.tui-animate` timing, and the `both` fill holds the end. The property is registered as an inherited `<number>`, so it moves smoothly frame by frame and every child and pseudo-element can read it. Anything that takes a number can follow it: a width, a hue, a rotation, a [progress](/ui/components/progress/) value.

`content: var(--tui-animate-value)` prints nothing, because `content` takes strings, not numbers. The count feeds a counter named `tui-animate-value` instead, rounded to a whole number, and `.tui-animate-count-text` prints it after the element's own content. A bare `.tui-animate-count` prints nothing, so a bar driven by the value stays silent. Pick the easing with plain `animation-timing-function`. `.tui-animate-out` counts back down, and every gate replays the count, so the switch below runs it both ways.

{% include demo.html file="count.html" %}

| Class | Effect |
|---|---|
| `.tui-animate-count` | Plays `tui-count` and sets `counter-reset: tui-animate-value` to the rounded value; out plays `tui-count-out`, to back to from |
| `.tui-animate-count-text` | `::after` prints `counter(tui-animate-value)` |

For your own formatting, read the counter or the raw number in your CSS:

```css
.price::before { content: "$" counter(tui-animate-value); }
.meter { inline-size: calc(var(--tui-animate-value) * 1%); }
```

## Playing from a script <span class="tui-badge">self-driven JS</span>

`.tui-animate-when-playing` holds the animation until the element, an ancestor or an earlier sibling is marked playing, the way every [self-driven state](/ui/foundations/self-driven-js/) is set: `data-playing` by presence, or the class `.tui-playing`. Either reads back as `--tui-playing: 1`. Removing the mark cancels the animation; setting it again replays it, so a script that wants a replay removes the mark, forces a reflow and sets it back, as the demo does.

{% include demo.html file="playing.html" %}

## Gated triggers

The other `.tui-animate-when-*` classes hold the animation until a native state appears, and honor the matching self-driven boolean too. A state counts on the element itself, inside it, on an ancestor, or on an earlier sibling that carries or wraps it — the input-then-label contract of a [state input](/ui/foundations/state-inputs/), or a label around its checkbox. Whenever the state returns the animation restarts, and when it goes the animation is canceled, so entrances pair with states that stay on (checked, open, target) and attention animations with states that come and go (hover, focus, invalid). An inline `animation-name` is not gated.

{% include demo.html file="gated.html" %}

| Class | Plays while |
|---|---|
| `.tui-animate-when-checked` | `:checked`, or `aria-pressed="true"`, `aria-checked="true"`, `data-pressed`, `.tui-pressed` |
| `.tui-animate-when-open` | `[open]`, `:popover-open`, or `aria-expanded="true"`, `data-expanded`, `.tui-expanded` |
| `.tui-animate-when-invalid` | `:user-invalid`, or `aria-invalid="true"`, `data-invalid`, `.tui-invalid` |
| `.tui-animate-when-target` | `:target` |
| `.tui-animate-when-hover` | `:hover` on the element itself, or on a `.tui-animate-host` around it |
| `.tui-animate-when-focus` | `:focus-visible` |
| `.tui-animate-when-playing` | `data-playing` or `.tui-playing` |

Hover is the one state that does not count on every ancestor: while the pointer is anywhere on the page every ancestor up to `html` is hovered, so an unmarked parent would play every child at once. Mark the parent `.tui-animate-host` and hovering it plays the gated elements inside it — which is also how a moving element gets a still target, since one that slides away from under the pointer would lose its hover and restart.

## Ripple to relatives

Because a state counts on an ancestor or an earlier sibling, one element can animate another without a class of its own: a state input drives the label after it, a focused field drives the hint after it, a hovered `.tui-animate-host` card drives the badge inside it, an open `<details>` drives everything in its body.

{% include demo.html file="ripple.html" %}

For any other relative, a cousin say, the keyframe names are public. One line of your own CSS on a `.tui-animate` element does it:

```css
.signup:has(#agree:checked) .welcome { animation-name: tui-tada; }
```

## Stagger

`.tui-stagger` gives each child its index in `--tui-i`, counted from zero with `sibling-index()`, and delays each child's animation by that index times `--tui-stagger-step`. Gate the children on an ancestor state and the chain replays every time the state returns.

{% include demo.html file="stagger.html" %}

| Class | Effect |
|---|---|
| `.tui-stagger` | Every child gets `--tui-i` and `animation-delay: calc(var(--tui-i) * var(--tui-stagger-step))` |

| Property | Default | Effect |
|---|---|---|
| `--tui-stagger-step` | `--tui-duration-normal` × 0.24 = `60ms` | Delay between one child and the next; set it on `.tui-stagger` |
| `--tui-i` | `sibling-index() - 1` | A child's index, registered as an integer; an inline `style="--tui-i: 7"` overrides it |
| `--tui-animate-distance` | `1rem` | How far a slide or fly starts from its resting place |
| `--tui-animate-strength` | `1` | Multiplies the distance, tilt and growth of shake, bounce, jiggle, pulse and tada |
| `--tui-animate-from` | `0` | Where a count starts |
| `--tui-animate-to` | `100` | Where a count ends |
| `--tui-animate-value` | `0` | The counted number, registered as an inherited `<number>`; read it, don't set it |

Only `animation-delay` is set, so hover and focus transitions inside the list stay immediate. `--tui-i` is readable on every child for your own chains:

```css
.tui-stagger > * { transition-delay: calc(var(--tui-i) * 60ms); }
```

> **Browser note.** `sibling-index()` is Chrome 138+. Elsewhere `--tui-i` keeps its initial 0 and the children move together, and an inline `--tui-i` works everywhere. See [Browser Support](/ui/getting-started/browser-support/).

## Reduced motion

Under `prefers-reduced-motion: reduce` the [accessibility theme](/ui/themes/accessibility/) collapses every duration to 0.01ms and every loop to a single run, and the stagger drops its delays too, so a list appears at once instead of waiting out a chain it will not show. `.tui-motion-none` on any ancestor is the manual switch.

Related: [Motion](/ui/foundations/motion/) · [Self-driven JS](/ui/foundations/self-driven-js/) · [State Inputs](/ui/foundations/state-inputs/) · [Collapse](/ui/interactive/collapse/) · [Toast](/ui/components/toast/) · [Visual](/ui/utilities/visual/) · [Accessibility](/ui/themes/accessibility/) · [Browser Support](/ui/getting-started/browser-support/)
