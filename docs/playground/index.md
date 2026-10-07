---
layout: docs
title: Make it your own
toc: false
description: "Drop in your logo, pick your colors and fonts, and see every component and a few full pages in your brand. Copy the result or share the link."
---
<aside class="tui-shell-sidebar tui-shell-scroll tui-p-4" aria-label="Theme controls" id="playground-dock">
<form class="tui-stack" id="playground" autocomplete="off">
  <div class="tui-tabs">
    <input class="tui-state-input tui-tab-input" type="radio" name="playground-controls" id="playground-controls-color" checked>
    <label class="tui-tab" for="playground-controls-color">Color</label>
    <div class="tui-tab-panel"><div class="tui-stack">
      <div class="tui-field">
        <label for="playground-brand">Brand</label>
        <div class="tui-flex tui-gap-2">
          <input id="playground-brand" name="brand" type="text" value="#5c60f0" pattern="#[0-9a-fA-F]{6}" required spellcheck="false">
          <input name="brandPicker" type="color" value="#5c60f0" aria-label="Pick the brand color">
        </div>
      </div>
      <div class="tui-field">
        <label for="playground-brand-l">Lightness <output for="playground-brand-l">0.57</output></label>
        <input id="playground-brand-l" name="brandL" type="range" min="0.2" max="0.95" step="0.01" value="0.57">
      </div>
      <div class="tui-field">
        <label for="playground-brand-c">Chroma <output for="playground-brand-c">0.21</output></label>
        <input id="playground-brand-c" name="brandC" type="range" min="0" max="0.32" step="0.01" value="0.21">
      </div>
      <div class="tui-field">
        <label for="playground-brand-h">Hue <output for="playground-brand-h">276</output></label>
        <input id="playground-brand-h" name="brandH" type="range" min="0" max="360" value="276">
      </div>
      <div class="tui-field">
        <label for="playground-neutral-h">Neutral hue <output for="playground-neutral-h">264</output></label>
        <input id="playground-neutral-h" name="neutralH" type="range" min="0" max="360" value="264">
      </div>
      <div class="tui-field">
        <label for="playground-neutral-c">Neutral chroma <output for="playground-neutral-c">0.023</output></label>
        <input id="playground-neutral-c" name="neutralC" type="range" min="0" max="0.1" step="0.001" value="0.023">
      </div>
      <div class="tui-field">
        <label for="playground-pivot">Contrast pivot <output for="playground-pivot">0.65</output></label>
        <input id="playground-pivot" name="pivot" type="range" min="0.3" max="0.95" step="0.01" value="0.65">
        <span class="tui-help">Above this lightness, text on the brand turns dark.</span>
      </div>
      <div class="tui-field">
        <label for="playground-brand-end">Gradient end</label>
        <div class="tui-flex tui-gap-2">
          <input id="playground-brand-end" name="brandEnd" type="text" value="" placeholder="none" pattern="#[0-9a-fA-F]{6}" spellcheck="false">
          <input name="brandEndPicker" type="color" value="#e11d48" aria-label="Pick the gradient end color">
        </div>
        <span class="tui-help">Leave it empty for a flat brand gradient.</span>
      </div>
      <div class="tui-field">
        <label for="playground-angle">Angle <output for="playground-angle">135</output>deg</label>
        <input id="playground-angle" name="angle" type="range" min="0" max="360" step="5" value="135">
      </div>
    </div></div>

    <input class="tui-state-input tui-tab-input" type="radio" name="playground-controls" id="playground-controls-type">
    <label class="tui-tab" for="playground-controls-type">Type</label>
    <div class="tui-tab-panel"><div class="tui-stack">
      <fieldset>
        <legend>Text font</legend>
        <div class="tui-field">
          <label for="playground-sans-url">Stylesheet URL</label>
          <input id="playground-sans-url" name="sansUrl" type="url" placeholder="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&amp;display=swap" spellcheck="false">
        </div>
        <div class="tui-field">
          <label for="playground-sans">Family</label>
          <input id="playground-sans" name="sans" type="text" placeholder="Inter" spellcheck="false">
        </div>
      </fieldset>
      <fieldset>
        <legend>Code font</legend>
        <div class="tui-field">
          <label for="playground-mono-url">Stylesheet URL</label>
          <input id="playground-mono-url" name="monoUrl" type="url" placeholder="https://fonts.googleapis.com/css2?family=JetBrains+Mono&amp;display=swap" spellcheck="false">
        </div>
        <div class="tui-field">
          <label for="playground-mono">Family</label>
          <input id="playground-mono" name="mono" type="text" placeholder="JetBrains Mono" spellcheck="false">
        </div>
      </fieldset>
      <div class="tui-field">
        <label for="playground-text-base">Type base <output for="playground-text-base">1</output>rem</label>
        <input id="playground-text-base" name="textBase" type="range" min="0.75" max="1.5" step="0.0625" value="1">
      </div>
      <div class="tui-field">
        <label for="playground-tracking">Letter spacing <output for="playground-tracking">0.025</output>em</label>
        <input id="playground-tracking" name="tracking" type="range" min="0" max="0.1" step="0.005" value="0.025">
      </div>
    </div></div>

    <input class="tui-state-input tui-tab-input" type="radio" name="playground-controls" id="playground-controls-shape">
    <label class="tui-tab" for="playground-controls-shape">Shape</label>
    <div class="tui-tab-panel"><div class="tui-stack">
      <div class="tui-field">
        <label for="playground-spacing">Spacing unit <output for="playground-spacing">0.25</output>rem</label>
        <input id="playground-spacing" name="spacing" type="range" min="0.125" max="0.5" step="0.025" value="0.25">
      </div>
      <div class="tui-field">
        <label for="playground-radius">Smallest radius <output for="playground-radius">0.125</output>rem</label>
        <input id="playground-radius" name="radius" type="range" min="0" max="0.5" step="0.025" value="0.125">
      </div>
      <div class="tui-field">
        <label for="playground-focus">Focus ring <output for="playground-focus">2</output>px</label>
        <input id="playground-focus" name="focus" type="range" min="1" max="5" value="2">
      </div>
      <div class="tui-field">
        <label for="playground-duration">Normal duration <output for="playground-duration">250</output>ms</label>
        <input id="playground-duration" name="duration" type="range" min="0" max="1500" step="50" value="250">
      </div>
      <div class="tui-flex tui-flex-wrap tui-gap-4 tui-items-center">
        <span class="tui-spinner" role="status" aria-label="Loading"></span>
        <label class="tui-switch" for="playground-motion-switch">
          <input class="tui-switch-input" type="checkbox" id="playground-motion-switch">
          <span class="tui-switch-label">Flip me</span>
        </label>
      </div>
    </div></div>
  </div>
</form>
</aside>

<main class="tui-shell-main tui-stack" id="main">
  <header class="tui-page-header">
    <h1 class="tui-page-header-title">Make it your own <span class="tui-page-header-lead">Your logo, your colors, every component</span></h1>
    <div class="tui-page-header-actions">
      <button class="tui-button tui-button-sm tui-d-md-none" type="button" popovertarget="playground-sheet">Customize</button>
      <button class="tui-button tui-button-sm" type="button" data-action="reset">Reset</button>
      <button class="tui-button tui-button-sm" type="button" data-action="share">Share link</button>
      <button class="tui-button tui-button-sm" type="button" data-action="download">Download page</button>
      <button class="tui-button tui-button-sm tui-button-primary" type="button" commandfor="playground-config" command="show-modal">Get the code</button>
    </div>
  </header>

  <section class="tui-card" aria-label="Your logo">
    <div class="tui-card-body tui-flex tui-flex-wrap tui-gap-6 tui-items-center">
      <div class="tui-flex tui-gap-4 tui-items-center">
        <img data-logo src="/ui/playground/logo.svg" alt="Your logo" height="56">
        <div class="tui-stack">
          <label class="tui-button tui-button-outline tui-button-sm" for="playground-logo">Upload logo</label>
          <input class="tui-sr-only" id="playground-logo" type="file" accept="image/*">
          <button class="tui-button tui-button-ghost tui-button-sm" type="button" data-action="remove-logo" hidden>Remove</button>
        </div>
      </div>
      <div class="tui-stack" data-swatches hidden>
        <fieldset>
          <legend class="tui-text-sm">Brand from your logo</legend>
          <div class="tui-color-check-group" data-swatch-group="brand"></div>
        </fieldset>
        <fieldset>
          <legend class="tui-text-sm">Gradient end</legend>
          <div class="tui-color-check-group" data-swatch-group="brandEnd"></div>
        </fieldset>
      </div>
      <p class="tui-text-2 tui-text-sm tui-m-0 tui-flex-1" data-logo-hint>Your logo never leaves this page. It is shrunk and kept in the link, so a shared link shows it too.</p>
    </div>
  </section>

  <div class="tui-sheet" id="playground-sheet" popover aria-label="Theme controls"></div>

  <div class="tui-tabs" id="playground-showcase">
    <input class="tui-state-input tui-tab-input" type="radio" name="playground-group" id="playground-group-components" checked>
    <label class="tui-tab" for="playground-group-components">Components</label>
    <div class="tui-tab-panel">
      <div class="tui-tabs">
        <input class="tui-state-input tui-tab-input" type="radio" name="playground-components" id="playground-components-buttons" checked>
        <label class="tui-tab" for="playground-components-buttons">Buttons &amp; badges</label>
        <div class="tui-tab-panel">{% include_relative examples/buttons.html %}</div>
        <input class="tui-state-input tui-tab-input" type="radio" name="playground-components" id="playground-components-forms">
        <label class="tui-tab" for="playground-components-forms">Forms</label>
        <div class="tui-tab-panel">{% include_relative examples/forms.html %}</div>
        <input class="tui-state-input tui-tab-input" type="radio" name="playground-components" id="playground-components-navigation">
        <label class="tui-tab" for="playground-components-navigation">Navigation</label>
        <div class="tui-tab-panel">{% include_relative examples/navigation.html %}</div>
        <input class="tui-state-input tui-tab-input" type="radio" name="playground-components" id="playground-components-feedback">
        <label class="tui-tab" for="playground-components-feedback">Feedback</label>
        <div class="tui-tab-panel">{% include_relative examples/feedback.html %}</div>
        <input class="tui-state-input tui-tab-input" type="radio" name="playground-components" id="playground-components-data">
        <label class="tui-tab" for="playground-components-data">Data</label>
        <div class="tui-tab-panel">{% include_relative examples/data.html %}</div>
        <input class="tui-state-input tui-tab-input" type="radio" name="playground-components" id="playground-components-overlays">
        <label class="tui-tab" for="playground-components-overlays">Overlays</label>
        <div class="tui-tab-panel">{% include_relative examples/overlays.html %}</div>
      </div>
    </div>
    <input class="tui-state-input tui-tab-input" type="radio" name="playground-group" id="playground-group-pages">
    <label class="tui-tab" for="playground-group-pages">Pages</label>
    <div class="tui-tab-panel">
      <div class="tui-tabs">
        <input class="tui-state-input tui-tab-input" type="radio" name="playground-pages" id="playground-pages-dashboard" checked>
        <label class="tui-tab" for="playground-pages-dashboard">Dashboard</label>
        <div class="tui-tab-panel">{% include_relative examples/dashboard.html %}</div>
        <input class="tui-state-input tui-tab-input" type="radio" name="playground-pages" id="playground-pages-sign-in">
        <label class="tui-tab" for="playground-pages-sign-in">Sign-in</label>
        <div class="tui-tab-panel">{% include_relative examples/sign-in.html %}</div>
        <input class="tui-state-input tui-tab-input" type="radio" name="playground-pages" id="playground-pages-landing">
        <label class="tui-tab" for="playground-pages-landing">Landing</label>
        <div class="tui-tab-panel">{% include_relative examples/landing.html %}</div>
        <input class="tui-state-input tui-tab-input" type="radio" name="playground-pages" id="playground-pages-settings">
        <label class="tui-tab" for="playground-pages-settings">Settings</label>
        <div class="tui-tab-panel">{% include_relative examples/settings.html %}</div>
      </div>
    </div>
  </div>

  <dialog class="tui-modal" id="playground-config" aria-labelledby="playground-config-title" style="--tui-modal-max-inline-size: 44rem">
    <form method="dialog" class="tui-modal-header">
      <h3 class="tui-m-0" id="playground-config-title">Your setup</h3>
      <button class="tui-close" aria-label="Close"></button>
    </form>
    <div class="tui-modal-body tui-stack">
      <p class="tui-m-0">Paste this into the <code>&lt;head&gt;</code> of your layout. Only what you changed is listed.</p>
      <pre class="tui-code-block" data-lang="HTML"><code data-config></code></pre>
    </div>
    <form method="dialog" class="tui-modal-footer">
      <button class="tui-button">Close</button>
      <button class="tui-button tui-button-primary" type="button" data-action="copy">Copy</button>
    </form>
  </dialog>

  <div class="tui-toast-stack" aria-live="polite" data-toasts></div>
</main>
<script src="/ui/playground/playground.js" type="module"></script>
