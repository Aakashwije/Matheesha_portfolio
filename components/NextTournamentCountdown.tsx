"use client";

import { CalendarDays, MapPin, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { formatDay } from "@/lib/format";
import type { Tournament } from "./RankingTracker";

// Tournament dates are Sri Lanka local days (UTC+05:30).
const SL_OFFSET = "+05:30";

function remaining(target: number, now: number) {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function NextTournamentCountdown({
  tournament,
  lang,
  dict,
}: {
  tournament: Tournament | null;
  lang: Locale;
  dict: Dictionary["tracker"];
}) {
  // null until mounted, so server and client render the same markup.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);

  if (!tournament) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0b0e17] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">{dict.nextTournament}</p>
        <p className="mt-3 text-sm text-slate-400">{dict.noUpcoming}</p>
      </div>
    );
  }

  const start = Date.parse(`${tournament.start_date}T00:00:00${SL_OFFSET}`);
  const end = Date.parse(`${tournament.end_date || tournament.start_date}T23:59:59${SL_OFFSET}`);
  const underway = now !== null && now >= start && now <= end;
  const parts = now === null ? null : remaining(start, now);

  return (
    <div className="rounded-2xl border border-yellow-400/40 bg-yellow-400/5 p-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
        <Timer size={14} aria-hidden="true" />
        {dict.nextTournament}
      </p>
      <p className="mt-3 text-lg font-semibold text-white">{tournament.name}</p>
      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1">
          <CalendarDays size={12} aria-hidden="true" />
          {formatDay(tournament.start_date, lang)}
          {tournament.end_date && tournament.end_date !== tournament.start_date
            ? ` – ${formatDay(tournament.end_date, lang)}`
            : ""}
        </span>
        {tournament.location ? (
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} aria-hidden="true" />
            {tournament.location}
          </span>
        ) : null}
      </p>

      {underway ? (
        <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black">
          <span className="h-2 w-2 animate-pulse rounded-full bg-black" aria-hidden="true" />
          {dict.underway}
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-4 gap-2 text-center" aria-live="off">
          {(
            [
              ["days", dict.days],
              ["hours", dict.hours],
              ["minutes", dict.minutes],
              ["seconds", dict.seconds],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="rounded-xl border border-white/10 bg-black/30 px-2 py-3">
              <p className="text-2xl font-semibold tabular-nums text-white">
                {parts ? String(parts[key]).padStart(2, "0") : "--"}
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
