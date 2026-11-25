"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import Image from "next/image";
import { IM } from "@/lib/images";
import { Reveal, MaskReveal } from "./ui";

const STEPS = ["metal", "stone", "hand", "light"] as const;

export default function Craft() {
  const t = useTranslations("craft");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <section className="sec sec--gr" id="craftsmanship">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="sec-title">{t("title")}</h2>
          <p className="sec-sub">{t("intro")}</p>
        </Reveal>
        <MaskReveal className="craft-band">
          <div ref={ref} style={{ overflow: "hidden", height: "clamp(20rem, 48vw, 34rem)", position: "relative" }}>
            <motion.div style={{ y: reduced ? undefined : y, scale: 1.12, position: "absolute", inset: 0 }}>
              <Image src={IM.craft.url} alt={t("imageAltMacro")} fill loading="lazy" sizes="100vw"
                style={{ objectFit: "cover", filter: "contrast(1.08) brightness(.85) saturate(.9)" }} />
            </motion.div>
          </div>
        </MaskReveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s} delay={i * 0.09} className="step">
              <span className="step-n">0{i + 1}</span>
              <h3>{t(`steps.${s}.title`)}</h3>
              <p>{t(`steps.${s}.text`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
