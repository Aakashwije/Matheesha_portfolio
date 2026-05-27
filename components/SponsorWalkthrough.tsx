"use client";

import { ArrowRight, Pause, Play, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type TourStep = {
  path: string;
  selector: string;
  eyebrow: string;
  title: string;
  body: string;
};

type Spotlight = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const STORAGE_KEY = "matheesha-sponsor-walkthrough-seen";

const steps: TourStep[] = [
  {
    path: "/",
    selector: "[data-tour='hero']",
    eyebrow: "Start here",
    title: "A sponsorable athlete with a clear identity",
    body: "Matheesha is presented as a focused Sri Lankan squash athlete with a story sponsors can stand behind.",
  },
  {
    path: "/",
    selector: "[data-tour='stats']",
    eyebrow: "Proof",
    title: "Rankings make the opportunity measurable",
    body: "National, senior, and Asian rankings give sponsors a quick reason to trust the competitive upside.",
  },
  {
    path: "/",
    selector: "[data-tour='latest-update']",
    eyebrow: "Momentum",
    title: "Recent results show he is active and visible",
    body: "Fresh tournament updates help a sponsor see current traction, not only past promise.",
  },
  {
    path: "/achievements",
    selector: "[data-tour='achievements']",
    eyebrow: "Achievements",
    title: "The deeper record backs the sponsorship story",
    body: "The achievements page gives sponsors a complete view of milestones, academic balance, and tournament consistency.",
  },
  {
    path: "/gallery",
    selector: "[data-tour='gallery']",
    eyebrow: "Gallery",
    title: "A visual story makes the athlete memorable",
    body: "Photos help sponsors imagine campaign posts, event recaps, and brand storytelling around Matheesha.",
  },
  {
    path: "/podium",
    selector: "[data-tour='podium']",
    eyebrow: "Credibility",
    title: "Podiums turn attention into confidence",
    body: "Championships, leadership, and awards show consistency across the junior and senior journey.",
  },
  {
    path: "/",
    selector: "[data-tour='videos']",
    eyebrow: "Presence",
    title: "Video gives sponsors something shareable",
    body: "Match and training clips make the partnership feel alive across social posts and campaigns.",
  },
  {
    path: "/media",
    selector: "[data-tour='media']",
    eyebrow: "Reach",
    title: "Media coverage increases brand value",
    body: "Press visibility gives sponsors more surfaces for recognition beyond the court.",
  },
  {
    path: "/sponsors",
    selector: "[data-tour='sponsors']",
    eyebrow: "Decision point",
    title: "Now the sponsor value is clear",
    body: "This is where visibility, credibility, and partnership benefits come together for a sponsor conversation.",
  },
];

export default function SponsorWalkthrough() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);

  const activeStep = steps[activeIndex];
  const isLast = activeIndex === steps.length - 1;
  const isAdmin = pathname.startsWith("/admin");

  const updateSpotlight = useCallback(() => {
    if (!open || pathname !== activeStep.path) return;

    const target = document.querySelector(activeStep.selector);
    if (!target) {
      setSpotlight(null);
      return;
    }

    const rect = target.getBoundingClientRect();
    const padding = 12;
    setSpotlight({
      top: Math.max(8, rect.top - padding),
      left: Math.max(8, rect.left - padding),
      width: Math.min(window.innerWidth - 16, rect.width + padding * 2),
      height: Math.min(window.innerHeight - 16, rect.height + padding * 2),
    });
  }, [activeStep.path, activeStep.selector, open, pathname]);

  const goToStep = useCallback(
    (index: number) => {
      const nextIndex = Math.min(Math.max(index, 0), steps.length - 1);
      const nextStep = steps[nextIndex];
      setActiveIndex(nextIndex);

      if (pathname !== nextStep.path) {
        setSpotlight(null);
        router.push(nextStep.path);
        return;
      }

      const target = document.querySelector(nextStep.selector);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    [pathname, router],
  );

  const closeTour = useCallback(() => {
    setOpen(false);
    setPlaying(false);
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  }, []);

  useEffect(() => {
    if (isAdmin || pathname !== "/") return;

    const alreadySeen = window.sessionStorage.getItem(STORAGE_KEY);
    if (alreadySeen) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      setPlaying(true);
      goToStep(0);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [goToStep, isAdmin, pathname]);

  useEffect(() => {
    if (!open || isAdmin || pathname !== activeStep.path) return;

    const timer = window.setTimeout(() => {
      const target = document.querySelector(activeStep.selector);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      updateSpotlight();
    }, 350);

    return () => window.clearTimeout(timer);
  }, [activeStep.path, activeStep.selector, isAdmin, open, pathname, updateSpotlight]);

  useEffect(() => {
    if (!open || !playing) return;

    const timer = window.setTimeout(() => {
      if (isLast) {
        setPlaying(false);
        return;
      }

      goToStep(activeIndex + 1);
    }, 5200);

    return () => window.clearTimeout(timer);
  }, [activeIndex, goToStep, isLast, open, playing]);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(updateSpotlight, 450);
    window.addEventListener("resize", updateSpotlight);
    window.addEventListener("scroll", updateSpotlight, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", updateSpotlight);
      window.removeEventListener("scroll", updateSpotlight);
    };
  }, [open, updateSpotlight]);

  const spotlightStyle = useMemo(
    () =>
      spotlight
        ? {
            top: spotlight.top,
            left: spotlight.left,
            width: spotlight.width,
            height: spotlight.height,
          }
        : undefined,
    [spotlight],
  );

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setPlaying(true);
          goToStep(0);
        }}
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-black/75 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-yellow-300 shadow-xl shadow-black/40 backdrop-blur transition hover:border-yellow-300 hover:bg-yellow-400 hover:text-black"
      >
        <Sparkles size={16} />
        Sponsor tour
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />

          {spotlightStyle ? (
            <div
              className="absolute rounded-2xl border-2 border-yellow-300 shadow-[0_0_0_9999px_rgba(0,0,0,0.58),0_0_36px_rgba(250,204,21,0.45)] transition-all duration-500"
              style={spotlightStyle}
            />
          ) : null}

          <div className="pointer-events-auto absolute inset-x-4 bottom-5 mx-auto max-w-xl rounded-2xl border border-yellow-400/30 bg-[#080a12]/95 p-5 text-white shadow-2xl shadow-black/60 backdrop-blur md:right-6 md:left-auto md:bottom-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
                  {activeStep.eyebrow}
                </p>
                <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                  {activeStep.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeTour}
                aria-label="Close sponsor tour"
                className="rounded-full border border-white/10 p-2 text-white/70 transition hover:border-red-300/50 hover:text-red-100"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm leading-relaxed text-slate-300">
              {activeStep.body}
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                  <button
                    key={step.selector}
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      goToStep(index);
                    }}
                    aria-label={`Go to tour step ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-8 bg-yellow-400"
                        : "w-2.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPlaying((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-yellow-400 hover:text-yellow-300"
                >
                  {playing ? <Pause size={14} /> : <Play size={14} />}
                  {playing ? "Pause" : "Play"}
                </button>

                {isLast ? (
                  <Link
                    href="/contact"
                    onClick={closeTour}
                    className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-yellow-300"
                  >
                    Contact Team
                    <ArrowRight size={14} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      goToStep(activeIndex + 1);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-yellow-300"
                  >
                    Next
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
