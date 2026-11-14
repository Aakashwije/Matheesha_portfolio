import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  isAdminAuthConfigured,
  validateAdminCredentials,
} from "@/lib/adminAuth";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured on this server." },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(body?.email || "").trim().toLowerCase();
  const withinLimit =
    rateLimit(`login-ip:${clientIp(request)}`, { limit: 10, windowMs: LOGIN_WINDOW_MS }) &&
    rateLimit(`login-email:${email}`, { limit: 5, windowMs: LOGIN_WINDOW_MS });

  if (!withinLimit) {
    return NextResponse.json(
      { error: "Too many login attempts. Try again in 15 minutes." },
      { status: 429 },
    );
  }

  const adminEmail = validateAdminCredentials(email, body?.password);

  if (!adminEmail) {
    return NextResponse.json(
      { error: "Invalid admin email or password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: createAdminSessionToken(adminEmail),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  return response;
}
