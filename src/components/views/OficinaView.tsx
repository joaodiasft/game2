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
    { id: 1, code: 'V-02', name: 'Van - Ford Transit', service: 'Revisão Preventiva', time: 'Hoje 14:00', status: 'Normal' },
    { id: 2, code: 'T-03', name: 'Caminhão - Iveco', service: 'Troca de Pneus', time: 'Hoje 16:30', status: 'Normal' },
    { id: 3, code: 'C-02', name: 'Carro - Hyundai', service: 'Revisão de 10.000 km', time: 'Amanhã 09:00', status: 'Normal' },
    { id: 4, code: 'T-04', name: 'Truck - Scania', service: 'Alinhamento e Balanceamento', time: 'Amanhã 11:00', status: 'Normal' },
    { id: 5, code: 'V-01', name: 'Van - Renault Master', service: 'Verificação Elétrica', time: 'Amanhã 15:00', status: 'Atenção' },
  ];

  const maintenanceHistory = [
    { date: '14 Abr', vehicle: 'V-03', type: 'Preventiva', desc: 'Troca de óleo e filtros', cost: '$320' },
    { date: '12 Abr', vehicle: 'T-01', type: 'Corretiva', desc: 'Sistema de freios', cost: '$1.240' },
    { date: '10 Abr', vehicle: 'C-02', type: 'Preventiva', desc: 'Revisão 10.000 km', cost: '$280' },
    { date: '05 Abr', vehicle: 'T-02', type: 'Preventiva', desc: 'Troca de filtros', cost: '$420' },
    { date: '01 Abr', vehicle: 'V-02', type: 'Corretiva', desc: 'Sistema elétrico', cost: '$620' },
  ];

  return (
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c2042] via-[#123164] to-[#184282] text-white p-5 shadow-lg border border-blue-900/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0b1c3a] rounded-[10px] flex items-center justify-center">
                <Wrench className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                Oficina &amp; Manutenção
              </h1>
              <p className="text-xs text-blue-200 mt-0.5 max-w-xl font-normal">
                Veículos em movimento. Negócios em crescimento.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[12px] font-serif italic text-cyan-200">
                &ldquo;Manutenção hoje, mais quilômetros amanhã.&rdquo;
              </span>
              <span className="text-[9px] uppercase tracking-widest text-blue-300 font-bold">
                Barravento Logistics
              </span>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-semibold hover:bg-slate-900/60 cursor-pointer transition-colors shadow-sm">
              <span>Confiabilidade na estrada. Menos paradas. Mais oportunidades.</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top KPI Header Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Veículos Operacionais */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Veículos Operacionais</span>
            <span className="text-lg font-extrabold text-slate-900 font-mono">21 / 27</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5 font-bold">78% da frota</span>
          </div>
        </div>

        {/* Em Manutenção */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Em Manutenção</span>
            <span className="text-lg font-extrabold text-slate-900 font-mono">4</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">15% da frota</span>
          </div>
        </div>

        {/* Reparos Emergenciais */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Reparos Emergenciais</span>
            <span className="text-lg font-extrabold text-slate-900 font-mono">2</span>
            <span className="text-[10px] text-rose-600 block mt-0.5 font-medium">Em andamento</span>
          </div>
        </div>

        {/* Tempo Médio de Reparação */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Tempo Médio Reparo</span>
            <span className="text-lg font-extrabold text-slate-900 font-mono">6.4 horas</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5 font-bold">▼ -22% vs. anterior</span>
          </div>
        </div>

        {/* Confiabilidade da Frota */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight font-medium">Confiabilidade Frota</span>
            <span className="text-lg font-extrabold text-slate-900 font-mono">92%</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5 font-bold">▲ +3% vs. anterior</span>
          </div>
        </div>

        {/* Botão Agendar Revisão */}
        <button
          onClick={() => showToast('Abrindo agenda de manutenções preventivas')}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3.5 shadow-sm flex flex-col justify-center items-center text-center transition-colors group cursor-pointer"
        >
          <Calendar className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold block">Agendar Revisão</span>
          <span className="text-[10px] text-blue-200">Manutenção Preventiva</span>
        </button>
      </div>

      {/* 3. Baias de Serviço Grid (4/6 em uso) + Fila & Peças */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Baias de Serviço (Col 8) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-slate-900">Baias de Serviço</h2>
              <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                4 / 6 em uso
              </span>
            </div>
            <button
              onClick={() => showToast('Visualizando layout completo das 6 baias')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Ver Todas as Baias →
            </button>
          </div>

          {/* 6 Bays Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {maintenanceBays.map((bay) => (
              <div
                key={bay.id}
                className={`bg-white rounded-xl p-4 border transition-all ${
                  bay.isAvailable
                    ? 'border-dashed border-slate-300 flex flex-col items-center justify-center text-center py-8'
                    : 'border-slate-200/90 shadow-sm flex flex-col justify-between'
                }`}
              >
                {bay.isAvailable ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold text-slate-700">BAIA {bay.bayNumber}</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Disponível
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Baia Livre</span>
                      <span className="text-[10px] text-slate-500 block">Pronta para o próximo serviço.</span>
                    </div>
                    <button
                      onClick={() => assignVehicleToBay(bay.bayNumber)}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors"
                    >
                      Designar Veículo
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Bay Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">BAIA {bay.bayNumber}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        bay.severity === 'emergency'
                          ? 'bg-rose-100 text-rose-700'
                          : bay.severity === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        ● {bay.severity === 'emergency' ? 'Emergência' : bay.severity === 'scheduled' ? 'Agendado' : 'Em Serviço'}
                      </span>
                    </div>

                    {/* Vehicle info */}
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-2">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-slate-700" />
                        <div>
                          <span className="text-xs font-extrabold text-slate-900 block leading-tight">
                            {bay.vehicleName}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{bay.vehicleId}</span>
                        </div>
                      </div>
                      <span className={`mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                        bay.severity === 'emergency'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {bay.serviceType}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="my-2">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-slate-500">Progresso</span>
                        <span className="font-bold font-mono text-slate-800">{bay.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            bay.severity === 'emergency' ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${bay.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Details list */}
                    <div className="space-y-1 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Tempo restante:</span>
                        <span className="font-mono font-semibold text-slate-800">{bay.remainingTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Mecânico:</span>
                        <span className="font-medium text-slate-800">{bay.mechanic}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 italic truncate mt-1">
                        {bay.details}
                      </p>
                    </div>

                    <button
                      onClick={() => showToast(`Detalhes da Baia ${bay.bayNumber} - ${bay.vehicleName}`)}
                      className="w-full mt-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fila de Manutenção & Estoque de Peças (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Fila de Manutenção */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900">Fila de Manutenção</h3>
              <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">5 veículos</span>
            </div>

            <div className="space-y-2 text-xs">
              {maintenanceQueue.map((item) => (
                <div key={item.id} className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400 text-xs w-3">{item.id}</span>
                    <div>
                      <span className="font-bold text-slate-900 text-[11px] block">{item.name}</span>
                      <span className="text-[10px] text-slate-500">{item.service}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-700 block">{item.time}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      item.status === 'Atenção' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estoque de Peças */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900">Estoque de Peças</h3>
              <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Ver Tudo</span>
            </div>

            <div className="space-y-2 text-xs">
              {spareParts.map((part) => (
                <div key={part.id} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-[11px] font-medium text-slate-800">{part.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">
                      {part.quantity} {part.unit}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      part.status === 'OK'
                        ? 'bg-emerald-100 text-emerald-700'
                        : part.status === 'Baixo'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      ● {part.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => buyParts('p4', 5)}
                className="py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> Comprar Peças
              </button>
              <button
                onClick={() => showToast('Contrato de terceirização acionado')}
                className="py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Building className="w-3.5 h-3.5" /> Terceirizar Oficina
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Condição dos Sistemas + Custos + Histórico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Condição dos Principais Sistemas (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
          <h3 className="text-xs font-bold text-slate-900 mb-3">Condição dos Principais Sistemas</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { name: 'Motor', pct: 92, ok: true },
              { name: 'Sistema Elétrico', pct: 81, ok: true },
              { name: 'Freios', pct: 78, ok: false },
              { name: 'Transmissão', pct: 90, ok: true },
              { name: 'Pneus', pct: 85, ok: true },
              { name: 'Arrefecimento', pct: 76, ok: false },
              { name: 'Suspensão', pct: 88, ok: true },
              { name: 'Direção', pct: 89, ok: true },
            ].map((sys) => (
              <div key={sys.name} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 truncate">{sys.name}</span>
                  <span className="font-mono font-bold text-slate-800">{sys.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${sys.ok ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${sys.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custos de Manutenção Chart (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-900">Custos de Manutenção</h3>
            <span className="text-[10px] text-slate-500">Últimos 6 Meses</span>
          </div>

          <div className="flex items-center gap-3 text-[10px] mb-2">
            <span className="flex items-center gap-1 text-blue-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Preventiva
            </span>
            <span className="flex items-center gap-1 text-rose-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Corretiva
            </span>
          </div>

          <div className="h-28 flex items-end justify-between gap-2 border-b border-slate-100 pt-2">
            {[
              { m: 'Nov', p: 6, c: 2 },
              { m: 'Dez', p: 8, c: 3 },
              { m: 'Jan', p: 7, c: 2.5 },
              { m: 'Fev', p: 9, c: 3.5 },
              { m: 'Mar', p: 12, c: 4 },
              { m: 'Abr', p: 10, c: 3 },
            ].map((d) => (
              <div key={d.m} className="flex-1 flex flex-col items-center gap-0.5 justify-end h-full">
                <div className="w-full bg-rose-500 rounded-t-sm" style={{ height: `${d.c * 5}%` }} />
                <div className="w-full bg-blue-500" style={{ height: `${d.p * 5}%` }} />
                <span className="text-[9px] text-slate-400 font-mono mt-1">{d.m}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-2 pt-1 text-xs">
            <div>
              <span className="text-slate-500 text-[10px]">Total (6 meses)</span>
              <span className="text-base font-extrabold text-slate-900 font-mono block">$ 56.230</span>
            </div>
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">
              ▲ +12% vs. período ant.
            </span>
          </div>
        </div>

        {/* Histórico de Manutenção (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900">Histórico de Manutenção</h3>
            <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Ver Todos</span>
          </div>

          <div className="space-y-2 text-xs">
            {maintenanceHistory.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-400 text-[10px]">{h.date}</span>
                  <span className="font-bold text-slate-800 text-[11px]">{h.vehicle}</span>
                  <span className={`text-[9px] font-semibold px-1 rounded ${
                    h.type === 'Preventiva' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {h.type}
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-900">{h.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
