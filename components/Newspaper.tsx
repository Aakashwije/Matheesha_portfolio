"use client";

import { motion } from "framer-motion";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import MediaCard from "./MediaCard";
import { mediaHighlights } from "@/lib/siteData";

export default function Newspaper() {
  return (
    <section className="bg-[#0b0e17] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Media"
          title="In the Headlines"
          subtitle="Coverage from Sri Lankan and regional press outlets."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {mediaHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MediaCard {...item} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
