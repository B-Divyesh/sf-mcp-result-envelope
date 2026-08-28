# Adversarial first-read review 1 — FAIL

Reviewed 2026-08-28 against repository commit `5dcde66a97799b45d07c017ccec9bd141668b290` and the production site <https://mcp-result-envelope.sociobot.in>. This was a fresh mobile (390 × 844) and desktop browser pass, plus a clean checkout at `/tmp/mcp-result-envelope-review-cxlWE4/repo`.

## Verdict

**FAIL.** The web demo is usable, but the public npm package named in the page and README is not available from npm. A first-time library user cannot run the documented command or install the package. Two copy/claims-contract issues also remain.

## First screen, before scrolling

On both desktop and 390 px mobile, the first screen answers the three required questions.

- **What it does:** packs large tool results into stable pages.
- **For whom:** “For MCP and CLI authors who need every row reachable without flooding a model’s context.”
- **First action:** select **Try it with sample data**; adjacent copy says “Loads 12 orders in the inspector below.”

This is clear enough to proceed; it is not a first-screen blocking finding. The mobile first screen had no horizontal overflow and the blueprint-drafting composition is visibly product-specific rather than a generic SaaS layout.

## Findings

### F-1-1 — BLOCKING — The documented public npm package does not exist

**Location / quote:** README lines 14 and 24, and the landing-page code sample: `npx mcp-result-envelope demo` / `npm install mcp-result-envelope`.

**Evidence:** from a fresh environment on 2026-08-28:

```text
$ npm view mcp-result-envelope@0.1.0 version dist.tarball --json
npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/mcp-result-envelope - Not found
npm error 404  'mcp-result-envelope@0.1.0' is not in this registry.
```

The repository can build a tarball and its internal CLI test runs `node dist/cli.js demo`, but that does not make the advertised `npx` or `npm install` path work. This blocks the artifact's actual job for a visitor who wants to use the library outside the browser demo.

**Concrete fix:** publish version `0.1.0` under the documented name, then add a release/consumer smoke test that creates an empty temporary project and runs `npx --yes mcp-result-envelope@0.1.0 demo` (or installs the exact documented published version and runs `result-envelope demo`). Do not retain the public registry commands until that test can pass. Add the availability statement as a declared claim if it remains in the copy.

### F-1-2 — HIGH — Material landing and README claims have no matching claims entry

**Location / quote:** `.factory/claims.json` has 11 entries, but the following visitor-reliant statements on the landing page or README do not have their own matching claim entry and tagged sandbox test:

| Location | Unlisted claim-like copy | Required fix |
| --- | --- | --- |
| Landing hero | “Loads 12 orders in the inspector below.” | Add a `demo-sample` claim that opens `/demo` cleanly and asserts the 12 realistic seeded orders and built packet, or remove the number. |
| Landing preview | “One result. Four inspectable parts.” | Add a `four-parts` claim that asserts manifest, summary, schema, and page are visible and populated in the demo, or remove it. |
| Landing preview | “The packet shows its caps, field types, counts, and next cursor.” | Add a tagged playground test for each named output, or reduce the sentence to a non-claiming label. |
| Landing limits | “It does not call a model or rank rows.” / “It does not host data or change MCP transport.” | Add observable package/browser tests for these negative guarantees, or remove them. |
| Landing limits | “It rejects a row that cannot fit the byte cap.” | Promote the existing untagged oversized-row unit check into a declared, tagged claim. |
| README opening | “It keeps result boundaries explicit before data reaches a model.” | Define and test the promised observable envelope boundary, or remove the outcome claim. |
| README opening | “The library has no runtime dependencies and sends no telemetry.” | Add separate dependency-metadata and complete runtime-request tests, then declare both claims. |
| README install | “Node.js 18 or newer is required.” | Add an engines/compatibility claim test or state the requirement only where the published package metadata can be verified after F-1-1 is fixed. |
| README API description | “`createEnvelope` returns four parts:” and the manifest/schema/page descriptions | Add a single API-shape claim with a typed fixture that asserts every documented part and property, or shorten to the already-declared claims. |
| README CLI section | “JSON goes to stdout. Errors go to stderr and return a non-zero exit code.” | Add a tagged CLI I/O claim running the documented command in a temp directory. |
| README caps section | “`maxRows` stops the included row count and sets `manifest.capped`.” / “Inputs must be JSON values with finite numbers and no circular references.” | Add separately tagged cap and input-validation claims; the current untagged unit tests are not listed in the claim manifest. |
| README build/privacy | “`npm run build` creates the library in `dist/` and the static site in `dist/site/`.” / “The browser inspector processes input in the current tab and stores nothing.” | Add observable build-output and non-demo inspector-storage claims, or remove the guarantees. |

Existing entries cover the exact free/MIT, no-upload, JSON-type/provenance, row-free summary, page-cap, stable-cursor, chunk-order, package-network, CLI-demo, offline-demo, and demo-memory statements. They do not cover the additional statements above. The supplied claims contract requires every claim-like landing/README statement to be listed and tested; passing the existing 11 commands is therefore insufficient.

**Concrete fix:** either add one exact `claims.json` entry and one `@claim:<id>` sandbox test for each row above, or remove/rewrite the copy so it makes no visitor-reliant promise. Ensure the test describes the actual public path after F-1-1 is resolved.

### F-1-3 — MINOR — The landing switches from the defined “packet” term to unexplained “contract” headings

**Location / quote:** landing headings “See the contract before you install” and “Build the result contract in three steps” (`site/src/main.ts:64,79`). The repository’s copy audit defines the whole structured result as a **packet**, and the surrounding landing copy uses “packet.”

**Why it matters:** as an isolated heading (for example in a screen-reader heading list), “the contract” does not identify what the visitor will see. The change in term also weakens first-read consistency.

**Concrete fix:** use the established noun in both headings, for example “Inspect the result packet before you install” and “Build a result packet in three steps.” Keep “async iterator contract” in the README only if it refers to a distinct programming concept and is briefly explained.

## Copy audit

Word counts treat hyphenated forms and contractions as one word. Code tokens, JSON previews, numeric rail labels, and icon-only theme control are excluded because they are not prose sentences. No item exceeds 22 words. No banned marketing adjective appears. The only terminology/context issue is F-1-3. All visible action labels name an action/result adequately; the required demo action is the prescribed “Try it with sample data.”

### Landing page

| Words | Copy |
| ---: | --- |
| 2 | RESULT ENVELOPE |
| 1 | Demo |
| 1 | Guide |
| 1 | Privacy |
| 6 | Specification RE–01 / npm + CLI |
| 7 | Pack large tool results into stable pages |
| 15 | For MCP and CLI authors who need every row reachable without flooding a model’s context. |
| 5 | Try it with sample data |
| 7 | Loads 12 orders in the inspector below. |
| 4 | Free and MIT licensed. |
| 4 | Runs in this tab. |
| 2 | No uploads. |
| 2 | One result. |
| 3 | Four inspectable parts. |
| 6 | Every page has a measured edge. |
| 6 | See the contract before you install |
| 11 | The packet shows its caps, field types, counts, and next cursor. |
| 7 | Build the result contract in three steps |
| 3 | Pass the rows |
| 9 | Give the library JSON from your tool or query. |
| 3 | Set hard caps |
| 9 | Choose the row count, page size, and page bytes. |
| 3 | Return one packet |
| 6 | Send its metadata and first page. |
| 5 | Resolve the cursor when asked. |
| 3 | Copy install command |
| 6 | Know what it does not do |
| 9 | It does not call a model or rank rows. |
| 9 | It does not host data or change MCP transport. |
| 9 | It does not hide rows inside a generated summary. |
| 10 | It rejects a row that cannot fit the byte cap. |
| 4 | Inspect the sample packet |
| 6 | Bounded pages for large tool results. |
| 1 | Terms |
| 4 | Built by Param Factory |

### README

| Words | Copy |
| ---: | --- |
| 2 | Result Envelope |
| 10 | Pack large tool results into summaries, schemas, and stable pages. |
| 9 | Result Envelope is for MCP and CLI tool authors. |
| 10 | It keeps result boundaries explicit before data reaches a model. |
| 11 | It does not call models, store results, or choose “important” rows. |
| 10 | The library has no runtime dependencies and sends no telemetry. |
| 3 | Try the demo |
| 10 | Open the browser demo, or run the bundled CLI sample: |
| 15 | The CLI writes its sample envelope to a new temporary directory and prints the path. |
| 14 | The browser demo keeps edits in memory and discards them when demo mode ends. |
| 9 | The browser demo reopens offline after its first visit. |
| 1 | Install |
| 6 | Node.js 18 or newer is required. |
| 3 | Use the library |
| 4 | `createEnvelope` returns four parts: |
| 9 | `manifest`: result identity, caps, counts, page count, and provenance. |
| 8 | `summary`: field count, page count, and numeric ranges. |
| 5 | It contains no sample rows. |
| 11 | `schema`: dotted field paths, observed JSON types, nullability, and presence counts. |
| 11 | `page`: bounded rows and a stable cursor for the next page. |
| 9 | The same input and options produce the same cursor. |
| 10 | A cursor from different data or options fails with `INVALID_CURSOR`. |
| 2 | Stream chunks |
| 9 | Chunks arrive as manifest, summary, schema, then bounded pages. |
| 6 | This is an async iterator contract. |
| 7 | It does not change MCP transport behavior. |
| 3 | Use the CLI |
| 6 | Run `result-envelope --help` for all flags. |
| 4 | JSON goes to stdout. |
| 10 | Errors go to stderr and return a non-zero exit code. |
| 3 | Caps and errors |
| 9 | `maxRows` stops the included row count and sets `manifest.capped`. |
| 6 | `pageSize` limits rows in each page. |
| 8 | `maxBytes` limits the serialized size of each page. |
| 7 | A single row over `maxBytes` raises `ROW_TOO_LARGE`. |
| 7 | Increase the cap or remove large fields. |
| 12 | Inputs must be JSON values with finite numbers and no circular references. |
| 8 | Result Envelope preserves JSON types and provenance metadata. |
| 12 | It does not claim that one format is best for every model. |
| 3 | Develop and verify |
| 14 | `npm run build` creates the library in `dist/` and the static site in `dist/site/`. |
| 9 | The exact site build command is `npm run build:site`. |
| 1 | Privacy |
| 6 | The package makes no network requests. |
| 12 | The browser inspector processes input in the current tab and stores nothing. |
| 5 | See the site’s privacy page. |
| 1 | License |
| 1 | MIT. |
| 2 | See LICENSE. |

## Demo and sandbox verification

The one-click demo passes its behavioural check. Following the first-screen action opens `/demo` with a built 12-order packet immediately visible (12 rows, 3 pages, 724 page bytes, 6 fields). The persistent banner reads “Demo — sample data, nothing is saved” and includes **Reset demo** and **Start for real**.

Editing the demo input to `[{"private":"review-secret"}]`, building, then selecting **Reset demo** removed the secret and restored the sample. Selecting **Start for real** opened `/inspect` with an empty input. The live context had zero cookies, zero local-storage entries, and zero session-storage entries. The whole flow requested only same-origin HTML, JS, and CSS; no edited value appeared in any request. The declared offline test also passed from the clean checkout.

The CLI demo claim test passed and creates a separate `result-envelope-demo-*` temporary path. The library playground is present at `/demo` and is editable with live output. The missing registry package prevents the separately documented `npx` path (F-1-1).

## Claims result

Every command currently listed in `.factory/claims.json` passed from the clean clone after `npm ci`:

| Claim id | Result |
| --- | --- |
| free-license | PASS |
| local-processing | PASS |
| json-types | PASS |
| summary-no-rows | PASS |
| page-caps | PASS |
| stable-cursors | PASS |
| stream-order | PASS |
| package-no-network | PASS |
| cli-demo | PASS |
| offline-reload | PASS |
| demo-memory | PASS |

`npm test` passed in the clean checkout (typecheck, production builds, 14 unit tests, and 14 browser tests; two project-conditional skips). `npm run build` created `dist/` and `dist/site/`; `npm run pack:check` created a 9.7 kB dry-run tarball. These results do not test publication or resolve F-1-1.

## Earlier-record retest

No earlier `.factory/review-*.md` or `.factory/polish-*.md` exists. I read both earlier verification records and the former handoff.

- The earlier stdin defect is fixed: the exact documented `pack - --format ndjson --stream` path is now covered by `@claim:stream-order` and passed from the clean build, emitting manifest → summary → schema → page.
- The earlier mobile touch-target defect is fixed on the live 390 px `/demo`: Reset demo 92 × 44, Start for real 93 × 44, footer Privacy 44 × 44, Terms 44 × 44, and Built by Param Factory 126 × 44 CSS px. The remaining visible controls also measured at least 44 px on their short side.

## Structure, routes, and accessibility

Checked live `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, and an unknown deep link. Each returned one `main` and one `h1`; route titles follow the required plain pattern and route descriptions/canonicals update correctly. The page includes `lang`, favicon, apple touch icon, canonical, OG/Twitter metadata, robots, sitemap, a styled 404, CSP, HSTS, and self-hosted assets. Internal links and the Param Factory external link returned HTTP 200; `mailto:` is explicit.

Client-side navigation moves focus and the polite route announcement to the new `h1`; browser Back returns focus to the landing `h1`. The header/footer are consistent and include Privacy/Terms. The clean browser suite’s axe checks reported zero serious or critical violations in both color schemes; live navigation and the direct demo pass had no page or console errors. The design matches the documented blueprint sheet thesis and is distinct.

## Missed leverage

No additional AI feature is expected by this brief: the library’s purpose is deterministic result bounding, and AI classification would weaken its stated provenance/boundary guarantee. The included in-page playground and CLI sample cover the obvious try-before-install paths once the public npm install path is made real.

## What would make this perfect

Publish and verify the exact npm package named in the product, make publication a release-gated consumer test, register or remove every claim-like sentence above, and use “packet” consistently in the landing headings. Re-run this full cold-browser, clean-clone, claims, demo-isolation, and route pass after deployment.
