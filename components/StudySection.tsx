
import React, { useState } from 'react';
import { BookOpen, Youtube, Star, Lightbulb, MessageSquare, Sparkles, Brain, ChevronDown, ChevronUp, Languages, Target, ChevronRight, ExternalLink } from 'lucide-react';
import { generateDailyStudyPack } from '../geminiService';

const StudySection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dailyPack, setDailyPack] = useState<any>(null);
  const [showResolution, setShowResolution] = useState(false);

  const links = [
    { name: 'Projeto Medicina', url: 'https://projetomedicina.com.br/materias/matematica/' },
    { name: 'Projeto Agatha', url: 'https://www.projetoagathaedu.com.br/banco-de-questoes/matematica.php' },
    { name: 'QConcursos', url: 'https://www.qconcursos.com/' }
  ];

  const handleGerarPack = async () => {
    setLoading(true);
    const pack = await generateDailyStudyPack("Matemática e Português para Concursos");
    setDailyPack(pack);
    setShowResolution(false);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* HEADER SALA DE ESTUDOS - NOVO DESIGN EMERALD */}
      <div className="bg-[#0f172a] rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="text-white w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">Sala de Estudos</h2>
              <p className="text-emerald-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-2 italic">Eduardo Pinheiro - Preparação Elite</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 relative z-10">
          <button 
            onClick={() => window.open('https://youtube.com/@MatematicaParaVoce', '_blank')}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 border border-white/10"
          >
            <Youtube className="w-4 h-4 text-red-500" /> YouTube
          </button>
          <button 
            onClick={handleGerarPack} 
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.1em] shadow-2xl transition-all disabled:opacity-50 flex items-center gap-3"
          >
            {loading ? <Sparkles className="animate-spin w-5 h-5" /> : <Brain className="w-5 h-5" />}
            {loading ? 'Calculando...' : 'Gerar Desafio do Dia'}
          </button>
        </div>
        <Sparkles className="absolute right-0 bottom-0 w-64 h-64 text-white/5 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* COLUNA ESQUERDA: INSIGHTS & LINKS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm group hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-emerald-500 w-5 h-5" />
              <h4 className="font-black italic uppercase text-xs text-slate-800 tracking-widest">Foco do Dia</h4>
            </div>
            <p className="text-2xl font-black text-emerald-600 italic uppercase leading-tight tracking-tighter">Resiliência</p>
            <p className="text-[10px] text-slate-500 font-medium mt-2 italic">
              "A capacidade de voltar ao estado normal após uma pressão extrema. Essencial para o ENEM e Concursos."
            </p>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm group hover:border-blue-500 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="text-blue-500 w-5 h-5" />
              <h4 className="font-black italic uppercase text-xs text-slate-800 tracking-widest">Dica de Português</h4>
            </div>
            <p className="text-sm font-bold text-slate-700 italic">Onde vs Aonde</p>
            <p className="text-[10px] text-slate-500 mt-2 italic leading-relaxed">
              **Onde:** Lugar fixo (Ex: Onde mora?).<br/>
              **Aonde:** Movimento/Destino (Ex: Aonde vai?).
            </p>
          </div>

          <div className="bg-[#0f172a] p-8 rounded-[2rem] text-white border-b-8 border-emerald-500 shadow-xl">
             <Target className="w-8 h-8 text-emerald-500 mb-4" />
             <h5 className="font-black uppercase text-xs tracking-widest italic">Visão Belém</h5>
             <p className="text-slate-400 text-[10px] mt-2 italic leading-relaxed">
               Lembre-se: Cada minuto de estudo em Mauriti é uma marcha trocada na sua CBR 500R.
             </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Bancos de Questões</h4>
            {links.map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer" 
                 className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center hover:border-emerald-400 transition-all group">
                <span className="font-black text-slate-700 uppercase italic text-[10px]">{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
              </a>
            ))}
          </div>
        </div>

        {/* CONTEÚDO CENTRAL: QUESTÃO IA */}
        <div className="lg:col-span-8">
          <div className="bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-sm min-h-[500px] flex flex-col relative overflow-hidden">
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center animate-pulse">
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6 shadow-xl shadow-emerald-200"></div>
                <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest italic">Acessando Base de Conhecimento...</h4>
              </div>
            ) : dailyPack ? (
              <div className="animate-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 mb-8">
                  <span className="bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic border border-emerald-200">Pack Diário Ativo</span>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 italic">
                    <p className="text-slate-800 font-bold leading-relaxed">{dailyPack.mathQuestion}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dailyPack.mathAlternatives?.map((alt: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-50 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all cursor-pointer group shadow-sm bg-white">
                        <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center font-black text-slate-400 group-hover:bg-[#0f172a] group-hover:text-white transition-all">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-sm font-bold text-slate-600 italic group-hover:text-slate-900 leading-tight">{alt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={() => setShowResolution(!showResolution)}
                      className="w-full bg-[#0f172a] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl hover:bg-slate-800 transition-all italic"
                    >
                      {showResolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {showResolution ? 'Ocultar Resolução' : 'Ver Pulo do Gato Acadêmico'}
                    </button>

                    {showResolution && (
                      <div className="mt-6 p-8 bg-emerald-50 rounded-3xl border-2 border-emerald-100 animate-in zoom-in-95">
                        <div className="flex items-center gap-2 mb-4 text-emerald-800">
                          <Languages className="w-5 h-5" />
                          <h6 className="font-black uppercase text-[10px] tracking-widest italic">Análise do Professor Pinheiro</h6>
                        </div>
                        <p className="text-sm text-emerald-900 leading-relaxed font-bold italic">
                          {dailyPack.mathResolution}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 italic">
                <Lightbulb className="w-20 h-20 mb-6 text-slate-200" />
                <h4 className="font-black text-slate-400 uppercase text-xs tracking-widest">Pronto para a Batalha?</h4>
                <p className="text-[10px] font-bold uppercase mt-2 max-w-[250px] leading-relaxed">
                  Clique no botão superior para carregar os desafios de hoje focados em ENEM e Concursos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySection;
