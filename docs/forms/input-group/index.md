---
title: Input Group
section: forms
source: src/50-forms/input-group.css
description: "Joins an addon, a field and a button into one control with a single outer radius."
---

`.tui-input-group` is a flex row whose children — a static `.tui-input-addon`, an `<input>` or `<select>`, a button — lose their own corner radius and overlap borders by 2px, so they read as one control with a single outer radius. It is a plain container: put anything inside it that has a 2px border and it joins the row.

## Addon and button

The first child keeps the start corners and the last child the end corners; the group's radius is inherited by both. An `<input>` or `<select>` inside the group grows to fill the remaining width. When a child is keyboard-focused (`:focus-visible`) it is raised above its neighbours so its focus ring is not cut off by the next border.

{% include demo.html file="leading.html" %}

## Trailing addon

`.tui-input-addon` is an inline-flex, vertically centred label on `--tui-input-addon-bg` (`--tui-surface-2`) with `--tui-text-2` text and the same 2px border as a field; it works on either side of the control, or on both.

{% include demo.html file="trailing.html" %}

## Select in a group

A `<select>` is treated like an input — it flexes to fill and keeps its chevron — so a unit or currency picker can sit next to the number it qualifies.

{% include demo.html file="select.html" %}

| Class | Effect |
|---|---|
| `.tui-input-group` | Flex row; children lose their radius and overlap borders; first and last child inherit the group's corners |
| `.tui-input-addon` | Static prefix or suffix label, bordered, on `--tui-input-addon-bg` |

## Custom properties

| Property | Default | Effect |
|---|---|---|
| `--tui-input-group-radius` | `--tui-radius-md` | Outer radius of the joined control |
| `--tui-input-addon-bg` | `--tui-surface-2` | Background of `.tui-input-addon` |

Related: [Inputs](/ui/forms/inputs/) · [Buttons](/ui/components/buttons/) · [Select](/ui/forms/select/) · [Search](/ui/forms/search/)
