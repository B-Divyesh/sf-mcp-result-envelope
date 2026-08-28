# Result Envelope

Pack large tool results into summaries, schemas, and stable pages.

Result Envelope is for MCP and CLI tool authors. It turns JSON into a manifest, compact summary, schema, and stable pages.

The package preserves JSON types, row order, and source details. It has no runtime dependencies and makes no network, model, or telemetry calls.

## Try the demo

Open [the browser demo](https://mcp-result-envelope.sociobot.in/?demo=1), or run the same bundled sample from the released package:

```sh
npx --yes https://mcp-result-envelope.sociobot.in/downloads/mcp-result-envelope-0.1.0.tgz demo
```

The CLI writes its sample envelope to a new temporary directory and prints the path. The browser demo keeps edits in memory and discards them when demo mode ends.

The browser demo reopens offline after its first visit.

## Install

Install the versioned npm package served by this release:

```sh
npm install https://mcp-result-envelope.sociobot.in/downloads/mcp-result-envelope-0.1.0.tgz
```

The package metadata requires Node.js 18 or newer.

## Use the library

```ts
import { createEnvelope, getEnvelopePage } from "mcp-result-envelope";

const rows = await db.query("select * from orders order by id");
const options = {
  pageSize: 25,
  maxRows: 10_000,
  maxBytes: 16_384,
  provenance: { source: "orders", query: "orders-by-id" }
};

const envelope = createEnvelope(rows, options);
return envelope;

// On the next tool call, rerun the stable query and use its cursor.
const nextPage = getEnvelopePage(rows, envelope.page.nextCursor ?? undefined, options);
```

`createEnvelope` returns four parts:

- `manifest`: result identity, caps, counts, page count, and source details in `provenance`.
- `summary`: field count, page count, and numeric ranges. It contains no sample rows.
- `schema`: dotted field paths, observed JSON types, nullability, and presence counts.
- `page`: bounded rows and a stable cursor for the next page.

The same input and options produce the same cursor. A cursor from different data or options fails with `INVALID_CURSOR`.

## Stream chunks

```ts
import { streamEnvelope } from "mcp-result-envelope";

for await (const chunk of streamEnvelope(rows, options)) {
  transport.send(chunk);
}
```

Chunks arrive as manifest, summary, schema, then bounded pages. `streamEnvelope` returns an async iterator.

## Use the CLI

```sh
result-envelope pack results.json --page-size 20 --max-bytes 8192
result-envelope page results.json --cursor '<nextCursor>' --page-size 20 --max-bytes 8192
cat results.ndjson | result-envelope pack - --format ndjson --stream
```

Run `result-envelope --help` for all flags. JSON goes to stdout. Errors go to stderr and return a non-zero exit code.

## Caps and errors

- `maxRows` stops the included row count and sets `manifest.capped`.
- `pageSize` limits rows in each page.
- `maxBytes` limits the serialized size of each page.
- A single row over `maxBytes` raises `ROW_TOO_LARGE`. Increase the cap or remove large fields.
- Inputs must be JSON values with finite numbers and no circular references.

Result Envelope preserves JSON types and source metadata. It does not claim that one format is best for every model.

## Develop and verify

```sh
npm install
npm run dev
npm test
npm run build
npm run pack:check
```

`npm run build` creates the library and static site in `dist/`. The site build also creates its versioned npm tarball.

To deploy the documentation site, serve `dist/site` as the static site root. Do not deploy the top-level `dist` directory.

## Privacy

The package makes no network requests. The browser inspector keeps input in the current tab and saves nothing. See the site’s [privacy page](https://mcp-result-envelope.sociobot.in/privacy).

## License

MIT. See [LICENSE](./LICENSE).
