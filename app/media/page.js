import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MediaCard from "@/components/MediaCard";
import { getEditableContent, getPublicAssets } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Media() {
  const content = await getEditableContent();
  const copy = content.sectionCopy.homeMedia;
  const mediaAssets = await getPublicAssets("media");
  const mediaImages = mediaAssets.filter(
    (asset) => !asset.name.toLowerCase().endsWith(".pdf"),
  );
  const mediaDocuments = mediaAssets.filter((asset) =>
    asset.name.toLowerCase().endsWith(".pdf"),
  );

  return (
    <section data-tour="media" className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title="Press Coverage & Features"
          subtitle="Highlights from newspapers, sports magazines, and national coverage."
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Media Photo Tiles
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mediaImages.map((image) => (
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
          ))}
        </div>
        {mediaDocuments.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {mediaDocuments.map((document) => (
              <a
                key={document.src}
                href={document.src}
                target="_blank"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm font-semibold text-white transition hover:border-yellow-400/50 hover:text-yellow-400"
              >
                {document.name}
              </a>
            ))}
          </div>
        ) : null}
        <div className="grid gap-6 md:grid-cols-2">
          {content.mediaArticles.map((article) => (
            <MediaCard key={article.title} {...article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
