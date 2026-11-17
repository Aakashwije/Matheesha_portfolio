import AskMatheesha from "@/components/AskMatheesha";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import GoToTopButton from "@/components/GoToTopButton";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localeNames, locales, resolveLocale, siteUrl } from "@/lib/i18n/config";
import { pageMetadata, personJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes, Noto_Sans_Sinhala, Noto_Sans_Tamil } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Splash signature only; "block" avoids a fallback-font swap mid-draw.
const greatVibes = Great_Vibes({
  variable: "--font-signature",
  weight: "400",
  subsets: ["latin"],
  display: "block",
});

const notoSinhala = Noto_Sans_Sinhala({
  variable: "--font-script",
  subsets: ["sinhala"],
  preload: false,
});

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-script",
  subsets: ["tamil"],
  preload: false,
});

const scriptFonts = { en: "", si: notoSinhala.variable, ta: notoTamil.variable };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = resolveLocale((await params).lang);
  return {
    metadataBase: new URL(siteUrl),
    ...pageMetadata({ lang, path: "/" }),
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as never)) {
    notFound();
  }
  const lang = resolveLocale(rawLang);
  const dict = getDictionary(lang);
  const jsonLd = personJsonLd();

  return (
    <html lang={localeNames[lang].htmlLang}>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${scriptFonts[lang]} bg-[#05060b] text-white antialiased`}
      >
        <SplashScreen />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <CustomCursor />
        <Navbar lang={lang} dict={dict.nav} />
        <main>{children}</main>
        <Footer dict={dict.footer} />
        <GoToTopButton />
        {process.env.ANTHROPIC_API_KEY ? <AskMatheesha lang={lang} dict={dict.ask} /> : null}
      </body>
    </html>
  );
}
