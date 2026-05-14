import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  validateAdminCredentials,
} from "@/lib/adminAuth";

export async function POST(request) {
  const { email, password } = await request.json();
  const adminEmail = validateAdminCredentials(email, password);

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
