import React from 'react';
import {
  FlaskConical,
  Lightbulb,
  TrendingUp,
  Wrench,
  Bot,
  Users,
  BarChart2,
  FileText,
  Route,
  Radio,
  Truck,
  CheckCircle2,
  Clock,
  Lock,
  X,
  Play,
  Trash2,
  GripVertical,
  Check,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const TecnologiaView: React.FC = () => {
  const {
    techNodes,
    selectedTechId,
    setSelectedTechId,
    researchQueue,
    activeResearchProgress,
    startResearch,
    cancelResearch,
    clearQueue,
    showToast,
  } = useGame();

  const selectedTech = techNodes.find((t) => t.id === selectedTechId) || techNodes[1];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">● Concluída</span>;
      case 'researching':
        return <span className="text-[10px] font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/40 animate-pulse flex items-center gap-1">● Em pesquisa</span>;
      case 'available':
        return <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 flex items-center gap-1">● Disponível</span>;
      default:
        return <span className="text-[10px] font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1">● Bloqueada</span>;
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Route': return <Route className="w-5 h-5 text-cyan-400" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'Radio': return <Radio className="w-5 h-5 text-emerald-400" />;
      case 'Truck': return <Truck className="w-5 h-5 text-cyan-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-sky-400" />;
      case 'Users': return <Users className="w-5 h-5 text-indigo-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-amber-400" />;
      case 'BarChart2': return <BarChart2 className="w-5 h-5 text-emerald-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-purple-400" />;
      default: return <FlaskConical className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] text-white p-6 shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0a1630] rounded-[10px] flex items-center justify-center">
                <FlaskConical className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                TECNOLOGIA &amp; PESQUISA
              </h1>
              <p className="text-xs text-cyan-200/80 mt-0.5 max-w-xl font-normal">
                Inovação hoje. Um transporte melhor amanhã.
              </p>
            </div>
          </div>

          {/* Slogan */}
          <div className="hidden xl:flex flex-col text-right">
            <span className="text-[12px] font-serif italic text-cyan-200">
              &ldquo;Tecnologia conecta distâncias e pessoas.&rdquo;
            </span>
            <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-bold">
              Barravento Logistics
            </span>
          </div>

          {/* Right Metrics Cards */}
          <div className="flex items-center gap-3">
            {/* Pontos de Pesquisa */}
            <div className="bg-[#0b1736]/90 border border-purple-500/30 rounded-xl p-2.5 flex items-center gap-2.5 min-w-[140px] shadow-inner">
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block leading-tight">Pontos de Pesquisa</span>
                <span className="text-base font-extrabold text-white font-mono leading-none">1.240</span>
                <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">+28 por dia</span>
              </div>
            </div>

            {/* Nível de Inovação */}
            <div className="bg-[#0b1736]/90 border border-amber-500/30 rounded-xl p-2.5 flex items-center gap-2.5 min-w-[130px] shadow-inner">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-slate-400 block leading-tight">Nível de Inovação</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-base font-extrabold text-amber-300">3</span>
                  <span className="text-[10px] text-slate-300 font-medium">Inovador</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full w-2/3" />
                </div>
              </div>
            </div>

            {/* Bônus de Eficiência */}
            <div className="bg-[#0b1736]/90 border border-emerald-500/30 rounded-xl p-2.5 flex items-center gap-2.5 min-w-[130px] shadow-inner">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block leading-tight">Bônus de Eficiência</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono leading-none">+12%</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">em toda a operação</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Tech Tree Layout (Left: Interactive Visual Graph, Right: Selected Tech Detail) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Left Tech Tree Canvas (Spans 2 or 3 cols) */}
        <div className="lg:col-span-2 xl:col-span-3 bg-[#0a142c] rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Header & Status Legends */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10 border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                Árvore Tecnológica
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Pesquise, desbloqueie e transforme seu negócio.
              </p>
            </div>

            {/* Status Legend */}
            <div className="flex items-center gap-3 text-[11px] font-medium flex-wrap">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Pesquisa concluída
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" /> Em pesquisa
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Disponível
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" /> Bloqueada
              </span>
            </div>
          </div>

          {/* Interactive Tech Tree Graph Canvas */}
          <div className="relative py-4 px-2 min-h-[340px] flex flex-col justify-around">
            {/* SVG Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-700/60" strokeWidth="2">
              {/* Branch 1 Connections */}
              <line x1="22%" y1="28%" x2="38%" y2="28%" stroke="#0284c7" strokeDasharray="4 2" />
              <line x1="48%" y1="28%" x2="58%" y2="28%" stroke="#334155" />
              <line x1="68%" y1="28%" x2="76%" y2="28%" stroke="#334155" />
              <line x1="86%" y1="28%" x2="91%" y2="50%" stroke="#334155" />

              {/* Branch 2 Connections */}
              <line x1="22%" y1="72%" x2="38%" y2="72%" stroke="#10b981" />
              <line x1="48%" y1="72%" x2="58%" y2="72%" stroke="#334155" />
              <line x1="68%" y1="72%" x2="76%" y2="72%" stroke="#334155" />
              <line x1="86%" y1="72%" x2="91%" y2="50%" stroke="#334155" />
            </svg>

            {/* Row 1: Operations & Fleet Branch */}
            <div className="relative z-10 flex items-center justify-between gap-4">
              {/* Node: Roteirização Avançada */}
              <button
                onClick={() => setSelectedTechId('roteirizacao')}
                className={`w-[190px] p-3 rounded-xl border text-left transition-all ${
                  selectedTechId === 'roteirizacao'
                    ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-500/50 shadow-lg'
                    : 'bg-[#0e1c3e] border-emerald-500/50 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Route className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white leading-tight">Roteirização Avançada</h3>
                    <span className="text-[10px] text-emerald-400 font-mono">Nv. 1 ●●○</span>
                  </div>
                </div>
              </button>

              {/* Node: Manutenção Preditiva */}
              <button
                onClick={() => setSelectedTechId('manutencao_preditiva')}
                className={`w-[200px] p-3 rounded-xl border text-left transition-all ${
                  selectedTechId === 'manutencao_preditiva'
                    ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-500/50 shadow-xl'
                    : 'bg-[#0e1c3e] border-amber-500/60 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white leading-tight">Manutenção Preditiva</h3>
                    <span className="text-[10px] text-amber-400 font-mono">Nv. 1 ●●○</span>
                  </div>
                </div>
              </button>

              {/* Node: CRM Avançado */}
              <button
                onClick={() => setSelectedTechId('crm_avancado')}
                className={`w-[190px] p-3 rounded-xl border text-left opacity-70 hover:opacity-100 transition-all ${
                  selectedTechId === 'crm_avancado'
                    ? 'bg-slate-900 border-sky-400 ring-2 ring-sky-500/50'
                    : 'bg-[#0c1630] border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-300 leading-tight">CRM Avançado</h3>
                    <span className="text-[10px] text-slate-500 font-mono">Nv. 0 ○○○</span>
                  </div>
                </div>
              </button>

              {/* Node: Análise Financeira */}
              <button
                onClick={() => setSelectedTechId('analise_financeira')}
                className={`w-[190px] p-3 rounded-xl border text-left opacity-70 hover:opacity-100 transition-all ${
                  selectedTechId === 'analise_financeira'
                    ? 'bg-slate-900 border-sky-400 ring-2 ring-sky-500/50'
                    : 'bg-[#0c1630] border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-300 leading-tight">Análise Financeira</h3>
                    <span className="text-[10px] text-slate-500 font-mono">Nv. 0 ○○○</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Row 2: Warehouse & Automation Branch */}
            <div className="relative z-10 flex items-center justify-between gap-4 mt-6">
              {/* Node: Telemetria & Rastreamento */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedTechId('telemetria')}
                  className={`w-[190px] p-2.5 rounded-xl border text-left transition-all ${
                    selectedTechId === 'telemetria'
                      ? 'bg-emerald-950/40 border-emerald-400'
                      : 'bg-[#0e1c3e] border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Radio className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white leading-tight">Telemetria</h3>
                      <span className="text-[10px] text-emerald-400 font-mono">Nv. 1 ●●○</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedTechId('rastreamento')}
                  className={`w-[190px] p-2.5 rounded-xl border text-left transition-all ${
                    selectedTechId === 'rastreamento'
                      ? 'bg-emerald-950/40 border-emerald-400'
                      : 'bg-[#0e1c3e] border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white leading-tight">Rastreamento Tempo Real</h3>
                      <span className="text-[10px] text-emerald-400 font-mono">Nv. 1 ●●○</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Node: Automação de Armazém */}
              <button
                onClick={() => setSelectedTechId('automacao_armazem')}
                className={`w-[200px] p-3 rounded-xl border text-left transition-all ${
                  selectedTechId === 'automacao_armazem'
                    ? 'bg-sky-950/40 border-sky-400 ring-2 ring-sky-500/50'
                    : 'bg-[#0e1c3e] border-sky-500/60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white leading-tight">Automação de Armazém</h3>
                    <span className="text-[10px] text-sky-400 font-mono">Nv. 1 ●●○</span>
                  </div>
                </div>
              </button>

              {/* Node: Contratos Premium */}
              <button
                onClick={() => setSelectedTechId('contratos_premium')}
                className={`w-[190px] p-3 rounded-xl border text-left opacity-70 hover:opacity-100 transition-all ${
                  selectedTechId === 'contratos_premium'
                    ? 'bg-slate-900 border-sky-400'
                    : 'bg-[#0c1630] border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-300 leading-tight">Contratos Premium</h3>
                    <span className="text-[10px] text-slate-500 font-mono">Nv. 0 ○○○</span>
                  </div>
                </div>
              </button>

              {/* Node: Previsão de Demanda */}
              <button
                onClick={() => setSelectedTechId('previsao_demanda')}
                className={`w-[190px] p-3 rounded-xl border text-left opacity-70 hover:opacity-100 transition-all ${
                  selectedTechId === 'previsao_demanda'
                    ? 'bg-slate-900 border-sky-400'
                    : 'bg-[#0c1630] border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-300 leading-tight">Previsão de Demanda</h3>
                    <span className="text-[10px] text-slate-500 font-mono">Nv. 0 ○○○</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Details Panel (Faithful to Screenshot 2) */}
        <div className="bg-[#0b1736] rounded-2xl p-4 border border-cyan-500/20 shadow-xl flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white leading-tight">
                    {selectedTech.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-slate-300">
                      Nível {selectedTech.level} → {Math.min(selectedTech.maxLevel, selectedTech.level + 1)}
                    </span>
                    {getStatusBadge(selectedTech.status)}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              {selectedTech.description}
            </p>

            {/* Benefícios */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-200 mb-2">Benefícios</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedTech.benefits.map((b, idx) => (
                  <div key={idx} className="bg-[#0e1d42] border border-slate-800 rounded-lg p-2.5">
                    <span className="text-sm font-extrabold text-emerald-400 block font-mono">
                      {b.value}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 leading-tight">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desbloqueia */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-200 mb-2">Desbloqueia</h4>
              <div className="space-y-1.5 text-xs text-slate-300">
                {selectedTech.unlocks.map((u, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#0e1d42]/70 px-2.5 py-1.5 rounded-lg border border-slate-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-[11px]">{u}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action / Quote at bottom */}
          <div className="pt-4 border-t border-slate-800 mt-4">
            {selectedTech.status === 'available' ? (
              <button
                onClick={() => startResearch(selectedTech.id)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-colors"
              >
                <Play className="w-4 h-4 fill-white" />
                Iniciar Pesquisa ({selectedTech.cost} Pontos)
              </button>
            ) : selectedTech.status === 'completed' ? (
              <div className="text-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" /> Pesquisa Dominada
              </div>
            ) : null}

            <p className="text-[10px] text-slate-500 font-serif italic text-center mt-3">
              &ldquo;Veículos que rodam mais. Negócios que vão mais longe.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* 3. Bottom Panels: Pesquisa Atual + Próximas da Fila */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pesquisa Atual Card */}
        <div className="bg-[#0b1736] rounded-2xl p-4 border border-cyan-500/30 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-white tracking-wide">Pesquisa Atual</h3>
            <span className="text-[10px] font-bold text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-500/40 animate-pulse">
              Em pesquisa
            </span>
          </div>

          <div className="flex items-start gap-3 my-2">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-extrabold text-white">Manutenção Preditiva</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Usa dados dos veículos para prever falhas e reduzir paradas não planejadas.
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="my-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">Progresso</span>
              <span className="font-extrabold font-mono text-cyan-400">{activeResearchProgress}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-sm shadow-cyan-400"
                style={{ width: `${activeResearchProgress}%` }}
              />
            </div>
          </div>

          {/* Bottom details & Cancel button */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="flex items-center gap-1.5 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>1 dia e 8 horas</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <FlaskConical className="w-3.5 h-3.5 text-purple-400" />
                <span className="font-mono">1.200 pontos</span>
              </div>
            </div>

            <button
              onClick={cancelResearch}
              className="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1 hover:bg-rose-950/40 px-2 py-1 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Cancelar Pesquisa
            </button>
          </div>
        </div>

        {/* Próximas da Fila */}
        <div className="bg-[#0b1736] rounded-2xl p-4 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-white tracking-wide">Próximas da Fila</h3>
            <button
              onClick={clearQueue}
              className="text-[10px] text-slate-400 hover:text-rose-400 font-semibold flex items-center gap-1 hover:bg-slate-800 px-2 py-0.5 rounded transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Limpar Fila
            </button>
          </div>

          <div className="space-y-2 my-1">
            {researchQueue.length > 0 ? (
              researchQueue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#0e1e44] border border-slate-800/80 rounded-xl px-3 py-2 text-xs hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <GripVertical className="w-4 h-4 text-slate-600 cursor-grab" />
                    <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                      {getIcon(item.icon)}
                    </div>
                    <span className="font-semibold text-slate-200">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" /> {item.durationDays} dias
                    </span>
                    <span className="flex items-center gap-1 text-purple-300">
                      <FlaskConical className="w-3 h-3 text-purple-400" /> {item.cost.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-slate-500 text-xs">
                Fila de pesquisas vazia. Clique em uma tecnologia disponível para enfileirar.
              </div>
            )}
          </div>

          <div className="pt-2 text-right">
            <span className="text-[10px] text-cyan-400 font-mono">
              Total na fila: {researchQueue.length} tecnologias
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
