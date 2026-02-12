"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import {
  achievementCards,
  achievementSections,
  achievementsTimeline,
} from "@/lib/siteData";

export default function Achievements() {
  return (
    <div className="bg-[#05060b]">
      <section className="py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Achievements"
            title="A Timeline of Growth"
            subtitle="Major milestones that reflect competitive excellence and leadership."
          />
          <Timeline items={achievementsTimeline} />
        </Container>
      </section>

      <section className="bg-[#0b0e17] py-16">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Highlights"
            title="Key Awards & Rankings"
            subtitle="Signature accolades earned across local and international stages."
          />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
              Profile PDF
            </p>
            <p className="mt-2 text-base text-white">
              Download Matheesha’s profile for a brief summary of key achievements.
            </p>
            <a
              href="/assets/media/Profile%20of%20Matheesha%20Wijesekara%20(2).pdf"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              Download Profile PDF
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {achievementCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
              >
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{card.detail}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Achievements"
            title="Tournament Track Record"
            subtitle="Major results across Asian junior events and national championships."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {achievementSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="group hover-card hover-glow reveal-soft rounded-2xl border border-white/10 bg-linear-to-br from-white/10 via-white/5 to-transparent p-6 shadow-lg shadow-black/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">
                    {section.title}
                  </h3>
                  <span className="h-10 w-10 rounded-full border border-yellow-400/40 bg-yellow-400/10 text-center text-xs font-semibold uppercase leading-10 tracking-[0.3em] text-yellow-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-slate-200">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.7)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
