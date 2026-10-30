import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  !rawUrl.includes('placeholder') &&
  !rawUrl.includes('YOUR_SUPABASE_URL')
);

// If Supabase credentials are missing or placeholder, clean up any stale supabase auth keys in localStorage
if (!isSupabaseConfigured && typeof window !== 'undefined') {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('sb-') || k.includes('supabase.auth.token'))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {}
}

const safeFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  try {
    const res = await fetch(input, init);
    // If the remote server returns Cloudflare 521 or 5xx HTML error, intercept it gracefully
    if (res.status >= 500) {
      return new Response(
        JSON.stringify({
          error: 'server_down',
          message: 'Supabase server is currently unreachable or booting up (HTTP 521). Please verify your project status in the Supabase dashboard.',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    return res;
  } catch (err: any) {
    console.warn("Supabase request intercepted connection error:", err);
    return new Response(
      JSON.stringify({
        error: 'connection_failed',
        message: 'Could not connect to Supabase. Your project may be starting up or paused.',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

const createQueryBuilder = () => {
  const builder: any = {
    select: () => builder,
    insert: () => builder,
    upsert: () => builder,
    update: () => builder,
    delete: () => builder,
    eq: () => builder,
    in: () => builder,
    order: () => builder,
    limit: () => builder,
    single: async () => ({ data: null, error: null }),
    maybeSingle: async () => ({ data: null, error: null }),
    then: (resolve: any) => resolve({ data: [], error: null }),
  };
  return builder;
};

const createMockSupabase = () => ({
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    }),
    signInWithOAuth: async () => ({ data: { provider: '', url: '' }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: () => createQueryBuilder(),
  storage: {
    from: () => ({
      upload: async () => ({ data: null, error: null }),
      createBucket: async () => ({ data: null, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
    }),
  },
});

export const supabase: any = isSupabaseConfigured
  ? createClient(rawUrl, rawKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: true,
        detectSessionInUrl: true,
      },
      global: {
        fetch: safeFetch,
      },
    })
  : createMockSupabase();
