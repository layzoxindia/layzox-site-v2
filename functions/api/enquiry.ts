interface Env {
  RESEND_API_KEY?: string;
  ENQUIRY_TO_EMAIL?: string;
  ENQUIRY_FROM_EMAIL?: string;
}
type Fields = Record<string, unknown>;
const EMAIL = /^[^\s@,;<>"']+@[^\s@,;<>"']+\.[^\s@,;<>"']{2,}$/;
const clean = (v: unknown, max: number, multiline = false) =>
  typeof v === "string"
    ? v.replace(multiline ? /[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f]/g : /[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max)
    : "";
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const hits = new Map<string, number[]>();
// Use a local structural context type: Cloudflare detects the named export at runtime.
// This avoids requiring Cloudflare-specific ambient types for the shared Next.js typecheck.
type EnquiryContext = { request: Request; env: Env };
export const onRequestPost = async ({ request, env }: EnquiryContext): Promise<Response> => {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try { if (new URL(origin).host !== host) return json({ ok: false, error: "Request not allowed." }, 403); }
    catch { return json({ ok: false, error: "Request not allowed." }, 403); }
  }
  const ip = (request.headers.get("cf-connecting-ip") || "unknown").slice(0, 80);
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
  if (recent.length >= 5) return json({ ok: false, error: "Too many requests. Please try again in a few minutes." }, 429);
  recent.push(now); hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  let body: Fields;
  if (!(request.headers.get("content-type") || "").toLowerCase().includes("application/json"))
    return json({ ok: false, error: "Invalid request." }, 415);
  try {
    if (Number(request.headers.get("content-length") || 0) > 20000) return json({ ok: false, error: "Request too large." }, 413);
    // Read as text so a body sent without Content-Length (chunked) is still size-limited.
    const raw = await request.text();
    if (raw.length > 20000) return json({ ok: false, error: "Request too large." }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ ok: false, error: "Invalid request." }, 400);
    body = parsed as Fields;
  } catch { return json({ ok: false, error: "Invalid request." }, 400); }
  if (clean(body.website, 200)) return json({ ok: true });
  const kind = body.kind === "waitlist" ? "waitlist" : body.kind === "project" ? "project" : body.kind === "resource" ? "resource" : "";
  if (!kind) return json({ ok: false, error: "Unknown form." }, 400);
  const f = {
    name: clean(body.name, 120), phone: clean(body.phone, 40), email: clean(body.email, 160),
    company: clean(body.company, 160), type: clean(body.type, 80), message: clean(body.message, 4000, true),
    page: clean(body.page, 200)
  };
  if (f.email && !EMAIL.test(f.email)) return json({ ok: false, error: "That email address does not look right." }, 400);
  if (kind === "project") {
    if (!f.name) return json({ ok: false, error: "Tell us your name." }, 400);
    if (!f.phone && !f.email) return json({ ok: false, error: "Add an email or a phone number so we can reply." }, 400);
    if (f.phone && f.phone.replace(/\D/g, "").length < 8) return json({ ok: false, error: "That phone number looks too short." }, 400);
    if (!f.message) return json({ ok: false, error: "Describe what needs to improve." }, 400);
  } else if (!f.email) return json({ ok: false, error: "Enter a valid email address." }, 400);
  if (!env.RESEND_API_KEY || !env.ENQUIRY_TO_EMAIL) {
    return json({ ok: false, fallback: true, error: "Email is not configured. Please call or WhatsApp us." }, 503);
  }
  const subject = kind === "project" ? `New project enquiry from ${f.name}` : (kind === "resource" ? `Resource download (${f.type || "resource"}): ${f.email}` : `Product waitlist: ${f.email}`);
  const lines = [
    `Type: ${kind}`, f.name && `Name: ${f.name}`, f.phone && `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`, f.company && `Company: ${f.company}`, f.type && `Project type: ${f.type}`,
    f.message && `\nMessage:\n${f.message}`, f.page && `\nSent from: ${f.page}`
  ].filter(Boolean);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.ENQUIRY_FROM_EMAIL || "Layzox Website <onboarding@resend.dev>",
        to: env.ENQUIRY_TO_EMAIL.split(",").map((x) => x.trim()),
        subject, text: lines.join("\n"), ...(f.email ? { reply_to: f.email } : {})
      })
    });
    if (!res.ok) return json({ ok: false, error: "We could not deliver your enquiry. Please call or WhatsApp us." }, 502);
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "We could not deliver your enquiry. Please call or WhatsApp us." }, 502);
  }
};

// Anything other than POST gets a clear 405 instead of falling through to a static 404.
export const onRequest = async (): Promise<Response> =>
  new Response(JSON.stringify({ ok: false, error: "Method not allowed." }), {
    status: 405,
    headers: { "content-type": "application/json; charset=utf-8", allow: "POST", "cache-control": "no-store" }
  });
