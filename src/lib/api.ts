import { supabase } from './supabase';
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
    }
  }

  return {
    bio,
    videoBackgroundUrl,
    videoBackgroundEnabled,
    isGlassmorphic,
    displayNameFont,
    displayNameColor
  };
}

function encodeBio(rawBio: string, videoUrl: string, videoEnabled: boolean, isGlassmorphic: boolean, font: string, color: string) {
  const cleanBio = (rawBio || '').trim();
  return `${cleanBio} ||video:${videoUrl || ''}||enabled:${videoEnabled || false}||glassmorphic:${isGlassmorphic}||font:${font || 'font-josefin'}||color:${color || '#ffffff'}`;
}

export async function fetchProfile(userId: string): Promise<ProfileData | null> {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError || !profile) return null;

  const { data: links, error: linksError } = await supabase
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
    avatarUrl: profile.avatar_url || '',
    bannerUrl: profile.banner_url || '',
    audioUrl: profile.audio_url || '',
    audioTitle: profile.audio_title || '',
    videoBackgroundUrl: profile.video_background_url !== undefined && profile.video_background_url !== null ? profile.video_background_url : decoded.videoBackgroundUrl,
    videoBackgroundEnabled: profile.video_background_enabled !== undefined && profile.video_background_enabled !== null ? !!profile.video_background_enabled : decoded.videoBackgroundEnabled,
    activePlan: profile.active_plan || 'free',
    links: (links || []).map(link => ({
      id: link.id,
      title: link.title,
      url: link.url
    }))
  };
}

export async function checkUsernameExists(username: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username.toLowerCase())
    .maybeSingle();
  
  if (error) {
    console.error('Error checking username:', error);
    return false;
  }
  return !!data;
}

export async function fetchProfileByUsername(username: string): Promise<ProfileData | null> {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username.toLowerCase())
    .single();

  if (profileError || !profile) return null;

  const { data: links, error: linksError } = await supabase
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
    avatarUrl: profile.avatar_url || '',
    bannerUrl: profile.banner_url || '',
    audioUrl: profile.audio_url || '',
    audioTitle: profile.audio_title || '',
    videoBackgroundUrl: profile.video_background_url !== undefined && profile.video_background_url !== null ? profile.video_background_url : decoded.videoBackgroundUrl,
    videoBackgroundEnabled: profile.video_background_enabled !== undefined && profile.video_background_enabled !== null ? !!profile.video_background_enabled : decoded.videoBackgroundEnabled,
    activePlan: profile.active_plan || 'free',
    links: (links || []).map(link => ({
      id: link.id,
      title: link.title,
      url: link.url
    }))
  };
}

export async function saveProfile(userId: string, data: ProfileData) {
  const packedBio = encodeBio(data.bio, data.videoBackgroundUrl || '', data.videoBackgroundEnabled || false, data.isGlassmorphic !== false, data.displayNameFont || 'font-josefin', data.displayNameColor || '#ffffff');

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

  // 2. Sync Links (for simplicity, we delete missing and upsert remaining)
  // First, get existing links to find what to delete
  const { data: existingLinks } = await supabase
    .from('links')
    .select('id')
    .eq('profile_id', userId);

  const incomingIds = data.links.map(l => l.id);
  const idsToDelete = existingLinks?.map(l => l.id).filter(id => !incomingIds.includes(id)) || [];

  if (idsToDelete.length > 0) {
    await supabase.from('links').delete().in('id', idsToDelete);
  }

  const linksToUpsert = data.links.map((link, index) => {
    // If ID is a timestamp format from React state Date.now(), we omit 'id' for new rows
    // so Supabase sequence handles it. If it's a real DB id (e.g. smaller), keep it.
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
    const { error: linksError } = await supabase.from('links').upsert(linksToUpsert);
    if (linksError) throw linksError;
  }
}

export async function uploadFile(
  bucket: 'avatars' | 'banners' | 'audio', 
  file: File, 
  userId: string
): Promise<string> {
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
        // Attempt to programmatic create the bucket if it does not exist
        const { error: createBucketError } = await supabase.storage.createBucket(bucket, {
          public: true
        });

        if (!createBucketError) {
          // Retry upload if bucket creation succeeded
          const retryResult = await supabase.storage
            .from(bucket)
            .upload(filePath, file, { upsert: true });
          uploadError = retryResult.error;
        } else {
          console.error('Failed to create bucket programmatically:', createBucketError);
        }
      } catch (err) {
        console.error('Exception during bucket auto-creation:', err);
      }
    }
  }

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}
