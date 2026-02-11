import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export default function InternationalPodium() {
  const foreignImages = [
    "WhatsApp Image 2026-02-07 at 7.33.13 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.20 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.20 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.20 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.21 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.22 PM (1).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.31 PM (1) - Copy.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.31 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.38 PM (2).jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.39 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.24.41 PM.jpeg",
    "WhatsApp Image 2026-02-11 at 9.32.42 PM (1) - Copy.jpeg",
  
  ];

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Podium"
          title="International Podium Events"
          subtitle="Highlights from overseas tournaments and global podium finishes."
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            International Event Board
          </h2>
         
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {foreignImages.map((name) => {
            const src = `/assets/podium/Foreign/${encodeURIComponent(name)}`;
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
