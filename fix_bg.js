const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/bg-\\\[#d4d4d4\\\]/g, 'bg-[#d4d4d4]');
fs.writeFileSync('src/App.tsx', code);
