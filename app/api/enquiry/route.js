import { saveRecord } from "@/lib/records";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

// Sends via Resend's REST API when RESEND_API_KEY and ENQUIRY_NOTIFY_EMAIL are
// set. Failure to notify never fails the enquiry — it's already saved.
async function notify(enquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const rows = [
    ["Name", enquiry.name],
    ["Company", enquiry.company],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Package", enquiry.package],
    ["Budget", enquiry.budget],
    ["Language", enquiry.language],
  ]
    .map(([label, value]) => `<tr><td><b>${label}</b></td><td>${escapeHtml(value)}</td></tr>`)
    .join("");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: to.split(",").map((address) => address.trim()),
        reply_to: enquiry.email,
        subject: `New sponsor enquiry — ${enquiry.company || enquiry.name}`,
        html: `<table>${rows}</table><p>${escapeHtml(enquiry.message).replace(/\n/g, "<br>")}</p>`,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.error("Enquiry email failed", response.status, await response.text());
    }
  } catch (error) {
    console.error("Enquiry email failed", error);
  }
}

export async function POST(request) {
  if (!rateLimit(`enquiry:${clientIp(request)}`, { limit: 5, windowMs: 60 * 60 * 1000 })) {
    return Response.json({ error: "Too many enquiries. Please try again later." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots don't retry.
  if (body.website) {
    return Response.json({ ok: true });
  }

  if (!EMAIL_PATTERN.test(String(body.email ?? "").trim())) {
    return Response.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  try {
    // Never let the public form choose an id (that would update an existing row).
    const saved = await saveRecord("sponsor_enquiries", { ...body, id: undefined, status: "new" });
    await notify(saved);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to save enquiry", error);
    return Response.json(
      { error: error.status === 400 ? error.message : "Could not save enquiry." },
      { status: error.status ?? 500 },
    );
  }
}
