"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const videoFiles = [
  "WhatsApp Video 2026-02-11 at 10.52.27 PM.mp4",
  "new1.mp4",
  "new2.mp4",
  "new3.mp4",
  "new4.mp4",
  "british1.mp4",
  "british2.mp4",
];

type VideoItem = {
  name: string;
  src: string;
  poster?: string;
};

type SectionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

const fallbackVideos = videoFiles.map((file) => ({
  name: file,
  src: `/assets/vedios/${encodeURIComponent(file)}`,
  poster: `/assets/vedios/posters/${encodeURIComponent(file.replace(/\.mp4$/, ".jpg"))}`,
}));

const fallbackCopy = {
  eyebrow: "Match Videos",
  title: "Highlights & Training Sessions",
  subtitle:
    "Quick clips that capture match intensity, training rhythm, and tournament momentum.",
};

const facebookVideos = [
  "https://www.facebook.com/share/v/1EzRx5mUeP/",
  "https://www.facebook.com/share/v/1CB6yCi65Q/",
  "https://www.facebook.com/share/v/1GGEXcN78k/",
  "https://www.facebook.com/share/v/1A4qDSosoP/",
];

export default function VideoShowcase({
  videos = fallbackVideos,
  copy = fallbackCopy,
  labels = { play: "Play", close: "Close" },
}: {
  videos?: VideoItem[];
  copy?: SectionCopy;
  labels?: { play: string; close: string };
}) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <motion.button
              key={video.src}
              type="button"
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/30"
              onClick={() => setActiveVideo(video)}
            >
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 opacity-0 transition group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-black/35 backdrop-blur-sm transition group-hover:opacity-0" />
              <video
                className="h-full w-full scale-105 blur-sm transition duration-500 group-hover:blur-0 group-hover:scale-100"
                src={video.src}
                poster={video.poster ?? "/assets/vedios/video-poster.jpg"}
                preload="none"
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
                  {labels.play}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">More match videos on Facebook</h3>
            <p className="mt-1 text-sm text-white/55">Watch the original clips on Facebook.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {facebookVideos.map((href, index) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white transition hover:border-yellow-400/50 hover:text-yellow-300"
                aria-label={`Watch Facebook video ${index + 1} in a new tab`}
              >
                <span>Facebook video {index + 1}</span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
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
                  playsInline
                  className="h-full w-full"
                  src={activeVideo.src}
                  poster={activeVideo.poster}
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
                  {activeVideo.name.replace(/\.[^.]+$/, "")}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:border-yellow-400 hover:text-yellow-400"
                >
                  {labels.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
