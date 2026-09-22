import React from 'react';
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
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const FinancasView: React.FC = () => {
  const { company, showToast } = useGame();

  const transactions = [
    { desc: 'Faturamento Frete Alvorada', type: 'in', val: '+$ 24.000', cat: 'Contratos' },
    { desc: 'Abastecimento Posto Central (Diesel)', type: 'out', val: '-$ 8.450', cat: 'Combustível' },
    { desc: 'Peças & Manutenção de Freios', type: 'out', val: '-$ 3.200', cat: 'Oficina' },
    { desc: 'Adiantamento Metalúrgica Vale do Aço', type: 'in', val: '+$ 18.500', cat: 'Contratos' },
    { desc: 'Folha de Pagamento Quinzenal', type: 'out', val: '-$ 43.365', cat: 'Salários' },
  ];

  return (
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900">
              Controle Financeiro &amp; DRE
            </h1>
            <p className="text-xs text-slate-500">
              Fluxo de caixa em tempo real, rentabilidade por quilômetro e linhas de crédito.
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('Simulando linha de crédito bancária...')}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Landmark className="w-3.5 h-3.5" /> Solicitar Empréstimo
        </button>
      </div>

      {/* Top 4 Financial Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Saldo Atual</span>
          <span className="text-2xl font-extrabold text-emerald-600 font-mono">
            $ {company.cash.toLocaleString('pt-BR')}
          </span>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">+14% vs mês ant.</span>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Lucro Líquido Hoje</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">
            +$ {company.dailyProfit.toLocaleString('pt-BR')}
          </span>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">Margem líq. 28%</span>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Custo Fixo Mensal</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">$ 86.730</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Folha &amp; Sedes</span>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Crédito Disponível</span>
          <span className="text-2xl font-extrabold text-blue-600 font-mono">$ 250.000</span>
          <span className="text-[10px] text-blue-700 font-bold block mt-0.5">Taxa 1.2% a.m.</span>
        </div>
      </div>

      {/* Transaction Feed */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90">
        <h3 className="text-xs font-bold text-slate-900 mb-3">Extrato Recente de Entradas e Saídas</h3>
        <div className="space-y-2 text-xs">
          {transactions.map((t, idx) => (
            <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  t.type === 'in' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {t.type === 'in' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <span className="font-bold text-slate-800 text-[11px] block">{t.desc}</span>
                  <span className="text-[10px] text-slate-400">{t.cat}</span>
                </div>
              </div>

              <span className={`font-mono font-extrabold text-xs ${
                t.type === 'in' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {t.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
