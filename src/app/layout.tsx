import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MenuPanel from "@/components/navigation/MenuPanel";
import SearchOverlay from "@/components/navigation/SearchOverlay";
import GlobalModals from "@/components/navigation/GlobalModals";
import Providers from "@/components/layout/Providers";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: { default: `${site.brand} | Çağdaş Mobilya ${site.city}`, template: `%s | ${site.brand}` },
  description: `${site.brand}: kanepe, koltuk, yemek masası, yatak ve aydınlatma. ${site.city} showroom, ücretsiz dekorasyon danışmanlığı.`,
  robots: { index: false, follow: false }, // demo site arama motorlarına kapalı
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a href="#icerik" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2">İçeriğe geç</a>
        <Providers />
        <Header />
        <MenuPanel />
        <SearchOverlay />
        <GlobalModals />
        <main id="icerik">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
