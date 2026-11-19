import { createHmac, timingSafeEqual } from "node:crypto";
import { getCookie, setCookie } from "@tanstack/react-start/server";

const COOKIE = "sih_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

const secret = () => process.env["ADMIN_SESSION_SECRET"] ?? "";

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkCredentials(email: string, password: string) {
  const adminEmail = process.env["ADMIN_EMAIL"] ?? "";
  const adminPassword = process.env["ADMIN_PASSWORD"] ?? "";
  if (!adminEmail || !adminPassword || !secret()) return false;
  return (
    safeEqual(email.replace(/\s+/g, "").toLowerCase(), adminEmail.replace(/\s+/g, "").toLowerCase()) &&
    safeEqual(password.trim(), adminPassword.trim())
  );
}

export function issueSession(email: string) {
  const expires = Date.now() + MAX_AGE * 1000;
  const payload = `${email.trim().toLowerCase()}|${expires}`;
  const token = `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
  setCookie(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    partitioned: true,
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearSession() {
  setCookie(COOKIE, "", { httpOnly: true, secure: true, sameSite: "none",
    partitioned: true, path: "/", maxAge: 0 });
}

export function readSession(): { email: string } | null {
  const token = getCookie(COOKIE);
  if (!token || !secret()) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  let payload: string;
  try {
    payload = Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return null;
  }
  if (!safeEqual(signature, sign(payload))) return null;
  const [email, expires] = payload.split("|");
  if (!email || !expires || Number(expires) < Date.now()) return null;
  return { email };
}

export function requireAdmin() {
  const session = readSession();
  if (!session) throw new Error("Not authorised. Please sign in again.");
  return session;
}
