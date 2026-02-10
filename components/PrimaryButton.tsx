import type { ReactNode } from "react";
import Link from "next/link";

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
}

export default function PrimaryButton({
  href,
  children,
}: Readonly<PrimaryButtonProps>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-yellow-300"
    >
      {children}
    </Link>
  );
}
