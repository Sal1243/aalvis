"use client";
/* Loading experience, page-transition curtain and custom cursor. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";

function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (reduced) { setDone(true); return; }
    let fired = false;
    const finish = () => { if (!fired) { fired = true; setTimeout(() => setDone(true), 650); } };
    const img = document.querySelector(".hero-arch img") as HTMLImageElement | null;
    if (img?.complete) setTimeout(finish, 500);
    else img?.addEventListener("load", () => setTimeout(finish, 350), { once: true });
    window.addEventListener("load", () => setTimeout(finish, 400), { once: true });
    const cap = setTimeout(finish, 2600);
    return () => clearTimeout(cap);
  }, [reduced]);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="pre" aria-hidden="true" exit={{ y: "-101%" }} transition={{ duration: 0.9, ease: [0.65, 0.05, 0.36, 1] }}>
          <div className="pre-logo">
            {"AALVIS".split("").map((ch, i) => (
              <span key={i} style={{ animationDelay: `${0.12 + i * 0.09}s` }}>{ch}</span>
            ))}
          </div>
          <i className="pre-line" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Curtain() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const first = useRef(true);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (reduced) return;
    setOn(true);
    const t = setTimeout(() => setOn(false), 700);
    return () => clearTimeout(t);
  }, [pathname, reduced]);
  return <div className={"ptc" + (on ? " ptc--on" : "")} aria-hidden="true" />;
}

function Cursor() {
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    let mx = -100, my = -100, dx = -100, dy = -100, rx = -100, ry = -100, raf = 0, on = false;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!on && dot.current && ring.current) { on = true; dot.current.classList.add("cur--on"); ring.current.classList.add("cur-r--on"); }
      const t = (e.target as HTMLElement).closest?.("a,button,.col-card,input,select,textarea,.feat-media");
      ring.current?.classList.toggle("cur-r--big", !!t);
    };
    const out = () => { on = false; dot.current?.classList.remove("cur--on"); ring.current?.classList.remove("cur-r--on"); };
    const loop = () => {
      dx += (mx - dx) * 0.42; dy += (my - dy) * 0.42;
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${dx}px,${dy}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", out);
    raf = requestAnimationFrame(loop);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", out); cancelAnimationFrame(raf); };
  }, [reduced]);
  if (reduced) return null;
  return (<><div className="cur" ref={dot} aria-hidden="true" /><div className="cur-r" ref={ring} aria-hidden="true" /></>);
}

export default function Chrome() {
  return (<><Preloader /><Curtain /><Cursor /></>);
}
