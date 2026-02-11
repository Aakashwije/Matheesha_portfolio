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
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
              >
                <h3 className="text-lg font-semibold text-white">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-yellow-400" />
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
