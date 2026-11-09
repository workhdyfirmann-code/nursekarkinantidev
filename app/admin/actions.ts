"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearAdminSession, isAdminAuthenticated, setAdminSession, validAdminCredentials } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { sanitizeRichText } from "@/lib/rich-text";
import { saveUploadedImage } from "@/lib/uploads";
import { translateRichText, translateText } from "@/lib/translate";
import { sponsorshipPackages } from "@/lib/content";

const sponsorTiers = sponsorshipPackages.map((item) => item.name);
const sponsorStatuses = ["draft", "published"];

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  if (!validAdminCredentials(email, password)) redirect("/admin/login?error=1");
  await setAdminSession(email);
  redirect("/admin");
}

export async function logout() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createPost(formData: FormData) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const titleId = String(formData.get("titleId") || "").trim();
  const titleEn = String(formData.get("titleEn") || "").trim();
  const slugId = String(formData.get("slugId") || "").trim();
  const slugEn = String(formData.get("slugEn") || "").trim();
  if (!titleId || !slugId) redirect("/admin?error=post");
  const coverImage = await saveUploadedImage(formData.get("coverImage"), "cover");
  const thumbnailImage = await saveUploadedImage(formData.get("thumbnailImage"), "thumb");
  await prisma.post.create({ data: { titleId, titleEn, slugId, slugEn, excerptId: String(formData.get("excerptId") || ""), excerptEn: String(formData.get("excerptEn") || ""), contentId: sanitizeRichText(String(formData.get("contentId") || "")), contentEn: sanitizeRichText(String(formData.get("contentEn") || "")), category: String(formData.get("category") || "Berita"), coverImage, thumbnailImage, status: "draft" } });
  revalidatePath("/admin");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function updatePost(formData: FormData) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const coverImage = await saveUploadedImage(formData.get("coverImage"), "cover");
  const thumbnailImage = await saveUploadedImage(formData.get("thumbnailImage"), "thumb");
  await prisma.post.update({ where: { id: String(formData.get("id")) }, data: { titleId: String(formData.get("titleId") || ""), titleEn: String(formData.get("titleEn") || ""), slugId: String(formData.get("slugId") || ""), slugEn: String(formData.get("slugEn") || ""), excerptId: String(formData.get("excerptId") || ""), excerptEn: String(formData.get("excerptEn") || ""), contentId: sanitizeRichText(String(formData.get("contentId") || "")), contentEn: sanitizeRichText(String(formData.get("contentEn") || "")), category: String(formData.get("category") || "Berita"), status: String(formData.get("status") || "draft"), ...(coverImage ? { coverImage } : {}), ...(thumbnailImage ? { thumbnailImage } : {}) } });
  revalidatePath("/admin");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  await prisma.post.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function createShow(formData: FormData) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const eventDate = new Date(String(formData.get("eventDate") || ""));
  const coverImage = await saveUploadedImage(formData.get("coverImage"), "show-cover");
  const posterImage = await saveUploadedImage(formData.get("posterImage"), "show-poster");
  await prisma.show.create({ data: { titleId: String(formData.get("titleId") || ""), titleEn: String(formData.get("titleEn") || ""), slugId: String(formData.get("slugId") || ""), slugEn: String(formData.get("slugEn") || ""), descriptionId: String(formData.get("descriptionId") || ""), descriptionEn: String(formData.get("descriptionEn") || ""), contentId: sanitizeRichText(String(formData.get("contentId") || "")), contentEn: sanitizeRichText(String(formData.get("contentEn") || "")), venue: String(formData.get("venue") || ""), eventDate, durationMinutes: Number(formData.get("durationMinutes")) || null, status: String(formData.get("status") || "upcoming"), capacity: Number(formData.get("capacity")) || null, coverImage, posterImage } });
  revalidatePath("/admin");
  revalidatePath("/pentas");
  redirect("/admin/shows");
}

export async function updateShow(formData: FormData) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const coverImage = await saveUploadedImage(formData.get("coverImage"), "show-cover");
  const posterImage = await saveUploadedImage(formData.get("posterImage"), "show-poster");
  await prisma.show.update({ where: { id: String(formData.get("id")) }, data: { titleId: String(formData.get("titleId") || ""), titleEn: String(formData.get("titleEn") || ""), slugId: String(formData.get("slugId") || ""), slugEn: String(formData.get("slugEn") || ""), descriptionId: String(formData.get("descriptionId") || ""), descriptionEn: String(formData.get("descriptionEn") || ""), contentId: sanitizeRichText(String(formData.get("contentId") || "")), contentEn: sanitizeRichText(String(formData.get("contentEn") || "")), venue: String(formData.get("venue") || ""), eventDate: new Date(String(formData.get("eventDate") || "")), durationMinutes: Number(formData.get("durationMinutes")) || null, status: String(formData.get("status") || "upcoming"), capacity: Number(formData.get("capacity")) || null, ...(coverImage ? { coverImage } : {}), ...(posterImage ? { posterImage } : {}) } });
  revalidatePath("/admin");
  revalidatePath("/pentas");
  redirect("/admin/shows");
}

export async function deleteShow(formData: FormData) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  await prisma.show.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin");
  revalidatePath("/pentas");
  redirect("/admin/shows");
}

export async function translatePostDraft(formData: FormData) {
  if (!await isAdminAuthenticated()) throw new Error("Unauthorized");
  const titleId = String(formData.get("titleId") || "");
  const excerptId = String(formData.get("excerptId") || "");
  const contentId = String(formData.get("contentId") || "");
  const [titleEn, excerptEn, contentEn] = await Promise.all([translateText(titleId), translateText(excerptId), translateRichText(contentId)]);
  const slugEn = titleEn.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
  return { titleEn, slugEn, excerptEn, contentEn };
}

export async function translateShowDraft(formData: FormData) {
  if (!await isAdminAuthenticated()) throw new Error("Unauthorized");
  const titleId = String(formData.get("titleId") || "");
  const descriptionId = String(formData.get("descriptionId") || "");
  const contentId = String(formData.get("contentId") || "");
  const [titleEn, descriptionEn, contentEn] = await Promise.all([translateText(titleId), translateText(descriptionId), translateRichText(contentId)]);
  const slugEn = titleEn.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
  return { titleEn, slugEn, descriptionEn, contentEn };
}
export async function createSponsor(formData: FormData) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const name = String(formData.get("name") || "").trim();
  const tier = String(formData.get("tier") || "");
  const status = String(formData.get("status") || "");
  const isGeneral = formData.get("isGeneral") === "on";
  const showIds = [...new Set(formData.getAll("showIds").map((value) => String(value)).filter(Boolean))];
  if (!name || !sponsorTiers.includes(tier) || !sponsorStatuses.includes(status) || (!isGeneral && !showIds.length)) redirect("/admin/sponsors/new?error=invalid");
  const matchingShows = showIds.length ? await prisma.show.findMany({ where: { id: { in: showIds } }, select: { id: true } }) : [];
  if (matchingShows.length !== showIds.length) redirect("/admin/sponsors/new?error=event");
  const logoImage = await saveUploadedImage(formData.get("logoImage"), "sponsor");
  if (!logoImage) redirect("/admin/sponsors/new?error=logo");
  await prisma.sponsor.create({ data: { name, tier, status, isGeneral, logoImage, shows: { connect: showIds.map((showId) => ({ id: showId })) } } });
  revalidatePath("/admin/sponsors");
  revalidatePath("/", "layout");
  redirect("/admin/sponsors");
}

export async function updateSponsor(formData: FormData) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const id = String(formData.get("id") || "");
  const current = await prisma.sponsor.findUnique({ where: { id } });
  if (!current) redirect("/admin/sponsors");
  const name = String(formData.get("name") || "").trim();
  const tier = String(formData.get("tier") || "");
  const status = String(formData.get("status") || "");
  const isGeneral = formData.get("isGeneral") === "on";
  const showIds = [...new Set(formData.getAll("showIds").map((value) => String(value)).filter(Boolean))];
  if (!name || !sponsorTiers.includes(tier) || !sponsorStatuses.includes(status) || (!isGeneral && !showIds.length)) redirect(`/admin/sponsors/${id}/edit?error=invalid`);
  const matchingShows = showIds.length ? await prisma.show.findMany({ where: { id: { in: showIds } }, select: { id: true } }) : [];
  if (matchingShows.length !== showIds.length) redirect(`/admin/sponsors/${id}/edit?error=event`);
  const logoImage = await saveUploadedImage(formData.get("logoImage"), "sponsor");
  await prisma.sponsor.update({ where: { id }, data: { name, tier, status, isGeneral, logoImage: logoImage || current.logoImage, shows: { set: showIds.map((showId) => ({ id: showId })) } } });
  revalidatePath("/admin/sponsors");
  revalidatePath("/", "layout");
  redirect("/admin/sponsors");
}

export async function deleteSponsor(formData: FormData) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  await prisma.sponsor.delete({ where: { id: String(formData.get("id") || "") } });
  revalidatePath("/admin/sponsors");
  revalidatePath("/", "layout");
  redirect("/admin/sponsors");
}
