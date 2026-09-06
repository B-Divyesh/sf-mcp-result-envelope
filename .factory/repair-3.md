# Repair 3: enlarged-text demo notice

Completed 2026-09-06 for work order `mcp-result-envelope-repair-3`.

- Source finding: `.factory/review-8.md`, F-8-1.
- Implementation commit: `4dfcaaae551208e7b95046280aafebed68df471f`.
- Live URL: <https://mcp-result-envelope.sociobot.in>.
- Deployment id: `c262b750-4c3e-464d-9797-aa76689b8e56`.

The separately referenced `factory-evidence/mcp-result-envelope-review-8/qa-report.md` was not mounted in the workspace. The complete checked-in review and its matching screenshots and measurements were available and were read.

## Finding closure

At 390 × 844 with text at 200%, the phone demo banner used a two-column grid. Its warning collapsed to 22.8 px, crossed the Reset demo button, and widened the document to 407 px.

The phone banner now uses intrinsic, wrapping flex rows. At normal text it remains compact. At 200%, the complete warning takes a 362 px row and the actions move below it. The wordmark can also shrink and wrap so the header remains inside the viewport.

The new browser regression enlarges text in Chromium and checks rendered outcomes. It asserts that the warning is not clipped, its rectangle does not intersect either action, both actions remain at least 44 px, every action stays in the viewport, the document has no horizontal overflow, and the banner remains sticky after scrolling.

Live measurements after deployment:

- document width: 390 px in a 390 px viewport;
- warning: 362 × 69.1 px;
- Reset demo and Start for real: 178 × 53.2 px each;
- warning bottom: 75.1 px; action top: 83.1 px;
- sticky banner: y = 0 after scrolling, 142.2 px high.

Evidence: `.factory/evidence/repair-3/live-cold-audit.json`, `fresh-phone-demo-text-200.png`, and `fresh-phone-demo-text-200-scrolled.png`.

## Verification

The exact implementation commit was cloned into a new temporary directory and installed with `npm ci --no-audit --no-fund`.

- `npm run test:claims`: 27/27 passed.
- `npm test`: typecheck and build passed; 24 unit/consumer tests passed; 33 browser tests passed; 5 project-specific skips were expected.
- `npm run pack:check`: 10 files, 9.9 kB packed, 47.6 kB unpacked.
- Clean consumer: ESM, CommonJS, stable paging, streaming, CLI standard input, invalid input, demo output, and Node.js 18 passed.
- Live Playwright: 33 passed with 5 expected skips, including the 200% text regression and axe checks in both themes.
- URL verifier: HTTP 200, correct title and language, one `h1`, one `main`, complete image alternatives, labeled buttons, and no console errors.
- Live routes: `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, metadata, artwork, and package returned 200. `/missing-sheet` returned the intended designed 404.
- Live files matched the clean build byte for byte, including HTML, JavaScript, CSS, service worker, artwork, and package.
- Lighthouse mobile: performance 100, accessibility 100, best practices 100, SEO 100; FCP 1.0 s, LCP 1.5 s, TBT 40 ms, CLS 0.
- Build: JavaScript 26.37 kB raw / 9.13 kB gzip; CSS 18.88 kB raw / 4.75 kB gzip; hero 98,348 bytes.

## Earlier findings

All earlier review, verification, and polish records were read. Their fixes remain covered and passed: the installable versioned package, all 27 claim tests, the phone-first populated result, one `envelope` term, plain source wording, caps and cursor wording, first-screen facts, CLI stdin, 44 px controls, first-visit offline reload, and the sticky phone banner.

This is a static library site. Backend tenant, database, persistence, health, authentication, payment, and 429 checks do not apply. The brief is free, so no billing offer is advertised or required.
