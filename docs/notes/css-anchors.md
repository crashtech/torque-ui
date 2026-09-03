# CSS Anchors — Anchor Positioning API

## Overview

CSS Anchors (Anchor Positioning API) allows elements to be positioned relative to other elements on the page using pure CSS — no JavaScript required. It establishes a reference frame between an "anchor" element and a "popper" element, enabling tooltips, popovers, dropdowns, and menus to be positioned without JS.

**Status: shipped and in use.** Support is Chrome 125+ / Safari 26+ (Firefox in progress). Torque UI already uses it, behind `@supports (anchor-name: --x)`, in `src/60-interactive/tooltip.css` and `src/60-interactive/popover.css` (which backs the popover/menu component) — an anchored placement above the floor, a fixed-position fallback at or below it. Offcanvas and modal are full-viewport/edge-docked by design and do not need anchoring. This remains the single most impactful modern CSS feature for Torque UI's zero-JS philosophy.

## Syntax

### Defining an Anchor

```css
.anchor-target {
  anchor-name: --my-trigger;
}
```

### Positioning to an Anchor

```css
.popper {
  position: absolute;
  position-anchor: --my-trigger;
  top: anchor(bottom);
  left: anchor(left);
  /* or: */
  inset: anchor(align);
}
```

### Named Spans (for dynamic sizing)

```css
.anchor-target {
  anchor-name: --my-trigger;
}

.popper {
  position: absolute;
  position-area: bottom left;
  position-try: --fallback-top;
  width: anchor-size(inline-size);
  height: anchor-size(block-size);
}
```

### Fallbacks with position-try

```css
.popper {
  position: absolute;
  position-area: bottom left;
  position-try:
    --fallback-top,
    --fallback-bottom-right;
}

@position-try-option --fallback-top {
  position-area: top left;
}

@position-try-option --fallback-bottom-right {
  position-area: bottom right;
}
```

## What CSS Anchors Enables in Torque UI

| Component | Status | Detail |
|---|---|---|
| **Tooltips** | ✅ Implemented | `anchor-name` on the trigger, `position-anchor` + `position-area` + `justify-self: anchor-center` on `.tui-tooltip`, `position-try-fallbacks` to flip when it would overflow the block-start. Fixed above the trigger below the floor. |
| **Popovers / Menus** | ✅ Implemented | Same pattern on `.tui-popover`, anchored to `[popovertarget]`. Falls back to a bottom sheet with a dimmed backdrop below the floor. |
| **Dropdowns** | — | Dropdown is the same component as popover/menu above — see there. |
| **Pickers (date/time)** | Fixed popup position | Position relative to input; adapt to screen space |
| **Popups** | Manual positioning | Anchor to any element; dynamic sizing via `anchor-size()` |
| **Flyouts** | Fixed offset | Position relative to parent; clip-aware |
| **Context Menus** | Absolute viewport positioning | Anchor to right-click target; flip when near edges |
| **Labels** | Manual offset | Anchor to form input; follow input position |
| **Toasts/Notifications** | Fixed corner placement | Anchor to notification target; slide from anchor |
| **Badges (dynamic)** | Manual offset | Anchor to icon/button; reflow on resize |
| **Help Bubbles** | Fixed offset | Anchor to help icon; flip based on viewport |
| **Floating Labels** | Manual positioning | Anchor to input; slide to correct position |

## Browser Support

| Feature | Chrome | Safari | Firefox |
|---|---|---|---|
| `anchor-name` | 125+ | 26+ | In progress |
| `position-anchor` | 125+ | 26+ | In progress |
| `position-area` | 125+ | 26+ | In progress |
| `position-try-fallbacks` | 125+ | 26+ | In progress |
| `anchor-center` | 125+ | 26+ | In progress |
| `anchor()` function | 125+ | 26+ | In progress |
| `anchor-size()` | 125+ | 26+ | In progress |

**Verdict**: shipped in Chrome and Safari; Torque UI's floor (Chrome 123–124, Safari 17.5, all current Firefox) does not have it, so every use is wrapped in `@supports (anchor-name: --x)` with a static fallback — never used unconditionally.

## Implementation Strategy (as built)

Torque UI uses the real shipped syntax — `position-area` + `position-try-fallbacks` + `anchor-center` — not the earlier `anchor()`/`position: anchor`/`@position-try-option` proposal shown in the API reference below (still documented there since it's part of the spec, but the library doesn't use it). The pattern, from `src/60-interactive/tooltip.css`:

```css
.tui-tooltip-host > [aria-describedby] { anchor-name: --tui-tip; }

@supports (anchor-name: --x) {
  .tui-tooltip {
    position: fixed;
    position-anchor: --tui-tip;
    position-area: block-start;
    justify-self: anchor-center;
    position-try-fallbacks: flip-block;
  }
}
```

Below the floor, the `@supports` block never applies and the component keeps its static, non-anchored fallback position — declared unconditionally earlier in the same file.

Remaining candidates not yet anchored: date/color pickers, badges positioned relative to a parent, context menus.

## Key API Reference

### `anchor-name`
Sets a CSS anchor element. Multiple anchors can share a name (like a group).

```css
.trigger {
  anchor-name: --menu;
}
```

### `anchor()` function
Returns the position or size of an anchor element.

```css
top: anchor(top);           /* Top edge of anchor */
left: anchor(left);         /* Left edge of anchor */
bottom: anchor(bottom);     /* Bottom edge of anchor */
right: anchor(right);       /* Right edge of anchor */
center: anchor(center);     /* Center of anchor */
start: anchor(start);       /* Logical start edge */
end: anchor(end);            /* Logical end edge */
size: anchor-size(inline-size); /* Dynamic width/height */
```

### `position-anchor`
Declares which anchor to use for positioning.

```css
.popper {
  position-anchor: --menu;
}
```

### `position-area`
Defines which area of the anchor to position in.

```css
position-area: bottom left;   /* Bottom-left quadrant */
position-area: top right;     /* Top-right quadrant */
position-area: bottom;        /* Below anchor, full width */
position-area: left center;   /* Left of anchor, vertically centered */
```

### `position-try`
Defines fallback positioning areas.

```css
position-try:
  --fallback-top,
  --fallback-right,
  flip-block;
```

### `@position-try-option`
Defines a named fallback position.

```css
@position-try-option --fallback-top {
  position-area: top center;
  offset-block: 4px;
}
```

## Use Cases for Torque UI

1. **Tooltips**: `position-area: bottom center` with `flip-block` fallback
2. **Dropdowns**: `position-anchor` to trigger, `anchor-size(inline-size)` for width
3. **Popovers**: `position-area` with `position-try` for viewport-aware positioning
4. **Pickers**: `anchor()` for precise positioning relative to input
5. **Context menus**: `anchor()` + `position-area` for dynamic placement
6. **Badges**: `anchor()` for offset positioning relative to icons/buttons

## References

- MDN: [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor_positioning)
- Chrome Dev: [Anchor Positioning](https://developer.chrome.com/docs/web-platform/anchor-positioning)
- WICG Spec: [CSS Anchor Positioning](https://github.com/WICG/anchor-positioning)
- Can I Use: [CSS Anchor Positioning](https://caniuse.com/mdn-css_properties_anchor-name)
