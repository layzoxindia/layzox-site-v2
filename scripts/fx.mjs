import { chromium } from "@playwright/test";
const b = await chromium.launch();
for (const theme of ["dark", "light"]) {
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await c.addInitScript((t) => localStorage.setItem("lx-theme", t), theme);
  const p = await c.newPage();
  await p.goto("http://localhost:3001", { waitUntil: "networkidle" });
  await p.waitForTimeout(3000);
  const btn = await p.locator(".hero .btn-primary").boundingBox();
  await p.mouse.move(900, 300, { steps: 8 });
  await p.mouse.move(btn.x + btn.width * 0.8, btn.y + btn.height * 0.5, { steps: 12 });
  await p.waitForTimeout(700);
  console.log(theme, await p.evaluate(() => ({ fx: document.documentElement.dataset.fx, btnTranslate: document.querySelector(".hero .btn-primary").style.translate, px: document.querySelector(".hero").style.getPropertyValue("--px") })));
  await p.screenshot({ path: `.shots/fx-${theme}.png` });
  await c.close();
}
await b.close();
