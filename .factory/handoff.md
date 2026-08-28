# Result Envelope v0.1.0 handoff

Completed 2026-08-28 for work order `mcp-result-envelope-build-1`.

## What shipped

- A zero-runtime-dependency TypeScript library with ESM, CommonJS, and declaration outputs.
- `createEnvelope`, `getEnvelopePage`, and `streamEnvelope` as the complete public API.
- Typed manifests, compact summaries, inferred JSON schemas, provenance, deterministic cursors, and bounded pages.
- Enforced row, page-size, and serialized byte caps with clear typed errors.
- A JSON and NDJSON CLI with `pack`, `page`, `--stream`, `--help`, and `demo` paths.
- A bundled 12-order sample. The CLI demo writes into a fresh operating-system temporary directory.
- A local browser inspector with sample and empty modes, editable JSON, cap controls, output tabs, paging, reset, and offline reload.
- Static routes for `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, and a designed 404 state.
- The original blueprint drafting-sheet identity, generated hero, social card, favicon, light and dark treatments, and reduced-motion fallback.
- Claim inventory, copy audit, demo contract, README, changelog, MIT license, sitemap, robots file, CSP, and service worker.

## Build and run

```sh
npm install
npm test
npm run build
npm run dev
```

- Required static-site command: `npm run build:site`
- Deploy directory: `dist/site`
- Deploy entry: `dist/site/index.html`
- Package readiness: `npm run pack:check`
- CLI sandbox: `node dist/cli.js demo`
- Browser sandbox: `/demo` or `/?demo=1`

## Verification

- `npm test`: passed. This includes type checking, a clean build, 13 unit and CLI tests, and 14 browser checks. Two project-specific checks skip on their non-target profile.
- Desktop and 390 px Chromium: passed navigation, keyboard tabs, empty state, invalid input, paging, reset, privacy, offline reload, and no-upload checks.
- Axe Playwright sweep: zero serious or critical violations across all six route states in both browser profiles.
- `npx @axe-core/cli / /demo`: zero violations on both pages.
- Factory `verify-url.sh`: 200 response, no console errors, title and language present, one h1, one main, no missing alt text, and no unlabeled buttons.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100. LCP 1.7 s, CLS 0, TBT 30 ms.
- Initial site payload: 8.64 KB JavaScript gzip, 4.23 KB CSS gzip, 97 KB hero WebP.
- `npm pack --dry-run`: passed; 9.6 KB tarball with ESM, CommonJS, declarations, CLI, examples, and legal files.
- ESM import, CommonJS require, CLI JSON output, and executable mode: checked directly.
- `npm audit`: zero known vulnerabilities.

Evidence is in `.factory/evidence/`. Claim commands and sandbox details are in `.factory/claims.json`.

## Known gaps and next steps

- The factory still needs to publish the npm package and deploy `dist/site`; no registry or infrastructure action was taken here.
- Cursors identify a deterministic result snapshot but are not authorization tokens. Callers must apply access control before returning pages.
- Stable paging assumes the caller reruns the same ordered query with the same options.
- `streamEnvelope` is an async iterator. It does not add streaming support to MCP transports.
- The brief’s 20-response, 50%-token benchmark remains post-release validation. The site makes no unverified token-savings claim.
