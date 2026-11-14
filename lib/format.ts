import type { Locale } from "./i18n/config";

const intlLocale: Record<Locale, string> = { en: "en-GB", si: "si-LK", ta: "ta-LK" };

function parseDay(date: string) {
  return new Date(`${date.slice(0, 10)}T00:00:00Z`);
}

export function formatMonth(date: string, lang: Locale) {
  return new Intl.DateTimeFormat(intlLocale[lang], { month: "short", year: "numeric", timeZone: "UTC" }).format(parseDay(date));
}

export function formatDay(date: string, lang: Locale) {
  return new Intl.DateTimeFormat(intlLocale[lang], { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(parseDay(date));
}

// Compact figures use the international "12.5K" form in every language;
// Sinhala/Tamil CLDR abbreviations (e.g. "ද12.5") read poorly for sponsors.
export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-GB", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function formatNumber(value: number, lang: Locale) {
  return new Intl.NumberFormat(intlLocale[lang]).format(value);
}
