import React, { useState } from 'react';
import {
  ClipboardList,
  Package,
  MapPin,
  Clock,
  DollarSign,
  Truck,
  CheckCircle2,
  AlertCircle,
  Filter,
  Plus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const PedidosView: React.FC = () => {
  const { showToast, company } = useGame();
  const [filter, setFilter] = useState('Todos');

  const orders = [
    {
      id: 'PED-4091',
      client: 'Supermercados Alvorada',
      cargo: 'Alimentos Perecíveis (Refrigerado)',
      origin: 'Porto Seco Central',
      dest: 'Zona Leste Varejo',
      weight: '14 Toneladas',
      price: 'R$ 4.250',
      deadline: '4h restantes',
      status: 'Pronto para Despacho',
      badge: 'Urgente',
    },
    {
      id: 'PED-4092',
      client: 'Metalúrgica Vale do Aço',
      cargo: 'Bobinas de Aço Laminado',
      origin: 'Port Terminal',
      dest: 'Parque Industrial Norte',
      weight: '26 Toneladas',
      price: 'R$ 6.800',
      deadline: '8h restantes',
      status: 'Em Trânsito',
      badge: 'Carga Pesada',
    },
    {
      id: 'PED-4093',
      client: 'E-Shop Brasil Express',
      cargo: 'Eletrônicos & E-commerce',
      origin: 'Rivermouth Central',
      dest: 'Crossroads Hub',
      weight: '3.2 Toneladas',
      price: 'R$ 2.900',
      deadline: '2h restantes',
      status: 'Pronto para Despacho',
      badge: 'Expresso',
    },
    {
      id: 'PED-4094',
      client: 'Farmácias Vida & Saúde',
      cargo: 'Medicamentos & Vacinas (Monitorado)',
      origin: 'Aeroporto Cargo',
      dest: 'Hospital Regional',
      weight: '1.8 Toneladas',
      price: 'R$ 5.400',
      deadline: '1h 30m restantes',
      status: 'Em Trânsito',
      badge: 'SLA Crítico',
    },
    {
      id: 'PED-4095',
      client: 'AgroSul Cooperativa',
      cargo: 'Sementes Selecionadas (Granel)',
      origin: 'Terminal Graneleiro',
      dest: 'Fazenda Santa Rita',
      weight: '32 Toneladas',
      price: 'R$ 7.500',
      deadline: '12h restantes',
      status: 'Pronto para Despacho',
      badge: 'Agronegócio',
    },
    {
      id: 'PED-4096',
      client: 'ConstruMais Distribuidora',
      cargo: 'Cimento & Vergalhões',
      origin: 'Usina Sul',
      dest: 'Canteiro Central',
      weight: '22 Toneladas',
      price: 'R$ 3.800',
      deadline: '6h restantes',
      status: 'Pronto para Despacho',
      badge: 'Construção',
    },
  ];

  const filteredOrders = orders.filter((o) => {
    if (filter === 'Todos') return true;
    if (filter === 'Prontos') return o.status === 'Pronto para Despacho';
    if (filter === 'Trânsito') return o.status === 'Em Trânsito';
    return true;
  });

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e1628] p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Mesa de Cargas &amp; Contratos
              </h1>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                18 Pedidos Disponíveis
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Despache veículos, otimize rotas com menor tempo de frete e fature prêmios por pontualidade
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('Todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'Todos'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-[#141f38] text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            Todos ({orders.length})
          </button>
          <button
            onClick={() => setFilter('Prontos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'Prontos'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-[#141f38] text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            Prontos
          </button>
          <button
            onClick={() => setFilter('Trânsito')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'Trânsito'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'bg-[#141f38] text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            Em Trânsito
          </button>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredOrders.map((order) => {
          const isReady = order.status === 'Pronto para Despacho';

          return (
            <div
              key={order.id}
              className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-md flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    {order.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      order.badge === 'Urgente' || order.badge === 'SLA Crítico'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : order.badge === 'Expresso'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {order.badge}
                  </span>
                </div>

                <h3 className="font-extrabold text-white text-base tracking-tight">{order.client}</h3>
                <span className="text-xs text-slate-300 block mb-3 font-medium">{order.cargo}</span>

                {/* Info Rows */}
                <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3 text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Origem / Destino
                    </span>
                    <span className="text-right text-slate-200 truncate max-w-[170px]">
                      {order.origin} → <strong className="text-white">{order.dest}</strong>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-slate-400" /> Peso da Carga
                    </span>
                    <span className="font-mono text-slate-200">{order.weight}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> Janela de Entrega
                    </span>
                    <span className="font-mono text-amber-300 font-bold">{order.deadline}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Valor do Frete
                    </span>
                    <span className="font-mono text-base font-black text-emerald-400">
                      {order.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-800/80">
                {isReady ? (
                  <button
                    onClick={() => showToast(`Carga ${order.id} despachada com sucesso!`)}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Truck className="w-4 h-4" /> Despachar Carga Imediata
                  </button>
                ) : (
                  <button
                    onClick={() => showToast(`Telemetria da carga ${order.id} exibida.`)}
                    className="w-full py-2.5 bg-[#141f38] hover:bg-[#1a294a] text-cyan-300 font-bold text-xs rounded-xl border border-cyan-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-cyan-400" /> Acompanhar em Rota
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
