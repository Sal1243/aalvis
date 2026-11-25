"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SITE, waLink, track } from "@/lib/site";

export default function WhatsAppFab() {
  const t = useTranslations("whatsapp");
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a className={"wafab" + (on ? " wafab--on" : "")} href={waLink(t("message"))} target="_blank" rel="noopener"
      aria-label={t("aria")} onClick={() => track("aalvis_whatsapp_click", { placement: "fab" })}>
      <span className="wafab-tip">{t("tooltip")}</span>
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.6.8 5 2.3 7L4 29l7.2-2.2c1.9 1 4.1 1.6 6.4 1.6h.1c6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-2 0-4-.5-5.7-1.6l-.4-.2-4.3 1.3 1.3-4.1-.3-.4A9.8 9.8 0 0 1 6.2 15c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
      </svg>
    </a>
  );
}
