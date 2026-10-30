const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const premiumTabStart = '{activeTab === "premium" && (';
const helpTabStart = '{activeTab === "help" && (';
const editTabStart = '{activeTab === "edit" && (';

const newPremiumBlock = `{activeTab === "premium" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="mb-6 flex flex-col items-center text-center">
              <h1 className="text-3xl md:text-4xl font-josefin font-bold tracking-tight text-black mb-3">
                Prophile <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Premium</span>
              </h1>
              <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                Unlock cinematic aesthetics, deep analytics, and limitless customization to stand out from the crowd.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
              {/* Basic Tier */}
              <div
                className={\`bg-[#141414] border rounded-[1.5rem] p-6 flex flex-col justify-between relative transition-all duration-300 overflow-hidden \${activePlan === "free" ? "border-emerald-500 shadow-sm shadow-emerald-500/10" : "border-white/5 opacity-60 hover:opacity-100"}\`}
              >
                {activePlan === "free" && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest font-sans shadow-sm">
                    Active Plan
                  </div>
                )}
                <div className="relative z-10">
                  <h3 className="text-xl font-josefin font-bold text-white mt-2">
                    Essential
                  </h3>
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed h-10">
                    The core tools to build your identity and share your links.
                  </p>

                  <div className="flex items-baseline gap-1 mt-6 mb-6">
                    <span className="text-3xl font-josefin font-bold text-white">
                      Free
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Check size={12} className="text-white" /></div>
                      <span>Up to 5 custom social links</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Check size={12} className="text-white" /></div>
                      <span>Basic themes & colors</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-transparent border border-white/10 flex items-center justify-center shrink-0"></div>
                      <span>Cinematic Video Backgrounds</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-transparent border border-white/10 flex items-center justify-center shrink-0"></div>
                      <span>Detailed Traffic Analytics</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-transparent border border-white/10 flex items-center justify-center shrink-0"></div>
                      <span>Premium Profile Badges</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActivePlan("free")}
                  className={\`relative z-10 w-full font-bold text-sm py-3.5 rounded-full mt-8 transition-all \${activePlan === "free" ? "bg-[#252525] text-white border border-white/10 cursor-default" : "bg-white hover:bg-gray-200 text-black cursor-pointer"}\`}
                  disabled={activePlan === "free"}
                >
                  {activePlan === "free" ? "Active" : "Downgrade to Free"}
                </button>
              </div>

              {/* Premium Tier */}
              <div
                className={\`bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border rounded-[1.5rem] p-6 flex flex-col justify-between relative transition-all duration-300 overflow-hidden shadow-xl \${activePlan === "pro" ? "border-yellow-400 shadow-yellow-500/10 ring-1 ring-yellow-400" : "border-yellow-500/30 opacity-60 hover:opacity-100 hover:border-yellow-400/50"}\`}
              >
                {activePlan === "pro" && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest font-sans shadow-md shadow-yellow-500/20 z-20">
                    Active Plan
                  </div>
                )}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mt-2">
                    <h3 className="text-xl font-josefin font-bold text-white">
                      Prophile+
                    </h3>
                  </div>
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed h-10">
                    Maximum aesthetic control and deep audience insights.
                  </p>

                  <div className="flex items-baseline gap-1 mt-6 mb-6">
                    <span className="text-3xl font-josefin font-bold text-white">
                      $4.99
                    </span>
                    <span className="text-gray-400 text-sm">/ mo</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0"><Check size={12} className="text-yellow-500" /></div>
                      <span>Everything in Essential</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white font-medium">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0"><Check size={12} className="text-yellow-500" /></div>
                      <span>Cinematic 4K Video Backgrounds</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white font-medium">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0"><Check size={12} className="text-yellow-500" /></div>
                      <span>Advanced Traffic Analytics</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white font-medium">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0"><Check size={12} className="text-yellow-500" /></div>
                      <span>Unlimited Links & Sections</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white font-medium">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0"><Check size={12} className="text-yellow-500" /></div>
                      <span>Verified Profile Badge</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActivePlan("pro")}
                  className={\`relative z-10 w-full font-bold text-sm py-3.5 rounded-full mt-8 transition-all \${activePlan === "pro" ? "bg-[#252525] text-white border border-white/10 cursor-default" : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black shadow-lg shadow-yellow-500/20 cursor-pointer hover:scale-[1.02]"}\`}
                  disabled={activePlan === "pro"}
                >
                  {activePlan === "pro" ? "Active" : "Upgrade to Prophile+"}
                </button>
              </div>
            </div>
            
            <p className="text-center text-xs text-gray-600 mt-4 max-w-lg mx-auto">
              Test features locally before subscribing. Features will lock upon deployment if not subscribed.
            </p>
          </div>
        )}`;

const premiumStartIdx = code.indexOf(premiumTabStart);
const helpStartIdx = code.indexOf(helpTabStart);

if (premiumStartIdx !== -1 && helpStartIdx !== -1) {
  code = code.substring(0, premiumStartIdx) + newPremiumBlock + '\n        ' + code.substring(helpStartIdx);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Updated App.tsx successfully");
} else {
  console.log("Could not find tab sections.");
}
