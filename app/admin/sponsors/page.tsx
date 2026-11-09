import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminDeleteDialog } from "@/components/admin-delete-dialog";
import { AdminShell } from "@/components/admin-shell";
import { deleteSponsor } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { adminStatusLabel } from "@/lib/admin-labels";
import { prisma } from "@/lib/prisma";

export default async function AdminSponsorsPage() {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const sponsors = await prisma.sponsor.findMany({ include: { shows: true }, orderBy: { createdAt: "desc" } });
  return <AdminShell eyebrow="Konten sponsor" title="Sponsor" action={<Link className="button button-solid" href="/admin/sponsors/new">+ Sponsor baru</Link>}>
    <section className="admin-section admin-section-first">
      <div className="admin-section-heading"><div><p className="eyebrow">Semua sponsor</p><h2>{sponsors.length} item</h2></div></div>
      <div className="admin-table">
        <div className="admin-table-head"><span>Sponsor</span><span>Status</span><span>Aksi</span></div>
        {sponsors.map((sponsor) => {
          const placements = [...(sponsor.isGeneral ? ["Umum"] : []), ...sponsor.shows.map((show) => show.titleId)].join(", ");
          return <div className="admin-row" key={sponsor.id}>
            <span>{sponsor.name}<small>{sponsor.tier} · {placements || "Belum ada penempatan"}</small></span>
            <span>{adminStatusLabel(sponsor.status)}</span>
            <span className="admin-actions"><Link href={`/admin/sponsors/${sponsor.id}/edit`}>Edit</Link><form action={deleteSponsor}><input type="hidden" name="id" value={sponsor.id} /><AdminDeleteDialog action={deleteSponsor} title="Hapus sponsor ini?" description="Logo sponsor akan dihapus dari semua penempatan publik." /></form></span>
          </div>;
        })}
      </div>
      {sponsors.length ? null : <p className="muted">Belum ada sponsor. Tambahkan logo sponsor untuk footer atau pentas.</p>}
    </section>
  </AdminShell>;
}
