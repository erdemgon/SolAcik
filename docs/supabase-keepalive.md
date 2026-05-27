# Supabase Keep-Alive

This repo includes a scheduled GitHub Actions workflow that pings Supabase once per day:

- Workflow: `.github/workflows/supabase-keepalive.yml`
- Schedule: every day at 06:17 UTC
- Manual test: GitHub Actions -> Supabase keep-alive -> Run workflow

## 1. Create the health table

Run this in Supabase SQL Editor:

```sql
create table if not exists public.health_check (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now()
);

insert into public.health_check default values
on conflict do nothing;

alter table public.health_check enable row level security;

create policy "Allow anonymous health check read"
on public.health_check
for select
to anon
using (true);
```

## 2. Add GitHub Secrets

In GitHub, open:

Settings -> Secrets and variables -> Actions -> New repository secret

Add:

- `SUPABASE_URL`: your project URL, for example `https://abcxyz.supabase.co`
- `SUPABASE_ANON_KEY`: your Supabase anon public key

You can find both in:

Supabase Dashboard -> Project Settings -> API

## 3. Test

Run the workflow manually once. If it succeeds, the daily keep-alive is active.
