"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type FeaturedShow = { slugId: string; titleId: string; titleEn: string; descriptionId: string; descriptionEn: string; venue: string; noteId: string; noteEn: string; capacity: number | null; coverImage: string | null; posterImage: string | null };
type Slide = { kicker: string; title: ReactNode; description: string; image: string; primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string; meta: Array<[string, string]> };

const defaultImage = "/images/background-carousel-home-page.png";

const idDefaultSlide: Slide = { kicker: "Sanggar Seni & Budaya Indonesia · Sanggar Tari", title: <>Nur Sekar<br />Kinanti</>, description: "Melestarikan Budaya. Menghidupkan Seni. Menginspirasi Generasi.", image: defaultImage, primaryLabel: "Jelajahi Budaya Kami →", primaryHref: "/profil", secondaryLabel: "Ikuti Perjalanan Kami →", secondaryHref: "/blog", meta: [] };
const enDefaultSlide: Slide = { kicker: "Indonesian Arts & Culture · Dance Studio", title: <>Nur Sekar<br />Kinanti</>, description: "Preserving Heritage. Bringing Art to Life. Inspiring Generations.", image: defaultImage, primaryLabel: "Explore Our Culture →", primaryHref: "/en/profile", secondaryLabel: "Follow the Journey →", secondaryHref: "/en/blog", meta: [] };

export function HeroSlider({ featuredShow, locale = "id" }: { featuredShow?: FeaturedShow; locale?: "id" | "en" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const defaultSlide = locale === "en" ? enDefaultSlide : idDefaultSlide;
   const dynamicFirst: Slide = featuredShow ? { kicker: `${locale === "en" ? "Upcoming show" : "Upcoming show"} · ${locale === "en" ? featuredShow.noteEn : featuredShow.noteId}`, title: <>{locale === "en" ? featuredShow.titleEn : featuredShow.titleId}</>, description: locale === "en" ? featuredShow.descriptionEn : featuredShow.descriptionId, image: featuredShow.coverImage || featuredShow.posterImage || defaultImage, primaryLabel: locale === "en" ? "View show details" : "Lihat detail pentas", primaryHref: locale === "en" ? "/en/shows/tri-swara-atma" : "/pentas/tri-swara-atma", secondaryLabel: locale === "en" ? "Partner with us" : "Bicarakan Kerjasama", secondaryHref: locale === "en" ? "/en/partnership" : "/kerjasama", meta: [[locale === "en" ? featuredShow.noteEn : featuredShow.noteId, locale === "en" ? "Performance date" : "Tanggal pertunjukan"], [featuredShow.venue, locale === "en" ? "Venue" : "Lokasi"]] } : (locale === "en" ? enDefaultSlide : idDefaultSlide);
  const slides = featuredShow ? [dynamicFirst, defaultSlide] : [defaultSlide];
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (!featuredShow) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [featuredShow, locale]);

  return <section className="hero hero-slider" aria-roledescription="carousel" aria-label={locale === "en" ? "Nur Sekar Kinanti highlights" : "Sorotan Nur Sekar Kinanti"}><div className="hero-image-wrap" key={`${activeIndex}-${activeSlide.image}`}><img className="hero-slide-image" src={activeSlide.image} alt="" aria-hidden="true" /></div><div className="hero-inner"><p className="hero-kicker">{activeSlide.kicker}</p><h1>{activeSlide.title}</h1><p className="lead">{activeSlide.description}</p><div className="hero-actions"><Link className="button button-solid" href={activeSlide.primaryHref}>{activeSlide.primaryLabel}</Link><Link className="button button-ghost" href={activeSlide.secondaryHref}>{activeSlide.secondaryLabel}</Link></div><div className="hero-meta">{activeSlide.meta.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div><>{featuredShow ? <div className="hero-controls" aria-label={locale === "en" ? "Slide navigation" : "Navigasi slide"}><button className="hero-arrow" type="button" aria-label={locale === "en" ? "Previous slide" : "Slide sebelumnya"} onClick={() => setActiveIndex((current) => (current + slides.length - 1) % slides.length)}>←</button><button className="hero-arrow" type="button" aria-label={locale === "en" ? "Next slide" : "Slide berikutnya"} onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}>→</button></div> : null}</></section>;
}
