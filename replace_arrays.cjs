const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexReferrals = /\{\s*\(\s*\{\s*Daily:\s*\[[\s\S]*?\}\[analyticsPeriod\]\s*\|\|\s*\[\]\s*\)\.map\(\(item\)\s*=>\s*\([\s\S]*?\)\s*\)\}/;

code = code.replace(regexReferrals, `
                  {analyticsData ? analyticsData.sources.map((item) => (
                    <div key={item.source} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-[13px]">
                        <span className="text-gray-300 font-semibold font-sans">{item.source}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-mono font-bold">{item.clicks}</span>
                          <span className="text-gray-500 font-mono w-8 text-right">{item.pct}%</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-[#252525] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: \`\${item.pct}%\` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={\`h-full \${item.color}\`}
                        />
                      </div>
                    </div>
                  )) : "..."}
`);

const regexCountries = /\{\s*\(\s*\{\s*Daily:\s*\[[\s\S]*?\}\[analyticsPeriod\]\s*\|\|\s*\[\]\s*\)\.map\(\(loc\)\s*=>\s*\([\s\S]*?\)\s*\)\}/;

code = code.replace(regexCountries, `
                  {analyticsData ? analyticsData.countries.map((loc) => (
                    <div key={loc.country} className="flex justify-between items-center bg-white/[0.02] hover:bg-white/5 transition-colors p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-gray-200 font-semibold">{loc.country}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[13px]">
                        <span className="text-white font-mono font-bold">{loc.visitors}</span>
                        <span className="text-gray-500 font-mono w-8 text-right">{loc.pct}%</span>
                      </div>
                    </div>
                  )) : "..."}
`);

fs.writeFileSync('src/App.tsx', code);
