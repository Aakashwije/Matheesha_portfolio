import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getEditableContent, getPublicAssets } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function SchoolGallery() {
  const schoolImages = getPublicAssets("schoolGallery");
  const { sectionCopy } = getEditableContent();
  const copy = sectionCopy.schoolGallery;

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            School Gallery Board
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schoolImages.map((image) => {
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
