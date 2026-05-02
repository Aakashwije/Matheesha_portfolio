"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: Readonly<StatCardProps>) {
  const match = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
  const prefix = match ? match[1] : "";
  const targetNum = match ? parseInt(match[2], 10) : null;
  const suffix = match ? match[3] : "";

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || targetNum === null) return;
    const duration = 1000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * targetNum));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, targetNum]);

  return (
    <div
      ref={ref}
      className="hover-card reveal-soft rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-black/30 backdrop-blur"
    >
      <p className="text-3xl font-semibold text-yellow-400 md:text-4xl">
        {targetNum !== null ? `${prefix}${count}${suffix}` : value}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300">
        {label}
      </p>
    </div>
  );
}
