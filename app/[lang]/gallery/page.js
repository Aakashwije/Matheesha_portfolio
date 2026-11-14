import Container from "@/components/Container";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";
import { getEditableContent } from "@/lib/content";
import { resolveLocale } from "@/lib/i18n/config";

export const revalidate = 300;

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
