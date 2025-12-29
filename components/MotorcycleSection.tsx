import React from 'react';
import { Bike, CheckCircle, AlertTriangle, ShieldCheck, Key, Wrench, Wallet, Heart } from 'lucide-react';

const MotorcycleSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Fase 1: Aluguel & Treino */}
      <div className="bg-white p-8 rounded-2xl border-2 border-blue-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 bg-blue-500 text-white font-bold text-xs uppercase tracking-widest rounded-bl-xl">
          Jan a Mar: Treino
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Key className="text-blue-500" />
          Preparação para a CBR 500R
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-slate-500" />
              Aluguel Estratégico
            </h4>
            <p className="text-sm text-slate-500 mt-2 italic">Opção: Mottu ou Fazer 250</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">✅ Treinar equilíbrio e embreagem</li>
              <li className="flex items-center gap-2">✅ Iniciar entregas sem dívida de manutenção</li>
              <li className="flex items-center gap-2">✅ Sentir o trânsito da Mauriti até Benevides</li>
            </ul>
          </div>

          <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
            <h4 className="text-xl font-bold text-orange-800 flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Engenharia Financeira
            </h4>
            <p className="text-sm text-orange-700 mt-2 italic">Plano de Quitação em Belém</p>
            <ul className="mt-4 space-y-2 text-sm text-orange-900 font-medium">
              <li className="flex items-center gap-2">💰 Poupança: R$ 1.000,00 / mês (Reserva)</li>
              <li className="flex items-center gap-2">🤝 Acordo: Tia paga a moto à vista</li>
              <li className="flex items-center gap-2">💳 Parcelas: R$ 600,00 (Via Bolsa Família)</li>
            </ul>
            <div className="mt-4 p-2 bg-white rounded border border-orange-100 text-[10px] text-orange-800">
              * Dica: Essa estrutura reduz juros bancários a zero!
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Fazer 250 Usada */}
        <div className="border-2 rounded-2xl p-8 hover:bg-slate-50 transition-colors bg-white opacity-80">
          <h4 className="text-2xl font-black text-blue-600">Yamaha Fazer 250</h4>
          <p className="text-slate-500 text-sm mt-1 italic">Escola de Pilotagem</p>
          <p className="mt-4 text-sm text-slate-600">Moto leve para ganhar confiança nas curvas e no corredor de Belém antes do "upgrade" final.</p>
        </div>

        {/* CBR 500R */}
        <div className="border-2 border-orange-500 bg-orange-50/20 rounded-2xl p-8 shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-2xl font-black text-orange-600">Honda CBR 500R</h4>
              <p className="text-slate-500 text-sm mt-1 font-bold">A META FINAL (ABRIL)</p>
            </div>
            <Heart className="text-red-500 fill-red-500 w-6 h-6 animate-pulse" />
          </div>
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">
            O seu sonho e ferramenta de marketing. Ideal para o trajeto de Benevides com conforto e potência para ultrapassagens seguras na BR.
          </p>
          <div className="mt-6 flex gap-2">
            <span className="px-2 py-1 bg-orange-200 text-orange-800 text-[10px] font-bold rounded uppercase">Conforto</span>
            <span className="px-2 py-1 bg-orange-200 text-orange-800 text-[10px] font-bold rounded uppercase">Marketing</span>
            <span className="px-2 py-1 bg-orange-200 text-orange-800 text-[10px] font-bold rounded uppercase">Potência</span>
          </div>
        </div>
      </div>

      {/* Conselho Técnico */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <ShieldCheck className="text-orange-400" />
          <span>Checklist de Segurança do Prof. Eduardo</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
          <ul className="space-y-2">
            <li>• <b>Curso Jan-Mar:</b> Foco total em frenagem de emergência.</li>
            <li>• <b>Aluguel:</b> Use a moto alugada para "limpar" os vícios de pilotagem.</li>
          </ul>
          <ul className="space-y-2">
            <li>• <b>Financeiro:</b> Manter a reserva de 1k/mês para emergências da moto.</li>
            <li>• <b>Marketing:</b> A CBR será o fundo de muitos vídeos de "Matemática na Vida".</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MotorcycleSection;