const form = document.getElementById('playground')
const fields = form.elements
const root = document.documentElement.style
const stack = document.querySelector('[data-toasts]')
const logos = document.querySelectorAll('img[data-logo]')
const placeholderLogo = logos[0].getAttribute('src')
const swatches = document.querySelector('[data-swatches]')

const SAVED = ['brand', 'brandEnd', 'angle', 'neutralH', 'neutralC', 'pivot', 'sansUrl', 'sans', 'monoUrl', 'mono', 'textBase', 'tracking', 'spacing', 'radius', 'focus', 'duration']
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.bunny.net', 'use.typekit.net']
const LOGO_MAX_HEIGHT = 128
const LOGO_MAX_WIDTH = 512

// why: the site re-themes itself with Metropolis, so the library's own stacks are restated to start from what a fresh install looks like
const SANS = 'system-ui, -apple-system, "Segoe UI", roboto, "Helvetica Neue", arial, sans-serif'
const MONO = 'ui-monospace, sfmono-regular, "SF Mono", menlo, consolas, "Liberation Mono", monospace'

const fontStack = (family, fallback) => (family ? `"${family.replaceAll('"', '')}", ${fallback}` : fallback)

const TOKENS = [
  { prop: '--tui-brand', from: ['brand'], value: (v) => v.brand },
  { prop: '--tui-brand-end', from: ['brandEnd'], value: (v) => v.brandEnd || 'initial' },
  { prop: '--tui-gradient-angle', from: ['angle'], value: (v) => `${v.angle}deg` },
  { prop: '--tui-neutral', from: ['neutralH', 'neutralC'], value: (v) => `oklch(0.55 ${v.neutralC} ${v.neutralH})` },
  { prop: '--tui-contrast-pivot', from: ['pivot'], value: (v) => v.pivot },
  { prop: '--tui-font-sans', from: ['sans'], value: (v) => fontStack(v.sans, SANS) },
  { prop: '--tui-font-mono', from: ['mono'], value: (v) => fontStack(v.mono, MONO) },
  { prop: '--tui-text-base', from: ['textBase'], value: (v) => `${v.textBase}rem` },
  { prop: '--tui-tracking-wide', from: ['tracking'], value: (v) => `${v.tracking}em` },
  { prop: '--tui-spacing-1', from: ['spacing'], value: (v) => `${v.spacing}rem` },
  { prop: '--tui-radius-sm', from: ['radius'], value: (v) => `${v.radius}rem` },
  { prop: '--tui-focus-ring-width', from: ['focus'], value: (v) => `${v.focus}px` },
  { prop: '--tui-duration-normal', from: ['duration'], value: (v) => `${v.duration}ms` },
]

let logo = null

const values = () => Object.fromEntries(SAVED.map((name) => [name, fields[name].value]))
const changed = (name) => fields[name].value !== fields[name].defaultValue
const fontUrls = () => [fields.sansUrl, fields.monoUrl].filter((input) => input.value && input.validity.valid).map((input) => input.value)

const pixel = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
const probe = document.createElement('i')
probe.hidden = true
document.body.append(probe)

const toHex = (color) => {
  pixel.fillStyle = color
  pixel.fillRect(0, 0, 1, 1)
  const rgb = [...pixel.getImageData(0, 0, 1, 1).data.slice(0, 3)]
  return `#${rgb.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}

const fromHex = () => {
  probe.style.color = `oklch(from ${fields.brand.value} l c h)`
  const [l, c, h = fields.brandH.value] = getComputedStyle(probe).color.match(/[\d.]+/g)
  fields.brandL.value = l
  fields.brandC.value = c
  fields.brandH.value = h
}

const fromSliders = () => {
  fields.brand.value = toHex(`oklch(${fields.brandL.value} ${fields.brandC.value} ${fields.brandH.value})`)
}

const checkFontUrl = (input) => {
  const host = URL.canParse(input.value) && new URL(input.value).host
  input.setCustomValidity(!input.value || FONT_HOSTS.includes(host) ? '' : 'Use a Google Fonts, Bunny Fonts or Adobe Fonts stylesheet URL')
}

const guessFamily = (input, family) => {
  if (family.value || !input.validity.valid) return
  family.value = new URL(input.value).searchParams.get('family')?.split(':')[0] ?? ''
}

const loadFonts = () => {
  document.querySelectorAll('link[data-font]').forEach((link) => link.remove())
  for (const href of fontUrls()) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.dataset.font = ''
    document.head.append(link)
  }
}

const config = () => {
  const current = values()
  const links = fontUrls().map((href) => `<link rel="stylesheet" href="${href}">`)
  const lines = TOKENS.filter((token) => token.from.some(changed)).map((token) => `    ${token.prop}: ${token.value(current)};`)
  if (lines.length === 0) return links.join('\n')

  return [...links, '<style>', '  :root {', ...lines, '  }', '</style>'].join('\n')
}

const writeHash = () => {
  const params = new URLSearchParams(SAVED.filter(changed).map((name) => [name, fields[name].value]))
  if (logo) params.set('logo', logo.split(',')[1].replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, ''))
  if (logo) params.set('logoType', logo.startsWith('data:image/webp') ? 'webp' : 'png')
  const hash = params.toString()
  history.replaceState(null, '', hash ? `#${hash}` : location.pathname)
}

let hashTimer
const scheduleHash = () => {
  clearTimeout(hashTimer)
  hashTimer = setTimeout(writeHash, 300)
}

const update = () => {
  const current = values()
  for (const token of TOKENS) root.setProperty(token.prop, token.value(current))
  for (const output of form.querySelectorAll('output')) output.value = document.getElementById(output.htmlFor.value).value
  fields.brandPicker.value = toHex(current.brand)
  if (current.brandEnd) fields.brandEndPicker.value = toHex(current.brandEnd)
  document.querySelector('[data-config]').textContent = config() || 'Nothing changed yet. Move a control first.'
  scheduleHash()
}

const toast = (title, tone = 'success') => {
  stack.insertAdjacentHTML('beforeend', `<div class="tui-toast tui-toast-${tone}" role="status"><div class="tui-toast-content"><p class="tui-toast-title"></p></div></div>`)
  stack.lastElementChild.querySelector('p').textContent = title
  setTimeout(() => stack.firstElementChild.remove(), 3000)
}

const report = (error) => {
  toast(error.message, 'error')
  console.error(error)
}

const copy = (text, done) => navigator.clipboard.writeText(text).then(
  () => toast(done),
  () => toast('The browser blocked the clipboard. Select the text and copy it yourself.', 'error'),
)

const loadImage = (src) => new Promise((resolve, reject) => {
  const image = new Image()
  image.onload = () => resolve(image)
  image.onerror = () => reject(new Error('This file is not an image the browser can read.'))
  image.src = src
})

const shrink = (image) => {
  const width = image.naturalWidth || 300
  const height = image.naturalHeight || 150
  const scale = Math.min(1, LOGO_MAX_HEIGHT / height, LOGO_MAX_WIDTH / width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(width * scale)
  canvas.height = Math.round(height * scale)
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/webp', 0.85)
}

const saturationOf = ([r, g, b]) => {
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  const lightness = (max + min) / 2
  if (max === min) return { saturation: 0, lightness }

  return { saturation: (max - min) / (1 - Math.abs(2 * lightness - 1)), lightness }
}

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])

const extractColors = (image) => {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const context = canvas.getContext('2d', { willReadFrequently: true })
  context.drawImage(image, 0, 0, 64, 64)
  const { data } = context.getImageData(0, 0, 64, 64)

  const buckets = new Map()
  for (let at = 0; at < data.length; at += 4) {
    if (data[at + 3] < 128) continue
    const key = ((data[at] >> 4) << 8) | ((data[at + 1] >> 4) << 4) | (data[at + 2] >> 4)
    const bucket = buckets.get(key) ?? { count: 0, sum: [0, 0, 0] }
    bucket.count += 1
    for (const channel of [0, 1, 2]) bucket.sum[channel] += data[at + channel]
    buckets.set(key, bucket)
  }

  const colors = [...buckets.values()].map(({ count, sum }) => {
    const rgb = sum.map((total) => Math.round(total / count))
    return { rgb, count, ...saturationOf(rgb) }
  }).filter(({ lightness }) => lightness > 0.08 && lightness < 0.94)

  const vivid = colors.filter(({ saturation }) => saturation > 0.25)
  const pool = (vivid.length ? vivid : colors).sort((a, b) => b.count * (0.5 + b.saturation) - a.count * (0.5 + a.saturation))
  const picked = []
  for (const color of pool) {
    if (picked.length === 5) break
    if (picked.every((other) => distance(other.rgb, color.rgb) > 64)) picked.push(color)
  }

  return picked.map(({ rgb }) => `#${rgb.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`)
}

const swatch = (group, hex) => `
  <label class="tui-color-check" title="${hex || 'No gradient end'}">
    <input class="tui-color-check-input" type="radio" name="playground-swatch-${group}" value="${hex}">
    <span class="tui-color-check-swatch"${hex ? ` style="--tui-swatch: ${hex}"` : ''}></span>
    <span class="tui-sr-only">${hex || 'No gradient end'}</span>
  </label>`

const showSwatches = (image) => {
  const colors = extractColors(image)
  document.querySelector('[data-swatch-group="brand"]').innerHTML = colors.map((hex) => swatch('brand', hex)).join('')
  document.querySelector('[data-swatch-group="brandEnd"]').innerHTML = [...colors, ''].map((hex) => swatch('brandEnd', hex)).join('')
  swatches.hidden = colors.length === 0
}

const showLogo = async (src) => {
  logo = src
  for (const image of logos) image.src = src ?? placeholderLogo
  document.querySelector('[data-action="remove-logo"]').hidden = !src
  if (!src) swatches.hidden = true
  if (src) showSwatches(await loadImage(src))
  scheduleHash()
}

const uploadLogo = async (file) => {
  const url = URL.createObjectURL(file)
  try {
    await showLogo(shrink(await loadImage(url)))
  } catch (error) {
    report(error)
  } finally {
    URL.revokeObjectURL(url)
  }
}

const download = () => {
  const showcase = document.getElementById('playground-showcase').cloneNode(true)
  showcase.querySelectorAll('[data-action]').forEach((element) => element.remove())
  showcase.querySelectorAll('img').forEach((image) => image.setAttribute('src', image.src))
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>My Torque UI setup</title>
<link rel="stylesheet" href="${location.origin}/assets/tui/tui-all.css">
${config()}
</head>
<body>
<main class="tui-container tui-stack tui-p-6">
${showcase.outerHTML}
</main>
</body>
</html>
`
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }))
  link.download = 'torque-ui-setup.html'
  link.click()
  URL.revokeObjectURL(link.href)
}

const reset = () => {
  form.reset()
  fromHex()
  loadFonts()
  showLogo(null)
  update()
}

const ACTIONS = {
  reset,
  download,
  share: () => { writeHash(); copy(location.href, 'Link copied. Anyone who opens it sees this setup.') },
  copy: () => copy(config(), 'Copied. Paste it after the Torque UI stylesheet.'),
  'remove-logo': () => showLogo(null),
  toast: (button) => toast(button.dataset.tone === 'error' ? 'Upload failed' : 'Changes saved', button.dataset.tone),
}

const restore = () => {
  const params = new URLSearchParams(location.hash.slice(1))
  for (const name of SAVED) {
    if (!params.has(name)) continue
    fields[name].value = params.get(name)
    if (!fields[name].validity.valid) fields[name].value = fields[name].defaultValue
  }
  for (const input of [fields.sansUrl, fields.monoUrl]) checkFontUrl(input)
  for (const input of [fields.sansUrl, fields.monoUrl]) if (!input.validity.valid) input.value = ''
  fromHex()
  loadFonts()
  update()

  const type = params.get('logoType') === 'png' ? 'png' : 'webp'
  if (params.has('logo')) showLogo(`data:image/${type};base64,${params.get('logo').replaceAll('-', '+').replaceAll('_', '/')}`).catch(report)
}

form.addEventListener('input', (event) => {
  const { target } = event
  if ([fields.sansUrl, fields.monoUrl].includes(target)) checkFontUrl(target)
  if ([fields.sansUrl, fields.monoUrl].includes(target)) loadFonts()
  if (!target.validity.valid) return
  if (target === fields.brandPicker) fields.brand.value = target.value
  if (target === fields.brandEndPicker) fields.brandEnd.value = target.value
  if ([fields.brand, fields.brandPicker].includes(target)) fromHex()
  if ([fields.brandL, fields.brandC, fields.brandH].includes(target)) fromSliders()
  if (target === fields.sansUrl) guessFamily(fields.sansUrl, fields.sans)
  if (target === fields.monoUrl) guessFamily(fields.monoUrl, fields.mono)
  update()
})

swatches.addEventListener('change', (event) => {
  fields[event.target.name.replace('playground-swatch-', '')].value = event.target.value
  fromHex()
  update()
})

document.getElementById('playground-logo').addEventListener('change', (event) => {
  const [file] = event.target.files
  if (file) uploadLogo(file)
  event.target.value = ''
})

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]')
  if (button) ACTIONS[button.dataset.action](button)
})

const narrow = matchMedia('(width < 768px)')
const dock = () => (narrow.matches ? document.getElementById('playground-sheet') : document.getElementById('playground-dock')).append(form)
narrow.addEventListener('change', dock)
dock()
restore()
