
import React, { useState } from 'react';
import { Utensils, DollarSign, Sparkles, TrendingUp, ShoppingBag, Calculator, MessageSquare, Send } from 'lucide-react';
import { geminiService } from '../geminiService';

const SnackBusinessSection: React.FC = () => {
  const [cost, setCost] = useState<string>('');
  const [markup] = useState<number>(25);
  const [loading, setLoading] = useState(false);
  const [aiCopy, setAiCopy] = useState<string | null>(null);

  const menuItems = [
    { name: "Hot-dog do Prof (Completo)", cost: 8.00 },
    { name: "Tapioquinha Mauriti", cost: 5.50 },
    { name: "Bolo de Pote (Matemático)", cost: 6.00 },
    { name: "Suco Natural (Gelado)", cost: 3.50 }
  ];

  const calculatePrice = (baseCost: number) => (baseCost * (1 + markup / 100)).toFixed(2);

  const handleGenerateCopy = async (itemName: string) => {
    setLoading(true);
    const res = await geminiService.generateSnackMarketing(itemName, markup.toString());
    setAiCopy(res || "Erro ao gerar copy.");
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER ESTRATÉGICO */}
      <div className="bg-red-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="relative z-10 flex items-center gap-6">
          <div className="p-4 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 rotate-3">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none">Operação iFood Mauriti</h3>
            <p className="text-red-100 font-bold text-[10px] uppercase tracking-[0.3em] mt-2 italic">A engrenagem financeira para a CBR 500R</p>
          </div>
        </div>
        <div className="relative z-10 bg-black/20 px-8 py-4 rounded-3xl border border-white/10 backdrop-blur-md text-center">
          <span className="text-[10px] font-black uppercase opacity-70 block">Markup Alvo</span>
          <span className="text-3xl font-black text-white italic">{markup}% Fixo</span>
        </div>
        <Utensils className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CALCULADORA E MENU */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <Calculator className="text-red-600 w-4 h-4" /> Calculadora de Precisão
            </h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400">Custo de Insumos (R$)</label>
                <input 
                  type="number" 
                  value={cost} 
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="Ex: 8.50"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-red-500 transition-all"
                />
              </div>
              <div className="p-6 bg-red-50 rounded-2xl border-2 border-red-100 text-center">
                <p className="text-[10px] font-black uppercase text-red-600 mb-1">Preço Sugerido iFood</p>
                <span className="text-4xl font-black text-red-700 italic leading-none">
                  R$ {cost ? calculatePrice(parseFloat(cost)) : "0.00"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <h4 className="font-black text-red-500 text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Cardápio Otimizado
            </h4>
            <div className="space-y-3">
              {menuItems.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-tight">{item.name}</h5>
                    <p className="text-[8px] font-bold text-slate-500 uppercase">Custo: R$ {item.cost.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-red-500 italic">R$ {calculatePrice(item.cost)}</span>
                    <button 
                      onClick={() => handleGenerateCopy(item.name)}
                      className="p-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors shadow-lg"
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MARKETING E IA */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white flex-1 rounded-[2.5rem] border-2 border-slate-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h5 className="font-black text-slate-800 text-[11px] uppercase tracking-widest">Gerador de Copy (Grounding IA)</h5>
              </div>
              <Send className="w-4 h-4 text-slate-300" />
            </div>
            
            <div className="p-10 flex-1 flex flex-col justify-center text-center">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full mx-auto animate-bounce"></div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Cozinhando sua oferta estratégica...</p>
                </div>
              ) : aiCopy ? (
                <div className="animate-in zoom-in-95">
                  <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 text-left text-slate-700 italic text-sm font-medium leading-relaxed whitespace-pre-wrap">
                    {aiCopy}
                  </div>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(aiCopy); alert("Copy copiado!") }}
                    className="mt-4 text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                  >
                    Copiar para WhatsApp/iFood
                  </button>
                </div>
              ) : (
                <div className="opacity-20 italic space-y-4">
                  <Sparkles className="w-16 h-16 mx-auto text-slate-300" />
                  <p className="text-xs font-black uppercase text-slate-400 max-w-[250px] mx-auto">
                    Selecione um item do cardápio para gerar um copy matador focado em Belém.
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-900 text-white flex items-center gap-4">
              <DollarSign className="w-8 h-8 text-emerald-500" />
              <p className="text-[9px] font-black uppercase tracking-widest italic opacity-80 leading-tight">
                Networking de Entrega: Use as entregas na Mauriti para prospectar alunos particulares de matemática.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnackBusinessSection;
