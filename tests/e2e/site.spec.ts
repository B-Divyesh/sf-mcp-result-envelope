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

test("@claim:demo-sample opens the query demo with 12 orders and resets it", async ({ page }) => {
  await page.goto("/?demo=1");
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
  await expect(page.locator("#metric-rows")).toHaveText("12");
  await expect(page.locator("#metric-pages")).toHaveText("3");
  await page.locator("#json-input").fill('[{"private":"replace-me"}]');
  await page.getByRole("button", { name: "Build the envelope" }).click();
  await expect(page.locator("#metric-rows")).toHaveText("1");
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.locator("#json-input")).not.toHaveValue(/replace-me/);
  await expect(page.locator("#metric-rows")).toHaveText("12");
});

test("@claim:inspector-parts shows four populated packet parts", async ({ page }) => {
  await page.goto("/?demo=1");
  for (const part of ["Manifest", "Summary", "Schema", "Page"]) {
    await page.getByRole("tab", { name: part }).click();
    await expect(page.getByRole("tabpanel", { name: part }).locator("code")).not.toBeEmpty();
  }
});

test("@claim:packet-details shows caps, field types, counts, and the next cursor", async ({ page }) => {
  await page.goto("/?demo=1");
  await page.getByRole("tab", { name: "Manifest" }).click();
  await expect(page.getByRole("tabpanel", { name: "Manifest" })).toContainText('"maxBytes": 4096');
  await expect(page.getByRole("tabpanel", { name: "Manifest" })).toContainText('"includedRows": 12');
  await page.getByRole("tab", { name: "Schema" }).click();
  await expect(page.getByRole("tabpanel", { name: "Schema" })).toContainText('"types"');
  await page.getByRole("tab", { name: "Page" }).click();
  await expect(page.getByRole("tabpanel", { name: "Page" })).toContainText('"nextCursor": "');
});

test("demo pages with the keyboard", async ({ page }) => {
  await page.goto("/demo");
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

test("@claim:browser-no-storage keeps real inspector input only in the current tab", async ({ page, context }) => {
  await page.goto("/inspect");
  await page.locator("#json-input").fill('[{"private":"tab-only"}]');
  await page.getByRole("button", { name: "Build the envelope" }).click();
  await expect(page.locator("#metric-rows")).toHaveText("1");
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  await page.reload();
  await expect(page.locator("#json-input")).toHaveValue("");
});

test("@claim:site-no-tracking loads no analytics, tracking scripts, or third-party fonts", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  await page.goto("/privacy");
  expect(requests.every((url) => new URL(url).origin === "http://127.0.0.1:4173")).toBe(true);
  expect(await page.locator('script[src*="analytics"], script[src*="track"], link[href^="https://fonts."]').count()).toBe(0);
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

test("routes set distinct metadata, legal links work, and unknown paths render the designed 404", async ({ page }) => {
  const routes = [
    ["/", "Result Envelope — Pack large tool results", "https://mcp-result-envelope.sociobot.in/"],
    ["/demo", "Demo — Result Envelope", "https://mcp-result-envelope.sociobot.in/demo"],
    ["/inspect", "Inspector — Result Envelope", "https://mcp-result-envelope.sociobot.in/inspect"],
    ["/privacy", "Privacy — Result Envelope", "https://mcp-result-envelope.sociobot.in/privacy"],
    ["/terms", "Terms — Result Envelope", "https://mcp-result-envelope.sociobot.in/terms"]
  ] as const;
  for (const [route, title, canonical] of routes) {
    await page.goto(route);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S+/);
  }
  await page.goto("/?demo=1");
  await expect(page).toHaveTitle("Demo — Result Envelope");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://mcp-result-envelope.sociobot.in/demo");
  await page.goto("/missing-sheet");
  await expect(page).toHaveTitle("Page not found — Result Envelope");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page is outside the packet");
  await expect(page.getByRole("link", { name: "Return to the main sheet" })).toBeVisible();
  await page.getByRole("link", { name: "Privacy", exact: true }).last().click();
  await expect(page).toHaveURL(/\/privacy$/);
  await page.getByRole("link", { name: "Terms", exact: true }).click();
  await expect(page).toHaveURL(/\/terms$/);
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
    page.getByRole("link", { name: "Built by Param Factory (external site)", exact: true })
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

test("mobile landing keeps the first action and packet preview inside the viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile project only");
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Try it with sample data" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.getByRole("link", { name: "Try it with sample data" }).click();
  await expect(page).toHaveURL(/\?demo=1$/);
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
});

test("@claim:offline-reload reopens the demo after its first visit", async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "desktop service worker check");
  await page.goto("/?demo=1");
  await page.waitForFunction(() => navigator.serviceWorker?.controller !== null, null, { timeout: 10_000 });
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Inspect a sample result envelope");
  await expect(page.locator("#metric-rows")).toHaveText("12");
  await context.setOffline(false);
});
