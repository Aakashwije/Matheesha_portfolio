import "server-only";

import { getEditableContent } from "./content";
import { getTrackerData, listRecords } from "./records";

const bullet = (items) => items.map((item) => `- ${item}`).join("\n");

/**
 * Everything the "Ask Matheesha" assistant may draw on, as plain text. Built
 * from the same live data the site renders, so answers track admin edits.
 * Kept deterministic (no timestamps) so the prompt prefix caches.
 */
export async function buildAssistantKnowledge() {
  const [content, tracker, exposure] = await Promise.all([
    getEditableContent("en"),
    getTrackerData(),
    listRecords("sponsor_exposure"),
  ]);

  const sections = [
    `## Profile\n${content.hero.title} — ${content.hero.highlight}.\n${content.hero.description}\nBorn 18 February 2008. Height 5′5″, weight 58 kg, right-handed. Student at Royal College, Colombo 7. Appointed Executive Brand Ambassador for Würth Lanka in 2026.\nSupport team: Shamil Wakeel (personal coach), Rahim Deen (college coach), Thushara Kumara (physical fitness trainer).`,
    `## Current rankings\n${bullet(content.stats.map((s) => `${s.label}: ${s.value}`))}`,
    `## Ranking history (date, category, rank)\n${bullet(tracker.rankings.map((r) => `${r.recorded_on} · ${r.category} · #${r.rank}${r.source ? ` (${r.source})` : ""}`))}`,
    `## Upcoming tournaments\n${tracker.upcoming.length ? bullet(tracker.upcoming.map((t) => `${t.name} — ${t.start_date}${t.end_date ? ` to ${t.end_date}` : ""}${t.location ? `, ${t.location}` : ""}`)) : "None announced yet."}`,
    `## Recent tournament results\n${bullet(tracker.completed.map((t) => `${t.name} (${t.start_date}${t.location ? `, ${t.location}` : ""}${t.level ? `, ${t.level}` : ""}): ${t.result}`))}`,
    `## Latest update\n${content.latestUpdate.event}, ${content.latestUpdate.date}, ${content.latestUpdate.venue}:\n${bullet(content.latestUpdate.cards.map((c) => `${c.title} — ${c.description}`))}`,
    `## Signature highlights\n${bullet(content.podiumHighlights.map((p) => `${p.title}: ${p.detail}`))}`,
    `## Career timeline\n${bullet(content.achievementsTimeline.map((t) => `${t.year} — ${t.title}: ${t.description}`))}`,
    `## Awards\n${bullet(content.achievementCards.map((a) => `${a.title}: ${a.detail}`))}`,
    ...content.achievementSections.map((s) => `## ${s.title}\n${bullet(s.items)}`),
    `## Academics\n${content.academicProfile.ol.exam}, ${content.academicProfile.ol.school}: ${content.academicProfile.ol.summary}\nA/L: ${content.academicProfile.al.stream} (${content.academicProfile.al.subjects.join(", ")}) — ${content.academicProfile.al.status}.`,
    `## Media coverage\n${bullet([...content.mediaHighlights, ...content.mediaArticles].map((m) => `${m.outlet}, ${m.date}: "${m.title}" — ${m.summary}`))}`,
    `## Sponsorship benefits\n${bullet(content.sponsorBenefits)}`,
    `## Sponsorship packages\n${bullet(content.sponsorPackages.map((p) => `${p.name} (${p.price}): ${p.perks.join("; ")}`))}`,
    `## Sponsor exposure reported\n${exposure.length ? bullet(exposure.map((e) => `${e.event_name} (${e.event_date}, ${e.sponsor}): reach ${e.audience_reach ?? "n/a"}, social impressions ${e.social_impressions ?? "n/a"}, media mentions ${e.media_mentions ?? "n/a"}, logo minutes ${e.logo_minutes ?? "n/a"}`)) : "No per-event figures published yet."}`,
    `## Contact\n${bullet(content.contactCards.map((c) => `${c.label}: ${c.name} — ${c.detail}`))}\nSponsorship enquiry form: /contact#enquire. Downloadable media kit: /api/media-kit.`,
  ];

  return sections.join("\n\n");
}
