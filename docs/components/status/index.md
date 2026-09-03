---
title: Status
section: components
source: src/30-components/status.css
description: "Coloured dot with an optional label for live state — online, away, busy — and a pulsing variant for anything happening right now."
---

A status is a `.tui-status-dot` next to a word: the dot is a 0.5rem circle coloured by the shared `--tui-tone` hook, the wrapper `.tui-status` is an inline-flex row in `--tui-text-sm` medium `--tui-text-2` text with a `--tui-spacing-2` gap. Neither carries an outer margin, so status pills sit naturally in a sentence, a table cell or a flex row.

## Tones

The state names are aliases of the generic [tone classes](/ui/foundations/tone/): `.tui-status-online` and `.tui-status-done` set the positive tone, `.tui-status-busy` and `.tui-status-error` the negative tone, `.tui-status-away` the warning tone. There is deliberately no class for offline, to-do or cleared: an untoned dot already shows the neutral default, `--tui-neutral-400`. Any `.tui-tone-*` (brand, info, neutral) works on the wrapper or the dot as well.

{% include demo.html file="tones.html" %}

| Class | Effect |
|---|---|
| `.tui-status` | Inline-flex wrapper, `--tui-text-sm` medium, `--tui-spacing-2` gap |
| `.tui-status-dot` | 0.5rem circle, `--tui-tone` or `--tui-neutral-400`, never shrinks |
| `.tui-status-online`, `.tui-status-done` | Positive (green) |
| `.tui-status-busy`, `.tui-status-error` | Negative (red) |
| `.tui-status-away` | Warning (amber) |
| *(none)* | Offline, to-do, cleared: the neutral default |
| `.tui-status-pulse` | Pulsing halo on the dot |

## Dot on its own

`.tui-status-dot` is `inline-block` and vertically centred, so it works without the wrapper — put the tone class straight on the dot inside table cells, tree rows or running text. On an [avatar](/ui/components/avatar/), `.tui-avatar-status` pins the same dot to the corner.

{% include demo.html file="dot.html" %}

## Pulse

`.tui-status-pulse` on the wrapper animates its dot with an expanding halo every `--tui-duration-slower` — a live or recording indicator. The halo is drawn in the positive colour whatever the tone, so it reads best on an online or done status.

{% include demo.html file="pulse.html" %}

> **Reduced motion.** The global `prefers-reduced-motion: reduce` rule cuts the animation to a single near-instant iteration, so a pulsing dot renders as a plain dot.

Related: [Avatar](/ui/components/avatar/) · [Badge](/ui/components/badge/) · [Label](/ui/components/label/) · [Tone](/ui/foundations/tone/)
