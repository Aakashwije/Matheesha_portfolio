import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import { getEditableContent } from "@/lib/content";
import { resolveLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const lang = resolveLocale((await params).lang);
  const dict = getDictionary(lang);
  return pageMetadata({ lang, path: "/achievements", title: dict.nav.achievements });
}

function MotionDiv({ initial, whileInView, viewport, transition, ...props }) {
  void initial;
  void whileInView;
  void viewport;
  void transition;
  return <div {...props} />;
}

function MotionBlockquote({
  initial,
  whileInView,
  viewport,
  transition,
  ...props
}) {
  void initial;
  void whileInView;
  void viewport;
  void transition;
  return <blockquote {...props} />;
}

export default async function Achievements({ params }) {
  const lang = resolveLocale((await params).lang);
  const dict = getDictionary(lang);
  const t = dict.achievements;
  const wurthAppointment = {
    year: "2026",
    title: dict.wurth.timelineTitle,
    description: dict.wurth.timelineBody,
  };
  const {
    academicProfile,
    achievementCards,
    achievementSections,
    achievementsTimeline,
    olResults,
    sectionCopy,
  } = await getEditableContent(lang);
  const copy = sectionCopy.achievements;

  return (
    <div className="bg-[#05060b]">
      <section className="py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
          />
          <Timeline items={[wurthAppointment, ...achievementsTimeline]} />
        </Container>
      </section>

      <section className="bg-[#0b0e17] py-16">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow={t.highlightsEyebrow}
            title={t.highlightsTitle}
            subtitle={t.highlightsSubtitle}
          />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
              {t.profilePdf}
            </p>
            <p className="mt-2 text-base text-white">
              {t.profilePdfBody}
            </p>
            <a
              href="/assets/media/Profile%20of%20Matheesha%20Wijesekara%20(2).pdf"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              {t.profilePdfCta}
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {achievementCards.map((card, index) => (
              <MotionDiv
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
              >
                <h3 className="text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{card.detail}</p>
              </MotionDiv>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow={t.recordEyebrow}
            title={t.recordTitle}
            subtitle={t.recordSubtitle}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {achievementSections.map((section, index) => (
              <MotionDiv
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="group hover-card hover-glow reveal-soft rounded-2xl border border-white/10 bg-linear-to-br from-white/10 via-white/5 to-transparent p-6 shadow-lg shadow-black/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">
                    {section.title}
                  </h3>
                  <span className="h-10 w-10 rounded-full border border-yellow-400/40 bg-yellow-400/10 text-center text-xs font-semibold uppercase leading-10 tracking-[0.3em] text-yellow-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-slate-200">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.7)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Academics ── */}
      <section className="bg-[#05060b] py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow={t.academicsEyebrow}
            title={t.academicsTitle}
            subtitle={t.academicsSubtitle}
          />

          {/* O/L Results card */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30 md:p-8"
          >
            <div className="mb-6 flex flex-col gap-1">
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
                {academicProfile.ol.exam}
              </p>
              <p className="text-sm text-slate-400">
                {academicProfile.ol.school}
              </p>
              <p className="mt-1 text-base font-semibold text-white">
                {academicProfile.ol.summary}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {olResults.map((row, index) => (
                <MotionDiv
                  key={row.subject}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                    row.grade === "A"
                      ? "border-yellow-400/40 bg-yellow-400/5"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <span className="text-sm text-slate-200">{row.subject}</span>
                  <span
                    className={`text-lg font-bold ${
                      row.grade === "A" ? "text-yellow-400" : "text-slate-300"
                    }`}
                  >
                    {row.grade}
                  </span>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>

          {/* A/L current status card */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-6 shadow-lg shadow-black/30 md:p-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
              {t.alInProgress}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {academicProfile.al.school}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              {academicProfile.al.stream}
            </h3>
            <p className="mt-1 text-sm text-yellow-400/80">
              {academicProfile.al.status}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {academicProfile.al.subjects.map((subject) => (
                <span
                  key={subject}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-slate-200"
                >
                  {subject}
                </span>
              ))}
            </div>
          </MotionDiv>

          {/* Balance quote */}
          <MotionBlockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-l-2 border-yellow-400 pl-6 text-slate-300"
          >
            <p className="text-base italic leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
          </MotionBlockquote>
        </Container>
      </section>
    </div>
  );
}
