import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FEAT, IM } from "@/lib/images";
import { Reveal, MaskReveal, Arrow } from "./ui";

export default async function Featured() {
  const t = await getTranslations("featured");
  return (
    <section className="sec sec--em" id="featured">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="sec-title">{t("title")}</h2>
          <p className="sec-sub">{t("subtitle")}</p>
        </Reveal>
        <div className="feats">
          {FEAT.map(({ key, vitrine }, i) => (
            <div className={"feat" + (i % 2 ? " feat--rev" : "")} key={key}>
              <MaskReveal className={"feat-media" + (vitrine ? " feat-media--vitrine" : "")}>
                <span className="feat-tag">{t(`items.${key}.category`)}</span>
                <Image src={IM[key].url} alt={`${t(`items.${key}.name`)} — ${t(`items.${key}.category`)}`} fill
                  loading="lazy" sizes="(max-width: 860px) 92vw, 44vw"
                  style={{ objectFit: vitrine ? "contain" : "cover" }} />
              </MaskReveal>
              <Reveal delay={0.12}>
                <span className="feat-cat">{t(`items.${key}.category`)}</span>
                <h3 className="feat-name">{t(`items.${key}.name`)}</h3>
                <p className="feat-desc">{t(`items.${key}.description`)}</p>
                <a className="link-arrow" href="#gallery" data-track={`featured_${key}`}>{t("cta")} <Arrow /></a>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
