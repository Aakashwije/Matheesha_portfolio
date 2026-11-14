import Container from "./Container";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-white/10 bg-[#05060b] py-12">
      <Container className="animate-fade-in">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-lg font-semibold text-white">
              Matheesha Wijesekara
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {dict.tagline}
            </p>
            <div className="mt-4 h-px w-12 bg-white/20" />
          </div>

          <div className="space-y-1 text-sm text-slate-300 md:justify-self-end md:text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {dict.contact}
            </p>
            <p>{dict.location}</p>
            <a href="mailto:inokagunn@gmail.com" className="block transition hover:text-yellow-400">
              inokagunn@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Matheesha Wijesekara. {dict.rights}</p>
          <p className="text-slate-400">{dict.motto}</p>
        </div>
      </Container>
    </footer>
  );
}
