import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  Bed,
  Smile,
  TrendingUp,
  DollarSign,
  Briefcase,
  ChevronRight,
  Star,
  Award,
  BookOpen,
  PlusCircle,
  ArrowUpRight,
  TrendingDown,
  GraduationCap,
  Gift,
  AlertTriangle,
  Shuffle,
  Shield,
  PhoneCall,
  Search,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const RHView: React.FC = () => {
  const { candidates, employees, hireCandidate, openCandidateModal, trainingProgram, showToast } = useGame();
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('Todos');

  const departments = [
    { name: 'Motoristas', count: 12, color: 'bg-blue-600', icon: '🚚' },
    { name: 'Ajudantes', count: 6, color: 'bg-emerald-600', icon: '👷' },
    { name: 'Estoque', count: 5, color: 'bg-amber-600', icon: '📦' },
    { name: 'Oficina', count: 6, color: 'bg-rose-600', icon: '🔧' },
    { name: 'Despacho', count: 4, color: 'bg-purple-600', icon: '🎧' },
    { name: 'Comercial', count: 5, color: 'bg-sky-600', icon: '💼' },
    { name: 'Financeiro', count: 4, color: 'bg-yellow-600', icon: '💰' },
  ];

  const jobOpenings = [
    { title: 'Motorista Carreteiro', dept: 'Motoristas', salary: '$ 3.500', urgency: 'Alta', candidates: 8 },
    { title: 'Ajudante de Carga', dept: 'Ajudantes', salary: '$ 1.800', urgency: 'Média', candidates: 6 },
    { title: 'Mecânico', dept: 'Oficina', salary: '$ 3.200', urgency: 'Alta', candidates: 5 },
    { title: 'Analista Financeiro', dept: 'Financeiro', salary: '$ 4.000', urgency: 'Média', candidates: 4 },
    { title: 'Assistente Comercial', dept: 'Comercial', salary: '$ 2.500', urgency: 'Baixa', candidates: 3 },
  ];

  return (
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0d2144] via-[#143264] to-[#1c458a] text-white p-5 shadow-lg border border-blue-900/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0d1d3c] rounded-[10px] flex items-center justify-center">
                <Users className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                RH &amp; RECRUTAMENTO
              </h1>
              <p className="text-xs text-blue-200 mt-0.5 max-w-xl font-normal">
                Pessoas movem o mundo. Nós movemos com elas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[12px] font-serif italic text-cyan-200">
                &ldquo;Grandes equipes constroem grandes destinos.&rdquo;
              </span>
              <span className="text-[9px] uppercase tracking-widest text-blue-300 font-bold">
                Barravento Logistics
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top 6 KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Total de Funcionários */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Total Funcionários</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">42</span>
            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">+4 este mês</span>
          </div>
        </div>

        {/* Funcionários Ativos */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Funcionários Ativos</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">38</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">90% do total</span>
          </div>
        </div>

        {/* Em Folga */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Bed className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Em Folga</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">2</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">1 férias, 1 atestado</span>
          </div>
        </div>

        {/* Moral da Equipe */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Smile className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Moral da Equipe</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xl font-extrabold text-slate-900 font-mono">82%</span>
              <span className="text-[10px] font-bold text-emerald-600">▲ +6%</span>
            </div>
            <span className="text-[10px] text-slate-400">vs. mês anterior</span>
          </div>
        </div>

        {/* Produtividade */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Produtividade</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xl font-extrabold text-slate-900 font-mono">89%</span>
              <span className="text-[10px] font-bold text-emerald-600">▲ +4%</span>
            </div>
            <span className="text-[10px] text-slate-400">vs. mês anterior</span>
          </div>
        </div>

        {/* Folha de Pagamento */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Folha de Pagamento</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900 font-mono">$ 86.730</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600">▲ +12% vs. mês ant.</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Departamentos + Organograma da Empresa + Candidatos em Destaque */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Departamentos (Col 2 or 3) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900">Departamentos</h3>
            <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Ver Todos</span>
          </div>

          <div className="space-y-2.5">
            {departments.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{dept.icon}</span>
                  <span className="font-semibold text-slate-700 text-[11px]">{dept.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`${dept.color} h-full rounded-full`} style={{ width: `${(dept.count / 15) * 100}%` }} />
                  </div>
                  <span className="font-mono font-bold text-slate-900 w-5 text-right">{dept.count}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 text-center">
            <button
              onClick={() => showToast('Mapeamento de cargos e funções completo')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Gerenciar Cargos e Salários →
            </button>
          </div>
        </div>

        {/* Organograma da Empresa (Col 5 or 6) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900">Organograma da Empresa</h3>
            <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Ver Completo</span>
          </div>

          {/* Org Tree Visual Representation */}
          <div className="flex flex-col items-center py-2 relative">
            {/* CEO Node */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-xl px-4 py-2 flex items-center gap-3 shadow-md border border-slate-700 min-w-[200px]">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm border-2 border-cyan-400">
                JP
              </div>
              <div className="text-left">
                <span className="text-xs font-extrabold block text-white leading-tight">João Pereira</span>
                <span className="text-[10px] text-cyan-300 font-medium">CEO • 42 subordinados</span>
              </div>
            </div>

            {/* Tree Branch line */}
            <div className="w-0.5 h-4 bg-slate-300 my-1" />
            <div className="w-3/4 h-0.5 bg-slate-300 mb-2" />

            {/* Level 2: Managers */}
            <div className="grid grid-cols-5 gap-2 w-full text-center">
              {/* Comercial */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold mx-auto flex items-center justify-center mb-1">
                  MS
                </div>
                <span className="text-[10px] font-bold text-slate-800 block truncate">Mariana Silva</span>
                <span className="text-[9px] text-slate-500 block">Comercial (5)</span>
              </div>

              {/* Despacho */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold mx-auto flex items-center justify-center mb-1">
                  RL
                </div>
                <span className="text-[10px] font-bold text-slate-800 block truncate">Rafael Lima</span>
                <span className="text-[9px] text-slate-500 block">Despacho (4)</span>
              </div>

              {/* Operações (Highlight) */}
              <div className="bg-blue-50 border border-blue-300 rounded-lg p-2 text-center ring-1 ring-blue-400">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-[10px] font-bold mx-auto flex items-center justify-center mb-1">
                  CM
                </div>
                <span className="text-[10px] font-bold text-blue-900 block truncate">Carlos Mendes</span>
                <span className="text-[9px] text-blue-600 font-semibold block">Operações (18)</span>
              </div>

              {/* Manutenção */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold mx-auto flex items-center justify-center mb-1">
                  BC
                </div>
                <span className="text-[10px] font-bold text-slate-800 block truncate">Bruno Costa</span>
                <span className="text-[9px] text-slate-500 block">Oficina (6)</span>
              </div>

              {/* Financeiro */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold mx-auto flex items-center justify-center mb-1">
                  DR
                </div>
                <span className="text-[10px] font-bold text-slate-800 block truncate">Daniela Ribeiro</span>
                <span className="text-[9px] text-slate-500 block">Financeiro (4)</span>
              </div>
            </div>

            {/* Sub-branches under Operações */}
            <div className="flex items-center justify-center gap-3 mt-3 pt-2 border-t border-slate-100 text-[10px]">
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">Motoristas: 12</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">Ajudantes: 6</span>
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">Estoque: 5</span>
            </div>
          </div>
        </div>

        {/* Candidatos em Destaque (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-900">Candidatos em Destaque</h3>
            <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Ver Todos ({candidates.length})</span>
          </div>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {candidates.map((c) => (
              <div key={c.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 hover:border-blue-400 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{c.avatar}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-xs">{c.name}</span>
                      <span className="text-[10px] font-bold text-amber-600 flex items-center">
                        ★ {c.rating}
                      </span>
                    </div>
                    <span className="text-[10px] text-blue-700 font-medium block">{c.role}</span>
                    <div className="flex gap-1 mt-0.5">
                      {c.tags.map((t) => (
                        <span key={t} className="text-[9px] bg-white border border-slate-200 px-1 rounded text-slate-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-extrabold text-slate-900 font-mono">
                    $ {c.salary.toLocaleString()}/mês
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => hireCandidate(c.id)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded shadow-xs transition-colors"
                    >
                      Contratar
                    </button>
                    <button
                      onClick={() => openCandidateModal(c)}
                      className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-medium rounded transition-colors"
                    >
                      {c.actionType}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Charts Row: Moral da Equipe + Produtividade + Absentismo + Retenção de Talentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Moral da Equipe */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">Moral da Equipe</span>
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              82% ▲ +6%
            </span>
          </div>
          <div className="h-16 flex items-end">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path
                d="M 5 30 Q 25 35 45 22 T 75 18 T 95 10"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="95" cy="10" r="3" fill="#10b981" />
            </svg>
          </div>
          <span className="text-[9px] text-slate-400 block text-right mt-1">1 Abr a 14 Abr</span>
        </div>

        {/* Produtividade */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">Produtividade</span>
            <span className="text-[10px] text-slate-500">Últimos 14 dias</span>
          </div>
          <div className="h-16 flex items-end justify-between gap-1 pt-2">
            {[45, 50, 52, 60, 58, 65, 72, 70, 78, 82, 85, 89].map((val, idx) => (
              <div key={idx} className="flex-1 bg-sky-500 rounded-t-sm" style={{ height: `${val}%` }} />
            ))}
          </div>
          <span className="text-[9px] text-slate-400 block text-right mt-1">Tendência de alta (+4%)</span>
        </div>

        {/* Absentismo */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">Absentismo</span>
            <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              4.2% ▼ -1.3%
            </span>
          </div>
          <div className="h-16 flex items-end justify-between gap-1 pt-2">
            {[8, 6, 7, 5, 4, 6, 5, 3, 4, 4, 3, 2].map((val, idx) => (
              <div key={idx} className="flex-1 bg-rose-400 rounded-t-sm" style={{ height: `${val * 10}%` }} />
            ))}
          </div>
          <span className="text-[9px] text-slate-400 block text-right mt-1">Abaixo do teto setorial (5%)</span>
        </div>

        {/* Retenção de Talentos */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">Retenção de Talentos</span>
            <span className="text-xs font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
              86% ▲ +8%
            </span>
          </div>
          <div className="h-16 flex items-end">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path
                d="M 5 28 Q 25 25 45 24 T 75 16 T 95 12"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="95" cy="12" r="3" fill="#8b5cf6" />
            </svg>
          </div>
          <span className="text-[9px] text-slate-400 block text-right mt-1">Turnover controlado</span>
        </div>
      </div>

      {/* 5. Bottom Tables: Vagas Abertas + Programas de Treinamento + Funcionários Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Vagas Abertas (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900">Vagas Abertas</h3>
            <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">7 vagas</span>
          </div>

          <div className="space-y-2 text-xs">
            {jobOpenings.map((job) => (
              <div key={job.title} className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-[11px] block">{job.title}</span>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                    <span>{job.dept}</span>
                    <span>•</span>
                    <span className="font-mono text-slate-700">{job.salary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    job.urgency === 'Alta' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    ● {job.urgency}
                  </span>
                  <button
                    onClick={() => showToast(`Candidatos para ${job.title}: ${job.candidates}`)}
                    className="text-blue-600 hover:underline font-semibold text-[11px]"
                  >
                    Ver ({job.candidates})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Programas de Treinamento (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900">Programas de Treinamento</h3>
            <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Ver Todos</span>
          </div>

          <div className="space-y-3">
            {trainingProgram.map((tp) => (
              <div key={tp.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-semibold text-slate-800 text-[11px]">{tp.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{tp.count}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${tp.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funcionários Recentes (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900">Funcionários Recentes</h3>
            <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Ver Todos</span>
          </div>

          <div className="space-y-2 text-xs">
            {employees.slice(0, 5).map((emp) => (
              <div key={emp.id} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{emp.avatar}</span>
                  <div>
                    <span className="font-bold text-slate-900 text-[11px] block">{emp.name}</span>
                    <span className="text-[10px] text-slate-500">{emp.role} • {emp.department}</span>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {emp.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Bottom Action Bar */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => showToast('Abrindo portal de contratação rápida...')}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Contratar
          </button>
          <button
            onClick={() => showToast('Promover colaborador selecionado')}
            className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" /> Promover
          </button>
          <button
            onClick={() => showToast('Novo treinamento agendado para a equipe')}
            className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Treinar
          </button>
          <button
            onClick={() => showToast('Bônus por produtividade concedido!')}
            className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Gift className="w-4 h-4" /> Bonificar
          </button>
          <button
            onClick={() => showToast('Advertência formal emitida')}
            className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <AlertTriangle className="w-4 h-4" /> Advertir
          </button>
          <button
            onClick={() => showToast('Realocando membro de equipe entre setores')}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Shuffle className="w-4 h-4" /> Realocar
          </button>
        </div>

        <div className="text-right">
          <p className="text-[11px] font-serif italic text-slate-500">
            &ldquo;Funcionários satisfeitos entregam mais que cargas: entregam resultados.&rdquo;
          </p>
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
            Barravento Logistics
          </span>
        </div>
      </div>
    </div>
  );
};
