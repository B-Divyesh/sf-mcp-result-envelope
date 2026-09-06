# Review 7 handoff — FAIL

Work order `mcp-result-envelope-review-7` completed without product-code changes.

## What was done

- Reviewed the live site in fresh desktop and 390 px phone contexts.
- Exercised the one-click sample, populated output, reset, exit, invalid input, byte boundary, recovery, paging, keyboard flow, reduced motion, privacy, and offline behavior.
- Ran all 27 declared claim commands and the full clean-checkout quality gate.
- Installed and exercised the live release tarball in a clean consumer project.
- Checked every earlier finding and compared live assets with the last implementation candidate.

## Result

**FAIL: 2 findings, 1 untested claim.** See `.factory/review-7.md`.

1. `offline-reload` performs an extra online reload, so it does not test the stated first-visit condition.
2. The phone demo banner becomes static and leaves the viewport during normal editor use.

The live offline behavior itself passed three stricter first-visit checks. The first issue is test coverage, not a reproduced runtime failure.

## Verification

Clean clone: `/tmp/mcp-result-envelope-review7-j0p0o7/repo`.

```sh
npm ci --no-audit --no-fund
npm run test:claims
npm test
npm run pack:check
PLAYWRIGHT_BASE_URL=https://mcp-result-envelope.sociobot.in npm run test:e2e
```

- Claims: 27/27 commands passed; `offline-reload` is incomplete.
- Full local gate: 24 unit/consumer tests and 31 browser tests passed; 3 device-specific skips.
- Live browser gate: 31 passed; 3 device-specific skips.
- Lighthouse: 100 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.5 s, CLS 0, TBT 0 ms.
- Live package: clean install, ESM API, stable page, stream, stdin CLI, error path, and demo all passed.
- Expected unknown route: styled HTTP 404, not a defect.

## Candidate versions

- Implementation: `800366de66bfc216b321bf5d8584ffb39bc15398`
- Documentation before this review: `5666eeca5ca3c1f4a50167472c9779b6868fb171`

The live JavaScript, CSS, hero, and package hashes match the clean build. Later commits before this review changed only reports and factory evidence.

## Next steps

- Make `@claim:offline-reload` disable the network after the first load, with no extra online reload.
- Keep a compact demo label plus reset and exit actions visible while scrolling on phones.
- Add a phone scroll assertion for the demo banner, then rerun all clean and live gates.
