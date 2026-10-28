create table if not exists public.raymund_vanessa_rsvp (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text,
  attending boolean not null,
  created_at timestamptz not null default now()
);
-- Only the server (service role key) touches this table.
alter table public.raymund_vanessa_rsvp enable row level security;
