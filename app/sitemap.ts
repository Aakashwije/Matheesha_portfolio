import type { MetadataRoute } from "next";
import { localizedHref, locales, siteUrl } from "@/lib/i18n/config";
import { languageAlternates, publicPaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicPaths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}${localizedHref(lang, path)}`,
      lastModified,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.startsWith("/sponsors") ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([key, href]) => [key, `${siteUrl}${href}`]),
        ),
      },
    })),
  );
}
