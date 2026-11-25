import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="alv">
      <div className="sec sec--iv" style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <span className="eyebrow" style={{ justifyContent: "center" }}>AALVIS</span>
          <h1 className="sec-title" style={{ color: "var(--em)" }}>{t("title")}</h1>
          <p className="sec-sub" style={{ margin: "1.2rem auto 2.2rem" }}>{t("text")}</p>
          <Link className="btn btn--ch" href="/">{t("cta")}</Link>
        </div>
      </div>
    </div>
  );
}
