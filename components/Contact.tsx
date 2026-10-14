"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { company, projectTypes } from "@/lib/content";
import { sendEnquiry, whatsappUrl } from "@/lib/enquiry";
import { ArrowRight, Chat, Phone } from "./Icons";

type Errors = Partial<Record<"name" | "phone" | "message" | "consent" | "email", string>>;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [notice, setNotice] = useState("");
  const [waLink, setWaLink] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const v = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    if (!v("name")) next.name = "Tell us your name.";
    if (v("phone").replace(/\D/g, "").length < 8) next.phone = "Enter a phone or WhatsApp number we can reach.";
    if (v("email") && !/^\S+@\S+\.\S+$/.test(v("email"))) next.email = "That email address does not look right.";
    if (!v("message")) next.message = "Describe what is happening today and what needs to improve.";
    if (!data.get("consent")) next.consent = "Please agree so we can use these details to reply.";

    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      setStatus("idle");
      (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    setWaLink("");
    const fields = {
      name: v("name"),
      phone: v("phone"),
      email: v("email"),
      company: v("company"),
      type: v("type"),
      message: v("message"),
      website: v("website"),
    };
    const summary = [
      "Hello Layzox, I would like to discuss a project.",
      `Name: ${fields.name}`,
      `Phone: ${fields.phone}`,
      fields.email && `Email: ${fields.email}`,
      fields.company && `Company: ${fields.company}`,
      fields.type && `Type: ${fields.type}`,
      `What needs to improve: ${fields.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    const res = await sendEnquiry("project", fields, summary);
    if (res.ok) {
      setStatus("done");
      if (res.mode === "whatsapp" && res.url) setWaLink(res.url);
      setNotice(
        res.mode === "whatsapp"
          ? res.opened
            ? "WhatsApp opened with your enquiry. Press send there and we will reply."
            : "Your message is ready. Tap the button to send it on WhatsApp."
          : "Thank you. We have your enquiry and will reply soon."
      );
      formRef.current?.reset();
    } else {
      setStatus("error");
      setNotice(res.error ?? "Something went wrong. Please try again, or call us.");
    }
  }

  const err = (k: keyof Errors) => (errors[k] ? `err-${k}` : undefined);

  return (
    <section id="contact" className="section contact">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <h2 className="h2">Tell us what is slowing your team down.</h2>
          <p className="lead">
            Describe the current process or system. We reply with a practical next step, and meet with you over video call.
          </p>

          <ul className="contact-list">
            <li>
              <span className="contact-icon">
                <Phone />
              </span>
              <div>
                <strong>Call</strong>
                <a href={`tel:${company.tel1}`}>{company.phone1}</a>
                <a href={`tel:${company.tel2}`}>{company.phone2}</a>
              </div>
            </li>
            <li>
              <span className="contact-icon">
                <Chat />
              </span>
              <div>
                <strong>Email</strong>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </div>
            </li>
            <li>
              <span className="contact-icon contact-pin" aria-hidden="true" />
              <div>
                <strong>Where we work</strong>
                <span>Remote, with clients worldwide</span>
              </div>
            </li>
          </ul>

          <div className="include">
            <h3 className="display">Helpful to include</h3>
            <ul>
              <li>The current process or system, and where it gets delayed</li>
              <li>What a good outcome looks like</li>
              <li>Your timeline, and any systems that must connect</li>
            </ul>
          </div>
        </div>

        <form ref={formRef} className="form-card" onSubmit={submit} noValidate>
          <div className="hp" aria-hidden="true">
            <label htmlFor="c-website">Leave this field empty</label>
            <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input
                id="c-name"
                name="name"
                className="input"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={err("name")}
              />
              {errors.name && (
                <p id="err-name" className="error-text">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="c-phone">Phone or WhatsApp</label>
              <input
                id="c-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                className="input"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={err("phone")}
              />
              {errors.phone && (
                <p id="err-phone" className="error-text">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="c-email">Work email (optional)</label>
              <input
                id="c-email"
                name="email"
                type="email"
                inputMode="email"
                className="input"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={err("email")}
              />
              {errors.email && (
                <p id="err-email" className="error-text">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="c-company">Company (optional)</label>
              <input id="c-company" name="company" className="input" autoComplete="organization" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="c-type">What kind of project is it?</label>
            <select id="c-type" name="type" className="select input" defaultValue="">
              <option value="">Choose one</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="c-message">What is happening today, and what needs to improve?</label>
            <textarea
              id="c-message"
              name="message"
              className="textarea"
              aria-invalid={!!errors.message}
              aria-describedby={err("message")}
            />
            {errors.message && (
              <p id="err-message" className="error-text">
                {errors.message}
              </p>
            )}
          </div>

          <div className="consent">
            <input id="c-consent" name="consent" type="checkbox" aria-describedby={err("consent")} />
            <label htmlFor="c-consent">
              I agree that Layzox may use these details to reply to my enquiry. See the{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </label>
          </div>
          {errors.consent && (
            <p id="err-consent" className="error-text">
              {errors.consent}
            </p>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send enquiry"} <ArrowRight />
            </button>
            <p className={`form-status ${status === "error" ? "is-error" : ""}`} role="status" aria-live="polite">
              {notice}
            </p>
            {waLink && (
              <a className="btn btn-ghost" href={waLink} target="_blank" rel="noopener noreferrer">
                Open WhatsApp
              </a>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
