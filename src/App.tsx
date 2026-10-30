/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion, AnimatePresence } from "motion/react";
import { Routes, Route, useNavigate, useParams, Navigate, useLocation } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Music,
  BarChart2,
  Image as ImageIcon,
  Zap,
  Github,
  Twitter,
  Instagram,
  Play,
  ArrowLeft,
  Eye,
  Crown,
  Menu,
  Sun,
  Upload,
  ExternalLink,
  Trash2,
  Plus,
  X,
  Home,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Lock,
  Globe,
  Mail,
  Youtube,
  Linkedin,
  Facebook,
  Twitch,
  Link as LinkIcon,
  MessageCircle,
  BookOpen,
  FileText,
  Briefcase,
  Trophy,
  Video,
  Check,
  Share2,
  QrCode,
  Copy,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

function DebouncedInput({ value, onChange, delay = 150, ...props }: any) {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: any) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    const syntheticEvent = { target: { value: newVal } };
    
    timeoutRef.current = setTimeout(() => {
      onChange(syntheticEvent);
    }, delay);
  };

  const handleBlur = (e: any) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onChange({ target: { value: localValue } });
    if (props.onBlur) props.onBlur(e);
  };

  return <input value={localValue} onChange={handleChange} onBlur={handleBlur} {...props} />;
}

function DebouncedTextarea({ value, onChange, delay = 150, ...props }: any) {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: any) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    const syntheticEvent = { target: { value: newVal } };
    
    timeoutRef.current = setTimeout(() => {
      onChange(syntheticEvent);
    }, delay);
  };

  const handleBlur = (e: any) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onChange({ target: { value: localValue } });
    if (props.onBlur) props.onBlur(e);
  };

  return <textarea value={localValue} onChange={handleChange} onBlur={handleBlur} {...props} />;
}

import { AuthModal } from "./components/AuthModal";
import { AmmosLanding } from "./components/AmmosLanding";
import { supabase, isSupabaseConfigured } from "./lib/supabase";

const VIDEO_PRESETS = [
  {
    name: "Cosmic Sky",
    url: "https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-loop-4643-large.mp4",
    thumb: "🌌",
  },
  {
    name: "Neon Wave",
    url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32128-large.mp4",
    thumb: "🔮",
  },
  {
    name: "Cyber Grid",
    url: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-numbers-31901-large.mp4",
    thumb: "📟",
  },
  {
    name: "Ocean Waves",
    url: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-near-a-cliff-43105-large.mp4",
    thumb: "🌊",
  },
  {
    name: "Midnight Rain",
    url: "https://assets.mixkit.co/videos/preview/mixkit-raindrops-on-a-window-at-night-42352-large.mp4",
    thumb: "🌧️",
  },
  {
    name: "Aura Gold",
    url: "https://assets.mixkit.co/videos/preview/mixkit-falling-golden-particles-on-a-dark-background-31145-large.mp4",
    thumb: "✨",
  },
];

function getLinkIcon(url: string, title?: string, iconSize: number = 18) {
  const normUrl = (url || "").toLowerCase();
  const normTitle = (title || "").toLowerCase();

  if (
    normUrl.includes("google.com") ||
    normUrl.includes("google.") ||
    normTitle.includes("google")
  ) {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="currentColor"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="currentColor"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="currentColor"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (
    normUrl.includes("gmail") ||
    normTitle.includes("gmail") ||
    normTitle.includes("email") ||
    normTitle.includes("mail")
  ) {
    return <Mail size={iconSize} />;
  }
  if (normUrl.includes("github") || normTitle.includes("github")) {
    return <Github size={iconSize} />;
  }
  if (
    normUrl.includes("twitter") ||
    normUrl.includes("x.com") ||
    normTitle.includes("twitter") ||
    normTitle.includes(" x ")
  ) {
    return <Twitter size={iconSize} />;
  }
  if (
    normUrl.includes("instagram") ||
    normTitle.includes("instagram") ||
    normTitle.includes("insta")
  ) {
    return <Instagram size={iconSize} />;
  }
  if (
    normUrl.includes("youtube") ||
    normUrl.includes("youtu.be") ||
    normTitle.includes("youtube") ||
    normTitle.includes("video")
  ) {
    return <Youtube size={iconSize} />;
  }
  if (normUrl.includes("linkedin") || normTitle.includes("linkedin")) {
    return <Linkedin size={iconSize} />;
  }
  if (
    normUrl.includes("facebook") ||
    normTitle.includes("facebook") ||
    normTitle.includes("fb")
  ) {
    return <Facebook size={iconSize} />;
  }
  if (normUrl.includes("twitch") || normTitle.includes("twitch")) {
    return <Twitch size={iconSize} />;
  }
  if (
    normUrl.includes("spotify") ||
    normUrl.includes("soundcloud") ||
    normUrl.includes("apple.com") ||
    normTitle.includes("spotify") ||
    normTitle.includes("music") ||
    normTitle.includes("song")
  ) {
    return <Music size={iconSize} />;
  }
  if (normUrl.includes("discord") || normTitle.includes("discord")) {
    return <MessageCircle size={iconSize} />;
  }
  if (
    normUrl.includes("telegram") ||
    normUrl.includes("t.me") ||
    normTitle.includes("telegram")
  ) {
    return <MessageCircle size={iconSize} />;
  }
  if (
    normUrl.includes("whatsapp") ||
    normTitle.includes("whatsapp") ||
    normTitle.includes("wa.me")
  ) {
    return <MessageCircle size={iconSize} />;
  }
  if (
    normUrl.includes("portfolio") ||
    normUrl.includes("blog") ||
    normTitle.includes("portfolio") ||
    normTitle.includes("blog") ||
    normTitle.includes("website")
  ) {
    return <Globe size={iconSize} />;
  }
  if (
    normUrl.includes("resume") ||
    normUrl.includes("cv") ||
    normTitle.includes("resume") ||
    normTitle.includes("cv") ||
    normTitle.includes("pdf")
  ) {
    return <FileText size={iconSize} />;
  }
  if (
    normUrl.includes("job") ||
    normUrl.includes("work") ||
    normTitle.includes("job") ||
    normTitle.includes("work") ||
    normTitle.includes("career")
  ) {
    return <Briefcase size={iconSize} />;
  }
  if (
    normUrl.includes("book") ||
    normUrl.includes("read") ||
    normTitle.includes("book") ||
    normTitle.includes("reading") ||
    normTitle.includes("medium.com")
  ) {
    return <BookOpen size={iconSize} />;
  }

  // Dynamic high-res Favicon API lookup if no match
  let domain = "";
  try {
    const cleanUrl = url.trim();
    if (cleanUrl) {
      const hasProtocol =
        cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://");
      const parsed = new URL(hasProtocol ? cleanUrl : `https://${cleanUrl}`);
      domain = parsed.hostname.replace("www.", "");
    }
  } catch {
    const match = normUrl.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/);
    domain = match ? match[1] : "";
  }

  if (domain && domain.includes(".")) {
    return (
      <img
        src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
        alt=""
        className="object-contain rounded-sm grayscale brightness-0 opacity-80"
        style={{ width: iconSize, height: iconSize }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return <LinkIcon size={iconSize} />;
}


function AudioPlayer({
  audioTitle,
  audioUrl,
  isVideoBg,
  activePlan,
  isGlassmorphic,
  glassmorphismOpacity,
  glassmorphismBlur,
}: {
  audioTitle: string;
  audioUrl: string;
  isVideoBg?: boolean;
  activePlan?: string;
  isGlassmorphic?: boolean;
  glassmorphismOpacity?: number;
  glassmorphismBlur?: number;
}) {
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
    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100,
    );
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`w-full max-w-[400px] mt-3 rounded-[1.25rem] p-4 shadow-2xl relative transition-all duration-300 z-10 text-white border border-white/10`}
    >
      <div 
        className="absolute inset-0 rounded-[1.25rem] -z-10" 
        style={isGlassmorphic ? { 
          backgroundColor: `rgba(20, 20, 20, ${(glassmorphismOpacity ?? 10) / 100})`,
          backdropFilter: `blur(${(glassmorphismBlur ?? 20) / 2}px)`,
          WebkitBackdropFilter: `blur(${(glassmorphismBlur ?? 20) / 2}px)`
        } : {
          backgroundColor: '#141414'
        }}
      />
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
          <Music size={20} className="text-black" />
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-white font-medium text-[15px] truncate">
            {audioTitle || "Unknown Track"}
          </p>
          <div className="flex items-end justify-between gap-[2px] mt-1 h-3 w-full">
            {Array.from({ length: 30 }).map((_, i) => {
              const scales = [
                0.4, 0.8, 0.5, 0.9, 0.6, 1.0, 0.7, 0.5, 0.8, 0.4, 1.0, 0.6, 0.9,
                0.5, 0.8, 0.4, 0.9, 0.7, 0.5, 0.8, 0.4, 0.9, 0.6, 1.0, 0.5, 0.8,
                0.4, 0.9, 0.7, 1.0,
              ];
              return (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying
                      ? ["3px", `${scales[i] * 12}px`, "3px"]
                      : "1px",
                  }}
                  transition={
                    isPlaying
                      ? {
                          repeat: Infinity,
                          duration: 0.4 + (i % 3) * 0.1,
                          delay: i * 0.05,
                          ease: "easeInOut",
                        }
                      : { duration: 0.2 }
                  }
                  className="w-[3px] bg-white/70 rounded-full shrink-0"
                />
              );
            })}
          </div>
        </div>
        <button
          onClick={togglePlay}
          className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
        >
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
        <span className="text-[11px] text-white/70 font-mono">
          {formatTime(currentTime)}
        </span>
        <div
          className="flex-1 h-1.5 bg-white/10 rounded-full relative cursor-pointer"
          onClick={(e) => {
            if (audioRef.current && duration) {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              audioRef.current.currentTime = pos * duration;
            }
          }}
        >
          <div
            className="absolute top-0 left-0 bottom-0 bg-white rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md transition-all"
            style={{ left: `calc(${progress}% - 8px)` }}
          ></div>
        </div>
        <span className="text-[11px] text-white/70 font-mono">
          {formatTime(duration)}
        </span>
      </div>
    </motion.div>
  );
}

function UserPage({
  onBack,
  onEdit,
  data,
  activePlan = "pro",
  isPublic = false,
}: {
  onBack?: () => void;
  onEdit?: () => void;
  data: ProfileData;
  activePlan?: "free" | "pro";
  isPublic?: boolean;
}) {
  const isVideoBg = !!(
    data.videoBackgroundEnabled &&
    data.videoBackgroundUrl
  );
  const isGlassmorphicEnabled =
    activePlan === "pro" ? !!data.isGlassmorphic : false;
  const isGlowingEnabled =
    activePlan === "pro" ? !!data.isGlowing : false;

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-12 px-4 relative font-sans transition-colors duration-500 overflow-hidden ${isVideoBg ? "bg-black text-white" : "bg-[#d4d4d4] text-black"}`}
    >
      {isVideoBg && (
        <>
          <video
            src={data.videoBackgroundUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 scale-105"
            style={{ filter: `blur(${data.videoBackgroundBlur ?? 5}px)` }}
          />
        </>
      )}

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-[400px] rounded-[1.5rem] p-3 pb-8 shadow-2xl relative transition-all duration-300 z-10 text-white border border-white/10`}
      >
        <div 
          className="absolute inset-0 rounded-[1.5rem] -z-10" 
          style={isGlassmorphicEnabled ? { 
            backgroundColor: `rgba(20, 20, 20, ${(data.glassmorphismOpacity ?? 10) / 100})`,
            backdropFilter: `blur(${(data.glassmorphismBlur ?? 20) / 2}px)`,
            WebkitBackdropFilter: `blur(${(data.glassmorphismBlur ?? 20) / 2}px)`
          } : {
            backgroundColor: '#141414'
          }}
        />
        {/* Views Counter (Mountain Structure) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-black/25 backdrop-blur-md px-2.5 py-0.5 rounded-b-lg flex items-center gap-1.5">
          <Eye size={10} className="text-gray-300" />
          <span className="text-gray-100 font-medium text-[10px]">2</span>
        </div>

        {/* 15:6 Banner with no separator border */}
        <div className="relative w-[calc(100%+24px)] aspect-[15/6] -mx-3 -mt-3 overflow-hidden select-none rounded-t-[calc(1.5rem-1px)]">
          {data.bannerUrl ? (
            <img src={data.bannerUrl} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-transparent" />
          )}
        </div>

        <div className="relative z-10 flex flex-col items-center flex-1 mt-0 px-4 w-full">
          {/* Avatar: positioned 50% in banner and 50% in the content container */}
          {data.showAvatar !== false && (
            <div className="relative mb-3 -mt-[48px] select-none">
              {/* Avatar Decoration */}
              {isGlowingEnabled && data.discordDecorationUrl && (
                <img
                  src={data.discordDecorationUrl}
                  alt="Avatar Decoration"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115px] h-[115px] z-20 pointer-events-none scale-110"
                />
              )}

              {/* Avatar Wrapper */}
              <div className="rounded-full relative z-10 p-0">
                <div className="w-[96px] h-[96px] rounded-full bg-[#1b1b1f] flex items-center justify-center overflow-hidden">
                  {data.avatarUrl ? (
                    <img
                      src={data.avatarUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#27272a] flex items-center justify-center">
                      <User size={38} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <h1 className={`text-2xl ${data.displayNameFont || "font-josefin"} font-bold text-white tracking-tight leading-tight`} style={{ color: data.displayNameColor || "#ffffff" }}>
            {data.displayName || "No Name"}
          </h1>
          <p className="text-white/95 text-[14px] font-semibold mt-1.5 mb-4 text-center leading-normal max-w-[280px]">
            {data.bio}
          </p>

          <div className="w-full flex flex-col gap-2.5 px-2 mt-0 items-center justify-center">
            {data.links.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
                {data.links
                  .slice(0, data.links.length === 5 ? 4 : data.links.length)
                  .map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.title || "Link"}
                      className={`flex items-center justify-center transition-all hover:scale-[1.05] active:scale-[0.95] w-[64px] h-[64px] shrink-0 rounded-2xl border-none ${
                        isGlassmorphicEnabled
                          ? "bg-texture hover:bg-[#e4e4e4] text-black backdrop-blur-md shadow-lg shadow-black/15"
                          : "bg-texture hover:bg-[#e4e4e4] text-black shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-center w-full h-full text-black">
                        {getLinkIcon(link.url, link.title, 20)}
                      </div>
                    </a>
                  ))}
              </div>
            )}
            {data.links.length === 5 &&
              data.links.slice(4).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 h-[52px] rounded-2xl font-bold transition-all text-[15px] flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] mt-0.5 border-none ${
                    isGlassmorphicEnabled
                      ? "bg-texture hover:bg-[#e4e4e4] text-black backdrop-blur-md shadow-lg shadow-black/15"
                      : "bg-texture hover:bg-[#e4e4e4] text-black shadow-md"
                  }`}
                >
                  <div className="shrink-0 flex items-center justify-center w-6 h-6 text-black">
                    {getLinkIcon(link.url, link.title, 20)}
                  </div>
                  <span className="flex-1 text-center truncate px-2 font-josefin">
                    {link.title || "Link"}
                  </span>
                  <div className="w-6 h-6 shrink-0" />
                </a>
              ))}
          </div>
        </div>
      </motion.div>

      {/* Music Card */}
      {data.audioUrl && (
        activePlan === "free" ? (
          <audio autoPlay loop src={data.audioUrl} />
        ) : (
          <div className="w-full max-w-[400px] z-10 transition-transform">
            <AudioPlayer
              audioTitle={data.audioTitle}
              audioUrl={data.audioUrl}
              isVideoBg={isVideoBg}
              activePlan={activePlan}
              isGlassmorphic={isGlassmorphicEnabled}
              glassmorphismOpacity={data.glassmorphismOpacity}
              glassmorphismBlur={data.glassmorphismBlur}
            />
          </div>
        )
      )}

      {/* Back to Editor button sent below */}
      {!isPublic && onBack && (
        <button
          onClick={onBack}
          id="profile-back-button"
          className="mt-8 flex items-center gap-2 px-5 py-2.5 bg-[#141414] text-gray-300 hover:text-white hover:bg-[#1c1c1c] border border-white/5 rounded-full text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer z-30"
        >
          <ArrowLeft size={16} className="text-gray-400" />
          <span>Back to Editor</span>
        </button>
      )}
    </div>
  );
}

function EditPage({
  onBack,
  onSignOut,
  onHome,
  data,
  onChange,
  userEmail,
  userId,
  activePlan = "pro",
  setActivePlan,
}: {
  onBack: () => void;
  onSignOut: () => void;
  onHome: () => void;
  data: ProfileData;
  onChange: React.Dispatch<React.SetStateAction<ProfileData>>;
  userEmail: string | null;
  userId: string | null;
  activePlan?: "free" | "pro";
  setActivePlan: (plan: "free" | "pro") => void;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    | "home"
    | "edit"
    | "analytics"
    | "leaderboard"
    | "settings"
    | "help"
    | "premium"
  >("edit");
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<
    "Daily" | "Weekly" | "Monthly" | "All Time"
  >("All Time");
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [analyticsPeriod, setAnalyticsPeriod] = useState<
    "Daily" | "Weekly" | "Monthly" | "All Time"
  >("Weekly");

  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showQRCodeView, setShowQRCodeView] = useState(false);
  const [copiedShareUrl, setCopiedShareUrl] = useState(false);

  const shareDisplayUrl = `prophile.app/${data.username || "username"}`;
  const shareFullUrl = `${window.location.origin}/${data.username || "preview"}`;

  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(shareFullUrl).catch(() => {});
    setCopiedShareUrl(true);
    setTimeout(() => setCopiedShareUrl(false), 2000);
  };

  useEffect(() => {
    if (activeTab === "leaderboard") {
      import("./lib/api").then(api => {
        if (api.fetchLeaderboard) {
          api.fetchLeaderboard().then(data => setLeaderboardData(data));
        }
      });
    }
    if (activeTab === "analytics" && userId) {
      import("./lib/api").then(api => {
        if ((api as any).fetchAnalytics) {
          (api as any).fetchAnalytics(userId).then((data: any) => setAnalyticsData(data));
        }
      });
    }
  }, [activeTab, userId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (userId) {
        const api = await import("./lib/api");
        await api.saveProfile(userId, data);
      } else {
        // Fallback for demo users
        await new Promise((r) => setTimeout(r, 100));
      }
      setIsSaving(false);
      onBack();
    } catch (e) {
      console.error("Failed to save", e);
      alert("Failed to save profile. Please check console for details.");
      setIsSaving(false);
    }
  };


  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "avatarUrl" | "bannerUrl" | "audioUrl",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const title = file.name.replace(/\.[^/.]+$/, "");
      const reader = new FileReader();
      // Optimistic visual update
      reader.onloadend = () => {
        if (field === "audioUrl") {
          onChange({
            ...data,
            audioUrl: reader.result as string,
            audioTitle: title,
          });
        } else {
          onChange({ ...data, [field]: reader.result as string });
        }
      };
      reader.readAsDataURL(file);

      if (userId) {
        try {
          const api = await import("./lib/api");
          const bucketMap = {
            avatarUrl: "avatars",
            bannerUrl: "banners",
            audioUrl: "audio",
          } as const;
          const publicUrl = await api.uploadFile(
            bucketMap[field],
            file,
            userId,
          );
          // Wait for state to catch up to not override other quick changes
          setTimeout(() => {
            onChange((currentData) => {
              if (field === "audioUrl") {
                return {
                  ...currentData,
                  audioUrl: publicUrl,
                  audioTitle: title,
                };
              } else {
                return { ...currentData, [field]: publicUrl };
              }
            });
          }, 500);
        } catch (err: any) {
          console.error(`Failed to upload ${field}`, err);
          if (err.message?.includes("fetch")) {
            console.log(`Fallback to base64 for ${field} due to network error`);
          } else {
            alert(
              `Failed to upload ${field}. Make sure your Supabase Storage buckets are public and have RLS disabled for inserts/updates (see supabase/schema.sql)`,
            );
          }
        }
      }
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isPremium = activePlan === "pro";
      const maxSizeMB = isPremium ? 50 : 10;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      
      if (file.size > maxSizeBytes) {
        alert(`File is too large. ${isPremium ? "Premium" : "Free"} plan allows up to ${maxSizeMB}MB (${isPremium ? "4K" : "720p"}). Upgrade to Premium for larger file limits.`);
        return;
      }

      const reader = new FileReader();
      // Optimistic visual update
      reader.onloadend = () => {
        onChange((curr) => ({
          ...curr,
          videoBackgroundUrl: reader.result as string,
          videoBackgroundEnabled: true,
        }));
      };
      reader.readAsDataURL(file);

      if (userId) {
        try {
          const api = await import("./lib/api");
          const publicUrl = await api.uploadFile("banners", file, userId);
          // Wait for state to catch up to not override other quick changes
          setTimeout(() => {
            onChange((currentData) => ({
              ...currentData,
              videoBackgroundUrl: publicUrl,
              videoBackgroundEnabled: true,
            }));
          }, 500);
        } catch (err: any) {
          console.error(`Failed to upload background video`, err);
          if (err.message?.includes("fetch")) {
            console.log(`Fallback to base64 for video due to network error`);
          } else {
            alert(
              `Failed to upload video. Make sure your video is under ${maxSizeMB}MB.`,
            );
          }
        }
      }
    }
  };

  const addLink = () => {
    if (data.links.length >= 5) return;
    onChange({
      ...data,
      links: [...data.links, { id: Date.now(), title: "", url: "" }],
    });
  };

  const updateLink = (id: number, field: "title" | "url", value: string) => {
    onChange({
      ...data,
      links: data.links.map((l) =>
        l.id === id ? { ...l, [field]: value } : l,
      ),
    });
  };

  const removeLink = (id: number) => {
    onChange({ ...data, links: data.links.filter((l) => l.id !== id) });
  };

  return (
    <div className="min-h-screen bg-texture text-black flex flex-col font-sans pb-12 overflow-hidden">
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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-[#1a1a1a] z-[70] shadow-2xl flex flex-col rounded-r-[24px]"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div
                  onClick={onHome}
                  className="flex items-center gap-2.5 text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black font-josefin font-bold text-xs">
                    P
                  </div>
                  <span className="font-josefin font-bold text-lg text-white tracking-tight">
                    Prophile
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="p-3">
                  <p className="text-[11px] text-gray-500 font-medium tracking-wider mb-2 px-2 uppercase mt-2">
                    Menu
                  </p>

                  <button
                    onClick={() => {
                      onHome();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-colors mb-1 cursor-pointer text-gray-300 hover:text-white hover:bg-[#252525]`}
                  >
                    <Home size={18} />
                    <span className="font-josefin font-semibold text-[15px]">
                      Home
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("edit");
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-colors mb-1 cursor-pointer ${activeTab === "edit" ? "bg-[#252525] text-white border border-white/5" : "text-gray-300 hover:text-white hover:bg-[#252525]"}`}
                  >
                    <User size={18} />
                    <span className="font-josefin font-semibold text-[15px]">
                      Edit profile
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("premium");
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-colors mb-1 cursor-pointer group ${activeTab === "premium" ? "bg-[#252525] text-white border border-white/5" : "text-gray-300 hover:text-white hover:bg-[#252525]"}`}
                  >
                    <Crown
                      size={18}
                      className={
                        activeTab === "premium"
                          ? "text-white"
                          : "text-gray-300"
                      }
                    />
                    <span className="font-josefin font-semibold text-[15px]">
                      Premium
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("analytics");
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-colors mb-1 cursor-pointer ${activeTab === "analytics" ? "bg-[#252525] text-white border border-white/5" : "text-gray-300 hover:text-white hover:bg-[#252525]"}`}
                  >
                    <BarChart2 size={18} />
                    <span className="font-josefin font-semibold text-[15px]">
                      Analytics
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("leaderboard");
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-colors mb-1 cursor-pointer ${activeTab === "leaderboard" ? "bg-[#252525] text-white border border-white/5" : "text-gray-300 hover:text-white hover:bg-[#252525]"}`}
                  >
                    <Trophy size={18} />
                    <span className="font-josefin font-semibold text-[15px]">
                      Leaderboard
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("settings");
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-colors mb-1 cursor-pointer mt-2 ${activeTab === "settings" ? "bg-[#252525] text-white border border-white/5" : "text-gray-300 hover:text-white hover:bg-[#252525]"}`}
                  >
                    <Settings size={18} />
                    <span className="font-josefin font-semibold text-[15px]">
                      Settings
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("help");
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-colors mb-1 cursor-pointer ${activeTab === "help" ? "bg-[#252525] text-white border border-white/5" : "text-gray-300 hover:text-white hover:bg-[#252525]"}`}
                  >
                    <HelpCircle size={18} />
                    <span className="font-josefin font-semibold text-[15px]">
                      Help
                    </span>
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-white/5 mt-auto space-y-2.5">
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setShowQRCodeView(false);
                    setIsShareModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#141414] border border-white/10 hover:bg-[#222] transition-colors text-white font-josefin font-bold text-[15px] cursor-pointer"
                >
                  <Share2 size={17} className="text-white" />
                  <span>Share Your Profile</span>
                </button>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141414] border border-white/10">
                  <div className="flex items-center gap-3 overflow-hidden">
                    {data.avatarUrl ? (
                      <img src={data.avatarUrl} className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white shrink-0">
                        {data.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div className="flex flex-col truncate">
                      <span className="font-semibold text-white text-sm truncate">
                        {data.username || data.displayName || "User"}
                      </span>
                      {userEmail && (
                        <span className="text-xs text-gray-400 max-w-[130px] truncate">
                          {userEmail}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onSignOut}
                    className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-white/5 cursor-pointer shrink-0"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Share Your Profile Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-[380px] bg-[#141414] border border-white/10 rounded-[26px] p-6 z-[90] shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-josefin font-bold text-white tracking-tight">
                  {showQRCodeView ? "Profile QR Code" : "Share Your Profile"}
                </h2>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                {showQRCodeView
                  ? "Scan this QR code to open your Prophile page directly."
                  : "Share your Prophile link everywhere you're active."}
              </p>

              {showQRCodeView ? (
                <div className="mt-5 flex flex-col items-center gap-4">
                  <div className="p-4 bg-white rounded-2xl shadow-lg">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareFullUrl)}`}
                      alt="Profile QR Code"
                      width={180}
                      height={180}
                      className="w-44 h-44 block"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="font-mono text-xs text-gray-400">{shareDisplayUrl}</span>
                  <button
                    onClick={() => setShowQRCodeView(false)}
                    className="w-full py-3 rounded-2xl bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 text-white font-josefin font-bold text-sm transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                </div>
              ) : (
                <div className="mt-5 space-y-2.5">
                  {/* QR Code Option */}
                  <button
                    onClick={() => setShowQRCodeView(true)}
                    className="w-full flex items-center gap-3.5 p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 hover:bg-[#222] transition-colors cursor-pointer text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#252525] flex items-center justify-center text-white shrink-0">
                      <QrCode size={19} />
                    </div>
                    <span className="font-josefin font-semibold text-white text-[15px]">
                      Prophile QR Code
                    </span>
                  </button>

                  {/* Open my Page Option */}
                  <button
                    onClick={() => {
                      setIsShareModalOpen(false);
                      onBack();
                    }}
                    className="w-full flex items-center gap-3.5 p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 hover:bg-[#222] transition-colors cursor-pointer text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#252525] flex items-center justify-center text-white shrink-0">
                      <ExternalLink size={19} />
                    </div>
                    <span className="font-josefin font-semibold text-white text-[15px]">
                      Open my Page
                    </span>
                  </button>

                  {/* Copy URL Bar */}
                  <div className="w-full flex items-center justify-between gap-2 p-2 pl-4 rounded-2xl bg-[#1a1a1a] border border-white/10">
                    <span className="font-mono text-xs sm:text-sm text-gray-300 truncate">
                      {shareDisplayUrl}
                    </span>
                    <button
                      onClick={handleCopyShareUrl}
                      className="bg-[#d4d4d4] hover:bg-white text-black font-josefin font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all shrink-0 cursor-pointer active:scale-95"
                    >
                      {copiedShareUrl ? <Check size={15} /> : <Copy size={15} />}
                      <span>{copiedShareUrl ? "Copied!" : "Copy URL"}</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <div className="pt-4 px-4 md:px-8">
        <header className="sticky top-4 z-50 bg-texture/90 backdrop-blur-md p-3 md:px-6 flex items-center justify-between border border-[#e5e5e5] rounded-[24px] shadow-sm max-w-5xl mx-auto">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-[#18181b] hover:bg-[#27272a] h-9 px-4 rounded-xl flex items-center gap-2 transition-colors text-white shadow-md cursor-pointer"
          >
            <Menu size={16} className="text-white" strokeWidth={2.5} />
            <span className="font-josefin font-bold text-[15px] tracking-tight text-white mb-[1px]">
              Prophile
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab("edit")}
              className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 shadow-sm cursor-pointer hover:opacity-80 transition-opacity bg-white"
            >
              {data.avatarUrl ? (
                <img src={data.avatarUrl} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center font-bold text-white text-xs">
                  {data.username?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </button>
          </div>
        </header>
      </div>

      <main className={`flex-1 w-full ${activeTab === "premium" || activeTab === "analytics" || activeTab === "help" ? "max-w-2xl" : "max-w-[400px]"} mx-auto px-4 pt-8 md:pt-12`}>
        {activeTab === "home" && (
          <div className="space-y-6 pb-12">
            <div className="mb-6">
              <h1 className="text-[28px] font-josefin font-bold tracking-tight">
                Welcome to Prophile
              </h1>
              <p className="text-gray-600 mt-1.5 text-sm leading-relaxed">
                Manage your links, profile music, and appearance from one place.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-[1.5rem] p-6">
              <h3 className="text-lg font-josefin font-bold text-white">
                Getting Started
              </h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed mb-5">
                Your public profile is live. Head over to{" "}
                <strong
                  className="text-white font-semibold cursor-pointer underline"
                  onClick={() => setActiveTab("edit")}
                >
                  Edit profile
                </strong>{" "}
                to customize your links, background, and music player.
              </p>
              <button
                onClick={onBack}
                className="bg-[#d4d4d4] hover:bg-white text-black font-semibold py-2.5 px-5 rounded-full transition-colors flex items-center gap-2 text-sm cursor-pointer"
              >
                View My Public Page <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="bg-[#141414] border border-white/10 rounded-[1.5rem] p-6 text-center hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                onClick={() => setActiveTab("analytics")}
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {analyticsData ? analyticsData.views : "0"}
                </div>
                <div className="text-gray-400 text-sm">Total Views</div>
              </div>
              <div
                className="bg-[#141414] border border-white/10 rounded-[1.5rem] p-6 text-center hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                onClick={() => setActiveTab("edit")}
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {data.links.length}
                </div>
                <div className="text-gray-400 text-sm">Active Links</div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="mb-4">
              <div>
                <h1 className="text-[28px] font-josefin font-bold tracking-tight">
                  Analytics
                </h1>
                <p className="text-gray-600 mt-1 text-sm">
                  Performance stats for your profile
                </p>
              </div>
            </div>

            {activePlan === "free" ? (
              <div className="bg-[#141414] border border-white/10 rounded-[1.5rem] p-8 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-josefin font-bold text-white mb-2">Premium Feature</h3>
                <p className="text-gray-400 text-sm max-w-sm mb-6">
                  Upgrade to Premium to track your page views, link clicks, and audience engagement.
                </p>
                <button
                  onClick={() => setActiveTab("premium")}
                  className="bg-[#d4d4d4] text-black px-6 py-3 rounded-full font-semibold transition-colors hover:bg-white cursor-pointer"
                >
                  View Plans
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#141414] border border-white/10 p-4 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-gray-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Page Views</span>
                      <h3 className="text-2xl font-josefin font-bold text-white mt-1">{analyticsData ? analyticsData.views : "..."}</h3>
                    </div>
                  </div>
                  <div className="bg-[#141414] border border-white/10 p-4 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-gray-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Link Clicks</span>
                      <h3 className="text-2xl font-josefin font-bold text-white mt-1">{analyticsData ? analyticsData.clicks : "..."}</h3>
                    </div>
                  </div>
                  <div className="bg-[#141414] border border-white/10 p-4 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-gray-400 font-mono text-[10px] uppercase tracking-wider font-semibold">CTR</span>
                      <h3 className="text-2xl font-josefin font-bold text-white mt-1">{analyticsData ? analyticsData.ctr + "%" : "..."}</h3>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#141414] border border-white/10 rounded-[1.5rem] p-5">
                    <h3 className="font-josefin font-bold text-white text-[16px] mb-4">Traffic Referrals</h3>
                    <div className="space-y-4">
                      {analyticsData ? analyticsData.sources.map((item: any) => (
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
                              animate={{ width: `${item.pct}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-white"
                            />
                          </div>
                        </div>
                      )) : "..."}
                    </div>
                  </div>

                  <div className="bg-[#141414] border border-white/10 rounded-[1.5rem] p-5">
                    <h3 className="font-josefin font-bold text-white text-[16px] mb-4">Top Geographies</h3>
                    <div className="space-y-3">
                      {analyticsData ? analyticsData.countries.map((loc: any) => (
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
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <div className="mb-4">
              <h1 className="text-[28px] font-josefin font-bold tracking-tight">Leaderboard</h1>
              <p className="text-gray-600 mt-1 text-sm">Top creators on Prophile</p>
            </div>
            <div className="bg-[#141414] border border-white/10 rounded-[1.5rem] p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-josefin font-bold text-white text-[16px]">Global Rankings</h3>
                <div className="flex bg-[#252525] p-1 rounded-lg">
                  <button onClick={() => setLeaderboardPeriod("Daily")} className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${leaderboardPeriod === "Daily" ? "bg-[#d4d4d4] text-black" : "text-gray-400 hover:text-white"}`}>Today</button>
                  <button onClick={() => setLeaderboardPeriod("Weekly")} className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${leaderboardPeriod === "Weekly" ? "bg-[#d4d4d4] text-black" : "text-gray-400 hover:text-white"}`}>Week</button>
                  <button onClick={() => setLeaderboardPeriod("All Time")} className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${leaderboardPeriod === "All Time" ? "bg-[#d4d4d4] text-black" : "text-gray-400 hover:text-white"}`}>All Time</button>
                </div>
              </div>
              <div className="space-y-3">
                {leaderboardData && leaderboardData.length > 0 ? leaderboardData.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/[0.02] p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate(`/${user?.username || ""}`)}>
                    <div className="flex items-center gap-4">
                      <span className={`font-mono font-bold w-6 text-center ${idx === 0 ? "text-white text-lg" : "text-gray-400"}`}>
                        #{idx + 1}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0 uppercase">
                        {user?.username?.substring(0,2) || "U"}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold font-josefin text-[15px]">{user?.name || user?.username || "Anonymous"}</h4>
                        <p className="text-gray-400 text-xs">prophile.app/{user?.username || "unknown"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-mono font-bold block">{(user?.views || 0).toLocaleString()}</span>
                      <span className="text-gray-500 text-[10px] uppercase tracking-wider">Views</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10 text-gray-500">Loading leaderboard...</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="mb-4">
              <h1 className="text-[28px] font-josefin font-bold tracking-tight">Settings</h1>
            </div>
            <div className="bg-[#141414] border border-white/10 rounded-[1.5rem] p-6 space-y-2">
              <div className="flex justify-between items-center py-2 pb-4 border-b border-white/5">
                <div>
                  <p className="text-white font-medium font-josefin text-lg">Email Address</p>
                  {userEmail ? (
                    <p className="text-gray-400 text-sm">{userEmail}</p>
                  ) : (
                    <p className="text-gray-400 text-sm">Not connected</p>
                  )}
                </div>
                {!userEmail && (
                  <button 
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        const event = new CustomEvent("open-auth");
                        window.dispatchEvent(event);
                      }
                    }}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-colors bg-[#d4d4d4] text-black hover:bg-white cursor-pointer"
                  >
                    Add Email
                  </button>
                )}
              </div>
              <div className="pt-4">
                <button 
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete your account? This action is irreversible.")) {
                      if (isSupabaseConfigured && userId) {
                        try {
                          await supabase.from('profiles').delete().eq('id', userId);
                          await supabase.auth.signOut();
                        } catch {}
                      }
                      localStorage.removeItem("prophile_demo_email");
                      localStorage.removeItem("prophile_demo_uid");
                      localStorage.removeItem("prophile_demo_profile");
                      window.location.reload();
                    }
                  }}
                  className="text-red-500 font-medium text-sm hover:text-red-400 transition-colors cursor-pointer"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "premium" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="mb-6 flex flex-col items-center text-center">
              <h1 className="text-3xl md:text-4xl font-josefin font-bold tracking-tight text-black mb-2">
                Prophile Premium
              </h1>
              <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                Start free. Unlock advanced customization and effects with Premium — pay once, keep forever.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-2">
              {/* Free Tier */}
              <div
                className={`bg-[#141414] border rounded-[1.75rem] p-7 flex flex-col justify-between relative transition-all duration-300 overflow-hidden shadow-xl ${activePlan === "free" ? "border-white/30" : "border-white/10"}`}
              >
                {activePlan === "free" && (
                  <div className="absolute top-0 right-0 bg-[#d4d4d4] text-black text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest font-sans">
                    Active
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-josefin font-bold text-white">
                    Free
                  </h3>
                  <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                    Build a personalized profile at no cost.
                  </p>

                  <div className="flex items-baseline gap-1 mt-6 mb-7">
                    <span className="text-4xl font-josefin font-bold text-white">
                      $0
                    </span>
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
                  onClick={() => setActivePlan("free")}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-3.5 rounded-full mt-8 transition-all ${activePlan === "free" ? "bg-[#252525] text-white border border-white/10 cursor-default" : "bg-[#d4d4d4] hover:bg-white text-black cursor-pointer"}`}
                  disabled={activePlan === "free"}
                >
                  {activePlan === "free" ? "Current Plan" : "Switch to Free"}
                </button>
              </div>

              {/* Premium Tier */}
              <div
                className={`bg-[#141414] border-2 rounded-[1.75rem] p-7 flex flex-col justify-between relative transition-all duration-300 overflow-hidden shadow-2xl ${activePlan === "pro" ? "border-white/40" : "border-white/15"}`}
              >
                <div className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest font-sans">
                  {activePlan === "pro" ? "Active" : "Lifetime"}
                </div>
                <div>
                  <h3 className="text-2xl font-josefin font-bold text-white">
                    Premium
                  </h3>
                  <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                    More control. More effects. More everything.
                  </p>

                  <div className="flex items-baseline gap-1 mt-6 mb-7">
                    <span className="text-4xl font-josefin font-bold text-white">
                      $4.99
                    </span>
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
                  onClick={() => setActivePlan("pro")}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-3.5 rounded-full mt-8 transition-all ${activePlan === "pro" ? "bg-[#252525] text-white border border-white/10 cursor-default" : "bg-white hover:bg-gray-200 text-black shadow-md cursor-pointer"}`}
                  disabled={activePlan === "pro"}
                >
                  {activePlan === "pro" ? "Current Plan" : "Get Premium"}
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "help" && (
          <div className="space-y-6">
            <div className="mb-6 text-center">
              <h1 className="text-[28px] font-josefin font-bold tracking-tight">
                Help & Support
              </h1>
              <p className="text-gray-600 mt-1.5 text-sm max-w-md mx-auto">
                Common questions about managing your Prophile page.
              </p>
            </div>
            
            <div className="space-y-3.5">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-5">
                <h4 className="text-white font-josefin font-bold text-base mb-1.5">
                  How do I customize my page URL?
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  You can change your username from the <strong>Edit profile</strong> tab. This sets your public URL (e.g., prophile.app/username).
                </p>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl p-5">
                <h4 className="text-white font-josefin font-bold text-base mb-1.5">
                  What makes Premium different?
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Premium is a one-time unlock that gives you 4K video backgrounds, glassmorphic card styling, custom fonts and colors, and traffic analytics.
                </p>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl p-5">
                <h4 className="text-white font-josefin font-bold text-base mb-1.5">
                  How do analytics work?
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The analytics dashboard tracks page views, link clicks, click-through rate (CTR), top referral sources, and visitor geographies.
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "edit" && (
          <>
            <div className="mb-8">
              <h1 className="text-[28px] font-josefin font-bold tracking-tight">
                Edit your page
              </h1>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onBack();
                }}
                className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 mt-2 text-sm transition-colors cursor-pointer"
              >
                Live at prophile.app/{data.username.toLowerCase()}{" "}
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="space-y-6">
              {/* Avatar Card */}
              <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative overflow-visible">
                    <div className="w-24 h-24 rounded-full bg-[#1b1b1f] flex items-center justify-center overflow-hidden border border-white/5 mx-auto">
                      {data.avatarUrl ? (
                        <img
                          src={data.avatarUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={32} className="text-gray-400" />
                      )}
                    </div>
                    <label className="absolute -bottom-1 right-0 bg-[#252525] hover:bg-[#333] border-4 border-[#141414] w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                      <Upload size={16} className="text-white relative z-10" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "avatarUrl")}
                      />
                    </label>
                  </div>
                  
                  {/* Avatar Decoration Toggle */}
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg w-full max-w-[280px] mx-auto mt-2 relative overflow-hidden">
                    {activePlan === "free" && (
                      <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center cursor-pointer" onClick={() => setActiveTab("premium")}>
                        <Lock size={16} className="text-white/80" />
                      </div>
                    )}
                    <span className="text-[15px] font-semibold text-white/85">
                      Avatar Decoration
                    </span>
                    <div
                      onClick={() => {
                        if (activePlan === "pro") {
                          onChange({ ...data, isGlowing: !data.isGlowing });
                        }
                      }}
                      className={`w-12 h-6 rounded-full flex items-center p-0.5 transition-colors ${activePlan === "pro" ? "cursor-pointer" : "cursor-not-allowed opacity-50"} ${data.isGlowing ? "bg-white" : "bg-[#333]"}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full shadow-sm transition-transform duration-200 ${data.isGlowing ? "bg-black translate-x-[24px]" : "bg-white/70 translate-x-[0px]"}`}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-[20px] ${data.displayNameFont || "font-josefin"} font-bold text-white tracking-tight`} style={{ color: data.displayNameColor || "#ffffff" }}>
                      {data.displayName || "No Name"}
                    </h3>
                    <p className="text-[#a1a1aa] text-[15px] mt-0.5">
                      @{data.username.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Typography & Colors */}
              <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6 space-y-5 text-center">
                <div>
                  <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-3 text-center">
                    Display Name Font
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["font-sans", "font-serif", "font-mono", "font-josefin", "font-playfair", "font-outfit"].map((font) => (
                      <button
                        key={font}
                        onClick={() => {
                          if (activePlan === 'pro' || font === 'font-sans' || font === 'font-josefin') {
                            onChange({ ...data, displayNameFont: font });
                          } else {
                            alert("Custom fonts are a Premium feature!");
                          }
                        }}
                        className={`flex-1 min-w-[70px] py-2 rounded-lg border ${
                          (data.displayNameFont || "font-josefin") === font
                            ? "bg-[#d4d4d4] text-black border-white"
                            : "bg-[#1a1a1a] text-white border-white/5 hover:border-white/20"
                        } text-sm ${font} transition-colors capitalize relative overflow-hidden`}
                      >
                        {activePlan !== 'pro' && font !== 'font-sans' && font !== 'font-josefin' && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Lock size={12} className="text-white/80" />
                          </div>
                        )}
                        {font.replace("font-", "")}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-3 text-center">
                    Display Name Color
                  </label>
                  <div className="flex gap-2 mt-2 flex-wrap justify-center items-center">
                    {["#ffffff", "#fca5a5", "#fdba74", "#fcd34d", "#86efac", "#67e8f9", "#93c5fd", "#c4b5fd", "#f9a8d4", "#fda4af"].map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          if (activePlan === 'pro' || color === '#ffffff') {
                            onChange({ ...data, displayNameColor: color });
                          } else {
                            alert("Custom colors are a Premium feature!");
                          }
                        }}
                        className={`w-8 h-8 rounded-full border-2 ${
                          (data.displayNameColor || "#ffffff") === color
                            ? "border-white scale-110"
                            : "border-transparent hover:scale-105"
                        } transition-all relative overflow-hidden shadow-sm`}
                        style={{ backgroundColor: color }}
                      >
                        {activePlan !== 'pro' && color !== '#ffffff' && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Lock size={12} className="text-white/80" />
                          </div>
                        )}
                      </button>
                    ))}
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:scale-105 transition-all shadow-sm">
                      <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }} />
                      <input 
                        type="color"
                        value={data.displayNameColor || "#ffffff"}
                        onChange={(e) => {
                          if (activePlan === 'pro') {
                            onChange({ ...data, displayNameColor: e.target.value });
                          } else {
                            alert("Custom colors are a Premium feature!");
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {activePlan !== 'pro' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                          <Lock size={12} className="text-white/80" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Info Card */}
              <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6 space-y-5 text-center">
                <div>
                  <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-3 text-center">
                    Username
                  </label>
                  <div className="flex items-center bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden focus-within:border-white/20 transition-colors">
                    <div className="px-4 py-3.5 text-white border-r border-[#222] bg-[#171717] font-semibold text-[15px]">
                      prophile.app/
                    </div>
                    <DebouncedInput
                      type="text"
                      value={data.username.toLowerCase()}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          username: e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ''),
                        })
                      }
                      placeholder="yourname"
                      className="bg-transparent flex-1 px-4 py-3 text-white outline-none w-full text-[15px] font-semibold text-center placeholder:text-white/25"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-3 text-center">
                    Display name
                  </label>
                  <DebouncedInput
                    type="text"
                    value={data.displayName}
                    onChange={(e) =>
                      onChange({ ...data, displayName: e.target.value })
                    }
                    placeholder="What should we call you?"
                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white outline-none focus:border-white/20 transition-colors text-[15px] font-semibold text-center placeholder:text-white/25"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-3 text-center">
                    Bio
                  </label>
                  <DebouncedTextarea
                    rows={3}
                    value={data.bio}
                    onChange={(e) => onChange({ ...data, bio: e.target.value })}
                    placeholder="Tell visitors about yourself..."
                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white outline-none focus:border-white/20 transition-colors resize-none text-[15px] font-semibold text-center placeholder:text-white/25"
                  />
                  <p className="text-[12px] text-[#555] mt-1.5 text-center font-mono">
                    {data.bio.length}/160
                  </p>
                </div>
              </div>

              {/* Profile Music Settings */}
              <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6 text-center space-y-4">
                <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-3 text-center">
                  Profile music
                </label>
                <div className="relative flex items-center mb-3">
                  <label className="w-full bg-[#1a1a1a] hover:bg-[#252525] border border-white/5 py-3.5 rounded-full flex items-center justify-center gap-2 text-[15px] font-semibold text-white transition-colors cursor-pointer">
                    <Music size={20} />{" "}
                    {data.audioUrl ? "Replace track" : "Upload track"}
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "audioUrl")}
                    />
                  </label>
                  {data.audioUrl && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onChange({ ...data, audioUrl: "", audioTitle: "" });
                      }}
                      className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-[#ff4444] hover:bg-[#ff4444]/10 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                {data.audioUrl && (
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      value={data.audioTitle || ""}
                      onChange={(e) => onChange({ ...data, audioTitle: e.target.value })}
                      placeholder="Track title"
                      className="w-full bg-transparent border border-white/20 rounded-full px-5 py-3.5 text-white text-[15px] outline-none focus:border-white/40 transition-colors font-semibold text-center placeholder:text-white/30"
                    />
                  </div>
                )}
                <p className="text-[13px] text-[#888] text-center">
                  MP3, WAV, or OGG · up to 8MB
                </p>
              </div>

              {/* Video Background Settings */}
              <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6 text-center space-y-4">
                <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-1">
                  Video background
                </label>

                <div className="flex items-center justify-between bg-[#1a1a1a] border border-white/5 rounded-xl p-4 mb-4">
                  <span className="text-[15px] font-semibold text-[#a1a1aa]">
                    Video background active
                  </span>
                  {/* Toggle Switch */}
                  <div
                    onClick={() =>
                      onChange({
                        ...data,
                        videoBackgroundEnabled:
                          !data.videoBackgroundEnabled,
                      })
                    }
                    className={`w-12 h-6 rounded-full flex items-center p-0.5 cursor-pointer transition-colors ${data.videoBackgroundEnabled ? "bg-white" : "bg-[#333]"}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full shadow-sm transition-transform duration-200 ${data.videoBackgroundEnabled ? "bg-black translate-x-[24px]" : "bg-white/70 translate-x-[0px]"}`}
                    ></div>
                  </div>
                </div>

                {data.videoBackgroundEnabled && (
                  <div className="space-y-4">
                    <div className="text-left space-y-3">
                      <div className="flex items-center gap-2">
                        <DebouncedInput
                          type="text"
                          placeholder="Paste direct MP4 or WebM URL..."
                          value={
                            data.videoBackgroundUrl &&
                            !data.videoBackgroundUrl.startsWith("data:") &&
                            !data.videoBackgroundUrl.includes("supabase.co")
                              ? data.videoBackgroundUrl
                              : ""
                          }
                          onChange={(e) =>
                            onChange({
                              ...data,
                              videoBackgroundUrl: e.target.value,
                            })
                          }
                          className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-650 text-[14px] font-semibold outline-none focus:border-white/10 text-center"
                        />
                      </div>

                      <div className="relative flex items-center">
                        <label className="w-full bg-[#1a1a1a] hover:bg-[#252525] border border-white/5 py-3.5 rounded-full flex items-center justify-center gap-2 text-[14px] font-semibold text-white transition-colors cursor-pointer shadow-sm">
                          <Video size={16} /> {data.videoBackgroundUrl ? "Replace MP4/WebM" : "Upload MP4/WebM"}
                          <input
                            type="file"
                            accept="video/mp4,video/webm"
                            className="hidden"
                            onChange={handleVideoUpload}
                          />
                        </label>
                        {data.videoBackgroundUrl && (
                          <button
                            onClick={() =>
                              onChange({ ...data, videoBackgroundUrl: "" })
                            }
                            className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-[#ff4444] hover:bg-[#ff4444]/10 transition-colors cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="pt-2 border-t border-white/5 relative mt-4">
                        <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-3 text-center">
                          Video Blur
                        </label>
                        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg relative overflow-hidden">
                          {activePlan === "free" && (
                            <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center cursor-pointer" onClick={() => setActiveTab("premium")}>
                              <Lock size={16} className="text-white/80" />
                            </div>
                          )}
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[13px] font-semibold text-white/85">Blur Radius</span>
                            <span className="text-[12px] text-gray-400 font-mono">{Math.round(((data.videoBackgroundBlur ?? 5) / 50) * 100)}%</span>
                          </div>
                          <input
                              type="range"
                              min="0"
                              max="50"
                              value={data.videoBackgroundBlur ?? 5}
                              onChange={(e) => onChange({ ...data, videoBackgroundBlur: Number(e.target.value) })}
                              className="w-full accent-white cursor-pointer"
                            />
                          </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Premium Features Card */}
              <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6">
                <div className="flex items-center gap-2 mb-8 text-white font-josefin font-bold text-lg">
                  <Crown size={20} /> Premium features
                </div>

                <div className="relative">
                  <div className={`space-y-8 transition-all duration-500`}>
                    <div className="text-center">
                    <label className="block text-[18px] font-josefin font-bold text-white mb-3 text-center tracking-tight">
                      Custom banner
                    </label>
                    <div className="w-full aspect-[15/6] bg-[#141414] rounded-[1rem] relative overflow-hidden flex flex-col justify-between p-3 border border-white/5">
                      {activePlan === "free" && (
                        <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center cursor-pointer" onClick={() => setActiveTab("premium")}>
                          <Lock size={20} className="text-white/80" />
                        </div>
                      )}
                      {data.bannerUrl ? (
                        <img
                          src={data.bannerUrl}
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      ) : null}
                      <div className="flex justify-end relative z-10 w-full">
                        {data.bannerUrl && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onChange({ ...data, bannerUrl: "" });
                            }}
                            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-[#ff4444] hover:bg-black/80 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <div className="flex justify-end relative z-10 w-full mt-auto">
                        <label className="bg-black/60 hover:bg-black/80 backdrop-blur text-white text-[15px] py-2 px-4 rounded-full flex items-center gap-2 transition-colors border border-white/10 cursor-pointer">
                          <ImageIcon size={16} />{" "}
                          {data.bannerUrl ? "Replace" : "Upload"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, "bannerUrl")}
                          />
                        </label>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#888] mt-4 text-center">
                      JPG, PNG, or WebP · up to 5MB · 16:5 looks best
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-3 text-center">
                          Glassmorphic Card
                        </label>
                        <div className="flex items-center justify-between bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg relative overflow-hidden">
                          {activePlan === "free" && (
                            <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center cursor-pointer" onClick={() => setActiveTab("premium")}>
                              <Lock size={16} className="text-white/80" />
                            </div>
                          )}
                          <span className="text-[15px] font-semibold text-white/85">
                            {data.isGlassmorphic
                              ? "Glassmorphic design is ON"
                              : "Glassmorphic design is OFF"}
                          </span>
                          {/* Glassmorphic Toggle Switch */}
                          <div
                            onClick={() => {
                              if (activePlan === "pro") {
                                onChange({
                                  ...data,
                                  isGlassmorphic: !data.isGlassmorphic,
                                });
                              }
                            }}
                            className={`w-12 h-6 rounded-full flex items-center p-0.5 transition-colors ${activePlan === "pro" ? "cursor-pointer" : "cursor-not-allowed opacity-50"} ${data.isGlassmorphic ? "bg-white" : "bg-[#333]"}`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full shadow-sm transition-transform duration-200 ${
                                data.isGlassmorphic
                                  ? "bg-black translate-x-[24px]"
                                  : "bg-white/70 translate-x-[0px]"
                              }`}
                            ></div>
                          </div>
                        </div>
                        {activePlan === "pro" && data.isGlassmorphic && (
                          <>
                            <div className="pt-4">
                              <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-3 text-center">
                                Background Opacity
                              </label>
                              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-[14px] font-semibold text-white/85">Opacity Level</span>
                                  <span className="text-[13px] text-gray-400 font-mono">{data.glassmorphismOpacity ?? 10}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={data.glassmorphismOpacity ?? 10}
                                  onChange={(e) => onChange({ ...data, glassmorphismOpacity: Number(e.target.value) })}
                                  className="w-full accent-white cursor-pointer"
                                />
                              </div>
                            </div>
                            
                            <div className="pt-4">
                              <label className="block text-[18px] font-josefin font-bold tracking-tight text-white mb-3 text-center">
                                Background Blur
                              </label>
                              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-[14px] font-semibold text-white/85">Blur Radius</span>
                                  <span className="text-[13px] text-gray-400 font-mono">{data.glassmorphismBlur ?? 20}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={data.glassmorphismBlur ?? 20}
                                  onChange={(e) => onChange({ ...data, glassmorphismBlur: Number(e.target.value) })}
                                  className="w-full accent-white cursor-pointer"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Links Card */}
              <div className="bg-[#141414] border border-white/5 rounded-[1.5rem] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-[17px] font-josefin font-bold tracking-tight">
                    Links
                  </h3>
                  <span className="text-[15px] text-[#888]">
                    {data.links.length} / 5
                  </span>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {data.links.map((link) => (
                      <motion.div
                        key={link.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 relative w-full pt-1"
                      >
                        <DebouncedInput
                          type="text"
                          value={link.title}
                          onChange={(e) =>
                            updateLink(link.id, "title", e.target.value)
                          }
                          placeholder="Label"
                          className="w-[120px] bg-transparent border border-white/10 rounded-full px-5 py-3.5 text-white text-[15px] font-semibold outline-none focus:border-white/20 transition-colors shrink-0 text-center"
                        />
                        <DebouncedInput
                          type="url"
                          value={link.url}
                          onChange={(e) =>
                            updateLink(link.id, "url", e.target.value)
                          }
                          placeholder="https://..."
                          className="flex-1 bg-transparent border border-white/10 rounded-full px-5 py-3.5 text-white text-[15px] font-semibold outline-none focus:border-white/20 transition-colors min-w-0 text-center"
                        />
                        <button
                          onClick={() => removeLink(link.id)}
                          className="p-2 text-[#ff4444] hover:bg-[#ff4444]/10 rounded-lg transition-colors flex shrink-0 items-center justify-center"
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {data.links.length < 5 && (
                    <button
                      onClick={addLink}
                      className="w-full mt-4 bg-transparent hover:bg-white/5 border border-white/10 border-dashed py-3.5 rounded-full flex items-center justify-center gap-2 text-white transition-colors text-[16px] font-josefin font-bold"
                    >
                      <Plus size={18} /> Add link
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center pb-12">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full max-w-[400px] bg-[#1a1a1a] text-white py-4 rounded-[1.5rem] font-josefin font-bold text-[18px] hover:bg-gray-100 hover:text-black transition-colors shadow-xl disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSaving ? "Saving..." : "Save & publish"}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export type ProfileData = {
  username: string;
  displayName: string;
  displayNameFont?: string;
  displayNameColor?: string;
  bio: string;
  isGlowing: boolean;
  isGlassmorphic: boolean;
  glassmorphismOpacity?: number;
  glassmorphismBlur?: number;
  avatarUrl: string;
  bannerUrl: string;
  audioUrl: string;
  audioTitle: string;
  videoBackgroundUrl?: string;
  videoBackgroundEnabled?: boolean;
  videoBackgroundBlur?: number;
  discordDecorationUrl?: string;
  showAvatar?: boolean;
  activePlan?: 'free' | 'pro';
  links: Array<{ id: number; title: string; url: string }>;
};

import { fetchProfileByUsername } from './lib/api';

function PublicProfileRoute() {
  const { username } = useParams<{ username: string }>();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      fetchProfileByUsername(username).then(profile => {
        setData(profile);
        setLoading(false);
      });
    }
  }, [username]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white font-josefin text-xl">Loading...</div>;
  }
  if (!data) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white font-josefin text-xl">Profile not found</div>;
  }

  return <UserPage data={data} isPublic={true} activePlan={data.activePlan || 'pro'} />;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [activePlan, setActivePlan] = useState<"free" | "pro">(
    () => {
      try {
        return (
          (localStorage.getItem("prophile_active_plan") as
            | "free"
            | "pro") || "pro"
        );
      } catch (e) {
        return "pro";
      }
    },
  );

  const handleSetActivePlan = (plan: "free" | "pro") => {
    setActivePlan(plan);
    setProfileData((prev) => ({ ...prev, activePlan: plan }));
    try {
      localStorage.setItem("prophile_active_plan", plan);
    } catch (e) {
      console.warn("localStorage not available");
    }
  };

  useEffect(() => {
    const handleSession = async (session: any) => {
      const name =
        session?.user?.email ||
        session?.user?.user_metadata?.full_name ||
        session?.user?.user_metadata?.custom_claims?.global_name ||
        null;
      setUserEmail(name);

      const uid = session?.user?.id;
      setUserId(uid || null);

      if (uid) {
        import("./lib/api").then(async (api) => {
          try {
            const profile = await api.fetchProfile(uid);
            
            let fetchedDecorationUrl = '';
            if (session?.provider_token) {
              try {
                const res = await fetch("https://discord.com/api/v10/users/@me", {
                  headers: { Authorization: `Bearer ${session.provider_token}` }
                });
                const dUser = await res.json();
                if (dUser?.avatar_decoration_data?.asset) {
                  fetchedDecorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${dUser.avatar_decoration_data.asset}.png?size=128&passthrough=false`;
                }
              } catch (e) {
                console.error("Failed to fetch discord decoration", e);
              }
            }

            if (profile) {
              if (fetchedDecorationUrl && !profile.discordDecorationUrl) {
                profile.discordDecorationUrl = fetchedDecorationUrl;
              }
              setProfileData(profile);
              if (profile.activePlan) setActivePlan(profile.activePlan);
            } else if (name) {
              const username = name.split("@")[0].replace(/[^a-zA-Z0-9._]/g, "");
              const avatarUrl = session?.user?.user_metadata?.avatar_url || "";
              const discordName = session?.user?.user_metadata?.custom_claims?.global_name || session?.user?.user_metadata?.full_name || username;
              setProfileData((prev) =>
                prev.username === ""
                  ? {
                      ...prev,
                      username: username,
                      displayName: discordName,
                      avatarUrl: avatarUrl,
                      bio: "",
                      discordDecorationUrl: fetchedDecorationUrl,
                    }
                  : prev,
              );
            }
          } catch (e: any) {
            console.error("fetchProfile failed:", e.message);
          }
        });
      } else if (!uid && name) {
        const username = name.split("@")[0].replace(/[^a-zA-Z0-9._]/g, "");
        const avatarUrl = session?.user?.user_metadata?.avatar_url || "";
        const discordName = session?.user?.user_metadata?.custom_claims?.global_name || session?.user?.user_metadata?.full_name || username;
        setProfileData((prev) =>
          prev.username === ""
            ? { ...prev, username: username, displayName: discordName, avatarUrl: avatarUrl, bio: "" }
            : prev,
        );
      }
    };

    if (isSupabaseConfigured) {
      supabase.auth.getSession()
        .then(({ data: { session } }) => {
          handleSession(session);
        })
        .catch((err) => {
          console.warn("Supabase session check error:", err);
        });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        handleSession(session);
      });

      const handleOpenAuth = () => setIsAuthOpen(true);
      window.addEventListener("open-auth", handleOpenAuth);

      return () => {
        subscription?.unsubscribe();
        window.removeEventListener("open-auth", handleOpenAuth);
      };
    } else {
      // Local demo mode: check if user previously signed in locally
      const demoEmail = localStorage.getItem("prophile_demo_email");
      const demoUid = localStorage.getItem("prophile_demo_uid") || "demo-user";
      if (demoEmail) {
        setUserEmail(demoEmail);
        setUserId(demoUid);
        const saved = localStorage.getItem("prophile_demo_profile");
        if (saved) {
          try {
            setProfileData(JSON.parse(saved));
          } catch {}
        }
      }

      const handleDemoLogin = (e: any) => {
        const { email, uid } = e.detail || {};
        if (email) {
          setUserEmail(email);
          setUserId(uid || "demo-user");
          setProfileData((prev) => ({
            ...prev,
            username: prev.username || email.split("@")[0].replace(/[^a-zA-Z0-9._]/g, ""),
            displayName: prev.displayName || email.split("@")[0],
          }));
        }
      };
      window.addEventListener("demo-login", handleDemoLogin);

      const handleOpenAuth = () => setIsAuthOpen(true);
      window.addEventListener("open-auth", handleOpenAuth);

      return () => {
        window.removeEventListener("demo-login", handleDemoLogin);
        window.removeEventListener("open-auth", handleOpenAuth);
      };
    }
  }, []);

  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    displayName: "",
    displayNameFont: "font-josefin",
    displayNameColor: "#ffffff",
    bio: "",
    isGlowing: true,
    isGlassmorphic: true,
    glassmorphismOpacity: 10,
    glassmorphismBlur: 20,
    avatarUrl: "",
    bannerUrl: "",
    audioUrl: "",
    audioTitle: "",
    videoBackgroundUrl: "",
    videoBackgroundEnabled: false,
    videoBackgroundBlur: 5,
    activePlan: 'free',
    links: [],
  });

  return (
    <>
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setIsAuthOpen(false);
          navigate("/edit");
        }}
      />
      <Routes>
        <Route path="/" element={
          <AmmosLanding
            onLoginClick={() => setIsAuthOpen(true)}
            onSignUpClick={() => setIsAuthOpen(true)}
            userEmail={userEmail}
            onSignOut={async () => {
              if (isSupabaseConfigured) {
                try { await supabase.auth.signOut(); } catch {}
              }
              localStorage.removeItem("prophile_demo_email");
              localStorage.removeItem("prophile_demo_uid");
              setUserEmail(null);
            }}
            onDashboardClick={() => navigate("/edit")}
            profileData={profileData}
          />
        } />
        <Route path="/preview" element={
          <UserPage
            data={profileData}
            onBack={() => navigate("/edit")}
            onEdit={() => navigate("/edit")}
            activePlan={activePlan}
          />
        } />
        <Route path="/edit" element={
          <EditPage
            data={profileData}
            onChange={setProfileData}
            onBack={() => navigate("/preview")}
            onSignOut={async () => {
              if (isSupabaseConfigured) {
                try { await supabase.auth.signOut(); } catch {}
              }
              localStorage.removeItem("prophile_demo_email");
              localStorage.removeItem("prophile_demo_uid");
              setUserEmail(null);
              setUserId(null);
              navigate("/");
            }}
            onHome={() => navigate("/")}
            userEmail={userEmail}
            userId={userId}
            activePlan={activePlan}
            setActivePlan={handleSetActivePlan}
          />
        } />
        <Route path="/:username" element={<PublicProfileRoute />} />
      </Routes>
    </>
  );
}
