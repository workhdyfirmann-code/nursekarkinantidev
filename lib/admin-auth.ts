import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "nsk_admin_session";
const MAX_AGE = 60 * 60 * 8;


function sign(value: string) {
  return createHmac("sha256", process.env.SESSION_SECRET || "development-only-session-secret").update(value).digest("hex");
}

export async function setAdminSession(email: string) {
  const value = `${email}:${Date.now() + MAX_AGE * 1000}`;
  (await cookies()).set(COOKIE_NAME, `${value}.${sign(value)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const raw = (await cookies()).get(COOKIE_NAME)?.value;
  if (!raw) return false;
  const separator = raw.lastIndexOf(".");
  if (separator < 1) return false;
  const value = raw.slice(0, separator);
  const signature = raw.slice(separator + 1);
  const expected = sign(value);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  const expiry = Number(value.split(":").pop());
  return Number.isFinite(expiry) && expiry > Date.now();
}

export function adminCredentialsConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

export function validAdminCredentials(email: string, password: string) {
  return email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;
}
