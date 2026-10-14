import { chromium } from "@playwright/test";
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", colorScheme: "dark" });
const p = await c.newPage();
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.goto("http://localhost:3001", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
const r = await p.evaluate(() => ({ js: document.documentElement.dataset.js ?? null, fx: document.documentElement.dataset.fx ?? null,
  hidden: [...document.querySelectorAll(".sw-in")].filter((e) => getComputedStyle(e).transform !== "none").length,
  heroLetters: [...document.querySelectorAll(".hero-title .word")].filter((e) => getComputedStyle(e).transform !== "none").length,
  sw: document.documentElement.scrollWidth }));
console.log(JSON.stringify(r), errs);
await p.evaluate(() => document.querySelector("#industries").scrollIntoView());
await p.waitForTimeout(500);
await p.screenshot({ path: ".shots/rm-industries.png" });
await b.close();
