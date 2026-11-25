import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { COLL_KEYS, IM, VITRINE, type CollKey } from "@/lib/images";
import { Reveal, Arrow } from "./ui";

const POS = ["col-a", "col-b", "col-c", "col-d", "col-e", "col-f"];

export default async function Collections() {
  const t = await getTranslations("collections");
  return (
    <section className="sec sec--iv" id="collections">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="sec-title">{t("title")}</h2>
          <p className="sec-sub">{t("subtitle")}</p>
        </Reveal>
        <div className="cols">
          {COLL_KEYS.map((k: CollKey, i) => (
            <Reveal key={k} delay={i * 0.07} className={POS[i]}>
              <a className={"col-card sweep" + (VITRINE.has(k) ? " col-card--vitrine" : "")} href="#contact" aria-label={t(`items.${k}.name`)}>
                <Image src={IM[k].url} alt={`${t(`items.${k}.name`)} — AALVIS`} fill loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  style={{ objectFit: VITRINE.has(k) ? "contain" : "cover", padding: VITRINE.has(k) ? "13% 11%" : 0 }} />
                <span className="col-veil" />
                <span className="col-body">
                  <span className="col-n">0{i + 1}</span>
                  <span className="col-name alv-serif">{t(`items.${k}.name`)}</span>
                  <span className="col-desc">{t(`items.${k}.description`)}</span>
                  <span className="col-cta">{t("cta")} <Arrow /></span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
