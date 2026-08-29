# Adversarial first-read review 6 — PASS

Reviewed 2026-08-29 against repository commit `cd54428ffe04ca06eb794743812774878eac9a4b` and the deployed site at <https://mcp-result-envelope.sociobot.in>. This was a fresh Chromium pass at 390 × 844 and 1440 × 900, plus a clean clone at `/tmp/review6/repo`.

## Verdict

**PASS.** No finding remains. The landing page answers the job, audience, and first action before scrolling; the one-click demo is visibly populated and isolated; every declared claim passed from the clean clone; and the release artifact, routes, accessibility, privacy behavior, and historical fixes were independently checked.

## First screen, before scrolling

At both widths, a first-time visitor can answer all three questions:

- **What it does:** “Pack large tool results into stable pages.”
- **For whom:** “For MCP and CLI authors who need size-limited output that keeps types, order, and source details.”
- **What to click first:** **Try it with sample data**. The adjacent copy says, “Loads 12 orders and builds their envelope.”

The action and all three useful facts (free/MIT, no uploads, offline after the first visit) remain in the initial viewport at 390 px and desktop. The mobile page has no horizontal overflow. This is not a first-screen blocking issue.

## Findings

None.

## Copy audit

Counts treat hyphenated terms, identifiers, paths, and contractions as one word. Code blocks and JSON data are excluded; visible headings, labels, actions, image alternative text, and prose are included. No item exceeds 22 words. No banned marketing adjective, metaphor-only heading, inconsistent output term, unexplained heading, or non-result naming action was found. All visitor-reliant statements map to the declared claims listed below.

### Landing page

| Copy | Words | Flag |
| --- | ---: | --- |
| Skip to main content | 4 | None |
| Result Envelope | 2 | None |
| Demo | 1 | None |
| Guide | 1 | None |
| Privacy | 1 | None |
| Switch color theme | 3 | None |
| Specification RE–01 / npm + CLI | 4 | None |
| Pack large tool results into stable pages | 7 | None |
| For MCP and CLI authors who need size-limited output that keeps types, order, and source details. | 16 | None |
| Try it with sample data | 5 | None |
| Loads 12 orders and builds their envelope. | 7 | None |
| Free and MIT licensed. | 4 | None |
| Runs in this tab. | 4 | None |
| No uploads. | 2 | None |
| Works offline after your first visit. | 6 | None |
| 16,384 byte cap | 3 | None |
| A drafting table separates one large result into a manifest, schema, summary, and bounded pages. | 15 | None |
| One result. | 2 | None |
| Four inspectable parts. | 3 | None |
| Every page stays within its row and byte caps. | 9 | None |
| Sheet 02 | 2 | None |
| Inspect the result envelope before you install | 7 | None |
| The sample envelope shows caps, field types, counts, and its next cursor. | 12 | None |
| Manifest / 12 rows / 3 pages / 4 KB cap | 10 | None |
| Sheet 03 | 2 | None |
| Build a result envelope in three steps | 7 | None |
| Pass the rows | 3 | None |
| Give the library JSON from your tool or query. | 9 | None |
| Set hard caps | 3 | None |
| Choose the row count, page size, and page bytes. | 9 | None |
| Return one envelope | 3 | None |
| Send its metadata and first page. | 6 | None |
| Use the cursor to fetch the next page. | 8 | None |
| Node.js / ESM | 2 | None |
| Copy install command | 3 | None |
| Download the npm package | 4 | None |
| Revision note | 2 | None |
| Know the envelope boundaries | 4 | None |
| The package makes no network or model calls. | 8 | None |
| The summary contains counts and numeric ranges, not rows. | 9 | None |
| The same input and caps produce the same cursor. | 9 | None |
| It rejects a row that cannot fit the byte cap. | 10 | None |
| Inspect the sample envelope | 4 | None |
| Bounded pages for large tool results. | 6 | None |
| Terms | 1 | None |
| Built by Param Factory | 4 | None |

### README

| Copy | Words | Flag |
| --- | ---: | --- |
| Result Envelope | 2 | None |
| Pack large tool results into summaries, schemas, and stable pages. | 10 | None |
| Result Envelope is for MCP and CLI tool authors. | 9 | None |
| It turns JSON into a manifest, compact summary, schema, and stable pages. | 12 | None |
| The package preserves JSON types, row order, and source details. | 10 | None |
| It has no runtime dependencies and makes no network, model, or telemetry calls. | 13 | None |
| Try the demo | 3 | None |
| Open the browser demo, or run the same bundled sample from the released package: | 14 | None |
| The CLI writes its sample envelope to a new temporary directory and prints the path. | 15 | None |
| The browser demo keeps edits in memory and discards them when demo mode ends. | 14 | None |
| The browser demo reopens offline after its first visit. | 9 | None |
| Install | 1 | None |
| Install the versioned npm package served by this release: | 9 | None |
| The package metadata requires Node.js 18 or newer. | 8 | None |
| Use the library | 3 | None |
| `createEnvelope` returns four parts: | 4 | None |
| `manifest`: result identity, caps, counts, page count, and source details in `provenance`. | 12 | None |
| `summary`: field count, page count, and numeric ranges. | 8 | None |
| It contains no sample rows. | 5 | None |
| `schema`: dotted field paths, observed JSON types, nullability, and presence counts. | 11 | None |
| `page`: bounded rows and a stable cursor for the next page. | 11 | None |
| The same input and options produce the same cursor. | 9 | None |
| A cursor from different data or options fails with `INVALID_CURSOR`. | 10 | None |
| Stream chunks | 2 | None |
| Chunks arrive as manifest, summary, schema, then bounded pages. | 9 | None |
| `streamEnvelope` returns an async iterator. | 5 | None |
| Use the CLI | 3 | None |
| Run `result-envelope --help` for all flags. | 6 | None |
| JSON goes to stdout. | 4 | None |
| Errors go to stderr and return a non-zero exit code. | 10 | None |
| Caps and errors | 3 | None |
| `maxRows` stops the included row count and sets `manifest.capped`. | 9 | None |
| `pageSize` limits rows in each page. | 6 | None |
| `maxBytes` limits the serialized size of each page. | 8 | None |
| A single row over `maxBytes` raises `ROW_TOO_LARGE`. | 7 | None |
| Increase the cap or remove large fields. | 7 | None |
| Inputs must be JSON values with finite numbers and no circular references. | 12 | None |
| Result Envelope preserves JSON types and source metadata. | 8 | None |
| It does not claim that one format is best for every model. | 12 | None |
| Develop and verify | 3 | None |
| `npm run build` creates the library and static site in `dist/`. | 11 | None |
| The site build also creates its versioned npm tarball. | 9 | None |
| To deploy the documentation site, serve `dist/site` as the static site root. | 13 | None |
| Do not deploy the top-level `dist` directory. | 7 | None |
| Privacy | 1 | None |
| The package makes no network requests. | 6 | None |
| The browser inspector keeps input in the current tab and saves nothing. | 12 | None |
| See the site’s privacy page. | 5 | None |
| License | 1 | None |
| MIT. | 1 | None |
| See `LICENSE`. | 2 | None |

Terminology remains consistent: **envelope** is the whole output, **page** is a size-limited row slice, **cursor** fetches a next page, **rows** are input records, and **caps** are limits. “Source details” appears before `provenance`, the API-property name.

## Demo, sandbox, and privacy behavior

The first click opened `/?demo=1`. At scroll position zero on a 390 px phone viewport, the page showed the persistent “Demo — sample data, nothing is saved” banner, **Reset demo**, **Start for real**, a populated sample-envelope strip, **12** rows, **3** pages, and manifest content before the JSON editor.

Replacing the sample with a one-row private JSON value produced one row. **Reset demo** restored the bundled 12 realistic orders. **Start for real** opened `/inspect` with an empty input. Cookies, local storage, and session storage were empty. The fresh-context request-log checks accepted only same-origin GET requests and did not include edited input. The live demo reloads offline after its first visit.

The exact README command was also run from a new temporary directory:

```sh
npx --yes https://mcp-result-envelope.sociobot.in/downloads/mcp-result-envelope-0.1.0.tgz demo
```

It produced a complete 12-order envelope and wrote `envelope.json` in a new `result-envelope-demo-*` temporary directory.

## Claims

`.factory/claims.json` has 27 entries. `npm run test:claims` completed in the clean clone and runs every listed command independently: **27/27 passed**. The one-to-one tagged-test guard also passes. This covers licensing, the release tarball, demo/reset/output/privacy/offline behavior, no storage/tracking/network, JSON/API/caps/cursors/streaming behavior, inspector parts, package dependency metadata, and CLI output/help/demo behavior. No landing or README claim-like sentence lacks a corresponding entry.

The live browser suite was also run against the deployed URL. It covered public routes at desktop and mobile widths, tabs and keyboard paging, reset and exit, request logging, storage isolation, offline reload, route focus/Back behavior, metadata, and serious/critical axe violations. It completed without a reproduced product failure.

## Earlier findings retest

Every prior review, polish record, verification record, and handoff was read and then checked against current live behavior and source.

| Earlier finding | Current confirmation |
| --- | --- |
| F-1-1 | The versioned public tarball returns 200, installs/imports as the sole package dependency, and its CLI demo works. No bare unavailable registry command remains. |
| F-1-2 / F-2-2 | The 27 declared claims have exactly one tagged test each. Async iteration, complete CLI help, schema nullability, and all named API properties are covered. |
| F-1-3 / F-4-1 | The public product consistently calls the whole output an **envelope**; no visitor-facing “packet” or “contract” remains. |
| F-2-1 / F-3-1 | The phone demo now shows a populated 12-row/3-page envelope before the editor. |
| F-2-3 / F-3-5 | The former “measured edge” metaphor is absent; row and byte caps are named. |
| F-2-4 / F-3-6 | The cursor instruction is now “Use the cursor to fetch the next page.” |
| F-3-2 | `stream-api` proves the async iterator and observable chunks. |
| F-3-3 | `cli-help` compares the complete help surface with the parser. |
| F-3-4 | `api-shape` asserts manifest identity/caps/counts, summary page/ranges, schema nullability/presence, and page output. |
| F-3-7 / F-3-8 | The audience wording uses “source details”; price, privacy, and offline facts fit both initial viewports. |
| F-4-2 | README and inspector introduce “source details” before the code property `provenance`. |
| Verification-1 | The literal stdin marker works in the documented NDJSON stream command, and the 390 px checks confirm 44 px interactive targets. |

## Structure, routing, accessibility, and visual identity

`/`, `/demo`, `/inspect`, `/privacy`, `/terms`, the release tarball, all listed assets, `robots.txt`, and `sitemap.xml` returned HTTP 200; `/missing-sheet` returned the styled HTTP 404. Each public route has its own plain title, description, canonical, Open Graph/Twitter metadata, favicon, one `<main>`, and one `<h1>`. Deep links, client navigation, browser Back, focus movement, and live route announcements work. The header/footer, legal links, skip link, focus styling, and legal pages are consistent.

The response CSP permits only self-hosted page resources and `frame-ancestors 'none'` is a response header. Request logs found no third-party scripts, fonts, analytics, advertising, tracking, provider keys, or model calls. The original blueprint drafting-sheet system uses a grid, clipped-paper geometry, measured rails, revision color, and product-specific artwork; it is not a generic SaaS template.

## Missed leverage

None. The brief calls for deterministic, type- and source-preserving result bounding. The playground, JSON/NDJSON inputs, library and CLI outputs, streaming, download, and resettable sample cover the obvious import/export paths. An AI step would add privacy and cost behavior without helping this deterministic job.

## What would make this perfect

No product change is indicated by this review. Preserve the clean-clone claim sweep, public-tarball smoke check, and live mobile/desktop browser suite on future releases.
