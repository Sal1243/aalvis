"use client";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { SITE, waLink, track } from "@/lib/site";
import { Reveal } from "./ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const t = useTranslations("newsletter");
  const w = useTranslations("whatsapp");
  const locale = useLocale();
  const [msg, setMsg] = useState<{ text: string; err?: boolean } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") || "").trim();
    if (!EMAIL_RE.test(email)) { setMsg({ text: t("error"), err: true }); return; }
    try {
      if (SITE.newsletterEndpoint) {
        const r = await fetch(SITE.newsletterEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, locale }),
        });
        if (!r.ok) throw new Error("endpoint " + r.status);
        track("aalvis_newsletter", { channel: "endpoint" });
      } else {
        /* No ESP configured → honest WhatsApp opt-in handoff. Never simulated. */
        window.open(waLink(`${w("message")}\n\n• ${email}`), "_blank", "noopener");
        track("aalvis_newsletter", { channel: "whatsapp" });
      }
      setMsg({ text: t("success") });
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setMsg({ text: t("error"), err: true });
    }
  }

  return (
    <section className="sec sec--ivw nws" id="newsletter">
      <Reveal className="wrap">
        <span className="eyebrow" style={{ justifyContent: "center" }}>{t("title")}</span>
        <p className="sec-sub" style={{ margin: "1rem auto 0" }}>{t("text")}</p>
        <form id="aalvis-news-form" className="nws-form" noValidate onSubmit={onSubmit}>
          <label className="hp" htmlFor="an-email">Email</label>
          <input id="an-email" type="email" placeholder={t("placeholder")} required name="email" />
          <button className="btn btn--ch" type="submit">{t("cta")}</button>
        </form>
        <div className="nws-status" role="status" aria-live="polite" style={msg?.err ? { color: "var(--rose)" } : undefined}>
          {msg?.text || ""}
        </div>
        <p className="nws-note">{t("note")}</p>
      </Reveal>
    </section>
  );
}
