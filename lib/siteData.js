export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/achievements", label: "Achievements" },
  {
    href: "/gallery/local",
    label: "Gallery",
    children: [
      { href: "/gallery/local", label: "Local" },
      { href: "/gallery/international", label: "International" },
      { href: "/gallery/school", label: "School" },
    ],
  },
  {
    href: "/podium/local",
    label: "Podium",
    children: [
      { href: "/podium/local", label: "Local" },
      { href: "/podium/international", label: "International" },
    ],
  },
  { href: "/videos", label: "Videos" },
  { href: "/media", label: "Media" },
  { href: "/sponsors", label: "Sponsors" },
];

export const stats = [
  { label: "National Rank U19", value: "#1" },
  { label: "Men’s Open Rank", value: "#8" },
  { label: "Asian Rank", value: "29" },
];

export const podiumHighlights = [
  {
    title: "National U19 Champion",
    detail: "Sri Lanka National U19 No.1 ranked player",
  },
  {
    title: "International Breakthrough",
    detail: "World Junior Championship Plate Semi Finalist",
  },
  {
    title: "Team Leadership",
    detail: "Captain – Sri Lanka Junior Squash Team 2025",
  },
];

export const homeVideos = [
  {
    title: "Asian Junior Open – Quarter Final",
    youtubeId: "pK6cC8jRkqE",
    subtitle: "Match highlight reel",
  },
  {
    title: "Sri Lanka Nationals – Final",
    youtubeId: "R5D0ZqNf0iE",
    subtitle: "Championship performance",
  },
  {
    title: "Elite Training Session",
    youtubeId: "1YqAE8Z2c6o",
    subtitle: "Speed & agility focus",
  },
];

export const mediaHighlights = [
  {
    title: "Sri Lanka’s Rising Squash Star",
    outlet: "Daily Sports",
    date: "May 2025",
    summary: "Profile feature on Matheesha’s unbeaten U19 season and training discipline.",
  },
  {
    title: "Junior Team Captain Leads the Charge",
    outlet: "The Islander",
    date: "Aug 2025",
    summary: "Coverage on leading the junior squad at the Asian circuit.",
  },
  {
    title: "Breaking Into the Men’s Open Top 10",
    outlet: "Sports Mirror",
    date: "Dec 2025",
    summary: "Analysis of performances that secured the No.8 men’s open ranking.",
  },
];

export const achievementsTimeline = [
  {
    year: "2022",
    title: "National U17 Champion",
    description: "Won the National U17 title and began international circuit entries.",
  },
  {
    year: "2023",
    title: "Asian Junior Ranking 35",
    description: "Broke into Asia’s top 40 with consistent podium finishes.",
  },
  {
    year: "2024",
    title: "Junior National Player of the Year",
    description: "Named Junior National Player of the Year for double championship wins.",
  },
  {
    year: "2025",
    title: "World Junior Plate Semi Finalist",
    description: "First Sri Lankan to reach the plate semi finals at Worlds.",
  },
  {
    year: "2026",
    title: "U19 National Rank #1",
    description: "Dominated the U19 circuit and retained No.1 ranking.",
  },
];

export const achievementCards = [
  {
    title: "National U19 No.1",
    detail: "Sri Lanka national champion with top ranking in the U19 division.",
  },
  {
    title: "Men’s Open Rank #8",
    detail: "Entered the senior top 10 while still competing in junior events.",
  },
  {
    title: "Asian Rank 29",
    detail: "Consistent finals appearances across the Asian junior tour.",
  },
  {
    title: "7x Double Champion",
    detail: "Won singles and doubles titles across national championships.",
  },
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=1200&q=80",
    alt: "Training focus",
  },
  {
    src: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=1200&q=80",
    alt: "Match intensity",
  },
  {
    src: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1200&q=80",
    alt: "Victory moment",
  },
  {
    src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    alt: "Focused preparation",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    alt: "Court dynamics",
  },
  {
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    alt: "Training session",
  },
];

export const videoSections = [
  {
    title: "Match Highlights",
    description: "Tournament highlights from regional and international fixtures.",
    videos: [
      {
        title: "Asian Junior Open – Semi Final",
        youtubeId: "q4Qzj0DqYyM",
      },
      {
        title: "Sri Lanka Nationals – Final",
        youtubeId: "R5D0ZqNf0iE",
      },
      {
        title: "Men’s Open – Quarter Final",
        youtubeId: "2XoVfPpt2PY",
      },
    ],
  },
  {
    title: "Training & Preparation",
    description: "Behind the scenes sessions focused on speed, agility, and endurance.",
    videos: [
      {
        title: "Footwork Drills",
        youtubeId: "1YqAE8Z2c6o",
      },
      {
        title: "Strength & Conditioning",
        youtubeId: "k7t0Uu5mJsg",
      },
      {
        title: "Match Simulation",
        youtubeId: "pK6cC8jRkqE",
      },
    ],
  },
];

export const mediaArticles = [
  {
    title: "Sri Lankan prodigy breaks into Asian top 30",
    outlet: "Daily Sports",
    date: "March 2025",
    summary: "A spotlight on Matheesha’s Asian tour campaign and rapid rise in rankings.",
  },
  {
    title: "Junior captain inspires next generation",
    outlet: "The Islander",
    date: "July 2025",
    summary: "Coverage on youth clinics and leadership within the junior squad.",
  },
  {
    title: "Men’s Open ranking surge continues",
    outlet: "Sports Mirror",
    date: "November 2025",
    summary: "Analysis of performances that placed Matheesha in the men’s top 10.",
  },
  {
    title: "World Junior Plate semi finalist milestone",
    outlet: "Colombo Herald",
    date: "January 2026",
    summary: "Historic achievement at the World Junior Championship.",
  },
];

export const sponsorBenefits = [
  "Logo placement on match kit and warm-up apparel",
  "Brand mentions across social media and press interviews",
  "VIP access to national tournaments and exhibitions",
  "Corporate clinics and youth development sessions",
];

export const sponsorPackages = [
  {
    name: "Gold Partner",
    price: "LKR 2,500,000 / season",
    perks: [
      "Primary logo placement",
      "Exclusive press mentions",
      "Hospitality box access",
      "Quarterly performance reports",
    ],
  },
  {
    name: "Silver Partner",
    price: "LKR 1,200,000 / season",
    perks: [
      "Secondary logo placement",
      "Social media features",
      "Tournament VIP passes",
    ],
  },
  {
    name: "Bronze Partner",
    price: "LKR 600,000 / season",
    perks: [
      "Training kit logo",
      "Event signage",
      "Community outreach inclusion",
    ],
  },
];
