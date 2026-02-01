import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Graceful fallback for missing env vars (prevents app crash in production)
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables are missing. Auth features will be disabled.');
    console.warn('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Vercel environment variables.');
}

// Create client with fallback values to prevent crashes
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);

export type Profile = {
    id: string;
    full_name: string | null;
    website: string | null;
    updated_at: string;
};

export type UserStats = {
    id: string;
    user_id: string;
    goal: string;
    income: string;
    clients: number;
    updated_at: string;
};
