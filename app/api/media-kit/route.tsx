import path from "node:path";
import { Document, Font, Image, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { getEditableContent } from "@/lib/content";
import { siteUrl } from "@/lib/i18n/config";
import { getTrackerData, listRecords } from "@/lib/records";
import type { RankingPoint, Tournament } from "@/components/RankingTracker";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Wrap on whole words; the default hyphenator splits names like "Champi-onship".
Font.registerHyphenationCallback((word) => [word]);

const YELLOW = "#d4a50a";
const INK = "#0b0e17";
const MUTED = "#5b6170";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, color: INK, fontFamily: "Helvetica", lineHeight: 1.45 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 36, height: 36 },
  eyebrow: { fontSize: 8, letterSpacing: 2, color: YELLOW, textTransform: "uppercase", fontFamily: "Helvetica-Bold" },
  name: { fontSize: 30, fontFamily: "Helvetica-Bold", lineHeight: 1.1 },
  subtitle: { fontSize: 12, color: MUTED, marginTop: 4 },
  heroRow: { flexDirection: "row", gap: 24, marginBottom: 20 },
  heroText: { flex: 1 },
  photo: { width: 170, height: 170, objectFit: "contain", borderRadius: 8 },
  section: { marginTop: 18 },
  h2: { fontSize: 14, fontFamily: "Helvetica-Bold", marginBottom: 8, paddingBottom: 4, borderBottom: `1pt solid ${YELLOW}` },
  statRow: { flexDirection: "row", gap: 10 },
  stat: { flex: 1, border: "1pt solid #e5e7eb", borderRadius: 6, padding: 10 },
  // Fixed-height box: react-pdf mis-measures large text in a flex column.
  statValueBox: { height: 30, justifyContent: "center" },
  statValue: { fontSize: 22, lineHeight: 1, fontFamily: "Helvetica-Bold", color: INK },
  statLabel: { fontSize: 8, color: MUTED, textTransform: "uppercase", letterSpacing: 1 },
  row: { flexDirection: "row", gap: 8, marginBottom: 5 },
  bullet: { width: 8, color: YELLOW, fontFamily: "Helvetica-Bold" },
  rowText: { flex: 1 },
  bold: { fontFamily: "Helvetica-Bold" },
  muted: { color: MUTED },
  twoCol: { flexDirection: "row", gap: 20 },
  col: { flex: 1 },
  packageCard: { border: "1pt solid #e5e7eb", borderRadius: 6, padding: 10, marginBottom: 8 },
  callout: { backgroundColor: "#fdf6dc", borderRadius: 6, padding: 12, marginTop: 10 },
  footer: { position: "absolute", bottom: 24, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: MUTED },
});

// Built-in PDF fonts only cover Latin-1; drop emoji and other glyphs they can't draw.
function clean(value: unknown) {
  return String(value ?? "")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/•|·/g, "-")
    .replace(/[^\x20-\x7E -ÿ\n]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.row} wrap={false}>
      <Text style={styles.bullet}>-</Text>
      <Text style={styles.rowText}>{children}</Text>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer} fixed>
      <Text>Matheesha Wijesekara - Media Kit</Text>
      <Text render={({ pageNumber, totalPages }) => `${siteUrl.replace(/^https?:\/\//, "")} - ${pageNumber}/${totalPages}`} />
    </View>
  );
}

type Exposure = { audience_reach: number | null; social_impressions: number | null; media_mentions: number | null };

export async function GET() {
  const [content, trackerData, exposure] = await Promise.all([
    getEditableContent("en"),
    getTrackerData(),
    listRecords("sponsor_exposure") as Promise<Exposure[]>,
  ]);
  const tracker = trackerData as { rankings: RankingPoint[]; upcoming: Tournament[]; completed: Tournament[] };

  const publicDir = path.join(process.cwd(), "public");
  const heroImage = content.hero.image.startsWith("http")
    ? content.hero.image
    : path.join(publicDir, content.hero.image.replace(/^\//, ""));

  const latestByCategory = [...tracker.rankings]
    .sort((a, b) => a.recorded_on.localeCompare(b.recorded_on))
    .reduce<Record<string, { rank: number; best: number; date: string }>>((acc, point) => {
      const previous = acc[point.category];
      acc[point.category] = {
        rank: point.rank,
        best: Math.min(point.rank, previous?.best ?? point.rank),
        date: point.recorded_on,
      };
      return acc;
    }, {});

  const totals = exposure.reduce(
    (acc, row) => ({
      reach: acc.reach + (row.audience_reach ?? 0),
      impressions: acc.impressions + (row.social_impressions ?? 0),
      mentions: acc.mentions + (row.media_mentions ?? 0),
    }),
    { reach: 0, impressions: 0, mentions: 0 },
  );

  const generated = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const doc = (
    <Document title="Matheesha Wijesekara - Media Kit" author="Matheesha Wijesekara" subject="Sponsorship media kit">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brand}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image, not an <img> */}
            <Image src={path.join(publicDir, "matheesha_logo-256.png")} style={styles.logo} />
            <Text style={styles.eyebrow}>Sponsorship Media Kit</Text>
          </View>
          <Text style={styles.muted}>Updated {generated}</Text>
        </View>

        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={styles.eyebrow}>{clean(content.hero.eyebrow)}</Text>
            <Text style={styles.name}>{clean(content.hero.title)}</Text>
            <Text style={styles.subtitle}>{clean(content.hero.highlight)}</Text>
            <Text style={{ marginTop: 10 }}>{clean(content.hero.description)}</Text>
            <View style={styles.callout}>
              <Text style={styles.bold}>Executive Brand Ambassador - Würth Lanka (2026)</Text>
            </View>
          </View>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image, not an <img> */}
          <Image src={heroImage} style={styles.photo} />
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Current Rankings</Text>
          <View style={styles.statRow}>
            {content.stats.map((stat: { label: string; value: string }) => (
              <View key={stat.label} style={styles.stat}>
                <View style={styles.statValueBox}>
                  <Text style={styles.statValue}>{clean(stat.value)}</Text>
                </View>
                <Text style={styles.statLabel}>{clean(stat.label)}</Text>
              </View>
            ))}
          </View>
        </View>

        {Object.keys(latestByCategory).length ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Ranking History</Text>
            {Object.entries(latestByCategory).map(([category, value]) => (
              <Bullet key={category}>
                <Text style={styles.bold}>{clean(category)}: </Text>#{value.rank}
                {value.best < value.rank ? ` (career best #${value.best})` : ""}
                <Text style={styles.muted}> - as of {value.date.slice(0, 7)}</Text>
              </Bullet>
            ))}
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.h2}>Signature Highlights</Text>
          {content.podiumHighlights.map((item: { title: string; detail: string }) => (
            <Bullet key={item.title}>
              <Text style={styles.bold}>{clean(item.title)}</Text> - {clean(item.detail)}
            </Bullet>
          ))}
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.h2}>Career Timeline</Text>
            {content.achievementsTimeline.map((item: { year: string; title: string; description: string }) => (
              <Bullet key={item.title}>
                <Text style={styles.bold}>{item.year} - {clean(item.title)}. </Text>
                {clean(item.description)}
              </Bullet>
            ))}
          </View>
          <View style={styles.col}>
            <Text style={styles.h2}>Recent Results</Text>
            {tracker.completed.slice(0, 6).map((t) => (
              <Bullet key={t.id}>
                <Text style={styles.bold}>{clean(t.result)}</Text> - {clean(t.name)}
                <Text style={styles.muted}> ({t.start_date.slice(0, 7)})</Text>
              </Bullet>
            ))}
            {tracker.upcoming[0] ? (
              <View style={styles.callout}>
                <Text style={styles.eyebrow}>Next Tournament</Text>
                <Text style={styles.bold}>{clean(tracker.upcoming[0].name)}</Text>
                <Text>
                  {tracker.upcoming[0].start_date}
                  {tracker.upcoming[0].location ? ` - ${clean(tracker.upcoming[0].location)}` : ""}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {content.achievementSections.slice(0, 2).map((section: { title: string; items: string[] }) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.h2}>{clean(section.title)}</Text>
            {section.items.map((item) => (
              <Bullet key={item}>{clean(item)}</Bullet>
            ))}
          </View>
        ))}
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.h2}>Partnership Opportunities</Text>
        <Text style={{ marginBottom: 10 }}>{clean(content.sectionCopy.sponsors.subtitle)}</Text>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={[styles.bold, { marginBottom: 6 }]}>What sponsors receive</Text>
            {content.sponsorBenefits.map((benefit: string) => (
              <Bullet key={benefit}>{clean(benefit)}</Bullet>
            ))}
          </View>
          <View style={styles.col}>
            {content.sponsorPackages.map((pkg: { name: string; price: string; perks: string[] }) => (
              <View key={pkg.name} style={styles.packageCard} wrap={false}>
                <Text style={styles.bold}>{clean(pkg.name)}</Text>
                <Text style={[styles.muted, { marginBottom: 4 }]}>{clean(pkg.price)}</Text>
                {pkg.perks.map((perk) => (
                  <Bullet key={perk}>{clean(perk)}</Bullet>
                ))}
              </View>
            ))}
          </View>
        </View>

        {totals.reach || totals.impressions || totals.mentions ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Sponsor Impact to Date</Text>
            <View style={styles.statRow}>
              {[
                ["Audience reach", totals.reach],
                ["Social impressions", totals.impressions],
                ["Media mentions", totals.mentions],
              ]
                .filter(([, value]) => Number(value) > 0)
                .map(([label, value]) => (
                  <View key={String(label)} style={styles.stat}>
                    <View style={styles.statValueBox}>
                  <Text style={styles.statValue}>{Number(value).toLocaleString("en-GB")}</Text>
                </View>
                    <Text style={styles.statLabel}>{label}</Text>
                  </View>
                ))}
            </View>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.h2}>Contact</Text>
          {content.contactCards.map((card: { label: string; name: string; detail: string }) => (
            <Bullet key={`${card.label}-${card.name}`}>
              <Text style={styles.bold}>{clean(card.label)}: </Text>
              {clean(card.name)} - {clean(card.detail)}
            </Bullet>
          ))}
          <Bullet>
            <Text style={styles.bold}>Online: </Text>
            {siteUrl}
          </Bullet>
        </View>
        <Footer />
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Matheesha-Wijesekara-Media-Kit.pdf"',
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
