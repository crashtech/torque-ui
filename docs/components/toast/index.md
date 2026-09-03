---
title: Toast
section: components
source: src/30-components/toast.css
js: self-driven
description: "Fixed notification banner at the bottom end of the viewport, dismissible and self-dismissing without JavaScript."
---

A toast is a fixed-position notification that slides in at the bottom end of the viewport. It is a plain flex row — an optional icon, a content column, and whatever you put after it, such as a close control — so it needs no JavaScript to show, stack, dismiss, or time out.

## Anatomy

`.tui-toast-icon` is a small round slot painted with the tone; `.tui-toast-content` holds a `.tui-toast-title` and a `.tui-toast-desc`. A toned toast (`.tui-toast-success`, `-error`, `-warning`, `-info`) gets a 4px accent on its start edge; an untoned one keeps a uniform border. A lone toast is `position: fixed` (inside a `.tui-toast-stack` the stack is fixed instead and the toasts flow in it), so this demo runs in its own frame.

{% include demo.html file="tones.html" frame=true height="16rem" %}

## Stack

Several toasts inside a `.tui-toast-stack` are laid out by the stack, bottom end of the viewport, with consistent spacing — no per-toast positioning maths.

{% include demo.html file="stack.html" frame=true height="20rem" %}

## Appending from a script <span class="tui-badge">self-driven JS</span>

The stack is the mount point: give it `aria-live="polite"` and append a `.tui-toast` to it from your code — the toast plays its entry fade and slide on insertion, and the stack lays it out. Remove the element to dismiss it, or leave `.tui-toast-auto` to do so.

{% include demo.html file="mount.html" %}

## Dismissing

The shared [close mechanism](/ui/components/close/) works here: a `.tui-state-input.tui-dismiss` checkbox followed by a `.tui-close` label removes the toast when checked. Add `.tui-toast-auto` for a toast that dismisses itself after `--tui-toast-delay` (5s by default) through a delayed, forwards-filling animation.

{% include demo.html file="dismiss.html" frame=true height="16rem" %}

> **Reduced motion.** The global `prefers-reduced-motion: reduce` rule shortens every animation to near zero, which would make an auto-dismissing toast vanish before it could be read. Under that preference the auto-dismiss animation is disabled entirely: the toast stays until the user closes it.

| Class | Effect |
|---|---|
| `.tui-toast` | The surface: bordered, `--tui-radius-lg`, `--tui-shadow-lg`; fixed to the viewport corner when outside a stack |
| `.tui-toast-stack` | Fixed grid of toasts in the viewport corner with a `--tui-spacing-2` gap; the toasts inside flow normally |
| `.tui-toast-icon` | 1.5rem round tone-painted slot for a glyph |
| `.tui-toast-content` | The text column holding title and description |
| `.tui-toast-title` / `.tui-toast-desc` | `--tui-text-sm` semibold / `--tui-text-xs` in `--tui-text-2` |
| `.tui-toast-success` / `-error` / `-warning` / `-info` | Tone aliases; a 4px accent on the start edge |
| `.tui-toast-auto` | Dismisses itself after `--tui-toast-delay`, no JavaScript |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-toast-delay` | `5s` | How long a `.tui-toast-auto` stays before dismissing itself |

Related: [Alert](/ui/components/alert/) · [Close](/ui/components/close/) · [Tone](/ui/foundations/tone/)
