# Adversarial first-read review 5 — PASS

Reviewed 2026-08-28 against repository commit `5e4e36a5c2180463c23293b727eb74dbb18c84c7` and the deployed site at <https://mcp-result-envelope.sociobot.in>. This was a cold Chromium pass at 390 × 844 and 1440 × 900, plus a clean clone at `/tmp/mcp-result-envelope-review5-tKAuk6/repo`.

## Verdict

**PASS.** There are zero findings. The site makes its job, audience, and first action clear before scrolling; the one-click browser playground is visibly populated and isolated; all declared claims were tested from a clean clone; and the live routes, metadata, accessibility, privacy behavior, and release path check out.

## First screen, before scrolling

On desktop and 390 px mobile, the first screen says:

- **What it does:** “Pack large tool results into stable pages.”
- **For whom:** “For MCP and CLI authors who need size-limited output that keeps types, order, and source details.”
- **What to click first:** **Try it with sample data**; the adjacent explanation says, “Loads 12 orders and builds their envelope.”

All three answers are visible before scrolling. The three required facts are also visible in both viewports: “Free and MIT licensed.”, “Runs in this tab. No uploads.”, and “Works offline after your first visit.” The mobile page has no horizontal overflow. This is not a first-screen blocking issue.

## Findings

None.

## Copy audit

Counts treat hyphenated forms, paths, and contractions as one word. Code blocks and JSON data are not prose sentences; visible headings, labels, actions, image alternative text, and prose are included. No item exceeds 22 words. No banned marketing adjective, inconsistent output term, unexplained heading, or non-result naming action was found. `provenance` is introduced as the code property after the plain phrase “source details.”

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

Terminology is consistent: the whole output is an **envelope**, a size-limited slice is a **page**, the page token is a **cursor**, input records are **rows**, limits are **caps**, and source metadata is introduced as **source details** (`provenance` is the API field).

## Demo, sandbox, and privacy behavior

The first click on **Try it with sample data** opened `/?demo=1`. At scroll position zero on 390 px mobile it showed the persistent “Demo — sample data, nothing is saved” banner, **Reset demo**, **Start for real**, a populated result strip, 12 rows, three pages, manifest identity, and the summary before the JSON editor.

Replacing the input with a private sample produced one row. **Reset demo** restored the 12 bundled realistic orders. **Start for real** opened `/inspect` with an empty input and no cookies, local storage, or session storage. The fresh-context request log for the landing and edit/rebuild flow contained only same-origin GET requests for the document, JavaScript, CSS, and self-hosted image; no request included the entered private value.

The CLI check used a new temporary project and the exact live README release URL. It installed successfully, imported `createEnvelope`, returned `1 row · 1 field · 1 page`, and both the installed binary and exact `npx --yes <release-url> demo` command wrote sample output in a new `result-envelope-demo-*` directory.

## Claims

`.factory/claims.json` contains 27 entries. `npm run test:claims` completed from the clean clone with **27/27 passing**. The run executes each listed command, including the isolated browser demo, no-storage and request-log checks, offline reload, clean consumer tarball install, and CLI temporary-directory demo.

The public landing and README claim-like statements map to the declared tests: package/licensing (`free-license`, `installable-package`, `zero-runtime-dependencies`, `node-support`, `build-output`), sandbox/privacy (`demo-sample`, `local-processing`, `browser-no-storage`, `site-no-tracking`, `demo-memory`, `offline-reload`, `package-no-network`), API behavior (`json-types`, `api-shape`, `summary-no-rows`, `page-caps`, `row-cap`, `row-too-large`, `input-validation`, `stable-cursors`, `stream-api`, `stream-order`), inspector output (`inspector-parts`, `envelope-details`), and CLI behavior (`cli-demo`, `cli-help`, `cli-io`). No unlisted visitor-reliant claim was found.

The full live browser suite also passed: **31 passed, 3 intentional project-only skips**. It verifies the production site at both desktop and mobile sizes, including keyboard tabs, reset, offline reload, request logging, storage isolation, route changes, and serious/critical axe violations.

## Earlier findings retest

Every earlier review and polish record was read. The live site and current code confirm each earlier finding is fixed, not only marked fixed.

| Earlier finding | Confirmation |
| --- | --- |
| F-1-1 | The public versioned tarball returned 200. Its exact README install and `npx` demo commands worked in a fresh temporary project. |
| F-1-2 / F-2-2 | 27 claims have one-to-one tagged tests; all passed. The async iterator, full CLI help surface, nullable schema details, and public package path are explicitly covered. |
| F-1-3 / F-4-1 | Live pages, README, claims, and source use **envelope** for the whole output; no visitor-facing “packet” or “contract” remains. |
| F-2-1 / F-3-1 | The 390 px demo renders populated 12-row/3-page result content above the editor and inside the first viewport. |
| F-2-3 / F-3-5 | The former “measured edge” metaphor is absent; current copy names row and byte caps. |
| F-2-4 / F-3-6 | The former ambiguous cursor wording is absent; current copy says “Use the cursor to fetch the next page.” |
| F-3-2 | `stream-api` verifies the async iterator; the README statement is declared and tested. |
| F-3-3 | `cli-help` compares the help surface with every parser command and flag. |
| F-3-4 | `api-shape` covers the documented manifest, summary, schema including nullability, and page fields. |
| F-3-7 | The current audience sentence is 16 words and uses plain “source details.” |
| F-3-8 | The tested price, local-processing, and offline facts all fit in the initial desktop and mobile views. |
| F-4-2 | README and inspector say “source details” before identifying `provenance` as the API property. |
| Verification-1 defects | The documented NDJSON stdin marker is accepted by `stream-order`; the mobile suite measures 44 px controls. |

## Structure, routing, accessibility, and identity

The title pattern, metadata, canonical, Open Graph/Twitter tags, SVG favicon, Apple touch icon, robots file, and sitemap are present. `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, assets, and the release tarball return 200; `/missing-sheet` returns the styled 404 with a way home. All internal links and the external Param Factory link resolve. Navigation uses real routes, Back returns focus to the new `h1`, and the live region announces route changes.

Each public route has one `main` and one `h1`; the live axe pass found no serious or critical violation in light or dark mode. The header/footer, skip link, focus treatment, legal pages, security headers, and no-third-party CSP are consistent. The blueprint drafting-sheet system is specific to result bounds and cursors rather than a generic SaaS-template surface.

## Missed leverage

None. The brief calls for a deterministic npm library/CLI and local inspector. It already accepts JSON, exposes the envelope through the browser playground, provides CLI and library output paths, and ships a self-contained sample. An AI feature would not improve this core deterministic transformation and would add cost/privacy behavior the job does not require.

## What would make this perfect

No product change is indicated by this review. Retain the existing clean-clone claims sweep and live browser suite on future releases so the release-tarball, sandbox, and first-screen behavior remain this verifiable.
