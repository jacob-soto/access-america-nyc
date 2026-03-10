import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ShieldAlert, LogIn, LogOut, FileText, UserCheck, XCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import type { KycStatus, KycSubmission } from '../kyc/types';
import { reviewKyc, submitKyc, subscribeKyc } from '../kyc/store';
import { getFirestore, collection, onSnapshot, query, orderBy, type QuerySnapshot, type DocumentData } from 'firebase/firestore';
import { getFirebaseApp } from '../firebase';

type FormState = {
  fullName: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  documentType: 'passport' | 'drivers_license' | 'state_id' | 'other';
  documentNumberLast4: string;
};

const emptyForm: FormState = {
  fullName: '',
  dateOfBirth: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'US',
  documentType: 'drivers_license',
  documentNumberLast4: '',
};

function statusBadge(status: KycStatus) {
  switch (status) {
    case 'approved':
      return { label: 'Approved', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 };
    case 'rejected':
      return { label: 'Rejected', cls: 'bg-red-500/10 text-red-400 border-red-500/30', icon: XCircle };
    case 'pending':
      return { label: 'Pending review', cls: 'bg-amber-500/10 text-amber-300 border-amber-500/30', icon: ShieldAlert };
    default:
      return { label: 'Not submitted', cls: 'bg-white/5 text-white/60 border-white/10', icon: FileText };
  }
}

export const IdentityPanel: React.FC = () => {
  const { user, isLoading, isRoot, signIn, signOut } = useAuth();

  const [kycStatus, setKycStatus] = useState<KycStatus>('not_submitted');
  const [mySubmission, setMySubmission] = useState<KycSubmission | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitBusy, setSubmitBusy] = useState(false);

  // Root admin review list (client-side UI; server-side enforcement is in Firestore rules).
  const [allSubmissions, setAllSubmissions] = useState<KycSubmission[]>([]);
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [reviewBusyUid, setReviewBusyUid] = useState<string | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setKycStatus('not_submitted');
      setMySubmission(null);
      return;
    }
    const unsub = subscribeKyc(user.uid, (status, submission) => {
      setKycStatus(status);
      setMySubmission(submission);
      if (submission) {
        setForm({
          fullName: submission.fullName ?? '',
          dateOfBirth: submission.dateOfBirth ?? '',
          addressLine1: submission.addressLine1 ?? '',
          addressLine2: submission.addressLine2 ?? '',
          city: submission.city ?? '',
          state: submission.state ?? '',
          postalCode: submission.postalCode ?? '',
          country: submission.country ?? 'US',
          documentType: submission.documentType ?? 'drivers_license',
          documentNumberLast4: submission.documentNumberLast4 ?? '',
        });
      }
    });
    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (!user || !isRoot) {
      setAllSubmissions([]);
      return;
    }
    const firestore = getFirestore(getFirebaseApp());
    const q = query(collection(firestore, 'kycSubmissions'), orderBy('updatedAtMs', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap: QuerySnapshot<DocumentData>) => {
        const rows: KycSubmission[] = [];
        snap.forEach((d) => rows.push(d.data() as KycSubmission));
        setAllSubmissions(rows);
      },
      (err) => {
        setReviewError(err.message);
      }
    );
    return () => unsub();
  }, [user, isRoot]);

  const badge = useMemo(() => statusBadge(kycStatus), [kycStatus]);
  const BadgeIcon = badge.icon;

  if (isLoading) {
    return <div className="p-8 text-white/70">Loading identity…</div>;
  }

  if (!user) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Identity Verification</h2>
            <p className="text-white/50 text-sm">Sign in to submit verification documents for manual review.</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <button
            onClick={() => signIn()}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-3 rounded-xl transition-colors"
          >
            <LogIn size={18} /> Sign in with Google
          </button>
          <p className="mt-3 text-[11px] text-white/40 leading-relaxed">
            This app uses Firebase Authentication. You must enable Google sign-in (or adjust providers) in your Firebase project.
          </p>
        </div>
      </div>
    );
  }

  const canSubmit = kycStatus === 'not_submitted' || kycStatus === 'rejected';
  const onSubmit = async () => {
    setSubmitError(null);
    setSubmitBusy(true);
    try {
      const email = (user.email ?? '').trim();
      if (!email) throw new Error('Your auth account is missing an email.');
      if (!form.fullName.trim()) throw new Error('Full legal name is required.');
      if (!/^\d{4}-\d{2}-\d{2}$/.test(form.dateOfBirth)) throw new Error('Date of birth must be YYYY-MM-DD.');
      if (!form.addressLine1.trim() || !form.city.trim() || !form.state.trim() || !form.postalCode.trim()) {
        throw new Error('Address is incomplete.');
      }
      if (!/^\d{4}$/.test(form.documentNumberLast4)) throw new Error('Document last 4 must be exactly 4 digits.');

      await submitKyc({
        uid: user.uid,
        email,
        fullName: form.fullName.trim(),
        dateOfBirth: form.dateOfBirth,
        addressLine1: form.addressLine1.trim(),
        addressLine2: form.addressLine2.trim() || undefined,
        city: form.city.trim(),
        state: form.state.trim(),
        postalCode: form.postalCode.trim(),
        country: (form.country || 'US').trim().toUpperCase(),
        documentType: form.documentType,
        documentNumberLast4: form.documentNumberLast4,
      });
    } catch (e: any) {
      setSubmitError(e?.message ?? 'Submission failed');
    } finally {
      setSubmitBusy(false);
    }
  };

  const onReview = async (targetUid: string, status: 'approved' | 'rejected') => {
    if (!user) return;
    setReviewError(null);
    setReviewBusyUid(targetUid);
    try {
      await reviewKyc(targetUid, {
        status,
        reviewerUid: user.uid,
        reviewerNotes: reviewNotes[targetUid] ?? '',
      });
    } catch (e: any) {
      setReviewError(e?.message ?? 'Review failed');
    } finally {
      setReviewBusyUid(null);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Identity Verification</h2>
            <p className="text-white/50 text-sm">KYC submission and manual approval flow.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-2 ${badge.cls}`}>
            <BadgeIcon size={14} /> {badge.label}
          </div>
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-xl border border-white/10"
            title="Sign out"
          >
            <LogOut size={16} />
            <span className="text-xs font-bold">Sign out</span>
          </button>
        </div>
      </div>

      {submitError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-sm text-red-200">{submitError}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText size={18} className="text-emerald-400" />
                Submit Verification
              </h3>
              {isRoot && (
                <div className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-300">
                  ROOT ADMIN
                </div>
              )}
            </div>

            {!canSubmit && (
              <div className="p-4 bg-black/40 border border-white/10 rounded-2xl text-sm text-white/70">
                Your submission is <span className="font-bold">{badge.label}</span>. You can resubmit only after rejection.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Full legal name" value={form.fullName} disabled={!canSubmit} onChange={(v) => setForm((s) => ({ ...s, fullName: v }))} />
              <Field label="Date of birth (YYYY-MM-DD)" value={form.dateOfBirth} disabled={!canSubmit} onChange={(v) => setForm((s) => ({ ...s, dateOfBirth: v }))} />

              <Field label="Address line 1" value={form.addressLine1} disabled={!canSubmit} onChange={(v) => setForm((s) => ({ ...s, addressLine1: v }))} />
              <Field label="Address line 2" value={form.addressLine2} disabled={!canSubmit} onChange={(v) => setForm((s) => ({ ...s, addressLine2: v }))} />
              <Field label="City" value={form.city} disabled={!canSubmit} onChange={(v) => setForm((s) => ({ ...s, city: v }))} />
              <Field label="State/Province" value={form.state} disabled={!canSubmit} onChange={(v) => setForm((s) => ({ ...s, state: v }))} />
              <Field label="Postal code" value={form.postalCode} disabled={!canSubmit} onChange={(v) => setForm((s) => ({ ...s, postalCode: v }))} />
              <Field label="Country" value={form.country} disabled={!canSubmit} onChange={(v) => setForm((s) => ({ ...s, country: v }))} />

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Document type</label>
                <select
                  value={form.documentType}
                  disabled={!canSubmit}
                  onChange={(e) => setForm((s) => ({ ...s, documentType: e.target.value as any }))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
                >
                  <option value="drivers_license">Driver's license</option>
                  <option value="state_id">State ID</option>
                  <option value="passport">Passport</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <Field
                label="Document number (last 4 digits only)"
                value={form.documentNumberLast4}
                disabled={!canSubmit}
                onChange={(v) => setForm((s) => ({ ...s, documentNumberLast4: v.replace(/\D/g, '').slice(0, 4) }))}
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] text-white/40 leading-relaxed">
                Do not collect SSNs. For document uploads, use Firebase Storage with strict rules and short-lived signed URLs.
              </p>
              <button
                onClick={onSubmit}
                disabled={!canSubmit || submitBusy}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:hover:bg-emerald-500 text-black font-bold px-4 py-3 rounded-xl transition-colors"
              >
                <UserCheck size={18} />
                {submitBusy ? 'Submitting…' : 'Submit for review'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-white">Your status</h3>
            <div className="p-4 bg-black/40 border border-white/10 rounded-2xl">
              <p className="text-xs text-white/40">Signed in as</p>
              <p className="text-sm font-mono text-white">{user.email ?? '(no email)'} </p>
              {mySubmission?.reviewerNotes && (
                <p className="mt-3 text-xs text-white/60">Reviewer notes: {mySubmission.reviewerNotes}</p>
              )}
            </div>
          </div>

          {isRoot && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Root review queue</h3>
              {reviewError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-200">{reviewError}</div>
              )}
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {allSubmissions.length === 0 ? (
                  <div className="text-sm text-white/60">No submissions found.</div>
                ) : (
                  allSubmissions.map((s) => (
                    <motion.div
                      key={s.uid}
                      whileHover={{ x: 2 }}
                      className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[10px] font-mono text-white/40">UID: {s.uid}</div>
                          <div className="text-sm font-bold text-white">{s.fullName}</div>
                          <div className="text-xs text-white/60">{s.email}</div>
                        </div>
                        <div className={`px-2 py-1 rounded border text-[10px] font-bold ${statusBadge(s.status).cls}`}>
                          {statusBadge(s.status).label}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-white/60">
                        <div>DOB: <span className="text-white/80">{s.dateOfBirth}</span></div>
                        <div>Doc: <span className="text-white/80">{s.documentType}</span></div>
                        <div>Addr: <span className="text-white/80">{s.city}, {s.state}</span></div>
                        <div>Updated: <span className="text-white/80">{new Date(s.updatedAtMs).toLocaleString()}</span></div>
                      </div>

                      <textarea
                        value={reviewNotes[s.uid] ?? ''}
                        onChange={(e) => setReviewNotes((m) => ({ ...m, [s.uid]: e.target.value }))}
                        className="w-full min-h-16 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Reviewer notes (stored with decision)"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onReview(s.uid, 'approved')}
                          disabled={reviewBusyUid === s.uid}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-3 py-2 rounded-xl disabled:opacity-60"
                        >
                          <CheckCircle2 size={16} /> Approve
                        </button>
                        <button
                          onClick={() => onReview(s.uid, 'rejected')}
                          disabled={reviewBusyUid === s.uid}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-black font-bold px-3 py-2 rounded-xl disabled:opacity-60"
                        >
                          <XCircle size={16} /> Reject
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">
                Root-only access must be enforced with Firestore Security Rules. Client-side checks are for UX only.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</label>
    <input
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
    />
  </div>
);

