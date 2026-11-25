"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALES, NATIVE, type LocaleCode } from "@/lib/locales";
import { useLocale } from "next-intl";

export default function LanguagePicker() {
  const t = useTranslations("language");
  const locale = useLocale() as LocaleCode;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); };
  }, []);
  return (
    <div className={"lang" + (open ? " lang--open" : "")} ref={wrap}>
      <button className="lang-btn" type="button" aria-haspopup="listbox" aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
        {NATIVE[locale]}
        <svg className="caret" width="9" height="6" viewBox="0 0 9 6" fill="none" stroke="currentColor" aria-hidden="true"><path d="M1 1l3.5 3.5L8 1" /></svg>
      </button>
      <div className="lang-menu" role="listbox" aria-label={t("label")}>
        {LOCALES.map((l) => (
          <Link key={l} href={pathname} locale={l} lang={l}
            aria-current={l === locale ? "true" : undefined}
            onClick={() => { try { localStorage.setItem("aalvis_lang", l); } catch { /* private mode */ } }}>
            <span>{NATIVE[l]}</span><span className="code">{l}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
