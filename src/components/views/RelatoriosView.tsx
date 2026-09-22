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
  Activity,
  CheckCircle2,
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
    { rank: 1, route: 'São Paulo → Rio de Janeiro', profit: 'R$ 24.620', percent: 94 },
    { rank: 2, route: 'Campinas → Curitiba', profit: 'R$ 19.980', percent: 82 },
    { rank: 3, route: 'Belo Horizonte → Vitória', profit: 'R$ 15.450', percent: 70 },
    { rank: 4, route: 'Santos → Sorocaba', profit: 'R$ 12.880', percent: 58 },
    { rank: 5, route: 'Ribeirão Preto → Paulínia', profit: 'R$ 9.410', percent: 48 },
  ];

  const handleExport = () => {
    showToast(`Gerando ${reportType} no formato .${reportFormat.toUpperCase()}...`);
    setTimeout(() => {
      showToast(`Relatório pronto e baixado com sucesso!`);
    }, 1200);
  };

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] border border-slate-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  Business Intelligence &amp; Analytics
                </h1>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">
                  SLA 92.4%
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Métricas operacionais consolidadas, rentabilidade por rota e auditoria executiva de desempenho
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" /> Exportar BI
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sub-tabs bar */}
      <div className="bg-[#0e1628] rounded-xl p-2 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Date period filters */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-[#091122] px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <select
              className="bg-transparent font-semibold text-white outline-none cursor-pointer"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="7 dias" className="bg-[#0e1628] text-white">Últimos 7 dias</option>
              <option value="30 dias" className="bg-[#0e1628] text-white">Últimos 30 dias</option>
              <option value="3 meses" className="bg-[#0e1628] text-white">Últimos 3 meses</option>
              <option value="1 ano" className="bg-[#0e1628] text-white">Último 1 ano</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Top 6 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Entregas no Prazo</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-black text-white font-mono">92%</span>
            <span className="text-[11px] font-bold text-emerald-400">▲ +6%</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">1.248 / 1.356 viagens</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Custo por KM</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-black text-white font-mono">R$ 3,24</span>
            <span className="text-[11px] font-bold text-emerald-400">▼ -12%</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Diesel otimizado</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Lucro Médio Rota</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-black text-white font-mono">R$ 1.240</span>
            <span className="text-[11px] font-bold text-emerald-400">▲ +18%</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Por carregamento</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Ocupação da Frota</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-black text-white font-mono">78%</span>
            <span className="text-[11px] font-bold text-cyan-400">▲ +9%</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">22 de 28 ativas</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">NPS Clientes</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-black text-amber-400 font-mono">4,7 / 5</span>
            <span className="text-[11px] font-bold text-emerald-400">★ 94%</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">328 avaliações</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Acurácia Armazém</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-black text-emerald-400 font-mono">98.2%</span>
            <span className="text-[11px] font-bold text-emerald-400">▲ +2%</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Picking sem erro</span>
        </div>
      </div>

      {/* 4. Main Analytics Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Charts & Dashboards (Col 8) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Chart: Receita vs. Lucro */}
          <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">Curva de Faturamento vs. Lucro Líquido</h3>
                <p className="text-[11px] text-slate-400">Evolução diária auditada em milhares de Reais</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Receita Bruta
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Lucro Líquido
                </span>
              </div>
            </div>

            {/* SVG Line Chart */}
            <div className="relative h-48 w-full bg-[#091122] rounded-xl p-4 border border-slate-800/80">
              <svg viewBox="0 0 300 130" className="w-full h-full overflow-visible">
                {/* Grid lines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="300" y2="60" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="300" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

                {/* Receita line (cyan) */}
                <path
                  d="M 10 95 Q 40 85 80 90 T 150 55 T 220 35 T 290 20"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Lucro line (emerald) */}
                <path
                  d="M 10 115 Q 40 110 80 112 T 150 95 T 220 80 T 290 65"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Points */}
                {revenueData.map((d, i) => {
                  const x = 15 + i * 34;
                  const yRec = 120 - (d.rec / 30) * 95;
                  const yLuc = 120 - (d.luc / 30) * 95;
                  return (
                    <g key={d.date} onMouseEnter={() => setHoveredDataPoint(i)} className="cursor-pointer">
                      <circle cx={x} cy={yRec} r="4" fill="#38bdf8" stroke="#0e1628" strokeWidth="2" />
                      <circle cx={x} cy={yLuc} r="4" fill="#34d399" stroke="#0e1628" strokeWidth="2" />
                    </g>
                  );
                })}
              </svg>

              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
                <span>15 Mar</span>
                <span>23 Mar</span>
                <span>31 Mar</span>
                <span>08 Abr</span>
                <span>14 Abr</span>
              </div>
            </div>
          </div>

          {/* Grid: Top 5 Rotas + Entregas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Top 5 Rotas */}
            <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
              <h3 className="text-sm font-extrabold text-white">Top 5 Rotas por Lucro</h3>
              <div className="space-y-3">
                {topRoutes.map((r) => (
                  <div key={r.rank} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-slate-800 text-cyan-400 font-bold text-[10px] flex items-center justify-center font-mono">
                          0{r.rank}
                        </span>
                        <span className="font-semibold text-white text-[11px] truncate max-w-[150px]">
                          {r.route}
                        </span>
                      </div>
                      <span className="font-bold font-mono text-emerald-400 text-xs">{r.profit}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${r.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desempenho de Entregas */}
            <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white">Entregas no Prazo</h3>
                <span className="text-xs text-emerald-400 font-mono font-bold">92.4% no prazo</span>
              </div>
              <div className="h-32 flex items-end justify-between gap-2 pt-2 border-b border-slate-800">
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
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>15 Mar</span>
                <span>27 Mar</span>
                <span>08 Abr</span>
                <span>12 Abr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Export & Strategic Insights (Col 4) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Gerar Relatório Box */}
          <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">Emissão de Relatório</h3>
                <span className="text-[10px] text-slate-400">Exportação para diretoria e auditoria</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Tipo de Relatório</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full bg-[#091122] border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-white outline-none focus:border-cyan-500"
                >
                  <option value="Resumo Executivo">Resumo Executivo Integrado</option>
                  <option value="Desempenho da Frota">Telemetria &amp; Frota</option>
                  <option value="Auditoria Financeira">DRE &amp; Auditoria Financeira</option>
                  <option value="Operações de Armazém">Armazém &amp; WMS</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Formato</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setReportFormat('pdf')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      reportFormat === 'pdf'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-[#091122] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" /> PDF
                  </button>
                  <button
                    onClick={() => setReportFormat('csv')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      reportFormat === 'csv'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-[#091122] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" /> Planilha CSV
                  </button>
                </div>
              </div>

              <button
                onClick={handleExport}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                Gerar e Baixar Relatório
              </button>
            </div>
          </div>

          {/* Insights Recentes */}
          <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Insights Estratégicos
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#091122] border border-slate-800/80">
                <span className="font-bold text-white block text-xs">Lucro +18% na Região Leste</span>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Abertura do armazém intermediário reduziu o tempo de espera dos motoristas.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#091122] border border-slate-800/80">
                <span className="font-bold text-white block text-xs">Acurácia de Picking em 98.2%</span>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Sistema de código de barras nas docas eliminou trocas de pacotes no transbordo.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#091122] border border-slate-800/80">
                <span className="font-bold text-white block text-xs">Consumo de Diesel em Queda (-12%)</span>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Roteirização por GPS evitou trechos com obras e engarrafamentos constantes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
