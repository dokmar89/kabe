import { createClient } from '@supabase/supabase-js';
import { Database } from '../types';

// We export a function to get the client because we might need to initialize it 
// AFTER the user inputs their keys in the Setup screen.
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  // Try to get from localStorage (set via Setup screen)
  const url = localStorage.getItem('SP_KB_SUPABASE_URL');
  const key = localStorage.getItem('SP_KB_SUPABASE_KEY');

  if (url && key) {
    supabaseInstance = createClient<Database>(url, key);
    return supabaseInstance;
  }
  
  return null;
};

export const isConfigured = () => {
  return !!localStorage.getItem('SP_KB_SUPABASE_URL') && !!localStorage.getItem('SP_KB_SUPABASE_KEY');
};

export const configureSupabase = (url: string, key: string) => {
  localStorage.setItem('SP_KB_SUPABASE_URL', url);
  localStorage.setItem('SP_KB_SUPABASE_KEY', key);
  supabaseInstance = createClient<Database>(url, key);
};

export const resetConfiguration = () => {
    localStorage.removeItem('SP_KB_SUPABASE_URL');
    localStorage.removeItem('SP_KB_SUPABASE_KEY');
    supabaseInstance = null;
    window.location.reload();
}
