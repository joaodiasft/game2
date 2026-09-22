import React, { useState } from 'react';
import {
  AlertTriangle,
  X,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { CampaignCrisis, CrisisChoice } from '../../types/game';

interface CrisisModalProps {
  crisis: CampaignCrisis;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ crisis, onClose }) => {
  const { resolveCrisis } = useGame();
  const [selectedChoice, setSelectedChoice] = useState<CrisisChoice | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmDecision = () => {
    if (!selectedChoice) return;
    resolveCrisis(crisis.id, selectedChoice.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#0e172e] via-[#091024] to-[#060b18] border-2 border-rose-500/50 rounded-2xl shadow-2xl shadow-rose-950/50 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header with Alert */}
        <div className="bg-gradient-to-r from-rose-950/90 via-red-900/60 to-amber-950/80 px-6 py-4 border-b border-rose-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-400 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/30 animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-sm">
                  Crise do Ato {crisis.act}
                </span>
                <span className="text-xs font-semibold text-rose-200">
                  Decisão de Gestão Crítica
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white tracking-tight mt-0.5">
                {crisis.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            title="Fechar (a crise permanecerá pendente)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
          {/* NPC Dialogue & Context Story Box */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-700/80 p-5 shadow-inner">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shrink-0 shadow-md">
                {crisis.npcAvatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    {crisis.npcName}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-medium border border-cyan-500/30">
                    {crisis.npcRole}
                  </span>
                </div>
                <div className="mt-2 text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-medium bg-black/30 p-3 rounded-lg border border-slate-800">
                  {crisis.contextStory}
                </div>
              </div>
            </div>

            {/* Design Philosophy Warning Banner */}
            <div className="mt-4 flex items-center gap-2.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Atenção:</strong> Não há resposta óbvia. Toda decisão possui benefícios e concessões (trade-offs) que deixarão marcas permanentes na sua trajetória!
              </span>
            </div>
          </div>

          {/* 3 Strategic Choices */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Escolha Sua Resposta Estratégica (1 de 3)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {crisis.choices.map((choice, idx) => {
                const isSelected = selectedChoice?.id === choice.id;

                return (
                  <div
                    key={choice.id}
                    onClick={() => {
                      setSelectedChoice(choice);
                      setIsConfirming(false);
                    }}
                    className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border flex flex-col justify-between relative text-left ${
                      isSelected
                        ? 'bg-gradient-to-b from-sky-950/90 to-blue-950/80 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/40'
                        : 'bg-[#0c142b]/90 hover:bg-[#101b38] border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          Opção 0{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                        {choice.label}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {choice.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-700/60 space-y-2 mt-auto">
                      {/* Tradeoff Box */}
                      <div className="text-[11px] text-amber-300/90 bg-amber-950/40 px-2.5 py-1.5 rounded border border-amber-500/20 font-medium leading-tight">
                        <strong className="text-amber-400">Trade-off:</strong> {choice.tradeoff}
                      </div>

                      {/* Impacts Badges */}
                      <div className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/40 px-2.5 py-1.5 rounded border border-emerald-500/20 leading-tight">
                        <strong className="text-emerald-400">Impacto:</strong> {choice.impactSummary}
                      </div>

                      {choice.impact.specialBenefit && (
                        <div className="text-[10px] text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/20">
                          ✨ {choice.impact.specialBenefit}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer with Action */}
        <div className="p-4 bg-[#080d1e] border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {selectedChoice ? (
              <span className="text-cyan-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Opção selecionada: <span className="text-white underline">{selectedChoice.label}</span>
              </span>
            ) : (
              <span className="text-slate-400">
                Selecione uma das 3 opções acima para deliberar o futuro da empresa.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Pensar com Mais Calma
            </button>

            {selectedChoice && !isConfirming && (
              <button
                onClick={() => setIsConfirming(true)}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5"
              >
                Aplicar Decisão <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {selectedChoice && isConfirming && (
              <button
                onClick={handleConfirmDecision}
                className="px-5 py-2 rounded-lg text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/30 animate-pulse transition-all flex items-center gap-1.5"
              >
                Confirmar e Assumir Consequências <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
