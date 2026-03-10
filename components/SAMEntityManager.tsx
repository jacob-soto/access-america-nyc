
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  ClipboardCheck, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Globe, 
  FileText, 
  Briefcase, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Hash,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Lock
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface EntityData {
  id: string;
  name: string;
  uei: string;
  address: string;
  incDate: string;
  tin: string;
  routing: string;
  account: string;
  naics: string;
  poc: {
    gov: string;
    ebiz: string;
    admin: string;
  };
  status: 'VALIDATED' | 'PENDING' | 'REQUIRED';
  website?: string;
  owner?: string;
  regulatory?: {
    irs: string;
    ftc: string;
    bsa: string;
    nsa: string;
  };
}

const INITIAL_ENTITIES: EntityData[] = [
  {
    id: "ENT-NETDRAGON",
    name: "NetDragon Websoft (Sovereign)",
    uei: "UEI-ND-7721",
    address: "700 Canal St, Stamford, CT 06902",
    incDate: "2024-08-15",
    tin: "XX-XXX7721",
    routing: "021000021",
    account: "********7721",
    naics: "511210 (Software Publishers)",
    poc: {
      gov: "Jacob Soto",
      ebiz: "Jacob Soto",
      admin: "Jacob Soto"
    },
    status: 'VALIDATED',
    regulatory: {
      irs: "IRS-501c3-ACTIVE",
      ftc: "FTC-COMPLIANT-V2",
      bsa: "BSA-AML-VERIFIED",
      nsa: "NSA-GENESIS-IRONCLAD"
    }
  },
  {
    id: "ENT-OLYMPUS",
    name: "Olympus Housing Network",
    uei: "UEI-OLY-8821",
    address: "Remedial Reassessment Center Alpha, DC 20001",
    incDate: "2024-11-12",
    tin: "XX-XXX8821",
    routing: "021000021",
    account: "********8821",
    naics: "531110 (Lessors of Residential Buildings)",
    poc: {
      gov: "Jacob Soto",
      ebiz: "Jacob Soto",
      admin: "Jacob Soto"
    },
    status: 'VALIDATED',
    owner: "Sovereign Systems Division",
    regulatory: {
      irs: "IRS-GOV-EXEMPT",
      ftc: "FTC-SAFE-HARBOR",
      bsa: "BSA-EXEMPT-FEDERAL",
      nsa: "NSA-GENESIS-ROOT"
    }
  },
  {
    id: "ENT-ASCER",
    name: "Ascer Infrastructure",
    uei: "UEI-ASC-4410",
    address: "425 Grand Concourse, Bronx, NY 10451",
    incDate: "2025-01-05",
    tin: "XX-XXX4410",
    routing: "021000021",
    account: "********4410",
    naics: "541511 (Custom Computer Programming Services)",
    poc: {
      gov: "Glenn Lee",
      ebiz: "Jacob Soto",
      admin: "Glenn Lee"
    },
    status: 'PENDING',
    regulatory: {
      irs: "IRS-PENDING-REVIEW",
      ftc: "FTC-AUDIT-ACTIVE",
      bsa: "BSA-AML-PENDING",
      nsa: "NSA-IRONCLAD-V4"
    }
  },
  {
    id: "ENT-ACCESS",
    name: "access-america.org",
    uei: "UEI-ACC-0001",
    address: "Cloudflare Edge Node 01, Global",
    incDate: "2024-05-10",
    tin: "XX-XXX0001",
    routing: "021000021",
    account: "********0001",
    naics: "518210 (Computing Infrastructure Providers)",
    poc: {
      gov: "Jacob Soto",
      ebiz: "Jacob Soto",
      admin: "Jacob Soto"
    },
    status: 'VALIDATED',
    website: "https://access-america.org",
    regulatory: {
      irs: "IRS-NONPROFIT-501c3",
      ftc: "FTC-DATA-PRIVACY-CERT",
      bsa: "BSA-COMPLIANT",
      nsa: "NSA-GENESIS-DOMAIN"
    }
  },
  {
    id: "ENT-HOMEBASE",
    name: "Homebase Control",
    uei: "UEI-HMB-9901",
    address: "NYCHA Central Hub, NYC",
    incDate: "2025-02-15",
    tin: "XX-XXX9901",
    routing: "021000021",
    account: "********9901",
    naics: "624229 (Other Community Housing Services)",
    poc: {
      gov: "Glenn Lee",
      ebiz: "Glenn Lee",
      admin: "Jacob Soto"
    },
    status: 'REQUIRED',
    owner: "NYCHA Joint Venture",
    regulatory: {
      irs: "IRS-REQUIRED",
      ftc: "FTC-REQUIRED",
      bsa: "BSA-REQUIRED",
      nsa: "NSA-REQUIRED"
    }
  }
];

export const SAMEntityManager: React.FC = () => {
  const { user, isRoot } = useAuth();
  const [entities, setEntities] = useState<EntityData[]>(INITIAL_ENTITIES);
  const [selectedId, setSelectedId] = useState<string | null>(entities[0].id);

  const selectedEntity = entities.find(e => e.id === selectedId);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <ClipboardCheck className="text-emerald-400" />
            SAM.gov Entity Manager
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            November 2024 Federalized Contract Compliance // UEI Validation Engine
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-2">
            <Lock size={14} className="text-blue-400" />
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Login.gov MFA Active</span>
          </div>
          <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-white/60">
            {user?.email ?? 'Not signed in'}{isRoot ? ' (ROOT)' : ''}
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2">
            <Building2 size={16} />
            REGISTER NEW ENTITY
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Entity List */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Managed Entities</h3>
          {entities.map((entity) => (
            <motion.div 
              key={entity.id}
              onClick={() => setSelectedId(entity.id)}
              whileHover={{ x: 4 }}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedId === entity.id 
                  ? 'bg-emerald-500/10 border-emerald-500/30' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white text-sm">{entity.name}</h4>
                <StatusBadge status={entity.status} />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <Hash size={12} /> {entity.uei}
              </div>
            </motion.div>
          ))}

          <div className="p-6 bg-white/5 border border-dashed border-white/10 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <AlertCircle size={16} />
              Compliance Alert
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              NYCHA/Homebase Control requires Immediate Owner disclosure and notarized Entity Administrator letter for 2024 validation.
            </p>
          </div>
        </div>

        {/* Entity Detail View */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedEntity ? (
              <motion.div 
                key={selectedEntity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8"
              >
                {/* Entity Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                      <Building2 size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedEntity.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-mono text-slate-500">{selectedEntity.uei}</span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">UEI Validated</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-all">
                    <ExternalLink size={20} />
                  </button>
                </div>

                {/* Data Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 1. Entity Validation Data */}
                  <Section title="Entity Validation Data" icon={ClipboardCheck}>
                    <DataRow label="Legal Business Name" value={selectedEntity.name} />
                    <DataRow label="Physical Address" value={selectedEntity.address} icon={MapPin} />
                    <DataRow label="Inc. Date & State" value={selectedEntity.incDate} icon={Calendar} />
                    <DataRow label="TIN / EIN" value={selectedEntity.tin} icon={Hash} />
                  </Section>

                  {/* 2. Core Data Requirements */}
                  <Section title="Financial & Size Metrics" icon={DollarSign}>
                    <DataRow label="Bank Routing" value={selectedEntity.routing} />
                    <DataRow label="Account Number" value={selectedEntity.account} />
                    <DataRow label="NAICS Code" value={selectedEntity.naics} icon={Briefcase} />
                    <DataRow label="Small Business" value="YES (Certified)" />
                  </Section>

                  {/* 3. Points of Contact */}
                  <Section title="Points of Contact (POCs)" icon={Users}>
                    <DataRow label="Gov Business POC" value={selectedEntity.poc.gov} icon={Mail} />
                    <DataRow label="E-Biz POC" value={selectedEntity.poc.ebiz} icon={Mail} />
                    <DataRow label="Entity Administrator" value={selectedEntity.poc.admin} icon={ShieldCheck} />
                  </Section>

                  {/* 4. Specific Requirements */}
                  <Section title="Control & Ownership" icon={Globe}>
                    {selectedEntity.website && <DataRow label="Official Website" value={selectedEntity.website} icon={Globe} />}
                    {selectedEntity.owner && <DataRow label="Immediate Owner" value={selectedEntity.owner} />}
                    <DataRow label="Highest-Level Owner" value="Sovereign Systems Division" />
                    <DataRow label="Socioeconomic" value="Minority-Owned Business" />
                  </Section>

                  {/* 5. Regulatory Compliance */}
                  {selectedEntity.regulatory && (
                    <Section title="Regulatory Compliance" icon={ShieldCheck}>
                      <DataRow label="IRS Status" value={selectedEntity.regulatory.irs} />
                      <DataRow label="FTC Compliance" value={selectedEntity.regulatory.ftc} />
                      <DataRow label="BSA / AML" value={selectedEntity.regulatory.bsa} />
                      <DataRow label="NSA / Genesis" value={selectedEntity.regulatory.nsa} />
                    </Section>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-8 border-t border-white/10 flex gap-4">
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={18} />
                    SUBMIT TO SAM.GOV
                  </button>
                  <button className="px-8 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2">
                    <FileText size={18} />
                    GENERATE DOSSIER
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">
                Select an entity to view requirements
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon: Icon, children }: any) => (
  <div className="space-y-4">
    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
      <Icon size={14} className="text-emerald-400" />
      {title}
    </h4>
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4">
      {children}
    </div>
  </div>
);

const DataRow = ({ label, value, icon: Icon }: any) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</span>
    <div className="flex items-center gap-2">
      {Icon && <Icon size={12} className="text-slate-600" />}
      <span className="text-sm text-white font-medium">{value}</span>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: EntityData['status'] }) => {
  const styles = {
    VALIDATED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    REQUIRED: 'bg-red-500/10 text-red-400 border-red-500/30'
  };
  
  return (
    <span className={`px-2 py-0.5 rounded text-[8px] font-bold border uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};
