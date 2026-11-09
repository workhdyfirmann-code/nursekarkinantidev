type ProfileWorksProps = {
  english?: boolean;
};

export function ProfileWorks({ english = false }: ProfileWorksProps) {
  const works = english
    ? [
        ["2019", "June 22, 2019", "Bedhaya Durodasih", "Festival Bedhayan 2019", "Gedung Kesenian Jakarta (GKJ)", "A classical Javanese work associated with the Surakarta palace tradition and attributed in the initial reference to Sri Susuhunan Pakubuwana.", "Nur Sekar Kinanti participated in the 2019 Bedhayan Festival."],
        ["2025", "August 9, 2025", "Bedhayan Topeng Abdi Sekartaji", "Festival Bedhayan V — Panca Utsava Bedhayan", "Gedung Kesenian Jakarta (GKJ)", "A work about devotion without ego, using the mask as a reflection on dedication, sincerity, and service in the tradition of dance.", "Nur Sekar Kinanti acted as producer in collaboration with Sekartaji Art Solo (SAS)."],
        ["2026", "August 2026", "Festival Bedhayan 2026 series", "Annual Bedhayan Festival programme", "Gedung Kesenian Jakarta (GKJ) and/or festival venues", "A continuing presence in Jakarta’s ecosystem for preserving and sharing Javanese dance traditions.", "The specific work and role of Nur Sekar Kinanti remain subject to available documentation and confirmation."],
      ]
    : [
        ["2019", "22 Juni 2019", "Bedhaya Durodasih", "Festival Bedhayan 2019", "Gedung Kesenian Jakarta (GKJ)", "Karya tari klasik yang dikaitkan dengan tradisi keraton Surakarta dan disebut dalam referensi awal sebagai ciptaan Sri Susuhunan Pakubuwana.", "Nur Sekar Kinanti berpartisipasi dalam pementasan Festival Bedhayan 2019."],
        ["2025", "9 Agustus 2025", "Bedhayan Topeng Abdi Sekartaji", "Festival Bedhayan V — Panca Utsava Bedhayan", "Gedung Kesenian Jakarta (GKJ)", "Karya tentang pengabdian tanpa ego melalui medium topeng, sebagai refleksi nilai dedikasi, ketulusan, dan pengabdian dalam tradisi seni tari.", "Nur Sekar Kinanti bertindak sebagai produser dalam kolaborasi dengan Sekartaji Art Solo (SAS)."],
        ["2026", "Agustus 2026", "Rangkaian Festival Bedhayan 2026", "Rangkaian kegiatan Festival Bedhayan tahunan", "Gedung Kesenian Jakarta (GKJ) dan/atau lokasi rangkaian festival", "Keterlibatan dalam ekosistem pelestarian tari Jawa melalui kegiatan Festival Bedhayan tahunan di Jakarta.", "Karya dan peran spesifik Nur Sekar Kinanti masih menunggu dokumentasi serta konfirmasi."],
      ];

  return (
    <section className="editorial-section profile-works">
      <div className="editorial-section-heading"><div><p className="eyebrow">{english ? "Works & performances / 06" : "Karya & pentas tari / 06"}</p><h2>{english ? <>A journey in<br /><em>works and stages.</em></> : <>Jejak dalam karya,<br /><em>langkah di panggung.</em></>}</h2></div><p>{english ? "Nur Sekar Kinanti’s artistic journey through performances and collaborations that keep classical Javanese dance in motion." : "Jejak perjalanan artistik Nur Sekar Kinanti dalam menjaga dan mengembangkan tradisi tari Jawa melalui berbagai pementasan dan kolaborasi."}</p></div>
      <div className="profile-works-timeline">
        {works.map(([year, date, title, festival, venue, description, role]) => <article className="profile-work-item" key={year}><div className="profile-work-year">{year}</div><div className="profile-work-content"><p className="eyebrow">{date}</p><h3>{title}</h3><p className="profile-work-festival">{festival}</p><p className="profile-work-meta">{venue}</p><p>{description}</p><p className="profile-work-role"><strong>{english ? "Nur Sekar Kinanti" : "Peran sanggar"}</strong> · {role}</p></div></article>)}
      </div>
    </section>
  );
}
