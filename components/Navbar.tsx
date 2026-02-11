"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import { navLinks } from "@/lib/siteData";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05060b]/80 backdrop-blur">
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="text-lg font-semibold text-white">
          Matheesha <span className="text-yellow-400">Wijesekara</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] text-slate-300 md:flex">
          {navLinks.map((link) => {
            if (!link.children) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-yellow-400"
                >
                  {link.label}
                </Link>
              );
            }

            const isOpen = openDropdown === link.label;

            return (
              <div
                key={link.href}
                className="relative"
              >
                <button
                  type="button"
                  className="flex items-center gap-2 transition hover:text-yellow-400"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenDropdown(isOpen ? null : link.label)
                  }
                >
                  {link.label}
                  <span className="text-xs text-yellow-400/80" aria-hidden="true">
                    ▾
                  </span>
                </button>
                <div
                  className={`absolute left-0 top-full z-40 mt-2 w-48 rounded-2xl border border-white/10 bg-[#0b0d16]/95 p-2 text-xs uppercase tracking-[0.18em] text-slate-200 shadow-xl backdrop-blur transition ${
                    isOpen
                      ? "visible opacity-100 pointer-events-auto"
                      : "invisible opacity-0 pointer-events-none"
                  }`}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-yellow-400"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        <Link
          href="/sponsors"
          className="rounded-full border border-yellow-400/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
        >
          Sponsor
        </Link>
      </Container>
    </header>
  );
}
