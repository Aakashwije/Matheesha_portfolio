"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const videoFiles = [
  "WhatsApp Video 2026-02-11 at 10.52.27 PM.mp4",
  "new1.mp4",
  "new2.mp4",
  "new3.mp4",
  "new4.mp4",
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Match Videos"
          title="Highlights & Training Sessions"
          subtitle="Quick clips that capture match intensity, training rhythm, and tournament momentum."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {videoFiles.map((file) => (
            <motion.button
              key={file}
              type="button"
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/30"
              onClick={() => setActiveVideo(file)}
            >
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 opacity-0 transition group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-black/35 backdrop-blur-sm transition group-hover:opacity-0" />
              <video
                className="h-full w-full scale-105 blur-sm transition duration-500 group-hover:blur-0 group-hover:scale-100"
                src={`/assets/vedios/${encodeURIComponent(file)}`}
                preload="metadata"
              >
                <track
                  kind="captions"
                  src="/assets/vedios/captions.vtt"
                  srcLang="en"
                  label="English"
                  default
                />
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border border-white/40 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white opacity-0 transition group-hover:opacity-100">
                  Play
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {activeVideo ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0e17] shadow-2xl shadow-black/60"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
                <video
                  controls
                  autoPlay
                  className="h-full w-full"
                  src={`/assets/vedios/${encodeURIComponent(activeVideo)}`}
                >
                  <track
                    kind="captions"
                    src="/assets/vedios/captions.vtt"
                    srcLang="en"
                    label="English"
                    default
                  />
                </video>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
                  Video Highlight
                </p>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:border-yellow-400 hover:text-yellow-400"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
