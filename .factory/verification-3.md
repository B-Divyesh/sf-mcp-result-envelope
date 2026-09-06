# Verification 3: Pack large tool results into stable pages — PASS

Verified 2026-09-06 at <https://mcp-result-envelope.sociobot.in>.

- Implementation candidate: `cb80a3ae48518ea10fc399235ab551dbc3ce9167`
- Documentation candidate: `cdb164bf30bdba31e70bb0afa49d4b321b2cb2b7`
- The later commit changes only the handoff and repair evidence. The live product files match the implementation candidate's clean build.

## Verdict

**PASS.** Finding count: **0**. Untested claim count: **0**.

The library, CLI, browser inspector, package download, live routes, offline behavior, privacy behavior, and accessibility checks work. No finding of any severity remains.

## Job, audience, and first action

Fresh 1440 × 900 desktop and 390 × 844 phone contexts showed the required information before scrolling.

- Job: **Pack large tool results into stable pages**.
- Audience: MCP and CLI authors who need size-limited output that keeps types, order, and source details.
- First action: **Try it with sample data**. Its adjacent text says it loads 12 orders and builds their envelope.
- Facts: free and MIT licensed; runs in this tab with no uploads; works offline after the first visit.

On desktop, the action ended at 632 px and the facts at 719 px inside a 900 px viewport. On phone, they ended at 437 px and 588 px inside an 844 px viewport. Both pages started at `scrollY = 0` with no horizontal overflow. The copy uses direct product terms and no unsupported metaphor or mood heading.

Evidence: `.factory/evidence/verification-3/fresh-desktop-home.png` and `.factory/evidence/verification-3/fresh-phone-home.png`.

## Demo and data isolation

The first action opened `/?demo=1` in one click. Both fresh contexts immediately showed:

- the persistent **Demo — sample data, nothing is saved** label;
- **Reset demo** and **Start for real**;
- 12 realistic orders and 3 pages;
- a populated manifest identity and summary;
- populated manifest, summary, schema, and page tabs.

Normal, invalid, boundary, and recovery paths passed. Valid input built and paged. Invalid and empty JSON produced specific next-step errors. A 500-character field with `maxBytes` set to 256 produced `ROW_TOO_LARGE` guidance. Raising the cap to 2,048 recovered and built one row. Reset restored 12 rows and `ord_1041`. Start for real opened `/inspect` with an empty input.

The phone banner remained at `y = 0` after scrolling to the editor (`scrollY = 240`) and page controls (`scrollY = 1,863`). Both banner actions stayed inside the viewport at 44 px high. Demo input stayed in route-local memory. Cookies, local storage, and session storage remained empty, every observed request was same-origin and GET-only, and edited input appeared in no request.

Evidence: `.factory/evidence/verification-3/fresh-desktop-demo.png`, `.factory/evidence/verification-3/fresh-phone-demo.png`, and `.factory/evidence/verification-3/fresh-phone-demo-scrolled.png`.

## Declared claims

The checks ran from a fresh clone at `/tmp/mcp-result-envelope-verify3-LanXfg/repo` after `npm ci --no-audit --no-fund`. `.factory/claims.json` contains 27 entries, with 27 unique matching test tags and no missing or extra tag. `npm run test:claims` ran every declared command separately: **27/27 passed**.

| Claim ids | Result |
| --- | --- |
| `free-license`, `installable-package`, `demo-sample`, `local-processing`, `browser-no-storage`, `site-no-tracking` | PASS |
| `json-types`, `api-shape`, `inspector-parts`, `envelope-details`, `summary-no-rows`, `page-caps`, `row-cap`, `row-too-large`, `input-validation`, `stable-cursors` | PASS |
| `stream-api`, `stream-order`, `package-no-network`, `zero-runtime-dependencies`, `node-support`, `cli-demo`, `cli-help`, `cli-io` | PASS |
| `offline-reload`, `demo-memory`, `build-output` | PASS |

The offline claim now uses its own fresh context, visits the demo once, waits for service-worker control, disables the network, and reloads. It contains no intermediate online reload. The populated 12-row demo returned on that first offline reload. No public claim-like sentence on the landing page, README, privacy page, or terms page was missing from the claim coverage.

## Clean build and installed package

- `npm test`: PASS. Type checking and the production build passed; 24 unit and consumer tests passed; 32 browser tests passed with 4 intentional device-specific skips.
- `npm run pack:check`: PASS. The tarball contains 10 declared files, is 9.9 kB packed, and is 47.6 kB unpacked.
- Build output: 9.13 kB gzip JavaScript, 4.71 kB gzip CSS, and a 98,348-byte hero image.

The live tarball was installed as the only dependency in a new npm project. ESM and CommonJS imports worked. On Node.js 18.20.8, the ESM API and CLI worked. The API preserved booleans and source details, returned the second stable page, and streamed `manifest, summary, schema, page, page`. The installed CLI accepted the documented NDJSON standard-input marker, wrote ordered JSON chunks, returned actionable stderr with exit code 2 for invalid JSON, and wrote the bundled 12-order demo into a new temporary directory.

## Live routes, accessibility, and privacy

The complete live Playwright run passed 32 tests with 4 expected project-specific skips. It covered desktop and phone layouts, both color schemes, every public route, keyboard tabs, paging, reset, exit, storage, request logging, first-visit offline reload, route focus, browser Back, metadata, and the expected 404.

- `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, metadata files, artwork, and the package returned HTTP 200.
- `/missing-sheet` deliberately returned HTTP 404 with the designed page, one `h1`, one `main`, and a route home. This expected response is not a defect.
- Every discovered HTTPS link returned 200 except the deliberate current 404 link on that 404 page. The contact `mailto:` is valid.
- Route titles, descriptions, canonicals, Open Graph data, Twitter data, robots rules, and sitemap entries are present and route-specific.
- Axe found zero serious or critical violations on all public routes in light and dark modes. The URL verifier found `lang="en"`, one title, one `h1`, one `main`, no missing image alternatives, no unlabeled buttons, and no console error.
- Keyboard traversal reached the skip link, demo controls, navigation, form fields, tabs, page controls, and footer without a trap. Enter activated the skip link, Space activated reset, and arrow keys changed tabs. The focused skip link had a 3 px outline with a measured 5.06:1 contrast ratio.
- At 200% text size, each public route retained its `h1`, `main`, controls, and reflow without document overflow. Reduced-motion mode set animation duration to `0.01ms` and disabled smooth scrolling.
- A four-times CPU-throttled phone interaction recorded a 24 ms click event duration for rebuilding the envelope.
- The CSP allows only self-hosted resources and sends `frame-ancestors 'none'` as a response header. HSTS, `nosniff`, referrer policy, and restrictive permissions policy are present.
- No analytics, advertising, tracking script, third-party font, model call, credential, or uploaded input was observed.

The service worker was active after one visit. Its `result-envelope-v3` cache contained the five routes, favicon, artwork, and current hashed JavaScript and CSS. A first offline reload showed the demo title, 12 rows, and **Offline — inspector still works**. `sw.js` uses `Cache-Control: no-cache`, and activation removes older cache versions.

This is a static library site. It has no backend, tenant state, database, health endpoint, authentication, payment flow, or live-request allowance. Tenant isolation, SQLite restart persistence, and 429/`Retry-After` checks do not apply.

## Live candidate match and performance

The clean build and production files matched byte for byte for `index.html`, the hashed JavaScript and CSS, `sw.js`, the hero artwork, and the versioned npm tarball. Later report-only commits do not require a different product image.

Fresh Lighthouse results:

| Category or metric | Result |
| --- | ---: |
| Performance | 96 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| First contentful paint | 1.0 s |
| Largest contentful paint | 1.5 s |
| Total blocking time | 220 ms |
| Cumulative layout shift | 0 |

Lighthouse does not provide field INP for this fresh lab run. The separate throttled interaction check above measured 24 ms. The full Lighthouse result is `.factory/evidence/verification-3/lighthouse-live.json`.

## Earlier findings

Every earlier verification, review, polish record, and handoff was inspected. The current source, clean package, and live product prove these dispositions.

| Earlier finding | Current disposition |
| --- | --- |
| F-1-1 — unavailable npm package | Fixed. The versioned live tarball returns 200, installs cleanly, and exposes both the library and CLI. |
| F-1-2 / F-2-2 / F-3-2 / F-3-3 / F-3-4 — missing or incomplete claims | Fixed. All 27 claims have one outcome-based tag. Async iteration, complete CLI help, schema nullability, API metadata, install, and CLI behavior passed. |
| F-1-3 / F-4-1 — competing output terms | Fixed. Public copy uses **envelope** for the whole result; no visitor-facing “packet” or “contract” remains. |
| F-2-1 / F-3-1 — phone demo hid the output | Fixed. The initial phone demo shows 12 rows, 3 pages, manifest identity, and summary before the editor. |
| F-2-3 / F-3-5 — “measured edge” metaphor | Fixed. Current copy states the row and byte caps directly. |
| F-2-4 / F-3-6 — unclear cursor instruction | Fixed. Current copy says to use the cursor to fetch the next page. |
| F-3-7 / F-3-8 — dense audience copy and missing first-screen facts | Fixed. The audience and all three facts fit the fresh desktop and phone viewports. |
| F-4-2 — unexplained `provenance` | Fixed. Public copy says “source details” before naming the API property. |
| Verification 1 — broken CLI stdin marker | Fixed. The exact installed NDJSON stdin command emitted ordered chunks. |
| Verification 1 — phone targets below 44 px | Fixed. The phone suite checked every visible interactive element; the persistent demo controls are 44 px high. |
| F-7-1 — offline test used two online loads | Fixed. The declared test and fresh live check use one online visit followed by the first offline reload. |
| F-7-2 — phone demo label scrolled away | Fixed. The compact banner and both actions remained visible at the editor and output controls. |

## Product scope

No missed feature was found. The deterministic API, CLI, JSON and NDJSON input, streaming output, package download, and local inspector cover the brief. An AI step would not improve this deterministic result-formatting job.

## Evidence and commands

```sh
npm ci --no-audit --no-fund
npm run test:claims
npm test
npm run pack:check
PLAYWRIGHT_BASE_URL=https://mcp-result-envelope.sociobot.in npm run test:e2e
/opt/fleet/lib/verify-url.sh https://mcp-result-envelope.sociobot.in .factory/evidence/verification-3
CHROME_PATH=/opt/pw-browsers/chromium-1208/chrome-linux64/chrome npx --yes lighthouse@12.2.1 https://mcp-result-envelope.sociobot.in ...
```

Fresh screenshots, the URL verifier result, and the Lighthouse JSON are in `.factory/evidence/verification-3/`.
