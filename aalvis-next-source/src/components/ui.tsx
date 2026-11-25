"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

export function Reveal({ children, delay = 0, className, style }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={style as never}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
      transition={{ duration: 0.95, ease: [0.2, 0.65, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
      transition={{ duration: 1.2, ease: [0.16, 0.68, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children, className, href, onClick, type, disabled }: {
  children: ReactNode; className?: string; href?: string; onClick?: () => void; type?: "submit" | "button"; disabled?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const move = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left - r.width / 2) / r.width;
    const py = (e.clientY - r.top - r.height / 2) / r.height;
    ref.current.style.transform = `translate(${(px * 10).toFixed(1)}px, ${(py * 8).toFixed(1)}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  const props = {
    ref: ref as never, onMouseMove: move, onMouseLeave: leave, className, disabled,
    "data-mag": "1",
  };
  if (href) return <a href={href} {...props}>{children}</a>;
  return <button type={type || "button"} onClick={onClick} {...props}>{children}</button>;
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M1 7h11M8 3l4 4-4 4" />
    </svg>
  );
}

export function Logo({ href = "#home" }: { href?: string }) {
  return (
    <a className="logo" href={href}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M12 2 L22 12 L12 22 L2 12 Z" /><path d="M12 7 L17 12 L12 17 L7 12 Z" />
      </svg>
      AALVIS
    </a>
  );
}
