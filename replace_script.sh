sed -i '1842,1964c\
                  {analyticsData ? analyticsData.sources.map((ref: any) => (\
                    <div key={ref.source} className="space-y-1.5">\
                      <div className="flex items-center justify-between text-xs font-medium">\
                        <span className="text-gray-300">{ref.source}</span>\
                        <span className="text-gray-400 font-mono">\
                          {ref.clicks} clicks ({ref.pct}%)\
                        </span>\
                      </div>\
                      <div className="w-full bg-[#1e1e24] h-1.5 rounded-full overflow-hidden">\
                        <div\
                          className={`h-full ${ref.color} rounded-full`}\
                          style={{ width: `${ref.pct}%` }}\
                        />\
                      </div>\
                    </div>\
                  )) : null}' src/App.tsx

sed -i '1965,2033c\
                  {analyticsData ? analyticsData.countries.map((geo: any, idx: number) => (\
                    <div\
                      key={geo.country}\
                      className="flex items-center justify-between text-xs"\
                    >\
                      <div className="flex items-center gap-2">\
                        <span className="text-gray-400 font-medium font-mono">\
                          #{idx + 1}\
                        </span>\
                        <span className="text-gray-300 font-medium">\
                          {geo.country}\
                        </span>\
                      </div>\
                      <span className="text-gray-400 font-mono font-semibold">\
                        {geo.visitors} visitors\
                      </span>\
                    </div>\
                  )) : null}' src/App.tsx
