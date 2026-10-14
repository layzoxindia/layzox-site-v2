import { ENQUIRY_ENDPOINT, company } from "./content";

export type EnquiryResult = { ok: boolean; mode: "endpoint" | "whatsapp"; error?: string; url?: string; opened?: boolean };

/** The form endpoint is always configured (it defaults to /api/enquiry). */
export const hasEndpoint = ENQUIRY_ENDPOINT.length > 0;

export function whatsappUrl(text: string) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
}

function openWhatsApp(summary: string): EnquiryResult {
  const url = whatsappUrl(summary);
  // Browsers may block a tab opened after an await. When that happens the caller shows the link as a button.
  const w = typeof window !== "undefined" ? window.open(url, "_blank") : null;
  return { ok: true, mode: "whatsapp", url, opened: !!w };
}

export async function sendEnquiry(
  kind: "project" | "waitlist",
  fields: Record<string, string>,
  summary: string
): Promise<EnquiryResult> {
  if (!hasEndpoint) return openWhatsApp(summary);
  try {
    const res = await fetch(ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, ...fields, page: typeof location !== "undefined" ? location.pathname : "" }),
    });
    if (res.ok) return { ok: true, mode: "endpoint" };
    const body = (await res.json().catch(() => ({}))) as { fallback?: boolean; error?: string };
    // Mail is not configured on the server yet: hand off to WhatsApp instead of losing the lead.
    if (res.status === 503 && body.fallback) return openWhatsApp(summary);
    return { ok: false, mode: "endpoint", error: body.error ?? "The server did not accept the enquiry. Please try again, or call us." };
  } catch {
    return { ok: false, mode: "endpoint", error: "Could not reach the server. Please try again, or call us." };
  }
}
