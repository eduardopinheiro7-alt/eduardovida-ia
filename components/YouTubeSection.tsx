
import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, PenTool, Sparkles, Brain, 
  Play, Database, Search, Gamepad2, Heart, Calendar, 
  Mic, Monitor, Lightbulb, CheckCircle2, ChevronRight, 
  BarChart3, Upload, Film, Zap, Instagram, Send, Smartphone, Trash2
} from 'lucide-react';
import { geminiService } from '../geminiService';

const YouTubeSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  
  // Persistência do resultado da análise
  const [result, setResult] = useState<string | null>(() => {
    return localStorage.getItem('eduardo_yt_last_analysis');
  });
  
  const [topic, setTopic] = useState(() => {
    return localStorage.getItem('eduardo_yt_last_topic') || '';
  });

  const [toolType, setToolType] = useState<'roteiro' | 'game_logic' | 'vida_real' | 'analise_video' | 'editorial' | 'shorts_idea'>('roteiro');
  const [category, setCategory] = useState('ENEM');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sincronizar com localStorage sempre que o resultado mudar
  useEffect(() => {
    if (result) {
      localStorage.setItem('eduardo_yt_last_analysis', result);
    } else {
      localStorage.removeItem('eduardo_yt_last_analysis');
    }
  }, [result]);

  useEffect(() => {
    localStorage.setItem('eduardo_yt_last_topic', topic);
  }, [topic]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleAction = async () => {
    setLoading(true);
    try {
      if (toolType === 'analise_video' && videoFile) {
        const base64 = await fileToBase64(videoFile);
        const res = await geminiService.analyzeVideoBeta(base64, videoFile.type, topic || "Aula Operação CBR 500R");
        setResult(res);
      } else {
        const res = await geminiService.generateYouTubeIntelligence({
          type: toolType as any,
          category: category,
          topic: topic
        });
        setResult(res);
      }
    } catch (error) {
      setResult("Ocorreu um erro ao processar sua solicitação.");
    } finally {
      setLoading(false);
    }
  };

  const clearAnalysis = () => {
    if (window.confirm("Deseja realmente apagar a última análise salva?")) {
      setResult(null);
      setTopic('');
      localStorage.removeItem('eduardo_yt_last_analysis');
      localStorage.removeItem('eduardo_yt_last_topic');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Estúdio */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border-b-8 border-red-600">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
              <Film className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Matemática Para Você</h2>
              <p className="text-red-500 font-bold text-[10px] uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div> Eduardo Pinheiro Creator Studio
              </p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-center">
                <span className="block text-[8px] font-black uppercase opacity-60">Foco Atual</span>
                <span className="text-sm font-black text-red-500">ENEM 2026</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Painel de Controle */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-600" /> Direção de Conteúdo
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: 'roteiro', label: 'Roteiro', icon: <Video />, color: 'red' },
                { id: 'game_logic', label: 'Matematicando', icon: <Gamepad2 />, color: 'blue' },
                { id: 'vida_real', label: 'Mat. na Vida', icon: <Heart />, color: 'emerald' },
                { id: 'analise_video', label: 'Analisar Vídeo (Beta)', icon: <Brain />, color: 'orange' },
                { id: 'shorts_idea', label: 'Ideia Shorts', icon: <Smartphone />, color: 'pink' },
                { id: 'editorial', label: 'Calendário', icon: <Calendar />, color: 'indigo' }
              ].map((tool) => (
                <button 
                  key={tool.id}
                  onClick={() => setToolType(tool.id as any)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${toolType === tool.id ? `border-${tool.color}-500 bg-${tool.color}-50 text-${tool.color}-700` : 'border-slate-50 text-slate-400 hover:border-slate-200'}`}
                >
                  {React.cloneElement(tool.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                  <span className="text-[8px] font-black uppercase tracking-widest">{tool.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {toolType === 'analise_video' ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-4 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-200 hover:bg-orange-50 transition-all group"
                >
                  <input 
                    type="file" 
                    accept="video/mp4,video/x-m4v,video/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  />
                  {videoFile ? (
                    <div className="text-center">
                      <Film className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <p className="text-[10px] font-black text-slate-800 uppercase truncate max-w-[200px]">{videoFile.name}</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-200 group-hover:text-orange-400 mb-2" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4">Enviar Vídeo (OBS / Mobile)</p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold outline-none focus:border-red-500"
                  >
                    <option value="ENEM">ENEM (Foco Profecia)</option>
                    <option value="CONCURSOS">Concursos</option>
                    <option value="PROFMAT">PROFMAT</option>
                    <option value="OLIMPIADAS">Olimpíadas / Testes</option>
                    <option value="BASICA">Matemática Básica</option>
                  </select>
                </>
              )}
              
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Qual o tema, questão ou lógica do jogo?"
                className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold outline-none focus:border-red-500 resize-none"
              />

              <button 
                onClick={handleAction}
                disabled={loading || (toolType === 'analise_video' && !videoFile)}
                className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Sparkles className="animate-spin w-5 h-5" /> : <Play className="w-5 h-5" />}
                {toolType === 'analise_video' ? 'Analisar Gravação' : 'Executar Estratégia'}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-red-500 flex items-center gap-2">
              <Monitor className="w-4 h-4" /> Protocolo de Gravação
            </h4>
            <div className="space-y-4">
              {[
                { t: "Cena 1", d: "Xournal++ (Fundo Quadriculado)" },
                { t: "Cena 2", d: "Câmera (Fundo Neutro/Estante)" },
                { t: "Áudio", d: "Gain em 70%, sem eco" },
                { t: "Script", d: "Falar 'Pulo do Gato' no clímax" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-[8px] font-black text-red-500 uppercase w-12">{item.t}</span>
                  <span className="text-[10px] font-bold text-slate-300">{item.d}</span>
                  <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm flex flex-col min-h-[600px] overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Lightbulb className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">Inteligência Estratégica</h4>
                  <p className="text-[10px] text-red-600 font-bold uppercase italic mt-1">
                    {result ? "Exibindo Análise Preservada" : "Matematizando: Modo Beta Ativo"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {result && (
                  <button 
                    onClick={clearAnalysis}
                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    title="Limpar análise salva"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                  <Send className="w-4 h-4" />
                </button>
                <button className="p-3 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-600 hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-10 flex-1 overflow-y-auto">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-pulse">
                   <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                     <Film className="w-10 h-10 text-red-600" />
                   </div>
                   <h5 className="font-black text-slate-800 uppercase text-sm">IA Assistindo ao Vídeo...</h5>
                   <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 italic tracking-widest">
                     Extraindo os Pulos do Gato para o canal.
                   </p>
                </div>
              ) : result ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-orange-200">Resultados da Inteligência</span>
                  </div>
                  <div className="prose prose-sm text-slate-600 italic whitespace-pre-wrap leading-relaxed font-medium">
                    {result}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                  <Database className="w-20 h-20 text-slate-200 mb-6" />
                  <h5 className="font-black text-slate-400 uppercase text-xs tracking-widest">Aguardando Direção de Palco</h5>
                  <p className="text-[10px] font-bold uppercase mt-2 max-w-[300px]">
                    Faça o upload do vídeo ou descreva o tema para gerar inteligência de conteúdo.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-slate-900 text-white flex items-center gap-4">
               <Zap className="w-8 h-8 text-red-500" />
               <p className="text-[9px] font-black uppercase tracking-widest italic opacity-80 leading-tight">
                 Análise baseada em Metodologia Ativa e Estratégia Digital para Professores.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSection;
