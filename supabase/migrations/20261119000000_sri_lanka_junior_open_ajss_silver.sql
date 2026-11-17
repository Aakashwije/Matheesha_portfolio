-- Tag the Sri Lanka Junior Open as an AJSS Silver event, matching lib/records.js.
update public.tournaments
set name = 'Sri Lanka Junior Open 2026 (AJSS Silver)'
where name = 'Sri Lanka Junior Open 2026';
