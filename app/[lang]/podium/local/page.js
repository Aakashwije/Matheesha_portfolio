import Container from "@/components/Container";
import LatestUpdate from "@/components/LatestUpdate";
import SectionHeading from "@/components/SectionHeading";
import { getEditableContent, getPublicAssets } from "@/lib/content";
import Image from "next/image";
import { resolveLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const lang = resolveLocale((await params).lang);
  const dict = getDictionary(lang);
  return pageMetadata({ lang, path: "/podium/local", title: dict.boards.localPodiumTitle });
}

export default async function LocalPodium({ params }) {
  const lang = resolveLocale((await params).lang);
  const dict = getDictionary(lang);
  const [localImages, { latestUpdate }] = await Promise.all([
    getPublicAssets("localPodium"),
    getEditableContent(lang),
  ]);

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-16">
        <SectionHeading
          eyebrow={dict.boards.localPodiumEyebrow}
          title={dict.boards.localPodiumTitle}
          subtitle={dict.boards.localPodiumSubtitle}
        />

        <LatestUpdate content={latestUpdate} contained={false} />

        {/* ── Existing gallery ── */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            {dict.boards.localEvents}
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
