
import React from 'react';
import { 
  Home, 
  Terminal, 
  Database, 
  Shield, 
  Users, 
  Settings, 
  Activity, 
  Globe, 
  Cpu, 
  Zap, 
  Scale, 
  CreditCard, 
  Server, 
  Search,
  Plane,
  Eye,
  HandCoins,
  Fingerprint,
  Ticket,
  ClipboardCheck
} from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen }) => {
  const navItems = [
    { id: AppView.HOME, icon: Home, label: 'Dashboard' },
    { id: AppView.WORKBENCH, icon: Terminal, label: 'Workbench' },
    { id: AppView.KNOWLEDGE, icon: Database, label: 'Knowledge' },
    { id: AppView.IDENTITY, icon: Shield, label: 'Identity' },
    { id: AppView.PERSONNEL, icon: Users, label: 'Personnel' },
    { id: AppView.SYSTEM, icon: Activity, label: 'System' },
    { id: AppView.SOVEREIGN, icon: Globe, label: 'Mesh' },
    { id: AppView.LAB_MESH, icon: Cpu, label: 'Lab' },
    { id: AppView.FUSION, icon: Zap, label: 'Fusion' },
    { id: AppView.LEGAL, icon: Scale, label: 'Legal' },
    { id: AppView.FCD_PORTAL, icon: CreditCard, label: 'FCD' },
    { id: AppView.DLAM_CORE, icon: Server, label: 'DLAM' },
    { id: AppView.SOVEREIGN_SEARCH, icon: Search, label: 'Search' },
    { id: AppView.CONCUR, icon: Plane, label: 'Concur' },
    { id: AppView.AI_AUDIT, icon: Eye, label: 'AI Audit' },
    { id: AppView.GRANTS_PAYOUT, icon: HandCoins, label: 'Grants' },
    { id: AppView.SAM_SSO, icon: Fingerprint, label: 'SAM SSO' },
    { id: AppView.RADICAL_ACCEPTANCE, icon: Ticket, label: 'Acceptance' },
    { id: AppView.SAM_ENTITY_MANAGER, icon: ClipboardCheck, label: 'Entities' },
    { id: AppView.OLYMPUS, icon: Cpu, label: 'Olympus' },
    { id: AppView.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={`
      bg-[#0a0a0a] border-r border-white/10 transition-all duration-300 flex flex-col
      ${isOpen ? 'w-64' : 'w-20'}
    `}>
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
          <div className="w-4 h-4 bg-black rounded-sm rotate-45"></div>
        </div>
        {isOpen && <span className="font-bold tracking-tighter text-xl text-white">SOVEREIGN</span>}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`
              w-full flex items-center gap-4 px-6 py-3 transition-all relative group
              ${currentView === item.id ? 'text-white bg-white/5' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}
            `}
          >
            {currentView === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
            )}
            <item.icon size={20} className={currentView === item.id ? 'text-emerald-400' : ''} />
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className={`flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 ${!isOpen && 'justify-center'}`}>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          {isOpen && <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">System Online</span>}
        </div>
      </div>
    </aside>
  );
};
