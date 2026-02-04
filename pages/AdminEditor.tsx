import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Article, Category } from '../types';
import { api } from '../services/api';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '../components/ui';
import { Save, ChevronLeft, Loader2 } from 'lucide-react';

export const AdminEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
        const cats = await api.getCategories();
        setCategories(cats);
        if (cats.length > 0 && !categoryId) setCategoryId(cats[0].id);

        if (!isNew && id) {
            const existing = await api.getArticle(id);
            if (existing) {
                setTitle(existing.title);
                setContent(existing.content);
                setCategoryId(existing.category_id);
            }
        }
    }
    loadData();
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
        await api.saveArticle({
            title,
            content,
            category_id: categoryId
        }, isNew ? undefined : id);
        
        navigate('/');
        window.location.reload(); 
    } catch (e: any) {
        alert("Chyba při ukládání: " + e.message);
    } finally {
        setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
         <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-primary">
            <ChevronLeft size={16} className="mr-1" />
            Zrušit
         </Button>
      </div>

      <Card>
        <CardHeader>
             <CardTitle>{isNew ? 'Nový článek' : 'Upravit článek'}</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Nadpis</label>
                        <Input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Jak nastavit..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Kategorie</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Obsah (HTML)</label>
                <div className="relative">
                    <textarea
                        required
                        rows={15}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                        placeholder="<p>Text článku...</p>"
                    />
                </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {saving ? 'Ukládání...' : 'Publikovat'}
                    {!saving && <Save size={16} className="ml-2" />}
                </Button>
                </div>
            </form>
        </CardContent>
      </Card>
    </div>
  );
};
