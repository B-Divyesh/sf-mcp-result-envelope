# Repair 2 handoff — PASS

Work order `mcp-result-envelope-repair-2` repaired the two Review 7 findings
and redeployed the static site.

## Product and first action

Result Envelope is for MCP and CLI authors who need large structured output in
stable, capped pages. The first action is **Try it with sample data**; it loads
12 realistic orders and builds the populated envelope without changing real
input.

Fresh 1440 × 900 desktop and 390 × 844 phone checks showed that job, audience,
action, and the three facts before scrolling. A fresh phone demo at `/?demo=1`
showed 12 rows and 3 pages. After scrolling to the editor and page controls,
its Demo banner, Reset demo, and Start for real controls were still in the
viewport. Screenshots are in `.factory/evidence/repair-2/`.

## What changed

- The `offline-reload` claim now starts in its own new browser context, visits
  the demo once, waits for service-worker control, disables the network, then
  reloads and proves the sample heading and 12 rows. There is no intervening
  online reload.
- The service worker now precaches the actual hashed JS and CSS assets emitted
  by the site build. It stores successful first-visit responses with
  `cache: "reload"` and uses same-origin cache matching that handles Vite's
  `Vary: Origin` response. This makes the first offline reload use the real
  application shell instead of a mismatched cached response.
- The phone Demo banner is a compact sticky two-column control bar. The new
  phone regression test scrolls through the editor and output, proves the
  banner actions remain visible, then uses Reset demo to restore 12 rows.
- `.factory/demo.md` now documents the persistent phone banner behavior.

## Verification

Implementation deployed: `cb80a3ae48518ea10fc399235ab551dbc3ce9167`.
This is separate from the later documentation/evidence commit containing this
handoff.

From a clean clone of that implementation at
`/tmp/mcp-result-envelope-repair2-ZS6KPy/repo`:

```sh
npm ci --no-audit --no-fund
npm run test:claims
npm test
npm run pack:check
```

- All 27 declared claim commands passed. The repaired offline claim passed
  from a first visit.
- `npm test` passed: 24 unit/consumer tests and 32 browser tests; 4 are
  intentional device-specific skips.
- `npm pack --dry-run` passed: 10 files, 9.9 kB package, 47.6 kB unpacked.
- The build completed with 9.13 kB gzip JavaScript, 4.71 kB gzip CSS, and a
  98 kB hero image.

The durable product deployment completed for
`https://mcp-result-envelope.sociobot.in` (deployment
`1f7656f3-1e69-4a48-9e93-2319f12bfd2b`). The live JavaScript, CSS, and service
worker hashes match the clean local build. The live browser suite also passed:

```sh
PLAYWRIGHT_BASE_URL=https://mcp-result-envelope.sociobot.in npm run test:e2e
/opt/fleet/lib/verify-url.sh https://mcp-result-envelope.sociobot.in .factory/evidence/repair-2
```

The live browser suite passed 32 tests with the same 4 expected skips,
including the repaired first-visit offline claim and phone scrolling test.
Playwright's Axe integration found no serious or critical issue across public
routes and themes. The URL verifier returned HTTP 200, no console errors, one
title, `lang="en"`, one `h1`, a main landmark, no missing image alt text, and
no unlabeled buttons. Its raw output is
`.factory/evidence/repair-2/verify.json`.

The browser checks also covered the populated and reset demo, invalid JSON,
byte boundary and recovery, keyboard/focus, reduced motion, privacy requests,
route titles and legal pages, styled expected 404, and the installed
library/CLI consumer path. The static product has no backend, tenant,
database, payment, or billing flow; those checks do not apply. It remains free
and MIT licensed, so no billing-offer metadata is required.

Earlier review findings remain resolved: the downloadable package installs and
runs, the public term is consistently **envelope**, the mobile demo shows
populated output, cap/cursor/source-details copy is plain, and the CLI stdin
and phone touch-target paths are covered. Review 7's two findings are covered
by the new outcome-based tests above.

## Remaining note

No product defect is known. A fresh live Lighthouse audit could not be
completed in this worker because the supplied Chromium failed to connect before
the audit began, even with its explicit executable path. This is an environment
launcher limitation, not a passing score. The complete live Playwright
accessibility suite and URL verifier did run successfully.

The verb-first catalog description is in `.factory/catalog-description.txt`
and was copied to `/work/.evidence/catalog-description.txt` as required.
