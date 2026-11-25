"use client";
/* Pinned horizontal campaign gallery (desktop) with native
   scroll-snap fallback on touch / small screens / reduced motion. */
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IM, GAL_H } from "@/lib/images";
import { Magnetic } from "./ui";

export default function Campaign() {
  const t = useTranslations("campaign");
  const g = useTranslations("gallery");
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [total, setTotal] = useState(0);
  const [vh, setVh] = useState(800);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -total]);

  useEffect(() => {
    const compute = () => {
      const isDesktop = window.innerWidth >= 1024 && !reduced && window.matchMedia("(pointer: fine)").matches;
      setDesktop(isDesktop);
      setVh(window.innerHeight);
      if (isDesktop && track.current) setTotal(Math.max(0, track.current.scrollWidth - window.innerWidth));
      else setTotal(0);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [reduced]);

  const slides = [
    { src: IM.campaign.url, alt: t("imageAlt"), cap: t("title") },
    ...GAL_H.map((im, i) => ({ src: im.url, alt: g(`captions.${i}`), cap: g(`captions.${i}`) })),
  ];

  return (
    <section className={"hgal" + (desktop ? "" : " hgal--native")} id="campaign" aria-label={t("eyebrow")} ref={section}
      style={desktop && total ? { height: total + vh } : undefined}>
      <div className="hgal-sticky">
        <motion.div className="hgal-track" ref={track} style={desktop ? { x } : undefined}>
          <div className="hgal-head">
            <span className="eyebrow">{t("eyebrow")}</span>
            <div className="type-xl">{t("title")}</div>
            <p className="sec-sub">{t("text")}</p>
            <Magnetic className="btn btn--ch" href="#collections">{t("cta")}</Magnetic>
          </div>
          {slides.map((s, i) => (
            <div className="hgal-slide" key={i}>
              <figure className="sweep" style={{ position: "relative" }}>
                <Image src={s.src} alt={s.alt} fill loading="lazy" sizes="(max-width:1024px) 78vw, 46vw" style={{ objectFit: "cover", aspectRatio: "4/5" }} />
                <figcaption>{s.cap}</figcaption>
              </figure>
            </div>
          ))}
        </motion.div>
        <div className="hgal-bar" aria-hidden="true">
          <motion.i style={{ scaleX: desktop ? scrollYProgress : 0, transformOrigin: "left", display: "block", height: 1, background: "var(--ch)" }} />
        </div>
      </div>
    </section>
  );
}
