"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "./Container";
import PrimaryButton from "./PrimaryButton";

const fallbackHero = {
  eyebrow: "Sri Lanka • Squash • Elite Performance",
  title: "Matheesha Wijesekara",
  highlight: "High-Performance Squash Athlete",
  description:
    "Matheesha Wijesekara is a dynamic Sri Lankan Junior National Squash Champion who competes with passion, power, and purpose. A fearless competitor on both national and international stages, he represents his country with pride and relentless drive — inspiring others through his dedication, resilience, and winning mindset. A true role model — on and off the court.",
  primaryCtaLabel: "Become a Sponsor",
  primaryCtaHref: "/sponsors",
  secondaryCtaLabel: "View Gallery",
  secondaryCtaHref: "/gallery/local",
  image: "/matheesha_profile.png",
};

type HeroContent = typeof fallbackHero;

export default function Hero({ content = fallbackHero }: { content?: HeroContent }) {
  return (
    <section className="relative overflow-hidden bg-[#05060b]">
      <div className="aurora-bg absolute inset-0" />
      <Container className="relative flex min-h-[80vh] flex-col items-start justify-center gap-10 py-24 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.4em] text-yellow-400"
          >
            {content.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl"
          >
            {content.title}{" "}
            <span className="block text-yellow-400">{content.highlight}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-justify text-base text-slate-300 md:text-lg"
          >
            {content.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <PrimaryButton href={content.primaryCtaHref}>
              {content.primaryCtaLabel}
            </PrimaryButton>
            <a
              href={content.secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              {content.secondaryCtaLabel}
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex w-full max-w-md justify-center lg:max-w-lg lg:justify-end lg:pl-10"
        >
          <Image
            src={content.image}
            alt="Matheesha profile"
            width={440}
            height={440}
            className="animate-float-soft h-80 w-80 rounded-3xl border border-white/20 bg-black/20 object-contain p-2 shadow-2xl shadow-black/50 sm:h-96 sm:w-96"
            priority
          />
        </motion.div>
      </Container>
    </section>
  );
}
