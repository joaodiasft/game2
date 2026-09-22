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
    { title: 'Motorista Carreteiro', dept: 'Motoristas', salary: 'R$ 3.500', urgency: 'Alta', candidates: 8 },
    { title: 'Ajudante de Carga', dept: 'Ajudantes', salary: 'R$ 1.800', urgency: 'Média', candidates: 6 },
    { title: 'Mecânico Diesel', dept: 'Oficina', salary: 'R$ 3.200', urgency: 'Alta', candidates: 5 },
    { title: 'Analista Financeiro', dept: 'Financeiro', salary: 'R$ 4.000', urgency: 'Média', candidates: 4 },
    { title: 'Assistente Comercial', dept: 'Comercial', salary: 'R$ 2.500', urgency: 'Baixa', candidates: 3 },
  ];

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] border border-slate-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  Recursos Humanos &amp; Talentos
                </h1>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  42 Colaboradores
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Gestão de quadro funcional, admissões, planos de treinamento e moral da equipe
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Abrindo triagem de novos currículos de motoristas...')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-4 h-4" /> Recrutar Talentos
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 6 KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Total Funcionários</span>
          <span className="text-xl font-black text-white font-mono mt-0.5 block">42</span>
          <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">+4 este mês</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Ativos em Turno</span>
          <span className="text-xl font-black text-white font-mono mt-0.5 block">38</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">90% escala ativa</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Em Folga / Férias</span>
          <span className="text-xl font-black text-white font-mono mt-0.5 block">2</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Escala compensada</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Moral da Equipe</span>
          <span className="text-xl font-black text-emerald-400 font-mono mt-0.5 block">82%</span>
          <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">▲ +6% vs mês ant.</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Produtividade</span>
          <span className="text-xl font-black text-cyan-400 font-mono mt-0.5 block">89%</span>
          <span className="text-[10px] font-bold text-cyan-400 block mt-0.5">▲ +4% vs mês ant.</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Folha Salarial</span>
          <span className="text-xl font-black text-slate-200 font-mono mt-0.5 block">R$ 86.730</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Encargos inclusos</span>
        </div>
      </div>

      {/* 3. Mid Section: Organograma & Candidatos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Organograma da Empresa (Col 7) */}
        <div className="lg:col-span-7 bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Estrutura Organizacional da Transportadora</h3>
            <span className="text-[11px] text-cyan-400 font-semibold font-mono">42 Colaboradores</span>
          </div>

          <div className="flex flex-col items-center py-2 relative">
            {/* CEO Node */}
            <div className="bg-[#0c1429] text-white rounded-xl px-5 py-2.5 flex items-center gap-3 shadow-md border border-cyan-500/40 min-w-[220px]">
              <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-sm border-2 border-cyan-300">
                JP
              </div>
              <div className="text-left">
                <span className="text-xs font-extrabold block text-white">Diretoria Executiva</span>
                <span className="text-[10px] text-cyan-300 font-mono">CEO • 7 Setores</span>
              </div>
            </div>

            {/* Tree Branch line */}
            <div className="w-0.5 h-4 bg-slate-700 my-1" />
            <div className="w-4/5 h-0.5 bg-slate-700 mb-3" />

            {/* Level 2: Managers */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 w-full text-center">
              <div className="bg-[#091122] border border-slate-800 rounded-xl p-2.5">
                <span className="text-xs font-bold text-white block">Operações</span>
                <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">18 Profissionais</span>
              </div>

              <div className="bg-[#091122] border border-slate-800 rounded-xl p-2.5">
                <span className="text-xs font-bold text-white block">Oficina</span>
                <span className="text-[10px] text-rose-400 font-mono block mt-0.5">6 Mecânicos</span>
              </div>

              <div className="bg-[#091122] border border-slate-800 rounded-xl p-2.5">
                <span className="text-xs font-bold text-white block">Comercial</span>
                <span className="text-[10px] text-sky-400 font-mono block mt-0.5">5 Vendedores</span>
              </div>

              <div className="bg-[#091122] border border-slate-800 rounded-xl p-2.5">
                <span className="text-xs font-bold text-white block">Despacho</span>
                <span className="text-[10px] text-purple-400 font-mono block mt-0.5">4 Operadores</span>
              </div>

              <div className="bg-[#091122] border border-slate-800 rounded-xl p-2.5">
                <span className="text-xs font-bold text-white block">Financeiro</span>
                <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">4 Analistas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Candidatos em Destaque (Col 5) */}
        <div className="lg:col-span-5 bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Banco de Talentos em Destaque</h3>
            <span className="text-[11px] text-cyan-400 font-semibold cursor-pointer">
              {candidates.length} Avaliados
            </span>
          </div>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {candidates.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl bg-[#091122] border border-slate-800/80 flex items-center justify-between gap-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.avatar}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-xs">{c.name}</span>
                      <span className="text-[10px] font-bold text-amber-400 font-mono">
                        ★ {c.rating}
                      </span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-medium block">{c.role}</span>
                    <div className="flex gap-1 mt-1">
                      {c.tags.map((t) => (
                        <span key={t} className="text-[9px] bg-[#141f38] border border-slate-700 px-1.5 py-0.2 rounded text-slate-300 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-xs font-extrabold text-white font-mono">
                    R$ {c.salary.toLocaleString('pt-BR')}/mês
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => hireCandidate(c.id)}
                      className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-[10px] rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      Contratar
                    </button>
                    <button
                      onClick={() => openCandidateModal(c)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-medium rounded-lg border border-slate-700 transition-colors cursor-pointer"
                    >
                      Perfil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Vagas + Treinamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-extrabold text-white">Vagas Abertas no Mercado</h3>
          <div className="space-y-2 text-xs">
            {jobOpenings.map((job) => (
              <div key={job.title} className="p-3 rounded-xl bg-[#091122] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-xs block">{job.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{job.dept} • {job.salary}</span>
                </div>
                <button
                  onClick={() => showToast(`Buscando candidatos para ${job.title}`)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-300 text-[11px] font-semibold border border-cyan-500/30 transition-colors cursor-pointer"
                >
                  Filtrar Candidatos ({job.candidates})
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-extrabold text-white">Programas de Treinamento e Segurança</h3>
          <div className="space-y-3">
            {trainingProgram.map((tp) => (
              <div key={tp.name} className="p-3 rounded-xl bg-[#091122] border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{tp.name}</span>
                  <span className="text-cyan-400 font-mono text-[11px]">{tp.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" style={{ width: `${tp.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
