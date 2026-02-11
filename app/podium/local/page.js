import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export default function LocalPodium() {
  const localImages = [
    "WhatsApp Image 2026-02-11 at 10.25.04 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.23 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.23 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.24 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.25 PM - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.25 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.40 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.41 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.41 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.41 PM (6) - Copy - Copy - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.19 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.20 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.21 PM (1) - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.26.21 PM - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.32.40 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.36.34 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.36.34 PM - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.43 PM (1) - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.43 PM - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.44 PM (1) - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.44 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.45 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.47 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.47 PM (3) - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.47 PM - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.49 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.49 PM - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.42.52 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.44.07 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.44.19 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.49.10 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.49.19 PM.jpeg",
  ];

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
        
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localImages.map((name) => {
            const src = `/assets/podium/Local/${encodeURIComponent(name)}`;
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
