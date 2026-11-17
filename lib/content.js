import "server-only";

import fs from "node:fs";
import path from "node:path";
import {
  createSupabaseAdmin,
  hasSupabaseConfig,
  SUPABASE_BUCKET,
} from "./supabaseAdmin";
import {
  achievementCards,
  achievementSections,
  achievementsTimeline,
  academicProfile,
  galleryImages,
  mediaArticles,
  mediaHighlights,
  olResults,
  podiumHighlights,
  sponsorBenefits,
  sponsorPackages,
  stats,
} from "./siteData";
import { contentTranslations } from "./i18n/contentTranslations";

const rootDir = process.cwd();
const dataDir = path.join(rootDir, "data");
const contentPath = path.join(dataDir, "siteContent.json");
const publicDir = path.join(rootDir, "public");

export const assetGroups = {
  profile: {
    label: "Hero Profile",
    directory: "assets/uploads/profile",
    storagePath: "profile",
    accept: "image/*",
  },
  homeGallery: {
    label: "Home Gallery",
    directory: "assets/uploads/home-gallery",
    storagePath: "home-gallery",
    accept: "image/*",
  },
  localGallery: {
    label: "Local Gallery",
    directory: "assets/gallery/local",
    storagePath: "gallery/local",
    accept: "image/*",
  },
  internationalGallery: {
    label: "International Gallery",
    directory: "assets/gallery/Foreign",
    storagePath: "gallery/international",
    accept: "image/*",
  },
  schoolGallery: {
    label: "School Gallery",
    directory: "assets/gallery/College Achievements",
    storagePath: "gallery/school",
    accept: "image/*",
  },
  media: {
    label: "Media Photos & PDFs",
    directory: "assets/media",
    storagePath: "media",
    accept: "image/*,application/pdf",
  },
  localPodium: {
    label: "Local Podium",
    directory: "assets/podium/Local",
    storagePath: "podium/local",
    accept: "image/*",
  },
  internationalPodium: {
    label: "International Podium",
    directory: "assets/podium/Foreign",
    storagePath: "podium/international",
    accept: "image/*",
  },
  videos: {
    label: "Videos",
    directory: "assets/vedios",
    storagePath: "videos",
    accept: "video/*",
  },
};

export const defaultContent = {
  sectionCopy: {
    homeStats: {
      eyebrow: "Rankings",
      title: "Elite National & Asian Positions",
      subtitle: "Consistent podium finishes across junior and senior circuits.",
    },
    homePodium: {
      eyebrow: "Podium",
      title: "Signature Achievements",
      subtitle: "Highlights that define Matheesha’s competitive edge.",
    },
    homeVideos: {
      eyebrow: "Match Videos",
      title: "Highlights & Training Sessions",
      subtitle:
        "Quick clips that capture match intensity, training rhythm, and tournament momentum.",
    },
    homeMedia: {
      eyebrow: "Media",
      title: "In the Headlines",
      subtitle: "Coverage from Sri Lankan and regional press outlets.",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Training & Matchday Moments",
      subtitle: "A curated visual story of preparation, competition, and victories.",
    },
    localGallery: {
      eyebrow: "Gallery",
      title: "Local Highlights",
      subtitle:
        "Moments from national tournaments, training camps, and home fixtures.",
    },
    internationalGallery: {
      eyebrow: "Gallery",
      title: "International Highlights",
      subtitle: "Snapshots from overseas tournaments and global tour events.",
    },
    schoolGallery: {
      eyebrow: "Gallery",
      title: "School Highlights",
      subtitle: "Snapshots from school tournaments, training, and team moments.",
    },
    achievements: {
      eyebrow: "Achievements",
      title: "A Timeline of Growth",
      subtitle: "Major milestones that reflect competitive excellence and leadership.",
    },
    sponsors: {
      eyebrow: "Sponsors",
      title: "Partner with an Elite Athlete",
      subtitle:
        "Support Matheesha’s international tour calendar and showcase your brand across the squash circuit.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s Build a Partnership",
      subtitle: "For sponsorships, media inquiries, or training collaborations.",
    },
  },
  hero: {
    eyebrow: "Sri Lanka • Squash • Elite Performance",
    title: "Matheesha Wijesekara",
    highlight: "High-Performance Squash Athlete",
    description:
      "Matheesha Wijesekara is a dynamic Sri Lankan Junior National Squash Champion who competes with passion, power, and purpose. A fearless competitor on both national and international stages, he represents his country with pride and relentless drive — inspiring others through his dedication, resilience, and winning mindset. A true role model — on and off the court.",
    primaryCtaLabel: "Become a Sponsor",
    primaryCtaHref: "/sponsors",
    secondaryCtaLabel: "View Gallery",
    secondaryCtaHref: "/gallery/local",
    image: "/matheesha_profile.png",
  },
  latestUpdate: {
    label: "Latest Achievement",
    event: "Selected for the 23rd Asian Junior Team Squash Championship 🇱🇰",
    date: "20th – 24th January 2027",
    venue: "Pattaya, Thailand",
    cards: [
      {
        image: "",
        title: "No. 1 National Trialist | 23rd Asian Junior Team Squash Championship",
        description:
          "Proudly secured the No. 1 spot at the Trials, winning all matches 3–0, and earned the honour of representing Sri Lanka at the 23rd Asian Junior Team Squash Championship in Pattaya, Thailand (20–24 January 2027). 🇱🇰",
        badge: "Trials No. 1",
        icon: "trophy",
      },
      {
        image: "",
        title: "The Road Ahead | Singapore · Philadelphia · Pattaya · Sri\u00a0Lanka",
        description:
          "ONCOCARE Singapore Junior Open (8–13 Dec 2026) · U.S. Junior Open, Philadelphia (19–23 Dec 2026) · 23rd Asian Junior Team Squash Championship, Pattaya (20–24 Jan 2027) · Sri Lanka Junior Open — Asian Junior Super Series (dates to be announced).",
        badge: "Upcoming Tournaments",
        icon: "plane",
      },
    ],
  },
  stats,
  podiumHighlights,
  mediaHighlights,
  mediaArticles,
  achievementsTimeline,
  achievementCards,
  achievementSections,
  sponsorBenefits,
  sponsorPackages,
  olResults,
  academicProfile,
  galleryImages,
  translations: { si: {}, ta: {} },
  contactCards: [
    {
      label: "Athlete",
      name: "Matheesha Wijesekara",
      detail: "inokagunn@gmail.com",
      href: "mailto:inokagunn@gmail.com",
    },
    {
      label: "Manager",
      name: "+94 77 771 1666",
      detail: "Colombo, Sri Lanka",
      href: "",
    },
  ],
};

function deepMerge(base, override) {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base;
  }

  if (!base || typeof base !== "object") {
    return override ?? base;
  }

  const merged = { ...base };
  if (!override || typeof override !== "object") {
    return merged;
  }

  for (const key of Object.keys(override)) {
    merged[key] = deepMerge(base[key], override[key]);
  }

  return merged;
}

function getLocalEditableContent() {
  try {
    if (!fs.existsSync(contentPath)) {
      return defaultContent;
    }

    const stored = JSON.parse(fs.readFileSync(contentPath, "utf8"));
    return deepMerge(defaultContent, stored);
  } catch (error) {
    console.error("Failed to read editable site content", error);
    return defaultContent;
  }
}

// Overlays language-specific copy (built-in defaults, then admin-managed
// `translations.<lang>`) on top of the English content.
function localizeContent(content, lang) {
  if (!lang || lang === "en") {
    return content;
  }

  const builtIn = contentTranslations[lang] ?? {};
  const managed = content.translations?.[lang] ?? {};
  return deepMerge(deepMerge(content, builtIn), managed);
}

export async function getEditableContent(lang = "en") {
  return localizeContent(await getBaseEditableContent(), lang);
}

async function getBaseEditableContent() {
  if (!hasSupabaseConfig()) {
    return getLocalEditableContent();
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "main")
      .maybeSingle();

    if (error) {
      console.error("Failed to read Supabase content", error.message);
      return getLocalEditableContent();
    }

    return deepMerge(defaultContent, data?.content ?? {});
  } catch (error) {
    console.error("Failed to read editable site content", error);
    return getLocalEditableContent();
  }
}

export async function saveEditableContent(content) {
  if (hasSupabaseConfig()) {
    await ensureStorageBucket();

    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("site_content").upsert({
      id: "main",
      content,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error(error.message);
    }

    return content;
  }

  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`);
  return content;
}

export function getAssetGroupMeta() {
  return Object.fromEntries(
    Object.entries(assetGroups).map(([key, value]) => [
      key,
      { label: value.label, accept: value.accept },
    ]),
  );
}

export async function getAllPublicAssets() {
  const entries = await Promise.all(
    Object.keys(assetGroups).map(async (group) => [
      group,
      await getPublicAssets(group),
    ]),
  );

  return Object.fromEntries(entries);
}

export function getAssetDirectory(group) {
  const config = assetGroups[group];
  if (!config) {
    throw new Error(`Unknown upload group: ${group}`);
  }

  const absolute = path.join(publicDir, config.directory);
  const publicPath = `/${config.directory}`;
  return { absolute, publicPath };
}

function getSupabasePublicUrl(pathname) {
  const supabase = createSupabaseAdmin();
  const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(pathname);
  return data.publicUrl;
}

function isAllowedAsset(fileName, accept) {
  const extension = path.extname(fileName).toLowerCase();
  const imageExtensions = [".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"];
  const videoExtensions = [".m4v", ".mov", ".mp4", ".ogg", ".webm"];

  if (accept.includes("image/*") && imageExtensions.includes(extension)) {
    return true;
  }

  if (accept.includes("video/*") && videoExtensions.includes(extension)) {
    return true;
  }

  if (accept.includes("application/pdf") && extension === ".pdf") {
    return true;
  }

  return false;
}

// Videos get a still frame from <dir>/posters/<name>.jpg when one exists
// (generated with ffmpeg; see scripts/move-videos-to-supabase.mjs).
function localPoster(absolute, publicPath, fileName) {
  const posterName = `${fileName.replace(/\.[^.]+$/, "")}.jpg`;
  return fs.existsSync(path.join(absolute, "posters", posterName))
    ? { poster: `${publicPath}/posters/${encodeURIComponent(posterName)}` }
    : {};
}

function getLocalPublicAssets(group) {
  const config = assetGroups[group];
  const { absolute, publicPath } = getAssetDirectory(group);

  if (!fs.existsSync(absolute)) {
    return [];
  }

  return fs
    .readdirSync(absolute, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        !entry.name.startsWith(".") &&
        isAllowedAsset(entry.name, config.accept),
    )
    .map((entry) => ({
      name: entry.name,
      source: "local",
      src: `${publicPath}/${encodeURIComponent(entry.name)}`,
      alt: entry.name.replace(/\.[^.]+$/, "").replaceAll("_", " "),
      ...localPoster(absolute, publicPath, entry.name),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function ensureStorageBucket() {
  if (!hasSupabaseConfig()) {
    return;
  }

  const supabase = createSupabaseAdmin();
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    throw new Error(listError.message);
  }

  if (buckets.some((bucket) => bucket.name === SUPABASE_BUCKET)) {
    return;
  }

  const { error } = await supabase.storage.createBucket(SUPABASE_BUCKET, {
    public: true,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getPublicAssets(group) {
  const config = assetGroups[group];
  if (!config) {
    throw new Error(`Unknown upload group: ${group}`);
  }

  const localAssets = getLocalPublicAssets(group);

  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .list(config.storagePath, {
        limit: 1000,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.error("Failed to list Supabase assets", error.message);
      return localAssets;
    }

    const posterNames = new Set();
    if (group === "videos") {
      const { data: posters } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .list(`${config.storagePath}/posters`, { limit: 1000 });
      for (const poster of posters ?? []) posterNames.add(poster.name);
    }

    const supabaseAssets = data
      .filter(
        (entry) =>
          !entry.name.startsWith(".") && isAllowedAsset(entry.name, config.accept),
      )
      .map((entry) => {
        const pathname = `${config.storagePath}/${entry.name}`;
        const posterName = `${entry.name.replace(/\.[^.]+$/, "")}.jpg`;
        return {
          name: entry.name,
          source: "supabase",
          path: pathname,
          src: getSupabasePublicUrl(pathname),
          alt: entry.name.replace(/\.[^.]+$/, "").replaceAll("_", " "),
          ...(posterNames.has(posterName)
            ? { poster: getSupabasePublicUrl(`${config.storagePath}/posters/${posterName}`) }
            : {}),
        };
      });

    return [...localAssets, ...supabaseAssets];
  }

  return localAssets;
}

export async function deletePublicAsset(group, fileName, source = "supabase") {
  const config = assetGroups[group];
  if (!config) {
    throw new Error(`Unknown upload group: ${group}`);
  }

  if (hasSupabaseConfig() && source !== "local") {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .remove([`${config.storagePath}/${path.basename(fileName)}`]);

    if (error) {
      throw new Error(error.message);
    }

    return;
  }

  const { absolute } = getAssetDirectory(group);
  const safeName = path.basename(fileName);
  const target = path.join(absolute, safeName);

  if (!target.startsWith(absolute)) {
    throw new Error("Invalid file path.");
  }

  if (fs.existsSync(target)) {
    fs.unlinkSync(target);
  }
}
