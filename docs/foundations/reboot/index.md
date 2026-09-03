---
title: Reboot
section: foundations
source: src/10-reboot/reboot.css
description: "The small reset that makes unclassed HTML consistent: box-sizing, root size, body defaults, selection, media, form inheritance and the focus ring."
---

The reboot is the second cascade layer and the only place the framework touches bare elements globally. It is deliberately small — a handful of rules that remove browser inconsistencies and wire the base elements to the tokens — so that plain HTML already looks right before any `.tui-*` class is added. Element styling proper (headings, links, lists, tables) lives in the elements layer.

## What it sets

| Selector | Effect |
|---|---|
| `*, *::before, *::after` | `box-sizing: border-box` everywhere |
| `html` | `font-size: var(--tui-root-size)` — the density knob; `text-size-adjust: 100%` so mobile browsers do not inflate text; `line-height: var(--tui-leading-normal)`; antialiased font smoothing |
| `body` | Zero margin; `--tui-font-sans`, `--tui-text-base`, `--tui-font-normal`, `--tui-leading-normal`; `--tui-text-1` on `--tui-surface-0` — the two tokens that make the page flip with the colour scheme |
| `::selection` | Brand at 30% behind `--tui-text-1`, so selected text stays readable in either scheme |
| `img, picture, video, canvas, svg` | `display: block` and `max-inline-size: 100%` — media never overflows its container or sits on a text baseline |
| `input, button, textarea, select` | `font: inherit; color: inherit` — form controls take the surrounding type instead of the browser's |
| `p` | Margin reset to `0`; the elements layer and components re-apply spacing where it belongs |
| `ul, ol` | Margin and padding reset to `0`; the lists element file owns list styling |
| `:focus-visible` | `var(--tui-focus-ring-width)` (2px) solid `var(--tui-focus-ring-strong)` outline with a 2px offset — the one focus ring every focusable element shares |

Because paragraphs and lists lose their default margins here, components space their children with `gap` instead, which is why nothing in the framework carries an outer margin.

## The classless baseline

Nothing below has a class. Headings, paragraphs, a list, a link, a button and an input all come from the reboot plus the elements layer.

{% include demo.html file="classless.html" %}

Related: [Typography](/ui/elements/typography/) · [Lists](/ui/elements/lists/) · [Links](/ui/elements/links/) · [Typography Scale](/ui/foundations/typography-scale/) · [Cascade Layers](/ui/getting-started/layers/)
