/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Music, BarChart2, Image as ImageIcon, Zap, Github, Twitter, Instagram, Play, ArrowLeft, Eye, Crown, Menu, Sun, Upload, ExternalLink, Trash2, Plus, X, Home, User, Settings, HelpCircle, LogOut, Globe, Mail, Youtube, Linkedin, Facebook, Twitch, Link as LinkIcon, MessageCircle, BookOpen, FileText, Briefcase } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

import { AuthModal } from './components/AuthModal';
import { supabase } from './lib/supabase';

function getLinkIcon(url: string, title?: string, iconSize: number = 18) {
  const normUrl = (url || '').toLowerCase();
  const normTitle = (title || '').toLowerCase();
  
  if (normUrl.includes('google.com') || normUrl.includes('google.') || normTitle.includes('google')) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    );
  }
  if (normUrl.includes('gmail') || normTitle.includes('gmail') || normTitle.includes('email') || normTitle.includes('mail')) {
    return <Mail size={iconSize} />;
  }
  if (normUrl.includes('github') || normTitle.includes('github')) {
    return <Github size={iconSize} />;
  }
  if (normUrl.includes('twitter') || normUrl.includes('x.com') || normTitle.includes('twitter') || normTitle.includes(' x ')) {
    return <Twitter size={iconSize} />;
  }
  if (normUrl.includes('instagram') || normTitle.includes('instagram') || normTitle.includes('insta')) {
    return <Instagram size={iconSize} />;
  }
  if (normUrl.includes('youtube') || normUrl.includes('youtu.be') || normTitle.includes('youtube') || normTitle.includes('video')) {
    return <Youtube size={iconSize} />;
  }
  if (normUrl.includes('linkedin') || normTitle.includes('linkedin')) {
    return <Linkedin size={iconSize} />;
  }
  if (normUrl.includes('facebook') || normTitle.includes('facebook') || normTitle.includes('fb')) {
    return <Facebook size={iconSize} />;
  }
  if (normUrl.includes('twitch') || normTitle.includes('twitch')) {
    return <Twitch size={iconSize} />;
  }
  if (normUrl.includes('spotify') || normUrl.includes('soundcloud') || normUrl.includes('apple.com') || normTitle.includes('spotify') || normTitle.includes('music') || normTitle.includes('song')) {
    return <Music size={iconSize} />;
  }
  if (normUrl.includes('discord') || normTitle.includes('discord')) {
    return <MessageCircle size={iconSize} className="text-indigo-400" />;
  }
  if (normUrl.includes('telegram') || normUrl.includes('t.me') || normTitle.includes('telegram')) {
    return <MessageCircle size={iconSize} className="text-sky-400" />;
  }
  if (normUrl.includes('whatsapp') || normTitle.includes('whatsapp') || normTitle.includes('wa.me')) {
    return <MessageCircle size={iconSize} className="text-emerald-400" />;
  }
  if (normUrl.includes('portfolio') || normUrl.includes('blog') || normTitle.includes('portfolio') || normTitle.includes('blog') || normTitle.includes('website')) {
    return <Globe size={iconSize} />;
  }
  if (normUrl.includes('resume') || normUrl.includes('cv') || normTitle.includes('resume') || normTitle.includes('cv') || normTitle.includes('pdf')) {
    return <FileText size={iconSize} />;
  }
  if (normUrl.includes('job') || normUrl.includes('work') || normTitle.includes('job') || normTitle.includes('work') || normTitle.includes('career')) {
    return <Briefcase size={iconSize} />;
  }
  if (normUrl.includes('book') || normUrl.includes('read') || normTitle.includes('book') || normTitle.includes('reading') || normTitle.includes('medium.com')) {
    return <BookOpen size={iconSize} />;
  }
  
  return <LinkIcon size={iconSize} />;
}

function Navbar({ onLoginClick, userEmail, onSignOut, onDashboardClick }: { onLoginClick: () => void, userEmail: string | null, onSignOut: () => void, onDashboardClick: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f0f0f0]/90 backdrop-blur-md border-b border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-josefin font-bold text-xl">
            n
          </div>
          <span className="font-josefin font-bold text-xl tracking-tight text-black">nads.io</span>
        </div>
        <div className="flex items-center gap-4">
          {userEmail ? (
            <>
              <button onClick={onDashboardClick} className="text-sm font-semibold text-gray-700 hover:text-black transition-colors cursor-pointer">
                Editor
              </button>
              <button onClick={onSignOut} className="font-josefin font-bold text-sm bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer">
                Sign out
              </button>
            </>
          ) : (
            <>
              <button onClick={onLoginClick} className="text-sm font-medium text-gray-700 hover:text-black transition-colors hidden sm:block cursor-pointer">Log in</button>
              <button onClick={onLoginClick} className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200 cursor-pointer">
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function LinkCard({ title, icon, highlight }: { title: string, icon: React.ReactNode, highlight?: boolean }) {
  return (
    <div className={`w-full relative overflow-hidden backdrop-blur-md rounded-2xl p-4 flex items-center justify-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] ${highlight ? 'bg-indigo-500 text-white border border-indigo-400 shadow-lg shadow-indigo-500/20' : 'bg-white/10 text-white border border-white/10 hover:bg-white/15'}`}>
      <div className="absolute left-4 opacity-80">
        {icon}
      </div>
      <span className="text-sm font-semibold">{title}</span>
    </div>
  );
}

function MusicCard() {
  return (
    <div className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex items-center gap-3 hover:bg-white/15 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer group">
      <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-indigo-500/30">
        <Music size={20} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate group-hover:text-indigo-200 transition-colors">Lofi Beats to Code To</p>
        <p className="text-xs text-indigo-200/70 truncate mt-0.5">Spotify</p>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, rotateX: 10, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
      className="relative w-[320px] h-[650px] bg-black rounded-[3rem] border-[12px] border-black shadow-2xl overflow-hidden shadow-indigo-500/30"
    >
      <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
        <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
      </div>

      <div className="absolute inset-0 bg-neutral-900 text-white overflow-y-auto no-scrollbar pb-10">
        <div className="relative h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
           <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="flex flex-col items-center px-6 -mt-12 relative z-10">
           <div className="relative">
             <motion.div 
               animate={{ boxShadow: ['0px 0px 0px 0px rgba(99,102,241,0)', '0px 0px 30px 10px rgba(99,102,241,0.4)', '0px 0px 0px 0px rgba(99,102,241,0)'] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="w-24 h-24 rounded-full absolute inset-0 z-0"
             />
             <div className="w-24 h-24 rounded-full border-4 border-neutral-900 bg-white overflow-hidden p-1 relative z-10 shadow-xl shadow-black/50">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e6e6fa" alt="Avatar" className="w-full h-full rounded-full object-cover bg-indigo-50" />
             </div>
           </div>

           <h2 className="mt-4 font-josefin font-bold text-xl drop-shadow-md">JohanXf</h2>
           <p className="text-sm border flex items-center justify-center rounded-3xl px-2.5 py-1 w-full text-indigo-100/80 mt-2 text-center border-white/20 bg-white/5 backdrop-blur-md">
             Builder. Writer. Creator of cool things.
           </p>
           
           <div className="flex gap-4 mt-6">
             <div className="p-2.5 rounded-full bg-white/5 text-white hover:bg-white/20 transition-colors shadow-sm ring-1 ring-white/10 cursor-pointer"><Twitter size={18} /></div>
             <div className="p-2.5 rounded-full bg-white/5 text-white hover:bg-white/20 transition-colors shadow-sm ring-1 ring-white/10 cursor-pointer"><Github size={18} /></div>
             <div className="p-2.5 rounded-full bg-white/5 text-white hover:bg-white/20 transition-colors shadow-sm ring-1 ring-white/10 cursor-pointer"><Instagram size={18} /></div>
           </div>

           <div className="w-full mt-8 space-y-3.5">
             <LinkCard title="Read my latest essay" icon={<Zap size={18} />} />
             <LinkCard title="Try my new SaaS" icon={<Sparkles size={18} />} highlight />
             <MusicCard />
             <LinkCard title="My Coding Setup 2026" icon={<ImageIcon size={18} />} />
           </div>
           
           <div className="mt-10 font-josefin font-bold text-lg text-white/20 tracking-tight flex items-center gap-1">
             <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center text-[10px] text-neutral-900 font-josefin font-bold">n</div>
             nads.io
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function Hero({ onNavigate, onLoginClick }: { onNavigate: () => void, onLoginClick: () => void }) {
  return (
    <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8 min-h-[calc(100vh-4rem)]">
      <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-8 shadow-sm"
        >
          <Sparkles size={16} className="text-indigo-400" /> Now with Realtime Analytics
        </motion.div>
        <motion.h1 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.1 }}
           className="text-5xl md:text-6xl lg:text-7xl font-josefin font-bold tracking-tight text-black leading-[1.05]"
        >
          Your bio, <br className="hidden md:block" />
          <span className="text-black bg-clip-text">one nads.io link.</span>
        </motion.h1>
        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
        >
          Sign in, pick your username, and share every link that matters from one beautifully simple page. Builder. Writer. Creator.
        </motion.p>
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.3 }}
           className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
        >
          <div className="flex items-center w-full max-w-md bg-[#141414] rounded-full p-2 border-2 border-white/10 shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50 transition-all hover:border-white/20">
            <span className="text-gray-500 pl-4 pr-1 font-semibold text-lg hidden sm:block">nads.io/</span>
            <input 
              type="text" 
              placeholder="username" 
              className="flex-1 bg-transparent px-2 py-3 outline-none text-white font-semibold text-lg placeholder-gray-500 w-full"
            />
            <button onClick={onLoginClick} className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-black/20 active:scale-95">
              Claim Link <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-5 text-sm font-medium text-gray-500"
        >
          It's free, forever. No credit card required.
        </motion.p>
      </div>

      <div className="flex-1 flex justify-center lg:justify-end relative perspective-1000 w-full max-w-lg lg:max-w-none pb-12 lg:pb-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-[100px] rounded-full pointer-events-none" />
        <PhoneMockup />
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "Custom Banner",
      description: "Personalize your page visually with stunning gradient banners or vibrant image uploads.",
      icon: <ImageIcon size={24} />,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Animated Glow",
      description: "Stand out immediately with a dynamic, pulsing profile picture ring around your avatar.",
      icon: <Sparkles size={24} />,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Music Player",
      description: "Embed Spotify or Apple Music tracks right on your profile for immersive visits.",
      icon: <Music size={24} />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Realtime Analytics",
      description: "Know exactly who is clicking your links with beautifully simple chart visualizers.",
      icon: <BarChart2 size={24} />,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section className="py-24 bg-[#f0f0f0] px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-josefin font-bold tracking-tight text-black">
            Stand out with <br />
            <span className="text-black bg-clip-text">Premium integrations.</span>
          </h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Everything you need to express yourself, share your creations, and grow your audience in one incredibly simple place.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 60 }}
               className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 group"
             >
               <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                 {f.icon}
               </div>
               <h3 className="text-xl font-josefin font-bold text-white mb-3">{f.title}</h3>
               <p className="text-gray-400 leading-relaxed">{f.description}</p>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#e5e5e5] py-12 px-6 border-t border-[#d4d4d8]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-josefin font-bold text-xl shadow-sm">
             n
           </div>
           <span className="font-josefin font-bold text-xl tracking-tight text-black">nads.io</span>
        </div>
        <p className="text-gray-500 font-medium">© {new Date().getFullYear()} nads.io. All rights reserved.</p>
        <div className="flex gap-5 text-gray-400">
          <Twitter size={22} className="hover:text-indigo-400 cursor-pointer transition-colors" />
          <Github size={22} className="hover:text-indigo-400 cursor-pointer transition-colors" />
          <Instagram size={22} className="hover:text-indigo-400 cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
}

function AudioPlayer({ audioTitle, audioUrl }: { audioTitle: string, audioUrl: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full max-w-[400px] mt-3 bg-[#141414] rounded-[1.25rem] p-4 shadow-2xl border border-white/5"
    >
       <audio
         ref={audioRef}
         src={audioUrl}
         onTimeUpdate={handleTimeUpdate}
         onLoadedMetadata={handleLoadedMetadata}
         onEnded={() => setIsPlaying(false)}
       />
       <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#E5ECE5] flex items-center justify-center shrink-0">
             <Music size={20} className="text-black" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
             <p className="text-white font-medium text-[15px] truncate">{audioTitle || 'Unknown Track'}</p>
             <div className="flex items-end justify-between gap-[2px] mt-1 h-3 w-full">
                {Array.from({ length: 30 }).map((_, i) => {
                   const scales = [0.4, 0.8, 0.5, 0.9, 0.6, 1.0, 0.7, 0.5, 0.8, 0.4, 1.0, 0.6, 0.9, 0.5, 0.8, 0.4, 0.9, 0.7, 0.5, 0.8, 0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.4, 0.9, 0.7, 1.0];
                   return (
                   <motion.div
                      key={i}
                      animate={{ height: isPlaying ? ['3px', `${scales[i] * 12}px`, '3px'] : '1px' }}
                      transition={isPlaying ? { repeat: Infinity, duration: 0.4 + (i % 3) * 0.1, delay: i * 0.05, ease: "easeInOut" } : { duration: 0.2 }}
                      className="w-[3px] bg-[#a1a1aa] rounded-full shrink-0"
                   />
                )})}
             </div>
          </div>
          <button onClick={togglePlay} className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
             {isPlaying ? (
               <div className="w-4 h-4 flex gap-1 justify-center items-center">
                 <div className="w-1.5 h-3.5 bg-black rounded-sm" />
                 <div className="w-1.5 h-3.5 bg-black rounded-sm" />
               </div>
             ) : (
               <Play size={18} className="text-black fill-black ml-0.5" />
             )}
          </button>
       </div>

       {/* Audio Progress */}
       <div className="mt-4 flex items-center gap-3">
          <span className="text-[11px] text-[#888] font-mono">{formatTime(currentTime)}</span>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full relative cursor-pointer" onClick={(e) => {
             if (audioRef.current && duration) {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                audioRef.current.currentTime = pos * duration;
             }
          }}>
             <div className="absolute top-0 left-0 bottom-0 bg-white rounded-full" style={{ width: `${progress}%` }}></div>
             <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md transition-all" style={{ left: `calc(${progress}% - 8px)` }}></div>
          </div>
          <span className="text-[11px] text-[#888] font-mono">{formatTime(duration)}</span>
       </div>

    </motion.div>
  );
}

function UserPage({ onBack, onEdit, data }: { onBack: () => void, onEdit: () => void, data: ProfileData }) {
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center py-12 px-4 relative font-sans">
      
      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-[#141414] rounded-[1.5rem] p-3 pb-8 shadow-2xl border border-white/5 relative overflow-hidden"
      >
        {/* Views Counter (Mountain Structure) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-b-lg flex items-center gap-1.5">
          <Eye size={10} className="text-gray-300" />
          <span className="text-gray-100 font-medium text-[10px]">2</span>
          <span className="text-gray-400 text-[10px]">views</span>
        </div>
        
        {/* 16:5 Banner with no separator border */}
        <div className="absolute top-0 left-0 right-0 h-[125px]">
          {data.bannerUrl && (
            <img src={data.bannerUrl} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="relative z-10 flex flex-col items-center flex-1 mt-[125px] px-4 w-full">
           {/* Avatar: positioned 50% in banner and 50% in the content container */}
           <div className="relative mb-3 -mt-[51px] select-none">
              {/* Glow */}
              {data.isGlowing && (
                <div className="absolute -inset-1 rounded-full blur-[12px] opacity-80" style={{ background: 'conic-gradient(from 0deg, #10b981, #0ea5e9, #8b5cf6, #d946ef, #f43f5e, #f59e0b, #10b981)' }}></div>
              )}
              
              {/* Ring Wrapper */}
              <div className={`p-[3px] rounded-full relative z-10 ${data.isGlowing ? '' : 'bg-white/10'}`} style={data.isGlowing ? { background: 'conic-gradient(from 0deg, #10b981, #0ea5e9, #8b5cf6, #d946ef, #f43f5e, #f59e0b, #10b981)' } : undefined}>
                 <div className="w-[96px] h-[96px] rounded-full bg-[#1b1b1f] flex items-center justify-center overflow-hidden border-2 border-[#141414]">
                    {data.avatarUrl ? (
                       <img src={data.avatarUrl} className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full bg-[#27272a] flex items-center justify-center">
                          <User size={38} className="text-gray-400" />
                       </div>
                    )}
                 </div>
              </div>

              {/* Crown Pro Badge */}
              <div className="absolute bottom-0 right-0 z-20 bg-white rounded-full w-[28px] h-[28px] flex items-center justify-center text-black shadow-xl border-[2.5px] border-[#141414]">
                 <Crown size={12} className="fill-black transform translate-y-[-0.5px]" strokeWidth={1} />
              </div>
           </div>

           <h1 className="text-2xl font-josefin font-bold text-white tracking-tight leading-tight">{data.displayName || 'No Name'}</h1>
           
           <p className="text-[#888888] text-[15px] font-light mt-1 mb-2 text-center leading-normal">
             {data.bio}
           </p>

           <div className="w-full flex flex-col gap-2 px-2 mt-0">
             {data.links.length > 0 && (
               <div className="w-full flex flex-wrap justify-center gap-[10px]">
                 {data.links.slice(0, data.links.length === 5 ? 4 : data.links.length).map(link => (
                   <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" title={link.title || 'Link'} className="bg-[#f0f0f0] hover:bg-[#e5e5e5] border border-transparent text-black rounded-[1.25rem] flex items-center justify-center transition-all shadow-sm hover:scale-[1.05] active:scale-[0.95] w-[64px] h-[54px] sm:w-[68px] sm:h-[58px] shrink-0">
                     <div className="text-gray-800 flex items-center justify-center w-full h-full">
                       {getLinkIcon(link.url, link.title, 20)}
                     </div>
                   </a>
                 ))}
               </div>
             )}
             {data.links.length === 5 && data.links.slice(4).map(link => (
               <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="w-full bg-[#f0f0f0] hover:bg-[#e5e5e5] border border-transparent text-black py-[10px] px-5 h-[58px] rounded-full font-bold transition-all text-[15px] flex items-center justify-between shadow-sm hover:scale-[1.01] active:scale-[0.99] mt-1">
                 <div className="shrink-0 text-gray-800 flex items-center justify-center w-6 h-6">
                   {getLinkIcon(link.url, link.title, 20)}
                 </div>
                 <span className="flex-1 text-center truncate px-2">{link.title || 'Link'}</span>
                 <div className="w-6 h-6 shrink-0" />
               </a>
             ))}
           </div>
        </div>
      </motion.div>

      {/* Music Card */}
      {data.audioUrl && <AudioPlayer audioTitle={data.audioTitle} audioUrl={data.audioUrl} />}

      {/* Back to Editor button sent below */}
      <button 
        onClick={onBack} 
        id="profile-back-button"
        className="mt-8 flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 hover:text-black hover:bg-gray-50 border border-gray-200/80 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer z-30"
      >
        <ArrowLeft size={16} className="text-gray-500" />
        <span>Back to Editor</span>
      </button>

    </div>
  );
}

function EditPage({ onBack, onSignOut, data, onChange, userEmail }: { onBack: () => void, onSignOut: () => void, data: ProfileData, onChange: (d: ProfileData) => void, userEmail: string | null }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onBack();
    }, 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'bannerUrl' | 'audioUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const title = file.name.replace(/\.[^/.]+$/, "");
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === 'audioUrl') {
           onChange({ ...data, audioUrl: reader.result as string, audioTitle: title });
        } else {
           onChange({ ...data, [field]: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addLink = () => {
    if (data.links.length >= 5) return;
    onChange({ ...data, links: [...data.links, { id: Date.now(), title: '', url: '' }] });
  };

  const updateLink = (id: number, field: 'title' | 'url', value: string) => {
    onChange({ ...data, links: data.links.map(l => l.id === id ? { ...l, [field]: value } : l) });
  };

  const removeLink = (id: number) => {
    onChange({ ...data, links: data.links.filter(l => l.id !== id) });
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black flex flex-col font-sans pb-12 overflow-hidden">
       {/* Sidebar */}
       <AnimatePresence>
         {isSidebarOpen && (
           <>
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               onClick={() => setIsSidebarOpen(false)} 
               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" 
             />
             <motion.div 
               initial={{ x: '-100%' }} 
               animate={{ x: 0 }} 
               exit={{ x: '-100%' }} 
               transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
               className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-[#1a1a1a] z-[70] shadow-2xl flex flex-col"
             >
                <div className="flex items-center justify-between p-5 border-b border-white/5">
                   <div className="flex items-center gap-2 text-white">
                      <Sparkles size={20} />
                      <span className="font-josefin font-bold text-lg hover:text-indigo-400 transition-colors cursor-pointer text-white">nads.io</span>
                   </div>
                   <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
                     <X size={20} />
                   </button>
                </div>
                
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  <div className="p-5 border-b border-white/5 cursor-default group">
                     <p className="text-[11px] text-gray-500 font-medium tracking-wider mb-2 uppercase group-hover:text-gray-400 transition-colors">Signed in</p>
                     <p className="text-gray-200 text-[15px] truncate">{userEmail || 'Not signed in'}</p>
                  </div>
                  
                  <div className="p-3">
                     <p className="text-[11px] text-gray-500 font-medium tracking-wider mb-2 px-2 uppercase mt-2">Menu</p>
                     
                     <button onClick={onBack} className="w-full flex items-center gap-3 px-3 py-3.5 text-gray-300 hover:text-white hover:bg-[#252525] rounded-xl transition-colors mb-1 cursor-pointer">
                        <Home size={18} />
                        <span className="text-sm font-medium">Home</span>
                     </button>
                     
                     <button onClick={() => setIsSidebarOpen(false)} className="w-full flex items-center gap-3 px-3 py-3.5 bg-[#252525] text-white rounded-xl transition-colors mb-1 group cursor-pointer border border-white/5">
                        <User size={18} />
                        <span className="text-sm font-medium">Edit profile</span>
                     </button>
                     
                     <button onClick={() => alert('Premium plan coming soon')} className="w-full flex items-center gap-3 px-3 py-3.5 text-gray-300 hover:text-white hover:bg-[#252525] rounded-xl transition-colors mb-1 group cursor-pointer">
                        <Crown size={18} />
                        <span className="text-sm font-medium">Premium</span>
                        <span className="ml-auto bg-[#333] group-hover:bg-white group-hover:text-black text-gray-300 transition-colors text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Pro</span>
                     </button>
                     
                     <button onClick={() => alert('Analytics dashboard coming soon')} className="w-full flex items-center gap-3 px-3 py-3.5 text-gray-300 hover:text-white hover:bg-[#252525] rounded-xl transition-colors mb-1 group cursor-pointer">
                        <BarChart2 size={18} />
                        <span className="text-sm font-medium">Analytics</span>
                        <span className="ml-auto bg-[#333] group-hover:bg-white group-hover:text-black text-gray-300 transition-colors text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Pro</span>
                     </button>
                     
                     <button onClick={() => alert('Settings coming soon')} className="w-full flex items-center gap-3 px-3 py-3.5 text-gray-300 hover:text-white hover:bg-[#252525] rounded-xl transition-colors mb-1 cursor-pointer mt-2">
                        <Settings size={18} />
                        <span className="text-sm font-medium">Settings</span>
                     </button>
                     
                     <button onClick={() => alert('Help center coming soon')} className="w-full flex items-center gap-3 px-3 py-3.5 text-gray-300 hover:text-white hover:bg-[#252525] rounded-xl transition-colors mb-1 cursor-pointer">
                        <HelpCircle size={18} />
                        <span className="text-sm font-medium">Help</span>
                     </button>
                  </div>
                </div>
                
                <div className="p-5 border-t border-white/5 mt-auto">
                   <button onClick={onSignOut} className="w-full flex items-center gap-3 text-gray-300 hover:text-white hover:text-red-400 transition-colors p-2 -ml-2 rounded-xl hover:bg-white/5 cursor-pointer">
                      <LogOut size={18} />
                      <span className="text-sm font-medium">Sign out</span>
                   </button>
                </div>
             </motion.div>
           </>
         )}
       </AnimatePresence>

       {/* Top Navbar */}
       <header className="sticky top-0 z-50 bg-[#f0f0f0]/90 backdrop-blur-md p-4 md:px-8 flex items-center justify-between border-b border-[#e5e5e5]">
          <button onClick={() => setIsSidebarOpen(true)} className="bg-[#18181b] hover:bg-[#27272a] py-2 px-4 rounded-[1.5rem] flex items-center gap-2 transition-colors text-white shadow-md">
             <Menu size={14} className="text-white" strokeWidth={2.5} />
             <span className="font-josefin font-bold text-[14px] tracking-tight text-white">nads.io</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button className="bg-[#18181b] hover:bg-[#27272a] w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors text-white shadow-md">
               <Sun size={16} strokeWidth={2.5} className="text-white" />
            </button>
            <button onClick={onSignOut} className="bg-[#18181b] hover:bg-[#27272a] py-2 px-4 rounded-[1.5rem] text-[14px] font-medium transition-colors text-white shadow-md tracking-tight">
               Sign out
            </button>
          </div>
       </header>

       <main className="flex-1 w-full max-w-[400px] mx-auto px-4 pt-8">
          <div className="mb-8">
            <h1 className="text-[28px] font-josefin font-bold tracking-tight">Edit your page</h1>
            <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 mt-2 text-sm transition-colors cursor-pointer">
               Live at nads.io/{data.username.toLowerCase()} <ExternalLink size={14} />
            </a>
          </div>

          <div className="space-y-6">
             {/* Avatar Card */}
             <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6">
                <div className="flex items-center gap-6">
                   <div className="relative overflow-visible">
                      <div className="w-20 h-20 rounded-full bg-[#1b1b1f] flex items-center justify-center overflow-hidden border border-white/5">
                         {data.avatarUrl ? (
                            <img src={data.avatarUrl} className="w-full h-full object-cover" />
                         ) : (
                            <User size={32} className="text-gray-400" />
                         )}
                      </div>
                      <label className="absolute -bottom-1 -right-1 bg-[#252525] hover:bg-[#333] border-4 border-[#141414] w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                         <Upload size={14} className="text-white relative z-10" />
                         <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'avatarUrl')} />
                      </label>
                   </div>
                   <div>
                      <h3 className="text-lg font-semibold text-white">{data.displayName || 'No Name'}</h3>
                      <p className="text-[#a1a1aa] text-sm">@{data.username.toLowerCase()}</p>
                   </div>
                </div>
             </div>

             {/* Basic Info Card */}
             <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6 space-y-5">
                <div>
                   <label className="block text-sm text-gray-300 mb-2">Username</label>
                   <div className="flex items-center bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden focus-within:border-white/20 transition-colors">
                      <div className="px-4 py-3.5 text-gray-500 border-r border-white/5 bg-[#171717] font-medium text-sm">nads.io/</div>
                      <input type="text" value={data.username.toLowerCase()} onChange={e => onChange({ ...data, username: e.target.value.toLowerCase() })} className="bg-transparent flex-1 px-4 py-3 text-white outline-none w-full text-sm" />
                   </div>
                   <p className="text-[13px] text-gray-500 mt-2 px-1">Username can only be changed once every 7 days.</p>
                </div>

                <div>
                   <label className="block text-sm text-gray-300 mb-2">Display name</label>
                   <input type="text" value={data.displayName} onChange={e => onChange({ ...data, displayName: e.target.value })} className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white outline-none focus:border-white/20 transition-colors text-sm" />
                </div>

                <div>
                   <label className="block text-sm text-gray-300 mb-2">Bio</label>
                   <textarea rows={3} value={data.bio} onChange={e => onChange({ ...data, bio: e.target.value })} className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white outline-none focus:border-white/20 transition-colors resize-none text-sm"></textarea>
                   <p className="text-[12px] text-[#555] mt-1.5 text-right font-mono">{data.bio.length}/160</p>
                </div>
             </div>

             {/* Premium Features Card */}
             <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6">
                <div className="flex items-center gap-2 mb-8 text-white font-medium">
                   <Crown size={18} /> Premium features
                   <button onClick={() => alert('Premium plan coming soon')} className="ml-auto bg-white text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-sm cursor-pointer">Pro</button>
                </div>

                <div className="space-y-8">
                   <div className="text-center">
                      <label className="block text-[17px] text-white mb-3 text-center">Custom banner</label>
                      <div className="w-full h-32 bg-[#141414] rounded-[1rem] relative overflow-hidden flex flex-col justify-between p-3 border border-white/5">
                         {data.bannerUrl ? <img src={data.bannerUrl} className="w-full h-full object-cover absolute inset-0" /> : null}
                         <div className="flex justify-end relative z-10 w-full">
                           {data.bannerUrl && (
                             <button onClick={(e) => { e.preventDefault(); onChange({ ...data, bannerUrl: '' }) }} className="w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-[#ff4444] hover:bg-black/80 transition-colors">
                               <Trash2 size={14} />
                             </button>
                           )}
                         </div>
                         <div className="flex justify-end relative z-10 w-full mt-auto">
                           <label className="bg-black/60 hover:bg-black/80 backdrop-blur text-white text-[15px] py-2 px-4 rounded-full flex items-center gap-2 transition-colors border border-white/10 cursor-pointer">
                              <ImageIcon size={16} /> {data.bannerUrl ? 'Replace' : 'Upload'}
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'bannerUrl')} />
                           </label>
                         </div>
                      </div>
                      <p className="text-[14px] text-[#888] mt-4 text-center">JPG, PNG, or WebP · up to 5MB · 16:5 looks best</p>
                   </div>

                   <div className="text-center w-full">
                      <label className="block text-[17px] text-white mb-3 text-center">Profile music</label>
                      <div className="relative flex items-center mb-3">
                         <label className="w-full bg-[#1a1a1a] hover:bg-[#252525] border border-white/5 py-3.5 rounded-full flex items-center justify-center gap-2 text-[15px] text-white transition-colors cursor-pointer">
                            <Music size={20} /> {data.audioUrl ? 'Replace track' : 'Upload track'}
                            <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(e, 'audioUrl')} />
                         </label>
                         {data.audioUrl && (
                            <button onClick={(e) => { e.preventDefault(); onChange({ ...data, audioUrl: '', audioTitle: '' }) }} className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-[#ff4444] hover:bg-[#ff4444]/10 transition-colors">
                               <Trash2 size={18} />
                            </button>
                         )}
                      </div>
                      {data.audioUrl && (
                        <div className="w-full bg-transparent border border-white/10 rounded-full px-5 py-3.5 text-gray-300 text-[15px] flex items-center justify-between">
                           <span className="truncate w-full text-center text-[#ddd]">{data.audioTitle || 'No track selected'}</span>
                        </div>
                      )}
                      <p className="text-[14px] text-[#888] mt-4 text-center leading-relaxed">MP3, WAV, or OGG · up to 8MB · plays on your public profile</p>
                   </div>

                   <div className="text-center">
                      <label className="block text-sm text-gray-300 mb-3">Avatar decoration</label>
                      <div className="flex items-center justify-between bg-[#1a1a1a] border border-white/5 rounded-xl p-4">
                         <span className="text-sm text-[#a1a1aa]">{data.isGlowing ? 'Glowing ring is ON' : 'Glowing ring is OFF'}</span>
                         {/* Toggle Switch */}
                         <div onClick={() => onChange({...data, isGlowing: !data.isGlowing})} className={`w-12 h-6 rounded-full flex items-center p-0.5 cursor-pointer transition-colors ${data.isGlowing ? 'bg-white' : 'bg-[#333]'}`}>
                            <div className={`w-5 h-5 bg-black rounded-full shadow-sm transition-transform ${data.isGlowing ? 'translate-x-6' : 'translate-x-0'}`}></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Links Card */}
             <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white text-[17px]">Links</h3>
                    <span className="text-[15px] text-[#888]">{data.links.length} / 5</span>
                 </div>

                 <div className="space-y-4">
                    <AnimatePresence>
                       {data.links.map((link) => (
                        <motion.div 
                          key={link.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-3 relative w-full pt-1"
                        >
                           <input type="text" value={link.title} onChange={e => updateLink(link.id, 'title', e.target.value)} placeholder="Label" className="w-[120px] bg-transparent border border-white/10 rounded-full px-5 py-3.5 text-white text-[15px] outline-none focus:border-white/20 transition-colors shrink-0 text-center" />
                           <input type="url" value={link.url} onChange={e => updateLink(link.id, 'url', e.target.value)} placeholder="https://..." className="flex-1 bg-transparent border border-white/10 rounded-full px-5 py-3.5 text-white text-[15px] outline-none focus:border-white/20 transition-colors min-w-0 text-center" />
                           <button onClick={() => removeLink(link.id)} className="p-2 text-[#ff4444] hover:bg-[#ff4444]/10 rounded-lg transition-colors flex shrink-0 items-center justify-center">
                              <Trash2 size={18} />
                           </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {data.links.length < 5 && (
                      <button onClick={addLink} className="w-full mt-4 bg-transparent hover:bg-white/5 border border-white/10 border-dashed py-3.5 rounded-full flex items-center justify-center gap-2 text-white transition-colors text-[16px]">
                         <Plus size={18} /> Add link
                      </button>
                    )}
                 </div>
             </div>
          </div>
          
          <div className="mt-8 flex justify-center">
             <button onClick={handleSave} disabled={isSaving} className="w-full max-w-[400px] bg-[#1a1a1a] text-white py-4 rounded-[1.5rem] font-semibold text-[15px] hover:bg-gray-100 hover:text-black transition-colors shadow-xl disabled:opacity-70 flex items-center justify-center gap-2">
                {isSaving ? <Sparkles size={18} className="animate-pulse" /> : null}
                {isSaving ? 'Saving...' : 'Save & publish'}
             </button>
          </div>
       </main>
    </div>
  );
}

export type ProfileData = {
  username: string;
  displayName: string;
  bio: string;
  isGlowing: boolean;
  avatarUrl: string;
  bannerUrl: string;
  audioUrl: string;
  audioTitle: string;
  links: Array<{ id: number, title: string, url: string }>;
};

export default function App() {
  const [view, setView] = useState<'home' | 'profile' | 'edit'>('edit');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const handleSession = (session: any) => {
      const name = session?.user?.email || session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.custom_claims?.global_name || null;
      setUserEmail(name);
      if (name) {
        const username = name.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '');
        setProfileData(prev => prev.username === 'che' ? { ...prev, username: username, displayName: username, bio: '' } : prev);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    username: 'che',
    displayName: '',
    bio: '',
    isGlowing: true,
    avatarUrl: '',
    bannerUrl: '',
    audioUrl: '',
    audioTitle: '',
    links: []
  });

  return (
    <>
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={() => {
          setIsAuthOpen(false);
          setView('edit');
        }}
      />
      {view === 'home' && (
        <div className="min-h-screen bg-[#f0f0f0] text-black relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-900">
           <Navbar 
             onLoginClick={() => setIsAuthOpen(true)} 
             userEmail={userEmail}
             onSignOut={async () => {
               await supabase.auth.signOut();
               setUserEmail(null);
             }}
             onDashboardClick={() => setView('edit')}
           />
           <main className="relative z-10">
              <Hero onNavigate={() => setView('profile')} onLoginClick={() => setIsAuthOpen(true)} />
              <Features />
           </main>
           <Footer />
        </div>
      )}
      {view === 'profile' && <UserPage data={profileData} onBack={() => setView('edit')} onEdit={() => setView('edit')} />}
      {view === 'edit' && <EditPage data={profileData} onChange={setProfileData} onBack={() => setView('profile')} onSignOut={() => setView('home')} userEmail={userEmail} />}
    </>
  );
}
