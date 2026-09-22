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
  ArrowRight,
  Filter,
  Search,
  Zap,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const FrotaView: React.FC = () => {
  const { showToast } = useGame();
  const [filterType, setFilterType] = useState<string>('todos');

  const vehicles = [
    { id: 'T-01', model: 'Volvo FH 540', type: 'Carreta Pesada', driver: 'Carlos Lima', km: '142.500 km', fuel: 82, condition: 88, status: 'Em Rota', plate: 'BRA-9E42', speed: '78 km/h' },
    { id: 'T-02', model: 'Mercedes-Benz Actros', type: 'Carreta Pesada', driver: 'Marcos Silva', km: '89.200 km', fuel: 95, condition: 94, status: 'Disponível', plate: 'SPX-3A18', speed: '0 km/h' },
    { id: 'T-03', model: 'Scania R450', type: 'Caminhão Truck', driver: 'Julio Cesar', km: '210.000 km', fuel: 45, condition: 76, status: 'Em Rota', plate: 'PR-8812', speed: '84 km/h' },
    { id: 'V-01', model: 'Ford Transit 350L', type: 'Van de Carga', driver: 'Ana Paula', km: '54.000 km', fuel: 70, condition: 92, status: 'Disponível', plate: 'LOG-4402', speed: '0 km/h' },
    { id: 'V-02', model: 'Renault Master Furgão', type: 'Van de Carga', driver: 'Rodrigo Alves', km: '76.800 km', fuel: 60, condition: 85, status: 'Em Rota', plate: 'SUL-7731', speed: '62 km/h' },
    { id: 'V-03', model: 'Mercedes Sprinter', type: 'Van de Carga', driver: 'Fernanda Rocha', km: '32.100 km', fuel: 90, condition: 98, status: 'Na Oficina', plate: 'RIO-9921', speed: '0 km/h' },
  ];

  const filteredVehicles = vehicles.filter((v) => {
    if (filterType === 'todos') return true;
    if (filterType === 'rota') return v.status === 'Em Rota';
    if (filterType === 'disponivel') return v.status === 'Disponível';
    if (filterType === 'oficina') return v.status === 'Na Oficina';
    return true;
  });

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e1628] p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Gestão de Frota &amp; Telemetria
              </h1>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                28 Veículos
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              22 operacionais em trânsito · 4 em manutenção na oficina · 2 aguardando escala
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Concessionária de Frotas: selecione os novos caminhões.')}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" /> Comprar Veículo
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setFilterType('todos')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
            filterType === 'todos'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'bg-[#0e1628] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Todos ({vehicles.length})
        </button>
        <button
          onClick={() => setFilterType('rota')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
            filterType === 'rota'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-[#0e1628] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Em Rota (3)
        </button>
        <button
          onClick={() => setFilterType('disponivel')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
            filterType === 'disponivel'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              : 'bg-[#0e1628] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Disponíveis (2)
        </button>
        <button
          onClick={() => setFilterType('oficina')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
            filterType === 'oficina'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'bg-[#0e1628] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Oficina (1)
        </button>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredVehicles.map((v) => {
          const isRoute = v.status === 'Em Rota';
          const isWorkshop = v.status === 'Na Oficina';

          return (
            <div
              key={v.id}
              className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-md flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {v.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {v.plate}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isRoute
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : isWorkshop
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    ● {v.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-white text-base tracking-tight">{v.model}</h3>
                <span className="text-xs text-slate-400 block mb-4">{v.type}</span>

                {/* Telemetry rows */}
                <div className="space-y-2.5 text-xs border-t border-slate-800/80 pt-3 text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" /> Motorista
                    </span>
                    <span className="font-semibold text-white">{v.driver}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-slate-400" /> Odômetro
                    </span>
                    <span className="font-mono text-slate-300">{v.km}</span>
                  </div>

                  {/* Fuel Tank */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Fuel className="w-3 h-3 text-amber-400" /> Tanque de Combustível
                      </span>
                      <span className="font-mono font-bold text-amber-300">{v.fuel}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all"
                        style={{ width: `${v.fuel}%` }}
                      />
                    </div>
                  </div>

                  {/* Mechanical Condition */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-cyan-400" /> Condição Mecânica
                      </span>
                      <span className="font-mono font-bold text-cyan-300">{v.condition}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          v.condition > 80
                            ? 'bg-emerald-400'
                            : v.condition > 60
                            ? 'bg-amber-400'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${v.condition}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => showToast(`Telemetria GPS de ${v.id} carregada no mapa.`)}
                  className="flex-1 py-1.5 rounded-lg bg-[#141f38] hover:bg-[#1a294a] text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer text-center"
                >
                  Rastreamento GPS
                </button>
                <button
                  onClick={() => showToast(`Abrindo ordem de serviço na oficina para ${v.id}.`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-cyan-500/20 transition-colors cursor-pointer"
                >
                  Oficina
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
