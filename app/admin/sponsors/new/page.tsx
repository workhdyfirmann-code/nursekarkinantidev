import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { createSponsor } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { sponsorshipPackages } from "@/lib/content";

export default async function NewSponsorPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!await isAdminAuthenticated()) redirect("/admin/login");
  const [{ error }, shows] = await Promise.all([searchParams, prisma.show.findMany({ orderBy: { eventDate: "desc" }, select: { id: true, titleId: true, eventDate: true } })]);
  return <AdminShell eyebrow="Sponsor / Sponsor baru" title="Buat sponsor" action={<Link className="button" href="/admin/sponsors">Kembali ke sponsor</Link>}>
    <section className="admin-form-page">
      {error ? <p className="admin-form-error" role="alert">Pilih sponsor umum atau setidaknya satu event, lalu periksa tier, status, dan logo.</p> : null}
      <form action={createSponsor} className="admin-form-grid">
        <fieldset className="admin-form-section">
          <legend>Identitas sponsor</legend>
          <div className="admin-form-fields">
            <label>Nama sponsor<input name="name" required /></label>
            <label>Tier<select name="tier" defaultValue="" required><option value="" disabled>Pilih tier</option>{sponsorshipPackages.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}</select></label>
            <label>Status<select name="status" defaultValue="draft" required><option value="draft">Draf</option><option value="published">Terbit</option></select></label>
            <label>Logo<input name="logoImage" type="file" accept="image/jpeg,image/png,image/webp" required /><small>JPEG, PNG, atau WebP · maks. 5 MB</small></label>
          </div>
        </fieldset>
        <fieldset className="admin-form-section">
          <legend>Penempatan</legend>
          <label className="admin-sponsor-general"><input type="checkbox" name="isGeneral" /> Sponsor umum · tampil di footer</label>
          <p className="muted">Pilih sponsor umum, satu atau lebih event, atau keduanya.</p>
          <div className="admin-sponsor-events">
            {shows.map((show) => <label className="admin-sponsor-event-option" key={show.id}><input type="checkbox" name="showIds" value={show.id} /><span>{show.titleId}<small>{show.eventDate.toLocaleDateString("id-ID")}</small></span></label>)}
            {shows.length ? null : <p className="muted">Belum ada pentas.</p>}
          </div>
        </fieldset>
        <div className="admin-form-footer"><span>Logo tampil publik saat status Terbit.</span><button className="button button-solid" type="submit">Simpan sponsor</button></div>
      </form>
    </section>
  </AdminShell>;
}
