import Podium from "@/components/Podium";
import { getEditableContent } from "@/lib/content";

export const revalidate = 300;

export default async function PodiumPage() {
  const content = await getEditableContent();

  return (
    <Podium
      items={content.podiumHighlights}
      copy={content.sectionCopy.homePodium}
    />
  );
}
