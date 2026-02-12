"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return undefined;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    const timer = globalThis.setTimeout(() => setVisible(false), 8000);
    return () => globalThis.clearTimeout(timer);
  }, [mounted]);

  if (!mounted || !visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#05060b] text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-full border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40">
          <Image
            src="/matheesha_logo.png?v=4"
            alt="Matheesha Wijesekara"
            width={260}
            height={260}
            className="animate-logo-pulse h-60 w-60 object-contain"
            priority
          />
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-yellow-400">
          <span>Loading</span>
          <span className="flex items-center gap-1">
            <span className="animate-dot h-2 w-2 rounded-full bg-yellow-400" />
            <span className="animate-dot animate-dot-delay-1 h-2 w-2 rounded-full bg-yellow-400" />
            <span className="animate-dot animate-dot-delay-2 h-2 w-2 rounded-full bg-yellow-400" />
          </span>
        </div>
        <p className="text-center text-sm text-slate-300">
          Proud alumnus of Royal College, Colombo 7
        </p>
      </div>
    </div>
  );
}
