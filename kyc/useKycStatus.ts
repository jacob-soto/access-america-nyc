import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import type { KycStatus, KycSubmission } from './types';
import { subscribeKyc } from './store';

export function useKycStatus(): {
  status: KycStatus;
  submission: KycSubmission | null;
  isLoading: boolean;
} {
  const { user, isLoading: authLoading } = useAuth();
  const [status, setStatus] = useState<KycStatus>('not_submitted');
  const [submission, setSubmission] = useState<KycSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      setIsLoading(true);
      return;
    }
    if (!user) {
      setStatus('not_submitted');
      setSubmission(null);
      setIsLoading(false);
      return;
    }
    const unsub = subscribeKyc(user.uid, (s, sub) => {
      setStatus(s);
      setSubmission(sub);
      setIsLoading(false);
    });
    return () => unsub();
  }, [user, authLoading]);

  return { status, submission, isLoading };
}

