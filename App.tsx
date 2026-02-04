import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Setup } from './pages/Setup';
import { ArticleView } from './pages/ArticleView';
import { AdminEditor } from './pages/AdminEditor';
import { SignatureGenerator } from './pages/SignatureGenerator';
import { api } from './services/api';
import { isConfigured } from './lib/supabase';
import { User, Article, Category } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Supabase is configured
    if (!isConfigured()) {
        setLoading(false);
        return;
    }

    const init = async () => {
        try {
            const currentUser = await api.getCurrentUser();
            setUser(currentUser);
            
            // Only fetch content if logged in (RLS will enforce this anyway)
            if (currentUser) {
                const [cats, arts] = await Promise.all([
                    api.getCategories(),
                    api.getArticles()
                ]);
                setCategories(cats);
                setArticles(arts);
            }
        } catch (e) {
            console.error("Initialization error", e);
        } finally {
            setLoading(false);
        }
    };
    init();
  }, []);

  const handleLogout = async () => {
    await api.signOut();
    setUser(null);
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-background text-muted-foreground">Načítání aplikace...</div>;
  }

  // 1. If no DB configuration, force Setup
  if (!isConfigured()) {
      return <Setup />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/" replace /> : <Login />
        } />
        
        <Route path="/*" element={
          user ? (
            <Layout user={user} onLogout={handleLogout} articles={articles} categories={categories}>
              <Routes>
                <Route path="/" element={<ArticleView user={user} />} />
                <Route path="/article/:id" element={<ArticleView user={user} />} />
                <Route path="/tools/generator" element={<SignatureGenerator />} />
                <Route path="/admin/new" element={<AdminEditor />} />
                <Route path="/admin/edit/:id" element={<AdminEditor />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </HashRouter>
  );
}
