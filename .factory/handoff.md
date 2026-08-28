# Perfection-loop round 3 handoff — PASS

Work order `mcp-result-envelope-polish-3` repaired review commit `969938422dad61964acfb851c25ce01177dee2c4`. Product commits `5576841ba1362bf7654be0641bbd91a5c7e13b47` and `2449350` are pushed to `origin/main` and deployed at <https://mcp-result-envelope.sociobot.in>.

## What changed

- Put a dynamically built sample result above the phone editor. At 390×844 and `scrollY=0`, visitors see 12 rows, 3 pages, and populated manifest/summary content.
- Rewrote the audience sentence, row/byte-cap caption, cursor instruction, and third first-screen fact. Price, privacy, and offline use now fit both tested first viewports.
- Added `stream-api` and `cli-help` claim contracts and removed the hidden `--json` CLI alias.
- Made `api-shape` prove every documented manifest, summary, schema/nullability, and page property.
- Retained isolated in-memory demo/reset/exit behavior, versioned package distribution, real routes, route titles/canonicals, focus announcements, legal links, designed 404, blueprint identity, and service-worker offline support.
- Updated the design record, demo documentation, complete copy audit, catalog sentence, changelog, and deployment instructions.

Every review finding is mapped in `.factory/polish-3.md`.

## Verification

Run locally:

```sh
npm ci
npm run test:claims
npm test
npm run pack:check
```

Clean clone `/tmp/mcp-result-envelope-polish3-final-KMLYYW/repo`:

- `npm ci`: 93 packages, 0 vulnerabilities.
- `npm run test:claims`: 27/27 passed.
- `npm test`: typecheck and production build passed; 23/23 unit/consumer tests passed; Playwright 29 passed with 3 intentional project-only skips.
- Browser suite covers demo reset/isolation, same-origin privacy, zero storage, offline reload, keyboard tabs/paging, error/empty states, route metadata/focus/legal/404 behavior, 44 px targets, viewport boundaries, both color schemes, and axe serious/critical checks.
- `npm run pack:check`: 9.9 kB tarball, 47.6 kB unpacked, 10 declared files.

Production:

- Work-order build `npm ci && npm test && npm run build:site`: passed.
- Azure Static Web Apps deployment ID: `257bcfae-25a9-49b9-b554-bfa3891a6680`.
- `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, robots, sitemap, icons, social card, and tarball return 200; `/missing-sheet` returns 404.
- Live Playwright: 29 passed, 3 intentional project-only skips; zero serious/critical axe violations and no console/page errors.
- Cold demo: result preview bottom 599 px inside the 844 px viewport; document width 390 px; zero cookies/local/session storage; requests only to the product origin.
- Live Lighthouse mobile: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.44 s, CLS 0, TBT 24 ms, transfer 114,226 bytes.
- Initial assets: JavaScript 9.12 kB gzip, CSS 4.64 kB gzip, hero 98.3 kB.
- Live JS/CSS SHA-256 hashes match the deployed `dist/site`; live and local tarball SHA-256 is `3a18f10cc189eea22e556260f31d934fd41bdd63d463f1012633a561366619ec`.
- A new live consumer installed the tarball, imported the API, iterated `manifest → summary → schema → page → page`, and ran the CLI demo.

Evidence is in `.factory/evidence/polish-3/`, including clean logs, deployment logs, live screenshots, route and header checks, asset parity, consumer install, browser results, and Lighthouse reports.

## Known gaps and next steps

None. Registry publication remains factory-owned and is not advertised; the tested versioned release tarball is the supported install artifact.
