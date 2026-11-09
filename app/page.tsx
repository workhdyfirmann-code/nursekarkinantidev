import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { IntroOverlay } from "@/components/intro-overlay";
import { galleryImages, pageVisuals } from "@/lib/content";
import { getPublishedPosts, getUpcomingShow } from "@/lib/public-content";

export default async function HomePage() {
  const [posts, upcomingShow] = await Promise.all([getPublishedPosts(), getUpcomingShow()]);
  const heroImage = upcomingShow?.coverImage || upcomingShow?.posterImage || "/images/poster-tsa.jpeg";
  return <>
    <IntroOverlay />
    <HeroSlider featuredShow={upcomingShow} />
    <section className="editorial-section editorial-about">
      <span className="editorial-number">01 / TENTANG SANGGAR</span>
      <div className="editorial-copy"><p className="eyebrow">Tentang Sanggar</p><h2>Menjaga jiwa tradisi,<br /><em>menyambut masa depan.</em></h2><p>Nur Sekar Kinanti adalah ruang tumbuh bagi seni tari Indonesia—tempat tradisi dirawat dengan hormat, ditafsirkan dengan keberanian, dan diwariskan dengan cinta.</p><p>Melalui pendidikan, penciptaan karya, dan kolaborasi lintas budaya, kami menghadirkan warisan Nusantara sebagai bahasa yang hidup dan relevan bagi generasi hari ini.</p><Link className="text-link" href="/profil">Mengenal kami lebih dekat</Link></div><div className="editorial-image"><img className="home-about-image" src="/images/tentang-sanggar2.png" alt="Tentang Sanggar Nur Sekar Kinanti" /><span>Nur Sekar Kinanti</span></div>
    </section>
    <section className="editorial-manifesto"><p className="editorial-symbol">✦</p><blockquote>&ldquo;Tari bukan sekadar gerak. Ia adalah ingatan, <em>identitas,</em> dan doa yang diwariskan.&rdquo;</blockquote><p className="eyebrow">Filosofi Nur Sekar Kinanti</p></section>
      <section className="editorial-section editorial-programs"><div className="editorial-section-heading"><div><p className="eyebrow">02 / RUANG BERKARYA</p><h2>Warisan dalam<br /><em>setiap gerak.</em></h2></div><p>Kami menciptakan ekosistem seni yang menghubungkan pendidikan, panggung, dan kolaborasi.</p></div><div className="editorial-program-grid"><Link href="/galeri"><span>01</span><strong>Galeri Visual</strong><p>Fragmen karya, pertunjukan, dan suasana artistik Nur Sekar Kinanti.</p></Link><Link href="/pentas"><span>02</span><strong>Pertunjukan & Karya</strong><p>Produksi artistik yang menghadirkan keindahan tradisi dalam bahasa panggung kontemporer.</p></Link><Link href="/kerjasama"><span>03</span><strong>Kolaborasi Budaya</strong><p>Ruang perjumpaan bagi brand, institusi, pemerintah, dan komunitas untuk merawat warisan.</p></Link></div></section>
    {upcomingShow ? (
    <section className="editorial-feature"><img src={heroImage} alt={upcomingShow.titleId} /><div className="editorial-feature-overlay" /><div className="editorial-feature-copy"><p className="eyebrow">03 / KARYA TERBARU</p><h2>{upcomingShow.titleId}</h2><p>{upcomingShow.descriptionId}</p><Link className="button button-gold" href={`/pentas/${upcomingShow.slugId}`}>Lihat karya <span>→</span></Link></div></section>
    ) : null}
    <section className="editorial-section editorial-blog"><div className="editorial-section-heading"><div><p className="eyebrow">04 / CATATAN</p><h2>Gagasan yang<br /><em>terus bergerak.</em></h2></div><Link className="text-link" href="/blog">Lihat semua tulisan</Link></div><div className="editorial-blog-grid">{posts.slice(0, 3).map((post) => <article key={post.slugId}>{post.thumbnailImage ? <img src={post.thumbnailImage} alt={post.titleId} /> : null}<p className="eyebrow">{post.category}</p><h3><Link href={`/blog/${post.slugId}`}>{post.titleId}</Link></h3><p>{post.excerptId}</p></article>)}</div></section>
    <section className="editorial-contact"><p className="editorial-symbol">✦</p><p className="eyebrow">05 / BERGABUNG</p><h2>Menjadi bagian dari<br /><em>perjalanan budaya.</em></h2><Link className="button button-gold" href="/kerjasama">Jelajahi kerjasama <span>→</span></Link></section>
  </>;
}
