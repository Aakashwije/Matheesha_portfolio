import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export default function SchoolGallery() {
  const schoolImages = [
    "WhatsApp Image 2026-02-11 at 10.21.18 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 10.41.38 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 10.42.23 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 10.43.12 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 10.44.26 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 10.44.48 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 10.45.07 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.23 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.24 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.32 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.32 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.40 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.33 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.33 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.33 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.34 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.35 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.36.09 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.36.35 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.36.35 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.36.36 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.45 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.45 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.48 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.48 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.48 PM.jpeg",
  ];

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
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schoolImages.map((name) => {
            const src = `/assets/gallery/College%20Achievements/${encodeURIComponent(
              name
            )}`;
            return (
              <div
                key={name}
                className="hover-card reveal-soft relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-4/3 bg-black/20">
                  <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
