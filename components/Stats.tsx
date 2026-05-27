"use client";

import { motion } from "framer-motion";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import StatCard from "./StatCard";
import { stats } from "@/lib/siteData";

type Stat = {
  label: string;
  value: string;
};

type SectionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

const fallbackCopy = {
  eyebrow: "Rankings",
  title: "Elite National & Asian Positions",
  subtitle: "Consistent podium finishes across junior and senior circuits.",
};

export default function Stats({
  items = stats,
  copy = fallbackCopy,
}: {
  items?: Stat[];
  copy?: SectionCopy;
}) {
  return (
    <section data-tour="stats" className="bg-[#0b0e17] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
