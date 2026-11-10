import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TarotStoreProvider } from "@/lib/storage/tarot-store";
import { siteConfig } from "@/config/site";
import { egyptianCoverImage } from "@/data/egyptian/shared";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "tarot",
    "tarot egipcio",
    "Margarita Arnal",
    "arcanos mayores",
    "simbología",
    "aprender tarot",
  ],
  authors: [{ name: siteConfig.author }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: [{ url: egyptianCoverImage, width: 640, height: 1000, alt: "Tarot Egipcio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.shortDescription,
    images: [egyptianCoverImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070a11",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${cinzel.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen antialiased">
        <TarotStoreProvider>
          <a
            href="#contenido"
            className="sr-only z-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink-950"
          >
            Saltar al contenido
          </a>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="contenido" className="flex-1">
              {children}
            </main>
            <Footer />
            <BottomNav />
          </div>
        </TarotStoreProvider>
      </body>
    </html>
  );
}
