import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export default function LocalGallery() {
  const localImages = [
    "Junior National Boy Player of the Year - Matheesha.jpg",
    "WhatsApp Image 2026-02-11 at 11.11.12 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 11.11.12 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 11.11.51 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 11.11.51 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 11.11.51 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.21 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.22 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.37 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.37 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.20 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.20 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.21 PM (1) - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.21 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.21 PM - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.21 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.49.35 PM.jpeg",
  ];

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Gallery"
          title="Local Highlights"
          subtitle="Moments from national tournaments, training camps, and home fixtures."
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Local Gallery Board
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localImages.map((name) => {
            const src = `/assets/gallery/local/${encodeURIComponent(name)}`;
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
