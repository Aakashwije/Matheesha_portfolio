export const locales = ["en", "si", "ta"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, { native: string; short: string; htmlLang: string; ogLocale: string }> = {
  en: { native: "English", short: "EN", htmlLang: "en", ogLocale: "en_US" },
  si: { native: "සිංහල", short: "සිං", htmlLang: "si", ogLocale: "si_LK" },
  ta: { native: "தமிழ்", short: "தமி", htmlLang: "ta", ogLocale: "ta_LK" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/**
 * English lives at the root ("/sponsors"); other locales are prefixed
 * ("/si/sponsors"). External links, anchors and mailto/tel are left alone.
 */
export function localizedHref(lang: Locale, href: string) {
  if (!href || !href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/")) {
    return href;
  }

  const bare = stripLocale(href);
  if (lang === defaultLocale) {
    return bare;
  }

  return bare === "/" ? `/${lang}` : `/${lang}${bare}`;
}

export function stripLocale(pathname: string) {
  const match = pathname.match(/^\/(en|si|ta)(?=\/|$|\?|#)/);
  if (!match) {
    return pathname || "/";
  }

  return pathname.slice(match[0].length) || "/";
}

// Canonicals stay pinned to the verified production origin on previews too.
export const siteUrl = "https://matheeshawijesekara.com";
