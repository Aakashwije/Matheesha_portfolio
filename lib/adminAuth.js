import crypto from "node:crypto";

/*
 * Admin auth is configured entirely through environment variables — nothing
 * secret lives in this (public) repository:
 *
 *   ADMIN_AUTH_SECRET    random string (>= 32 chars) that signs session cookies.
 *                        Changing it logs every admin out.
 *   ADMIN_PASSWORD_HASH  scrypt hash of the admin password, generated with
 *                        `node scripts/set-admin-password.mjs`.
 *   ADMIN_EMAILS         optional comma-separated allow-list (defaults below).
 *
 * If either secret is missing, login is disabled (fail closed).
 */

export const ADMIN_SESSION_COOKIE = "matheesha_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

const DEFAULT_ADMIN_EMAILS = ["inokagunn@gmail.com", "aakashwije92@gmail.com"];

function getAdminEmails() {
  const configured = process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  return new Set(configured?.length ? configured : DEFAULT_ADMIN_EMAILS);
}

function getSecret() {
  const secret = process.env.ADMIN_AUTH_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

export function isAdminAuthConfigured() {
  return Boolean(getSecret() && parsePasswordHash(process.env.ADMIN_PASSWORD_HASH));
}

// Format: scrypt:<N>:<salt base64url>:<hash base64url> (no "$", which dotenv expands).
function parsePasswordHash(value) {
  const [scheme, cost, salt, hash] = String(value ?? "").split(":");
  if (scheme !== "scrypt" || !cost || !salt || !hash) return null;
  return { N: Number(cost), salt: Buffer.from(salt, "base64url"), hash: Buffer.from(hash, "base64url") };
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function verifyPassword(password) {
  const parsed = parsePasswordHash(process.env.ADMIN_PASSWORD_HASH);
  if (!parsed || typeof password !== "string" || !password) return false;

  const derived = crypto.scryptSync(password, parsed.salt, parsed.hash.length, {
    N: parsed.N,
    maxmem: 256 * parsed.N * 8,
  });
  return crypto.timingSafeEqual(derived, parsed.hash);
}

export function validateAdminCredentials(email, password) {
  if (!isAdminAuthConfigured()) return null;

  const normalizedEmail = String(email || "").trim().toLowerCase();
  // Always run the hash so response time doesn't reveal which emails are admins.
  const passwordOk = verifyPassword(password);
  return passwordOk && getAdminEmails().has(normalizedEmail) ? normalizedEmail : null;
}

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createAdminSessionToken(email) {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_AUTH_SECRET is not configured.");

  const payload = Buffer.from(
    JSON.stringify({
      email: String(email || "").trim().toLowerCase(),
      exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE,
    }),
  ).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function verifyAdminSessionToken(token) {
  const secret = getSecret();
  if (!secret || !token || typeof token !== "string") return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload, secret))) return null;

  try {
    const { email, exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof exp !== "number" || exp < Date.now() / 1000) return null;
    return getAdminEmails().has(email) ? email : null;
  } catch {
    return null;
  }
}

export function getAdminEmailFromCookieStore(cookieStore) {
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function getAdminEmailFromRequest(request) {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}
