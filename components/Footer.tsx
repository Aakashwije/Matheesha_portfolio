import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05060b] py-10">
  <Container className="animate-fade-in flex flex-col gap-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-white">Matheesha Wijesekara</p>
          <p>Sri Lankan Squash Athlete Portfolio</p>
        </div>
        <div className="space-y-1 text-slate-300">
          <p>Colombo, Sri Lanka</p>
          <p>matheesha.squash@gmail.com</p>
        </div>
        <p className="text-xs text-slate-500">
          © 2026 Matheesha Wijesekara. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
