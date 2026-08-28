# Demo sandbox

## Browser

- URL: `https://mcp-result-envelope.sociobot.in/?demo=1`
- Alternate route: `https://mcp-result-envelope.sociobot.in/demo`
- Local URL: `http://127.0.0.1:5173/?demo=1` after `npm run dev`
- Sample: 12 realistic order rows with regions, states, totals, item counts, and timestamps.
- First view: the phone layout shows the built envelope's 12 rows, 3 pages, manifest identity, and summary before the editor.
- Reset: choose **Reset demo** in the persistent demo banner.
- Exit: choose **Start for real**. This opens an empty inspector and drops the sample edits.
- Isolation: `?demo=1` and `/demo` use route-local memory only. They never read or write real input, cookies, local storage, session storage, or a server.
- Offline check: visit the production demo once, wait for the service worker, then reload with the network disabled.

## CLI

- Command: `result-envelope demo`
- Source: `examples/orders.json`
- Sandbox: each run creates a new `result-envelope-demo-*` operating-system temporary directory.
- Output: `envelope.json` inside that directory. The command prints the full path.
- Reset: run the command again. It creates a clean directory from the bundled sample.

## Verification

The claim tests use only this sample. No account, API key, database, or external network is required.
