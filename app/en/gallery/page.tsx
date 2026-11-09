import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { galleryImages } from "@/lib/content";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return <><EditorialPageIntro eyebrow="Gallery / 04" title={<>A visual space<br /><em>for Nur Sekar Kinanti.</em></>} description="Fragments of movement, works, and atmosphere from Nur Sekar Kinanti&apos;s artistic journey." /><section className="editorial-section gallery-page-section"><div className="editorial-section-heading"><div><p className="eyebrow">Visual traces</p><h2>Tradition that<br /><em>keeps moving.</em></h2></div><p>Discover works and performance atmospheres through Nur Sekar Kinanti&apos;s visual archive.</p></div><div className="gallery-grid gallery-page-grid">{galleryImages.map((image) => <figure className={`gallery-item ${image.className}`} key={image.src}><img src={image.src} alt={image.alt} /></figure>)}</div></section></>;
}
