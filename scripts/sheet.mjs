// Usage: node scripts/sheet.mjs <dir> <prefix> <out.png> [cols]
import { chromium } from "@playwright/test";
import fs from "node:fs";
const [dir, prefix, out, cols = "5"] = process.argv.slice(2);
const files = fs.readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith(".png")).sort();
const html = `<body style="margin:0;background:#888;display:grid;grid-template-columns:repeat(${cols},1fr);gap:4px">${files
  .map((f) => `<img src="file:///${dir}/${f}" style="width:100%">`)
  .join("")}</body>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1800, height: 1000 } });
fs.writeFileSync(dir + "/_sheet.html", html); await p.goto("file:///" + dir + "/_sheet.html");
await p.waitForTimeout(800);
await p.screenshot({ path: out, fullPage: true });
await b.close();
