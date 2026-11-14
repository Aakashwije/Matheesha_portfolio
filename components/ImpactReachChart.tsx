"use client";

import { useState } from "react";
import { formatCompact, formatNumber } from "@/lib/format";
import type { Locale } from "@/lib/i18n/config";

type Row = { id: string; label: string; value: number };

// Horizontal bars: event names stay readable, value labelled at the bar tip.
export default function ImpactReachChart({ rows, lang }: { rows: Row[]; lang: Locale }) {
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(...rows.map((row) => row.value), 1);

  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li
          key={row.id}
          className="grid grid-cols-[minmax(0,10rem)_1fr] items-center gap-3 sm:grid-cols-[minmax(0,16rem)_1fr]"
          onMouseEnter={() => setHover(row.id)}
          onMouseLeave={() => setHover(null)}
        >
          <span className="truncate text-xs text-slate-300" title={row.label}>
            {row.label}
          </span>
          <span className="relative flex items-center gap-2">
            <span
              className="block h-5 max-w-full rounded-r-[4px] bg-yellow-400 transition-opacity"
              style={{ width: `${Math.max((row.value / max) * 85, 1)}%`, opacity: hover && hover !== row.id ? 0.5 : 1 }}
              title={`${row.label}: ${formatNumber(row.value, lang)}`}
            />
            <span className="shrink-0 text-xs tabular-nums text-white">{formatCompact(row.value)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
