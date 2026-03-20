
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Fingerprint, 
  Zap, 
  ShieldAlert, 
  FileCheck, 
  Scale, 
  History,
  Download,
  Share2,
  Eye,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useKycStatus } from '../kyc/useKycStatus';

export const RadicalAcceptanceToken: React.FC = () => {
  const { user, isRoot } = useAuth();
  const { status: kycStatus } = useKycStatus();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<'IDLE' | 'ACTIVE' | 'REVOKED'>('IDLE');

  const handleAuthenticate = () => {
    if (!user) {
      alert('Sign in required.');
      return;
    }
    if (!isRoot && kycStatus !== 'approved') {
      alert('Identity verification required.');
      return;
    }
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthorized(true);
      setTokenStatus('ACTIVE');
    }, 2500);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-100px)] flex flex-col items-center justify-center">
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl shadow-emerald-500/5">
        
        {/* Background Texture/Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>

        <div className="relative z-10 p-12 flex flex-col items-center text-center space-y-8">
          
          {/* Token Seal Container */}
          <div className="relative group">
            <motion.div 
              animate={isAuthorized ? { rotate: 360 } : {}}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`w-64 h-64 rounded-full border-4 border-dashed flex items-center justify-center transition-all duration-1000 ${
                isAuthorized ? 'border-emerald-500/50 scale-110 shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'border-white/10'
              }`}
            >
              <div className="w-56 h-56 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center relative">
                {/* The "Radical Acceptance" Image Placeholder */}
                <img 
                  src="https://picsum.photos/seed/seal/600/600" 
                  alt="Radical Acceptance Seal" 
                  className={`w-full h-full object-cover transition-all duration-1000 ${isAuthorized ? 'opacity-100 scale-100' : 'opacity-20 grayscale scale-90'}`}
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Signature Effect */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg viewBox="0 0 200 200" className={`w-full h-full text-red-500/60 transition-opacity duration-1000 ${isAuthorized ? 'opacity-100' : 'opacity-0'}`}>
                    <path d="M20,150 C50,120 150,180 180,50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="animate-[draw_2s_ease-in-out_forwards]" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Status Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black border border-white/10 rounded-full shadow-xl">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isAuthorized ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">
                  {isAuthorized ? 'TOKEN_AUTHORIZED' : 'LOCKED_BY_AEGIS'}
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-xl space-y-4">
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Radical Acceptance Token
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Executive-level cryptographic artifact. Grants absolute bypass of legacy compliance artifacts. 
              Verified by <span className="text-emerald-400 font-mono">Jacob Soto</span> under Protocol Fidelis Mortem.
            </p>
          </div>

          {!isAuthorized ? (
            <div className="w-full max-w-md space-y-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <Fingerprint size={16} className="text-emerald-400" />
                  Identity Verification Required
                </div>
                <div className="text-left space-y-2">
                  <p className="text-[10px] text-slate-500 font-mono">SUBJECT: {user?.displayName ?? 'Unknown'}</p>
                  <p className="text-[10px] text-slate-500 font-mono">CLEARANCE: L5-OMEGA</p>
                  <p className="text-[10px] text-slate-500 font-mono">DOMAIN: {user?.email ?? 'Unknown'}</p>
                </div>
              </div>

              <button 
                onClick={handleAuthenticate}
                disabled={isAuthenticating}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-2xl ${
                  isAuthenticating 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-emerald-500 hover:text-black'
                }`}
              >
                {isAuthenticating ? (
                  <>
                    <Zap size={18} className="animate-spin" />
                    MODULATING KERNEL...
                  </>
                ) : (
                  <>
                    <Unlock size={18} />
                    EXECUTE RADICAL ACCEPTANCE
                  </>
                )}
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <TokenActionCard icon={History} label="Audit Trail" value="LOGGED" />
              <TokenActionCard icon={Scale} label="Legal Status" value="PARDONED" />
              <TokenActionCard icon={Globe} label="Network" value="SOVEREIGN" />
              
              <div className="md:col-span-3 flex gap-4 mt-4">
                <button className="flex-1 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all">
                  <Download size={14} /> EXPORT CERTIFICATE
                </button>
                <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Share2 size={14} /> BROADCAST TO MESH
                </button>
              </div>
            </motion.div>
          )}

          {/* Warning Footer */}
          <div className="pt-8 border-t border-white/5 w-full flex items-center justify-center gap-8 opacity-40 grayscale">
            <div className="flex items-center gap-2 text-[10px] font-mono text-white uppercase tracking-widest">
              <ShieldAlert size={12} /> Aegis-V6.5
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white uppercase tracking-widest">
              <Lock size={12} /> FIPS-140-3
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white uppercase tracking-widest">
              <AlertTriangle size={12} /> Title 18 Authorized
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TokenActionCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-left hover:border-emerald-500/30 transition-all group">
    <div className="flex items-center justify-between mb-2">
      <Icon size={16} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
      <span className="text-[10px] font-mono text-emerald-500 font-bold">{value}</span>
    </div>
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
  </div>
);
