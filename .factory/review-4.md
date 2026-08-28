# Adversarial first-read review 4 — FAIL

Reviewed 2026-08-28 against repository commit `d7b96e0ce3895cebdc507a6c2533ca34a856c003` and <https://mcp-result-envelope.sociobot.in>. Fresh Chromium contexts used 390 × 844 and 1440 × 900 viewports. The live JavaScript and CSS asset names matched the clean build.

## Verdict

**FAIL.** No blocking defect remains, and the product works end to end. Two minor plain-language findings remain: the same returned object is called both an “envelope” and a “packet,” and the README uses “provenance” before defining it. This review requires zero findings for `PASS`.

## First screen, before scrolling

The cold read answered all three required questions at both widths.

- **What it does:** packs large MCP or CLI tool results into size-limited, stable pages.
- **For whom:** MCP and CLI authors who need types, order, and source details retained.
- **What to select first:** **Try it with sample data**; the adjacent sentence says it loads 12 orders and builds the result.

The exact supporting text is “Pack large tool results into stable pages,” “For MCP and CLI authors who need size-limited output that keeps types, order, and source details,” and “Try it with sample data.” At 390 px, the action ends at y=437, its outcome ends at y=488, and the three price/privacy/offline facts end by y=587. At 1440 px, all three facts end by y=695. Nothing required scrolling.

## Findings

### F-4-1 — MINOR — The product alternates between “envelope” and “packet” for the same output

**Exact locations / quotes:**

- Landing action outcome: “Loads 12 orders and builds their packet.”
- Demo heading and action: “Inspect a sample result envelope” and **Build the envelope**.
- The same demo: “Edit the bundled orders and rebuild the packet,” “Packet output,” and “Sample packet ready.”
- README demo: “The CLI writes its sample envelope to a new temporary directory and prints the path.”

**Why this fails:** a first-time visitor must infer that “envelope” and “packet” name the same returned structure. The repository’s terminology table says **packet** is the one word for the whole result, while the product name, public API, and inspector also use **envelope**. This violates the one-concept/one-term rule.

**Concrete fix:** use **envelope** everywhere because it matches the product and `createEnvelope` API. Rewrite the landing sentence as “Loads 12 orders and builds their envelope.” Rename “Packet output” to “Envelope output,” “Sample packet ready” to “Sample envelope ready,” and related packet copy consistently. Update the terminology table to “Whole structured result → envelope.” Alternatively, choose **packet** everywhere and rename the inspector actions, but do not retain both terms without defining a real distinction.

### F-4-2 — MINOR — The README introduces “provenance” as unexplained jargon

**Exact locations / quotes:** README introduction: “The package preserves JSON types, row order, and provenance.” Later: “Result Envelope preserves JSON types and provenance metadata.”

**Why this fails:** “provenance” is a public API term, but the README never first translates it into the plain “source details” wording already used successfully on the landing page. A reader must infer its meaning from the code sample.

**Concrete rewrite:** change the introduction to “The package preserves JSON types, row order, and source details.” In the manifest description, introduce the API name once: “`manifest`: result identity, caps, counts, page count, and source details in `provenance`.” Change the later sentence to “Result Envelope preserves JSON types and source metadata.”

## Copy audit

Counts treat hyphenated forms, code identifiers, and versions as one word. Standalone punctuation is not counted. Raw code/JSON blocks are excluded; all headings, prose, labels, actions, and meaningful image text are included. No sentence exceeds 22 words, no banned marketing adjective appears, headings work out of context, and every button names an action or result. The two terminology/jargon flags are marked below.

### Landing page

| Words | Exact copy | Flag |
| ---: | --- | --- |
| 4 | Skip to main content | None |
| 2 | Result Envelope | None |
| 1 | Demo | None |
| 1 | Guide | None |
| 1 | Privacy | None |
| 3 | Switch color theme | None |
| 4 | Specification RE–01 / npm + CLI | None |
| 7 | Pack large tool results into stable pages | None |
| 16 | For MCP and CLI authors who need size-limited output that keeps types, order, and source details. | None |
| 5 | Try it with sample data | None |
| 7 | Loads 12 orders and builds their packet. | F-4-1 |
| 4 | Free and MIT licensed. | None |
| 4 | Runs in this tab. | None |
| 2 | No uploads. | None |
| 6 | Works offline after your first visit. | None |
| 3 | 16,384 byte cap | None |
| 15 | A drafting table separates one large result into a manifest, schema, summary, and bounded pages. | None; technical terms are shown in the preview |
| 2 | One result. | None |
| 3 | Four inspectable parts. | None |
| 9 | Every page stays within its row and byte caps. | None |
| 2 | Sheet 02 | None |
| 7 | Inspect the result packet before you install | F-4-1 |
| 12 | The sample packet shows caps, field types, counts, and its next cursor. | F-4-1 |
| 1 | Manifest | None |
| 2 | 12 rows | None |
| 2 | 3 pages | None |
| 3 | 4 KB cap | None |
| 2 | Sheet 03 | None |
| 7 | Build a result packet in three steps | F-4-1 |
| 3 | Pass the rows | None |
| 9 | Give the library JSON from your tool or query. | None |
| 3 | Set hard caps | None |
| 9 | Choose the row count, page size, and page bytes. | None |
| 3 | Return one packet | F-4-1 |
| 6 | Send its metadata and first page. | None |
| 8 | Use the cursor to fetch the next page. | None |
| 2 | Node.js / ESM | None |
| 3 | Copy install command | None |
| 4 | Download the npm package | None |
| 2 | Revision note | None |
| 4 | Know the packet boundaries | F-4-1 |
| 8 | The package makes no network or model calls. | None |
| 9 | The summary contains counts and numeric ranges, not rows. | None |
| 9 | The same input and caps produce the same cursor. | None |
| 10 | It rejects a row that cannot fit the byte cap. | None |
| 4 | Inspect the sample packet | F-4-1 |
| 6 | Bounded pages for large tool results. | None |
| 1 | Terms | None |
| 7 | Built by Param Factory ↗ · v0.1.0 · build 2026.08 | None |

### README

| Words | Exact copy | Flag |
| ---: | --- | --- |
| 2 | Result Envelope | None |
| 10 | Pack large tool results into summaries, schemas, and stable pages. | None |
| 9 | Result Envelope is for MCP and CLI tool authors. | None |
| 12 | It turns JSON into a manifest, compact summary, schema, and stable pages. | None; output terms are explained below |
| 9 | The package preserves JSON types, row order, and provenance. | F-4-2 |
| 13 | It has no runtime dependencies and makes no network, model, or telemetry calls. | None |
| 3 | Try the demo | None |
| 14 | Open the browser demo, or run the same bundled sample from the released package: | None |
| 15 | The CLI writes its sample envelope to a new temporary directory and prints the path. | F-4-1 |
| 14 | The browser demo keeps edits in memory and discards them when demo mode ends. | None |
| 9 | The browser demo reopens offline after its first visit. | None |
| 1 | Install | None |
| 9 | Install the versioned npm package served by this release: | None |
| 8 | The package metadata requires Node.js 18 or newer. | None |
| 3 | Use the library | None |
| 13 | On the next tool call, rerun the stable query and use its cursor. | None; code comment |
| 4 | `createEnvelope` returns four parts: | None |
| 9 | `manifest`: result identity, caps, counts, page count, and provenance. | F-4-2 |
| 8 | `summary`: field count, page count, and numeric ranges. | None |
| 5 | It contains no sample rows. | None |
| 11 | `schema`: dotted field paths, observed JSON types, nullability, and presence counts. | None; public API terms |
| 11 | `page`: bounded rows and a stable cursor for the next page. | None |
| 9 | The same input and options produce the same cursor. | None |
| 10 | A cursor from different data or options fails with `INVALID_CURSOR`. | None |
| 2 | Stream chunks | None |
| 9 | Chunks arrive as manifest, summary, schema, then bounded pages. | None |
| 5 | `streamEnvelope` returns an async iterator. | None; JavaScript API term |
| 3 | Use the CLI | None |
| 6 | Run `result-envelope --help` for all flags. | None |
| 4 | JSON goes to stdout. | None |
| 10 | Errors go to stderr and return a non-zero exit code. | None |
| 3 | Caps and errors | None |
| 9 | `maxRows` stops the included row count and sets `manifest.capped`. | None |
| 6 | `pageSize` limits rows in each page. | None |
| 8 | `maxBytes` limits the serialized size of each page. | None |
| 7 | A single row over `maxBytes` raises `ROW_TOO_LARGE`. | None |
| 7 | Increase the cap or remove large fields. | None |
| 12 | Inputs must be JSON values with finite numbers and no circular references. | None |
| 8 | Result Envelope preserves JSON types and provenance metadata. | F-4-2 |
| 12 | It does not claim that one format is best for every model. | None |
| 3 | Develop and verify | None |
| 11 | `npm run build` creates the library and static site in `dist/`. | None |
| 9 | The site build also creates its versioned npm tarball. | None |
| 12 | To deploy the documentation site, serve `dist/site` as the static site root. | None |
| 7 | Do not deploy the top-level `dist` directory. | None |
| 1 | Privacy | None |
| 6 | The package makes no network requests. | None |
| 12 | The browser inspector keeps input in the current tab and saves nothing. | None |
| 5 | See the site’s privacy page. | None |
| 1 | License | None |
| 1 | MIT. | None |
| 2 | See LICENSE. | None |

## Demo and sandbox behavior

- The landing action enters `/?demo=1` in one click. The first post-click screen already shows realistic order data and a built result.
- At 390 × 844 and `scrollY=0`, **12 rows** and **3 pages** end at y=439; populated manifest/summary output ends at y=599. Desktop shows seeded input and the populated four-part output side by side.
- The persistent banner says “Demo — sample data, nothing is saved” and includes **Reset demo** and **Start for real**.
- Replacing the sample, rebuilding, and choosing **Reset demo** restored the 12 original orders. **Start for real** opened `/inspect` with empty input.
- Cookies, local storage, and session storage stayed empty. Captured requests were same-origin GETs for the page, JavaScript, and CSS; edited JSON appeared in no URL or body.
- The offline claim disabled the browser network after first load and successfully reloaded the populated demo.
- The clean-clone CLI claim ran `result-envelope demo`, created a fresh `result-envelope-demo-*` temporary directory, and verified its `envelope.json` output.

The demo is complete and isolated. No demo finding remains.

## Claims execution

`npm run test:claims` ran every manifest command from clean clone `/tmp/mcp-result-envelope-review4-hTdbH1/repo` after `npm ci`.

| Claim id | Result | Claim id | Result | Claim id | Result |
| --- | --- | --- | --- | --- | --- |
| free-license | PASS | installable-package | PASS | demo-sample | PASS |
| local-processing | PASS | browser-no-storage | PASS | site-no-tracking | PASS |
| json-types | PASS | api-shape | PASS | inspector-parts | PASS |
| packet-details | PASS | summary-no-rows | PASS | page-caps | PASS |
| row-cap | PASS | row-too-large | PASS | input-validation | PASS |
| stable-cursors | PASS | stream-api | PASS | stream-order | PASS |
| package-no-network | PASS | zero-runtime-dependencies | PASS | node-support | PASS |
| cli-demo | PASS | cli-help | PASS | cli-io | PASS |
| offline-reload | PASS | demo-memory | PASS | build-output | PASS |

Result: **27/27 claim commands passed**. Each manifest id has exactly one tagged test. Cross-checking the landing page and README found no unlisted claim-like sentence. No claim is untested.

The full clean-clone `npm test` also passed: typecheck, production build, 23 unit/consumer tests, and 29 browser tests with three intentional project-only skips. `npm run pack:check` produced a 9.9 kB tarball containing 10 declared files.

## Earlier finding retest

Every earlier review, polish record, and handoff was read before this rerun. Each prior finding was checked on production and in source.

| Earlier item | Current result |
| --- | --- |
| F-1-1 — unavailable npm package | **Fixed.** No bare registry instruction remains. The versioned live tarball returns 200; the clean claim installs it, imports the API, and runs the installed CLI. |
| F-1-2 / F-2-2 — unlisted or incomplete claims | **Fixed.** The manifest now has 27 one-to-one entries. All pass, including async iteration, complete CLI help, and every documented API-shape property. |
| F-1-3 — “contract” versus “packet” headings | **Fixed for the reported text.** “Contract” is gone. F-4-1 is the separate remaining envelope/packet inconsistency. |
| F-2-1 / F-3-1 — phone demo hid output | **Fixed.** Live 390 px coordinates put rows, pages, and populated output above y=599 at `scrollY=0`; source renders the phone result strip before the editor. |
| F-2-3 / F-3-5 — “measured edge” metaphor | **Fixed.** Live and source say “Every page stays within its row and byte caps.” |
| F-2-4 / F-3-6 — “Resolve the cursor” | **Fixed.** Live and source say “Use the cursor to fetch the next page.” |
| F-3-2 — async-iterator claim missing | **Fixed.** `stream-api` and `@claim:stream-api` prove the iterator identity and emitted chunks. |
| F-3-3 — CLI-help claim missing | **Fixed.** `cli-help` compares every documented command/flag with the parser surface. |
| F-3-4 — API-shape assertions incomplete | **Fixed.** The test asserts all manifest, summary, schema/nullability, and page properties named in the README. |
| F-3-7 — dense audience sentence | **Fixed.** The first screen now uses “source details” and 16 words. |
| F-3-8 — first-screen facts clipped / offline omitted | **Fixed.** Price, no-upload/tab handling, and offline behavior all fit both tested viewports. |
| Polish-1 and polish-3 closure records | **Confirmed for their enumerated fixes.** Live assets match the current build, and every cited behavioral gate passes. The new F-4-1 and F-4-2 copy findings prevent the current “nothing left” standard. |
| Prior handoff “Known gaps: None” | **Not confirmed as a perfection verdict.** Functional evidence is accurate, but the two copy defects above remain. |

## Structure, routes, accessibility, and identity

- `/`, `/demo`, `/inspect`, `/privacy`, and `/terms` return 200. `/missing-sheet` returns a designed HTTP 404 with “This page is outside the packet” and a working return link.
- Every route has `lang="en"`, one `main`, one `h1`, ordered headings, a route-specific title, description, canonical, Open Graph/Twitter metadata, favicon, and consistent header/footer. Titles follow the required route pattern and stay under 60 characters.
- Browser Back restores the prior route and focuses/announces its `h1`. Deep links load directly. Keyboard tabs, pagination, Reset, validation errors, and recovery work.
- The crawl found no dead product link: internal routes, the versioned tarball, Param Factory, icons, social card, robots, and sitemap return 200. The contact destination is explicit `mailto:`. The expected current unknown-route URL remains 404.
- Live Playwright reported 29 passing checks and three intentional project-only skips. Axe found zero serious/critical violations in both themes; no page or console error occurred. The phone has no horizontal overflow, visible controls meet 44 px targets, and reduced motion is covered.
- The response has HSTS, CSP, `X-Content-Type-Options`, referrer policy, and permissions policy. The CSP permits only same-origin scripts, styles, images, connections, and fonts.
- Initial production assets remain far below the cap: JavaScript 9.12 kB gzip and CSS 4.64 kB gzip. The hero is reserved and the page has no visible layout shift in the tested flows.
- The blueprint drafting sheet, ruled grid, clipped paper corners, revision red, measured rails, and original drafting-board illustration implement `.factory/design.md` and are recognisable rather than a generic SaaS template.

No structure, routing, accessibility, privacy, performance, or visual-identity finding remains.

## Missed leverage

No AI step is implied by a deterministic paging library. Generated classification or summarisation would weaken the product’s source-preservation role. The browser playground, JSON/NDJSON input, API/CLI output, streaming, downloadable package, and temporary-directory CLI demo cover the expected import/export paths. No decorative AI feature, provider key, or model endpoint is present.

## What would make this perfect

Use one name for the returned structure everywhere, preferably **envelope**, and translate “provenance” into “source details” before naming the API property. Then rerun the copy extraction and the existing claims/browser gates. Nothing else was found in this round.
