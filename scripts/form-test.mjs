// Fills the real contact and waitlist forms in a browser. Sends no real email (mock Resend or no config).
import http from "node:http";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const mailbox = [];
const mock = http.createServer((req, res) => { let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => { mailbox.push(JSON.parse(b)); res.writeHead(200); res.end("{}"); }); }).listen(4011);
const start = async (port, env) => {
  const p = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], { env: { ...process.env, ...env }, stdio: "ignore" });
  for (let i = 0; i < 60; i++) { try { await fetch("http://localhost:" + port + "/"); return p; } catch { await new Promise((r) => setTimeout(r, 500)); } }
  throw new Error("no start");
};
const b = await chromium.launch();

async function run(label, port) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  let popup = null; ctx.on("page", (p) => (popup = p.url()));
  await page.goto(`http://localhost:${port}/#contact`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  // validation first: empty submit shows errors and sends nothing
  await page.click('#contact button[type="submit"]');
  const errs = await page.locator("#contact .error-text").count();
  await page.fill("#c-name", "Test Person");
  await page.fill("#c-phone", "+91 98765 43210");
  await page.fill("#c-message", "Orders are tracked in sheets and WhatsApp.");
  await page.check("#c-consent");
  await page.waitForTimeout(1000);
  await page.click('#contact button[type="submit"]');
  await page.waitForTimeout(1500);
  const status = (await page.locator("#contact .form-status").innerText()).trim();
  const link = await page.locator("#contact .form-status a").count();
  console.log(label, "| client errors on empty submit:", errs, "| status:", JSON.stringify(status), "| fallback link:", link, "| popup:", popup ? popup.slice(0, 40) : null);
  // waitlist
  await page.fill("#wl-email", "wait@example.com");
  await page.waitForTimeout(1000);
  await page.click('#products button[type="submit"]');
  await page.waitForTimeout(1500);
  console.log(label, "| waitlist:", JSON.stringify((await page.locator("#wl-status").innerText()).trim()));
  await page.screenshot({ path: `.shots/form-${label}.png`, clip: undefined });
  await ctx.close();
}

let s = await start(3111, {});
await run("unconfigured", 3111);
s.kill();
s = await start(3112, { RESEND_API_KEY: "k", ENQUIRY_TO_EMAIL: "o@example.test", ENQUIRY_FROM_EMAIL: "s@example.test", RESEND_API_URL: "http://localhost:4011/emails" });
await run("configured", 3112);
console.log("mock mailbox subjects:", mailbox.map((m) => m.subject));
s.kill(); mock.close(); await b.close();
