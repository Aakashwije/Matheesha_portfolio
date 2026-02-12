import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05060b] py-12">
      <Container className="animate-fade-in">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-lg font-semibold text-white">
              Matheesha Wijesekara
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Sri Lankan Squash Athlete Portfolio
            </p>
            <div className="mt-4 h-px w-12 bg-white/20" />
          </div>

          <div className="space-y-1 text-sm text-slate-300 md:justify-self-end md:text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Contact
            </p>
            <p>Colombo, Sri Lanka</p>
            <p>inokagunn@gmil.com</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Matheesha Wijesekara. All rights reserved.</p>
          <p className="text-slate-400">Designed with focus and discipline.</p>
        </div>
      </Container>
    </footer>
  );
}
