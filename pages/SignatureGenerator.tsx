import React, { useState } from 'react';
import { Download, Copy, RefreshCw, Mail } from 'lucide-react';

export const SignatureGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Jan Novák',
    position: 'IT Specialista',
    phone: '+420 123 456 789',
    email: 'jan.novak@skolapopulo.cz'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Generátor Podpisů</h1>
        <p className="text-slate-500 dark:text-slate-400">Vytvořte si jednotný a profesionální emailový podpis během okamžiku.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center mb-6 text-slate-900 dark:text-white font-semibold">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-600 mr-3 text-sm">1</span>
                    Vyplňte údaje
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Jméno a příjmení</label>
                        <input name="name" value={formData.name} onChange={handleInputChange} className="block w-full rounded-lg border-slate-300 dark:border-slate-600 shadow-sm focus:border-brand-600 focus:ring-brand-600 dark:bg-slate-900 dark:text-white px-3 py-2.5 border transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Pozice</label>
                        <input name="position" value={formData.position} onChange={handleInputChange} className="block w-full rounded-lg border-slate-300 dark:border-slate-600 shadow-sm focus:border-brand-600 focus:ring-brand-600 dark:bg-slate-900 dark:text-white px-3 py-2.5 border transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Telefon</label>
                        <input name="phone" value={formData.phone} onChange={handleInputChange} className="block w-full rounded-lg border-slate-300 dark:border-slate-600 shadow-sm focus:border-brand-600 focus:ring-brand-600 dark:bg-slate-900 dark:text-white px-3 py-2.5 border transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                        <input name="email" value={formData.email} onChange={handleInputChange} className="block w-full rounded-lg border-slate-300 dark:border-slate-600 shadow-sm focus:border-brand-600 focus:ring-brand-600 dark:bg-slate-900 dark:text-white px-3 py-2.5 border transition-all" />
                    </div>
                </div>
            </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-7">
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-slate-900 dark:text-white font-semibold">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-600 mr-3 text-sm">2</span>
                        Náhled podpisu
                    </div>
                    <div className="text-xs text-slate-500 flex items-center bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                        <Mail size={12} className="mr-1" />
                        Gmail / Outlook
                    </div>
                 </div>

                 {/* The visual preview container imitating an email client body */}
                 <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex items-center justify-center min-h-[300px]">
                    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '16px', color: '#d9232e' }}>{formData.name}</p>
                        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#64748b' }}>{formData.position}</p>
                        <div style={{ borderTop: '2px solid #d9232e', width: '40px', margin: '12px 0' }}></div>
                        <p style={{ margin: '2px 0', fontSize: '13px', color: '#334155' }}><strong style={{color: '#0f172a'}}>T:</strong> <a href={`tel:${formData.phone}`} style={{ textDecoration: 'none', color: '#334155' }}>{formData.phone}</a></p>
                        <p style={{ margin: '2px 0', fontSize: '13px', color: '#334155' }}><strong style={{color: '#0f172a'}}>E:</strong> <a href={`mailto:${formData.email}`} style={{ textDecoration: 'none', color: '#334155' }}>{formData.email}</a></p>
                        <p style={{ margin: '15px 0 0 0', fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>Škola Populo</p>
                        <p style={{ margin: '0', fontSize: '12px', color: '#94a3b8' }}>Doučování, které funguje.</p>
                    </div>
                 </div>
                 
                 <div className="mt-6 flex space-x-4">
                     <button className="flex-1 flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-600/20" onClick={() => alert('Zkopírováno do schránky!')}>
                         <Copy size={18} className="mr-2" />
                         Kopírovat podpis
                     </button>
                     <button className="flex-none flex items-center justify-center px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors" title="Resetovat">
                         <RefreshCw size={18} />
                     </button>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};
