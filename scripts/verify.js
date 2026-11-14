/**
 * Zero Lifestyle - Integrity & Health Check Script
 * Validates critical assets, pages, styles, scripts, and 3D models.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const criticalFiles = [
  'index.html',
  'index.htm',
  'cart.html',
  'search.html',
  'package.json',
  'server.js',
  '3d/models/7996311cf3ce7e1e/Display_GLB.glb',
  'products/display-earbuds.html',
  'products/regal-smartwatch.html',
  'pages/smart-watches.html',
  'collections/platinum-series-products.html',
  'cdn/shop/t/55/assets/theme.min.css',
  'cdn/shop/t/55/assets/theme.min.js',
  'cdn/shop/t/55/assets/vendor.js'
];

console.log('🔍 Running Zero Lifestyle Storefront Health Check...\n');

let passCount = 0;
let failCount = 0;

criticalFiles.forEach(file => {
  const fullPath = path.join(ROOT_DIR, file);
  if (fs.existsSync(fullPath)) {
    const size = fs.statSync(fullPath).size;
    console.log(`  [OK] ${file} (${size.toLocaleString()} bytes)`);
    passCount++;
  } else {
    console.error(`  [FAIL] Missing critical file: ${file}`);
    failCount++;
  }
});

console.log(`\nResults: ${passCount} Passed, ${failCount} Failed.`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 Storefront integrity check PASSED! All critical assets present.\n');
  process.exit(0);
}
