const profileDocumentUrl = "https://drive.google.com/file/d/1TumjVbt-DQV1p2KQmlDO0IYgKiTl1gg0/view?usp=sharing";
const profilePreviewUrl = "https://drive.google.com/file/d/1TumjVbt-DQV1p2KQmlDO0IYgKiTl1gg0/preview";

type ProfileDocumentProps = {
  english?: boolean;
};

export function ProfileDocument({ english = false }: ProfileDocumentProps) {
  return (
    <section className="editorial-section profile-document">
      <div className="profile-document-copy">
        <p className="eyebrow">{english ? "Studio profile" : "Profil sanggar"}</p>
        <h2>{english ? <>A closer look<br /><em>at our journey.</em></> : <>Mengenal lebih dekat<br /><em>perjalanan kami.</em></>}</h2>
        <p>{english ? "Read the complete profile of Nur Sekar Kinanti, including its history, artistic team, works, contact information, and membership notes." : "Baca profil lengkap Nur Sekar Kinanti, termasuk sejarah, tim artistik, karya, informasi kontak, dan catatan keanggotaan."}</p>
        <a className="button button-solid" href={profileDocumentUrl} target="_blank" rel="noreferrer">{english ? "Open document" : "Buka dokumen"}</a>
      </div>
      <div className="profile-document-frame">
        <iframe src={profilePreviewUrl} title={english ? "Nur Sekar Kinanti studio profile" : "Profil Sanggar Nur Sekar Kinanti"} loading="lazy" allow="autoplay" />
        <p>{english ? "Google Drive preview" : "Preview dari Google Drive"}</p>
      </div>
    </section>
  );
}
