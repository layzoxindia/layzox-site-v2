"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "./Icons";

type Theme = "light" | "dark";

/** Switches between light editorial and dark cinematic with a circular reveal. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  function change(e: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("lzx-theme", next);
      } catch {}
      setTheme(next);
    };

    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduce) {
      apply();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = doc.startViewTransition(() => {
      flushSync(apply);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 800, easing: "cubic-bezier(0.7, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={change}
      aria-label="Switch between light and dark mode"
      aria-pressed={theme === "dark"}
    >
      <span className="theme-toggle-icon theme-sun">
        <Sun />
      </span>
      <span className="theme-toggle-icon theme-moon">
        <Moon />
      </span>
    </button>
  );
}
