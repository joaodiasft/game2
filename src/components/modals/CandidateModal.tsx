import React from 'react';
import { X, Star, DollarSign, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const CandidateModal: React.FC = () => {
  const { selectedCandidateModal, closeCandidateModal, hireCandidate, showToast } = useGame();

  if (!selectedCandidateModal) return null;

  const candidate = selectedCandidateModal;

  const handleAction = () => {
    showToast(`${candidate.actionType} realizado com sucesso para ${candidate.name}! Parecer favorável.`);
    closeCandidateModal();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{candidate.avatar}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-slate-900 text-base">{candidate.name}</h3>
                <span className="text-xs font-bold text-amber-600 flex items-center">
                  ★ {candidate.rating}
                </span>
              </div>
              <span className="text-xs text-blue-600 font-semibold">{candidate.role}</span>
            </div>
          </div>

          <button
            onClick={closeCandidateModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details body */}
        <div className="py-4 space-y-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Pretensão Salarial</span>
            <span className="text-lg font-extrabold text-slate-900 font-mono">
              $ {candidate.salary.toLocaleString()}/mês
            </span>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-700 block mb-1.5">Competências e Habilidades</span>
            <div className="flex flex-wrap gap-1.5">
              {candidate.tags.map((tag) => (
                <span key={tag} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-800 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Histórico Verificado
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-700">
              Profissional com referências positivas em empresas de transporte rodoviário e logística integrada.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => {
              hireCandidate(candidate.id);
              closeCandidateModal();
            }}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
          >
            Contratar Imediatamente
          </button>
          <button
            onClick={handleAction}
            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Realizar {candidate.actionType}
          </button>
        </div>
      </div>
    </div>
  );
};
