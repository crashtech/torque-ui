---
title: Select
section: forms
source: src/50-forms/select.css
js: self-driven
description: "Native select with a tokenised chevron, an opt-in customisable picker with icon options, the datalist combobox, and the script-driven combobox with search and tags."
---

A bare `<select>` already looks like every other field, with the native arrow replaced by a tokenised chevron. `.tui-select-rich` opts a select into the browser's customisable picker where it exists — icon options included — and an `<input list>` with a `<datalist>` gives a zero-JavaScript combobox. None of them needs a wrapper. Search, multi-select with tags and icon options everywhere are the [combobox](#combobox-self-driven-js) below: a field the framework styles and your script drives.

## Bare select

The base field rule in [Inputs](/ui/forms/inputs/) matches `<select>` too, then removes the native appearance and paints `--tui-icon-chevron` at the end edge with `--tui-spacing-8` of end padding to keep the text clear of it. The chevron moves to the left in `:dir(rtl)` documents. A `disabled` select dims like a disabled input.

{% include demo.html file="bare.html" %}

## Rich select

Add `.tui-select-rich` to opt a `<select>` into the customisable select feature (`appearance: base-select`). The bare-select chevron background is dropped (the feature renders its own indicator) and the end padding relaxes to `--tui-spacing-3`. The open picker becomes a `--tui-surface-0` panel with a `--tui-border` outline, `--tui-radius-md` corners and `--tui-shadow-lg`; options get `--tui-spacing-2` / `--tui-spacing-3` padding and `--tui-radius-sm` corners, the checked option sits on `--tui-brand-soft`, and the `::checkmark` glyph is a plain tick. The rules live inside `@supports (appearance: base-select)`, so elsewhere the class is inert and the select renders natively.

{% include demo.html file="rich.html" %}

> **Browser note.** Customisable select is Chrome/Edge 134+ only, above the framework's Chrome 123 floor. Safari and Firefox show the native picker.

| Selector | Effect |
|---|---|
| `.tui-select-rich` | Opts the select and its `::picker(select)` into `appearance: base-select` |
| `.tui-select-rich::picker(select)` | Panel: `--tui-surface-0`, `--tui-border`, `--tui-radius-md`, `--tui-shadow-lg` |
| `.tui-select-rich option` | Padded, `--tui-radius-sm` rows |
| `.tui-select-rich option:checked` | `--tui-brand-soft` background |
| `.tui-select-rich::checkmark` | Tick glyph on the selected option |

## Icon options

With `.tui-select-rich` an `<option>` may hold an icon before its text: the option is a flex row with a `--tui-spacing-2` gap, so a `.tui-icon` and the label align. Put a `<button>` with a `<selectedcontent>` as the select's first child and the closed control mirrors the chosen option, icon and all — the browser clones the option's content into it, so nothing is duplicated in the markup.

{% include demo.html file="icons.html" %}

> **Browser note.** `<selectedcontent>` ships with customisable select (Chrome 134+). Elsewhere the button is ignored and the native picker shows the option text alone.

## Datalist combobox

Pair a text input's `list` attribute with a `<datalist>` whose `id` matches for a native combobox: the user can type freely or pick from keyboard-navigable suggestions. The dropdown indicator Chromium adds is replaced with the `--tui-icon-chevron` glyph through `::-webkit-calendar-picker-indicator`; other engines show no indicator until the field is focused.

{% include demo.html file="datalist.html" %}

## Combobox <span class="tui-badge">self-driven JS</span>

`.tui-combobox` is the field a script turns into a searchable select. The wrapper carries the field border, hover and focus ring (`:focus-within`) and paints the chevron at the end edge; inside it sits a `.tui-combobox-input` with `role="combobox"`, stripped of its own border so the whole thing stands as tall as any other field. The [listbox](/ui/interactive/listbox/) that follows is the dropdown. With `popover` on it, `showPopover()` opens it hanging off the field at the field's width (the field is the anchor, so an input can open it too), Escape and a click outside close it, and the chevron turns while the trigger says `aria-expanded="true"`.

{% include demo.html file="combobox.html" %}

## Picker button <span class="tui-badge">self-driven JS</span>

For a select that is not typed into, the trigger is a `.tui-combobox-value` button. It fills the field, starts its text, shows an icon through the same flex gap, and shows its `data-placeholder` while empty. Because it is a button, `popovertarget` opens the listbox with no script at all; only choosing an option needs code. A `.tui-listbox-search` row pins a filter field to the top of the list.

{% include demo.html file="picker.html" %}

## Tags <span class="tui-badge">self-driven JS</span>

`.tui-combobox-tags` turns the wrapper into a wrapping row of `.tui-chip` tokens and the input, which takes whatever width is left on the last row. Each chip carries a `.tui-close` button your script wires to removal. With a listbox after it and `aria-multiselectable="true"` the options show box ticks; without one it is a free-text tags input.

{% include demo.html file="tags.html" %}

## In flow <span class="tui-badge">self-driven JS</span>

Nothing depends on `popover`. A `.tui-listbox` without it sits absolutely under the field, at the field's width and above sticky chrome (`--tui-z-dropdown`), and toggles with the `hidden` attribute — for a script that manages its own dismiss, or a browser floor without anchor positioning.

{% include demo.html file="inflow.html" %}

| Class | Effect |
|---|---|
| `.tui-combobox` | Field wrapper: border, hover, `:focus-within` ring, end-edge chevron that turns under an expanded child |
| `.tui-combobox-input` | The `role="combobox"` input, borderless inside the wrapper |
| `.tui-combobox-value` | `<button>` trigger: fills the field, starts its text, shows `data-placeholder` while empty |
| `.tui-combobox-tags` | Wrapping row of `.tui-chip` tokens and the input |
| `.tui-combobox > [popover].tui-listbox` | Anchored to the field, `anchor-size(width)` wide |
| `.tui-combobox > .tui-listbox:not([popover])` | Absolute under the field at `--tui-z-dropdown`; toggle with `hidden` |

## What your script does

- Opens and closes the list (`showPopover()` / `hidePopover()`, or `hidden`) and mirrors that into `aria-expanded` on the trigger — the popover's `toggle` event is the place. Open on click or on typing, not on focus: the input sits outside the popover, so the click that focuses it would light-dismiss a list opened on focus.
- Filters by setting `hidden` on options; the empty row shows itself.
- Moves `aria-selected` and `data-active`, writes the chosen text into the input or button, adds and removes chips.
- Mirrors the value into the form: a hidden `<input>`, or a hidden `<select multiple>` for tags.

> **Browser note.** Anchoring the popover list to the field needs anchor positioning (Chrome 125 / Safari 26); below that the popover list falls back to the bottom sheet every popover gets, and the in-flow variant is the alternative. `field-sizing` is not involved: the tag input flexes.

Related: [Inputs](/ui/forms/inputs/) · [Input Group](/ui/forms/input-group/) · [Form Layout](/ui/forms/form-layout/) · [Listbox](/ui/interactive/listbox/) · [Chip](/ui/components/chip/) · [Menu](/ui/interactive/menu/) · [Self-driven JS](/ui/foundations/self-driven-js/)
