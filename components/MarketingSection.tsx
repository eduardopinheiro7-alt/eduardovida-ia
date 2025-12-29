
import React, { useState } from 'react';
import { Megaphone, Target, Zap, TrendingUp, Sparkles, MessageSquare } from 'lucide-react';
import { generateAdCopy } from '../geminiService';

const MarketingSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<string | null>(null);

  const handleGenerateStrategy = async () => {
    setLoading(true);
    const prompt = `Crie uma estratégia de marketing de 30 dias para o Professor Eduardo Pinheiro (Matemática). 
    Foco: Aumentar alunos particulares em Belém e inscritos no YouTube. 
    Considere: Ele entrega lanches à noite e usa isso como networking.`;
    const res = await generateAdCopy("Eduardo Pinheiro", "Estratégia 30 Dias");
    setStrategy(res || "Erro ao gerar estratégia.");
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg">
            <Megaphone className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-tight text-white">Gestão de Marketing</h3>
            <p className="text-indigo-300 font-bold text-xs uppercase tracking-widest italic">Belém 2026: Do Lanche à Cátedra</p>
          </div>
        </div>
        <button 
          onClick={handleGenerateStrategy}
          disabled={loading}
          className="bg-white text-indigo-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-lg flex items-center gap-2"
        >
          {loading ? <Sparkles className="animate-spin w-4 h-4" /> : <Target className="w-4 h-4" />}
          Nova Estratégia
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
            <Zap className="w-8 h-8 text-orange-500 mb-4" />
            <h4 className="font-black text-slate-800 text-sm uppercase">Gatilhos Mentais</h4>
            <p className="text-[10px] text-slate-500 mt-2 italic font-bold">Use escassez e autoridade de quem já deu aula na SEDUC.</p>
         </div>
         <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
            <TrendingUp className="w-8 h-8 text-green-500 mb-4" />
            <h4 className="font-black text-slate-800 text-sm uppercase">Métricas de Sucesso</h4>
            <p className="text-[10px] text-slate-500 mt-2 italic font-bold">Sua meta é converter 5 entregas de lanche em 1 aluno particular.</p>
         </div>
         <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
            <MessageSquare className="w-8 h-8 text-indigo-600 mb-4" />
            <h4 className="font-black text-slate-800 text-sm uppercase">Grupo VIP WhatsApp</h4>
            <p className="text-[10px] text-slate-500 mt-2 italic font-bold">O funil termina no WhatsApp. Atendimento humanizado e focado em Belém.</p>
         </div>
      </div>

      {strategy && (
        <div className="bg-white rounded-3xl p-8 border-2 border-indigo-100 shadow-xl animate-in slide-in-from-top-4">
           <h4 className="font-black text-indigo-900 text-sm uppercase mb-6 flex items-center gap-2 italic">
              <Sparkles className="w-5 h-5" /> Roteiro Estratégico Mensal
           </h4>
           <div className="prose prose-sm text-slate-600 italic whitespace-pre-wrap leading-relaxed">
             {strategy}
           </div>
        </div>
      )}
    </div>
  );
};

export default MarketingSection;
