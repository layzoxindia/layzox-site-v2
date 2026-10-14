"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Link from "next/link";
import { services } from "@/lib/content";
import { ArrowUpRight, Check } from "./Icons";
import { Scene } from "./Scenes";
import type { SceneId } from "./Scenes";

const N = services.length;

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v: number) => {
    if (reduce) return;
    const next = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    setActive((cur) => (cur === next ? cur : next));
  });

  function go(i: number) {
    const el = ref.current;
    if (!el || reduce) {
      setActive(i);
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * ((i + 0.5) / N), behavior: "smooth" });
  }

  const s = services[active];

  return (
    <section id="services" className="services" aria-label="Services">
      <div className="wrap">
        <header className="sec-head sec-head-tight">
          <h2 className="h2">What we build</h2>
          <p className="lead">Six services, one standard of delivery. Scroll to watch each one at work.</p>
        </header>
      </div>

      {/* Full text of every service stays in the page for search engines and screen readers. */}
      <ul className="sr-only">
        {services.map((x) => (
          <li key={x.id}>
            <Link href={x.slug}>{x.name}</Link>: {x.summary} {x.points.join(". ")}
          </li>
        ))}
      </ul>

      <div
        ref={ref}
        className={`films${reduce ? " films-static" : ""}`}
        style={{ "--chapters": N } as React.CSSProperties}
      >
        <div className="films-pin">
          <div className="wrap films-grid">
            <div className="film-copy">
              <div className={`film-text g-${s.id}`} key={s.id}>
                <div className="film-num">
                  <b>{String(active + 1).padStart(2, "0")}</b>
                  <span>/ {String(N).padStart(2, "0")}</span>
                </div>
                <h3 className="film-title display">{s.name}</h3>
                <p className="lead">{s.summary}</p>
                <ul className="film-points">
                  {s.points.map((pt) => (
                    <li key={pt}>
                      <Check />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link className="link-arrow" href={s.slug}>
                  Read more <ArrowUpRight />
                </Link>
              </div>
              <div className="film-nav" role="tablist" aria-label="Services">
                {services.map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    className="film-dot"
                    onClick={() => go(i)}
                  >
                    {String(i + 1).padStart(2, "0")}
                    <span>{x.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <motion.div className="film-stage" key="stage">
              <Scene id={s.id === "automation" ? "automation" : (s.id as SceneId)} label={`Animated example of ${s.name.toLowerCase()}`} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
