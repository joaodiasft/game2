import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Truck,
  DollarSign,
  Star,
  Warehouse,
  ChevronRight,
  FileText,
  FileSpreadsheet,
  Download,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const RelatoriosView: React.FC = () => {
  const { showToast } = useGame();
  const [activeSubTab, setActiveSubTab] = useState('Visão Geral');
  const [selectedPeriod, setSelectedPeriod] = useState('30 dias');
  const [reportType, setReportType] = useState('Resumo Executivo');
  const [reportFormat, setReportFormat] = useState<'pdf' | 'csv'>('pdf');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);

  const subTabs = ['Visão Geral', 'Operações', 'Frota', 'Clientes', 'Armazéns', 'Financeiro'];

  // 14 day line data for Receita vs Lucro
  const revenueData = [
    { date: '15 Mar', rec: 15, luc: 4.2 },
    { date: '19 Mar', rec: 18, luc: 5.1 },
    { date: '23 Mar', rec: 16, luc: 4.8 },
    { date: '27 Mar', rec: 22, luc: 6.5 },
    { date: '31 Mar', rec: 25, luc: 7.2 },
    { date: '04 Abr', rec: 24, luc: 6.9 },
    { date: '08 Abr', rec: 27, luc: 7.8 },
    { date: '12 Abr', rec: 26, luc: 7.5 },
    { date: '14 Abr', rec: 28.45, luc: 8.32 },
  ];

  // Delivery stacked bars
  const deliveryData = [
    { date: '15 Mar', onTime: 95, delayed: 15, cancelled: 4 },
    { date: '19 Mar', onTime: 110, delayed: 20, cancelled: 5 },
    { date: '23 Mar', onTime: 125, delayed: 18, cancelled: 3 },
    { date: '27 Mar', onTime: 140, delayed: 22, cancelled: 6 },
    { date: '31 Mar', onTime: 135, delayed: 19, cancelled: 4 },
    { date: '04 Abr', onTime: 150, delayed: 25, cancelled: 5 },
    { date: '08 Abr', onTime: 145, delayed: 21, cancelled: 3 },
    { date: '12 Abr', onTime: 160, delayed: 24, cancelled: 7 },
  ];

  const topRoutes = [
    { rank: 1, route: 'Rivermouth → Eastvale', profit: '$ 4.620', percent: 94 },
    { rank: 2, route: 'City Center → Northside', profit: '$ 3.980', percent: 82 },
    { rank: 3, route: 'Riverside → Westbridge', profit: '$ 3.450', percent: 70 },
    { rank: 4, route: 'Port Terminal → Lakeside', profit: '$ 2.880', percent: 58 },
    { rank: 5, route: 'Southgate → Industrial Park', profit: '$ 2.410', percent: 48 },
  ];

  const handleExport = () => {
    showToast(`Gerando ${reportType} no formato .${reportFormat.toUpperCase()}...`);
    setTimeout(() => {
      showToast(`Relatório pronto e baixado com sucesso!`);
    }, 1200);
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0f244a] via-[#16366b] to-[#1e488f] text-white p-5 shadow-lg border border-blue-900/30">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0e2144] rounded-[10px] flex items-center justify-center">
                <BarChart2 className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                Relatórios &amp; Analytics
              </h1>
              <p className="text-xs text-blue-200 mt-0.5 max-w-xl font-normal">
                Transforme dados em decisões. Uma operação mais inteligente, um futuro maior.
              </p>
            </div>
          </div>

          {/* Depot Banner Callout */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[11px] font-serif italic text-cyan-200">
                &ldquo;Dados movem decisões. Decisões movem o mundo.&rdquo;
              </span>
              <span className="text-[9px] uppercase tracking-widest text-blue-300 font-bold">
                Barravento Logistics
              </span>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-semibold hover:bg-slate-900/60 cursor-pointer transition-colors shadow-sm">
              <span>De hoje para grandes conquistas.</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-tabs bar */}
      <div className="bg-white rounded-xl p-1.5 shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeSubTab === tab
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Date period filters */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
            <span className="text-slate-400">Período:</span>
            <select
              className="bg-transparent font-semibold text-slate-800 outline-none cursor-pointer"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="7 dias">Últimos 7 dias</option>
              <option value="30 dias">Últimos 30 dias</option>
              <option value="3 meses">Últimos 3 meses</option>
              <option value="1 ano">Último 1 ano</option>
            </select>
            <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1" />
            <span className="text-slate-500 text-[11px] font-mono">15 Mar 2025 – 14 Abr 2025</span>
          </div>

          <div className="hidden xl:flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
            {['7 dias', '30 dias', '3 meses', '1 ano', 'Personalizado'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Top 6 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* KPI 1 */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Entregas no Prazo</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900 tabular-nums">92%</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                ▲ +6%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">1.248 / 1.356 entregas</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Custo por KM</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900 tabular-nums font-mono">$ 0,32</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                ▼ -12%
              </span>
            </div>
            <span className="text-[10px] text-slate-400">vs. período anterior</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Lucro por Rota</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900 tabular-nums font-mono">$ 1.240</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                ▲ +18%
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Média por rota</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Ocupação da Frota</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900 tabular-nums">78%</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                ▲ +9%
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Veículos em operação</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-sky-600" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Satisfação do Cliente</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900 tabular-nums">4,7 / 5</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                ▲ +0,4
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Baseado em 328 avaliações</span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Warehouse className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Produtividade Armazém</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900 tabular-nums">86%</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                ▲ +11%
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Eficiência operacional</span>
          </div>
        </div>
      </div>

      {/* 4. Main Analytics Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Left 3 Columns: Charts & Dashboards */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-4">
          {/* Row 1: Receita vs Lucro + Custos Operacionais + Top 5 Rotas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Chart: Receita vs. Lucro */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900">Receita vs. Lucro</h3>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  Últimos 30 dias
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px] mb-2 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Receita
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Lucro
                </span>
              </div>

              {/* SVG Line Chart */}
              <div className="relative h-44 w-full">
                <svg viewBox="0 0 300 150" className="w-full h-full overflow-visible">
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="300" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="70" x2="300" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="110" x2="300" y2="110" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Receita line (blue) */}
                  <path
                    d="M 10 110 Q 40 95 80 100 T 150 70 T 220 50 T 290 35"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Lucro line (emerald) */}
                  <path
                    d="M 10 135 Q 40 128 80 130 T 150 115 T 220 100 T 290 90"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Points */}
                  {revenueData.map((d, i) => {
                    const x = 15 + i * 34;
                    const yRec = 140 - (d.rec / 30) * 110;
                    const yLuc = 140 - (d.luc / 30) * 110;
                    return (
                      <g key={d.date} onMouseEnter={() => setHoveredDataPoint(i)} className="cursor-pointer">
                        <circle cx={x} cy={yRec} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                        <circle cx={x} cy={yLuc} r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                      </g>
                    );
                  })}
                </svg>

                {/* Simulated Floating Tooltip as seen in screenshot */}
                <div className="absolute right-2 top-2 bg-[#0c1633] text-white p-2.5 rounded-lg shadow-xl text-[10px] border border-cyan-500/30 pointer-events-none">
                  <div className="font-bold text-slate-300 border-b border-slate-700/60 pb-1 mb-1">
                    14 Abr 2025
                  </div>
                  <div className="flex items-center justify-between gap-3 text-cyan-400 font-mono">
                    <span>Receita:</span>
                    <span className="font-bold text-white">$ 28.450</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-emerald-400 font-mono">
                    <span>Lucro:</span>
                    <span className="font-bold text-white">$ 8.320</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>Mar 15</span>
                <span>Mar 23</span>
                <span>Mar 31</span>
                <span>Abr 8</span>
                <span>Abr 14</span>
              </div>
            </div>

            {/* Chart: Distribuição de Custos Operacionais */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-bold text-slate-900">Distribuição de Custos Operacionais</h3>
              </div>

              {/* Donut Chart representation */}
              <div className="flex items-center justify-center relative my-2">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    {/* Circle slices */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="5" strokeDasharray="32 68" strokeDashoffset="0" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="5" strokeDasharray="18 82" strokeDashoffset="-32" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="16 84" strokeDashoffset="-50" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="5" strokeDasharray="12 88" strokeDashoffset="-66" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="5" strokeDasharray="8 92" strokeDashoffset="-78" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#94a3b8" strokeWidth="5" strokeDasharray="14 86" strokeDashoffset="-86" />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-slate-400 font-medium leading-none">Total</span>
                    <span className="text-xs font-extrabold text-slate-900 font-mono mt-0.5">$ 42.360</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Combustível
                  </span>
                  <span className="font-bold text-slate-900">32%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Manutenção
                  </span>
                  <span className="font-bold text-slate-900">18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Salários
                  </span>
                  <span className="font-bold text-slate-900">16%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Pedágios
                  </span>
                  <span className="font-bold text-slate-900">12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> Seguros
                  </span>
                  <span className="font-bold text-slate-900">8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-slate-400" /> Outros
                  </span>
                  <span className="font-bold text-slate-900">14%</span>
                </div>
              </div>
            </div>

            {/* List: Top 5 Rotas por Lucro */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900">Top 5 Rotas por Lucro</h3>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">
                  Lucro ▾
                </span>
              </div>

              <div className="space-y-2.5">
                {topRoutes.map((r) => (
                  <div key={r.rank} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                          {r.rank}
                        </span>
                        <span className="font-medium text-slate-800 text-[11px] truncate max-w-[140px]">
                          {r.route}
                        </span>
                      </div>
                      <span className="font-bold font-mono text-slate-900 text-xs">{r.profit}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${r.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-right">
                <span className="text-[10px] text-blue-600 font-semibold hover:underline cursor-pointer">
                  Ver todas as rotas →
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: Desempenho de Entregas + Utilização da Frota + Satisfação Clientes */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Desempenho de Entregas */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900">Desempenho de Entregas</h3>
                <span className="text-[10px] text-slate-500">Últimos 30 dias</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] mb-2 font-medium">
                <span className="flex items-center gap-1 text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> No Prazo
                </span>
                <span className="flex items-center gap-1 text-amber-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Com Atraso
                </span>
                <span className="flex items-center gap-1 text-rose-600">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Canceladas
                </span>
              </div>

              {/* Stacked bar visualization */}
              <div className="h-32 flex items-end justify-between gap-2 pt-2 border-b border-slate-100">
                {deliveryData.map((d) => (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end group">
                    <div
                      className="w-full bg-rose-500 rounded-t-sm"
                      style={{ height: `${(d.cancelled / 180) * 100}%` }}
                      title={`Canceladas: ${d.cancelled}`}
                    />
                    <div
                      className="w-full bg-amber-500"
                      style={{ height: `${(d.delayed / 180) * 100}%` }}
                      title={`Com Atraso: ${d.delayed}`}
                    />
                    <div
                      className="w-full bg-emerald-500 rounded-b-sm"
                      style={{ height: `${(d.onTime / 180) * 100}%` }}
                      title={`No Prazo: ${d.onTime}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>Mar 15</span>
                <span>Mar 27</span>
                <span>Abr 8</span>
                <span>Abr 12</span>
              </div>
            </div>

            {/* Utilização da Frota */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900">Utilização da Frota</h3>
              </div>

              <div className="flex items-center justify-between gap-4 my-1">
                {/* Radial Gauge */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="4"
                      strokeDasharray="78 22"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center flex flex-col items-center">
                    <span className="text-xl font-extrabold text-slate-900 font-mono">78%</span>
                    <span className="text-[9px] text-slate-400 font-medium">22 / 28 ativos</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Em Operação
                    </span>
                    <span className="font-bold text-slate-900 font-mono">22</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500" /> Em Manutenção
                    </span>
                    <span className="font-bold text-slate-900 font-mono">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Ociosos
                    </span>
                    <span className="font-bold text-slate-900 font-mono">3</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-2 flex items-center gap-2 text-emerald-800 text-[10px]">
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>+9%</strong> vs. período anterior: Maior utilização resulta em mais oportunidades.
                </span>
              </div>
            </div>

            {/* Satisfação dos Clientes */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-bold text-slate-900">Satisfação dos Clientes</h3>
                <span className="text-[10px] text-slate-500">Últimos 30 dias</span>
              </div>

              <div className="flex items-center gap-3 my-1">
                <div>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">4,7</span>
                  <span className="text-sm font-semibold text-slate-400">/ 5</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-emerald-600">▲ +0,4</span>
                  <span className="text-[9px] text-slate-400">328 avaliações</span>
                </div>
              </div>

              {/* 5 star ratings bars */}
              <div className="space-y-1 text-[10px]">
                {[
                  { star: '5 estrelas', pct: 68, color: 'bg-emerald-500' },
                  { star: '4 estrelas', pct: 22, color: 'bg-blue-500' },
                  { star: '3 estrelas', pct: 7, color: 'bg-amber-500' },
                  { star: '2 estrelas', pct: 2, color: 'bg-rose-500' },
                  { star: '1 estrela', pct: 1, color: 'bg-slate-400' },
                ].map((s) => (
                  <div key={s.star} className="flex items-center gap-2">
                    <span className="w-14 text-slate-500 truncate">{s.star}</span>
                    <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`${s.color} h-full rounded-full`} style={{ width: `${s.pct}%` }} />
                    </div>
                    <span className="w-6 text-right font-mono text-slate-700">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Crescimento do Negócio + Desempenho por Segmento + Produtividade dos Armazéns */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Crescimento do Negócio */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-900">Crescimento do Negócio</h3>
                <span className="text-[10px] text-slate-500">Últimos 12 meses</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] text-emerald-700 font-semibold block">Receita</span>
                  <span className="text-sm font-extrabold text-emerald-800 font-mono">+64%</span>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                  <span className="text-[10px] text-blue-700 font-semibold block">Entregas</span>
                  <span className="text-sm font-extrabold text-blue-800 font-mono">+52%</span>
                </div>
                <div className="p-2 rounded-lg bg-purple-50 border border-purple-100">
                  <span className="text-[10px] text-purple-700 font-semibold block">Clientes</span>
                  <span className="text-sm font-extrabold text-purple-800 font-mono">+48%</span>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
                  <span className="text-[10px] text-amber-700 font-semibold block">Frota</span>
                  <span className="text-sm font-extrabold text-amber-800 font-mono">+33%</span>
                </div>
              </div>
            </div>

            {/* Desempenho por Segmento */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900">Desempenho por Segmento</h3>
              </div>
              <div className="space-y-1.5 text-[11px]">
                {[
                  { name: 'Comércio', pct: 35 },
                  { name: 'Indústria', pct: 28 },
                  { name: 'E-commerce', pct: 20 },
                  { name: 'Construção', pct: 12 },
                  { name: 'Outros', pct: 5 },
                ].map((seg) => (
                  <div key={seg.name} className="flex items-center gap-2">
                    <span className="w-20 text-slate-600 font-medium truncate">{seg.name}</span>
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${seg.pct}%` }} />
                    </div>
                    <span className="w-8 text-right font-mono font-bold text-slate-800">{seg.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Produtividade dos Armazéns */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900">Produtividade dos Armazéns</h3>
                <span className="text-[10px] text-slate-500">Últimos 30 dias</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Warehouse className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-extrabold text-slate-900 font-mono">86%</span>
                    <span className="text-[11px] font-bold text-emerald-600">▲ +11%</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Eficiência operacional</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-[10px]">
                <div>
                  <span className="text-slate-400 block">Itens movimentados</span>
                  <span className="font-bold text-slate-800 font-mono">2.450 itens</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Precisão no picking</span>
                  <span className="font-bold text-slate-800 font-mono">98% acurácia</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tempo médio (carga)</span>
                  <span className="font-bold text-slate-800 font-mono">1,8 horas</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Docas ativas</span>
                  <span className="font-bold text-slate-800 font-mono">10 / 16 docas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Rail: Gerar Relatório + Comparar Períodos + Insights */}
        <div className="space-y-4">
          {/* Gerar Relatório Box */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Gerar Relatório</h3>
                <span className="text-[10px] text-slate-500">Exporte seus dados e compartilhe resultados.</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Tipo de Relatório</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Resumo Executivo">Resumo Executivo</option>
                  <option value="Desempenho da Frota">Desempenho da Frota</option>
                  <option value="Auditoria Financeira">Auditoria Financeira</option>
                  <option value="Operações de Armazém">Operações de Armazém</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Formato</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setReportFormat('pdf')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold border transition-colors ${
                      reportFormat === 'pdf'
                        ? 'bg-rose-50 border-rose-500 text-rose-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" /> PDF
                  </button>
                  <button
                    onClick={() => setReportFormat('csv')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold border transition-colors ${
                      reportFormat === 'csv'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" /> CSV
                  </button>
                </div>
              </div>

              <button
                onClick={handleExport}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Gerar Relatório
              </button>
            </div>
          </div>

          {/* Comparar Períodos */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-900 mb-1">Comparar Períodos</h3>
            <p className="text-[10px] text-slate-500 mb-3">Analise a evolução contínua do seu negócio.</p>

            <div className="flex items-center gap-2 text-xs mb-3">
              <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-semibold text-[11px]">
                Últimos 30 dias
              </span>
              <span className="text-slate-400 font-bold">vs</span>
              <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-semibold text-[11px]">
                Período anterior
              </span>
            </div>

            <button
              onClick={() => showToast('Comparação de períodos calculada!')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Comparar
            </button>
          </div>

          {/* Insights Recentes */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Insights Recentes
              </h3>
              <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Ver Todos</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 text-[11px] leading-tight">
                    Lucro aumentou 18% nas rotas da região leste.
                  </p>
                  <span className="text-[10px] text-slate-400">há 2h</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 text-[11px] leading-tight">
                    Entregas no prazo acima de 90% pelo 5º dia consecutivo.
                  </p>
                  <span className="text-[10px] text-slate-400">há 5h</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 text-[11px] leading-tight">
                    Produtividade do armazém +11% após nova escala de turnos.
                  </p>
                  <span className="text-[10px] text-slate-400">há 1 dia</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 text-[11px] leading-tight">
                    Satisfação do cliente em alta: +0,4 no período avaliado.
                  </p>
                  <span className="text-[10px] text-slate-400">há 1 dia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
