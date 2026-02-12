"use client";

import { useEffect, useState } from "react";

export default function GoToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(globalThis.scrollY > 400);
    };

    onScroll();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Go to top"
  className={`fixed bottom-6 right-6 z-100 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <span className="text-lg">↑</span>
    </button>
  );
}
