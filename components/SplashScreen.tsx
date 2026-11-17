"use client";

import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

// Lives for the lifetime of the loaded JS bundle: a full page load plays the
// splash, client-side navigations (including language switches) do not.
let hasPlayed = false;

const HOLD_MS = 600;
const REDUCED_HOLD_MS = 1000;
const FALLBACK_INTRO_MS = 3400;

// The intro runs on CSS keyframes (see .splash-* in globals.css) so it starts
// at first paint, before hydration; this only decides when to leave.
function introRemaining(node: HTMLElement | null) {
  if (!node || typeof node.getAnimations !== "function") return FALLBACK_INTRO_MS;
  return Math.max(
    0,
    ...node.getAnimations({ subtree: true }).map((animation) => {
      const end = Number(animation.effect?.getComputedTiming().endTime ?? 0);
      return end - Number(animation.currentTime ?? 0);
    }),
  );
}

function Splash({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isPresent = useIsPresent();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(onDone, introRemaining(ref.current) + (reduced ? REDUCED_HOLD_MS : HOLD_MS));

    window.addEventListener("keydown", onDone);
    window.addEventListener("pointerdown", onDone);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onDone);
      window.removeEventListener("pointerdown", onDone);
    };
  }, [onDone]);

  return (
    <motion.div
      ref={ref}
      className="splash-overlay"
      aria-hidden={isPresent ? undefined : true}
      style={isPresent ? undefined : { pointerEvents: "none" }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <svg className="splash-signature" viewBox="0 0 1000 340" role="img" aria-label="Matheesha">
        <text className="splash-name" x="500" y="215" textAnchor="middle">
          Matheesha
        </text>
        <path
          className="splash-swash"
          d="M 190 268 C 330 300, 560 300, 700 262 S 860 232, 845 258"
          pathLength={1}
        />
        <circle className="splash-dot" cx="872" cy="236" r="6" />
      </svg>
      <p className="splash-surname">WIJESEKARA</p>
    </motion.div>
  );
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(!hasPlayed);
  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    hasPlayed = true;
  }, []);

  return <AnimatePresence>{visible ? <Splash key="splash" onDone={dismiss} /> : null}</AnimatePresence>;
}
