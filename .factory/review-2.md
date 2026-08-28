# Adversarial first-read review 2 — FAIL

Reviewed 2026-08-28 against repository commit `1a1dbc7305fcc44431a14944d0f1c285715666fb` and <https://mcp-result-envelope.sociobot.in>. The live JavaScript and CSS hashes matched a clean build from that commit.

## Verdict

**FAIL.** The desktop experience works, but the 390 px one-click demo does not show the generated result in its first viewport. The earlier claims-coverage finding is also only partly fixed: two README promises are absent from `.factory/claims.json`, and one documented schema property is not asserted by its tagged test. Two smaller landing-copy defects remain. A pass requires zero findings.

## First screen, before scrolling

Fresh contexts were opened at 390 × 844 and 1440 × 900.

- **What it does:** it turns large MCP or CLI tool results into size-limited, paginated result packets.
- **For whom:** MCP and CLI authors who need to preserve JSON types, order, and source information.
- **What to select first:** **Try it with sample data**; the adjacent text says it loads 12 orders and builds their packet.

The exact first-screen text supporting those answers is “Pack large tool results into stable pages,” “For MCP and CLI authors who need bounded output without losing types, order, or provenance,” and “Try it with sample data.” This passes the cold landing-page test at both widths.

## Findings

### F-2-1 — BLOCKING — The phone demo hides the product's result below the first viewport

**Location / quote:** live `/?demo=1` at 390 × 844. The initial viewport shows “Inspect a sample result envelope,” “Input JSON,” and the beginning of the 12-order JSON. It does not show “Packet output,” the 12-row/3-page metrics, any result tab, or any generated envelope content. Those appear only after scrolling.

**Why this fails:** the required demo is not just seeded input. The result envelope is the product's value. On the phone-first path, a visitor clicks the promised one-click demo and still cannot see what the library produced without discovering that the output is below a long textarea. The existing mobile test checks that the build button is rendered, but does not assert that the result is inside the viewport.

**Concrete fix:** at 390 × 844, put the built packet summary before the editable input or add a compact result strip directly under the demo heading. The first viewport must visibly include at least “12 rows,” “3 pages,” and one populated envelope part. Keep the full input available below or behind an **Edit sample JSON** disclosure. Add a mobile Playwright assertion using bounding boxes or `IntersectionObserver` to prove `#metric-rows` and a populated output panel are inside the initial viewport without scrolling.

### F-2-2 / F-1-2 reopened — BLOCKING — The earlier claims-coverage finding is only partly fixed

**Location / exact quotes:** README:

1. “`streamEnvelope` returns an async iterator.”
2. “Run `result-envelope --help` for all flags.”
3. “`schema`: dotted field paths, observed JSON types, nullability, and presence counts.”

**Why this fails:** the first two statements have no matching claim in `.factory/claims.json`. `stream-order` claims chunk order and its tagged test exercises the CLI, not the public `streamEnvelope` return contract. `cli-io` claims stdout/stderr behavior; its test only spot-checks `--max-bytes` in help output and does not establish “all flags.” The third sentence is assigned broadly to `api-shape`, but `@claim:api-shape` asserts paths, types, and presence while never asserting `nullable`. Repository search found no test assertion for that property. The manifest's one-to-one tag guard passes, but these visitor-reliant promises remain unlisted or partly untested. This reopens the same incomplete-claims problem reported as F-1-2.

**Concrete fix:** add a `stream-api` claim and tagged unit test that checks `Symbol.asyncIterator` and observable iteration; add a `cli-help` claim and tagged test that checks every supported command and flag; extend `@claim:api-shape` with fixtures asserting both `nullable: true` and `nullable: false`. Alternatively, remove the promises. Then rerun every manifest command from a clean clone.

### F-2-3 — MINOR — “Measured edge” is a visual metaphor, not a product fact

**Location / quote:** landing figure caption: “Every page has a measured edge.”

**Why this fails:** “measured edge” does not tell a first-time visitor whether the page is limited by rows, bytes, or something visual. It is the only landing sentence that substitutes the blueprint metaphor for the actual behavior.

**Concrete rewrite:** “Every page stays within its row and byte caps.”

### F-2-4 — MINOR — The cursor instruction uses an ambiguous verb

**Location / quote:** landing step 3: “Resolve the cursor when asked.”

**Why this fails:** “resolve” does not name the action, and “when asked” does not say who asks or what happens next. The sentence is less clear than the surrounding procedural copy.

**Concrete rewrite:** “Use the cursor to fetch the next page.”

## Copy audit

Counts treat a code identifier, version, or hyphenated term as one word and do not count standalone punctuation. Code blocks and the raw JSON preview are excluded; all user-facing headings, prose, labels, actions, and the meaningful image alternative are included. No item exceeds 22 words. No banned marketing adjective appears. No action button lacks a result-naming verb. Flags are identified inline.

### Landing page

| Words | Exact copy | Flag |
| ---: | --- | --- |
| 2 | Result Envelope | None |
| 1 | Demo | None |
| 1 | Guide | None |
| 1 | Privacy | None |
| 3 | Switch color theme | None |
| 4 | Specification RE–01 / npm + CLI | None |
| 7 | Pack large tool results into stable pages | None |
| 15 | For MCP and CLI authors who need bounded output without losing types, order, or provenance. | None; audience-specific terms |
| 5 | Try it with sample data | None |
| 7 | Loads 12 orders and builds their packet. | None |
| 4 | Free and MIT licensed. | None |
| 4 | Runs in this tab. | None |
| 2 | No uploads. | None |
| 4 | JSON types stay intact. | None |
| 15 | A drafting table separates one large result into a manifest, schema, summary, and bounded pages. | None; image alternative |
| 2 | One result. | None |
| 3 | Four inspectable parts. | None |
| 6 | Every page has a measured edge. | F-2-3: metaphor |
| 7 | Inspect the result packet before you install | None |
| 12 | The sample packet shows caps, field types, counts, and its next cursor. | None |
| 1 | Manifest | None |
| 2 | 12 rows | None |
| 2 | 3 pages | None |
| 3 | 4 KB cap | None |
| 7 | Build a result packet in three steps | None |
| 3 | Pass the rows | None |
| 9 | Give the library JSON from your tool or query. | None |
| 3 | Set hard caps | None |
| 9 | Choose the row count, page size, and page bytes. | None |
| 3 | Return one packet | None |
| 6 | Send its metadata and first page. | None |
| 5 | Resolve the cursor when asked. | F-2-4: ambiguous jargon |
| 2 | Node.js / ESM | None |
| 3 | Copy install command | None |
| 4 | Download the npm package | None |
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
| 12 | It turns JSON into a manifest, compact summary, schema, and stable pages. | None; terms are explained below |
| 9 | The package preserves JSON types, row order, and provenance. | None |
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
| 9 | `manifest`: result identity, caps, counts, page count, and provenance. | None |
| 8 | `summary`: field count, page count, and numeric ranges. | None |
| 5 | It contains no sample rows. | None |
| 11 | `schema`: dotted field paths, observed JSON types, nullability, and presence counts. | F-2-2: `nullable` is not asserted |
| 11 | `page`: bounded rows and a stable cursor for the next page. | None |
| 9 | The same input and options produce the same cursor. | None |
| 10 | A cursor from different data or options fails with `INVALID_CURSOR`. | None |
| 2 | Stream chunks | None |
| 9 | Chunks arrive as manifest, summary, schema, then bounded pages. | None |
| 5 | `streamEnvelope` returns an async iterator. | F-2-2: unlisted claim |
| 3 | Use the CLI | None |
| 6 | Run `result-envelope --help` for all flags. | F-2-2: unlisted claim |
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
| 5 | See the site's privacy page. | None |
| 1 | License | None |
| 1 | MIT. | None |
| 2 | See LICENSE. | None |

Terminology is otherwise consistent: **packet** is the whole result, **page** is a bounded row slice, **cursor** continues paging, **rows** are input records, **caps** are limits, and **provenance** is source metadata.

## Demo and sandbox behavior

- The landing action opens `/?demo=1` in one click and immediately seeds 12 realistic order rows.
- Desktop immediately shows the input and built packet side by side. Mobile shows realistic input but not the output in its first viewport; see F-2-1.
- The persistent banner says “Demo — sample data, nothing is saved” and offers **Reset demo** and **Start for real**.
- Replacing the sample with `[{"private":"review-secret"}]`, building, and resetting removed the secret and restored 12 rows.
- **Start for real** opened `/inspect` with an empty input. Cookies, local storage, and session storage all remained empty.
- The complete live flow made four same-origin requests. No edited value appeared in a URL or request body.
- The declared offline test loaded the demo, disabled the network, reloaded, and still showed the 12-row packet.
- The released CLI was installed from the public tarball in a new temporary project. `result-envelope demo` created `/tmp/result-envelope-demo-*/envelope.json` and printed its path.

## Claims execution

Every command in `.factory/claims.json` ran independently through `npm run test:claims` in clean clone `/tmp/mcp-result-envelope-review-2-9x7zll/repo` after `npm ci`.

| Claim | Result | Claim | Result |
| --- | --- | --- | --- |
| free-license | PASS | installable-package | PASS |
| demo-sample | PASS | local-processing | PASS |
| browser-no-storage | PASS | site-no-tracking | PASS |
| json-types | PASS | api-shape | PASS, but incomplete assertion; F-2-2 |
| inspector-parts | PASS | packet-details | PASS |
| summary-no-rows | PASS | page-caps | PASS |
| row-cap | PASS | row-too-large | PASS |
| input-validation | PASS | stable-cursors | PASS |
| stream-order | PASS | package-no-network | PASS |
| zero-runtime-dependencies | PASS | node-support | PASS |
| cli-demo | PASS | cli-io | PASS |
| offline-reload | PASS | demo-memory | PASS |
| build-output | PASS |  |  |

Result: **25/25 declared commands passed**, but the unlisted and partly asserted claims in F-2-2 mean claim coverage is not complete.

The full clean-clone `npm test` also passed: typecheck, production build, 22 unit/consumer tests, and 27 browser tests with three intentional project-only skips. `dist/` contains the library, CLI, routed site, 404, and versioned package.

## Earlier finding retest

I read `.factory/review-1.md`, `.factory/polish-1.md`, `.factory/handoff.md`, `.factory/verification-1.md`, and `.factory/verification-2.md` before re-running the checklist.

- **F-1-1 — fixed in live site and code.** No bare registry command remains. The live versioned tarball returned 200, installed as the sole dependency in a new project, imported successfully, and ran its CLI demo.
- **F-1-2 — reopened as F-2-2 / F-1-2.** The manifest grew from 11 to 25 entries, but claims coverage is still incomplete for the exact README copy above.
- **F-1-3 — fixed in live site and code.** Both headings now consistently use “result packet.”
- **Verification-1 stdin defect — fixed.** The exact `pack - --format ndjson --stream` path is in `@claim:stream-order` and passed.
- **Verification-1 mobile touch targets — fixed.** The live 390 px suite checks every visible interactive element and passed the 44 px minimum.
- **Polish-1 and the current handoff's “no gaps” conclusion — not confirmed.** F-2-1 and the reopened F-1-2 remain.

## Structure, routes, accessibility, and visual identity

- Live `/`, `/demo`, `/inspect`, `/privacy`, and `/terms` returned 200. `/missing-sheet` returned the designed 404 with a route-specific title and a working way home.
- Every route has one `<main>`, one `<h1>`, `lang="en"`, a route-specific title, description, canonical, Open Graph metadata, favicon, and consistent header/footer.
- `robots.txt`, `sitemap.xml`, favicon, apple-touch icon, social card, the package download, all internal product links, and the Param Factory link returned 200. The contact link is an explicit `mailto:`.
- Client navigation moved focus to the new `<h1>`; browser Back restored the landing route and focused its `<h1>`.
- The live two-project suite reported zero serious or critical axe violations, no page/console errors, no horizontal overflow, compliant touch targets, and working reduced-motion/offline behavior.
- The blueprint drafting-sheet layout, clipped paper shapes, measured rails, palette, and original illustration match `.factory/design.md` and do not resemble a generic centered SaaS template.

No structural or accessibility finding remains beyond the mobile demo presentation in F-2-1.

## Missed leverage

No AI step is expected. This library's job is deterministic paging and preservation; model-generated classification or summarization would weaken that contract. JSON/NDJSON input, API output, a browser playground, CLI streaming, and a downloadable package cover the obvious import/export paths. No decorative AI feature or embedded provider key exists.

## What would make this perfect

Show the already-built packet outcome in the initial 390 px demo viewport; close the reopened claims gap with exact tagged tests for the stream API, complete CLI help, and schema nullability; replace the two ambiguous landing sentences with the proposed plain rewrites. Then rerun the clean 25-claim suite, full `npm test`, live mobile/desktop route sweep, offline interception, storage check, link crawl, and first-viewport assertion. A subsequent review can pass only if that sweep produces zero findings.
