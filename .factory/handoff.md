# Review 2 handoff — FAIL

Work order `mcp-result-envelope-review-2` reviewed commit `1a1dbc7305fcc44431a14944d0f1c285715666fb` and the matching production deployment. Product code was not changed.

## What was done

- Wrote `.factory/review-2.md` with the cold mobile/desktop read, complete landing and README copy audit, demo and storage checks, all claims results, prior-finding retest, route/accessibility checks, missed-leverage assessment, and verdict.
- Re-ran all 25 declared claim commands from clean clone `/tmp/mcp-result-envelope-review-2-9x7zll/repo`.
- Ran the full clean-clone test gate and the complete suite against the live deployment.
- Installed the production tarball into a fresh temporary npm project and ran the imported API and installed CLI demo.
- Confirmed live JavaScript and CSS hashes match the clean build.

## Verification results

- `npm run test:claims`: 25/25 declared claims passed.
- `npm test`: typecheck/build passed; 22 unit/consumer tests passed; 27 browser tests passed with three intentional project-only skips.
- Live Playwright suite: 27 passed, three intentional project-only skips across desktop and 390 px mobile.
- Live package install/API/CLI demo: passed.
- Live route/link/metadata/focus/accessibility/privacy/offline checks: passed except for the findings below.

## Findings left

- **F-2-1 — BLOCKING:** the 390 px demo's initial viewport shows seeded input but not the generated packet outcome.
- **F-2-2 / F-1-2 reopened — BLOCKING:** two README claims are unlisted, and schema nullability is not asserted by its tagged claim test.
- **F-2-3 — MINOR:** “Every page has a measured edge” is an unclear metaphor.
- **F-2-4 — MINOR:** “Resolve the cursor when asked” does not name the action plainly.

The exact evidence and required fixes are in `.factory/review-2.md`.
