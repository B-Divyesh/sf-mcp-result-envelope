import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("landing page has a clear first screen and working navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Result Envelope — Pack large tool results");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pack large tool results into stable pages");
  await expect(page.getByRole("link", { name: "Try it with sample data" })).toBeVisible();
  await page.getByRole("link", { name: "Privacy", exact: true }).first().click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pack large tool results into stable pages");
});

test("demo loads a complete packet and pages with the keyboard", async ({ page }) => {
  await page.goto("/demo");
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
  await expect(page.locator("#metric-rows")).toHaveText("12");
  await expect(page.locator("#metric-pages")).toHaveText("3");
  await page.getByRole("tab", { name: "Page" }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("tab", { name: "Schema" })).toBeFocused();
  await page.getByRole("button", { name: "Show next page" }).click();
  await expect(page.locator("#panel-page code")).toContainText('"number": 2');
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.locator("#metric-rows")).toHaveText("12");
});

test("invalid and empty states explain the next step", async ({ page }) => {
  await page.goto("/inspect");
  await expect(page.getByRole("heading", { name: "No packet yet" })).toBeVisible();
  await page.getByRole("button", { name: "Build the envelope" }).click();
  await expect(page.getByRole("alert")).toContainText("Input is empty");
  await page.locator("#json-input").fill("[not json]");
  await page.getByRole("button", { name: "Build the envelope" }).click();
  await expect(page.getByRole("alert")).toContainText("not valid JSON");
});

test("@claim:local-processing sends no demo input off origin", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/demo");
  await page.locator("#json-input").fill('[{"private":"sample-secret"}]');
  await page.getByRole("button", { name: "Build the envelope" }).click();
  await expect(page.locator("#metric-rows")).toHaveText("1");
  expect(requests.every((url) => new URL(url).origin === "http://127.0.0.1:4173")).toBe(true);
  expect(requests.some((url) => url.includes("sample-secret"))).toBe(false);
});

test("every public route has no serious accessibility violations", async ({ page }) => {
  for (const route of ["/", "/demo", "/inspect", "/privacy", "/terms", "/missing-sheet"]) {
    await page.goto(route);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? "")), route).toEqual([]);
  }
});

test("mobile demo fits the viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile project only");
  await page.goto("/demo");
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(390);
  await expect(page.getByRole("button", { name: "Build the envelope" })).toBeVisible();
});

test("@claim:offline-reload reopens the demo after its first visit", async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "desktop service worker check");
  await page.goto("/demo");
  await page.waitForFunction(() => navigator.serviceWorker?.controller !== null, null, { timeout: 10_000 });
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Inspect a sample result envelope");
  await expect(page.locator("#metric-rows")).toHaveText("12");
  await context.setOffline(false);
});
