import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE, waLink } from "@/lib/site";
import LanguagePicker from "./language";
import { Logo } from "./ui";

export default async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const coll = await getTranslations("collections.items");
  const wa = await getTranslations("whatsapp");
  const keys = ["gold", "diamond", "rings", "necklaces", "earrings", "bracelets"] as const;
  return (
    <footer className="ftr">
      <div className="ftr-grid">
        <div>
          <Logo href="#home" />
          <p className="ftr-tag">{t("tagline")}</p>
        </div>
        <div>
          <h4>{t("explore")}</h4>
          <a className="fl" href="#home">{nav("home")}</a>
          <a className="fl" href="#collections">{nav("collections")}</a>
          <a className="fl" href="#story">{nav("story")}</a>
          <a className="fl" href="#craftsmanship">{nav("craftsmanship")}</a>
          <a className="fl" href="#gallery">{nav("gallery")}</a>
          <a className="fl" href="#contact">{nav("contact")}</a>
        </div>
        <div>
          <h4>{t("collectionsTitle")}</h4>
          {keys.map((k) => <Link className="fl" key={k} href="/#collections">{coll(`${k}.name`)}</Link>)}
        </div>
        <div>
          <h4>{t("contactTitle")}</h4>
          <a className="fl" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a className="fl" href={waLink(wa("message"))} target="_blank" rel="noopener">WhatsApp</a>
          <h4 style={{ marginTop: "1.8rem" }}>{t("languageTitle")}</h4>
          <LanguagePicker />
          <p className="ftr-tag" style={{ fontSize: ".72rem", marginTop: "1.4rem" }}>{t("socialNote")}</p>
        </div>
      </div>
      <div className="ftr-bar">
        <span>© {new Date().getFullYear()} AALVIS · {t("rights")}</span>
        <nav aria-label={t("legalTitle")}>
          <Link href="/legal/privacy-policy">{t("privacy")}</Link>
          <Link href="/legal/cookies-policy">{t("cookies")}</Link>
          <Link href="/legal/terms-and-conditions">{t("terms")}</Link>
          <Link href="/legal/image-credits">Image credits</Link>
        </nav>
      </div>
    </footer>
  );
}
