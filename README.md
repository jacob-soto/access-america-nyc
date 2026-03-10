<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a0c15b44-f866-4c09-844a-647d786000a8

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` (do not commit) and set required env vars:

   ```bash
   # Gemini (optional, used by `services.ts`)
   VITE_GEMINI_API_KEY=...

   # Firebase (required for auth + KYC gate)
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_APP_ID=...

   # Root admin identity (set ONE of these; UID preferred)
   VITE_ROOT_ADMIN_UID=...
   # VITE_ROOT_ADMIN_EMAIL=...
   ```

   Notes:
   - Vite only exposes env vars prefixed with `VITE_`.
   - Never put secrets in git.
3. (One-time) Deploy Firestore rules from [`firestore.rules`](firestore.rules:1) after replacing `ROOT_UID` with your root admin UID.
3. Run the app:
   `npm run dev`

## KYC / ID verification gate

- The Identity flow UI lives in [`components/IdentityPanel.tsx`](components/IdentityPanel.tsx:1).
- Users can submit verification data which is stored in Firestore at `kycSubmissions/{uid}`.
- Root admin can review/approve/reject.
- Protected views are wrapped with [`components/AccessGate.tsx`](components/AccessGate.tsx:1) in [`App.tsx`](App.tsx:1).

Security model:
- Client-side gates are UX only.
- Real enforcement must happen in Firestore Security Rules (and/or Cloud Functions). See [`firestore.rules`](firestore.rules:1).
