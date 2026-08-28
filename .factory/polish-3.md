# Perfection-loop polish 3

Completed 2026-08-28 for work order `mcp-result-envelope-polish-3`. Source review: `.factory/review-3.md` at `969938422dad61964acfb851c25ce01177dee2c4`. Product commits: `5576841ba1362bf7654be0641bbd91a5c7e13b47` and `2449350`.

## Finding closure

| Finding id | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Preserved the honest versioned-tarball install path and its clean-consumer gate; no unavailable bare npm-registry command was reintroduced. | `@claim:installable-package`; live tarball install in `.factory/evidence/polish-3/live-package-install.log`; live URL returned 200: <https://mcp-result-envelope.sociobot.in/downloads/mcp-result-envelope-0.1.0.tgz>. |
| F-1-2 / F-2-2 | Expanded the claims contract to 27 one-to-one manifest/test pairs and retained coverage for every landing and README promise. | `npm run test:claims` from clean clone: 27/27; `.factory/evidence/polish-3/clean-claims.log`; one-to-one guard in `tests/unit/package.test.ts`. |
| F-1-3 | Preserved **packet** as the sole term for the whole structured result in both headings and the terminology audit. | `landing page has a clear first screen and working navigation`; `.factory/copy-audit.md`; live home screenshot at `.factory/evidence/polish-3/live-home/screenshot-desktop.png`. |
| F-2-1 / F-3-1 | Added a live-built, phone-only result sheet before the editor. It shows 12 rows, 3 pages, manifest fields, identity, and summary while the page remains at `scrollY=0`. | `mobile demo fits the viewport` asserts all three result elements end above 844 px; live coordinates are in `.factory/evidence/polish-3/live-findings.json` (rows/pages bottom 439 px; populated preview bottom 599 px); screenshot `.factory/evidence/polish-3/live-demo/screenshot-mobile.png`; live URL <https://mcp-result-envelope.sociobot.in/?demo=1>. |
| F-3-2 | Added the `stream-api` manifest entry and exactly one tagged test that checks `Symbol.asyncIterator`, observable iteration, chunk data, and final page. | `@claim:stream-api`; clean claim log. |
| F-3-3 | Added the `cli-help` manifest entry and exactly one tagged test that compares every help command and flag with the parser surface. Removed the undocumented `--json` alias. | `@claim:cli-help`; clean claim log; full CLI/package suite in `.factory/evidence/polish-3/clean-npm-test.log`. |
| F-3-4 | Expanded `@claim:api-shape` to assert manifest identity/version/input bytes/all caps/counts/provenance, summary page-count text and numeric ranges, both nullable states and presence, plus first-page rows/cursor/bytes. | `@claim:api-shape`; clean claim log. |
| F-2-3 / F-3-5 | Replaced “Every page has a measured edge” with “Every page stays within its row and byte caps.” | `landing keeps its action and all three required facts inside the first viewport`; `oldCopyPresent: false` in live findings; live home screenshot. |
| F-2-4 / F-3-6 | Replaced “Resolve the cursor when asked” with “Use the cursor to fetch the next page.” | Landing source and `.factory/copy-audit.md`; `oldCopyPresent: false` in live findings; live home screenshot. |
| F-3-7 | Rewrote the hero audience sentence as “For MCP and CLI authors who need size-limited output that keeps types, order, and source details.” | `landing page has a clear first screen and working navigation`; exact live copy in `.factory/evidence/polish-3/live-findings.json`. |
| F-3-8 | Replaced the third fact with the tested offline promise, tightened hero spacing, and corrected the hero image's intrinsic sizing so all facts fit. | `landing keeps its action and all three required facts inside the first viewport` passes at 1280×720 and 390×844; live 1440×900 fact bottoms are 719 px; `@claim:offline-reload`; live home screenshot. |

## Earlier verification regressions

| Item | Evidence it remains fixed |
| --- | --- |
| Verification-1 stdin marker | `@claim:stream-order` runs `pack - --format ndjson --stream` and asserts manifest → summary → schema → page. |
| Verification-1 44 px touch targets | `mobile demo fits the viewport` measures every visible interactive control. |
| Real routing, metadata, focus, legal pages, and 404 | `routes set distinct metadata, legal links work, and unknown paths render the designed 404`; live status log shows five 200 routes and a real 404; live findings record route titles, one `h1`, one `main`, canonicals, and internal-link 200s. |
| Demo isolation and reset | `@claim:demo-sample`, `@claim:local-processing`, `@claim:browser-no-storage`, and `@claim:demo-memory`; live cold context had zero cookies/storage and same-origin requests only. |
| Accessibility, themes, and motion | `every public route has no serious accessibility violations` covers every route in both themes; live Playwright result: 29 passed, 3 intentional project skips; verifier reports zero console errors and complete title/lang/main/alt/label basics. |
| Offline and privacy | `@claim:offline-reload`, request interception, zero-storage assertions, CSP `connect-src 'self'`, and `.factory/evidence/polish-3/live-headers.log`. |
| Product identity | Blueprint grid, drafting plate, clipped sheets, revision color, and original illustration remain unchanged; the phone result uses the same documented result-sheet grammar. |

## Final evidence

- Clean clone: `/tmp/mcp-result-envelope-polish3-final-KMLYYW/repo`.
- Clean install: 0 vulnerabilities.
- Claims: 27/27 passed.
- Full clean `npm test`: typecheck/build passed; 23 unit/consumer tests passed; 29 browser tests passed with 3 intentional project-only skips.
- Package: 9.9 kB tarball, 47.6 kB unpacked, 10 declared files.
- Live suite: 29 passed with 3 intentional project-only skips; no serious/critical axe violations or console errors.
- Live Lighthouse mobile: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.44 s, CLS 0, TBT 24 ms.
- Initial assets: JavaScript 9.12 kB gzip; CSS 4.64 kB gzip; hero 98.3 kB; live transfer 114,226 bytes.
- Deployment: Azure Static Web Apps deployment `257bcfae-25a9-49b9-b554-bfa3891a6680`; live JS/CSS SHA-256 values exactly match `dist/site`.

No finding from reviews 1–3 or the earlier polish/verification records remains unresolved.
