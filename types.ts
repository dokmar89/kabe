export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'admin' | 'user';
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category_id: string; // Changed to match DB column snake_case
  created_at: string;
  updated_at: string;
  author_email: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  icon?: string;
}

// Database Schema helper for Supabase
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: User;
        Insert: Partial<User>;
        Update: Partial<User>;
      };
      articles: {
        Row: Article;
        Insert: Partial<Article>;
        Update: Partial<Article>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id'>;
        Update: Partial<Category>;
      };
    };
  };
};