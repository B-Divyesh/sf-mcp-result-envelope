# Independent verification 2 — PASS

Verified 2026-08-28 against candidate commit `a673782835f9bbe2e0f860b15751a3f158dd3d45` and production URL <https://mcp-result-envelope.sociobot.in>.

## Result

**PASS.** The npm library, CLI, local inspector, and live deployment meet the researched brief's smallest useful product: typed JSON becomes a manifest, row-free summary, schema, bounded stable pages, and ordered stream chunks. No release-blocking defects were found.

## Cold first read

On a fresh desktop and 390 px mobile visit, the first screen plainly says: **"Pack large tool results into stable pages."** It identifies the audience as MCP and CLI authors who need rows reachable without flooding a model's context. The first prominent action is **"Try it with sample data"**, with adjacent text explaining it loads 12 orders in the inspector. This satisfies the first-read and one-click sample-demo requirements.

## Clean-checkout gates

- `npm ci`: passed; 93 packages installed; audit reported 0 vulnerabilities.
- Every command in `.factory/claims.json` was run independently after the clean install: all 11 passed.
  - `free-license`, `local-processing`, `json-types`, `summary-no-rows`, `page-caps`, `stable-cursors`, `stream-order`, `package-no-network`, `cli-demo`, `offline-reload`, `demo-memory`.
- `npm test`: passed on the clean rerun: `tsc --noEmit`, clean `tsup` library build, Vite site build, 14/14 unit and CLI tests, and 14 passing browser tests (2 documented non-target-project skips).
- No lint script is defined. `npm run build` produces `dist/` and `dist/site/`.
- `npm run pack:check`: passed. The ready-to-publish tarball is 9.7 kB (46.8 kB unpacked), contains 10 declared files, and has no runtime dependencies.
- Clean-consumer smoke test: installed `/tmp/mcp-result-envelope-0.1.0.tgz` into a new npm project. ESM `createEnvelope`, `getEnvelopePage`, and `streamEnvelope` returned the expected `manifest,summary,schema,page,page` order; CommonJS `require` also worked; the installed `result-envelope demo` created a new temporary packet.

## Functional and boundary evidence

- Claim and unit tests cover type preservation (number, boolean, null, array, nested object), provenance, row order, row/byte caps, deterministic/rejected cursors, row-free summaries, no package network access, ordered NDJSON streaming, and CLI demo output.
- Live `/demo` built an envelope from a typed nested row, showed one row and a schema tab, reported a clear invalid-JSON alert, reset to 12 sample rows, and entered the empty real-input inspector after **Start for real**.
- The documented stdin invocation is exercised by `@claim:stream-order`: `printf '{"id":1}\n{"id":2}\n' | result-envelope pack - --format ndjson --stream` succeeds and emits ordered chunks.

## Live deployment, privacy, and policies

- Fresh local build and live production SHA-256 match exactly for `index.html`, `assets/index--rcs8uP5.js`, `assets/index-o5C98Kbi.css`, and `assets/result-envelope-blueprint.webp`.
- `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, and the designed missing route all return HTTP 200. Every discovered internal link returned 200; the only external destinations are the Param Factory site and a `mailto:` contact.
- A live demo flow made requests only to `https://mcp-result-envelope.sociobot.in`; edited input never appeared in a request URL. It left 0 cookies, `localStorage` 0, and `sessionStorage` 0. No analytics, third-party scripts, fonts, or model endpoints were observed.
- Live `/demo` registered its service worker and reloaded offline with the sample envelope intact (heading `Inspect a sample result envelope`, 12 rows).
- Security responses include HSTS, CSP restricted to `'self'`, `nosniff`, strict-origin referrer policy, and a restrictive permissions policy. The hashed JS asset has `Cache-Control: public, max-age=31536000, immutable`; `sw.js` is `no-cache`.
- The app is static and exposes no product/server API endpoint, sign-in path, payment path, or factory-unlock endpoint. Rate-limit and Entra checks are therefore not applicable.

## UX, accessibility, and performance

- Independent Playwright + axe sweep of all six public routes in both light and dark modes: 1 `<main>`, 1 `<h1>`, and 0 serious/critical violations on every state; no console or page errors.
- At a 390 px viewport, document width was exactly 390 px (no horizontal overflow). The skip link showed a 3 px visible focus outline. Reduced-motion computed animation duration was effectively zero (`1e-05s`).
- Keyboard paging, tabs, error recovery, demo reset, and route-focus behavior are covered by the browser suite.
- Built initial assets are 8.64 kB gzip JavaScript and 4.26 kB gzip CSS; the hero is 98.3 kB. These are within the stated static-product budgets.

## Defects by severity

None found.

## Note on repeatability

One initial fully parallel browser-suite invocation reported a single accessibility-test failure while its final parallel worker was still running. Re-running that test alone passed, and a fresh complete `npm test` rerun completed with 14 passing browser tests and 2 expected skips. No reproducible product failure remained.
