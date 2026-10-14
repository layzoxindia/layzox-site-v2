"use client";

import { useEffect, useRef } from "react";

/* Page-level polish: a scroll progress line and a staggered reveal for headings, copy and cards.
   Content is visible by default. The hidden starting state only exists once this runs (html.fx),
   so without JavaScript, or with reduced motion, nothing is ever hidden. */
const GROUPS = [".sec-head > *", ".process-head > *", ".contact-copy > h2", ".page-hero .wrap > *", ".cta-inner > *"];

export default function Fx() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll progress line
    let raf = 0;
    const paint = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Reveal
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            (e.target as HTMLElement).setAttribute("data-in", "");
            io?.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      for (const sel of GROUPS) {
        document.querySelectorAll<HTMLElement>(sel).forEach((el, i) => {
          el.setAttribute("data-rv", "");
          el.style.setProperty("--rd", `${Math.min(i, 6) * 70}ms`);
          io!.observe(el);
        });
      }
      document.documentElement.classList.add("fx");
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      document.documentElement.classList.remove("fx");
      document.querySelectorAll("[data-rv]").forEach((el) => {
        el.removeAttribute("data-rv");
        el.removeAttribute("data-in");
      });
    };
  }, []);

  return <div className="progress" aria-hidden="true"><div ref={bar} className="progress-bar" /></div>;
}
