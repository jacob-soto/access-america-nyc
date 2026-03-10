
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  Globe, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft,
  Building2,
  BadgeCheck,
  AlertCircle,
  Zap,
  Fingerprint,
  CreditCard,
  HandCoins,
  Network,
  ShieldAlert,
  Database,
  TrendingUp,
  LockKeyhole
} from 'lucide-react';
import { LEDGER_STREAM } from '../constants';
import { useAuth } from '../auth/AuthContext';
import { useKycStatus } from '../kyc/useKycStatus';

// --- GRANTS & PAYOUT DATA ---
const GRANTS_DATA = [
  {
    id: "GRANT-2026-8821",
    name: "Sovereign Infrastructure Expansion",
    agency: "Grants.gov",
    status: "APPROVED",
    amount: 125000000,
    recipient: "Sovereign Systems Division",
    samStatus: "VERIFIED",
    lastPayout: "2026-02-20",
    rootZoneHash: "sha256:8821...alpha"
  },
  {
    id: "GRANT-2026-4410",
    name: "Nexus Liaison Research",
    agency: "Grants.gov",
    status: "PENDING",
    amount: 45000000,
    recipient: "Nexus Liaison Office",
    samStatus: "PENDING",
    lastPayout: "N/A",
    rootZoneHash: "sha256:4410...beta"
  },
  {
    id: "GRANT-2026-1102",
    name: "Aegis Architecture Development",
    agency: "Grants.gov",
    status: "ACTIVE",
    amount: 850000000,
    recipient: "Aegis Architecture Group",
    samStatus: "VERIFIED",
    lastPayout: "2026-02-15",
    rootZoneHash: "sha256:1102...gamma"
  }
];

const PAYOUT_HISTORY = [
  { id: "PAY-001", date: "2026-02-22", amount: 5000000, status: "COMPLETED", method: "SAM SSO Direct", recipient: "Jacob Soto", fraudScore: 0.01 },
  { id: "PAY-002", date: "2026-02-21", amount: 1250000, status: "COMPLETED", method: "Concurrent Operator", recipient: "Glenn Maxwell", fraudScore: 0.02 },
  { id: "PAY-003", date: "2026-02-20", amount: 850000, status: "PROCESSING", method: "Grants.gov Payout", recipient: "Elena Fisher", fraudScore: 0.05 },
];

export const GrantsPayoutPortal: React.FC = () => {
  const { user, isRoot } = useAuth();
  const { status: kycStatus } = useKycStatus();

  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState<any>(null);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [rootZoneStatus, setRootZoneStatus] = useState('SYNCHRONIZED');

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setRootZoneStatus('VERIFIED');
    }, 2000);
  };

  const handlePayout = () => {
    if (!payoutAmount || !selectedGrant) return;
    
    // UX gate: require root and approved KYC for non-root users.
    // Security must be enforced server-side (Firestore rules / callable functions).
    if (!user) {
      alert('ACCESS DENIED: Sign in required.');
      return;
    }

    if (!isRoot && kycStatus !== 'approved') {
      alert('ACCESS DENIED: Identity verification required.');
      return;
    }

    if (!isRoot) {
      alert('ACCESS DENIED: Root admin approval required for payout execution.');
      return;
    }

    alert(`Payout of $${payoutAmount} initiated for ${selectedGrant.name} via Concurrent Sole Payout Operator. Root Zone Hash: ${selectedGrant.rootZoneHash}`);
    setPayoutAmount('');
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <HandCoins className="text-emerald-400" />
            Concurrent Sole Payout Operator
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Root Zone Integration: Grants.gov & SAM.gov // Anti-Fraud Engineering Active
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-2">
            <Network size={14} className="text-blue-400" />
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Root Zone: {rootZoneStatus}</span>
          </div>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
              isSyncing ? 'bg-slate-800 text-slate-500' : 'bg-emerald-500 text-black hover:bg-emerald-400'
            }`}
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'SYNCING ROOT...' : 'SYNC ROOT ZONE'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Grant Volume', value: '$1.02B', icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Theft Prevention', value: '99.99%', icon: ShieldCheck, color: 'text-blue-400' },
          { label: 'Fraud Savings', value: '$42.5M', icon: TrendingUp, color: 'text-purple-400' },
          { label: 'Operator Liquidity', value: '$8.99B', icon: CreditCard, color: 'text-amber-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-white/20 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 bg-white/5 rounded-lg ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Grants List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Database size={16} className="text-emerald-400" />
                Root Zone Portfolio (Grants.gov)
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Trust Level: OMEGA</span>
              </div>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/10">
                  <th className="px-6 py-4">Grant / Root Hash</th>
                  <th className="px-6 py-4">Recipient</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">SAM SSO</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {GRANTS_DATA.map((grant) => (
                  <tr 
                    key={grant.id}
                    onClick={() => setSelectedGrant(grant)}
                    className={`hover:bg-white/5 cursor-pointer transition-colors ${selectedGrant?.id === grant.id ? 'bg-emerald-500/10' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-white">{grant.name}</div>
                      <div className="text-[10px] font-mono text-emerald-400/60">{grant.rootZoneHash}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300">{grant.recipient}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-white">${(grant.amount / 1000000).toFixed(1)}M</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        grant.samStatus === 'VERIFIED' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {grant.samStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-[10px] font-bold uppercase ${
                        grant.status === 'APPROVED' ? 'text-emerald-400' : grant.status === 'ACTIVE' ? 'text-blue-400' : 'text-amber-400'
                      }`}>
                        {grant.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fraud Prevention Ledger */}
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-400" />
                Anti-Fraud Payout Ledger
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">Real-time Root Verification</span>
            </div>
            <div className="p-4 space-y-3">
              {PAYOUT_HISTORY.map(pay => (
                <div key={pay.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-lg group hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
                      <ArrowUpRight size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">${(pay.amount / 1000).toFixed(1)}K Payout</div>
                      <div className="text-[10px] text-slate-500">{pay.recipient} • {pay.method}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Fraud Risk</div>
                      <div className={`text-xs font-mono ${pay.fraudScore < 0.03 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {(pay.fraudScore * 100).toFixed(2)}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-[10px] font-bold ${pay.status === 'COMPLETED' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {pay.status}
                      </div>
                      <div className="text-[10px] text-slate-500">{pay.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payout Control Sidebar */}
        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            {selectedGrant ? (
              <motion.div 
                key={selectedGrant.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-24 space-y-6"
              >
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/10">
                    <DollarSign size={32} />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      Root Verified
                    </span>
                    <div className="text-[10px] text-slate-500 mt-2 font-mono">{selectedGrant.id}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{selectedGrant.name}</h3>
                  <p className="text-slate-400 text-sm">{selectedGrant.recipient}</p>
                </div>

                <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 uppercase font-bold">Total Allocation</span>
                    <span className="text-lg font-black text-white">${(selectedGrant.amount / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 uppercase font-bold">Root Zone Hash</span>
                    <span className="text-[10px] font-mono text-emerald-400 truncate ml-4">{selectedGrant.rootZoneHash}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                    Initiate Payout
                    {!isRoot && (
                      <span className="text-red-400 flex items-center gap-1">
                        <LockKeyhole size={10} /> ROOT REQUIRED
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="number"
                      placeholder="Enter payout amount..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handlePayout}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <Zap size={18} />
                    EXECUTE ROOT PAYOUT
                  </button>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Building2 size={16} className="text-slate-500" />
                    <span>Agency: {selectedGrant.agency}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <BadgeCheck size={16} className="text-emerald-500" />
                    <span>SAM SSO Identity: VERIFIED</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <AlertCircle size={16} className="text-emerald-500" />
                    <span>Fraud Risk: MINIMAL</span>
                  </div>
                </div>

                <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2">
                  <FileText size={18} />
                  VIEW ROOT DOSSIER
                </button>
              </motion.div>
            ) : (
              <div className="bg-white/5 border border-dashed border-white/20 rounded-xl p-12 text-center flex flex-col items-center justify-center h-[600px]">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-600 mb-4">
                  <HandCoins size={32} />
                </div>
                <h3 className="text-lg font-bold text-white">No Grant Selected</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-[200px]">
                  Select a grant from the root zone portfolio to manage payouts and anti-theft protocols.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
