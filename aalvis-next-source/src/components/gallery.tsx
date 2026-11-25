import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { GAL_M } from "@/lib/images";
import { Reveal } from "./ui";

const RATIOS = ["3/4", "1/1", "4/5"];

export default async function Gallery() {
  const t = await getTranslations("gallery");
  return (
    <section className="sec sec--iv" id="gallery">
      <div className="wrap">
        <Reveal className="sec-head" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>{t("eyebrow")}</span>
          <h2 className="sec-title">{t("title")}</h2>
          <p className="sec-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>{t("subtitle")}</p>
        </Reveal>
        <div className="gal">
          {GAL_M.map((im, i) => (
            <Reveal key={im.url} delay={i * 0.06}>
              <figure className="sweep" style={{ aspectRatio: RATIOS[i % RATIOS.length] }}>
                <Image src={im.url} alt={t(`captions.${i + 3}`)} fill loading="lazy" sizes="(max-width:640px) 92vw, 30vw" style={{ objectFit: "cover" }} />
                <figcaption>{t(`captions.${i + 3}`)}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal style={{ textAlign: "center", marginTop: "2.6rem" }}>
          <a className="btn" href="#contact" data-track="gallery_enquire">{t("cta")}</a>
        </Reveal>
      </div>
    </section>
  );
}
