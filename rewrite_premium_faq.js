const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const helpTabStart = '{activeTab === "help" && (';
const editTabStart = '{activeTab === "edit" && (';

const premiumTabStart = '{activeTab === "premium" && (';
// premium ends at helpTabStart

const newPremiumBlock = `{activeTab === "premium" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-[10px] font-bold uppercase tracking-wider mb-4">
                Upgrade your Profile
              </div>
              <h1 className="text-3xl md:text-4xl font-josefin font-bold tracking-tight text-white mb-3">
                Prophile <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">Premium</span>
              </h1>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                Unlock cinematic aesthetics, deep analytics, and limitless customization to stand out from the crowd.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Basic Tier */}
              <div
                className={\`bg-[#141414] border rounded-[1.5rem] p-6 flex flex-col justify-between relative transition-all duration-300 \${activePlan === "free" ? "border-gray-600 bg-white/[0.02]" : "border-white/5 opacity-70 hover:opacity-100"}\`}
              >
                {activePlan === "free" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest font-sans shadow-lg">
                    Current Plan
                  </div>
                )}
                <div>
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
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0"><span className="text-white">✓</span></div>
                      <span>Up to 5 custom social links</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0"><span className="text-white">✓</span></div>
                      <span>Basic themes & colors</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="w-5 h-5 rounded-full bg-transparent border border-white/10 flex items-center justify-center shrink-0"></div>
                      <span>Cinematic Video Backgrounds</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="w-5 h-5 rounded-full bg-transparent border border-white/10 flex items-center justify-center shrink-0"></div>
                      <span>Detailed Traffic Analytics</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="w-5 h-5 rounded-full bg-transparent border border-white/10 flex items-center justify-center shrink-0"></div>
                      <span>Premium Profile Badges</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActivePlan("free")}
                  className={\`w-full font-bold text-sm py-3.5 rounded-full mt-8 transition-all \${activePlan === "free" ? "bg-[#252525] text-white border border-white/10 cursor-default" : "bg-white hover:bg-gray-200 text-black cursor-pointer"}\`}
                  disabled={activePlan === "free"}
                >
                  {activePlan === "free" ? "Active" : "Downgrade to Free"}
                </button>
              </div>

              {/* Premium Tier */}
              <div
                className={\`bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border rounded-[1.5rem] p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-2xl \${activePlan === "pro" ? "border-yellow-500/50 shadow-yellow-500/10 ring-1 ring-yellow-500/20" : "border-yellow-500/20 hover:border-yellow-500/40"}\`}
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                {activePlan === "pro" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest font-sans shadow-lg shadow-yellow-500/20">
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
                    <span className="text-gray-500 text-sm">/ mo</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0"><span className="text-yellow-500">✓</span></div>
                      <span>Everything in Essential</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white font-medium">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0"><span className="text-yellow-500">✓</span></div>
                      <span>Cinematic 4K Video Backgrounds</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white font-medium">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0"><span className="text-yellow-500">✓</span></div>
                      <span>Advanced Traffic Analytics</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white font-medium">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0"><span className="text-yellow-500">✓</span></div>
                      <span>Unlimited Links & Sections</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white font-medium">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0"><span className="text-yellow-500">✓</span></div>
                      <span>Verified Profile Badge</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActivePlan("pro")}
                  className={\`relative z-10 w-full font-bold text-sm py-3.5 rounded-full mt-8 transition-all \${activePlan === "pro" ? "bg-[#252525] text-white border border-white/10 cursor-default" : "bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black shadow-lg shadow-yellow-500/20 cursor-pointer hover:scale-[1.02]"}\`}
                  disabled={activePlan === "pro"}
                >
                  {activePlan === "pro" ? "Active" : "Upgrade to Prophile+"}
                </button>
              </div>
            </div>
            
            <p className="text-center text-xs text-gray-500 mt-4 max-w-lg mx-auto">
              Test features locally before subscribing. Features will lock upon deployment if not subscribed.
            </p>
          </div>
        )}
`;

const newHelpBlock = `{activeTab === "help" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-[32px] font-josefin font-bold tracking-tight text-white">
                Help & Support
              </h1>
              <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
                Everything you need to know about managing your Prophile.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 transition-colors hover:border-white/10">
                <h4 className="text-white font-josefin font-bold text-lg mb-2">
                  How do I customize my page URL?
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  You can change your username from the <strong>Edit Profile</strong> tab. This determines your public URL (e.g., prophile.app/username). Note that usernames must be unique and can only be changed once every 14 days.
                </p>
              </div>

              <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 transition-colors hover:border-white/10">
                <h4 className="text-white font-josefin font-bold text-lg mb-2">
                  What makes Premium different?
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Prophile+ unlocks advanced aesthetic features like 4K video backgrounds, glassmorphism card effects, and deep analytics to track your audience engagement. It also removes all link limits.
                </p>
              </div>

              <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 transition-colors hover:border-white/10">
                <h4 className="text-white font-josefin font-bold text-lg mb-2">
                  How do the analytics work?
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our analytics dashboard tracks total page views, individual link clicks, and calculates your Click-Through Rate (CTR). Prophile+ users get extended history and geographic breakdown of their visitors.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-center">
              <h3 className="text-white font-josefin font-bold text-xl mb-2">Still need help?</h3>
              <p className="text-gray-400 text-sm mb-6">Our support team is always ready to assist you with any technical issues or billing questions.</p>
              <a href="mailto:support@prophile.app" className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        )}
`;

const premiumStartIdx = code.indexOf(premiumTabStart);
const helpStartIdx = code.indexOf(helpTabStart);
const editStartIdx = code.indexOf(editTabStart);

if (premiumStartIdx !== -1 && helpStartIdx !== -1 && editStartIdx !== -1) {
  code = code.substring(0, premiumStartIdx) + newPremiumBlock + '\n        ' + newHelpBlock + '\n        ' + code.substring(editStartIdx);
  fs.writeFileSync('src/App.tsx', code);
}
