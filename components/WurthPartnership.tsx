import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

const gallery = [
  {
    src: "/assets/wurth/signin2.jpg",
    alt: "Matheesha Wijesekara with Würth Lanka representatives at the 2026 sponsorship ceremony",
  },
  {
    src: "/assets/wurth/signin3.jpg",
    alt: "Matheesha Wijesekara speaking at the Würth Lanka appointment ceremony",
  },
  {
    src: "/assets/wurth/signin4.jpg",
    alt: "Matheesha Wijesekara receiving his sponsored team jersey from Würth Lanka",
  },
];

export default function WurthPartnership({
  showGallery = false,
}: {
  showGallery?: boolean;
}) {
  return (
    <section className="overflow-hidden bg-[#0b0e17] py-16">
      <Container className="space-y-8">
        <div className="overflow-hidden rounded-3xl border border-red-500/25 bg-white/[0.04] shadow-2xl shadow-black/30">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-72 lg:min-h-[460px]">
              <Image
                src="/assets/wurth/signin1.jpg"
                alt="Matheesha Wijesekara at his appointment as Executive Brand Ambassador for Würth Lanka"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-[#0b0e17]/35" />
            </div>

            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <div className="mb-8 inline-flex w-fit items-center rounded-xl bg-white px-5 py-3">
                <Image
                  src="/assets/wurth/wurth_logo.png"
                  alt="Würth"
                  width={180}
                  height={70}
                  className="h-auto w-36 object-contain md:w-44"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
                Official Appointment · 2026
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
                Executive Brand Ambassador for Würth Lanka
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Matheesha Wijesekara has been appointed Executive Brand
                Ambassador for Würth Lanka in 2026, marking a proud new chapter
                built on shared values of performance, discipline, and
                excellence.
              </p>
              {!showGallery ? (
                <Link
                  href="/sponsors"
                  className="mt-8 inline-flex w-fit items-center rounded-full border border-red-400/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-300 transition hover:bg-red-500 hover:text-white"
                >
                  View the partnership
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        {showGallery ? (
          <div className="space-y-8">
            <div className="grid gap-5 md:grid-cols-3">
              {gallery.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-3/2 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <a
                href="https://www.thepapare.com/photos-wurth-signing-ceremony-of-matheesha-wijesekara/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-red-400/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-300 transition hover:bg-red-500 hover:text-white"
              >
                View more photos on ThePapare&nbsp;↗
              </a>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
