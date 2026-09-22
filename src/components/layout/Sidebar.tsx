import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Map,
  ClipboardList,
  Truck,
  Boxes,
  Users,
  Briefcase,
  DollarSign,
  Swords,
  Building,
  Cpu,
  Wrench,
  Warehouse,
  BarChart3,
  Settings,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { NavigationTab } from '../../types/game';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, company, crises } = useGame();

  const currentCrisis = crises[`crise_ato_${company.currentAct}`];
  const hasPendingCrisis = currentCrisis?.status === 'pending';

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Painel Principal', icon: LayoutDashboard },
    {
      id: 'campanha',
      label: 'Campanha & Atos',
      icon: Compass,
      badge: hasPendingCrisis ? 'Crise!' : `Ato ${company.currentAct}`,
      badgeColor: hasPendingCrisis ? 'bg-rose-500 text-white animate-pulse' : 'bg-cyan-600 text-white',
    },
    { id: 'mapa', label: 'Mapa', icon: Map },
    { id: 'pedidos', label: 'Pedidos', icon: ClipboardList, badge: 4 },
    { id: 'entregas', label: 'Entregas', icon: Truck },
    { id: 'frota', label: 'Frota', icon: Boxes },
    { id: 'funcionarios', label: 'Funcionários', icon: Users },
    { id: 'clientes', label: 'Contratos & Comercial', icon: Briefcase },
    { id: 'financas', label: 'Finanças', icon: DollarSign },
    { id: 'concorrentes', label: 'Concorrentes', icon: Swords },
    { id: 'instalacoes', label: 'Instalações', icon: Building },
    { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
    { id: 'oficina', label: 'Oficina & Manutenção', icon: Wrench },
    { id: 'armazem', label: 'Armazém', icon: Warehouse },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="w-[240px] bg-gradient-to-b from-[#0a1229] via-[#0b1633] to-[#091024] border-r border-slate-800/80 flex flex-col shrink-0 text-slate-300 select-none shadow-xl">
      {/* Brand Logo Header */}
      <div className="p-4 pb-3 flex items-center gap-3 border-b border-slate-800/60">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center shrink-0">
          <div className="w-full h-full bg-[#0a1432] rounded-[10px] flex items-center justify-center">
            <Truck className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-base tracking-tight text-cyan-400">
              Transport
            </span>
            <span className="font-extrabold text-base tracking-tight text-white">
              Manager
            </span>
          </div>
          <span className="text-[9px] font-bold tracking-[0.2em] text-cyan-500/80 uppercase">
            BUILD • MOVE • GROW
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-2.5 space-y-0.5 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              {/* Active cyan indicator line on left */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-300 rounded-r-full shadow-sm shadow-cyan-300" />
              )}

              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-cyan-200'
                      : 'text-slate-400 group-hover:text-cyan-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold shadow-sm ${
                    item.badgeColor || 'bg-rose-500 text-white shadow-rose-500/40'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Cinematic Banner */}
      <div className="p-3 pt-1 border-t border-slate-800/60">
        <div className="relative rounded-xl overflow-hidden border border-slate-700/50 bg-[#0d1838] p-3 group">
          {/* Subtle background glow/graphic simulating highway sunset */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-0" />
          <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-gradient-to-tr from-amber-500/20 via-orange-600/20 to-transparent rounded-full blur-xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col justify-end">
            <div className="flex items-center gap-1.5 mb-1 text-cyan-400">
              <Truck className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-300">
                Barravento Fleet
              </span>
            </div>
            <p className="text-[11px] font-serif italic text-amber-200/90 leading-tight">
              &ldquo;Mais Que Entregas. Um Amanhã Maior.&rdquo;
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500 font-mono">
          <span>v1.0.0</span>
          <span>Build 1024</span>
        </div>
      </div>
    </aside>
  );
};
