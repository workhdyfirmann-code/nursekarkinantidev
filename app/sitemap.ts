import type { MetadataRoute } from "next";
import { englishJournalPosts, englishShows, journalPosts, pastShows } from "@/lib/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nursekarkinanti.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/profil", "/galeri", "/pentas", "/kerjasama", "/blog", "/kontak", "/en", "/en/profile", "/en/gallery", "/en/shows", "/en/partnership", "/en/blog"];
  return [
    ...routes.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "/" || path === "/en" ? 1 : 0.7 })),
    ...pastShows.flatMap((show) => [{ url: `${baseUrl}/pentas/${show.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }, { url: `${baseUrl}/en/shows/${show.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }]),
    ...journalPosts.flatMap((post, index) => [{ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 }, { url: `${baseUrl}/en/blog/${englishJournalPosts[index]?.slug || post.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 }]),
    ...englishShows.filter((show) => show.slug === "tri-swara-atma").map((show) => ({ url: `${baseUrl}/en/shows/${show.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
