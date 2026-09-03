const { test, expect } = require('@playwright/test');
const fs = require('fs');
test('bundle declares layer order and wraps every directory in its layer', () => {
  const css = fs.readFileSync('dist/tui-all.css', 'utf8');
  expect(css.startsWith('@layer tui.tokens, tui.reboot, tui.elements, tui.components, tui.layout, tui.forms, tui.interactive, tui.utilities, tui.themes;')).toBe(true);
  for (const l of ['tokens','reboot','elements','components','layout','forms','interactive','utilities','themes']) {
    expect(css).toContain(`@layer tui.${l} {`);
  }
});
test('bundle is fresh', () => {
  const { execSync } = require('child_process');
  const os = require('os');
  const path = require('path');
  const tmpOut = path.join(os.tmpdir(), `tui-all-${process.pid}-${Date.now()}.css`);
  try {
    execSync(`bash scripts/build-single.sh ${JSON.stringify(tmpOut)}`);
    execSync(`cmp ${JSON.stringify(tmpOut)} dist/tui-all.css`);
  } finally {
    fs.rmSync(tmpOut, { force: true });
  }
});
