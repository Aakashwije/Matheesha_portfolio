"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MediaCard from "@/components/MediaCard";
import { mediaArticles } from "@/lib/siteData";

export default function Media() {
  const mediaImages = [
    "Team Championship.1.jpg",
    "03.02.2026 SL Junior Open.jpeg",
    "04.02.2026 SL Junior Open.jpeg",
    "15.02.2026 SLJunior Open.jpeg",
    "Doha 4th Place.jpg",
    "Fingara Open.png",
    "Junior Nationals 2024.1.jpg",
    "Junior Nationals 2024.33.jpg",
    "Junior Nationals 2025.1.jpg",
    "Junior Nationals 2025.10.jpg",
    "Junior Nationals 2025.11.jpg",
    "Junior Nationals 2025.12.jpg",
    "Junior Nationals 2025.2.jpg",
    "Junior Nationals 2025.3.jpg",
    "Junior Nationals 2025.4.jpg",
    "Junior Nationals 2025.5.jpg",
    "Junior Nationals 2025.6.jpg",
    "Junior Nationals 2025.7.jpg",
    "Junior Nationals 2025.8.jpg",
    "Junior Nationals 2025.9.jpg",
    "Junior Nationals 2025.jpg",
    "Junior nationals 2024.jpg",
    "Squash Tourney.jpg",
    "TEam Championship.5.jpg",
    "03.02.2026 SL Junior Open.1.jpeg",
    "Team Championship.2.jpg",
    "Team Championship.3.jpg",
    "Team Championship.4.jpg",
    "Team Championship.jpg",
    "WhatsApp Image 2025-09-07 at 19.45.35_263192a4.jpg",
    "WhatsApp Image 2025-12-16 at 7.53.32 AM.jpeg",
    "WhatsApp Image 2025-12-24 at 8.33.17 PM.jpeg",
    "WhatsApp Image 2026-02-03 at 7.23.08 AM.jpeg",
    "WhatsApp Image 2026-02-03 at 7.45.37 AM.jpeg",
    "WhatsApp Image 2026-02-04 at 7.56.51 AM.jpeg",
    "World Junior Achievement.jpg",
    "World Junior Prep.jpg",
    "World Junior.jpg",
  ];

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
          
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mediaImages.map((name) => {
            const src = `/assets/media/${encodeURIComponent(name)}`;
            return (
              <div
                key={name}
                className="hover-card reveal-soft relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-4/3 bg-black/20">
                  <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}
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
