import Podium from "@/components/Podium";
import { getEditableContent } from "@/lib/content";
import { resolveLocale } from "@/lib/i18n/config";

export const revalidate = 300;

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
