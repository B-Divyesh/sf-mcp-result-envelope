# Perfection-loop polish 1

Completed 2026-08-28 for work order `mcp-result-envelope-polish-1`. Source review: `.factory/review-1.md` at `3b9fe751910d716d83afd8e47f75fe9dd0044ffa`.

## Finding closure

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 — documented npm package unavailable | Removed every bare registry install/run command. `npm run build:site` now packs the ESM, CommonJS, declarations, CLI, examples, README, and license into `dist/site/downloads/mcp-result-envelope-0.1.0.tgz`. The landing page and README use that exact release URL and the page offers a direct download link. | `@claim:installable-package` installs the artifact in a new npm project, imports `createEnvelope`, and runs the installed CLI. The live tarball returned 200, matched the local SHA-256 `b3e3617272754d87bc2f3c3291bc053ee358dcf21e438acc686b88168648da99`, installed as the only dependency, returned `2 rows · 1 field · 2 pages`, and ran `result-envelope demo`. Live URL: `https://mcp-result-envelope.sociobot.in/downloads/mcp-result-envelope-0.1.0.tgz`. |
| F-1-2 — unlisted landing and README claims | Expanded `.factory/claims.json` from 11 to 25 entries and added exactly one tagged test for each. New coverage includes the 12-order resettable sample, four populated parts, packet details, API shape, oversized rows, row caps, invalid input, no dependencies, Node engine metadata, CLI streams and exit codes, routed build output, real-inspector storage, and tracking absence. Unsupported transport/ranking language was removed. `scripts/run-claims.mjs` executes every manifest command. | `npm run test:claims` in clean clone `/tmp/mcp-result-envelope-polish-claims-7nSRMA/repo`: 25/25 passed. The one-to-one manifest/tag guard also passed. Relevant tests: `@claim:demo-sample`, `@claim:inspector-parts`, `@claim:packet-details`, `@claim:api-shape`, `@claim:row-too-large`, `@claim:zero-runtime-dependencies`, `@claim:cli-io`, `@claim:row-cap`, `@claim:input-validation`, `@claim:build-output`, and `@claim:browser-no-storage`. Demo screenshot: `.factory/evidence/polish-1-demo/screenshot-mobile.png`. |
| F-1-3 — “contract” and “packet” terminology conflict | Replaced both landing “contract” headings with “Inspect the result packet before you install” and “Build a result packet in three steps.” Updated the complete landing copy audit and terminology table. | `tests/e2e/site.spec.ts` checks the revised landing and demo flow. Live screenshot: `.factory/evidence/screenshot-mobile.png`. Live URL: `https://mcp-result-envelope.sociobot.in/`. |

## Cumulative acceptance sweep

- First screen: the seven-word verb-first headline, 15-word audience sentence, one-click `/?demo=1` action, immediate outcome, and three facts are visible at 390 × 844.
- Demo isolation: `/?demo=1` immediately builds 12 realistic orders; the persistent banner includes Reset demo and Start for real; tests prove edits disappear and no browser storage is used.
- Routes and metadata: `/`, `/demo`, `/inspect`, `/privacy`, and `/terms` have generated route documents plus runtime titles, descriptions, canonicals, Open Graph, and Twitter metadata. Unknown paths return the styled `404.html` with HTTP 404. Navigation and Back focus the new `h1` and announce it.
- Accessibility and mobile: the live desktop/mobile suite reports zero serious or critical axe findings. The 390 px layout has no horizontal page overflow, all tested controls meet 44 × 44 CSS px, all four tabs fit, focus is visible, and reduced motion is respected.
- Earlier verification findings remain fixed: stdin `pack - --format ndjson --stream` emits ordered chunks, and demo/footer touch targets remain at least 44 px.
- Visual identity remains the original blueprint drafting sheet described in `.factory/design.md`; no generic template or replacement artwork was introduced.

## Evidence summary

- Clean clone claim run: 25/25 passed.
- Clean clone `npm test`: 22 unit/consumer tests and 27 browser tests passed; 3 project-conditional skips.
- Live browser suite: 27 passed; 3 project-conditional skips.
- Live route status: `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, package, robots, and sitemap returned 200; `/missing-sheet` returned 404.
- Live verifier: no console errors; one `h1`; one `main`; `lang=en`; no missing alt text or unlabeled buttons.
- Live mobile Lighthouse: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.4 s; CLS 0; TBT 0 ms.
- Production assets: initial JavaScript 8.81 KB gzip; CSS 4.31 KB gzip; hero 98.3 KB.
- Screenshots: `.factory/evidence/screenshot-desktop.png`, `.factory/evidence/screenshot-mobile.png`, `.factory/evidence/polish-1-demo/screenshot-desktop.png`, `.factory/evidence/polish-1-demo/screenshot-mobile.png`.

No finding from the review or earlier verification records remains unresolved.
