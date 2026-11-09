import Link from "next/link";
import { EditorialPageIntro } from "@/components/editorial-page-intro";
import { ProfileDocument } from "@/components/profile-document";
import { ProfileStory } from "@/components/profile-story";
import { ProfilePeople } from "@/components/profile-people";
import { ProfileWorks } from "@/components/profile-works";
import { ProfileMembership } from "@/components/profile-membership";
import { pageVisuals } from "@/lib/content";

export const metadata = { title: "Profil" };

export default function ProfilPage() {
  return (
    <>
      <EditorialPageIntro eyebrow="Profil / 01" title={<>Merawat yang luhur,<br /><em>membuka ruang yang baru.</em></>} description="Nur Sekar Kinanti hadir sebagai wadah pelestarian, pembelajaran, dan pengembangan tari Jawa klasik gaya Surakarta." />
      <section className="editorial-section editorial-about"><div className="editorial-copy"><p className="eyebrow">Tentang Sanggar</p><h2>Dari kecintaan<br /><em>pada tradisi.</em></h2><p>Sanggar Tari Nur Sekar Kinanti (NSK) merupakan wadah kesenian yang berfokus pada pelestarian, pembelajaran, dan pengembangan seni tari klasik Jawa—khususnya gaya Surakarta—serta eksplorasi tari Jawa kontemporer.</p><p>Nur Sekar Kinanti didirikan dan dipimpin oleh Prasanti Andrini, praktisi tari klasik Jawa yang membuka ruang edukasi dan olah rasa bagi pecinta seni lintas generasi.</p><p>Berbasis di Jakarta dengan jejaring kuat di Surakarta, sanggar mempertemukan penari, seniman tradisi, akademisi, dan komunitas dalam karya yang berakar pada pakem namun tetap relevan.</p></div><div className="editorial-image"><img src={pageVisuals.profile.src} alt={pageVisuals.profile.alt} /><span>Visual karya Nur Sekar Kinanti</span></div></section>
      <ProfileStory />
      <section className="editorial-manifesto"><p className="editorial-symbol">✦</p><blockquote>&ldquo;Tari bukan sekadar gerak. Ia adalah ingatan, <em>identitas,</em> dan doa yang diwariskan.&rdquo;</blockquote><p className="eyebrow">Filosofi Nur Sekar Kinanti</p></section>
      <section className="editorial-section editorial-mission"><div><p className="eyebrow">Visi</p><h2>Keindahan yang memiliki kedalaman.</h2><p className="large-copy">Menjadi ruang ekspresi seni tari Jawa klasik yang menghadirkan keindahan, kedalaman makna, dan refleksi kehidupan manusia.</p></div><div><p className="eyebrow">Misi</p><div className="detail-list"><div><dt>01</dt><dd>Melestarikan dan mengembangkan tari Jawa klasik.</dd></div><div><dt>02</dt><dd>Menyampaikan nilai filosofis melalui seni pertunjukan.</dd></div><div><dt>03</dt><dd>Memberi ruang ekspresi bagi seniman lintas generasi.</dd></div><div><dt>04</dt><dd>Membangun kolaborasi untuk memperluas apresiasi publik.</dd></div></div></div></section>
      <ProfilePeople />
      <ProfileWorks />
      <ProfileMembership />
      <section className="editorial-page-cta"><div><h2>Kenali karya kami<br /><em>lebih dekat.</em></h2><p>Jelajahi pertunjukan dan ruang visual Nur Sekar Kinanti.</p></div><div className="editorial-page-cta-actions"><Link className="button button-gold" href="/pentas">Lihat Pentas →</Link><Link className="button button-quiet" href="/galeri">Lihat Galeri →</Link></div></section>
      <ProfileDocument />
    </>
  );
}
