"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MediaCard from "@/components/MediaCard";
import { mediaArticles } from "@/lib/siteData";

export default function Media() {
  const placeholders = Array.from({ length: 6 }, (_, index) => index);

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Media"
          title="Press Coverage & Features"
          subtitle="Highlights from newspapers, sports magazines, and national coverage."
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Media Photo Tiles
          </h2>
          <p className="text-sm text-slate-300">
            Drop in press photos, magazine scans, and interview snapshots here.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((index) => (
            <div
              key={`media-placeholder-${index}`}
              className="hover-card reveal-soft flex aspect-4/3 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400"
            >
              Add Image
            </div>
          ))}
        </div>
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
