import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Article, User } from '../types';
import { api } from '../services/api';
import { Button, Card, Badge } from '../components/ui';
import { Edit2, Clock, Calendar, ChevronLeft, Trash2, Loader2, AlertCircle } from 'lucide-react';

interface ArticleViewProps {
  user: User;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.getArticle(id)
        .then(setArticle)
        .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if(confirm('Opravdu smazat?')) {
        await api.deleteArticle(article!.id);
        navigate('/');
        window.location.reload(); 
    }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-muted-foreground" /></div>;

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
             <AlertCircle size={32} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Stránka nenalezena</h2>
        <Link to="/">
            <Button>Zpět na přehled</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b pb-8">
         <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors flex items-center">
                <ChevronLeft size={16} className="mr-1" />
                Zpět
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{article.title}</span>
         </div>

         <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            {article.title}
         </h1>

         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                    <span className="font-medium text-foreground">{article.author_email}</span>
                </div>
                <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    <span>{new Date(article.updated_at).toLocaleDateString()}</span>
                </div>
            </div>

            {user.role === 'admin' && (
              <div className="flex space-x-2">
                 <Link to={`/admin/edit/${article.id}`}>
                    <Button variant="outline" size="sm">
                        <Edit2 size={14} className="mr-2" /> Upravit
                    </Button>
                 </Link>
                 <Button variant="destructive" size="sm" onClick={handleDelete}>
                    <Trash2 size={14} className="mr-2" /> Smazat
                 </Button>
              </div>
            )}
         </div>
      </div>

      {/* Content */}
      <Card className="p-8 md:p-12 shadow-sm border-border/60">
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </Card>
    </div>
  );
};
