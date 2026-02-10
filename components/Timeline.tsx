"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: Readonly<TimelineProps>) {
  return (
    <div className="relative space-y-8 border-l border-white/10 pl-6">
      {items.map((item, index) => (
        <motion.div
          key={`${item.year}-${item.title}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
        >
          <span className="absolute -left-10 top-6 h-4 w-4 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
            {item.year}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-slate-300">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
