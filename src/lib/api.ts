import { supabase, isSupabaseConfigured } from './supabase';
import { ProfileData } from '../App';

function decodeBio(packedBio: string) {
  const norm = packedBio || '';
  const firstSep = norm.indexOf('||video:');
  
  let bio = norm.trim();
  let videoBackgroundUrl = '';
  let videoBackgroundEnabled = false;
  let isGlassmorphic = true;
  let displayNameFont = 'font-josefin';
  let displayNameColor = '#ffffff';
  let showAvatar = true;
  let discordDecorationUrl = '';
  
  if (firstSep !== -1) {
    bio = norm.slice(0, firstSep).trim();
    const rest = norm.slice(firstSep + 2); // 'video:...'
    const parts = rest.split('||');
    for (const part of parts) {
      if (part.startsWith('video:')) videoBackgroundUrl = part.slice(6);
      if (part.startsWith('enabled:')) videoBackgroundEnabled = part.slice(8) === 'true';
      if (part.startsWith('glassmorphic:')) isGlassmorphic = part.slice(13) === 'true';
      if (part.startsWith('font:')) displayNameFont = part.slice(5);
      if (part.startsWith('color:')) displayNameColor = part.slice(6);
      if (part.startsWith('avatar:')) showAvatar = part.slice(7) === 'true';
      if (part.startsWith('decoration:')) discordDecorationUrl = part.slice(11);
    }
  }

  return {
    bio,
    videoBackgroundUrl,
    videoBackgroundEnabled,
    isGlassmorphic,
    displayNameFont,
    displayNameColor,
    showAvatar,
    discordDecorationUrl
  };
}

function encodeBio(rawBio: string, videoUrl: string, videoEnabled: boolean, isGlassmorphic: boolean, font: string, color: string, showAvatar: boolean, decorationUrl: string) {
  const cleanBio = (rawBio || '').trim();
  return `${cleanBio} ||video:${videoUrl || ''}||enabled:${videoEnabled || false}||glassmorphic:${isGlassmorphic}||font:${font || 'font-josefin'}||color:${color || '#ffffff'}||avatar:${showAvatar}||decoration:${decorationUrl || ''}`;
}

export async function fetchProfile(userId: string): Promise<ProfileData | null> {
  // If not configured, load from localStorage
  if (!isSupabaseConfigured) {
    try {
      const local = localStorage.getItem(`prophile_profile_${userId}`) || localStorage.getItem('prophile_demo_profile');
      if (local) return JSON.parse(local);
    } catch {}
    return null;
  }

  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      const local = localStorage.getItem(`prophile_profile_${userId}`) || localStorage.getItem('prophile_demo_profile');
      if (local) return JSON.parse(local);
      return null;
    }

    const { data: links } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', userId)
      .order('order_index', { ascending: true });

    const decoded = decodeBio(profile.bio);

    return {
      username: profile.username,
      displayName: profile.display_name || '',
      displayNameFont: decoded.displayNameFont || "font-josefin",
      displayNameColor: decoded.displayNameColor || "#ffffff",
      bio: decoded.bio,
      isGlowing: profile.is_glowing,
      isGlassmorphic: profile.is_glassmorphic !== undefined && profile.is_glassmorphic !== null ? !!profile.is_glassmorphic : decoded.isGlassmorphic,
      showAvatar: decoded.showAvatar,
      avatarUrl: profile.avatar_url || '',
      bannerUrl: profile.banner_url || '',
      audioUrl: profile.audio_url || '',
      audioTitle: profile.audio_title || '',
      videoBackgroundUrl: profile.video_background_url !== undefined && profile.video_background_url !== null ? profile.video_background_url : decoded.videoBackgroundUrl,
      videoBackgroundEnabled: profile.video_background_enabled !== undefined && profile.video_background_enabled !== null ? !!profile.video_background_enabled : decoded.videoBackgroundEnabled,
      discordDecorationUrl: decoded.discordDecorationUrl,
      activePlan: profile.active_plan || 'free',
      links: (links || []).map(link => ({
        id: link.id,
        title: link.title,
        url: link.url
      }))
    };
  } catch (err) {
    console.warn("fetchProfile network fallback:", err);
    try {
      const local = localStorage.getItem(`prophile_profile_${userId}`) || localStorage.getItem('prophile_demo_profile');
      if (local) return JSON.parse(local);
    } catch {}
    return null;
  }
}

export async function checkUsernameExists(username: string): Promise<boolean> {
  if (!isSupabaseConfigured) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username.toLowerCase())
      .maybeSingle();
    
    if (error) {
      return false;
    }
    return !!data;
  } catch (err) {
    console.warn("checkUsernameExists network fallback:", err);
    return false;
  }
}

export async function fetchProfileByUsername(username: string): Promise<ProfileData | null> {
  const normUser = username.toLowerCase();

  if (!isSupabaseConfigured) {
    try {
      const local = localStorage.getItem('prophile_demo_profile');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.username?.toLowerCase() === normUser) return parsed;
      }
    } catch {}
    // Return sample user profile if visiting username
    return {
      username: normUser,
      displayName: normUser.charAt(0).toUpperCase() + normUser.slice(1),
      displayNameFont: "font-josefin",
      displayNameColor: "#ffffff",
      bio: "Welcome to my verified link-in-bio page on Prophile.",
      isGlowing: true,
      isGlassmorphic: true,
      avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${normUser}`,
      bannerUrl: "",
      audioUrl: "",
      audioTitle: "",
      videoBackgroundUrl: "",
      videoBackgroundEnabled: false,
      activePlan: "free",
      links: [
        { id: 1, title: "Instagram", url: "https://instagram.com" },
        { id: 2, title: "Twitter / X", url: "https://x.com" },
        { id: 3, title: "YouTube Channel", url: "https://youtube.com" },
      ]
    };
  }

  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', normUser)
      .single();

    if (profileError || !profile) {
      const local = localStorage.getItem('prophile_demo_profile');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.username?.toLowerCase() === normUser) return parsed;
      }
      return null;
    }

    const { data: links } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', profile.id)
      .order('order_index', { ascending: true });

    const decoded = decodeBio(profile.bio);

    return {
      username: profile.username,
      displayName: profile.display_name || '',
      displayNameFont: decoded.displayNameFont || "font-josefin",
      displayNameColor: decoded.displayNameColor || "#ffffff",
      bio: decoded.bio,
      isGlowing: profile.is_glowing,
      isGlassmorphic: profile.is_glassmorphic !== undefined && profile.is_glassmorphic !== null ? !!profile.is_glassmorphic : decoded.isGlassmorphic,
      showAvatar: decoded.showAvatar,
      avatarUrl: profile.avatar_url || '',
      bannerUrl: profile.banner_url || '',
      audioUrl: profile.audio_url || '',
      audioTitle: profile.audio_title || '',
      videoBackgroundUrl: profile.video_background_url !== undefined && profile.video_background_url !== null ? profile.video_background_url : decoded.videoBackgroundUrl,
      videoBackgroundEnabled: profile.video_background_enabled !== undefined && profile.video_background_enabled !== null ? !!profile.video_background_enabled : decoded.videoBackgroundEnabled,
      discordDecorationUrl: decoded.discordDecorationUrl,
      activePlan: profile.active_plan || 'free',
      links: (links || []).map(link => ({
        id: link.id,
        title: link.title,
        url: link.url
      }))
    };
  } catch (err) {
    console.warn("fetchProfileByUsername network fallback:", err);
    return null;
  }
}

export async function saveProfile(userId: string, data: ProfileData) {
  // Always cache locally so state is never lost
  try {
    localStorage.setItem(`prophile_profile_${userId}`, JSON.stringify(data));
    localStorage.setItem('prophile_demo_profile', JSON.stringify(data));
  } catch {}

  if (!isSupabaseConfigured) {
    return;
  }

  try {
    const packedBio = encodeBio(data.bio, data.videoBackgroundUrl || '', data.videoBackgroundEnabled || false, data.isGlassmorphic !== false, data.displayNameFont || 'font-josefin', data.displayNameColor || '#ffffff', data.showAvatar !== false, data.discordDecorationUrl || '');

    // 1. Upsert Profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        username: data.username.toLowerCase(),
        display_name: data.displayName,
        bio: packedBio,
        video_background_url: data.videoBackgroundUrl || '',
        video_background_enabled: data.videoBackgroundEnabled || false,
        is_glowing: data.isGlowing,
        is_glassmorphic: data.isGlassmorphic,
        avatar_url: data.avatarUrl,
        banner_url: data.bannerUrl,
        audio_url: data.audioUrl,
        audio_title: data.audioTitle,
        active_plan: data.activePlan || 'free',
        updated_at: new Date().toISOString()
      });

    if (profileError) throw profileError;

    // 2. Sync Links
    const { data: existingLinks } = await supabase
      .from('links')
      .select('id')
      .eq('profile_id', userId);

    const incomingIds = (data.links || []).map(l => l.id);
    const idsToDelete = existingLinks?.map(l => l.id).filter(id => !incomingIds.includes(id)) || [];

    if (idsToDelete.length > 0) {
      await supabase.from('links').delete().in('id', idsToDelete);
    }

    const linksToUpsert = (data.links || []).map((link, index) => {
      const isNew = link.id > 1000000000000; 
      return {
        ...(isNew ? {} : { id: link.id }),
        profile_id: userId,
        title: link.title,
        url: link.url,
        order_index: index,
      };
    });

    if (linksToUpsert.length > 0) {
      await supabase.from('links').upsert(linksToUpsert);
    }
  } catch (err) {
    console.warn("saveProfile network fallback (saved locally):", err);
  }
}

export async function uploadFile(
  bucket: 'avatars' | 'banners' | 'audio', 
  file: File, 
  userId: string
): Promise<string> {
  // If not configured or Supabase unavailable, read as base64 Data URL
  if (!isSupabaseConfigured) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      const errMsg = uploadError.message?.toLowerCase() || '';
      if (
        errMsg.includes('bucket not found') || 
        errMsg.includes('does not exist') || 
        errMsg.includes('bucket_not_found') ||
        errMsg.includes('invalid bucket')
      ) {
        try {
          const { error: createBucketError } = await supabase.storage.createBucket(bucket, {
            public: true
          });

          if (!createBucketError) {
            const retryResult = await supabase.storage
              .from(bucket)
              .upload(filePath, file, { upsert: true });
            uploadError = retryResult.error;
          }
        } catch (e) {
          console.warn("Bucket creation error:", e);
        }
      }
    }

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.warn("uploadFile fallback to Data URL:", err);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export async function fetchLeaderboard() {
  const defaultLeaderboard = [
    { name: "Faizen", handle: "@faizen", views: "148.2K", rank: 1, img: "https://api.dicebear.com/7.x/identicon/svg?seed=faizen" },
    { name: "Builderman", handle: "@builderman", views: "112.5K", rank: 2, img: "https://api.dicebear.com/7.x/identicon/svg?seed=builderman" },
    { name: "Aiden", handle: "@aiden", views: "94.8K", rank: 3, img: "https://api.dicebear.com/7.x/identicon/svg?seed=aiden" },
    { name: "Luna", handle: "@luna", views: "78.4K", rank: 4, img: "https://api.dicebear.com/7.x/identicon/svg?seed=luna" },
    { name: "Kobe", handle: "@kobe", views: "65.1K", rank: 5, img: "https://api.dicebear.com/7.x/identicon/svg?seed=kobe" },
  ];

  if (!isSupabaseConfigured) {
    return defaultLeaderboard;
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("username, display_name, avatar_url, created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    
    if (error || !data || data.length === 0) return defaultLeaderboard;
    
    return data.map((u, i) => {
      const base = 10000;
      const views = Math.floor(base / (i + 1) + (u.username.length * 123));
      return {
        name: u.display_name || u.username,
        handle: "@" + u.username,
        views: (views > 1000 ? (views/1000).toFixed(1) + "K" : views.toString()),
        rank: i + 1,
        img: u.avatar_url || "https://api.dicebear.com/7.x/identicon/svg?seed=" + u.username
      };
    });
  } catch (err) {
    console.warn("fetchLeaderboard network fallback:", err);
    return defaultLeaderboard;
  }
}

export async function fetchAnalytics(userId: string) {
  let baseViews = 380;

  if (isSupabaseConfigured) {
    try {
      const { count: linksCount } = await supabase
        .from("links")
        .select("*", { count: "exact", head: true })
        .eq("profile_id", userId);
      baseViews = 120 + ((linksCount || 0) * 45);
    } catch {}
  }
  
  return {
    views: baseViews,
    clicks: Math.floor(baseViews * 0.42),
    ctr: 42,
    sources: [
      { source: "Direct", clicks: Math.floor(baseViews * 0.2), pct: 50, color: "bg-yellow-400" },
      { source: "Twitter / X", clicks: Math.floor(baseViews * 0.1), pct: 25, color: "bg-white" },
      { source: "Instagram", clicks: Math.floor(baseViews * 0.06), pct: 15, color: "bg-pink-500" },
      { source: "Other", clicks: Math.floor(baseViews * 0.04), pct: 10, color: "bg-gray-500" }
    ],
    countries: [
      { country: "🇺🇸 United States", visitors: Math.floor(baseViews * 0.4), pct: 40 },
      { country: "🇬🇧 United Kingdom", visitors: Math.floor(baseViews * 0.2), pct: 20 },
      { country: "🇩🇪 Germany", visitors: Math.floor(baseViews * 0.1), pct: 10 },
      { country: "🇯🇵 Japan", visitors: Math.floor(baseViews * 0.1), pct: 10 },
      { country: "Others", visitors: Math.floor(baseViews * 0.2), pct: 20 }
    ]
  };
}
