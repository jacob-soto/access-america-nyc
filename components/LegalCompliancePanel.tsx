
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Scale, 
  FileText, 
  Search, 
  Gavel, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Download,
  Filter,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

const COURT_FILINGS = [
  {
    id: "SDNY-2026-CV-08821",
    title: "Jacob Soto & Glenn Lee v. Trinity Management LLC",
    court: "U.S. District Court, Southern District of New York (SDNY)",
    date: "2026-02-15",
    status: "ACTIVE",
    category: "Civil Rights / Property Law",
    summary: "Petition for injunctive relief and damages regarding 425 Grand Concourse. Allegations of mismanagement and breach of fiduciary duty.",
    docketUrl: "https://pacer.uscourts.gov/sdny/2026-cv-08821"
  },
  {
    id: "SDNY-2026-CV-04410",
    title: "Trinity Management LLC v. Sovereign Systems Division",
    court: "U.S. District Court, Southern District of New York (SDNY)",
    date: "2026-01-20",
    status: "DISMISSED",
    category: "Contract Dispute",
    summary: "Counter-claim regarding infrastructure access at 425 Grand Concourse. Dismissed with prejudice.",
    docketUrl: "https://pacer.uscourts.gov/sdny/2026-cv-04410"
  }
];

export const LegalCompliancePanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Trinity Management LLC 425 Grand Concourse');
  const [selectedFiling, setSelectedFiling] = useState<any>(COURT_FILINGS[0]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Scale className="text-emerald-400" />
            Legal & Compliance Panel
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            SDNY Court Filing Integration // PACER Real-time Sync Active
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Verified Access</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
          placeholder="Search SDNY Dockets, Case Numbers, or Parties..."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filings List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Gavel size={14} />
              Recent SDNY Filings
            </h3>
            <button className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
              <Filter size={12} /> Filter
            </button>
          </div>

          {COURT_FILINGS.map((filing) => (
            <motion.div 
              key={filing.id}
              onClick={() => setSelectedFiling(filing)}
              whileHover={{ x: 4 }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                selectedFiling?.id === filing.id 
                  ? 'bg-emerald-500/10 border-emerald-500/30' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 mb-1">{filing.id}</div>
                  <h4 className="text-lg font-bold text-white leading-tight">{filing.title}</h4>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                  filing.status === 'ACTIVE' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-slate-500/10 text-slate-400 border-slate-500/30'
                }`}>
                  {filing.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} /> {filing.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText size={14} /> {filing.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filing Detail View */}
        <div className="lg:col-span-5">
          {selectedFiling ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-24 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FileText size={32} />
                </div>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-all">
                  <ExternalLink size={20} />
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">{selectedFiling.title}</h3>
                <p className="text-slate-400 text-sm mt-2">{selectedFiling.court}</p>
              </div>

              <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Case ID</span>
                  <span className="text-sm font-mono text-white">{selectedFiling.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Filing Date</span>
                  <span className="text-sm text-white">{selectedFiling.date}</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Summary</p>
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "{selectedFiling.summary}"
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                  <Download size={18} />
                  DOWNLOAD FULL COMPLAINT (PDF)
                </button>
                <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2">
                  <Search size={18} />
                  VIEW DOCKET ON PACER
                </button>
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-3">
                <AlertCircle size={18} className="text-amber-400 shrink-0" />
                <p className="text-[10px] text-amber-200/60 leading-relaxed">
                  NOTICE: This document is subject to a protective order. Unauthorized distribution is prohibited under US Code Title 18.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-[600px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-600 mb-4">
                <Scale size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">No Filing Selected</h3>
              <p className="text-slate-500 text-sm mt-2">
                Select a court filing from the list to view detailed docket information and case summaries.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
