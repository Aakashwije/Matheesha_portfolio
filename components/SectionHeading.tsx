"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import ScrambleText from "./ScrambleText";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: Readonly<SectionHeadingProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
    >
      <div>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          <ScrambleText text={title} />
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-base text-slate-300">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </motion.div>
  );
}
