import crypto from "node:crypto";

export const ADMIN_SESSION_COOKIE = "matheesha_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

const ALLOWED_ADMIN_EMAILS = new Set([
  "inokagunn@gmail.com",
  "aakashwije92@gmail.com",
]);

const ADMIN_PASSWORD = "matheesha123";

function getSecret() {
  return (
    process.env.ADMIN_AUTH_SECRET ||
    "matheesha-portfolio-admin-session-secret-v1"
  );
}

function signEmail(email) {
  return crypto.createHmac("sha256", getSecret()).update(email).digest("hex");
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function validateAdminCredentials(email, password) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  return ALLOWED_ADMIN_EMAILS.has(normalizedEmail) && password === ADMIN_PASSWORD
    ? normalizedEmail
    : null;
}

export function createAdminSessionToken(email) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const encodedEmail = Buffer.from(normalizedEmail, "utf8").toString("base64url");
  return `${encodedEmail}.${signEmail(normalizedEmail)}`;
}

export function verifyAdminSessionToken(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const [encodedEmail, signature] = token.split(".");
  if (!encodedEmail || !signature) {
    return null;
  }

  let email;
  try {
    email = Buffer.from(encodedEmail, "base64url").toString("utf8").trim().toLowerCase();
  } catch {
    return null;
  }

  if (!ALLOWED_ADMIN_EMAILS.has(email)) {
    return null;
  }

  return safeEqual(signature, signEmail(email)) ? email : null;
}

export function getAdminEmailFromCookieStore(cookieStore) {
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function getAdminEmailFromRequest(request) {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}
