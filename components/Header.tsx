"use client";

import { useEffect, useState } from "react";
import { company, nav } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";
import { ArrowRight, Close, Menu } from "./Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled} data-open={open}>
      <div className="site-header-bar wrap">
        <a href="/" className="brand" aria-label={`${company.name}, home`} onClick={() => setOpen(false)}>
          <img className="logo-on-light" src="/brand/logo.png" alt="" width={640} height={141} />
          <img className="logo-on-dark" src="/brand/logo-dark.png" alt="" width={640} height={141} />
        </a>

        <nav className="nav-desktop" aria-label="Main">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a href="/contact" className="btn btn-primary btn-sm header-cta">
            Discuss a project
          </a>
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="mobile-link" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
          Discuss a project <ArrowRight />
        </a>
      </div>
    </header>
  );
}
