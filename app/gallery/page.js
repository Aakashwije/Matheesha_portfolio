import Container from "@/components/Container";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";

export default function Gallery() {
  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Gallery"
          title="Training & Matchday Moments"
          subtitle="A curated visual story of preparation, competition, and victories."
        />
        <GalleryGrid />
      </Container>
    </section>
  );
}
