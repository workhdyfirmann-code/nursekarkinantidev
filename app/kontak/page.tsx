import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { socialLinks } from "@/lib/content";

export const metadata = { title: "Kontak" };

export default function KontakPage() {
  return (
    <>
      <PageHero eyebrow="Kontak / 06" title="Mari membuka percakapan." description="Untuk kerja sama, kelas, media, atau informasi tentang karya Nur Sekar Kinanti, hubungi kanal sementara berikut." />
      <section className="section">
        <div className="container form-shell">
          <div>
            <p className="eyebrow">Kanal Sementara</p>
            <h2>Pesan Anda akan menemukan jalannya.</h2>
            <p className="lead">Alamat email dan akun media sosial resmi sedang disiapkan. Kanal berikut menjadi placeholder sampai identitas digital final tersedia.</p>
          </div>
          <dl className="detail-list">
            <div><dt>Email</dt><dd><a href={socialLinks.email}>triswaraatma@gmail.com</a></dd></div>
            <div><dt>Instagram</dt><dd><a href={socialLinks.instagram} target="_blank" rel="noreferrer">@nursekarkinanti</a></dd></div>
            <div><dt>Lokasi latihan</dt><dd>Studio Primadona lantai 2, Jl. Tebet Timur Raya No. 5, Jakarta Selatan.</dd></div>
            <div><dt>Kerjasama</dt><dd><Link href="/kerjasama">Lihat informasi sponsorship</Link></dd></div>
          </dl>
        </div>
      </section>
    </>
  );
}
