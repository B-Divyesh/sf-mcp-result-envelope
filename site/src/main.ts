import "./style.css";
import { createEnvelope, EnvelopeError, getEnvelopePage } from "../../src/index.js";
import type { EnvelopeOptions, JsonValue, ResultEnvelope } from "../../src/index.js";
import { sampleRows } from "./sample.js";

const app = document.querySelector<HTMLDivElement>("#app")!;
const routeStatus = document.querySelector<HTMLDivElement>("#route-status")!;
const packageUrl = "https://mcp-result-envelope.sociobot.in/downloads/mcp-result-envelope-0.1.0.tgz";
const packagePath = "/downloads/mcp-result-envelope-0.1.0.tgz";
const installCommand = `npm install ${packageUrl}`;

function iconMark(): string {
  return `<svg class="wordmark-mark" aria-hidden="true" viewBox="0 0 42 42"><path d="M4 5h24l10 10v22H4z"/><path d="M11 16h18M11 23h18M11 30h12"/></svg>`;
}

function header(): string {
  return `<header class="site-header">
    <div class="header-grid shell">
      <a class="wordmark" href="/" data-link>${iconMark()}<span>Result Envelope</span></a>
      <nav aria-label="Main navigation">
        <a href="/demo" data-link>Demo</a>
        <a href="/#how" data-link>Guide</a>
        <a href="/privacy" data-link>Privacy</a>
      </nav>
      <button class="theme-button" type="button" aria-label="Switch color theme" title="Switch color theme">◐</button>
    </div>
  </header>`;
}

function footer(): string {
  return `<footer class="site-footer">
    <div class="shell footer-grid">
      <p>Bounded pages for large tool results.</p>
      <nav aria-label="Footer navigation"><a href="/privacy" data-link>Privacy</a><a href="/terms" data-link>Terms</a></nav>
      <p><a href="https://sociobot.in" rel="noreferrer" aria-label="Built by Param Factory (external site)">Built by Param Factory ↗</a> · v0.1.0 · build 2026.08</p>
    </div>
  </footer>`;
}

function pageShell(content: string, demo = false): string {
  return `${demo ? `<aside class="demo-banner" aria-label="Demo mode"><span><strong>Demo</strong> — sample data, nothing is saved <em id="network-state">Online</em></span><span><button type="button" data-reset-demo>Reset demo</button><a href="/inspect" data-link>Start for real</a></span></aside>` : ""}${header()}${content}${footer()}`;
}

function landing(): string {
  return pageShell(`<main id="main" tabindex="-1">
    <section class="hero shell" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="sheet-label">Specification RE–01 / npm + CLI</p>
        <h1 id="hero-title">Pack large tool results into stable pages</h1>
        <p class="hero-deck">For MCP and CLI authors who need size-limited output that keeps types, order, and source details.</p>
        <div class="hero-actions"><a class="button primary" href="/?demo=1" data-link>Try it with sample data</a><span>Loads 12 orders and builds their envelope.</span></div>
        <ul class="fact-list" aria-label="Product facts">
          <li><span aria-hidden="true">01</span> Free and MIT licensed.</li>
          <li><span aria-hidden="true">02</span> Runs in this tab. No uploads.</li>
          <li><span aria-hidden="true">03</span> Works offline after your first visit.</li>
        </ul>
      </div>
      <figure class="hero-plate">
        <div class="measure measure-top" aria-hidden="true">← 16,384 byte cap →</div>
        <img src="/assets/result-envelope-blueprint.webp" width="1200" height="800" fetchpriority="high" alt="A drafting table separates one large result into a manifest, schema, summary, and bounded pages.">
        <figcaption>One result. Four inspectable parts. Every page stays within its row and byte caps.</figcaption>
      </figure>
    </section>
    <section class="preview-band" aria-labelledby="preview-title">
      <div class="shell preview-grid">
        <div><p class="sheet-no">Sheet 02</p><h2 id="preview-title">Inspect the result envelope before you install</h2><p>The sample envelope shows caps, field types, counts, and its next cursor.</p></div>
        <div class="envelope-preview" aria-label="Example result envelope">
          <div class="envelope-rail"><span>Manifest</span><strong>12 rows</strong><strong>3 pages</strong><strong>4 KB cap</strong></div>
          <pre tabindex="0"><code>{
  "summary": "12 rows · 6 fields · 3 pages",
  "page": {
    "rowStart": 0,
    "rowEnd": 5,
    "nextCursor": "eyJ2Ijox…"
  }
}</code></pre>
        </div>
      </div>
    </section>
    <section class="steps shell" id="how" aria-labelledby="how-title">
      <p class="sheet-no">Sheet 03</p><h2 id="how-title">Build a result envelope in three steps</h2>
      <ol>
        <li><span>01</span><div><h3>Pass the rows</h3><p>Give the library JSON from your tool or query.</p></div></li>
        <li><span>02</span><div><h3>Set hard caps</h3><p>Choose the row count, page size, and page bytes.</p></div></li>
        <li><span>03</span><div><h3>Return one envelope</h3><p>Send its metadata and first page. Use the cursor to fetch the next page.</p></div></li>
      </ol>
      <div class="code-sheet"><div class="code-title"><span>Node.js / ESM</span><button type="button" data-copy-install>Copy install command</button></div><pre tabindex="0"><code>npm install ${packageUrl}

import { createEnvelope } from "mcp-result-envelope";

const envelope = createEnvelope(rows, {
  pageSize: 25,
  maxRows: 10_000,
  maxBytes: 16_384,
  provenance: "orders query"
});</code></pre><p class="package-download"><a href="${packagePath}" download>Download the npm package</a></p></div>
    </section>
    <section class="boundaries" aria-labelledby="limits-title"><div class="shell boundaries-grid">
      <div><p class="sheet-no">Revision note</p><h2 id="limits-title">Know the envelope boundaries</h2></div>
      <ul>
        <li>The package makes no network or model calls.</li>
        <li>The summary contains counts and numeric ranges, not rows.</li>
        <li>The same input and caps produce the same cursor.</li>
        <li>It rejects a row that cannot fit the byte cap.</li>
      </ul>
      <a class="button inverse" href="/demo" data-link>Inspect the sample envelope</a>
    </div></section>
  </main>`);
}

function inspector(demo: boolean): string {
  const metricIds = demo
    ? ["detail-metric-rows", "detail-metric-pages", "detail-metric-bytes", "detail-metric-fields"]
    : ["metric-rows", "metric-pages", "metric-bytes", "metric-fields"];
  return pageShell(`<main id="main" tabindex="-1" class="inspector-main${demo ? " demo-inspector" : ""}">
    <section class="inspector-head shell"><p class="sheet-label">Local inspector / revision 01</p><h1>${demo ? "Inspect a sample result envelope" : "Build a result envelope"}</h1><p>${demo ? "Edit the bundled orders and rebuild the envelope. Demo edits stay in this tab." : "Paste a JSON array or object. The inspector keeps it in this tab."}</p></section>
    ${demo ? `<section class="demo-result-strip shell" aria-labelledby="demo-result-title" aria-live="polite">
      <div class="demo-result-heading"><p class="sheet-label">Built sample / envelope output</p><h2 id="demo-result-title">Sample envelope ready</h2><p>The envelope already contains the 12 bundled orders.</p></div>
      <dl class="demo-meters"><div><dt>Rows</dt><dd id="metric-rows" data-metric="rows">—</dd></div><div><dt>Pages</dt><dd id="metric-pages" data-metric="pages">—</dd></div></dl>
      <pre id="demo-envelope-preview" tabindex="0" aria-label="Populated sample manifest"><code>Building the sample envelope…</code></pre>
    </section>` : ""}
    <section class="workbench shell" aria-label="Result envelope inspector">
      <form class="input-sheet" id="envelope-form" novalidate>
        <div class="sheet-heading"><h2>Input JSON</h2><span id="input-count">0 bytes</span></div>
        <label for="json-input">Rows or one JSON value</label>
        <textarea id="json-input" name="json" spellcheck="false" aria-describedby="input-help input-error"></textarea>
        <p id="input-help" class="help">Use valid JSON. Numbers must be finite.</p>
        <p id="input-error" class="error-note" role="alert"></p>
        <fieldset><legend>Envelope caps</legend>
          <label for="page-size">Rows per page<input id="page-size" name="pageSize" type="number" min="1" step="1" value="5"></label>
          <label for="max-rows">Maximum rows<input id="max-rows" name="maxRows" type="number" min="1" step="1" value="50"></label>
          <label for="max-bytes">Bytes per page<input id="max-bytes" name="maxBytes" type="number" min="256" step="1" value="4096"></label>
        </fieldset>
        <label for="provenance">Source details (<code>provenance</code>)<input id="provenance" name="provenance" type="text" value="${demo ? "bundled order export" : "local input"}"></label>
        <button class="button primary full" type="submit">Build the envelope</button>
      </form>
      <section class="output-sheet" aria-labelledby="output-title">
        <div class="sheet-heading"><h2 id="output-title">Envelope output</h2><span id="envelope-status">Waiting for input</span></div>
        <div id="empty-output" class="empty-state"><span class="empty-glyph" aria-hidden="true">⌞</span><h3>No envelope yet</h3><p>Build the envelope to see its manifest, summary, schema, and first page.</p></div>
        <div id="envelope-output" hidden>
          <dl class="meter-strip"><div><dt>Rows</dt><dd id="${metricIds[0]}" data-metric="rows">—</dd></div><div><dt>Pages</dt><dd id="${metricIds[1]}" data-metric="pages">—</dd></div><div><dt>Page bytes</dt><dd id="${metricIds[2]}" data-metric="bytes">—</dd></div><div><dt>Fields</dt><dd id="${metricIds[3]}" data-metric="fields">—</dd></div></dl>
          <div class="tabs" role="tablist" aria-label="Envelope parts">
            <button role="tab" aria-selected="true" aria-controls="panel-manifest" id="tab-manifest" type="button">Manifest</button>
            <button role="tab" aria-selected="false" aria-controls="panel-summary" id="tab-summary" type="button" tabindex="-1">Summary</button>
            <button role="tab" aria-selected="false" aria-controls="panel-schema" id="tab-schema" type="button" tabindex="-1">Schema</button>
            <button role="tab" aria-selected="false" aria-controls="panel-page" id="tab-page" type="button" tabindex="-1">Page</button>
          </div>
          <div class="panel-stack">
            <section role="tabpanel" id="panel-manifest" aria-labelledby="tab-manifest" tabindex="0"><pre><code></code></pre></section>
            <section role="tabpanel" id="panel-summary" aria-labelledby="tab-summary" tabindex="0" hidden><pre><code></code></pre></section>
            <section role="tabpanel" id="panel-schema" aria-labelledby="tab-schema" tabindex="0" hidden><pre><code></code></pre></section>
            <section role="tabpanel" id="panel-page" aria-labelledby="tab-page" tabindex="0" hidden><pre><code></code></pre></section>
          </div>
          <div class="page-tools"><button type="button" class="button secondary" id="next-page">Show next page</button><button type="button" class="button text-button" id="copy-cursor">Copy next cursor</button></div>
        </div>
        <p id="output-status" class="sr-only" aria-live="polite"></p>
      </section>
    </section>
  </main>`, demo);
}

function privacy(): string {
  return pageShell(`<main id="main" tabindex="-1"><article class="legal shell"><p class="sheet-label">Policy sheet / 2026-08-28</p><h1>Privacy without hidden collection</h1><p>Result Envelope keeps the JSON you enter in the current browser tab.</p><h2>Browser inspector</h2><p>The inspector sends no input over the network. It saves no input in cookies, local storage, session storage, or a server.</p><h2>npm package and CLI</h2><p>The package makes no network requests. The CLI reads only the file or standard input you provide.</p><h2>Website hosting</h2><p>Our host may keep standard security logs. This site loads no analytics, advertising, tracking scripts, or third-party fonts.</p><h2>Contact</h2><p>Questions can go to <a href="mailto:hello@sociobot.in">hello@sociobot.in</a>.</p></article></main>`);
}

function terms(): string {
  return pageShell(`<main id="main" tabindex="-1"><article class="legal shell"><p class="sheet-label">Terms sheet / 2026-08-28</p><h1>Terms for using Result Envelope</h1><p>Result Envelope is free software under the MIT License.</p><h2>Use</h2><p>You may use, copy, modify, and distribute the software under that license.</p><h2>No warranty</h2><p>The software is provided “as is” without warranty. Check envelope settings before using results in production.</p><h2>Your data</h2><p>You are responsible for the data you process and the source labels you attach.</p><h2>Changes</h2><p>New versions may change these terms. The date at the top identifies this version.</p></article></main>`);
}

function notFound(): string {
  return pageShell(`<main id="main" tabindex="-1"><section class="not-found shell"><div class="lost-sheet" aria-hidden="true">404<span>sheet not filed</span></div><div><p class="sheet-label">Drawing not found</p><h1>This page is not in the envelope</h1><p>The address does not match a published sheet.</p><a class="button primary" href="/" data-link>Return to the main sheet</a></div></section></main>`);
}

function setMeta(path: string): void {
  const data: Record<string, [string, string]> = {
    "/": ["Result Envelope — Pack large tool results", "Pack structured tool results into compact summaries, schemas, and stable pages with a typed npm library and CLI."],
    "/demo": ["Demo — Result Envelope", "Inspect sample JSON as a bounded result envelope in your browser."],
    "/inspect": ["Inspector — Result Envelope", "Build a bounded result envelope from JSON in your browser."],
    "/privacy": ["Privacy — Result Envelope", "Read how Result Envelope handles data in the browser, package, and CLI."],
    "/terms": ["Terms — Result Envelope", "Read the terms for using Result Envelope."],
    "/404": ["Page not found — Result Envelope", "Return to the Result Envelope home page."]
  };
  const [title, description] = data[path] ?? data["/404"];
  document.title = title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')!.content = description;
  const canonical = `https://mcp-result-envelope.sociobot.in${path === "/404" ? location.pathname : path}`;
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!.href = canonical;
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')!.content = title;
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')!.content = description;
  document.querySelector<HTMLMetaElement>('meta[property="og:url"]')!.content = canonical;
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')!.content = title;
  document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')!.content = description;
}

function activateTabs(): void {
  const tabs = [...document.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const select = (tab: HTMLButtonElement): void => {
    for (const item of tabs) {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute("aria-controls")!)!.hidden = !selected;
    }
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      select(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });
  });
}

function setupInspector(demo: boolean): void {
  const form = document.querySelector<HTMLFormElement>("#envelope-form")!;
  const input = document.querySelector<HTMLTextAreaElement>("#json-input")!;
  const error = document.querySelector<HTMLParagraphElement>("#input-error")!;
  const status = document.querySelector<HTMLParagraphElement>("#output-status")!;
  const output = document.querySelector<HTMLDivElement>("#envelope-output")!;
  const empty = document.querySelector<HTMLDivElement>("#empty-output")!;
  const nextButton = document.querySelector<HTMLButtonElement>("#next-page")!;
  const copyButton = document.querySelector<HTMLButtonElement>("#copy-cursor")!;
  let envelope: ResultEnvelope | null = null;
  let parsed: JsonValue | null = null;
  let options: EnvelopeOptions = {};
  let cursor: string | null = null;

  const updateCount = (): void => {
    document.querySelector("#input-count")!.textContent = `${new TextEncoder().encode(input.value).byteLength.toLocaleString()} bytes`;
  };
  const show = (value: ResultEnvelope): void => {
    envelope = value;
    cursor = value.page.nextCursor;
    empty.hidden = true;
    output.hidden = false;
    document.querySelectorAll<HTMLElement>('[data-metric="rows"]').forEach((item) => { item.textContent = `${value.manifest.includedRows}${value.manifest.capped ? " capped" : ""}`; });
    document.querySelectorAll<HTMLElement>('[data-metric="pages"]').forEach((item) => { item.textContent = String(value.manifest.pageCount); });
    document.querySelectorAll<HTMLElement>('[data-metric="bytes"]').forEach((item) => { item.textContent = value.page.bytes.toLocaleString(); });
    document.querySelectorAll<HTMLElement>('[data-metric="fields"]').forEach((item) => { item.textContent = String(value.summary.fields); });
    const demoPreview = document.querySelector<HTMLElement>("#demo-envelope-preview code");
    if (demoPreview) demoPreview.textContent = JSON.stringify({
      manifest: { includedRows: value.manifest.includedRows, pageCount: value.manifest.pageCount, id: value.manifest.id },
      summary: value.summary.text
    }, null, 2);
    document.querySelector("#envelope-status")!.textContent = "Envelope ready";
    const values = [value.manifest, value.summary, value.schema, value.page];
    ["manifest", "summary", "schema", "page"].forEach((name, index) => {
      document.querySelector(`#panel-${name} code`)!.textContent = JSON.stringify(values[index], null, 2);
    });
    nextButton.disabled = !cursor;
    copyButton.disabled = !cursor;
    status.textContent = `Envelope built. ${value.summary.text}.`;
  };
  const build = (): void => {
    error.textContent = "";
    input.removeAttribute("aria-invalid");
    try {
      if (!input.value.trim()) throw new Error("Input is empty. Paste JSON or load the sample, then build the envelope.");
      parsed = JSON.parse(input.value) as JsonValue;
      const data = new FormData(form);
      options = {
        pageSize: Number(data.get("pageSize")),
        maxRows: Number(data.get("maxRows")),
        maxBytes: Number(data.get("maxBytes")),
        provenance: String(data.get("provenance") || "local input")
      };
      show(createEnvelope(parsed, options));
    } catch (cause) {
      const message = cause instanceof SyntaxError
        ? "The input is not valid JSON. Fix the marked syntax and build the envelope again."
        : cause instanceof Error ? cause.message : "The envelope could not be built. Check the input and caps.";
      error.textContent = message;
      input.setAttribute("aria-invalid", "true");
      document.querySelector("#envelope-status")!.textContent = "Input needs a fix";
      status.textContent = message;
      input.focus();
    }
  };
  input.value = demo ? JSON.stringify(sampleRows, null, 2) : "";
  updateCount();
  input.addEventListener("input", updateCount);
  form.addEventListener("submit", (event) => { event.preventDefault(); build(); });
  nextButton.addEventListener("click", () => {
    if (!parsed || !cursor || !envelope) return;
    try {
      const page = getEnvelopePage(parsed, cursor, options);
      envelope.page = page;
      cursor = page.nextCursor;
      document.querySelectorAll<HTMLElement>('[data-metric="bytes"]').forEach((item) => { item.textContent = page.bytes.toLocaleString(); });
      document.querySelector("#panel-page code")!.textContent = JSON.stringify(page, null, 2);
      nextButton.disabled = !cursor;
      copyButton.disabled = !cursor;
      status.textContent = `Page ${page.number} is shown.`;
      document.querySelector<HTMLButtonElement>("#tab-page")!.click();
    } catch (cause) {
      error.textContent = cause instanceof EnvelopeError ? cause.message : "The page could not be opened. Build the envelope again.";
    }
  });
  copyButton.addEventListener("click", async () => {
    if (!cursor) return;
    await navigator.clipboard.writeText(cursor);
    copyButton.textContent = "Copied";
    status.textContent = "Next cursor copied.";
    window.setTimeout(() => { copyButton.textContent = "Copy next cursor"; }, 1200);
  });
  document.querySelector<HTMLButtonElement>("[data-reset-demo]")?.addEventListener("click", () => {
    input.value = JSON.stringify(sampleRows, null, 2);
    updateCount();
    build();
    input.focus();
  });
  activateTabs();
  if (demo) build();
}

function setupCommon(): void {
  const networkState = document.querySelector<HTMLElement>("#network-state");
  const updateNetwork = (): void => {
    if (networkState) networkState.textContent = navigator.onLine ? "Online" : "Offline — inspector still works";
  };
  updateNetwork();
  window.ononline = updateNetwork;
  window.onoffline = updateNetwork;
  document.querySelector<HTMLButtonElement>(".theme-button")?.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme === "dark" || (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "light" : "dark";
  });
  document.querySelector<HTMLButtonElement>("[data-copy-install]")?.addEventListener("click", async (event) => {
    await navigator.clipboard.writeText(installCommand);
    (event.currentTarget as HTMLButtonElement).textContent = "Copied install command";
  });
  for (const link of document.querySelectorAll<HTMLAnchorElement>("a[data-link]")) {
    link.addEventListener("click", (event) => {
      const url = new URL(link.href);
      if (url.origin !== location.origin) return;
      event.preventDefault();
      history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
      render(true);
    });
  }
}

function render(focus = false): void {
  const path = location.pathname.replace(/\/$/, "") || "/";
  const demo = path === "/demo" || new URLSearchParams(location.search).get("demo") === "1";
  if (path === "/") app.innerHTML = demo ? inspector(true) : landing();
  else if (path === "/demo") app.innerHTML = inspector(true);
  else if (path === "/inspect") app.innerHTML = inspector(false);
  else if (path === "/privacy") app.innerHTML = privacy();
  else if (path === "/terms") app.innerHTML = terms();
  else app.innerHTML = notFound();
  const metaPath = demo ? "/demo" : ["/", "/inspect", "/privacy", "/terms"].includes(path) ? path : "/404";
  setMeta(metaPath);
  setupCommon();
  if (demo || path === "/inspect") setupInspector(demo);
  if (location.hash) requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
  if (focus) {
    const heading = document.querySelector<HTMLHeadingElement>("h1")!;
    heading.tabIndex = -1;
    heading.focus();
    routeStatus.textContent = "";
    requestAnimationFrame(() => { routeStatus.textContent = heading.textContent; });
  }
}

window.addEventListener("popstate", () => render(true));
render();

if ("serviceWorker" in navigator && import.meta.env.PROD) window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
