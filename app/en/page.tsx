import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { SectionHeading } from "@/components/section-heading";
import { getPublishedPosts, getUpcomingShow } from "@/lib/public-content";

export const metadata = { title: "Classical Javanese Dance" };

const aboutImage = "/images/editorial/about-dancer.jpg";

export default async function EnglishHomePage() {
  const [posts, upcomingShow] = await Promise.all([getPublishedPosts(), getUpcomingShow()]);
  return <><HeroSlider featuredShow={upcomingShow} locale="en" /><section className="editorial-section editorial-about"><span className="editorial-number">01 / ABOUT THE STUDIO</span><div className="editorial-copy"><p className="eyebrow">About the studio</p><h2>Keeping the spirit of tradition,<br /><em>welcoming what comes next.</em></h2><p>Nur Sekar Kinanti is a space for Indonesian dance to grow—a place where tradition is cared for with respect, interpreted with courage, and passed on with love.</p><p>Through education, new works, and cross-cultural collaboration, we bring the heritage of the archipelago into a living language for today’s generation.</p><Link className="text-link" href="/en/profile">Meet us more closely</Link></div><div className="editorial-image"><img src={aboutImage} alt="Dancer in a traditional cultural performance" /><span>Photo: Unsplash</span></div></section><section className="section section-dark"><div className="container"><SectionHeading eyebrow="The Blog" title="Stories behind the movement." /><div className="journal-grid">{posts.slice(0, 3).map((post) => <article className="journal-card" key={post.slugEn}><p className="eyebrow">{post.category}</p><h3><Link href={`/en/blog/${post.slugEn}`}>{post.titleEn}</Link></h3><p>{post.excerptEn}</p></article>)}</div></div></section></>;
}
