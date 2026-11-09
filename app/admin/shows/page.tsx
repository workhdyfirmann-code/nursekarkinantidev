import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminDeleteDialog } from "@/components/admin-delete-dialog";
import { AdminShell } from "@/components/admin-shell";
import { deleteShow } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { adminStatusLabel } from "@/lib/admin-labels";
import { prisma } from "@/lib/prisma";

export default async function AdminShowsPage() {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const shows = await prisma.show.findMany({ orderBy: { eventDate: "desc" } });
  return <AdminShell eyebrow="Konten pertunjukan" title="Pentas" action={<Link className="button button-solid" href="/admin/shows/new">+ Pentas baru</Link>}><section className="admin-section admin-section-first"><div className="admin-section-heading"><div><p className="eyebrow">Semua pentas</p><h2>{shows.length} item</h2></div></div><div className="admin-table"><div className="admin-table-head"><span>Pentas</span><span>Status</span><span>Aksi</span></div>{shows.map((show) => <div className="admin-row" key={show.id}><span>{show.titleId}<small>{show.slugId} · {show.venue}</small></span><span>{adminStatusLabel(show.status)}</span><span className="admin-actions"><Link href={`/admin/shows/${show.id}/edit`}>Edit</Link><form action={deleteShow}><input type="hidden" name="id" value={show.id} /><AdminDeleteDialog action={deleteShow} title="Hapus pentas ini?" description="Pentas dan semua konten bilingualnya akan dihapus permanen." /></form></span></div>)}</div></section></AdminShell>;
}
