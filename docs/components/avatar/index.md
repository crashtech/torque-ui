---
title: Avatar
section: components
source: src/30-components/avatar.css
description: "Circle or rounded-square image and initials tiles, with sizes, a fixed palette, overlapping groups and a status corner."
---

An avatar is a fixed-size circle holding either an `<img>` or a short text such as initials. The circle clips whatever it holds, keeps its size in a flex row and wears a 2px `--tui-surface-0` border with a small shadow so it lifts off any background. It carries no outer margin: space avatars with `gap`.

## Sizes

The default avatar is 3rem with `--tui-text-sm` initials. Four modifiers change the box and the font size together; the class works the same on an image or a text tile.

{% include demo.html file="sizes.html" %}

| Class | Size | Initials |
|---|---|---|
| `.tui-avatar-sm` | 2rem | `--tui-text-xs` |
| `.tui-avatar-md` | 2.5rem | `--tui-text-sm` |
| `.tui-avatar` | 3rem | `--tui-text-sm` |
| `.tui-avatar-lg` | 4rem | `--tui-text-lg` |
| `.tui-avatar-xl` | 6rem | `--tui-text-2xl` |

## Square

`.tui-avatar-square` swaps the circle for `--tui-radius-md` corners — the shape for logos, workspaces and product tiles rather than people.

{% include demo.html file="square.html" %}

## Palette

`.tui-avatar-1` to `.tui-avatar-6` paint the six fixed `--tui-avatar-1…6` hues with `--tui-text-inverse` text. They are deliberately not theme-dependent, so a person keeps the same colour in light and dark mode; the app picks the class, for example by hashing the name.

{% include demo.html file="palette.html" %}

| Class | Token |
|---|---|
| `.tui-avatar-1` | `--tui-avatar-1` (blue) |
| `.tui-avatar-2` | `--tui-avatar-2` (orange) |
| `.tui-avatar-3` | `--tui-avatar-3` (teal) |
| `.tui-avatar-4` | `--tui-avatar-4` (magenta) |
| `.tui-avatar-5` | `--tui-avatar-5` (olive) |
| `.tui-avatar-6` | `--tui-avatar-6` (purple) |

## Group

Wrap sibling avatars in `.tui-avatar-group` to overlap them. Each avatar swaps its drop shadow for a 2px ring in `--tui-avatar-ring` and every avatar after the first is pulled back by `--tui-avatar-overlap`. Both are hooks you can set inline or on a parent.

{% include demo.html file="group.html" %}

## Status and badge

`.tui-avatar-status` is a relative inline wrapper: put an avatar in it, then a `.tui-status-dot` (toned with `.tui-status-online`, `-busy`, `-away` or any `.tui-tone-*`) and the dot is pinned to the bottom end corner with a surface-coloured ring. `.tui-avatar-badge` fills the same slot with a 1rem glyph badge — a channel, a role, an origin — and takes its background from the tone hook, falling back to neutral.

{% include demo.html file="status.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-avatar-ring` | `var(--tui-surface-0)` | Ring colour around each avatar in a `.tui-avatar-group` |
| `--tui-avatar-overlap` | `var(--tui-spacing-2)` | How far each grouped avatar overlaps the previous one |

Related: [Status](/ui/components/status/) · [Badge](/ui/components/badge/) · [Media Object](/ui/layout/media/) · [Colors](/ui/foundations/colors/) · [Images](/ui/elements/images/)
