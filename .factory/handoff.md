# Result Envelope v0.1.0 repair handoff

Completed 2026-08-28 for work order `mcp-result-envelope-repair-1` against verifier report commit `8f2788a6b4b26aa0b214a3bccd6e21484dfe225d` and candidate `3c80be2bbc2559e1cac5dbe960fffb59b3332f6a`.

## Repaired findings

- The CLI parser now treats a literal `-` as the documented stdin file marker. The exact command `printf '{"id":1}\n{"id":2}\n' | result-envelope pack - --format ndjson --stream` exits 0 and emits manifest, summary, schema, and page chunks in order.
- Demo actions and footer links now have explicit 44 px minimum hit areas. At 390 px, Reset demo is 91.5 × 44, Start for real is 93 × 44, Privacy and Terms are 44 × 44, and Built by Param Factory is 126.1 × 44 CSS px.
- The full audit also found and fixed dark-theme contrast on filled blueprint and revision controls. Product-specific foreground tokens now keep both color treatments accessible.

## Regression coverage

- `tests/unit/package.test.ts` runs the documented NDJSON stdin invocation against the built CLI, asserts exit 0 and empty stderr, parses every output line, and checks the exact chunk order.
- `tests/e2e/site.spec.ts` measures each verifier-reported control and every other visible interactive element at a 390 px viewport, requiring both dimensions to be at least 44 px.
- The route-wide axe sweep now covers light and dark treatments across `/`, `/demo`, `/inspect`, `/privacy`, `/terms`, and the designed missing route.
- `.factory/claims.json` points the stream-order claim at the public CLI regression and builds the CLI before that isolated claim test.

## Verification evidence

- Clean install: `npm ci` installed 93 packages with zero known vulnerabilities.
- Complete gate: `npm test` passed typecheck, clean library and site builds, 14 unit/CLI tests, and 14 browser runs; two tests skipped only on their documented non-target profiles.
- Claims: all 11 commands in `.factory/claims.json` passed independently.
- Package: `npm run pack:check` passed. The tarball is 9,683 bytes, contains 10 declared files, and worked from a fresh external consumer through ESM import, CommonJS require, cursor paging, async streaming, and the stdin CLI command.
- Browser: desktop and 390 px mobile passed the full route, navigation, form error, paging, keyboard tab, privacy, demo-memory, offline reload, overflow, console, and accessibility checks.
- Accessibility: Playwright axe found zero serious or critical violations on all six route states in light and dark. The first keyboard Tab reaches the skip link with a 3 px focus outline. Reduced-motion mode has no running animation.
- Privacy: the complete demo edit flow made same-origin requests only, never included edited input in a URL, and left cookies, local storage, and session storage empty.
- Factory URL probe against the local production build returned 200 with no console errors, a title, `lang`, one h1, one main, alt text, and labeled buttons.
- Mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.668 s, CLS 0, TBT 76 ms. Summary: `.factory/evidence/lighthouse-summary.json`.
- Initial payload: JavaScript 8,635 bytes gzip; CSS 4,273 bytes gzip; hero WebP 98,348 bytes.

## Build, package, and deploy

```sh
npm ci
npm test
npm run build:site
npm run pack:check
/opt/fleet/lib/deploy-static.sh mcp-result-envelope dist/site
```

The static deployment root remains `dist/site`, with `index.html` at its root. The npm artifact remains a zero-runtime-dependency ESM + CommonJS + declarations library with its CLI. Registry publication remains factory-owned and was not attempted.

## Known constraints

- Cursors identify a deterministic result snapshot; callers still enforce authorization before returning pages.
- Stable paging assumes the caller reruns the same ordered query with the same options.
- `streamEnvelope` is an async iterator and does not add streaming support to MCP transports.
- The brief’s 20-response, 50%-token benchmark remains post-release research. No product copy makes that unverified claim.
