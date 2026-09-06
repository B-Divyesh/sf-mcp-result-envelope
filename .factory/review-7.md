# Review 7: Pack large tool results into stable pages — FAIL

Reviewed 2026-09-06 at <https://mcp-result-envelope.sociobot.in>.

- Implementation candidate: `800366de66bfc216b321bf5d8584ffb39bc15398`
- Documentation candidate: `5666eeca5ca3c1f4a50167472c9779b6868fb171`
- Reason for the split: every later commit changes only factory reports, copy-audit evidence, or handoff records. The live JavaScript, CSS, hero, and release tarball match a clean build from the reviewed tree byte for byte.

## Verdict

**FAIL.** There are two findings, including one incompletely tested public claim. The live library, CLI, inspector, routes, accessibility checks, and package installation work, but a pass requires zero findings and zero untested claims.

- Finding count: **2**
- Untested claim count: **1**

## First screen before scrolling

Fresh 1440 × 900 desktop and 390 × 844 phone contexts both show these items without scrolling:

- Job: **Pack large tool results into stable pages**.
- Audience: MCP and CLI authors who need size-limited output that keeps types, order, and source details.
- First action: **Try it with sample data**. Adjacent text says it loads 12 orders and builds their envelope.
- Facts: free and MIT licensed; runs in the tab with no uploads; works offline after the first visit.

The wording is direct, the action is clear, and the blueprint layout remains specific to this product. Evidence: `.factory/evidence/review-7/home-desktop-first.png` and `.factory/evidence/review-7/home-phone-first.png`.

## Findings

### F-7-1 — High — The offline claim command does not test the promised first-visit condition

The public claim says, “The demo reopens offline after its first visit.” The claim sandbox also says to disable the network after the first load.

The tagged test instead performs these steps in `tests/e2e/site.spec.ts:256-260`:

1. Open the demo.
2. Wait for the service worker.
3. Reload online.
4. Disable the network.
5. Reload offline.

`npm run test:claims` therefore passes only after two online loads. It does not assert the stated first-visit condition. This is an incomplete public-claim test and counts as one untested claim under the claims contract.

Independent live evidence is better than the declared test: three new contexts opened the demo once, went offline, and reloaded with the heading and 12-row sample intact. The current behavior is not reproduced as false. The finding is that the required claim command does not prove it and can miss a regression.

Required fix: remove the intermediate online reload, keep the test in its own fresh context, and assert the populated sample immediately after the first offline reload.

### F-7-2 — Medium — The phone demo label does not remain on screen while using the editor

The demo contract requires a persistent “Demo — sample data, nothing is saved” label with **Reset demo** and **Start for real**. It is sticky on desktop. At the phone breakpoint, `site/src/style.css:261` changes `.demo-banner` to `position: static`.

At 390 × 844, scrolling to the editor moved the banner to `y = -652 px`. Scrolling to the output controls moved it to `y = -1,884 px`. The visitor can no longer see that sample data is active or reach reset/exit without returning to the top of the long page.

Required fix: keep a compact sticky phone label and the two demo actions visible, then add a test that scrolls through the editor and checks their viewport positions.

## Demo and data isolation

The one-click action opened `/?demo=1` at `scrollY = 0` in both fresh contexts. The first demo screen showed a realistic order sample with `ord_1041`, region, status, total, item count, timestamp, 12 rows, 3 pages, a stable envelope id, and a populated summary. All four output tabs contained data.

Normal, invalid, boundary, and recovery paths worked:

- Valid input built a populated envelope and paged with keyboard-operable tabs.
- Invalid JSON produced a specific error, set `aria-invalid`, and returned focus to the input.
- A 500-character field at the 256-byte cap produced `ROW_TOO_LARGE` guidance.
- Raising the cap to 2,048 bytes recovered and built one row.
- **Reset demo** restored the original order sample.
- **Start for real** opened `/inspect` with an empty input.

Cookies, local storage, and session storage remained empty. Every browser request was same-origin and GET-only; sample values were absent from request URLs and bodies. No real input was read or changed.

Evidence: `.factory/evidence/review-7/demo-desktop-first.png`, `.factory/evidence/review-7/demo-phone-first.png`, and `.factory/evidence/review-7/live-audit.json`.

## Declared claims

From clean clone `/tmp/mcp-result-envelope-review7-j0p0o7/repo`, all 27 declared commands exited successfully. One result remains incomplete for the reason in F-7-1.

| Claim ids | Command result | Review result |
| --- | --- | --- |
| `free-license`, `installable-package`, `demo-sample`, `local-processing`, `browser-no-storage`, `site-no-tracking` | PASS | Proven |
| `json-types`, `api-shape`, `inspector-parts`, `envelope-details`, `summary-no-rows`, `page-caps`, `row-cap`, `row-too-large`, `input-validation`, `stable-cursors` | PASS | Proven |
| `stream-api`, `stream-order`, `package-no-network`, `zero-runtime-dependencies`, `node-support`, `cli-demo`, `cli-help`, `cli-io` | PASS | Proven |
| `offline-reload` | PASS | **Incomplete; F-7-1** |
| `demo-memory`, `build-output` | PASS | Proven |

No additional unsupported claim was found in the landing page, README, privacy page, or terms page.

## Installed package and CLI

The exact documented tarball installed as the sole dependency in a new temporary npm project. The ESM API produced a two-row, three-field, two-page envelope; `getEnvelopePage` returned the second row; and `streamEnvelope` yielded manifest, summary, schema, then two pages.

The installed CLI accepted the documented NDJSON stdin marker, emitted ordered chunks, returned exit code 2 with guidance for invalid JSON, and wrote the bundled 12-order demo to a new `result-envelope-demo-*` directory. `npm run pack:check` reported 10 files, 9.9 kB packed, and 47.6 kB unpacked.

## Routes, accessibility, privacy, and performance

- `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, metadata files, artwork, and the package returned 200.
- `/missing-sheet` deliberately returned HTTP 404 with the designed page, correct title, one `h1`, and a route home. This expected 404 is not a defect.
- Every internal and external HTTPS link returned 200. The contact `mailto:` link was valid.
- Route titles, descriptions, canonicals, Open Graph data, and Twitter data changed correctly.
- The live desktop/mobile Playwright run passed 31 tests with 3 intentional device-specific skips.
- Axe found no serious or critical issue across every public route in light and dark modes.
- The verifier found one title, `lang="en"`, one `h1`, a main landmark, no missing alt text, no unlabeled button, and no console error.
- Keyboard traversal reached the skip link, demo actions, navigation, form, tabs, page controls, legal links, and footer without a trap. The skip link had a 3 px visible outline.
- Reduced motion computed a near-zero animation duration and disabled smooth scrolling.
- A 200% text-size check retained the content and controls. The normal 390 px view had no horizontal overflow.
- Three independent fresh contexts reloaded the populated demo offline immediately after the first visit.
- Security headers include CSP, HSTS, `nosniff`, strict referrer policy, a restrictive permissions policy, and header-only `frame-ancestors 'none'`.
- No analytics, advertising, tracking script, third-party font, model call, or uploaded sample data was observed.
- Live Lighthouse: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.5 s, CLS 0, TBT 0 ms.
- Initial assets: 26,365-byte JavaScript, 18,473-byte CSS, and 98,348-byte hero image. Built gzip sizes are 9.13 kB JavaScript and 4.64 kB CSS.

This is a static library site, so backend tenant isolation, database restart persistence, health endpoints, and 429/`Retry-After` behavior do not apply. There is no account, payment, or shared database.

## Earlier findings

Every earlier review, verification, and polish record was inspected. These dispositions were proved again against the live site or installed release:

| Earlier finding | Current disposition |
| --- | --- |
| F-1-1 — unavailable npm package | Fixed. The versioned live tarball returned 200, installed cleanly, imported, and ran its CLI. No bare unavailable registry command remains. |
| F-1-2 / F-2-2 / F-3-2 / F-3-3 / F-3-4 — missing or shallow claim coverage | The named historical gaps are fixed: async iteration, full CLI help, schema nullability, API metadata, public install, and CLI behavior have tagged assertions. F-7-1 is a new, narrower defect in the offline test sequence. |
| F-1-3 / F-4-1 — competing “packet” and “contract” terms | Fixed. Current public product copy uses **envelope** for the whole output. |
| F-2-1 / F-3-1 — phone demo hid its result | Fixed. The phone demo shows 12 rows, 3 pages, and populated manifest content before the editor and without scrolling. |
| F-2-3 / F-3-5 — “measured edge” metaphor | Fixed. Current copy names row and byte caps. |
| F-2-4 / F-3-6 — unclear cursor instruction | Fixed. Current copy says to use the cursor to fetch the next page. |
| F-3-7 — dense audience wording | Fixed. The 16-word sentence uses “size-limited output” and “source details.” |
| F-3-8 — missing or clipped first-screen facts | Fixed. Price, privacy, and offline facts fit both fresh first viewports. |
| F-4-2 — unexplained `provenance` term | Fixed. Copy says “source details” before naming the code property. |
| Verification 1 — broken CLI stdin marker | Fixed in the installed live package. |
| Verification 1 — phone touch targets below 44 px | Fixed for every visible interactive element checked by the phone suite. |
| Reviews 5 and 6 — no known gaps | Superseded by F-7-1 and F-7-2 found in this seven-day review. |

## Product scope

The deterministic browser inspector, JSON and NDJSON input, library API, CLI, stream output, and package download cover the brief. An AI step would add cost and privacy behavior without improving the required deterministic conversion. No missed AI, import, export, or sync feature was found.

## Commands run

```sh
npm ci --no-audit --no-fund
npm run test:claims
npm test
npm run pack:check
PLAYWRIGHT_BASE_URL=https://mcp-result-envelope.sociobot.in npm run test:e2e
/opt/fleet/lib/verify-url.sh https://mcp-result-envelope.sociobot.in .factory/evidence/review-7
CHROME_PATH=/opt/pw-browsers/chromium-1208/chrome-linux64/chrome npx --yes lighthouse@12.2.1 https://mcp-result-envelope.sociobot.in ...
```

The first Lighthouse 13 attempt could not find a browser, and a second attempt crashed the supplied Chromium tab. Lighthouse 12.2.1 then completed successfully with the same supplied browser. These setup attempts are not product failures.
