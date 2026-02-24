
export enum AppView {
  HOME = 'HOME',
  WORKBENCH = 'WORKBENCH',
  KNOWLEDGE = 'KNOWLEDGE',
  IDENTITY = 'IDENTITY',
  SYSTEM = 'SYSTEM',
  PERSONNEL = 'PERSONNEL',
  SETTINGS = 'SETTINGS',
  SOVEREIGN = 'SOVEREIGN',
  LAB_MESH = 'LAB_MESH',
  FUSION = 'FUSION',
  LEGAL = 'LEGAL',
  FCD_PORTAL = 'FCD_PORTAL',
  DLAM_CORE = 'DLAM_CORE',
  DLAM_INSURANCE = 'DLAM_INSURANCE',
  SOVEREIGN_SEARCH = 'SOVEREIGN_SEARCH',
  CONCUR = 'CONCUR',
  AI_AUDIT = 'AI_AUDIT',
  GRANTS_PAYOUT = 'GRANTS_PAYOUT',
  SAM_SSO = 'SAM_SSO',
  RADICAL_ACCEPTANCE = 'RADICAL_ACCEPTANCE',
  SAM_ENTITY_MANAGER = 'SAM_ENTITY_MANAGER',
  OLYMPUS = 'OLYMPUS'
}

export interface Auth0User {
  sub: string;
  name: string;
  email: string;
  picture: string;
  updated_at: string;
  scopes: string[];
}

export interface VectorDoc {
  id: string;
  content: string;
  metadata: any;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: any;
  requiredScope: string;
}

export interface FinancialAccount {
  id: string;
  institution: string;
  type: string;
  balance: number;
  currency: string;
  status: string;
  linkedIdentity: string;
  clearanceLevel: string;
}

export interface DeadArtifact {
  id: string;
  hostname: string;
  origin: string;
  lastSeen: string;
  status: string;
}

export interface FileSystemNode {
  id: string;
  name: string;
  path: string;
  size: string;
  permissions: string;
  type: 'file' | 'directory';
  owner: string;
}

export interface GitRepo {
  id: string;
  name: string;
  provider: string;
  branch: string;
  lastCommit: string;
  status: string;
  loc: number;
}

export interface PersonnelRecord {
    id: string;
    name: string;
    role: string;
    department: string;
    clearance: 'L1' | 'L2' | 'L3' | 'L4' | 'L5-OMEGA';
    status: 'Active' | 'Suspended' | 'Terminated' | 'PARDONED';
    accessKeys: string[];
}

export interface RegistryZone {
  tld: string;
  owner: string;
  status: string;
  dnsKey: string;
  trafficVolume: string;
}

export interface DiscoveredApi {
  id: string;
  service: string;
  keyPreview: string;
  origin: string;
  permissions: string;
  status: string;
}

export interface AccessZone {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  securityLevel: string;
  lastAccess: string;
  codeBlueActive: boolean;
}
