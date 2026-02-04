import { getSupabase } from '../lib/supabase';
import { Article, Category, User } from '../types';

export const api = {
  // --- AUTH ---
  async getCurrentUser(): Promise<User | null> {
    const sb = getSupabase();
    if (!sb) return null;
    
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return null;

    // Fetch profile data
    const { data: profile } = await sb
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profile) return profile;

    // Fallback if profile doesn't exist yet (first login)
    return {
      id: user.id,
      email: user.email!,
      name: user.user_metadata.full_name || user.email!.split('@')[0],
      role: 'user', // Default role
      avatar_url: user.user_metadata.avatar_url
    };
  },

  async signInWithGoogle() {
    const sb = getSupabase();
    if (!sb) throw new Error("Backend not configured");
    
    // In production, this redirects.
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: window.location.origin
      },
    });
    if (error) throw error;
  },

  async signOut() {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
  },

  // --- CONTENT ---
  async getCategories(): Promise<Category[]> {
    const sb = getSupabase();
    if (!sb) return [];
    
    const { data, error } = await sb.from('categories').select('*').order('name');
    if (error) throw error;
    return data || [];
  },

  async getArticles(): Promise<Article[]> {
    const sb = getSupabase();
    if (!sb) return [];
    
    const { data, error } = await sb
        .from('articles')
        .select('*')
        .order('updated_at', { ascending: false });
        
    if (error) throw error;
    return data || [];
  },

  async getArticle(id: string): Promise<Article | null> {
    const sb = getSupabase();
    if (!sb) return null;

    const { data, error } = await sb.from('articles').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  },

  async saveArticle(article: Partial<Article>, id?: string) {
    const sb = getSupabase();
    if (!sb) throw new Error("No connection");

    const user = await this.getCurrentUser();
    if (!user || user.role !== 'admin') throw new Error("Unauthorized");

    // Remove immutable fields or fields handled by logic
    const { id: _, created_at: __, ...rest } = article;

    const payload = {
        ...rest,
        updated_at: new Date().toISOString(),
        author_email: user.email // Keep track of last editor
    };

    if (id) {
        // Update
        const { error } = await sb.from('articles').update(payload).eq('id', id);
        if (error) throw error;
    } else {
        // Insert
        const { error } = await sb.from('articles').insert({
            ...payload,
            created_at: new Date().toISOString()
        });
        if (error) throw error;
    }
  },

  async deleteArticle(id: string) {
    const sb = getSupabase();
    if (!sb) throw new Error("No connection");
    
    const { error } = await sb.from('articles').delete().eq('id', id);
    if (error) throw error;
  }
};