"use client";

import { motion } from "framer-motion";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const profile = [
  { label: "Date of Birth", value: "18 February 2008" },
  { label: "Height", value: "5′ 5″" },
  { label: "Weight", value: "58 kg" },
  { label: "Dominant Hand", value: "Right" },
];

const team = [
  {
    role: "Personal Coach",
    name: "Shamil Wakeel",
    phone: "+94 76 473 0162",
  },
  {
    role: "College Coach",
    name: "Rahim Deen",
    phone: "+94 71 439 3351",
  },
  {
    role: "Physical Fitness Trainer",
    name: "Thushara Kumara",
    phone: "+94 77 839 1491",
  },
];

const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

export default function Bio() {
  return (
    <section className="bg-[#05060b] py-16">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Profile"
          title="About Matheesha"
          subtitle="Key stats and the team behind the athlete."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
              Athlete
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Personal Details
            </h3>
            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {profile.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-black/30 p-4"
                >
                  <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-white">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
              Support Team
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Coaches & Trainers
            </h3>
            <ul className="mt-6 space-y-3">
              {team.map((member) => (
                <li
                  key={member.role}
                  className="rounded-xl border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {member.role}
                  </p>
                  <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-lg font-semibold text-white">
                      {member.name}
                    </p>
                    <a
                      href={telHref(member.phone)}
                      className="text-sm font-medium text-yellow-400 transition hover:text-yellow-300"
                    >
                      {member.phone}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
