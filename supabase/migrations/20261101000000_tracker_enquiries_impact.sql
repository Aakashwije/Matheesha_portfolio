-- Rankings tracker, tournaments, sponsor exposure (ROI) and sponsor enquiries.
-- Writes go through the service role in Next.js API routes; RLS only exposes
-- public reads where the site displays the data. Enquiries are never public.

create table if not exists public.ranking_history (
  id uuid primary key default gen_random_uuid(),
  recorded_on date not null,
  category text not null,
  rank integer not null check (rank > 0),
  source text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null default '',
  start_date date not null,
  end_date date,
  category text not null default '',
  level text not null default 'local' check (level in ('local', 'international')),
  status text not null default 'upcoming' check (status in ('upcoming', 'completed')),
  result text not null default '',
  link text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.sponsor_exposure (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  event_date date not null,
  sponsor text not null default 'Würth Lanka',
  location text not null default '',
  audience_reach integer,
  social_impressions integer,
  media_mentions integer,
  logo_minutes integer,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.sponsor_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null default '',
  email text not null,
  phone text not null default '',
  package text not null default '',
  budget text not null default '',
  message text not null,
  language text not null default 'en',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.ranking_history enable row level security;
alter table public.tournaments enable row level security;
alter table public.sponsor_exposure enable row level security;
alter table public.sponsor_enquiries enable row level security;

drop policy if exists "ranking_history_public_read" on public.ranking_history;
create policy "ranking_history_public_read" on public.ranking_history
  for select to anon, authenticated using (true);

drop policy if exists "tournaments_public_read" on public.tournaments;
create policy "tournaments_public_read" on public.tournaments
  for select to anon, authenticated using (true);

drop policy if exists "sponsor_exposure_public_read" on public.sponsor_exposure;
create policy "sponsor_exposure_public_read" on public.sponsor_exposure
  for select to anon, authenticated using (true);

-- No policies on sponsor_enquiries: only the service role can read or write.

-- Seed rows mirror the built-in fallbacks in lib/records.js.
insert into public.ranking_history (recorded_on, category, rank, source)
select * from (values
  ('2023-12-01'::date, 'Asian Junior', 35, 'Asian Squash Federation'),
  ('2025-12-01'::date, 'Men’s Open (Sri Lanka)', 8, 'Sri Lanka Squash'),
  ('2026-02-01'::date, 'Asian Junior', 7, 'Asian Squash Federation'),
  ('2026-02-01'::date, 'National U19', 1, 'Sri Lanka Squash')
) as seed(recorded_on, category, rank, source)
where not exists (select 1 from public.ranking_history);

insert into public.tournaments (name, location, start_date, end_date, category, level, status, result)
select * from (values
  ('SLS 45th Anniversary Open Squash Championship 2026', 'Ratmalana Air Force Squash Complex', '2026-05-03'::date, '2026-05-10'::date, 'BU19 / Men’s Open', 'local', 'completed', 'U19 Champion · Men’s Open 6th'),
  ('Sri Lanka Junior Open 2026', 'Colombo, Sri Lanka', '2026-02-03'::date, '2026-02-15'::date, 'BU19', 'international', 'completed', '2nd Place'),
  ('World Junior Squash Championship 2025', 'Cairo, Egypt', '2025-07-01'::date, null, 'BU19', 'international', 'completed', 'Plate Semi Finalist')
) as seed(name, location, start_date, end_date, category, level, status, result)
where not exists (select 1 from public.tournaments);
