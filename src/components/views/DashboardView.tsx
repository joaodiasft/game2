import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
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
  Compass,
  ShieldAlert,
  MessageSquare,
  Sparkles,
  Fuel,
  MapPin,
  ChevronRight,
  Activity,
  ArrowUpRight,
  Layers,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const DashboardView: React.FC = () => {
  const { company, setActiveTab, acts, crises, npcs, openCrisisModal, openNpcChat, showToast } = useGame();

  const currentAct = acts.find((a) => a.number === company.currentAct) || acts[0];
  const currentCrisis = crises[`crise_ato_${company.currentAct}`];
  const hasPendingCrisis = currentCrisis?.status === 'pending';
  const mentorNpc = npcs.find((n) => currentAct.npcs.includes(n.id)) || npcs[0];

  // Active delivery dispatches for live command table
  const [activeDispatches] = useState([
    {
      id: 'DSP-8821',
      client: 'Supermercados Alvorada',
      cargo: 'Alimentos Perecíveis (12 Paletes)',
      origin: 'CD Central Porto',
      destination: 'Zona Sul - Varejo 04',
      driver: 'Carlos Lima',
      vehicle: 'Volvo FH 540 (T-01)',
      progress: 68,
      status: 'Em Rota',
      eta: '24 min',
      urgency: 'Alta',
    },
    {
      id: 'DSP-8822',
      client: 'TechLog Soluções',
      cargo: 'Eletrônicos Sensíveis (800kg)',
      origin: 'Hub Norte',
      destination: 'Distrito Industrial 02',
      driver: 'Rodrigo Alves',
      vehicle: 'Renault Master (V-02)',
      progress: 92,
      status: 'Aproximação',
      eta: '6 min',
      urgency: 'Crítica',
    },
    {
      id: 'DSP-8823',
      client: 'Cervejaria do Vale',
      cargo: 'Bebidas Engarrafadas (24t)',
      origin: 'Fábrica Vale',
      destination: 'CD Regional Oeste',
      driver: 'Julio Cesar',
      vehicle: 'Scania R450 (T-03)',
      progress: 35,
      status: 'Em Rota',
      eta: '1h 15m',
      urgency: 'Normal',
    },
    {
      id: 'DSP-8824',
      client: 'Farmacêutica Vitalis',
      cargo: 'Insumos Hospitalares (Climatizado)',
      origin: 'Aeroporto Cargo',
      destination: 'Hospital Regional',
      driver: 'Ana Paula',
      vehicle: 'Ford Transit (V-01)',
      progress: 15,
      status: 'Carregamento',
      eta: '45 min',
      urgency: 'Alta',
    },
  ]);

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* 1. Executive Ops Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] border border-slate-800 p-6 shadow-xl overflow-hidden">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-950/50">
              <Truck className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1 font-medium">
                <span className="text-cyan-400 font-semibold uppercase tracking-wider text-[10px]">
                  Centro de Controle Operacional
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Operações em Tempo Real
                </span>
                <span>•</span>
                <span>{company.cityName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {company.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-normal leading-relaxed">
                {company.slogan} — Gestão integrada de frotas, rotas urbanas e expansão interestadual.
              </p>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('campanha')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Compass className="w-4 h-4 text-cyan-100" />
              <span>Modo Campanha</span>
              <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-extrabold ml-1">
                Ato {company.currentAct}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pedidos')}
              className="px-4 py-2.5 rounded-xl bg-[#141f38] hover:bg-[#1a294a] border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Package className="w-4 h-4 text-cyan-400" />
              <span>Despachar Carga</span>
            </button>

            <button
              onClick={() => setActiveTab('relatorios')}
              className="px-4 py-2.5 rounded-xl bg-[#141f38] hover:bg-[#1a294a] border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <BarChart3 className="w-4 h-4 text-slate-400" />
              <span>Relatórios</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Campaign Spotlight Alert / Mentor Advice */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0c142b] via-[#0e1936] to-[#0c142b] border border-cyan-500/30 p-5 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Jornada: Da Garagem ao Império
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-300 font-medium">Ato {company.currentAct} de 7</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400 text-[11px]">{currentAct.levelRange}</span>
          </div>

          <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
            {currentAct.title} — <span className="text-cyan-300 font-semibold">{currentAct.subtitle}</span>
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            {currentAct.fantasy}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Building className="w-3.5 h-3.5 text-cyan-400" /> Sede: {currentAct.hqName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <Truck className="w-3.5 h-3.5 text-cyan-400" /> Capacidade: {currentAct.hqVehicleSlots} veículos
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {currentAct.unlocks[0]}
            </span>
          </div>
        </div>

        {/* Action card: Crisis or NPC Dialogue Advice */}
        <div className="bg-[#121c38] border border-slate-700/80 rounded-xl p-4 shrink-0 w-full md:w-[310px] space-y-2.5 shadow-md">
          {hasPendingCrisis && currentCrisis ? (
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
                <span className="text-[11px] font-black uppercase text-rose-400 tracking-wider">
                  Crise do Ato Obrigatória!
                </span>
              </div>
              <p className="text-xs font-bold text-white line-clamp-2 mb-3">
                {currentCrisis.title}
              </p>
              <button
                onClick={() => openCrisisModal(currentCrisis)}
                className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-lg text-xs font-black shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
              >
                <span>Resolver Decisão Crítica</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{mentorNpc.avatar}</span>
                  <div>
                    <span className="text-xs font-bold text-white block">{mentorNpc.name}</span>
                    <span className="text-[10px] text-cyan-400 font-medium">{mentorNpc.role}</span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  {mentorNpc.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 italic line-clamp-2 mb-2.5 leading-relaxed bg-[#0b1226] p-2 rounded-lg border border-slate-800">
                "{mentorNpc.dialogues[0]?.quote}"
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openNpcChat(mentorNpc)}
                  className="flex-1 py-1.5 bg-[#172547] hover:bg-[#1d2f5a] text-cyan-300 border border-cyan-500/30 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Conversar
                </button>
                <button
                  onClick={() => setActiveTab('campanha')}
                  className="py-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Ver Metas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Executive KPI Dashboard Cards (Precision Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Caixa & Lucro */}
        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Saldo em Caixa</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              R$ {company.cash.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800/80">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 inline" />
                +R$ {company.dailyProfit.toLocaleString('pt-BR')} hoje
              </span>
              <span className="text-[11px] text-slate-400">Margem 24%</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Frota Ativa & Utilização */}
        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Frota Operacional</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              22 <span className="text-sm font-normal text-slate-400">/ 28 veículos</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800/80">
              <span className="text-cyan-400 font-semibold">78% em rota ativa</span>
              <span className="text-[11px] text-rose-400 font-medium">4 na oficina</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Pontualidade SLA & Entregas */}
        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">SLA de Pontualidade</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              98.4%
            </div>
            <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800/80">
              <span className="text-slate-300 font-medium">1.420 entregas / mês</span>
              <span className="text-[11px] text-emerald-400 font-semibold">Nota 4.9 ★</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Equipe & Nível */}
        <div
          onClick={() => setActiveTab('campanha')}
          className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md flex flex-col justify-between hover:border-amber-500/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Progresso do Ato</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono tracking-tight flex items-baseline justify-between">
              <span>Nível {company.level}</span>
              <span className="text-xs font-bold text-amber-400">Ato 0{company.currentAct}</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800/80">
              <span className="text-slate-400 text-[11px] font-mono">
                {company.xp} / {company.xpToNextLevel} XP
              </span>
              <span className="text-[11px] text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Ver Jornada <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Live Command Center Table & Tactical Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Live Dispatches & Tracking Board */}
        <div className="lg:col-span-2 bg-[#0e1628] rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Quadro de Despachos &amp; Entregas em Tempo Real
                </h3>
                <p className="text-[11px] text-slate-400">
                  4 remessas prioritárias monitoradas por telemetria veicular
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('pedidos')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
            >
              Ver Todas (18) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Despacho</th>
                  <th className="pb-3">Cliente / Carga</th>
                  <th className="pb-3">Rota</th>
                  <th className="pb-3">Veículo / Motorista</th>
                  <th className="pb-3">Progresso / ETA</th>
                  <th className="pb-3 pr-2 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {activeDispatches.map((disp) => (
                  <tr key={disp.id} className="hover:bg-[#121d33] transition-colors group">
                    <td className="py-3 pl-2">
                      <span className="font-mono text-[11px] font-bold text-cyan-400 block">
                        {disp.id}
                      </span>
                      <span className="text-[10px] text-slate-500">{disp.urgency}</span>
                    </td>
                    <td className="py-3">
                      <span className="font-bold text-white block truncate max-w-[170px]">
                        {disp.client}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[170px]">
                        {disp.cargo}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 text-[11px] text-slate-300">
                        <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate max-w-[130px]">{disp.destination}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate max-w-[130px]">
                        De: {disp.origin}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="font-medium text-slate-200 block truncate max-w-[130px]">
                        {disp.driver}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[130px]">
                        {disp.vehicle}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-semibold text-cyan-300">{disp.status}</span>
                        <span className="text-slate-400 font-mono">ETA: {disp.eta}</span>
                      </div>
                      <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${disp.progress}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 pr-2 text-right">
                      <button
                        onClick={() => {
                          showToast(`Abrindo telemetria do despacho ${disp.id}`);
                          setActiveTab('pedidos');
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Operations Hub Shortcuts & Fleet Health */}
        <div className="space-y-4">
          {/* Card: Fleet Readiness Quick Action */}
          <div className="bg-[#0e1628] rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-rose-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Prontidão da Oficina
                </h3>
              </div>
              <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                2 Baias Ocupadas
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O caminhão <strong className="text-white">Volvo FH (T-01)</strong> aguarda revisão de freio e óleo. O tempo médio de parada está em 38 minutos.
            </p>

            <button
              onClick={() => setActiveTab('oficina')}
              className="w-full py-2 bg-[#17233f] hover:bg-[#1f2f54] text-cyan-300 font-bold text-xs rounded-xl border border-cyan-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Gerenciar Oficina &amp; Peças</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card: Technological Advantage & R&D */}
          <div className="bg-[#0e1628] rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Pesquisa &amp; Tecnologia
                </h3>
              </div>
              <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                Em Andamento
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Telemetria Preditiva IoT</span>
                <span className="text-sky-300 font-mono text-[11px]">65%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-sky-400 h-full rounded-full transition-all duration-300" style={{ width: '65%' }} />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                Reduz o consumo de diesel em 8% e previne quebras em rodovias interestaduais.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('tecnologia')}
              className="w-full py-2 bg-[#17233f] hover:bg-[#1f2f54] text-sky-300 font-bold text-xs rounded-xl border border-sky-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Árvore Tecnológica</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card: Facilities & Depots */}
          <div className="bg-[#0e1628] rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Instalações &amp; Galpões
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {currentAct.hqName}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O pátio comporta <strong className="text-white">{currentAct.hqVehicleSlots} veículos</strong> e equipe de <strong className="text-white">{currentAct.hqStaffSlots} profissionais</strong>.
            </p>

            <button
              onClick={() => setActiveTab('instalacoes')}
              className="w-full py-2 bg-[#17233f] hover:bg-[#1f2f54] text-emerald-300 font-bold text-xs rounded-xl border border-emerald-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Ver Instalações da Sede</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
