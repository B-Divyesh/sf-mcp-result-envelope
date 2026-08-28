# Independent verification — FAIL

Verified 2026-08-28 against candidate commit `3c80be2bbc2559e1cac5dbe960fffb59b3332f6a` and `https://mcp-result-envelope.sociobot.in`.

## Release decision

**FAIL.** The documented CLI stdin workflow does not work. This is a public, core library/CLI path, so passing unit and browser tests do not make the candidate releasable.

## Blocking defects

### High — documented NDJSON/stdin CLI workflow rejects its input marker

The README documents:

```sh
cat results.ndjson | result-envelope pack - --format ndjson --stream
```

In a clean packed-package consumer and against the candidate build, `-` is parsed as an option rather than the documented stdin file marker. The command exits `2` and writes:

```
result-envelope: Unknown option: -. Run with --help.
```

Reproduction:

```sh
printf '{"id":1}\n{"id":2}\n' | node dist/cli.js pack - --format ndjson --stream
```

Expected: four NDJSON chunks (manifest, summary, schema, and page) on stdout. Actual: no packet, exit 2. `node dist/cli.js pack examples/orders.json --page-size 5 --max-bytes 4096 --compact` succeeds, which isolates the defect to the documented stdin path.

### Medium — mobile controls miss the required 44 px touch-target minimum

At a 390 px viewport on `/demo`, visible controls measure below the required 44 px minimum: **Reset demo** (92 × 34), **Start for real** (93 × 34), and footer links **Privacy** (41 × 19), **Terms** (34 × 19), and **Built by Param Factory** (126 × 14). This violates the attached accessibility acceptance baseline even though axe has no serious/critical violations.

## Required claims (clean install, demo entry point)

All 11 manifest commands passed from `npm ci`:

| Claim | Result |
| --- | --- |
| free-license | PASS |
| local-processing | PASS |
| json-types | PASS |
| summary-no-rows | PASS |
| page-caps | PASS |
| stable-cursors | PASS |
| stream-order | PASS |
| package-no-network | PASS |
| cli-demo | PASS |
| offline-reload | PASS |
| demo-memory | PASS |

## Other evidence

- `npm test`: PASS — typecheck, clean production build, 13 unit tests, and the full Playwright suite passed (`test-results/.last-run.json` reports `passed`).
- `npm run pack:check`: PASS — package is 9.7 kB and contains the declared library, CLI, examples, README, and MIT license.
- Clean packed-consumer exercise: ESM import created typed/provenanced two-page data, cursor resolution returned the second page, streamed order was manifest → summary → schema → page → page, and an invalid cursor returned `INVALID_CURSOR`.
- Cold live first read: `Pack large tool results into stable pages`; it names MCP/CLI authors, has one visible **Try it with sample data** action, explains it loads 12 orders, and the click opened `/demo` with the sample banner and 12 rows. This passes the plain-words/demo requirement.
- Candidate/live parity: SHA-256 values for HTML, `index-CbNanz6m.js`, and `index-BimxqOi2.css` exactly match locally built `dist/site` and the live URL.
- Live privacy/browser checks: demo edit performed entirely same-origin; no page or console errors; restrictive `connect-src 'self'` CSP; no analytics or third-party requests observed.
- Live desktop + 390 px route sweep (`/`, `/demo`, `/inspect`, `/privacy`, `/terms`, missing route): one `h1`, one `main`, no horizontal overflow, correct route titles, and zero axe serious/critical violations. Keyboard first Tab lands on the skip link with a visible 3 px focus outline. Reduced-motion mode had zero running animations.
- Live service worker controlled the page; static hashed JS is cached `max-age=31536000, immutable`; HTML is `max-age=30`; HTTPS, HSTS, nosniff, referrer policy, CSP, and permissions policy headers are present.
- There are no product server/API endpoints, authentication, or product-unlock endpoints in this static deployment; rate-limit and Entra checks are therefore not applicable.

## Retest criteria

Fix CLI argument parsing so a literal `-` is accepted as stdin, add an observable regression test that exercises the exact documented NDJSON command and asserts the emitted chunk sequence, and make all interactive mobile controls at least 44 × 44 CSS px. Re-run the claim manifest, `npm test`, `npm run build`, packed-consumer test, and live parity checks.
