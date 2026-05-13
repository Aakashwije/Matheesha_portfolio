import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeading from "@/components/SectionHeading";
import { getEditableContent } from "@/lib/content";

export const dynamic = "force-dynamic";

function MotionDiv({ initial, whileInView, viewport, transition, ...props }) {
  void initial;
  void whileInView;
  void viewport;
  void transition;
  return <div {...props} />;
}

export default function Sponsors() {
  const { sectionCopy, sponsorBenefits } = getEditableContent();
  const copy = sectionCopy.sponsors;

  return (
    <div className="bg-[#05060b]">
      <section className="py-16">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
            action={<PrimaryButton href="/contact">Get in touch</PrimaryButton>}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {sponsorBenefits.map((benefit, index) => (
              <MotionDiv
                key={benefit}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                className="hover-card hover-glow reveal-soft rounded-2xl border border-yellow-400/30 bg-white/5 p-6 text-sm text-slate-200 shadow-lg shadow-black/30"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.7)]" />
                  <span>{benefit}</span>
                </div>
              </MotionDiv>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
