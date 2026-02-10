import Container from "./Container";
import SectionHeading from "./SectionHeading";
import VideoCard from "./VideoCard";
import { homeVideos } from "@/lib/siteData";

export default function VideoShowcase() {
  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Match Videos"
          title="Highlights & Training"
          subtitle="A glimpse into tournament intensity and daily preparation."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {homeVideos.map((video) => (
            <VideoCard key={video.youtubeId} {...video} />
          ))}
        </div>
      </Container>
    </section>
  );
}
