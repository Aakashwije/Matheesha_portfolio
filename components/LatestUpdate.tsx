import { CalendarDays, Dumbbell, MapPin, Plane, Trophy, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Container from "./Container";

type LatestUpdateCard = {
  image?: string;
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
  plane: Plane,
  trophy: Trophy,
};

function resolveImageSrc(image: string) {
  if (image.startsWith("http") || image.startsWith("/")) {
    return image;
  }

  return `/assets/podium/Local/${encodeURIComponent(image)}`;
}

function CardBadge({ Icon, badge }: { Icon: LucideIcon; badge: string }) {
  return (
    <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/40 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-yellow-400 backdrop-blur-sm">
      <Icon size={12} />
      {badge}
    </span>
  );
}

// Stands in for a photo: "Headline | Subtitle" titles split across two lines.
function HighlightPanel({ Icon, badge, title }: { Icon: LucideIcon; badge: string; title: string }) {
  const [headline, ...rest] = title.split("|").map((part) => part.trim());
  const subtitle = rest.join(" · ");

  return (
    <div
      role="img"
      aria-label={title}
      className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.28),transparent_55%),linear-gradient(135deg,#1a1505_0%,#0b0e17_55%,#05060b_100%)]"
    >
      <Icon
        size={260}
        strokeWidth={1}
        className="absolute -bottom-12 -right-10 text-yellow-400/10 transition duration-500 group-hover:scale-105"
        aria-hidden="true"
      />
      <CardBadge Icon={Icon} badge={badge} />
      <div className="relative px-8 text-center">
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-yellow-400/50 bg-yellow-400/10 shadow-[0_0_40px_rgba(250,204,21,0.25)]">
          <Icon size={28} className="text-yellow-400" aria-hidden="true" />
        </span>
        <p className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">{headline}</p>
        {subtitle ? (
          <>
            <div className="mx-auto my-4 h-px w-16 bg-yellow-400/60" />
            <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.25em] text-yellow-400 sm:text-sm">
              {subtitle}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
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
              {card.image ? (
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={resolveImageSrc(card.image)}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <CardBadge Icon={Icon} badge={card.badge} />
                </div>
              ) : (
                <HighlightPanel Icon={Icon} badge={card.badge} title={card.title} />
              )}
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
    <section className="bg-[#05060b] py-16">
      <Container>{inner}</Container>
    </section>
  );
}
