"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { story } from "@/lib/content";

type P = MotionValue<number>;

/* ------------------------------------------------------------------ */
/* Pieces driven by one scroll progress value (0 to 1)                 */
/* ------------------------------------------------------------------ */

function Frag({
  p,
  l,
  t,
  r,
  a,
  b,
  className,
  children,
}: {
  p: P;
  l: number;
  t: number;
  r: number;
  a: number;
  b: number;
  className?: string;
  children: ReactNode;
}) {
  const left = useTransform(p, [a, b], [`${l}%`, "50%"]);
  const top = useTransform(p, [a, b], [`${t}%`, "50%"]);
  const rotate = useTransform(p, [a, b], [r, 0]);
  const scale = useTransform(p, [a, b], [1, 0.3]);
  const opacity = useTransform(p, [a, b - 0.1, b], [1, 1, 0]);

  return (
    <motion.div className={`frag ${className ?? ""}`} style={{ left, top, rotate, scale, opacity }}>
      <div className="frag-inner" style={{ animationDelay: `${-((l + t) % 9)}s` }}>
        {children}
      </div>
    </motion.div>
  );
}

function Line({ p, l, t, a, b, bend }: { p: P; l: number; t: number; a: number; b: number; bend: number }) {
  const pathLength = useTransform(p, [a, b], [0, 1]);
  const opacity = useTransform(p, [a, a + 0.04, 0.5, 0.62], [0, 1, 1, 0]);
  const cx = (l + 50) / 2 + bend;
  const cy = (t + 50) / 2 - bend;
  return <motion.path d={`M ${l} ${t} Q ${cx} ${cy} 50 50`} style={{ pathLength, opacity }} />;
}

function Appear({ p, a, b, className, children }: { p: P; a: number; b: number; className?: string; children: ReactNode }) {
  const opacity = useTransform(p, [a, b], [0, 1]);
  const y = useTransform(p, [a, b], [12, 0]);
  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

function Captions({ p, steps }: { p: P; steps: { title: string; text: string }[] }) {
  const [active, setActive] = useState(() => (p.get() < 0.27 ? 0 : p.get() < 0.57 ? 1 : 2));
  useMotionValueEvent(p, "change", (v: number) => {
    const next = v < 0.27 ? 0 : v < 0.57 ? 1 : 2;
    setActive((cur) => (cur === next ? cur : next));
  });
  return (
    <>
      {steps.map((st, i) => (
        <div className="cap" data-active={i === active} key={st.title} aria-hidden={i !== active}>
          <h3 className="cap-title display">{st.title}</h3>
          <p className="lead">{st.text}</p>
        </div>
      ))}
    </>
  );
}

function Tick({ p, a, b }: { p: P; a: number; b: number }) {
  const scaleX = useTransform(p, [a, b], [0, 1]);
  return (
    <span className="tick">
      <motion.i style={{ scaleX }} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* The scattered sources                                               */
/* ------------------------------------------------------------------ */

function Sheet() {
  return (
    <div className="sheet">
      <div className="sheet-tab">
        <b />
        Stock_final_v7.xlsx
      </div>
      <div className="sheet-grid">
        {["A", "B", "C", "D"].map((c) => (
          <span key={c} className="sheet-h">
            {c}
          </span>
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="sheet-c">
            <i style={{ width: `${38 + ((i * 37) % 52)}%` }} />
          </span>
        ))}
      </div>
    </div>
  );
}

function ChatCard() {
  return (
    <div className="chat">
      <div className="chat-head">
        <span className="chat-av" />
        Dealer group
      </div>
      <p className="bub in">Order confirm hua?</p>
      <p className="bub out">Haan, kal bhejte hain</p>
      <p className="bub in">Bill bhej dena</p>
    </div>
  );
}

function Mail() {
  return (
    <div className="mail">
      <div className="mail-sub">Re: Re: Fwd: PO approval</div>
      <div className="mail-from">
        <span />
        <i />
      </div>
      <i className="bar" style={{ width: "92%" }} />
      <i className="bar" style={{ width: "74%" }} />
      <i className="bar" style={{ width: "83%" }} />
    </div>
  );
}

function Register() {
  const widths = [72, 55, 80, 48, 66];
  return (
    <div className="register">
      <div className="reg-title">Dispatch register</div>
      {widths.map((w, i) => (
        <div className="reg-row" key={i}>
          <i style={{ width: `${w}%` }} />
          <i style={{ width: `${18 + ((i * 11) % 14)}%` }} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The one system                                                      */
/* ------------------------------------------------------------------ */

function Dashboard({ p }: { p: P }) {
  const opacity = useTransform(p, [0.44, 0.7], [0, 1]);
  const scale = useTransform(p, [0.44, 0.78], [0.86, 1]);
  const y = useTransform(p, [0.44, 0.78], [24, 0]);

  return (
    <motion.div className="dash" style={{ opacity, scale, y }}>
      <div className="dash-top">
        <span className="dash-title">Operations</span>
        <span className="tag">Live</span>
      </div>

      <Appear p={p} a={0.56} b={0.7} className="dash-kpis">
        <div>
          <b>12</b>
          <span>Open requests</span>
        </div>
        <div className="hot">
          <b>4</b>
          <span>Need approval</span>
        </div>
        <div>
          <b>1</b>
          <span>Overdue</span>
        </div>
      </Appear>

      <Appear p={p} a={0.62} b={0.76} className="dash-list">
        <div className="dash-row">
          <span>Purchase request, regional branch</span>
          <em className="chip chip-wait">Waiting for you</em>
        </div>
        <div className="dash-row">
          <span>Invoice batch, October</span>
          <em className="chip chip-ok">Approved</em>
        </div>
        <div className="dash-row">
          <span>Site visit report</span>
          <em className="chip chip-review">In review</em>
        </div>
      </Appear>

      <Appear p={p} a={0.68} b={0.82} className="dash-log">
        <div>
          <time>10:42</time>Request logged from WhatsApp
        </div>
        <div>
          <time>10:45</time>Finance approved invoice batch
        </div>
        <div>
          <time>11:02</time>Reminder sent to operations
        </div>
      </Appear>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export default function Converge() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const settled = useMotionValue(1);
  const p: P = reduce ? settled : scrollYProgress;

  const glowOpacity = useTransform(p, [0.4, 0.8], [0, 1]);

  return (
    <section ref={ref} className={`story${reduce ? " story-static" : ""}`} aria-labelledby="story-title">
      <div className="story-pin">
        <div className="wrap story-grid">
          <div className="story-copy">
            <h2 id="story-title" className="sr-only">
              How Layzox turns scattered work into one system
            </h2>
            <div className="captions">
              <Captions p={p} steps={story.steps} />
            </div>
            <div className="ticks" aria-hidden="true">
              <Tick p={p} a={0} b={0.3} />
              <Tick p={p} a={0.3} b={0.56} />
              <Tick p={p} a={0.56} b={0.82} />
            </div>
          </div>

          <div className="story-stage" aria-hidden="true">
            <div className="stage">
              <motion.div className="stage-glow" style={{ opacity: glowOpacity }} />

              <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <Line p={p} l={21} t={22} a={0.1} b={0.44} bend={5} />
                <Line p={p} l={80} t={24} a={0.12} b={0.46} bend={-5} />
                <Line p={p} l={21} t={77} a={0.14} b={0.48} bend={-5} />
                <Line p={p} l={80} t={77} a={0.16} b={0.5} bend={5} />
                <Line p={p} l={50} t={9} a={0.18} b={0.46} bend={0} />
              </svg>

              <Frag p={p} l={21} t={22} r={-6} a={0.06} b={0.5}>
                <Sheet />
              </Frag>
              <Frag p={p} l={80} t={24} r={5} a={0.08} b={0.52}>
                <ChatCard />
              </Frag>
              <Frag p={p} l={21} t={77} r={4} a={0.1} b={0.54}>
                <Mail />
              </Frag>
              <Frag p={p} l={80} t={77} r={-5} a={0.12} b={0.56}>
                <Register />
              </Frag>
              <Frag p={p} l={50} t={9} r={-3} a={0.14} b={0.5} className="frag-note">
                <div className="note">Call Sharma ji before Friday</div>
              </Frag>

              <Dashboard p={p} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
