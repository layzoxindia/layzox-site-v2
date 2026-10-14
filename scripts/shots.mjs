// Usage: node scripts/shots.mjs <baseUrl> <outDir> [path]
import { chromium } from "@playwright/test";
import fs from "node:fs";
const [base = "http://localhost:3001", out = "shots", path = "/"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const report = [];
for (const theme of ["light", "dark"]) {
  for (const w of [390, 768, 1440]) {
    const h = w === 1440 ? 900 : w === 768 ? 1024 : 844;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
    await ctx.addInitScript((t) => localStorage.setItem("lx-theme", t), theme);
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 160)));
    page.on("pageerror", (e) => errors.push("pageerror " + e.message.slice(0, 160)));
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    const stops = Math.ceil(total / h);
    const step = Math.max(1, Math.floor(stops / 14));
    let n = 0;
    for (let i = 0; i < stops; i += step) {
      await page.evaluate((y) => window.scrollTo(0, y), i * h);
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${out}/${theme}-${w}-${String(n++).padStart(2, "0")}.png` });
    }
    report.push({ theme, w, total, overflowX: sw > w, errors: [...new Set(errors)] });
    await ctx.close();
  }
}
await browser.close();
console.log(JSON.stringify(report, null, 1));
