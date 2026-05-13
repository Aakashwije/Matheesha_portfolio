import Container from "@/components/Container";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";
import { getEditableContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function Gallery() {
  const { galleryImages, sectionCopy } = getEditableContent();
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
