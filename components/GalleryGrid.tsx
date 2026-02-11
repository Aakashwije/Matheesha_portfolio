"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/lib/siteData";

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage =
    activeIndex === null ? null : galleryImages[activeIndex];

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <motion.button
            type="button"
            key={image.src}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveIndex(index)}
            className="hover-card reveal-soft group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <div className="relative aspect-4/3">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />
            <div className="absolute bottom-4 left-4 text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-400">
                View
              </p>
              <p className="text-sm font-semibold text-white">{image.alt}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="hover-glow relative max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0e17]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-16/10 w-[85vw] max-w-4xl">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-yellow-400">
                    Gallery Highlight
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {activeImage.alt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:border-yellow-400 hover:text-yellow-400"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
