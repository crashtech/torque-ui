---
title: Container
section: layout
source: src/40-layout/container.css
description: "Centred page wrappers: a viewport-tiered container, a fluid one, and three fixed content widths."
---

A container centres its content and pads it by `--tui-spacing-4` on each side. `.tui-container` steps its maximum width up with the viewport; `.tui-container-fluid` is always full width; `.tui-container-sm`, `-md` and `-lg` are content-sized and ignore the viewport altogether. Containers carry no vertical spacing — pair them with a [Section](/ui/layout/section/) for that.

## Responsive container

`.tui-container` is `inline-size: 100%` with `margin-inline: auto`, and gains a `max-inline-size` at each breakpoint: 480px from 480px up, 720px from 768px, 960px from 1024px, 1200px from 1280px and 1440px from 1536px. Inside this docs column it is capped by the column, so resize the window to see the tiers on a real page.

{% include demo.html file="responsive.html" %}

## Fluid container

`.tui-container-fluid` keeps the centring and the side padding but never caps the width.

{% include demo.html file="fluid.html" %}

## Fixed-width containers

`.tui-container-sm` (28rem), `.tui-container-md` (40rem) and `.tui-container-lg` (56rem) are for a login card, a settings column or a reading measure that should stay narrow on a wide screen. They centre themselves like the others.

{% include demo.html file="fixed.html" %}

| Class | Max width |
|---|---|
| `.tui-container` | 480 / 720 / 960 / 1200 / 1440px at 480 / 768 / 1024 / 1280 / 1536px |
| `.tui-container-fluid` | 100% |
| `.tui-container-sm` | 28rem |
| `.tui-container-md` | 40rem |
| `.tui-container-lg` | 56rem |

Related: [Section](/ui/layout/section/) · [Grid](/ui/layout/grid/) · [Sizing](/ui/utilities/sizing/) · [Spacing](/ui/foundations/spacing/)
