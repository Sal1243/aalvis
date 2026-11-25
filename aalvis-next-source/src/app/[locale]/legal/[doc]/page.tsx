import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { LEGAL, LEGAL_META_KEY } from "@/lib/legal";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(LEGAL).map((doc) => ({ locale, doc }))
  );
}

export async function generateMetadata({ params }: { params: { locale: string; doc: string } }): Promise<Metadata> {
  const languages: Record<string, string> = { "x-default": `${SITE.url}/en/legal/${params.doc}/` };
  for (const l of routing.locales) languages[l] = `${SITE.url}/${l}/legal/${params.doc}/`;
  const alternates = { canonical: `${SITE.url}/${params.locale}/legal/${params.doc}/`, languages };
  if (params.doc === "image-credits") {
    return { title: "Image Credits — AALVIS", description: "Licence credits for the imagery used on the AALVIS website.", alternates };
  }
  const key = LEGAL_META_KEY[params.doc];
  if (!key) return {};
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  return { title: t(`${key}.title`), description: t(`${key}.description`), alternates };
}

export default function LegalPage({ params: { locale, doc } }: { params: { locale: string; doc: string } }) {
  setRequestLocale(locale);
  const entry = LEGAL[doc];
  if (!entry) notFound();
  return (
    <div className="alv" data-locale={locale}>
      <div className="sec sec--iv" style={{ paddingTop: "10rem" }}>
        <div className="wrap" style={{ maxWidth: "46rem" }}>
          <span className="eyebrow">AALVIS</span>
          <h1 className="sec-title" style={{ color: "var(--em)", marginBottom: "1.6rem" }}>{entry.title}</h1>
          <p style={{ fontSize: ".78rem", color: "rgba(36,37,34,.5)", border: "1px solid rgba(24,59,56,.2)", borderRadius: 6, padding: ".9rem 1.1rem" }}>
            This document is provided in English for all markets. A certified translation is available on request. · Sample version — pending client legal review.
          </p>
          {entry.sections.map(([h, p]) => (
            <section key={h}>
              <h2 className="alv-serif" style={{ fontSize: "1.35rem", color: "#183B38", margin: "2rem 0 .6rem" }}>{h}</h2>
              <p style={{ color: "rgba(36,37,34,.74)", fontSize: ".92rem" }}>{p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
