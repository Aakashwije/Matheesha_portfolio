import type { Metadata } from "next";
import { localeNames, localizedHref, locales, siteUrl, type Locale } from "./i18n/config";

export const siteName = "Matheesha Wijesekara";
export const defaultTitle = "Matheesha Wijesekara | Squash Athlete & Würth Lanka Ambassador";
export const defaultDescription =
  "Official portfolio of Sri Lankan squash athlete Matheesha Wijesekara — National U19 #1, among Asia’s Top 10 junior players for nine consecutive months, and Executive Brand Ambassador for Würth Lanka.";

/** Public routes, used by the sitemap and hreflang alternates. */
export const publicPaths = [
  "/",
  "/achievements",
  "/sponsors",
  "/sponsors/impact",
  "/contact",
  "/media",
  "/gallery/local",
  "/gallery/international",
  "/gallery/school",
  "/podium/local",
  "/podium/international",
];

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((lang) => [localeNames[lang].htmlLang, localizedHref(lang, path)])),
    "x-default": localizedHref("en", path),
  };
}

export function pageMetadata({
  lang,
  path,
  title,
  description = defaultDescription,
}: {
  lang: Locale;
  path: string;
  title?: string;
  description?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  // One branded share card (app/api/og) for every page and language.
  const image = { url: "/api/og", width: 1200, height: 630, alt: siteName };
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: localizedHref(lang, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${siteUrl}${localizedHref(lang, path)}`,
      siteName,
      locale: localeNames[lang].ogLocale,
      type: path === "/" ? "profile" : "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

type Stat = { label: string; value: string };
type TimelineItem = { year: string; title: string };

export function personJsonLd(content: { stats: Stat[]; achievementsTimeline: TimelineItem[]; hero: { image: string } }) {
  const image = content.hero.image.startsWith("http") ? content.hero.image : `${siteUrl}${content.hero.image}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#athlete`,
        name: "Matheesha Wijesekara",
        url: siteUrl,
        image,
        birthDate: "2008-02-18",
        gender: "Male",
        nationality: { "@type": "Country", name: "Sri Lanka" },
        jobTitle: "Professional Squash Athlete",
        description: defaultDescription,
        knowsAbout: ["Squash"],
        alumniOf: { "@type": "HighSchool", name: "Royal College, Colombo 7" },
        sponsor: { "@type": "Organization", name: "Würth Lanka" },
        award: [
          ...content.stats.map((stat) => `${stat.label}: ${stat.value}`),
          ...content.achievementsTimeline.map((item) => `${item.title} (${item.year})`),
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        inLanguage: locales.map((lang) => localeNames[lang].htmlLang),
        about: { "@id": `${siteUrl}/#athlete` },
      },
    ],
  };
}
