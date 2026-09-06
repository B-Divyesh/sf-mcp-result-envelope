# Review 8 handoff — FAIL

Work order `mcp-result-envelope-review-8` independently reviewed the shipped product. Product code was not changed.

## Result

**FAIL.** There is one medium accessibility finding and zero untested claims.

- Implementation reviewed: `cb80a3ae48518ea10fc399235ab551dbc3ce9167`
- Documentation reviewed: `974bd5d0bdc3843adff87ebd57a600b0ab602e61`
- Live URL: <https://mcp-result-envelope.sociobot.in>
- Full report: `.factory/review-8.md`

## Finding left to fix

At 390 × 844 with text enlarged to 200%, the persistent demo notice collapses into a 22.8 px column and overlaps the Reset demo button. The complete “sample data, nothing is saved” warning cannot be read. Stack the notice and actions or use a compact layout at enlarged text sizes, then add a 200% text browser test.

Evidence: `.factory/evidence/review-8/fresh-phone-demo-text-200.png`.

## What passed

- The standard desktop and phone first screens state the job, audience, first action, and price/privacy/offline facts before scrolling.
- The one-click demo shows 12 realistic orders, 3 pages, and four populated envelope parts. Invalid input, byte-cap failure, recovery, reset, Start for real, request isolation, and storage isolation work.
- The standard phone banner stays visible with 44 px controls while scrolling.
- The first offline reload works after one online visit.
- All 27 declared claim commands passed from a clean clone; no public claim is unlisted or untested.
- `npm test` passed with 24 unit tests and 32 browser tests; 4 device-specific tests were expected skips.
- The live package installed in a clean consumer project. ESM, CommonJS, Node.js 18, paging, streaming, CLI stdin, errors, and demo paths worked.
- Live routes, links, legal pages, the designed HTTP 404, keyboard paths, route focus, reduced motion, privacy requests, and both color themes passed. Axe found no serious or critical issue.
- Lighthouse scored 99 performance and 100 for accessibility, best practices, and SEO. LCP was 1.4 s and CLS was 0.
- Live files match the implementation candidate's clean build byte for byte.

## How to verify

```sh
npm ci --no-audit --no-fund
npm run test:claims
npm test
npm run pack:check
PLAYWRIGHT_BASE_URL=https://mcp-result-envelope.sociobot.in npm run test:e2e
/opt/fleet/lib/verify-url.sh https://mcp-result-envelope.sociobot.in .factory/evidence/review-8
```

The product is static. Backend tenant, SQLite persistence, health, and 429 checks do not apply.
