"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import Image from "next/image";
import { IM } from "@/lib/images";
import { Magnetic } from "./ui";

const SPARKS = [["16%", "10%", "0s"], ["28%", "78%", "1.1s"], ["62%", "6%", "2.2s"], ["74%", "86%", "3.1s"], ["44%", "92%", "1.7s"]] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const words = t("title").split(/\s+/);
  let ci = 0;
  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero-txt">
        <span className="eyebrow rv in">{t("eyebrow")}</span>
        <h1 aria-label={t("title")}>
          {words.map((w, wi) => (
            <span className="wl" key={wi} aria-hidden="true">
              <span className="w">
                {w.split("").map((ch, i) => {
                  const d = 0.25 + ci++ * 0.045;
                  return (
                    <motion.span key={i} className={"c" + (ch === "." ? " dot" : "")}
                      initial={reduced ? false : { y: "115%", rotate: 4 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{ duration: 0.9, ease: [0.16, 0.68, 0.3, 1], delay: d }}>
                      {ch}
                    </motion.span>
                  );
                })}
              </span>
            </span>
          ))}
        </h1>
        <motion.p className="hero-sub" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }}>
          {t("subtitle")}
        </motion.p>
        <motion.div className="hero-ctas" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }}>
          <Magnetic className="btn btn--ch" href="#story">{t("ctaPrimary")}</Magnetic>
          <Magnetic className="btn" href="#collections">{t("ctaSecondary")}</Magnetic>
        </motion.div>
      </div>
      <motion.div className="hero-media" style={{ y, scale }}>
        <div className="hero-ring" aria-hidden="true" />
        <motion.div className="hero-arch"
          initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.3, ease: [0.16, 0.68, 0.3, 1], delay: 0.35 }}>
          <Image src={IM.hero.url} alt={t("imageAlt")} fill priority sizes="(max-width: 860px) 70vw, 30rem"
            style={{ objectFit: "cover" }} />
          {SPARKS.map(([top, left, sd], i) => (
            <i key={i} className="spark" style={{ top, left, ["--sd" as never]: sd }} aria-hidden="true" />
          ))}
        </motion.div>
      </motion.div>
      <div className="hero-scroll" aria-hidden="true"><span>{t("scroll")}</span><i /></div>
    </section>
  );
}
