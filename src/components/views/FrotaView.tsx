import React, { useState } from 'react';
import {
  Truck,
  Fuel,
  Wrench,
  Gauge,
  Plus,
  Shield,
  User,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const FrotaView: React.FC = () => {
  const { showToast } = useGame();

  const vehicles = [
    { id: 'T-01', model: 'Volvo FH 540', type: 'Carreta Pesada', driver: 'Carlos Lima', km: '142.500 km', fuel: 82, condition: 88, status: 'Em Rota' },
    { id: 'T-02', model: 'Mercedes-Benz Actros', type: 'Carreta Pesada', driver: 'Marcos Silva', km: '89.200 km', fuel: 95, condition: 94, status: 'Disponível' },
    { id: 'T-03', model: 'Scania R450', type: 'Caminhão Truck', driver: 'Julio Cesar', km: '210.000 km', fuel: 45, condition: 76, status: 'Em Rota' },
    { id: 'V-01', model: 'Ford Transit 350L', type: 'Van de Carga', driver: 'Ana Paula', km: '54.000 km', fuel: 70, condition: 92, status: 'Disponível' },
    { id: 'V-02', model: 'Renault Master Furgão', type: 'Van de Carga', driver: 'Rodrigo Alves', km: '76.800 km', fuel: 60, condition: 85, status: 'Em Rota' },
    { id: 'V-03', model: 'Mercedes Sprinter', type: 'Van de Carga', driver: 'Fernanda Rocha', km: '32.100 km', fuel: 90, condition: 98, status: 'Na Oficina' },
  ];

  return (
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900">
              Gestão de Frota &amp; Veículos
            </h1>
            <p className="text-xs text-slate-500">
              28 veículos cadastrados • 22 operacionais • 4 na oficina • 2 disponíveis
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('Abrindo concessionária de novos caminhões...')}
          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Comprar Novo Veículo
        </button>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {v.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  v.status === 'Em Rota' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  v.status === 'Disponível' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  ● {v.status}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-sm">{v.model}</h3>
              <span className="text-[11px] text-slate-500 block mb-3">{v.type}</span>

              {/* Stats */}
              <div className="space-y-2 text-xs border-t border-slate-100 pt-2 text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <User className="w-3.5 h-3.5" /> Motorista:
                  </span>
                  <span className="font-semibold text-slate-800">{v.driver}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Gauge className="w-3.5 h-3.5" /> Hodômetro:
                  </span>
                  <span className="font-mono font-semibold text-slate-800">{v.km}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Fuel className="w-3.5 h-3.5" /> Combustível:
                  </span>
                  <span className="font-mono font-bold text-emerald-600">{v.fuel}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Wrench className="w-3.5 h-3.5" /> Estado Geral:
                  </span>
                  <span className="font-mono font-bold text-blue-600">{v.condition}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-100">
              <button
                onClick={() => showToast(`Telemetria em tempo real para ${v.id}`)}
                className="py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Telemetria
              </button>
              <button
                onClick={() => showToast(`Enviando ${v.id} para abastecimento/revisão`)}
                className="py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Manutenção
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
