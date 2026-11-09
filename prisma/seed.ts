import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const shows = [
  {
    slugId: "tri-swara-atma",
    slugEn: "tri-swara-atma",
    titleId: "Tri Swara Atma",
    titleEn: "Tri Swara Atma",
    descriptionId: "Sebuah persembahan rasa tentang peran, pencarian, dan cinta.",
    descriptionEn: "A presentation about roles, seeking, and love.",
    contentId: "Tri Swara Atma mempertemukan Bedhayan Topeng Sekar Kinanti, Srimpi Caturmarga, dan Karmatma dalam satu perjalanan batin. Pertunjukan ini menghadirkan identitas, keheningan, dan cinta sebagai tiga suara yang hidup dalam diri manusia.",
    contentEn: "Tri Swara Atma brings together Bedhayan Topeng Sekar Kinanti, Srimpi Caturmarga, and Karmatma in one inner journey. The performance explores identity, stillness, and love as three voices within the human soul.",
    venue: "Gedung Kesenian Jakarta",
    eventDate: new Date("2026-12-16T18:30:00+07:00"),
    durationMinutes: 120,
    status: "upcoming",
    capacity: 450,
    coverImage: "/images/poster-tsa.jpeg",
    posterImage: "/images/poster-tsa.jpeg",
  },
  {
    slugId: "bedhaya-durodasih",
    slugEn: "bedhaya-durodasih",
    titleId: "Bedhaya Durodasih",
    titleEn: "Bedhaya Durodasih",
    descriptionId: "Karya klasik dalam arsip perjalanan Nur Sekar Kinanti.",
    descriptionEn: "A classical work from Nur Sekar Kinanti's performance archive.",
    contentId: "Bedhaya Durodasih menjadi bagian dari jejak pelestarian tari Jawa gaya Surakarta di Jakarta melalui Festival Bedhayan 2019.",
    contentEn: "Bedhaya Durodasih is part of the preservation journey of Surakarta-style Javanese dance in Jakarta through the 2019 Bedhayan Festival.",
    venue: "Gedung Kesenian Jakarta",
    eventDate: new Date("2019-06-22T19:00:00+07:00"),
    durationMinutes: 120,
    status: "completed",
    capacity: null,
    coverImage: "/images/mahakarya-srimpi.jpg",
    posterImage: "/images/mahakarya-srimpi.jpg",
  },
  {
    slugId: "bedhayan-topeng-abdi-sekartaji",
    slugEn: "bedhayan-topeng-abdi-sekartaji",
    titleId: "Bedhayan Topeng Abdi Sekartaji",
    titleEn: "Bedhayan Topeng Abdi Sekartaji",
    descriptionId: "Karya tentang pengabdian tanpa ego dalam medium topeng.",
    descriptionEn: "A work about selfless devotion through the medium of masks.",
    contentId: "Dipentaskan dalam Festival Bedhayan V, karya ini diproduksi Nur Sekar Kinanti bersama Sekartaji Art Solo sebagai refleksi tentang pengabdian dan kehidupan sosial.",
    contentEn: "Presented at Festival Bedhayan V, this work was produced by Nur Sekar Kinanti with Sekartaji Art Solo as a reflection on devotion and social life.",
    venue: "Gedung Kesenian Jakarta",
    eventDate: new Date("2025-08-09T19:00:00+07:00"),
    durationMinutes: 120,
    status: "completed",
    capacity: null,
    coverImage: "/images/mahakarya-bedhayan.jpg",
    posterImage: "/images/mahakarya-bedhayan.jpg",
  },
];

async function main() {
  for (const show of shows) await prisma.show.upsert({ where: { slugId: show.slugId }, update: show, create: show });

  const posts = [
    { slugId: "tiga-suara-yang-sedang-mencari-ruangnya", slugEn: "three-voices-searching-for-their-space", titleId: "Tiga suara yang sedang mencari ruangnya", titleEn: "Three voices searching for their space", excerptId: "Tri Swara Atma mengajak kita memasuki perjalanan batin melalui identitas, keheningan, dan cinta.", excerptEn: "Tri Swara Atma takes us through an inner journey of identity, stillness, and love.", contentId: "Tiga karya bergerak dari dunia manusia menuju ruang spiritual, lalu mencapai cinta yang melampaui batas kehidupan.", contentEn: "Three works move from the human world toward spiritual space, then reach a love that exceeds the limits of life.", category: "The Story" },
    { slugId: "mengapa-tari-klasik-tetap-berbicara-hari-ini", slugEn: "why-classical-dance-still-speaks-today", titleId: "Mengapa tari klasik tetap berbicara hari ini", titleEn: "Why classical dance still speaks today", excerptId: "Tradisi bukan ruang yang beku. Ia bergerak, dirawat, dan menemukan makna baru.", excerptEn: "Tradition is not a frozen room. It moves, is cared for, and finds new meaning.", contentId: "Tari klasik membawa disiplin tubuh, filosofi, dan cara memandang hubungan manusia dengan semesta.", contentEn: "Classical dance carries bodily discipline, philosophy, and a way of understanding our relationship with the universe.", category: "The Heritage" },
  ];
  for (const post of posts) await prisma.post.upsert({ where: { slugId: post.slugId }, update: post, create: { ...post, status: "published", publishedAt: new Date() } });
}

main().finally(() => prisma.$disconnect());
