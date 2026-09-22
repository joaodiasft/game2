import React, { useState } from 'react';
import {
  Swords,
  Trophy,
  PieChart,
  DollarSign,
  TrendingUp,
  Shield,
  Zap,
  Crosshair,
  BarChart2,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  Truck,
  Building,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { Competitor } from '../../types/game';

export const ConcorrentesView: React.FC = () => {
  const { competitors, attackCompetitor, showToast } = useGame();
  const [filter, setFilter] = useState('Todos');

  const filterTabs = [
    'Todos os Concorrentes',
    'Maiores Ameaças',
    'Regionais',
    'Locais',
  ];

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] border border-slate-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Swords className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  Inteligência Competitiva &amp; Mercado
                </h1>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30 font-mono">
                  2º Lugar Regional
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Monitoramento de frotas rivais, disputas tarifárias e expansão agressiva sobre rotas concorrentes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Relatório de inteligência comercial consolidado com sucesso')}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <BarChart2 className="w-4 h-4" /> Relatório de Mercado
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Posição no Ranking</span>
          <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">2º Lugar</span>
          <span className="text-[11px] text-slate-400 block mt-1">Atrás apenas da TransGlobal</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Sua Fatia de Mercado</span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">28%</span>
          <span className="text-[11px] font-bold text-emerald-400 block mt-1">▲ +3% neste mês</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Volume Total do Corredor</span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">R$ 420.000</span>
          <span className="text-[11px] text-slate-400 block mt-1">Faturamento regional mensal</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Rotas sob Disputa Direta</span>
          <span className="text-2xl font-black text-cyan-400 font-mono mt-1 block">5 rotas</span>
          <span className="text-[11px] text-cyan-400 block mt-1">2 com liderança de preço</span>
        </div>
      </div>

      {/* 3. Filters Bar */}
      <div className="bg-[#0e1628] rounded-xl p-2 border border-slate-800 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {filterTabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filter === t || (filter === 'Todos' && t === 'Todos os Concorrentes')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Competitors Grid (Including Barravento highlight) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {competitors.map((comp) => {
          const isPlayer = comp.isPlayer;

          return (
            <div
              key={comp.id}
              className={`rounded-2xl p-5 border transition-all shadow-xl flex flex-col justify-between space-y-4 ${
                isPlayer
                  ? 'bg-[#0b1b36] border-cyan-500/60 ring-1 ring-cyan-500/30'
                  : 'bg-[#0e1628] border-slate-800'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-md"
                      style={{ backgroundColor: comp.color }}
                    >
                      {comp.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white leading-tight">
                        {comp.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 block font-mono mt-0.5">
                        {comp.rank}º Lugar • Market Share {comp.marketShare}%
                      </span>
                    </div>
                  </div>

                  {isPlayer ? (
                    <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/40">
                      Sua Empresa
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700 font-mono">
                      Concorrente
                    </span>
                  )}
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-2 bg-[#091122] p-3 rounded-xl border border-slate-800 text-center mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Frota</span>
                    <span className="text-xs font-extrabold text-white font-mono">{comp.fleetCount} veíc.</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Bases</span>
                    <span className="text-xs font-extrabold text-white font-mono">{comp.facilitiesCount} unid.</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Reputação</span>
                    <span className="text-xs font-extrabold text-emerald-400 font-mono">{comp.reputation}%</span>
                  </div>
                </div>

                {/* Traits */}
                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Política de Preços:</span>
                    <span className="font-semibold text-white">{comp.pricing}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Confiabilidade Operacional:</span>
                    <span className="font-semibold text-white">{comp.reliability}</span>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="space-y-2 text-xs pt-3 border-t border-slate-800">
                  <div className="bg-[#091122] p-2.5 rounded-xl border border-emerald-500/20">
                    <span className="text-[10px] font-bold text-emerald-400 block">Ponto Forte:</span>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{comp.strengths}</p>
                  </div>
                  <div className="bg-[#091122] p-2.5 rounded-xl border border-rose-500/20">
                    <span className="text-[10px] font-bold text-rose-400 block">Ponto Fraco:</span>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{comp.weaknesses}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {!isPlayer && (
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => attackCompetitor(comp.id, 'steal_contract')}
                    className="py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                  >
                    <Crosshair className="w-3.5 h-3.5" /> Disputar Clientes
                  </button>
                  <button
                    onClick={() => attackCompetitor(comp.id, 'price_war')}
                    className="py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 border border-slate-700 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Guerra de Preços
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 5. Market Share Visual Bar */}
      <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
        <h3 className="text-sm font-extrabold text-white">Divisão Consolidada de Market Share Regional</h3>

        {/* Continuous Bar */}
        <div className="w-full h-7 rounded-xl overflow-hidden flex shadow-inner border border-slate-800">
          {competitors.map((c) => (
            <div
              key={c.id}
              className="h-full flex items-center justify-center text-white text-[11px] font-mono font-bold transition-all hover:opacity-90"
              style={{ width: `${c.marketShare}%`, backgroundColor: c.color }}
              title={`${c.name}: ${c.marketShare}%`}
            >
              {c.marketShare}%
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          {competitors.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: c.color }} />
              <span className="font-semibold text-white text-[11px]">{c.name}</span>
              <span className="font-mono text-slate-400 text-[10px]">({c.marketShare}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
