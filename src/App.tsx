import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { CampanhaView } from './components/views/CampanhaView';
import { RelatoriosView } from './components/views/RelatoriosView';
import { TecnologiaView } from './components/views/TecnologiaView';
import { RHView } from './components/views/RHView';
import { OficinaView } from './components/views/OficinaView';
import { InstalacoesView } from './components/views/InstalacoesView';
import { ConcorrentesView } from './components/views/ConcorrentesView';
import { ClientesView } from './components/views/ClientesView';
import { DashboardView } from './components/views/DashboardView';
import { MapaView } from './components/views/MapaView';
import { PedidosView } from './components/views/PedidosView';
import { FrotaView } from './components/views/FrotaView';
import { ArmazemView } from './components/views/ArmazemView';
import { FinancasView } from './components/views/FinancasView';
import { ConfiguracoesView } from './components/views/ConfiguracoesView';
import { CandidateModal } from './components/modals/CandidateModal';
import { CrisisModal } from './components/modals/CrisisModal';
import { NpcDialogueModal } from './components/modals/NpcDialogueModal';

const MainContent: React.FC = () => {
  const {
    activeTab,
    toastMessage,
    activeCrisisModal,
    closeCrisisModal,
    selectedNpcForChat,
    closeNpcChat,
  } = useGame();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'campanha':
        return <CampanhaView />;
      case 'mapa':
        return <MapaView />;
      case 'pedidos':
      case 'entregas':
        return <PedidosView />;
      case 'frota':
        return <FrotaView />;
      case 'funcionarios':
        return <RHView />;
      case 'clientes':
        return <ClientesView />;
      case 'financas':
        return <FinancasView />;
      case 'concorrentes':
        return <ConcorrentesView />;
      case 'instalacoes':
        return <InstalacoesView />;
      case 'tecnologia':
        return <TecnologiaView />;
      case 'oficina':
        return <OficinaView />;
      case 'armazem':
        return <ArmazemView />;
      case 'relatorios':
        return <RelatoriosView />;
      case 'configuracoes':
        return <ConfiguracoesView />;
      default:
        return <RelatoriosView />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0a1226]">
      {/* Top Header Status Bar */}
      <TopBar />

      {/* Main Body: Sidebar + Active View Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {renderActiveView()}
        </main>
      </div>

      {/* Interactive Candidate Inspection Modal */}
      <CandidateModal />

      {/* Global Campaign Modals */}
      {activeCrisisModal && (
        <CrisisModal crisis={activeCrisisModal} onClose={closeCrisisModal} />
      )}

      {selectedNpcForChat && (
        <NpcDialogueModal npc={selectedNpcForChat} onClose={closeNpcChat} />
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d1a38] text-white px-4 py-2.5 rounded-xl border border-cyan-500/40 shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  );
}

export default App;
