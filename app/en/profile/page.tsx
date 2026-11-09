import Link from "next/link";
import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { ProfileDocument } from "@/components/profile-document";
import { ProfileStory } from "@/components/profile-story";
import { ProfilePeople } from "@/components/profile-people";
import { ProfileWorks } from "@/components/profile-works";
import { ProfileMembership } from "@/components/profile-membership";
import { pageVisuals } from "@/lib/content";

export const metadata = { title: "Profile" };

export default function EnglishProfilePage() {
  return (
    <>
      <EditorialPageIntro eyebrow="Profile / 01" title={<>Caring for what is noble,<br /><em>opening space for what is new.</em></>} description="Nur Sekar Kinanti is a space for preserving, learning, and developing classical Javanese dance in the Surakarta tradition." />
      <section className="editorial-section editorial-about"><div className="editorial-copy"><p className="eyebrow">About the studio</p><h2>From a devotion<br /><em>to tradition.</em></h2><p>Sanggar Tari Nur Sekar Kinanti (NSK) is an arts organization focused on preserving, teaching, and developing classical Javanese dance—particularly the Surakarta style—while also exploring contemporary Javanese dance.</p><p>Founded and led by Prasanti Andrini, Nur Sekar Kinanti opens a space for education and inner cultivation through classical Javanese dance.</p><p>Based in Jakarta with a strong network in Surakarta, the studio brings dancers, traditional artists, academics, and communities into works rooted in tradition and relevant to today.</p></div><div className="editorial-image"><img src="/images/tentang-sanggar2.png" alt="About Nur Sekar Kinanti studio" /><span>Nur Sekar Kinanti visual</span></div></section>
      <ProfileStory english />
      <section className="editorial-manifesto"><p className="editorial-symbol">✦</p><blockquote>&ldquo;Dance is not only movement. It is memory, <em>identity,</em> and prayer passed down.&rdquo;</blockquote><p className="eyebrow">The Nur Sekar Kinanti philosophy</p></section>
      <section className="editorial-section editorial-mission"><div><p className="eyebrow">Vision</p><h2>Beauty with depth.</h2><p className="large-copy">To become a space for classical Javanese dance that brings beauty, meaning, and reflection into human life.</p></div><div><p className="eyebrow">Mission</p><div className="detail-list"><div><dt>01</dt><dd>Preserve and develop classical Javanese dance.</dd></div><div><dt>02</dt><dd>Share philosophical values through performance.</dd></div><div><dt>03</dt><dd>Create opportunities for artists across generations.</dd></div><div><dt>04</dt><dd>Build collaborations that expand public appreciation.</dd></div></div></div></section>
      <ProfilePeople english />
      <ProfileWorks english />
      <ProfileMembership english />
      <section className="editorial-page-cta"><div><h2>Meet the work<br /><em>more closely.</em></h2><p>Explore performances and visual works by Nur Sekar Kinanti.</p></div><div className="editorial-page-cta-actions"><Link className="button button-gold" href="/en/shows">View Shows →</Link><Link className="button button-quiet" href="/en/gallery">View Gallery →</Link></div></section>
      <ProfileDocument english />
    </>
  );
}
