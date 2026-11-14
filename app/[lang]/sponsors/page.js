import { Download, LineChart } from "lucide-react";
import Link from "next/link";
import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeading from "@/components/SectionHeading";
import WurthPartnership from "@/components/WurthPartnership";
import { getEditableContent } from "@/lib/content";
import { localizedHref, resolveLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const lang = resolveLocale((await params).lang);
  const content = await getEditableContent(lang);
  return pageMetadata({
    lang,
    path: "/sponsors",
    title: content.sectionCopy.sponsors.title,
    description: content.sectionCopy.sponsors.subtitle,
  });
}

export default async function Sponsors({ params }) {
  const lang = resolveLocale((await params).lang);
  const dict = getDictionary(lang);
  const { sectionCopy, sponsorBenefits } = await getEditableContent(lang);
  const copy = sectionCopy.sponsors;

  return (
    <div className="bg-[#05060b]">
      <WurthPartnership showGallery lang={lang} dict={dict.wurth} />
      <section className="py-16">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
            action={
              <PrimaryButton href={`${localizedHref(lang, "/contact")}#enquire`}>
                {dict.sponsors.getInTouch}
              </PrimaryButton>
            }
          />

          <div className="flex flex-col gap-4 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-300">{dict.sponsors.mediaKitNote}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/api/media-kit"
                download
                className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300"
              >
                <Download size={16} aria-hidden="true" />
                {dict.sponsors.mediaKit}
              </a>
              <Link
                href={localizedHref(lang, "/sponsors/impact")}
                className="inline-flex items-center gap-2 rounded-full border border-yellow-400/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
              >
                <LineChart size={16} aria-hidden="true" />
                {dict.sponsors.impactCta}
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {sponsorBenefits.map((benefit) => (
              <div
                key={benefit}
                className="hover-card hover-glow reveal-soft rounded-2xl border border-yellow-400/30 bg-white/5 p-6 text-sm text-slate-200 shadow-lg shadow-black/30"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.7)]" />
                  <span>{benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
