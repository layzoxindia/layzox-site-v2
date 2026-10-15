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
    // Scroll through the page to exercise IntersectionObserver-based reveals
    // before generating the human review screenshot. Otherwise full-page
    // screenshots contain blank sections that a visitor would not see.
    await page.evaluate(async () => {
      const step = Math.max(280, Math.round(window.innerHeight * 0.7));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise<void>((resolve) => setTimeout(resolve, 75));
      }
      window.scrollTo(0, 0);
      // Full-page capture can repaint offscreen elements before IO settles.
      // The interaction tests below independently check actual reveal logic.
      document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
      document.querySelectorAll(".fx, h1, h2").forEach((el) => el.classList.add("go"));
    });
    await page.screenshot({
      path: testInfo.outputPath("quality-" + labels[i] + ".png"),
      fullPage: true,
      animations: "disabled",
    });
  }
});

test("mobile headline remains below the immersive 3D visual stage", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile visual stage test");
  await page.goto("/");
  const title = page.locator(".hero h1");
  await expect(title).toBeVisible();
  const rect = await title.boundingBox();
  expect(rect?.y).toBeGreaterThan(270);
  await expect(page.locator(".hero-cta .btn").first()).toBeVisible();
});


test("the contact CTA really becomes visible when the visitor reaches it", async ({ page }) => {
  await page.goto("/services/custom");
  const cta = page.locator(".ctab-in.rv");
  await cta.scrollIntoViewIfNeeded();
  await expect(cta).toHaveClass(/in/);
  await expect(cta.getByRole("link", { name: /Discuss your project/i })).toBeVisible();
});

test("mobile homepage never shows a duplicate fixed estimate button over the hero", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-specific conversion dock");
  await page.goto("/");
  await expect(page.locator("body")).toHaveClass(/hero-visible/);
  await expect(page.locator(".sticky-cta")).toBeHidden();
  await page.locator("#industries-home").scrollIntoViewIfNeeded();
  await expect(page.locator(".sticky-cta")).toBeVisible();
});
