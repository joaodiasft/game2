import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  Building,
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Compass,
  ArrowRight,
  Clock,
  Package,
  Activity,
  Radio,
  Fuel,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const MapaView: React.FC = () => {
  const { showToast } = useGame();
  const [selectedCity, setSelectedCity] = useState<string>('São Paulo (Matriz)');

  const cities = [
    { id: 'c1', name: 'São Paulo (Matriz)', type: 'Hub Central & Garagem', x: 30, y: 40, trucks: 12, demand: 'Crítica', throughput: '1.400 t/dia' },
    { id: 'c2', name: 'Porto de Santos', type: 'Terminal Intermodal Portuário', x: 42, y: 62, trucks: 8, demand: 'Muito Alta', throughput: '2.800 t/dia' },
    { id: 'c3', name: 'Campinas CD', type: 'Crossdocking Aéreo & Rodoviário', x: 26, y: 22, trucks: 6, demand: 'Alta', throughput: '950 t/dia' },
    { id: 'c4', name: 'Rio de Janeiro', type: 'Filial Metropolitana', x: 74, y: 35, trucks: 5, demand: 'Alta', throughput: '1.100 t/dia' },
    { id: 'c5', name: 'Curitiba Sul', type: 'Polo Agroindustrial & Carga Seca', x: 18, y: 78, trucks: 4, demand: 'Média', throughput: '750 t/dia' },
    { id: 'c6', name: 'Belo Horizonte', type: 'Corredor Minerário & Carga Pesada', x: 68, y: 15, trucks: 4, demand: 'Média', throughput: '820 t/dia' },
  ];

  const activeRoutes = [
    { from: 'São Paulo', to: 'Rio de Janeiro', vehicle: 'Volvo FH 540 (T-01)', driver: 'Carlos Lima', status: 'Em Trânsito', progress: 68, speed: '84 km/h', cargo: 'Eletrônicos Foxconn' },
    { from: 'Porto de Santos', to: 'Campinas CD', vehicle: 'Scania R500 (T-04)', driver: 'Marcos Souza', status: 'Em Trânsito', progress: 42, speed: '76 km/h', cargo: 'Container 40ft Import' },
    { from: 'Curitiba Sul', to: 'São Paulo', vehicle: 'Mercedes Actros (T-02)', driver: 'Roberto Santos', status: 'Em Trânsito', progress: 85, speed: '80 km/h', cargo: 'Grãos Nobres' },
  ];

  const selectedHubData = cities.find((c) => c.name === selectedCity) || cities[0];

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar flex flex-col">
      {/* Map Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#0e1628] px-5 py-3 rounded-2xl border border-slate-800 shadow-xl gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-white">Centro de Telemetria e Rastreamento GPS</h2>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Ao Vivo
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Rastreamento de comboios e monitoramento de corredores viários</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => showToast('Ampliação de zoom do mapa')}
            className="p-2 bg-[#091122] hover:bg-slate-800 rounded-xl text-slate-300 border border-slate-800 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => showToast('Redução de zoom do mapa')}
            className="p-2 bg-[#091122] hover:bg-slate-800 rounded-xl text-slate-300 border border-slate-800 transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => showToast('Camadas de tráfego e alertas rodoviários atualizados')}
            className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" /> Camadas Rodoviárias
          </button>
        </div>
      </div>

      {/* Map Canvas & Live Fleet Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-[500px]">
        {/* Map Canvas (Col 8) */}
        <div className="lg:col-span-8 relative min-h-[480px] rounded-2xl bg-gradient-to-b from-[#091124] to-[#0d1c3a] border border-slate-800 overflow-hidden shadow-2xl p-6 flex flex-col justify-between">
          {/* Subtle radar / geographic grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

          {/* SVG Connecting Highway Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/30" strokeWidth="2.5">
            {/* SP to Santos */}
            <line x1="30%" y1="40%" x2="42%" y2="62%" stroke="#0284c7" strokeWidth="3" />
            {/* SP to Campinas */}
            <line x1="30%" y1="40%" x2="26%" y2="22%" stroke="#0284c7" strokeWidth="3" />
            {/* SP to RJ */}
            <line x1="30%" y1="40%" x2="74%" y2="35%" stroke="#0ea5e9" strokeDasharray="6 4" strokeWidth="2.5" />
            {/* SP to Curitiba */}
            <line x1="30%" y1="40%" x2="18%" y2="78%" stroke="#0284c7" strokeWidth="2.5" />
            {/* RJ to BH */}
            <line x1="74%" y1="35%" x2="68%" y2="15%" stroke="#0284c7" strokeDasharray="4 4" strokeWidth="2" />
            {/* Campinas to BH */}
            <line x1="26%" y1="22%" x2="68%" y2="15%" stroke="#0284c7" strokeDasharray="4 4" strokeWidth="2" />
          </svg>

          {/* City Markers */}
          {cities.map((city) => (
            <div
              key={city.id}
              onClick={() => setSelectedCity(city.name)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              style={{ left: `${city.x}%`, top: `${city.y}%` }}
            >
              <div
                className={`p-2.5 rounded-xl flex items-center gap-2.5 transition-all ${
                  selectedCity === city.name
                    ? 'bg-cyan-500/20 border-2 border-cyan-400 shadow-xl shadow-cyan-500/40 backdrop-blur-md scale-105'
                    : 'bg-[#091122]/90 border border-slate-700/80 hover:border-cyan-400 backdrop-blur-sm'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block group-hover:text-cyan-300">
                    {city.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">{city.type}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Floating Moving Trucks on routes */}
          <div className="absolute left-[52%] top-[37%] -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="bg-[#0c1b35] border border-cyan-400/80 px-2.5 py-1 rounded-lg text-[10px] text-cyan-300 font-bold flex items-center gap-1.5 shadow-xl">
              <Truck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-mono">T-01 • Via Dutra (68%)</span>
            </div>
          </div>

          <div className="absolute left-[36%] top-[51%] -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="bg-[#0c1b35] border border-emerald-400/80 px-2.5 py-1 rounded-lg text-[10px] text-emerald-300 font-bold flex items-center gap-1.5 shadow-xl">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono">T-04 • Imigrantes (42%)</span>
            </div>
          </div>

          {/* Bottom status bar in map */}
          <div className="relative z-30 flex items-center justify-between text-[11px] text-slate-400 bg-[#091122]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800">
            <div className="flex items-center gap-4">
              <span>● Rede Rodoviária: <strong>1.840 km mapeados</strong></span>
              <span>● Conexões Intermodais: <strong>4 ativas</strong></span>
            </div>
            <span className="font-mono text-cyan-400">GPS LAT -23.5505 / LON -46.6333</span>
          </div>
        </div>

        {/* Right Info Rail (Col 4) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Selected Hub Card Overlay */}
          <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" /> {selectedHubData.name}
              </h3>
              <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-mono font-bold">
                {selectedHubData.demand} Demanda
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {selectedHubData.type}. Ponto estratégico integrado ao sistema WMS da Barravento Logistics.
            </p>

            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Veículos Alocados:</span>
                <span className="font-mono font-bold text-white">{selectedHubData.trucks} caminhões</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Capacidade Operacional:</span>
                <span className="font-mono font-bold text-cyan-400">{selectedHubData.throughput}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">SLA de Atendimento:</span>
                <span className="font-mono font-bold text-emerald-400">98.5% no prazo</span>
              </div>
            </div>

            <button
              onClick={() => showToast(`Despachando comboio com prioridade para ${selectedHubData.name}`)}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              Despachar Novo Carregamento
            </button>
          </div>

          {/* Active convoys list */}
          <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="font-extrabold text-white text-sm">Viagens em Andamento</h3>
            <div className="space-y-3">
              {activeRoutes.map((route, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#091122] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{route.vehicle}</span>
                    <span className="text-cyan-400 font-mono text-[11px]">{route.speed}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{route.from} → {route.to}</span>
                    <span className="text-slate-300 font-mono">{route.cargo}</span>
                  </div>

                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full"
                      style={{ width: `${route.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
