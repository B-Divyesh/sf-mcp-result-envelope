# Verification 4 — Pack large tool results into stable pages

Verified 2026-09-06 for work order `mcp-result-envelope-verify-4`.

- Verdict: **PASS**
- Finding count: **0**
- Untested claim count: **0**
- Implementation candidate: `4dfcaaae551208e7b95046280aafebed68df471f`
- Documentation candidate: `50552734c18cefb472f866519e3c7ebfed1b12f9`
- Live URL: <https://mcp-result-envelope.sociobot.in>

The implementation candidate is the CSS and browser-test repair for the prior
200%-text phone defect. `5055273` changes reports and handoff material only.
The live build matched the candidate's complete deployable static output.

## Cold first screens

Fresh 1440 × 900 desktop and 390 × 844 phone contexts both began at scroll
position zero with no horizontal overflow. Before scrolling they stated:

- Job: **Pack large tool results into stable pages**.
- Audience: MCP and CLI authors who need size-limited output that keeps types,
  order, and source details.
- First action: **Try it with sample data**.

The three facts were visible: free and MIT licensed, runs in the tab with no
uploads, and works offline after the first visit. The URL verifier screenshots
are in `.factory/evidence/verification-4/`.

## Demo, errors, privacy, and accessibility

The one-click demo loaded 12 realistic orders and a populated envelope with
three pages on desktop and phone. Its persistent label said “Demo — sample
data, nothing is saved.” Replacing the input with one private row built one
row; **Reset demo** restored `ord_1041` and the 12-row sample. **Start for
real** and the clean-context storage tests confirmed that demo data is not
carried into the real inspector.

Live checks also passed for empty input, malformed JSON, a 500-character row
at a 256-byte cap, and recovery after increasing the cap to 2,048 bytes. The
messages explain the next action. Request capture found only same-origin GET
requests and no private input in requests; cookies, local storage, and session
storage were empty in the real inspector test.

At 200% text on a 390 px phone, the repaired demo label fit, did not overlap
the two controls, and the document stayed 390 px wide. The Reset demo and
Start for real controls were 178 × 53.17 px and remained in the viewport. The
full live Playwright suite also covered keyboard tabs and arrow-key tabs,
focus movement after navigation and browser Back, reduced motion, route
metadata, legal pages, first-visit offline reload, and serious/critical axe
violations in light and dark modes.

`/opt/fleet/lib/verify-url.sh` reported HTTP 200, no console errors,
`lang="en"`, one title, one `h1`, a `main` landmark, no missing image alt
text, and no unlabeled buttons. Its output is
`.factory/evidence/verification-4/verify.json`.

The designed `/missing-sheet` page deliberately returned HTTP 404, had its
expected page content, and supplied a route back. This is not a defect. The
only non-200 link found in the crawl was that 404 page's own `#main` skip link,
which intentionally retains the current 404 response; its visible return link
works. All other 15 discovered HTTP(S) links returned 200, and the contact
link is `mailto:`.

## Claims, package, and live candidate

From this clean checkout after `npm ci --no-audit --no-fund`:

```sh
npm run test:claims
npm test
npm run pack:check
PLAYWRIGHT_BASE_URL=https://mcp-result-envelope.sociobot.in npm run test:e2e
```

Results:

- All 27 declared claim commands passed; every claim has one matching tagged
  outcome test. No public claim was missing, false, incomplete, or untested.
- `npm test` passed type checking, build, 24 unit/consumer tests, and 33
  browser tests with 5 expected project-specific skips.
- The live browser suite passed the same 33 tests with 5 expected skips.
- `npm run pack:check` passed. The package contains 10 files, is 9.9 kB
  packed, and is 47.6 kB unpacked.

The live release tarball installed as the sole package in a new temporary npm
project. ESM and CommonJS imports preserved booleans; the API made a two-row,
two-page envelope; `streamEnvelope` emitted `manifest, summary, schema, page,
page`; CLI help listed the documented commands; and `result-envelope demo`
wrote and validated a 12-row envelope in a new temporary directory.

Every one of the 16 deployable files produced by the clean site build matched
the corresponding live file byte-for-byte, including every route HTML file,
JavaScript, CSS, service worker, artwork, favicon, and tarball. The live
headers include a self-only CSP with header-only `frame-ancestors 'none'`,
HSTS, nosniff, strict referrer policy, and restrictive permissions policy.
This static library site has no backend, tenant state, database, health route,
payment flow, or rate allowance, so tenant-isolation, restart-persistence, and
429/`Retry-After` checks do not apply.

## Performance

The successful Lighthouse retry using the supplied Chromium scored 100 for
performance, accessibility, best practices, and SEO. It measured LCP at
1,455 ms and CLS at 0. The full report is
`.factory/evidence/verification-4/lighthouse-live-retry.json`.

The first Lighthouse invocation could not locate Chrome until `CHROME_PATH`
was supplied. A subsequent run wrote scores but reported a post-audit browser
tab crash; the retry completed with exit code zero and no runtime error. This
was test-launcher setup behavior, not a product failure.

## Earlier findings

All prior review, polish, repair, and verification findings were checked
against the current live candidate.

| Earlier finding | Current disposition |
| --- | --- |
| F-1-1; Verification 1 CLI stdin defect | Fixed. The live tarball installs cleanly; library imports, CLI stdin behavior, help, and demo pass. |
| F-1-2, F-2-2, F-3-2, F-3-3, F-3-4 | Fixed. All 27 claims are declared, exactly tagged, and passed, including stream iteration, complete CLI help, and documented API metadata. |
| F-1-3 and F-4-1 | Fixed. Current public routes use **envelope** for the returned result. |
| F-2-1 and F-3-1 | Fixed. The populated 12-row, three-page phone result is visible in the first demo viewport. |
| F-2-3 and F-3-5 | Fixed. Public copy names row and byte caps without the former metaphor. |
| F-2-4 and F-3-6 | Fixed. Copy tells users to use the cursor to fetch the next page. |
| F-3-7 and F-3-8 | Fixed. The audience text is plain and all three facts fit fresh desktop and phone first screens. |
| F-4-2 | Fixed. Public explanation uses “source details” before the `provenance` API property. |
| F-7-1 | Fixed. The offline claim and fresh live check use one online visit followed by the first offline reload. |
| F-7-2 | Fixed. The persistent phone demo label and both actions remain visible while using the editor. |
| F-8-1 | Fixed. At 200% phone text there is no notice/control overlap, clipping, or horizontal overflow. |

No finding of any severity remains.
