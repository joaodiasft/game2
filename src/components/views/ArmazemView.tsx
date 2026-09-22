import React from 'react';
import {
  Warehouse,
  Boxes,
  Package,
  Layers,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const ArmazemView: React.FC = () => {
  const { showToast } = useGame();

  const inventory = [
    { sku: 'PAL-001', name: 'Paletes PBR Madeira Tratada', qty: '1.450 un.', shelf: 'Corredor A-04', status: 'Estocado' },
    { sku: 'ALM-204', name: 'Caixas de Produtos Secos', qty: '3.800 un.', shelf: 'Corredor B-12', status: 'Em Separação' },
    { sku: 'REF-502', name: 'Alimentos Congelados (-18°C)', qty: '820 caixas', shelf: 'Câmara Fria 2', status: 'Estocado' },
    { sku: 'ELE-109', name: 'Eletroeletrônicos & Informática', qty: '640 caixas', shelf: 'Gaiola Alta Segurança', status: 'Monitorado' },
  ];

  return (
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Warehouse className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900">
              Operações de Armazém &amp; WMS
            </h1>
            <p className="text-xs text-slate-500">
              18.000 m² de estocagem • 16 docas ativas • 98% precisão no picking
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('Iniciando inventário geral do estoque')}
          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Layers className="w-3.5 h-3.5" /> Fazer Inventário
        </button>
      </div>

      {/* Docks & Efficiency stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Docas Ocupadas</span>
          <span className="text-xl font-extrabold text-slate-900 font-mono">10 / 16</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Fluxo contínuo</span>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Ocupação do CD</span>
          <span className="text-xl font-extrabold text-slate-900 font-mono">72%</span>
          <span className="text-[10px] text-blue-600 font-bold block mt-0.5">5.040 m² livres</span>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Tempo Médio Carga</span>
          <span className="text-xl font-extrabold text-slate-900 font-mono">1,8 h</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">▼ -15% vs mês ant.</span>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Movimentação Diária</span>
          <span className="text-xl font-extrabold text-slate-900 font-mono">2.450 itens</span>
          <span className="text-[10px] text-purple-600 font-bold block mt-0.5">Alta performance</span>
        </div>
      </div>

      {/* Storage inventory table */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90">
        <h3 className="text-xs font-bold text-slate-900 mb-3">Lotes Armazenados &amp; Estantes</h3>
        <div className="space-y-2 text-xs">
          {inventory.map((item) => (
            <div key={item.sku} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {item.sku}
                </span>
                <div>
                  <span className="font-bold text-slate-900 block">{item.name}</span>
                  <span className="text-[10px] text-slate-500">{item.shelf}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-slate-800">{item.qty}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  ● {item.status}
                </span>
                <button
                  onClick={() => showToast(`Movendo lote ${item.sku}`)}
                  className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-semibold rounded"
                >
                  Mover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
