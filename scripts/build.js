/**
 * Zero Lifestyle Storefront Build & Integrity Pipeline
 * - Validates project directory structure
 * - Synchronizes root index documents
 * - Inspects 3D assets & GLB model headers
 * - Generates comprehensive build manifest (build-manifest.json)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('==================================================================');
console.log('⚡ ZERO LIFESTYLE - PRODUCTION BUILD & ASSET PIPELINE');
console.log('==================================================================');

const startTime = Date.now();

// 1. Sync index.htm -> index.html
const indexHtmPath = path.join(ROOT_DIR, 'index.htm');
const indexHtmlPath = path.join(ROOT_DIR, 'index.html');

if (fs.existsSync(indexHtmPath)) {
  fs.copyFileSync(indexHtmPath, indexHtmlPath);
  console.log('✔ [SYNC] index.htm -> index.html synchronized successfully.');
} else if (fs.existsSync(indexHtmlPath)) {
  fs.copyFileSync(indexHtmlPath, indexHtmPath);
  console.log('✔ [SYNC] index.html -> index.htm synchronized successfully.');
} else {
  console.error('✖ [ERROR] Neither index.htm nor index.html was found in root!');
  process.exit(1);
}

// 2. Directory structure audit
const directoriesToCheck = [
  { name: '3d', role: 'Interactive 3D WebXR Models (GLB)' },
  { name: 'products', role: 'Smartwatches & Earbuds Catalog Pages' },
  { name: 'collections', role: 'Product Collection Landing Pages' },
  { name: 'pages', role: 'Editorial, Brand & Policy Pages' },
  { name: 'blogs', role: 'Wearables Insights & Tech Blogs' },
  { name: 'cdn', role: 'Static Media, Themes, Icons & Graphics' },
  { name: 'videos', role: 'Promotional & Product Feature Videos' },
  { name: 's', role: 'Local Google Fonts & Typography Assets' },
  { name: 'ajax', role: 'Cart & Country Selector Endpoints' },
  { name: 'npm', role: 'Vendor Libraries (Bootstrap, Swiper, Locomotive)' },
];

const auditResults = [];

for (const dir of directoriesToCheck) {
  const dirPath = path.join(ROOT_DIR, dir.name);
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    const files = fs.readdirSync(dirPath);
    auditResults.push({
      directory: dir.name,
      role: dir.role,
      status: 'VERIFIED',
      count: files.length
    });
    console.log(`✔ [AUDIT] /${dir.name.padEnd(14)} : ${dir.role} (${files.length} items verified)`);
  } else {
    auditResults.push({
      directory: dir.name,
      role: dir.role,
      status: 'MISSING',
      count: 0
    });
    console.warn(`⚠ [WARN]  /${dir.name.padEnd(14)} : Directory not found.`);
  }
}

// 3. Verify 3D Model Asset
const modelPath = path.join(ROOT_DIR, '3d', 'models', '7996311cf3ce7e1e', 'Display_GLB.glb');
let modelVerified = false;
let modelSizeMb = 0;

if (fs.existsSync(modelPath)) {
  const stats = fs.statSync(modelPath);
  modelSizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  // Verify GLB magic number: 0x46546C67 ("glTF")
  const buffer = Buffer.alloc(4);
  const fd = fs.openSync(modelPath, 'r');
  fs.readSync(fd, buffer, 0, 4, 0);
  fs.closeSync(fd);
  const magic = buffer.toString('utf8');
  if (magic === 'glTF') {
    modelVerified = true;
    console.log(`✔ [3D ASSET] Display_GLB.glb verified! Magic Header: "${magic}", Size: ${modelSizeMb} MB`);
  } else {
    console.warn(`⚠ [3D ASSET] Magic header mismatch: ${magic}`);
  }
} else {
  console.warn('⚠ [3D ASSET] 3D Model file not found at expected path.');
}

// 4. Generate build manifest
const manifest = {
  project: 'Zero Lifestyle Storefront',
  version: '2.0.0',
  timestamp: new Date().toISOString(),
  durationMs: Date.now() - startTime,
  rootIndexSynced: true,
  model3D: {
    verified: modelVerified,
    sizeMB: modelSizeMb,
    path: '3d/models/7996311cf3ce7e1e/Display_GLB.glb'
  },
  audit: auditResults
};

const manifestPath = path.join(ROOT_DIR, 'build-manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`✔ [MANIFEST] Build manifest written to ${manifestPath}`);

console.log('==================================================================');
console.log(`✨ BUILD COMPLETED IN ${(Date.now() - startTime)}ms! STOREFRONT READY.`);
console.log('==================================================================\n');
