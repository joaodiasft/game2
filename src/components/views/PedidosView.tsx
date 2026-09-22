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
      origin: 'Rivermouth City',
      dest: 'Eastvale',
      weight: '14 Toneladas',
      price: '$ 4.250',
      deadline: '4h restantes',
      status: 'Pronto para Despacho',
      badge: 'Urgente',
    },
    {
      id: 'PED-4092',
      client: 'Metalúrgica Vale do Aço',
      cargo: 'Bobinas de Aço Laminado',
      origin: 'Port Terminal',
      dest: 'Parque Industrial',
      weight: '26 Toneladas',
      price: '$ 6.800',
      deadline: '8h restantes',
      status: 'Em Trânsito',
      badge: 'Carga Pesada',
    },
    {
      id: 'PED-4093',
      client: 'E-Shop Brasil Express',
      cargo: 'Eletrônicos & Pequenos Pacotes',
      origin: 'Rivermouth Central',
      dest: 'Crossroads Hub',
      weight: '3.2 Toneladas',
      price: '$ 2.900',
      deadline: '2h restantes',
      status: 'Pronto para Despacho',
      badge: 'Expresso',
    },
    {
      id: 'PED-4094',
      client: 'Farmácias Vida & Saúde',
      cargo: 'Medicamentos & Vacinas (Monitorado)',
      origin: 'Rivermouth City',
      dest: 'Port Terminal',
      weight: '1.8 Toneladas',
      price: '$ 3.400',
      deadline: '6h restantes',
      status: 'Pronto para Despacho',
      badge: 'Sensível',
    },
  ];

  return (
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900">
              Pedidos de Frete &amp; Despacho
            </h1>
            <p className="text-xs text-slate-500">
              Gerencie cargas pendentes, aloque veículos e maximize os lucros por viagem.
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('Atualizando bolsa de cargas disponíveis...')}
          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Filter className="w-3.5 h-3.5" /> Atualizar Bolsa de Cargas
        </button>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {o.id}
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  ● {o.badge}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-sm">{o.client}</h3>
              <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-slate-400" /> {o.cargo}
              </p>

              {/* Route */}
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100 my-3 text-xs">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-700">{o.origin}</span>
                <span className="text-slate-400">→</span>
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-semibold text-slate-700">{o.dest}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Peso: <strong className="text-slate-800">{o.weight}</strong></span>
                <span className="flex items-center gap-1 text-amber-700 font-medium">
                  <Clock className="w-3 h-3" /> {o.deadline}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
              <span className="text-base font-extrabold text-emerald-600 font-mono">
                {o.price}
              </span>
              <button
                onClick={() => showToast(`Despachando ${o.id} com sucesso!`)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              >
                <Truck className="w-3.5 h-3.5" /> Despachar Carga
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
