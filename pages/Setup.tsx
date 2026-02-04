import React, { useState } from 'react';
import { configureSupabase } from '../lib/supabase';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '../components/ui';
import { ShieldCheck, Server } from 'lucide-react';

export const Setup = () => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!url || !key) return alert('Vyplňte obě pole');
    setLoading(true);
    configureSupabase(url, key);
    setTimeout(() => {
        window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg border-2 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <Server size={24} />
          </div>
          <CardTitle className="text-2xl">Připojení k Backend</CardTitle>
          <p className="text-muted-foreground mt-2 text-sm">
            Tato aplikace vyžaduje Supabase backend. Zadejte prosím údaje k vašemu projektu.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Supabase Project URL</label>
            <Input 
                value={url} 
                onChange={e => setUrl(e.target.value)} 
                placeholder="https://xyz.supabase.co" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Supabase Anon Key</label>
            <Input 
                value={key} 
                onChange={e => setKey(e.target.value)} 
                type="password" 
                placeholder="eyJhbGciOiJIUzI1NiIsInR5..." 
            />
          </div>
          
          <div className="bg-muted p-4 rounded-md text-xs text-muted-foreground">
             <strong>Poznámka pro administrátora:</strong>
             <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Vytvořte projekt na <a href="https://supabase.com" target="_blank" className="underline">supabase.com</a></li>
                <li>Spusťte SQL skript (viz db_schema.sql) v SQL Editoru</li>
                <li>Zkopírujte URL a Key z Settings &gt; API</li>
             </ul>
          </div>

          <Button className="w-full" onClick={handleSave} disabled={loading}>
            {loading ? 'Připojování...' : 'Uložit konfiguraci a Restartovat'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
