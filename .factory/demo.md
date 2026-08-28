# Demo sandbox

## Browser

- URL: `https://mcp-result-envelope.sociobot.in/demo`
- Local URL: `http://127.0.0.1:5173/demo` after `npm run dev`
- Direct query form: `/?demo=1`
- Sample: 12 realistic order rows with regions, states, totals, item counts, and timestamps.
- Reset: choose **Reset demo** in the persistent demo banner.
- Exit: choose **Start for real**. This opens an empty inspector and drops the sample edits.
- Storage namespace: none. Demo input exists only in page memory. It never reads or writes real input.
- Offline check: visit the production demo once, wait for the service worker, then reload with the network disabled.

## CLI

- Command: `result-envelope demo`
- Source: `examples/orders.json`
- Sandbox: each run creates a new `result-envelope-demo-*` operating-system temporary directory.
- Output: `envelope.json` inside that directory. The command prints the full path.
- Reset: run the command again. It creates a clean directory from the bundled sample.

## Verification

The claim tests use only this sample. No account, API key, database, or external network is required.
