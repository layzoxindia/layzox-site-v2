"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/*
  Interactive product demos. Each scene is a small piece of "software" that keeps running while it
  is on screen: numbers move, requests arrive, statuses change. Plain CSS plus a light state tick,
  no video files. Elements are fully visible in their default style, so reduced-motion users get
  a finished, readable frame and the tick is switched off for them.
*/

const TICK = 1500;

type V = CSSProperties & Record<string, string | number>;
const d = (delay: number, extra: Record<string, string | number> = {}): { style: V } => ({
  style: { "--d": `${delay}s`, ...extra } as V,
});

export type SceneId = "custom" | "automation" | "web" | "mobile" | "cloud" | "consulting";

export function Scene({ id, label }: { id: SceneId; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [t, setT] = useState(5);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live || reduced.current) return;
    const timer = setInterval(() => setT((n) => n + 1), TICK);
    return () => clearInterval(timer);
  }, [live]);

  const Body = BODIES[id];
  return (
    <div ref={ref} className={`sc sc-${id}`} data-play={live} role="img" aria-label={label}>
      <div className="sc-glow" aria-hidden="true" />
      <div className="sc-in" aria-hidden="true">
        <Body t={t} />
      </div>
      <span className="sc-live" aria-hidden="true">
        <i /> Live demo
      </span>
    </div>
  );
}

function Cursor({ x0, y0, x1, y1 }: { x0: string; y0: string; x1: string; y1: string }) {
  const vars = { "--x0": x0, "--y0": y0, "--x1": x1, "--y1": y1 };
  return (
    <>
      <span className="k-cursor loop" {...d(0, vars)}>
        <svg viewBox="0 0 20 24" width="1.4em" height="1.7em">
          <path d="M2 2 L2 18 L6.5 14 L9.5 21 L12.2 19.8 L9.2 13 L15 13 Z" fill="#fff" stroke="#061b3d" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="k-ripple loop" {...d(0, vars)} />
    </>
  );
}

function Dots() {
  return (
    <div className="w-bar">
      <i />
      <i />
      <i />
    </div>
  );
}

type P = { t: number };

/* 1. Custom software: a live operations dashboard */
const REQUESTS = [
  "Purchase request, Branch 2",
  "Invoice batch, October",
  "Site visit report",
  "Vendor onboarding, North",
  "Stock transfer, Depot 4",
  "Leave request, Accounts",
];
const STATES = [
  { cls: "warn", text: "Waiting" },
  { cls: "info", text: "In review" },
  { cls: "ok", text: "Approved" },
];
const TOAST = ["Approved and logged to the audit trail", "Reminder sent to operations", "New request logged from WhatsApp"];

function Custom({ t }: P) {
  const open = 24 + (t % 5) + Math.floor(t / 7) % 3;
  const waiting = 4 + ((t * 2) % 5);
  const done = 18 + t;
  const pts = Array.from({ length: 14 }, (_, i) => {
    const k = i + t;
    return 34 - (Math.sin(k * 0.7) * 9 + Math.sin(k * 0.23) * 6 + i * 0.9);
  });
  const path = pts.map((y, i) => `${i ? "L" : "M"}${(i * 200) / 13} ${y.toFixed(1)}`).join(" ");
  return (
    <div className="w-win k-rise" {...d(0)}>
      <Dots />
      <div className="w-body">
        <aside className="w-side">
          {["Overview", "Requests", "Approvals", "Reports"].map((n, i) => (
            <span key={n} className={`w-nav k-left${i === 1 ? " on" : ""}`} {...d(0.3 + i * 0.12)}>
              {n}
            </span>
          ))}
        </aside>
        <div className="w-main">
          <div className="w-kpis">
            {[
              ["Open", open],
              ["Waiting", waiting],
              ["Done today", done],
            ].map(([n, v], i) => (
              <div key={n} className="w-kpi k-pop" {...d(0.8 + i * 0.15)}>
                <b key={String(v)} className="flash">{v}</b>
                <small>{n}</small>
              </div>
            ))}
          </div>
          <div className="w-chart k-rise" {...d(1.4)}>
            <svg viewBox="0 0 200 50" preserveAspectRatio="none">
              <path className="ln-a spark" d={path} />
            </svg>
          </div>
          <div className="w-rows">
            {[0, 1, 2].map((i) => {
              const idx = (((t - i) % REQUESTS.length) + REQUESTS.length) % REQUESTS.length;
              const s = STATES[i];
              return (
                <div key={`${REQUESTS[idx]}-${t - i}`} className={`w-row ${i === 0 ? "slide" : ""}`}>
                  <span>{REQUESTS[idx]}</span>
                  <em className={`pill ${s.cls}`}>{s.text}</em>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Cursor x0="30em" y0="22em" x1="34.4em" y1="13.7em" />
      {t % 3 === 1 && (
        <div key={t} className="w-toast pulse-toast">
          <i className="tick" /> {TOAST[Math.floor(t / 3) % TOAST.length]}
        </div>
      )}
    </div>
  );
}

/* 2. AI and workflow automation: a request moves through the pipeline, forever */
const MESSAGES = ["Need 40 units by Friday", "Send quote for 12 licences", "Book site visit, Monday 11am"];
function Automation({ t }: P) {
  const a = t % 4;
  const round = Math.floor(t / 4);
  const nodes = [
    { t: "Message", s: MESSAGES[round % MESSAGES.length], c: "chat" },
    { t: "Reads it", s: ["Item, qty, date", "Customer, items", "Place, date, time"][round % 3], c: "ai" },
    { t: "Order created", s: `#${1042 + round} · draft`, c: "rec" },
    { t: "Manager review", s: "One tap to approve", c: "ok" },
  ];
  return (
    <div className="fl">
      {nodes.map((n, i) => (
        <div key={n.t} className={`fl-node fl-${n.c} k-pop${a === i ? " on" : ""}`} {...d(0.2 + i * 0.15)}>
          <span className="fl-ico" />
          <b>{n.t}</b>
          <small key={n.s} className="flash">{n.s}</small>
          {i === 3 && a === 3 && <i key={t} className="fl-check k-pop" />}
        </div>
      ))}
      {[0, 1, 2].map((i) => (
        <span key={i} className="fl-link" style={{ "--i": i } as V}>
          <i className={a > i ? "full" : ""} />
          <u className="flow" />
        </span>
      ))}
      <div className="fl-note k-rise" {...d(0.9)}>Anything that must be right goes to a person first.</div>
    </div>
  );
}

/* 3. Web applications: a customer portal that updates and adapts to a narrow screen */
const TRACK = ["Packed", "Dispatched", "Out for delivery", "Delivered"];
function Web({ t }: P) {
  const narrow = Math.floor(t / 4) % 2 === 1;
  const step = t % 4;
  return (
    <div className="wb">
      <div className={`w-win wb-win${narrow ? " narrow" : ""}`}>
        <Dots />
        <div className="wb-page">
          <div className="wb-nav k-rise" {...d(0.3)}>
            <i className="wb-logo" />
            <span />
            <span />
            <span className="sc-btn" />
          </div>
          <div className="wb-hero k-rise" {...d(0.6)}>
            <b>Track every order</b>
            <small>Live status for your customers.</small>
            <span className="sc-btn">Open portal</span>
          </div>
          <div className="wb-cards">
            <div className="wb-card k-rise" {...d(1)}>
              <i />
              <span className="wb-order">Order #2084</span>
              <em key={step} className={`pill flash ${step === 3 ? "ok" : "info"}`}>{TRACK[step]}</em>
            </div>
            {[1, 2].map((i) => (
              <div key={i} className="wb-card k-rise" {...d(1 + i * 0.2)}>
                <i />
                <span />
                <span />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Cursor x0="26em" y0="20em" x1="19em" y1="9.2em" />
      <div className="sc-chip">{narrow ? "Adapts to every screen" : "Built for desktop"}</div>
    </div>
  );
}

/* 4. Mobile apps: a field app that receives work and sends reports */
const SITES = ["Main Street office", "Plot 14, North", "Depot 3", "Warehouse B", "Site 3, East"];
function Mobile({ t }: P) {
  const sheet = t % 6 >= 3 && t % 6 <= 4;
  const banner = t % 6 === 5;
  const first = Math.floor(t / 2);
  return (
    <div className="mb">
      <div className="mb-phone k-rise" {...d(0)}>
        <div className="mb-notch" />
        <div className="mb-head">
          <b>Today</b>
          <small>5 site visits</small>
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={`${first}-${i}`} className={`mb-item ${i === 0 ? "slide" : ""}`}>
            <i />
            <span>{SITES[(first + i) % SITES.length]}</span>
            <em className={`pill ${i === 0 ? "ok" : "info"}`}>{i === 0 ? "Next" : "Later"}</em>
          </div>
        ))}
        <div className={`mb-sheet${sheet ? " open" : ""}`}>
          <b>Visit report</b>
          <span className="mb-line" />
          <span className="mb-line s" />
          <span className="sc-btn">Submit</span>
        </div>
      </div>
      {banner && (
        <div key={t} className="mb-banner pulse-toast">
          <i className="tick" /> Report received · manager notified
        </div>
      )}
      <div className="mb-side k-rise" {...d(0.5)}>
        <b>One source of truth</b>
        <small>The same data shows on web and mobile.</small>
      </div>
    </div>
  );
}

/* 5. Cloud and data: sources stream into a monitored system */
const ALERTS = ["Nightly backup complete", "Deploy v2.14 is live", "All health checks passing"];
function Cloud({ t }: P) {
  const bars = Array.from({ length: 7 }, (_, i) => 52 + Math.sin((t + i * 1.7) * 0.8) * 30 + (i === 5 ? 10 : 0));
  return (
    <div className="cl">
      <div className="cl-src">
        {["Sales sheet", "Billing", "Field app"].map((n, i) => (
          <div key={n} className="cl-chip k-left" {...d(0.2 + i * 0.15)}>
            <i />
            {n}
          </div>
        ))}
      </div>
      <div className="cl-pipe">
        {[0, 1, 2].map((i) => (
          <span key={i} className="cl-line" style={{ "--i": i } as V}>
            <u className="stream" />
          </span>
        ))}
      </div>
      <div className="cl-core k-pop" {...d(0.6)}>
        <span className="cl-ring" />
        <b>Your cloud</b>
        <small>Backed up · monitored</small>
      </div>
      <div className="cl-dash k-rise" {...d(1)}>
        <div className="cl-stat">
          <small>Requests / min</small>
          <b key={t} className="flash">{(1180 + ((t * 53) % 160)).toLocaleString("en-US")}</b>
        </div>
        <div className="cl-bars">
          {bars.map((h, i) => (
            <i key={i} className={i === 5 ? "hi" : ""} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div key={Math.floor(t / 3)} className="cl-alert pulse-toast">
          <i className="tick" /> {ALERTS[Math.floor(t / 3) % ALERTS.length]}
        </div>
      </div>
    </div>
  );
}

/* 6. Technology consulting: a plan fills in step by step */
const COLS = [
  { t: "Understand", items: ["Users and goals", "Current systems"] },
  { t: "Plan", items: ["Architecture", "Scope and risks"] },
  { t: "Build", items: ["Working steps", "Handover"] },
];
const PHASES = ["Understanding the problem", "Writing the plan", "Ready to build"];
function Consulting({ t }: P) {
  const done = t % 8; // 0..7, six items to tick
  const phase = Math.min(2, Math.floor(Math.min(done, 5) / 2));
  return (
    <div className="cn">
      <div className="cn-track">
        <i style={{ width: `${(Math.min(done, 6) / 6) * 100}%` }} />
        {[0, 1, 2].map((i) => (
          <b key={i} className={done > i * 2 ? "done" : ""} />
        ))}
      </div>
      <div className="cn-cols">
        {COLS.map((c, ci) => (
          <div key={c.t} className="cn-col k-rise" {...d(0.2 + ci * 0.15)}>
            <h4>{c.t}</h4>
            {c.items.map((it, j) => {
              const ok = ci * 2 + j < done;
              return (
                <div key={it} className={`cn-item${ok ? " ok" : ""}`}>
                  <i className={`tick${ok ? "" : " off"}`} />
                  {it}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div key={phase} className="sc-chip flash">{PHASES[phase]}</div>
    </div>
  );
}

const BODIES: Record<SceneId, (p: P) => ReactNode> = {
  custom: Custom,
  automation: Automation,
  web: Web,
  mobile: Mobile,
  cloud: Cloud,
  consulting: Consulting,
};
