import Link from "next/link";
import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { pageVisuals } from "@/lib/content";
import { getPublishedPosts } from "@/lib/public-content";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const featured = posts[0];
  const categories = [...new Set(posts.map((post) => post.category))];
  const featuredImage = featured?.coverImage || featured?.thumbnailImage || pageVisuals.journal[0].src;

  return (
    <>
      <EditorialPageIntro
        eyebrow="Blog / 05"
        title="Cerita di balik gerak."
        description="Berita, kegiatan, budaya, dan proses kreatif Nur Sekar Kinanti menuju panggung."
      />
      <section className="section">
        <div className="container">
          {featured ? (
            <article className="editorial-featured-post">
              <img src={featuredImage} alt={featured.titleId} />
              <div>
                <p className="eyebrow">Pilihan editor · {featured.category}</p>
                <h2>{featured.titleId}</h2>
                <p>{featured.excerptId}</p>
                <Link className="text-link" href={`/blog/${featured.slugId}`}>Baca artikel</Link>
              </div>
            </article>
          ) : null}
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <div className="editorial-category-strip" aria-label="Kategori artikel">
            {categories.map((category) => <span key={category}>{category}</span>)}
          </div>
          <div className="editorial-archive-heading">
            <h2>Jurnal perjalanan.</h2>
            <p>Catatan dari ruang latihan, panggung, dan proses merawat kebudayaan.</p>
          </div>
          <div className="editorial-post-grid">
            {posts.map((post, index) => (
              <article className="editorial-post-card" key={post.slugId}>
                <img src={post.thumbnailImage || post.coverImage || pageVisuals.journal[index % pageVisuals.journal.length].src} alt={post.titleId} />
                <p className="eyebrow">{post.category} · {String(index + 1).padStart(2, "0")}</p>
                <h3><Link href={`/blog/${post.slugId}`}>{post.titleId}</Link></h3>
                <p>{post.excerptId}</p>
                <Link className="text-link" href={`/blog/${post.slugId}`}>Baca artikel</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <p className="eyebrow">Fragmen proses</p>
          <h2>Dengarkan ruang sebelum panggung dibuka.</h2>
          <div className="visual-strip">{pageVisuals.journal.map((visual) => <figure className="visual-card" key={visual.src}><img src={visual.src} alt={visual.alt} /></figure>)}</div>
        </div>
      </section>
    </>
  );
}
