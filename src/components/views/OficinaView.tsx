import React, { useState } from 'react';
import {
  Wrench,
  AlertTriangle,
  Clock,
  ThumbsUp,
  Calendar,
  Truck,
  Car,
  ChevronRight,
  Plus,
  ShoppingCart,
  Building,
  CheckCircle2,
  Sliders,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const OficinaView: React.FC = () => {
  const { maintenanceBays, spareParts, buyParts, assignVehicleToBay, showToast } = useGame();
  const [selectedBayDetail, setSelectedBayDetail] = useState<number | null>(null);

  const maintenanceQueue = [
    { id: 1, code: 'V-02', name: 'Van - Ford Transit', service: 'Revisão Preventiva 40k', time: 'Hoje 14:00', status: 'Normal' },
    { id: 2, code: 'T-03', name: 'Caminhão - Iveco Daily', service: 'Troca de Pneus Dianteiros', time: 'Hoje 16:30', status: 'Normal' },
    { id: 3, code: 'C-02', name: 'Utilitário - Hyundai HR', service: 'Revisão de 10.000 km', time: 'Amanhã 09:00', status: 'Normal' },
    { id: 4, code: 'T-04', name: 'Truck - Scania R500', service: 'Alinhamento & Balanceamento 3D', time: 'Amanhã 11:00', status: 'Normal' },
    { id: 5, code: 'V-01', name: 'Van - Renault Master', service: 'Verificação Sistema Elétrico', time: 'Amanhã 15:00', status: 'Atenção' },
  ];

  const maintenanceHistory = [
    { date: '14 Abr', vehicle: 'V-03', type: 'Preventiva', desc: 'Troca de óleo e filtros', cost: 'R$ 1.320' },
    { date: '12 Abr', vehicle: 'T-01', type: 'Corretiva', desc: 'Reparo sistema freios ABS', cost: 'R$ 4.240' },
    { date: '10 Abr', vehicle: 'C-02', type: 'Preventiva', desc: 'Revisão 10.000 km preventiva', cost: 'R$ 880' },
    { date: '05 Abr', vehicle: 'T-02', type: 'Preventiva', desc: 'Troca de filtros diesel', cost: 'R$ 1.420' },
    { date: '01 Abr', vehicle: 'V-02', type: 'Corretiva', desc: 'Alternador & Sistema elétrico', cost: 'R$ 2.620' },
  ];

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] border border-slate-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  Oficina &amp; Manutenção Preventiva
                </h1>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">
                  6 Baias Ativas
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Monitoramento de desgaste de frota, gestão de peças e agendamento de revisões obrigatórias
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Abrindo calendário de revisões programadas...')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4" /> Agendar Revisão
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top KPI Header Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Veículos Prontos</span>
          <span className="text-xl font-black text-white font-mono mt-0.5 block">21 / 27</span>
          <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">78% da frota</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Em Manutenção</span>
          <span className="text-xl font-black text-amber-400 font-mono mt-0.5 block">4</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Baias ocupadas</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Reparos Críticos</span>
          <span className="text-xl font-black text-rose-400 font-mono mt-0.5 block">2</span>
          <span className="text-[10px] text-rose-400 block mt-0.5 font-medium">Baia prioritária</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Tempo Médio Reparo</span>
          <span className="text-xl font-black text-white font-mono mt-0.5 block">6.4h</span>
          <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">▼ -22% vs. anterior</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Confiabilidade Frota</span>
          <span className="text-xl font-black text-emerald-400 font-mono mt-0.5 block">92%</span>
          <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">▲ +3% índice MTTF</span>
        </div>

        <div className="bg-[#0e1628] rounded-xl p-3.5 border border-slate-800 shadow-md">
          <span className="text-[11px] text-slate-400 block font-medium">Estoque Peças</span>
          <span className="text-xl font-black text-cyan-400 font-mono mt-0.5 block">95% OK</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Reposição em dia</span>
        </div>
      </div>

      {/* 3. Baias de Serviço Grid + Fila & Peças */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Baias de Serviço (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-white">Baias de Serviço na Oficina Central</h2>
              <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-semibold px-2 py-0.5 rounded font-mono">
                4 / 6 em uso
              </span>
            </div>
            <button
              onClick={() => showToast('Abrindo visão de monitoramento em tempo real das baias')}
              className="text-xs text-cyan-400 font-semibold hover:underline cursor-pointer"
            >
              Ver Todas as Baias →
            </button>
          </div>

          {/* 6 Bays Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {maintenanceBays.map((bay) => (
              <div
                key={bay.id}
                className={`bg-[#0e1628] rounded-2xl p-4 border transition-all shadow-md ${
                  bay.isAvailable
                    ? 'border-dashed border-slate-700 flex flex-col items-center justify-center text-center py-8'
                    : 'border-slate-800 flex flex-col justify-between'
                }`}
              >
                {bay.isAvailable ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold text-slate-300 font-mono">BAIA 0{bay.bayNumber}</span>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                        Disponível
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#091122] border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Baia Livre</span>
                      <span className="text-[10px] text-slate-400 block">Pronta para receber veículo.</span>
                    </div>
                    <button
                      onClick={() => assignVehicleToBay(bay.bayNumber)}
                      className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      Designar Veículo
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Bay Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white font-mono">BAIA 0{bay.bayNumber}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        bay.severity === 'emergency'
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                          : bay.severity === 'scheduled'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      }`}>
                        ● {bay.severity === 'emergency' ? 'Emergência' : bay.severity === 'scheduled' ? 'Agendado' : 'Em Serviço'}
                      </span>
                    </div>

                    {/* Vehicle info */}
                    <div className="bg-[#091122] p-3 rounded-xl border border-slate-800/80 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <Truck className="w-5 h-5 text-cyan-400 shrink-0" />
                        <div>
                          <span className="text-xs font-extrabold text-white block leading-tight">
                            {bay.vehicleName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{bay.vehicleId}</span>
                        </div>
                      </div>
                      <span className="mt-2 inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                        {bay.serviceType}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="my-2.5">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-slate-400">Progresso</span>
                        <span className="font-bold font-mono text-white">{bay.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            bay.severity === 'emergency' ? 'bg-rose-500' : 'bg-emerald-400'
                          }`}
                          style={{ width: `${bay.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Details list */}
                    <div className="space-y-1 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Tempo restante:</span>
                        <span className="font-mono font-semibold text-white">{bay.remainingTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Mecânico Chefe:</span>
                        <span className="font-medium text-white">{bay.mechanic}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast(`Detalhes da Baia ${bay.bayNumber} - ${bay.vehicleName}`)}
                      className="w-full mt-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-700 cursor-pointer"
                    >
                      Ver Detalhes do Serviço
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fila de Manutenção & Estoque de Peças (Col 4) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Fila de Manutenção */}
          <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white">Fila de Entrada na Oficina</h3>
              <span className="text-[11px] text-cyan-400 font-semibold font-mono">5 Veículos</span>
            </div>

            <div className="space-y-2 text-xs">
              {maintenanceQueue.map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-[#091122] border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-cyan-400 text-xs w-4 font-mono">{item.id}</span>
                    <div>
                      <span className="font-bold text-white text-xs block">{item.name}</span>
                      <span className="text-[10px] text-slate-400">{item.service}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-300 block">{item.time}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      item.status === 'Atenção' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estoque de Peças */}
          <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white">Estoque Crítico de Peças</h3>
              <span className="text-[11px] text-cyan-400 font-semibold cursor-pointer">Almoxarifado</span>
            </div>

            <div className="space-y-2 text-xs">
              {spareParts.map((part) => (
                <div key={part.id} className="flex items-center justify-between p-2 rounded-lg bg-[#091122] border border-slate-800/80">
                  <span className="text-[11px] font-medium text-slate-200">{part.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-xs">
                      {part.quantity} {part.unit}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                      part.status === 'OK'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : part.status === 'Baixo'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}>
                      ● {part.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => buyParts('p4', 5)}
                className="py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> Comprar Peças
              </button>
              <button
                onClick={() => showToast('Contrato de terceirização de manutenção ativado')}
                className="py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              >
                <Building className="w-3.5 h-3.5" /> Terceirizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Condição dos Sistemas + Histórico */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Condição dos Principais Sistemas */}
        <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-extrabold text-white">Saúde Geral dos Sistemas da Frota</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { name: 'Motor Diesel & Turbo', pct: 92, ok: true },
              { name: 'Sistema Elétrico & Alternador', pct: 81, ok: true },
              { name: 'Freios ABS & Pastilhas', pct: 78, ok: false },
              { name: 'Transmissão & Câmbio', pct: 90, ok: true },
              { name: 'Pneus & Calibragem', pct: 85, ok: true },
              { name: 'Arrefecimento & Radiador', pct: 76, ok: false },
              { name: 'Suspensão a Ar', pct: 88, ok: true },
              { name: 'Direção Hidráulica', pct: 89, ok: true },
            ].map((sys) => (
              <div key={sys.name} className="p-2.5 rounded-xl bg-[#091122] border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 truncate">{sys.name}</span>
                  <span className="font-mono font-bold text-white">{sys.pct}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${sys.ok ? 'bg-emerald-400' : 'bg-amber-400'}`}
                    style={{ width: `${sys.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Histórico Recente de Manutenção */}
        <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Histórico de Ordens de Manutenção</h3>
            <span className="text-[11px] text-cyan-400 font-semibold cursor-pointer">Ver Todas</span>
          </div>

          <div className="space-y-2 text-xs">
            {maintenanceHistory.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-[#091122] border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-400 text-[10px]">{h.date}</span>
                  <span className="font-bold text-white text-xs">{h.vehicle}</span>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${
                    h.type === 'Preventiva'
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}>
                    {h.type}
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-400 text-xs">{h.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
