type ProfilePeopleProps = {
  english?: boolean;
};

export function ProfilePeople({ english = false }: ProfilePeopleProps) {
  const items = english
    ? [
        ["01", "Lead choreographer & mentor", "Prasanti Andrini leads Nur Sekar Kinanti as its principal choreographer and mentor. Her artistic direction develops movement rooted in classical Javanese tradition while opening space for contemporary choreographic exploration.", "She guides the artistic process and the dancers’ growth with attention to tradition, interpretation, and the character of each work."],
        ["02", "Artistic collaborators", "Nur Sekar Kinanti works with traditional artists from Solo, including Sekartaji Art Solo (SAS). This partnership creates an exchange of knowledge, experience, and skills between Jakarta’s dance community and Surakarta’s traditional arts environment.", "In collaborative productions, artists and practitioners connected to Institut Seni Indonesia Surakarta may contribute to artistic concepts, technical training, and dance accompaniment. Individual contributor details remain subject to confirmation."],
        ["03", "Dancers in formation", "The studio brings together Jakarta-based students, members, and classical dance enthusiasts with professional dancers in larger collaborative productions.", "This meeting of generations and experience creates an open, collaborative, and sustainable ecosystem where learning, preservation, and performance development can grow together."],
      ]
    : [
        ["01", "Koreografer utama dan pembina", "Prasanti Andrini memimpin Nur Sekar Kinanti sekaligus berperan sebagai koreografer utama dan pembina dalam pengembangan karya seni tari. Ia merancang komposisi gerak yang berakar pada kekayaan tradisi tari klasik Jawa, sekaligus membuka ruang eksplorasi terhadap pendekatan koreografi kontemporer.", "Melalui peran tersebut, Prasanti mengarahkan proses artistik dan pengembangan kualitas penari, dengan tetap memperhatikan nilai tradisi, penghayatan, dan karakter karya yang dibawakan."],
        ["02", "Kolaborator dan mitra artistik", "Nur Sekar Kinanti menjalin kolaborasi artistik dengan seniman tradisi dari Solo, termasuk Sekartaji Art Solo (SAS). Kemitraan ini menjadi ruang pertukaran pengetahuan, pengalaman, dan keterampilan antara komunitas tari di Jakarta dan lingkungan seni tradisi Surakarta.", "Dalam produksi kolaboratif, seniman dan praktisi dari lingkungan Institut Seni Indonesia (ISI) Surakarta dapat mendukung pengembangan konsep artistik, pelatihan teknis, serta penataan iringan tari. Detail kontribusi individu masih menunggu konfirmasi."],
        ["03", "Perpaduan penari binaan dan profesional", "Penari Nur Sekar Kinanti terdiri atas anggota dan peminat seni tari klasik di Jakarta yang memperoleh ruang untuk belajar, berlatih, dan mengembangkan kemampuan artistik, serta penari profesional dalam produksi kolaboratif berskala besar.", "Pertemuan berbagai generasi dan tingkat pengalaman ini membangun ekosistem seni tari yang terbuka, kolaboratif, dan berkelanjutan, dengan ruang yang seimbang bagi pembelajaran, pelestarian tradisi, dan pengembangan pertunjukan."],
      ];

  return (
    <section className="editorial-section profile-people">
      <div className="editorial-section-heading">
        <div><p className="eyebrow">{english ? "People & artistic network / 05" : "Pengurus, pelatih, dan penari / 05"}</p><h2>{english ? <>Many hands,<br /><em>one shared breath.</em></> : <>Banyak tangan,<br /><em>satu napas.</em></>}</h2></div>
        <p>{english ? "Nur Sekar Kinanti grows through the people who guide, exchange, learn, and perform together." : "Nur Sekar Kinanti tumbuh melalui orang-orang yang membimbing, bertukar pengetahuan, belajar, dan berkarya bersama."}</p>
      </div>
      <div className="profile-people-list">
         {items.map(([number, title, text, detail]) => <article className="profile-people-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p><p>{detail}</p></div></article>)}
      </div>
    </section>
  );
}
