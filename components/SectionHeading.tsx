import type { ReactNode } from "react";

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
  <div className="animate-fade-up flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-base text-slate-300">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
