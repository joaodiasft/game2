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
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0b1d3d] via-[#102d5c] to-[#173d78] text-white p-5 shadow-lg border border-blue-900/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0a1934] rounded-[10px] flex items-center justify-center">
                <Building2 className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                INSTALAÇÕES &amp; EXPANSÃO
              </h1>
              <p className="text-xs text-blue-200 mt-0.5 max-w-xl font-normal">
                Bases sólidas constroem impérios logísticos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[12px] font-serif italic text-cyan-200">
                &ldquo;Cada nova base é um novo horizonte.&rdquo;
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
        {/* Instalações Ativas */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Instalações Ativas</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-extrabold text-slate-900 font-mono">4</span>
              <span className="text-[11px] text-slate-400 font-medium">/ 2 disponíveis</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">+1 este mês</span>
          </div>
        </div>

        {/* Capacidade Total */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Warehouse className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Capacidade Total</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">18.000 m²</span>
            <span className="text-[10px] font-bold text-slate-600 block mt-0.5">72% ocupado</span>
          </div>
        </div>

        {/* Custo Operacional Mensal */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Custo Operacional Mensal</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">$ 42.600</span>
            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">+8% vs. mês anterior</span>
          </div>
        </div>

        {/* Eficiência de Rede */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Eficiência de Rede</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">88%</span>
            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">+5% após nova base</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs + Action Button */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === tab || (activeFilter === 'Todas' && tab === 'Todas as Instalações')
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => showToast('Selecione um terreno abaixo para construir')}
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Nova Instalação
        </button>
      </div>

      {/* 4. Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredFacilities.map((fac) => (
          <div
            key={fac.id}
            className={`bg-white rounded-2xl p-4 border transition-all ${
              fac.isAvailableForPurchase
                ? 'border-dashed border-blue-400 bg-blue-50/20 shadow-sm'
                : 'border-slate-200/90 shadow-sm'
            }`}
          >
            {/* Facility Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-start gap-2.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  fac.isAvailableForPurchase ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-600'
                }`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                    {fac.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] text-slate-500">{fac.city}</span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[10px] font-semibold text-blue-600">{fac.type}</span>
                  </div>
                </div>
              </div>

              {!fac.isAvailableForPurchase ? (
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-amber-600 font-mono">
                    ★ Nível {fac.level}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200 mt-0.5">
                    ● Ativa
                  </span>
                </div>
              ) : (
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Terreno Livre
                </span>
              )}
            </div>

            {/* Spec Stats */}
            {!fac.isAvailableForPurchase ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Área Total</span>
                    <span className="text-xs font-extrabold text-slate-800 font-mono">{fac.capacity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Baias / Docas</span>
                    <span className="text-xs font-extrabold text-slate-800 font-mono">
                      {fac.bays} / {fac.docks}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Equipe</span>
                    <span className="text-xs font-extrabold text-slate-800 font-mono">{fac.employees} func.</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div>
                    <span className="text-slate-400 text-[10px]">Custo Mensal</span>
                    <span className="font-extrabold text-slate-900 font-mono block">
                      $ {fac.monthlyCost.toLocaleString()}/mês
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px]">Eficiência</span>
                    <div className="flex items-center gap-1 font-extrabold text-emerald-600 font-mono">
                      <Zap className="w-3 h-3 text-emerald-500" />
                      {fac.efficiency}%
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => upgradeFacility(fac.id)}
                    className="py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" /> Expandir (Nv. {fac.level + 1})
                  </button>
                  <button
                    onClick={() => showToast(`Painel de gestão para ${fac.name}`)}
                    className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
                  >
                    <Settings2 className="w-3.5 h-3.5" /> Gerenciar Base
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 text-center">
                  <span className="text-[10px] text-slate-500 block">Área Disponível para Edificação</span>
                  <span className="text-base font-extrabold text-slate-900 font-mono">{fac.capacity}</span>
                  <span className="text-[11px] text-slate-600 block mt-1">
                    Preço de aquisição: <strong className="text-blue-700 font-mono">${fac.purchaseCost?.toLocaleString()}</strong>
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Excelente malha viária circundante, com acesso direto a eixos rodoviários. Ideal para construção de Centro de Distribuição automatizado.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => purchaseFacility(fac.id)}
                    className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors"
                  >
                    Comprar Terreno
                  </button>
                  <button
                    onClick={() => showToast('Estudo de viabilidade: Retorno estimado em 14 meses')}
                    className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    Estudo de Viabilidade
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 5. Network Coverage Visual Representation */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-blue-600" /> Cobertura da Rede Barravento
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              4 bases conectadas, 14 rotas ativas de alta frequência e 98% de atendimento regional.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Malha 100% Operacional
          </span>
        </div>

        {/* Visual Map Diagram */}
        <div className="relative h-44 rounded-xl bg-gradient-to-br from-[#0c1c38] to-[#122852] p-4 flex items-center justify-between text-white overflow-hidden">
          {/* Subtle grid and lines */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Node 1: Rivermouth */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <Building2 className="w-5 h-5 text-cyan-300" />
            </div>
            <span className="text-xs font-bold text-white mt-1">Rivermouth</span>
            <span className="text-[9px] text-cyan-300">Sede Principal</span>
          </div>

          <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 relative mx-2">
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-2 h-2 rounded-full bg-white animate-ping" />
          </div>

          {/* Node 2: Port Terminal */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center shadow-lg">
              <Warehouse className="w-5 h-5 text-blue-300" />
            </div>
            <span className="text-xs font-bold text-white mt-1">Port Terminal</span>
            <span className="text-[9px] text-blue-300">CD Regional</span>
          </div>

          <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 relative mx-2">
            <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-2 h-2 rounded-full bg-white animate-ping" />
          </div>

          {/* Node 3: Eastvale Hub */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-purple-300" />
            </div>
            <span className="text-xs font-bold text-white mt-1">Eastvale Hub</span>
            <span className="text-[9px] text-purple-300">Armazém Avançado</span>
          </div>

          <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-400 to-emerald-400 relative mx-2" />

          {/* Node 4: Crossroads */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-lg">
              <Truck className="w-5 h-5 text-emerald-300" />
            </div>
            <span className="text-xs font-bold text-white mt-1">Crossroads</span>
            <span className="text-[9px] text-emerald-300">Posto de Apoio</span>
          </div>
        </div>
      </div>

      {/* 6. Quote Footer */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200/80 text-center">
        <p className="text-xs font-serif italic text-slate-600">
          &ldquo;Onde houver uma estrada, haverá uma base Barravento pronta para atender.&rdquo;
        </p>
      </div>
    </div>
  );
};
