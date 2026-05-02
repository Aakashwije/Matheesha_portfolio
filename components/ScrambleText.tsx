"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@!0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export default function ScrambleText({
  text,
  className,
}: Readonly<ScrambleTextProps>) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;
    const duration = 700;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const revealedCount = Math.floor(progress * text.length);
      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(scrambled);
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(text);
    };
    requestAnimationFrame(tick);
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
