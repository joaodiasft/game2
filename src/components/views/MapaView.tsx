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
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const MapaView: React.FC = () => {
  const { showToast } = useGame();
  const [selectedCity, setSelectedCity] = useState<string | null>('Rivermouth');

  const cities = [
    { id: 'c1', name: 'Rivermouth City', type: 'Sede Principal', x: 25, y: 35, trucks: 8, demand: 'Alta' },
    { id: 'c2', name: 'Port Terminal', type: 'Centro de Distribuição', x: 75, y: 30, trucks: 6, demand: 'Muito Alta' },
    { id: 'c3', name: 'Eastvale', type: 'Armazém Avançado', x: 50, y: 65, trucks: 4, demand: 'Média' },
    { id: 'c4', name: 'Crossroads', type: 'Posto de Apoio', x: 20, y: 75, trucks: 2, demand: 'Normal' },
    { id: 'c5', name: 'Northside', type: 'Parque Industrial', x: 70, y: 78, trucks: 3, demand: 'Alta' },
  ];

  const activeRoutes = [
    { from: 'Rivermouth City', to: 'Eastvale', vehicle: 'Volvo FH (T-01)', status: 'Em Trânsito', progress: 68 },
    { from: 'Port Terminal', to: 'Rivermouth City', vehicle: 'Scania R500 (T-04)', status: 'Em Trânsito', progress: 34 },
    { from: 'Eastvale', to: 'Northside', vehicle: 'Ford Transit (V-03)', status: 'Em Trânsito', progress: 85 },
  ];

  return (
    <div className="flex-1 bg-[#0b1426] text-slate-200 overflow-y-auto p-4 space-y-4 font-sans select-none flex flex-col">
      {/* Map Control Bar */}
      <div className="flex items-center justify-between bg-[#0e1c38] px-4 py-2.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold text-white">Mapa Logístico Regional</h2>
          <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">
            Satélite GPS Ativo
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => showToast('Zoom in')}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => showToast('Zoom out')}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => showToast('Camadas de tráfego atualizadas')}
            className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" /> Camadas
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative flex-1 min-h-[460px] rounded-2xl bg-gradient-to-b from-[#091124] to-[#0d1c3a] border border-slate-800 overflow-hidden shadow-2xl p-6">
        {/* Geographic grid / contour lines */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        {/* SVG Connecting Highway Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/40" strokeWidth="2">
          <line x1="25%" y1="35%" x2="75%" y2="30%" stroke="#0284c7" strokeDasharray="6 4" />
          <line x1="25%" y1="35%" x2="50%" y2="65%" stroke="#0284c7" />
          <line x1="75%" y1="30%" x2="50%" y2="65%" stroke="#0284c7" />
          <line x1="50%" y1="65%" x2="20%" y2="75%" stroke="#0284c7" />
          <line x1="50%" y1="65%" x2="70%" y2="78%" stroke="#0284c7" />
        </svg>

        {/* City Markers */}
        {cities.map((city) => (
          <div
            key={city.id}
            onClick={() => setSelectedCity(city.name)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            style={{ left: `${city.x}%`, top: `${city.y}%` }}
          >
            <div className={`p-2 rounded-xl flex items-center gap-2 transition-all ${
              selectedCity === city.name
                ? 'bg-cyan-500/20 border-2 border-cyan-400 shadow-xl shadow-cyan-500/30'
                : 'bg-slate-900/90 border border-slate-700 hover:border-cyan-400'
            }`}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block group-hover:text-cyan-300">
                  {city.name}
                </span>
                <span className="text-[10px] text-slate-400 block">{city.type}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Floating Moving Trucks on routes */}
        <div className="absolute left-[38%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-30 animate-pulse">
          <div className="bg-emerald-950/90 border border-emerald-400/80 px-2 py-1 rounded-md text-[10px] text-emerald-300 font-bold flex items-center gap-1 shadow-lg">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>T-01 em rota (68%)</span>
          </div>
        </div>

        {/* Selected Hub Card Overlay */}
        <div className="absolute right-4 bottom-4 w-72 bg-[#0e1c38]/95 backdrop-blur-md border border-slate-700 rounded-xl p-3.5 shadow-2xl z-40 text-xs">
          <h3 className="font-bold text-white flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-cyan-400" /> {selectedCity}
          </h3>
          <p className="text-[11px] text-slate-400 mb-2">
            Polo estratégico regional com conexões diárias e frotas dedicadas.
          </p>
          <div className="space-y-1 text-[11px] border-t border-slate-800 pt-2 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Veículos Locados:</span>
              <span className="font-mono font-bold text-white">8 ativos</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Demanda de Carga:</span>
              <span className="font-bold text-emerald-400">Alta</span>
            </div>
          </div>
          <button
            onClick={() => showToast(`Despachando carga de ${selectedCity}`)}
            className="w-full mt-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs transition-colors"
          >
            Despachar Carga
          </button>
        </div>
      </div>
    </div>
  );
};
