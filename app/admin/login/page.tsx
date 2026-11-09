import { redirect } from "next/navigation";
import { login } from "../actions";
import { adminCredentialsConfigured, isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");
  return <main className="admin-shell"><div className="admin-card"><p className="eyebrow">Nur Sekar Kinanti · Admin</p><h1>Masuk ke CMS</h1>{adminCredentialsConfigured() ? <form action={login} className="form-grid"><label>Email<input name="email" type="email" required /></label><label>Kata sandi<input name="password" type="password" required /></label><button className="button button-solid" type="submit">Masuk</button></form> : <p className="muted">Atur ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_SECRET, dan DATABASE_URL di `.env.local` sebelum memakai Admin.</p>}</div></main>;
}
