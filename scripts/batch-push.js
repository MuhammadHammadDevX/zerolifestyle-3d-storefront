const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FILES_DIR = path.join(__dirname, '..', 'cdn', 'shop', 'files');
const BATCH_SIZE_LIMIT = 300 * 1024 * 1024; // 300 MB per batch

function execSafe(cmd) {
  console.log(`> ${cmd}`);
  return execSync(cmd, {
    stdio: 'inherit',
    maxBuffer: 100 * 1024 * 1024
  });
}

async function main() {
  console.log('Reading files from:', FILES_DIR);
  const items = fs.readdirSync(FILES_DIR);
  console.log(`Found ${items.length} items in cdn/shop/files.`);

  // Group files into ~300MB batches
  const batches = [];
  let currentBatch = [];
  let currentSize = 0;

  for (const item of items) {
    const fullPath = path.join(FILES_DIR, item);
    let size = 0;
    try {
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        size = stat.size;
      } else if (stat.isDirectory()) {
        const subFiles = fs.readdirSync(fullPath);
        for (const sub of subFiles) {
          const subStat = fs.statSync(path.join(fullPath, sub));
          size += subStat.size;
        }
      }
    } catch (e) {
      continue;
    }

    if (currentSize + size > BATCH_SIZE_LIMIT && currentBatch.length > 0) {
      batches.push({ files: currentBatch, sizeMB: (currentSize / (1024 * 1024)).toFixed(1) });
      currentBatch = [];
      currentSize = 0;
    }

    currentBatch.push(item);
    currentSize += size;
  }

  if (currentBatch.length > 0) {
    batches.push({ files: currentBatch, sizeMB: (currentSize / (1024 * 1024)).toFixed(1) });
  }

  console.log(`Total Batches planned: ${batches.length}`);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`\n======================================================`);
    console.log(`🚀 Processing Batch ${i + 1}/${batches.length} (${batch.sizeMB} MB, ${batch.files.length} files)...`);
    console.log(`======================================================`);

    const listFile = path.join(__dirname, 'batch-add-list.txt');
    const relativePaths = batch.files.map(f => `cdn/shop/files/${f}`);
    fs.writeFileSync(listFile, relativePaths.join('\n'), 'utf8');

    try {
      // Stage
      execSafe(`git add --pathspec-from-file="${listFile}"`);
      if (fs.existsSync(listFile)) fs.unlinkSync(listFile);

      // Check if anything staged
      const staged = execSync('git diff --cached --name-only', { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
      if (!staged.trim()) {
        console.log(`Batch ${i + 1} already committed or empty. Skipping.`);
        continue;
      }

      // Commit
      execSafe(`git commit -m "chore(cdn): upload media batch ${i + 1}/${batches.length} (${batch.sizeMB}MB)"`);

      // Push
      console.log(`Pushing Batch ${i + 1} to GitHub...`);
      execSafe('git push origin main');
      console.log(`✔ Batch ${i + 1}/${batches.length} PUSHED SUCCESSFULLY!`);
    } catch (err) {
      console.error(`❌ Error in Batch ${i + 1}:`, err.message);
      if (fs.existsSync(listFile)) fs.unlinkSync(listFile);
      process.exit(1);
    }
  }

  console.log('\n🎉 ALL CDN MEDIA BATCHES PUSHED SUCCESSFULLY TO GITHUB!');
}

main().catch(console.error);
