
import React, { useState } from 'react';
import { Database, Play, Video, ExternalLink, Globe, Search } from 'lucide-react';

const QuestionSolver: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Database className="text-orange-500" />
            Matemática Para Você
          </h3>
          <p className="text-slate-500 mt-1">Sua base de dados tripla para o canal e estudos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="https://www.projetoagathaedu.com.br/banco-de-questoes/matematica.php" target="_blank" className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-400 transition-all group">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
             </div>
             <span className="font-black text-xs uppercase tracking-tighter">Projeto Agatha</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-300" />
        </a>

        <a href="https://projetomedicina.com.br/materias/matematica/" target="_blank" className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 transition-all group">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
             </div>
             <span className="font-black text-xs uppercase tracking-tighter">Projeto Medicina</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-300" />
        </a>

        <a href="https://www.qconcursos.com/" target="_blank" className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 transition-all group">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Search className="w-5 h-5" />
             </div>
             <span className="font-black text-xs uppercase tracking-tighter">QConcursos</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-300" />
        </a>
      </div>

      <div className="bg-slate-900 p-12 rounded-3xl text-center text-white border-2 border-orange-500/20">
         <Play className="w-16 h-16 text-orange-500 mx-auto mb-6 animate-pulse" />
         <h4 className="text-xl font-black uppercase tracking-widest">Pronto para Gravar?</h4>
         <p className="text-slate-400 mt-2 text-sm italic">Use os links acima para escolher uma questão e peça meu auxílio de roteiro.</p>
      </div>
    </div>
  );
};

export default QuestionSolver;
