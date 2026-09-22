import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Landmark,
  CreditCard,
  FileSpreadsheet,
  PieChart,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShieldCheck,
  Calendar,
  Percent,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const FinancasView: React.FC = () => {
  const { company, showToast } = useGame();
  const [filterType, setFilterType] = useState<'all' | 'in' | 'out'>('all');

  const transactions = [
    { desc: 'Faturamento Frete Alvorada (14t)', type: 'in', val: '+R$ 24.000', cat: 'Contratos Comerciais', date: 'Hoje 14:15' },
    { desc: 'Abastecimento Posto Central (Diesel S10)', type: 'out', val: '-R$ 8.450', cat: 'Combustível', date: 'Hoje 11:30' },
    { desc: 'Peças & Manutenção Freios Baia 2', type: 'out', val: '-R$ 3.200', cat: 'Oficina & Peças', date: 'Hoje 09:40' },
    { desc: 'Adiantamento Metalúrgica Vale do Aço', type: 'in', val: '+R$ 18.500', cat: 'Carga Pesada', date: 'Ontem 17:00' },
    { desc: 'Folha de Pagamento Quinzenal (42 Colab.)', type: 'out', val: '-R$ 43.365', cat: 'Recursos Humanos', date: 'Ontem 15:00' },
    { desc: 'Pedágio Rodovias Integradas Leste', type: 'out', val: '-R$ 1.120', cat: 'Pedágios', date: 'Ontem 10:20' },
    { desc: 'Frete Farmacêutica Vitalis SLA Crítico', type: 'in', val: '+R$ 12.800', cat: 'Medicamentos', date: 'Anteontem' },
  ];

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e1628] p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Tesouraria Executiva &amp; DRE
              </h1>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                Fluxo Auditado
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Gestão de caixa em tempo real, rentabilidade por quilômetro rodado e linhas de investimento
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Simulando linha de capital de giro BNDES com carência de 6 meses...')}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Landmark className="w-4 h-4" /> Tomar Crédito de Expansão
          </button>
        </div>
      </div>

      {/* Top 4 Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Saldo Líquido em Conta</span>
          <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight block mt-1">
            R$ {company.cash.toLocaleString('pt-BR')}
          </span>
          <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800/80">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2%
            </span>
            <span className="text-slate-500 text-[11px]">vs. mês anterior</span>
          </div>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Lucro do Dia</span>
          <span className="text-2xl font-black text-white font-mono tracking-tight block mt-1">
            +R$ {company.dailyProfit.toLocaleString('pt-BR')}
          </span>
          <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800/80">
            <span className="text-cyan-400 font-semibold">Margem Líq. 28.4%</span>
            <span className="text-slate-500 text-[11px]">Meta batida</span>
          </div>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Custos Fixos Mensais</span>
          <span className="text-2xl font-black text-slate-200 font-mono tracking-tight block mt-1">
            R$ 86.730
          </span>
          <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800/80">
            <span className="text-slate-400">Folha &amp; Sedes</span>
            <span className="text-slate-500 text-[11px]">42 contratos</span>
          </div>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Linha Pré-Aprovada</span>
          <span className="text-2xl font-black text-cyan-400 font-mono tracking-tight block mt-1">
            R$ 250.000
          </span>
          <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800/80">
            <span className="text-amber-400 font-medium">Taxa 1.15% a.m.</span>
            <span className="text-slate-500 text-[11px]">Banco Santander</span>
          </div>
        </div>
      </div>

      {/* Transaction Feed */}
      <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-extrabold text-white">Extrato Consolidado de Receitas e Despesas</h3>
            <p className="text-[11px] text-slate-400">Lançamentos categorizados e vinculados a ordens de serviço</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-[#141f38] text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('in')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterType === 'in'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-[#141f38] text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              Entradas (+)
            </button>
            <button
              onClick={() => setFilterType('out')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterType === 'out'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-[#141f38] text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              Saídas (-)
            </button>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          {filteredTransactions.map((t, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#091122] border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    t.type === 'in'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}
                >
                  {t.type === 'in' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <span className="font-bold text-white text-xs block">{t.desc}</span>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span>{t.cat}</span>
                    <span>•</span>
                    <span className="font-mono">{t.date}</span>
                  </div>
                </div>
              </div>

              <span
                className={`font-mono font-bold text-sm ${
                  t.type === 'in' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {t.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
