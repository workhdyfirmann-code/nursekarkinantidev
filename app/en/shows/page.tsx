import Link from "next/link";
import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { pageVisuals } from "@/lib/content";
import { getShows, getUpcomingShow } from "@/lib/public-content";

export const metadata = { title: "Shows" };

export default async function EnglishShowsPage() {
  const [shows, upcoming] = await Promise.all([getShows(), getUpcomingShow()]);
  const archiveShows = shows.filter((show) => show.status !== "upcoming");
  const duration = upcoming?.durationMinutes ? `${Math.floor(upcoming.durationMinutes / 60)} hours${upcoming.durationMinutes % 60 ? ` ${upcoming.durationMinutes % 60} minutes` : ""}` : "-";
  const image = upcoming?.coverImage || upcoming?.posterImage || pageVisuals.show[0].src;

  return (
    <>
      <EditorialPageIntro
        eyebrow="Shows / 02"
        title="Works that remain after the stage falls silent."
        description="Explore upcoming performances and the archive of Nur Sekar Kinanti."
      />
      {upcoming ? (
      <section className="section">
        <div className="container">
          <article className="editorial-featured-post editorial-show-feature">
            <img src={image} alt={upcoming.titleEn} />
            <div>
              <p className="eyebrow">Upcoming performance · {upcoming.noteEn}</p>
              <h2>{upcoming.titleEn}</h2>
              <p>{upcoming.descriptionEn}</p>
              <dl className="editorial-show-meta">
                <div><dt>Date</dt><dd>{upcoming.noteEn}</dd></div>
                <div><dt>Venue</dt><dd>{upcoming.venue}</dd></div>
                <div><dt>Duration</dt><dd>{duration}</dd></div>
                <div><dt>Capacity</dt><dd>{upcoming.capacity || "-"} audience</dd></div>
              </dl>
              <Link className="text-link" href={`/en/shows/${upcoming.slugEn}`}>View show details</Link>
            </div>
          </article>
        </div>
      </section>
      ) : null}
      <section className="section section-dark">
        <div className="container">
          <div className="editorial-archive-heading">
            <h2>A record of performance.</h2>
            <p>Documentation of works performed by Nur Sekar Kinanti and its artistic network.</p>
          </div>
          <div className="show-gallery">
            {archiveShows.map((show) => <Link className="show-tile" href={`/en/shows/${show.slugEn}`} key={show.slugEn}><img className="show-tile-image" src={show.coverImage || show.posterImage || pageVisuals.show[0].src} alt={show.titleEn} /><span className="show-tile-copy"><strong>{show.titleEn}</strong><span>{show.year} · {show.venue}</span><span>{show.note}</span></span></Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
