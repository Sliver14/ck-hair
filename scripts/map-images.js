const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'ck-hair');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpeg') && f.startsWith('WhatsApp'));

console.log(`Found ${files.length} images.`);

files.forEach((f, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const destName = `ck-hair-${num}.jpeg`;
  const src = path.join(dir, f);
  const dest = path.join(dir, destName);
  fs.copyFileSync(src, dest);
  console.log(`Mapped: ${f} -> ${destName}`);
});
