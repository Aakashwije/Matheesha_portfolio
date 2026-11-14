import Container from "@/components/Container";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";
import { getEditableContent } from "@/lib/content";
import { resolveLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const lang = resolveLocale((await params).lang);
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/gallery",
    title: dict.nav.gallery,
    description: "Browse training, matchday, local, international, and school photos from Matheesha Wijesekara’s squash career.",
  });
}

export default async function Gallery({ params }) {
  const lang = resolveLocale((await params).lang);
  const { galleryImages, sectionCopy } = await getEditableContent(lang);
  const copy = sectionCopy.gallery;

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
        />
        <GalleryGrid images={galleryImages} />
      </Container>
    </section>
  );
}
