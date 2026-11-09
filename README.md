# Nur Sekar Kinanti

Website resmi Sanggar Tari Jawa Klasik Nur Sekar Kinanti.

## Menjalankan lokal

```bash
npm install
cp .env.example .env.local
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up -d db libretranslate
npm run db:migrate:deploy
npm run db:seed
npm run dev
```

Buka `http://localhost:3000`.

PostgreSQL lokal berjalan di `localhost:5432`. Migrasi membuat schema PostgreSQL baru. Data dari SQLite lama tidak dipindahkan otomatis; simpan backup `prisma/dev.db` sebelum cutover.

## Halaman publik

- `/` — homepage
- `/profil` — profil sanggar
- `/pentas` — Tri Swara Atma dan arsip pentas
- `/pentas/{slug}` — detail pentas
- `/kerjasama` — informasi sponsorship dan kanal kontak
- `/kursus` — informasi kursus dan kanal pengumuman
- `/blog` — berita, kegiatan, budaya, dan proses kreatif
- `/blog/{slug}` — detail artikel
- `/kontak` — kanal kontak sementara
- `/en/...` — versi bahasa Inggris

Kursus dan kerjasama masih bersifat informatif. Pendaftaran diarahkan ke email atau media sosial sampai kanal resmi tersedia.

## Admin

- `/admin/login` — login CMS
- `/admin` — kelola artikel dan data pentas
- `/admin/sponsors` — kelola tier, status, sponsor umum, dan relasi ke beberapa pentas

Isi nilai `ADMIN_EMAIL`, `ADMIN_PASSWORD`, dan `SESSION_SECRET` di `.env.local`. Jangan gunakan kredensial contoh untuk production.

## SEO

Sitemap tersedia di `/sitemap.xml`. Robots tersedia di `/robots.txt`.

## Docker lokal

Gunakan Compose lokal untuk PostgreSQL dan LibreTranslate:

```bash
cp .env.docker.example .env.docker
docker compose -f compose.local.yaml --env-file .env.docker up -d --build
```

Jalankan migrasi dan seed:

```bash
docker compose -f compose.local.yaml --env-file .env.docker run --rm app npm run db:migrate:deploy
docker compose -f compose.local.yaml --env-file .env.docker run --rm app npm run db:seed
```

Buka `http://localhost:3000`.

## Docker staging

```bash
cp .env.staging.example .env.staging
```

Staging memakai PostgreSQL remote di `116.206.196.113` dan port app `3100`. Ubah password dan secret di `.env.staging`.

```bash
docker compose -f compose.staging.yaml --env-file .env.staging -p nursekar-staging up -d --build
```

## Docker production

```bash
cp .env.production.example .env.production
```

Production memakai PostgreSQL remote di `116.206.196.113` dan port app `3100`. Ubah password dan secret di `.env.production`.

```bash
docker compose -f compose.production.yaml --env-file .env.production -p nursekar-production up -d --build
```

Container app menjalankan `prisma migrate deploy` ke PostgreSQL remote sebelum Next.js start. Jangan memakai `prisma db push` di production.

Lihat log production:

```bash
docker compose -f compose.production.yaml --env-file .env.production -p nursekar-production logs -f app
```

Backup database remote:
```bash
set -a
. .env.production
set +a
docker run --rm -e PGPASSWORD="$POSTGRES_PASSWORD" postgres:16-alpine pg_dump -h 116.206.196.113 -U "$POSTGRES_USER" "$POSTGRES_DB" > backup.sql
```

## Cloudflare Tunnel VoxDev

Cloudflare Tunnel Docker di VoxDev terhubung ke network eksternal `voxstream-edge`. Compose staging dan production sudah menambahkan app ke network itu.

Tambahkan Public Hostname di tunnel Cloudflare:

```text
event.nursekarkinanti.id -> http://nursekar-web:3100
nursekarkinanti.id -> http://nursekar-staging-web:3100
```

Pastikan network tersedia sebelum deploy:

```bash
docker network inspect voxstream-edge
```

Data dari SQLite lama tidak dipindahkan otomatis. Simpan backup `prisma/dev.db` sebelum cutover; migrasi PostgreSQL membuat schema baru dan seed mengisi data awal.
