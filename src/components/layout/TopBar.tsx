import React, { useState } from 'react';
import {
  Calendar,
  Sun,
  Star,
  Building2,
  DollarSign,
  TrendingUp,
  Award,
  Globe2,
  Edit2,
  Play,
  Pause,
  FastForward,
  Check,
  X,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const TopBar: React.FC = () => {
  const { company, updateCompanyName, togglePause, setSpeed } = useGame();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(company.name);
  const [tempSlogan, setTempSlogan] = useState(company.slogan);

  const handleSaveName = () => {
    updateCompanyName(tempName, tempSlogan);
    setIsEditingName(false);
  };

  return (
    <header className="h-[68px] bg-[#0b1329] border-b border-slate-800/80 px-4 flex items-center justify-between gap-3 text-slate-100 shrink-0 select-none z-30 shadow-md">
      {/* 1. Company Profile */}
      <div className="flex items-center gap-3 min-w-[240px]">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-900 p-0.5 shadow-md flex items-center justify-center shrink-0 border border-cyan-400/30 overflow-hidden">
          <div className="w-full h-full bg-[#0a122c] rounded-[7px] flex items-center justify-center relative group">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <div className="absolute inset-0 bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors" />
          </div>
        </div>

        {isEditingName ? (
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-md border border-cyan-500/50 z-50">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="text-xs bg-slate-800 px-2 py-0.5 rounded text-white font-semibold outline-none focus:ring-1 focus:ring-cyan-400"
                placeholder="Nome da Empresa"
              />
              <input
                type="text"
                value={tempSlogan}
                onChange={(e) => setTempSlogan(e.target.value)}
                className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 outline-none focus:ring-1 focus:ring-cyan-400"
                placeholder="Slogan"
              />
            </div>
            <button
              onClick={handleSaveName}
              className="p-1 hover:bg-emerald-600 rounded text-emerald-400 hover:text-white"
              title="Salvar"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsEditingName(false)}
              className="p-1 hover:bg-rose-600 rounded text-rose-400 hover:text-white"
              title="Cancelar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm tracking-tight hover:text-cyan-300 transition-colors">
                {company.name}
              </span>
              <button
                onClick={() => {
                  setTempName(company.name);
                  setTempSlogan(company.slogan);
                  setIsEditingName(true);
                }}
                className="text-slate-400 hover:text-cyan-400 transition-colors p-0.5"
                title="Editar Nome da Empresa"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
            <span className="text-[11px] text-slate-400 font-normal truncate max-w-[200px]">
              {company.slogan}
            </span>
          </div>
        )}
      </div>

      {/* 2. Date & Time & Speed Controls */}
      <div className="flex items-center gap-2 bg-[#0e1935] px-3 py-1.5 rounded-lg border border-slate-700/60 shadow-inner">
        <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-[11px] text-slate-400 leading-tight">
            {company.gameDate}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <span className="tabular-nums font-mono text-[13px]">{company.gameTime}</span>
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[10px] text-slate-300 font-medium">
              {company.temperature}°C {company.cityName}
            </span>
          </div>
        </div>

        {/* Speed toggle buttons */}
        <div className="flex items-center gap-0.5 ml-2 pl-2 border-l border-slate-700">
          <button
            onClick={togglePause}
            className={`p-1 rounded transition-colors ${
              company.isPaused
                ? 'bg-amber-500/20 text-amber-300'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={company.isPaused ? 'Continuar' : 'Pausar'}
          >
            {company.isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setSpeed(1)}
            className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
              company.gameSpeed === 1 && !company.isPaused
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1x
          </button>
          <button
            onClick={() => setSpeed(2)}
            className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
              company.gameSpeed === 2 && !company.isPaused
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2x
          </button>
          <button
            onClick={() => setSpeed(5)}
            className={`px-1.5 py-0.5 text-[10px] font-bold rounded flex items-center ${
              company.gameSpeed === 5 && !company.isPaused
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FastForward className="w-2.5 h-2.5 mr-0.5" /> 5x
          </button>
        </div>
      </div>

      {/* 3. Cash & Daily Profit */}
      <div className="flex items-center gap-2.5 bg-[#0e1935] px-3.5 py-1.5 rounded-lg border border-slate-700/60 shadow-inner">
        <div className="w-7 h-7 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          <DollarSign className="w-4 h-4 font-bold" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-extrabold text-emerald-400 tracking-tight tabular-nums font-mono leading-none">
            $ {company.cash.toLocaleString('pt-BR')}
          </span>
          <span className="text-[11px] text-emerald-300/90 font-medium flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3 inline text-emerald-400" />
            Lucro Hoje: <span className="font-semibold tabular-nums">+${company.dailyProfit.toLocaleString('pt-BR')}</span>
          </span>
        </div>
      </div>

      {/* 4. Company Level & XP */}
      <div className="flex items-center gap-2.5 bg-[#0e1935] px-3 py-1.5 rounded-lg border border-slate-700/60 shadow-inner min-w-[150px]">
        <div className="w-7 h-7 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <Star className="w-4 h-4 fill-amber-400" />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-medium">Nível da Empresa</span>
            <span className="font-extrabold text-amber-300">{company.level}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full rounded-full transition-all duration-300"
              style={{ width: `${(company.xp / company.xpToNextLevel) * 100}%` }}
            />
          </div>
          <span className="text-[9px] text-slate-400 tabular-nums text-right mt-0.5">
            ★★★ {company.xp} / {company.xpToNextLevel} XP
          </span>
        </div>
      </div>

      {/* 5. Reputation Bars */}
      <div className="flex items-center gap-4">
        {/* Local Reputation */}
        <div className="flex items-center gap-2 min-w-[125px]">
          <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Award className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between text-[10px] leading-tight">
              <span className="text-slate-400 font-medium">Reputação Local</span>
              <span className="font-bold text-emerald-400 tabular-nums">{company.localReputation}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${company.localReputation}%` }}
              />
            </div>
          </div>
        </div>

        {/* Regional Reputation */}
        <div className="flex items-center gap-2 min-w-[125px]">
          <div className="w-6 h-6 rounded bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Globe2 className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between text-[10px] leading-tight">
              <span className="text-slate-400 font-medium">Reputação Regional</span>
              <span className="font-bold text-amber-400 tabular-nums">{company.regionalReputation}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${company.regionalReputation}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
