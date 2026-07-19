import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import { getEditableContent } from "@/lib/content";

export const revalidate = 300;

const wurthAppointment = {
  year: "2026",
  title: "Executive Brand Ambassador for Würth Lanka",
  description:
    "Appointed Executive Brand Ambassador for Würth Lanka, marking a new chapter founded on performance, discipline, and excellence.",
};

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

export default async function Achievements() {
  const {
    academicProfile,
    achievementCards,
    achievementSections,
    achievementsTimeline,
    olResults,
    sectionCopy,
  } = await getEditableContent();
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
            eyebrow="Highlights"
            title="Key Awards & Rankings"
            subtitle="Signature accolades earned across local and international stages."
          />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
              Profile PDF
            </p>
            <p className="mt-2 text-base text-white">
              Download Matheesha’s profile for a brief summary of key
              achievements.
            </p>
            <a
              href="/assets/media/Profile%20of%20Matheesha%20Wijesekara%20(2).pdf"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              Download Profile PDF
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
            eyebrow="Achievements"
            title="Tournament Track Record"
            subtitle="Major results across Asian junior events and national championships."
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
            eyebrow="Academics"
            title="Balancing Court & Classroom"
            subtitle="Elite performance on the squash court — and in the examination hall."
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
              G.C.E. (A/L) — In Progress
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
              &ldquo;Competing internationally while maintaining strong academic
              results at Royal College demonstrates the same discipline that
              drives Matheesha on the squash court &mdash; focus, consistency,
              and an unwillingness to settle for less.&rdquo;
            </p>
          </MotionBlockquote>
        </Container>
      </section>
    </div>
  );
}
