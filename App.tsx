
import React, { useState } from 'react';
import { Layout, Video, Utensils, Megaphone, FileText, GraduationCap, MessageCircle } from 'lucide-react';
import DashboardView from './components/Dashboard';
import PSSSection from './components/PSSSection';
import MarketingSection from './components/MarketingSection';
import SnackBusinessSection from './components/SnackBusinessSection';
import YouTubeSection from './components/YouTubeSection';
import StudySection from './components/StudySection';
import VipGroupSection from './components/VipGroupSection';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView onNavigate={setActiveTab} />;
      case 'study': return <StudySection />;
      case 'youtube': return <YouTubeSection />;
      case 'vip': return <VipGroupSection />;
      case 'marketing': return <MarketingSection />;
      case 'snack': return <SnackBusinessSection />;
      case 'pss': return <PSSSection />;
      default: return <DashboardView onNavigate={setActiveTab} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Painel de Guerra', icon: <Layout className="w-5 h-5" /> },
    { id: 'study', label: 'Sala de Estudos', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'youtube', label: 'YouTube Power Center', icon: <Video className="w-5 h-5" /> },
    { id: 'vip', label: 'Comunidade VIP', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'marketing', label: 'Gestão de Marketing', icon: <Megaphone className="w-5 h-5" /> },
    { id: 'snack', label: 'Operação iFood', icon: <Utensils className="w-5 h-5" /> },
    { id: 'pss', label: 'Editais PSS', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-orange-400 leading-tight">Eduardo Pinheiro</h1>
          <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest text-center">Estrategista Digital & Prof</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/40 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800 text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center italic">
          Belém - PA | Plano CBR
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight italic">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center space-x-4">
             <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-black border border-orange-200">EP</div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
