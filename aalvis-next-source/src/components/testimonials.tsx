"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "./ui";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const reduced = useReducedMotion();
  const items = [0, 1, 2];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 8000);
    return () => clearInterval(id);
  }, [reduced, items.length]);
  const go = (n: number) => setI((n + items.length) % items.length);
  return (
    <section className="sec sec--em" id="testimonials">
      <div className="wrap">
        <Reveal className="sec-head" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>{t("eyebrow")}</span>
          <h2 className="sec-title">{t("title")}</h2>
          <p className="sec-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>{t("subtitle")}</p>
        </Reveal>
        <Reveal>
          <div className="tst" onMouseEnter={() => undefined}>
            {items.map((k) => (
              <div key={k} className={"tst-slide" + (k === i ? " tst-slide--on" : "")} role="group" aria-label={`${k + 1}/${items.length}`}>
                <p className="tst-q">{t(`items.${k}.quote`)}</p>
                <div className="tst-by">{t(`items.${k}.name`)}</div>
                <div className="tst-loc">{t(`items.${k}.location`)}</div>
              </div>
            ))}
            <div className="tst-ctl">
              <button className="tst-btn" type="button" aria-label={t("prev")} onClick={() => go(i - 1)}>
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" aria-hidden="true"><path d="M13 7H2M6 3L2 7l4 4" /></svg>
              </button>
              <div className="tst-dots">
                {items.map((k) => (
                  <button key={k} className="tst-dot" type="button" aria-label={`${k + 1}`} aria-current={k === i ? "true" : undefined} onClick={() => go(k)} />
                ))}
              </div>
              <button className="tst-btn" type="button" aria-label={t("next")} onClick={() => go(i + 1)}>
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" aria-hidden="true"><path d="M1 7h11M8 3l4 4-4 4" /></svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
