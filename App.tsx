
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AppView } from './types';
import { NetworkBackground } from './components/NetworkBackground';
import { HomeDashboard } from './components/HomeDashboard';
import { AgentWorkbench } from './components/AgentWorkbench';
import { AIAuditPanel } from './components/AIAuditPanel';
import { ConcurPortal } from './components/ConcurPortal';
import { PersonnelPanel } from './components/PersonnelPanel';
import { GrantsPayoutPortal } from './components/GrantsPayoutPortal';
import { RadicalAcceptanceToken } from './components/RadicalAcceptanceToken';
import { LegalCompliancePanel } from './components/LegalCompliancePanel';
import { SAMEntityManager } from './components/SAMEntityManager';
import { OlympusDashboard } from './components/OlympusDashboard';
import TitanDashboard from './components/TitanDashboard';
import { Zap } from 'lucide-react';
import { 
  KnowledgeBase, 
  IdentityPanel, 
  SystemControlPanel, 
  SettingsPanel, 
  DomainPortal, 
  LabIntegration, 
  FusionPortal, 
  FCDPortal, 
  DLAMCore, 
  DLAMInsurance, 
  SovereignSearchPortal,
  SAMSSOPanel
} from './components/Placeholders';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isTitanMode, setIsTitanMode] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME: return <HomeDashboard />;
      case AppView.WORKBENCH: return <AgentWorkbench />;
      case AppView.KNOWLEDGE: return <KnowledgeBase />;
      case AppView.IDENTITY: return <IdentityPanel />;
      case AppView.PERSONNEL: return <PersonnelPanel />;
      case AppView.SYSTEM: return <SystemControlPanel />;
      case AppView.SETTINGS: return <SettingsPanel />;
      case AppView.SOVEREIGN: return <DomainPortal />;
      case AppView.LAB_MESH: return <LabIntegration />;
      case AppView.FUSION: return <FusionPortal />;
      case AppView.LEGAL: return <LegalCompliancePanel />;
      case AppView.FCD_PORTAL: return <FCDPortal />;
      case AppView.DLAM_CORE: return <DLAMCore />;
      case AppView.DLAM_INSURANCE: return <DLAMInsurance />;
      case AppView.SOVEREIGN_SEARCH: return <SovereignSearchPortal />;
      case AppView.CONCUR: return <ConcurPortal />;
      case AppView.AI_AUDIT: return <AIAuditPanel />;
      case AppView.GRANTS_PAYOUT: return <GrantsPayoutPortal />;
      case AppView.SAM_SSO: return <SAMSSOPanel />;
      case AppView.RADICAL_ACCEPTANCE: return <RadicalAcceptanceToken />;
      case AppView.SAM_ENTITY_MANAGER: return <SAMEntityManager />;
      case AppView.OLYMPUS: return <OlympusDashboard />;
      default: return <HomeDashboard />;
    }
  };

  if (isTitanMode) {
    return (
      <div className="relative">
        <button 
          onClick={() => setIsTitanMode(false)}
          className="fixed top-4 right-4 z-[100] bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-2"
        >
          <Zap size={14} /> Exit Titan Mode
        </button>
        <TitanDashboard />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-emerald-500/30">
      <NetworkBackground />
      <Sidebar currentView={currentView} setView={setCurrentView} isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header 
          currentView={currentView} 
          isSidebarOpen={isSidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
        
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {renderView()}
        </main>
      </div>

      {/* Titan Mode Trigger */}
      <button 
        onClick={() => setIsTitanMode(true)}
        className="fixed bottom-4 right-4 z-50 bg-white/5 hover:bg-white/10 text-white p-3 rounded-full shadow-2xl border border-white/10 group transition-all"
        title="Enter Titan Mode"
      >
        <Zap size={20} className="group-hover:text-emerald-400 transition-colors" />
      </button>
    </div>
  );
}
