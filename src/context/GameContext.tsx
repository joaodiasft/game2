import React, { createContext, useContext, useState } from 'react';
import {
  NavigationTab,
  CompanyState,
  TechNode,
  ResearchQueueItem,
  Candidate,
  Employee,
  MaintenanceBay,
  SparePart,
  Contract,
  Facility,
  Competitor,
  TrainingProgram,
  CampaignAct,
  CampaignCrisis,
  CampaignNPC,
} from '../types/game';
import { INITIAL_ACTS, CAMPAIGN_NPCS, CAMPAIGN_CRISES } from '../data/campaignData';

interface CrisesHistoryEntry {
  crisisId: string;
  act: number;
  crisisTitle: string;
  choiceId: string;
  choiceLabel: string;
  date: string;
  impactSummary: string;
}

interface GameContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  company: CompanyState;
  setCompany: React.Dispatch<React.SetStateAction<CompanyState>>;
  updateCompanyName: (name: string, slogan: string) => void;
  togglePause: () => void;
  setSpeed: (speed: number) => void;

  // Tech
  techNodes: TechNode[];
  selectedTechId: string;
  setSelectedTechId: (id: string) => void;
  researchQueue: ResearchQueueItem[];
  activeResearchProgress: number;
  startResearch: (techId: string) => void;
  cancelResearch: () => void;
  clearQueue: () => void;

  // HR
  candidates: Candidate[];
  employees: Employee[];
  hireCandidate: (candidateId: string) => void;
  selectedCandidateModal: Candidate | null;
  openCandidateModal: (candidate: Candidate) => void;
  closeCandidateModal: () => void;
  trainingProgram: TrainingProgram[];

  // Maintenance
  maintenanceBays: MaintenanceBay[];
  spareParts: SparePart[];
  buyParts: (partId: string, amount: number) => void;
  assignVehicleToBay: (bayNumber: number) => void;

  // Contracts
  contracts: Contract[];
  acceptContract: (contractId: string) => void;
  renewContract: (contractId: string) => void;

  // Facilities
  facilities: Facility[];
  upgradeFacility: (facilityId: string) => void;
  purchaseFacility: (facilityId: string) => void;

  // Competitors
  competitors: Competitor[];
  attackCompetitor: (competitorId: string, action: 'steal_contract' | 'price_war') => void;

  // CAMPAIGN (DOCUMENTO 12)
  acts: CampaignAct[];
  currentActNumber: number;
  npcs: CampaignNPC[];
  crises: Record<string, CampaignCrisis>;
  crisesHistory: CrisesHistoryEntry[];
  activeCrisisModal: CampaignCrisis | null;
  selectedNpcForChat: CampaignNPC | null;
  openCrisisModal: (crisis: CampaignCrisis) => void;
  closeCrisisModal: () => void;
  resolveCrisis: (crisisId: string, choiceId: string) => void;
  advanceAct: (targetAct?: number) => void;
  openNpcChat: (npc: CampaignNPC) => void;
  closeNpcChat: () => void;
  talkToNpc: (npcId: string, responseIndex?: number) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('campanha');

  const [company, setCompany] = useState<CompanyState>({
    name: 'Barravento Logistics',
    slogan: 'Pequena Garagem. Grandes Horizontes.',
    level: 3,
    xp: 320,
    xpToNextLevel: 1000,
    cash: 128450,
    dailyProfit: 8320,
    localReputation: 62,
    regionalReputation: 28,
    gameDate: 'Seg, 14 Abr 2025',
    gameTime: '09:26',
    isPaused: false,
    gameSpeed: 1,
    temperature: 24,
    cityName: 'Rivermouth City',
    currentAct: 1,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const updateCompanyName = (name: string, slogan: string) => {
    setCompany((prev) => ({ ...prev, name, slogan }));
    showToast('Identidade da empresa atualizada com sucesso!');
  };

  const togglePause = () => {
    setCompany((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const setSpeed = (speed: number) => {
    setCompany((prev) => ({ ...prev, gameSpeed: speed, isPaused: false }));
  };

  // ==========================================
  // CAMPAIGN SYSTEM (DOCUMENTO 12)
  // ==========================================
  const [acts, setActs] = useState<CampaignAct[]>(INITIAL_ACTS);
  const [npcs, setNpcs] = useState<CampaignNPC[]>(CAMPAIGN_NPCS);
  const [crises, setCrises] = useState<Record<string, CampaignCrisis>>(CAMPAIGN_CRISES);
  const [crisesHistory, setCrisesHistory] = useState<CrisesHistoryEntry[]>([]);
  const [activeCrisisModal, setActiveCrisisModal] = useState<CampaignCrisis | null>(null);
  const [selectedNpcForChat, setSelectedNpcForChat] = useState<CampaignNPC | null>(null);

  const openCrisisModal = (crisis: CampaignCrisis) => {
    setActiveCrisisModal(crisis);
  };

  const closeCrisisModal = () => {
    setActiveCrisisModal(null);
  };

  const openNpcChat = (npc: CampaignNPC) => {
    setSelectedNpcForChat(npc);
  };

  const closeNpcChat = () => {
    setSelectedNpcForChat(null);
  };

  const resolveCrisis = (crisisId: string, choiceId: string) => {
    const crisis = crises[crisisId];
    if (!crisis) return;

    const choice = crisis.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    // Apply mechanical impacts
    setCompany((prev) => {
      const nextCash = Math.max(0, prev.cash + (choice.impact.cash || 0));
      const nextLocalRep = Math.min(100, Math.max(0, prev.localReputation + (choice.impact.localReputation || 0)));
      const nextRegionalRep = Math.min(100, Math.max(0, prev.regionalReputation + (choice.impact.regionalReputation || 0)));
      const nextDailyProfit = Math.max(0, prev.dailyProfit + (choice.impact.dailyProfit || 0));
      const nextXp = prev.xp + (choice.impact.xp || 150);

      return {
        ...prev,
        cash: nextCash,
        localReputation: nextLocalRep,
        regionalReputation: nextRegionalRep,
        dailyProfit: nextDailyProfit,
        xp: nextXp,
      };
    });

    // Mark crisis as resolved
    setCrises((prev) => ({
      ...prev,
      [crisisId]: {
        ...crisis,
        status: 'resolved',
        resolvedOptionId: choiceId,
        resolutionSummary: choice.impactSummary,
      },
    }));

    // Update Act objectives
    setActs((prev) =>
      prev.map((act) => {
        if (act.crisisId === crisisId) {
          const updatedObjs = act.objectives.map((obj) =>
            obj.id.includes('Crise') || obj.description.toLowerCase().includes('crise') || obj.id.endsWith('_3') || obj.id.endsWith('_2')
              ? { ...obj, current: 1, completed: true }
              : obj
          );
          return { ...act, objectives: updatedObjs };
        }
        return act;
      })
    );

    // Save in history
    setCrisesHistory((prev) => [
      {
        crisisId,
        act: crisis.act,
        crisisTitle: crisis.title,
        choiceId,
        choiceLabel: choice.label,
        date: company.gameDate,
        impactSummary: choice.impactSummary,
      },
      ...prev,
    ]);

    // Increase NPC affinity slightly
    setNpcs((prev) =>
      prev.map((npc) => (npc.id === crisis.npcId ? { ...npc, affinity: Math.min(100, npc.affinity + 6) } : npc))
    );

    setActiveCrisisModal(null);
    showToast(`Decisão tomada: "${choice.label}". Impactos aplicados à empresa!`);
  };

  const advanceAct = (targetAct?: number) => {
    const nextActNumber = targetAct || Math.min(7, company.currentAct + 1);

    setCompany((prev) => {
      const minLevelForAct = acts.find((a) => a.number === nextActNumber)?.minLevel || prev.level + 1;
      return {
        ...prev,
        currentAct: nextActNumber,
        level: Math.max(prev.level, minLevelForAct),
        xp: 100,
        xpToNextLevel: 1000 + nextActNumber * 500,
      };
    });

    setActs((prev) =>
      prev.map((act) => {
        if (act.number < nextActNumber) {
          return { ...act, status: 'completed' };
        } else if (act.number === nextActNumber) {
          return { ...act, status: 'active' };
        } else {
          return { ...act, status: 'locked' };
        }
      })
    );

    const nextActData = acts.find((a) => a.number === nextActNumber);
    showToast(`🎉 Parabéns! Sua empresa avançou para o Ato ${nextActNumber}: ${nextActData?.title}!`);
  };

  const talkToNpc = (npcId: string, responseIndex = 0) => {
    const npc = npcs.find((n) => n.id === npcId);
    if (!npc) return;

    setNpcs((prev) =>
      prev.map((n) => (n.id === npcId ? { ...n, affinity: Math.min(100, n.affinity + 3) } : n))
    );

    const dialogue = npc.dialogues[responseIndex % npc.dialogues.length];
    showToast(`${npc.name}: "${dialogue.quote}"`);
  };

  // ==========================================
  // TECH TREE
  // ==========================================
  const [techNodes, setTechNodes] = useState<TechNode[]>([
    {
      id: 'roteirizacao',
      name: 'Roteirização Avançada',
      level: 2,
      maxLevel: 3,
      status: 'completed',
      icon: 'MapPin',
      cost: 4500,
      durationDays: 3,
      description: 'Algoritmos heurísticos para cálculo de rotas com menores paradas e menor queima de combustível.',
      benefits: [
        { label: 'Consumo de Combustível', value: '-8%' },
        { label: 'Tempo Médio de Rota', value: '-12 min' },
      ],
      unlocks: ['telemetria'],
      parents: [],
      branch: 'ops',
    },
    {
      id: 'telemetria',
      name: 'Telemetria em Tempo Real',
      level: 1,
      maxLevel: 2,
      status: 'completed',
      icon: 'Radio',
      cost: 6200,
      durationDays: 4,
      description: 'Dispositivos IoT instalados nos veículos com transmissão contínua de velocidade, RPM e frenagens bruscas.',
      benefits: [
        { label: 'Desgaste dos Freios', value: '-15%' },
        { label: 'Visibilidade da Frota', value: '100% Ao Vivo' },
      ],
      unlocks: ['manutencao_preditiva'],
      parents: ['roteirizacao'],
      branch: 'ops',
    },
    {
      id: 'manutencao_preditiva',
      name: 'Manutenção Preditiva',
      level: 0,
      maxLevel: 2,
      status: 'researching',
      icon: 'Wrench',
      cost: 9800,
      durationDays: 5,
      description: 'Modelos de machine learning que antecipam falhas mecânicas com base na vibração e quilometragem.',
      benefits: [
        { label: 'Quebras Inesperadas', value: '-35%' },
        { label: 'Custo de Reparo Corretivo', value: '-20%' },
      ],
      unlocks: ['frota_autonoma'],
      parents: ['telemetria'],
      branch: 'ops',
    },
    {
      id: 'frota_autonoma',
      name: 'Assistência de Condução Autônoma',
      level: 0,
      maxLevel: 1,
      status: 'available',
      icon: 'Cpu',
      cost: 16500,
      durationDays: 8,
      description: 'Piloto automático adaptativo para comboios em rodovias estaduais e controle de faixa.',
      benefits: [
        { label: 'Fadiga do Motorista', value: '-40%' },
        { label: 'Segurança Rodoviária', value: '+25%' },
      ],
      unlocks: [],
      parents: ['manutencao_preditiva'],
      branch: 'ops',
    },
    {
      id: 'wms_estante',
      name: 'Verticalização WMS & Código de Barras',
      level: 1,
      maxLevel: 2,
      status: 'completed',
      icon: 'Boxes',
      cost: 5400,
      durationDays: 3,
      description: 'Organização em estantes verticais com endereçamento por rádio frequência e leitores biométricos.',
      benefits: [
        { label: 'Acuracidade de Estoque', value: '99.4%' },
        { label: 'Capacidade de Armazenagem', value: '+30%' },
      ],
      unlocks: ['esteiras_sorting'],
      parents: [],
      branch: 'warehouse',
    },
    {
      id: 'esteiras_sorting',
      name: 'Esteiras de Separação Rápida (Sorting)',
      level: 0,
      maxLevel: 2,
      status: 'available',
      icon: 'Layers',
      cost: 11200,
      durationDays: 6,
      description: 'Esteiras motorizadas de triagem contínua para expedição de até 800 pacotes por hora.',
      benefits: [
        { label: 'Velocidade de Despacho', value: '+45%' },
        { label: 'Erros de Separação', value: '-80%' },
      ],
      unlocks: ['cross_docking_ai'],
      parents: ['wms_estante'],
      branch: 'warehouse',
    },
    {
      id: 'cross_docking_ai',
      name: 'Cross-Docking Automatizado',
      level: 0,
      maxLevel: 1,
      status: 'locked',
      icon: 'Repeat',
      cost: 22000,
      durationDays: 10,
      description: 'Transferência direta de carga de caminhões de linha para vans de última milha sem estocagem prévia.',
      benefits: [
        { label: 'Tempo de Permanência em Hub', value: '< 20 min' },
        { label: 'Custo de Armazenagem', value: '-50%' },
      ],
      unlocks: [],
      parents: ['esteiras_sorting'],
      branch: 'warehouse',
    },
  ]);

  const [selectedTechId, setSelectedTechId] = useState<string>('manutencao_preditiva');
  const [researchQueue, setResearchQueue] = useState<ResearchQueueItem[]>([
    {
      id: 'q-1',
      techId: 'esteiras_sorting',
      name: 'Esteiras de Separação Rápida (Sorting)',
      durationDays: 6,
      cost: 11200,
      icon: 'Layers',
    },
  ]);
  const [activeResearchProgress, setActiveResearchProgress] = useState<number>(45);

  const startResearch = (techId: string) => {
    const tech = techNodes.find((t) => t.id === techId);
    if (!tech) return;

    if (company.cash < tech.cost) {
      showToast(`Saldo insuficiente para pesquisar ${tech.name} ($${tech.cost} necessários).`);
      return;
    }

    setCompany((prev) => ({ ...prev, cash: prev.cash - tech.cost }));
    setTechNodes((prev) =>
      prev.map((t) => (t.id === techId ? { ...t, status: 'researching' } : t))
    );
    showToast(`Pesquisa iniciada: ${tech.name}!`);
  };

  const cancelResearch = () => {
    showToast('Pesquisa ativa cancelada. Recursos reembolsados parcialmente.');
  };

  const clearQueue = () => {
    setResearchQueue([]);
    showToast('Fila de pesquisas limpa.');
  };

  // ==========================================
  // HR & CANDIDATES
  // ==========================================
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 'cand-1',
      name: 'Rogério Batista',
      role: 'Motorista Carreta Rodotrem (Cat. E)',
      department: 'Operações & Transporte',
      rating: 4.8,
      salary: 4850,
      tags: ['Pontualidade 98%', 'Curso MOPP', 'Direção Defensiva'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      actionType: 'Entrevista',
    },
    {
      id: 'cand-2',
      name: 'Juliana Fagundes',
      role: 'Supervisora de Armazém WMS',
      department: 'Armazenagem & Logística',
      rating: 4.9,
      salary: 5200,
      tags: ['Lean Logistics', 'Gestão de 15 pessoas', 'Black Belt'],
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      actionType: 'Teste prático',
    },
    {
      id: 'cand-3',
      name: 'Cinthia Alencar',
      role: 'Despachante Chefe de Tráfego',
      department: 'Planejamento de Rotas',
      rating: 4.7,
      salary: 4300,
      tags: ['Roteirização Avançada', 'Comunicação Rápida'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      actionType: 'Entrevista',
    },
    {
      id: 'cand-4',
      name: 'Marcos Vinicius',
      role: 'Mecânico Diesel Sênior',
      department: 'Manutenção & Oficina',
      rating: 4.6,
      salary: 4600,
      tags: ['Injeção Eletrônica Common Rail', 'Scania & Volvo'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      actionType: 'Avaliação',
    },
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 'emp-1',
      name: 'Carlos Mendes',
      role: 'Mecânico Chefe',
      department: 'Oficina',
      status: 'Em serviço',
      activeDays: 340,
      salary: 4500,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'emp-2',
      name: 'Roberto Souza',
      role: 'Motorista de Linha Pesada',
      department: 'Operações',
      status: 'Em trânsito (Rota BR-101)',
      activeDays: 280,
      salary: 4200,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'emp-3',
      name: 'Fernanda Lima',
      role: 'Despachante Operacional',
      department: 'Planejamento',
      status: 'No posto de rádio',
      activeDays: 190,
      salary: 3900,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'emp-4',
      name: 'Lucas Paiva',
      role: 'Operador de Empilhadeira',
      department: 'Armazém',
      status: 'Em expedição',
      activeDays: 145,
      salary: 2800,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    },
  ]);

  const [selectedCandidateModal, setSelectedCandidateModal] = useState<Candidate | null>(null);
  const openCandidateModal = (candidate: Candidate) => setSelectedCandidateModal(candidate);
  const closeCandidateModal = () => setSelectedCandidateModal(null);

  const hireCandidate = (candidateId: string) => {
    const candidate = candidates.find((c) => c.id === candidateId);
    if (!candidate) return;

    setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
    setEmployees((prev) => [
      ...prev,
      {
        id: `emp-${Date.now()}`,
        name: candidate.name,
        role: candidate.role,
        department: candidate.department,
        status: 'Disponível',
        activeDays: 1,
        salary: candidate.salary,
        avatar: candidate.avatar,
      },
    ]);
    setSelectedCandidateModal(null);
    showToast(`Parabéns! ${candidate.name} contratado(a) com sucesso!`);
  };

  const [trainingProgram] = useState<TrainingProgram[]>([
    { name: 'Direção Econômica & Defensiva', count: '14 motoristas inscritos', progress: 78 },
    { name: 'Normas de Segurança em Cargas Perigosas (MOPP)', count: '8 motoristas inscritos', progress: 92 },
    { name: 'Operação Segura de Empilhadeiras Elétricas', count: '6 operadores inscritos', progress: 64 },
    { name: 'Gestão Ágil de Estoque WMS', count: '4 supervisores inscritos', progress: 85 },
  ]);

  // ==========================================
  // MAINTENANCE & WORKSHOP
  // ==========================================
  const [maintenanceBays, setMaintenanceBays] = useState<MaintenanceBay[]>([
    {
      id: 1,
      bayNumber: 1,
      isAvailable: false,
      vehicleId: 'V-07',
      vehicleName: 'Mercedes-Benz Actros 2651',
      vehicleType: 'Cavalo Mecânico 6x4',
      serviceType: 'Troca de Injetores e Calibração',
      severity: 'emergency',
      progress: 68,
      remainingTime: '2h 15min',
      mechanic: 'Carlos Mendes',
      details: 'Falha no sistema de injeção direta durante subida de serra.',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      bayNumber: 2,
      isAvailable: false,
      vehicleId: 'V-04',
      vehicleName: 'Volvo FH 540 Globetrotter',
      vehicleType: 'Carreta Graneleira',
      serviceType: 'Revisão Preventiva dos 80.000 km',
      severity: 'scheduled',
      progress: 88,
      remainingTime: '45min',
      mechanic: 'Marcos Vinicius',
      details: 'Troca de óleo sintético, filtros de ar e alinhamento a laser.',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      bayNumber: 3,
      isAvailable: false,
      vehicleId: 'V-12',
      vehicleName: 'Iveco Daily 35-150 Furgão',
      vehicleType: 'Utilitário Urbano',
      serviceType: 'Substituição de Pastilhas de Freio',
      severity: 'normal',
      progress: 35,
      remainingTime: '3h 30min',
      mechanic: 'Carlos Mendes',
      details: 'Desgaste severo por paradas sucessivas no centro urbano.',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      bayNumber: 4,
      isAvailable: true,
    },
    {
      id: 5,
      bayNumber: 5,
      isAvailable: true,
    },
    {
      id: 6,
      bayNumber: 6,
      isAvailable: true,
    },
  ]);

  const [spareParts, setSpareParts] = useState<SparePart[]>([
    { id: 'p1', name: 'Pastilhas de Freio Pesadas', quantity: 12, unit: 'jogos', status: 'OK', price: 120 },
    { id: 'p2', name: 'Filtros de Óleo', quantity: 18, unit: 'un.', status: 'OK', price: 45 },
    { id: 'p3', name: 'Pneus 225/75 R16', quantity: 8, unit: 'un.', status: 'Baixo', price: 280 },
    { id: 'p4', name: 'Baterias 12v', quantity: 6, unit: 'un.', status: 'Crítico', price: 190 },
    { id: 'p5', name: 'Óleo de Motor 15W40', quantity: 45, unit: 'L', status: 'OK', price: 15 },
  ]);

  const buyParts = (partId: string, amount: number) => {
    const part = spareParts.find((p) => p.id === partId);
    if (!part) return;
    const cost = part.price * amount;
    setCompany((prev) => ({ ...prev, cash: prev.cash - cost }));
    setSpareParts((prev) =>
      prev.map((p) =>
        p.id === partId ? { ...p, quantity: p.quantity + amount, status: 'OK' } : p
      )
    );
    showToast(`Compradas ${amount} ${part.unit} de ${part.name} por $${cost}.`);
  };

  const assignVehicleToBay = (bayNumber: number) => {
    setMaintenanceBays((prev) =>
      prev.map((b) =>
        b.bayNumber === bayNumber
          ? {
              ...b,
              isAvailable: false,
              vehicleId: 'V-02',
              vehicleName: 'Ford Transit 350L',
              vehicleType: 'Van',
              serviceType: 'Revisão Preventiva',
              severity: 'normal',
              progress: 10,
              remainingTime: '1h 45min',
              mechanic: 'Carlos Mendes',
              details: 'Inspeção e alinhamento de direção',
            }
          : b
      )
    );
    showToast(`Veículo V-02 designado para a Baia ${bayNumber}!`);
  };

  // ==========================================
  // CONTRACTS & CLIENTS
  // ==========================================
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: 'beltrao_corp',
      clientName: 'Distribuidora Beltrão Alimentos',
      segment: 'Atacado & Distribuição Alimentícia',
      category: 'Corporativo',
      contractType: 'Contrato Âncora Anual',
      monthlyValue: 34000,
      volume: '6 rotas diárias garantidas',
      durationMonths: 12,
      satisfaction: 98,
      status: 'ativo',
    },
    {
      id: 'alvorada',
      clientName: 'Supermercados Alvorada',
      segment: 'Varejo Alimentício',
      category: 'Varejo',
      contractType: 'Contrato Anual',
      monthlyValue: 24000,
      volume: '4 rotas diárias',
      durationMonths: 12,
      satisfaction: 98,
      status: 'ativo',
    },
    {
      id: 'vale_aco',
      clientName: 'Metalúrgica Vale do Aço',
      segment: 'Indústria Pesada',
      category: 'Indústria',
      contractType: 'Contrato Semestral',
      monthlyValue: 38500,
      volume: '8 carretas / semana',
      durationMonths: 6,
      satisfaction: 92,
      status: 'ativo',
    },
    {
      id: 'farmacias_vida',
      clientName: 'Farmácias Vida & Saúde',
      segment: 'Farmacêutico / Sensível',
      category: 'Corporativo',
      contractType: 'Contrato Bianual',
      monthlyValue: 28000,
      volume: 'Carga refrigerada',
      durationMonths: 24,
      satisfaction: 99,
      status: 'ativo',
    },
    {
      id: 'prop-1',
      clientName: 'Rede Farma Mais',
      segment: 'Distribuição Farmacêutica',
      category: 'Corporativo',
      contractType: 'Contrato Anual',
      monthlyValue: 26000,
      volume: '3 carretas refrigeradas/sem',
      durationMonths: 12,
      satisfaction: 95,
      status: 'proposta',
    },
    {
      id: 'prop-2',
      clientName: 'Grãos & Agro Export',
      segment: 'Agronegócio',
      category: 'Indústria',
      contractType: 'Contrato Safra',
      monthlyValue: 32000,
      volume: '15 viagens porto/mês',
      durationMonths: 6,
      satisfaction: 91,
      status: 'proposta',
    },
  ]);

  const acceptContract = (contractId: string) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === contractId ? { ...c, status: 'ativo' } : c))
    );
    setCompany((prev) => ({
      ...prev,
      dailyProfit: prev.dailyProfit + 1200,
      localReputation: Math.min(100, prev.localReputation + 4),
      xp: prev.xp + 150,
    }));
    showToast('Novo contrato comercial assinado com sucesso!');
  };

  const renewContract = (contractId: string) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === contractId
          ? { ...c, durationMonths: c.durationMonths + 12, monthlyValue: Math.round(c.monthlyValue * 1.08) }
          : c
      )
    );
    showToast('Contrato renovado por mais 12 meses com reajuste de +8%!');
  };

  // ==========================================
  // FACILITIES
  // ==========================================
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: 'fac-1',
      name: 'Sede Principal - Rivermouth Central',
      city: 'Rivermouth City',
      type: 'Sede & Garagem',
      level: 3,
      capacity: '4.500 m²',
      bays: 6,
      docks: 4,
      employees: 24,
      monthlyCost: 14200,
      efficiency: 94,
    },
    {
      id: 'fac-2',
      name: 'Centro de Distribuição - Port Terminal',
      city: 'Port Terminal',
      type: 'Centro de Distribuição',
      level: 2,
      capacity: '8.000 m²',
      bays: 4,
      docks: 12,
      employees: 16,
      monthlyCost: 18500,
      efficiency: 86,
    },
    {
      id: 'fac-3',
      name: 'Armazém Avançado - Eastvale Hub',
      city: 'Eastvale',
      type: 'Armazém Avançado',
      level: 1,
      capacity: '3.500 m²',
      bays: 2,
      docks: 6,
      employees: 8,
      monthlyCost: 6800,
      efficiency: 82,
    },
    {
      id: 'fac-4',
      name: 'Posto de Apoio - Crossroads Station',
      city: 'Crossroads',
      type: 'Posto de Apoio',
      level: 1,
      capacity: '2.000 m²',
      bays: 2,
      docks: 2,
      employees: 4,
      monthlyCost: 3100,
      efficiency: 91,
    },
    {
      id: 'fac-5',
      name: 'Terreno Disponível - Northside Logistics Park',
      city: 'Northside',
      type: 'Terreno Disponível',
      level: 0,
      capacity: '12.000 m²',
      bays: 0,
      docks: 0,
      employees: 0,
      monthlyCost: 0,
      efficiency: 0,
      isAvailableForPurchase: true,
      purchaseCost: 85000,
    },
  ]);

  const upgradeFacility = (facilityId: string) => {
    const fac = facilities.find((f) => f.id === facilityId);
    if (!fac) return;
    const upgradeCost = fac.level * 15000;
    if (company.cash < upgradeCost) {
      showToast(`Fundos insuficientes para expandir ($${upgradeCost} necessários).`);
      return;
    }
    setCompany((prev) => ({
      ...prev,
      cash: prev.cash - upgradeCost,
      regionalReputation: Math.min(100, prev.regionalReputation + 3),
    }));
    setFacilities((prev) =>
      prev.map((f) => (f.id === facilityId ? { ...f, level: f.level + 1, efficiency: Math.min(100, f.efficiency + 4) } : f))
    );
    showToast(`Instalação "${fac.name}" promovida ao Nível ${fac.level + 1}!`);
  };

  const purchaseFacility = (facilityId: string) => {
    const fac = facilities.find((f) => f.id === facilityId);
    if (!fac || !fac.isAvailableForPurchase) return;
    if (company.cash < (fac.purchaseCost || 0)) {
      showToast(`Fundos insuficientes para compra de terreno ($${fac.purchaseCost?.toLocaleString()} necessários).`);
      return;
    }
    setCompany((prev) => ({
      ...prev,
      cash: prev.cash - fac.purchaseCost!,
      regionalReputation: Math.min(100, prev.regionalReputation + 8),
    }));
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === facilityId
          ? {
              ...f,
              name: f.name.replace('Terreno Disponível - ', 'Centro Operacional - '),
              type: 'Centro de Distribuição',
              level: 1,
              bays: 4,
              docks: 8,
              employees: 10,
              monthlyCost: 9500,
              efficiency: 85,
              isAvailableForPurchase: false,
            }
          : f
      )
    );
    showToast(`Terreno adquirido! Nova base em obras.`);
  };

  // ==========================================
  // COMPETITORS (INCLUDING TRANSRÁPIDA LOG.)
  // ==========================================
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: 'barravento',
      name: 'Barravento Logistics',
      rank: 2,
      marketShare: 28,
      fleetCount: 22,
      facilitiesCount: 4,
      reputation: 88,
      pricing: 'Moderado e transparente',
      reliability: 'Alta (92% no prazo)',
      strengths: 'Pontualidade rigorosa, suporte local dedicado, alta satisfação do cliente.',
      weaknesses: 'Menor presença nas rotas metropolitanas do extremo norte.',
      color: '#0284c7',
      isPlayer: true,
    },
    {
      id: 'transglobal',
      name: 'TransGlobal Express',
      rank: 1,
      marketShare: 33,
      fleetCount: 38,
      facilitiesCount: 6,
      reputation: 82,
      pricing: 'Elevado / Corporativo',
      reliability: 'Alta (89% no prazo)',
      strengths: 'Grande frota pesada, contratos corporativos globais, presença interestadual.',
      weaknesses: 'Atendimento impessoal, tarifas rígidas e burocracia de despacho.',
      color: '#ef4444',
      isPlayer: false,
    },
    {
      id: 'transrapida',
      name: 'TransRápida Log. (Valdemir)',
      rank: 3,
      marketShare: 18,
      fleetCount: 18,
      facilitiesCount: 3,
      reputation: 74,
      pricing: 'Agressivo / Guerra de Preços',
      reliability: 'Média (82% no prazo)',
      strengths: 'Rival histórico direto, pressão de preços na Zona Comercial, contatos em fretes rápidos.',
      weaknesses: 'Alto endividamento, avarias frequentes e alta rotatividade de motoristas.',
      color: '#e11d48',
      isPlayer: false,
    },
    {
      id: 'rapido_sul',
      name: 'Rápido Sul Logística',
      rank: 4,
      marketShare: 13,
      fleetCount: 14,
      facilitiesCount: 2,
      reputation: 79,
      pricing: 'Baixo / Descontos agressivos',
      reliability: 'Média (81% no prazo)',
      strengths: 'Preços competitivos, consolidação em rotas agrícolas do sul.',
      weaknesses: 'Frota envelhecida, manutenção corretiva frequente.',
      color: '#3b82f6',
      isPlayer: false,
    },
    {
      id: 'veloce',
      name: 'Veloce Cargas',
      rank: 5,
      marketShare: 8,
      fleetCount: 8,
      facilitiesCount: 2,
      reputation: 84,
      pricing: 'Moderado',
      reliability: 'Alta (91% no prazo)',
      strengths: 'Entregas urbanas rápidas e bom aplicativo mobile.',
      weaknesses: 'Pouca capacidade para cargas pesadas.',
      color: '#8b5cf6',
      isPlayer: false,
    },
  ]);

  const attackCompetitor = (competitorId: string, action: 'steal_contract' | 'price_war') => {
    const comp = competitors.find((c) => c.id === competitorId);
    if (!comp) return;

    if (action === 'steal_contract') {
      setCompetitors((prev) =>
        prev.map((c) => {
          if (c.isPlayer) return { ...c, marketShare: c.marketShare + 2 };
          if (c.id === competitorId) return { ...c, marketShare: Math.max(1, c.marketShare - 2) };
          return c;
        })
      );
      setCompany((prev) => ({
        ...prev,
        cash: prev.cash + 12000,
        dailyProfit: prev.dailyProfit + 450,
      }));
      showToast(`Contrato disputado com sucesso contra ${comp.name}!`);
    } else {
      setCompetitors((prev) =>
        prev.map((c) => {
          if (c.isPlayer) return { ...c, marketShare: c.marketShare + 1 };
          if (c.id === competitorId) return { ...c, marketShare: Math.max(1, c.marketShare - 1) };
          return c;
        })
      );
      showToast(`Guerra de preços iniciada no território de ${comp.name}.`);
    }
  };

  return (
    <GameContext.Provider
      value={{
        activeTab,
        setActiveTab,
        company,
        setCompany,
        updateCompanyName,
        togglePause,
        setSpeed,

        // Tech
        techNodes,
        selectedTechId,
        setSelectedTechId,
        researchQueue,
        activeResearchProgress,
        startResearch,
        cancelResearch,
        clearQueue,

        // HR
        candidates,
        employees,
        hireCandidate,
        selectedCandidateModal,
        openCandidateModal,
        closeCandidateModal,
        trainingProgram,

        // Maintenance
        maintenanceBays,
        spareParts,
        buyParts,
        assignVehicleToBay,

        // Contracts
        contracts,
        acceptContract,
        renewContract,

        // Facilities
        facilities,
        upgradeFacility,
        purchaseFacility,

        // Competitors
        competitors,
        attackCompetitor,

        // Campaign (Documento 12)
        acts,
        currentActNumber: company.currentAct,
        npcs,
        crises,
        crisesHistory,
        activeCrisisModal,
        selectedNpcForChat,
        openCrisisModal,
        closeCrisisModal,
        resolveCrisis,
        advanceAct,
        openNpcChat,
        closeNpcChat,
        talkToNpc,

        // Toast
        toastMessage,
        showToast,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
