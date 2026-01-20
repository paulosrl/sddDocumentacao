const fs = require('fs');

// Read files
const css = fs.readFileSync('docs/output.css', 'utf8');
const prd = fs.readFileSync('specs/prd.md', 'utf8');
const plano = fs.readFileSync('specs/2026-01-19-landing-page-sdd-spec.md', 'utf8');
let html = fs.readFileSync('src/index.html', 'utf8');

// Escape HTML entities
const escapeHtml = (str) => str
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

// Inline CSS
html = html.replace(
  '<link rel="stylesheet" href="output.css">',
  `<style>${css}</style>`
);

// Inject content
html = html.replace('<!-- PRD_CONTENT_PLACEHOLDER -->', escapeHtml(prd));
html = html.replace('<!-- PLANO_CONTENT_PLACEHOLDER -->', escapeHtml(plano));

// Write final file
fs.writeFileSync('docs/index.html', html);

console.log('Final build complete!');
console.log('File: docs/index.html');
console.log('Size:', Math.round(html.length / 1024), 'KB');
