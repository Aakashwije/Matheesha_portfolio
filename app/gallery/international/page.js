import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export default function InternationalGallery() {
  const foreignImages = [
    "WhatsApp Image 2026-02-07 at 7.33.13 PM.jpeg",
    "WhatsApp Image 2026-02-07 at 7.33.14 PM (1).jpeg",
    "WhatsApp Image 2026-02-07 at 7.33.14 PM.jpeg",
    "WhatsApp Image 2026-02-07 at 7.33.15 PM (1).jpeg",
    "WhatsApp Image 2026-02-07 at 7.33.15 PM.jpeg",
    "WhatsApp Image 2026-02-07 at 7.33.16 PM.jpeg",
    "WhatsApp Image 2026-02-07 at 7.34.15 PM (1).jpeg",
    "WhatsApp Image 2026-02-07 at 7.34.15 PM.jpeg",
    "WhatsApp Image 2026-02-07 at 7.34.16 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.25 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.26 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.26 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.27 PM (1) - Copy - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.27 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.27 PM - Copy - Copy - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.27 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.28 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.28 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.28 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.29 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.29 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.29 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.30 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.30 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.31 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.31 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.31 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.33 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.33 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.34 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.34 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.35 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.35 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.36 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.36 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.37 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.37 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.38 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.38 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.38 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.39 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.39 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.21 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.32.42 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.36.07 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.36.08 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.36.08 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.36.35 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.46 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.46 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.45.27 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.55.37 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.55.37 PM.jpeg",
  ];

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Gallery"
          title="International Highlights"
          subtitle="Snapshots from overseas tournaments and global tour events."
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            International Gallery Board
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {foreignImages.map((name) => {
            const src = `/assets/gallery/Foreign/${encodeURIComponent(name)}`;
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
