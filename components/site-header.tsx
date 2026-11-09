"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { englishJournalPosts, journalPosts } from "@/lib/content";

const navigationId = [["Profil", "/profil"], ["Pentas", "/pentas"], ["Kerjasama", "/kerjasama"], ["Galeri", "/galeri"], ["Blog", "/blog"]] as const;
const navigationEn = [["Profile", "/en/profile"], ["Shows", "/en/shows"], ["Partnership", "/en/partnership"], ["Gallery", "/en/gallery"], ["Blog", "/en/blog"]] as const;
const routeMap: Record<string, string> = { "/": "/en", "/profil": "/en/profile", "/pentas": "/en/shows", "/kerjasama": "/en/partnership", "/galeri": "/en/gallery", "/blog": "/en/blog", "/en": "/", "/en/profile": "/profil", "/en/shows": "/pentas", "/en/partnership": "/kerjasama", "/en/gallery": "/galeri", "/en/blog": "/blog" };

function languageHref(pathname: string) {
  if (routeMap[pathname]) return routeMap[pathname];
  if (pathname.startsWith("/pentas/")) return `/en/shows/${pathname.slice("/pentas/".length)}`;
  if (pathname.startsWith("/en/shows/")) return `/pentas/${pathname.slice("/en/shows/".length)}`;
  if (pathname.startsWith("/blog/")) {
    const index = journalPosts.findIndex((post) => post.slug === pathname.slice("/blog/".length));
    return `/en/blog/${englishJournalPosts[index]?.slug || pathname.slice("/blog/".length)}`;
  }
  if (pathname.startsWith("/en/blog/")) {
    const index = englishJournalPosts.findIndex((post) => post.slug === pathname.slice("/en/blog/".length));
    return `/blog/${journalPosts[index]?.slug || pathname.slice("/en/blog/".length)}`;
  }
  return pathname.startsWith("/en") ? "/" : "/en";
}

export function SiteHeader() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const navigation = isEnglish ? navigationEn : navigationId;
  return <header className="site-header"><Link className="brand" href={isEnglish ? "/en" : "/"} aria-label={isEnglish ? "Nur Sekar Kinanti, home" : "Nur Sekar Kinanti, beranda"}><img className="brand-logo" src="/images/logo-nsk.png" alt="Nur Sekar Kinanti" /></Link><nav className="desktop-nav" aria-label={isEnglish ? "Main navigation" : "Navigasi utama"}>{navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link className="language-switch" href={languageHref(pathname)}>{isEnglish ? "ID" : "EN"}</Link></nav><details className="mobile-menu"><summary aria-label={isEnglish ? "Open menu" : "Buka menu"}>Menu</summary><nav aria-label={isEnglish ? "Mobile navigation" : "Navigasi mobile"}>{navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href={languageHref(pathname)}>{isEnglish ? "Versi Indonesia" : "English version"}</Link></nav></details></header>;
}
