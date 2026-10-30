const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const endAnalyticsMarker = '{activeTab === "settings" && (';
const newLeaderboardBlock = fs.readFileSync('leaderboard_block.txt', 'utf8') + '\n        ';

code = code.replace(endAnalyticsMarker, newLeaderboardBlock + endAnalyticsMarker);
fs.writeFileSync('src/App.tsx', code);
