import Link from "next/link";
import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { pageVisuals } from "@/lib/content";
import { getShows, getUpcomingShow } from "@/lib/public-content";

export const metadata = { title: "Pentas" };

export default async function PentasPage() {
  const [shows, upcoming] = await Promise.all([getShows(), getUpcomingShow()]);
  const archiveShows = shows.filter((show) => show.status !== "upcoming");
  const duration = upcoming?.durationMinutes ? `${Math.floor(upcoming.durationMinutes / 60)} jam${upcoming.durationMinutes % 60 ? ` ${upcoming.durationMinutes % 60} menit` : ""}` : "-";
  const image = upcoming?.coverImage || upcoming?.posterImage || pageVisuals.show[0].src;

  return (
    <>
      <EditorialPageIntro
        eyebrow="Pentas / 02"
        title="Karya yang tinggal setelah panggung sunyi."
        description="Jelajahi pergelaran mendatang dan arsip karya Nur Sekar Kinanti."
      />
      {upcoming ? (
      <section className="section">
        <div className="container">
          <article className="editorial-featured-post editorial-show-feature">
            <img src={image} alt={upcoming.titleId} />
            <div>
              <p className="eyebrow">Pentas mendatang · {upcoming.noteId}</p>
              <h2>{upcoming.titleId}</h2>
              <p>{upcoming.descriptionId}</p>
              <dl className="editorial-show-meta">
                <div><dt>Tanggal</dt><dd>{upcoming.noteId}</dd></div>
                <div><dt>Lokasi</dt><dd>{upcoming.venue}</dd></div>
                <div><dt>Durasi</dt><dd>{duration}</dd></div>
                <div><dt>Kapasitas</dt><dd>{upcoming.capacity || "-"} penonton</dd></div>
              </dl>
              <Link className="text-link" href={`/pentas/${upcoming.slugId}`}>Baca detail pergelaran</Link>
            </div>
          </article>
        </div>
      </section>
      ) : null}
      <section className="section section-dark">
        <div className="container">
          <div className="editorial-archive-heading">
            <h2>Jejak pertunjukan.</h2>
            <p>Dokumentasi karya yang pernah dipentaskan oleh Nur Sekar Kinanti dan jejaring artistiknya.</p>
          </div>
          <div className="show-gallery">
            {archiveShows.map((show) => <Link className="show-tile" href={`/pentas/${show.slugId}`} key={show.slugId}><img className="show-tile-image" src={show.coverImage || show.posterImage || pageVisuals.show[0].src} alt={show.titleId} /><span className="show-tile-copy"><strong>{show.titleId}</strong><span>{show.year} · {show.venue}</span><span>{show.note}</span></span></Link>)}
          </div>
          <Link className="text-link" href="/kerjasama">Dukung produksi berikutnya</Link>
        </div>
      </section>
    </>
  );
}
