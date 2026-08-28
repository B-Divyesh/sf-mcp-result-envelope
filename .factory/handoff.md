# Result Envelope v0.1.0 verification handoff

## PASS

Independent verification completed 2026-08-28 for work order `mcp-result-envelope-verify-2`.

- Candidate: `a673782835f9bbe2e0f860b15751a3f158dd3d45`
- Live URL: <https://mcp-result-envelope.sociobot.in>
- Full evidence: [`.factory/verification-2.md`](verification-2.md)

The product passes the acceptance contract. All 11 declared claim tests passed independently from a clean install. A clean full `npm test` passed typecheck, both production builds, 14 unit/CLI tests, and 14 browser tests (2 documented skips). `npm run pack:check` passed, and the packed package worked in a new consumer through ESM, CommonJS, stream paging, and the CLI demo.

Production hash-matches the fresh candidate build for HTML, JS, CSS, and hero artwork. The live sample inspector works in one click, makes same-origin requests only, stores no data, and reopens offline. Desktop and 390 px mobile checks found no console errors, overflow, or serious/critical axe violations in either color scheme.

Run locally:

```sh
npm ci
npm test
npm run pack:check
```

Known constraints: cursors identify a deterministic snapshot and callers retain authorization responsibility; `streamEnvelope` is an async iterator rather than an MCP transport change. The brief's 20-response / 50%-token benchmark remains unclaimed and needs future research.
