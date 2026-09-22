import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  HeartHandshake,
  Target,
  Plus,
  CheckCircle2,
  Clock,
  Star,
  FileText,
  TrendingUp,
  AlertCircle,
  Building,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { Contract } from '../../types/game';

export const ClientesView: React.FC = () => {
  const { contracts, acceptContract, renewContract, showToast } = useGame();
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filterTabs = [
    'Todos os Clientes',
    'Corporativos',
    'Varejo & E-commerce',
    'Indústria & Agro',
    'Novas Propostas',
  ];

  const filteredContracts = contracts.filter((c) => {
    if (activeFilter === 'Novas Propostas') return c.status === 'proposta';
    if (c.status === 'proposta') return false;
    if (activeFilter === 'Todos os Clientes' || activeFilter === 'Todos') return true;
    if (activeFilter === 'Corporativos') return c.category === 'Corporativo';
    if (activeFilter === 'Varejo & E-commerce') return c.category === 'Varejo' || c.category === 'E-commerce';
    if (activeFilter === 'Indústria & Agro') return c.category === 'Indústria';
    return true;
  });

  const proposals = contracts.filter((c) => c.status === 'proposta');

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] border border-slate-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  Contratos Comerciais &amp; Key Accounts
                </h1>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">
                  18 Ativos
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Acordos de nível de serviço (SLA), faturamento mensal recorrente e retenção de contas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Abrindo prospecção de novos contratos corporativos...')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" /> Nova Proposta B2B
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Contratos Ativos</span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">18</span>
          <span className="text-[11px] font-bold text-emerald-400 block mt-1">+3 este trimestre</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Receita Recorrente (MRR)</span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">R$ 148.500</span>
          <span className="text-[11px] font-bold text-emerald-400 block mt-1">+15% vs. mês anterior</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Taxa de Retenção (Net)</span>
          <span className="text-2xl font-black text-cyan-400 font-mono mt-1 block">94.8%</span>
          <span className="text-[11px] text-slate-400 block mt-1">Churn controlado (&lt; 2%)</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Pipeline em Aberto</span>
          <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">6 propostas</span>
          <span className="text-[11px] text-slate-400 block mt-1">R$ 52.000 potencial mensal</span>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-[#0e1628] rounded-xl p-2 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab || (activeFilter === 'Todos' && tab === 'Todos os Clientes')
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Active Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredContracts.map((c) => (
          <div key={c.id} className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white leading-tight">
                      {c.clientName}
                    </h3>
                    <span className="text-[11px] text-slate-400 block font-mono mt-0.5">
                      {c.segment} • {c.contractType}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  ● Ativo
                </span>
              </div>

              {/* Financial & Operational stats */}
              <div className="grid grid-cols-2 gap-3 bg-[#091122] p-3.5 rounded-xl border border-slate-800 my-3.5">
                <div>
                  <span className="text-[10px] text-slate-400 block">Faturamento Mensal</span>
                  <span className="text-base font-extrabold text-emerald-400 font-mono">
                    R$ {c.monthlyValue.toLocaleString('pt-BR')}/mês
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Demanda Contratada</span>
                  <span className="text-xs font-bold text-slate-200 font-mono">
                    {c.volume}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Vigência Restante:</span>
                  <span className="font-semibold text-white font-mono">{c.durationMonths} meses</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">SLA &amp; Satisfação:</span>
                  <div className="flex items-center gap-1 font-bold text-amber-400 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{c.satisfaction}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => renewContract(c.id)}
                className="py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Renovar Contrato
              </button>
              <button
                onClick={() => showToast(`Histórico financeiro e SLA de ${c.clientName}`)}
                className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                Extrato DRE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Proposals Section */}
      {proposals.length > 0 && (
        <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Propostas Comerciais Recebidas ({proposals.length})
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Responda antes do prazo limite</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {proposals.map((prop) => (
              <div key={prop.id} className="p-3.5 rounded-xl border border-amber-500/30 bg-[#091122] flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white">{prop.clientName}</h4>
                  <span className="text-[10px] text-slate-400 block font-mono">{prop.segment} • {prop.volume}</span>
                  <span className="text-xs font-extrabold text-emerald-400 font-mono block mt-1">
                    R$ {prop.monthlyValue.toLocaleString('pt-BR')}/mês
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => acceptContract(prop.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={() => showToast('Enviando contraproposta com reajuste de SLA')}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-lg border border-slate-700 transition-colors cursor-pointer"
                  >
                    Negociar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
