import type { Metadata } from "next";
import { localeNames, localizedHref, locales, siteUrl, type Locale } from "./i18n/config";

export const siteName = "Matheesha Wijesekara";
export const defaultTitle = "Matheesha Wijesekara | Professional Squash Athlete";
export const defaultDescription =
  "Explore the official portfolio of Matheesha Wijesekara, featuring his squash career, achievements, tournament highlights, and sporting journey.";

const pageDescriptions: Record<string, string> = {
  "/achievements": "Explore Matheesha Wijesekara’s squash achievements, tournament results, and career milestones.",
  "/sponsors": "Discover sponsorship opportunities with Matheesha Wijesekara and support his competitive squash career.",
  "/sponsors/impact": "See documented event reach and sponsor exposure from Matheesha Wijesekara’s squash activities.",
  "/contact": "Contact Matheesha Wijesekara’s team about sponsorship, media, tournaments, or training.",
  "/media": "Browse press coverage, media features, and photos of Sri Lankan squash athlete Matheesha Wijesekara.",
  "/gallery": "Browse training, matchday, local, international, and school photos from Matheesha Wijesekara’s squash career.",
  "/gallery/local": "View photos of Matheesha Wijesekara at local squash tournaments and events in Sri Lanka.",
  "/gallery/international": "View photos of Matheesha Wijesekara at international squash tournaments and events.",
  "/gallery/school": "View school squash photos and team moments featuring Matheesha Wijesekara.",
  "/podium": "Explore Matheesha Wijesekara’s local and international squash achievements and podium finishes.",
  "/podium/local": "Explore Matheesha Wijesekara’s championship finishes and podium moments at local squash tournaments.",
  "/podium/international": "Explore Matheesha Wijesekara’s achievements and podium finishes at international squash tournaments.",
};

/** Public routes, used by the sitemap and hreflang alternates. */
export const publicPaths = [
  "/",
  "/achievements",
  "/sponsors",
  "/sponsors/impact",
  "/contact",
  "/media",
  "/gallery",
  "/gallery/local",
  "/gallery/international",
  "/gallery/school",
  "/podium",
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
  const pageDescription = description ?? pageDescriptions[path] ?? defaultDescription;
  // A branded 1200x630 card rendered from the site's existing photo and logo.
  const image = { url: "/api/og", width: 1200, height: 630, alt: siteName };
  return {
    title: fullTitle,
    description: pageDescription,
    alternates: {
      canonical: localizedHref(lang, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      url: `${siteUrl}${localizedHref(lang, path)}`,
      siteName,
      locale: localeNames[lang].ogLocale,
      type: path === "/" ? "profile" : "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDescription,
      images: [image],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#athlete`,
        name: "Matheesha Wijesekara",
        url: `${siteUrl}/`,
        image: `${siteUrl}/matheesha_profile.png`,
        jobTitle: "Squash Athlete",
        description: defaultDescription,
        knowsAbout: ["Squash"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: siteName,
        inLanguage: locales.map((lang) => localeNames[lang].htmlLang),
        about: { "@id": `${siteUrl}/#athlete` },
      },
    ],
  };
}

export function profilePageJsonLd(lang: Locale) {
  const url = `${siteUrl}${localizedHref(lang, "/")}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    url,
    name: defaultTitle,
    description: defaultDescription,
    inLanguage: localeNames[lang].htmlLang,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: { "@id": `${siteUrl}/#athlete` },
  };
}
