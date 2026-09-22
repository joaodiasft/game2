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
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0e2142] via-[#143366] to-[#1c488e] text-white p-5 shadow-lg border border-blue-900/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0d1e3d] rounded-[10px] flex items-center justify-center">
                <Swords className="w-7 h-7 text-amber-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                INTELIGÊNCIA COMPETITIVA
              </h1>
              <p className="text-xs text-blue-200 mt-0.5 max-w-xl font-normal">
                Conheça o mercado. Supere a concorrência. Conquiste rotas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[12px] font-serif italic text-cyan-200">
                &ldquo;Liderança não se ganha, se constrói a cada quilômetro.&rdquo;
              </span>
              <span className="text-[9px] uppercase tracking-widest text-blue-300 font-bold">
                Barravento Logistics
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Sua Posição */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Sua Posição</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">2º Lugar</span>
            <span className="text-[10px] font-bold text-slate-500 block mt-0.5">Atrás da TransGlobal</span>
          </div>
        </div>

        {/* Sua Participação */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Sua Participação</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">28%</span>
            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">+3% este mês</span>
          </div>
        </div>

        {/* Receita Estimada do Mercado */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Receita Estimada (Mercado)</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">$ 420.000</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Mercado regional ativo</span>
          </div>
        </div>

        {/* Rotas em Disputa */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Rotas em Disputa</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">5</span>
            <span className="text-[10px] font-bold text-purple-600 block mt-0.5">2 liderando, 3 disputando</span>
          </div>
        </div>
      </div>

      {/* 3. Filters Bar */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {filterTabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === t || (filter === 'Todos' && t === 'Todos os Concorrentes')
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={() => showToast('Relatório de inteligência comercial gerado')}
          className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <BarChart2 className="w-3.5 h-3.5" /> Relatório de Mercado
        </button>
      </div>

      {/* 4. Competitors Grid (Including Barravento highlight) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {competitors.map((comp) => {
          const isPlayer = comp.isPlayer;

          return (
            <div
              key={comp.id}
              className={`rounded-2xl p-4 border transition-all ${
                isPlayer
                  ? 'bg-gradient-to-br from-emerald-50/80 to-blue-50/50 border-emerald-400 shadow-md ring-2 ring-emerald-400/40'
                  : 'bg-white border-slate-200/90 shadow-sm'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0"
                    style={{ backgroundColor: comp.color }}
                  >
                    {comp.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {comp.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 block">
                      {comp.rank}º Lugar • Market Share {comp.marketShare}%
                    </span>
                  </div>
                </div>

                {isPlayer ? (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    Sua Empresa
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Concorrente
                  </span>
                )}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center mb-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">Frota</span>
                  <span className="text-xs font-extrabold text-slate-800 font-mono">{comp.fleetCount} veíc.</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Bases</span>
                  <span className="text-xs font-extrabold text-slate-800 font-mono">{comp.facilitiesCount} unid.</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Reputação</span>
                  <span className="text-xs font-extrabold text-emerald-600 font-mono">{comp.reputation}%</span>
                </div>
              </div>

              {/* Traits */}
              <div className="space-y-1.5 text-xs mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Política de Preços:</span>
                  <span className="font-semibold text-slate-800">{comp.pricing}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Confiabilidade Operacional:</span>
                  <span className="font-semibold text-slate-800">{comp.reliability}</span>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-800 block">Ponto Forte:</span>
                  <p className="text-[11px] text-slate-700 mt-0.5">{comp.strengths}</p>
                </div>
                <div className="bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                  <span className="text-[10px] font-bold text-rose-800 block">Ponto Fraco:</span>
                  <p className="text-[11px] text-slate-700 mt-0.5">{comp.weaknesses}</p>
                </div>
              </div>

              {/* Action Buttons */}
              {!isPlayer && (
                <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => attackCompetitor(comp.id, 'steal_contract')}
                    className="py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Crosshair className="w-3 h-3" /> Disputar Clientes
                  </button>
                  <button
                    onClick={() => attackCompetitor(comp.id, 'price_war')}
                    className="py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Zap className="w-3 h-3 text-amber-400" /> Guerra de Preços
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 5. Market Share Visual Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-900 mb-2">Divisão de Participação no Mercado (Market Share)</h3>
        
        {/* Continuous Bar */}
        <div className="w-full h-6 rounded-lg overflow-hidden flex shadow-inner">
          {competitors.map((c) => (
            <div
              key={c.id}
              className="h-full flex items-center justify-center text-white text-[10px] font-mono font-bold transition-all hover:opacity-90"
              style={{ width: `${c.marketShare}%`, backgroundColor: c.color }}
              title={`${c.name}: ${c.marketShare}%`}
            >
              {c.marketShare}%
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mt-3">
          {competitors.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: c.color }} />
              <span className="font-semibold text-slate-800 text-[11px]">{c.name}</span>
              <span className="font-mono text-slate-500 text-[10px]">({c.marketShare}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
