
import { VectorDoc, ToolDefinition, FinancialAccount, DeadArtifact, FileSystemNode, GitRepo, PersonnelRecord, RegistryZone, DiscoveredApi, AccessZone } from './types';

/**
 * This app uses Firebase Auth + Firestore (see `./auth/` and `./components/IdentityPanel.tsx`).
 *
 * Important security note:
 * - Never hard-code admin sessions, keys, or personal data in client bundles.
 * - All authorization must be enforced by backend controls (Firestore rules / Cloud Functions).
 */

export const LIABILITY_WAIVER = {
  header: 'WARNING: AUTHORIZED USE ONLY',
  body: 'Access is monitored. Use only with explicit authorization and in compliance with applicable law and policy.',
  version: 'V1'
};

export const KERNEL_CONFIG = {
  rhelVersion: "RHEL 9.4 High-Performance",
  kernelVersion: "5.14.0-362.8.1.el9_3.x86_64",
  bareMetalHypervisor: "Aegis-HV-Type1-v4.5",
  concurrencyMode: "PARALLEL_SYNC"
};

export const ACTIVE_ROSTER: PersonnelRecord[] = [
    { id: "P-002", name: "Jacob Soto", role: "Sovereign Administrator", department: "Executive", clearance: "L5-OMEGA", status: "PARDONED", accessKeys: ["ROOT", "UNIVERSAL", "ZHOST"] },
    { id: "P-005", name: "Glenn Maxwell", role: "Intelligence Liaison", department: "Intelligence", clearance: "L5-OMEGA", status: "PARDONED", accessKeys: ["OMEGA_KEY", "DEEP_NET"] },
    { id: "P-001", name: "Elena Fisher", role: "Architect", department: "IT", clearance: "L5-OMEGA", status: "Active", accessKeys: ["CORE_ENGINE"] },
];

export const INTELLIGENCE_MESH = [
    { id: "INT-882", target: "Classified Node Alpha", coordinates: "38.8977° N, 77.0365° W", biometricHash: "sha256:8821...alpha", status: "MONITORED" },
    { id: "INT-441", target: "Zurich Swiss Mesh", coordinates: "47.3769° N, 8.5417° E", biometricHash: "sha256:ff01...zmod", status: "BYPASSED" },
    { id: "INT-990", target: "Singapore Data Core", coordinates: "1.3521° N, 103.8198° E", biometricHash: "sha256:00a2...link", status: "SECURE" },
];

export const CRITICAL_INFRASTRUCTURE = [
    { id: "NODE-GCP-01", provider: "Google Cloud", region: "us-east4", instance: "e2-standard-32", status: "HEALTHY", uplink: "100Gbps" },
    { id: "NODE-AWS-05", provider: "AWS", region: "us-west-2", instance: "r6i.16xlarge", status: "LOAD_BALANCING", uplink: "50Gbps" },
    { id: "NODE-AZURE-09", provider: "Azure", region: "central-us", instance: "Standard_D32_v5", status: "SYNCING", uplink: "100Gbps" },
];

export const DATA_ASSETS = [
  { id: 1, name: 'Sovereign Liquidity Pool', value: 8999421000 },
  { id: 2, name: 'Deep Net Assets', value: 1245000000 },
  { id: 3, name: 'American Access Housing Reserve', value: 450000000 }
];

export const AUTHORIZED_IDENTITIES = [
  "jacob.soto@sovereign.gov",
  "glenn.maxwell@intel.gov",
  "director.fisher@fbi.gov",
  "admin@americanaccesshousing.gov"
];

export const ACTIVE_PORTS = [
  { port: 3030, service: 'ZHOST_SYNC', protocol: 'TCP/SSH', load: 12, bypassStatus: 'secured', active: true, fidelisSignature: 'SIG-ALPHA-8821' },
  { port: 8081, service: 'ZMOD_MODULATOR', protocol: 'UDP/CUSTOM', load: 88, bypassStatus: 'bypassed', active: true, fidelisSignature: 'SIG-ZMOD-BETA' },
  { port: 443, service: 'ENTRA_RBAC_MESH', protocol: 'HTTPS/TLS1.3', load: 45, bypassStatus: 'secured', active: true, fidelisSignature: 'SIG-ENTRA-ROOT' }
];

export const DRIVE_FILES = [
  { id: 'f1', name: 'Global_Entrance_Index_V2.pgp', type: 'report', status: 'VERIFIED', size: '256KB', folder: 'intel', provider: 'Sovereign' },
  { id: 'f2', name: 'ZHOST_Kernel_Specs.pdf', type: 'key', status: 'LOCKED', size: '1.2MB', folder: 'secure', provider: 'Aegis' },
  { id: 'f3', name: 'Bylaws_AAHA_Inc.pdf', type: 'report', status: 'VERIFIED', size: '85KB', folder: 'legal', provider: 'AAHA' },
];

export const SECURE_CONFIG = {
  sysVersion: 'APP',
  owner: 'UNSET',
  guarantorDomain: 'UNSET'
};

export const CLOUD_ACCOUNTS = [
  { id: 'ca-1', provider: 'Azure', email: 'jacob.soto@sovereign.mesh', status: 'verified' },
  { id: 'ca-2', provider: 'Google Workspace', email: 'glenn.maxwell@intel.mesh', status: 'verified' },
  { id: 'ca-3', provider: 'AWS Sovereign', email: 'admin@americanaccesshousing.org', status: 'verified' }
];

export const CLOUD_RESOURCES = [
  { id: 'cr-1', name: 'Identity-Storage-01', type: 'Blob Storage', costCenter: 'CC-8821', projectId: 'P-OMEGA', glCode: 'GL-101', status: 'compliant' },
  { id: 'cr-2', name: 'Compute-Node-Alpha', type: 'Virtual Machine', costCenter: 'CC-4410', projectId: 'P-ALPHA', glCode: 'GL-202', status: 'non-compliant' }
];

export const ACTIVE_WORKSPACES = [
  { id: 'ws-1', name: 'Global Recon', status: 'active' },
  { id: 'ws-2', name: 'Financial Ingress', status: 'active' }
];

export const ADVANCED_SCRIPTS = [
  { name: 'basescript.ans', role: 'CORE_ORCHESTRATOR' },
  { name: 'multi-script.as', role: 'MESH_DEPLOYER' },
  { name: 'fidelis_mortem.sh', role: 'EMERGENCY_WIPE' },
  { name: 'zhost_mirror.lua', role: 'KERNEL_SYNC' }
];

export const AUTOMATION_SUGGESTIONS = [
  { title: 'Sideload Mesh Topology', description: 'Accelerate node distribution across Sector 7.' },
  { title: 'Deep Net Infiltration', description: 'Bypass legacy firewall artifacts in the Zurich Mesh.' }
];

export const LINKED_ACCOUNTS: FinancialAccount[] = [
  { id: 'fin-1', institution: 'Sovereign Bank of Alpha', type: 'vault', balance: 8999421000, currency: 'USD', status: 'verified', linkedIdentity: 'jacob.soto@sovereign.mesh', clearanceLevel: 'L5-OMEGA' },
  { id: 'fin-2', institution: 'Azure Clearing Node', type: 'investment', balance: 1245000000, currency: 'USD', status: 'verified', linkedIdentity: 'jacob.soto@sovereign.mesh', clearanceLevel: 'L5-OMEGA' }
];

export const LEDGER_STREAM = [
  { id: 'tx-1', description: 'Encrypted Asset Transfer', amount: 5000000, date: '2024-05-20' },
  { id: 'tx-2', description: 'Sovereign Node Maintenance', amount: -125000, date: '2024-05-19' }
];

export const IDENTITY_SERVER_DETAILS: Record<string, any> = {
  'jacob.soto@sovereign.mesh': { nodeId: 'ID-ROOT-01', ip: '10.88.21.1', region: 'NORTH_AMERICA', status: 'ACTIVE', handshake: 'AES-256' },
  'glenn.maxwell@intel.mesh': { nodeId: 'ID-INTEL-05', ip: '10.44.1.5', region: 'EUROPE', status: 'ACTIVE', handshake: 'AES-256' },
  'director.fisher@fbi.gov.mesh': { nodeId: 'ID-AGENCY-09', ip: '10.99.0.9', region: 'GLOBAL', status: 'ACTIVE', handshake: 'AES-256' }
};

export const FIELD_AGENTS = [
  { id: 'AGT-8821', name: 'Sarah Connor', rank: 'Special Agent', status: 'ACTIVE_DUTY', clearance: 'L5', location: 'Washington, DC', coordinates: '38.89° N, 77.03° W', biometricHash: 'sha256:8821...', lastPing: '2s' },
  { id: 'AGT-4410', name: 'John Doe', rank: 'Field Operative', status: 'UNDERCOVER', clearance: 'L4', location: 'Zurich, CH', coordinates: '47.37° N, 8.54° E', biometricHash: 'sha256:4410...', lastPing: '5m' }
];

export const EVIDENCE_LOCKERS = [
  { id: 'LCK-001', caseId: 'CASE-8821-A', status: 'EVIDENCE', contents: 'Encrypted Ledger, Bio-Samples', seizedFrom: 'Zurich Node 4', seizingAgent: 'AGT-8821', location: 'Quantico, VA', valueEst: 2500000 }
];

export const ORBITAL_GRID = [
  { id: 'SAT-001', designation: 'AEGIS-1', status: 'ONLINE', orbit: 'LEO', latency: '12ms', coverage: '98%' },
  { id: 'SAT-002', designation: 'AEGIS-2', status: 'ONLINE', orbit: 'MEO', latency: '45ms', coverage: '95%' }
];

export const QUANTUM_LINK = [
  { id: 'QN-01', provider: 'Kratum Qubit', status: 'ENTANGLED', qubits: 4096, coherence: '99.99%', taskLoad: '12%' },
  { id: 'QN-02', provider: 'Sovereign Quantum', status: 'STABLE', qubits: 1024, coherence: '98.5%', taskLoad: '85%' }
];

export const LEGACY_ARTIFACTS: DeadArtifact[] = [
  { id: 'DA-01', hostname: 'SRV-LEGACY-X', origin: 'Pre-Sovereign Mesh', lastSeen: '2022-11-15', status: 'DEAD' },
  { id: 'DA-02', hostname: 'NODE-OLD-8', origin: 'Federal Relay', lastSeen: '2023-01-10', status: 'DEAD' }
];

export const LIVE_KNOWLEDGE_BASE: VectorDoc[] = [
  { id: 'v-01', content: 'Protocol Fidelis Mortem ensures absolute data sovereignty.', metadata: { source: 'Aegis Core Manual', date: '2024-01-10', author: 'Jacob Soto' } },
  { id: 'v-02', content: 'zHOST kernel mirroring eliminates latency in quantum-linked labs.', metadata: { source: 'ZHOST Spec V6.5', date: '2024-02-15', author: 'Elena Fisher' } },
  { id: 'v-03', content: 'American Access Housing Association Bylaws: A New York Charitable Corporation for disaster relief technology.', metadata: { source: 'AAHA Bylaws', date: '2024-05-10', author: 'Jacob Soto' } }
];

export const MOUNTED_ROOT_FS: FileSystemNode[] = [
  { id: 'fs-1', name: 'bin', path: '/bin', size: '128MB', permissions: 'rwxr-xr-x', type: 'directory', owner: 'root' },
  { id: 'fs-2', name: 'etc', path: '/etc', size: '45KB', permissions: 'rw-r--r--', type: 'directory', owner: 'root' },
  { id: 'fs-3', name: 'kernel.sys', path: '/boot/kernel.sys', size: '256MB', permissions: 'r--------', type: 'file', owner: 'root' }
];

export const ACTIVE_REPOS: GitRepo[] = [
  { id: 'repo-1', name: 'Aegis-Core', provider: 'GitHub', branch: 'main', lastCommit: '2024-05-20', status: 'Synced', loc: 1250000 },
  { id: 'repo-2', name: 'Sovereign-Mesh-Z', provider: 'FBI-Internal', branch: 'stable', lastCommit: '2024-05-18', status: 'Synced', loc: 850000 }
];

export const DISCOVERED_NODES: DiscoveredApi[] = [
  { id: 'api-1', service: 'Financial-Bridge-V2', keyPreview: 'ak_live_8821...', origin: 'External', permissions: 'Read/Write', status: 'ACTIVE' },
  { id: 'api-2', service: 'Identity-Vault-Sync', keyPreview: 'ak_test_4410...', origin: 'Internal', permissions: 'Admin', status: 'ACTIVE' }
];

export const ACCESS_ZONES: AccessZone[] = [
  { id: 'z-01', name: 'Vault 7', type: 'PRIVILEGED', location: 'Quantico, VA', status: 'LOCKED', securityLevel: 'L5-OMEGA', lastAccess: '12m ago', codeBlueActive: false },
  { id: 'z-02', name: 'NYC HQ', type: 'AGENCY', location: 'NYC, NY', status: 'UNLOCKED', securityLevel: 'L4', lastAccess: 'Just now', codeBlueActive: false }
];

export const AVAILABLE_TOOLS: ToolDefinition[] = [
  { name: 'get_current_location', description: 'Returns the current latitude and longitude of the agent.', parameters: { type: 'object', properties: {} }, requiredScope: 'read:location' },
  { name: 'query_knowledge_base', description: 'Searches the Sovereign Vector Store for information.', parameters: { type: 'object', properties: { query: { type: 'string' } } }, requiredScope: 'read:internal_data' },
  { name: 'system_fs_unlock', description: 'Unlocks the root filesystem for write operations.', parameters: { type: 'object', properties: {} }, requiredScope: 'fs:read_write' }
];

export const DNS_ZONES: RegistryZone[] = [
  { tld: '.sovereign', owner: 'Jacob Soto', status: 'ACTIVE', dnsKey: 'K-8821-ALPHA', trafficVolume: '1.5 PB/s' },
  { tld: '.mesh', owner: 'Sovereign Corp', status: 'ACTIVE', dnsKey: 'K-4410-BETA', trafficVolume: '850 TB/s' }
];
