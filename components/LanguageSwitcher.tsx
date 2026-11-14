"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, localizedHref, locales, type Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher({
  lang,
  label,
  variant = "pill",
}: {
  lang: Locale;
  label: string;
  variant?: "pill" | "inline";
}) {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label={label}
      className={
        variant === "pill"
          ? "flex items-center rounded-full border border-white/15 p-0.5 text-[11px] font-semibold"
          : "flex items-center gap-2 pt-2 text-xs font-semibold"
      }
    >
      {locales.map((locale) => {
        const active = locale === lang;
        return (
          <Link
            key={locale}
            href={localizedHref(locale, pathname)}
            hrefLang={localeNames[locale].htmlLang}
            lang={localeNames[locale].htmlLang}
            aria-current={active ? "true" : undefined}
            title={localeNames[locale].native}
            className={`rounded-full px-2.5 py-1 normal-case transition ${
              active
                ? "bg-white/15 text-white"
                : "text-slate-400 hover:text-yellow-400"
            }`}
          >
            {variant === "pill" ? localeNames[locale].short : localeNames[locale].native}
          </Link>
        );
      })}
    </nav>
  );
}
