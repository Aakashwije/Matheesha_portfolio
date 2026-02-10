import Link from "next/link";
import Container from "./Container";
import { navLinks } from "@/lib/siteData";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05060b]/80 backdrop-blur">
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="text-lg font-semibold text-white">
          Matheesha <span className="text-yellow-400">Wijesekara</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] text-slate-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-yellow-400"
            >
              {link.label}
            </Link>
          ))}
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
