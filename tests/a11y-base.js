// @ts-check
const { injectAxe, getViolations: axeGetViolations } = require('axe-playwright');

/**
 * WCAG 2.1 AA rule IDs we care about for Torque UI components.
 */
const CONTRAST_RULES = [
  'color-contrast',           // Text must have sufficient contrast ratio (4.5:1)
];

const STRUCTURAL_RULES = [
  'page-has-heading-one',     // Page should have an h1
  'document-title',           // Document should have a title element
  'html-has-lang',            // html element should have a lang attribute
  'html-xml-lang-mismatch',   // HTML and XML lang attributes must match
];

const IMAGE_RULES = [
  'image-alt',                // img elements must have alt text
  'area-alt',                 // area elements must have alt text
  'input-image-alt',          // input[type="image"] must have alt
];

/**
 * Run axe-core against a page and return violations.
 */
async function getViolations(page, rules = CONTRAST_RULES, context) {
  await injectAxe(page);
  const results = await axeGetViolations(page, context, {
    runOnly: { type: 'rule', values: rules },
  });
  return results || [];
}

module.exports = { getViolations, CONTRAST_RULES, STRUCTURAL_RULES, IMAGE_RULES };
