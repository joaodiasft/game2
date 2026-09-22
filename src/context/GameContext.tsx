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
} from '../types/game';

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

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('relatorios');

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
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
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

  // Tech state
  const [techNodes, setTechNodes] = useState<TechNode[]>([
    {
      id: 'roteirizacao',
      name: 'Roteirização Avançada',
      level: 1,
      maxLevel: 3,
      status: 'completed',
      icon: 'Route',
      cost: 800,
      durationDays: 2,
      description: 'Algoritmos dinâmicos de cálculo de rotas considerando tráfego, pedágios e relevo.',
      benefits: [
        { label: 'Custos de Combustível', value: '-15%' },
        { label: 'Tempo de Viagem', value: '-12%' },
      ],
      unlocks: ['Manutenção Preditiva'],
      parents: [],
      branch: 'ops',
    },
    {
      id: 'manutencao_preditiva',
      name: 'Manutenção Preditiva',
      level: 1,
      maxLevel: 3,
      status: 'researching',
      icon: 'Wrench',
      cost: 1200,
      durationDays: 3,
      description: 'Analisa dados de telemetria e histórico de uso para prever falhas e agendar manutenções no momento ideal.',
      benefits: [
        { label: 'Custos com manutenção', value: '-25%' },
        { label: 'Tempo de parada', value: '-40%' },
        { label: 'Vida útil da frota', value: '+15%' },
        { label: 'Confiabilidade', value: '+10%' },
      ],
      unlocks: [
        'Nv. 2: Diagnóstico automático (em breve)',
        'Nv. 3: Integração com fornecedores',
        'Nv. 4: IA de manutenção (requer Análise Financeira Nv. 1)',
      ],
      parents: ['roteirizacao'],
      branch: 'ops',
    },
    {
      id: 'telemetria',
      name: 'Telemetria',
      level: 1,
      maxLevel: 3,
      status: 'completed',
      icon: 'Radio',
      cost: 950,
      durationDays: 2,
      description: 'Sensores veiculares para monitorar velocidade, rotação de motor e consumo instantâneo.',
      benefits: [
        { label: 'Consumo Médio', value: '-10%' },
        { label: 'Segurança Viária', value: '+20%' },
      ],
      unlocks: ['Automação de Armazém'],
      parents: [],
      branch: 'warehouse',
    },
    {
      id: 'rastreamento',
      name: 'Rastreamento em Tempo Real',
      level: 1,
      maxLevel: 3,
      status: 'completed',
      icon: 'Truck',
      cost: 700,
      durationDays: 2,
      description: 'GPS e conectividade 4G/5G com atualização em tempo real para os clientes e despachantes.',
      benefits: [
        { label: 'Satisfação do Cliente', value: '+18%' },
        { label: 'Eficiência de Despacho', value: '+14%' },
      ],
      unlocks: ['Automação de Armazém'],
      parents: [],
      branch: 'warehouse',
    },
    {
      id: 'automacao_armazem',
      name: 'Automação de Armazém',
      level: 1,
      maxLevel: 3,
      status: 'available',
      icon: 'Bot',
      cost: 1500,
      durationDays: 3,
      description: 'Sistemas robotizados e esteiras inteligentes para picking e organização de paletes.',
      benefits: [
        { label: 'Velocidade de Carga', value: '+30%' },
        { label: 'Erros de Separação', value: '-60%' },
      ],
      unlocks: ['Contratos Premium'],
      parents: ['telemetria', 'rastreamento'],
      branch: 'warehouse',
    },
    {
      id: 'crm_avancado',
      name: 'CRM Avançado',
      level: 0,
      maxLevel: 3,
      status: 'locked',
      icon: 'Users',
      cost: 1800,
      durationDays: 4,
      description: 'Gestão integrada de clientes, contratos e histórico de negociações estratégicas.',
      benefits: [
        { label: 'Retenção de Clientes', value: '+25%' },
        { label: 'Margem Contratual', value: '+8%' },
      ],
      unlocks: ['Análise Financeira'],
      parents: ['manutencao_preditiva'],
      branch: 'ops',
    },
    {
      id: 'contratos_premium',
      name: 'Contratos Premium',
      level: 0,
      maxLevel: 3,
      status: 'locked',
      icon: 'FileText',
      cost: 2200,
      durationDays: 4,
      description: 'Habilita contratos corporativos de alto valor e carga dedicada internacional.',
      benefits: [
        { label: 'Ticket Médio', value: '+45%' },
        { label: 'Reputação Regional', value: '+15%' },
      ],
      unlocks: ['Previsão de Demanda'],
      parents: ['automacao_armazem'],
      branch: 'warehouse',
    },
    {
      id: 'analise_financeira',
      name: 'Análise Financeira',
      level: 0,
      maxLevel: 3,
      status: 'locked',
      icon: 'BarChart2',
      cost: 5600,
      durationDays: 5,
      description: 'Módulo preditivo de fluxo de caixa, precificação dinâmica por trajeto e ROI por veículo.',
      benefits: [
        { label: 'Lucro Líquido', value: '+14%' },
        { label: 'Previsibilidade', value: '+35%' },
      ],
      unlocks: ['Centro de Distribuição Avançado'],
      parents: ['crm_avancado'],
      branch: 'ops',
    },
    {
      id: 'previsao_demanda',
      name: 'Previsão de Demanda',
      level: 0,
      maxLevel: 3,
      status: 'locked',
      icon: 'TrendingUp',
      cost: 2000,
      durationDays: 6,
      description: 'Inteligência de mercado para antecipar sazonalidades, safras agrícolas e picos de e-commerce.',
      benefits: [
        { label: 'Ocupação da Frota', value: '+18%' },
        { label: 'Ociosidade', value: '-22%' },
      ],
      unlocks: ['Centro de Distribuição Avançado'],
      parents: ['contratos_premium'],
      branch: 'warehouse',
    },
  ]);

  const [selectedTechId, setSelectedTechId] = useState<string>('manutencao_preditiva');
  const [researchQueue, setResearchQueue] = useState<ResearchQueueItem[]>([
    { id: 'q1', techId: 'automacao_armazem', name: 'Automação de Armazém', durationDays: 3, cost: 1500, icon: 'Bot' },
    { id: 'q2', techId: 'crm_avancado', name: 'CRM Avançado', durationDays: 4, cost: 1800, icon: 'Users' },
    { id: 'q3', techId: 'analise_financeira', name: 'Análise Financeira', durationDays: 5, cost: 5600, icon: 'BarChart2' },
    { id: 'q4', techId: 'previsao_demanda', name: 'Previsão de Demanda', durationDays: 6, cost: 2000, icon: 'TrendingUp' },
  ]);
  const [activeResearchProgress, setActiveResearchProgress] = useState<number>(65);

  const startResearch = (techId: string) => {
    const tech = techNodes.find((t) => t.id === techId);
    if (!tech) return;
    setTechNodes((prev) =>
      prev.map((t) => (t.id === techId ? { ...t, status: 'researching' } : t))
    );
    showToast(`Pesquisa iniciada: ${tech.name}`);
  };

  const cancelResearch = () => {
    showToast('Pesquisa atual cancelada.');
    setActiveResearchProgress(0);
  };

  const clearQueue = () => {
    setResearchQueue([]);
    showToast('Fila de pesquisas limpa.');
  };

  // HR State
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 'c1',
      name: 'Lucas Almeida',
      role: 'Motorista',
      department: 'Motoristas',
      rating: 4.6,
      salary: 3500,
      tags: ['Experiente', 'Trabalho em equipe'],
      avatar: '👨‍✈️',
      actionType: 'Entrevista',
    },
    {
      id: 'c2',
      name: 'Fernanda Souza',
      role: 'Ajudante',
      department: 'Ajudantes',
      rating: 4.2,
      salary: 1800,
      tags: ['Proativa', 'Organizada'],
      avatar: '👩‍💼',
      actionType: 'Teste prático',
    },
    {
      id: 'c3',
      name: 'Diego Martins',
      role: 'Mecânico',
      department: 'Oficina',
      rating: 4.7,
      salary: 3200,
      tags: ['Técnico', 'Resolutivo'],
      avatar: '👨‍🔧',
      actionType: 'Entrevista',
    },
    {
      id: 'c4',
      name: 'Camila Rocha',
      role: 'Analista Financeiro',
      department: 'Financeiro',
      rating: 4.5,
      salary: 4000,
      tags: ['Analítica', 'Comunicativa'],
      avatar: '👩‍💻',
      actionType: 'Avaliação',
    },
    {
      id: 'c5',
      name: 'Renato Nunes',
      role: 'Ajudante de Estoque',
      department: 'Estoque',
      rating: 4.0,
      salary: 1700,
      tags: ['Dedicado', 'Aprende rápido'],
      avatar: '🧑‍🏭',
      actionType: 'Entrevista',
    },
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    { id: 'e1', name: 'Ana Costa', role: 'Despachante', department: 'Despacho', status: 'Ativo (5 dias)', activeDays: 5, salary: 2800, avatar: '👩' },
    { id: 'e2', name: 'Gustavo Rocha', role: 'Motorista', department: 'Motoristas', status: 'Ativo (12 dias)', activeDays: 12, salary: 3500, avatar: '👨' },
    { id: 'e3', name: 'Helena Duarte', role: 'Ajudante', department: 'Ajudantes', status: 'Em experiência', activeDays: 3, salary: 1800, avatar: '👩' },
    { id: 'e4', name: 'Tiago Santos', role: 'Mecânico', department: 'Oficina', status: 'Ativo (25 dias)', activeDays: 25, salary: 3200, avatar: '👨' },
    { id: 'e5', name: 'Beatriz Lima', role: 'Analista', department: 'Financeiro', status: 'Ativo (18 dias)', activeDays: 18, salary: 4100, avatar: '👩' },
  ]);

  const [selectedCandidateModal, setSelectedCandidateModal] = useState<Candidate | null>(null);

  const openCandidateModal = (candidate: Candidate) => {
    setSelectedCandidateModal(candidate);
  };

  const closeCandidateModal = () => {
    setSelectedCandidateModal(null);
  };

  const hireCandidate = (candidateId: string) => {
    const cand = candidates.find((c) => c.id === candidateId);
    if (!cand) return;
    setEmployees((prev) => [
      ...prev,
      {
        id: `e-${Date.now()}`,
        name: cand.name,
        role: cand.role,
        department: cand.department,
        status: 'Contratado Recente',
        activeDays: 1,
        salary: cand.salary,
        avatar: cand.avatar,
      },
    ]);
    setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
    setCompany((prev) => ({
      ...prev,
      cash: prev.cash - 500, // onboarding cost
      dailyProfit: prev.dailyProfit + 150,
      xp: prev.xp + 50,
    }));
    showToast(`${cand.name} foi contratado(a) com sucesso para ${cand.role}!`);
  };

  const trainingProgram: TrainingProgram[] = [
    { name: 'Condução Econômica', count: '12/16 concluíram', progress: 75 },
    { name: 'Segurança no Transporte', count: '18/30 concluíram', progress: 60 },
    { name: 'Manutenção Básica', count: '8/20 concluíram', progress: 40 },
    { name: 'Atendimento ao Cliente', count: '6/7 concluíram', progress: 85 },
  ];

  // Maintenance Bays
  const [maintenanceBays, setMaintenanceBays] = useState<MaintenanceBay[]>([
    {
      id: 1,
      bayNumber: 1,
      isAvailable: false,
      vehicleId: 'V-03',
      vehicleName: 'Ford Transit - Van',
      vehicleType: 'Van',
      serviceType: 'Revisão Preventiva',
      severity: 'normal',
      progress: 65,
      remainingTime: '2h 15min',
      mechanic: 'Carlos Mendes',
      details: 'Troca de óleo, filtros e inspeção geral',
      image: 'van',
    },
    {
      id: 2,
      bayNumber: 2,
      isAvailable: false,
      vehicleId: 'T-01',
      vehicleName: 'Volvo FH - Caminhão',
      vehicleType: 'Caminhão',
      serviceType: 'Falha no Sistema de Freios',
      severity: 'emergency',
      progress: 30,
      remainingTime: '4h 30min',
      mechanic: 'Bruno Silva',
      details: 'Substituição de pastilhas, discos e checagem ABS',
      image: 'truck-heavy',
    },
    {
      id: 3,
      bayNumber: 3,
      isAvailable: false,
      vehicleId: 'T-02',
      vehicleName: 'Mercedes Atego - Truck',
      vehicleType: 'Truck',
      serviceType: 'Manutenção Programada',
      severity: 'scheduled',
      progress: 80,
      remainingTime: '1h 20min',
      mechanic: 'Eduardo Lima',
      details: 'Revisão de 20.000 km + troca de filtros',
      image: 'truck-medium',
    },
    {
      id: 4,
      bayNumber: 4,
      isAvailable: false,
      vehicleId: 'C-01',
      vehicleName: 'Toyota Corolla - Carro',
      vehicleType: 'Carro',
      serviceType: 'Superaquecimento do Motor',
      severity: 'emergency',
      progress: 85,
      remainingTime: '3h 20min',
      mechanic: 'Ana Costa',
      details: "Diagnóstico, troca de bomba d'água e fluido",
      image: 'car',
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
    { id: 'p1', name: 'Pastilhas de Freio', quantity: 24, unit: 'un.', status: 'OK', price: 120 },
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

  // Contracts
  const [contracts, setContracts] = useState<Contract[]>([
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
      id: 'eshop',
      clientName: 'E-Shop Brasil Express',
      segment: 'E-commerce & Entregas',
      category: 'E-commerce',
      contractType: 'Contrato por Demanda',
      monthlyValue: 19200,
      volume: 'Coleta diária no CD',
      durationMonths: 8,
      satisfaction: 95,
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
      id: 'bebidas_central',
      clientName: 'Distribuidora Central de Bebidas',
      segment: 'Alimentos & Bebidas',
      category: 'Varejo',
      contractType: 'Contrato Anual',
      monthlyValue: 22400,
      volume: '5 rotas diárias',
      durationMonths: 10,
      satisfaction: 94,
      status: 'ativo',
    },
    {
      id: 'construtora_horiz',
      clientName: 'Construtora Horizonte',
      segment: 'Construção Civil',
      category: 'Corporativo',
      contractType: 'Contrato Trimestral',
      monthlyValue: 16400,
      volume: 'Cargas pesadas',
      durationMonths: 3,
      satisfaction: 90,
      status: 'ativo',
    },
    // Proposals
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

  // Facilities
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
    {
      id: 'fac-6',
      name: 'Terreno Disponível - Southgate Valley',
      city: 'Southgate',
      type: 'Terreno Disponível',
      level: 0,
      capacity: '6.500 m²',
      bays: 0,
      docks: 0,
      employees: 0,
      monthlyCost: 0,
      efficiency: 0,
      isAvailableForPurchase: true,
      purchaseCost: 42000,
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
      regionalReputation: Math.min(100, prev.regionalReputation + 5),
    }));
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === facilityId
          ? { ...f, level: f.level + 1, efficiency: Math.min(100, f.efficiency + 4) }
          : f
      )
    );
    showToast(`${fac.name} expandida para o Nível ${fac.level + 1}!`);
  };

  const purchaseFacility = (facilityId: string) => {
    const fac = facilities.find((f) => f.id === facilityId);
    if (!fac || !fac.purchaseCost) return;
    if (company.cash < fac.purchaseCost) {
      showToast(`Fundos insuficientes para compra de terreno ($${fac.purchaseCost.toLocaleString()} necessários).`);
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

  // Competitors
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
      marketShare: 35,
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
      id: 'rapido_sul',
      name: 'Rápido Sul Logística',
      rank: 3,
      marketShare: 18,
      fleetCount: 16,
      facilitiesCount: 3,
      reputation: 79,
      pricing: 'Baixo / Descontos agressivos',
      reliability: 'Média (81% no prazo)',
      strengths: 'Preços muito competitivos, consolidação em rotas agrícolas do sul.',
      weaknesses: 'Frota envelhecida, manutenção corretiva frequente e avarias pontuais.',
      color: '#3b82f6',
      isPlayer: false,
    },
    {
      id: 'veloce',
      name: 'Veloce Cargas',
      rank: 4,
      marketShare: 12,
      fleetCount: 10,
      facilitiesCount: 2,
      reputation: 84,
      pricing: 'Moderado',
      reliability: 'Alta (91% no prazo)',
      strengths: 'Entregas ultra-rápidas, aplicativo moderno e boa roteirização urbana.',
      weaknesses: 'Capacidade limitada para cargas de grande porte e granel.',
      color: '#8b5cf6',
      isPlayer: false,
    },
    {
      id: 'carga_segura',
      name: 'Carga Segura Ltda',
      rank: 5,
      marketShare: 7,
      fleetCount: 8,
      facilitiesCount: 2,
      reputation: 91,
      pricing: 'Muito Alto / Premium',
      reliability: 'Máxima (98% no prazo)',
      strengths: 'Transporte blindado de valores e produtos químicos controlados.',
      weaknesses: 'Custo inacessível para fretes convencionais e varejo.',
      color: '#f59e0b',
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
      showToast(`Contrato estratégico disputado com sucesso contra ${comp.name}!`);
    } else {
      setCompetitors((prev) =>
        prev.map((c) => {
          if (c.isPlayer) return { ...c, marketShare: c.marketShare + 1 };
          if (c.id === competitorId) return { ...c, marketShare: Math.max(1, c.marketShare - 1) };
          return c;
        })
      );
      showToast(`Guerra de preços iniciada na região de ${comp.name}.`);
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
