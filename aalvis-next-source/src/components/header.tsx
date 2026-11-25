"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import LanguagePicker from "./language";
import { Logo } from "./ui";
import { LOCALES, NATIVE, type LocaleCode } from "@/lib/locales";

const NAV = [["home", "#home"], ["collections", "#collections"], ["story", "#story"], ["craftsmanship", "#craftsmanship"], ["gallery", "#gallery"], ["contact", "#contact"]] as const;

function SuggestBar() {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const [target, setTarget] = useState<LocaleCode | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem("aalvis_lang"); } catch { /* ignore */ }
    if (stored) return;
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase() as LocaleCode;
    if (nav === locale || !LOCALES.includes(nav)) return;
    setTarget(nav);
    const tm = setTimeout(() => setOn(true), 2600);
    return () => clearTimeout(tm);
  }, [locale]);
  if (!target) return null;
  return (
    <div className={"sugg" + (on ? " sugg--on" : "")} role="region" aria-label={t("label")}>
      <span>{t("suggestion")} <Link href={pathname} locale={target} lang={target}>{NATIVE[target]}</Link></span>
      <button type="button" onClick={() => { setOn(false); try { localStorage.setItem("aalvis_lang", locale); } catch { /* ignore */ } }}>
        {t("dismissSuggestion")}
      </button>
    </div>
  );
}

export default function Header() {
  const t = useTranslations();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const [annGone, setAnnGone] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    let gone = false;
    try { gone = sessionStorage.getItem("aalvis_ann") === "1"; } catch { /* ignore */ }
    setAnnGone(gone);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);
  return (
    <>
      <a className="alv-skip" href="#collections">{t("nav.collections")}</a>
      <div className={"hdr-stack" + (solid ? " hdr-stack--solid" : "")}>
        {!annGone && (
          <div className="ann" role="region" aria-label="announcement">
            <span>{t("announcement.text")}</span>
            <a href="#contact" data-track="announcement">{t("announcement.cta")}</a>
            <button className="ann-x" type="button" aria-label={t("announcement.close")}
              onClick={() => { setAnnGone(true); try { sessionStorage.setItem("aalvis_ann", "1"); } catch { /* ignore */ } }}>✕</button>
          </div>
        )}
        <header className={"hdr" + (solid ? " hdr--solid" : "")}>
          <Logo href="#home" />
          <div className="hdr-right">
            <nav className="nav" aria-label={t("nav.menu")}>
              {NAV.map(([k, h]) => (
                <a key={k} className="nl" href={h} aria-current={k === "home" ? "page" : undefined}>{t(`nav.${k}`)}</a>
              ))}
            </nav>
            <LanguagePicker />
            <button className="burger" type="button" aria-label={t("nav.openMenu")} aria-expanded={menu} onClick={() => setMenu(true)}>
              <span /><span /><span />
            </button>
          </div>
        </header>
      </div>
      <nav className={"mnav" + (menu ? " mnav--open" : "")} aria-label={t("nav.menu")}>
        <button className="mnav-x" type="button" aria-label={t("nav.closeMenu")} onClick={() => setMenu(false)}>✕</button>
        {NAV.map(([k, h], i) => (
          <a key={k} className="mnl" href={h} style={{ transitionDelay: menu ? `${0.12 + i * 0.07}s` : "0s" }} onClick={() => setMenu(false)}>
            {t(`nav.${k}`)}
          </a>
        ))}
        <LanguagePicker />
      </nav>
      <SuggestBar />
    </>
  );
}
