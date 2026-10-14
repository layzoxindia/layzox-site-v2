import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = Partial<Record<"kind" | "name" | "phone" | "email" | "company" | "type" | "message" | "page" | "website", unknown>>;

// Small in-memory limiter: five submissions per IP per ten minutes. Good enough for a marketing
// site on one instance; use a shared store (Upstash, Vercel KV) if traffic ever warrants it.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

// Trim, cap length and drop control characters (CR/LF would otherwise reach the email subject).
// `multiline` keeps line breaks for the message body only.
const clean = (v: unknown, max: number, multiline = false) =>
  typeof v === "string"
    ? v
        .replace(multiline ? /[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f]/g : /[\u0000-\u001f\u007f]/g, " ")
        .trim()
        .slice(0, max)
    : "";
// Single address only: no commas, semicolons, angle brackets or quotes, so it cannot add recipients.
const EMAIL = /^[^\s@,;<>"']+@[^\s@,;<>"']+\.[^\s@,;<>"']{2,}$/;
const bad = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {
      return bad("Request not allowed.", 403);
    }
    if (originHost !== host) return bad("Request not allowed.", 403);
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return bad("Too many requests. Please try again in a few minutes.", 429);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return bad("Invalid request.");
  }

  // Honeypot: real visitors never fill this. Pretend success so bots learn nothing.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const kind = body.kind === "waitlist" ? "waitlist" : body.kind === "project" ? "project" : "";
  if (!kind) return bad("Unknown form.");

  const f = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    company: clean(body.company, 160),
    type: clean(body.type, 80),
    message: clean(body.message, 4000, true),
    page: clean(body.page, 200),
  };

  if (f.email && !EMAIL.test(f.email)) return bad("That email address does not look right.");
  if (kind === "project") {
    if (!f.name) return bad("Tell us your name.");
    if (!f.phone && !f.email) return bad("Add an email or a phone number so we can reply.");
    if (f.phone && f.phone.replace(/\D/g, "").length < 8) return bad("That phone number looks too short.");
    if (!f.message) return bad("Describe what needs to improve.");
  } else if (!f.email) {
    return bad("Enter a valid email address.");
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!key || !to) {
    // Not configured: tell the browser to hand the lead to WhatsApp instead of dropping it.
    return NextResponse.json({ ok: false, fallback: true, error: "Email is not configured." }, { status: 503 });
  }

  const subject =
    kind === "project" ? `New project enquiry from ${f.name}` : `Product waitlist: ${f.email}`;
  const lines = [
    `Type: ${kind}`,
    f.name && `Name: ${f.name}`,
    f.phone && `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    f.company && `Company: ${f.company}`,
    f.type && `Project type: ${f.type}`,
    f.message && `\nMessage:\n${f.message}`,
    f.page && `\nSent from: ${f.page}`,
  ].filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL ?? "Layzox Website <onboarding@resend.dev>",
        to: to.split(",").map((x) => x.trim()),
        subject,
        text: lines.join("\n"),
        ...(f.email ? { reply_to: f.email } : {}),
      }),
    });
    if (!res.ok) return bad("We could not deliver your enquiry. Please call or WhatsApp us.", 502);
    return NextResponse.json({ ok: true });
  } catch {
    return bad("We could not deliver your enquiry. Please call or WhatsApp us.", 502);
  }
}
