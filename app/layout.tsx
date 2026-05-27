import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import GoToTopButton from "@/components/GoToTopButton";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";
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
  title: "Matheesha Wijesekara | Sri Lankan Squash Athlete",
  description:
    "Professional squash portfolio for Matheesha Wijesekara, Sri Lanka's top U19 athlete.",
  icons: {
    icon: "/matheesha_logo.png?v=4",
    apple: "/matheesha_logo.png?v=4",
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
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GoToTopButton />
      </body>
    </html>
  );
}
