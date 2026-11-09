type ProfileStoryProps = {
  english?: boolean;
};

const purposes = [
  ["01", "Melestarikan Seni Tari Klasik Jawa", "Menjaga kelestarian seni tari klasik yang memiliki nilai tradisi adiluhung, khususnya tradisi Bedhaya dan Bedhayan gaya Surakarta, agar tetap dikenal, dipelajari, dan diwariskan kepada generasi berikutnya."],
  ["02", "Membuka Ruang Edukasi dan Olah Rasa", "Menghadirkan ruang belajar dan pendalaman seni tari bagi para pecinta seni dari berbagai generasi, dengan menekankan keterampilan gerak, kepekaan rasa, penghayatan, disiplin, dan pemahaman nilai budaya."],
  ["03", "Membangun Kolaborasi Seni dan Budaya", "Menjadi jembatan kolaborasi kreatif antara seniman tari tradisional, akademisi seni, lingkungan pendidikan seperti ISI Surakarta, serta komunitas seni di Jakarta dan sekitarnya."],
] as const;

export function ProfileStory({ english = false }: ProfileStoryProps) {
  if (english) {
    return (
      <>
        <section className="editorial-section profile-history">
          <div className="editorial-section-heading"><div><p className="eyebrow">History / 02</p><h2>A tradition carried<br /><em>into the city.</em></h2></div><p>Nur Sekar Kinanti was founded to preserve, develop, and introduce classical Javanese dance to a wider audience, especially within Jakarta&apos;s urban environment.</p></div>
          <div className="profile-history-copy"><p>The studio grows from a commitment to keep classical Javanese dance alive while creating a relevant space for artistic learning and inner cultivation in contemporary urban life.</p><p>Its work is rooted in the Surakarta tradition, with openness toward dialogue, collaboration, and the exploration of contemporary Javanese dance.</p></div>
        </section>
        <section className="editorial-section profile-founder"><div className="profile-founder-image"><img src="/images/prasanti-andrini.jpg" alt="Prasanti Andrini" /><span>Prasanti Andrini</span></div><div className="profile-founder-copy"><p className="eyebrow">Founder &amp; artistic lead / 03</p><h2>Prasanti<br /><em>Andrini.</em></h2><p>Nur Sekar Kinanti was founded and is led by <strong>Prasanti Andrini</strong>, a senior model and classical Javanese dance practitioner who has studied the art form for decades.</p><p>In establishing the studio, she collaborated with a fellow dancer and teacher with expertise in traditional dance and a background from Institut Seni Indonesia Surakarta.</p><p>The founders&apos; dedication gives the studio a foundation for sustaining classical Javanese dance while opening an accessible, relevant learning space for urban communities.</p></div></section>
        <section className="editorial-section profile-purpose"><div className="editorial-section-heading"><div><p className="eyebrow">Founding purpose / 04</p><h2>Three ways<br /><em>to keep it living.</em></h2></div><p>The studio connects preservation with education and collaboration, allowing heritage to remain practiced, understood, and shared.</p></div><div className="profile-purpose-grid">{purposes.map(([number, title, text]) => <article className="profile-purpose-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      </>
    );
  }

  return (
    <>
      <section className="editorial-section profile-history">
        <div className="editorial-section-heading"><div><p className="eyebrow">Sejarah / 02</p><h2>Tradisi yang dibawa<br /><em>ke tengah kota.</em></h2></div><p>Sanggar didirikan dengan semangat untuk melestarikan, mengembangkan, dan memperkenalkan seni tari klasik Jawa kepada masyarakat luas, khususnya di lingkungan urban Jakarta.</p></div>
        <div className="profile-history-copy"><p>Sanggar tumbuh dari komitmen untuk menjaga seni tari klasik Jawa tetap hidup sekaligus menghadirkan ruang pembelajaran dan olah rasa yang relevan bagi kehidupan masyarakat urban.</p><p>Berakar pada tradisi gaya Surakarta, karya dan pembelajaran di dalamnya terbuka pada dialog, kolaborasi, serta eksplorasi tari Jawa kontemporer.</p></div>
      </section>
      <section className="editorial-section profile-founder"><div className="profile-founder-image"><img src="/images/prasanti-andrini.jpg" alt="Prasanti Andrini" /><span>Prasanti Andrini</span></div><div className="profile-founder-copy"><p className="eyebrow">Pendiri &amp; pimpinan / 03</p><h2>Prasanti<br /><em>Andrini.</em></h2><p>Nur Sekar Kinanti didirikan dan dipimpin oleh <strong>Prasanti Andrini</strong>, seorang model senior sekaligus praktisi tari klasik Jawa yang telah mendalami seni tari selama puluhan tahun.</p><p>Dalam mendirikan sanggar ini, Prasanti Andrini berkolaborasi dengan rekan sekaligus guru tari yang memiliki kompetensi di bidang seni tari tradisional dan merupakan lulusan Institut Seni Indonesia (ISI) Surakarta.</p><p>Dedikasi para pendiri menjadi landasan bagi sanggar untuk menjaga keberlangsungan seni tari klasik Jawa, sekaligus menghadirkan ruang pembelajaran seni yang relevan bagi masyarakat urban.</p></div></section>
      <section className="editorial-section profile-purpose"><div className="editorial-section-heading"><div><p className="eyebrow">Tujuan pendirian / 04</p><h2>Tiga cara<br /><em>menjaga kehidupan tradisi.</em></h2></div><p>Sanggar mempertemukan pelestarian, pendidikan, dan kolaborasi agar warisan budaya tetap dipraktikkan, dipahami, dan dibagikan.</p></div><div className="profile-purpose-grid">{purposes.map(([number, title, text]) => <article className="profile-purpose-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    </>
  );
}
