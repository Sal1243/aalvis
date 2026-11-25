"use client";
import { useLocale, useMessages, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { SITE, waLink, track } from "@/lib/site";
import { Reveal } from "./ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ().-]{6,20}$/;

type Errors = Partial<Record<"name" | "email" | "phone" | "country" | "subject" | "message" | "consent", string>>;

export default function Contact() {
  const t = useTranslations("contact");
  const w = useTranslations("whatsapp");
  const locale = useLocale();
  const m = useMessages() as unknown as { countries: string[] };
  const started = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "ok" | "err"; title?: string; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const langs = [["en", "English"], ["fr", "Français"], ["de", "Deutsch"], ["es", "Español"], ["it", "Italiano"], ["pt", "Português"], ["nl", "Nederlands"]] as const;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const d = {
      locale,
      name: String(f.get("name") || "").trim(),
      email: String(f.get("email") || "").trim(),
      phone: String(f.get("phone") || "").trim(),
      country: String(f.get("country") || ""),
      lang: String(f.get("preferredLanguage") || locale),
      subject: String(f.get("subject") || ""),
      message: String(f.get("message") || "").trim(),
      company: String(f.get("company") || ""),
    };
    const V = {
      required: t("form.validation.required"), email: t("form.validation.email"), phone: t("form.validation.phone"),
      messageMin: t("form.validation.messageMin"), consent: t("form.validation.consent"),
    };
    const err: Errors = {};
    if (d.name.length < 2) err.name = V.required;
    if (!EMAIL_RE.test(d.email)) err.email = V.email;
    if (d.phone && !PHONE_RE.test(d.phone)) err.phone = V.phone;
    if (!d.country) err.country = V.required;
    if (!d.subject) err.subject = V.required;
    if (d.message.length < 20) err.message = V.messageMin;
    if (!f.get("consent")) err.consent = V.consent;
    setErrors(err);
    if (Object.keys(err).length) return;
    if (d.company) return;                                   // honeypot
    if (Date.now() - started.current < 2500) return;         // timing trap
    setBusy(true); setStatus(null);
    try {
      if (SITE.formEndpoint) {
        /* Configured public form endpoint (e.g. Formspree) — server-side delivery. */
        const r = await fetch(SITE.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(d),
        });
        if (!r.ok) throw new Error("endpoint " + r.status);
        track("aalvis_enquiry", { channel: "endpoint" });
        setStatus({ kind: "ok", title: t("form.successTitle"), text: t("form.successText") });
      } else {
        /* No endpoint configured → honest WhatsApp click-to-chat handoff,
           prefilled with the composed, localized enquiry. Never simulated. */
        const composed =
          `Hello AALVIS — ${t("form.title")}\n• ${t("form.fullName")}: ${d.name}\n• ${t("form.email")}: ${d.email}` +
          (d.phone ? `\n• ${t("form.phone")}: ${d.phone}` : "") +
          `\n• ${t("form.country")}: ${d.country}\n• ${t("form.preferredLanguage")}: ${d.lang}\n• ${t("form.subject")}: ${d.subject}\n\n${d.message}`;
        window.open(waLink(composed), "_blank", "noopener");
        track("aalvis_enquiry", { channel: "whatsapp" });
        setStatus({ kind: "ok", title: t("whatsappTitle"), text: t("whatsappText") });
      }
      (e.currentTarget as HTMLFormElement).reset();
      started.current = Date.now();
    } catch {
      setStatus({ kind: "err", text: t("form.errorText") });
    }
    setBusy(false);
  }

  const fld = (key: keyof Errors, label: string, control: React.ReactNode, hint?: string) => (
    <div className={"fld" + (errors[key] ? " fld--err" : "")} data-f={key}>
      <label htmlFor={`af-${key}`}>{label}</label>
      {control}
      {hint ? <span className="fld-hint">{hint}</span> : null}
      <span className="fld-err">{errors[key] || ""}</span>
    </div>
  );

  return (
    <section className="sec sec--iv" id="contact">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="sec-title">{t("title")}</h2>
          <p className="sec-sub">{t("intro")}</p>
        </Reveal>
        <div className="ctc">
          <Reveal>
            <div className="ctc-card">
              <h3>{t("infoTitle")}</h3>
              <div className="kv"><b>{t("emailLabel")}</b><span>{SITE.email}</span></div>
              <div className="kv"><b>{t("whatsappLabel")}</b><span>+{SITE.whatsapp}</span></div>
              <div className="kv"><b>{t("hoursLabel")}</b><span>{t("hoursValue")}</span></div>
            </div>
            <div className="ctc-card">
              <h3>{t("whatsappTitle")}</h3>
              <p>{t("whatsappText")}</p>
              <p style={{ margin: "1.1rem 0 0" }}>
                <a className="btn" href={waLink(w("message"))} target="_blank" rel="noopener"
                  data-track="contact_whatsapp" onClick={() => track("aalvis_whatsapp_click", { placement: "contact" })}>
                  {t("whatsappCta")}
                </a>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form id="aalvis-contact-form" noValidate onSubmit={onSubmit}>
              <h3 className="alv-serif" style={{ fontSize: "1.6rem", marginBottom: "1.8rem", color: "var(--em)" }}>{t("form.title")}</h3>
              <div className="frow">
                {fld("name", t("form.fullName"), <input id="af-name" name="name" type="text" autoComplete="name" required />)}
                {fld("email", t("form.email"), <input id="af-email" name="email" type="email" autoComplete="email" required />)}
              </div>
              <div className="frow">
                {fld("phone", t("form.phone"), <input id="af-phone" name="phone" type="tel" autoComplete="tel" />, t("form.phoneHint"))}
                {fld("country", t("form.country"), (
                  <select id="af-country" name="country" required>
                    <option value="">{t("form.countryPlaceholder")}</option>
                    {m.countries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                ))}
              </div>
              <div className="frow">
                <div className="fld"><label htmlFor="af-lang">{t("form.preferredLanguage")}</label>
                  <select id="af-lang" name="preferredLanguage" defaultValue={locale}>
                    {langs.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                  </select>
                </div>
                {fld("subject", t("form.subject"), (
                  <select id="af-subject" name="subject" required>
                    <option value="">{t("form.subjectPlaceholder")}</option>
                    {(["collections", "bespoke", "bridal", "appointment", "other"] as const).map((s) => (
                      <option key={s} value={s}>{t(`form.subjects.${s}`)}</option>
                    ))}
                  </select>
                ))}
              </div>
              {fld("message", t("form.message"), <textarea id="af-message" name="message" placeholder={t("form.messagePlaceholder")} required />)}
              <div className="hp" aria-hidden="true"><label>Company<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label></div>
              <label className={"consent fld" + (errors.consent ? " fld--err" : "")} data-f="consent">
                <input type="checkbox" name="consent" required />
                <span>{t("form.consent")} <Link href="/legal/privacy-policy">{t("form.consentLink")}</Link>.</span>
                <span className="fld-err">{errors.consent || ""}</span>
              </label>
              <button className="btn btn--ch" type="submit" disabled={busy}>{busy ? t("form.submitting") : t("form.submit")}</button>
              <p className="fld-hint" style={{ marginTop: "1rem" }}>{t("form.endpointNote")}</p>
              {status && (
                <div className={"frm-status frm-status--on" + (status.kind === "err" ? " frm-status--err" : "")} role={status.kind === "err" ? "alert" : "status"}>
                  {status.title ? <h4>{status.title}</h4> : null}
                  <p style={{ margin: 0 }}>{status.text}</p>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
