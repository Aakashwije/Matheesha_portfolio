-- Latest completed results. Mirrors the seed rows in lib/records.js; skips any
-- tournament already entered via the admin panel.
insert into public.tournaments (name, location, start_date, end_date, category, level, status, result)
select seed.* from (values
  ('18th Air Force Open Squash Championship 2026', 'Ratmalana Air Force Squash Complex', '2026-10-02'::date, '2026-10-10'::date, 'Men’s Open', 'local', 'completed', 'Men’s Open 4th Place'),
  ('Korea Junior Open Squash Championship 2026 (AJSS Gold)', 'South Korea', '2026-11-01'::date, null::date, 'BU19', 'international', 'completed', '5th Place')
) as seed(name, location, start_date, end_date, category, level, status, result)
where not exists (
  select 1 from public.tournaments t
  where t.name = seed.name and t.start_date = seed.start_date
);
