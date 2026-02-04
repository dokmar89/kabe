import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, Menu, Sun, Moon, LogOut, ChevronRight, 
  Folder, FileText, ChevronDown, ChevronRight as ChevronRightIcon,
  PlusCircle, Settings, BookOpen, LayoutGrid
} from 'lucide-react';
import { User, Category, Article } from '../types';
import { Button } from './ui';
import { cn } from './ui';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  articles: Article[];
  categories: Category[];
}

const SidebarItem = ({ 
  category, 
  allCategories, 
  articles, 
  depth = 0,
  currentPath
}: { 
  category: Category, 
  allCategories: Category[], 
  articles: Article[], 
  depth?: number,
  currentPath: string
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const childCategories = allCategories.filter(c => c.parent_id === category.id);
  const childArticles = articles.filter(a => a.category_id === category.id);
  const hasChildren = childCategories.length > 0 || childArticles.length > 0;

  return (
    <div className="select-none mb-1">
      <div 
        className={cn(
          "group flex items-center justify-between px-3 py-2 mx-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-accent",
          depth === 0 ? "mt-4 mb-1" : ""
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {depth === 0 && (
             <span className={cn(
               "flex items-center justify-center w-6 h-6 rounded mr-2",
               isOpen ? "bg-primary/10 text-primary" : "text-muted-foreground"
             )}>
                {category.icon === 'Home' ? <LayoutGrid size={14} /> : 
                 category.icon === 'Server' ? <BookOpen size={14} /> :
                 <Folder size={14} />}
             </span>
          )}
          <span className={cn(
            depth === 0 ? "font-semibold text-sm" : "text-sm ml-6",
            "group-hover:text-foreground transition-colors",
            depth !== 0 && "text-muted-foreground"
          )}>
            {category.name}
          </span>
        </div>
        
        {hasChildren && (
          <span className="text-muted-foreground group-hover:text-foreground">
             {isOpen ? <ChevronDown size={14} /> : <ChevronRightIcon size={14} />}
          </span>
        )}
      </div>

      <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0")}>
        <div>
          {childCategories.map(cat => (
            <SidebarItem 
              key={cat.id} 
              category={cat} 
              allCategories={allCategories} 
              articles={articles} 
              depth={depth + 1}
              currentPath={currentPath}
            />
          ))}
          {childArticles.map(art => {
            const isActive = currentPath === `/article/${art.id}`;
            return (
              <Link 
                key={art.id} 
                to={`/article/${art.id}`}
                className={cn(
                  "flex items-center px-3 py-1.5 ml-5 mr-2 my-0.5 text-sm rounded-md transition-all duration-200 relative",
                  isActive 
                    ? "bg-primary/5 text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full"></span>
                )}
                <span className="truncate ml-2">{art.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, articles, categories }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  const rootCategories = categories.filter(c => c.parent_id === null);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside 
        className={cn(
            "fixed md:relative z-30 h-full bg-card border-r border-border transition-all duration-300 flex flex-col",
            isSidebarOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full overflow-hidden"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                <span className="font-bold tracking-tighter">SP</span>
             </div>
             <span className="font-bold text-lg tracking-tight">Knowledge<span className="text-primary">.</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-5 mb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Dokumentace
          </div>
          {rootCategories.map(cat => (
            <SidebarItem 
              key={cat.id} 
              category={cat} 
              allCategories={categories} 
              articles={articles}
              currentPath={location.pathname}
            />
          ))}

          <div className="mt-8 px-5 mb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Nástroje
          </div>
          <Link to="/tools/generator" className="flex items-center px-3 py-2 mx-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <span className="p-1 rounded mr-2 bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Settings size={14} />
            </span>
            <span className="font-medium">Generátor Podpisů</span>
          </Link>

          {user.role === 'admin' && (
            <div className="mt-8 px-4">
              <Link to="/admin/new">
                  <Button className="w-full justify-start" variant="default">
                    <PlusCircle size={16} className="mr-2" />
                    Nový článek
                  </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center p-2 rounded-lg bg-accent/50 border border-border">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0 ml-3">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout} title="Odhlásit">
                <LogOut size={16} />
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!isSidebarOpen)} className="mr-4 -ml-2">
                <Menu size={20} />
            </Button>
            
            <nav className="hidden sm:flex items-center text-sm">
               <span className="text-muted-foreground">Domů</span>
               {location.pathname !== '/' && (
                <>
                   <ChevronRight size={14} className="mx-2 text-muted-foreground" />
                   <span className="font-medium truncate max-w-[300px]">
                      {location.pathname.includes('article') ? 'Článek' : '...'}
                   </span>
                </>
               )}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
             <Button variant="ghost" size="icon" onClick={toggleTheme}>
                 <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                 <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
             </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-5xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
