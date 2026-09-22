import React, { useState } from 'react';
import { X, MessageSquare, Heart, Sparkles, Check, ArrowRight } from 'lucide-react';
import { CampaignNPC } from '../../types/game';
import { useGame } from '../../context/GameContext';

interface NpcDialogueModalProps {
  npc: CampaignNPC;
  onClose: () => void;
}

export const NpcDialogueModal: React.FC<NpcDialogueModalProps> = ({ npc, onClose }) => {
  const { talkToNpc, showToast } = useGame();
  const [selectedResponseIndex, setSelectedResponseIndex] = useState<number | null>(null);
  const [hasResponded, setHasResponded] = useState(false);

  const activeDialogue = npc.dialogues[0];

  const handleSendResponse = (idx: number) => {
    setSelectedResponseIndex(idx);
    setHasResponded(true);
    talkToNpc(npc.id, idx);
    showToast(`Afinidade com ${npc.name} aumentou!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#0f1936] to-[#0a1024] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-900/90 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-3xl shadow-md">
              {npc.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base tracking-tight">
                  {npc.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {npc.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400">{npc.role}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Affinity & Active Perk Card */}
          <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> Afinidade Comercial
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${npc.affinity}%` }}
                  />
                </div>
                <span className="font-bold text-white tabular-nums">{npc.affinity}%</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Bônus Ativo
              </span>
              <p className="text-cyan-300 font-semibold text-[11px] mt-1 leading-snug truncate" title={npc.perk}>
                {npc.perk}
              </p>
            </div>
          </div>

          {/* Dialogue speech bubble */}
          <div className="relative bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 text-slate-200">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> {activeDialogue.context}
            </div>
            <p className="text-xs md:text-sm font-medium italic text-slate-100 leading-relaxed">
              "{activeDialogue.quote}"
            </p>
          </div>

          {/* Player Response Choices */}
          <div className="space-y-2">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">
              Sua Resposta:
            </span>

            {npc.dialogues.map((dlg, idx) => {
              const isSelected = selectedResponseIndex === idx;

              return (
                <button
                  key={idx}
                  disabled={hasResponded}
                  onClick={() => handleSendResponse(idx)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between gap-3 text-xs font-medium ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md'
                      : hasResponded
                      ? 'opacity-50 bg-slate-900 border-slate-800 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900/90 hover:bg-slate-800/80 border-slate-700 text-slate-200 hover:border-cyan-500/50'
                  }`}
                >
                  <span className="flex-1 leading-relaxed">
                    👉 "{dlg.responseOption}"
                  </span>
                  {isSelected ? (
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            {hasResponded ? 'Concluir Conversa' : 'Fechar'}
          </button>
        </div>
      </div>
    </div>
  );
};
