
import React from 'react';
import { Menu, Bell, Shield, User, Terminal, LogOut } from 'lucide-react';
import { AppView } from '../types';
import { useAuth } from '../auth/AuthContext';

interface HeaderProps {
  currentView: AppView;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, isSidebarOpen, setSidebarOpen }) => {
  const { user, isRoot, signOut } = useAuth();

  const getTitle = () => {
    switch (currentView) {
      case AppView.HOME: return 'Sovereign Command Center';
      case AppView.WORKBENCH: return 'Agent Workbench';
      case AppView.KNOWLEDGE: return 'Vector Knowledge Base';
      case AppView.IDENTITY: return 'Identity & Access Management';
      case AppView.SYSTEM: return 'System Control Panel';
      case AppView.PERSONNEL: return 'Personnel Roster';
      case AppView.SETTINGS: return 'Sovereign Settings';
      case AppView.SOVEREIGN: return 'Sovereign Mesh Explorer';
      case AppView.LAB_MESH: return 'Lab Mesh Integration';
      case AppView.FUSION: return 'Fusion Intelligence Portal';
      case AppView.LEGAL: return 'Legal & Compliance Panel';
      case AppView.FCD_PORTAL: return 'FCD Financial Portal';
      case AppView.DLAM_CORE: return 'DLAM Core Systems';
      case AppView.DLAM_INSURANCE: return 'DLAM Insurance Portal';
      case AppView.SOVEREIGN_SEARCH: return 'Sovereign Search Engine';
      case AppView.CONCUR: return 'SAP Concur Proxy Portal';
      case AppView.AI_AUDIT: return 'AI Compliance & Audit';
      case AppView.RADICAL_ACCEPTANCE: return 'Radical Acceptance Token';
      case AppView.SAM_ENTITY_MANAGER: return 'SAM Entity Manager';
      case AppView.OLYMPUS: return 'Olympus-Net Access-America';
      default: return 'Sovereign OS';
    }
  };

  return (
    <header className="h-16 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/70 hover:text-white"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center border border-emerald-500/30">
            <Shield size={18} className="text-emerald-400" />
          </div>
          <h1 className="text-lg font-medium tracking-tight text-white/90">{getTitle()}</h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-white/50">
          <Terminal size={14} className="text-emerald-400" />
          <span>
            SESSION: {user ? user.uid.slice(0, 8) : 'ANON'}{isRoot ? ' (ROOT)' : ''}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]"></span>
          </button>
          <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white/90 leading-none">{user?.displayName ?? 'Guest'}</p>
              <p className="text-[10px] font-mono text-emerald-400 mt-1 uppercase tracking-wider">{user?.email ?? 'Not signed in'}</p>
            </div>
            <div className="w-9 h-9 rounded-lg border border-white/20 overflow-hidden bg-white/5 flex items-center justify-center">
              <User size={20} className="text-white/40" />
            </div>
            {user && (
              <button
                onClick={() => signOut()}
                className="ml-2 p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                title="Sign out"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
