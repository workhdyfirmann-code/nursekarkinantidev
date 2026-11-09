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
  const show = await getShowBySlug(slug, "en");
  return { title: show?.title ?? "Shows", description: show?.description };
}

export default async function EnglishShowDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [show, shows] = await Promise.all([getShowBySlug(slug, "en"), getShows()]);
  if (!show) notFound();
  const related = shows.filter((item) => item.slugEn !== show.slug).slice(0, 3);
  const image = show.coverImage || show.posterImage || pageVisuals.show[0].src;
  const duration = show.durationMinutes ? `${Math.floor(show.durationMinutes / 60)} hours${show.durationMinutes % 60 ? ` ${show.durationMinutes % 60} minutes` : ""}` : "-";

  return (
    <>
      <EditorialPageIntro eyebrow={`Shows / ${show.year}`} title={show.title} description={show.description} />
      <section className="section">
        <div className="container editorial-featured-post editorial-show-feature">
          <img src={image} alt={show.title} />
          <div>
            <p className="eyebrow">Show information</p>
            <dl className="editorial-show-meta">
              <div><dt>Venue</dt><dd>{show.venue}</dd></div>
              <div><dt>Time</dt><dd>{show.note}</dd></div>
              <div><dt>Duration</dt><dd>{duration}</dd></div>
              <div><dt>Capacity</dt><dd>{show.capacity || "-"} audience</dd></div>
              <div><dt>Status</dt><dd>{show.status === "upcoming" ? "Upcoming" : "Archive"}</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container detail-copy">
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: show.content }} />
          <SponsorLogoGrid showId={show.id} />
          <Link className="text-link" href="/en/shows">Back to shows</Link>
        </div>
      </section>
      {related.length ? <section className="section section-dark"><div className="container"><div className="editorial-archive-heading"><h2>More performances.</h2><p>Explore other works from the Nur Sekar Kinanti performance archive.</p></div><div className="show-gallery">{related.map((item) => <Link className="show-tile" href={`/en/shows/${item.slugEn}`} key={item.slugEn}><img className="show-tile-image" src={item.coverImage || item.posterImage || pageVisuals.show[0].src} alt={item.titleEn} /><span className="show-tile-copy"><strong>{item.titleEn}</strong><span>{item.year} · {item.venue}</span><span>{item.note}</span></span></Link>)}</div></div></section> : null}
    </>
  );
}
