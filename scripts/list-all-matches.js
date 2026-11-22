const fs = require('fs');
const path = require('path');

const terms = [
  'أبراج', 'ابراج', 'eleganteast', 'Elegant East', 'رخام', 'الرخام',
  'جرانيت', 'الجرانيت', 'محاجر', 'المحاجر', 'بلوكات', 'طاولات', 'مغاسل',
  'CNC', 'Waterjet', 'واترجيت', 'سي ان سي', 'المصنع', 'مصنعنا', 'الرياض',
  '0530200529', '966530200529', '0555123456', '0544987654', '0501122334',
  '0561095505', '966561095505' // old 505 phone number
];

const matchesByFile = {};

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'scripts', 'public'].includes(entry.name)) {
        scanDir(full);
      }
    } else if (entry.isFile() && /\.(tsx|ts|js|json|mjs|html)$/i.test(entry.name)) {
      const rel = full.replace('c:\\دهانات\\', '');
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        for (const t of terms) {
          if (line.includes(t)) {
            if (!matchesByFile[rel]) matchesByFile[rel] = [];
            matchesByFile[rel].push({ lineNum: idx + 1, term: t, text: line.trim() });
            break;
          }
        }
      });
    }
  }
}

scanDir('c:\\دهانات');

const files = Object.keys(matchesByFile);
console.log(`Total files containing old terms: ${files.length}\n`);
for (const file of files) {
  console.log(`FILE: ${file} (${matchesByFile[file].length} matches)`);
  matchesByFile[file].slice(0, 5).forEach(m => {
    console.log(`  Line ${m.lineNum} [${m.term}]: ${m.text.slice(0, 100)}`);
  });
  if (matchesByFile[file].length > 5) {
    console.log(`  ... and ${matchesByFile[file].length - 5} more lines`);
  }
  console.log('--------------------------------------------------');
}
