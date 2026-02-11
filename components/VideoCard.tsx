"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface VideoCardProps {
  title: string;
  subtitle?: string;
  youtubeId: string;
}

export default function VideoCard({
  title,
  subtitle,
  youtubeId,
}: Readonly<VideoCardProps>) {
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${youtubeId}`}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -6 }}
      className="hover-card reveal-soft group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/30"
    >
      <div className="relative aspect-video">
        <Image
          src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg">
            ▶
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle ? (
          <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
        ) : null}
      </div>
    </motion.a>
  );
}
