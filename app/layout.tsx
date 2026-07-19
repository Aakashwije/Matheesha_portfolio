import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import GoToTopButton from "@/components/GoToTopButton";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matheesha Wijesekara | Squash Athlete & Würth Lanka Ambassador",
  description:
    "Official portfolio of Sri Lankan squash athlete Matheesha Wijesekara, appointed Executive Brand Ambassador for Würth Lanka in 2026.",
  icons: {
    icon: "/matheesha_logo-256.png",
    apple: "/matheesha_logo-256.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-[#05060b] text-white antialiased`}
      >
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GoToTopButton />
      </body>
    </html>
  );
}
