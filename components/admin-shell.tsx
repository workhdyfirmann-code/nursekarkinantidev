import type { ReactNode } from "react";
import Link from "next/link";
import { logout } from "@/app/admin/actions";

type AdminShellProps = { eyebrow: string; title: string; children: ReactNode; action?: ReactNode };

export function AdminShell({ eyebrow, title, children, action }: AdminShellProps) {
  return <main className="admin-layout"><aside className="admin-sidebar"><Link className="admin-brand" href="/admin"><img src="/images/logo-nsk.png" alt="Nur Sekar Kinanti" /></Link><p className="admin-sidebar-label">Ruang kerja</p><nav className="admin-nav"><Link href="/admin">Ringkasan</Link><Link href="/admin/posts">Blog</Link><Link href="/admin/shows">Pentas</Link><Link href="/admin/sponsors">Sponsor</Link><Link href="/">Lihat situs</Link></nav><div className="admin-sidebar-foot"><span>CMS Lokal</span><form action={logout}><button type="submit">Keluar</button></form></div></aside><section className="admin-main"><header className="admin-topbar"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>{action}</header>{children}</section></main>;
}
