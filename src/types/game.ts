export type NavigationTab =
  | 'dashboard'
  | 'campanha'
  | 'mapa'
  | 'pedidos'
  | 'entregas'
  | 'frota'
  | 'funcionarios'
  | 'clientes'
  | 'financas'
  | 'concorrentes'
  | 'instalacoes'
  | 'tecnologia'
  | 'oficina'
  | 'armazem'
  | 'relatorios'
  | 'configuracoes';

export interface CompanyState {
  name: string;
  slogan: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  cash: number;
  dailyProfit: number;
  localReputation: number; // percentage
  regionalReputation: number; // percentage
  gameDate: string; // e.g. "Seg, 14 Abr 2025"
  gameTime: string; // e.g. "09:26"
  isPaused: boolean;
  gameSpeed: number; // 1, 2, 5
  temperature: number; // 24
  cityName: string; // "Rivermouth City"
  currentAct: number; // 1 to 7
}

export interface TechNode {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  status: 'completed' | 'researching' | 'available' | 'locked';
  icon: string;
  cost: number;
  durationDays: number;
  description: string;
  benefits: { label: string; value: string }[];
  unlocks: string[];
  parents: string[];
  branch: 'ops' | 'warehouse';
}

export interface ResearchQueueItem {
  id: string;
  techId: string;
  name: string;
  durationDays: number;
  cost: number;
  icon: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  department: string;
  rating: number;
  salary: number;
  tags: string[];
  avatar: string;
  actionType: 'Entrevista' | 'Teste prático' | 'Avaliação';
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: string;
  activeDays: number;
  salary: number;
  avatar: string;
}

export interface MaintenanceBay {
  id: number;
  bayNumber: number;
  isAvailable: boolean;
  vehicleId?: string;
  vehicleName?: string;
  vehicleType?: string;
  serviceType?: string;
  severity?: 'normal' | 'emergency' | 'scheduled';
  progress?: number;
  remainingTime?: string;
  mechanic?: string;
  details?: string;
  image?: string;
}

export interface SparePart {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  status: 'OK' | 'Baixo' | 'Crítico';
  price: number;
}

export interface Contract {
  id: string;
  clientName: string;
  segment: string;
  category: 'Corporativo' | 'Varejo' | 'E-commerce' | 'Indústria';
  contractType: string;
  monthlyValue: number;
  volume: string;
  durationMonths: number;
  satisfaction: number;
  status: 'proposta' | 'ativo' | 'renovado' | 'cancelado';
}

export interface Facility {
  id: string;
  name: string;
  city: string;
  type: string;
  level: number;
  capacity: string;
  bays: number;
  docks: number;
  employees: number;
  monthlyCost: number;
  efficiency: number;
  isAvailableForPurchase?: boolean;
  purchaseCost?: number;
}

export interface Competitor {
  id: string;
  name: string;
  rank: number;
  marketShare: number;
  fleetCount: number;
  facilitiesCount: number;
  reputation: number;
  pricing: string;
  reliability: string;
  strengths: string;
  weaknesses: string;
  color: string;
  isPlayer?: boolean;
}

export interface TrainingProgram {
  name: string;
  count: string;
  progress: number;
}

export interface WarehouseItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  stockPercentage: number;
  alert?: 'Estoque baixo' | 'Alta demanda prevista' | 'Repor em breve';
}

// ==========================================
// DOCUMENTO 12 - JORNADA DO JOGADOR TYPES
// ==========================================

export interface CampaignObjective {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  completed: boolean;
  reward: string;
}

export interface CrisisChoice {
  id: string;
  label: string;
  description: string;
  tradeoff: string;
  impactSummary: string;
  impact: {
    cash?: number;
    localReputation?: number;
    regionalReputation?: number;
    dailyProfit?: number;
    xp?: number;
    moralChange?: number;
    specialBenefit?: string;
  };
}

export interface CampaignCrisis {
  id: string;
  act: number;
  title: string;
  subtitle: string;
  teaser: string;
  contextStory: string;
  npcId: string;
  npcName: string;
  npcRole: string;
  npcAvatar: string;
  warningLevel: 'mild' | 'severe' | 'critical';
  status: 'pending' | 'resolved';
  resolvedOptionId?: string;
  resolutionSummary?: string;
  choices: CrisisChoice[];
}

export interface CampaignNPC {
  id: string;
  name: string;
  role: string;
  actIntroduced: number;
  avatar: string;
  badge: string;
  description: string;
  affinity: number; // 0 to 100
  perk: string;
  dialogues: {
    quote: string;
    context: string;
    responseOption: string;
  }[];
}

export interface CampaignAct {
  number: number;
  title: string;
  subtitle: string;
  levelRange: string;
  minLevel: number;
  maxLevel: number;
  fantasy: string;
  visualSummary: string;
  visualIcon: string;
  hqName: string;
  hqFeatures: string[];
  hqVehicleSlots: number;
  hqStaffSlots: number;
  npcs: string[]; // NPC ids
  unlocks: string[];
  crisisId: string;
  status: 'completed' | 'active' | 'locked';
  objectives: CampaignObjective[];
}
