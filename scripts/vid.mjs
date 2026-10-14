import { chromium } from "@playwright/test";
const b = await chromium.launch();
for (const theme of ["dark", "light"]) {
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await c.addInitScript((t) => localStorage.setItem("lx-theme", t), theme);
  const p = await c.newPage();
  const reqs = []; p.on("request", (r) => /\/video\//.test(r.url()) && reqs.push(r.url().split("/video/")[1]));
  await p.goto("http://localhost:3001", { waitUntil: "networkidle" });
  await p.waitForTimeout(3500);
  console.log(theme, reqs, await p.evaluate(() => { const v = document.querySelector(".hero-video video"); return { src: v.currentSrc.split("/").pop(), t: v.currentTime.toFixed(1), paused: v.paused }; }));
  if (theme === "dark") await p.screenshot({ path: ".shots/hero-video-dark.png" });
  await c.close();
}
await b.close();
