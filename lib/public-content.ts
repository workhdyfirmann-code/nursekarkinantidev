import { englishJournalPosts, englishShows, journalPosts, pastShows } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

type Locale = "id" | "en";

export async function getPublishedPosts() {
  await connection();
  try {
    const rows = await prisma.post.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" } });
    if (rows.length) return rows.map((post) => ({ slugId: post.slugId, slugEn: post.slugEn, titleId: post.titleId, titleEn: post.titleEn, excerptId: post.excerptId, excerptEn: post.excerptEn, contentId: post.contentId, contentEn: post.contentEn, category: post.category, coverImage: post.coverImage, thumbnailImage: post.thumbnailImage, publishedAt: post.publishedAt?.toISOString() || post.updatedAt.toISOString() }));
  } catch {}
  return journalPosts.map((post, index) => ({ ...post, slugId: post.slug, slugEn: englishJournalPosts[index]?.slug || post.slug, titleId: post.title, titleEn: englishJournalPosts[index]?.title || post.title, excerptId: post.excerpt, excerptEn: englishJournalPosts[index]?.excerpt || post.excerpt, contentId: post.content, contentEn: englishJournalPosts[index]?.content || post.content, coverImage: null, thumbnailImage: null, publishedAt: null }));
}

export async function getPostBySlug(slug: string, locale: Locale) {
  await connection();
  try {
    const post = await prisma.post.findFirst({ where: { status: "published", OR: [{ slugId: slug }, { slugEn: slug }] } });
    if (post) return { slug: locale === "en" ? post.slugEn : post.slugId, title: locale === "en" ? post.titleEn : post.titleId, excerpt: locale === "en" ? post.excerptEn : post.excerptId, content: locale === "en" ? post.contentEn : post.contentId, category: post.category, coverImage: post.coverImage, thumbnailImage: post.thumbnailImage, publishedAt: post.publishedAt?.toISOString() || post.updatedAt.toISOString() };
  } catch {}
  const fallback = locale === "en" ? englishJournalPosts.find((post) => post.slug === slug) : journalPosts.find((post) => post.slug === slug);
  return fallback ? { slug: fallback.slug, title: fallback.title, excerpt: fallback.excerpt, content: fallback.content, category: fallback.category, coverImage: null, thumbnailImage: null, publishedAt: null } : null;
}

export async function getShows() {
  await connection();
  try {
    const rows = await prisma.show.findMany({ orderBy: { eventDate: "desc" } });
    if (rows.length) return rows.map((show) => ({ slugId: show.slugId, slugEn: show.slugEn, titleId: show.titleId, titleEn: show.titleEn, descriptionId: show.descriptionId, descriptionEn: show.descriptionEn, contentId: show.contentId, contentEn: show.contentEn, venue: show.venue, note: show.eventDate.toLocaleDateString("id-ID"), year: String(show.eventDate.getFullYear()), status: show.status, durationMinutes: show.durationMinutes, capacity: show.capacity, coverImage: show.coverImage, posterImage: show.posterImage }));
  } catch {}
  return pastShows.map((show) => ({ slugId: show.slug, slugEn: show.slug, titleId: show.title, titleEn: show.title, descriptionId: show.description, descriptionEn: show.description, contentId: show.description, contentEn: show.description, venue: show.venue, note: show.note, year: show.year, status: "completed", durationMinutes: 120, capacity: null, coverImage: null, posterImage: null }));
}

export async function getShowBySlug(slug: string, locale: Locale) {
  await connection();
  try {
    const show = await prisma.show.findFirst({ where: { OR: [{ slugId: slug }, { slugEn: slug }] } });
    if (show) return { id: show.id, slug: locale === "en" ? show.slugEn : show.slugId, title: locale === "en" ? show.titleEn : show.titleId, description: locale === "en" ? show.descriptionEn : show.descriptionId, content: locale === "en" ? show.contentEn : show.contentId, venue: show.venue, note: show.eventDate.toLocaleDateString(locale === "en" ? "en-US" : "id-ID"), year: String(show.eventDate.getFullYear()), status: show.status, durationMinutes: show.durationMinutes, capacity: show.capacity, coverImage: show.coverImage, posterImage: show.posterImage };
  } catch {}
  const fallback = locale === "en" ? englishShows.find((show) => show.slug === slug) : pastShows.find((show) => show.slug === slug);
  if (slug === "tri-swara-atma") {
    return {
      id: null,
      slug,
      title: "Tri Swara Atma",
      description: locale === "en" ? "A presentation about roles, seeking, and love." : "Sebuah persembahan rasa tentang peran, pencarian, dan cinta.",
      content: locale === "en" ? "Tri Swara Atma brings together three classical Javanese works in one inner journey." : "Tri Swara Atma mempertemukan tiga karya tari Jawa klasik dalam satu perjalanan batin.",
      venue: locale === "en" ? "Jakarta Arts Building" : "Gedung Kesenian Jakarta",
      note: locale === "en" ? "December 16, 2026" : "16 Desember 2026",
      year: "2026",
      status: "upcoming",
      durationMinutes: 120,
      capacity: 450,
      coverImage: "/images/poster-tsa.jpeg",
      posterImage: "/images/poster-tsa.jpeg",
    };
  }
  return fallback ? { id: null, slug: fallback.slug, title: fallback.title, description: fallback.description, content: fallback.description, venue: fallback.venue, note: fallback.note, year: fallback.year, status: "completed", durationMinutes: 120, capacity: null, coverImage: null, posterImage: null } : null;
}

export async function getUpcomingShow() {
  await connection();
  try {
    const show = await prisma.show.findFirst({ where: { status: "upcoming" }, orderBy: { eventDate: "asc" } });
    if (!show) return;
    return { slugId: show.slugId, slugEn: show.slugEn, titleId: show.titleId, titleEn: show.titleEn, descriptionId: show.descriptionId, descriptionEn: show.descriptionEn, venue: show.venue, noteId: show.eventDate.toLocaleDateString("id-ID"), noteEn: show.eventDate.toLocaleDateString("en-US"), durationMinutes: show.durationMinutes, capacity: show.capacity, coverImage: show.coverImage, posterImage: show.posterImage };
  } catch {}
  return { slugId: "tri-swara-atma", slugEn: "tri-swara-atma", titleId: "Tri Swara Atma", titleEn: "Tri Swara Atma", descriptionId: "Sebuah persembahan rasa tentang peran, pencarian, dan cinta.", descriptionEn: "A presentation about roles, seeking, and love.", venue: "Gedung Kesenian Jakarta", noteId: "16 Desember 2026", noteEn: "December 16, 2026", durationMinutes: 120, capacity: 450, coverImage: "/images/poster-tsa.jpeg", posterImage: "/images/poster-tsa.jpeg" };
}
