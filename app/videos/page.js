"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { videoSections } from "@/lib/siteData";

export default function Videos() {
  return (
    <div className="bg-[#05060b]">
      {videoSections.map((section, sectionIndex) => (
        <section
          key={section.title}
          className={sectionIndex % 2 === 0 ? "py-16" : "bg-[#0b0e17] py-16"}
        >
          <Container className="space-y-10">
            <SectionHeading
              eyebrow="Videos"
              title={section.title}
              subtitle={section.description}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.videos.map((video, index) => (
                <motion.div
                  key={video.youtubeId}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/30"
                >
                  <div className="relative aspect-video">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white">
                      {video.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      ))}
    </div>
  );
}
