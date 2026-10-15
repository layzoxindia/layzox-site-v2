import { expect, test } from "@playwright/test";

const serviceSlugs = ["custom", "automation", "web", "mobile", "cloud", "consulting"];
const sectors = ["clinics", "real-estate", "education", "hospitality", "distribution", "solar"];

// Every service and sector now explains a distinct, illustrative four-stage
// workflow and a measurable operational checkpoint rather than invented proof.
for (const route of [
  ...serviceSlugs.map((x) => "/services/" + x),
  ...sectors.map((x) => "/industries/" + x),
]) {
  test("operational blueprint and a11y structure " + route, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator(".flow-story")).toHaveCount(1);
    await expect(page.locator(".flow-line li")).toHaveCount(4);
    await expect(page.locator(".flow-measure")).toContainText(/Watch|Track/);
    await expect(page.locator(".flow-top .mono")).toContainText(/illustrative/i);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("brand canvas, logo source and actual theme switching", async ({ page }) => {
  await page.goto("/");
  const logo = page.locator(".hdr .brand img:visible").first();
  await expect(logo).toHaveAttribute("src", /\/brand\//);
  const imgIsLoaded = await logo.evaluate((el) => (el as HTMLImageElement).naturalWidth > 0);
  expect(imgIsLoaded).toBeTruthy();
  const html = page.locator("html");
  const before = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);
  await page.locator("#theme").click();
  await expect.poll(() => page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(before);
  const hasTheme = await html.getAttribute("data-theme");
  expect(["light", "dark"]).toContain(hasTheme);
});

test("keyboard accessible mobile navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-specific interaction");
  await page.goto("/");
  const button = page.locator("#menu");
  await expect(button).toBeVisible();
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mnav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mnav")).toBeHidden();
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("resource delivery failure never claims email was sent", async ({ page }) => {
  await page.route("**/api/enquiry", async (route) =>
    route.fulfill({ status: 503, contentType: "application/json", body: '{"ok":false}' })
  );
  await page.goto("/resources/automation-checklist");
  await page.locator("#rs-email").fill("test@example.com");
  await page.locator("#res button[type=submit]").click();
  await expect(page.locator("#rs-err")).toContainText("Email delivery was not confirmed");
  await expect(page.locator("#checklist")).toBeVisible();
});

test("responsive quality screenshots for human review", async ({ page }, testInfo) => {
  test.slow();
  const paths = ["/", "/services/custom", "/industries/clinics"];
  const labels = ["home", "software", "clinics"];
  for (let i = 0; i < paths.length; i++) {
    await page.goto(paths[i]);
    await page.locator("main").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: testInfo.outputPath("quality-" + labels[i] + ".png"),
      fullPage: true,
      animations: "disabled",
    });
  }
});
