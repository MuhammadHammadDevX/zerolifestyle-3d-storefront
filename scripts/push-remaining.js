const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function execSafe(cmd) {
  console.log(`> ${cmd}`);
  return execSync(cmd, {
    stdio: 'inherit',
    maxBuffer: 100 * 1024 * 1024
  });
}

async function main() {
  console.log('Checking remaining unstaged files in git...');
  const statusOutput = execSync('git status --porcelain', { encoding: 'utf8', maxBuffer: 100 * 1024 * 1024 });
  const lines = statusOutput.split('\n').filter(l => l.startsWith('?? cdn/shop/files/'));
  const remainingFiles = lines.map(l => l.slice(3).trim());

  console.log(`Remaining files to push: ${remainingFiles.length}`);

  if (remainingFiles.length === 0) {
    console.log('No remaining files to push!');
    return;
  }

  const BATCH_SIZE = 2500;
  const totalBatches = Math.ceil(remainingFiles.length / BATCH_SIZE);

  for (let i = 0; i < totalBatches; i++) {
    const chunk = remainingFiles.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
    console.log(`\n======================================================`);
    console.log(`🚀 Uploading Remaining Batch ${i + 1}/${totalBatches} (${chunk.length} files)...`);
    console.log(`======================================================`);

    const listFile = path.join(__dirname, 'batch-remaining-list.txt');
    fs.writeFileSync(listFile, chunk.join('\n'), 'utf8');

    try {
      execSafe(`git add --pathspec-from-file="${listFile}"`);
      if (fs.existsSync(listFile)) fs.unlinkSync(listFile);

      execSafe(`git commit -m "chore(cdn): upload remaining media part ${i + 1}/${totalBatches}"`);

      console.log(`Pushing part ${i + 1} to GitHub...`);
      execSafe('git push origin main');
      console.log(`✔ Part ${i + 1}/${totalBatches} PUSHED SUCCESSFULLY!`);
    } catch (err) {
      console.error(`❌ Error in Part ${i + 1}:`, err.message);
      if (fs.existsSync(listFile)) fs.unlinkSync(listFile);
      process.exit(1);
    }
  }

  console.log('\n🎉 ALL REMAINING FILES PUSHED TO GITHUB SUCCESSFULLY!');
}

main().catch(console.error);
