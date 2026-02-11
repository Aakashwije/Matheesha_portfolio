import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s Build a Partnership"
          subtitle="For sponsorships, media inquiries, or training collaborations."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">
              Athlete
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              Matheesha Wijesekara
            </p>
            <p className="mt-2 text-sm text-slate-300">
              <a
                href="mailto:inokagunn@gmail.com"
                className="transition hover:text-yellow-400"
              >
                inokagunn@gmail.com
              </a>
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">
              Manager
            </p>
            <p className="mt-3 text-lg font-semibold text-white">+94 77 771 1666</p>
            <p className="mt-2 text-sm text-slate-300">
              Colombo, Sri Lanka
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
