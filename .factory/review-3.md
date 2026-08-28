# Adversarial first-read review 3 — FAIL

Reviewed 2026-08-28 against repository commit `c5f715067a5b6d0ece71578fea0a82883e645e6a` and <https://mcp-result-envelope.sociobot.in>. Fresh Chromium contexts used 390 × 844 and 1440 × 900 viewports. The live JavaScript and CSS SHA-256 hashes matched the clean build.

## Verdict

**FAIL.** The phone demo still hides the generated packet below a long input. Two README promises remain absent from `.factory/claims.json`, and the API-shape test still does not prove all metadata promised by the README. Four copy/first-screen findings also remain. A pass requires zero findings and no untested claim.

## First screen, before scrolling

The cold read answered the three required questions at both widths:

- **What it does:** turns large MCP or CLI results into size-limited, paginated result packets.
- **For whom:** MCP and CLI authors who need to retain JSON types, order, and source details.
- **What to select first:** **Try it with sample data**; adjacent copy says it loads 12 orders and builds their packet.

The exact supporting copy is “Pack large tool results into stable pages,” “For MCP and CLI authors who need bounded output without losing types, order, or provenance,” and “Try it with sample data.” This avoids the step-1 blocking condition. The first-screen facts still have the narrower defect in F-3-8.

## Findings

### F-3-1 / F-2-1 — BLOCKING — The phone demo still hides the product result below the first viewport

**Location / quote:** live `/?demo=1` at 390 × 844 after selecting **Try it with sample data**. At scroll position 0, “Input JSON” begins in view and the seeded textarea runs from y=591 to y=921. “Packet output” starts at y=1,458, “12” rows at y=1,553, and the populated manifest at y=1,730.

**Why this fails:** the first post-click screen shows source data, not the generated envelope. A phone visitor cannot see that the sample has already produced a packet, how many pages it contains, or any populated packet part. The existing mobile test only asserts that the action opened demo mode and that controls exist; it does not assert that the result is initially visible.

**Concrete fix:** at 390 × 844, render a compact result strip and one populated packet part above the input, or place the output first and put the input behind **Edit sample JSON**. The initial viewport must show at least **12 rows**, **3 pages**, and populated envelope content. Add a mobile Playwright assertion that those elements intersect the viewport while `scrollY === 0`.

### F-3-2 / F-2-2 / F-1-2 — BLOCKING — The async-iterator promise is still an unlisted claim

**Location / quote:** README, Stream chunks: “`streamEnvelope` returns an async iterator.” No entry in `.factory/claims.json` states this promise.

**Why this fails:** `stream-order` tests the CLI’s NDJSON chunk sequence. It does not declare or test the public library return contract. An untagged unit test happens to use `for await`, but the claims contract requires the public promise to have its own manifest entry and exactly one tagged test.

**Concrete fix:** add a `stream-api` claim and `@claim:stream-api` unit test that verifies `Symbol.asyncIterator`, iteration, and the documented public-library output; or remove the sentence.

### F-3-3 / F-2-2 / F-1-2 — BLOCKING — The complete CLI-help promise is still an unlisted claim

**Location / quote:** README, Use the CLI: “Run `result-envelope --help` for all flags.” No `cli-help` entry exists in `.factory/claims.json`.

**Why this fails:** `@claim:cli-io` only checks that help contains `--max-bytes`. It does not establish “all flags.” Source inspection also shows that the parser accepts `--json` while the help text does not list it, so the literal promise is not currently demonstrated.

**Concrete fix:** either remove “for all flags” or add a `cli-help` claim and tagged test that compares the documented commands and flags with the supported parser surface. Decide whether `--json` is supported and document or remove it consistently.

### F-3-4 / F-2-2 / F-1-2 — BLOCKING — The API-shape claim test still omits promised metadata

**Location / quotes:** README says “`manifest`: result identity, caps, counts, page count, and provenance,” “`summary`: field count, page count, and numeric ranges,” and “`schema`: dotted field paths, observed JSON types, nullability, and presence counts.” `.factory/claims.json` assigns this to `api-shape`.

**Why this fails:** `@claim:api-shape` checks manifest counts, `pageSize`, `maxBytes`, provenance, summary fields/ranges, and schema path/types/presence. It never asserts manifest identity or `maxRows`, the summary’s page-count text, or schema `nullable`. No tagged test proves both `nullable: true` and `nullable: false`. The declared command passes, but the observable promise is only partly tested.

**Concrete fix:** expand `@claim:api-shape` with explicit identity and cap assertions, assert the summary’s page count, and use fixtures that prove nullable and non-nullable fields. Keep exactly one tagged test for the claim, or narrow the README and claim text to what the test proves.

### F-3-5 / F-2-3 — MINOR — “Measured edge” is still an unexplained metaphor

**Location / quote:** landing figure caption: “Every page has a measured edge.”

**Why this fails:** the phrase does not say whether a page is limited by rows, bytes, or a visual boundary.

**Concrete rewrite:** “Every page stays within its row and byte caps.”

### F-3-6 / F-2-4 — MINOR — The cursor instruction still uses an ambiguous verb

**Location / quote:** landing step 3: “Resolve the cursor when asked.”

**Why this fails:** “resolve” does not name the operation, and “when asked” does not identify what triggers it.

**Concrete rewrite:** “Use the cursor to fetch the next page.”

### F-3-7 — MINOR — The audience sentence uses avoidable jargon on the cold first screen

**Location / quote:** landing hero: “For MCP and CLI authors who need bounded output without losing types, order, or provenance.”

**Why this fails:** MCP and CLI identify the technical audience, but “bounded output” and “provenance” make the product outcome harder to parse than necessary before the product has explained its terms.

**Concrete rewrite:** “For MCP and CLI authors who need size-limited output that keeps types, order, and source details.”

### F-3-8 — MINOR — The first-screen facts omit offline use, and the third fact is clipped on desktop

**Location / quote:** landing facts: “Free and MIT licensed,” “Runs in this tab. No uploads,” and “JSON types stay intact.” At 1440 × 900, the third item begins at y=894 and ends at y=917, so it is not readable without scrolling.

**Why this fails:** the required first-screen fact set is price, privacy, and offline behavior. The current third line is another feature claim, while the tested offline fact is absent. The desktop composition also fails to keep all three facts in the first viewport.

**Concrete fix:** replace the third fact with “Works offline after your first visit.” Reduce the desktop hero’s vertical spacing or type scale so all three fact lines fit entirely above y=900. Retain type preservation elsewhere and add a viewport-boundary assertion for all three facts.

## Copy audit

Counts treat a code identifier, version, or hyphenated form as one word and ignore standalone punctuation. Code blocks and raw JSON are excluded. No item exceeds 22 words and no banned marketing adjective appears. Flags point to findings above.

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
| 15 | For MCP and CLI authors who need bounded output without losing types, order, or provenance. | F-3-7: jargon |
| 5 | Try it with sample data | None |
| 7 | Loads 12 orders and builds their packet. | None |
| 4 | Free and MIT licensed. | None |
| 4 | Runs in this tab. | None |
| 2 | No uploads. | None |
| 4 | JSON types stay intact. | F-3-8: offline fact missing; clipped on desktop |
| 15 | A drafting table separates one large result into a manifest, schema, summary, and bounded pages. | None; descriptive image alternative |
| 2 | One result. | None |
| 3 | Four inspectable parts. | None |
| 6 | Every page has a measured edge. | F-3-5: metaphor |
| 2 | Sheet 02 | None |
| 7 | Inspect the result packet before you install | None |
| 12 | The sample packet shows caps, field types, counts, and its next cursor. | None; API terms |
| 1 | Manifest | None |
| 2 | 12 rows | None |
| 2 | 3 pages | None |
| 3 | 4 KB cap | None |
| 2 | Sheet 03 | None |
| 7 | Build a result packet in three steps | None |
| 3 | Pass the rows | None |
| 9 | Give the library JSON from your tool or query. | None |
| 3 | Set hard caps | None |
| 9 | Choose the row count, page size, and page bytes. | None |
| 3 | Return one packet | None |
| 6 | Send its metadata and first page. | None |
| 5 | Resolve the cursor when asked. | F-3-6: ambiguous verb |
| 2 | Node.js / ESM | None |
| 3 | Copy install command | None |
| 4 | Download the npm package | None |
| 2 | Revision note | None |
| 4 | Know the packet boundaries | None |
| 8 | The package makes no network or model calls. | None |
| 9 | The summary contains counts and numeric ranges, not rows. | None |
| 9 | The same input and caps produce the same cursor. | None |
| 10 | It rejects a row that cannot fit the byte cap. | None |
| 4 | Inspect the sample packet | None |
| 6 | Bounded pages for large tool results. | None |
| 1 | Terms | None |
| 7 | Built by Param Factory ↗ · v0.1.0 · build 2026.08 | None |

### README

| Words | Exact copy | Flag |
| ---: | --- | --- |
| 2 | Result Envelope | None |
| 10 | Pack large tool results into summaries, schemas, and stable pages. | None |
| 9 | Result Envelope is for MCP and CLI tool authors. | None |
| 12 | It turns JSON into a manifest, compact summary, schema, and stable pages. | None; API terms are explained below |
| 9 | The package preserves JSON types, row order, and provenance. | None; public API term |
| 13 | It has no runtime dependencies and makes no network, model, or telemetry calls. | None |
| 3 | Try the demo | None |
| 14 | Open the browser demo, or run the same bundled sample from the released package: | None |
| 15 | The CLI writes its sample envelope to a new temporary directory and prints the path. | None |
| 14 | The browser demo keeps edits in memory and discards them when demo mode ends. | None |
| 9 | The browser demo reopens offline after its first visit. | None |
| 1 | Install | None |
| 9 | Install the versioned npm package served by this release: | None |
| 8 | The package metadata requires Node.js 18 or newer. | None |
| 3 | Use the library | None |
| 13 | On the next tool call, rerun the stable query and use its cursor. | None; code comment |
| 4 | `createEnvelope` returns four parts: | None |
| 9 | `manifest`: result identity, caps, counts, page count, and provenance. | F-3-4: partly tested |
| 8 | `summary`: field count, page count, and numeric ranges. | F-3-4: partly tested |
| 5 | It contains no sample rows. | None |
| 11 | `schema`: dotted field paths, observed JSON types, nullability, and presence counts. | F-3-4: `nullable` untested |
| 11 | `page`: bounded rows and a stable cursor for the next page. | None |
| 9 | The same input and options produce the same cursor. | None |
| 10 | A cursor from different data or options fails with `INVALID_CURSOR`. | None |
| 2 | Stream chunks | None |
| 9 | Chunks arrive as manifest, summary, schema, then bounded pages. | None |
| 5 | `streamEnvelope` returns an async iterator. | F-3-2: unlisted claim |
| 3 | Use the CLI | None |
| 6 | Run `result-envelope --help` for all flags. | F-3-3: unlisted and not demonstrated |
| 4 | JSON goes to stdout. | None |
| 10 | Errors go to stderr and return a non-zero exit code. | None |
| 3 | Caps and errors | None |
| 9 | `maxRows` stops the included row count and sets `manifest.capped`. | None |
| 6 | `pageSize` limits rows in each page. | None |
| 8 | `maxBytes` limits the serialized size of each page. | None |
| 7 | A single row over `maxBytes` raises `ROW_TOO_LARGE`. | None |
| 7 | Increase the cap or remove large fields. | None |
| 12 | Inputs must be JSON values with finite numbers and no circular references. | None |
| 8 | Result Envelope preserves JSON types and provenance metadata. | None |
| 12 | It does not claim that one format is best for every model. | None |
| 3 | Develop and verify | None |
| 11 | `npm run build` creates the library and static site in `dist/`. | None |
| 9 | The site build also creates its versioned npm tarball. | None |
| 1 | Privacy | None |
| 6 | The package makes no network requests. | None |
| 12 | The browser inspector keeps input in the current tab and saves nothing. | None |
| 5 | See the site’s privacy page. | None |
| 1 | License | None |
| 1 | MIT. | None |
| 2 | See LICENSE. | None |

Terminology is otherwise consistent: **packet** is the whole result, **page** is a bounded row slice, **cursor** continues paging, **rows** are input records, **caps** are limits, and **provenance** is source metadata. All buttons and action links name an action or result. The catalog description is 10 words and 64 characters: “Pack large tool results into summaries, schemas, and stable pages.”

## Demo and sandbox behavior

- The landing action enters `/?demo=1` in one click and seeds 12 realistic orders.
- Desktop shows the built output, 12 rows, 3 pages, and a populated manifest in its initial viewport. Phone does not; see F-3-1.
- The persistent banner says “Demo — sample data, nothing is saved” and includes **Reset demo** and **Start for real**.
- Replacing the input with `[{"private":"review3-secret"}]`, building, and resetting removed the edit and restored 12 rows.
- **Start for real** opened `/inspect` with empty input. Cookies, local storage, and session storage remained empty.
- The captured flow made only same-origin requests; edited input did not appear in a URL or request body.
- The production demo registered its service worker and reloaded offline with the 12-row sample.
- Installing the live release tarball in `/tmp/result-envelope-live-consumer-TVdOIo` succeeded. The imported API produced `2 rows · 1 field · 2 pages`; the installed CLI demo wrote `/tmp/result-envelope-demo-fcXyLa/envelope.json`.

## Claims execution

Every command in `.factory/claims.json` ran from clean clone `/tmp/mcp-result-envelope-review3-CbFx9U/repo` after `npm ci`.

| Claim | Result | Claim | Result |
| --- | --- | --- | --- |
| free-license | PASS | installable-package | PASS |
| demo-sample | PASS | local-processing | PASS |
| browser-no-storage | PASS | site-no-tracking | PASS |
| json-types | PASS | api-shape | PASS command; incomplete assertions, F-3-4 |
| inspector-parts | PASS | packet-details | PASS |
| summary-no-rows | PASS | page-caps | PASS |
| row-cap | PASS | row-too-large | PASS |
| input-validation | PASS | stable-cursors | PASS |
| stream-order | PASS | package-no-network | PASS |
| zero-runtime-dependencies | PASS | node-support | PASS |
| cli-demo | PASS | cli-io | PASS |
| offline-reload | PASS | demo-memory | PASS |
| build-output | PASS |  |  |

Result: **25/25 declared commands passed**. No listed command failed. F-3-2 and F-3-3 remain unlisted; F-3-4 remains partly untested, so the claims audit is not complete.

The full clean-clone `npm test` gate also passed: typecheck, production build, 22 unit/consumer tests, and 27 browser tests with three intentional project-only skips. The build produced the library, CLI, routed static site, 404, and versioned tarball in `dist/`.

## Earlier finding retest

All earlier `.factory/review-*.md`, `.factory/polish-*.md`, verification records, and the prior handoff were read before this full rerun.

| Earlier item | Current live and code result |
| --- | --- |
| F-1-1 — unavailable npm package | **Fixed.** The live tarball returned 200, installed in a new project, imported, and ran the installed CLI demo. No bare registry install command remains. |
| F-1-2 — unlisted claims | **Unfixed / reopened as F-3-2, F-3-3, and F-3-4.** The manifest has 25 entries, but exact README promises remain absent or partly asserted. |
| F-1-3 — “contract” vs “packet” | **Fixed.** Live and source headings consistently use “result packet.” |
| F-2-1 — phone demo hides output | **Unfixed / F-3-1.** Live coordinates and the mobile one-column source order confirm the regression remains. |
| F-2-2 — claim coverage | **Unfixed / F-3-2 through F-3-4.** The README, manifest, and tagged tests are unchanged. |
| F-2-3 — “measured edge” | **Unfixed / F-3-5.** The exact sentence remains live and in source. |
| F-2-4 — “Resolve the cursor” | **Unfixed / F-3-6.** The exact instruction remains live and in source. |
| Verification-1 stdin defect | **Fixed.** The documented `pack - --format ndjson --stream` path passed and emitted manifest → summary → schema → page. |
| Verification-1 mobile touch targets | **Fixed.** The live 390 px suite checked visible controls against 44 × 44 CSS px and passed. |
| Polish-1 / prior handoff closure statements | **Not confirmed.** The reopened claim gap and current phone-demo defect remain. |

## Structure, routing, accessibility, and identity

- `/`, `/demo`, `/inspect`, `/privacy`, and `/terms` returned 200. `/missing-sheet` returned the designed 404 with “This page is outside the packet” and a working return action.
- Every checked route had `lang="en"`, one `main`, one `h1`, a route-specific title, description, canonical, Open Graph/Twitter metadata, and the consistent header/footer.
- The live crawl confirmed 200 responses for every internal destination, the versioned package, Param Factory, `robots.txt`, `sitemap.xml`, favicon, apple-touch icon, and social card. The contact destination is an explicit `mailto:` link.
- History navigation and client links focused and announced the new `h1`. Keyboard tabs, paging, reset, and error recovery worked.
- The clean and live suites found zero serious or critical axe violations in light and dark modes, no page or console errors, no horizontal overflow at 390 px, and no reduced-motion regression.
- Initial built assets were 8.81 kB gzip JavaScript and 4.31 kB gzip CSS. The live asset hashes exactly matched the clean build.
- The blueprint drafting-sheet composition, clipped paper geometry, grid, revision marks, and original illustration match `.factory/design.md` and are distinct from a generic SaaS template.

No additional structure, route, accessibility, performance, privacy, or visual-identity finding was reproduced.

## Missed leverage

No AI step is implied by this deterministic paging library. Classification or generated summaries would weaken its source-preservation job. JSON/NDJSON input, stdout/API output, the browser playground, CLI streaming, and downloadable release cover the expected import/export paths. No decorative AI feature or embedded provider key is present.

## What would make this perfect

Show a populated packet result in the phone demo’s first viewport; register and tag the async-iterator and complete-help promises; make the API-shape test prove every documented metadata property; replace the two ambiguous landing sentences; simplify the hero audience line; and expose the tested offline fact, along with price and privacy, fully inside both first-screen viewports. Then rerun the clean 25-claim manifest, full `npm test`, live mobile/desktop suite, offline and storage interception, link crawl, and viewport-boundary checks. A later review can pass only if that sweep yields zero findings.
