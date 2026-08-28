import { describe, expect, it, vi } from "vitest";
import { createEnvelope, EnvelopeError, getEnvelopePage, streamEnvelope } from "../../src/index.js";
import type { JsonValue } from "../../src/index.js";

const rows: JsonValue = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  active: index % 2 === 0,
  amount: index * 10.5,
  optional: index === 0 ? null : `row-${index + 1}`,
  nested: { region: index % 2 ? "west" : "east" }
}));

describe("createEnvelope", () => {
  it("@claim:summary-no-rows builds metadata without copying sample rows into the summary", () => {
    const envelope = createEnvelope(rows, { pageSize: 5, provenance: "test query" });
    expect(envelope.manifest).toMatchObject({ totalRows: 12, includedRows: 12, pageCount: 3, capped: false });
    expect(envelope.manifest.provenance).toEqual({ source: "test query" });
    expect(JSON.stringify(envelope.summary)).not.toContain("row-2");
    expect(envelope.schema.fields.find((field) => field.path === "nested.region")?.types).toEqual(["string"]);
  });

  it("handles an empty row set", () => {
    const envelope = createEnvelope([], { maxBytes: 512 });
    expect(envelope.summary.text).toBe("0 rows · 0 fields · 0 pages");
    expect(envelope.page).toMatchObject({ number: 0, rows: [], nextCursor: null });
  });

  it("@claim:json-types preserves JSON value types and provenance", () => {
    const input: JsonValue = [{ id: 7, enabled: true, note: null, tags: ["a"], nested: { score: 2.5 } }];
    const envelope = createEnvelope(input, { provenance: { source: "claim fixture", query: "q1" } });
    expect(envelope.page.rows).toEqual(input);
    expect(envelope.schema.fields.find((field) => field.path === "id")?.types).toEqual(["number"]);
    expect(envelope.schema.fields.find((field) => field.path === "enabled")?.types).toEqual(["boolean"]);
    expect(envelope.schema.fields.find((field) => field.path === "note")?.types).toEqual(["null"]);
    expect(envelope.manifest.provenance).toEqual({ source: "claim fixture", query: "q1" });
  });

  it("@claim:page-caps keeps every page within the configured row and byte caps", () => {
    const options = { pageSize: 3, maxBytes: 450 };
    const first = createEnvelope(rows, options);
    const pages = [first.page];
    let cursor = first.page.nextCursor;
    while (cursor) {
      const page = getEnvelopePage(rows, cursor, options);
      pages.push(page);
      cursor = page.nextCursor;
    }
    expect(pages.flatMap((page) => page.rows)).toEqual(rows);
    for (const page of pages) {
      expect(page.rows.length).toBeLessThanOrEqual(3);
      expect(page.bytes).toBeLessThanOrEqual(450);
      expect(new TextEncoder().encode(JSON.stringify(page)).byteLength).toBeLessThanOrEqual(450);
    }
  });

  it("@claim:stable-cursors returns the same cursor for the same input and options", () => {
    const options = { pageSize: 2, maxBytes: 2048 };
    const first = createEnvelope(rows, options);
    const second = createEnvelope(structuredClone(rows), options);
    expect(first.page.nextCursor).toBe(second.page.nextCursor);
    expect(getEnvelopePage(rows, first.page.nextCursor!, options).rowStart).toBe(2);
    expect(() => getEnvelopePage([...rows as JsonValue[], { id: 99 }], first.page.nextCursor!, options)).toThrowError(EnvelopeError);
  });

  it("surfaces row caps and rejects oversized rows", () => {
    expect(createEnvelope(rows, { maxRows: 4 }).manifest).toMatchObject({ totalRows: 12, includedRows: 4, capped: true });
    expect(() => createEnvelope([{ value: "x".repeat(400) }], { maxBytes: 256 })).toThrowError(/Row 0/);
  });

  it("rejects invalid values and options", () => {
    expect(() => createEnvelope({ value: Number.NaN } as unknown as JsonValue)).toThrowError(/finite numbers/);
    expect(() => createEnvelope(rows, { pageSize: 0 })).toThrowError(/pageSize/);
    expect(() => getEnvelopePage(rows, "bad", { pageSize: 2 })).toThrowError(/cursor/);
  });

  it("yields metadata before bounded pages", async () => {
    const chunks = [];
    for await (const chunk of streamEnvelope(rows, { pageSize: 5 })) chunks.push(chunk);
    expect(chunks.map((chunk) => chunk.type)).toEqual(["manifest", "summary", "schema", "page", "page", "page"]);
  });

  it("@claim:package-no-network does not call fetch while packing and paging", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const envelope = createEnvelope(rows, { pageSize: 2 });
    getEnvelopePage(rows, envelope.page.nextCursor!, { pageSize: 2 });
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
