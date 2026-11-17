"use client";

import { CalendarDays, MapPin, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import Container from "./Container";
import NextTournamentCountdown from "./NextTournamentCountdown";
import SectionHeading from "./SectionHeading";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { formatDay, formatMonth } from "@/lib/format";

export type RankingPoint = {
  id: string;
  recorded_on: string;
  category: string;
  rank: number;
  source?: string;
};

export type Tournament = {
  id: string;
  name: string;
  location?: string;
  start_date: string;
  end_date?: string | null;
  category?: string;
  level?: string;
  status?: string;
  result?: string;
  link?: string;
};

const W = 320;
const H = 132;
const PAD = { top: 16, right: 40, bottom: 24, left: 28 };

function RankChart({ points, lang, dict }: { points: RankingPoint[]; lang: Locale; dict: Dictionary["tracker"] }) {
  const [hover, setHover] = useState<number | null>(null);

  const geometry = useMemo(() => {
    const times = points.map((p) => Date.parse(p.recorded_on));
    const minT = Math.min(...times);
    const maxT = Math.max(...times);
    const worst = Math.max(...points.map((p) => p.rank));
    // Rank 1 sits at the top; the axis runs to a clean number above the worst rank.
    const step = worst <= 10 ? 2 : worst <= 20 ? 5 : 10;
    const yMax = Math.max(step, Math.ceil(worst / step) * step);
    const ticks = [1, ...Array.from({ length: Math.floor(yMax / step) }, (_, i) => (i + 1) * step)].filter(
      (tick, i, all) => all.indexOf(tick) === i && tick <= yMax,
    );

    const x = (t: number) =>
      maxT === minT ? (PAD.left + W - PAD.right) / 2 : PAD.left + ((t - minT) / (maxT - minT)) * (W - PAD.left - PAD.right);
    const y = (rank: number) => PAD.top + ((rank - 1) / (yMax - 1 || 1)) * (H - PAD.top - PAD.bottom);

    const coords = points.map((p, i) => ({ x: x(times[i]), y: y(p.rank), point: p }));
    return { coords, ticks, y };
  }, [points]);

  const { coords, ticks, y } = geometry;
  const path = coords.map((c, i) => `${i ? "L" : "M"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const last = coords.at(-1)!;
  const active = hover === null ? null : coords[hover];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`${dict.history}: ${points.map((p) => `${formatMonth(p.recorded_on, lang)} #${p.rank}`).join(", ")}`}
        onMouseLeave={() => setHover(null)}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(tick)} y2={y(tick)} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            <text x={PAD.left - 8} y={y(tick)} dy="0.32em" textAnchor="end" className="fill-slate-500 text-[10px]">
              {tick}
            </text>
          </g>
        ))}
        <text x={PAD.left} y={H - 4} className="fill-slate-500 text-[10px]">
          {formatMonth(points[0].recorded_on, lang)}
        </text>
        {points.length > 1 ? (
          <text x={W - PAD.right} y={H - 4} textAnchor="end" className="fill-slate-500 text-[10px]">
            {formatMonth(points.at(-1)!.recorded_on, lang)}
          </text>
        ) : null}

        {coords.length > 1 ? (
          <path d={path} fill="none" stroke="#facc15" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        ) : null}

        {active ? (
          <line x1={active.x} x2={active.x} y1={PAD.top - 6} y2={H - PAD.bottom} stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
        ) : null}

        {coords.map((c, i) => (
          <g key={c.point.id}>
            <circle cx={c.x} cy={c.y} r={i === hover ? 6 : 4} fill="#facc15" stroke="#0b0e17" strokeWidth={2} />
            {/* Hit target larger than the mark. */}
            <circle
              cx={c.x}
              cy={c.y}
              r={14}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              tabIndex={0}
              aria-label={`${formatMonth(c.point.recorded_on, lang)}: #${c.point.rank}`}
            />
          </g>
        ))}

        {/* Direct label on the latest point only. */}
        <text x={last.x + 10} y={last.y} dy="0.32em" className="fill-white text-[12px] font-semibold">
          #{last.point.rank}
        </text>
      </svg>

      {active ? (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-white/10 bg-[#0b0d16]/95 px-3 py-2 text-xs shadow-xl"
          style={{ left: `${(active.x / W) * 100}%`, top: `${(active.y / H) * 100}%`, marginTop: -12 }}
        >
          <p className="font-semibold text-white">#{active.point.rank}</p>
          <p className="text-slate-400">{formatMonth(active.point.recorded_on, lang)}</p>
          {active.point.source ? <p className="text-slate-500">{active.point.source}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

export default function RankingTracker({
  rankings,
  upcoming,
  completed,
  lang,
  dict,
}: {
  rankings: RankingPoint[];
  upcoming: Tournament[];
  completed: Tournament[];
  lang: Locale;
  dict: Dictionary["tracker"];
}) {
  const [showTable, setShowTable] = useState(false);

  const categories = useMemo(() => {
    const groups = new Map<string, RankingPoint[]>();
    for (const point of rankings) {
      groups.set(point.category, [...(groups.get(point.category) ?? []), point]);
    }
    return [...groups.entries()].map(([category, points]) => {
      const sorted = [...points].sort((a, b) => a.recorded_on.localeCompare(b.recorded_on));
      return {
        category,
        points: sorted,
        latest: sorted.at(-1)!,
        best: Math.min(...sorted.map((p) => p.rank)),
      };
    });
  }, [rankings]);

  if (!categories.length && !upcoming.length && !completed.length) {
    return null;
  }

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} subtitle={dict.subtitle} />

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {categories.map(({ category, points, latest, best }) => (
                <div key={category} className="rounded-2xl border border-white/10 bg-[#0b0e17] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{category}</p>
                      <p className="mt-1 text-4xl font-semibold text-white">#{latest.rank}</p>
                      <p className="text-xs text-slate-500">
                        {dict.latest} · {formatMonth(latest.recorded_on, lang)}
                      </p>
                    </div>
                    {best < latest.rank ? (
                      <p className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                        {dict.best} #{best}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-4">
                    {points.length > 1 ? (
                      <RankChart points={points} lang={lang} dict={dict} />
                    ) : (
                      <p className="text-xs text-slate-500">{dict.noHistory}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {categories.length ? (
              <div>
                <button
                  type="button"
                  onClick={() => setShowTable((value) => !value)}
                  className="text-xs uppercase tracking-[0.2em] text-slate-400 underline-offset-4 transition hover:text-yellow-400 hover:underline"
                  aria-expanded={showTable}
                >
                  {showTable ? dict.hideTable : dict.viewTable}
                </button>
                {showTable ? (
                  <div className="mt-3 overflow-x-auto rounded-2xl border border-white/10">
                    <table className="w-full text-left text-sm text-slate-300">
                      <thead className="bg-white/5 text-xs uppercase tracking-[0.15em] text-slate-400">
                        <tr>
                          <th className="px-4 py-3 font-medium">{dict.date}</th>
                          <th className="px-4 py-3 font-medium">{dict.history}</th>
                          <th className="px-4 py-3 text-right font-medium">{dict.rank}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rankings.map((point) => (
                          <tr key={point.id} className="border-t border-white/5">
                            <td className="px-4 py-2">{formatMonth(point.recorded_on, lang)}</td>
                            <td className="px-4 py-2">{point.category}</td>
                            <td className="px-4 py-2 text-right font-semibold text-white">#{point.rank}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <NextTournamentCountdown tournament={upcoming[0] ?? null} lang={lang} dict={dict} />

            {upcoming.length > 1 ? (
              <div className="rounded-2xl border border-yellow-400/20 bg-[#0b0e17] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">{dict.comingUp}</p>
                <ul className="mt-4 space-y-4">
                  {upcoming.slice(1).map((t) => (
                    <li key={t.id} className="flex gap-3">
                      <CalendarDays size={16} className="mt-1 shrink-0 text-yellow-400" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                          <span>
                            {formatDay(t.start_date, lang)}
                            {t.end_date && t.end_date !== t.start_date ? ` – ${formatDay(t.end_date, lang)}` : ""}
                          </span>
                          {t.location ? (
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={12} aria-hidden="true" />
                              {t.location}
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {completed.length ? (
              <div className="rounded-2xl border border-white/10 bg-[#0b0e17] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">{dict.recentResults}</p>
                <ul className="mt-4 space-y-4">
                  {completed.slice(0, 4).map((t) => (
                    <li key={t.id} className="flex gap-3">
                      <Trophy size={16} className="mt-1 shrink-0 text-yellow-400" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-white">{t.result}</p>
                        <p className="text-sm text-slate-300">{t.name}</p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays size={12} aria-hidden="true" />
                            {formatDay(t.start_date, lang)}
                          </span>
                          {t.location ? (
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={12} aria-hidden="true" />
                              {t.location}
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
