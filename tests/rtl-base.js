// @ts-check

/**
 * Navigate to `url` with the document forced into right-to-left mode.
 *
 * why: page.addInitScript(() => document.documentElement.dir = 'rtl') does
 * not work in this environment — the init script runs before
 * document.documentElement exists on the navigated document, so the
 * attribute never sticks. Rewriting the response's <html> tag via
 * page.route() is reliable and applies dir="rtl" from the first parsed byte.
 */
async function gotoRtl(page, url) {
  await page.route('**/*.html', async (route) => {
    const response = await route.fetch();
    const html = await response.text();
    const marker = '<html lang="en">';
    if (!html.includes(marker)) {
      throw new Error(`gotoRtl: could not find ${marker} in the response for ${route.request().url()} — page cannot be forced into RTL`);
    }
    const body = html.replace(marker, '<html lang="en" dir="rtl">');
    await route.fulfill({ response, body });
  });
  await page.goto(url);
}

module.exports = { gotoRtl };
