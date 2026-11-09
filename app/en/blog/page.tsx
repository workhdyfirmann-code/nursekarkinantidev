import Link from "next/link";
import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { pageVisuals } from "@/lib/content";
import { getPublishedPosts } from "@/lib/public-content";

export const metadata = { title: "Blog" };

const englishCategories: Record<string, string> = {
  Berita: "News",
  Kegiatan: "Activities",
  Budaya: "Culture",
  Pengumuman: "Announcements",
};

export default async function EnglishBlogPage() {
  const posts = await getPublishedPosts();
  const featured = posts[0];
  const categories = [...new Set(posts.map((post) => englishCategories[post.category] || post.category))];
  const featuredImage = featured?.coverImage || featured?.thumbnailImage || pageVisuals.journal[0].src;

  return (
    <>
      <EditorialPageIntro
        eyebrow="Blog / 05"
        title="Stories behind the movement."
        description="News, culture, process, and the people shaping Nur Sekar Kinanti."
      />
      <section className="section">
        <div className="container">
          {featured ? (
            <article className="editorial-featured-post">
              <img src={featuredImage} alt={featured.titleEn} />
              <div>
                <p className="eyebrow">Editor's pick · {englishCategories[featured.category] || featured.category}</p>
                <h2>{featured.titleEn}</h2>
                <p>{featured.excerptEn}</p>
                <Link className="text-link" href={`/en/blog/${featured.slugEn}`}>Read article</Link>
              </div>
            </article>
          ) : null}
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <div className="editorial-category-strip" aria-label="Article categories">
            {categories.map((category) => <span key={category}>{category}</span>)}
          </div>
          <div className="editorial-archive-heading">
            <h2>Journal of the journey.</h2>
            <p>Notes from rehearsal rooms, stages, and the work of keeping culture alive.</p>
          </div>
          <div className="editorial-post-grid">
            {posts.map((post, index) => (
              <article className="editorial-post-card" key={post.slugEn}>
                <img src={post.thumbnailImage || post.coverImage || pageVisuals.journal[index % pageVisuals.journal.length].src} alt={post.titleEn} />
                <p className="eyebrow">{englishCategories[post.category] || post.category} · {String(index + 1).padStart(2, "0")}</p>
                <h3><Link href={`/en/blog/${post.slugEn}`}>{post.titleEn}</Link></h3>
                <p>{post.excerptEn}</p>
                <Link className="text-link" href={`/en/blog/${post.slugEn}`}>Read article</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container">
          <p className="eyebrow">Process fragments</p>
          <h2>Listen to the room before the stage opens.</h2>
          <div className="visual-strip">{pageVisuals.journal.map((visual) => <figure className="visual-card" key={visual.src}><img src={visual.src} alt={visual.alt} /></figure>)}</div>
        </div>
      </section>
    </>
  );
}
