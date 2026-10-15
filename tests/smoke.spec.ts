import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/approach",
  "/services",
  "/ai-agents",
  "/principles",
  "/contact",
  "/about",
  "/why-layzox",
  "/faq",
  "/careers",
  "/privacy",
  "/terms",
  "/support",
  "/cookies",
  "/accessibility",
  "/security",
  "/sitemap",
  "/services/custom",
  "/services/automation",
  "/services/web",
  "/services/mobile",
  "/services/cloud",
  "/services/consulting",
  "/industries",
  "/industries/clinics",
  "/industries/real-estate",
  "/industries/education",
  "/industries/hospitality",
  "/industries/distribution",
  "/industries/solar",
  "/engagement",
  "/book",
  "/insights",
  "/insights/whatsapp-orders-to-one-system",
  "/insights/ai-voice-agents-lead-follow-up",
  "/insights/custom-software-vs-off-the-shelf",
  "/resources/automation-checklist",
];

for (const path of pages) {
  test(`loads ${path} with one h1 and no horizontal scroll`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("unknown route shows the 404 page", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("does not exist");
});

test("theme toggle switches between light and dark", async ({ page }) => {
  await page.goto("/");
  const before = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: /theme|dark|light/i }).first().click();
  await expect.poll(() => page.locator("html").getAttribute("data-theme")).not.toBe(before);
});

test("contact form validates before sending", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("Tell us your name.")).toBeVisible();
});

test("enquiry API rejects bad input and ignores bots", async ({ request }) => {
  const bad = await request.post("/api/enquiry", { data: { kind: "project", name: "A" } });
  expect(bad.status()).toBe(400);
  const bot = await request.post("/api/enquiry", { data: { kind: "project", website: "spam" } });
  expect(bot.ok()).toBeTruthy();
});

test("legacy corporate links redirect to the new pages", async ({ request }) => {
  const cases: Record<string, string> = {
    "/solutions": "/approach",
    "/engineering": "/approach",
    "/custom-software-development": "/services/custom",
    "/ai-automation": "/services/automation",
    "/cloud-data-engineering": "/services/cloud",
    "/products": "/services",
  };
  for (const [source, target] of Object.entries(cases)) {
    const res = await request.get(source, { maxRedirects: 0 });
    expect([301, 308]).toContain(res.status());
    expect(res.headers().location).toContain(target);
  }
});

test("SEO documents and logo assets are served", async ({ request }) => {
  for (const path of ["/robots.txt", "/sitemap.xml", "/brand/mark.png", "/brand/logo.png"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("https://www.layzox.com/services/automation");
  for (const path of ["/support", "/cookies", "/accessibility", "/security", "/sitemap"]) {
    expect(sitemap).toContain(`https://www.layzox.com${path}`);
  }
});
