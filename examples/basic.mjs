import { createEnvelope, getEnvelopePage } from "mcp-result-envelope";

const rows = [
  { id: 1, status: "open", total: 42.5 },
  { id: 2, status: "closed", total: 19 }
];

const options = { pageSize: 1, maxRows: 100, maxBytes: 4096, provenance: "orders query" };
const envelope = createEnvelope(rows, options);
console.log(envelope.summary.text);

if (envelope.page.nextCursor) console.log(getEnvelopePage(rows, envelope.page.nextCursor, options));
