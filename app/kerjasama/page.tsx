import Link from "next/link";
import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { SectionHeading } from "@/components/section-heading";
import { SponsorLogoGrid } from "@/components/sponsor-logo-grid";
import { pageVisuals, sponsorshipBenefits, sponsorshipPackages, sponsorshipProof, socialLinks } from "@/lib/content";
import { getUpcomingShow } from "@/lib/public-content";

export const metadata = { title: "Kerjasama" };

const collaborationTypes = [
  ["Brand sponsor", "Dukungan dana dengan benefit eksposur dan brand association."],
  ["Government partner", "Kolaborasi budaya, hibah, program edukasi, dan diplomasi budaya."],
  ["Media partner", "Perluasan jangkauan melalui publikasi, press release, dan liputan."],
  ["In-kind partner", "Dukungan produk, jasa, venue, wardrobe, konsumsi, atau produksi."],
];

export default async function KerjasamaPage() {
  const upcoming = await getUpcomingShow();
  const sponsorImage = upcoming?.coverImage || upcoming?.posterImage || pageVisuals.show[0].src;
  return <>
    <EditorialPageIntro eyebrow="Partnership / Tri Swara Atma" title={<>Jadikan brand Anda<br /><em>bagian dari momentum budaya.</em></>} description="Tri Swara Atma bukan sekadar pertunjukan. Ini adalah perjalanan artistik yang mempertemukan warisan Jawa, seniman lintas generasi, dan audiens urban yang mencari pengalaman bermakna." />
    <SponsorLogoGrid />
    {upcoming ? (
    <section className="section section-purple">
      <div className="container sponsor-hero-grid">
        <img className="sponsor-hero-image" src={sponsorImage} alt={upcoming.titleId} />
        <div><p className="eyebrow">Upcoming cultural moment</p><h2>{upcoming.titleId}</h2><p className="lead">{upcoming.noteId} · {upcoming.venue} · {upcoming.capacity || "-"} penonton</p><div className="hero-actions"><a className="button button-solid" href="/downloads/PRPOSAL_TSA_FULL_UPSCALE.pdf" download>Download proposal</a><a className="button button-ghost" href={socialLinks.whatsapp}>Bicarakan kerjasama</a></div></div>
      </div>
    </section>
    ) : null}
    <section className="section">
      <div className="container"><SectionHeading eyebrow="Why this partnership matters" title="Brand association yang punya makna." description="Dukungan sponsor mengubah sebuah produksi seni menjadi ruang perjumpaan: antara tradisi dan masa kini, antara seniman dan publik, antara brand dan nilai yang ingin dibawa." /><div className="sponsor-value-grid">{sponsorshipBenefits.map(([title, text]) => <article className="sponsor-value-card" key={title}><p className="eyebrow">{title}</p><p>{text}</p></article>)}</div></div>
    </section>
    <section className="section section-dark">
      <div className="container"><SectionHeading eyebrow="The opportunity" title="Angka yang memberi konteks." /><div className="sponsor-proof-grid">{sponsorshipProof.map(([value, label, note]) => <div className="sponsor-proof" key={label}><strong>{value}</strong><span>{label}</span><small>{note}</small></div>)}</div></div>
    </section>
    <section className="section">
      <div className="container"><SectionHeading eyebrow="Sponsorship packages" title="Pilih cara hadir di dalam karya." description="Paket dapat dikustomisasi. Dukungan dana, produk, jasa, dan bentuk barter dapat dibicarakan bersama." /><div className="sponsor-package-grid">{sponsorshipPackages.map((item) => <article className="sponsor-package" key={item.name}><div className="sponsor-package-head"><span className="eyebrow">{item.note}</span><h3>{item.name}</h3><strong>{item.amount}</strong></div><ul>{item.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul><a className="text-link" href={socialLinks.whatsapp}>Bahas paket</a></article>)}</div></div>
    </section>
    <section className="section">
      <div className="container"><SectionHeading eyebrow="Ways to collaborate" title="Tidak semua dukungan harus berbentuk dana." /><div className="sponsor-value-grid">{collaborationTypes.map(([title, description]) => <article className="sponsor-value-card" key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></div>
    </section>
    <section className="section section-purple">
      <div className="container sponsor-contact"><div><p className="eyebrow">Start the conversation</p><h2>Proposal lengkap siap dibaca.</h2><p className="lead">Hubungi tim Nur Sekar Kinanti untuk menyesuaikan benefit, bentuk dukungan, dan kebutuhan komunikasi brand Anda.</p></div><div className="sponsor-contact-card"><strong>Prasanti Andrini</strong><span>Pimpinan Sanggar · Producer Executive</span><a href={socialLinks.email}>triswaraatma@gmail.com</a><a href={socialLinks.whatsapp}>WhatsApp · 0816 116 1899</a><a className="button button-solid" href="/downloads/PRPOSAL_TSA_FULL_UPSCALE.pdf" download>Download proposal PDF</a></div></div>
    </section>
  </>;
}
