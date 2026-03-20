export type KycStatus = 'not_submitted' | 'pending' | 'approved' | 'rejected';

export type KycSubmission = {
  uid: string;
  email: string;
  fullName: string;
  dateOfBirth: string; // ISO date string (YYYY-MM-DD)
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  documentType: 'passport' | 'drivers_license' | 'state_id' | 'other';
  documentNumberLast4: string;
  status: Exclude<KycStatus, 'not_submitted'>;
  createdAtMs: number;
  updatedAtMs: number;
  reviewerUid?: string;
  reviewerNotes?: string;
};

