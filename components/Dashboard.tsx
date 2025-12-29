
import React, { useState, useEffect } from 'react';
import { 
  Bike, Save, GraduationCap, 
  CheckCircle2, Target, 
  User, ExternalLink,
  Search, Award, TrendingUp, Sparkles, Clock, DollarSign,
  TrendingDown, PlusCircle, BookOpen
} from 'lucide-react';
import { getMotorcycleMarketInfo } from '../geminiService';

interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // Inicialização com persistência garantida
  const [totalSaved, setTotalSaved] = useState(() => {
    const saved = localStorage.getItem('eduardo_cbr_total');
    return saved !== null ? Number(saved) : 0;
  });
  
  const [marketInfo, setMarketInfo] = useState<{text: string, sources: any[]} | null>(null);
  const [loadingMarket, setLoadingMarket] = useState(false);
  const [inputAmount, setInputAmount] = useState('');

  // Perfil dinâmico
  const [formacao, setFormacao] = useState(() => {
    return localStorage.getItem('eduardo_formacao') || 'Matemática';
  });

  const CBR_GOAL = 50000;

  // Sincronização automática com o storage
  useEffect(() => {
    localStorage.setItem('eduardo_cbr_total', totalSaved.toString());
  }, [totalSaved]);

  useEffect(() => {
    localStorage.setItem('eduardo_formacao', formacao);
  }, [formacao]);

  const fetchMarketInfo = async () => {
    setLoadingMarket(true);
    const info = await getMotorcycleMarketInfo();
    setMarketInfo(info);
    setLoadingMarket(false);
  };

  const handleAddCapital = () => {
    const amount = parseFloat(inputAmount.replace(',', '.'));
    if (!isNaN(amount) && amount > 0) {
      setTotalSaved(prev => prev + amount);
      setInputAmount('');
    }
  };

  const progressPercent = Math.min((totalSaved / CBR_GOAL) * 100, 100);

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PERFIL DO PROFESSOR */}
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
          <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 mb-6 border-2 border-orange-200 shadow-inner group-hover:rotate-3 transition-transform">
            <User className="w-12 h-12" />
          </div>
          <h3 className="text-xl font-black text-slate-800 uppercase italic leading-none">Eduardo Pinheiro</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Matemática | ex-SEDUC-PA | 33 Anos</p>
          
          <div className="mt-6 w-full text-left bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="text-[9px] font-black text-slate-400 uppercase mb-2 flex items-center gap-1">
              <GraduationCap className="w-3 h-3" /> Trajetória Acadêmica
            </h4>
            <div className="flex flex-col gap-1">
              <p className="text-[11px] text-slate-600 font-medium italic">
                Professor formado em <span className="text-orange-600 font-black">{formacao}</span>.
              </p>
              <p className="text-[11px] text-slate-600 font-medium italic">
                Atuação de 2 anos na linha de frente da <span className="text-slate-900 font-black uppercase">SEDUC-PA</span>.
              </p>
            </div>
            <input 
              type="text"
              value={formacao}
              onChange={(e) => setFormacao(e.target.value)}
              placeholder="Sua formação específica..."
              className="mt-3 w-full bg-white border border-slate-200 rounded-lg p-2 text-[9px] font-bold outline-none focus:border-orange-500"
            />
          </div>

          <div className="mt-4 w-full">
            <div className="flex justify-between items-center text-xs p-3 bg-white border border-slate-100 rounded-xl">
              <span className="font-bold text-slate-400 italic">Base Operacional</span>
              <span className="font-black text-slate-700 uppercase">Mauriti, Belém</span>
            </div>
          </div>
        </div>

        {/* CAPITAL CBR 500 - FOCO TOTAL */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden border-2 border-orange-500/30">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bike className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-base italic tracking-widest">Fundo CBR 500R</h4>
                  <p className="text-[10px] text-orange-400 font-black uppercase tracking-[0.2em] mt-1">Status: Blindado & Persistente</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-500 italic uppercase block">Objetivo</span>
                <span className="text-lg font-black text-orange-500 italic">R$ 50.000,00</span>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-end mb-4 text-white">
                <span className="text-6xl font-black italic leading-none tracking-tighter">
                  R$ {totalSaved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-orange-500 uppercase tracking-widest mb-1">Progresso</span>
                  <span className="text-2xl font-black text-white">{progressPercent.toFixed(1)}%</span>
                </div>
              </div>
              <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-orange-600 to-orange-400 h-full transition-all duration-1000 shadow-[0_0_20px_rgba(234,88,12,0.4)]" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 group focus-within:border-orange-500/50 transition-all">
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Quanto foi arrecadado hoje?</label>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-600/20 rounded-2xl">
                      <DollarSign className="w-6 h-6 text-orange-500" />
                    </div>
                    <input 
                      type="text" 
                      inputMode="decimal"
                      value={inputAmount} 
                      onChange={e => setInputAmount(e.target.value)} 
                      placeholder="0,00" 
                      className="w-full bg-transparent text-3xl font-black text-white outline-none placeholder:text-white/5" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-4">
                <button 
                  onClick={handleAddCapital} 
                  className="h-full w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-xs py-6 rounded-3xl uppercase tracking-[0.2em] transition-all flex flex-col items-center justify-center gap-2 shadow-xl active:scale-95 group"
                >
                  <PlusCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Aportar Agora
                </button>
              </div>
            </div>

            <p className="mt-6 text-[9px] text-white/30 font-bold uppercase text-center italic tracking-widest flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3 h-3" /> Sistema de salvamento automático ativado. Os dados não serão perdidos.
            </p>
          </div>
          <Target className="absolute -right-20 -bottom-20 w-80 h-80 text-white/5 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CRONOGRAMA DE COMBATE */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border-2 border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Rotina de Combate (Base Mauriti)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-3xl border-l-8 border-orange-500 shadow-sm">
               <span className="text-[9px] font-black text-slate-400 uppercase">Manhã (08h - 12h)</span>
               <h4 className="text-lg font-black text-slate-800 uppercase italic mt-1 leading-none">Estudo Focado</h4>
               <p className="text-[10px] text-slate-500 font-bold uppercase mt-2 italic">Meta: PSS & ENEM</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border-l-8 border-indigo-500 shadow-sm">
               <span className="text-[9px] font-black text-slate-400 uppercase">Tarde (14h - 17:30)</span>
               <h4 className="text-lg font-black text-slate-800 uppercase italic mt-1 leading-none">Criação YouTube</h4>
               <p className="text-[10px] text-slate-500 font-bold uppercase mt-2 italic">Matemática Para Você</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border-l-8 border-red-600 shadow-sm">
               <span className="text-[9px] font-black text-slate-400 uppercase">Noite (18:30 - 22h)</span>
               <h4 className="text-lg font-black text-slate-800 uppercase italic mt-1 leading-none">Operação Delivery</h4>
               <p className="text-[10px] text-slate-500 font-bold uppercase mt-2 italic">Aporte Diário no Fundo</p>
            </div>
          </div>
        </div>

        {/* CHECKLIST */}
        <div className="lg:col-span-4 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col justify-center border-b-8 border-orange-600">
          <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Award className="w-4 h-4" /> Checklist do Dia
          </h4>
          <div className="space-y-4">
             {[
               "Resolver 5 questões difíceis",
               "Postar 1 Short educacional",
               "Registrar aporte no fundo CBR"
             ].map((task, i) => (
               <div key={i} className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-orange-600 rounded-lg flex items-center justify-center text-white">
                   <CheckCircle2 className="w-4 h-4" />
                 </div>
                 <span className="text-xs font-bold italic">{task}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* RADAR DE MERCADO CBR */}
      <div className="bg-white rounded-[2.5rem] p-10 border-2 border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter leading-none">Inteligência de Mercado: CBR 500R</h3>
          </div>
          <button 
            onClick={fetchMarketInfo} 
            disabled={loadingMarket} 
            className="px-6 py-3 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-2xl text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm"
          >
            {loadingMarket ? <Sparkles className="animate-spin w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
            Consultar Preços Reais via IA
          </button>
        </div>
        
        {marketInfo ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4">
            <div className="lg:col-span-2 bg-slate-50 p-8 rounded-3xl border border-slate-100 prose prose-sm text-slate-600 italic font-medium leading-relaxed">
              {marketInfo.text}
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fontes Verificadas</h4>
              {marketInfo.sources.map((chunk: any, i: number) => (
                <a key={i} href={chunk.web?.uri} target="_blank" className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-500 transition-all group shadow-sm">
                  <span className="text-[10px] font-bold text-slate-700 truncate mr-2">{chunk.web?.title || 'Web Source'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-500" />
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-16 border-4 border-dashed border-slate-50 rounded-[2.5rem] text-center opacity-30 flex flex-col items-center">
            <Bike className="w-16 h-16 text-slate-200 mb-4" />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Aguardando comando para análise de mercado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
