import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminDeleteDialog } from "@/components/admin-delete-dialog";
import { AdminShell } from "@/components/admin-shell";
import { deletePost } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { adminStatusLabel } from "@/lib/admin-labels";
import { prisma } from "@/lib/prisma";

export default async function AdminPostsPage() {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });
  return <AdminShell eyebrow="Konten blog" title="Artikel" action={<Link className="button button-solid" href="/admin/posts/new">+ Artikel baru</Link>}><section className="admin-section admin-section-first"><div className="admin-section-heading"><div><p className="eyebrow">Semua artikel</p><h2>{posts.length} item</h2></div></div><div className="admin-table"><div className="admin-table-head"><span>Artikel</span><span>Status</span><span>Aksi</span></div>{posts.map((post) => <div className="admin-row" key={post.id}><span>{post.titleId}<small>{post.slugId}</small></span><span>{adminStatusLabel(post.status)}</span><span className="admin-actions"><Link href={`/admin/posts/${post.id}/edit`}>Edit</Link><form action={deletePost}><input type="hidden" name="id" value={post.id} /><AdminDeleteDialog action={deletePost} title="Hapus artikel ini?" description="Artikel dan semua terjemahannya akan dihapus permanen." /></form></span></div>)}</div></section></AdminShell>;
}
