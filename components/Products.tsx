"use client";

import { useState } from "react";
import { products } from "@/lib/content";
import { sendEnquiry } from "@/lib/enquiry";
import { trackPointer } from "./Industries";

function ProductArt({ id }: { id: string }) {
  if (id === "growth") {
    return (
      <svg className="pl" viewBox="0 0 160 72" aria-hidden="true">
        <path className="pl-grid" d="M0 60H160M0 36H160M0 12H160" />
        <path className="pl-line" d="M6 58 C30 52 40 40 62 42 S96 26 112 20 S140 10 154 8" />
        <circle className="pl-dot" cx="154" cy="8" r="4" />
      </svg>
    );
  }
  if (id === "revenue") {
    return (
      <svg className="pl" viewBox="0 0 160 72" aria-hidden="true">
        <rect className="pl-bar a" x="4" y="6" width="152" height="12" rx="6" />
        <rect className="pl-bar b" x="22" y="26" width="116" height="12" rx="6" />
        <rect className="pl-bar c" x="40" y="46" width="80" height="12" rx="6" />
      </svg>
    );
  }
  return (
    <svg className="pl" viewBox="0 0 160 72" aria-hidden="true">
      {[8, 26, 44, 62].map((y, i) => (
        <g key={y}>
          <path className="pl-grid" d={`M0 ${y}H160`} />
          <rect className="pl-bar b" x="8" y={y - 12} width={[56, 88, 40, 104][i]} height="6" rx="3" />
          <rect className="pl-bar a" x="124" y={y - 12} width="28" height="6" rx="3" />
        </g>
      ))}
    </svg>
  );
}

export default function Products() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [waLink, setWaLink] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setStatus("sending");
    setWaLink("");
    const res = await sendEnquiry(
      "waitlist",
      { email, website: String(new FormData(e.currentTarget as HTMLFormElement).get("website") ?? "") },
      `Hello Layzox, please add ${email} to the product launch list.`
    );
    if (res.ok) {
      setStatus("done");
      if (res.mode === "whatsapp" && res.url) setWaLink(res.url);
      setMessage(
        res.mode === "whatsapp"
          ? res.opened
            ? "WhatsApp opened with your message. Press send there to join the list."
            : "Your message is ready. Tap the link below to send it on WhatsApp."
          : "You are on the list. We will write when a product is ready."
      );
      setEmail("");
    } else {
      setStatus("error");
      setMessage(res.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="products" className="section products force-dark">
      <div className="guides" aria-hidden="true">
        <div>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="wrap products-inner">
        <header className="sec-head">
          <h2 className="h2">Products we are building</h2>
          <p className="lead">
            Three focused products for recurring business problems. Each stays marked Coming soon until it is ready for
            real use.
          </p>
        </header>

        <ul className="product-grid">
          {products.map((p) => (
            <li key={p.id}>
              <article className="product spot" onPointerMove={trackPointer}>
                <ProductArt id={p.id} />
                <span className="tag tag-warn">Coming soon</span>
                <h3 className="product-name display">{p.name}</h3>
                <p>{p.text}</p>
              </article>
            </li>
          ))}
        </ul>

        <form className="waitlist" onSubmit={submit} noValidate>
          <div className="hp" aria-hidden="true">
            <label htmlFor="wl-website">Leave this field empty</label>
            <input id="wl-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="field waitlist-field">
            <label htmlFor="wl-email">Work email, for launch news</label>
            <input
              id="wl-email"
              className="input"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={status === "error"}
              aria-describedby="wl-status"
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Join the list"}
          </button>
          <p id="wl-status" className={`form-status ${status === "error" ? "is-error" : ""}`} role="status" aria-live="polite">
            {message}
          </p>
          {waLink && (
            <a className="btn btn-ghost" href={waLink} target="_blank" rel="noopener noreferrer">
              Open WhatsApp
            </a>
          )}
        </form>
      </div>
    </section>
  );
}
