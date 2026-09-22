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
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const ConfiguracoesView: React.FC = () => {
  const { showToast } = useGame();
  const [audioVolume, setAudioVolume] = useState(70);
  const [sfxVolume, setSfxVolume] = useState(85);
  const [autosave, setAutosave] = useState(true);
  const [language, setLanguage] = useState('Português (Brasil)');

  const handleSaveGame = () => {
    showToast('Jogo salvo com sucesso localmente!');
  };

  const handleResetGame = () => {
    if (window.confirm('Deseja realmente reiniciar seu progresso de jogo?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] text-slate-800 overflow-y-auto p-4 space-y-4 font-sans select-none max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900">
              Configurações do Simulador
            </h1>
            <p className="text-xs text-slate-500">
              Ajuste áudio, salvamento automático e preferências visuais.
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveGame}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Save className="w-3.5 h-3.5" /> Salvar Jogo
        </button>
      </div>

      {/* Audio settings */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/90 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-blue-600" /> Preferências de Áudio &amp; Som
        </h3>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-slate-700 mb-1">
              <span>Música Ambiente</span>
              <span className="font-mono font-bold">{audioVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={audioVolume}
              onChange={(e) => setAudioVolume(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-700 mb-1">
              <span>Efeitos Sonoros (Caminhões, Rádio, Fábricas)</span>
              <span className="font-mono font-bold">{sfxVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Game System & Autosave */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/90 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-emerald-600" /> Sistema &amp; Dados
        </h3>

        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-slate-900 block">Salvamento Automático</span>
            <span className="text-[11px] text-slate-500">Salva o progresso no navegador a cada 60 segundos</span>
          </div>
          <button
            onClick={() => setAutosave(!autosave)}
            className={`w-12 h-6 rounded-full transition-colors relative ${autosave ? 'bg-emerald-600' : 'bg-slate-300'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${autosave ? 'left-6.5' : 'left-0.5'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-slate-900 block">Idioma da Interface</span>
            <span className="text-[11px] text-slate-500">Localização textual dos contratos e relatórios</span>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg px-3 py-1.5 outline-none"
          >
            <option>Português (Brasil)</option>
            <option>English (US)</option>
            <option>Español</option>
          </select>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-rose-700 block">Zona de Risco</span>
            <span className="text-[11px] text-slate-500">Limpar dados locais e reiniciar empresa do zero</span>
          </div>
          <button
            onClick={handleResetGame}
            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reiniciar Jogo
          </button>
        </div>
      </div>
    </div>
  );
};
