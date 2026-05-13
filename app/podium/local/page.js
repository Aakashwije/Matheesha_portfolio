import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getPublicAssets } from "@/lib/content";
import { CalendarDays, Dumbbell, MapPin, Trophy } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

const latestUpdates = [
  {
    image: "u_19_latest.jpeg",
    title: "Under-19 Champion 🏆",
    description:
      "Under-19 Champion title secured for the 11th time, marking the 34th Championship title of his career.",
    badge: "U19 Champion",
    icon: Trophy,
  },
  {
    image: "mens_open_latest.jpeg",
    title: "Men's Open 6th Place 💪",
    description:
      "Men's Open 6th Place 💪 — a strong showing against the nation's best senior players.",
    badge: "Men's Open",
    icon: Dumbbell,
  },
];

export default function LocalPodium() {
  const localImages = getPublicAssets("localPodium");

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-16">
        <SectionHeading
          eyebrow="Podium"
          title="Local Podium Events"
          subtitle="Championship finishes and podium moments from home tournaments."
        />

        {/* ── Latest Update ── */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400">
              <CalendarDays size={14} />
              Latest Update
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Championship banner */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm text-white/60">
            <p className="mb-1 flex items-center justify-center gap-2 text-base font-semibold text-white">
              <MapPin size={15} className="text-yellow-400" />
              SLS 45th Anniversary Open Squash Championship 2026
            </p>
            <p className="flex items-center justify-center gap-1.5">
              <CalendarDays size={13} className="text-yellow-400/70" />
              3rd – 10th May 2026 &nbsp;|&nbsp; Ratmalana Air Force Squash
              Complex
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {latestUpdates.map(
              ({ image, title, description, badge, icon: Icon }) => (
                <div
                  key={image}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/30 transition hover:border-yellow-400/30 hover:shadow-yellow-400/10"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={`/assets/podium/Local/${encodeURIComponent(image)}`}
                      alt={title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/40 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-yellow-400 backdrop-blur-sm">
                      <Icon size={12} />
                      {badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-bold text-white">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">
                      {description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* ── Existing gallery ── */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Local Event Board
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localImages.map((image) => {
            return (
              <div
                key={image.src}
                className="hover-card reveal-soft relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-4/3 bg-black/20">
                  <Image
                    src={image.src}
                    alt={image.alt}
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
