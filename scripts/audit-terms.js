const fs = require('fs');
const path = require('path');

const terms = [
  'أبراج', 'ابراج', 'eleganteast', 'Elegant East', 'رخام', 'الرخام',
  'جرانيت', 'الجرانيت', 'محاجر', 'المحاجر', 'بلوكات', 'طاولات', 'مغاسل',
  'CNC', 'Waterjet', 'واترجيت', 'سي ان سي', 'المصنع', 'مصنعنا', 'الرياض'
];

function searchDir(dir, results = {}) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'scripts'].includes(entry.name)) {
        searchDir(fullPath, results);
      }
    } else if (entry.isFile() && /\.(tsx|ts|js|json|mjs|html)$/i.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const term of terms) {
        let count = 0;
        let pos = content.indexOf(term);
        while (pos !== -1) {
          count++;
          pos = content.indexOf(term, pos + 1);
        }
        if (count > 0) {
          if (!results[term]) results[term] = [];
          results[term].push({ file: fullPath.replace('c:\\دهانات\\', ''), count });
        }
      }
    }
  }
  return results;
}

const found = searchDir('c:\\دهانات');
for (const [term, files] of Object.entries(found)) {
  console.log(`=== Term: "${term}" (Files: ${files.length}) ===`);
  files.slice(0, 10).forEach(f => console.log(`  - ${f.file} (${f.count} times)`));
  if (files.length > 10) console.log(`  ... and ${files.length - 10} more files`);
}
