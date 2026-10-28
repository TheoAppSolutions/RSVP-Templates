# RSVP templates

One Next.js app serves three invitation designs and one shared RSVP dashboard.

## Run locally

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and set the Supabase URL, service role key, and admin password.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Run `npm run dev`.

Open `/` to choose a design, `/template-1`, `/template-2`, or `/template-3` to view it, and `/admin` for guest responses. All three RSVP forms write to the same Supabase table. The dashboard can filter, export, and delete responses.

The invitation components and event settings live in `templates/template-1`, `templates/template-2`, and `templates/template-3`. Shared media lives in `public`. Update each template's `lib/event.ts` to change its event details or media paths.

For maps, set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` and enable Google's Maps Embed API. Set the same environment variables when deploying.
