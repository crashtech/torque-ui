---
title: Composer
section: components
source: src/30-components/composer.css
description: "Message-entry frame with a toolbar, an auto-growing textarea and a footer, focus ring on the frame rather than the field."
---

A composer is the box you type a message in: a toolbar above, a footer with the send button below, and a `<textarea>` between them that grows with its content. The frame owns the border and the focus ring; the textarea inside is bare, so the whole box lights up when the field is focused. It carries no outer margin.

## Anatomy

`.tui-composer` is a vertical flex column on `--tui-surface-0` with a `--tui-border` edge and `--tui-radius-lg` corners. `.tui-composer-toolbar` and `.tui-composer-footer` are space-between flex rows with `--tui-spacing-2` padding and gap, separated from the field by a rule; each takes any two groups of controls. The `textarea.tui-composer-input` drops its own border, background, shadow, radius and focus ring, is `resize: none`, and sizes itself to its content between a 3rem minimum and `--tui-composer-max-block-size`, after which it scrolls.

{% include demo.html file="basic.html" %}

| Class | Effect |
|---|---|
| `.tui-composer` | Frame: border, radius, surface, focus ring on `:focus-within` |
| `.tui-composer-toolbar` | Top row, bottom rule |
| `.tui-composer-input` | Bare, auto-growing textarea |
| `.tui-composer-footer` | Bottom row, top rule |

> **Browser note.** Auto-growing relies on `field-sizing: content`, which Chrome 123 and Safari 26 support but Firefox does not. There the textarea keeps the height given by its `rows` attribute (never below 3rem) and scrolls internally; everything else renders the same.

## Growth limit

`--tui-composer-max-block-size` caps how tall the field grows before it starts scrolling. Set it on the composer to fit the surrounding layout — a chat panel wants a low cap, a ticket reply a tall one.

{% include demo.html file="limit.html" %}

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-composer-max-block-size` | `12rem` | Maximum height of `.tui-composer-input` before it scrolls |

Related: [Inputs](/ui/forms/inputs/) · [Buttons](/ui/components/buttons/) · [Chip](/ui/components/chip/) · [Input Group](/ui/forms/input-group/)
