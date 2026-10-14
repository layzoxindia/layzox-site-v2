"use client";

import { industries } from "@/lib/content";

/** Cursor-following light, shared with the product tiles. */
export function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Industries() {
  return (
    <section id="industries" className="section industries">
      <div className="wrap">
        <header className="sec-head">
          <h2 className="h2">Who we build for</h2>
          <p className="lead">
            Any business that runs on sheets, chats and registers. These are the places we expect to make the biggest difference.
          </p>
        </header>

        <ol className="ind-list">
          {industries.map((ind, i) => (
            <li key={ind.id} className="ind-row">
              <span className="ind-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="ind-name display">{ind.name}</span>
              <span className="ind-text">{ind.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
