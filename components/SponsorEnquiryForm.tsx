"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-yellow-400/70";

export default function SponsorEnquiryForm({
  lang,
  dict,
  packages,
}: {
  lang: Locale;
  dict: Dictionary["enquiry"];
  packages: string[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.email || !data.message) {
      setError(dict.required);
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language: lang }),
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(dict.error);
    }
  }

  return (
    <section
      id="enquire"
      className="scroll-mt-28 rounded-3xl border border-yellow-400/30 bg-white/[0.03] p-6 md:p-10"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
        {dict.eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-white">{dict.title}</h2>
      <p className="mt-2 max-w-2xl text-slate-300">{dict.subtitle}</p>

      {status === "sent" ? (
        <div
          role="status"
          className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-sm text-emerald-100"
        >
          <CheckCircle2 size={20} className="shrink-0 text-emerald-300" aria-hidden="true" />
          {dict.success}
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2" noValidate>
          <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            {dict.name} *
            <input name="name" required autoComplete="name" className={inputClass} />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            {dict.company}
            <input name="company" autoComplete="organization" className={inputClass} />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            {dict.email} *
            <input name="email" type="email" required autoComplete="email" className={inputClass} />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            {dict.phone}
            <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            {dict.package}
            <select name="package" defaultValue={packages[0] ?? ""} className={inputClass}>
              {packages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              <option value="Custom">{dict.custom}</option>
            </select>
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            {dict.budget}
            <select name="budget" defaultValue={dict.budgetOptions.at(-1)} className={inputClass}>
              {dict.budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-slate-400 md:col-span-2">
            {dict.message} *
            <textarea name="message" required rows={5} maxLength={5000} className={inputClass} />
          </label>
          {/* Honeypot: hidden from people, filled by bots. */}
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-yellow-300 disabled:opacity-60"
            >
              {status === "sending" ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <Send size={16} aria-hidden="true" />
              )}
              {status === "sending" ? dict.sending : dict.submit}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
