import { chromium } from "@playwright/test";
const base = "http://localhost:3002";
const paths = ["/about", "/why-layzox", "/faq", "/careers", "/privacy", "/terms", "/custom-software-development", "/ai-automation", "/web-application-development", "/mobile-app-development", "/cloud-data-engineering", "/technology-consulting"];
const b = await chromium.launch();
const bad = [];
for (const path of paths) {
  const c = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  const errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 140)));
  p.on("pageerror", (e) => errs.push(e.message.slice(0, 140)));
  const res = await p.goto(base + path, { waitUntil: "networkidle" });
  await p.waitForTimeout(600);
  const info = await p.evaluate(() => ({
    title: document.title,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    h1: document.querySelectorAll("h1").length,
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)["@type"]),
    desc: !!document.querySelector('meta[name="description"]')?.content,
    sw: document.documentElement.scrollWidth,
  }));
  const ok = res.status() === 200 && info.canonical && info.h1 === 1 && info.ld.includes("BreadcrumbList") && info.desc && info.sw <= 390 && !errs.length;
  console.log(ok ? "OK " : "BAD", path, res.status(), info.title, "|", info.canonical?.replace("http://localhost:3002", "") , info.ld.join(","), "sw=" + info.sw, errs);
  await c.close();
}
const r404 = await (await b.newPage()).goto(base + "/nope");
console.log("404 status", r404.status());
await b.close();
