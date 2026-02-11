import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export default function LocalPodium() {
  const placeholders = Array.from({ length: 6 }, (_, index) => index);

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Podium"
          title="Local Podium Events"
          subtitle="Championship finishes and podium moments from home tournaments."
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Local Event Board
          </h2>
          <p className="text-sm text-slate-300">
            Add podium photos, medals, and event snapshots as they happen.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((index) => (
            <div
              key={`local-podium-${index}`}
              className="flex aspect-4/3 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400"
            >
              Add Image
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
