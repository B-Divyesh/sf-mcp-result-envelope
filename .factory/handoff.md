# Repair 3 handoff — PASS

Work order `mcp-result-envelope-repair-3` repaired and deployed the one finding in strict review 8.

## Result

**PASS.** No known product finding remains.

- Implementation SHA: `4dfcaaae551208e7b95046280aafebed68df471f`.
- Live URL: <https://mcp-result-envelope.sociobot.in>.
- Deployment id: `c262b750-4c3e-464d-9797-aa76689b8e56`.
- Full repair record: `.factory/repair-3.md`.

At 200% text on a 390 px phone, the complete demo warning now occupies its own row. Reset demo and Start for real sit below it without overlap, remain at least 44 px, and stay visible while scrolling. The header and document no longer overflow horizontally.

The change is limited to responsive CSS and an outcome-based browser regression. Library, CLI, demo, privacy, offline, routing, and visual behavior were preserved.

## Verification

From a fresh clone of the implementation SHA:

```sh
npm ci --no-audit --no-fund
npm run test:claims
npm test
npm run pack:check
```

Results:

- 27/27 declared claims passed.
- 24 unit/consumer tests passed.
- 33 browser tests passed; 5 device-specific skips were expected.
- The npm package has 10 files, is 9.9 kB packed, and is 47.6 kB unpacked.
- A separate clean consumer passed ESM, CommonJS, paging, streaming, CLI stdin/errors/demo, and Node.js 18.

Live checks:

- Full Playwright suite: 33 passed, 5 expected skips.
- URL verifier: no console or structural accessibility errors.
- Lighthouse mobile: 100 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.5 s; CLS 0.
- Cold desktop and phone first screens show the job, audience, sample action, price, privacy, and offline facts before scrolling.
- The demo shows 12 orders, 3 pages, manifest identity, and summary. Reset restores `ord_1041`; Start for real opens empty.
- Cookies, local storage, and session storage remain empty. Requests are same-origin GETs with no entered data.
- Invalid JSON, byte-cap failure, recovery, keyboard tabs, Space reset, focus movement, reduced motion, offline reload, legal routes, and the designed 404 passed.
- Live HTML, JavaScript, CSS, service worker, artwork, and tarball match the local build byte for byte.

Evidence is in `.factory/evidence/repair-3/`.

## Known gaps

None in product scope. The site is static and free; backend, tenant, database, health, payment, and rate-limit checks do not apply. Registry publishing remains a factory operation; the tested versioned tarball is the public install path.
