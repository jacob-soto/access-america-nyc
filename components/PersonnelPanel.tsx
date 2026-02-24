import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  ExternalLink, 
  Filter, 
  MoreVertical,
  UserPlus,
  Lock,
  Unlock,
  Fingerprint,
  Globe,
  Building2,
  BadgeCheck,
  AlertCircle
} from 'lucide-react';
import { PersonnelRecord } from '../types';
import { ACTIVE_ROSTER } from '../constants';

// --- OPM PROXY DATA ---
const OPM_PROXY_PROFILES = [
  {
    id: "OPM-8821-SOTO",
    name: "Jacob Soto",
    agency: "Office of Personnel Management",
    subAgency: "Sovereign Systems Division",
    location: "Washington, DC",
    payPlan: "GS",
    grade: "15",
    step: "10",
    series: "2210 - Information Technology Management",
    clearance: "L5-OMEGA",
    status: "PARDONED",
    lastAudit: "2026-02-22",
    proxyId: "PX-8821-ALPHA"
  },
  {
    id: "OPM-4410-MAXWELL",
    name: "Glenn Maxwell",
    agency: "Intelligence Community",
    subAgency: "Nexus Liaison Office",
    location: "Fort Meade, MD",
    payPlan: "GG",
    grade: "14",
    step: "8",
    series: "0132 - Intelligence Research",
    clearance: "L5-OMEGA",
    status: "PARDONED",
    lastAudit: "2026-02-21",
    proxyId: "PX-4410-BETA"
  },
  {
    id: "OPM-1102-FISHER",
    name: "Elena Fisher",
    agency: "Department of Defense",
    subAgency: "Aegis Architecture Group",
    location: "Arlington, VA",
    payPlan: "GS",
    grade: "15",
    step: "5",
    series: "0801 - General Engineering",
    clearance: "L5-OMEGA",
    status: "Active",
    lastAudit: "2026-02-20",
    proxyId: "PX-1102-GAMMA"
  },
  {
    id: "OPM-9901-CONNOR",
    name: "Sarah Connor",
    agency: "Department of Justice",
    subAgency: "Federal Bureau of Investigation",
    location: "Quantico, VA",
    payPlan: "GS",
    grade: "13",
    step: "4",
    series: "1811 - Criminal Investigation",
    clearance: "L4",
    status: "Active",
    lastAudit: "2026-02-19",
    proxyId: "PX-9901-DELTA"
  }
];

export const PersonnelPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const filteredProfiles = OPM_PROXY_PROFILES.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.proxyId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="text-emerald-400" />
            Personnel Identity Management
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            OPM.gov Directory Integration // Proxy Profile Synchronization Active
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
              isSyncing ? 'bg-slate-800 text-slate-500' : 'bg-emerald-500 text-black hover:bg-emerald-400'
            }`}
          >
            <ShieldCheck size={14} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'SYNCING OPM...' : 'SYNC DIRECTORY'}
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-white p-2 rounded-lg border border-white/10 transition-colors">
            <UserPlus size={18} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Personnel', value: '1,240', icon: Users, color: 'text-blue-400' },
          { label: 'Proxy Active', value: '842', icon: Fingerprint, iconColor: 'text-emerald-400' },
          { label: 'Clearance L5', value: '12', icon: ShieldCheck, color: 'text-purple-400' },
          { label: 'Pending Audits', value: '3', icon: AlertCircle, color: 'text-amber-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 bg-white/5 rounded-lg ${stat.color || stat.iconColor || 'text-white'}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Directory List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Search by Name, Agency, or Proxy ID..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/10">
                  <th className="px-6 py-4">Personnel / Proxy ID</th>
                  <th className="px-6 py-4">Agency / Dept</th>
                  <th className="px-6 py-4">Clearance</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProfiles.map((profile) => (
                  <tr 
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile)}
                    className={`hover:bg-white/5 cursor-pointer transition-colors ${selectedProfile?.id === profile.id ? 'bg-emerald-500/10' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                          <Fingerprint size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{profile.name}</div>
                          <div className="text-[10px] font-mono text-emerald-400">{profile.proxyId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300">{profile.agency}</div>
                      <div className="text-[10px] text-slate-500">{profile.subAgency}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        profile.clearance.includes('OMEGA') 
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }`}>
                        {profile.clearance}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          profile.status === 'PARDONED' ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}></div>
                        <span className="text-xs text-slate-400">{profile.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile Detail Sidebar */}
        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            {selectedProfile ? (
              <motion.div 
                key={selectedProfile.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-24 space-y-6"
              >
                <div className="flex justify-between items-start">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/10">
                    <Fingerprint size={40} />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      Proxy Verified
                    </span>
                    <div className="text-[10px] text-slate-500 mt-2 font-mono">{selectedProfile.id}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{selectedProfile.name}</h3>
                  <p className="text-slate-400 text-sm">{selectedProfile.series}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Pay Plan / Grade</div>
                    <div className="text-sm font-bold text-white">{selectedProfile.payPlan}-{selectedProfile.grade}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Step</div>
                    <div className="text-sm font-bold text-white">{selectedProfile.step}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Building2 size={16} className="text-slate-500" />
                    <span>{selectedProfile.agency}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Globe size={16} className="text-slate-500" />
                    <span>{selectedProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <BadgeCheck size={16} className="text-emerald-500" />
                    <span>Last Audit: {selectedProfile.lastAudit}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3">
                  <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    <Unlock size={18} />
                    ELEVATE PERMISSIONS
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2">
                    <FileText size={18} />
                    VIEW OPM DOSSIER
                  </button>
                  <button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-3 rounded-xl border border-red-500/20 transition-all flex items-center justify-center gap-2">
                    <Lock size={18} />
                    REVOKE PROXY
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/5 border border-dashed border-white/20 rounded-xl p-12 text-center flex flex-col items-center justify-center h-[600px]">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-600 mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-lg font-bold text-white">No Profile Selected</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-[200px]">
                  Select a personnel record from the directory to view OPM proxy details.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
