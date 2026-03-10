import React from 'react';
import { ShieldAlert, UserCheck, LogIn } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useKycStatus } from '../kyc/useKycStatus';

export const AccessGate: React.FC<
  React.PropsWithChildren<{
    title: string;
    requireKycApproved?: boolean;
    onGoToIdentity?: () => void;
  }>
> = ({ title, requireKycApproved, onGoToIdentity, children }) => {
  const { user, isLoading: authLoading, signIn, isRoot } = useAuth();
  const { status, isLoading: kycLoading } = useKycStatus();

  if (authLoading || kycLoading) {
    return <div className="p-8 text-white/70">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{title} is locked</h2>
            <p className="text-white/50 text-sm">Sign in to continue.</p>
          </div>
        </div>
        <button
          onClick={() => signIn()}
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-3 rounded-xl transition-colors"
        >
          <LogIn size={18} /> Sign in
        </button>
      </div>
    );
  }

  if (isRoot) {
    return <>{children}</>;
  }

  if (requireKycApproved && status !== 'approved') {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300">
            <UserCheck size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Verification required</h2>
            <p className="text-white/50 text-sm">To access {title}, your identity must be approved by the root admin.</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white/70">
          Current status: <span className="font-bold text-white">{status.replace('_', ' ')}</span>
        </div>
        <button
          onClick={() => onGoToIdentity?.()}
          className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl border border-white/10"
        >
          <UserCheck size={18} /> Go to Identity verification
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

