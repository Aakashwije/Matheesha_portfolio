import Container from "@/components/Container";
import ImpactReachChart from "@/components/ImpactReachChart";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeading from "@/components/SectionHeading";
import { getEditableContent } from "@/lib/content";
import { formatCompact, formatDay, formatNumber } from "@/lib/format";
import { localizedHref, resolveLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { listRecords } from "@/lib/records";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

type Exposure = {
  id: string;
  event_name: string;
  event_date: string;
  sponsor: string;
  location: string;
  audience_reach: number | null;
  social_impressions: number | null;
  media_mentions: number | null;
  logo_minutes: number | null;
  notes: string;
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = resolveLocale((await params).lang);
  const dict = getDictionary(lang);
  return pageMetadata({ lang, path: "/sponsors/impact", title: dict.impact.title, description: dict.impact.subtitle });
}

function sum(rows: Exposure[], key: keyof Exposure) {
  return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0);
}

export default async function SponsorImpact({ params }: { params: Promise<{ lang: string }> }) {
  const lang = resolveLocale((await params).lang);
  const dict = getDictionary(lang);
  const t = dict.impact;
  const [rows, content] = await Promise.all([
    listRecords("sponsor_exposure") as Promise<Exposure[]>,
    getEditableContent(lang),
  ]);

  const tiles = [
    { label: t.totalReach, value: sum(rows, "audience_reach") },
    { label: t.impressions, value: sum(rows, "social_impressions") },
    { label: t.mentions, value: sum(rows, "media_mentions") },
    { label: t.logoMinutes, value: sum(rows, "logo_minutes") },
  ].filter((tile) => tile.value > 0);

  return (
    <div className="bg-[#05060b]">
      <section className="py-16">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            subtitle={t.subtitle}
            action={
              <PrimaryButton href={`${localizedHref(lang, "/contact")}#enquire`}>
                {dict.sponsors.getInTouch}
              </PrimaryButton>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((tile) => (
              <div key={tile.label} className="rounded-2xl border border-white/10 bg-[#0b0e17] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{tile.label}</p>
                <p className="mt-2 text-4xl font-semibold text-white" title={formatNumber(tile.value, lang)}>
                  {formatCompact(tile.value)}
                </p>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-[#0b0e17] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t.events}</p>
              <p className="mt-2 text-4xl font-semibold text-white">{rows.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0b0e17] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t.pressFeatures}</p>
              <p className="mt-2 text-4xl font-semibold text-white">{content.mediaArticles.length}</p>
            </div>
          </div>

          {rows.length ? (
            <>
              {rows.some((row) => row.audience_reach) ? (
                <div className="rounded-2xl border border-white/10 bg-[#0b0e17] p-5 md:p-6">
                  <p className="mb-4 text-sm font-semibold text-white">{t.reachByEvent}</p>
                  <ImpactReachChart
                    lang={lang}
                    rows={rows
                      .filter((row) => row.audience_reach)
                      .map((row) => ({ id: row.id, label: row.event_name, value: row.audience_reach ?? 0 }))}
                  />
                </div>
              ) : null}

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-white">{t.perEvent}</h2>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full min-w-[640px] text-left text-sm text-slate-300">
                    <thead className="bg-white/5 text-xs uppercase tracking-[0.15em] text-slate-400">
                      <tr>
                        <th className="px-4 py-3 font-medium">{t.event}</th>
                        <th className="px-4 py-3 text-right font-medium">{t.totalReach}</th>
                        <th className="px-4 py-3 text-right font-medium">{t.impressions}</th>
                        <th className="px-4 py-3 text-right font-medium">{t.mentions}</th>
                        <th className="px-4 py-3 text-right font-medium">{t.logoMinutes}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.id} className="border-t border-white/5 align-top">
                          <td className="px-4 py-3">
                            <p className="font-semibold text-white">{row.event_name}</p>
                            <p className="text-xs text-slate-500">
                              {formatDay(row.event_date, lang)}
                              {row.location ? ` · ${row.location}` : ""}
                              {row.sponsor ? ` · ${row.sponsor}` : ""}
                            </p>
                            {row.notes ? <p className="mt-1 text-xs text-slate-400">{row.notes}</p> : null}
                          </td>
                          {(["audience_reach", "social_impressions", "media_mentions", "logo_minutes"] as const).map((key) => (
                            <td key={key} className="px-4 py-3 text-right tabular-nums">
                              {row[key] ? formatNumber(row[key] as number, lang) : "—"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500">{t.source}</p>
              </div>
            </>
          ) : (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">{t.empty}</p>
          )}
        </Container>
      </section>
    </div>
  );
}
