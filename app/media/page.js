"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MediaCard from "@/components/MediaCard";
import { mediaArticles } from "@/lib/siteData";

export default function Media() {
  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Media"
          title="Press Coverage & Features"
          subtitle="Highlights from newspapers, sports magazines, and national coverage."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {mediaArticles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <MediaCard {...article} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
