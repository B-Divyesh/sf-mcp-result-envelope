# Polish 1 handoff — complete

Work order `mcp-result-envelope-polish-1` repaired candidate `a673782835f9bbe2e0f860b15751a3f158dd3d45` against every finding in `.factory/review-1.md`. No earlier review or polish report exists; both earlier verification findings were also retested.

## What changed

- Replaced broken public-registry commands with a versioned npm tarball shipped by the static site. The production download installs into a clean npm project and exposes ESM, CommonJS, declarations, and the CLI.
- Rewrote the first-screen audience/outcome copy and standardized the product noun as “packet.”
- Made `/?demo=1` the primary one-click path. It loads and builds 12 sample orders with a persistent demo/reset/exit banner and memory-only isolation.
- Expanded the claims contract to 25 claims with exactly one tagged behavioural test per claim and added `npm run test:claims`.
- Added generated entry documents for every real route, complete dynamic metadata updates, a real styled HTTP 404, legal-link coverage, focus announcements, and live-suite support.
- Kept the blueprint drafting-sheet identity and refined the 390 px tabs so all four parts remain visible.
- Updated the copy audit, demo documentation, changelog, catalog description, verification evidence, and finding map in `.factory/polish-1.md`.

## Verification

From a clean clone:

```sh
npm ci
npm run test:claims
npm test
npm run pack:check
```

Results:

- Claims: 25/25 passed independently.
- Full gate: typecheck passed; production build passed; 22/22 unit and consumer tests passed; 27 browser tests passed with 3 intentional project-only skips.
- Package dry run: 9.8 KB tarball, 10 declared files, zero runtime dependencies.
- Build output: `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`, `dist/cli.js`, and routed `dist/site/` including the package tarball and `404.html`.
- Initial site payload: 8.81 KB gzip JavaScript and 4.31 KB gzip CSS. Hero image: 98.3 KB.

Production deployment and cold checks:

- URL: `https://mcp-result-envelope.sociobot.in/`
- Direct demo: `https://mcp-result-envelope.sociobot.in/?demo=1`
- Package: `https://mcp-result-envelope.sociobot.in/downloads/mcp-result-envelope-0.1.0.tgz`
- Live browser suite: 27 passed, 3 project-conditional skips across desktop and 390 px mobile.
- Live route statuses: five product/legal routes, package, robots, and sitemap returned 200; an unknown route returned 404 with the designed page.
- Live package consumer: install passed; ESM import returned the expected two-page summary; installed CLI demo created a fresh temporary packet.
- Package parity: deployed and local tarballs share SHA-256 `b3e3617272754d87bc2f3c3291bc053ee358dcf21e438acc686b88168648da99`.
- Live verifier: no console errors; valid title and `lang`; one `h1`; one `main`; no missing alt text or unlabeled buttons.
- Live axe coverage: zero serious or critical findings across every route, both themes, and the 404.
- Live mobile Lighthouse: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.4 s, CLS 0, TBT 0 ms.
- Security headers: HSTS, self-only CSP, nosniff, strict-origin referrer policy, and restrictive permissions policy present.

Evidence is in `.factory/evidence/` and the finding-by-finding record is `.factory/polish-1.md`.

## Known gaps and next steps

None for this work order. The npm registry name remains unpublished, so the product truthfully uses its tested, versioned release tarball. Registry publication remains a factory release operation and is not advertised as complete.
