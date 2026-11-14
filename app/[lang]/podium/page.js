import Podium from "@/components/Podium";
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
    path: "/podium",
    title: dict.nav.podium,
    description: "Explore Matheesha Wijesekara’s squash achievements and local and international tournament podium finishes.",
  });
}

export default async function PodiumPage({ params }) {
  const lang = resolveLocale((await params).lang);
  const content = await getEditableContent(lang);

  return (
    <Podium
      items={content.podiumHighlights}
      copy={content.sectionCopy.homePodium}
    />
  );
}
