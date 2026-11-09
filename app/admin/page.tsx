import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { adminStatusLabel } from "@/lib/admin-labels";
import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const [posts, shows] = await Promise.all([prisma.post.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }), prisma.show.findMany({ orderBy: { eventDate: "desc" }, take: 5 })]);
  const publishedPosts = posts.filter((post) => post.status === "published").length;
  const upcomingShows = shows.filter((show) => show.status === "upcoming").length;
  return <AdminShell eyebrow="Manajemen konten" title="Ringkasan" action={<Link className="button button-solid" href="/">Lihat situs</Link>}><section className="admin-stats" id="overview"><div className="admin-stat"><span>Total artikel</span><strong>{posts.length}</strong><small>Item terbaru</small></div><div className="admin-stat"><span>Terbit</span><strong>{publishedPosts}</strong><small>Tampil di situs</small></div><div className="admin-stat"><span>Pentas</span><strong>{shows.length}</strong><small>{upcomingShows} akan datang</small></div><div className="admin-stat"><span>Bahasa</span><strong>ID / EN</strong><small>Konten bilingual</small></div></section><section className="admin-section"><div className="admin-section-heading"><div><p className="eyebrow">Akses cepat</p><h2>Kelola konten</h2></div></div><div className="admin-quick-grid"><Link className="admin-quick-card" href="/admin/posts"><span>01</span><strong>Artikel blog</strong><small>Buat, edit, terbitkan, dan hapus artikel.</small></Link><Link className="admin-quick-card" href="/admin/shows"><span>02</span><strong>Pentas</strong><small>Kelola pertunjukan mendatang dan arsip.</small></Link></div></section><section className="admin-section"><div className="admin-section-heading"><div><p className="eyebrow">Konten terbaru</p><h2>Pembaruan terakhir</h2></div></div><div className="admin-table"><div className="admin-table-head"><span>Konten</span><span>Jenis</span><span>Status</span></div>{posts.map((post) => <Link className="admin-row" href={`/admin/posts/${post.id}/edit`} key={post.id}><span>{post.titleId}<small>{post.slugId}</small></span><span>Blog</span><span>{adminStatusLabel(post.status)}</span></Link>)}{shows.map((show) => <Link className="admin-row" href={`/admin/shows/${show.id}/edit`} key={show.id}><span>{show.titleId}<small>{show.slugId}</small></span><span>Pentas</span><span>{adminStatusLabel(show.status)}</span></Link>)}</div></section></AdminShell>;
}
