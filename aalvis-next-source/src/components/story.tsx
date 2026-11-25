import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { IM } from "@/lib/images";
import { Reveal, MaskReveal } from "./ui";

export default async function Story() {
  const t = await getTranslations("story");
  const g = await getTranslations("gallery");
  const pillars = ["philosophy", "inspiration", "heritage", "identity"] as const;
  return (
    <section className="sec sec--ivw" id="story">
      <div className="wrap story-grid">
        <div className="story-imgs">
          <MaskReveal>
            <Image src={IM.atelier.url} alt={t("imageAltAtelier")} fill loading="lazy" sizes="(max-width: 860px) 70vw, 34vw" style={{ objectFit: "cover" }} />
          </MaskReveal>
          <MaskReveal delay={0.15}>
            <Image src={IM.gallery[2].url} alt={g("captions.2")} fill loading="lazy" sizes="(max-width: 860px) 60vw, 30vw" style={{ objectFit: "cover" }} />
          </MaskReveal>
        </div>
        <div className="story-txt">
          <Reveal><span className="eyebrow">{t("eyebrow")}</span><h2 className="sec-title">{t("title")}</h2></Reveal>
          <Reveal delay={0.1}><p>{t("p1")}</p></Reveal>
          <Reveal delay={0.16}><p>{t("p2")}</p></Reveal>
          <Reveal delay={0.22}><p>{t("p3")}</p></Reveal>
          <Reveal delay={0.28}><blockquote className="quote">{t("quote")}</blockquote><div className="quote-by">{t("quoteAuthor")}</div></Reveal>
          <Reveal delay={0.34}><h3 style={{ marginTop: "2.6rem", fontSize: ".72rem", letterSpacing: ".34em", textTransform: "uppercase", fontFamily: "var(--sans)", color: "var(--rose)" }}>{t("pillarsTitle")}</h3></Reveal>
          <div className="pillars">
            {pillars.map((p, i) => (
              <Reveal key={p} delay={i * 0.08} className="pillar">
                <h3>{t(`pillars.${p}.title`)}</h3>
                <p>{t(`pillars.${p}.text`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
