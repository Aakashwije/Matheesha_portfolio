import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer"],
  images: {
    localPatterns: [
      {
        pathname: "/matheesha_logo-256.png",
      },
      {
        pathname: "/matheesha_profile.png",
      },
      {
        pathname: "/assets/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "ulmdmvjzzvlanotmusmw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
