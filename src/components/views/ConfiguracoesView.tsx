import React, { useState } from 'react';
import {
  Settings,
  Volume2,
  Save,
  RotateCcw,
  Globe,
  Bell,
  HardDrive,
  CheckCircle,
  Sliders,
  ShieldAlert,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const ConfiguracoesView: React.FC = () => {
  const { showToast } = useGame();
  const [audioVolume, setAudioVolume] = useState(70);
  const [sfxVolume, setSfxVolume] = useState(85);
  const [autosave, setAutosave] = useState(true);
  const [language, setLanguage] = useState('Português (Brasil)');

  const handleSaveGame = () => {
    showToast('Jogo e configurações salvos localmente com sucesso!');
  };

  const handleResetGame = () => {
    if (window.confirm('Deseja realmente reiniciar todo o progresso do simulador?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-5 select-none font-sans custom-scrollbar max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] border border-slate-800 p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              Preferências &amp; Configurações do Sistema
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Ajustes de telemetria de áudio, taxa de simulação e armazenamento local
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveGame}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <Save className="w-4 h-4" /> Salvar Jogo
        </button>
      </div>

      {/* Audio settings */}
      <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-cyan-400" /> Preferências Sonoras &amp; Ambiente
        </h3>

        <div className="space-y-4 pt-1">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
              <span>Música Ambiente &amp; Rádio dos Caminhoneiros</span>
              <span className="font-mono font-bold text-cyan-400">{audioVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={audioVolume}
              onChange={(e) => setAudioVolume(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
              <span>Efeitos Sonoros (Motores diesel, buzina, docas e freios a ar)</span>
              <span className="font-mono font-bold text-cyan-400">{sfxVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        </div>
      </div>

      {/* Game System & Autosave */}
      <div className="bg-[#0e1628] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-emerald-400" /> Persistência de Dados &amp; Sistema
        </h3>

        <div className="flex items-center justify-between py-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-white block">Salvamento Automático</span>
            <span className="text-[11px] text-slate-400">Salva o progresso no navegador a cada 60 segundos</span>
          </div>
          <button
            onClick={() => setAutosave(!autosave)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${autosave ? 'bg-emerald-600' : 'bg-slate-700'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${autosave ? 'left-6.5' : 'left-0.5'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-white block">Idioma do Simulador</span>
            <span className="text-[11px] text-slate-400">Termos fiscais, contratos e rotas rodoviárias</span>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#091122] border border-slate-800 text-white rounded-xl px-3 py-1.5 text-xs font-semibold outline-none"
          >
            <option value="Português (Brasil)">Português (Brasil)</option>
            <option value="English (US)">English (US)</option>
            <option value="Español">Español</option>
          </select>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-rose-400 block">Reiniciar Progresso do Simulador</span>
            <span className="text-[11px] text-slate-400">Apaga a transportadora e reinicia um novo jogo</span>
          </div>
          <button
            onClick={handleResetGame}
            className="px-3.5 py-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Resetar Dados
          </button>
        </div>
      </div>
    </div>
  );
};
