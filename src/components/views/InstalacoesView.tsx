import React, { useState } from 'react';
import {
  Building2,
  Warehouse,
  DollarSign,
  Globe2,
  Plus,
  ArrowUpRight,
  Settings2,
  CheckCircle2,
  MapPin,
  Truck,
  Zap,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { Facility } from '../../types/game';

export const InstalacoesView: React.FC = () => {
  const { facilities, upgradeFacility, purchaseFacility, showToast } = useGame();
  const [activeFilter, setActiveFilter] = useState('Todas');

  const filterTabs = [
    'Todas as Instalações',
    'Sedes & Garagens',
    'Centros de Distribuição',
    'Armazéns Avançados',
    'Postos de Apoio',
    'Terrenos Disponíveis',
  ];

  const filteredFacilities = facilities.filter((f) => {
    if (activeFilter === 'Todas as Instalações' || activeFilter === 'Todas') return true;
    if (activeFilter === 'Sedes & Garagens') return f.type === 'Sede & Garagem';
    if (activeFilter === 'Centros de Distribuição') return f.type === 'Centro de Distribuição';
    if (activeFilter === 'Armazéns Avançados') return f.type === 'Armazém Avançado';
    if (activeFilter === 'Postos de Apoio') return f.type === 'Posto de Apoio';
    if (activeFilter === 'Terrenos Disponíveis') return f.type === 'Terreno Disponível';
    return true;
  });

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] border border-slate-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  Instalações &amp; Expansão Imobiliária
                </h1>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">
                  4 Bases Ativas
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Patrimônio corporativo, centros de distribuição integrados e terrenos para expansão estratégica
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Selecione um terreno abaixo para construir nova base')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" /> Expandir Rede
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Bases Operacionais</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black text-white font-mono">4</span>
            <span className="text-xs text-slate-400 font-mono">/ 2 disponíveis</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 block mt-1">+1 inaugurada este ano</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Capacidade de Armazenagem</span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">18.000 m²</span>
          <span className="text-[11px] text-cyan-400 block mt-1">72% ocupação média</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Custo Fixo Imobiliário</span>
          <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">R$ 42.600</span>
          <span className="text-[11px] text-slate-400 block mt-1">Aluguel &amp; IPTU inclusos</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Eficiência da Rede Hub</span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">88%</span>
          <span className="text-[11px] text-emerald-400 block mt-1">▲ +5% pós Campinas CD</span>
        </div>
      </div>

      {/* 3. Filter Tabs */}
      <div className="bg-[#0e1628] rounded-xl p-2 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab || (activeFilter === 'Todas' && tab === 'Todas as Instalações')
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredFacilities.map((fac) => (
          <div
            key={fac.id}
            className={`bg-[#0e1628] rounded-2xl p-5 border transition-all shadow-xl flex flex-col justify-between space-y-4 ${
              fac.isAvailableForPurchase
                ? 'border-dashed border-cyan-500/50 bg-[#091224]'
                : 'border-slate-800'
            }`}
          >
            {/* Facility Header */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    fac.isAvailableForPurchase ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white leading-tight">
                      {fac.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5 font-mono">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px] text-slate-400">{fac.city}</span>
                      <span className="text-[10px] text-slate-600">•</span>
                      <span className="text-[10px] font-semibold text-cyan-400">{fac.type}</span>
                    </div>
                  </div>
                </div>

                {!fac.isAvailableForPurchase ? (
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-amber-400 font-mono">
                      ★ Nível {fac.level}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.2 rounded border border-emerald-500/30 mt-0.5">
                      ● Ativa
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">
                    Terreno Disponível
                  </span>
                )}
              </div>

              {/* Spec Stats */}
              {!fac.isAvailableForPurchase ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 bg-[#091122] p-3 rounded-xl border border-slate-800 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Área Coberta</span>
                      <span className="text-xs font-extrabold text-white font-mono">{fac.capacity}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Baias / Docas</span>
                      <span className="text-xs font-extrabold text-white font-mono">
                        {fac.bays} / {fac.docks}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Equipe</span>
                      <span className="text-xs font-extrabold text-white font-mono">{fac.employees} func.</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="text-slate-400 text-[10px]">Custo Mensal</span>
                      <span className="font-extrabold text-white font-mono block">
                        R$ {fac.monthlyCost.toLocaleString('pt-BR')}/mês
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px]">Eficiência Operacional</span>
                      <div className="flex items-center gap-1 font-extrabold text-emerald-400 font-mono">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        {fac.efficiency}%
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => upgradeFacility(fac.id)}
                      className="py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" /> Ampliar (Nv. {fac.level + 1})
                    </button>
                    <button
                      onClick={() => showToast(`Painel de gestão WMS para ${fac.name}`)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1 border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Settings2 className="w-3.5 h-3.5" /> Detalhes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-[#091122] p-3 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block">Área Total Edificável</span>
                    <span className="text-base font-extrabold text-white font-mono">{fac.capacity}</span>
                    <span className="text-[11px] text-slate-300 block mt-1">
                      Valor de aquisição: <strong className="text-cyan-400 font-mono">R$ {fac.purchaseCost?.toLocaleString('pt-BR')}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Localização privilegiada com acesso direto a eixos rodoviários de pista dupla. Ideal para centro de triagem automatizado.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => purchaseFacility(fac.id)}
                      className="py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
                    >
                      Comprar Terreno
                    </button>
                    <button
                      onClick={() => showToast('Estudo de viabilidade: Retorno sobre investimento estimado em 14 meses')}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
                    >
                      Viabilidade
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
