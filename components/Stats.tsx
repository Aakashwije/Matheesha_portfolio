"use client";

import { motion } from "framer-motion";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import StatCard from "./StatCard";
import { stats } from "@/lib/siteData";

export default function Stats() {
  return (
    <section className="bg-[#0b0e17] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Rankings"
          title="Elite National & Asian Positions"
          subtitle="Consistent podium finishes across junior and senior circuits."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
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
