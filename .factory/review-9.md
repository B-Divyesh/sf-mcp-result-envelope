# Review 9: Pack large tool results into stable pages — PASS

Reviewed 2026-09-06 at <https://mcp-result-envelope.sociobot.in> for work
order `mcp-result-envelope-review-9`.

- Verdict: **PASS**
- Finding count: **0**
- Untested claim count: **0**
- Implementation candidate: `4dfcaaae551208e7b95046280aafebed68df471f`
- Documentation candidate: `50552734c18cefb472f866519e3c7ebfed1b12f9`
- Review baseline: `b7d14851d8eba1866195772a68a282a42e4f02cb`
- Live URL: <https://mcp-result-envelope.sociobot.in>

The implementation candidate is the last product-code change. The
documentation candidate records the repaired product and handoff. The review
baseline adds only the independent Verification 4 report and evidence. A diff
from the implementation candidate through the baseline contains factory
reports, evidence, copy audit, and handoff files only. The clean build matches
the live product byte for byte.

## Verdict

**PASS — zero findings of every severity and zero untested claims.**

The npm library, CLI, local inspector, one-click sample, privacy behavior,
offline path, routes, and accessibility checks all pass. No public statement
is missing from the claim manifest, and every declared command completed from
a clean checkout.

## Job, audience, and first action

Fresh 1440 × 900 desktop and 390 × 844 phone contexts began at scroll position
zero with no horizontal overflow. Before scrolling, both stated:

- Job: **Pack large tool results into stable pages**.
- Audience: MCP and CLI authors who need size-limited output that keeps types,
  order, and source details.
- First action: **Try it with sample data**.

The adjacent sentence says the action loads 12 orders and builds their
envelope. The three visible facts say the product is free and MIT licensed,
runs in the tab with no uploads, and works offline after the first visit. On
phone, the action ended at 437 px and the last fact at 588 px inside the 844 px
viewport. On desktop, the last facts ended at 719 px inside the 900 px
viewport.

Evidence:

- `.factory/evidence/review-9/desktop-home.png`
- `.factory/evidence/review-9/phone-home.png`

## Demo, normal use, errors, and recovery

The first action opened `/?demo=1` in one click. Desktop and phone immediately
showed the persistent **Demo — sample data, nothing is saved** label, **Reset
demo**, **Start for real**, 12 rows, 3 pages, envelope id
`re_9989164a3bee94d7`, and summary `12 rows · 6 fields · 3 pages`. Manifest,
summary, schema, and page tabs all contained realistic output.

The direct live checks covered these paths:

- Replacing the sample with one private typed row built a one-row envelope.
- **Reset demo** restored the 12 orders and removed the private value.
- **Start for real** opened `/inspect` with empty input.
- Empty input explained that JSON must be pasted or the sample loaded.
- Malformed JSON explained that the syntax must be fixed.
- A 500-character field at a 256-byte cap reported that row 0 did not fit and
  said to raise the cap or remove large fields.
- Raising the cap to 2,048 bytes recovered and built one row.
- Arrow Left from the Page tab focused Schema; paging, reset, links, and form
  actions also passed by keyboard in the full suite.

The phone demo result is visible before the long editor. Its sticky banner
remained at y = 0 while the editor was in use. At 200% text, the document
remained 390 px wide, the complete label and both 44 px actions stayed visible,
and the notice did not overlap either action.

Evidence:

- `.factory/evidence/review-9/desktop-demo.png`
- `.factory/evidence/review-9/phone-demo.png`
- `.factory/evidence/review-9/phone-demo-text-200.png`

## Privacy, offline behavior, and accessibility

The edited private value appeared in no request. Every observed demo request
was a same-origin GET with no body. Cookies, local storage, and session storage
were empty before and after leaving demo mode. Reloading the real inspector
also clears its tab-only input. The site loads no analytics, advertising,
tracking scripts, third-party fonts, model endpoint, or credential.

The declared offline test used its own fresh browser context: one online visit
installed the service worker, then the first offline reload reopened the
populated 12-row demo. `sw.js` is served with `Cache-Control: no-cache`, so a
new service-worker version can be checked on later visits. No broader update
promise is made.

The complete live Playwright run passed **33 tests with 5 expected
project-specific skips**. It covered desktop and phone, every public route in
light and dark modes, route focus and browser Back, keyboard tabs, touch
targets, reduced motion, offline reload, storage, requests, 200% phone text,
and route metadata. Axe reported no serious or critical issue. The URL
verifier reported HTTP 200, no console errors on the landing page, `lang=en`,
one title, one `h1`, one `main`, complete image alternatives, and labeled
buttons. Its output is `.factory/evidence/review-9/verify.json`.

## Routes, links, headers, and performance

`/`, `/demo`, `/inspect`, `/privacy`, and `/terms` returned 200 with distinct
plain titles, one `h1`, one `main`, canonical metadata, and the consistent
header and footer. `/missing-sheet` deliberately returned HTTP 404 with the
designed page, correct title, and a return link. That response is expected and
is not a defect.

Every discovered HTTP(S) link returned 200 except the missing page's own
`#main` skip link, which correctly keeps the current 404 response. The contact
link is `mailto:`. Robots and sitemap files list all five public routes.

The live headers include a self-only CSP, header-only `frame-ancestors 'none'`,
HSTS, `nosniff`, strict referrer policy, and a restrictive permissions policy.
No CSP or load error occurred on a normal page. A direct console observation
of the deliberately requested `/missing-sheet` recorded only its expected 404
resource response.

Fresh Lighthouse results:

| Category or metric | Result |
| --- | ---: |
| Performance | 99 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| Largest contentful paint | 1.49 s |
| Total blocking time | 96 ms |
| Cumulative layout shift | 0 |

The full result is
`.factory/evidence/review-9/lighthouse-live.json`. The build reports 9.13 kB
gzip JavaScript and 4.75 kB gzip CSS; the hero is 98,348 bytes. These are below
the product budgets.

## Claims and clean-checkout gates

A clone at `/tmp/mcp-result-envelope-review9-0gVgUp/repo` was created from the
review baseline. After `npm ci --no-audit --no-fund`, every command in
`.factory/claims.json` ran through `npm run test:claims`.

| Claim group | Result |
| --- | --- |
| `free-license`, `installable-package`, `demo-sample`, `local-processing`, `browser-no-storage`, `site-no-tracking` | PASS |
| `json-types`, `api-shape`, `inspector-parts`, `envelope-details`, `summary-no-rows`, `page-caps`, `row-cap`, `row-too-large`, `input-validation`, `stable-cursors` | PASS |
| `stream-api`, `stream-order`, `package-no-network`, `zero-runtime-dependencies`, `node-support`, `cli-demo`, `cli-help`, `cli-io` | PASS |
| `offline-reload`, `demo-memory`, `build-output` | PASS |

Result: **27/27 claim commands passed**. Each claim has exactly one matching
tagged outcome test. The landing page, README, privacy page, terms page, demo
documentation, package metadata, and CLI help were cross-checked; no missing,
false, incomplete, or untested public claim was found.

Other clean-checkout results:

- `npm test`: PASS. Type checking and production build passed; 24 unit and
  consumer tests passed; 33 browser tests passed with 5 expected skips.
- `npm run pack:check`: PASS. The package contains 10 files, is 9.9 kB packed,
  and is 47.6 kB unpacked.
- `npm run build`: PASS. It created the library, routed site, 404 page, and
  versioned tarball under `dist/`.

## Installed release and live candidate

The exact live tarball installed as the only dependency in a new temporary npm
project. ESM and CommonJS imports worked and preserved booleans. The ESM API
made a two-row, two-page envelope, and `streamEnvelope` emitted `manifest`,
`summary`, `schema`, `page`, `page`. CLI help listed the documented commands
and flags. `result-envelope demo` wrote a complete 12-order envelope to a new
`result-envelope-demo-*` directory.

All 17 publicly served files from the clean site build matched production
byte for byte: five route documents, the designed 404, JavaScript, CSS, source
map, service worker, favicon, touch icon, hero, social card, tarball, robots,
and sitemap. The 404 body matched while retaining its required HTTP 404
status. `staticwebapp.config.json` is deployment configuration, not a public
file.

## Earlier findings

Every earlier review, verification, polish, repair, and handoff record was
inspected. Current production and clean-checkout evidence proves these
dispositions:

| Earlier finding | Current disposition |
| --- | --- |
| Verification 1 CLI stdin defect | Fixed. The exact NDJSON stdin command is covered by `stream-order`; it emitted the ordered chunks. |
| Verification 1 phone controls below 44 px | Fixed. The phone suite measured every visible control, including the demo and footer actions. |
| F-1-1 unavailable public npm package | Fixed. The documented versioned live tarball returned 200, installed alone, imported through ESM and CommonJS, and ran its CLI. |
| F-1-2, F-2-2, F-3-2, F-3-3, F-3-4 incomplete claim coverage | Fixed. All 27 claims have one outcome tag and passed, including async iteration, complete CLI help, schema nullability, metadata, install, and CLI I/O. |
| F-1-3 and F-4-1 competing `contract` or `packet` terms | Fixed. Current public routes use **envelope** for the returned object. |
| F-2-1 and F-3-1 phone demo hid the result | Fixed. The first phone demo viewport shows 12 rows, 3 pages, manifest identity, and summary before the editor. |
| F-2-3 and F-3-5 metaphor instead of cap facts | Fixed. Current copy directly names row and byte caps. |
| F-2-4 and F-3-6 unclear cursor instruction | Fixed. Current copy says to use the cursor to fetch the next page. |
| F-3-7 dense audience wording | Fixed. The 16-word audience sentence uses plain `size-limited output` and `source details`. |
| F-3-8 omitted or clipped first-screen facts | Fixed. Price, privacy, and offline facts fit fresh desktop and phone first screens. |
| F-4-2 unexplained `provenance` | Fixed. Public copy says `source details` before naming the API property. |
| F-7-1 offline test used two online loads | Fixed. The tagged claim uses one online visit followed by the first offline reload and passed. |
| F-7-2 phone demo label scrolled away | Fixed. The label and both actions remain sticky and visible while using the editor. |
| F-8-1 200% phone text overlap and overflow | Fixed. Fresh production and suite checks found no overlap, clipping, or horizontal overflow; both actions remained at least 44 px. |

Reviews 5 and 6 and Verifications 2 through 4 reported no other unresolved
defect. No historical finding has regressed.

## Product scope

The deterministic API, CLI, JSON and NDJSON input, streaming output, package
download, and local inspector cover the researched job. An AI step would add
nondeterminism, cost, and data handling without improving the required result
format. No missing import, export, sync, or AI feature was found.

This is a free static library site. It has no backend, tenant state, database,
health endpoint, authentication, payment flow, or live request allowance.
Tenant isolation, SQLite restart persistence, and 429/`Retry-After` checks do
not apply.

## Commands run

```sh
npm ci --no-audit --no-fund
npm run test:claims
npm test
npm run pack:check
PLAYWRIGHT_BASE_URL=https://mcp-result-envelope.sociobot.in npm run test:e2e
/opt/fleet/lib/verify-url.sh https://mcp-result-envelope.sociobot.in .factory/evidence/review-9
CHROME_PATH=/opt/pw-browsers/chromium-1208/chrome-linux64/chrome npx --yes lighthouse@12.2.1 https://mcp-result-envelope.sociobot.in ...
```

No product code was changed during this review.
