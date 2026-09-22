import React from 'react';
import {
  TrendingUp,
  Truck,
  Users,
  Building,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Package,
  Wrench,
  DollarSign,
  Star,
  Globe2,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const DashboardView: React.FC = () => {
  const { company, setActiveTab, showToast } = useGame();

  return (
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none">
      {/* 1. Welcome Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c1e3f] via-[#122e5e] to-[#184080] text-white p-5 shadow-lg border border-blue-900/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0a1834] rounded-[10px] flex items-center justify-center">
                <Truck className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
                  Centro de Comando Logístico
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-semibold">
                  Operação Ativa
                </span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white mt-0.5">
                {company.name}
              </h1>
              <p className="text-xs text-blue-200 mt-0.5 max-w-xl font-normal">
                {company.slogan}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('relatorios')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/30 transition-colors flex items-center gap-1.5"
            >
              Relatórios Executivos <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('pedidos')}
              className="px-4 py-2 bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              Ver Pedidos
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Saldo em Caixa</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">
              $ {company.cash.toLocaleString('pt-BR')}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">
              +${company.dailyProfit.toLocaleString('pt-BR')} hoje
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Frota Operacional</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">22 / 28</span>
            <span className="text-[10px] font-bold text-slate-500 block mt-0.5">78% de taxa de uso</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Equipe Total</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">42 Colab.</span>
            <span className="text-[10px] font-bold text-purple-600 block mt-0.5">82% moral da equipe</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Nível da Empresa</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">Nível {company.level}</span>
            <span className="text-[10px] font-bold text-amber-600 block mt-0.5">
              {company.xp} / {company.xpToNextLevel} XP
            </span>
          </div>
        </div>
      </div>

      {/* 3. Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Oficina Rápida */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Oficina &amp; Manutenção</h3>
                <span className="text-[10px] text-slate-500">4 veículos em serviço</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              2 Urgências
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            O caminhão T-01 Volvo FH requer liberação do freio ABS na baia 2.
          </p>
          <button
            onClick={() => setActiveTab('oficina')}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Acessar Oficina →
          </button>
        </div>

        {/* Card 2: Pesquisa e Tecnologia */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Globe2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">P&amp;D Tecnológico</h3>
                <span className="text-[10px] text-slate-500">Manutenção Preditiva (65%)</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded animate-pulse">
              Pesquisando
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            A pesquisa desbloqueará redução de 25% nos custos mecânicos de toda a frota.
          </p>
          <button
            onClick={() => setActiveTab('tecnologia')}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            Abrir Árvore Tecnológica →
          </button>
        </div>

        {/* Card 3: Expansão de Bases */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Expansão de Bases</h3>
                <span className="text-[10px] text-slate-500">4 ativas • 2 terrenos</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              88% Rede
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Novo terreno disponível em Northside Logistics Park para ampliação de rotas norte.
          </p>
          <button
            onClick={() => setActiveTab('instalacoes')}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Ver Instalações →
          </button>
        </div>
      </div>
    </div>
  );
};
