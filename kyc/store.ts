import { getFirestore, doc, onSnapshot, setDoc, updateDoc, type Firestore } from 'firebase/firestore';
import { getFirebaseApp } from '../firebase';
import type { KycSubmission, KycStatus } from './types';

function db(): Firestore {
  return getFirestore(getFirebaseApp());
}

export function kycDocRef(uid: string) {
  return doc(db(), 'kycSubmissions', uid);
}

export function subscribeKyc(uid: string, cb: (status: KycStatus, submission: KycSubmission | null) => void) {
  return onSnapshot(kycDocRef(uid), (snap) => {
    if (!snap.exists()) {
      cb('not_submitted', null);
      return;
    }
    const data = snap.data() as KycSubmission;
    cb(data.status ?? 'pending', data);
  });
}

export async function submitKyc(payload: Omit<KycSubmission, 'status' | 'createdAtMs' | 'updatedAtMs'>) {
  const now = Date.now();
  const docRef = kycDocRef(payload.uid);
  await setDoc(
    docRef,
    {
      ...payload,
      status: 'pending',
      createdAtMs: now,
      updatedAtMs: now,
    } satisfies KycSubmission,
    { merge: true }
  );
}

export async function reviewKyc(uid: string, input: { status: 'approved' | 'rejected'; reviewerUid: string; reviewerNotes?: string }) {
  await updateDoc(kycDocRef(uid), {
    status: input.status,
    reviewerUid: input.reviewerUid,
    reviewerNotes: input.reviewerNotes ?? '',
    updatedAtMs: Date.now(),
  });
}

