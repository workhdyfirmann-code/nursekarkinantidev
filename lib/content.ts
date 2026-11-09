
export const socialLinks = {
  instagram: "https://www.instagram.com/nursekarkinanti/",
  email: "mailto:triswaraatma@gmail.com",
  whatsapp: "whatsapp://send?phone=628161161899&text=Saya%20Ingin%20Informasi%20Lebih%20Lanjut%20Tentang%20Proposal%20Triswara%20Atma",
};

export const tsaSocialLinks = [
  ["Instagram", "https://www.instagram.com/triswaraatma/"],
  ["Facebook", "https://www.facebook.com/profile.php?id=61594601996314"],
  ["TikTok", "https://www.tiktok.com/@tri.swara.atma"],
  ["YouTube", "https://www.youtube.com/@triswaraatma"],
] as const;

export const nskWebsite = "https://nursekarkinanti.id";

export const galleryImages = Array.from({ length: 17 }, (_, index) => ({
  src: `/images/gallery/nsk-${String(index + 1).padStart(2, "0")}.png`,
  alt: "Dokumentasi visual Nur Sekar Kinanti",
  className: index % 3 === 0 ? "gallery-tall" : index % 2 === 0 ? "gallery-square" : "gallery-wide",
}));

export const pageVisuals = {
  profile: {
    src: "/images/tentang-sanggar2.png",
    alt: "Tentang Sanggar Nur Sekar Kinanti",
  },
  show: [
    { src: "/images/mahakarya-bedhayan.jpg", alt: "Penari Bedhayan Topeng Sekar Kinanti" },
    { src: "/images/mahakarya-srimpi.jpg", alt: "Penari Srimpi Caturmarga dalam ruang kontemplatif" },
    { src: "/images/mahakarya-karmatma.jpg", alt: "Penari Karmatma dengan selendang emas" },
  ],
  course: {
    src: "/images/mahakarya-srimpi.jpg",
    alt: "Penari Srimpi Caturmarga dalam busana Jawa klasik",
  },
  journal: [
    { src: "/images/mahakarya-gamelan.jpg", alt: "Gamelan sebagai ruang bunyi dan rasa" },
    { src: "/images/instagram-tari-thumbnail.jpg", alt: "Penari dalam visual tari bernuansa tradisi" },
  ],
} as const;

export const works = [
  {
    number: "01",
    title: "Bedhayan Topeng Sekar Kinanti",
    description: "Tentang identitas, peran, dan wajah yang kita kenakan dalam kehidupan.",
  },
  {
    number: "02",
    title: "Srimpi Caturmarga",
    description: "Perjalanan hening menuju kesadaran, doa, dan hubungan dengan Sang Pencipta.",
  },
  {
    number: "03",
    title: "Karmatma",
    description: "Cinta yang tetap hidup melampaui jarak, ruang, waktu, dan kefanaan tubuh.",
  },
];

export const pastShows = [
  {
    slug: "bedhaya-durodasih",
    year: "2019",
    title: "Bedhaya Durodasih",
    venue: "Gedung Kesenian Jakarta",
    note: "Festival Bedhayan 2019",
    description: "Karya klasik yang menjadi bagian dari perjalanan pelestarian tari Jawa gaya Surakarta di ruang pertunjukan Jakarta.",
  },
  {
    slug: "bedhayan-topeng-abdi-sekartaji",
    year: "2025",
    title: "Bedhayan Topeng Abdi Sekartaji",
    venue: "Gedung Kesenian Jakarta",
    note: "Festival Bedhayan V · Panca Utsava Bedhayan",
    description: "Karya tentang pengabdian tanpa ego yang diproduksi Nur Sekar Kinanti bersama Sekartaji Art Solo.",
  },
];

export const sponsorshipPackages = [
  { name: "Platinum", amount: "Rp490 juta", note: "Sponsor tunggal", benefits: ["Presented by [Nama Brand]", "Opening remark", "Looping company profile", "6 kursi VVIP", "Brand content eksklusif"] },
  { name: "Gold", amount: "Rp250 juta", note: "Sponsor utama", benefits: ["Logo utama di materi promosi", "Mention oleh MC", "4 kursi VIP", "Booth opsional", "Dokumentasi foto dan video"] },
  { name: "Silver", amount: "Rp125 juta", note: "Sponsor pendamping", benefits: ["Logo proporsional", "Mention pada media sosial terpilih", "2 kursi VIP", "Dokumentasi foto", "Goodie bag placement"] },
  { name: "Bronze", amount: "Rp10–25 juta", note: "Sponsor pendukung", benefits: ["Logo pada materi promosi", "Mention sponsor pendukung", "2 undangan", "Dokumentasi foto", "Materi promosi di goodie bag"] },
];

export const sponsorshipProof = [
  ["450", "Kapasitas penonton", "Gedung Kesenian Jakarta"],
  ["5K–10K", "Proyeksi digital reach", "Organik dan kolaborasi"],
  ["500–1K", "Jaringan komunitas", "Audiens seni dan budaya"],
  ["3", "Karya utama", "Satu perjalanan artistik"],
] as const;

export const sponsorshipBenefits = [
  ["Cultural Value", "Menguatkan citra brand sebagai pendukung pelestarian budaya Indonesia."],
  ["Artistic Excellence", "Berada dekat dengan produksi seni dengan standar koreografi, musik, dan visual tinggi."],
  ["Audience Engagement", "Menjangkau komunitas seni, profesional, decision maker, dan generasi muda urban."],
  ["Content Value", "Mendapatkan dokumentasi visual yang dapat digunakan untuk komunikasi brand."],
] as const;

export const englishSponsorshipPackages = [
  { name: "Platinum", amount: "Rp490 million", note: "Sole sponsor", benefits: ["Presented by [Brand Name]", "Opening remarks", "Company profile loop", "6 VVIP seats", "Exclusive brand content"] },
  { name: "Gold", amount: "Rp250 million", note: "Main sponsor", benefits: ["Main logo placement", "MC mention", "4 VIP seats", "Optional booth", "Photo and video documentation"] },
  { name: "Silver", amount: "Rp125 million", note: "Supporting sponsor", benefits: ["Proportional logo placement", "Selected social media mentions", "2 VIP seats", "Photo documentation", "Goodie bag placement"] },
  { name: "Bronze", amount: "Rp10–25 million", note: "Supporting partner", benefits: ["Logo on promotional materials", "Supporting sponsor mention", "2 invitations", "Photo documentation", "Promotional material in goodie bags"] },
] as const;

export const englishSponsorshipProof = [
  ["450", "Audience capacity", "Gedung Kesenian Jakarta"],
  ["5K–10K", "Projected digital reach", "Organic and collaborative"],
  ["500–1K", "Community network", "Arts and culture audiences"],
  ["3", "Main works", "One artistic journey"],
] as const;

export const englishSponsorshipBenefits = [
  ["Cultural Value", "Associate your brand with the preservation of Indonesian culture."],
  ["Artistic Excellence", "Stand close to a production shaped by strong choreography, music, and visual direction."],
  ["Audience Engagement", "Reach arts communities, professionals, decision makers, and younger urban audiences."],
  ["Content Value", "Receive visual documentation that can support brand communication."],
] as const;

export const journalPosts = [
  {
    slug: "tiga-suara-yang-sedang-mencari-ruangnya",
    category: "The Story",
    title: "Tiga suara yang sedang mencari ruangnya",
    excerpt: "Tri Swara Atma mengajak kita memasuki perjalanan batin melalui identitas, keheningan, dan cinta.",
    content: "Tiga karya dalam Tri Swara Atma bergerak dari dunia manusia menuju ruang spiritual, lalu mencapai cinta yang melampaui batas kehidupan. Perjalanan ini tidak hanya hadir di atas panggung, tetapi juga tumbuh melalui proses panjang para seniman.",
  },
  {
    slug: "mengapa-tari-klasik-tetap-berbicara-hari-ini",
    category: "The Heritage",
    title: "Mengapa tari klasik tetap berbicara hari ini",
    excerpt: "Tradisi bukan ruang yang beku. Ia bergerak, dirawat, dan menemukan makna baru bersama generasi berikutnya.",
    content: "Tari klasik membawa disiplin tubuh, filosofi, dan cara memandang hubungan manusia dengan semesta. Ketika dipelajari dengan terbuka, tradisi tidak kehilangan akarnya saat berbicara kepada generasi baru.",
  },
  {
    slug: "dari-ruang-latihan-menuju-panggung",
    category: "The Process",
    title: "Dari ruang latihan menuju panggung",
    excerpt: "Di balik karya yang anggun, ada disiplin, percakapan, keringat, dan kerja kolektif yang panjang.",
    content: "Sebuah karya lahir dari pengulangan, koreksi, percakapan, dan kepercayaan. Ruang latihan menjadi tempat para penari dan tim artistik menemukan napas yang sama sebelum bertemu penonton.",
  },
];

export const englishJournalPosts = [
  {
    slug: "three-voices-searching-for-their-space",
    category: "The Story",
    title: "Three voices searching for their space",
    excerpt: "Tri Swara Atma takes us through an inner journey of identity, stillness, and love.",
    content: "Three works move from the human world toward spiritual space, then reach a love that exceeds the limits of life. The journey grows through the long process of the artists before it reaches the stage.",
  },
  {
    slug: "why-classical-dance-still-speaks-today",
    category: "The Heritage",
    title: "Why classical dance still speaks today",
    excerpt: "Tradition is not a frozen room. It moves, is cared for, and finds new meaning with each generation.",
    content: "Classical dance carries bodily discipline, philosophy, and a way of understanding our relationship with the universe. When approached openly, tradition keeps its roots while speaking to a new generation.",
  },
  {
    slug: "from-rehearsal-room-to-stage",
    category: "The Process",
    title: "From rehearsal room to stage",
    excerpt: "Behind every graceful work are repetition, conversation, sweat, and collective trust.",
    content: "A work grows through repetition, correction, conversation, and trust. The rehearsal room is where dancers and artists find one shared breath before meeting the audience.",
  },
] as const;

export const englishShows = [
  {
    slug: "tri-swara-atma",
    year: "2026",
    title: "Tri Swara Atma",
    venue: "Jakarta Arts Building",
    note: "16 December 2026 · 18:30–20:30",
    description: "A presentation about roles, seeking, and love. Three classical Javanese works in one inner journey.",
    image: "/images/poster-tsa.jpeg",
  },
  ...pastShows.map((show) => ({
    ...show,
    title: show.title,
    description: "A work in Nur Sekar Kinanti's archive of classical Javanese performance.",
    image: "/images/mahakarya-bedhayan.jpg",
  })),
] as const;
