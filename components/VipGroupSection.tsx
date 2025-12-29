
import React, { useState, useEffect } from 'react';
import { 
  Zap, Target, Gamepad2, Sparkles, Check, 
  HelpCircle, Rocket, Users, History, ListChecks, 
  Calendar, ChevronRight, ClipboardCheck, Clock, 
  Trash2, AlertCircle, Settings, ArrowRight, Timer
} from 'lucide-react';
import { generateVipExclusives } from '../geminiService';

interface GroupSettings {
  id: string;
  name: string;
  startDate: string;
}

interface HistoryEntry {
  id: string;
  group: string;
  type: string;
  topic: string;
  date: string;
  content: string;
}

const ENEM_TIMELINE = [
  'Razão, Proporção e Escalas',
  'Porcentagem e Matemática Financeira',
  'Médias e Estatística Básica',
  'Geometria Plana e Espacial',
  'Funções de 1º e 2º Grau',
  'Probabilidade e Conjuntos',
  'Análise Combinatória',
  'Trigonometria e Ciclo Trigonométrico',
  'Logaritmos e Exponenciais',
  'Geometria Analítica',
  'Progressões (PA e PG)',
  'Matemática Básica: O Pulo do Gato Final'
];

const ENEM_DATE = new Date('2026-11-08');
const REVIEW_START_DATE = new Date('2026-09-08');

const VipGroupSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  
  // Configurações dos Grupos
  const [groups, setGroups] = useState<GroupSettings[]>(() => {
    const saved = localStorage.getItem('eduardo_vip_groups_config');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'Grupo 01', name: 'Grupo 01', startDate: '2026-01-05' },
      { id: 'Grupo 02', name: 'Grupo 02', startDate: '2026-02-15' },
      { id: 'Grupo 03', name: 'Grupo 03', startDate: '2026-03-01' },
      { id: 'Grupo 04', name: 'Grupo 04', startDate: '2026-04-10' },
    ];
  });

  const [activeGroupId, setActiveGroupId] = useState(() => {
    const target = localStorage.getItem('eduardo_target_group');
    if (target) {
      localStorage.removeItem('eduardo_target_group');
      return target;
    }
    return 'Grupo 01';
  });

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('eduardo_vip_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('eduardo_vip_groups_config', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('eduardo_vip_history', JSON.stringify(history));
  }, [history]);

  const activeGroup = groups.find(g => g.id === activeGroupId) || groups[0];

  const calculateCurrentTopic = (startDateStr: string) => {
    const now = new Date();
    if (now >= REVIEW_START_DATE && now <= ENEM_DATE) {
      return { topic: "REVISÃO INTENSIVA: Questões Profecia", isReview: true };
    }
    const start = new Date(startDateStr);
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const topicIndex = Math.floor(diffDays / 2.3);
    const topic = ENEM_TIMELINE[topicIndex % ENEM_TIMELINE.length];
    return { topic, isReview: false };
  };

  const currentStatus = calculateCurrentTopic(activeGroup.startDate);

  const handleGenerateDayPost = async (type: 'jogo' | 'questao_profecia' | 'tip' | 'quiz') => {
    setLoading(true);
    setContent(null);
    const topic = currentStatus.isReview 
      ? `REVISÃO INTENSIVA: ${currentStatus.topic}` 
      : currentStatus.topic;
    
    try {
      const res = await generateVipExclusives(type, topic);
      setContent(res || "Erro ao gerar conteúdo.");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = () => {
    if (!content) return;
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      group: activeGroupId,
      type: 'Post do Dia',
      topic: currentStatus.topic,
      date: new Date().toLocaleString('pt-BR'),
      content: content
    };
    setHistory([newEntry, ...history]);
    navigator.clipboard.writeText(content);
    alert(`Copiado e Salvo no Histórico do ${activeGroupId}!`);
  };

  const updateGroupStartDate = (id: string, newDate: string) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, startDate: newDate } : g));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* HEADER DINÂMICO */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border-4 border-indigo-500/30">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none">Gestor de Trilhas VIP</h3>
              <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 mt-2">
                <Rocket className="w-4 h-4" /> ESTRATÉGIA PDF ENEM 2026
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-black/30 p-2 rounded-2xl border border-white/5">
            {groups.map(g => (
              <button
                key={g.id}
                onClick={() => setActiveGroupId(g.id)}
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeGroupId === g.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                {g.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUNA ESQUERDA: STATUS DA TRILHA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Timer className={`w-6 h-6 ${currentStatus.isReview ? 'text-red-500 animate-pulse' : 'text-slate-100'}`} />
            </div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" /> Status da Missão: {activeGroupId}
            </h4>
            
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Conteúdo Recomendado Hoje:</p>
                <h5 className={`text-lg font-black leading-tight uppercase italic ${currentStatus.isReview ? 'text-red-600' : 'text-indigo-900'}`}>
                  {currentStatus.topic}
                </h5>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Início da Trilha</span>
                  <input 
                    type="date" 
                    value={activeGroup.startDate}
                    onChange={(e) => updateGroupStartDate(activeGroupId, e.target.value)}
                    className="bg-transparent border-b border-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>
                {currentStatus.isReview && (
                  <div className="p-4 bg-red-600 rounded-xl text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> MODO REVISÃO ATIVO (ENEM PRÓXIMO)
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-indigo-900 p-8 rounded-[2rem] text-white shadow-xl">
            <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-6 flex items-center gap-2 italic">
              <ListChecks className="w-4 h-4" /> Plano de Ataque Mensal
            </h4>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {ENEM_TIMELINE.map((t, i) => {
                const isPast = ENEM_TIMELINE.indexOf(currentStatus.topic) > i;
                const isCurrent = currentStatus.topic === t;
                return (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isCurrent ? 'bg-white/10 border-white/20' : 'border-transparent opacity-40'}`}>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[10px] ${isPast ? 'bg-emerald-500' : 'bg-white/10'}`}>
                      {isPast ? <Check className="w-3 h-3" /> : i + 1}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{t}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: GERADOR E HISTÓRICO */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
               <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="text-indigo-500 w-5 h-5" /> Gerar Postagem do Dia
               </h4>
               <span className="text-[10px] font-bold text-slate-400 italic">30 Alunos por Grupo</span>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
               {[
                 { id: 'questao_profecia', label: 'Questão Profecia', icon: <HelpCircle /> },
                 { id: 'jogo', label: 'Game de Lógica', icon: <Gamepad2 /> },
                 { id: 'tip', label: 'Pulo do Gato', icon: <Zap /> },
                 { id: 'quiz', label: 'Quiz Rápido', icon: <Clock /> }
               ].map(tool => (
                 <button 
                   key={tool.id}
                   onClick={() => handleGenerateDayPost(tool.id as any)}
                   disabled={loading}
                   className="p-5 rounded-2xl border-2 border-slate-50 bg-slate-50/50 hover:bg-white hover:border-indigo-500 hover:shadow-lg transition-all group flex flex-col items-center gap-2"
                 >
                   <div className="text-slate-300 group-hover:text-indigo-500 transition-colors">
                     {React.cloneElement(tool.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-900">{tool.label}</span>
                 </button>
               ))}
             </div>

             {loading ? (
                <div className="bg-slate-900 rounded-3xl p-16 text-center">
                  <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white text-[10px] font-black uppercase tracking-widest">Calculando Projeção para o {activeGroupId}...</p>
                </div>
             ) : content ? (
                <div className="bg-slate-900 rounded-[2rem] border-4 border-indigo-500/20 overflow-hidden animate-in zoom-in-95 duration-300">
                   <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Rocket className="text-white w-4 h-4" />
                        </div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Pronto para Enviar</p>
                      </div>
                      <button 
                        onClick={saveToHistory}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl"
                      >
                        <ClipboardCheck className="w-4 h-4" /> Copiar para {activeGroupId}
                      </button>
                   </div>
                   <div className="p-8">
                     <pre className="text-slate-200 text-sm font-medium whitespace-pre-wrap italic font-mono leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
                       {content}
                     </pre>
                   </div>
                </div>
             ) : (
                <div className="p-16 text-center border-4 border-dashed border-slate-50 rounded-[2rem]">
                   <Users className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Selecione o tipo de conteúdo para o tema de hoje.</p>
                </div>
             )}
          </div>

          <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2 italic">
              <History className="text-indigo-600 w-4 h-4" /> Histórico Estratégico do {activeGroupId}
            </h4>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {history.filter(h => h.group === activeGroupId).length > 0 ? (
                history.filter(h => h.group === activeGroupId).map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-[11px] font-black text-slate-800 uppercase">{item.topic}</h5>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(item.content);
                        alert("Copiado!");
                      }}
                      className="p-3 bg-white text-slate-300 rounded-xl hover:text-indigo-600 hover:shadow-md transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center opacity-20 italic">
                  <p className="text-xs font-black uppercase">Nenhum registro encontrado.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VipGroupSection;
