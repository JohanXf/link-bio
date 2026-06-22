import { supabase } from './supabase';
import { ProfileData } from '../App';

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

  return {
    username: profile.username,
    displayName: profile.display_name || '',
    bio: profile.bio || '',
    isGlowing: profile.is_glowing,
    avatarUrl: profile.avatar_url || '',
    bannerUrl: profile.banner_url || '',
    audioUrl: profile.audio_url || '',
    audioTitle: profile.audio_title || '',
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

  return {
    username: profile.username,
    displayName: profile.display_name || '',
    bio: profile.bio || '',
    isGlowing: profile.is_glowing,
    avatarUrl: profile.avatar_url || '',
    bannerUrl: profile.banner_url || '',
    audioUrl: profile.audio_url || '',
    audioTitle: profile.audio_title || '',
    links: (links || []).map(link => ({
      id: link.id,
      title: link.title,
      url: link.url
    }))
  };
}

export async function saveProfile(userId: string, data: ProfileData) {
  // 1. Upsert Profile
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      username: data.username.toLowerCase(),
      display_name: data.displayName,
      bio: data.bio,
      is_glowing: data.isGlowing,
      avatar_url: data.avatarUrl,
      banner_url: data.bannerUrl,
      audio_url: data.audioUrl,
      audio_title: data.audioTitle,
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

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}
