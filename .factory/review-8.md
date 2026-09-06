# Review 8: Pack large tool results into stable pages — FAIL

Reviewed 2026-09-06 at <https://mcp-result-envelope.sociobot.in>.

- Implementation candidate: `cb80a3ae48518ea10fc399235ab551dbc3ce9167`
- Documentation candidate: `974bd5d0bdc3843adff87ebd57a600b0ab602e61`
- The commits after the implementation candidate contain only reports, evidence, and handoff files. The live HTML, JavaScript, CSS, service worker, hero image, and npm tarball match the clean build byte for byte.

## Verdict

**FAIL.** Finding count: **1**. Untested claim count: **0**.

The library, CLI, normal-size browser inspector, demo isolation, offline path, routes, and all 27 declared claims pass. One accessibility finding remains on the phone demo when text is enlarged to 200%. A pass requires zero findings.

## Job, audience, and first action

Fresh 1440 × 900 desktop and 390 × 844 phone browsers showed the required information before scrolling.

- Job: **Pack large tool results into stable pages**.
- Audience: MCP and CLI authors who need size-limited output that keeps types, order, and source details.
- First action: **Try it with sample data**. The adjacent sentence says it loads 12 orders and builds their envelope.
- Facts: free and MIT licensed; runs in the tab with no uploads; works offline after the first visit.

On desktop, the action ended at 632 px and the facts ended at 719 px inside the 900 px viewport. On phone, the action ended at 437 px and the facts ended at 588 px inside the 844 px viewport. Both started at `scrollY = 0` without horizontal overflow. The wording is direct and uses one name, **envelope**, for the output.

Evidence: `.factory/evidence/review-8/fresh-desktop-home.png` and `.factory/evidence/review-8/fresh-phone-home.png`.

## Finding

### F-8-1 — Medium — The phone demo notice overlaps its controls at 200% text size

At a 390 × 844 viewport, enlarging text to 200% makes the persistent demo notice unreadable. The notice remains a two-column grid. Its first column collapses to 22.8 px wide while its text needs 87 px, and it grows to 276.3 px high. The Reset demo button occupies y = 117.5–170.7 px while the notice is still drawing “data, nothing is saved” through the same area. The words and button overlap.

The document also grows to 407 px wide in a 390 px viewport, and the header is clipped on the right. The standard-size phone layout does not have either problem. This fails the accessibility requirement that text resize to 200% without loss. Axe does not detect this visual overlap.

Evidence: `.factory/evidence/review-8/fresh-phone-demo-text-200.png`.

Required fix: at the phone breakpoint, stack the notice and actions or switch to a compact label when enlarged text no longer fits. Keep the complete sample-data warning and both 44 px actions visible without overlap, then add a browser test at 200% text size.

## Demo and data isolation

The first action opened `/?demo=1` in one click. Fresh desktop and phone contexts immediately showed:

- **Demo — sample data, nothing is saved**, **Reset demo**, and **Start for real**;
- 12 realistic orders and 3 pages;
- manifest id `re_9989164a3bee94d7` and summary `12 rows · 6 fields · 3 pages`;
- populated manifest, summary, schema, and page parts.

At standard text size, the repaired phone banner stayed at y = 0 after scrolling to the page controls at `scrollY = 1,863`. Reset demo and Start for real stayed inside the viewport and measured 44 px high. Editing the sample to one private row changed the result to one row. Reset restored 12 rows and `ord_1041`. Start for real opened the empty `/inspect` state in the live suite.

Normal, invalid, boundary, and recovery paths worked. Empty input and malformed JSON produced specific next-step errors. A 500-character field at a 256-byte cap produced `ROW_TOO_LARGE` guidance. Raising the cap to 2,048 bytes recovered and built one row.

Cookies, local storage, and session storage remained empty. Every observed request was same-origin, GET-only, and had no body. The private test value did not appear in a URL or request body. No real data was read or changed.

Evidence: `.factory/evidence/review-8/fresh-desktop-demo.png`, `.factory/evidence/review-8/fresh-phone-demo.png`, and `.factory/evidence/review-8/fresh-phone-demo-scrolled.png`.

## Declared claims

The commands ran from a fresh clone at `/tmp/mcp-result-envelope-review8-viqVfy/repo` after `npm ci --no-audit --no-fund`. `.factory/claims.json` contains 27 unique claims and the tests contain exactly one matching tag for each claim. `npm run test:claims` ran every declared command separately: **27/27 passed**.

| Claim ids | Result |
| --- | --- |
| `free-license`, `installable-package`, `demo-sample`, `local-processing`, `browser-no-storage`, `site-no-tracking` | PASS |
| `json-types`, `api-shape`, `inspector-parts`, `envelope-details`, `summary-no-rows`, `page-caps`, `row-cap`, `row-too-large`, `input-validation`, `stable-cursors` | PASS |
| `stream-api`, `stream-order`, `package-no-network`, `zero-runtime-dependencies`, `node-support`, `cli-demo`, `cli-help`, `cli-io` | PASS |
| `offline-reload`, `demo-memory`, `build-output` | PASS |

The landing page, README, privacy page, terms page, demo documentation, package metadata, and CLI help were cross-checked. No public claim-like sentence is missing from the claim manifest. No declared claim is incomplete or untested. F-8-1 is an accessibility acceptance defect, not an untested public claim.

## Clean build and installed package

- `npm test`: PASS. Type checking and production build passed; 24 unit and consumer tests passed; 32 browser tests passed with 4 expected device-specific skips.
- `npm run pack:check`: PASS. The package has 10 files, is 9.9 kB packed, and is 47.6 kB unpacked.
- Build output: 9.11 kB gzip JavaScript, 4.72 kB gzip CSS, and a 98,348-byte hero image.

The live tarball installed as the only dependency in a new temporary npm project. ESM and CommonJS imports worked. The API returned a two-row, two-page envelope, preserved booleans and source details, returned the second page, and streamed `manifest, summary, schema, page, page`. The installed CLI accepted the documented NDJSON stdin marker, emitted ordered chunks, returned exit code 2 with useful stderr for invalid JSON, and wrote the bundled 12-order demo to a new temporary directory. ESM and the CLI also ran under Node.js 18.20.8.

## Live routes, accessibility, privacy, and offline behavior

The complete live Playwright suite passed 32 tests with 4 expected project-specific skips. It covered desktop and phone layouts, both color schemes, all public routes, keyboard tabs and paging, reset and exit, storage, request logging, first-visit offline reload, route focus, browser Back, metadata, and the expected 404.

- `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, metadata files, artwork, and the package returned HTTP 200.
- `/missing-sheet` deliberately returned HTTP 404 with the designed page, one `h1`, one `main`, and a route home. This expected 404 is not a defect.
- Every discovered HTTPS link returned 200 except the deliberate current 404 page's own skip link. The contact `mailto:` is valid.
- Every public route has a distinct title, description, canonical, Open Graph data, and Twitter data. Robots and sitemap files list the public routes.
- Axe found zero serious or critical violations on all public routes in light and dark modes. The URL verifier found `lang="en"`, one title, one `h1`, one `main`, complete image alternatives, labeled buttons, and no console error.
- Keyboard traversal reached the skip link, demo controls, navigation, form controls, tabs, page actions, legal links, and footer without a trap. The first Tab focused the skip link with a 3 px visible outline. Arrow keys changed tabs. Route changes and browser Back moved focus to the new `h1` and announced it.
- Reduced motion set animation duration to `0.01ms` and disabled smooth scrolling. Normal-size phone controls met the 44 px target. F-8-1 records the separate 200% text defect.
- Security headers include a self-only CSP, header-only `frame-ancestors 'none'`, HSTS, `nosniff`, strict referrer policy, and a restrictive permissions policy.
- No analytics, advertising, tracking script, third-party font, model call, credential, or uploaded input was observed.

The demo was loaded once in a fresh context, the service worker took control, and the network was disabled. The first offline reload returned the demo title, 12 rows, and **Offline — inspector still works**. Cache `result-envelope-v3` contained all five public routes, current JavaScript and CSS, the favicon, and the hero image. The service worker is served with `Cache-Control: no-cache` and deletes older cache versions on activation.

This is a static library site. It has no backend, tenant state, database, health endpoint, authentication, payment flow, or request allowance. Tenant isolation, SQLite restart persistence, and 429/`Retry-After` checks do not apply.

## Live candidate match and performance

The clean build and production files matched byte for byte for `index.html`, hashed JavaScript and CSS, `sw.js`, the hero artwork, and the npm tarball. Later report-only commits do not require another product image.

Fresh Lighthouse results:

| Category or metric | Result |
| --- | ---: |
| Performance | 99 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| First contentful paint | 1.0 s |
| Largest contentful paint | 1.4 s |
| Total blocking time | 130 ms |
| Cumulative layout shift | 0 |

The full result is `.factory/evidence/review-8/lighthouse-live.json`.

## Earlier findings

Every earlier review, verification, polish record, and handoff was inspected. Each named historical defect remains fixed. F-8-1 is new.

| Earlier finding | Current disposition |
| --- | --- |
| F-1-1 — unavailable npm package | Fixed. The live versioned tarball returns 200, installs cleanly, and exposes the library and CLI. |
| F-1-2 / F-2-2 / F-3-2 / F-3-3 / F-3-4 — missing or incomplete claims | Fixed. All 27 claims have one outcome-based tag. Async iteration, complete CLI help, schema nullability, API metadata, install, and CLI behavior passed. |
| F-1-3 / F-4-1 — competing output terms | Fixed. Public copy uses **envelope** for the whole output. No visitor-facing “packet” or “contract” remains. |
| F-2-1 / F-3-1 — phone demo hid the output | Fixed at standard text size. The first phone demo screen shows 12 rows, 3 pages, manifest identity, and summary. |
| F-2-3 / F-3-5 — “measured edge” metaphor | Fixed. Current copy states the row and byte caps directly. |
| F-2-4 / F-3-6 — unclear cursor instruction | Fixed. Current copy says to use the cursor to fetch the next page. |
| F-3-7 / F-3-8 — dense audience copy and missing first-screen facts | Fixed. The audience and all three facts fit both fresh standard-size viewports. |
| F-4-2 — unexplained `provenance` | Fixed. Public copy says “source details” before naming the API property. |
| Verification 1 — broken CLI stdin marker | Fixed. The installed NDJSON stdin command emitted ordered chunks. |
| Verification 1 — phone targets below 44 px | Fixed at standard text size. Every visible phone control passed the current suite. |
| F-7-1 — offline test used two online loads | Fixed. The declared test and direct live check use one online visit followed by the first offline reload. |
| F-7-2 — phone demo label scrolled away | Fixed at standard text size. The banner stayed at y = 0 with both actions visible at `scrollY = 1,863`. F-8-1 concerns enlarged text, not sticky positioning. |

## Product scope

The API, CLI, JSON and NDJSON input, streaming output, package download, and local inspector cover the brief. An AI step would add cost and nondeterminism without improving this deterministic formatting job. No missing import, export, sync, or AI feature was found.

## Commands run

```sh
npm ci --no-audit --no-fund
npm run test:claims
npm test
npm run pack:check
PLAYWRIGHT_BASE_URL=https://mcp-result-envelope.sociobot.in npm run test:e2e
/opt/fleet/lib/verify-url.sh https://mcp-result-envelope.sociobot.in .factory/evidence/review-8
CHROME_PATH=/opt/pw-browsers/chromium-1208/chrome-linux64/chrome npx --yes lighthouse@12.2.1 https://mcp-result-envelope.sociobot.in ...
```

Fresh screenshots, URL-verifier output, and Lighthouse JSON are in `.factory/evidence/review-8/`.
