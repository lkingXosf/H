# Contact Form Storage Setup (Supabase)

The project uses Supabase directly for contact submissions. EmailJS is no longer part of the contact flow.

## Required environment variables

Create a local env file from `.env.example` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_PASSWORD`

## Required table

Ensure your Supabase project has a `contact_submissions` table with these columns:

- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `phone` (text, nullable)
- `company` (text, nullable)
- `message` (text)
- `created_at` (timestamp, default now)

## Verification

1. Start the app with `npm run dev`.
2. Submit the contact form with valid data.
3. Verify a new row appears in `contact_submissions`.
4. Submit invalid email/phone values and confirm inline validation errors are shown.
