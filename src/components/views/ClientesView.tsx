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
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c1f3e] via-[#123062] to-[#184286] text-white p-5 shadow-lg border border-blue-900/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0a1b38] rounded-[10px] flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                CONTRATOS &amp; COMERCIAL
              </h1>
              <p className="text-xs text-blue-200 mt-0.5 max-w-xl font-normal">
                Grandes parcerias geram grandes resultados.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[12px] font-serif italic text-cyan-200">
                &ldquo;Confiança é a carga mais valiosa que transportamos.&rdquo;
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
        {/* Contratos Ativos */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Contratos Ativos</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">18</span>
            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">+3 este mês</span>
          </div>
        </div>

        {/* Receita Mensal Contratada */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Receita Mensal Contratada</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">$ 148.500</span>
            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">+15% vs. mês anterior</span>
          </div>
        </div>

        {/* Taxa de Retenção */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Taxa de Retenção</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">94%</span>
            <span className="text-[10px] font-bold text-slate-500 block mt-0.5">Excelente fidelidade</span>
          </div>
        </div>

        {/* Oportunidades em Aberto */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Oportunidades em Aberto</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">6 propostas</span>
            <span className="text-[10px] font-bold text-amber-600 block mt-0.5">$ 52.000 potencial</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === tab || (activeFilter === 'Todos' && tab === 'Todos os Clientes')
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => showToast('Abrindo prospecção de novos clientes...')}
          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Contrato
        </button>
      </div>

      {/* 4. Active Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredContracts.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {c.clientName}
                    </h3>
                    <span className="text-[11px] text-slate-500 block">
                      {c.segment} • {c.contractType}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ● Ativo
                </span>
              </div>

              {/* Financial & Operational stats */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 my-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">Valor Mensal</span>
                  <span className="text-sm font-extrabold text-emerald-600 font-mono">
                    $ {c.monthlyValue.toLocaleString()}/mês
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Volume Fixo</span>
                  <span className="text-xs font-extrabold text-slate-800 font-mono">
                    {c.volume}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between text-[11px]">
                  <span>Vigência Restante:</span>
                  <span className="font-semibold text-slate-900 font-mono">{c.durationMonths} meses</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>Satisfação do Cliente:</span>
                  <div className="flex items-center gap-1 font-bold text-emerald-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{c.satisfaction}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => renewContract(c.id)}
                className="py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                Renovar Contrato
              </button>
              <button
                onClick={() => showToast(`Detalhes de faturamento de ${c.clientName}`)}
                className="py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Extrato
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Proposals Section (Novas Propostas) */}
      {proposals.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" /> Propostas Comerciais Aguardando Aceite ({proposals.length})
            </h3>
            <span className="text-[10px] text-slate-500">Responda antes do prazo expirar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {proposals.map((prop) => (
              <div key={prop.id} className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{prop.clientName}</h4>
                  <span className="text-[10px] text-slate-600 block">{prop.segment} • {prop.volume}</span>
                  <span className="text-xs font-extrabold text-emerald-700 font-mono block mt-1">
                    $ {prop.monthlyValue.toLocaleString()}/mês
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => acceptContract(prop.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors"
                  >
                    Aceitar Contrato
                  </button>
                  <button
                    onClick={() => showToast('Negociação enviada com contraproposta de +10%')}
                    className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-xs rounded-lg transition-colors"
                  >
                    Negociar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Quote Footer */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200/80 text-center">
        <p className="text-xs font-serif italic text-slate-600">
          &ldquo;Negócios duradouros são construídos com entregas impecáveis e palavra honrada.&rdquo;
        </p>
      </div>
    </div>
  );
};
