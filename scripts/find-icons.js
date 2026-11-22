const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('Sparkles') || c.includes('Sparkle') || c.includes('Star') || c.includes('Wand') || c.includes('Bot') || c.includes('Cpu') || c.includes('ai') || c.includes('AI')) {
        const lines = c.split('\n');
        lines.forEach((l, idx) => {
          if (l.includes('Sparkles') || l.includes('Sparkle') || l.includes('Wand2') || l.includes('Bot') || l.includes('ذكاء')) {
            console.log(`${full}:${idx + 1}: ${l.trim()}`);
          }
        });
      }
    }
  }
}
walk('src');
console.log('Search done.');
