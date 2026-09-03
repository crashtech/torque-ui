---
title: App Shell
section: layout
source: src/40-layout/shell.css
description: "A header / sidebar / main / aside / footer grid with a sticky header and side columns that scroll with the page and park at its end from 768px."
---

`.tui-shell` lays out an application frame in a single grid: a sticky `.tui-shell-header`, an optional `.tui-shell-sidebar`, a `.tui-shell-main`, an optional `.tui-shell-aside` on the end side and a `.tui-shell-footer`. The columns exist only from 768px up; below that the sidebar and aside are hidden and their content is expected to live in an [Offcanvas](/ui/interactive/offcanvas/) opened from a button in the header. The shell is `min-block-size: 100dvh`, so as the direct child of `<body>` it fills the viewport; every demo here runs in its own frame, whose height stands in for the viewport.

## Basic shell

The grid areas are `header / main / footer` in one column, and `header header / sidebar main / footer footer` once a `.tui-shell-sidebar` is a direct child and the viewport is 768px or wider. The header is `position: sticky` at `--tui-z-sticky` on `--tui-surface-0` with a bottom rule (and the page gains `scroll-padding-block-start`, so a followed anchor never hides its heading under the bar); the sidebar sits on `--tui-surface-1` with an end rule and scrolls with the page: a sidebar shorter than the viewport stays pinned under the header, a taller one moves with the content until its last item reaches the viewport's end and parks there, so it never scrolls on its own and the row it shares with `.tui-shell-main` grows to whichever of the two is taller; `.tui-shell-main` takes `--tui-spacing-6` padding and `min-inline-size: 0` so wide content scrolls inside it instead of stretching the column; the footer gets a top rule and `--tui-text-3`. The header already draws the rule and the elevation, so a `.tui-navbar` that is a direct child of `.tui-shell-header` drops its own bottom border, shadow and background — put it straight inside the header, not in a wrapper. Widen the frame to at least 768px to see the sidebar column; below that the menu button opens the same links in an offcanvas.

{% include demo.html file="basic.html" frame=true height="24rem" %}

## Header without columns

A shell with neither a sidebar nor an aside keeps the single-column template at every width, so a plain page can still use the sticky header and the footer. Scroll the frame: the header stays put.

{% include demo.html file="header-only.html" frame=true height="24rem" %}

## With an aside

Add a `.tui-shell-aside` as a direct child and the shell becomes `sidebar | main | aside`, the aside sized by `--tui-shell-aside-inline-size`. It scrolls with the page like the sidebar, and hides below 768px the same way. An aside without a sidebar lays out as `main | aside`.

{% include demo.html file="aside.html" frame=true height="24rem" %}

## Self-scrolling columns

`.tui-shell-scroll` on a sidebar or aside opts it out of following the page: the column sticks below the header, is capped to the viewport and scrolls on its own, keeping a footer's worth of end padding so its last item can always scroll clear of the footer. Reach for it when a column is a tool rail that should stay in reach whatever the page does; leave it off for navigation, whose top should be where the page starts. Scroll the frame: the sidebar stays put and scrolls inside, the aside rides along with the page.

{% include demo.html file="scroll.html" frame=true height="24rem" %}

## Persistent columns

`.tui-shell-persistent` applies the same column templates and sticky behaviour unconditionally, keeping the sidebar and aside at every width — for desktop-only tools that ship no offcanvas fallback. The columns keep their token widths, so narrow layouts are the application's responsibility.

{% include demo.html file="persistent.html" frame=true height="24rem" %}

| Class | Effect |
|---|---|
| `.tui-shell` | The grid; `min-block-size` of `100dvh` |
| `.tui-shell-header` | Sticky top row on `--tui-surface-0` with a bottom rule |
| `.tui-shell-sidebar` | Start column from 768px, scrolls with the page and parks at its end, hidden below |
| `.tui-shell-main` | Padded content area that never grows past its column |
| `.tui-shell-aside` | End column from 768px, scrolls with the page and parks at its end, hidden below |
| `.tui-shell-footer` | Bottom row: `--tui-border` top rule, text in `--tui-text-3` |
| `.tui-shell-persistent` | Keeps sidebar and aside at every width |
| `.tui-shell-scroll` | On a sidebar or aside: sticks below the header and scrolls on its own |

The scroll-linked `.tui-shell-header-shrink` modifier, which compresses the header over the first stretch of page scroll, is documented with the other scroll-driven helpers on the [Scroll](/ui/utilities/scroll/) page.

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-shell-min-block-size` | `100dvh` | Minimum height of the shell; set to `100%` to fill a sized box instead of the viewport |
| `--tui-shell-sidebar-inline-size` | `16rem` | Width of the sidebar column |
| `--tui-shell-aside-inline-size` | `18rem` | Width of the aside column |
| `--tui-shell-header-block-size` | `4rem` | Height of the header, which the shell reserves above its columns; match it to a taller header, and set it to `0px` in a shell with no header |

Related: [Navbar](/ui/components/navbar/) · [Offcanvas](/ui/interactive/offcanvas/) · [List Group](/ui/components/list-group/) · [Scroll](/ui/utilities/scroll/) · [Split Pane](/ui/layout/split/)
