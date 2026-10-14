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
  "/services/custom",
  "/services/automation",
  "/services/web",
  "/services/mobile",
  "/services/cloud",
  "/services/consulting",
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
