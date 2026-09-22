import React, { useState } from 'react';
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
  Search,
  Plus,
  ArrowRightLeft,
  Barcode,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const ArmazemView: React.FC = () => {
  const { showToast } = useGame();
  const [searchFilter, setSearchFilter] = useState('');

  const inventory = [
    { sku: 'PAL-001', name: 'Paletes PBR Madeira Tratada', qty: '1.450 un.', shelf: 'Corredor A-04', category: 'Carga Geral', status: 'Estocado' },
    { sku: 'ALM-204', name: 'Caixas de Produtos Secos e Não Perecíveis', qty: '3.800 un.', shelf: 'Corredor B-12', category: 'Alimentos', status: 'Em Separação' },
    { sku: 'REF-502', name: 'Alimentos Congelados (-18°C)', qty: '820 caixas', shelf: 'Câmara Fria 2', category: 'Cadeia do Frio', status: 'Estocado' },
    { sku: 'ELE-109', name: 'Eletroeletrônicos & Informática de Alto Valor', qty: '640 caixas', shelf: 'Gaiola Alta Segurança', category: 'Segurança Máxima', status: 'Monitorado' },
    { sku: 'FAR-301', name: 'Medicamentos & Vacinas Termolábeis', qty: '290 caixas', shelf: 'Câmara Climatizada 1', category: 'Farmacêutico', status: 'Estocado' },
    { sku: 'QUI-880', name: 'Químicos Industriais Certificados', qty: '520 tambores', shelf: 'Pátio Químico Contido', category: 'Perigosos', status: 'Monitorado' },
  ];

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] border border-slate-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Warehouse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  Centro de Distribuição &amp; WMS
                </h1>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">
                  18.000 m²
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                16 docas automatizadas • Estocagem verticalizada • Rastreamento RFID em tempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Iniciando auditoria física e contagem de inventário WMS...')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Layers className="w-4 h-4" /> Inventário Geral
            </button>
          </div>
        </div>
      </div>

      {/* Docks & Efficiency stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Docas em Operação</span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">10 / 16</span>
          <span className="text-[11px] text-emerald-400 font-bold block mt-1">Fluxo sem retenção</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Ocupação do CD</span>
          <span className="text-2xl font-black text-cyan-400 font-mono mt-1 block">72%</span>
          <span className="text-[11px] text-slate-400 block mt-1">5.040 m² livres para carga</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Tempo Médio Crossdocking</span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">1,8 h</span>
          <span className="text-[11px] text-emerald-400 font-bold block mt-1">▼ -15% tempo de carga</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-4 border border-slate-800 shadow-md">
          <span className="text-xs text-slate-400 block font-medium">Movimentação Diária</span>
          <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">2.450 itens</span>
          <span className="text-[11px] text-slate-400 block mt-1">98.2% acurácia picking</span>
        </div>
      </div>

      {/* Storage inventory table */}
      <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-extrabold text-white">Lotes Estocados &amp; Localização no Armazém</h3>
            <p className="text-[11px] text-slate-400">Endereçamento por ruas, prateleiras e níveis verticais</p>
          </div>

          <div className="flex items-center gap-2 bg-[#091122] border border-slate-800 px-3 py-1.5 rounded-xl">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar SKU ou produto..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-500 outline-none w-48"
            />
          </div>
        </div>

        <div className="space-y-2.5 text-xs">
          {filteredInventory.map((item) => (
            <div
              key={item.sku}
              className="p-3.5 rounded-xl bg-[#091122] border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-500/30">
                  {item.sku}
                </span>
                <div>
                  <span className="font-bold text-white text-xs block">{item.name}</span>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                    <span className="text-slate-300">{item.shelf}</span>
                    <span>•</span>
                    <span className="text-cyan-400/80">{item.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <span className="font-mono font-bold text-slate-200 text-xs">{item.qty}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    item.status === 'Estocado'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : item.status === 'Em Separação'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                  }`}
                >
                  ● {item.status}
                </span>
                <button
                  onClick={() => showToast(`Movendo lote ${item.sku} para esteira de carregamento`)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  Mover Lote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
