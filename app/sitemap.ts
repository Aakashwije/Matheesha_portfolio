import type { MetadataRoute } from "next";
import { localizedHref, locales, siteUrl } from "@/lib/i18n/config";
import { languageAlternates, publicPaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}${localizedHref(lang, path)}`,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([key, href]) => [key, `${siteUrl}${href}`]),
        ),
      },
    })),
  );
}
