import Hero from "@/components/Hero";
import LatestUpdate from "@/components/LatestUpdate";
import Stats from "@/components/Stats";
import Podium from "@/components/Podium";
import VideoShowcase from "@/components/VideoShowcase";
import Newspaper from "@/components/Newspaper";
import { getEditableContent, getPublicAssets } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getEditableContent();
  const videos = await getPublicAssets("videos");

  return (
    <div className="bg-[#05060b] text-white">
      <Hero content={content.hero} />
      <Stats items={content.stats} copy={content.sectionCopy.homeStats} />
      <LatestUpdate content={content.latestUpdate} />
      <Podium
        items={content.podiumHighlights}
        copy={content.sectionCopy.homePodium}
      />
      <VideoShowcase videos={videos} copy={content.sectionCopy.homeVideos} />
      <Newspaper
        items={content.mediaHighlights}
        copy={content.sectionCopy.homeMedia}
      />
    </div>
  );
}
