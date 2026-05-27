import { CalendarDays, Dumbbell, MapPin, Trophy } from "lucide-react";
import Image from "next/image";
import Container from "./Container";

type LatestUpdateCard = {
  image: string;
  title: string;
  description: string;
  badge: string;
  icon?: string;
};

type LatestUpdateContent = {
  label: string;
  event: string;
  date: string;
  venue: string;
  cards: LatestUpdateCard[];
};

const icons = {
  dumbbell: Dumbbell,
  trophy: Trophy,
};

function resolveImageSrc(image: string) {
  if (image.startsWith("http") || image.startsWith("/")) {
    return image;
  }

  return `/assets/podium/Local/${encodeURIComponent(image)}`;
}

export default function LatestUpdate({
  content,
  contained = true,
}: {
  content: LatestUpdateContent;
  contained?: boolean;
}) {
  const inner = (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400">
          <CalendarDays size={14} />
          {content.label}
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm text-white/60">
        <p className="mb-1 flex items-center justify-center gap-2 text-base font-semibold text-white">
          <MapPin size={15} className="text-yellow-400" />
          {content.event}
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <CalendarDays size={13} className="text-yellow-400/70" />
          <span>{content.date}</span>
          <span className="text-white/30">|</span>
          <span>{content.venue}</span>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {content.cards.map((card) => {
          const Icon = icons[card.icon as keyof typeof icons] ?? Trophy;

          return (
            <div
              key={`${card.image}-${card.title}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/30 transition hover:border-yellow-400/30 hover:shadow-yellow-400/10"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={resolveImageSrc(card.image)}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/40 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-yellow-400 backdrop-blur-sm">
                  <Icon size={12} />
                  {card.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-white">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (!contained) {
    return inner;
  }

  return (
    <section data-tour="latest-update" className="bg-[#05060b] py-16">
      <Container>{inner}</Container>
    </section>
  );
}
