"use client";

import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeading from "@/components/SectionHeading";
import SponsorPackageCard from "@/components/SponsorPackageCard";
import { sponsorBenefits, sponsorPackages } from "@/lib/siteData";

export default function Sponsors() {
  return (
    <div className="bg-[#05060b]">
      <section className="py-16">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Sponsors"
            title="Partner with an Elite Athlete"
            subtitle="Support Matheesha’s international tour calendar and showcase your brand across the squash circuit."
            action={<PrimaryButton href="/contact">Get in touch</PrimaryButton>}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {sponsorBenefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300"
              >
                <span className="text-yellow-400">●</span> {benefit}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0b0e17] py-16">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Packages"
            title="Sponsorship Packages"
            subtitle="Choose a partnership tier that aligns with your brand’s goals."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {sponsorPackages.map((pkg, index) => (
              <SponsorPackageCard
                key={pkg.name}
                {...pkg}
                highlighted={index === 0}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
