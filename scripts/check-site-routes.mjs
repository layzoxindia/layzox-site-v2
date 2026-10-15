// Verify every published route, legacy redirect, asset and canonical before release.
// Runs without network access so CI catches broken source references reliably.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pub = join(root, "public");
const errors = [];
const read = (p) => readFileSync(join(root, p), "utf8");
const routeText = read("public/_redirects");
const redirects = new Map();
for (const raw of routeText.split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line.startsWith("#")) continue;
  const [from, to, status] = line.split(/\s+/);
  if (!from || !to || !["200", "301", "302", "308"].includes(status)) {
    errors.push("Invalid Cloudflare route: " + raw); continue;
  }
  if (redirects.has(from)) errors.push("Duplicate route: " + from);
  redirects.set(from, { to, status });
}
const pages = [
  ["/", "cinematic.html"], ["/approach", "approach.html"],
  ["/services", "services.html"], ["/ai-agents", "ai-agents.html"],
  ["/principles", "principles.html"], ["/contact", "contact.html"],
  ["/about", "about.html"], ["/why-layzox", "why-layzox.html"],
  ["/faq", "faq.html"], ["/careers", "careers.html"],
  ["/privacy", "privacy.html"], ["/terms", "terms.html"],
  ["/support", "support.html"], ["/cookies", "cookies.html"],
  ["/accessibility", "accessibility.html"], ["/security", "security.html"],
  ["/sitemap", "sitemap.html"],
  ...["custom", "automation", "web", "mobile", "cloud", "consulting"]
     .map(s => ["/services/" + s, "svc-" + s + ".html"])
];
const routeSet = new Set(pages.map(([route]) => route));
const htmlFor = new Map(pages);
const targetId = (route, id) => {
  const file = htmlFor.get(route);
  if (!file) return;
  const html = read("public/" + file);
  if (!new RegExp('\\bid=["\\\x27]' + id.replace(/[.*+?^$\x7b\x7d()|[\]\\]/g, "\\$&") + '["\\\x27]').test(html))
    errors.push("Missing anchor " + route + "#" + id);
};
const sitemap = read("public/sitemap.xml");
const robots = read("public/robots.txt");
if (!robots.includes("https://www.layzox.com/sitemap.xml")) errors.push("robots.txt missing sitemap");
if (!existsSync(join(pub, "404.html"))) errors.push("Missing static 404.html");
let inspected = 0;
for (const [route, file] of pages) {
  const rewrite = redirects.get(route);
  if (!rewrite || rewrite.to !== "/" + file || rewrite.status !== "200")
    errors.push("Missing/wrong published rewrite: " + route);
  if (!existsSync(join(pub, file))) { errors.push("Missing HTML: " + file); continue; }
  const html = read("public/" + file);
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push("Expected one H1: " + route);
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i)?.[1];
  const expected = "https://www.layzox.com" + (route === "/" ? "/" : route);
  if (canonical !== expected) errors.push("Incorrect canonical: " + route);
  if (!sitemap.includes("<loc>" + expected + "</loc>")) errors.push("Missing sitemap URL: " + route);
  for (const m of html.matchAll(/\b(?:href|src)=["']([^"'<>]+)["']/gi)) {
    const link = m[1].split("?")[0];
    if (link.startsWith("#")) { if (link.length > 1) targetId(route, link.slice(1)); continue; }
    if (!link.startsWith("/") || link.startsWith("//")) continue;
    const [path, id] = link.split("#");
    if (routeSet.has(path)) { if (id) targetId(path, id); continue; }
    if (redirects.has(path)) continue; // permanent legacy alias
    if (path.startsWith("/api/")) continue;
    if (!existsSync(join(pub, path.slice(1)))) errors.push("Broken local link in " + file + ": " + link);
  }
  inspected++;
}
const expectedAliases = [
  "/software-development-company-ranchi", "/custom-software-development",
  "/ai-automation", "/web-application-development", "/mobile-app-development",
  "/cloud-data-engineering", "/technology-consulting", "/solutions", "/industries",
  "/engineering", "/delivery", "/process", "/products", "/thank-you"
];
for (const route of expectedAliases) {
  const entry = redirects.get(route);
  if (!entry || entry.status !== "301" || !routeSet.has(entry.to))
    errors.push("Broken legacy redirect: " + route);
}
if (errors.length) {
  console.error("FAIL: " + errors.length + " route/asset errors:\n" + errors.map(e => " - " + e).join("\n"));
  process.exitCode = 1;
} else {
  console.log("PASS: " + inspected + " published pages, " + expectedAliases.length + " legacy redirects, assets, anchors and sitemap.");
}
