import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AmbientAudio } from "@/components/ambient-audio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nursekarkinanti.id"),
  title: {
    default: "Nur Sekar Kinanti — Sanggar Tari Jawa Klasik",
    template: "%s — Nur Sekar Kinanti",
  },
  description: "Nur Sekar Kinanti adalah ruang pelestarian, pembelajaran, dan pengembangan tari Jawa klasik gaya Surakarta.",
  alternates: {
    canonical: "/",
    languages: {
      id: "/",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Nur Sekar Kinanti",
    title: "Nur Sekar Kinanti — Sanggar Tari Jawa Klasik",
    description: "Ruang pelestarian, pembelajaran, dan pengembangan tari Jawa klasik gaya Surakarta.",
    images: [{ url: "/images/poster-tsa.jpeg", width: 1842, height: 2304, alt: "Poster Tri Swara Atma" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nur Sekar Kinanti — Sanggar Tari Jawa Klasik",
    description: "Ruang pelestarian, pembelajaran, dan pengembangan tari Jawa klasik gaya Surakarta.",
    images: ["/images/poster-tsa.jpeg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SiteHeader />
        <AmbientAudio />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
