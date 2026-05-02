"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springY = useSpring(y, { stiffness: 500, damping: 30 });
  const dotX = useSpring(x, { stiffness: 200, damping: 20 });
  const dotY = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      {/* Small sharp cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-9999 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400"
        style={{ left: springX, top: springY }}
      />
      {/* Larger trailing ring */}
      <motion.div
        className="pointer-events-none fixed z-9998 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/50"
        style={{ left: dotX, top: dotY }}
      />
    </>
  );
}
