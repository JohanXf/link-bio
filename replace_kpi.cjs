const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/\{\s*\{\s*Daily:\s*"492",\s*Weekly:\s*"3,482",\s*Monthly:\s*"14,842",\s*"All Time":\s*"142,482",\s*\}\[analyticsPeriod\]\s*\}/g, '{analyticsData ? analyticsData.views : "..."}');

code = code.replace(/\{\s*\{\s*Daily:\s*"182",\s*Weekly:\s*"1,294",\s*Monthly:\s*"5,194",\s*"All Time":\s*"54,294",\s*\}\[analyticsPeriod\]\s*\}/g, '{analyticsData ? analyticsData.clicks : "..."}');

code = code.replace(/\{\s*\{\s*Daily:\s*"36\.9%",\s*Weekly:\s*"37\.1%",\s*Monthly:\s*"34\.9%",\s*"All Time":\s*"38\.1%",\s*\}\[analyticsPeriod\]\s*\}/g, '{analyticsData ? analyticsData.ctr + "%" : "..."}');

fs.writeFileSync('src/App.tsx', code);
