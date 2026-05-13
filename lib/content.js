import "server-only";

import fs from "node:fs";
import path from "node:path";
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

const rootDir = process.cwd();
const dataDir = path.join(rootDir, "data");
const contentPath = path.join(dataDir, "siteContent.json");
const publicDir = path.join(rootDir, "public");

export const assetGroups = {
  profile: {
    label: "Hero Profile",
    directory: "assets/uploads/profile",
    accept: "image/*",
  },
  homeGallery: {
    label: "Home Gallery",
    directory: "assets/uploads/home-gallery",
    accept: "image/*",
  },
  localGallery: {
    label: "Local Gallery",
    directory: "assets/gallery/local",
    accept: "image/*",
  },
  internationalGallery: {
    label: "International Gallery",
    directory: "assets/gallery/Foreign",
    accept: "image/*",
  },
  schoolGallery: {
    label: "School Gallery",
    directory: "assets/gallery/College Achievements",
    accept: "image/*",
  },
  media: {
    label: "Media Photos & PDFs",
    directory: "assets/media",
    accept: "image/*,application/pdf",
  },
  localPodium: {
    label: "Local Podium",
    directory: "assets/podium/Local",
    accept: "image/*",
  },
  internationalPodium: {
    label: "International Podium",
    directory: "assets/podium/Foreign",
    accept: "image/*",
  },
  videos: {
    label: "Videos",
    directory: "assets/vedios",
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

export function getEditableContent() {
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

export function saveEditableContent(content) {
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

export function getAllPublicAssets() {
  return Object.fromEntries(
    Object.keys(assetGroups).map((group) => [group, getPublicAssets(group)]),
  );
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

export function getPublicAssets(group) {
  const { absolute, publicPath } = getAssetDirectory(group);

  if (!fs.existsSync(absolute)) {
    return [];
  }

  return fs
    .readdirSync(absolute, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .map((entry) => ({
      name: entry.name,
      src: `${publicPath}/${encodeURIComponent(entry.name)}`,
      alt: entry.name.replace(/\.[^.]+$/, "").replaceAll("_", " "),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function deletePublicAsset(group, fileName) {
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
