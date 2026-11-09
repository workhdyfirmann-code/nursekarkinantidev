"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SponsorLogoGrid } from "@/components/sponsor-logo-grid";
import { nskWebsite, socialLinks, tsaSocialLinks } from "@/lib/content";

export function SiteFooter() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const isPartnershipPage = pathname === "/kerjasama" || pathname === "/en/partnership";
  const prefix = isEnglish ? "/en" : "";
  return <footer className="site-footer">{isPartnershipPage ? null : <SponsorLogoGrid />}<div className="footer-grid container"><div><p className="eyebrow">Nur Sekar Kinanti</p><h2>{isEnglish ? "Tradition keeps finding new forms." : "Tradisi yang terus menemukan bentuk."}</h2><p className="muted">{isEnglish ? "A space for preserving, learning, and developing classical Javanese dance in the Surakarta tradition." : "Ruang pelestarian, pembelajaran, dan pengembangan tari Jawa klasik gaya Surakarta."}</p></div><div><p className="eyebrow">{isEnglish ? "Explore" : "Jelajahi"}</p><div className="footer-links"><Link href={isEnglish ? "/en/profile" : "/profil"}>{isEnglish ? "Profile" : "Profil"}</Link><Link href={isEnglish ? "/en/shows" : "/pentas"}>{isEnglish ? "Shows" : "Pentas"}</Link><Link href={isEnglish ? "/en/partnership" : "/kerjasama"}>{isEnglish ? "Partnership" : "Kerjasama"}</Link><Link href={isEnglish ? "/en/gallery" : "/galeri"}>{isEnglish ? "Gallery" : "Galeri"}</Link><Link href={isEnglish ? "/en/blog" : "/blog"}>{isEnglish ? "Blog" : "Blog"}</Link></div></div><div><p className="eyebrow">Medsos TSA</p><div className="footer-links">{tsaSocialLinks.map(([label, href]) => <a href={href} target="_blank" rel="noreferrer" key={label}>{label}</a>)}</div></div><div><p className="eyebrow">{isEnglish ? "Contact" : "Website NSK"}</p><div className="footer-links"><a href={nskWebsite} target="_blank" rel="noreferrer">nursekarkinanti.id</a><a href={socialLinks.instagram} target="_blank" rel="noreferrer">Instagram @nursekarkinanti</a><a href={socialLinks.email}>triswaraatma@gmail.com</a><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp dummy</a></div></div></div><div className="footer-bottom container"><span>© 2026 Nur Sekar Kinanti</span><span>Jakarta · Surakarta</span></div></footer>;
}
