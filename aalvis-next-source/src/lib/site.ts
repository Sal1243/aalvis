/* Public, build-time configuration. No secrets ever live here — this is a
   static export: form delivery goes to a configured public form endpoint
   (e.g. Formspree) or falls back to an honest WhatsApp click-to-chat handoff. */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aalvis.example",
  siteName: "AALVIS",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@aalvis.example",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? "919876543210").replace(/[^0-9]/g, ""),
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  newsletterEndpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ?? "",
};

export function waLink(text: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function track(event: string, data: Record<string, unknown> = {}): void {
  try {
    (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event, ...data });
  } catch {
    /* analytics optional */
  }
}
