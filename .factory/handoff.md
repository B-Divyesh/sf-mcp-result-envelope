# Review 3 handoff — FAIL

Work order `mcp-result-envelope-review-3` reviewed commit `c5f715067a5b6d0ece71578fea0a82883e645e6a` and the matching production deployment. Product code was not changed.

## What was done

- Wrote `.factory/review-3.md` with cold phone/desktop observations, complete landing and README copy counts, demo/storage/network checks, every declared claim result, prior-finding retests, route/accessibility checks, and the missed-leverage assessment.
- Ran all 25 declared claim commands from clean clone `/tmp/mcp-result-envelope-review3-CbFx9U/repo`.
- Ran the full clean-clone `npm test` gate and the complete browser suite against production.
- Installed the live versioned tarball in a fresh temporary npm project, imported the API, and ran the installed CLI demo.
- Crawled public routes and links, exercised offline reload, inspected storage and requests, and confirmed live JavaScript/CSS hashes match the clean build.

## Verification results

- `npm run test:claims`: 25/25 declared commands passed.
- Clean `npm test`: typecheck/build passed; 22 unit/consumer tests passed; 27 browser tests passed with three intentional project-only skips.
- Live Playwright suite: 27 passed with three intentional project-only skips.
- Live route/link/metadata/focus/axe/privacy/offline checks: passed outside the documented findings.
- Live package install, API import, and CLI demo: passed.

## Findings left

- **F-3-1 / F-2-1 — BLOCKING:** the 390 px demo’s initial viewport still shows seeded input but no generated packet outcome.
- **F-3-2 / F-2-2 / F-1-2 — BLOCKING:** “`streamEnvelope` returns an async iterator” is still absent from the claim manifest.
- **F-3-3 / F-2-2 / F-1-2 — BLOCKING:** “`result-envelope --help` for all flags” is still absent from the claim manifest and not established by `cli-io`.
- **F-3-4 / F-2-2 / F-1-2 — BLOCKING:** `@claim:api-shape` still omits documented identity/cap, summary page-count, and schema-nullability assertions.
- **F-3-5 / F-2-3 — MINOR:** “Every page has a measured edge” remains unclear.
- **F-3-6 / F-2-4 — MINOR:** “Resolve the cursor when asked” remains ambiguous.
- **F-3-7 — MINOR:** the cold hero sentence uses avoidable “bounded output” and “provenance” jargon.
- **F-3-8 — MINOR:** the first-screen facts omit offline use, and the third fact is clipped at 1440 × 900.

The exact evidence and concrete fixes are in `.factory/review-3.md`.
