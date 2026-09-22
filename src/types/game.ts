export type NavigationTab =
  | 'dashboard'
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
