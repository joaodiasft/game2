import React, { useState } from 'react';
import {
  Compass,
  Trophy,
  AlertTriangle,
  Building,
  Warehouse,
  Truck,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Flame,
  MessageSquare,
  Award,
  Layers,
  MapPin,
  Globe2,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { CampaignAct, CampaignCrisis, CampaignNPC } from '../../types/game';
import { CrisisModal } from '../modals/CrisisModal';
import { NpcDialogueModal } from '../modals/NpcDialogueModal';

export const CampanhaView: React.FC = () => {
  const {
    acts,
    company,
    npcs,
    crises,
    crisesHistory,
    openCrisisModal,
    activeCrisisModal,
    closeCrisisModal,
    selectedNpcForChat,
    openNpcChat,
    closeNpcChat,
    advanceAct,
    showToast,
  } = useGame();

  const [selectedActNumber, setSelectedActNumber] = useState<number>(company.currentAct);

  const selectedAct = acts.find((a) => a.number === selectedActNumber) || acts[0];
  const activeActData = acts.find((a) => a.number === company.currentAct) || acts[0];
  const crisisForSelectedAct: CampaignCrisis | undefined = crises[selectedAct.crisisId];

  const npcsForSelectedAct = npcs.filter((npc) => selectedAct.npcs.includes(npc.id));

  // Determine visual icon and color scheme for HQ
  const getActVisualBadge = (actNumber: number) => {
    switch (actNumber) {
      case 1:
        return { icon: Warehouse, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
      case 2:
        return { icon: Building, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
      case 3:
        return { icon: Truck, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
      case 4:
        return { icon: MapPin, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
      case 5:
        return { icon: Layers, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' };
      case 6:
        return { icon: Globe2, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' };
      case 7:
        return { icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' };
      default:
        return { icon: Building, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
    }
  };

  const currentVisual = getActVisualBadge(selectedAct.number);
  const VisualIcon = currentVisual.icon;

  const isCurrentAct = selectedAct.number === company.currentAct;
  const isActCompleted = selectedAct.number < company.currentAct || selectedAct.status === 'completed';
  const isActLocked = selectedAct.number > company.currentAct && selectedAct.status === 'locked';

  const allObjectivesCompleted = selectedAct.objectives.every((o) => o.completed);

  return (
    <div className="flex-1 bg-[#080d1a] text-slate-100 overflow-y-auto p-5 space-y-6 select-none font-sans custom-scrollbar">
      {/* 1. Header Banner: Campaign Identity */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c162b] via-[#101e3b] to-[#0d172e] border border-slate-800 p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                CAMPANHA PRINCIPAL • DA GARAGEM AO IMPÉRIO
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Progressão Não Linear
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Evolução da Transportadora
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Cada ato transforma a estrutura física, os desafios operacionais e a escala do seu negócio. Domine as rotas, solucione crises executivas e construa uma multinacional de logística.
            </p>
          </div>

          {/* Quick Act Status Card */}
          <div className="flex items-center gap-3 bg-[#0a1224] p-3.5 rounded-xl border border-slate-700/80 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 font-black text-lg">
              {company.currentAct}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
                Ato em Andamento
              </span>
              <span className="text-sm font-extrabold text-white">
                {activeActData.title}
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                {activeActData.levelRange}
              </span>
            </div>
          </div>
        </div>

        {/* 7 Acts Horizontal Stepper Navigator */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {acts.map((act) => {
              const isSelected = selectedActNumber === act.number;
              const isActive = act.number === company.currentAct;
              const isDone = act.number < company.currentAct;
              const isLocked = act.number > company.currentAct;

              return (
                <button
                  key={act.number}
                  onClick={() => setSelectedActNumber(act.number)}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-200 relative group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-sky-900/90 to-blue-950 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                      : isActive
                      ? 'bg-slate-900/90 hover:bg-slate-800/80 border-cyan-500/40 text-slate-200'
                      : isDone
                      ? 'bg-slate-900/50 hover:bg-slate-800/60 border-slate-700/60 text-slate-300'
                      : 'bg-slate-950/40 hover:bg-slate-900/50 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950'
                          : isDone
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Ato 0{act.number}
                    </span>

                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                    {isLocked && <Lock className="w-3 h-3 text-slate-600" />}
                  </div>

                  <div className="mt-1">
                    <span className="text-xs font-bold block truncate text-white">
                      {act.title}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {act.levelRange}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Content for the Selected Act */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: HQ Visual Evolution & Central Fantasy */}
        <div className="lg:col-span-2 space-y-6">
          {/* Act Fantasy & Evolution Card */}
          <div className="bg-[#0e1628] rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${currentVisual.bg} flex items-center justify-center shrink-0 shadow-inner`}>
                  <VisualIcon className={`w-6 h-6 ${currentVisual.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-cyan-400 tracking-wider">
                      Ato {selectedAct.number}: {selectedAct.title}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {selectedAct.levelRange}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white mt-0.5">
                    {selectedAct.subtitle}
                  </h2>
                </div>
              </div>

              {isCurrentAct && (
                <span className="px-3 py-1 rounded-md text-xs font-extrabold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Ato Ativo
                </span>
              )}

              {isActCompleted && (
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Concluído
                </span>
              )}
            </div>

            {/* Central Fantasy Narrative Text */}
            <div className="bg-[#091122] rounded-xl p-4 border border-slate-800 text-xs md:text-sm text-slate-200 leading-relaxed font-normal">
              <strong className="text-cyan-400 font-semibold block mb-1">
                Fantasia Central do Estágio:
              </strong>
              {selectedAct.fantasy}
            </div>

            {/* Headquarters Visual Blueprint representation */}
            <div className="mt-5 p-5 rounded-xl bg-[#091122] border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Sede da Operação: {selectedAct.hqName}
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  Infraestrutura Física
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-4 bg-[#060b17] p-3 rounded-lg border border-slate-800/80">
                "{selectedAct.visualSummary}"
              </p>

              {/* Physical Facilities Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedAct.hqFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-200 bg-[#0c162b] px-3 py-2 rounded-lg border border-slate-800"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="font-medium truncate">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Capacity Meters */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs bg-[#0c162b] px-3 py-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-cyan-400" /> Vagas no Pátio
                  </span>
                  <span className="font-bold text-white tabular-nums font-mono">
                    {selectedAct.hqVehicleSlots} veículos
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs bg-[#0c162b] px-3 py-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" /> Vagas de Equipe
                  </span>
                  <span className="font-bold text-white tabular-nums font-mono">
                    {selectedAct.hqStaffSlots} profissionais
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Crisis Banner: Mandatory Crisis Event */}
          {crisisForSelectedAct && (
            <div className="bg-[#0e1628] rounded-2xl border border-rose-500/40 p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">
                      Crise Obrigatória de Virada
                    </span>
                    <h3 className="text-base font-black text-white">
                      {crisisForSelectedAct.title}
                    </h3>
                  </div>
                </div>

                {crisisForSelectedAct.status === 'resolved' ? (
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5" /> Decisão Resolvida
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-md text-xs font-black bg-rose-500/10 text-rose-300 border border-rose-500/30 flex items-center gap-1 animate-pulse">
                    <Flame className="w-3.5 h-3.5 text-rose-400" /> Decisão Pendente
                  </span>
                )}
              </div>

              {/* Crisis Teaser & NPC Quote */}
              <div className="bg-[#091122] rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
                    {crisisForSelectedAct.npcAvatar}
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">
                        {crisisForSelectedAct.npcName}
                      </span>
                      <span className="text-[10px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                        {crisisForSelectedAct.npcRole}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-normal">
                      "{crisisForSelectedAct.teaser}"
                    </p>
                  </div>
                </div>

                {crisisForSelectedAct.status === 'resolved' && (
                  <div className="pt-3 border-t border-slate-800 text-xs">
                    <span className="text-emerald-400 font-bold block mb-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolução Adotada:
                    </span>
                    <p className="text-slate-200">
                      {crisisForSelectedAct.resolutionSummary}
                    </p>
                  </div>
                )}
              </div>

              {/* Button to Open/Review Crisis Modal */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-[11px] text-slate-400">
                  {crisisForSelectedAct.status === 'pending'
                    ? 'Tome uma decisão estratégica agora para definir a rota executiva da empresa.'
                    : 'A marca desta decisão já faz parte da história e da cultura da sua transportadora.'}
                </div>

                <button
                  onClick={() => openCrisisModal(crisisForSelectedAct)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
                    crisisForSelectedAct.status === 'pending'
                      ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {crisisForSelectedAct.status === 'pending' ? (
                    <>
                      Resolver Crise do Ato <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      Rever Detalhes da Decisão <FileText className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Section: Unlocks of the Act */}
          <div className="bg-[#0e1628] rounded-2xl border border-slate-800 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Desbloqueios &amp; Novas Capacidades Operacionais
                </h3>
              </div>
              <span className="text-[11px] text-cyan-400 font-semibold font-mono">
                {selectedAct.unlocks.length} Recursos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedAct.unlocks.map((unlock, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#091122] border border-slate-800/90 text-xs text-slate-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 font-bold text-xs font-mono">
                    {idx + 1}
                  </div>
                  <span className="font-semibold">{unlock}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Objectives, NPCs and Progression */}
        <div className="space-y-6">
          {/* Act Objectives Checklist */}
          <div className="bg-[#0e1628] rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Metas do Ato {selectedAct.number}
                </h3>
              </div>
              <span className="text-[11px] text-amber-300 font-bold font-mono">
                {selectedAct.objectives.filter((o) => o.completed).length} / {selectedAct.objectives.length} Concluídas
              </span>
            </div>

            <div className="space-y-3">
              {selectedAct.objectives.map((obj) => (
                <div
                  key={obj.id}
                  className={`p-3.5 rounded-xl border text-xs transition-all ${
                    obj.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                      : 'bg-[#091122] border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className={`font-bold ${obj.completed ? 'text-emerald-400 line-through' : 'text-white'}`}>
                      {obj.title}
                    </span>
                    {obj.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-[10px] text-amber-400 font-bold font-mono">
                        {obj.current} / {obj.target}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2 leading-relaxed font-normal">
                    {obj.description}
                  </p>
                  <div className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/20">
                    Recompensa: {obj.reward}
                  </div>
                </div>
              ))}
            </div>

            {/* Advance Act Action Button */}
            {isCurrentAct && (
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => advanceAct()}
                  disabled={company.currentAct >= 7}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  {allObjectivesCompleted
                    ? `Avançar para o Ato ${company.currentAct + 1} 🎉`
                    : `Concluir e Promover para o Próximo Ato`}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* NPCs of the Act */}
          <div className="bg-[#0e1628] rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Conselheiros &amp; Contatos do Ato
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {npcsForSelectedAct.length} Contatos
              </span>
            </div>

            <div className="space-y-3">
              {npcsForSelectedAct.map((npc) => (
                <div
                  key={npc.id}
                  className="p-3.5 rounded-xl bg-[#091122] border border-slate-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center text-xl shrink-0">
                        {npc.avatar}
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs block">
                          {npc.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate max-w-[150px]">
                          {npc.role}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-cyan-500/30">
                      {npc.badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-snug font-normal">
                    {npc.description}
                  </p>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                    <div className="text-[10px] text-amber-300 font-semibold truncate flex-1" title={npc.perk}>
                      ✨ {npc.perk}
                    </div>

                    <button
                      onClick={() => openNpcChat(npc)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3" /> Conversar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Legacy / Crises Log */}
          {crisesHistory.length > 0 && (
            <div className="bg-[#0e1628] rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Histórico de Decisões Decisivas
                </h3>
              </div>

              <div className="space-y-2">
                {crisesHistory.map((hist, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#091122] border border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-bold text-cyan-400">Ato 0{hist.act}</span>
                      <span className="font-mono">{hist.date}</span>
                    </div>
                    <span className="font-bold text-white block mb-0.5">
                      {hist.choiceLabel}
                    </span>
                    <span className="text-[11px] text-emerald-300 font-medium">
                      {hist.impactSummary}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {activeCrisisModal && (
        <CrisisModal crisis={activeCrisisModal} onClose={closeCrisisModal} />
      )}

      {selectedNpcForChat && (
        <NpcDialogueModal npc={selectedNpcForChat} onClose={closeNpcChat} />
      )}
    </div>
  );
};
