import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export default function SchoolGallery() {
  const placeholders = Array.from({ length: 6 }, (_, index) => index);

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Gallery"
          title="School Highlights"
          subtitle="Snapshots from school tournaments, training, and team moments."
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            School Gallery Board
          </h2>
          <p className="text-sm text-slate-300">
            Add school match photos and achievements as they come in.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((index) => (
            <div
              key={`school-placeholder-${index}`}
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
