
import React, { useState, useEffect } from 'react';
import { 
  Building2, ShieldCheck, Hotel, Home, LayoutDashboard, 
  MapPin, Users, Globe, Briefcase, Zap, AlertCircle, 
  ChevronRight, ArrowRightLeft, FileText, ClipboardList,
  Search, BarChart3, Lock, Wifi, Key, Database,
  Activity, Radio, Map, HardDrive, Cpu, ExternalLink,
  Shield, AlertTriangle, Crosshair, Server, DollarSign,
  Fingerprint, Terminal, History, Settings
} from 'lucide-react';

const APP_CONFIG = {
  identity: 'OLYMPUS-NET ACCESS-AMERICA',
  board: 'American Board of Accessibility (ABA)',
  org: 'Currency Owners Corp',
  version: '17.2.0-G3-ADMIN',
  operator: 'Jacob Soto (lonelybacker)',
  employee_id: 'G3ADM-99720',
  system_id: 'ABA-JAX-720-PROD',
  api_endpoint: 'api.gemini3.currencyowners.corp/v2/payroll',
  dcv: 'ad4ecd3aac46594c.dcv.cloudflare.com'
};

export const OlympusDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nexus');
  const [isSyncing, setIsSyncing] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [payrollData, setPayrollData] = useState<any>(null);

  // Initialize System and Data
  useEffect(() => {
    const logs = [
      "Gemini 3 Payroll API: Handshake successful.",
      "X-Gemini-Signature verified via HMAC-SHA256.",
      "Syncing FEMA DisasterDeclarationsSummaries.json...",
      "NYC Hotspot Nodes (yjub-udmw) mesh established.",
      "NTAD Military Bases Layer (FeatureServer/0) decrypted.",
      "ABA Compliance Audit: Passed (98.4%).",
      "Currency Owners Corp Admin credentials active."
    ];
    setSystemLogs(logs);

    // Mock Payroll Data based on Gemini 3 API Guide
    setPayrollData({
      employeeName: "Jacob Soto",
      employeeId: APP_CONFIG.employee_id,
      department: "Administrative Management",
      position: "Board Director @ ABA",
      grossPay: 12750.00,
      netPay: 9425.50,
      nextPayDate: "2026-03-01",
      status: "Verified"
    });

    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newLog = `API Pulse: [${new Date().toLocaleTimeString()}] >> Heartbeat @ Node-${Math.floor(Math.random() * 50)}`;
        setSystemLogs(prev => [newLog, ...prev].slice(0, 20));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const log = `Sync Complete: All clusters current. [${new Date().toLocaleTimeString()}]`;
      setSystemLogs(prev => [log, ...prev]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-hidden flex">
      
      {/* 1. MASTER NAVIGATION (LEFT) */}
      <aside className="w-20 lg:w-72 border-r border-slate-800 bg-[#080a0f] flex flex-col z-50">
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/20">
              <Building2 size={24} className="text-white" />
            </div>
            <div className="hidden lg:block">
              <h1 className="font-black text-white text-lg tracking-tighter leading-none">OLYMPUS-NET</h1>
              <p className="text-[10px] text-indigo-500 font-mono font-bold mt-1">ACCESS-AMERICA</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="px-4 py-2 text-[9px] font-bold text-slate-600 uppercase tracking-widest hidden lg:block">Core Systems</p>
          <MenuBtn icon={<Cpu size={18}/>} label="Nexus Control" active={activeTab === 'nexus'} onClick={() => setActiveTab('nexus')} />
          <MenuBtn icon={<DollarSign size={18}/>} label="Gemini 3 Payroll" active={activeTab === 'payroll'} onClick={() => setActiveTab('payroll')} />
          <MenuBtn icon={<Home size={18}/>} label="Housing Conglomerate" active={activeTab === 'housing'} onClick={() => setActiveTab('housing')} />
          
          <p className="px-4 py-2 mt-4 text-[9px] font-bold text-slate-600 uppercase tracking-widest hidden lg:block">Geospatial & Safety</p>
          <MenuBtn icon={<AlertTriangle size={18}/>} label="FEMA Disaster Feed" active={activeTab === 'disaster'} onClick={() => setActiveTab('disaster')} />
          <MenuBtn icon={<Map size={18}/>} label="NTAD Layer (Military)" active={activeTab === 'geo'} onClick={() => setActiveTab('geo')} />
          <MenuBtn icon={<Wifi size={18}/>} label="NYC WiFi Mesh" active={activeTab === 'wifi'} onClick={() => setActiveTab('wifi')} />
        </nav>

        <div className="p-6 mt-auto bg-slate-900/20 border-t border-slate-800 hidden lg:block">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center relative">
               <Fingerprint size={20} className="text-indigo-400" />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#080a0f]"></div>
            </div>
            <div>
              <p className="text-xs font-bold text-white truncate w-32">{APP_CONFIG.operator}</p>
              <p className="text-[9px] text-slate-500 font-mono">ID: {APP_CONFIG.employee_id}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. OPERATIONAL PANEL (RIGHT) */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* TOP STATUS BAR */}
        <header className="h-20 border-b border-slate-800 bg-[#0a0d14]/90 backdrop-blur-xl flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-10">
            <HeaderStat label="ABA SYSTEM ID" val={APP_CONFIG.system_id} color="text-indigo-400" />
            <HeaderStat label="ADMIN ORG" val={APP_CONFIG.org} color="text-slate-300" />
            <HeaderStat label="SSL/TLS GATEWAY" val="CLOUDFLARE G1" color="text-emerald-500" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-indigo-950/20 border border-indigo-500/20 px-3 py-1.5 rounded-lg">
              <ShieldCheck size={14} className="text-indigo-400" />
              <span className="text-[10px] font-bold text-indigo-300">ADMINISTRATIVE ACCESS GRANTED</span>
            </div>
            <button 
              onClick={triggerSync}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-600/30"
            >
              <Zap size={14} className={isSyncing ? 'animate-spin' : ''} />
              {isSyncing ? 'SYNCING DATA...' : 'FORCE NEXUS SYNC'}
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {activeTab === 'nexus' && (
            <div className="space-y-8 animate-in fade-in duration-700">
              {/* GLOBAL METRICS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard label="FEMA Declarations" value="1,000" sub="Active Summaries" icon={<AlertTriangle size={18} />} />
                <MetricCard label="Build Artifacts" value="12" sub="OlympusNet Props" icon={<HardDrive size={18} />} />
                <MetricCard label="WiFi Hotspots" value="1,842" sub="NYC Open Data" icon={<Wifi size={18} />} />
                <MetricCard label="ABA Compliance" value="98.4%" sub="Board Standard" icon={<Activity size={18} />} />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* CORE PROPERTY CONGLOMERATE */}
                <div className="xl:col-span-2 space-y-6">
                  {/* BUILD PIPELINE / ARTIFACTS */}
                  <div className="bg-[#0a0d14] border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
                      <h3 className="text-sm font-bold flex items-center gap-2">
                        <Cpu size={16} className="text-indigo-400" />
                        OlympusNet Build Pipeline
                      </h3>
                      <span className="text-[10px] text-slate-600 font-mono tracking-tighter italic">NuGet / MSBuild Integration</span>
                    </div>
                    <div className="p-0">
                      <ArtifactRow name="msbuild.build.olympusnet.props" type="PROPS" status="MODIFIED" />
                      <ArtifactRow name="msbuild.buildMultiTargeting.olympusnet.props" type="PROPS" status="MODIFIED" />
                      <ArtifactRow name="staticwebassets.build.endpoints.json" type="JSON" status="SYNCED" />
                      <ArtifactRow name="olympusnet.csproj.nuget.dgspec.js" type="JS" status="NEW" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-900/10 to-[#0a0d14] border border-slate-800 p-8 rounded-3xl relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h2 className="text-2xl font-bold text-white tracking-tight">Olympus-net Property Merger</h2>
                          <p className="text-sm text-slate-500 mt-1 italic">Currency Owners Corp Independent Sub-Conglomerates</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-600 font-bold uppercase mb-1">Total Assets</p>
                          <p className="text-2xl font-bold text-white">$12.75M</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <MergerItem name="Sentinel Real Estate" status="SYNCED" id="ABA-9921" />
                        <MergerItem name="Global Lodging ABA" status="VERIFIED" id="ABA-9924" />
                        <MergerItem name="Metropolitan Shelter" status="ACTIVE" id="ABA-9928" />
                        <MergerItem name="Independent Merger Group" status="PENDING" id="ABA-1002" />
                      </div>

                      <div className="flex gap-4">
                        <button className="flex-1 bg-white text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors">
                          Access Board Audit
                        </button>
                        <button className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest border border-slate-700 hover:bg-slate-700 transition-colors">
                          Manage Property Mesh
                        </button>
                      </div>
                    </div>
                    <Building2 size={240} className="absolute -right-16 -bottom-16 text-indigo-500/5 group-hover:scale-110 transition-transform duration-1000" />
                  </div>

                  {/* REAL-TIME FEMA FEED */}
                  <div className="bg-[#0a0d14] border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
                      <h3 className="text-sm font-bold flex items-center gap-2">
                        <History size={16} className="text-indigo-400" />
                        Disaster Deployment Log
                      </h3>
                      <span className="text-[10px] text-slate-600 font-mono tracking-tighter italic">Live FEMA OpenData Feed</span>
                    </div>
                    <div className="p-0">
                      <DataRow state="KY" id="DR-4860" title="Severe Storms/Flooding" type="Storm" date="2025-02-24" />
                      <DataRow state="OR" id="FM-5529" title="Lee Falls Fire" type="Fire" date="2024-08-09" />
                      <DataRow state="KY" id="DR-4863" title="Infrastructure Recovery" type="Flood" date="2025-02-20" />
                    </div>
                  </div>
                </div>

                {/* SIDEBAR: KERNEL & SOCIAL MISSION */}
                <div className="space-y-6">
                  {/* SYSTEM TERMINAL */}
                  <div className="bg-black border border-slate-800 rounded-2xl flex flex-col h-[400px]">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#05070a]">
                      <div className="flex items-center gap-2">
                         <Terminal size={14} className="text-indigo-500" />
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nexus Kernel v17.2</span>
                      </div>
                    </div>
                    <div className="flex-1 p-5 font-mono text-[10px] space-y-2 overflow-y-auto custom-scrollbar">
                      {systemLogs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-indigo-800">{'>'}</span>
                          <span className={i === 0 ? "text-emerald-400" : "text-slate-400"}>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MISSION HUB: ACF/HUD */}
                  <div className="bg-indigo-600/5 border border-indigo-500/10 p-6 rounded-3xl">
                    <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">HHS Mission Alignment</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
                      Supporting Collaboration to Prevent and End Homelessness via Grant 68017D. Synchronizing shelter placement with property conglomerate availability.
                    </p>
                    <div className="space-y-4">
                      <MissionPoint label="ACF Support Grant" val="ACTIVE" />
                      <MissionPoint label="HUD Homelessness Data" val="INDEXED" />
                      <MissionPoint label="ABA Compliance" val="98.4%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payroll' && payrollData && (
            <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-6 duration-700">
              <div className="bg-[#0a0d14] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                 <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900/40 p-10 border-b border-slate-800">
                    <div className="flex justify-between items-center mb-6">
                       <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                          <Fingerprint size={32} className="text-indigo-400" />
                          Gemini 3 Payroll Interface
                       </h2>
                       <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full text-[10px] font-black text-emerald-500 uppercase">
                          Authorized Administrator
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                       <PayrollStat label="Admin Name" val={payrollData.employeeName} />
                       <PayrollStat label="Admin ID" val={payrollData.employeeId} />
                    </div>
                 </div>
                 
                 <div className="p-10">
                    <div className="bg-black/50 border border-slate-800 p-8 rounded-2xl mb-8">
                       <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">Recent Compensation Overview</h3>
                       <div className="grid grid-cols-3 gap-8">
                          <div>
                             <p className="text-[10px] text-slate-600 font-bold uppercase mb-1">Gross Pay</p>
                             <p className="text-2xl font-black text-white">${payrollData.grossPay.toLocaleString()}</p>
                          </div>
                          <div>
                             <p className="text-[10px] text-slate-600 font-bold uppercase mb-1">Net Deposit</p>
                             <p className="text-2xl font-black text-emerald-400">${payrollData.netPay.toLocaleString()}</p>
                          </div>
                          <div>
                             <p className="text-[10px] text-slate-600 font-bold uppercase mb-1">Next Pay Date</p>
                             <p className="text-2xl font-black text-indigo-400">{payrollData.nextPayDate}</p>
                          </div>
                       </div>
                    </div>

                    <div className="bg-indigo-600/5 border border-indigo-500/20 p-6 rounded-xl flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <ShieldCheck className="text-indigo-500" size={24} />
                          <div>
                             <p className="text-sm font-bold text-white tracking-tight">X-Gemini-Signature Protocol Active</p>
                             <p className="text-[10px] text-slate-500 font-mono">HMAC-SHA256 // Nonce: {Math.random().toString(16).substr(2, 12)}</p>
                          </div>
                       </div>
                       <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-500 transition-colors">
                          Download G3-Audit
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'geo' && (
            <div className="animate-in fade-in duration-500 flex flex-col h-full gap-6">
               <div className="flex-1 bg-[#0a0d14] border border-slate-800 rounded-3xl relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none" 
                       style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
                  <div className="text-center z-10">
                    <Map size={80} className="text-slate-800 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-white tracking-tighter italic">NTAD LAYER v0.1</h2>
                    <p className="text-sm text-slate-500 font-mono mt-2 mb-8">FeatureServer/0: Military Bases Restricted Layer</p>
                    <div className="flex gap-4 justify-center">
                       <MapChip label="Military Bases" active={true} />
                       <MapChip label="USGS Structures" active={false} />
                       <MapChip label="WiFi Node Mesh" active={false} />
                    </div>
                  </div>
               </div>
               <div className="grid grid-cols-3 gap-6">
                  <GeoMetric label="Restricted Bases" val="156" color="text-rose-500" />
                  <GeoMetric label="Mapped Structures" val="42,109" color="text-indigo-500" />
                  <GeoMetric label="Urban WiFi Points" val="1,842" color="text-emerald-500" />
               </div>
            </div>
          )}

        </div>
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="fixed bottom-0 right-0 left-20 lg:left-72 h-10 bg-[#05070a] border-t border-slate-800 flex items-center justify-between px-8 z-20">
         <div className="flex items-center gap-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div> System Online</span>
            <span className="hidden lg:block border-l border-slate-800 pl-6">Cloudflare G1 Edge Gateway</span>
            <span className="hidden lg:block border-l border-slate-800 pl-6">ABA Board Certified</span>
         </div>
         <div className="text-[10px] font-mono text-indigo-950 font-black">
            © 2026 CURRENCY OWNERS CORP // OLYMPUS-NET ACCESS-AMERICA
         </div>
      </footer>

      {/* OVERLAY EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,0,0.06))] bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};

// COMPONENT LIBRARY
const MenuBtn = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
        : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
    }`}
  >
    <span className={active ? 'text-white' : 'text-slate-600 group-hover:text-indigo-400 transition-colors'}>
      {icon}
    </span>
    <span className="hidden lg:block text-xs font-bold tracking-tight">{label}</span>
  </button>
);

const HeaderStat = ({ label, val, color }: any) => (
  <div className="hidden lg:block">
    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">{label}</p>
    <p className={`text-xs font-black ${color} tracking-tight`}>{val}</p>
  </div>
);

const MetricCard = ({ label, value, sub, icon }: any) => (
  <div className="bg-[#0a0d14] border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/30 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-900 rounded-lg text-slate-500 group-hover:text-indigo-400 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{label}</span>
    </div>
    <div className="space-y-1">
      <p className="text-2xl font-black text-white tracking-tighter">{value}</p>
      <p className="text-[10px] text-slate-500 font-medium">{sub}</p>
    </div>
  </div>
);

const MergerItem = ({ name, status, id }: any) => (
  <div className="bg-black/40 border border-slate-800/50 p-4 rounded-xl flex items-center justify-between group hover:border-indigo-500/20 transition-all">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 transition-colors">
        <Building2 size={16} />
      </div>
      <div>
        <p className="text-xs font-bold text-white tracking-tight">{name}</p>
        <p className="text-[9px] text-slate-600 font-mono">ID: {id}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'PENDING' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{status}</span>
    </div>
  </div>
);

const DataRow = ({ state, id, title, type, date }: any) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 hover:bg-slate-900/20 transition-colors group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
        <span className="text-[10px] font-black text-white">{state}</span>
        <span className="text-[8px] text-slate-600 font-bold uppercase">{type}</span>
      </div>
      <div>
        <p className="text-xs font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">{title}</p>
        <p className="text-[9px] text-slate-600 font-mono">{id}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{date}</p>
      <p className="text-[9px] text-emerald-600 font-black">INDEXED</p>
    </div>
  </div>
);

const MissionPoint = ({ label, val }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    <span className="text-[10px] font-black text-indigo-400">{val}</span>
  </div>
);

const ArtifactRowCompact = ({ name, type, status }: any) => (
  <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800/50 hover:bg-slate-900/20 transition-colors group">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
        <FileText size={14} className="text-slate-500" />
      </div>
      <div>
        <p className="text-[11px] font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">{name}</p>
        <p className="text-[9px] text-slate-600 font-mono uppercase">{type}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'MODIFIED' ? 'bg-amber-500' : status === 'NEW' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{status}</span>
    </div>
  </div>
);

const PayrollStat = ({ label, val }: any) => (
  <div>
    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{label}</p>
    <p className="text-xl font-black text-white tracking-tight">{val}</p>
  </div>
);

const MapChip = ({ label, active }: any) => (
  <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
    active 
      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
      : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
  }`}>
    {label}
  </div>
);

const GeoMetric = ({ label, val, color }: any) => (
  <div className="bg-[#0a0d14] border border-slate-800 p-6 rounded-2xl">
    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">{label}</p>
    <p className={`text-2xl font-black ${color} tracking-tighter`}>{val}</p>
  </div>
);

const ArtifactRow = ({ name, type, status }: any) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 hover:bg-slate-900/20 transition-colors group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 transition-colors">
        <FileText size={18} />
      </div>
      <div>
        <p className="text-xs font-bold text-white tracking-tight">{name}</p>
        <p className="text-[9px] text-slate-600 font-mono uppercase">{type} ARTIFACT</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'MODIFIED' ? 'bg-amber-500' : status === 'NEW' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{status}</span>
    </div>
  </div>
);
