import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminDeleteDialog } from "@/components/admin-delete-dialog";
import { AdminShell } from "@/components/admin-shell";
import { deleteSponsor, updateSponsor } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { sponsorshipPackages } from "@/lib/content";

export default async function EditSponsorPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const [{ id }, { error }, shows] = await Promise.all([params, searchParams, prisma.show.findMany({ orderBy: { eventDate: "desc" }, select: { id: true, titleId: true, eventDate: true } })]);
  const sponsor = await prisma.sponsor.findUnique({ where: { id }, include: { shows: true } });
  if (!sponsor) notFound();
  return <AdminShell eyebrow="Sponsor / Edit sponsor" title="Edit sponsor" action={<Link className="button" href="/admin/sponsors">Kembali ke sponsor</Link>}>
    <section className="admin-form-page">
      {error ? <p className="admin-form-error" role="alert">Periksa nama, tier, status, logo, dan penempatan sponsor.</p> : null}
      <form action={updateSponsor} className="admin-form-grid">
        <input type="hidden" name="id" value={sponsor.id} />
        <fieldset className="admin-form-section">
          <legend>Identitas sponsor</legend>
          <div className="admin-form-fields">
            <label>Nama sponsor<input name="name" defaultValue={sponsor.name} required /></label>
            <label>Tier<select name="tier" defaultValue={sponsor.tier} required>{sponsorshipPackages.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}</select></label>
            <label>Status<select name="status" defaultValue={sponsor.status} required><option value="draft">Draf</option><option value="published">Terbit</option></select></label>
            <label>Ganti logo<input name="logoImage" type="file" accept="image/jpeg,image/png,image/webp" /><img className="admin-current-image" src={sponsor.logoImage} alt={sponsor.name} /><small>Biarkan kosong untuk mempertahankan logo saat ini.</small></label>
          </div>
        </fieldset>
        <fieldset className="admin-form-section">
          <legend>Penempatan</legend>
          <label className="admin-sponsor-general"><input type="checkbox" name="isGeneral" defaultChecked={sponsor.isGeneral} /> Sponsor umum · tampil di footer</label>
          <p className="muted">Pilih sponsor umum, satu atau lebih event, atau keduanya.</p>
          <div className="admin-sponsor-events">
            {shows.map((show) => <label className="admin-sponsor-event-option" key={show.id}><input type="checkbox" name="showIds" value={show.id} defaultChecked={sponsor.shows.some((linkedShow) => linkedShow.id === show.id)} /><span>{show.titleId}<small>{show.eventDate.toLocaleDateString("id-ID")}</small></span></label>)}
            {shows.length ? null : <p className="muted">Belum ada pentas.</p>}
          </div>
        </fieldset>
        <div className="admin-form-footer"><span>Logo tampil publik saat status Terbit.</span><div className="admin-actions"><button className="button button-solid" type="submit">Perbarui sponsor</button><AdminDeleteDialog action={deleteSponsor} title="Hapus sponsor ini?" description="Logo sponsor akan dihapus dari semua penempatan publik." /></div></div>
      </form>
    </section>
  </AdminShell>;
}
