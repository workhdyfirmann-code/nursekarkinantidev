"use client";

import { usePathname } from "next/navigation";

type SponsorLogo = { id: string; name: string; logoImage: string };

// The local files are ordered by their original names after normalization.
const localSponsorLogos: SponsorLogo[] = [
  { id: "header-kanan", name: "Header kanan", logoImage: "/images/sponsors/header-kanan.png" },
  { id: "header-kiri", name: "Header kiri", logoImage: "/images/sponsors/header-kiri.png" },
  ...Array.from({ length: 16 }, (_, index) => ({
    id: `logo-${index + 1}`,
    name: `Sponsor ${index + 1}`,
    logoImage: `/images/sponsors/logo-${index + 1}.png`,
  })),
  { id: "media-partner", name: "VOX Stream", logoImage: "/images/sponsors/Bold_Voxstream.png" },
];

const sponsorLogos = localSponsorLogos.filter((logo) => logo.id.startsWith("logo-"));
const headerLogos = localSponsorLogos.slice(0, 2);
const mediaPartner = localSponsorLogos.find((logo) => logo.id === "media-partner");

function Logo({ logo }: { logo: SponsorLogo }) {
  return <div className="sponsor-logo"><img src={logo.logoImage} alt={logo.name} loading="lazy" /></div>;
}

export function SponsorLogoGrid({ showId }: { showId?: string | null }) {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const carouselLogos = [...sponsorLogos, ...sponsorLogos];

  return showId !== undefined ? <div className="show-sponsor-block"><p className="eyebrow">{isEnglish ? "Show supporters" : "Pendukung pentas"}</p><h2>{isEnglish ? <>Presented with<br /><em>cultural collaborators.</em></> : <>Dipersembahkan bersama<br /><em>kolaborator budaya.</em></>}</h2><div className="sponsor-logo-grid">{sponsorLogos.map((logo) => <Logo key={logo.id} logo={logo} />)}</div></div> : <section className="sponsor-strip"><div className="container">
    <div className="sponsor-intro"><p className="eyebrow">{isEnglish ? "Supporters and collaborators" : "Pendukung dan kolaborator"}</p><h2>{isEnglish ? "Together, keeping culture alive." : "Bersama menjaga budaya tetap hidup."}</h2></div>
    <div className="sponsor-header-row"><div className="sponsor-header-logos">{headerLogos.map((logo) => <Logo key={logo.id} logo={logo} />)}</div></div>
    <div className="sponsor-carousel-row"><h3>{isEnglish ? "Sponsors" : "Sponsor"}</h3><div className="sponsor-carousel" aria-label={isEnglish ? "Sponsors" : "Sponsor acara"}><div className="sponsor-carousel-track">{carouselLogos.map((logo, index) => <Logo key={`${logo.id}-${index}`} logo={logo} />)}</div></div></div>
    <div className="sponsor-media-row"><p className="eyebrow">Media partner</p>{mediaPartner ? <div className="sponsor-media-logo"><Logo logo={mediaPartner} /></div> : null}</div>
  </div></section>;
}
