# Perfection-loop polish 4

Completed 2026-08-28 for work order `mcp-result-envelope-polish-4`. Source review: `.factory/review-4.md` at `e3c889e0f49bfa195c2857322a1ae4301f2fc06e`. Product repair commits: `9b880f4` and `800366d`.

## Finding closure

| Finding id | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the honest versioned-tarball release path. The build still creates an ESM, CommonJS, declarations, CLI, examples, README, and license package. | Test: `@claim:installable-package`. Screenshot: `.factory/evidence/polish-4/live-home/screenshot-desktop.png`. Live check: the tarball returned 200, installed alone in `/tmp/mcp-result-envelope-polish4-live-consumer-4vCfmb`, imported, produced `2 rows · 1 field · 2 pages`, and ran `result-envelope demo`. |
| F-1-2 | Retained 27 one-to-one claim entries and observable tests. Renamed the affected public claim from `packet-details` to `envelope-details`; no promise lost coverage. | Tests: `npm run test:claims` (27/27) and `keeps the claim manifest in one-to-one sync with tagged tests`. Screenshot: `.factory/evidence/polish-4/live-demo/screenshot-desktop.png`. Live check: the complete live Playwright suite passed at the production URL. |
| F-1-3 | Replaced the remaining competing output noun with **envelope** across headings, actions, preview, code sample, factory docs, claims, and tests. | Tests: `public routes use envelope as the single output name` and `uses envelope consistently and explains the provenance property in plain words`. Screenshot: `.factory/evidence/polish-4/live-home/screenshot-mobile.png`. Live check: `/` has no visible “packet” copy. |
| F-2-1 | Preserved the phone-first built result strip before the editor, now using the single envelope term. | Test: `mobile demo fits the viewport`. Screenshot: `.factory/evidence/polish-4/live-demo/screenshot-mobile.png`. Live check: `/?demo=1` shows 12 rows, 3 pages, and populated manifest content above 844 px at scroll position 0. |
| F-2-2 | Retained exact claim tests for the async iterator, complete CLI help, and every documented API property. | Tests: `@claim:stream-api`, `@claim:cli-help`, and `@claim:api-shape`. Screenshot: `.factory/evidence/polish-4/live-demo/screenshot-desktop.png`. Live check: the live demo exposes all four populated envelope parts. |
| F-2-3 | Preserved the concrete sentence “Every page stays within its row and byte caps.” | Test: `landing page has a clear first screen and working navigation`. Screenshot: `.factory/evidence/polish-4/live-home/screenshot-mobile.png`. Live check: the exact sentence appears in the first product illustration caption. |
| F-2-4 | Preserved “Use the cursor to fetch the next page.” | Test: `demo pages with the keyboard`. Screenshot: `.factory/evidence/polish-4/live-home/screenshot-mobile.png`. Live check: the exact instruction appears in step three on `/`. |
| F-3-1 | Kept the compact, populated mobile envelope result above the long input. | Test: `mobile demo fits the viewport`. Screenshot: `.factory/evidence/polish-4/live-demo/screenshot-mobile.png`. Live check: the production mobile test passed with no scroll and no horizontal overflow. |
| F-3-2 | Retained the dedicated async-iterator manifest entry and observable iterator/chunk test. | Test: `@claim:stream-api`. Screenshot: `.factory/evidence/polish-4/live-home/screenshot-desktop.png`. Live check: the released tarball imported and executed from a clean consumer project. |
| F-3-3 | Retained the help-surface comparison against every supported parser flag and command. | Test: `@claim:cli-help`. Screenshot: `.factory/evidence/polish-4/live-home/screenshot-desktop.png`. Live check: the same released tarball’s installed CLI completed its demo command. |
| F-3-4 | Retained assertions for manifest identity/caps/counts/source details, summary page text/ranges, both nullable states, presence, and first page. | Test: `@claim:api-shape`. Screenshot: `.factory/evidence/polish-4/live-demo/screenshot-desktop.png`. Live check: the production inspector showed manifest, summary, schema, and page content. |
| F-3-5 | Kept the row-and-byte-cap wording and removed the former metaphor from current public copy. | Test: `uses envelope consistently and explains the provenance property in plain words`. Screenshot: `.factory/evidence/polish-4/live-home/screenshot-mobile.png`. Live check: the old sentence is absent from `/`. |
| F-3-6 | Kept the direct cursor instruction and removed the former ambiguous verb from current public copy. | Test: `landing page has a clear first screen and working navigation`. Screenshot: `.factory/evidence/polish-4/live-home/screenshot-mobile.png`. Live check: the old instruction is absent from `/`. |
| F-3-7 | Preserved the 16-word audience sentence using “size-limited output” and “source details.” | Test: `landing page has a clear first screen and working navigation`. Screenshot: `.factory/evidence/polish-4/live-home/screenshot-mobile.png`. Live check: the exact audience sentence appears below the live h1. |
| F-3-8 | Preserved price, privacy, and offline facts inside the initial desktop and phone viewports. | Tests: `landing keeps its action and all three required facts inside the first viewport` and `@claim:offline-reload`. Screenshot: `.factory/evidence/polish-4/live-home/screenshot-mobile.png`. Live check: all three production facts fit, and the production demo reloaded offline. |
| F-4-1 | Standardized the whole returned object as **envelope** in all current visitor copy, empty/status states, 404, source examples, claim prose, demo docs, design thesis, and catalog audit. CSS/DOM names were normalized too. | Tests: `public routes use envelope as the single output name` and `uses envelope consistently and explains the provenance property in plain words`. Screenshots: `.factory/evidence/polish-4/live-home/screenshot-mobile.png` and `.factory/evidence/polish-4/live-demo/screenshot-mobile.png`. Live check: every production route, including 404, contains no visible “packet.” |
| F-4-2 | Rewrote the README to say “source details” first, then introduce `provenance` once as the API property. The later summary says “source metadata.” The inspector label follows the same order and stays on one line on mobile. | Test: `uses envelope consistently and explains the provenance property in plain words`. Screenshot: `.factory/evidence/polish-4/live-demo/screenshot-mobile.png`. Live check: the installed live tarball’s README contains the three revised sentences at lines 7, 53, and 90. |

## Cumulative verification

- Final clean clone: `/tmp/mcp-result-envelope-polish4-final/repo`.
- `npm ci`: 93 locked packages, 0 vulnerabilities.
- `npm run test:claims`: 27/27 independent claim commands passed.
- `npm test`: typecheck and build passed; 24 unit/consumer tests passed; 31 browser tests passed with 3 project-only skips.
- `npm run pack:check`: 9.9 kB package, 47.6 kB unpacked, 10 declared files.
- Live Playwright: 31 passed, 3 project-only skips; both themes and every public route had zero serious/critical axe violations and no console errors.
- Live Lighthouse: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.46 s, CLS 0, total blocking time 0 ms.
- Initial assets: JavaScript 9.13 kB gzip, CSS 4.64 kB gzip, total live transfer 114,221 bytes.
- Live route status: `/`, `/demo`, `/inspect`, `/privacy`, and `/terms` returned 200; `/missing-sheet` returned the designed 404; release package and public metadata assets returned 200.
- Deployed JavaScript and CSS SHA-256 values exactly matched `dist/site`.
- Deployment: Azure Static Web Apps deployment `9d1842da-b8d0-4106-ba9f-62c606d10e7f` at <https://mcp-result-envelope.sociobot.in>.

Every finding from reviews 1–4 is closed. No finding of any severity remains.
