import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getEditableContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Contact() {
  const { contactCards, sectionCopy } = await getEditableContent();
  const copy = sectionCopy.contact;

  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {contactCards.map((card) => (
            <div
              key={`${card.label}-${card.name}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">
                {card.label}
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {card.name}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                {card.href ? (
                  <a
                    href={card.href}
                    className="transition hover:text-yellow-400"
                  >
                    {card.detail}
                  </a>
                ) : (
                  card.detail
                )}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
