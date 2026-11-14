import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import LatestUpdate from "@/components/LatestUpdate";
import Stats from "@/components/Stats";
import Podium from "@/components/Podium";
import RankingTracker from "@/components/RankingTracker";
import VideoShowcase from "@/components/VideoShowcase";
import Newspaper from "@/components/Newspaper";
import WurthPartnership from "@/components/WurthPartnership";
import { getEditableContent, getPublicAssets } from "@/lib/content";
import { resolveLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getTrackerData } from "@/lib/records";

export const revalidate = 300;

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = resolveLocale((await params).lang);
  const dict = getDictionary(lang);
  const [content, videos, tracker] = await Promise.all([
    getEditableContent(lang),
    getPublicAssets("videos"),
    getTrackerData(),
  ]);

  return (
    <div className="bg-[#05060b] text-white">
      <Hero content={content.hero} lang={lang} />
      <WurthPartnership lang={lang} dict={dict.wurth} />
      <Bio dict={dict.bio} />
      <Stats items={content.stats} copy={content.sectionCopy.homeStats} />
      <RankingTracker {...tracker} lang={lang} dict={dict.tracker} />
      <LatestUpdate content={content.latestUpdate} />
      <Podium
        items={content.podiumHighlights}
        copy={content.sectionCopy.homePodium}
      />
      <VideoShowcase
        videos={videos}
        copy={content.sectionCopy.homeVideos}
        labels={dict.videos}
      />
      <Newspaper
        items={content.mediaHighlights}
        copy={content.sectionCopy.homeMedia}
      />
    </div>
  );
}
