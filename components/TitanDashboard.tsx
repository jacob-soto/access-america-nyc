import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  ShieldAlert, 
  Cpu, 
  Network, 
  Lock, 
  Activity, 
  Database, 
  Zap, 
  AlertTriangle,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react';

// --- DATA FROM USER REQUEST ---

const OPERATION_POLICIES = {
  compliance_framework: "ACF/HUD Support Collaboration",
  data_integrity: "SHA-256 HMAC",
  licensing: "Apache-2.0 / Proprietary JAX",
  art_runtime_security: {
    patch_level: "2026-02-05",
    fix_id: "CVE-2026-20415-STABILITY",
    headless_optimization: "enabled"
  },
  messaging_policy: {
    encryption: "End-to-End TLS 1.3",
    storage: "Ephemeral-Vault",
    auto_delete_after_sync: true
  }
};

const BOT_INFRASTRUCTURE = {
  bot_type: "Advanced-Spiders",
  execution_shell: "power-packed-sh",
  crawl_targets: [
    { id: "MIL_BASE_0", source: "NTAD Military Bases Layer", priority: "critical" },
    { id: "NYC_WIFI_GRID", source: "NYC Open Data Hotspots", nodes: 2400 },
    { id: "USGS_STRUC", source: "USGS National Map Structures", features: ["Hospital", "Law Enforcement", "Fire Station"] }
  ],
  spider_logic: {
    follow_redirects: true,
    max_depth: null,
    stay_within_domain: false,
    identity: "JAX-NEXUS-Crawler"
  }
};

const ANDROID_PERMISSIONS = [
  "android.permission.INTERNET",
  "android.permission.READ_EXTERNAL_STORAGE",
  "android.permission.WRITE_EXTERNAL_STORAGE",
  "android.permission.QUERY_ALL_PACKAGES",
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.ACCESS_BACKGROUND_LOCATION",
  "android.permission.FOREGROUND_SERVICE",
  "android.permission.RECEIVE_BOOT_COMPLETED",
  "android.permission.REQUEST_INSTALL_PACKAGES"
];

const SECURITY_TRUST_CHAIN = {
  domain: "access-america.org",
  certificate_authority: "DigiCert / Cloudflare Managed G1",
  mtls: "enforced",
  dmarc: {
    v: "DMARC1",
    p: "reject",
    sp: "reject",
    adkim: "s",
    aspf: "s",
    rua: "mailto:unspokentruth56@gmail.com"
  }
};

// --- COMPONENTS ---

const TitanTerminal = () => {
  const [logs, setLogs] = useState<string[]>([
    ">> INITIALIZING PIVE-TEXBIN INTERFACE [ROOT_ACCESS]",
    "[PIVE-TRACE] uid=0(root) gid=0(root) groups=0(root)",
    "[PIVE-TRACE] drwxr-xr-x  2 root root 4096 Feb 22 14:04 .",
    "[PIVE-TRACE] drwxr-xr-x 10 root root 4096 Feb 22 14:04 ..",
    "[PIVE-TRACE] -rw-r--r--  1 root root    0 Feb 22 14:04 .nexus_audit_lock"
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [
        `[PIVE-TRACE] Routing binary data from ${BOT_INFRASTRUCTURE.crawl_targets[Math.floor(Math.random() * 3)].id} to Float.ai dashboard...`,
        `[PIVE-TRACE] SHA-256 HMAC verification: OK`,
        `[PIVE-TRACE] TLS 1.3 Handshake established with ${SECURITY_TRUST_CHAIN.domain}`,
        `[PIVE-TRACE] ARMv7 Optimization: Active`,
        `[PIVE-TRACE] Headless optimization: enabled`
      ];
      setLogs(prev => [...prev, newLogs[Math.floor(Math.random() * newLogs.length)]].slice(-50));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black/90 border border-emerald-500/30 rounded-lg overflow-hidden flex flex-col h-[400px] font-mono text-xs shadow-2xl shadow-emerald-500/10">
      <div className="bg-emerald-500/10 px-4 py-2 border-b border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400">
          <TerminalIcon size={14} />
          <span className="font-bold tracking-widest uppercase">PIVE-TEXBIN Terminal</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto custom-scrollbar text-emerald-500/80 space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-emerald-500/30">[{new Date().toLocaleTimeString()}]</span>
            <span className={log.includes('ERROR') ? 'text-red-400' : ''}>{log}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-emerald-400">root@nexus-lab:~#</span>
          <span className="w-2 h-4 bg-emerald-400 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

const PolicyPanel = () => (
  <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 backdrop-blur-xl">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
        <ShieldAlert size={20} />
      </div>
      <h3 className="text-lg font-bold text-white uppercase tracking-tight">Operation Policies</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Compliance Framework</label>
          <div className="text-sm text-slate-300 font-medium">{OPERATION_POLICIES.compliance_framework}</div>
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Data Integrity</label>
          <div className="text-sm text-slate-300 font-mono">{OPERATION_POLICIES.data_integrity}</div>
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Licensing</label>
          <div className="text-sm text-slate-300">{OPERATION_POLICIES.licensing}</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="text-[10px] font-bold text-blue-400 uppercase mb-2">ART Runtime Security</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Patch Level:</span> <span className="text-slate-300">{OPERATION_POLICIES.art_runtime_security.patch_level}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Fix ID:</span> <span className="text-slate-300 font-mono">{OPERATION_POLICIES.art_runtime_security.fix_id}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Optimization:</span> <span className="text-emerald-400">{OPERATION_POLICIES.art_runtime_security.headless_optimization}</span></div>
          </div>
        </div>
        <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="text-[10px] font-bold text-purple-400 uppercase mb-2">Messaging Policy</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Encryption:</span> <span className="text-slate-300">{OPERATION_POLICIES.messaging_policy.encryption}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Storage:</span> <span className="text-slate-300">{OPERATION_POLICIES.messaging_policy.storage}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Auto-Delete:</span> <span className="text-emerald-400">Enabled</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BotPanel = () => (
  <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 backdrop-blur-xl">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
        <Cpu size={20} />
      </div>
      <h3 className="text-lg font-bold text-white uppercase tracking-tight">Bot Infrastructure</h3>
    </div>

    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase">Active Core</div>
          <div className="text-lg font-black text-white">{BOT_INFRASTRUCTURE.bot_type}</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-slate-500 uppercase">Execution Shell</div>
          <div className="text-sm font-mono text-slate-300">{BOT_INFRASTRUCTURE.execution_shell}</div>
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Crawl Targets</label>
        <div className="space-y-2">
          {BOT_INFRASTRUCTURE.crawl_targets.map(target => (
            <div key={target.id} className="flex items-center justify-between p-3 bg-slate-800/30 border border-slate-700 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${target.priority === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                <div>
                  <div className="text-sm font-bold text-white">{target.id}</div>
                  <div className="text-[10px] text-slate-500">{target.source}</div>
                </div>
              </div>
              <div className="text-right">
                {target.nodes && <div className="text-xs font-mono text-blue-400">{target.nodes} Nodes</div>}
                {target.features && <div className="text-[10px] text-slate-500 uppercase">{target.features.join(', ')}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="text-[10px] font-bold text-slate-500 uppercase mb-3">Spider Logic Configuration</div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex justify-between"><span className="text-slate-500">Identity:</span> <span className="text-slate-300">{BOT_INFRASTRUCTURE.spider_logic.identity}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Follow Redirects:</span> <span className="text-emerald-400">True</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Max Depth:</span> <span className="text-slate-300">Unlimited</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Domain Lock:</span> <span className="text-red-400">False</span></div>
        </div>
      </div>
    </div>
  </div>
);

const SecurityPanel = () => (
  <div className="space-y-6">
    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
          <Lock size={20} />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Trust Chain</h3>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
          <div className="text-xs font-bold text-emerald-400 uppercase mb-1">Domain Authority</div>
          <div className="text-lg font-black text-white">{SECURITY_TRUST_CHAIN.domain}</div>
          <div className="text-xs text-slate-500 mt-1">{SECURITY_TRUST_CHAIN.certificate_authority}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">mTLS Status</div>
            <div className="text-sm font-bold text-emerald-400 uppercase">{SECURITY_TRUST_CHAIN.mtls}</div>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">DMARC Policy</div>
            <div className="text-sm font-bold text-red-400 uppercase">{SECURITY_TRUST_CHAIN.dmarc.p}</div>
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="text-[10px] font-bold text-slate-500 uppercase mb-3">DMARC Configuration</div>
          <div className="grid grid-cols-2 gap-y-2 text-xs">
            <div className="flex justify-between pr-4"><span className="text-slate-500">ADKIM:</span> <span className="text-slate-300">{SECURITY_TRUST_CHAIN.dmarc.adkim}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">ASPF:</span> <span className="text-slate-300">{SECURITY_TRUST_CHAIN.dmarc.aspf}</span></div>
            <div className="col-span-2 pt-2 border-t border-slate-700 mt-2">
              <span className="text-slate-500">RUA:</span> <span className="text-blue-400 font-mono break-all">{SECURITY_TRUST_CHAIN.dmarc.rua}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
          <Activity size={20} />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Android Permissions</h3>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {ANDROID_PERMISSIONS.map(permission => (
          <div key={permission} className="flex items-center gap-3 p-2 bg-slate-800/30 border border-slate-700 rounded-lg text-[10px] font-mono text-slate-400">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            {permission}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function TitanDashboard() {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-emerald-500/30 p-6">
      {/* Titan Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-1 bg-emerald-500"></div>
            <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em]">Titan Mode Active</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
            Nexus Command <span className="text-emerald-500">v2.5</span>
          </h1>
          <p className="text-slate-500 font-mono text-sm mt-2">
            PIVE-TEXBIN // HEADLESS_OPTIMIZATION: ENABLED // NODE: Float.ai
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-xl border border-slate-800">
          <div className="flex flex-col items-end px-4">
            <div className="text-[10px] font-bold text-slate-500 uppercase">System Integrity</div>
            <div className="text-sm font-black text-emerald-400">SHA-256 VERIFIED</div>
          </div>
          <div className="h-10 w-px bg-slate-800"></div>
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
              isLive ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <RefreshCw size={14} className={isLive ? 'animate-spin' : ''} />
            {isLive ? 'LIVE STREAM' : 'PAUSED'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Terminal & Policies */}
        <div className="lg:col-span-8 space-y-8">
          <TitanTerminal />
          <PolicyPanel />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex flex-col items-center text-center">
              <Database className="text-blue-400 mb-3" size={32} />
              <div className="text-2xl font-black text-white">2,400</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Nodes</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex flex-col items-center text-center">
              <Zap className="text-amber-400 mb-3" size={32} />
              <div className="text-2xl font-black text-white">0.42ms</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Latency</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex flex-col items-center text-center">
              <AlertTriangle className="text-red-400 mb-3" size={32} />
              <div className="text-2xl font-black text-white">0</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Breach Attempts</div>
            </div>
          </div>
        </div>

        {/* Right Column: Bots & Security */}
        <div className="lg:col-span-4 space-y-8">
          <BotPanel />
          <SecurityPanel />
        </div>

      </div>

      {/* Footer Branding */}
      <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">JAX-NEXUS-Crawler</div>
          <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">Float.ai Dashboard</div>
        </div>
        <div className="text-[10px] font-mono text-slate-700">
          BUILD_ID: CVE-2026-20415-STABILITY | KERNEL: ARMv7-OPTIMIZED
        </div>
      </div>
    </div>
  );
}
