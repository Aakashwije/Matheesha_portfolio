"use client";

import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeading from "@/components/SectionHeading";
import { sponsorBenefits } from "@/lib/siteData";
import { motion } from "framer-motion";

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
          <div className="grid gap-6 md:grid-cols-2">
            {sponsorBenefits.map((benefit, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
