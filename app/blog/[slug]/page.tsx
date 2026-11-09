import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { pageVisuals } from "@/lib/content";
import { getPostBySlug, getPublishedPosts } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "id");
  return { title: post?.title ?? "Blog", description: post?.excerpt };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPostBySlug(slug, "id"), getPublishedPosts()]);
  if (!post) notFound();
  const index = posts.findIndex((item) => item.slugId === slug);
  const previous = index > 0 ? posts[index - 1] : null;
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;
  const related = posts.filter((item) => item.slugId !== slug).slice(0, 3);
  const readingTime = Math.max(1, post.content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length / 200);
  const shareUrl = encodeURIComponent(`https://nursekarkinanti.id/blog/${post.slug}`);
  const image = post.coverImage || post.thumbnailImage || pageVisuals.journal[0].src;

  return (
    <>
      <EditorialPageIntro eyebrow={`Blog / ${post.category}`} title={post.title} description={post.excerpt} />
      <article className="section article-page">
        <div className="container detail-copy">
          <div className="article-meta"><span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "Nur Sekar Kinanti"}</span><span>{Math.ceil(readingTime)} menit baca</span></div>
          <figure className="blog-cover-frame"><img className="blog-cover" src={image} alt={post.title} /><figcaption>Dokumentasi Nur Sekar Kinanti</figcaption></figure>
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="article-share"><span>Bagikan artikel</span><a href={`https://wa.me/?text=${shareUrl}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer">Facebook</a></div>
          <nav className="article-nav" aria-label="Navigasi artikel">{previous ? <Link href={`/blog/${previous.slugId}`}><small>Sebelumnya</small><strong>{previous.titleId}</strong></Link> : <span />}{next ? <Link href={`/blog/${next.slugId}`}><small>Berikutnya</small><strong>{next.titleId}</strong></Link> : <span />}</nav>
          <Link className="text-link" href="/blog">Kembali ke Blog</Link>
        </div>
      </article>
      {related.length ? <section className="section section-dark"><div className="container"><div className="editorial-archive-heading"><h2>Artikel terkait.</h2><p>Catatan lain dari perjalanan Nur Sekar Kinanti.</p></div><div className="editorial-post-grid">{related.map((item, relatedIndex) => <article className="editorial-post-card" key={item.slugId}><img src={item.thumbnailImage || item.coverImage || pageVisuals.journal[relatedIndex % pageVisuals.journal.length].src} alt={item.titleId} /><p className="eyebrow">{item.category}</p><h3><Link href={`/blog/${item.slugId}`}>{item.titleId}</Link></h3><Link className="text-link" href={`/blog/${item.slugId}`}>Baca artikel</Link></article>)}</div></div></section> : null}
    </>
  );
}
