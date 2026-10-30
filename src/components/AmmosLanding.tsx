import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Check,
  Disc,
  Play,
  Pause,
  Sun,
  Menu,
  X,
  Twitter,
  Github,
  Instagram,
} from "lucide-react";

export interface ProfileData {
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  audioUrl?: string;
  audioTitle?: string;
  videoBackgroundUrl?: string;
  videoBackgroundEnabled?: boolean;
  links?: Array<{ id: number; title: string; url: string }>;
  [key: string]: any;
}

interface AmmosLandingProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  userEmail: string | null;
  onSignOut: () => void;
  onDashboardClick: () => void;
  profileData: ProfileData;
}

export function AmmosLanding({
  onLoginClick,
  onSignUpClick,
  userEmail,
  onSignOut,
  onDashboardClick,
}: AmmosLandingProps) {
  const [username, setUsername] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Live analog clock state
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secAngle = seconds * 6;
  const minAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  // Audio player preview toggle state
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  const faqs = [
    {
      q: "What is Prophile?",
      a: "Prophile is a customizable link-in-bio platform built for creators, musicians, gamers, and builders. It gives you one clean page for your links, social profiles, and content.",
    },
    {
      q: "Is Prophile free to use?",
      a: "Yes. You can create and customize your page for free. Premium is an optional one-time unlock if you want more effects and customization.",
    },
    {
      q: "How is Prophile different from other platforms?",
      a: "Prophile focuses on deep customization: profile effects, background video, music, and live widgets. Premium is a one-time unlock rather than a recurring subscription.",
    },
    {
      q: "How long does it take to set up my page?",
      a: "Less than two minutes. Claim your username, add your links, pick a layout or track, and your page is ready to share.",
    },
  ];

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      onDashboardClick();
    } else {
      onSignUpClick();
    }
  };

  return (
    <div className="min-h-screen bg-texture text-black font-sans relative selection:bg-black/15 selection:text-black overflow-x-hidden">
      {/* ============================================================== */}
      {/* Header / Floating Pill Navbar */}
      {/* ============================================================== */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none">
        <div className="mx-auto max-w-5xl pointer-events-auto">
          <nav className="bg-[#d4d4d4]/95 backdrop-blur-md border border-[#c4c4c4] rounded-[28px] overflow-hidden shadow-sm transition-all">
            <div className="px-5 sm:px-6 h-14 flex items-center justify-between gap-6">
              {/* Brand Logo & Wordmark */}
              <a
                href="/"
                className="flex items-center gap-2 font-josefin font-bold text-[15px] tracking-tight text-black whitespace-nowrap shrink-0"
              >
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-josefin font-bold text-[15px]">
                  P
                </div>
                <span>Prophile</span>
              </a>

              {/* Nav Links (Desktop) */}
              <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-700">
                <a
                  href="#widgets"
                  className="hover:text-black transition-colors whitespace-nowrap"
                >
                  Widgets
                </a>
                <a
                  href="#pricing"
                  className="hover:text-black transition-colors whitespace-nowrap"
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  className="hover:text-black transition-colors whitespace-nowrap"
                >
                  FAQ
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors whitespace-nowrap"
                >
                  Discord
                </a>
              </div>

              {/* Actions Zone */}
              <div className="flex items-center gap-2.5 shrink-0">
                {userEmail ? (
                  <>
                    <button
                      onClick={onDashboardClick}
                      className="bg-[#18181b] hover:bg-[#27272a] text-white font-josefin font-bold text-[14px] py-1.5 px-4 rounded-full transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={onSignOut}
                      className="text-gray-700 hover:text-black text-xs font-semibold px-2 py-1 transition-colors cursor-pointer whitespace-nowrap hidden sm:block"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={onLoginClick}
                      className="font-josefin font-bold text-[14px] text-gray-700 hover:text-black transition-colors cursor-pointer hidden sm:block whitespace-nowrap"
                    >
                      Log in
                    </button>
                    <button
                      onClick={onSignUpClick}
                      className="bg-[#18181b] hover:bg-[#27272a] text-white font-josefin font-bold text-[14px] py-1.5 px-4 rounded-full transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      Sign up
                    </button>
                  </>
                )}

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 text-gray-800 hover:text-black md:hidden cursor-pointer"
                  aria-label="Toggle Menu"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden border-t border-[#c4c4c4] px-6 py-4"
                >
                  <div className="flex flex-col gap-3 text-sm font-josefin font-semibold text-gray-800">
                    <a
                      href="#widgets"
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-black py-1 transition-colors"
                    >
                      Widgets
                    </a>
                    <a
                      href="#pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-black py-1 transition-colors"
                    >
                      Pricing
                    </a>
                    <a
                      href="#faq"
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-black py-1 transition-colors"
                    >
                      FAQ
                    </a>
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black py-1 transition-colors"
                    >
                      Discord
                    </a>
                    {userEmail ? (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onSignOut();
                        }}
                        className="text-left py-1 text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                      >
                        Sign out
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onLoginClick();
                        }}
                        className="text-left py-1 text-gray-800 hover:text-black transition-colors cursor-pointer"
                      >
                        Log in
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-32 sm:pt-40">
        {/* ============================================================== */}
        {/* Hero Section */}
        {/* ============================================================== */}
        <section className="px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Top Announcement Pill */}
          <a
            href="#pricing"
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141414] text-white border border-black/10 hover:bg-[#222] text-xs transition-all duration-200 shadow-sm group mb-8"
          >
            <span className="bg-white text-black font-bold px-2 py-0.5 rounded-full font-mono text-[11px]">
              $4.99
            </span>
            <span className="text-gray-200 group-hover:text-white transition-colors">
              Premium: pay once, keep forever
            </span>
            <ArrowRight size={14} className="text-gray-300 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Hero Title */}
          <h1 className="font-josefin text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[1.03] max-w-3xl">
            Be unmistakably<br />
            <span>you.</span>
          </h1>

          {/* Lead Text */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
            One link, styled down to the cursor. Effects, music and live widgets — free to start, ready in minutes.
          </p>

          {/* Username Claim Bar */}
          <form
            onSubmit={handleClaimSubmit}
            className="w-full max-w-md sm:max-w-lg mt-10 bg-[#141414] rounded-full p-2 border border-white/10 shadow-lg flex items-center transition-all duration-200"
          >
            <span className="text-gray-400 pl-4 pr-1 font-semibold text-sm sm:text-base select-none shrink-0 font-mono">
              prophile.app/
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, ""))}
              placeholder="username"
              maxLength={24}
              className="flex-1 bg-transparent px-2 py-2.5 outline-none text-white font-semibold text-sm sm:text-base placeholder:text-white/30 w-full"
            />
            <button
              type="submit"
              className="bg-[#d4d4d4] hover:bg-white text-black px-6 sm:px-7 py-3 rounded-full font-semibold transition-all duration-200 shrink-0 cursor-pointer shadow-sm active:scale-95 text-xs sm:text-sm"
            >
              Claim
            </button>
          </form>
        </section>

        {/* ============================================================== */}
        {/* About Section */}
        {/* ============================================================== */}
        <section className="mt-28 sm:mt-36 px-6 max-w-3xl mx-auto text-center">
          <h2 className="font-josefin text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight">
            A free link in bio.
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Prophile is one page for your links, socials and content. Style it with effects, music and live widgets, then share a single URL.
          </p>
        </section>

        {/* ============================================================== */}
        {/* Profile Showcase Preview */}
        {/* ============================================================== */}
        <section className="mt-14 sm:mt-20 px-4 sm:px-6 max-w-md mx-auto">
          <div className="w-full bg-[#141414] border border-white/10 rounded-[1.75rem] p-6 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-full bg-white/10 p-0.5 shadow-md">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#141414] rounded-full" />
              </div>

              <div className="flex items-center gap-1.5">
                <h3 className="font-josefin font-bold text-lg text-white">Faizen</h3>
              </div>
              <p className="text-gray-400 text-xs mt-1 max-w-[240px]">
                Visual designer & music producer building for the modern web.
              </p>

              {/* Audio Track Preview */}
              <div className="w-full mt-4 bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shrink-0"
                  >
                    {isPlayingAudio ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
                  </button>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white leading-tight">After Hours</div>
                    <div className="text-[10px] text-gray-400">The Weeknd</div>
                  </div>
                </div>

                <div className="flex items-end gap-0.5 h-4 pr-1">
                  {[40, 90, 60, 100, 75, 45, 80, 50].map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        height: isPlayingAudio ? `${h}%` : "20%",
                      }}
                      className="w-1 bg-white rounded-full transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="w-full mt-4 space-y-2.5">
                <div className="w-full py-2.5 px-4 rounded-xl bg-white/[0.07] hover:bg-white/15 border border-white/5 flex items-center justify-between text-xs font-medium text-white transition-all cursor-pointer">
                  <span>Spotify</span>
                  <ExternalLink size={13} className="text-gray-400" />
                </div>
                <div className="w-full py-2.5 px-4 rounded-xl bg-white/[0.07] hover:bg-white/15 border border-white/5 flex items-center justify-between text-xs font-medium text-white transition-all cursor-pointer">
                  <span>YouTube</span>
                  <ExternalLink size={13} className="text-gray-400" />
                </div>
                <div className="w-full py-2.5 px-4 rounded-xl bg-white/[0.07] hover:bg-white/15 border border-white/5 flex items-center justify-between text-xs font-medium text-white transition-all cursor-pointer">
                  <span>Discord</span>
                  <ExternalLink size={13} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* Live Widgets Showcase */}
        {/* ============================================================== */}
        <section id="widgets" className="mt-28 sm:mt-36 px-6 max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-josefin text-4xl sm:text-5xl font-bold text-black tracking-tight leading-tight">
              Alive, even when you're not.
            </h2>
            <p className="mt-3 text-gray-600 text-base leading-relaxed">
              Discord status, Spotify, weather and local time — updating on their own, around the clock.
            </p>
          </div>

          {/* Grid of Live Widgets */}
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Widget 1: Discord Community Card */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-white">
                  <svg width="22" height="22" viewBox="0 0 127.14 96.36" fill="currentColor">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-josefin font-bold text-white text-base">Prophile Community</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>4,820 online · 18.5k members</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Discord Server</span>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full transition-colors"
                >
                  <span>Join Server</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Widget 2: Live Presence */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center font-josefin font-bold text-white text-lg">
                  F
                </div>
                <div>
                  <span className="font-josefin font-bold text-white text-base block">faizen</span>
                  <span className="text-xs text-gray-400 block">
                    Listening to Spotify
                  </span>
                </div>
              </div>
              <div className="mt-4 bg-black rounded-xl p-3 border border-white/5 flex items-center gap-2.5">
                <Disc size={18} className="text-white animate-spin" style={{ animationDuration: "6s" }} />
                <div className="truncate">
                  <div className="text-xs font-medium text-white truncate">Starboy</div>
                  <div className="text-[10px] text-gray-400 truncate">The Weeknd · Daft Punk</div>
                </div>
              </div>
            </div>

            {/* Widget 3: Live Weather Widget */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-josefin font-bold text-white text-base">Tokyo</h4>
                  <div className="text-3xl font-josefin font-bold text-white mt-1">24°C</div>
                  <div className="text-xs text-gray-400 mt-0.5">Partly cloudy</div>
                </div>
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Sun size={20} />
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                <span>Feels 23°</span>
                <span>·</span>
                <span>61% humidity</span>
                <span>·</span>
                <span>14 km/h</span>
              </div>
            </div>

            {/* Widget 4: Live Analog & Digital Clock */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 flex items-center gap-5 shadow-lg">
              <div className="relative shrink-0">
                <svg
                  viewBox="0 0 100 100"
                  width="76"
                  height="76"
                  className="rounded-full bg-black border border-white/10"
                >
                  <circle cx="50" cy="50" r="48" fill="#141414" stroke="#252525" strokeWidth="2" />
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <line
                      key={deg}
                      x1="50"
                      y1="8"
                      x2="50"
                      y2={deg % 90 === 0 ? "14" : "11"}
                      stroke={deg % 90 === 0 ? "#ffffff" : "#555"}
                      strokeWidth={deg % 90 === 0 ? "2" : "1"}
                      strokeLinecap="round"
                      transform={`rotate(${deg} 50 50)`}
                    />
                  ))}
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="25"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    transform={`rotate(${hourAngle} 50 50)`}
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="18"
                    stroke="#d4d4d4"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    transform={`rotate(${minAngle} 50 50)`}
                  />
                  <line
                    x1="50"
                    y1="56"
                    x2="50"
                    y2="14"
                    stroke="#999999"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    transform={`rotate(${secAngle} 50 50)`}
                  />
                  <circle cx="50" cy="50" r="2.5" fill="#ffffff" />
                </svg>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-mono">Local Time</span>
                <h4 className="font-josefin font-bold text-2xl text-white tracking-tight mt-0.5 tabular-nums">
                  {time.toLocaleTimeString()}
                </h4>
                <div className="text-xs text-gray-400 font-medium mt-1">
                  UTC{time.getTimezoneOffset() <= 0 ? "+" : "-"}{Math.abs(Math.round(time.getTimezoneOffset() / 60))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* Pricing Section */}
        {/* ============================================================== */}
        <section id="pricing" className="mt-28 sm:mt-36 px-6 max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-josefin text-4xl sm:text-5xl font-bold text-black tracking-tight leading-tight">
              Pay once. Or never.
            </h2>
            <p className="mt-3 text-gray-600 text-base leading-relaxed">
              Start free. Unlock advanced customization and effects with Premium — no subscription, ever.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free Tier */}
            <div className="bg-[#141414] border border-white/10 rounded-[1.75rem] p-8 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="font-josefin text-2xl font-bold text-white">Free</h3>
                <p className="text-gray-400 text-xs mt-1.5">
                  Build a personalized profile at no cost.
                </p>

                <div className="flex items-baseline gap-1 mt-6 mb-8">
                  <span className="font-josefin text-4xl font-bold text-white">$0</span>
                  <span className="text-gray-400 text-sm font-medium">/ lifetime</span>
                </div>

                <div className="space-y-3.5 text-xs text-gray-300">
                  <div className="flex items-center gap-3">
                    <Check size={15} className="text-white shrink-0" />
                    <span>Up to 5 custom social links</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={15} className="text-white shrink-0" />
                    <span>Basic themes & colors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={15} className="text-white shrink-0" />
                    <span>Background music upload</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={15} className="text-white shrink-0" />
                    <span>Standard profile layouts</span>
                  </div>
                </div>
              </div>

              <button
                onClick={userEmail ? onDashboardClick : onSignUpClick}
                className="w-full mt-10 py-3.5 px-6 rounded-full bg-[#252525] hover:bg-[#333] text-white border border-white/10 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                Start Free
              </button>
            </div>

            {/* Premium Tier */}
            <div className="bg-[#141414] border-2 border-white/30 rounded-[1.75rem] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-xl font-sans">
                Lifetime
              </div>

              <div>
                <h3 className="font-josefin text-2xl font-bold text-white">
                  Premium
                </h3>
                <p className="text-gray-400 text-xs mt-1.5">
                  More control. More effects. More everything.
                </p>

                <div className="flex items-baseline gap-1 mt-6 mb-8">
                  <span className="font-josefin text-4xl font-bold text-white">$4.99</span>
                  <span className="text-gray-400 text-sm font-medium">/ lifetime</span>
                </div>

                <div className="space-y-3.5 text-xs text-gray-200 font-medium">
                  <div className="flex items-center gap-3">
                    <Check size={15} className="text-white shrink-0" />
                    <span>Everything in Free</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={15} className="text-white shrink-0" />
                    <span>Cinematic 4K video backgrounds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={15} className="text-white shrink-0" />
                    <span>Advanced traffic analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={15} className="text-white shrink-0" />
                    <span>Custom fonts, colors & glassmorphism</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={15} className="text-white shrink-0" />
                    <span>Verified profile badge</span>
                  </div>
                </div>
              </div>

              <button
                onClick={userEmail ? onDashboardClick : onSignUpClick}
                className="w-full mt-10 py-3.5 px-6 rounded-full bg-white hover:bg-gray-200 text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
              >
                Get Premium
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* FAQ Section */}
        {/* ============================================================== */}
        <section id="faq" className="mt-28 sm:mt-36 px-6 max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-josefin text-4xl sm:text-5xl font-bold text-black tracking-tight leading-tight">
              Questions, answered.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden transition-colors shadow-md"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-josefin font-bold text-base sm:text-lg text-white flex items-center gap-3">
                      <span className="text-gray-500 font-mono text-xs">
                        0{index + 1}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-gray-400 leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================== */}
        {/* Footer */}
        {/* ============================================================== */}
        <footer className="mt-28 sm:mt-36 border-t border-[#c4c4c4] bg-[#d4d4d4] py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <a
              href="/"
              className="flex items-center gap-2 font-josefin font-bold text-[15px] tracking-tight text-black"
            >
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-josefin font-bold text-[15px] shadow-sm">
                P
              </div>
              <span>Prophile</span>
            </a>

            <p className="text-gray-600 text-xs font-medium">
              © {new Date().getFullYear()} Prophile. All rights reserved.
            </p>

            <div className="flex items-center gap-5 text-gray-600">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                <Github size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
