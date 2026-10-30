const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = '{activeTab === "analytics" && (';
const endMarker = '{activeTab === "settings" && (';

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newAnalyticsBlock = fs.readFileSync('analytics_block.txt', 'utf8') + '\n        ';
  code = code.substring(0, startIndex) + newAnalyticsBlock + code.substring(endIndex);
  fs.writeFileSync('src/App.tsx', code);
}
