# OGS Solution Web App

React + TypeScript + Vite application for LLC onboarding, contact capture, and admin review.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create a local env file:

```bash
cp .env.example .env.local
```

3. Fill in your values in `.env.local`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_PASSWORD`

4. Run the app:

```bash
npm run dev
```

## Quality checks

Run these before shipping changes:

```bash
npm run lint
npm run typecheck
npm run build
```

## Notes

- Contact form submissions are stored in Supabase (`contact_submissions`).
- LLC form submissions are stored in Supabase (`llc_applications`).
- Admin panel access is protected by `VITE_ADMIN_PASSWORD` and can be opened with `Ctrl+Shift+A`.