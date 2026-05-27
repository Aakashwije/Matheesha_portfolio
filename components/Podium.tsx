"use client";

import { motion } from "framer-motion";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { podiumHighlights } from "@/lib/siteData";

type PodiumHighlight = {
  title: string;
  detail: string;
};

type SectionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

const fallbackCopy = {
  eyebrow: "Podium",
  title: "Signature Achievements",
  subtitle: "Highlights that define Matheesha’s competitive edge.",
};

export default function Podium({
  items = podiumHighlights,
  copy = fallbackCopy,
}: {
  items?: PodiumHighlight[];
  copy?: SectionCopy;
}) {
  return (
    <section data-tour="podium" className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-yellow-400/40 bg-white/5 p-6 shadow-lg shadow-black/30"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">
                {item.title}
              </p>
              <p className="mt-3 text-base text-slate-200">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
