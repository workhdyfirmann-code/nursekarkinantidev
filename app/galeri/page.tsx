import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { galleryImages } from "@/lib/content";

export const metadata = { title: "Galeri" };

export default function GaleriPage() {
  return <><EditorialPageIntro eyebrow="Galeri / 04" title={<>Ruang visual<br /><em>Nur Sekar Kinanti.</em></>} description="Fragmen gerak, karya, dan suasana yang merekam perjalanan seni tari Nur Sekar Kinanti." /><section className="editorial-section gallery-page-section"><div className="editorial-section-heading"><div><p className="eyebrow">Jejak visual</p><h2>Tradisi yang<br /><em>terus bergerak.</em></h2></div><p>Menelusuri karya dan suasana pertunjukan melalui arsip visual Nur Sekar Kinanti.</p></div><div className="gallery-grid gallery-page-grid">{galleryImages.map((image) => <figure className={`gallery-item ${image.className}`} key={image.src}><img src={image.src} alt={image.alt} /></figure>)}</div></section></>;
}
