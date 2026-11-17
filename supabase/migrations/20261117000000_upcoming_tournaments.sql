-- Upcoming international events for the 2026/27 season. Mirrors the seed rows
-- in lib/records.js; skips any tournament already entered via the admin panel.
insert into public.tournaments (name, location, start_date, end_date, category, level, status, result)
select seed.* from (values
  ('ONCOCARE Singapore Junior Open Squash Championship', 'Singapore', '2026-12-08'::date, '2026-12-13'::date, 'BU19', 'international', 'upcoming', ''),
  ('U.S. Junior Open Squash Championship', 'Philadelphia, USA', '2026-12-19'::date, '2026-12-23'::date, 'BU19', 'international', 'upcoming', ''),
  ('23rd Asian Junior Squash Team Championship', 'Pattaya, Thailand', '2027-01-20'::date, '2027-01-24'::date, 'Sri Lanka Junior Team', 'international', 'upcoming', '')
) as seed(name, location, start_date, end_date, category, level, status, result)
where not exists (
  select 1 from public.tournaments t
  where t.name = seed.name and t.start_date = seed.start_date
);
