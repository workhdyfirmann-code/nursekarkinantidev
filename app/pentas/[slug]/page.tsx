import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { SponsorLogoGrid } from "@/components/sponsor-logo-grid";
import { pageVisuals } from "@/lib/content";
import { getShowBySlug, getShows } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const show = await getShowBySlug(slug, "id");
  return { title: show?.title ?? "Pentas", description: show?.description };
}

export default async function ShowDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [show, shows] = await Promise.all([getShowBySlug(slug, "id"), getShows()]);
  if (!show) notFound();
  const related = shows.filter((item) => item.slugId !== show.slug).slice(0, 3);
  const image = show.coverImage || show.posterImage || pageVisuals.show[0].src;
  const duration = show.durationMinutes ? `${Math.floor(show.durationMinutes / 60)} jam${show.durationMinutes % 60 ? ` ${show.durationMinutes % 60} menit` : ""}` : "-";

  return (
    <>
      <EditorialPageIntro eyebrow={`Pentas / ${show.year}`} title={show.title} description={show.description} />
      <section className="section">
        <div className="container editorial-featured-post editorial-show-feature">
          <img src={image} alt={show.title} />
          <div>
            <p className="eyebrow">Informasi pentas</p>
            <dl className="editorial-show-meta">
              <div><dt>Lokasi</dt><dd>{show.venue}</dd></div>
              <div><dt>Waktu</dt><dd>{show.note}</dd></div>
              <div><dt>Durasi</dt><dd>{duration}</dd></div>
              <div><dt>Kapasitas</dt><dd>{show.capacity ? `${show.capacity} penonton` : "-"}</dd></div>
              <div><dt>Status</dt><dd>{show.status === "upcoming" ? "Akan datang" : "Arsip pertunjukan"}</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container detail-copy">
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: show.content }} />
          <SponsorLogoGrid showId={show.id} />
          <Link className="text-link" href="/pentas">Kembali ke semua pentas</Link>
        </div>
      </section>
      {related.length ? <section className="section section-dark"><div className="container"><div className="editorial-archive-heading"><h2>Pentas lainnya.</h2><p>Jelajahi karya lain dari arsip pertunjukan Nur Sekar Kinanti.</p></div><div className="show-gallery">{related.map((item) => <Link className="show-tile" href={`/pentas/${item.slugId}`} key={item.slugId}><img className="show-tile-image" src={item.coverImage || item.posterImage || pageVisuals.show[0].src} alt={item.titleId} /><span className="show-tile-copy"><strong>{item.titleId}</strong><span>{item.year} · {item.venue}</span><span>{item.note}</span></span></Link>)}</div></div></section> : null}
    </>
  );
}
