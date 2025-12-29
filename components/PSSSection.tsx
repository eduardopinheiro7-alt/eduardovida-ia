
import React, { useState } from 'react';
import { analyzePSSData } from '../geminiService';
import { Search, Info, CheckCircle2, XCircle, FileText, Plus, Calculator, MapPin, Target, Sparkles, TrendingUp, Anchor, Mountain, Home } from 'lucide-react';

const PSSSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [newEditalText, setNewEditalText] = useState('');

  const runAnalysis = async (text: string) => {
    setLoading(true);
    const result = await analyzePSSData(text);
    // Fix: Access result.text because analyzePSSData returns an object { text, sources }
    setAnalysis(result?.text || "Análise indisponível no momento.");
    setLoading(false);
  };

  const handleQuickAnalyze = (location: 'MG' | 'RR' | 'NATAL' | 'GARIBALDI' | 'VISEU') => {
    let context = '';
    switch(location) {
      case 'MG':
        context = 'Edital Cachoeira Dourada (MG). Salário: R$ 3.020,58 para 24h semanais. Cadastro reserva para temporários. Cidade pequena.';
        break;
      case 'RR':
        context = 'Edital Roraima (SEED-RR). Salário: R$ 4.577,00 para 30h semanais. Professor de Ensino Fundamental/Médio. Capital Boa Vista.';
        break;
      case 'NATAL':
        context = 'Edital Natal (RN). Professor de Matemática. Salário base + Gratificações chegando a aprox. R$ 5.000,00. 30h semanais. Capital litorânea.';
        break;
      case 'GARIBALDI':
        context = 'Edital Garibaldi (RS). Serra Gaúcha. Professor 20h. Salário R$ 2.800,00 + benefícios fortes (Vale alimentação alto). Qualidade de vida elevada.';
        break;
      case 'VISEU':
        context = 'Edital Viseu (PA). Interior do Pará. Salário base da categoria. Proximidade com Belém permite manter vínculo ou logística de final de semana.';
        break;
    }
    runAnalysis(context);
  };

  const handleCustomAnalyze = () => {
    if (!newEditalText.trim()) return;
    runAnalysis(newEditalText);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Estratégico */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border-2 border-orange-500/20">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-600 rounded-2xl">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tight uppercase italic">Scanner de Viabilidade PSS</h3>
              <p className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em]">Meta: R$ 6.000,00 | Plano Belém 2026</p>
            </div>
          </div>
          <p className="text-slate-400 text-xs italic max-w-2xl">
            Compare editais de todo o Brasil com o seu potencial de ganho em Belém (Seduc + iFood + YouTube). 
            Não mude de estado sem antes ver os números reais.
          </p>
        </div>
        <TrendingUp className="absolute right-0 top-0 w-64 h-64 text-orange-500/5 -mr-20 -mt-20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lado Esquerdo: Editais Salvos & Novos */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <FileText className="text-blue-600 w-4 h-4" /> Editais em Destaque
            </h4>
            
            <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <button 
                onClick={() => handleQuickAnalyze('VISEU')}
                className="w-full p-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl hover:border-emerald-500 transition-all text-left flex justify-between items-center group"
              >
                <div>
                  <span className="text-[9px] font-black text-emerald-600 uppercase">Pará (Próximo)</span>
                  <h5 className="font-bold text-slate-800 text-sm">Viseu - PA</h5>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Logística Favorável</p>
                </div>
                <Home className="w-5 h-5 text-emerald-300 group-hover:text-emerald-500" />
              </button>

              <button 
                onClick={() => handleQuickAnalyze('NATAL')}
                className="w-full p-4 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:border-blue-500 transition-all text-left flex justify-between items-center group"
              >
                <div>
                  <span className="text-[9px] font-black text-blue-600 uppercase">Rio Grande do Norte</span>
                  <h5 className="font-bold text-slate-800 text-sm">Natal</h5>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Capital Litorânea</p>
                </div>
                <Anchor className="w-5 h-5 text-blue-300 group-hover:text-blue-500" />
              </button>

              <button 
                onClick={() => handleQuickAnalyze('GARIBALDI')}
                className="w-full p-4 bg-indigo-50 border-2 border-indigo-100 rounded-2xl hover:border-indigo-500 transition-all text-left flex justify-between items-center group"
              >
                <div>
                  <span className="text-[9px] font-black text-indigo-600 uppercase">Rio Grande do Sul</span>
                  <h5 className="font-bold text-slate-800 text-sm">Garibaldi</h5>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Serra Gaúcha | Qualidade</p>
                </div>
                <Mountain className="w-5 h-5 text-indigo-300 group-hover:text-indigo-500" />
              </button>

              <button 
                onClick={() => handleQuickAnalyze('RR')}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:border-blue-500 transition-all text-left flex justify-between items-center group"
              >
                <div>
                  <span className="text-[9px] font-black text-blue-600 uppercase">Roraima</span>
                  <h5 className="font-bold text-slate-800 text-sm">Boa Vista (SEED)</h5>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">R$ 4.577,00 | 30h</p>
                </div>
                <Search className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
              </button>

              <button 
                onClick={() => handleQuickAnalyze('MG')}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:border-orange-500 transition-all text-left flex justify-between items-center group"
              >
                <div>
                  <span className="text-[9px] font-black text-orange-600 uppercase">Minas Gerais</span>
                  <h5 className="font-bold text-slate-800 text-sm">Cachoeira Dourada</h5>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">R$ 3.020,58 | 24h</p>
                </div>
                <Search className="w-5 h-5 text-slate-300 group-hover:text-orange-500" />
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <Plus className="text-green-600 w-4 h-4" /> Analisar Novo Edital
            </h4>
            <div className="space-y-4">
              <textarea 
                value={newEditalText}
                onChange={(e) => setNewEditalText(e.target.value)}
                placeholder="Cole aqui o texto do edital, salário ou link..."
                className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-xs font-medium outline-none focus:border-green-500 transition-all resize-none"
              />
              <button 
                onClick={handleCustomAnalyze}
                disabled={loading || !newEditalText}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                Processar com IA Profecia
              </button>
            </div>
          </div>
        </div>

        {/* Lado Direito: Resultado da Análise */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bg-white h-full min-h-[500px] rounded-[2.5rem] border-2 border-slate-100 flex flex-col items-center justify-center p-12 text-center animate-pulse">
              <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-8"></div>
              <p className="text-slate-800 font-black uppercase text-xs tracking-widest">Calculando Custo de Vida & Logística...</p>
              <p className="text-slate-400 text-[10px] mt-2 italic">Avaliando se vale a pena sair de Belém.</p>
            </div>
          ) : analysis ? (
            <div className="bg-white h-full rounded-[2.5rem] border-2 border-slate-100 shadow-sm flex flex-col overflow-hidden animate-in slide-in-from-right-4">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Parecer Estratégico</h4>
                    <p className="text-[10px] text-orange-600 font-bold uppercase italic mt-1">Comparado ao Plano Belém</p>
                  </div>
                </div>
              </div>
              
              <div className="p-10 flex-1 overflow-y-auto">
                <div className="prose prose-sm text-slate-600 italic whitespace-pre-wrap leading-relaxed font-medium">
                  {analysis}
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border-2 border-green-100 bg-green-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="text-green-600 w-4 h-4" />
                      <span className="text-[10px] font-black text-green-700 uppercase">Pontos Fortes</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-tight">Análise baseada em logística e potencial de ganho líquido real.</p>
                  </div>
                  
                  <div className="p-5 rounded-2xl border-2 border-red-100 bg-red-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="text-red-600 w-4 h-4" />
                      <span className="text-[10px] font-black text-red-700 uppercase">Riscos ao Plano</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-tight">Impacto direto no faturamento do iFood e crescimento do YouTube.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-900 text-white flex items-center gap-4">
                <Info className="w-8 h-8 text-orange-400" />
                <p className="text-[10px] font-bold uppercase italic leading-tight opacity-80">
                  Eduardo, lembre-se: Sua meta é 6k. Se o PSS paga menos, ele precisa ser um degrau, não o destino final.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white h-full min-h-[500px] rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center p-20 text-center group">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-12 h-12 text-slate-200" />
              </div>
              <h4 className="text-slate-400 font-black text-sm uppercase tracking-widest">Aguardando Input de Edital</h4>
              <p className="text-slate-300 text-[10px] font-bold uppercase mt-2">Escolha um edital salvo ou cole um novo para analisar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PSSSection;
