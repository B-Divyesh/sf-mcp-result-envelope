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

test("@claim:demo-memory discards demo edits without browser storage", async ({ page, context }) => {
  await page.goto("/demo");
  await page.locator("#json-input").fill('[{"private":"discard-me"}]');
  await page.getByRole("button", { name: "Build the envelope" }).click();
  await page.getByRole("link", { name: "Start for real" }).click();
  await expect(page.locator("#json-input")).toHaveValue("");
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  await page.goto("/demo");
  await expect(page.locator("#json-input")).not.toHaveValue(/discard-me/);
  await expect(page.locator("#metric-rows")).toHaveText("12");
});

test("every public route has no serious accessibility violations", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    for (const route of ["/", "/demo", "/inspect", "/privacy", "/terms", "/missing-sheet"]) {
      await page.goto(route);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? "")), `${colorScheme} ${route}`).toEqual([]);
    }
  }
  expect(errors).toEqual([]);
});

test("mobile demo fits the viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile project only");
  await page.goto("/demo");
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(390);
  await expect(page.getByRole("button", { name: "Build the envelope" })).toBeVisible();

  const controls = [
    page.getByRole("button", { name: "Reset demo", exact: true }),
    page.getByRole("link", { name: "Start for real", exact: true }),
    page.getByRole("link", { name: "Privacy", exact: true }).last(),
    page.getByRole("link", { name: "Terms", exact: true }),
    page.getByRole("link", { name: "Built by Param Factory", exact: true })
  ];
  for (const control of controls) {
    const box = await control.boundingBox();
    const label = (await control.textContent()) ?? "mobile control";
    expect(box, label).not.toBeNull();
    expect(box!.width, label).toBeGreaterThanOrEqual(44);
    expect(box!.height, label).toBeGreaterThanOrEqual(44);
  }

  const visibleInteractiveElements = page.locator(
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  ).filter({ visible: true });
  for (const control of await visibleInteractiveElements.all()) {
    const box = await control.boundingBox();
    const label = (await control.getAttribute("aria-label")) ?? (await control.textContent()) ?? "mobile control";
    expect(box, label.trim()).not.toBeNull();
    expect(box!.width, label.trim()).toBeGreaterThanOrEqual(44);
    expect(box!.height, label.trim()).toBeGreaterThanOrEqual(44);
  }
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
